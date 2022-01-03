
import Router from "next/router";
import axios from "axios";

export const handleCreateProject = async (host, userId, pname) => {
    const project = {
        leader: userId,
        projectName: pname,
        description: "",
        link: "",
    }

    const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

    await axios.post(url, project)
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });        
}

export const handleKickProject = (e, host, userid, project) => {
    e.preventDefault;
    
    const body = {
      "project": project,
      "uid": userid
    }
    
    const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

    axios.delete(url, {data: body})
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });     
}

export const handleJoinProject = async (host, userid, pin) => {

    let body = {
        pin: pin.replace(/\s/g, ''),
        uid: userid,
    }

    const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

    await axios.put(url, body)
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }); 
}

export const handleEditProject = (e, host, userid, project, description, link) => {
    const data = {
        "uid": userid,
        "project": project,
        "description": description,
        "link": link
    }

    const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

    axios.put(url, data)
    .then(function (response) {
        Router.push("/user/home");
      })
      .catch(function (error) {
        alert("Error while editing");  
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
      });
}

export const handleDeleteProject = (host, userid, project) => {

    const data = {
        "project": project,
        "uid": userid
    }  

    const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

    console.log(url);

    axios.delete(url, {data: data})
    .then(function (response) {
        Router.push("/user/home");
      })
      .catch(function (error) {
        alert("Error Deleting Project"); 
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
      });
  }

export const handleLeaveProject = (e, host, userid, project) => {

    const data = {
      "project": project,
      "uid": userid
    }

    const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

    axios.put(url, data)
        .then(function (response) {
          Router.push("/user/home");
      })
      .catch(function (error) {
        alert("Error leaving.");  
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
      });
}


export const handleEditUser = (host, userid, tag)  => {

    const data = {
        "uid": userid,
        "tag": tag
      }
      
      const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

      axios.put(url, data)
            .then(function (response) {
            // Do Nothing
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}



