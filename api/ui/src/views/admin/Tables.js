import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "components/services/auth-header";
import CustomCardTable from "components/Sections/Custom/CustomCardTable";
import { Link } from "react-router-dom";
const API_URL = process.env.NODE_ENV === "PRODUCTION" ? "/api/" : "http://localhost:8080/api/";
// components

const Tables = () => {
  const [myCustoms, setMyCustomsData] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "mycustomschemas", { headers: authHeader() })
      .then((response) => {
        console.log(response.data);
        setMyCustomsData(response.data);
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);
  function deleteMyDatas(schema_id, id) {
    axios
      .delete(API_URL + "customdatas/" + schema_id + "/" + id, {
        headers: authHeader(),
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }

  function deleteCustom(id) {
    axios
      .delete(API_URL + "customschemas/" + id, {
        headers: authHeader(),
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative w-full mb-6 px-4 max-w-full flex-grow flex-1 text-right">
            <Link
              className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              to="/admin/custom/add"
            >
              Create a table
            </Link>
          </div>
          {myCustoms.map((custom) => (
            <CustomCardTable
              color={"dark"}
              getData={custom}
              deleteMyDatas={deleteMyDatas}
              deleteMyCustom={deleteCustom}
              schema_id={custom.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Tables;
