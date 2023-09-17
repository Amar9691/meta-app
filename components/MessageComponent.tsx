import { Message } from "@/typing";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ListSeen from "@/components/LastSeen";
type Props = {
  message: Message;
};

const MessageComponent = async ({ message }: Props) => {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          src={message.profilePic}
          alt="profile picture"
          width={50}
          height={10}
          className="rounded-full mx-2"
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] pb-[2px] px-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          } `}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit ${
              isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            } text-white`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={`text-[0.65rem] italic px-2 ${
              isUser && "text-right"
            } text-gray-300`}
          >
            <ListSeen date={new Date(message.created_at)} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
