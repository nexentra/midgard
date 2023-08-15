import {useState,useEffect} from "react";
import EditCustomForm from "./EditCustomForm.jsx/index.js";
import axios from 'axios';
import authHeader from "../../services/auth-header.js";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const AddCustom = () =>{
  const alert = useAlert()
  let history = useHistory()	
  const { id } = useParams();
    const [myCustom, setmyCustomData] = useState({});
    const [error, seterrorData] = useState();
  useEffect(() => {
    axios.get(API_URL + 'education/'+ id, { headers: authHeader() })
      .then((response) => {
        setmyCustomData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function EditAndCustom(arg){
    console.log(arg)
    axios.put(API_URL + 'education/' + id,arg, { headers: authHeader() })
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
        <EditCustomForm formWidth={"12/12"} formName={"Edit Custom Detail"} formElements= {myCustom} formTitle={"Custom Infos"} handleSubmit={EditAndCustom}/>
        </div>
    )
}

export default AddCustom;