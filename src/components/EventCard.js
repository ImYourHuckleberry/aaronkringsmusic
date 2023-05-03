import React from "react";
import { Card, CardContent, Typography } from '@mui/material';

const EventCard = ({ time, date, title, subTitle, extraInfo, location, veneueUrl, bandUrl }) => {
    const convertToStandardTime = (militaryTime) => {
        const [hours, minutes] = militaryTime.split(":");
        let period = "AM";
      
        if (Number(hours) >= 12) {
          period = "PM";
        }
      
        let standardHours = (Number(hours) % 12) || 12;
      
        return `${standardHours}:${minutes} ${period}`;
      };
    const standardTime = convertToStandardTime(time);
    return (
    <Card variant="outlined">
      <CardContent>
      <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Typography variant="h6" component="h4">
          {subTitle}
        </Typography>
        <Typography variant="h5" component="h2">
          {date}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {standardTime}
        </Typography>
        
        <Typography variant="body1" component="p">
          {extraInfo}
        </Typography>
        <Typography variant="body2" component="p">
          Location: {location}
        </Typography>
        <p><a href={veneueUrl}>{location}</a></p>
        <p><a href={bandUrl}>More information about {title}</a></p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
