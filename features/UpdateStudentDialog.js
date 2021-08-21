import {useState} from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

const UpdateStudentDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const [studentId, setStudentId] = useState('')
  const [responseId, setResponseId] = useState(null)
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')

  console.log(responseId)

  const handleFindStudent = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8080/student/readAsset/${studentId}`
    );
    setResponseId(res?.data)
    setName(res?.data?.Name)
    setGrade(res?.data?.Grade)
    
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8080/student/updateAsset/${studentId}/${name}/${responseId.Collage}/${grade}`
    );
    console.log(res)
  }
 

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update student information</DialogTitle>
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
        {responseId &&( <Box>
          <TextField
             variant="outlined"
             label="Student name"
             fullWidth
             className={classes.input}
             value={name}
             onChange={(event) => setName(event.target.value)}
      />

      <TextField
        variant="outlined"
        label="Student grade"
        fullWidth
        className={classes.input}
        value={grade}
        onChange={(event) => setGrade(event.target.value)}
      /></Box>)
        }
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {!responseId &&  <Button onClick={(e)=>handleFindStudent(e)} color="primary">
          Find
        </Button>}
        {responseId && <Button onClick={(e)=>handleUpdate(e)} color="primary">
          Update
        </Button>}
       
      </DialogActions>
    </Dialog>
  );
};

export default UpdateStudentDialog;

const useStyles = makeStyles({
  input: {
    marginBottom: "15px",
  },
});
