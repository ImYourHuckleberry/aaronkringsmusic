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
import Events from './Events';
import { Card, styled } from '@mui/material'

const Home = () => {
    const StyledCard = styled(Card)(({ theme }) => ({
        paddingTop: '2rem',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '2rem',
        backgroundColor: '#fff',
        height: 'fit-content',
    }));
    const handleScrollToContact = () => {
        const section = document.getElementById('contact');
        const yOffset = -80;

        const top = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top });
    };

    return (
        <div className="bio-container" id="home">
            <div className='title-container'>
                <Title className="name-title" />
            </div>
            <div id='events' className='card-container'>
                <Events />
               
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
