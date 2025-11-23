### PageBot for Facebook [Webhook integation]

#### MPOP Reverse II
 
---

### Introduction

> This project was developed and maintained by `Ryann Kim Sesgundo` under the name of `MPOP Reverse II`. As to follow the basic rules and regulations connected to this
> template, kindly read the entire documentation of this repository.

---

### Initiation

> To start, you need first to install the dependencies of this project by executing `npm install`. It automatically install all the required dependencies to the project.
> Then initiate the project into your index file like this format:

```NodeJS
// TODO: To import
const bot = require("./facebook-page/index")

// TODO: To call as object
const api = new bot()

// TODO: To run the system as webhook.
api.listen()
```

---

### addCommand(script, contents)

> This command will just simply add some commands, just add the script name saved inside `src/` folder. Also add the others stuffs. You may use the table below for other
> information about the contents.

| Key          | Datatype               |
| ------------ | ---------------------- |
| title        | string                 |
| description? | string                 |
| command      | regex [in string form] |
| hidden?      | boolean                |
| unprefix?    | boolean                |
| maintenance? | boolean                |

```NodeJS
// TODO: To import
const bot = require("./facebook-page/index")

// TODO: To call as object
const api = new bot()

// TODO: Add commands
api.addCommand("test", {
	title: "Test Command",
	command: "test ([\\w\\W]+)"
})

// TODO: To run the system as webhook.
api.listen()
```

---

### setFallback(script, contents)

> Just similar to addCommand, but this one only have one thing, which is just title

```NodeJS
// TODO: To import
const bot = require("./facebook-page/index")

// TODO: To call as object
const api = new bot()

// TODO: Add commands
api.addCommand("test", {
	title: "Test Command",
	command: "test ([\\w\\W]+)"
})

// TODO: Add Fallback
api.setFallback("ai", {
	title: "AI"
})

// TODO: To run the system as webhook.
api.listen()
```

---

### sendMessage(text: string, event: object, callback?: function)

> This is the sample format to send a message or text based message

```NodeJS
// Save as file example is: src/test.js

module.exports = (api, event, regex){
	api.sendMessage("Your message here", event)

	// OR you may also use
	api.sendMessage("Your message", event, (error, response) => {
		if(error) return console.error(error)
		console.log(response)
	})
}

```

---

### sendAttachment(fileType, fileUrl: string, event: object, callback)

> This one is somewhat similar to sendMessage, but have some twist

```NodeJS
// Save as file example is: src/test.js

module.exports = (api, event, regex){
	api.sendAttachment("audio", "https://youtube...", event)

	// OR you may also use
	api.sendAttachment("audio", "https://google...", event, (error, response) => {
		if(error) return console.error(error)
		console.log(response)
	})

	// You may also use local based like:

	api.sendAttachment("image", `${__dirname}/../assets/sample.png`, event)

}

```

---

### File Types

> Here's the list of all the valid file types for sendAttachment

1. audio
2. image
3. video

---

### Note

> For further more kndly wait for the update to create a better documentation for this template.

---

### Terms and Conditions

1. Help others, for those who want to learn, and be a better coder and/or programmer, I want you to share your knowledge, this would be a great pleasure of mine.
2. Never add and/or mention my name, from REAL ACCOUNT, up to DUMMIES, and also the HangDroid PH and MPOP Reverse II and other names associated with the MPOP Reverse II in any kind of platforms and media. Just give my name if they need help.
3. Never give me any credits, instead do the first condition.
4. Making me as anonymous is a huge help for me, not to avoid them, but to avoid popularity.
5. Thank me if you're done, or if I helped you.
