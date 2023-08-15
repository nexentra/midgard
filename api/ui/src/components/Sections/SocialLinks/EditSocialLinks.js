import {useState,useEffect} from "react";
import EditSocialLinksForm from "./EditSocialLinksForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const EditSocialLinks = () =>{
  const alert = useAlert()
  let history = useHistory()
  const { id } = useParams();
    const [mySocials, setMySocialsData] = useState({});
  useEffect(() => {
    axios.get(API_URL + 'socials/' + id, { headers: authHeader() })
      .then((response) => {
        setMySocialsData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function EditASkill(arg){
    console.log(arg)
    axios.put(API_URL + 'socials/' + id,arg, { headers: authHeader() })
      .then((response) => {
        setMySocialsData(response.data)
        alert.success("Lets Goooo!!")
        history.push("/admin/tables")
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }

    return(
        <div>
        <EditSocialLinksForm formWidth={"12/12"} formName={"Create New Skill"} formTitle={"Skill Infos"} formElements={mySocials} handleSubmit={EditASkill}/>
        </div>
    )
}

export default EditSocialLinks;