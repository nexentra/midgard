import {useState,useEffect} from "react";
import AddHobbiesForm from "./AddHobbiesForm.jsx";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert'
const API_URL = "/api/";


const AddHobbies = () =>{
  const alert = useAlert()
  let history = useHistory()	
    const [myHobbies, setmyHobbiesData] = useState();
    const [error, seterrorData] = useState();
  // useEffect(() => {
  //   axios.get(API_URL + 'hobbies', { headers: authHeader() })
  //     .then((response) => {
  //       setmyHobbiesData(response.data)
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log("Error is: " + error);
  //     });
  // }, []);

  function AddAHobby(arg){
    console.log(arg)
    axios.post(API_URL + 'hobbies',arg, { headers: authHeader() })
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
        <AddHobbiesForm formWidth={"12/12"} formName={"Create New Hobby"} formTitle={"Hobby Infos"} handleSubmit={AddAHobby}/>
        </div>
    )
}

export default AddHobbies;