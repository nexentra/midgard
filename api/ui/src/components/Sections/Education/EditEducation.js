import {useState,useEffect} from "react";
import EditEducationForm from "./EditEducationForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "https://genesisrestapi.herokuapp.com/";


const AddEducation = () =>{
  const alert = useAlert()
  let history = useHistory()	
  const { id } = useParams();
    const [myEducation, setmyEducationData] = useState({});
    const [error, seterrorData] = useState();
  useEffect(() => {
    axios.get(API_URL + 'education/'+ id, { headers: authHeader() })
      .then((response) => {
        setmyEducationData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function EditAndEducation(arg){
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
        <EditEducationForm formWidth={"12/12"} formName={"Edit Educational Detail"} formElements= {myEducation} formTitle={"Education Infos"} handleSubmit={EditAndEducation}/>
        </div>
    )
}

export default AddEducation;