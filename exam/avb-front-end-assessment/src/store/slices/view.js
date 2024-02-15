import { createSlice, createSelector } from "@reduxjs/toolkit";

export const name = "view";
const initialState = {
  commentsModalOpen: false,
};

const viewSlice = createSlice({
  name,
  initialState,
  reducers: {
    openCommentsModal(state) {
      state.commentsModalOpen = true;
    },
    closeCommentsModal(state) {
      state.commentsModalOpen = false;
    },
  },
});

const getSlice = (state) => state[name] || {};

export const getViewCommentsModalOpen = createSelector(
  getSlice,
  (slice) => slice.commentsModalOpen
);

export const { openCommentsModal, closeCommentsModal } = viewSlice.actions;
export default viewSlice.reducer;
