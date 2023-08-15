import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import AddSkills from "components/Sections/Skills/AddSkills";
import EditSkills from "components/Sections/Skills/EditSkills";
import AddSkillsArea from "components/Sections/SkillAreas/AddSkillsArea";
import EditSkillsArea from "components/Sections/SkillAreas/EditSkillsArea";
import AddHobbies from "components/Sections/Hobbies/AddHobbies";
import EditHobbies from "components/Sections/Hobbies/EditHobbies";
import AddEducation from "components/Sections/Education/AddEducation";
import EditEducation from "components/Sections/Education/EditEducation";
import AddProfessionalExperience from "components/Sections/ProfessionalExperience/AddProfessionalExperience";
import EditProfessionalExperience from "components/Sections/ProfessionalExperience/EditProfessionalExperience";
import AddProjects from "components/Sections/Projects/AddProjects";
import EditProjects from "components/Sections/Projects/EditProjects";
import AddSocialLinks from "components/Sections/SocialLinks/AddSocialLinks";
import EditSocialLinks from "components/Sections/SocialLinks/EditSocialLinks";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            {/* <Route path="/admin/maps" exact component={Maps} /> */}
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/skills/add" exact component={AddSkills} />
            <Route path="/admin/skills/edit/:id" exact component={EditSkills} />
            <Route path="/admin/education/add" exact component={AddEducation} />
            <Route path="/admin/education/edit/:id" exact component={EditEducation} />
            <Route path="/admin/hobbies/add" exact component={AddHobbies} />
            <Route path="/admin/hobbies/edit/:id" exact component={EditHobbies} />
            <Route path="/admin/professionalexperience/add" exact component={AddProfessionalExperience} />
            <Route path="/admin/professionalexperience/edit/:id" exact component={EditProfessionalExperience} />
            <Route path="/admin/projects/add" exact component={AddProjects} />
            <Route path="/admin/projects/edit/:id" exact component={EditProjects} />
            <Route path="/admin/skillsarea/add" exact component={AddSkillsArea} />
            <Route path="/admin/skillsarea/edit/:id" exact component={EditSkillsArea} />
            <Route path="/admin/sociallinks/add" exact component={AddSocialLinks} />
            <Route path="/admin/sociallinks/edit/:id" exact component={EditSocialLinks} />
            
            
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
