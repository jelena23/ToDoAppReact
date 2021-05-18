import React, { Fragment, useCallback, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import authService from "../services/auth.service";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#f8562e",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    // backgroundColor: "#f8ed8d",
  },
  drawerPaper: {
    width: drawerWidth,
    // backgroundColor: "#f8ed8d",
    color: "#fda085",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveNav(props) {
  const history = useHistory();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { forceNavRerender, setForceNavRerender } = props;
  const [currentUser, setCurrentUser] = useState(undefined);
  const user = authService.getCurrentUser();

  useEffect(() => {
    setCurrentUser(user);
    // eslint-disable-next-line
  }, [forceNavRerender]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigateTo = useCallback(
    (text) => {
      if (text === "Logout") {
        authService.logout();
        setForceNavRerender((prevState) => !prevState);
        history.push("login");
      } else {
        let lctext = text.toLowerCase();
        history.push(lctext);
      }
    },
    // eslint-disable-next-line
    [history]
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {currentUser ? (
        <List>
          {["About", "Todos", "Profile", "Logout"].map((text, index) => (
            <ListItem button key={text} onClick={() => handleNavigateTo(text)}>
              <ListItemIcon>
                {index === 0 && <InfoIcon />}
                {index === 1 && (
                  <FontAwesomeIcon icon={faClipboardList} size="lg" />
                )}
                {index === 2 && <AccountCircleIcon />}
                {index === 3 && (
                  <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Fragment>
          <Divider />
          <List>
            {["Register", "Login"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => handleNavigateTo(text)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <FontAwesomeIcon icon={faUserPlus} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={faSignInAlt} size="lg" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Fragment>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" noWrap>
            ToDo App
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden
          // here change ... doesnt work with xsDown
          smDown
          implementation="css"
        >
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default ResponsiveNav;
