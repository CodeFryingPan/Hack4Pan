import clientPromise from '../../src/util/mongodb'

// export async function getServerSideProps() {
//     try {
//       // client.db() will be the default database passed in the MONGODB_URI
//       // You can change the database by calling the client.db() function and specifying a database like:
//       // const db = client.db("myDatabase");
//       // Then you can execute queries against your database like so:
//       // db.find({}) or any of the MongoDB Node Driver commands
//       const client = await clientPromise
      
//       const database = client.db("Panathon");
//       const users = database.collection("Users").find({}).toArray();

//       return {
//         props: { isConnected: true, users: users },
//       }
//     } catch (e) {
//       console.error(e)
//       return {
//         props: { isConnected: false,  users: users },
//       }
//     }
//   }

export default async (req, res) => {
    const client = await clientPromise
      
    const users = await client.db("Panathon").collection("Users").find({}).toArray();

    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.json(users);
      }
    
      catch (error) {
        res.json(error);
        res.status(405).end();
      }
}