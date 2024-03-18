import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../FireBase";
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, SetUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  // console.log(formData)
  // console.log(filePerc);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Progress listener
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        // console.log(`Uploaded ${progress}%`);
      },
      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            avatar: downloadURL,
          });
        });
      }
    );
  };
  // console.log(file);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    // console.log(formData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userUpdateStart());
      const res = await fetch(`/api/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(userUpdateFailure(data.message));
      } else {
        dispatch(userUpdateSuccess(data));
        SetUpdateSuccess(true);
         setTimeout(() => {
           SetUpdateSuccess(false);
         }, 5000);
      }
    } catch (error) {
      dispatch(userUpdateFailure(error.message));
    }
  };
  return (
    <div className="flex flex-col justify-center max-w-lg mx-auto p-3">
      <h1 className="text-center text-3xl mt-10 font-mono">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          className="rounded-full h-14 w-14 mt-2 object-cover self-center"
          onClick={() => {
            fileRef.current.click();
          }}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />

        <p className="self-center">
          {fileUploadError ? (
            <span className="text-red-500">
              Error Image Upload ! Image Must be LessThan 2 MB{" "}
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-yellow-600">
              {`Uploading...${filePerc}%`}
            </span>
          ) : filePerc == 100 ? (
            <span className="text-green-700">{`Successfully Uploaded`}</span>
          ) : null}
        </p>

        <input
          className="p-3 rounded-lg broder"
          type="text"
          placeholder="UserName"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          className="p-3 rounded-lg border"
          type="text"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          className="p-3 rounded-lg broder"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-60"
          // onSubmit={handleSubmit}
        >
        {loading?'Loading...': 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-600 cursor-pointer ">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5 font-mono self-center">{error ? error :''}</p>
      <p className="text-green-700 mt-5 font-mono self-center ">{updateSuccess ? 'Updated SucessFully' :''}</p>
    </div>
  );
}

export default Profile;
