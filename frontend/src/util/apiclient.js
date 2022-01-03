
import Router from "next/router";
import axios from "axios";
import { logger } from "./logger";

const base = "http://localhost:3000"

export const handleCreateProject = async (userId, pname) => {
    const project = {
        leader: userId,
        projectName: pname,
        description: "",
        link: "",
    }

    await axios.post(`${base}/api/project`, project)
    .then(function (response) {
        logger(response)
        Router.push("/user/home");
    })
    .catch(function (error) {
        logger(error.response.status);
        logger(error.response.data);
        logger(error.response.headers);
    });        
}

export const handleKickProject = (e, userid, project) => {
    e.preventDefault;
    
    const body = {
      "project": project,
      "uid": userid
    }
  
    axios.delete(`${base}/api/project/kick`, {data: body})
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        logger(error.response.status);
        logger(error.response.data);
        logger(error.response.headers);
    });     
}

export const handleJoinProject = async (userid, pin) => {

    let body = {
        pin: pin.replace(/\s/g, ''),
        uid: userid,
    }

    await axios.put(`${base}/api/project/join`, body)
    .then(function (response) {
        logger(response)
        Router.push("/user/home");
    })
    .catch(function (error) {
        logger(error.response.status);
        logger(error.response.data);
        logger(error.response.headers);
    }); 
}

export const handleEditProject = (e, userid, project, description, link) => {

    const data = {
        "uid": userid,
        "project": project,
        "description": description,
        "link": link
    }

    axios.put(`${base}/api/project`, data)
    .then(function (response) {
        
        logger(response)
        
        Router.push("/user/home");
      })
      .catch(function (error) {
        alert("Error while editing");
          
        logger(error.response.status);
        logger(error.response.data);
        logger(error.response.headers);  
      });
}

export const handleDeleteProject = (userid, project) => {
    const data = {
        "project": project,
        "uid": userid
    }  
  
    axios.delete(`${base}/api/project/`, {data: data})
    .then(function (response) {
        logger(response)
        Router.push("/user/home");
      })
      .catch(function (error) {
        alert("Error Deleting Project");
         
        logger(error.response.status);
        logger(error.response.data);
        logger(error.response.headers); 
      });
  }

export const handleLeaveProject = (e, userid, project) => {
    const data = {
      "project": project,
      "uid": userid
    }
    
    axios.put(`${base}/api/project/leave`, data)
        .then(function (response) {
            
        logger(response)
            
          Router.push("/user/home");
      })
      .catch(function (error) {
        alert("Error leaving.");  
        logger(error.response.status);
        logger(error.response.data);
        logger(error.response.headers);
      });
}


export const handleEditUser = (userid, tag)  => {
    const data = {
        "uid": userid,
        "tag": tag
      }
      
      axios.put(`${base}/api/user`, data)
            .then(function (response) {
            logger(response)
        })
        .catch(function (error) {
            logger(error.response.status);
            logger(error.response.data);
            logger(error.response.headers);
        });
}



