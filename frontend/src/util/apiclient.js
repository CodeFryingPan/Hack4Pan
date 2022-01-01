
import Router from "next/router";
import axios from "axios";

const base = "http://localhost:3000"

export const handleCreate = async (userId, pname) => {
    const project = {
        leader: userId,
        projectName: pname,
        description: "",
        link: "",
    }

    await axios.post(`${base}/api/project`, project)
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        alert(error.response.data.data);
    });        
}

export const handleKick = (e, userid, project) => {
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
        console.log(error);
    });     
}

export const handleJoin = async (userid, pin) => {

    let body = {
        pin: pin,
        uid: userid,
    }

    await axios.put(`${base}/api/project/join`, body)
    .then(function (response) {
        console.log(response);
        Router.push("/user/home");
    })
    .catch(function (error) {
        alert(error.response.data.data);
    }); 
}

export const handleEdit = (e, userid, project, description, link) => {

    const data = {
        "uid": userid,
        "project": project,
        "description": description,
        "link": link
    }

    axios.put(`${base}/api/project`, data)
    .then(function (response) {
          Router.push("/user/home");
      })
      .catch(function (error) {
          alert("Error while editing");
          console.log(error);
      });
}

export const handleDelete = (userid, project) => {
    const data = {
        "project": project,
        "uid": userid
    }  
  
    axios.delete(`${base}/api/project/`, {data: data})
    .then(function (response) {
          Router.push("/user/home");
      })
      .catch(function (error) {
          alert("Error Deleting Project");
          console.log(error);
      });
  }

export const handleLeave = (e, userid, project) => {
    e.preventDefault;

    const data = {
      "project": project,
      "uid": userid
    }

    axios.put(`{${base}}/api/project/leave`, data)
    .then(function (response) {
          Router.push("/user/home");
      })
      .catch(function (error) {
          alert("Error leaving.");
          console.log(error);
      });
  }
