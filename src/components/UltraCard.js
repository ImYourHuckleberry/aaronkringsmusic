import React, { useState, useEffect } from 'react';
import './Bio.css';
import './Events.css'
import EventCard from './EventCard';
import { CardContent, styled, Card, Typography } from '@mui/material';



const UltraCard = ({component}) => {
    const StyledCard = styled(Card)(({ theme }) => ({
        paddingTop: '2rem',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '2rem',
        backgroundColor: '#fff',
        height: 'fit-content',
    }));


    return (

        //This is from Events.js
        <div id="home" className="events-page-container">
            <div className='admin-container'>
                <StyledCard>
                    <Typography style={{ paddingLeft: '2rem' }} variant='h3'>Events</Typography>
                    <CardContent >
                                    {/* this is from EventCard.js the rest of it is styling on that card */}
                                    
                                    {component} 
                    </CardContent>
                </StyledCard>
            </div>

        </div>
    )
}
export default UltraCard;