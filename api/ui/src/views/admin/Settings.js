import { useState, useEffect } from "react";
import SettingComponent from "components/Utils/SettingComponent";
import axios from 'axios';
import { useAlert } from 'react-alert'
import authHeader from '../../components/services/auth-header';
import AuthService from '../../components/services/auth.services';
const API_URL = "/api/";

const Settings = () => {
  const [userData, setUserData] = useState({});
  const alert = useAlert()
  useEffect(() => {
    axios.get(API_URL + 'users/'+localStorage.getItem('userid'))
      .then((response) => {
        // alert.success("Lets goooo!!")
        setUserData(response.data);
        
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }, []);

  function deleteUserData() {
    axios.delete(API_URL + 'users/'+localStorage.getItem('userid'), { headers: authHeader() })
    .then(()=>{
      alert.success("Lets goooo!!")
      AuthService.logout()
    }) 
  }

  return (
    userData && <>
    <SettingComponent
    formWidth="12/12"
      formName={"My Account"}
      formTitle={"Your Infos"}
      formElements={userData}
      HandleDeleteFunc={deleteUserData}
    ></SettingComponent>
    </>
  );
}

export default Settings;