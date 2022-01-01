import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import clientPromise from "../../src/util/mongodb";

import JoinProject from '../../src/components/project/join';

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

    return { props: { user: JSON.parse(JSON.stringify(user))}}
}

export default function JoinProjectPage({ user }) {
    return (
        <div>
            <Head>
                <title> Hack4Pan | Join Project </title>
                <meta name="description" content="Hack4Pan hackathon" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <JoinProject user={user}/>
        </div>
    )
}