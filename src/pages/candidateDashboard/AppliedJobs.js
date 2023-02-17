import React, { useState } from "react";
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

  const activeClass =
    "px-6 py-3 border border-primary  rounded-full bg-primary text-white";

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
      <h1 className=" py-5 text-xl">Applied jobs</h1>

      <div>
        <div className="mb-10 flex  items-center justify-end">
          <div>
            <label>Applied Date:</label>
            <div className="items-center gap-10 space-y-2 md:flex md:space-y-0">
              <DatePicker
                className="input-bordered input flex w-full   max-w-xs border border-l-4 border-primary border-l-purple-500 bg-white text-black  focus:border-primary focus:ring-primary lg:w-auto"
                placeholderText={moment(new Date()).format("DD/MM/yy")}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                dateFormat="dd/MM/yy"
              />

              <button
                className={` ${status ? activeClass : "btn"} `}
                onClick={() => handleClick("approved")}
              >
                Approved
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 pb-5">{content}</div>
    </div>
  );
};

export default AppliedJobs;
