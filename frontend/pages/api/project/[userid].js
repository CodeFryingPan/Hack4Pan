// api/project/{:ID} 
import clientPromise from '../../../src/util/mongodb'

const handler = async (req, res) => {
    const client = await clientPromise

    if (req.method  == 'POST') {

    } else if (req.method == "PUT") {
        // JOIN USER TO A PROJECT
        /* 
            1. find user with userid
            2. verify if password is correct with project collection
            3. set project to projectname which is in body
         */
        const body = req.body;
        
        const filterProject = {"projectName": body.projectName};
        const projectCollection = await client.db("Panathon").collection("Projects");
        const project = await projectCollection.findOne(filterProject);

        if (project) {
            const password = body.password // need to hash
            console.log(body);
            console.log(password)
            console.log(project.password)
            // if password incorrect
            if (password !== project.password) {
                return res.status(401).send();
            }

            // find user and update
            const { userid } = req.query;
            const options = { upsert: false };
            const filter = {uid: userid}
            const updateDoc = { $set: { project: project._id}};

            const usersCollection = await client.db("Panathon").collection("Users")
            const userResult = await usersCollection.updateOne(filter, updateDoc, options)
            console.log(`A document was updated with the _id: ${userResult.modifiedCount}`);
            
            return res.status(200).send({data: userResult})
        } else {
            return res.status(404).send({data: "Project does not exist"})
        }
        

    } else if (req.method == "GET") {

    } else if (req.method == "DELETE") {
        const { userid } = req.query;
        
        

        const options = { upsert: false };
        const filter = {uid: userid};
        console.log(filter);
        const updateDoc = { $set: { project: undefined}};

        const usersCollection = await client.db("Panathon").collection("Users")
        const userResult = await usersCollection.updateOne(filter, updateDoc, options)
        console.log(`A document was updated with the _id: ${userResult.insertedId}`);
        
        return res.status(204).send({data: userResult})
    }
}

export default handler;