"use client";
import { Message } from "@/typing";
import { useState } from "react";
import { FormEvent } from "react";
import { v4 as uuid } from "uuid";
import useSWR from "swr";
import fetcher from "@/lib/fetcherMessages";
import { useSession } from "next-auth/react";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  const { data: session } = useSession();
  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const messageToSend = input;
    setInput("");
    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash(), {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  if (session?.user) {
    return (
      <form
        onSubmit={addMessage}
        className="fixed bg-white bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type message....."
          className="flex-1 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!input}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          send
        </button>
      </form>
    );
  }
};

export default ChatInput;
