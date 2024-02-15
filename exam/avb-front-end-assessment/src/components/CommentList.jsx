import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../store/slices/commentsSlice';
import { Typography, Grid, Paper, Avatar } from '@mui/material'; 

const CommentList = () => {
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const getInitials = (name) => {
    const nameArray = name.split(' ');
    const initials = nameArray.map((n) => n[0]).join('');
    return initials;
  };

  return (
    <Grid container spacing={2}>
      {comments?.map((comment) => (
        <Grid item xs={12} key={comment.id}>
          <Paper elevation={3} style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
            <Avatar>{getInitials(comment.name)}</Avatar> {/* Display Avatar with initials */}
            <div style={{ marginLeft: '20px' }}> {/* Add margin for separation */}
              <Typography variant="h6">{comment.name}</Typography>
              <Typography variant="body1">{comment.comment}</Typography>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CommentList;
