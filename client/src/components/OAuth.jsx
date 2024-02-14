import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../FireBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
      //   next(error);
    }
  };
  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-70"
      >
        Continue With Google
      </button>
    </>
  );
}

export default OAuth;
