import { Message } from "@/typing";
import { NextResponse } from "next/server";
import redis from "@/redis";

type ErrorData = {
  body: string;
};

type Data = {
  message: Message[];
};

export async function GET(request: Request) {
  if (request.method != "GET") {
    return NextResponse.json({ body: "Method not allowed" });
  }

  const messagesRes = await redis.hvals("message");

  const messages: Message[] = messagesRes
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);

  return NextResponse.json({
    message: messages,
  });
}
