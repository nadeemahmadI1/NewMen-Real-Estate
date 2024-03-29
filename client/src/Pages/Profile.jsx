import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  SignoutUserStart,
  SignoutUserFailure,
  SignoutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import Listing from "../../../api/models/listing.model";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, SetUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      } else {
        dispatch(deleteUserSuccess(data));
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(SignoutUserStart());
      const res = await fetch("/api/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignoutUserFailure(data.message));
        return;
      } else {
        dispatch(SignoutUserSuccess(data));
      }
    } catch (error) {
      dispatch(SignoutUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    // console.log('showlist');
    try {
      setShowListingError(false);
      const res = await fetch(`/api/listings/${currentUser._id}`);

      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`api/deletelisting/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);

        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
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
        {currentUser && (
          <img
            className="rounded-full h-14 w-14 mt-2 object-cover self-center"
            onClick={() => {
              fileRef.current.click();
            }}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
          />
        )}

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
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />
        <input
          className="p-3 rounded-lg border"
          type="text"
          placeholder="Email"
          id="email"
          defaultValue={currentUser?.email}
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
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-75 disabled:opacity-75"
          // onSubmit={handleSubmit}
        >
          {loading ? "Loading..." : <span className="font-bold">Update</span>}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-orange-500 p-3 rounded-lg text-center text-white uppercase font-bold hover:opacity-75"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handleDeleteUser}
          className="text-red-600 cursor-pointer hover:text-green-600 "
        >
          Delete Account
        </button>
        <span
          onClick={handleSignOut}
          className="text-red-600 cursor-pointer hover:text-green-600"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5 font-mono self-center">
        {error ? error.message : ""}
      </p>
      <p className="text-green-700 mt-5 font-mono self-center ">
        {updateSuccess ? "Updated SucessFully" : ""}
      </p>
      <button
        type="button"
        onClick={handleShowListings}
        className="text-white p-3 rounded-lg font-bold bg-purple-600 hover:opacity-90"
      >
        SHOW LISTING
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "Error in Show Listing" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col  gap-4">
          <h1 className="text-indigo-300 my-5 font-mono text-3xl text-center uppercase">
            Your Listing
          </h1>
          {userListings.map((listing) => {
            return (
              <div
                key={listing._id}
                className="border shadow-md rounded-lg  mt-3 flex  justify-between p-3 items-center hover:translate-x-1 gap-3"
              >
                <Link to={`listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing Cover"
                    className="h-16 w-16 object-cover rounded shadow-md"
                  />
                </Link>
                <Link
                  className="flex-1 text-slate-700 font-bold hover:underline truncate"
                  to={`listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-600 hover:opacity-70"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="text-pink-600 font-bold hover:opacity-70"
                  >
                    EDIT
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
