
const EditEducationForm = (props) => {
  let formData = {}
  const handleSubmit = (event) => {
    event.preventDefault()
    let data = formData
    data.institution_name = event.target.elements.institution_name.value
    data.institution_title = event.target.elements.institution_title.value
    data.institution_progress = event.target.elements.institution_progress.value
    data.institution_description = event.target.elements.institution_description.value
    data.institution_links = event.target.elements.institution_links.value
    data.education_level = event.target.elements.education_level.value
    data.education_period_from = event.target.elements.education_period_from.value
    data.education_period_to = event.target.elements.education_period_to.value
    data.study_motivation = event.target.elements.study_motivation.value
    data.institution_icon = event.target.elements.institution_icon.value
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
                    form="education-edit-form"
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
              <form id="education-edit-form" onSubmit={handleSubmit}>
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
                        Institution Name
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="institution_name"
                        defaultValue={props.formElements.institution_name}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Institution Title
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="institution_title"
                        defaultValue={props.formElements.institution_title}
                      />
                    </div>
                  </div>

                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Progress
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="institution_progress"
                        defaultValue={props.formElements.institution_progress}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Institution Link
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="institution_links"
                        defaultValue={props.formElements.institution_links}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "12/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Institution Icon/Image (Link)
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="institution_icon"
                        defaultValue={props.formElements.institution_icon}
                      />
                    </div>
                  </div>

                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Education Level
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="education_level"
                        defaultValue={props.formElements.education_level}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Education Period From
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="education_period_from"
                        defaultValue={props.formElements.education_period_from}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Education Period To
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="education_period_to"
                        defaultValue={props.formElements.education_period_to}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Study Motivation
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="study_motivation"
                        defaultValue={props.formElements.study_motivation}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "12/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Institution Description
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="institution_description"
                        defaultValue={props.formElements.institution_description}
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

export default EditEducationForm;
