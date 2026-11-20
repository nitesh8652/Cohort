import { StateGraph, START, END } from "@langchain/langgraph"
import { LLMNODE } from "./node.js"
import rl from "../utils/readline.js"
import { HumanMessage } from "langchain"
import * as z from "zod"
import readline from "readline"


const stateFormate = z.object({
    messages: z.array(z.any())
})

const graph = new StateGraph(stateFormate)
    .addNode("LLMNODE", LLMNODE)
    .addEdge(START, "LLMNODE")
    .addEdge("LLMNODE", END)
    .compile()

export default async function initGraph() {

    let messages = []

    while (true) {
        const userInput = await rl.question("USER: ")

        messages.push(new HumanMessage(userInput))

        const response = await graph.invoke({
            messages
        })
        // console.log("AI: ", response)
        messages = response.messages
    }
}