import * as dotenv from 'dotenv'
dotenv.config();
const { SERVER_PORT, CLIENT_PORT, MONGODB_URL, ACCESS_KEY, REFRESH_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

export default {

    SERVER_PORT: SERVER_PORT,
    CLIENT_PORT: CLIENT_PORT,
    MONGODB_URL: MONGODB_URL,
    ACCESS_KEY: ACCESS_KEY,
    REFRESH_KEY: REFRESH_KEY,
    GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: GOOGLE_CALLBACK_URL
}

