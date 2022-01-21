// api/project/{:ID} 
import clientPromise from '../../../src/util/mongodb'
import { getSession } from "next-auth/react"

const handler = async (req, res) => {
    const client = await clientPromise;
    var ObjectId = require('mongodb').ObjectId;
    
    const session = await getSession({ req });
    if (session) { 
        if (req.method === "PUT") {
            // user leave project
            const body = req.body;
            
            // Check if user exists for leaving
            if (!body.hasOwnProperty("uid")) {
                return res.status(422).send({message: "Mising required process"})
            }

            if (body.uid !== session.user.id) {
                return res.status(401).send({message: "Unauthorized to access that route!"})
            }
            
            const filter = {uid: body.uid}
            const updateDoc = { $set: { project: undefined}};

            const usersCollection = await client.db("Panathon").collection("Users");
            const userResult = await usersCollection.update(filter, updateDoc)
            
            console.log(userResult);
            console.log(`A document was updated with the _id: ${userResult.modifiedCount}`);
            
            return res.status(200).send({message: "Leave succesful."});
        } else {
            return res.status(405).send({message: "Invalid Method."})
        } 
    } else {
      // Not Signed in
      return res.status(401).send({message: "Authentication required!"})
    }
}

export default handler;