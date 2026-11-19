import { StateGraph, START, END } from "@langchain/langgraph"
import * as z from "zod"
import { LLMNODE } from "./node.js"
import rl from "../utils/readline.js"
import readline from "readline"
import { HumanMessage } from "langchain"

const stateFormate = z.object({
    messages: z.array(z.any())
})

const graph = new StateGraph(stateFormate)
    .addNode("LLMNODE", LLMNODE)
    .addEdge(START, "LLMNODE")
    .addEdge("LLMNODE", END)
    .compile()

export default async function initGraph() {
    while (true) {
        const userInput = await rl.question("USER: ")

        const response = await graph.invoke({
            messages: [
                new HumanMessage(userInput)
            ]
        })
        console.log("AI: ")
    }
}