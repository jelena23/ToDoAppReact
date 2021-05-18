import React from "react";
import AuthService from "../services/auth.service";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Typography } from "@material-ui/core";

//Ne prikazuju se role na Profilnoj stranici ako ih ima vise!!!

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(5),
    maxWidth: 900,
    justifyContent: "center",
    // h-offset(+right, -left) v-offset(+bottom, -top) blur spread color
    boxShadow: "0px 7px 7px 6px rgba(255, 105, 135, .3)",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "bold",
    color: "rgb(253, 160, 133)",
    marginBottom: theme.spacing(-2),
  },
  line: {
    marginBottom: theme.spacing(4),
  },
}));

const currentUser = AuthService.getCurrentUser();

const Profile = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          {currentUser.username}'s Profile
        </Typography>
        <Divider className={classes.line} />
        <Typography className={classes.subtitle}>ID</Typography>
        <p>{currentUser.id}</p>
        <Typography className={classes.subtitle}>Email</Typography>
        <p>{currentUser.email}</p>
        <Typography className={classes.subtitle}>Token</Typography>
        <p>
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <Typography className={classes.subtitle}>Authorities</Typography>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </Paper>
    </Grid>
  );
};

export default Profile;
