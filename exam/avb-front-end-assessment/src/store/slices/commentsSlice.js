import { createSlice, createSelector } from '@reduxjs/toolkit';
import { mockComments } from '../api'; // Importing the mock data
const initialState = {
  comments: mockComments, // Initial state can be an empty array
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action) {
      // state.comments.unshift(action.payload);
      state.comments = state.comments.concat(action.payload);
      state.comments.sort((a, b) => b.commentCount - a.commentCount);
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;

// Simulated async action (fetching comments)
export const fetchComments = () => (dispatch) => {
  // Simulating an API call with setTimeout
  setTimeout(() => {
    dispatch(setComments(mockComments)); // Dispatching the setComments action with mock data
  }, 1000); // Simulating a delay for API response
};


// Selectors
export const selectComments = (state) => state.comments.comments;

export const selectTopCommenters = createSelector(
  selectComments,
  (comments) => {
    const commentersMap = comments.reduce((acc, comment) => {
      if (acc[comment.name]) {
        acc[comment.name].commentCount++;
      } else {
        acc[comment.name] = {
          name: comment.name,
          commentCount: 1,
        };
      }
      return acc;
    }, {});

    const commenters = Object.values(commentersMap);
    const sortedCommenters = commenters.sort((a, b) => b.commentCount - a.commentCount);
    return sortedCommenters.slice(0, 3); // Get top 3 commenters
  }
);
export default commentsSlice.reducer;
