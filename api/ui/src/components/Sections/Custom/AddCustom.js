import {useState,useEffect} from "react";
import AddCustomForm from "./AddCustomForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header.js";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const AddCustom = () =>{
  const alert = useAlert()
  let history = useHistory()	
    const [myCustom, setmyCustomData] = useState({});
    const [error, seterrorData] = useState();

  function AddCustom(arg){
    console.log(arg)
    axios.post(API_URL + 'customschemas',arg, { headers: authHeader() })
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
        <AddCustomForm formWidth={"12/12"} formName={"Create New Custom Table"} formTitle={"Custom Table Form"} handleSubmit={AddCustom}/>
        </div>
    )
}

export default AddCustom;