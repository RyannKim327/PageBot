import sendMessage from './sendMessage'

export default function handleMessage(event: any, pageAccessToken: string) {
  const senderID = event.sender.id
  const messageText = event.message.text
  sendMessage(senderID, {
    "text": `You sent with a payload: ${payload}`
  }, pageAccessToken)
}
