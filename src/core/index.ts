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

import { CommandProperties, ResourcesProps, server } from "./interfaces";
import onAddCommand from "./script/addCommand";
import onAddService from "./script/addService";
import onAttachment from "./script/sendAttachment"
import onMessage from "./script/sendMessage"
import startService from "./script/startService";
import * as dotenv from 'dotenv';


export default function FacebookBot(options?: ResourcesProps) {
	dotenv.config();

	const token = process.env.FB_MESSENGER_TOKEN
	const version = process.env.VERSION ?? "v23.0"
	const commands: CommandProperties[] = []
	const admins: string[] | number[] = []

	let webServices: server = {
		"/": (req, res) => {
			res.end(JSON.stringify({
				"response": "Server currently running"
			}))
		},
		"/404": (req, res) => {
			res.end(JSON.stringify({
				"error": "Endpoint not found"
			}))
		}
	}

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

	const sendMessage = onMessage(token, version)
	const sendAttachment = onAttachment(token, version, options)
	const addCommand = onAddCommand(commands)
	const addService = onAddService(webServices)
	const start = startService(webServices, commands, admins)

	return {
		sendAttachment,
		sendMessage,
		addCommand,
		addService,
		start
	}
}

