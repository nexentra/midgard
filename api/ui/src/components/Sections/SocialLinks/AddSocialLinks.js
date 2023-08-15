import {useState,useEffect} from "react";
import AddSocialLinksForm from "./AddSocialLinksForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const AddSocialLinks = () =>{
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

  function AddASocialLink(arg){
    console.log(arg)
    axios.post(API_URL + 'socials',arg, { headers: authHeader() })
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
        <AddSocialLinksForm formWidth={"12/12"} formName={"Create New Social Link"} formTitle={"Social Link Infos"} handleSubmit={AddASocialLink}/>
        </div>
    )
}

export default AddSocialLinks;