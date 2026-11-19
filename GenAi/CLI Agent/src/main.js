import { getSettingsFile, saveApiKey, getApiKey } from "./utils/file.utils.js";
import rl from '../src/utils/readline.js'
import initGraph from '../src/graph/graph.js'

async function main() {
    const settings = await getSettingsFile()

    if (!settings.apikey) {
        const apiKey = await rl.question("Please Enter Your Api Key: ")
        await saveApiKey(apiKey)
    }



    const response = await getApiKey()

    if (response.error) {
        console.log("INVALID or EXPIRED api key, please try again!")
        const apikey = await rl.question("Please enter your api key:")
        await saveApiKey(apikey)
        return main()
    }

    const apikey = response.apikey

    await initGraph()

    rl.close()


}


export default main