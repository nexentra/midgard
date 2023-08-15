import {useState,useEffect} from "react";
import AddSkillsForm from "./AddSkillsForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const AddSkills = () =>{
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

  function AddASkill(arg){
    console.log(arg)
    axios.post(API_URL + 'skills',arg, { headers: authHeader() })
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
        <AddSkillsForm formWidth={"12/12"} formName={"Create New Skill"} formTitle={"Skill Infos"} handleSubmit={AddASkill}/>
        </div>
    )
}

export default AddSkills;