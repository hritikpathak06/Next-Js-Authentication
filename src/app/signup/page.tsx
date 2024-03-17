"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [buttonDisable, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });
      setLoading(false);
      console.log(data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email.length > 0 && username.length > 0 && password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, username, password]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className=" text-3xl font-[900] mb-7">
          {loading ? "Processing" : "Sign Up"}
        </h1>
        <br />
        <form onSubmit={handleSignUp}>
          <div className=" flex flex-col gap-2 mb-4">
            <label htmlFor="username">Username</label>
            <input
              className=" p-1 border-r"
              required
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className=" flex flex-col gap-2 mb-4">
            <label htmlFor="email">Email</label>
            <input
              className=" p-1 border-r"
              required
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" flex flex-col gap-2 mb-4">
            <label htmlFor="password">Password</label>
            <input
              className=" p-1 border-r"
              required
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!buttonDisable && (
            <button type="submit" className=" bg-blue-700 p-2 w-[100%] mt-3">
              Sign Up
            </button>
          )}
        </form>
        <div className=" mt-5">
          <p>
            Already have an account ?{" "}
            <span className=" text-emerald-200">
              <Link href={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
