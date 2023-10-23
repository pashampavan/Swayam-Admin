import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
const EventThumbnail = ({ title, url, date, imageOne, imageTwo, id }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/events/add-edit-event/${id}`);
  };

  return (
    <Card 
    onClick={handleCardClick}
    >
      <CardActionArea>
        <img src={imageOne} alt={title} style={{ width: '100%' }} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventThumbnail;
