import { CommandProperties, server } from "../interfaces";
import Server from "../services/server";

export default function startService(webServices: server, commands: CommandProperties[], admins: string[] | number[]) {
	return () => {
		Server(webServices, commands, admins)
	}
}
