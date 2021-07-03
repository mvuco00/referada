import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const UpdateStudentDialog = ({ open, onClose }) => {
  const classes = useStyles();
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
        />
        <TextField
          variant="outlined"
          label="Student name"
          fullWidth
          className={classes.input}
        />

        <TextField
          variant="outlined"
          label="Student grade"
          fullWidth
          className={classes.input}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Submit
        </Button>
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
