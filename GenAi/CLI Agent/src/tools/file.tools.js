import { context, Tool } from "langchain";
import * as z from zod

export const upsertFilesTool = tool(
    async function ({ files }) {
        await Promise.all(files.map(async file => {
            return await fs.writeFile(file.path, file.content)
        }))
        return "file created successfully"
    },
    {
        name: "upsertFiles",
        description: "Create mulitple files at onces and create if not existed",
        schema: z.object({
            files: z.array(z.object({
                path: z.string().describe("absolute path of the file to be created/updated"),
                content: z.string().describe("content to the file to be updated or deleted")
            }))
        })
    }
)