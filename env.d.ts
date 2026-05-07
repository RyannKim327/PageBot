declare namespace NodeJS {
	interface ProcessEnv {
		PORT?: string;
		FB_MESSENGER_TOKEN: string
		FB_KEY?: string
		WEBHOOK?: string
		VERSION?: string
		WEBHOOK_PROXY_URL?: string
	}
}
