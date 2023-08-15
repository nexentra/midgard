import React from "react";

// components

export default function CardPageVisits() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Public Endpoints
              </h3>
            </div>
            {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Endpoint name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Endpoint Url
                </th>
                {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Unique users
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Bounce rate
                </th> */}
              </tr>
            </thead>
            <tbody>
            <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                ALL PROFILE DATA
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/users/"+localStorage.getItem("userid")}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                All SKILLS
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myskills"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                SINGLE SKILL
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myskills/YOUR SKILL ID"}
                </th>
              </tr>
              
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                ALL SKILL AREAS
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myskillareas"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                SINGLE Skill Area
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myskillareas/Your Skill Area ID"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                ALL PROJECTS
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myprojects"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                SINGLE PROJECT
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myprojects/Your Project ID"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                ALL EDUCATION INFOS
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myeducation"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                SINGLE EDUCATION INFO
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myeducation/YOUR EDUCATION ID"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                ALL PROFESSIONAL EXPERIENCES
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myprofessional"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                SINGLE PROFESSIONAL EXPERIENCE
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myprofessional/YOUR PROFESSIONAL EXP ID"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                ALL HOBBIES
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myhobbies"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                SINGLE HOBBY
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/myhobbies/YOUR HOBBY ID"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                ALL SOCIAL LINKS
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/mysocials"}
                </th>
              </tr>
              <tr>
                
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                SINGLE SOCIAL LINK
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {"https://genesisrestapi.herokuapp.com/"+localStorage.getItem("userid")+"/mysocials/YOUR SOCIAL LINK ID"}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
