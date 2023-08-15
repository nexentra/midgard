
const AddProjectsForm = (props) => {
  let formData = {}
  const handleSubmit = (event) => {
    event.preventDefault()
    let data = formData
    data.project_name = event.target.elements.project_name.value
    data.project_title = event.target.elements.project_title.value
    data.project_description = event.target.elements.project_description.value
    data.project_icon = event.target.elements.project_icon.value
    data.project_imgs = event.target.elements.project_imgs.value
    data.project_links = event.target.elements.project_links.value
    data.project_skill_area = event.target.elements.project_skill_area.value
    data.project_skills = event.target.elements.project_skills.value
    data.project__time_from = event.target.elements.project__time_from.value
    data.project_time_to = event.target.elements.project_time_to.value
    data.project__client = event.target.elements.project__client.value
    data.user_id = JSON.parse(localStorage.getItem('userid'))
    console.log(data)
    props.handleSubmit(data)
  }

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
                    form="project-add-form"
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
              <form id="project-add-form" onSubmit={handleSubmit}>
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
                        Project Name
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project_name"
                        // defaultValue={props.formElements.project_name}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Title
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project_title"
                        // defaultValue={props.formElements.project_title}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Icon
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project_icon"
                        // defaultValue={props.formElements.project_icon}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Time From
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project__time_from"
                        // defaultValue={props.formElements.project__time_from}
                      />
                    </div>
                  </div>

                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Time To
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project_time_to"
                        // defaultValue={props.formElements.project_time_to}
                      />
                    </div>
                  </div>

                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Client
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project__client"
                        // defaultValue={props.formElements.project__client}
                      />
                    </div>
                  </div>

                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Images (Link)
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project_imgs"
                        // defaultValue={props.formElements.project_imgs}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Links
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project_links"
                        // defaultValue={props.formElements.project_links}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Skill Area
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project_skill_area"
                        // defaultValue={props.formElements.project_skill_area}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Skills
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="project_skills"
                        // defaultValue={props.formElements.project_skills}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "12/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Project Description
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="project_description"
                        // defaultValue={props.formElements.project_description}
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

export default AddProjectsForm;
