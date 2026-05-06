/*
 * Project: FacebookPage Bot Framework
 * File: FacebookPage/index.ts
 * Description: Core module that initializes the Express app, exposes webhook endpoints,
 *              routes incoming Messenger events to registered commands, and
 *              provides helpers for sending messages and attachments.
 * Author: Ryann Kim Sesgundo [MPOP Reverse II]
 * Copyright: (c) Ryann Kim Sesgundo
 * Environment: Requires FB_TOKEN; optional KEY_TOKEN, PORT
 * Notes: This file is the single source of truth for bot wiring and runtime behavior.
 */

import onAttachment from "./script/sendAttachment"
import onMessage from "./script/sendMessage"
import Server from "./server"
import * as dotenv from 'dotenv';


interface ResourcesProps {
	public?: string,
	temp?: string
}

export default function FacebookBot(options?: ResourcesProps) {
	dotenv.config();

	const token = process.env.FB_TOKEN
	const version = ""
	const key = process.env.FB_KEY ?? "pagebot"

	if (!options) {
		options = {
			"temp": "temp",
			"public": "public"
		}
	}

	if (!options.temp) {
		options["temp"] = "temp"
	}

	if (!token) {
		throw new Error("Please add your FB_TOKEN in your environment variables")
	}

	Server({
		"/": (req, res) => {
			res.end("Hello")
		},
		"/send": (req, res) => {
			res.end("World")
		},
		"/404": (req, res) => {
			res.end("Error")
		}
	})

	const sendMessage = onMessage(token, version)
	const sendAttachment = onAttachment(token, version, options)

	return {
		sendAttachment,
		sendMessage
	}
}

