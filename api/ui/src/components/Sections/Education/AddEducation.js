import {useState,useEffect} from "react";
import AddEducationForm from "./AddEducationForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const AddEducation = () =>{
  const alert = useAlert()
  let history = useHistory()	
    const [myEducation, setmyEducationData] = useState({});
    const [error, seterrorData] = useState();
  // useEffect(() => {
  //   axios.get(API_URL + 'skills', { headers: authHeader() })
  //     .then((response) => {
  //       setmyEducationData(response.data)
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log("Error is: " + error);
  //     });
  // }, []);

  function AddAnEducation(arg){
    console.log(arg)
    axios.post(API_URL + 'education',arg, { headers: authHeader() })
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
        <AddEducationForm formWidth={"12/12"} formName={"Create New Educational Detail"} formTitle={"Education Infos"} handleSubmit={AddAnEducation}/>
        </div>
    )
}

export default AddEducation;