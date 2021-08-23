import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "../components/PDFDocument";
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

const FindRecordDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8080/student/readAsset/${studentId}`
      );
      console.log(res?.data);
      setStudentData(res.data);
    } catch (e) {
      setMessage("Student not found");
    } finally {
      setLoading(false);
    }
  };

  console.log(studentData);

  return (
    <Dialog open={open} onClose={onClose}>
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
          onChange={(event) => setStudentId(event.target.value)}
        />
      </DialogContent>

      {Object.keys(studentData).length !== 0 && (
        <Box className={classes.box}>
          <Typography>{studentData.Name}</Typography>
          <Typography>{studentData.Collage}</Typography>
          <Typography>{studentData.Grade}</Typography>
          <Typography>{studentData.Level} degree</Typography>
        </Box>
      )}
      {message && (
        <Box className={classes.box}>
          <Typography>{message}</Typography>
        </Box>
      )}

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {Object.keys(studentData).length === 0 ? (
          <Button onClick={(e) => handleSubmit(e)} color="primary">
            {loading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              "Submit"
            )}
          </Button>
        ) : (
          <Button color="secondary">
            <PDFDownloadLink
              document={
                <PDFDocument
                  name={studentData.Name}
                  collage={studentData.Collage}
                  grade={studentData.Grade}
                />
              }
              fileName={`${studentData?.ID}.pdf`}
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Export to PDF"
              }
            </PDFDownloadLink>
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FindRecordDialog;

const useStyles = makeStyles({
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },
});
