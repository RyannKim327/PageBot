declare namespace NodeJS {
	interface ProcessEnv {
		PORT?: string;
		FB_TOKEN: string
		FB_KEY?: string
		WEBHOOK_PROXY_URL?: string
	}
}
