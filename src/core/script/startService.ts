import { server } from "../interfaces";
import Server from "../server";

export default function startService(webServices: server) {
	return () => {
		console.log(webServices)
		Server(webServices)
	}
}
