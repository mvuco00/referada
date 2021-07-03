import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const FindRecordDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Find student record</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter student ID to find student records
        </DialogContentText>
        <TextField autoFocus variant="outlined" label="Student ID" fullWidth />
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

export default FindRecordDialog;
