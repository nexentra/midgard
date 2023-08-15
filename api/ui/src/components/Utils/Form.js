import {React,useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import authHeader from '../../components/services/auth-header';
import { useAlert } from 'react-alert'
const API_URL = "https://genesisrestapi.herokuapp.com/";
// components

export default function Form(props) {
  const alert = useAlert()
  let history = useHistory()	
  let formData = props.formElements
  const handleSubmit = (event) => {
    event.preventDefault()
    let data = formData
    data.about_you = event.target.elements.about_you.value
    data.name = event.target.elements.name.value
    data.age = event.target.elements.age.value
    data.email = event.target.elements.email.value
    data.moto = event.target.elements.moto.value
    if (event.target.elements.password.value == ""){
      data.password = props.formElements.password
    }
    else{
      data.password = event.target.elements.password.value
    }
    
    data.phone_number = event.target.elements.phone_number.value
    data.profile_icon = event.target.elements.profile_icon.value
    data.profile_img = event.target.elements.profile_img.value
    data.what_do_you_do = event.target.elements.what_do_you_do.value
    console.log(data)
    editUserData()
  }

  function editUserData() {
    axios.put(API_URL + 'users/'+localStorage.getItem('userid'),formData, { headers: authHeader() })
    .then(response =>{
        alert.success("Lets goooo!!")
        history.push("/profile");
      // localStorage.removeItem("user");
      // localStorage.removeItem("userid");
      // window.location.reload()
    }).catch((error) => {
      alert.error(error.response.data.error)
    });
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              {props.formName}
            </h6>
            <div>
              <button
                form="user-form"
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
          <form id="user-form" onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              {props.formTitle}
            </h6>
            <div className="flex flex-wrap">
             <div className={`w-full lg:w-`+"6/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    *Username
                  </label>
                  <input
                    type="text"
                    className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
                    name="name"
                    defaultValue={props.formElements.name}
                    required/>
                </div>
                </div>
                <div className={`w-full lg:w-`+"6/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    *Email
                  </label>
                  <input
                    type="text"
                    className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
                    name="email"
                    defaultValue={props.formElements.email}
                    required/>
                </div>
                </div>

                <div className={`w-full lg:w-`+"6/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    *Password
                  </label>
                  <input
                    type="text"
                    className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
                    name="password"
                    defaultValue=""
                    required/>
                </div>
                </div>

<div className={`w-full lg:w-`+"6/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    What Do You Do
                  </label>
                  <input
                    type="text"
                    className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
                    name="what_do_you_do"
                    defaultValue={props.formElements.what_do_you_do}
                  />
                </div>
                </div>
<div className={`w-full lg:w-`+"12/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Your Moto/Title
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="moto"
                    defaultValue={props.formElements.moto}
                    rows="2"
                  />
                </div>
                </div>
<div className={`w-full lg:w-`+"6/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
                    name="phone_number"
                    defaultValue={props.formElements.phone_number}
                  />
                </div>
                </div>
<div className={`w-full lg:w-`+"6/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Profile Image (link)
                  </label>
                  <input
                    type="text"
                    className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
                    name="profile_img"
                    defaultValue={props.formElements.profile_img}
                  />
                </div>
                </div>
<div className={`w-full lg:w-`+"6/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Profile Icon (link/anchor tag)
                  </label>
                  <input
                    type="text"
                    className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
                    name="profile_icon"
                    defaultValue={props.formElements.profile_icon}
                  />
                </div>
                </div>

                <div className={`w-full lg:w-`+"6/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    className={"border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"}
                    name="age"
                    defaultValue={props.formElements.age}
                  />
                </div>
                </div>

<div className={`w-full lg:w-`+"12/12" +` px-4`}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About You
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="about_you"
                    defaultValue={props.formElements.about_you}
                    rows="4"
                  ></textarea>
                </div>
              </div>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
