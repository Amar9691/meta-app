"use client";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src={`${session.user?.image}`}
            width={50}
            height={10}
            alt="Profile picture"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.email}</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );
  } else {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex space-x-2 items-center">
            <Image
              className="rounded-full mx-2 object-contain"
              src="https://links.papareact.com/jne"
              width={50}
              height={10}
              alt="logo"
            />
            <p className="text-blue-400">Welcome to Meta Messenger</p>
          </div>
          <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in
          </button>
        </div>
      </header>
    );
  }
};

export default Header;
