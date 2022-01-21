import Head from "next/head"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import clientPromise from '../../src/util/mongodb'
import CreateProject from "../../src/components/project/create"

export async function getServerSideProps(context) {
    const session = await getSession(context)
  
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }  

    const host =  context.req.headers.host;

    const client = await clientPromise
    await client.connect()

    const usersCollection = await client.db("Panathon").collection("Users")
    const user = await usersCollection.findOne({"uid": session.user.id})

    if (user.project) {
        return {
            redirect: {
              destination: '/user/home',
              permanent: false,
            },
        }
    } 

    return {
        props: { host: host, user: JSON.parse(JSON.stringify(user)) }
    }
}

export default function CreateProjectPage({host, user}) {
    return (
      <div>
        <Head>
            <title> Hack4Pan | Create Project </title>
            <meta name="description" content="Hack4Pan hackathon" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <CreateProject host={host} user={user} />
      </div>
        
    )
};