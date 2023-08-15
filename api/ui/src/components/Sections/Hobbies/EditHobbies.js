import {useState,useEffect} from "react";
import EditHobbiesForm from "./EditHobbiesForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory,useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const EditHobbies = () =>{
  const alert = useAlert()
  let history = useHistory()
  const { id } = useParams();
    const [MyHobbies, setMyHobbiesData] = useState({});
  useEffect(() => {
    axios.get(API_URL + 'hobbies/' + id, { headers: authHeader() })
      .then((response) => {
        setMyHobbiesData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function EditASkill(arg){
    console.log(arg)
    axios.put(API_URL + 'hobbies/' + id,arg, { headers: authHeader() })
      .then((response) => {
        setMyHobbiesData(response.data)
        alert.success("Lets Goooo!!")
        history.push("/admin/tables")
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }

    return(
        <div>
        <EditHobbiesForm formWidth={"12/12"} formName={"Edit Hobby"} formTitle={"Hobby Infos"} formElements={MyHobbies} handleSubmit={EditASkill}/>
        </div>
    )
}

export default EditHobbies;