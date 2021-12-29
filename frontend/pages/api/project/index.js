import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"
import clientPromise from '../../../src/util/mongodb'

const handler = async (req, res) => {
    const client = await clientPromise
    var ObjectId = require('mongodb').ObjectId

    if (req.method  == 'POST') {
        const body = req.body;

        // server side props to make api to db to join team
        const projectsCollection = await client.db("Panathon").collection("Projects")
        
        const result = await projectsCollection.insertOne(body)
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

        const options = { upsert: true };
        const filter = {uid: body.leader}
        const updateDoc = { $set: { project: result.insertedId}};

        const usersCollection = await client.db("Panathon").collection("Users")
        const userResult = await usersCollection.updateOne(filter, updateDoc, options)
        console.log(`A document was updated with the _id: ${userResult.modifiedCount}`);
        
        return res.status(200).send({data: result})
    } else if (req.method == "PUT") {
        // const body = JSON.parse(req.body);
        // const targetUserId = body.uid;
        // const leaderId = body.leaderId
        // // remove user from team collection + remove teamname from users collection
        // const database = client.db("Panathon")
        // const users = database.collection("Users");
        // const teams = database.collection("Teams");

        // const filterUser = { uid: targetUserId };
        // const filterTeams = { leader: leaderId}

        // // update user document
        // const updateUser = {
        //     $set: {
        //         team: null
        //     }
        // };

        // const resultUser = await movies.updateOne(filterUser, updateUser)
        // console.log(
        //     `${resultUser.matchedCount} document(s) matched the filter, updated ${resultUser.modifiedCount} document(s)`,
        // );
     
        // update teams document

    } else if (req.method == "GET") {
        const body = req.body;
        const projectsCollection = client.db("Panathon").database.collection("Projects");
        const project = await projectsCollection.findOne({"uid": body.uid});
        console.log(project);
        
        return res.status(200).send({data: project})

    } else if (req.method == "DELETE") {
        const body = req.body;

        console.log(body.project);
        // server side props to make api to db to join team
        const projectsCollection = await client.db("Panathon").collection("Projects")
        
        const query = {_id: ObjectId(body.project)}
        const result = await projectsCollection.deleteOne(query)
        console.log(`Documents deleted: ${result.deleteCount}`);

        // crypto.createHmac('sha256', "key").update("json").digest("base64");

        const filter = {project: ObjectId(body.project)}
        const updateDoc = { $set: { project: undefined}};

        const usersCollection = await client.db("Panathon").collection("Users");
        const userResult = await usersCollection.updateMany(filter, updateDoc)
        console.log(userResult);
        console.log(`A document was updated with the _id: ${userResult.modifiedCount}`);
        
        return res.status(200).send({data: userResult})
    }
}

export default handler;