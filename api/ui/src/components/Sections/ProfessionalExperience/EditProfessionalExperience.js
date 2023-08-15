import {useState,useEffect} from "react";
import EditProfessionalExperienceForm from "./EditProfessionalExperienceForm.js";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "https://genesisrestapi.herokuapp.com/";


const EditProfessionalExperience = () =>{
  const alert = useAlert()
  let history = useHistory()
  const { id } = useParams();
    const [myExperience, setMyExperience] = useState({});
  useEffect(() => {
    axios.get(API_URL + 'professional/' + id, { headers: authHeader() })
      .then((response) => {
        setMyExperience(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function EditAProfessionalExperience(arg){
    console.log(arg)
    axios.put(API_URL + 'professional/' + id,arg, { headers: authHeader() })
      .then((response) => {
        setMyExperience(response.data)
        alert.success("Lets Goooo!!")
        history.push("/admin/tables")
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }

    return(
        <div>
        <EditProfessionalExperienceForm formWidth={"12/12"} formName={"Edit Professional Experience Data"} formTitle={"Professional Experience Infos"} formElements={myExperience} handleSubmit={EditAProfessionalExperience}/>
        </div>
    )
}

export default EditProfessionalExperience;