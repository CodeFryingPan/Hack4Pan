import React from 'react';
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import styles from '../styles/Home.module.css'

export default function Profiles() {
    const items = [
        {
            name: "Frying Pan",
            link: 'https://i.ibb.co/7KzNb48/drippan2.png'
        },
        {
            name: "Xin",
            link: 'https://i.ibb.co/KXd1Dkv/dripxin.png'
        },
        {
            name: "Flepal",
            link: 'https://i.ibb.co/X4M8FT8/dripflip.png'
        },
    ];

    return (
        <Carousel className={styles.sizeCarousel}>
            {items.map((item, i) => (
                <Item key={i} {...item} />
            ))}
        </Carousel>
    );
}

const Item = ({name, link}) => {
    return (
        <div className={styles.imageContainer}>
            <Image src={link} width={410} height={666}/>
        </div>
    );
};