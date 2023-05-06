import React, { useState, useEffect } from "react";
import { Button, Card, CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import { Storage } from "aws-amplify";
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
    const ticketAvailability = {
      ON_SALE: "On Sale",
      COMING_SOON: "Coming Soon",
      SOLD_OUT: "Sold Out",
      FREE: "Free"
    };

    return ticketAvailability[string] || "";
  };

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

  const getColorClass = (index) => {
    return index % 2 === 0 ? "ticket-status-even" : "ticket-status-odd"
  }
  const standardTime = convertToStandardTime(time);
  const formattedDate = formatDate(date);
  const formattedTicketAvailability = getTicketAvailability(ticketAvailability)
  const colorClass = getColorClass(index)

  return (

    <Card className="event-card">

      <CardContent className={colorClass}>
        <Typography variant="h6"><strong>{formattedTicketAvailability}</strong></Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h4">
          {formattedDate}
        </Typography>
        <Typography variant="h5">
          {standardTime}
        </Typography>
        <Typography variant="h6">
          <a href={veneueUrl}>
            {location}
          </a>
        </Typography>
        <Typography variant="h6">
          ${ticketPrice}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={imageUrl}
        alt="Event Image"
        style={{ aspectRatio: 4 / 2 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div" sx={{ textDecoration: 'underline' }}>
          {title}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {subTitle}
        </Typography>
        <Typography variant="h7" color="text.secondary">
          {extraInfo}
        </Typography>
      </CardContent>
      <CardActions className="event-actions">
        <Button size="large" onClick={() => { openNewTab(bandUrl) }}>Learn More</Button>
        <Button size="large" onClick={() => { openNewTab(googleMapsUrl) }}>Map</Button>
        <FacebookShareButton quote={`${title}: live at ${location}`} url="https://www.aaronkrings.com/"><FacebookIcon size={40} round={true} /></FacebookShareButton>
        <TwitterShareButton url="https://www.aaronkrings.com" title={`${title}: live at ${location}`} caption={subTitle}><TwitterIcon size={40} round={true} /></TwitterShareButton>

      </CardActions>
    </Card>
  )
};

export default EventCard;
