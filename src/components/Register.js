import React from "react";
import RegisterDialog from "./RegisterDialog";
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
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
    maxWidth: "70%",
    // h-offset(+right, -left) v-offset(+bottom, -top) blur spread color
    boxShadow: "0px 7px 7px 6px rgba(255, 105, 135, .3)",
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
  username: yup
    .string("Enter your username")
    .min(4, "Username should be of minimum 4 characters length")
    .max(15, "Username should be of maximum 15 characters length")
    .required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .max(25, "Password should be of maximum 15 characters length")
    .required("Password is required"),
});

const Register = (props) => {
  const [open, setOpen] = React.useState(false);

  const API_URL = "http://localhost:8080/api/auth";

  const classes = useStyles();

  const register = async (newUser) => {
    try {
      const { data } = await Axios.post(`${API_URL}/signup`, newUser);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await register(values);
      setOpen(true);
    },
  });

  return (
    <Grid container className={classes.root}>
      <RegisterDialog open={open} setOpen={setOpen} />
      <Paper className={classes.paper}>
        <Form onSubmit={formik.handleSubmit}>
          <Grid container className={classes.container}>
            <Grid item>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
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
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </Grid>
  );
};

export default Register;
