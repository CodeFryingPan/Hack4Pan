import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"
import clientPromise from '../../../src/util/mongodb'

const handler = async (req, res) => {
    const client = await clientPromise

    const session = await getSession({ req })
    if (session) { 
       if (req.method === "DELETE") {
            const body = req.body;
            var ObjectId = require('mongodb').ObjectId;

            // Check if user and project exists for kicking
            if (!body.hasOwnProperty("uid") && !body.hasOwnProperty("project")) {
                return res.status(422).send({message: "Mising required process"})
            }

            // User to delete
            const userid = body.uid;
            const userKick = await client.db("Panathon").collection("Users").findOne({"uid": userid});           

            const filterProject = {_id: new ObjectId(body.project._id)};
            const projectCollection = await client.db("Panathon").collection("Projects");
            const project = await projectCollection.findOne(filterProject);

            // Check if user and project exists for kicking
            if (typeof project === "undefined" || project === null) {
                return res.status(404).send({message: "Project does not exist"})
            }

            if (typeof userKick === "undefined" || userKick === null) {
                return res.status(404).send({message: "User does not exist"})
            }

            // Check if the user is the leader
            if (project.leader !== session.user.id) {
                return res.status(401).send({message: "Unauthorized to access that route!"})
            } 

            const options = { upsert: false };
            const filter = {uid: userid};
            const updateDoc = { $set: { project: undefined}};

            const usersCollection = await client.db("Panathon").collection("Users")
            const userResult = await usersCollection.updateOne(filter, updateDoc, options)
            console.log(`A document was updated with the _id: ${userResult.insertedId}`);
        
            return res.status(204).send({message: userResult})
            
        } else {
            return res.status(405).send({message: "Invalid Method."})
        } 
    } else {
      return res.status(401).send({message: "Authentication required!"})
    }
}

export default handler;