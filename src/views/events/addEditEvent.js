import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Typography, Box, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Image, Subtitles, Title } from '@mui/icons-material';
import Alert from '@mui/material/Alert/Alert';
import axios from 'axios';
import { v4 } from "uuid";
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import apiServices from '../../services/apiServices';

const AddEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventTitle, setEventTitle] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [eventImageOne, setEventImageOne] = useState(null);
  const [eventImageTwo, setEventImageTwo] = useState(null);
  const [eventDate, setEventDate] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default to success

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSaveEvent = async () => {
    if (eventTitle === '' || eventUrl === '' || eventDate === '') {
      showSnackbar('Please fill in all mandatory fields (Event Title, Event URL, and Event Date) before saving.', 'error');
      return;
    }

    try {
      var imageOneURL = "";
      if(eventImageOne.slice(0, 8) === "https://"){
        imageOneURL = eventImageOne;
      }
      else
      {
        const imageOneRef = ref(storage, `eventThumbnailOne/${eventImageOne.name}` + v4());
        await uploadBytes(imageOneRef, eventImageOne);
        imageOneURL = await getDownloadURL(imageOneRef);
      }

      var imageTwoURL = "";
      if(eventImageTwo.slice(0, 8) === "https://"){
        imageTwoURL = eventImageTwo;
      }
      else
      {
        const imageTwoRef = ref(storage, `eventThumbnailTwo/${eventImageTwo.name}` + v4());
        await uploadBytes(imageTwoRef, eventImageTwo);
        imageTwoURL = await getDownloadURL(imageTwoRef);
      }
      const newEvent = {
        eventtitle: eventTitle,
        eventurl: eventUrl,
        eventimageone: imageOneURL,
        eventimagetwo: imageTwoURL,
        eventdate: eventDate,
        id: id || v4(),
      };

      if (id === "b1") {
        const response = await apiServices.saveEvent(newEvent);
        // const response = await axios.post(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events.json`, newEvent); 
        if (response.status === 200) {
          showSnackbar('Event saved successfully!', 'success');
        } else {
          showSnackbar('Failed to save event.', 'error');
        }
        setEventTitle('');
        setEventUrl('');
        setEventImageOne(null);
        setEventImageTwo(null);
        setEventDate('');
      } else {
        await apiServices.updateEvent(id, newEvent);
        // await axios.put(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events/${id}.json`, newEvent); 
        showSnackbar('Event updated successfully!', 'success');
      }

    } catch (error) {
      console.error('Error saving/updating event:', error);
      showSnackbar('An error occurred while saving/updating the event.', 'error');
    }
  };

  useEffect(() => {
    console.log(eventDate)
  }, [eventDate])
  
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id !== "b1") {
      const fetchEvent = async () => {
        try {
          const response = await apiServices.fetchEvent(id);
          // const response = await axios.get(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events/${id}.json`); // Replace with your event API URL
          setData(response.data)
          setEventTitle(response.data.eventtitle);
          setEventUrl(response.data.eventurl);
          setEventImageOne(response.data.eventimageone);
          setEventImageTwo(response.data.eventimagetwo);
          setEventDate(new Date(response.data.eventdate).toISOString().split('T')[0]);
        } catch (error) {
          console.error('Error fetching event:', error);
        }
      };
      fetchEvent();
    }
  }, [id]);

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, maxWidth: '80%', margin: '150px auto' }}>
        <Typography variant="h4">{id !== "b1" ? 'Edit' : 'Add'} Event</Typography>
        <Box my={1}>
          <TextField
            fullWidth
            label="Event Title"
            variant="outlined"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
        </Box>
        <Box my={2}>
          <TextField
            fullWidth
            label="Event URL"
            variant="outlined"
            value={eventUrl}
            onChange={(e) => setEventUrl(e.target.value)}
            required
          />
        </Box>
        <Box my={2}>
            <TextField
                label="Event Date"
                variant="outlined"
                type="date"
                defaultValue={eventDate}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                InputLabelProps={{
                    shrink: true,
                }}
                helperText="Please select the event date"
            />
        </Box>
        <Box my={2}>
          <Typography variant="subtitle1"><b>Event Images One:</b> 1 : 1 (length : breadth)</Typography>

            {id === 'b1' ? (
            <input type="file" accept="image/*" required onChange={(e) => setEventImageOne(e.target.files[0])} />
            ) : (
            <img src={eventImageOne} alt="Thumbnail" width={'40%'} />
            )}
          
          <br/><br/>
          <Typography variant="subtitle2"><b>Event Images Two:</b> 3 : 1 (length : breadth)</Typography>
          {id === 'b1' ? (
            <input type="file" accept="image/*" required onChange={(e) => setEventImageTwo(e.target.files[0])} />
            ) : (
            <img src={eventImageTwo} alt="Thumbnail" width={'40%'} />
            )}
        </Box>
        <Box my={2}>
          <Button variant="contained" onClick={handleSaveEvent}>
            {id !== "b1" ? 'Update Event' : 'Save Event'}
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEditEvent;
