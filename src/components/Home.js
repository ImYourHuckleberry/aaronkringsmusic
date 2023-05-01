import React from 'react';
import './Bio.css';
import ContactCreateForm from '../ui-components/ContactCreateForm';
import StyledContactFormCard from './StyledContactFormCard';
import Bio from "./Bio"
import Media from "./Media"
import StandardCard from './StandardCard';
import EmailIcon from '@mui/icons-material/Email';
import Fab from '@mui/material/Fab';
import Title from './Title'

const Home = () => {

    const handleScrollToContact = () => {
        const section = document.getElementById('contact');
        const yOffset = -80;

        const top = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top });
    };

    return (
        <div className="bio-container" id="home">
            <Title />
            <StandardCard
                title="New Album: "
                italics="NOW HEAR THIS!"
                mediaSource="https://aaronkringsmusic-storage-5a99e8b203307-staging.s3.amazonaws.com/nowhearthis.jpg"
                mediaType="picture"
                link='https://jonolejnik.bandcamp.com/album/now-hear-this'
                alt="NOW HEAR THIS! Album Cover."
                subtitle="Available Now"
                callToAction="Buy"
                className="bio-card"
            />
            <StandardCard
                title="Now Playing in: "
                italics="The Million Dollar Quartet"
                mediaSource="https://aaronkringsmusic-storage-5a99e8b203307-staging.s3.amazonaws.com/MDQ.png"
                mediaType="picture"
                link='https://thewicktheatre.thundertix.com/events/197583'
                alt="Million Dollar Quartet promotional picture"
                subtitle="April 20 - May 14"
                callToAction="Get Tickets"
                className="bio-card"
            />
            <div id="bio"></div>
            <Bio />
            <div id="listen"></div>
            <Media />
            <div id="contact"></div>
            <StyledContactFormCard id="contact"><ContactCreateForm /></StyledContactFormCard>
            <div>
            </div>
            <div className="fab-container">
                <Fab color="primary" aria-label="add" size="small">
                    <EmailIcon onClick={() => handleScrollToContact()} />
                </Fab>
            </div>
        </div>
    );
};

export default Home;
