import { getSettingsFile, saveApiKey, getApiKey } from "./utils/file.utils.js";
import rl from '../src/utils/readline.js'

async function main() {
    const settings = await getSettingsFile()

    if (!settings.apiKey) {
        const apiKey = await rl.question("Please Enter Your Api Key: ")
        await saveApiKey(apiKey)
    }

    const apiKey = await getApiKey()
    console.log(apiKey)
    rl.close()


}


export default main