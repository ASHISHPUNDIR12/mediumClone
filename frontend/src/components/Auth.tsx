import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "@ashu777/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    if (
      !postInputs.email ||
      !postInputs.password ||
      (type === "signup" && !postInputs.name)
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setError(null);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      console.log(jwt);
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e: any) {
      if (e.response?.data?.message) {
        setError(e.response.data.message);
      } else {
        setError("Something went wrong please again");
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col  ">
      <div className="text-xl font-bold ">
        {type === "signup" ? "Create an account" : "Login"}
      </div>
      <div className="text-slate-400 pr-1">
        {type === "signup" ? "Already have an account?" : "Create an account"}
        <Link
          className="underline pl-2 "
          to={type === "signup" ? "/signin" : "/signup"}
        >
          {type === "signin" ? "signup" : "signin"}
        </Link>
      </div>

      <LabelInput
        type={"email"}
        title="Email"
        placeholder="Enter your email"
        onchange={(e) => {
          setPostInputs({
            ...postInputs,
            email: e.target.value,
          });
        }}
      />

      {type === "signup" ? (
        <LabelInput
          title="Name"
          placeholder="Enter your name"
          onchange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value,
            });
          }}
        />
      ) : null}

      <LabelInput
        type={"password"}
        title="Password"
        placeholder="********"
        onchange={(e) => {
          setPostInputs({
            ...postInputs,
            password: e.target.value,
          });
        }}
      />
      {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
      <button
        onClick={sendRequest}
        className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-10 mt-5 rounded"
      >
        {type === "signup" ? "Sign up" : "Sign in"}
      </button>
    </div>
  );
};

interface LabelledInputType {
  title: string;
  placeholder: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelInput = ({
  title,
  placeholder,
  onchange,
  type,
}: LabelledInputType) => {
  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type || "text"}
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
};
export default Auth;
