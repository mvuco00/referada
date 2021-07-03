import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">eduRecords</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  appbar: {
    backgroundColor: "black",
  },
});
