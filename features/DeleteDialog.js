import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";

const DeleteDialog = ({onClose, open}) => {
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const [studentId, setStudentId] = useState('')

    const handleDelete = async () => {
        setLoading(true);

    try {
      await axios.delete(`http://localhost:8080/student/deleteAsset/${studentId}`);
      setMessage("Student was sucessfully deleted");

    } catch (e) {
      console.log(e);
      setMessage("Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
    }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete student records</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter student ID</DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          label="Student ID"
          fullWidth
          className={classes.input}
          onChange={(event) => setStudentId(event.target.value)}
        />

        {message && (
          <Box className={classes.box}>
            <Typography>{message}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {!message ? (
          <Box>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary">
              {loading ? (
                <CircularProgress color="primary" size={24} />
              ) : (
                "Delete"
              )}
            </Button>
          </Box>
        ) : (
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

const useStyles = makeStyles({
    input: {
      marginBottom: "15px",
    },
  });
  