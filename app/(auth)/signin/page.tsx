import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-h-screen min-h-screen w-full my-auto flex items-center justify-center ">
      <div className="h-full my-auto">
        <LoginForm />
        <div className="text-sm text-center text-neutral-500 mt-5">
          Not have an accout?{" "}
          <Link href={"/signup"} className="font-bold text-neutral-900">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
