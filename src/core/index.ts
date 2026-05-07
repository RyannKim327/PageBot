/*
 * Project: FacebookPage Bot Framework
 * File: FacebookPage/index.ts
 * Description: Core module that initializes the Express app, exposes webhook endpoints,
 *              routes incoming Messenger events to registered commands, and
 *              provides helpers for sending messages and attachments.
 * Author: Ryann Kim Sesgundo [MPOP Reverse II]
 * Copyright: (c) Ryann Kim Sesgundo
 * Environment: Requires FB_MESSENGER_TOKEN; optional KEY_TOKEN, PORT
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

	const token = process.env.FB_MESSENGER_TOKEN
	const version = process.env.VERSION ?? "v23.0"
	const key = process.env.FB_KEY ?? "pagebot"
	let webhook = process.env.WEBHOOK ?? "/webhook"

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
		throw new Error("Please add your FB_MESSEGER_TOKEN in your environment variables")
	}

	if (!webhook.startsWith("/")) {
		webhook = `/${webhook}`
	}

	Server({
		"/": (req, res) => {
			res.end(JSON.stringify({
				"response": "Server currently running"
			}))
		},
		[webhook]: (req, res) => {
			const host = req.headers.host ?? ""
			const url = new URL(req.url ?? "", `http://${host}`);

			if (req.method === 'POST') {
				let body = ''

				req.on("data", chunk => {
					body += chunk.toString()
				})

				req.on("end", () => {
					console.log(body)

					res.end(JSON.stringify({
						received: body
					}));
				})
			} else if (req.method === 'GET') {
				const params = url.searchParams
				const mode = params.get("hub.mode");
				const token = params.get("hub.verify_token")
				const challenge = params.get("hub.challenge");

				if (token && mode) {
					if (mode === "subscribe" && token === key) {
						res.statusCode = 200
						res.end(challenge);
					} else {
						res.statusCode = 400;
						res.end(JSON.stringify({
							"error": "Error"
						}))
					}
				} else {
					res.statusCode = 400;
					res.end(JSON.stringify({
						"error": "Error"
					}))
				}
			} else {
				res.end(JSON.stringify({
					"error": "Invalid Method"
				}))
			}
		},
		"/404": (req, res) => {
			res.end(JSON.stringify({
				"error": "Endpoint not found"
			}))
		}
	})

	const sendMessage = onMessage(token, version)
	const sendAttachment = onAttachment(token, version, options)

	return {
		sendAttachment,
		sendMessage
	}
}

