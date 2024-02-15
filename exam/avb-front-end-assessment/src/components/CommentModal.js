import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { closeCommentsModal, getViewCommentsModalOpen } from "store/slices/view";
import { addComment } from "store/slices/commentsSlice";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 500,
    outline: "none",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const CommentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const isOpen = useSelector(getViewCommentsModalOpen);

  const handleClose = () => {
    dispatch(closeCommentsModal());
    setName("");
    setComment("");
  };


  const handleSubmit = () => {
    // Dispatch action to add comment to mock comments in Redux state
    dispatch(addComment({ name, comment })); // Dispatching the addComment action with the new comment object

    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="add-comment-modal"
      aria-describedby="add-comment-form"
    >
      <Box className={classes.paper}>
        <IconButton
          aria-label="close"
          className={classes.closeIcon}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" id="add-comment-modal" style={{ paddingBottom: 10 }}>
          Add Comment
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.fullWidth}
          />
          <TextField
            label="Comment"
            variant="outlined"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={classes.fullWidth}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.fullWidth}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CommentModal;
