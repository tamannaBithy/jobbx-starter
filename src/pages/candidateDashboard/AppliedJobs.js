import React, { useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import {
  useGetAppliedJobsQuery,
  useGetApprovedJobQuery,
} from "../../features/job/jobApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);
  // console.log(data);

  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const formatStartDate = moment(startDate).format("MMMM Do YYYY");

  const activeClass = "text-white bg-indigo-500 border-white";

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = (data) => {
    if (!status.includes(data)) {
      setStatus(data);
    } else {
      setStatus("");
    }
  };

  // const {data:approvedStatus} = useGetApprovedJobQuery()

  return (
    <div>
      <h1 className="text-xl py-5">Applied jobs</h1>

      <div className="mb-10 flex justify-end">
        <div className="flex flex-col gap-1 w-full lg:w-1/3">
          <label>Applied Date:</label>
          <DatePicker
            className="input-bordered bg-white input border   w-full lg:w-auto border-l-4 border-primary focus:border-primary focus:ring-primary border-l-purple-500  max-w-xs text-black flex"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            minDate={new Date()}
            dateFormat="EEE, dd/MM/yy"
          />
        </div>

        <div>
          <button
            className={`border px-3 py-2 rounded-full font-semibold ${
              status ? activeClass : null
            } `}
            onClick={() => handleClick("approved")}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 pb-5">
        {data?.data?.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
