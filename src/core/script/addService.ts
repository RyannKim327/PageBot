import { server, serverContent } from "../interfaces";

export default function onAddService(webServices: server) {
	return (endpoint: string, content: serverContent) => {
		if (!endpoint.startsWith("/")) {
			endpoint = `/${endpoint}`
		}

		if (endpoint === "/404") {
			throw new Error("404 is a reserved endpoint for this project")
		}

		webServices[endpoint] = content
		return webServices
	}
}
