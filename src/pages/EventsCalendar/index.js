import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import {
  makeStyles,
  Container,
  Grid,
  Box,
  Typography,
} from '@material-ui/core';

import EventCard from './EventCard';
import { GET_EVENT_LIST } from './queries';

const useStyles = makeStyles({
  root: {
    maxwidth: '100%',
    width: '90%',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  },
  headingBox: {
    margin: '6rem 0 2rem 3rem',
    fontWeight: '400',
    borderColor: '#D3D3D3',
  },
  grid: {
    marginLeft: '3rem',
  },
});

export default function EventsCalendar() {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_EVENT_LIST);
  // refetches EVENT_LIST without refreshing page
  useEffect(() => {
    refetch();
  }, []);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <main>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h3" gutterBottom>
          Upcoming Events
        </Typography>
      </Box>
      <Grid className={classes.grid}>
        {data &&
          data?.events?.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
      </Grid>
    </main>
  );
}
