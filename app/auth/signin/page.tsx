import { getProviders } from "next-auth/react";
import SigninComponent from "@/components/SigninComponent";
import Image from "next/image";
const SignInPage = async () => {
  const providers = await getProviders();
  return (
    <div className="grid justify-center">
      <SigninComponent providers={providers} />
    </div>
  );
};

export default SignInPage;
