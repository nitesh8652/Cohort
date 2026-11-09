import { ChatGroq } from '@langchain/groq';
import dotenv from 'dotenv';
import rl from "readline/promises"
import { tool, createAgent } from "langchain"
import * as z from "zod"

dotenv.config();

const events = []

let nextid = 1


const createEvent = tool(
    async function ({ date, title, des }) {
        events.push({
            id: nextid++,
            date,
            title,
            des,
        })
        return "Event Created"
    },
    {
        name: "createEvent",
        description: "Creats a new event with date, title and des",
        // Schema must match the destructured args: date/title/des are top-level
        schema: z.object({
            date: z.string(),
            title: z.string(),
            des: z.string()
        })

    }
)

const updateEvent = tool(
    async function ({ id, title, date, des }) {
        const event = events.find(e => e.id === id)
        if (!event) return "No Event Found"

        if (date) event.date = date
        if (title) event.title = title
        if (des) event.des = des

        return "Event Updated!"
    },
    {
        name: "updateEvent",
        description: "update an existing event with id   ",

        schema: z.object({
            id: z.number().int(),
            title: z.string().optional(),
            date: z.string().optional(),
            des: z.string().optional()
        })
    }
)

const deleteEvent = tool(
    async function ({ id }) {
        const index = events.findIndex(e => e.id === id)

        if (index === -1) return "No Events Found!"

        events.splice(index, 1)
        return "Event Deleted"
    },
    {
        name: "deleteEvent",
        description: "delete an event by id",
        schema: z.object({
            id: z.number()
        })
    }
)

const getEventTool = tool(
    async function ({ }) {
        return events
    }, {
    name: "getEvents",
    // Fixed typo: "descriptionn" -> "description"
    description: "retrive all events",
    schema: z.object({})
}
)

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API
})

const agent = createAgent({
    model,
    tools: [createEvent, getEventTool, deleteEvent, updateEvent

    ]
})

const messages = []

while (true) {
    const userInput = await readline.question("Enter Your Query: ")

    messages.push({
        role:"user",
        content: userInput
    })

    const response = await agent.stream(
        {
            messages
        },
        { streamMode: "messages" }
    )

    let reply = ""

    for await (const [chunk] of response) {
        const content = typeof chunk.content === "string"
            ? chunk.content
            : Array.isArray(chunk.content)
                ? chunk.content.map(part => part.text ?? "").join("")
                : ""
                reply +=content
        process.stdout.write(content)
    }
    process.stdout.write("\n")
    messages.push({role:"assistant", content:"reply"
    })
}