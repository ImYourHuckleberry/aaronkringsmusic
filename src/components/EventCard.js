import React, { useState, useEffect } from "react";
import { Button, Card, CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import { Storage } from "aws-amplify";
import { LocationOn } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import "./EventCard.css"; // Import the CSS file;
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";

const EventCard = ({
  time,
  date,
  title,
  subTitle,
  extraInfo,
  location,
  veneueUrl,
  bandUrl,
  image,
  ticketPrice,
  ticketAvailability,
  googleMapsUrl,
  index
}) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getImage = async (image) => {
      try {
        const url = await Storage.get(image);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (image && !imageUrl) {
      getImage(image);
    }
  }, [image, imageUrl]);

  const openNewTab = (url) => {
    window.open(url, '_blank').focus()
  }

  const getTicketAvailability = (string) => {
    console.log(string)
    switch (string) {
      case "ON_SALE":
        return ("On Sale")
        break;
      case "COMING_SOON":
        return ("Coming Soon")
        break;
      case "SOLD_OUT":
        return ("Sold Out")
        break;
      case "Free":
        return ("Free")
        break;
      default:
      // code block
    }
  }

  const convertToStandardTime = (militaryTime) => {
    if (militaryTime) {
      const [hours, minutes] = militaryTime.split(":");
      let period = "AM";

      if (Number(hours) >= 12) {
        period = "PM";
      }

      let standardHours = (Number(hours) % 12) || 12;

      return `${standardHours}:${minutes} ${period}`;
    }
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

  const getColorClass=(index)=>{
    return index % 2 === 0 ? "ticket-status-even" : "ticket-status-odd"
  }
  const standardTime = convertToStandardTime(time);
  const formattedDate = formatDate(date);
  const formattedTicketAvailability = getTicketAvailability(ticketAvailability)
  const colorClass = getColorClass(index)
  return (
    <Card sx={{ maxWidth: 345 }}>

      <CardContent className={colorClass}>
        <Typography variant="h6"><strong>{formattedTicketAvailability}</strong></Typography>
      </CardContent>
      <CardContent>
        <Typography>
          {formattedDate}
        </Typography>
        <Typography>
          {standardTime}
        </Typography>
        <Typography>
          <a href={veneueUrl}>
            {location}
          </a>
        </Typography>
        <Typography>
          ${ticketPrice}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt="Event Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {extraInfo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={() => { openNewTab(bandUrl) }}>Learn More</Button>
        <Button size="small" onClick={() => { openNewTab(googleMapsUrl) }}>Map</Button>
        <FacebookShareButton quote={`${title}: live at ${location}`} url="https://www.aaronkrings.com/"><FacebookIcon size={32} round={true} /></FacebookShareButton>
        <TwitterShareButton url="https://www.aaronkrings.com" title={`${title}: live at ${location}`} caption={subTitle}><TwitterIcon size={32} round={true}/></TwitterShareButton>
      </CardActions>
    </Card>
  )
};

export default EventCard;
