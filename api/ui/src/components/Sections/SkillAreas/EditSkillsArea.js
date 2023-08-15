import {useState,useEffect} from "react";
import EditSkillsAreaForm from "./EditSkillsAreaForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "https://genesisrestapi.herokuapp.com/";


const EditSkillsArea = () =>{
  const alert = useAlert()
  let history = useHistory()
  const { id } = useParams();
    const [mySkillsArea, setMySkillsAreaData] = useState({});
  useEffect(() => {
    axios.get(API_URL + 'skillareas/' + id, { headers: authHeader() })
      .then((response) => {
        setMySkillsAreaData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function EditASkillArea(arg){
    console.log(arg)
    axios.put(API_URL + 'skillareas/' + id,arg, { headers: authHeader() })
      .then((response) => {
        setMySkillsAreaData(response.data)
        alert.success("Lets Goooo!!")
        history.push("/admin/tables")
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }

    return(
        <div>
        <EditSkillsAreaForm formWidth={"12/12"} formName={"Edit Skill Area"} formTitle={"Skill Area Infos"} formElements={mySkillsArea} handleSubmit={EditASkillArea}/>
        </div>
    )
}

export default EditSkillsArea;