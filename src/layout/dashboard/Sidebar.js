import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const {
    user: { role, firstName, lastName, email },
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employerRoutes = [
    {
      name: "Add Job",
      route: "add-job",
    },
    {
      name: "Job List",
      route: "employer",
    },
    {
      name: "Direct Message",
      route: "direct-message",
    },
  ];

  const candidateRoutes = [
    {
      name: "Applied Jobs",
      route: "applied-jobs",
    },
    {
      name: "Direct Message",
      route: "direct-message",
    },
  ];

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="sticky top-0 col-span-2 flex h-screen flex-col justify-between bg-primary/10">
      <ul className="flex h-full w-full flex-col gap-2  p-3">
        <div className="my-1 flex items-center justify-between text-primary">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className="text-xl">Dashboard</h1>
        </div>

        {role === "employer" &&
          employerRoutes.map(({ name, route }) => (
            <li>
              <Link
                className="block w-full rounded-full bg-primary/10 py-2 px-3 transition-all hover:bg-primary hover:text-white"
                to={route}
              >
                {name}
              </Link>
            </li>
          ))}

        {role === "candidate" &&
          candidateRoutes.map(({ name, route }) => (
            <li>
              <Link
                className="block w-full rounded-full bg-primary/10 py-2 px-3 transition-all hover:bg-primary hover:text-white"
                to={route}
              >
                {name}
              </Link>
            </li>
          ))}
      </ul>

      <div className="mb-4 flex items-center justify-between gap-2 p-2">
        <div className="">
          <h2 className="text-md font-semibold">
            {firstName + " " + lastName}
          </h2>
          <p className="text-xs text-gray-400">{email}</p>
        </div>
        <button
          title="LogOut"
          className="rounded-full border border-primary bg-primary/10 p-3 text-primary duration-200 hover:bg-primary hover:text-white active:scale-95"
          onClick={handleLogOut}
        >
          <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
