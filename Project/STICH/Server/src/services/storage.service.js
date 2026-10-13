import ImageKit, { toFile } from '@imagekit/nodejs'
import config from '../config/config.js'

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE
})

export async function uploadFile({buffer,fileName}) {
    const response = await client.files.upload({
        file: await toFile(buffer, fileName),
        fileName: fileName,

    })

    return response
}