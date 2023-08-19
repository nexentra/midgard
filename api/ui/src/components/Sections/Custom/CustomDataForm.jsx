import { WithContext as ReactTags } from "react-tag-input";
import React, { useState } from "react";
import "./reactTags.css";

const CustomDataForm = (props) => {
  let formData = {};
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = formData;
    if (props.edit !== "true") {
      props?.data?.field_names.map((field, index) => {
        data[field] = event.target.elements[field].value || "";
      });
    } else {
    Object.entries(props.formElements).map(([key, value]) => {
      if(key !== "id")
      data[key] = event.target.elements[key].value || ""
      console.log(data)
    })
    }
    props.handleSubmit(data);
  };

  return (
    <div className="flex flex-wrap">
      <div className={`w-full lg:w-` + props.formWidth + ` px-4`}>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                {props.formName}
              </h6>
              <div>
                <button
                  form="education-add-form"
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save
                </button>
                {/* <button
                    onClick={props.HandleDeleteFunc}
                    className="bg-red-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Delete
                  </button> */}
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form id="education-add-form" onSubmit={handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                {props.formTitle}
              </h6>
              <div className="flex flex-wrap">
                {!(props?.edit == "true") ? (
                  props?.data?.field_names.map((field, index) => {
                    return (
                      <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor={field}
                          >
                            {field}
                          </label>
                          <input
                            type="text"
                            className={
                              "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            }
                            name={field}
                          />
                        </div>
                      </div>
                    );
                  }) 
                ) : (
                  <>
                  {
                  // props.formElements.map((data) => (
                Object.entries(props.formElements).map(([key, value]) => (
                  <>
                    {
                      key !== "id" && 
                        <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor={key}
                            >
                              {key}
                            </label>
                            <input
                              type="text"
                              className={
                                "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              }
                              name={key}
                              defaultValue={value}
                            />
                          </div>
                        </div>
                    }
                  </>
                // ))
              ))}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDataForm;
