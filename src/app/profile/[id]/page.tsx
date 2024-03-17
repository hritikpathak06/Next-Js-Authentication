import React from "react";

const ProfileDetails = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-4xl">
        Profile Details
        <span className=" p-2 rounded bg-orange-600 text-black ml-3">
          {params.id}
        </span>
      </h1>
    </div>
  );
};

export default ProfileDetails;
