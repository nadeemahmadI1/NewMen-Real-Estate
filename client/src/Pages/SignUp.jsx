import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <img
        className="mx-auto h-10 w-auto mt-5"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 my-7">
        SignUp to your account
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="username"
          id="username"
          required
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg"
          type="email"
          placeholder="email"
          id="email"
          required
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
          required
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
          type="submit"
        >
          {loading ? "Loading...." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-red-500">Already have an Account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>}
    </div>
  );
}

export default SignUp;
