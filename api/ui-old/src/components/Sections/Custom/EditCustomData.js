import {useState,useEffect} from "react";
import CustomDataForm from "./CustomDataForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header.js";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:8080/api/";


const EditCustomData = () =>{
  const alert = useAlert()
  let history = useHistory()	
  const { id,schema_id } = useParams();
    const [myCustom, setmyCustomData] = useState(null);
    const [error, seterrorData] = useState();
  useEffect(() => {
    axios.get(API_URL + 'customdatas/'+ schema_id  + "/" + id, { headers: authHeader() })
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
    axios.put(API_URL + 'customdatas/' + schema_id  + "/" + id,arg, { headers: authHeader() })
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
          {
            myCustom && <CustomDataForm edit={"true"} formWidth={"12/12"} formName={"Edit Custom Data"} formElements={myCustom} formTitle={"Custom Datas"} handleSubmit={EditAndCustom}/>
          }
        </div>
    )
}

export default EditCustomData;