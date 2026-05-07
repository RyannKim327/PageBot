import http, { IncomingMessage, ServerResponse } from "http"
import SmeeClient from "smee-client"

type serverContent = (req: IncomingMessage, res: ServerResponse) => void

type server = Record<string, serverContent>

export default function Server(func: server) {
	const PORT = process.env.PORT ?? 3000

	const server = http.createServer((req, res) => {
		if (!req.url) req.url = "/"

		const url = req.url.split("?")[0]

		res.setHeader("X-Developed-By", "MPOP Reverse II")

		const handler = Object.keys(func).includes(url) ? func[url] : func["/404"]
		handler(req, res)
	})

	server.listen(PORT, () => {
		console.log(`Now working with port ${PORT}`)

		if (process.env.WEBHOOK_PROXY_URL) {
			console.log("Activation of web proxy")

			const smee = new SmeeClient({
				source: process.env.WEBHOOK_PROXY_URL,
				target: `http://localhost:${PORT}`,
				logger: console
			})

			const events = smee.start()

		}
	})
}
