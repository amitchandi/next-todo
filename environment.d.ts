declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_ID: string;
            GITHUB_SECRET: string;
        }
    }
}

export {}