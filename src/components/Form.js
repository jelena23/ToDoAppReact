import React, { useState } from "react";
import authService from "../services/auth.service";
import { createTodoWithTags, update } from "../services/todo-service";
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
import dayjs from "dayjs";
import Tags from "./Tags";
import { DesktopTimePicker } from "@material-ui/lab";

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
  dialog: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    direction: "row",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    direction: "row",
  },
  item: {
    margin: theme.spacing(1),
    minWidth: 234,
  },
  form: {
    fullWidth: true,
  },
  button: {
    margin: theme.spacing(1),
    minWidth: 112,
    //marginRight: theme.spacing(2),
  },
}));

const Form = ({
  setTodos,
  setStatus,
  updateOn,
  setCurrentTodo,
  currentTodo,
}) => {
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

  const saveTodo = () => {
    const data = {
      description: currentTodo.description,
      dueD: dayjs(currentTodo.dueD),
      dueT: dayjs(currentTodo.dueT).format("HH:mm:ss"),
      complete: false,
      userId: currentUser.id,
      tags: addTag.map((item) => {
        let newArr = {};
        newArr["id"] = item;
        return newArr;
      }),
    };

    createTodoWithTags(data)
      .then((dataResponse) => {
        setTodos((prevState) => {
          const temp = prevState;
          temp.push({
            description: dataResponse.description,
            dueD: dataResponse.dueD,
            dueT: dataResponse.dueT,
            complete: dataResponse.complete,
            userId: dataResponse.userId,
          });
          return temp;
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTodo = (id) => {
    const data = {
      description: currentTodo.description,
      dueD: dayjs(currentTodo.dueT),
      dueT: dayjs(currentTodo.dueT).format("HH:mm:ss"),
      complete: currentTodo?.complete,
      userId: currentTodo?.userId,
    };
    update(id, data)
      .then((response) => {
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
      <Grid container className={updateOn ? classes.dialog : classes.root}>
        {updateOn ? null : (
          <header>
            <h1>ToDo List</h1>
          </header>
        )}
        <form>
          {/* <FormLabel>Add Todo</FormLabel> */}
          <Grid container className={classes.container}>
            <Grid item className={classes.item} style={{ marginTop: "16px" }}>
              <TextField
                required
                name="description"
                label="Description"
                value={currentTodo?.description}
                onChange={handleInputChange}
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item className={classes.item}>
              <DesktopDatePicker
                label="Due Date"
                value={currentTodo?.dueD}
                onChange={handleDueDateChange}
                renderInput={(params) => (
                  <TextField
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
            <Grid item className={classes.item} style={{ minWidth: 234 }}>
              <DesktopTimePicker
                label="Due Time"
                value={currentTodo?.dueT}
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
            <Grid item className={classes.button}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleOpen}
              >
                Add Tag
              </Button>
            </Grid>
            <Grid item className={classes.button}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SaveIcon />}
                type="submit"
                onClick={
                  updateOn ? () => updateTodo(currentTodo?.id) : saveTodo
                }
              >
                {updateOn ? "Update ToDo" : "Save"}
              </Button>
            </Grid>
            {updateOn ? null : (
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
            )}
          </Grid>
        </form>
      </Grid>
    </LocalizationProvider>
  );
};

export default Form;
