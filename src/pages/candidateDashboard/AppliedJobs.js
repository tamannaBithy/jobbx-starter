import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import {
  useGetAppliedJobsQuery,
  useGetApprovedJobQuery,
  useGetJobByDateQuery,
} from "../../features/job/jobApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);
  const [startDate, setStartDate] = useState();
  const [status, setStatus] = useState("");
  const { data: approvedJobs } = useGetApprovedJobQuery({ email, status });
  const formatStartDate = moment(startDate).format("MMMM Do YYYY");
  const { data: filterByDateJobs } = useGetJobByDateQuery({
    email,
    appliedDate: formatStartDate,
  });

  const activeClass = "text-white bg-purple-500 border-white";

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

  let content;

  if (data?.data?.length > 0) {
    content = data?.data?.map((job) => <JobCard jobData={job} />);
  }

  if (status) {
    content = approvedJobs?.data?.map((job) => <JobCard jobData={job} />);
  }

  if (startDate) {
    if (filterByDateJobs?.data?.length > 0) {
      content = filterByDateJobs?.data?.map((job) => <JobCard jobData={job} />);
    } else {
      content = <h1>No jobs found on that day. Search again.</h1>;
    }
  }

  return (
    <div>
      <h1 className="text-xl py-5">Applied jobs</h1>
      <div className="mb-10 flex justify-end">
        <div className="flex flex-col gap-1 w-full lg:w-1/3">
          <label>Applied Date:</label>
          <DatePicker
            className="input-bordered bg-white input border   w-full lg:w-auto border-l-4 border-primary focus:border-primary focus:ring-primary border-l-purple-500  max-w-xs text-black flex"
            placeholderText={moment(new Date()).format("DD/MM/yy")}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            dateFormat="dd/MM/yy"
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

      <div className="grid grid-cols-2 gap-5 pb-5">{content}</div>
    </div>
  );
};

export default AppliedJobs;
