import { useState } from "react";
import {
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const TransferDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const [studentId, setStudentId] = useState("");
  const [responseId, setResponseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [collage, setCollage] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const handleFindStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8080/student/readAsset/${studentId}`
      );
      setResponseId(res?.data);
      setName(res?.data?.Name);
      setGrade(res?.data?.Grade);
      setCollage(res?.data?.Collage);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8080/student/transferAsset/${studentId}/${collage}`
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Transfer student</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter student information</DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          label="Student ID"
          fullWidth
          className={classes.input}
          onChange={(event) => setStudentId(event.target.value)}
        />
        {responseId && (
          <Box>
            <TextField
              variant="outlined"
              label="Student name"
              fullWidth
              className={classes.input}
              value={name}
              disabled
            />

            <TextField
              variant="outlined"
              label="Student grade"
              fullWidth
              className={classes.input}
              value={grade}
              disabled
            />

            <TextField
              variant="outlined"
              label="Collage"
              fullWidth
              className={classes.input}
              value={collage}
              onChange={(event) => setCollage(event.target.value)}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {!responseId && (
          <Button onClick={(e) => handleFindStudent(e)} color="primary">
            {loading ? <CircularProgress color="primary" size={24} /> : "Find"}
          </Button>
        )}
        {responseId && (
          <Button onClick={(e) => handleTransfer(e)} color="primary">
            Update
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TransferDialog;

const useStyles = makeStyles({
  input: {
    marginBottom: "15px",
  },
});
