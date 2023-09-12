import React from 'react';
import { Card, CardContent, Button, styled } from '@mui/material';
import './Bio.css';

const StandardCard = (props) => {
    const { title, italics, mediaSource, mediaType, link, alt, subtitle, callToAction, className } = props;
    const handleButtonAlbum = () => {
        window.open(
            'https://jonolejnik.bandcamp.com/album/now-hear-this',
            '_blank' // <- This is what makes it open in a new window.
        );
    }
    const StyledCard = styled(Card)(({ theme }) => ({
        paddingTop: '2rem',
        width: '100%',
        maxWidth: '800px',
        marginBottom: '2rem',
        backgroundColor: '#fff',
        height: 'fit-content',
      }));

    return (
        <StyledCard className={className} id="current-gig">
            <CardContent>
                <h2>{title}<em>{italics}</em></h2>
                <h3>{subtitle}</h3>
                <div>
                    {mediaType === "picture" && <img src={mediaSource} alt={alt}></img>}
                </div>
                <Button variant="contained" color="success" onClick={handleButtonAlbum}>
                    {callToAction}
                </Button>
            </CardContent>
        </StyledCard>
    )
}

export default StandardCard;