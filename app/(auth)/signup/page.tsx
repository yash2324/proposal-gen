import React from "react";
import RegisterForm from "./components/RegisterForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 to-orange-100  w-full flex items-center justify-center ">
      <div className="">
        <RegisterForm />
        <div className="text-sm text-center text-neutral-500 mt-5">
          Have an accout?{" "}
          <Link href={"/signin"} className="font-bold text-neutral-900">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
