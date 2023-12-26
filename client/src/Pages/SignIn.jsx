import React from 'react'

function SignIn() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 font-mono">SignIn</h1>
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

export default SignIn