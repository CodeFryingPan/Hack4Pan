import React from 'react';
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

import styles from './Profiles.module.css'

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
            <Image src={link} width={300} height={500}/>
        </div>
    );
};