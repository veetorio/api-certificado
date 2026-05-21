import dotenv from "dotenv"
import path from "path";
dotenv.config({
    path : path.resolve(__dirname,"../../.env")
})

class env {
    static get(key: string): string {
        const value = process.env[key];
        if (value === undefined) {
            throw new Error(`Environment variable ${key} is not defined`);
        }
        return value;
    }
}

export = env;