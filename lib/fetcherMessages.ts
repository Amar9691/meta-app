import { Message } from "@/typing";

const fetcher = async () => {
  const res = await fetch("/api/getMessages");
  const data = await res.json();
  const messages: Message[] = data.message;
  return messages;
};

export default fetcher;
