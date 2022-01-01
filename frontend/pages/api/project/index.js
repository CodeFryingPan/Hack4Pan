import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"
import clientPromise from '../../../src/util/mongodb'
var sha = require('sha.js');

const handler = async (req, res) => {
    const client = await clientPromise
    var ObjectId = require('mongodb').ObjectId

    const session = await getSession({ req })

    if (session) {    
        if (req.method  === 'POST') {
            const body = req.body;
            
            // Check if user id is in body for checking
            if (!body.hasOwnProperty("leader") && !body.hasOwnProperty("projectName") && !body.hasOwnProperty("projectDescription")
            && !body.hasOwnProperty("projectLink"))  {
                return res.status(422).send({data: "Mising required parameter"})
            }

            // Regex to check only for english letters and numbers
            if (!(/^[A-Za-z0-9 ]+$/.test(body.projectName))) {
                return res.status(403).send({data: "Invalid project name, should only contain letters or numbers."})
            }

            if (body.leader !== session.user.id) {
                return res.status(403).send({data: "Invalid User ID only the user set as Leader can create the project!"})
            }

            // Check if project exists
            const projectsCollection = await client.db("Panathon").collection("Projects")
            
            let regex = new RegExp("^" + body.projectName + "$", "i");
            const query = {"projectName": regex};
            const project = await projectsCollection.findOne(query)

            if (project) {
                return res.status(403).send({data: "Project with that name already exists! Please change your project name."})
            }

            body.pin = null;

            const result = await projectsCollection.insertOne(body)
            console.log(`A document was inserted with the _id: ${result.insertedId}`);

            // generate project pin
            const projectId = result.insertedId;
            const projectPin = sha('sha256').update(JSON.stringify(projectId)).digest('hex');
            const projectFilter = {_id: ObjectId(projectId)};
            const updateProject = { $set: { pin: projectPin}};
            const projectPinResult = await projectsCollection.updateOne(projectFilter, updateProject);
            console.log(projectPinResult);

            const options = { upsert: false };
            const userFilter = {uid: body.leader}
            const updateUser = { $set: { project: result.insertedId}};

            const usersCollection = await client.db("Panathon").collection("Users")
            const userResult = await usersCollection.updateOne(userFilter, updateUser, options)
            console.log(`A document was updated with the _id: ${userResult.modifiedCount}`);

            
            return res.status(200).send({data: projectPinResult});
        } else if (req.method === "PUT") {
            const body = req.body;

            // Check if user id is in body for checking
            if (!body.hasOwnProperty("uid") && !body.hasOwnProperty("project") && !body.hasOwnProperty("description") && !body.hasOwnProperty("link"))  {
                return res.status(422).send({data: "Mising required parameter"})
            }
            
            // Check if the user is the correct user doing the request
            if (body.uid !== session.user.id) {
                return res.status(401).send({data: "Unauthorized to access that route!"})
            }

            const projectID = body.project._id;
            const projectsCollection = client.db("Panathon").collection("Projects");
            const projectQuery = {_id: ObjectId(projectID)}
            const project = await projectsCollection.findOne(projectQuery);
            
            // Check if user and project exists and is apart of project
            if (typeof project === "undefined" || project === null) {
                return res.status(404).send({data: "Project does not exist"})
            }

            const userQuery = {uid: body.uid, project: ObjectId(projectID)}
            const usersCollection = await client.db("Panathon").collection("Users");
            const user = await usersCollection.findOne(userQuery)

            // Check if user and project exists 
            if (typeof user === "undefined" || user === null) {
                return res.status(404).send({data: "User does not exist or is not apart of Project"})
            }
            

            const filter = {_id: ObjectId(projectID)}

            const updateDoc = { $set: 
                { 
                    description: body.description, 
                    link: body.link
                }
            };

            const updateResult = await client.db("Panathon").collection("Projects").updateOne(filter, updateDoc)
            console.log(updateResult);
            console.log(`A document was updated with the _id: ${updateResult.modifiedCount}`);
            
            return res.status(200).send({data: updateResult})
        } else if (req.method === "GET") {
            const body = req.body;

            // Check if user id is in body for checking
            if (!body.hasOwnProperty("uid"))  {
                return res.status(422).send({data: "Mising required parameter"})
            }

            const projectsCollection = client.db("Panathon").collection("Projects");
            const project = await projectsCollection.findOne({"uid": body.uid});
            
            return res.status(200).send({data: project})

        } else if (req.method === "DELETE") {
            const body = req.body;
            const projectID = body.project._id
            
             // Check if user id is in body for checking
            if (!body.hasOwnProperty("project"))  {
                return res.status(422).send({data: "Mising required parameter"})
            }

            // server side props to make api to db to join team
            const projectsCollection = await client.db("Panathon").collection("Projects")
            const query = {_id: ObjectId(projectID)}
            const project = await projectsCollection.findOne(query);
            
            // Check if user and project exists for kicking
            if (typeof project === "undefined" || project === null) {
                return res.status(404).send({data: "Project does not exist"})
            }

            // Check if the user is the leader
            if (project.leader !== session.user.id) {
                return res.status(401).send({message: "Unauthorized to access that route!"})
            }
            
            const result = await projectsCollection.deleteOne(query)
            console.log(`Documents deleted: ${result.deleteCount}`);

            const filter = {project: ObjectId(projectID)}
            const updateDoc = { $set: { project: undefined}};

            const usersCollection = await client.db("Panathon").collection("Users");
            const userResult = await usersCollection.updateMany(filter, updateDoc)
            console.log(userResult);
            console.log(`A document was updated with the _id: ${userResult.modifiedCount}`);
            
            return res.status(200).send({data: userResult})
        }   
    } else {
        return res.status(401)
    }
}

export default handler;