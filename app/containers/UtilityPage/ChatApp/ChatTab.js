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
import _ from 'lodash';
import moment from 'moment';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
// import Stomp from '@stomp/stompjs';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import Add from '@material-ui/icons/Add';
import * as Actions from './actions';
import * as Selectors from './selectors';
import * as AppSelectors from '../../App/selectors';
import UserChat from './components/UserChat';
import NoAvailableChats from './components/NoAvailableChats';
import ChatHeader from './components/ChatHeader';
import ChatFooter from './components/ChatFooter';
import ModuleLayout from '../components/ModuleLayout';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  messageRow: {
    border: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    '&.me': { justifyContent: 'flex-end' },
    '&.contact': { justifyContent: 'flex-start' },
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
    backgroundColor: 'ddce30',
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
    margin: theme.spacing(1, 0),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 12, 1, 2),
    borderRadius: '0 50px 50px 50px',
    whiteSpace: 'pre-wrap',
    color: theme.palette.common.white,
  },
  msgBody: {
    position: 'relative',
    backgroundColor: theme.palette.grey[50],
    minHeight: '400px',
    maxHeight: `calc(100vh - 200px)`,
    overflow: 'auto',
    padding: theme.spacing(3, 5, 10, 3),
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

const ref = React.createRef();

const ChatTab = props => {
  const {
    resetPostMsg,
    newMsgRes,
    accessToken,
    employees,
    allUsersChat,
    currentUser,
    getAllUserChatData,
    userChatData,
    getEmployees,
    getAllUsersChat,
    getUserChatData,
  } = props;

  console.log(employees, 'all employees');
  useEffect(() => {
    // getEmployees();
    // getAllUsersChat();
    handleScrollToBottom();
  }, []);

  if (newMsgRes) {
    // getUserChatData(newMsgRes);
    getAllUserChatData.messages.push(newMsgRes);
    // getAllUserChatData.messages[getAllUserChatData.messages.length] = newMsgRes;
  }

  useEffect(() => {
    setChatLog(getAllUserChatData.messages);
  }, [getAllUserChatData.messages]);

  const classes = useStyles();
  const [status, setStatus] = React.useState(false);

  const [chatLog, setChatLog] = useState([]);
  const [value, setValue] = React.useState(0);
  const [newChat, setNewChat] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleScrollToBottom = () => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  const socketConnect = () => {
    const socket = new SockJS(
      'https://dev.ezoneapps.com/gateway/utilityserv/messages',
    );
    const header = {
      'X-Authorization': `Bearer ${accessToken}`,
      login: 'admin',
      passcode: 'admin',
    };
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      header,
      frame => {
        stompClient.subscribe(`/queue/${currentUser.uuId}`, tick => {
          const newMsg = JSON.parse(tick.body);
          console.log(newMsg, 'newMsg');
          setChatLog(prevChatLog => [...prevChatLog, newMsg]);
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  const isFirstMessageOfGroup = (item, i) => {
    return i === 0 || (chatLog[i - 1] && chatLog[i - 1].senderId !== item.senderId);
  }

  const isLastMessageOfGroup = (item, i) => {
    return i === chatLog.length - 1 || (chatLog[i + 1] && chatLog[i + 1].senderId !== item.senderId);
  }

  const handleEmployeeChange = (event, vl) => {
    const initNewChat = {
      initiator: currentUser.uuId,
      initiatorName: (currentUser.firstName, currentUser.lastName),
      responder: vl.uuId,
      responderName: (vl.firstName, vl.lastName),
    };
    setNewChat(initNewChat);
  };

  let chatLogReverse = [];
  let allUserReversedData = [];

  // reversed datas
  if (chatLog) {
    chatLogReverse = _.orderBy(chatLog, ['dateCreated'], ['asc']);
  }

  if (allUsersChat) {
    allUserReversedData = _.orderBy(allUsersChat, ['dateCreated'], ['desc']);
  }

  console.log(chatLog, 'chatLog in if');
  console.log(chatLogReverse, 'userChatReversedData');

  return (
    <React.Fragment>
      <div>
        {!status === false ? (
          <NoAvailableChats />
        ) : (
            <Grid
              container
              justify="space-between"
            >
              <Grid item xs={12} md={4}>
                <Paper square>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3px 7px',
                    }}
                  >
                    <Autocomplete
                      id="combo-box-demo"
                      size="small"
                      options={employees}
                      getOptionLabel={option =>
                        `${option.firstName} ${option.lastName}`
                      }
                      style={{ width: '100%' }}
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
                    />
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
                  <UserChat
                    allUsersChat={allUserReversedData}
                    newChat={newChat}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <UserChat />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <UserChat />
                </TabPanel>
              </Grid>
              <Grid item xs={12} md={8} component={Paper}>
                {/* {getAllUserChatData &&
                getAllUserChatData.messages.length > 0 ? ( */}
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <ChatHeader userChatData={userChatData} />
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.msgBody} ref={ref}>
                      {chatLog &&
                        _.orderBy(chatLog, ['dateCreated'], ['asc']).map(
                          (chat, i) => (
                            <div
                              key={chat.dateCreated.toString() + 10}
                              className={classNames(
                                classes.messageRow,
                                { me: currentUser.uuId === chat.senderId },
                                { contact: currentUser.uuId !== chat.senderId },
                                {
                                  'first-of-group': isFirstMessageOfGroup(
                                    chat,
                                    i,
                                  ),
                                },
                                {
                                  'last-of-group': isLastMessageOfGroup(
                                    chat,
                                    i,
                                  ),
                                },
                              )}
                            >
                              <Paper className={classes.chatPane} key={chat.id}>
                                <Typography
                                  variant="subtitle1"
                                  key={chat.toString()}
                                >
                                  {chat.chatMessage}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  style={{
                                    position: 'absolute',
                                    right: 12,
                                    bottom: 0,
                                  }}
                                >
                                  {moment(chat.dateCreated).format('LT')}
                                </Typography>
                              </Paper>
                            </div>
                          ),
                        )}
                    </div>
                    <ChatFooter />
                  </Grid>
                </Grid>
                {/* ) : (
                    <Grid container justify="center">
                      <Grid item xs={12}>
                        <div className={classes.msgBody}>
                          <Paper className={classes.chatPane}>
                            <Typography variant="subtitle1">
                            Start a new conversation
                            </Typography>
                          </Paper>
                        </div>
                      </Grid>
                    </Grid>
                  )} */}
              </Grid>
            </Grid>
          )}
      </div>
    </React.Fragment>
  );
};

ChatTab.propTypes = {
  resetPostMsg: PropTypes.func,
  newMsgRes: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  getEmployees: PropTypes.func,
  getAllUsersChat: PropTypes.func,
  employees: PropTypes.array,
  allUsersChat: PropTypes.array,
  currentUser: PropTypes.object,
  getAllUserChatData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  userChatData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  newMsgRes: Selectors.makeSelectGetPostMsg(),
  userChatData: Selectors.makeSelectGetUserChatData(),
  getAllUserChatData: Selectors.makeSelectGetAllUserChatData(),
  employees: Selectors.makeSelectEmployees(),
  allUsersChat: Selectors.makeSelectAllUsersChat(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  accessToken: AppSelectors.makeSelectAccessToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getAllUsersChat: () => dispatch(Actions.getAllUsersChat()),
    getUserChatData: evt => dispatch(Actions.getUserChatData(evt)),
    resetPostMsg: () => dispatch(Actions.resetPostMsg()),
    dispatch,
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
