import React, {useState, useEffect} from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { Storage } from "aws-amplify";
import './EventCard.css'; // Import the CSS file

const EventCard = ({ time, date, title, subTitle, extraInfo, location, veneueUrl, bandUrl, image }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getImage = async (key) => {
      try {
        const url = await Storage.get(key);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (image) {
      getImage(image);
    }
  }, [image]);


    const convertToStandardTime = (militaryTime) => {
      if(militaryTime){
        const [hours, minutes] = militaryTime.split(":");
        let period = "AM";
      
        if (Number(hours) >= 12) {
          period = "PM";
        }
      
        let standardHours = (Number(hours) % 12) || 12;
      
        return `${standardHours}:${minutes} ${period}`;}
      };
      const formatDate = (dateString) => {
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        };
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', options);
      };

    const standardTime = convertToStandardTime(time);
    const formattedDate = formatDate(date);

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
        <span>{formattedDate}</span><span> at </span><span>{standardTime}</span>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          
        </Typography>
        <Typography className="image-container">
        {imageUrl && <img className='event-image' src={imageUrl} alt="Event" />} {/* Render the image if it exists */}
        </Typography>
        <Typography variant="body1" component="p">
          {extraInfo}
        </Typography>
        <Typography variant="body2" component="p">
        Location: <a href={veneueUrl}>{location}</a>
        </Typography>
        <p><a href={bandUrl}>More information about {title}</a></p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
