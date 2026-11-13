import { getSettingsFile } from "./utils/file.utils.js";

async function main(){
    const settings = await getSettingsFile()
    console.log(settings)
}

export default main