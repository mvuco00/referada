import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../utils/formatDate";
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

const FindHistoryData = ({ open, onClose }) => {
  const classes = useStyles();
  const [studentId, setStudetnId] = useState("");
  const [studentHistoryData, setStudentHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.put(
        `http://localhost:8080/student/assetHistory/${studentId}`
      );
      console.log(res?.data);
      setStudentHistoryData(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  console.log(studentHistoryData);

  return (
      <Box className={classes.dialogwarpper}> 
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Find student record</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter student ID to find student records
        </DialogContentText>
        <TextField
          autoFocus
          variant="outlined"
          label="Student ID"
          fullWidth
          onChange={(event) => setStudetnId(event.target.value)}
        />
      </DialogContent>

      {studentHistoryData.length !== 0 && (
        <Box className={classes.wrapper}>
          {studentHistoryData.map((item) => (
            <Box key={item.TxId} className={classes.hashBox}>
                <Typography className={classes.date}>{formatDate(item.Timestamp.seconds)}</Typography>
              <Typography>{item.TxId}</Typography>
              <Typography>ID: {item.Value.ID}</Typography>
              <Typography>Name: {item.Value.Name}</Typography>
              <Typography>Collage: {item.Value.Collage}</Typography>
              <Typography>Grade: {item.Value.Grade}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {studentHistoryData.length === 0 && (
          <Button onClick={(e) => handleSubmit(e)} color="primary">
            {loading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default FindHistoryData;

const useStyles = makeStyles({
  dialogwarpper: {
    width: "1000px",
  },
  wrapper:{
    overflowY: "scroll"
  },
  date:{
      fontWeight:'bold'
  },
  hashBox:{
      margin:'20px 10px 20px 20px'
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },
});
