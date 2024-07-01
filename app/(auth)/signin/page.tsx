import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="">
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
