import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox, Grid, ListItemIcon, TextField } from "@material-ui/core";
import { getAll } from "../services/tag-service";
import List from "@material-ui/core/List";
import { createTag } from "../services/tag-service";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Tags({ openTag, setOpenTag, addTag, setAddTag }) {
  const [tag, setTag] = useState([]); // list of all tags
  const [currentTag, setCurrentTag] = useState({
    name: "",
  });
  const [rerenderTag, setRerenderTag] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const retrieveTags = () => {
      getAll()
        .then((response) => {
          setTag(response);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrieveTags();
  }, [rerenderTag]);

  const handleAddTagToggle = (value) => () => {
    const currentIndex = addTag.indexOf(value);
    const newTag = [...addTag];

    if (currentIndex === -1) {
      newTag.push(value);
    } else {
      newTag.splice(currentIndex, 1);
    }

    setAddTag(newTag);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTag((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpenTag(false);
  };

  const handleSaveTag = () => {
    const data = {
      name: currentTag.name,
    };

    createTag(data)
      .then((dataResponse) => {
        setTag((prevState) => {
          const temp = prevState;
          temp.push({
            name: dataResponse.name,
          });
          return temp;
        });
        setRerenderTag((prevState) => !prevState);
        console.log(rerenderTag);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddTag = () => {
    console.log("Tags added: ", addTag);
    const tags = addTag.map((item) => {
      const id = item;
      return id;
    });
    console.log(tags);
    const data = {
      description: "currentTodo.description",
      dueD: "dayjs(currentTodo.dueD)",
      dueT: "dayjs(currentTodo.dueT).format(HH:mm:ss)",
      complete: "false",
      userId: "currentUser.id",
      tags: addTag.map((item) => {
        let newArr = {};
        newArr["id"] = item;
        return newArr;
      }),
    };
    console.log("Data: ", data);
    setOpenTag(false);
  };

  return (
    <Dialog
      open={openTag}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Tags</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add tags to your ToDo. You can choose some of the premade tags or make
          a new one.
        </DialogContentText>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <List className={classes.root}>
              <li>
                <ul className={classes.ul}>
                  {tag.map((item) => (
                    <ListItem
                      key={item.id}
                      dense
                      button
                      onClick={handleAddTagToggle(item.id)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={addTag.indexOf(item.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": item.id }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={`${item.name}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: "9px" }}>
            <TextField
              variant="filled"
              name="name"
              label="Tag"
              value={currentTag?.name}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveTag} color="primary">
          Save New Tag
        </Button>
        <Button onClick={handleAddTag} color="primary">
          {addTag.length > 1 ? "Add Tags" : "Add Tag"}
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
