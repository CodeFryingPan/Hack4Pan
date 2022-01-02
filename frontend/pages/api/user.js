import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"
import clientPromise from '../../../src/util/mongodb'
var sha = require('sha.js');

const handler = async (req, res) => {
    const client = await clientPromise
    var ObjectId = require('mongodb').ObjectId

    const session = await getSession({ req })

    if (session) {    
        if (req.method  === 'GET') {
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
            
            return res.status(200).send({data: projectPinResult});
        } else if (req.method === "GET") {
            const body = req.body;
            
            // Check if user id is in body for checking
            if (!body.hasOwnProperty("uid") {
                return res.status(422).send({data: "Mising required parameter"})
            }

            const query = {"uid": body.uid};
            const user = await userCollection.findOne(query)

            if (user.uid !== session.user.id) {
                return res.status(403).send({data: "Invalid User ID only the user set as Leader can create the project!"})
            }
            return res.status(200).send({data: project})

        }
    } else {
        return res.status(401)
    }
}

export default handler;