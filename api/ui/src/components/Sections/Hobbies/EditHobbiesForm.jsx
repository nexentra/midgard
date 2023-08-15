
const EditHobbiesForm = (props) => {
  let formData = {}
  const handleSubmit = (event) => {
    event.preventDefault()
    let data = formData
    data.hobby_name = event.target.elements.hobby_name.value
    data.hobby_title = event.target.elements.hobby_title.value
    data.hobby_description = event.target.elements.hobby_description.value
    data.hobby_icon = event.target.elements.hobby_icon.value
    data.hobby_links = event.target.elements.hobby_links.value
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
                    form="hobby-add-form"
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
              <form id="hobby-add-form" onSubmit={handleSubmit}>
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
                        Hobby Name
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="hobby_name"
                        defaultValue={props.formElements.hobby_name}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Hobby Title
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="hobby_title"
                        defaultValue={props.formElements.hobby_title}
                      />
                    </div>
                  </div>

                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Hobby Icon/Image (Link)
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="hobby_icon"
                        defaultValue={props.formElements.hobby_icon}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Hobby Link
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="hobby_links"
                        defaultValue={props.formElements.hobby_links}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "12/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Hobby Description
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="hobby_description"
                        defaultValue={props.formElements.hobby_description}
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

export default EditHobbiesForm;
