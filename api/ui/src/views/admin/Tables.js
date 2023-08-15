import {useState,useEffect} from "react";
import SkillsCardTable from "components/Sections/Skills/SkillsCardTable.js";
import EducationCardTable from "components/Sections/Education/EducationCardTable.js";
import HobbiesCardTable from "components/Sections/Hobbies/HobbiesCardTable.js";
import axios from 'axios';
import authHeader from "components/services/auth-header";
import AddProfessionalExperienceCardTable from "components/Sections/ProfessionalExperience/ProfessionalExperienceCardTable";
import ProjectsCardTable from "components/Sections/Projects/ProjectsCardTable";
import SkillsAreaCardTable from "components/Sections/SkillAreas/SkillsAreaCardTable";
import SocialsCardTable from "components/Sections/SocialLinks/SocialLinksCardTable";
const API_URL = "https://genesisrestapi.herokuapp.com/";
// components


const Tables = () => {
  const [mySkills, setMySkillsData] = useState([]);
  const [MyEducation, setMyEducationData] = useState([]);
  const [MyHobby, setMyHobbyData] = useState([]);
  const [myprofessional, setmyprofessionalData] = useState([]);
  const [myProjects, setmyProjectsData] = useState([]);
  const [mySkillsArea, setMySkillsAreaData] = useState([]);
  const [mySocials, setMySocialsData] = useState([]);

  useEffect(() => {
    axios.get(API_URL + 'myskills', { headers: authHeader() })
      .then((response) => {
        setMySkillsData(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });

      axios.get(API_URL + 'myeducation', { headers: authHeader() })
      .then((response) => {
        setMyEducationData(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });

      axios.get(API_URL + 'myhobbies', { headers: authHeader() })
      .then((response) => {
        setMyHobbyData(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });

      axios.get(API_URL + 'myprofessional', { headers: authHeader() })
      .then((response) => {
        setmyprofessionalData(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });

      axios.get(API_URL + 'myprojects', { headers: authHeader() })
      .then((response) => {
        setmyProjectsData(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });

      axios.get(API_URL + 'myskillareas', { headers: authHeader() })
      .then((response) => {
        setMySkillsAreaData(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });

      axios.get(API_URL + 'mysocials', { headers: authHeader() })
      .then((response) => {
        setMySocialsData(response.data)
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }, []);

  function deleteMySkill(id){
    axios.delete(API_URL + 'skills/' + id, { headers: authHeader() })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }

  function deleteMyEducation(id){
    axios.delete(API_URL + 'education/' + id, { headers: authHeader() })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }

  function deleteMyHobby(id){
    axios.delete(API_URL + 'hobbies/' + id, { headers: authHeader() })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }
  
  function deleteMyProfession(id){
    axios.delete(API_URL + 'professional/' + id, { headers: authHeader() })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }

  function deleteMyProject(id){
    axios.delete(API_URL + 'projects/' + id, { headers: authHeader() })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }

  function deleteMySkillsArea(id){
    axios.delete(API_URL + 'skillareas/' + id, { headers: authHeader() })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error is: " + error);
      });
  }

  function deleteMySocialLink(id){
    axios.delete(API_URL + 'socials/' + id, { headers: authHeader() })
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
        <SkillsAreaCardTable color= {"dark"} getData={mySkillsArea} deleteMySkill={deleteMySkillsArea}/>
          <SkillsCardTable color= {"light"} getData={mySkills} deleteMySkill={deleteMySkill}/>
          <ProjectsCardTable color= {"dark"} getData={myProjects} deleteMySkill={deleteMyProject}/>
          <AddProfessionalExperienceCardTable color= {"light"} getData={myprofessional} deleteMySkill={deleteMyProfession}/>
          <EducationCardTable color= {"dark"} getData={MyEducation} deleteMySkill={deleteMyEducation}/>
          <SocialsCardTable color= {"light"} getData={mySocials} deleteMySkill={deleteMySocialLink}/>
          <HobbiesCardTable color= {"dark"} getData={MyHobby} deleteMySkill={deleteMyHobby}/>
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}

export default Tables;