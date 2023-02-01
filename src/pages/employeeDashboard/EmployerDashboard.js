import React from "react";
import { useSelector } from "react-redux";
import {
  useCloseJobMutation,
  usePostedJobByIdQuery,
} from "../../features/job/jobApi";
import { MdWorkOutline } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = usePostedJobByIdQuery(user?._id);
  const [closeJob] = useCloseJobMutation();
  // console.log(data);

  const handleClose = (_id) => {
    closeJob({ jobId: _id });
  };

  return (
    <div className="pt-2">
      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-lg">
        <div className="font-bold gap-2 h-16 text-lg p-2 rounded-t-md flex items-center bg-gradient-to-r from-[#9942a7] to-[#cca8d1] text-white">
          <MdWorkOutline size={20} />
          All Jobs
        </div>

        <div className="overflow-x-auto p-3">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-xs font-bold uppercase text-black">
              <tr>
                <th className="p-2">
                  <div className="text-left font-semibold">Position Name</div>
                </th>
                <th className="p-2">
                  <div className="text-left font-semibold">
                    Total Applicants
                  </div>
                </th>

                <th className="p-2">
                  <div className="text-left font-semibold">
                    Applicants Details
                  </div>
                </th>

                <th className="p-2">
                  <div className="text-center font-semibold">Action</div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {data?.data
                ?.filter((item) => item?.jobStatus !== "closed")
                ?.map(({ position, applicants, _id }) => (
                  <tr
                    key={_id}
                    className="hover:bg-indigo-50 transition rounded-md cursor-pointer"
                  >
                    <td className="p-2">
                      <div className="text-black font-bold">{position}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left capitalize">
                        {applicants?.length}
                      </div>
                    </td>

                    <td className="p-2 hover:text-primary">
                      <Link
                        to="/dashboard/candidate-card"
                        state={{ applicants }}
                        className="flex items-center space-x-2"
                      >
                        {" "}
                        <p>Go to Details Page</p>
                        <RiSendPlaneFill size={16} />
                      </Link>
                    </td>

                    <td
                      className="p-2 flex justify-center items-center space-x-3 hover:text-primary"
                      onClick={() => handleClose(_id)}
                    >
                      <AiOutlineCloseCircle
                        size={23}
                        className="h-8 w-8 rounded-full p-1"
                      />
                      <p>Close this job</p>
                    </td>

                    {/* <td className="p-2 flex justify-center items-center space-x-3">
                      {!categories && (
                        <Link to={`hotel/${_id}`}>
                          <AiFillEdit
                            size={23}
                            className="h-8 w-8 rounded-full p-1 hover:bg-white hover:text-blue-600"
                          />
                        </Link>
                      )}

                      <DeleteHotel id={_id} />
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
