import fs from 'fs/promises'

import { CONFIG_DIR, HOME_DIR } from './constant.js'
import path from 'path'
import axios from 'axios'

/**
 * return the content of the settings file (create if dosent exists)
 */

export async function getSettingsFile() {
    //check dir exists or not 
    try {
        await fs.access(CONFIG_DIR)
    } catch (err) {
        await fs.mkdir(CONFIG_DIR,
            { recursive: true })
    }

    const settingsFilePath = path.join(CONFIG_DIR, "settings.json")

    try {
        await fs.access(settingsFilePath)
        const content = await fs.readFile(settingsFilePath, "utf-8")
        return JSON.parse(content)
    } catch (err) {
        await fs.writeFile(settingsFilePath, JSON.stringify({}))
        return {}
    }
}

export async function saveApiKey(apikey) {
    const settingsFilePath = path.join(CONFIG_DIR, "settings.json")
    const settingsContent = await getSettingsFile()

    await fs.writeFile(settingsFilePath, JSON.stringify({
        ...settingsContent,
        apikey
    }))
}

export async function getApiKey() {
    const settings = await getSettingsFile()
    const apikey = settings.apikey || null

    if (!apikey) {
        return {
            error: "API key not found in setting file"
        }
    }

    try {
        const response = await axios.get("https://api.groq.com/openai/v1/models", {
            headers: {
                "Authorization": `Bearer ${apikey}`
            }
        })
        return {
            apikey
        }
    } catch (err) {
        return { error: "INVALID API KEY" }
    }
}