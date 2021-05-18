import React, { useState } from "react";
import authService from "../services/auth.service";
import { create, createTodoWithTags } from "../services/todo-service";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DesktopDatePicker from "@material-ui/lab/DesktopDatePicker";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import TimePicker from "@material-ui/lab/TimePicker";
import dayjs from "dayjs";
import Tags from "./Tags";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    direction: "row",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    direction: "row",
  },
  item: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  form: {
    fullWidth: true,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const Form = ({ todos, setTodos, setStatus, currentTodo, setCurrentTodo }) => {
  const currentUser = authService.getCurrentUser();
  const classes = useStyles();
  const [openTag, setOpenTag] = React.useState(false);
  const [addTag, setAddTag] = useState([]);

  const handleOpen = () => {
    setOpenTag(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDueDateChange = (date) => {
    setCurrentTodo((prevState) => ({
      ...prevState,
      dueD: date,
    }));
  };

  const handleDueTimeChange = (time) => {
    setCurrentTodo((prevState) => ({
      ...prevState,
      dueT: time,
    }));
  };

  const updateTodo = (id) => {
    const data = {
      description: currentTodo.description,
      dueD: currentTodo.dueD,
      dueT: currentTodo.dueT,
      complete: todo.complete,
      userId: todo.userId,
    };
    update(id, data)
      .then((response) => {
        // setForceUpdate((prevState) => !prevState);
        console.log(response);
        setTodos((prevState) => {
          const temp = prevState;
          temp.push({
            description: response.description,
            dueD: response.dueD,
            dueT: response.dueT,
            complete: response.complete,
            userId: response.userId,
          });
          return temp;
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const statusHandler = (e) => {
    console.log("e.target.value", e.target.value);
    setStatus(e.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container className={classes.root}>
        <form>
          {/* <FormLabel>Add Todo</FormLabel> */}
          <Grid container className={classes.container}>
            <Grid item className={classes.item}>
              <TextField
                required
                id="outlined-required"
                name="description"
                label="Description"
                defaultValue="Todo"
                value={todos.description}
                onChange={handleInputChange}
                variant="filled"
              />
            </Grid>
            <Grid item className={classes.item}>
              <DesktopDatePicker
                // inputFormat="MM/dd/yyyy"
                label="Due Date"
                value={currentTodo.dueD}
                onChange={handleDueDateChange}
                renderInput={(params) => (
                  <TextField
                    id="date-picker-desktop"
                    margin="normal"
                    {...params}
                    variant="filled"
                    helperText=""
                  />
                )}
                OpenPickerButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item className={classes.item}>
              <TimePicker
                label="Due Time"
                value={currentTodo.dueT}
                onChange={handleDueTimeChange}
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    {...params}
                    helperText=""
                    variant="filled"
                  />
                )}
                OpenPickerButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
            <Tags
              openTag={openTag}
              setOpenTag={setOpenTag}
              addTag={addTag}
              setAddTag={setAddTag}
            />
            <Grid item className={classes.item}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                onClick={handleOpen}
              >
                Add Tag
              </Button>
            </Grid>
            <Grid item className={classes.item}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                type="submit"
                onClick={saveTodo}
              >
                Save
              </Button>
            </Grid>
            <Grid item className={classes.item}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">
                  Filter Todos
                </InputLabel>
                <Select native onChange={statusHandler} name="todos">
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="uncompleted">Uncompleted</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </LocalizationProvider>
  );
};

export default Form;
