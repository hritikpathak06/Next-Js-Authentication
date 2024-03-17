"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const { data } = await axios.get("/api/users/logout");
    toast.success(data.message);
    router.push("/login");
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile Page</h1>
        <hr />
        <button
          className=" bg-blue-800 p-3 w-[150px] mt-2 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfilePage;
