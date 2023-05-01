import React from 'react';
import './Bio.css';
import ContactCreateForm from '../ui-components/ContactCreateForm';
import StyledContactFormCard from './StyledContactFormCard';
import Bio from "./Bio"
import Media from "./Media"
import StandardCard from './StandardCard';

const Home = () => {
//    StandardCardProps
//    const {title, italics, mediaSource, mediaType, link, alt, handleAction} = this.props;

    return (
        <div className="bio-container" id="home">
            <div className='name-title'>
            <h1 >Aaron Krings</h1>
            <h2>Bassist Performer Educator</h2>
            </div>
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
            <Bio/>
            <Media />
            <StyledContactFormCard id="contact"><ContactCreateForm /></StyledContactFormCard>
            <div>
            </div>
        </div>
    );
};

export default Home;
