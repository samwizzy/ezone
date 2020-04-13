import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  withStyles,
  AppBar,
  Box,
  ClickAwayListener,
  Toolbar,
  Grid,
  Grow,
  Card,
  CardContent,
  CardActionArea,
  
  CardActions,
  Typography,
  TextField,
  Tabs,
  Tab,
  Icon,
  Divider,
  MenuItem,
  MenuList,
  Button,
  ButtonGroup,
  Paper,
  Popper,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../../actions';
import TextEditor from './../../components/TextEditor';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import AddIcon from '@material-ui/icons/Add';
import Welcome from './WelcomeDemo'

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  cardRoot: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  card: {
    position: "relative",
    flex: 1,
    background: theme.palette.common.white,
    maxWidth: 345,
    margin: theme.spacing(2),
    "& .MuiCardActions-root": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: theme.palette.grey[500],
      position: "absolute",
      padding: theme.spacing(2, 0),
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0,
      textAlign: "center",
    },
    "&:hover > .MuiCardActions-root": {
      opacity: 0.9,
      "-webkit-transition": "background-color 1s ease-in, opacity 1s ease-in", 
      transition: "background-color 1s ease-in, opacity 1s ease-in",
    },
  },
  resetButton: {
    borderRadius: theme.shape.borderRadius * 3,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    justifyContent: 'space-between'
  },
}));

const WelcomeTemplate = props => {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log(content, 'content extends');

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <AppBar position='relative' color="inherit" elevation={0}>
              <Toolbar className={classes.toolbar}>
                  <Typography variant="h6" color="primary">Password Reset Template</Typography>
                  <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button variant="outlined" className={classes.resetButton}>
                      Reset Default Template
                    </Button>
                    <Button size="small" variant="outlined" color="primary" startIcon={<AddIcon />}>New</Button>
                  </ButtonGroup>
              </Toolbar>
          </AppBar>
          <Divider />

          <div className={classes.root}>
            <AppBar position="static" color="default">
              <AntTabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
                aria-label="full width tabs example"
              >
                <Tab label="View Template" {...a11yProps(0)} />
                <Tab label="View HTML" {...a11yProps(1)} />
              </AntTabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <div className={classes.cardRoot}>
                  {[1].map(card => (
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardContent>
                        <Welcome />
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" variant="contained" color="primary">
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                      >
                        <Icon>settings</Icon>
                      </Button>
                      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                                  <MenuItem onClick={handleClose}>My account</MenuItem>
                                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </CardActions>
                  </Card>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Card elevation={0}>
                  <CardContent>
                    <TextEditor content={content} setContent={setContent} />
                  </CardContent>
                </Card>
              </TabPanel>
            </SwipeableViews>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

WelcomeTemplate.propTypes = {
  // openEditColorDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    // openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(WelcomeTemplate);
