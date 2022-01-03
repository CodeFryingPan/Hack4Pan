// api/project/{:ID} 
import clientPromise from '../../../src/util/mongodb'
import { getSession } from "next-auth/react"
import { logger } from "../../../src/util/logger";

const handler = async (req, res) => {
    const client = await clientPromise
    
    const session = await getSession({ req })
    if (session) { 
        if (req.method === "PUT") {
            // JOIN USER TO A PROJECT
            /* 
                1. find user with userid
                2. verify if password is correct with project collection
                3. set project to projectname which is in body
            */
            const body = req.body;
            
            // Check if user id is in body for checking
            if (!body.hasOwnProperty("uid") && !body.hasOwnProperty("pin"))  {
                return res.status(422).send({data: "Mising required process"})
            }

            if (body.uid !== session.user.id) {
                return res.status(401).send({data: "Unauthorized to access that route!"})
            }
            logger(body.pin);

            const filterProject = {pin: body.pin};
            const projectCollection = await client.db("Panathon").collection("Projects");
            const project = await projectCollection.findOne(filterProject);

            // Check if project exists for kicking
            if (typeof project === "undefined" || project === null) {
                return res.status(404).send({data: "Pin does not exist"})
            }

            // find user and update
            const userid  = body.uid;
            const options = { upsert: false };
            const filter = {uid: userid}
            const updateDoc = { $set: { project: project._id}};

            const usersCollection = await client.db("Panathon").collection("Users")
            const userResult = await usersCollection.updateOne(filter, updateDoc, options)
            logger(`A document was updated with the _id: ${userResult.modifiedCount}`);
            
            return res.status(200).send({data: userResult})
        } 
    } else {
      // Not Signed in
      return res.status(401).send({"Error" : "Failed to get user session"})
    }
}

export default handler;