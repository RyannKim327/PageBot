import http from "http"
import SmeeClient from "smee-client"
import { server } from "./interfaces"

export default function Server(func: server) {
	const key = process.env.FB_KEY ?? "pagebot"
	let webhook = process.env.WEBHOOK ?? "/webhook"

	const PORT = process.env.PORT ?? 3000

	if (!webhook.startsWith("/")) {
		webhook = `/${webhook}`
	}

	const server = http.createServer((req, res) => {
		if (!req.url) req.url = "/"

		// TODO: To separate URL with parameters
		const url = req.url.split("?")[0]

		res.setHeader("X-Developed-By", "MPOP Reverse II")

		if (url === webhook) {
			// TODO: To create an actual webhook control inside
			const host = req.headers.host ?? ""
			const url = new URL(req.url ?? "", `http://${host}`);

			if (req.method === 'POST') {
				let body = ''

				req.on("data", chunk => {
					body += chunk.toString()
				})

				req.on("end", () => {
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
							"error": "Invalid Parameter Value"
						}))
					}
				} else {
					res.statusCode = 400;
					res.end(JSON.stringify({
						"error": "Invalid Parameters"
					}))
				}
			} else {
				res.end(JSON.stringify({
					"error": "Invalid Method"
				}))
			}
			return
		}

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
