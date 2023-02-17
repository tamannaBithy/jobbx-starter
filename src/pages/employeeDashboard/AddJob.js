import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";
import { usePostJobMutation } from "../../features/job/jobApi";

const AddJob = () => {
  const { handleSubmit, register, control } = useForm();
  const [postJob, { isError, isLoading, errorMessage }] = usePostJobMutation();
  const {
    user: { _id, email, firstName, lastName },
  } = useSelector((state) => state.auth);

  const {
    fields: resFields,
    append: resAppend,
    remove: resRemove,
  } = useFieldArray({ control, name: "responsibilities" });
  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({ control, name: "skills" });
  const {
    fields: reqFields,
    append: reqAppend,
    remove: reqRemove,
  } = useFieldArray({ control, name: "requirements" });

  const onSubmit = (data) => {
    postJob({
      ...data,
      applicants: [],
      queries: [],
      userId: _id,
      postBy: { _id, email, name: firstName + " " + lastName },
    });
  };

  return (
    <div className="flex items-center justify-center overflow-auto p-10">
      <form
        className="flex max-w-3xl flex-wrap justify-between gap-3 rounded-2xl bg-secondary/20 p-10 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 w-full text-2xl text-primary">
          Add a new position
        </h1>
        <div className="flex w-full max-w-xs flex-col">
          <label className="mb-2" htmlFor="position">
            Position
          </label>
          <input type="text" id="position" {...register("position")} />
        </div>
        <div className="flex w-full max-w-xs flex-col">
          <label className="mb-2" htmlFor="companyName">
            Company Name
          </label>
          <input type="text" id="companyName" {...register("companyName")} />
        </div>
        <div className="flex w-full max-w-xs flex-col">
          <label className="mb-2" htmlFor="experience">
            Experience
          </label>
          <input type="text" id="experience" {...register("experience")} />
        </div>
        <div className="flex w-full max-w-xs flex-col">
          <label className="mb-2" htmlFor="workLevel">
            Work Level
          </label>
          <input type="text" id="workLevel" {...register("workLevel")} />
        </div>
        <div className="flex w-full max-w-xs flex-col">
          <label className="mb-2" htmlFor="employmentType">
            Employment Type
          </label>
          <input
            type="text"
            id="employmentType"
            {...register("employmentType")}
          />
        </div>
        <div className="flex w-full max-w-xs flex-col">
          <label className="mb-2" htmlFor="salaryRange">
            Salary Range
          </label>
          <input type="text" id="salaryRange" {...register("salaryRange")} />
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2" htmlFor="location">
            Location
          </label>
          <input type="text" id="location" {...register("location")} />
        </div>
        <hr className="mt-2 w-full bg-black" />
        <div className="flex w-full flex-col">
          <label className="mb-2" htmlFor="overview">
            Overview
          </label>
          <textarea rows={8} {...register("overview")} id="overview" />
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2">Skills</label>
          <div>
            <div>
              {skillFields.map((item, index) => {
                return (
                  <div key={item.key} className="mb-5 flex items-center gap-3">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`skills[${index}]`)}
                    />
                    <button
                      type="button"
                      onClick={() => skillRemove(index)}
                      className="group grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-red-500 bg-red-500/20 transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 transition-all group-hover:text-white"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type="button"
                onClick={() => skillAppend("")}
                className="btn"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2">Responsibilities</label>
          <div>
            <div>
              {resFields.map((item, index) => {
                return (
                  <div key={item.key} className=" mb-5 flex items-center gap-3">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`responsibilities[${index}]`)}
                    />
                    <button
                      type="button"
                      onClick={() => resRemove(index)}
                      className="group grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-red-500 bg-red-500/20 transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 transition-all group-hover:text-white"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type="button"
                onClick={() => resAppend("")}
                className="btn"
              >
                Add Responsibility
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2">Requirements</label>
          <div>
            <div>
              {reqFields.map((item, index) => {
                return (
                  <div key={item.key} className=" mb-5 flex items-center gap-3">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`requirements[${index}]`)}
                    />
                    <button
                      type="button"
                      onClick={() => reqRemove(index)}
                      className="group grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-red-500 bg-red-500/20 transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 transition-all group-hover:text-white"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                type="button"
                onClick={() => reqAppend("")}
                className="btn"
              >
                Add Requirement
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex w-full items-center justify-end">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

// Position name
// Company name
// Experience
// Work Level
// Salary Range
// Employment Type
// Location
// Overview
// Responsibilities
// Requirements
// Skills
