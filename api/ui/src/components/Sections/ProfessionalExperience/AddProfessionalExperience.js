import {useState,useEffect} from "react";
import AddProfessionalExperienceForm from "./AddProfessionalExperienceForm.js";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "https://genesisrestapi.herokuapp.com/";


const AddProfessionalExperience = () =>{
  const alert = useAlert()
  let history = useHistory()	
    const [mySkills, setMySkillsData] = useState();
    const [error, seterrorData] = useState();
  // useEffect(() => {
  //   axios.get(API_URL + 'skills', { headers: authHeader() })
  //     .then((response) => {
  //       setMySkillsData(response.data)
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log("Error is: " + error);
  //     });
  // }, []);

  function AddAProfessionalExperience(arg){
    console.log(arg)
    axios.post(API_URL + 'professional',arg, { headers: authHeader() })
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
        <AddProfessionalExperienceForm formWidth={"12/12"} formName={"Create New Professional Experience"} formTitle={"Professional Experience Form Infos"} handleSubmit={AddAProfessionalExperience}/>
        </div>
    )
}

export default AddProfessionalExperience;