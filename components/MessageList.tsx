"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcherMessages";
import MessageComponent from "./MessageComponent";
import { useEffect } from "react";
import { clientPusher } from "@/pusher";
import { Message } from "@/typing";
import { useSession } from "next-auth/react";

type Props = {
  initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
  const { data: session } = useSession();
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate]);

  if (session?.user) {
    return (
      <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl lg:max-w-4xl mx-auto">
        {(messages || initialMessages).map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>
    );
  }
};

export default MessageList;
