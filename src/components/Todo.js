import React from "react";
import { update, deleteTodo } from "../services/todo-service";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import dayjs from "dayjs";
import { getOne } from "../services/tag-service";

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
  container: {},
  item: {
    minWidth: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    color: "#fda085",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  buttonContainer: {
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Todo = ({ todo, todos, setTodos, handleSelectTodo }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const updateComplete = (id) => {
    const data = {
      description: todo.description,
      dueD: todo.dueD,
      dueT: todo.dueT,
      complete: !todo.complete,
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

  const tagFinderHandler = (id) => {
    getOne(id)
      .then((response) => {
        console.log(response.tag);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteOne = (id) => {
    deleteTodo(id)
      .then((response) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const completeHandler = (id) => {
    updateComplete(id);
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            complete: !item.complete,
          };
        }
        return item;
      })
    );
  };
  return (
    <form>
      <Grid container className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item className={classes.item}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>
                  Description{" "}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {todo.description}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* {todo.dueD.substring(0, 10)} */}
                <Typography>
                  Due date: {dayjs(todo.dueD).format("DD.MM.YYYY.")}
                </Typography>
                <Typography>Due time: {todo.dueT}</Typography>
                {todo.tags.length > 0 ? (
                  todo.tags.map((item) => (
                    <Button
                      key={item.id}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={() => tagFinderHandler(item.id)}
                    >
                      {item.name}
                    </Button>
                  ))
                ) : (
                  <Typography>There are no tags for this Todo.</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Grid container className={classes.buttonContainer}>
          {/* <div className="todo"> */}
          {/* <p className={`todo-item ${todo.complete ? "complete" : ""}`}</p> */}
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<CheckIcon />}
            onClick={() => completeHandler(todo.id)}
          >
            Complete
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => deleteOne(todo.id)}
          >
            Delete
          </Button>
          {/* () => updateTodo(todo.id) */}
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<EditIcon />}
            onClick={() => handleSelectTodo(todo)}
          >
            Edit
          </Button>
          {/* </div> */}
        </Grid>
      </Grid>
    </form>
  );
};

export default Todo;
