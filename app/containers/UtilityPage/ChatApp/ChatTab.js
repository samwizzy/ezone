import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import Add from '@material-ui/icons/Add';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import UserChat from './components/UserChat';
import NoAvailableChats from './components/NoAvailableChats';
import ChatHeader from './components/ChatHeader';
import ChatFooter from './components/ChatFooter';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  messageRow: {
    '&.me': {},
    '&.contact': {},
    '&.first-of-group': {},
    '&.last-of-group': {},
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  paper: {
    display: 'flex',
    padding: theme.spacing(3),
    borderRadius: '10px',
    backgroundColor: '#F8F8F8',
  },
  button: {
    padding: theme.spacing(1, 4),
    background: theme.palette.primary.main,
    borderRadius: '8px',
  },
  grid: {
    height: '100vh',
    padding: theme.spacing(3),
    border: '1px solid #dcdcdc',
    textAlign: 'center',
  },
  textField: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(4),
    padding: theme.spacing(1, 10),
    borderRadius: '50px',
  },
  input: {
    // height: 40,
    borderRadius: theme.shape.borderRadius * 5,
  },
  appBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  tabs: {
    '& .MuiTab-root': {
      [theme.breakpoints.up('sm')]: {
        minWidth: 'inherit',
      },
    },
  },
  chatPane: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 12, 1, 2),
    borderRadius: '0 20px 20px 20px',
    whiteSpace: 'pre-wrap',
    color: theme.palette.common.white,
  },
  msgBody: {
    position: 'relative',
    backgroundColor: '#efefef',
    minHeight: '200px',
    height: '728px',
    overflow: 'auto',
    padding: theme.spacing(3, 5),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ChatTab = props => {
  const {
    dispatchGetAllEmployees,
    dispatchGetAllUsersChat,
    allEmployees,
    allUsersChat,
    currentUser,
  } = props;
  useEffect(() => {
    dispatchGetAllEmployees();
    dispatchGetAllUsersChat();
  }, []);

  console.log(currentUser, allUsersChat, 'allUsersChat');
  const classes = useStyles();
  const [status, setStatus] = React.useState(false);

  const [value, setValue] = React.useState(0);
  const [newChat, setNewChat] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, newValue) => {
    setValue(newValue);
  };

  const isFirstMessageOfGroup = (item, i) => {
    // return (i === 0 || (props.chat.dialog[i - 1] && props.chat.dialog[i - 1].who !== item.who));
  };

  const isLastMessageOfGroup = (item, i) => {
    // return (i === props.chat.dialog.length - 1 || (props.chat.dialog[i + 1] && props.chat.dialog[i + 1].who !== item.who));
  };

  const handleEmployeeChange = (event, vl) => {
    const initNewChat = {
      initiator: currentUser.uuId,
      initiatorName: currentUser.firstName,
      responder: vl.uuId,
      responderName: vl.firstName,
    };
    setNewChat([initNewChat]);
  };

  return (
    <React.Fragment>
      <div>
        {!status === false ? (
          // <NoAvailableChats />
          <div />
        ) : (
          <Grid justify="center" container>
            <Grid item xs={12} md={4} style={{ backgroundColor: '#efefef' }}>
              <Paper square>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3px 7px',
                  }}
                >
                  {/* <Autocomplete
                    id="combo-box-demo"
                    options={allEmployees}
                    getOptionLabel={option => option.firstName}
                    style={{ width: 800 }}
                    onChange={(evt, ve) => handleEmployeeChange(evt, ve)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Search contacts"
                        variant="outlined"
                        placeholder="Search Contacts"
                        fullWidth
                      />
                    )}
                  /> */}
                  {/* <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="chat"
                      label="Search Chat"
                      placeholder="Is the work done?"
                      name="chat"
                      size="small"
                      InputProps={{
                        className: classes.input,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    /> */}
                  <IconButton>
                    <Add />
                  </IconButton>
                </div>

                <Tabs
                  variant="fullWidth"
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                  className={classes.tabs}
                >
                  <Tab label="Active" {...a11yProps(1)} />
                  <Tab label="Group" {...a11yProps(1)} />
                  <Tab label="Archive" {...a11yProps(1)} />
                </Tabs>
              </Paper>
              <TabPanel value={value} index={0}>
                <UserChat allUsersChat={allUsersChat} newChat={newChat} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UserChat />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <UserChat />
              </TabPanel>
            </Grid>
            <Grid item xs={12} md={8} component={Paper}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <ChatHeader />
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.msgBody}>
                    <div
                      className={classNames(
                        classes.messageRow,
                        { me: 'item.id' === 'user.id' },
                        { contact: 'item.id' !== 'user.id' },
                        {
                          'first-of-group': isFirstMessageOfGroup('item', 'i'),
                        },
                        { 'last-of-group': isLastMessageOfGroup('item', 'i') },
                      )}
                      style={{
                        border: '1px solid #efefef',
                        display: 'flex',
                        justifyContent: 'justify-end',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Paper className={classes.chatPane}>
                        <Typography variant="subtitle1">
                            How you doing brother?
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ position: 'absolute', right: 12, bottom: 0 }}
                        >
                            05:56 am
                        </Typography>
                      </Paper>
                    </div>

                    <ChatFooter />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </React.Fragment>
  );
};

ChatTab.propTypes = {
  dispatchGetAllEmployees: PropTypes.func,
  dispatchGetAllUsersChat: PropTypes.func,
  allEmployees: PropTypes.array,
  allUsersChat: PropTypes.array,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  allEmployees: Selectors.makeSelectAllEmployees(),
  allUsersChat: Selectors.makeSelectAllUsersChat(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllEmployees: () => dispatch(Actions.getAllUsers()),
    dispatchGetAllUsersChat: () => dispatch(Actions.getAllUsersChat()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChatTab);
