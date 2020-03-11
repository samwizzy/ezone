import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  Box,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import Vector from '../../../../images/Vector.svg';
import Vector1 from '../../../../images/Vector1.svg';
import Group266 from '../../../../images/Group266.svg';
import UserDetail from './UserDetail';
import Signature from './Signature';
import NoSignature from './NoSignature';

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
    margin: theme.spacing(2),
  },
  sidebar: {
    padding: theme.spacing(2),
  },
  mainTop: {
    padding: theme.spacing(2),
    background: '#1A88E1',
    // backgroundImage:
    //   'linear-gradient(111.61deg, #1A88E1 38.84%, #3F0A96 101.73%)',
    borderRadius: '0px 10px 10px 10px',
    height: 180,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(4),
  },
  editButton: {
    background: theme.palette.primary.main,
    color: '#ffffff',
    borderRadius: '10px',
  },
  tab: {
    marginTop: theme.spacing(5),
  },
}));

const UserProfile = props => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { loading } = props;

  // if (loading) {
  //   return <LoadingIndicator />;
  // }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} lg={3}>
          <Paper className={classes.sidebar}>
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <img src={Vector} alt="Vector" />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <img src={Vector1} alt="Vector1" />
                </ListItemIcon>
                <ListItemText primary="Subscription" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <img src={Vector1} alt="Vector1" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9} lg={9}>
          <Paper>
            <Paper className={classes.mainTop}>
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
                        Joy Essien
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          UI/UX Designer
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Button>
                    <Typography variant="p" className={classes.editButton}>
                      Edit Profile
                    </Typography>
                  </Button>
                </ListItem>
              </List>
            </Paper>

            <div className={classes.tab}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Basic Info" {...a11yProps(0)} />
                  <Tab label="Signature" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <UserDetail />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <NoSignature />
                {/* <Signature /> */}
              </TabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

UserProfile.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getAllEmployees: Selectors.makeSelectGetAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeDialogAction: () =>
      dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialogAction: evt =>
      dispatch(Actions.openEditEmployeeDialog(evt)),
    openViewEmployeeDialogAction: evt =>
      dispatch(Actions.openViewEmployeeDialog(evt)),
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
