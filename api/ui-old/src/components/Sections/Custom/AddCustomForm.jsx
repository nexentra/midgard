import { WithContext as ReactTags } from "react-tag-input";
import React, { useState } from "react";
import "./reactTags.css"

const AddCustomForm = (props) => {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const [tags, setTags] = useState([
    { id: 'Name', text: 'Name' },
    { id: 'Title', text: 'Title' },
    { id: 'Link', text: 'Link' },
    { id: 'Description', text: 'Description' },
  ]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  let formData = {};
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = formData;
    const textArray = tags.map(item => item.text);
    data.name = event.target.elements.name.value;
    data.title = event.target.elements.title.value;
    data.description = event.target.elements.description.value;
    data.field_names = textArray;
    data.user_id = localStorage.getItem("userid");
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
                <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className={
                        "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      }
                      name="name"
                      // defaultValue={props.formElements.name}
                    />
                  </div>
                </div>
                <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      className={
                        "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      }
                      name="title"
                      // defaultValue={props.formElements.title}
                    />
                  </div>
                </div>
                <div className={`w-full lg:w-` + "12/12" + ` px-4`}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Field Names
                    </label>
                    <ReactTags
                     classNames={{
                      tags: 'ReactTags__tags',
                      tagInput: 'w-full mt-2',
                      tagInputField: "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150",
                      selected: 'ReactTags__selected',
                      tag: 'ReactTags__tag',
                      remove: 'ReactTags__remove',
                      // suggestions: 'ReactTags__suggestions',
                      // activeSuggestion: 'ReactTags__activeSuggestion',
                      // editTagInput: 'ReactTags__editInput',
                      // editTagInputField: 'ReactTags__editTagInput',
                      // clearAll: 'ReactTags__clearAll',
                    }}
                      tags={tags}
                      delimiters={delimiters}
                      handleDelete={handleDelete}
                      handleAddition={handleAddition}
                      handleDrag={handleDrag}
                      handleTagClick={handleTagClick}
                      inputFieldPosition="bottom"
                      autocomplete
                    />
                    {/* <input
                      type="text"
                      className={
                        "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      }
                      name="fieldnames"
                      // defaultValue={props.formElements.icon}
                    /> */}
                  </div>
                </div>
                <div className={`w-full lg:w-` + "12/12" + ` px-4`}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="description"
                      // defaultValue={props.formElements.description}
                      rows="4"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomForm;
