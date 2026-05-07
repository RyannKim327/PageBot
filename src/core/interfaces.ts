import { IncomingMessage, ServerResponse } from "http"

export interface commands {
	title: string
	description?: string
	command: string
	admin?: boolean
}

export interface CommandProperties {
	title: string
	description?: string
	command: string
	admin?: boolean
	file: string
}

export interface ResourcesProps {
	public?: string,
	temp?: string
}

export type serverContent = (req: IncomingMessage, res: ServerResponse) => void

export type server = Record<string, serverContent>


