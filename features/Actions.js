import { useState } from "react";
import { Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FindRecordDialog from "./FindRecordDialog";
import AddStudentDialog from "./AddStudentDialog";
import UpdateStudentDialog from "./UpdateStudentDialog";
import TransferDialog from "./TransferDialog";
import DeleteDialog from "./DeleteDialog";

const Actions = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(null);

  const openDialog = (value) => {
    setOpen(value);
  };
  return (
    <Box className={classes.box}>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        className={classes.button}
        onClick={() => openDialog("find-record")}
      >
        Find student records
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        className={classes.button}
        onClick={() => openDialog("add-record")}
      >
        Add new record
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        className={classes.button}
        onClick={() => openDialog("update-record")}
      >
        Update student information
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        className={classes.button}
        onClick={() => openDialog("transfer")}
      >
        Student transfer
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disableElevation
        className={classes.button}
        onClick={() => openDialog("delete")}
      >
        Delete student record
      </Button>

      {open === "find-record" && (
        <FindRecordDialog open={open === "find-record"} onClose={() => setOpen(null)} />
      )}

      {open === "add-record" && (
        <AddStudentDialog open={open === "add-record"} onClose={() => setOpen(null)} />
      )}

      {open === "update-record" && (
        <UpdateStudentDialog open={open === "update-record"} onClose={() => setOpen(null)} />
      )}
      {open === "transfer" && (
        <TransferDialog open={open === "transfer"} onClose={() => setOpen(null)} />
      )}
      {open === "delete" && (
        <DeleteDialog open={open === "delete"} onClose={() => setOpen(null)} />
      )}
    </Box>
  );
};

export default Actions;

const useStyles = makeStyles({
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  button: {
    width: "50%",
    padding: "15px",
    color: "black",
    border: "1px solid black",
    margin: "10px 0",
  },
});
