import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="flex flex-col justify-center max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl my-5">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-14 w-14 m-2 object-cover self-center"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          className="p-3 rounded-lg broder"
          type="text"
          placeholder="UserName"
          id="username"
        />
        <input
          className="p-3 rounded-lg broder"
          type="text"
          placeholder="Email"
          id="email"
        />
        <input
          className="p-3 rounded-lg broder"
          type="text"
          placeholder="Password"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-60">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
 