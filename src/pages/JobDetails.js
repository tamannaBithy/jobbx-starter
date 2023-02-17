import React from "react";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import {
  useApplyJobMutation,
  useGetAppliedJobsQuery,
  useJobByIdQuery,
  useQuestionMutation,
  useReplyMutation,
} from "../features/job/jobApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import moment from "moment";
import { useCreateMessageMutation } from "../features/chat/chatApi";

const JobDetails = () => {
  const [reply, setReply] = useState("");
  const { id } = useParams();
  const { data, isLoading, isError } = useJobByIdQuery(id, {
    // pollingInterval: 1000,
  });
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();

  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    _id,
    postBy,
  } = data?.data || {};

  console.log(data);

  const [apply] = useApplyJobMutation();
  const [sendQuestion] = useQuestionMutation();
  const [sendReply] = useReplyMutation();
  const { data: appliedInfo } = useGetAppliedJobsQuery(user?.email);
  const filteredData = appliedInfo?.data?.filter((item) => item._id === _id);
  const [createMessage] = useCreateMessageMutation();

  const today = moment(new Date()).format("MMMM Do YYYY");

  const handleApply = () => {
    if (user?.role === "employer") {
      toast.error("you need a candidate acc");
      return;
    }

    if (user?.role === "") {
      navigate("/register");
      return;
    }

    if (filteredData?.length > 0) {
      toast.error("you have already applied for this job");
      return;
    }

    const data = {
      userId: user?._id,
      email: user?.email,
      name: user?.firstName + " " + user?.lastName,
      jobId: _id,
      status: "pending",
      appliedDate: today,
    };

    apply(data);

    const members = [
      { name: user?.firstName + " " + user?.lastName, email: user?.email },
      { name: postBy?.name, email: postBy?.email },
    ];

    createMessage(members);
  };

  const handleQuestion = (data) => {
    const quesData = {
      ...data,
      userId: user?._id,
      email: user?.email,
      jobId: _id,
    };
    sendQuestion(quesData);
    reset();
  };

  const handleReply = (id) => {
    const data = {
      reply,
      userId: id,
    };
    sendReply(data);
  };

  return (
    <div className="grid grid-cols-12 gap-5 pt-14">
      <div className="col-span-9 mb-10">
        <div className="h-80 overflow-hidden rounded-xl">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>
        <div className="space-y-5">
          <div className="mt-5 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            <button onClick={handleApply} className="btn">
              Apply
            </button>
          </div>
          <div>
            <h1 className="mb-3 text-lg font-medium text-primary">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="mb-3 text-lg font-medium text-primary">Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="mb-3 text-lg font-medium text-primary">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="mb-3 text-lg font-medium text-primary">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            <h1 className="mb-5 text-xl font-semibold text-primary">
              General Q&A
            </h1>
            <div className="my-2 text-primary">
              {queries?.map(({ question, email, reply, id }) => (
                <div key={id}>
                  <small>{email}</small>
                  <p className="text-lg font-medium">{question}</p>
                  {reply?.map((item) => (
                    <p className="relative left-5 flex items-center gap-2">
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {user?.role === "employer" && (
                    <div className="my-5 flex gap-3">
                      <input
                        placeholder="Reply"
                        type="text"
                        className="w-full"
                        onBlur={(e) => setReply(e.target.value)}
                      />
                      <button
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-primary bg-primary/10  text-primary transition-all hover:bg-primary hover:text-white"
                        type="button"
                        onClick={() => handleReply(id)}
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {user?.role === "candidate" && (
              <form onSubmit={handleSubmit(handleQuestion)}>
                <div className="my-5 flex gap-3">
                  <input
                    placeholder="Ask a question..."
                    type="text"
                    className="w-full"
                    {...register("question")}
                  />
                  <button
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-primary bg-primary/10  text-primary transition-all hover:bg-primary hover:text-white"
                    type="submit"
                  >
                    <BsArrowRightShort size={30} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="space-y-5 rounded-xl bg-primary/10 p-5 text-primary">
          <div>
            <p>Experience</p>
            <h1 className="text-lg font-semibold">{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className="text-lg font-semibold">{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className="text-lg font-semibold">{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className="text-lg font-semibold">{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className="text-lg font-semibold">{location}</h1>
          </div>
        </div>
        <div className="mt-5 space-y-5 rounded-xl bg-primary/10 p-5 text-primary">
          <div>
            <h1 className="text-lg font-semibold">{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className="text-lg font-semibold">Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className="text-lg font-semibold">2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className="text-lg font-semibold">company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className="text-lg font-semibold">Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className="text-lg font-semibold" href="#">
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
