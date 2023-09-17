import { NextResponse } from "next/server";
import redis from "@/redis";
import { Message } from "postcss";
import { serverPusher } from "@/pusher";
type Data = {
  message: Message;
};
type ErrorData = {
  body: string;
};
export async function POST(
  request: Request,
  res: NextResponse<Data | ErrorData>
) {
  if (request.method !== "POST") {
    return NextResponse.json({ body: "Method not allowed" });
  }
  const message = await request.json();

  const newMessage = {
    ...message,
    created_at: Date.now(),
  };

  await redis.hset("message", message.id, JSON.stringify(newMessage));
  serverPusher.trigger("messages", "new-message", newMessage);
  return NextResponse.json({ message: message });
}
