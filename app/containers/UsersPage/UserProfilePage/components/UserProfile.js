import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import Group266 from '../../../../images/Group266.svg';
import UserDetail from './UserDetail';
import NoSignature from './NoSignature';
import Signature from './Signature';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
    color: theme.palette.common.white,
  },
  header: {
    padding: theme.spacing(2),
    backgroundImage:
      'linear-gradient(180deg, #1A88E1 30%, rgba(37, 28, 148, 1) 100%)',
    borderRadius: '0px 10px 10px 10px',
    height: 180,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(2),
  },
}));

const UserProfile = props => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { currentUser, openEditUserProfileDialog, loading } = props;

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
      {currentUser && (
        <Grid container>
          <Grid item xs={12}>
            <Paper square elevation={0}>
              <div className={classes.header}>
                <List className={classes.list}>
                  <ListItem
                    alignItems="flex-start"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Company Logo"
                        src={Group266}
                        className={classes.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color="inherit">
                          {currentUser.firstName} {currentUser.lastName}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="inherit">
                          {currentUser.jobDesc
                            ? currentUser.jobDesc
                            : 'UI/UX Designer'}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => openEditUserProfileDialog(currentUser)}
                        startIcon={<EditOutlinedIcon />}
                      >
                        Edit Profile
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </div>

              <div className={classes.tab}>
                <Paper square>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab label="Basic Info" {...a11yProps(0)} />
                    <Tab label="Signature" {...a11yProps(1)} />
                  </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                  <UserDetail />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {currentUser.signature ? (
                    <Signature currentUser={currentUser} />
                  ) : (
                    <NoSignature currentUser={currentUser} />
                  )}
                </TabPanel>
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  loading: PropTypes.bool,
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  openEditUserProfileDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditUserProfileDialog: evt =>
      dispatch(Actions.openEditUserProfileDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserProfile);
