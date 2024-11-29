import sendMessage from "./sendMessage";

export default function handlePostback(event: any, pageAccessToken: string) {
  const senderID: string = event.sender.id;
  const payload: string = event.postback.payload;

  sendMessage(
    senderID,
    {
      text: `You sent with a payload: ${payload}`,
    },
    pageAccessToken,
  );
}
