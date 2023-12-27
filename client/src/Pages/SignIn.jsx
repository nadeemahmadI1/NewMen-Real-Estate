import React from "react";

function SignIn() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <img
        className="mx-auto h-10 w-auto mt-5"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 my-7 font-mono">
        Sign-In to your account
      </h2>
      <form className="flex flex-col gap-4">
        <input
          className="border p-3 rounded-lg"
          type="email"
          placeholder="Email"
          id="email"
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
