import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"
import clientPromise from '../../src/util/mongodb'

const handler = async (req, res) => {
    const client = await clientPromise
    var ObjectId = require('mongodb').ObjectId

    const session = await getSession({ req })
    
    if (session) {    
        if (req.method  === 'GET') {
            const query = req.query;

            // Check if user id is in body for checking
            if (!query.hasOwnProperty("uid")) {
                return res.status(422).send({message: "Mising required parameter"})
            }

            const idQuery = {"uid": query.uid};
            const user = await client.db("Panathon").collection("Users").findOne(idQuery)

            if (user.uid !== session.user.id || session.user.id !== query.uid) {
                return res.status(403).send({message: "Invalid User ID only the user can get their specified user!"})
            }

            return res.status(200).send({user: user})
        } else if(req.method === "PUT") {
            const body = req.body;

            if (!body.hasOwnProperty("tag") || !body.hasOwnProperty("uid"))  {
                return res.status(422).send({message: "Mising required parameter"})
            }

            if (body.uid !== session.user.id) {
                return res.status(403).send({message: "Invalid User ID only the authenticated user can update user!"})
            }

            const idQuery = {"uid": body.uid};
            const user = await client.db("Panathon").collection("Users").findOne(idQuery)
            
            if (user) {
                const userFilter = {uid: body.uid};
                const updateUser = { $set: { tag: body.tag}};
                const userUpdateResult = await client.db("Panathon").collection("Users").updateOne(userFilter, updateUser);
                
                return res.status(200).send({data: userUpdateResult});
            } else {
                return res.status(404).send({message: "User does not exist in database."})
            }
        } else if (req.method === "POST") {
            return res.status(405).send({message: "Not Yet Implemented"})
        } else {
            return res.status(405).send({message: "Invalid Method."})
        }
    } else {
        return res.status(401).send({data : "Failed to get user session"})
    }
}

export default handler;