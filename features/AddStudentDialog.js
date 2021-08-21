import { useState } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const AddStudentDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [collage, setCollage] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const student = {
      Id: id,
      Name: name,
      Collage: collage,
      Grade: grade,
    };
    setLoading(true);

    try {
      await axios.post(`http://localhost:8080/student/addAsset`, student);
      setMessage("Student was sucessfully added");
    } catch (e) {
      console.log(e);
      setMessage("Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add new student</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter student information</DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          label="Student ID"
          fullWidth
          className={classes.input}
          onChange={(event) => setId(event.target.value)}
        />
        <TextField
          variant="outlined"
          label="Student name"
          fullWidth
          className={classes.input}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          variant="outlined"
          label="Student collage"
          fullWidth
          className={classes.input}
          onChange={(event) => setCollage(event.target.value)}
        />
        <TextField
          variant="outlined"
          label="Student grade"
          fullWidth
          className={classes.input}
          onChange={(event) => setGrade(event.target.value)}
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
            <Button onClick={handleSubmit} color="primary">
              {loading ? (
                <CircularProgress color="primary" size={24} />
              ) : (
                "Submit"
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

export default AddStudentDialog;

const useStyles = makeStyles({
  input: {
    marginBottom: "15px",
  },
});
