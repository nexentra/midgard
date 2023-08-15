import {useState,useEffect} from "react";
import AddProjectsForm from "./AddProjectsForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const AddProjects = () =>{
  const alert = useAlert()
  let history = useHistory()	
    const [myProjects, setmyProjectsData] = useState();
    const [error, seterrorData] = useState();
  // useEffect(() => {
  //   axios.get(API_URL + 'skills', { headers: authHeader() })
  //     .then((response) => {
  //       setmyProjectsData(response.data)
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log("Error is: " + error);
  //     });
  // }, []);

  function AddAProjects(arg){
    console.log(arg)
    axios.post(API_URL + 'projects',arg, { headers: authHeader() })
      .then((response) => {
        alert.success("Lets goooo!!")
        history.push("/admin/tables")
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }

    return(
        <div>
        <AddProjectsForm formWidth={"12/12"} formName={"Create New Project"} formTitle={"Project Infos"} handleSubmit={AddAProjects}/>
        </div>
    )
}

export default AddProjects;