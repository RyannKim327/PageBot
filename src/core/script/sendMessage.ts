import axios, { AxiosError, AxiosResponse } from "axios";

export default function onMessage(token: string, version: string) {
	return async (message: string, event: Record<string, any>, callback?: (err: AxiosError | null, msg: AxiosResponse | null) => void) => {
		axios
			.post(
				`https://graph.facebook.com/${version}/me/messages?access_token=${token}`,
				{
					message: { text: message },
					recipient: {
						id: event.sender.id,
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

