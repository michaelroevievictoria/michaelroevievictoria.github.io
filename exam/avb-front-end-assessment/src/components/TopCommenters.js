import React from 'react';
import { useSelector } from 'react-redux';
import { selectTopCommenters } from '../store/slices/commentsSlice';
import { Typography, Card, CardContent, Grid, Box, Avatar, SvgIcon } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const TopCommenters = () => {
  const topCommenters = useSelector(selectTopCommenters);

  const getIconColor = (index) => {
    if (index === 0) return '#FFD700'; // Gold color for top 1
    if (index === 1) return '#C0C0C0'; // Silver color for top 2
    if (index === 2) return '#CD7F32'; // Bronze color for top 3
    return undefined; // Default color for other commenters
  };

  return (
    <Grid container spacing={3} style={{marginTop: 10 , marginBottom: 10}}>
      {topCommenters.map((commenter, index) => (
        <Grid item xs={12} sm={12} md={4} key={commenter.name}>
          <Card elevation={3}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SvgIcon
                  component={EmojiEventsIcon}
                  sx={{ fontSize: 50, marginRight: 1 }}
                  style={{ color: getIconColor(index) }}
                />
              </div>
              <Box display="flex" alignItems="center" justifyContent="center">

                <Avatar>{commenter.name.charAt(0)}</Avatar>
                <Typography variant="h6" style={{ marginLeft: '10px' }}>
                  {commenter.name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body1">Comments: {commenter.commentCount}</Typography>
              </Box>

            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCommenters;
