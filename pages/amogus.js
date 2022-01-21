import Head from "next/head";
import styles from "../styles/Amogus.module.css";

export default function Amogus() {
    return (
        <div>
             <Head>
                <title> Hack4Pan </title>
                <meta name="description" content="Hack4Pan hackathon" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <img className={styles.amogus} src="https://i.ibb.co/NyXRxNC/drip.gif" width={500} height={500}/>
        </div>
    )
}