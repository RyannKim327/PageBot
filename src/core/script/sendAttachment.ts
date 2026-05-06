/*
 sendAttachment(fileType, fileUrl, event, callback) {
		if (!this.FB_TOKEN) {
			if (typeof callback === "function") {
				return callback("ERR: Undefined FB_TOKEN", null);
			}
			return console.error(`TOKEN [ERR]: Undefined FB_TOKEN`);
		}

		if (typeof event !== "object") {
			if (typeof callback === "function") {
				return callback("ERR: The event muyst be an Object or JSON type", null);
			}
			return console.error(
				"ERROR [event type]: The event must be in Object or JSON type",
			);
		}

		let url = "messages";

		if (!fileUrl) {
			if (typeof callback === "function") {
				return callback("ERR: Undefined File URL", null);
			}
			return this.#sendMessage("Undefined File URL", event);
		}
		if (!fileUrl.startsWith("http")) {
			// TODO: Trigger the condition for local storage such as temp and assets
			if (!fileUrl.startsWith("/")) {
				fileUrl = `/${fileUrl}`;
			}

			if (!fs.existsSync(fileUrl)) {
				if (typeof callback === "function") {
					return callback("ERR: File doesn't exists", null);
				}
				return this.sendMessage("File doesn't exists", event);
			}

			let file = fileUrl.split(`${this.__assets.substring(1)}/`)[1];
			let folder = this.__assets.substring(1);

			if (
				fileUrl.includes(this.__temp) &&
				!fileUrl.includes(this.__assets.substring(1))
			) {
				file = fileUrl.split(`${this.__temp.substring(1)}/`)[1];
				folder = "temp";
			}

			data.message.attachment.payload.url = `https://${this.hostname}/${folder}/${file}`;
		}

		axios
			.post(
				`https://graph.facebook.com/${this.version}/me/${url}?access_token=${this.FB_TOKEN}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${this.FB_TOKEN}`,
						"Content-Type": "application/json",
					},
				},
			)
			.then((response) => {
				if (callback) {
					if (typeof callback === "function") {
						callback(null, response);
					}
				}
			})
			.catch((error) => {
				if (callback) {
					if (typeof callback === "function") {
						callback(error, null);
					}
				}
			});
	}
*/

import axios, { AxiosError, AxiosResponse } from "axios"
import * as fs from "fs"

export default function onAttachment(token: string, version: string, options: Record<string, any>) {
	return (fileType: string,
		fileUrl: string,
		event: Record<string, any>,
		callback?: (err: AxiosError | string | null, msg: AxiosResponse | null) => void) => {

		let data = {
			recipient: {
				id: event.sender.id,
			},
			message: {
				attachment: {
					type: fileType,
					payload: {
						url: fileUrl,
						is_reusable: true,
					},
				},
			},
		};


		if (!fileUrl) {
			if (typeof callback === "function") {
				return callback("ERR: Undefined File URL", null);
			}
			return console.error("Undefined File URL");
		}

		if (!fileUrl.startsWith("http")) {
			// TODO: Trigger the condition for local storage such as temp and assets
			if (!fileUrl.startsWith("/")) {
				fileUrl = `/${fileUrl}`;
			}

			if (!fs.existsSync(fileUrl)) {
				if (typeof callback === "function") {
					return callback("ERR: File doesn't exists", null);
				}
				return console.error("File doesn't exists");
			}

			let file = fileUrl.split(`${options.public.substring(1)}/`)[1];
			let folder = options.public.substring(1);

			if (
				fileUrl.includes(options.temp) &&
				!fileUrl.includes(options.temp.substring(1))
			) {
				file = fileUrl.split(`${options.temp.substring(1)}/`)[1];
				folder = "temp";
			}

			data.message.attachment.payload.url = `https://${options.hostname}/${folder}/${file}`;
		}


		axios
			.post(
				`https://graph.facebook.com/${version}/me/messages?access_token=${token}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			)
			.then((response: AxiosResponse) => {
				if (callback) {
					if (typeof callback === "function") {
						callback(null, response);
					}
				}
			})
			.catch((error: AxiosError) => {
				if (callback) {
					if (typeof callback === "function") {
						callback(error, null);
					}
				}
			});


	}
}
