import React from "react";
import Slide from "@material-ui/core/Slide";
import Form from "./Form.js";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UpdateDialog({
  updateOn,
  setUpdateOn,
  todos,
  setTodos,
  setStatus,
  selectedTodo,
  setSelectedTodo,
}) {
  // Note: destructuring props
  // const {
  //   updateOn,
  //   setUpdateOn,
  //   todos,
  //   setTodos,
  //   setStatus,
  //   currentTodo,
  //   setCurrentTodo,
  //   todo,
  // } = props;

  const handleClose = () => {
    setUpdateOn(false);
  };
  return (
    <div>
      <Dialog
        open={updateOn}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{"Update your ToDo"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change your ToDo information and add Tags.
          </DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <Form
                todos={todos}
                setTodos={setTodos}
                setStatus={setStatus}
                currentTodo={selectedTodo}
                setCurrentTodo={setSelectedTodo}
                updateOn={updateOn}
                setUpdateOn={setUpdateOn}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
