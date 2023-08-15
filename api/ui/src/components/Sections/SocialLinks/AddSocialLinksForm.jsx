
const AddSocialLinksForm = (props) => {
  let formData = {}
  const handleSubmit = (event) => {
    event.preventDefault()
    let data = formData
    data.social_name = event.target.elements.social_name.value
    data.social_title = event.target.elements.social_title.value
    data.social_description = event.target.elements.social_description.value
    data.social_links = event.target.elements.social_links.value
    data.social_icon = event.target.elements.social_icon.value
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
                    form="socials-add-form"
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
              <form id="socials-add-form" onSubmit={handleSubmit}>
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
                        Social Link Name
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="social_name"
                        // defaultValue={props.formElements.social_name}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Social Link Title
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="social_title"
                        // defaultValue={props.formElements.social_title}
                      />
                    </div>
                  </div>

                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Social Link Link
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="social_links"
                        // defaultValue={props.formElements.social_links}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "6/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Social Link Image/Icon (link)
                      </label>
                      <input
                        type="text"
                        className={
                          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        }
                        name="social_icon"
                        // defaultValue={props.formElements.social_icon}
                      />
                    </div>
                  </div>
                  <div className={`w-full lg:w-` + "12/12" + ` px-4`}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Social Link Description
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="social_description"
                        // defaultValue={props.formElements.social_description}
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

export default AddSocialLinksForm;
