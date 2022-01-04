// api/project/{:ID} 
import clientPromise from '../../../src/util/mongodb'
import { getSession } from "next-auth/react"

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

            const filterProject = {pin: body.pin};
            const projectCollection = await client.db("Panathon").collection("Projects");
            const project = await projectCollection.findOne(filterProject);

            // Check if project exists for kicking
            if (typeof project === "undefined" || project === null) {
                return res.status(404).send({data: "Pin does not exist"})
            }

            // SEARCH USERS
            const queryUsers = { project: project._id}
            const usersCollection = await client.db("Panathon").collection("Users")
            
            const count = await usersCollection.find(queryUsers).count();
            
            if(count < 4) {
                
                // find user and update
                const userid  = body.uid;
                const options = { upsert: false };
                const filter = {uid: userid}
                const updateDoc = { $set: { project: project._id}};

                const userResult = await usersCollection.updateOne(filter, updateDoc, options)
                console.log(`A document was updated with the _id: ${userResult.modifiedCount}`);
                
                return res.status(200).send({data: userResult})

            } else {
                return res.status(409).send({data: "You cannot join a team that is already full :(" });
            }
        } 
    } else {
      // Not Signed in
      return res.status(401).send({data : "Failed to get user session"})
    }
}

export default handler;