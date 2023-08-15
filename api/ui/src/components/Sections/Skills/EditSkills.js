import {useState,useEffect} from "react";
import EditSkillsForm from "./EditSkillsForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "https://genesisrestapi.herokuapp.com/";


const EditSkills = () =>{
  const alert = useAlert()
  let history = useHistory()
  const { id } = useParams();
    const [mySkills, setMySkillsData] = useState({});
  useEffect(() => {
    axios.get(API_URL + 'skills/' + id, { headers: authHeader() })
      .then((response) => {
        setMySkillsData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function EditASkill(arg){
    console.log(arg)
    axios.put(API_URL + 'skills/' + id,arg, { headers: authHeader() })
      .then((response) => {
        setMySkillsData(response.data)
        alert.success("Lets Goooo!!")
        history.push("/admin/tables")
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }

    return(
        <div>
        <EditSkillsForm formWidth={"12/12"} formName={"Edit Skill"} formTitle={"Skill Infos"} formElements={mySkills} handleSubmit={EditASkill}/>
        </div>
    )
}

export default EditSkills;