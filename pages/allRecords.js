import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FindHistoryData from "../features/FindHistoryData";

const allRecords = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  const getAllData = async () => {
    let res = await axios.get("http://localhost:8080/student/allData");
    console.log(res);
  };
  
 
  return (
    <Layout>
         <Box className={classes.box}>
             <Button onClick={getAllData}>Get all data</Button>
             <Button onClick={()=>setOpen(true)}>Get history data</Button>
             {open && <FindHistoryData onClose={()=>setOpen(false)} open={open}/>}
         </Box>   
    </Layout>
  );
};

export default allRecords;


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
  