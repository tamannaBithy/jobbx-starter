import React from "react";
import { useParams } from "react-router-dom";
import { useGetCandidateByIdQuery } from "../../features/job/jobApi";
import profileCoverImg from "../../assets/profileCoverImg.jpg";
import manualRegUserImg from "../../assets/manualRegUserImg.png";

const CandidateDetails = () => {
  const { id } = useParams();

  const { data } = useGetCandidateByIdQuery(id);
  console.log(data);

  const {
    firstName,
    lastName,
    email,
    role,
    gender,
    address,
    city,
    country,
    postcode,
  } = data?.data || {};

  return (
    <div class="py-20 flex flex-wrap items-center justify-center">
      <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3  m-4 md:m-0  bg-white  shadow-lg    transform   duration-200 easy-in-out">
        <div class="h-32 overflow-hidden">
          <img class="w-full" src={profileCoverImg} alt="" />
        </div>
        <div class="flex justify-center px-5  -mt-12">
          <img
            class="h-32 w-32 bg-white p-2 rounded-full"
            src={manualRegUserImg}
            alt=""
          />
        </div>
        <div class=" ">
          <div class="text-center px-14">
            <h2 class="text-gray-800 text-3xl font-bold">
              {firstName + " " + lastName}
            </h2>
            <p class="text-gray-400 mt-2 hover:text-blue-500">{email}</p>

            <p class="mt-2 text-gray-500 text-sm">
              {address + " , " + city + "-" + postcode + " , " + country}
            </p>
          </div>
          <hr class="mt-6" />
          <div class="flex  bg-gray-50 ">
            <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p class="font-semibold">{gender}</p>
            </div>
            <div class="border"></div>
            <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p class="font-semibold">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
