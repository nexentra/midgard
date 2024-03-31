import {useState,useEffect} from "react";
import CustomDataForm from "./CustomDataForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header.js";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:8080/api/";


const AddCustom = () =>{
  const alert = useAlert()
  let history = useHistory()	
  const { id } = useParams();
    const [myCustom, setmyCustomData] = useState({});
    const [error, seterrorData] = useState();

    useEffect(() => {
      axios.get(API_URL + 'customschemas/'+ id, { headers: authHeader() })
        .then((response) => {
          setmyCustomData(response.data)
          console.log(response.data)
          response.data.field_names.map((field, index) => {
            console.log(field)
          });
        })
        .catch((error) => {
          console.log("Error is: " + error);
        });
    }, []);

  function AddCustom(arg){
    console.log(arg)
    axios.post(API_URL + 'customdatas/' + id,arg, { headers: authHeader() })
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
            myCustom?.field_names && <CustomDataForm edit={"false"} formWidth={"12/12"} formName={"Add data to Table"} formTitle={"Custom Data Table Form"} handleSubmit={AddCustom} data={myCustom}/>
          }
        </div>
    )
}

export default AddCustom;