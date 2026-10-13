import dotenv from "dotenv"

dotenv.config()

const config = {
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    IMAGEKIT_PRIVATE: process.env.IMAGEKIT_PRIVATE,
    IMAGEKIT_PUBLIC: process.env.IMAGEKIT_PUBLIC
}

export default config