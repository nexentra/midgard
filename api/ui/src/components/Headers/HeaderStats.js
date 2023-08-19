
// components

import CardStats from "components/Cards/CardStats.js";
import React,{useState, useEffect } from "react";
import axios from 'axios';
import { useAlert } from 'react-alert'
const API_URL = process.env.NODE_ENV === "PRODUCTION" ? "/api/" : "http://localhost:8080/api/";

export default function HeaderStats() {
  const [userdata, setUserData] = useState();
  const [Skills, setSkills] = useState();
  const [Projects, setProjects] = useState();
  const [SkillArea, setSkillArea] = useState();
  const alert = useAlert()
  useEffect(() => {
    axios.get(API_URL + 'users')
      .then((response) => {
        // alert.success("Lets goooo!!")
        setUserData(response.data.length);
        
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });

      axios.get(API_URL + 'skills')
      .then((response) => {
        // alert.success("Lets goooo!!")
        setSkills(response.data.length);
        
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });

      axios.get(API_URL + 'projects')
      .then((response) => {
        // alert.success("Lets goooo!!")
        setProjects(response.data.length);
        
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });

      axios.get(API_URL + 'skillareas')
      .then((response) => {
        // alert.success("Lets goooo!!")
        setSkillArea(response.data.length);
        
      })
      .catch((error) => {
        alert.error(error.response.data.error)
      });
  }, []);
  return (
    <>
      {/* Header */}
      <div className="relative md:pt-32 pb-32 pt-12" style={{backgroundColor:"#1E293B"}}>
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL USERS LISTED"
                  statTitle={userdata}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL SKILLS LISTED"
                  statTitle={Skills}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL PROJECTS LISTED"
                  statTitle={Projects}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL SKILL AREAS LISTED"
                  statTitle={SkillArea}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
