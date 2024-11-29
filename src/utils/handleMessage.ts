import sendMessage from "./sendMessage";

export default function handleMessage(event: any, pageAccessToken: string) {
  const senderID: string = event.sender.id;
  const messageText: string = event.message.text;
  sendMessage(
    senderID,
    {
      text: `You sent with a payload: `,
    },
    pageAccessToken,
  );
}
