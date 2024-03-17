"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buttonDisable, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      setLoading(false);
      console.log(data.message);
      toast.success(data.message);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className=" text-3xl font-[900] mb-7">Login</h1>
        <br />
        <form onSubmit={handleLogin}>
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
          <button type="submit" className=" bg-blue-700 p-2 w-[100%] mt-3">
            Login
          </button>
        </form>
        <div className=" mt-5">
          <p>
            Dont have an account ?{" "}
            <span className=" text-emerald-200">
              <Link href={"/signup"}>Register</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
