import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"
import clientPromise from '../../src/util/mongodb'

const handler = async (req, res) => {
    const client = await clientPromise

    if (req.method  == 'POST') {
        const body = req.body;
        
        console.log("HERE")
        console.log(body);

        // server side props to make api to db to join team
        const teamsCollection = await client.db("Panathon").collection("Teams")
        
        const result = await teamsCollection.insertOne(body)
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        return res.status(200).send({data: result})
    } else if (req.method == "PUT") {

    } else if (req.method == "GET") {
        const body = req.body;
        const database = client.db("Panathon").database.collection("Teams");
        const user = await usersCollection.findOne({"uid": session.user.id});


    } else if (req.method == "DELETE") {

    }
}

export default handler;