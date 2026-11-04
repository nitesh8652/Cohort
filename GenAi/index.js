import {ChatGroq} from '@langchain/groq';
import dotenv from 'dotenv';
import rl from "readline/promises"
dotenv.config();

const readline = rl.createInterface({
    input: process.stdin,
    output:process.stdout
})

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API
})

// const userInput = await readline.question("Enter your query: ");

// console.log("User Input: ", userInput);

// readline.close()

while(true){
    const userInput = await readline.question("Enter your query: ");
     const response = await model.invoke(userInput);
     console.log("Response: ", response.content);
}