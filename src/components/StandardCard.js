import React from 'react';
import { Card, CardContent, Button } from '@mui/material';
import './Bio.css';

const StandardCard = (props) => {
    const { title, italics, mediaSource, mediaType, link, alt, subtitle, callToAction, className } = props;
    const handleButtonAlbum = () => {
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
        );
    }

    return (
        <Card className={className} id="current-gig">
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
        </Card>
    )
}

export default StandardCard;