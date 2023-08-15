import {useState,useEffect} from "react";
import EditProjectForm from "./EditProjectsForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "https://genesisrestapi.herokuapp.com/";


const AddProjects = () =>{
  const alert = useAlert()
  let history = useHistory()	
  const { id } = useParams();
    const [myProjects, setmyProjectsData] = useState({});
    const [error, seterrorData] = useState();
  useEffect(() => {
    axios.get(API_URL + 'projects/'+ id, { headers: authHeader() })
      .then((response) => {
        setmyProjectsData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function EditProjects(arg){
    console.log(arg)
    axios.put(API_URL + 'projects/'+ id,arg, { headers: authHeader() })
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
        <EditProjectForm formWidth={"12/12"} formName={"Edit Project"} formTitle={"Project Infos"} formElements= {myProjects} handleSubmit={EditProjects}/>
        </div>
    )
}

export default AddProjects;