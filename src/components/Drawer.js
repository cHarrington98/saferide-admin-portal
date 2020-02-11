import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsCarSharpIcon from '@material-ui/icons/DirectionsCarSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp';
import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp';
import HomeSharp from '@material-ui/icons/HomeSharp';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const listElements = [{
                        text: 'Home',
                        icon: <HomeSharp style={{color:'#E7542B'}}/>,
                        link: '/'
                      },
                      {
                        text: 'Users',
                        icon: <PeopleSharpIcon style={{color:'#E7542B'}}/>,
                        link: '/'
                      },
                      {
                        text: 'Cars',
                        icon: <DirectionsCarSharpIcon style={{color:'#E7542B'}}/>,
                        link: '/cars'
                      },
                      {
                        text: 'Pick Up Points',
                        icon:  <LocationOnSharpIcon style={{color:'#E7542B'}}/>,
                        link: '/'
                      },
                      {
                        text: 'Drive Logs',
                        icon:  <LibraryBooksSharpIcon style={{color:'#E7542B'}}/>,
                        link: '/'
                      },
                      {
                        text: 'Waiting Lists',
                        icon:  <AccessTimeSharpIcon style={{color:'#E7542B'}}/>,
                        link: '/'
                      }];

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: '#E7542B' }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            SafeRide
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {/* This lists all of the nav bar buttons.*/}
          {/* Need to add links later.*/}
          {listElements.map((obj) => (
            <ListItem button key={obj.text} component={Link} to={obj.link}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

