
import Router from "next/router";
import axios from "axios";

export const handleCreateProject = async (host, userId, pname) => {
    const project = {
        leader: userId,
        projectName: pname,
        description: "",
        link: "",
        presentation: ""
    }

    const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

    await axios.post(url, project)
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        if (error.response) {
            alert(error.response.data.message);
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
    
    const url = host == "localhost:3000" ? `http://${host}/api/project/kick` : `https://${host}/api/project/kick`;

    axios.delete(url, {data: body})
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        if (error.response) {
            alert(error.response.data.message);
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

    const url = host == "localhost:3000" ? `http://${host}/api/project/join` : `https://${host}/api/project/join`;

    await axios.put(url, body)
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }); 
}

export const handleEditProject = (e, host, userid, project, description, link, presentation) => {
    const data = {
        "uid": userid,
        "project": project,
        "description": description,
        "link": link, 
        "presentation": presentation
    }

    const url = host == "localhost:3000" ? `http://${host}/api/project` : `https://${host}/api/project`;

    axios.put(url, data)
    .then(function (response) {
        Router.push("/user/home");
      })
      .catch(function (error) {
        if (error.response) {
            alert(error.response.data.message);
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

    axios.delete(url, {data: data})
    .then(function (response) {
        Router.push("/user/home");
      })
      .catch(function (error) {
        if (error.response) {
            alert(error.response.data.message);
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

    const url = host == "localhost:3000" ? `http://${host}/api/project/leave` : `https://${host}/api/project/leave`;

    axios.put(url, data)
        .then(function (response) {
          Router.push("/user/home");
      })
      .catch(function (error) {
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
      });
}


export const handleEditUser = (host, userid, tag, image)  => {

    const data = {
        uid: userid,
        tag: tag,
        image: image
      }
      
      const url = host == "localhost:3000" ? `http://${host}/api/user` : `https://${host}/api/user`;

      axios.put(url, data)
            .then(function (response) {
        })
        .catch(function (error) {
            
            if (error.response) {
                // alert(error.response.data.message);
                console.log(error.response.message);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}


export const handleChangeLeaderProject = (e, host, userid, project) => {
    e.preventDefault;
    
    const body = {
      "project": project,
      "uid": userid
    }
    
    const url = host == "localhost:3000" ? `http://${host}/api/project/changeleader` : `https://${host}/api/project/changeleader`;

    axios.put(url, body)
    .then(function (response) {
        Router.push("/user/home");
    })
    .catch(function (error) {
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });     
}