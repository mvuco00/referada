import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const TransferDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Transfer student</DialogTitle>
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

export default TransferDialog;
