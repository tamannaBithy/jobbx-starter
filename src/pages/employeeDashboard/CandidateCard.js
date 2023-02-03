import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useApproveStatusMutation } from "../../features/job/jobApi";

const CandidateCard = () => {
  const location = useLocation();

  const { applicants, _id } = location?.state || {};

  const [approve] = useApproveStatusMutation();

  const handleApprove = (id) => {
    approve({ id, _id });
  };

  return (
    <div className="grid grid-cols-3 gap-5 my-4">
      {applicants?.map(({ name, email, id, status }) => (
        <div
          key={id}
          className="border border-gray-300 shadow-xl p-5 rounded-2xl text-primary "
        >
          <div className="flex justify-between  text-primary">
            <div>
              <p className="text-xl">{name}</p>
              <small className="text-primary/70 ">
                Email :{" "}
                <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
                  {email}
                </span>
              </small>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <Link to={`/candidate/${id}`}>
              <button className="btn">See more</button>
            </Link>

            {status === "pending" && (
              <button onClick={() => handleApprove(id)} className="btn">
                Approve
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateCard;
