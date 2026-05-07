import FacebookBot from "./core";

const test = FacebookBot()

test.addService("/google", (req, res) => {
	res.end("Hello")
})

test.addService("/google", (req, res) => {
	res.end("Hello")
})

test.addCommand("sfdsdf", {
	title: "ertgfdsfg",
	command: "srfgsdrfg"
})

test.addCommand("sfdsdfj6", {
	title: "erfgr",
	command: "srfgswerfwv"
})

test.addCommand("sfdsdsdfghdrhtf", {
	title: "ertgfdsfgrety4",
	command: "srfgsdrfggfhjhtf"
})

test.start()
