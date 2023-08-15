import {useState,useEffect} from "react";
import axios from 'axios';
import authHeader from "components/services/auth-header";
import CustomCardTable from "components/Sections/Custom/CustomCardTable";
const API_URL = "/api/";
// components


const Tables = () => {
  const [myCustoms, setMyCustomsData] = useState([]);

  useEffect(() => {
    axios.get(API_URL + 'mycustomschemas', { headers: authHeader() })
      .then((response) => {
        setMyCustomsData(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });

    }, []);
  function deleteMyCustoms(id){
    axios.delete(API_URL + 'skills/' + id, { headers: authHeader() })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <CustomCardTable color= {"dark"} getData={myCustoms} deleteMySkill={deleteMyCustoms}/>
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}

export default Tables;