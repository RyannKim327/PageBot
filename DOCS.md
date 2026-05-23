### Facebook Page Bot Framework Documentation
#### MPOP Reverse II (Ryann Kim Sesgundo)

> Documentation by Qodo.ai

### Template Reference

> **Clear Template Copy**: This project is based on the template available at: https://github.com/RyannKim327/FBPage-Bot-Api
> 
> Please refer to the original template repository for additional examples, updates, and community contributions.

### 📁 **facebook-page/** Directory

This directory contains the core Facebook Messenger bot framework implementation, providing a complete webhook-based chatbot system with modular command architecture.
 
---

### 📋 **Table of Contents**

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Core Class: FacebookPage](#core-class-facebookpage)
4. [Constructor & Initialization](#constructor--initialization)
5. [Public Methods](#public-methods)
   - [Configuration Methods](#configuration-methods)
   - [Command Management](#command-management)
   - [Admin Management](#admin-management)
   - [File Management](#file-management)
   - [Messaging Methods](#messaging-methods)
   - [Utility Methods](#utility-methods)
   - [Server Management](#server-management)
6. [Private Methods](#private-methods)
   - [Message Processing](#message-processing)
   - [Communication](#communication)
7. [Configuration](#configuration)
   - [Required Environment Variables](#required-environment-variables)
   - [Facebook Developer Setup](#facebook-developer-setup)
   - [Webhook Endpoints](#webhook-endpoints)
8. [Usage Examples](#usage-examples)
   - [Basic Bot Setup](#basic-bot-setup)
   - [Advanced Setup with Custom Routes](#advanced-setup-with-custom-routes)
   - [Command Implementation Example](#command-implementation-example)
9. [Error Handling](#error-handling)
   - [Common Error Scenarios](#common-error-scenarios)
   - [Error Handling Patterns](#error-handling-patterns)
   - [Validation Checks](#validation-checks)
10. [Best Practices](#best-practices)
    - [Security](#security)
    - [Performance](#performance)
    - [Development](#development)
    - [Maintenance](#maintenance)
11. [Related Files](#related-files)
12. [Notes](#notes)

---

### 🎯 **Overview**

The `facebook-page` directory implements a sophisticated Facebook Messenger bot framework using Object-Oriented Programming principles. It provides:

- **Webhook Integration**: Complete Facebook Messenger webhook handling
- **Command System**: Modular, regex-based command processing
- **File Management**: Static file serving and temporary file handling
- **Admin System**: Administrative user management
- **Fallback Mechanism**: AI-powered responses for unmatched commands
- **Message Chunking**: Automatic long message splitting

---

### 📂 **File Structure**

```
facebook-page/
├── index.js          # Main FacebookPage class implementation
└── web/
    └── index.html     # Landing page for the bot service
```

#### **Files Description**

- **`index.js`**: Core bot engine containing the `FacebookPage` class
- **`web/index.html`**: Static landing page served at the root endpoint

---

### 🏗️ **Core Class: FacebookPage**

The `FacebookPage` class is the heart of the bot framework, implementing all core functionality through a clean OOP interface.

#### **Class Features**
- Express.js web server integration
- Facebook Graph API communication
- Command registration and processing
- File attachment handling
- Admin notification system
- Automatic help generation

---

### ⚙️ **Constructor & Initialization**

```javascript
import bot from "./facebook-page/index.js";
const api = new bot();
```

#### **Environment Variables Required**
- `FB_TOKEN`: Facebook Page Access Token
- `KEY_TOKEN`: Webhook verification token (default: "pagebot")
- `PORT`: Server port (default: 3000)

#### **Automatic Setup**
- Express.js server configuration
- Static file serving for `/assets` and `/temp`
- Temporary directory management
- JSON middleware setup

---

### 🔧 **Public Methods**

#### **Configuration Methods**

##### `setPrefix(prefix: string)`
Sets the command prefix for the bot.
```javascript
api.setPrefix(":");  // Commands will use : prefix
```

##### `setAssistant(name: string)`
Sets the bot's assistant name.
```javascript
api.setAssistant("AI Haibara");
```

##### `setWebhook(webhook: string)`
Configures the webhook endpoint path.
```javascript
api.setWebhook("/webhook");
```

##### `setAssetsFolder(assets: string)`
Sets the assets folder path.
```javascript
api.setAssetsFolder("/assets");
```

##### `setTemporaryFolder(temp: string)`
Sets the temporary files folder path.
```javascript
api.setTemporaryFolder("/temp");
```

#### **Command Management**

##### `addCommand(script: string, command: object)`
Registers a new command with the bot.

**Parameters:**
- `script`: Filename in `/src` directory (without .js extension)
- `command`: Command configuration object

**Command Object Properties:**
```javascript
{
  title: string,           // Command display name
  command: string,         // Regex pattern for matching
  description?: string,    // Optional description
  hidden?: boolean,        // Hide from help command
  unprefix?: boolean,      // Don't require prefix
  maintenance?: boolean,   // Mark as under maintenance
  any?: boolean           // Match anywhere in text
}
```

**Example:**
```javascript
api.addCommand("music", {
  title: "Music Player",
  description: "Download and play music from YouTube",
  command: "music ([\\w\\W]+)"
});
```

##### `setFallback(script: string, command: object)`
Sets a fallback command for unmatched inputs.
```javascript
api.setFallback("gpt", {
  title: "AI Assistant"
});
```

#### **Admin Management**

##### `addAdmin(adminID: string)`
Adds a user ID to the admin list.
```javascript
api.addAdmin("1234567890");
```

#### **File Management**

##### `addPublicFolder(folder: string)`
Exposes a folder as a public static directory.
```javascript
api.addPublicFolder("web/web-assets");
```

#### **Messaging Methods**

##### `sendMessage(message: string|object, event: object, callback?: function)`
Sends a text message to the user.

**Parameters:**
- `message`: Text string or message object
- `event`: Facebook event object
- `callback`: Optional callback function

**Features:**
- Automatic message chunking for long texts (>300 words)
- 1.5-second delay between chunks
- Error handling with callbacks

**Example:**
```javascript
api.sendMessage("Hello, World!", event, (error, response) => {
  if (error) console.error(error);
  else console.log("Message sent successfully");
});
```

##### `sendAttachment(fileType: string, fileUrl: string, event: object, callback?: function)`
Sends file attachments to users.

**Supported File Types:**
- `audio`: Audio files (audio/mpeg)
- `image`: Image files (image/png)
- `video`: Video files (video/mp4)

**File Sources:**
- **Remote URLs**: Direct HTTP/HTTPS links
- **Local Files**: Files from assets or temp directories

**Example:**
```javascript
// Remote file
api.sendAttachment("image", "https://example.com/image.jpg", event);

// Local file
api.sendAttachment("audio", "/assets/music.mp3", event);
```

##### `sendToAdmin(message: string|object, callback?: function)`
Sends messages to all registered admins.
```javascript
api.sendToAdmin("New user registered: " + event.sender.id);
```

#### **Utility Methods**

##### `getAssistant(): string`
Returns the current assistant name.
```javascript
const assistantName = api.getAssistant();
```

#### **Server Management**

##### `listen(callback?: function)`
Starts the Express.js server and webhook endpoints.

**Callback Parameter:**
The callback receives the Express app instance for custom route registration.

**Example:**
```javascript
api.listen((app) => {
  // Add custom routes
  app.get("/custom", (req, res) => {
    res.send("Custom endpoint");
  });
});
```

---

### 🔒 **Private Methods**

#### **Message Processing**

##### `#processhandler(event: object)`
Core message processing logic that:
1. Checks for built-in help command
2. Iterates through registered commands
3. Executes matching command scripts
4. Falls back to fallback handler if no match

##### `#regex(command: string, unpref: boolean, any: boolean)`
Converts command strings to regex patterns with prefix handling.

##### `#help(event: object)`
Generates and sends automatic help messages listing all available commands.

#### **Communication**

##### `#sendMessage(text: string, event: object, callback?: function)`
Low-level message sending to Facebook Graph API.

##### `#postback(event: object)`
Handles Facebook postback events (currently basic implementation).

---

### 🔧 **Configuration**

#### **Required Environment Variables**

```bash
# Facebook Page Access Token
FB_TOKEN=your_facebook_page_token

# Webhook verification token
KEY_TOKEN=your_verification_token

# Server port (optional)
PORT=3000
```

#### **Facebook Developer Setup**

1. Create a Facebook App at [developers.facebook.com](https://developers.facebook.com)
2. Add Messenger product to your app
3. Generate a Page Access Token
4. Configure webhook URL: `https://yourdomain.com/webhook`
5. Set webhook verification token
6. Subscribe to `messages` and `messaging_postbacks` events

#### **Webhook Endpoints**

- **GET `/webhook`**: Webhook verification endpoint
- **POST `/webhook`**: Message processing endpoint
- **GET `/`**: Landing page
- **Static Routes**: `/assets/*`, `/temp/*`, custom public folders

---

### 💡 **Usage Examples**

#### **Basic Bot Setup**
```javascript
import bot from "./facebook-page/index.js";
const api = new bot();

// Configure bot
api.setPrefix("!");
api.setAssistant("MyBot");

// Add admin
api.addAdmin("1234567890");

// Register commands
api.addCommand("hello", {
  title: "Hello Command",
  command: "hello"
});

// Set fallback
api.setFallback("ai", {
  title: "AI Assistant"
});

// Start server
api.listen();
```

#### **Advanced Setup with Custom Routes**
```javascript
api.listen((app) => {
  // Custom API endpoint
  app.get("/api/stats", (req, res) => {
    res.json({ users: 100, commands: 50 });
  });
  
  // File download endpoint
  app.get("/download/:file", (req, res) => {
    res.download(`./files/${req.params.file}`);
  });
});
```

#### **Command Implementation Example**
```javascript
// src/hello.js
export default (api, event, regex) => {
  const match = event.message.text.match(regex);
  api.sendMessage(`Hello! You said: ${match[0]}`, event);
};
```

---

### ⚠️ **Error Handling**

#### **Common Error Scenarios**

1. **Missing FB_TOKEN**: Bot will not start, all message operations fail
2. **Invalid Command Script**: Command registration fails, `start` flag set to false
3. **File Not Found**: Attachment sending fails with error callback
4. **Network Issues**: Facebook API calls may timeout or fail

#### **Error Handling Patterns**

```javascript
// With callback error handling
api.sendMessage("Hello", event, (error, response) => {
  if (error) {
    console.error("Failed to send message:", error);
    // Handle error (retry, log, notify admin)
  } else {
    console.log("Message sent successfully");
  }
});

// Command registration error handling
api.addCommand("invalid", {
  title: "Test"
  // Missing 'command' property - will log error and set start=false
});
```

#### **Validation Checks**

- Token existence validation
- Event object type checking
- File existence verification
- Command configuration validation

---

### 📋 **Best Practices**

#### **Security**
- Store tokens in environment variables
- Validate webhook verification tokens
- Sanitize user inputs in command scripts
- Implement rate limiting for production use

#### **Performance**
- Use callbacks for non-blocking operations
- Implement proper error handling
- Clean up temporary files regularly
- Monitor memory usage with conversation storage

#### **Development**
- Test commands thoroughly before deployment
- Use descriptive command titles and descriptions
- Implement proper logging
- Follow consistent error handling patterns

#### **Maintenance**
- Regular token rotation
- Monitor Facebook API changes
- Update dependencies regularly
- Backup conversation data

---

### 🔗 **Related Files**

- **`/src/*`**: Command implementation scripts
- **`/index.js`**: Main bot configuration and startup
- **`/package.json`**: Dependencies and project metadata
- **`/.env`**: Environment variables configuration

---

### 📝 **Notes**

- The framework uses Facebook Graph API v23.0
- Message chunking occurs at 300 words with 250-word chunks
- Temporary files are automatically cleaned on startup
- The bot supports both prefixed and unprefixed commands
- Admin notifications are sent for important events

---

**Developer**: Ryann Kim Sesgundo [MPOP Reverse II]  
**License**: MIT  
**Version**: 0.1.5
