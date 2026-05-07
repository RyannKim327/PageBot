import { CommandProperties, commands as Command } from "../interfaces";

export default function onAddCommand(commands: CommandProperties[]) {
	return (file: string, command: Command) => {
		commands.push({
			...command,
			"file": file
		})
	}
}
