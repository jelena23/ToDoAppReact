import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import {
  Button,
  TextField,
  Avatar,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";

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
    // maxWidth: "70%",
    // h-offset(+right, -left) v-offset(+bottom, -top) blur spread color
    boxShadow: "0px 7px 7px 6px rgba(255, 105, 135, .3)",
    // [theme.breakpoints.up("sm")]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    // },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    direction: "column",
  },
  item: {
    minWidth: "100%",
    margin: theme.spacing(2),
  },
}));

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = (props) => {
  const API_URL = "http://localhost:8080/api/auth";
  const history = useHistory();
  const classes = useStyles();
  const [message, setMessage] = useState("");

  const login = async (user) => {
    setMessage("");
    try {
      const { data } = await Axios.post(`${API_URL}/signin`, user);
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      props.setForceNavRerender((prevState) => !prevState);
      history.push("/todos");
      return data;
    } catch (error) {
      const resMessage =
        error.response.data.message || error.message || error.toString();
      setMessage(resMessage);
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });
  return (
    <Grid container className={classes.root}>
      <Paper className={classes.paper}>
        <Form onSubmit={formik.handleSubmit}>
          <Grid container className={classes.container}>
            <Grid item>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                fullWidth
                variant="filled"
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextField
                fullWidth
                variant="filled"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item className={classes.item}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Sign in
              </Button>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
          </Grid>
        </Form>
      </Paper>
    </Grid>
  );
};

export default Login;
