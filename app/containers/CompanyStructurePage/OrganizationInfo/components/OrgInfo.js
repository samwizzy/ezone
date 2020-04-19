import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Avatar,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Grid,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import EditOutlined from '@material-ui/icons/EditOutlined';
import {
  fade,
  darken,
  lighten,
} from '@material-ui/core/styles/colorManipulator';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import firstmarine from '../../../../images/firstmarine.svg';
import TaskIcon from '../../../../images/TaskIcon.svg';
import user from '../../../../images/user.svg';
import msg from '../../../../images/msg.svg';
import phone2 from '../../../../images/phone2.svg';
import phone from '../../../../images/phone.svg';
import web from '../../../../images/web.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    color: theme.palette.common.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    backgroundImage:
      'linear-gradient(111.61deg, #1A88E1 38.84%, #3F0A96 101.73%)',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(1),
    border: `1px solid ${lighten(theme.palette.primary.main, 0.3)}`,
  },
  paper: {
    padding: theme.spacing(4, 8),
    margin: theme.spacing(2),
  },
  button: {
    padding: theme.spacing(1, 4),
    marginLeft: theme.spacing(1),
    borderRadius: '20px',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },
  editButton: {
    color: theme.palette.primary.main,
  },
  inline: {
    color: theme.palette.common.white,
  },
}));

const OrgInfo = props => {
  const classes = useStyles();
  const {
    companyInfo,
    loading,
    openEditColorDialog,
    openEditCompanyDialog,
    history,
  } = props;

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid justify="space-between" container>
          <Grid item xs={6}>
            <List className={classes.list}>
              <ListItem
                alignItems="flex-start"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Company Logo"
                    src={TaskIcon}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" color="inherit">
                      {companyInfo && companyInfo.companyName}
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
                        {companyInfo && companyInfo.companyName}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              alignContent="space-between"
              style={{ height: '100%', textAlign: 'right' }}
            >
              <Grid item xs={12}>
                <Link
                  href="#"
                  variant="body2"
                  color="inherit"
                  onClick={openEditColorDialog}
                >
                  Edit Logo and Color <EditOutlined />
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => openEditCompanyDialog(companyInfo)}
                >
                  Edit Profile
                </Button>

                <Button
                  variant="contained"
                  color="inherit"
                  className={classNames(classes.button, classes.editButton)}
                  onClick={() =>
                    history.push('/organization/company/structure')
                  }
                  href="/organization/company/structure"
                >
                  {/* <Link href="/organization/company/structure"> */}
                  Company Structure
                  {/* </Link> */}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper} variant="outlined">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
            <Typography variant="h6">Company Information...</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={user} />
                </ListItemIcon>
                <ListItemText
                  primary={companyInfo && companyInfo.companyName}
                />
              </ListItem>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={msg} />
                </ListItemIcon>
                <ListItemText
                  primary={companyInfo && companyInfo.emailAddress}
                />
              </ListItem>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={phone2} />
                </ListItemIcon>
                <ListItemText
                  primary={companyInfo && companyInfo.phoneNumber}
                />
              </ListItem>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={web} />
                </ListItemIcon>
                <ListItemText primary={companyInfo && companyInfo.website} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={web} />
                </ListItemIcon>
                <ListItemText primary={companyInfo && companyInfo.address} />
              </ListItem>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={web} />
                </ListItemIcon>
                <ListItemText primary={companyInfo && companyInfo.timeZone} />
              </ListItem>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={web} />
                </ListItemIcon>
                <ListItemText primary={companyInfo && companyInfo.language} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper} variant="outlined">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
            <Typography variant="h6">Contact Person</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={user} />
                </ListItemIcon>
                <ListItemText
                  primary={companyInfo && companyInfo.contactPersonName}
                />
              </ListItem>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={msg} />
                </ListItemIcon>
                <ListItemText
                  primary={companyInfo && companyInfo.contactPersonEmail}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={phone2} />
                </ListItemIcon>
                <ListItemText
                  primary={companyInfo && companyInfo.contactPersonPhone}
                />
              </ListItem>
              <ListItem className={classes.listFormat}>
                <ListItemIcon>
                  <img alt="" src={phone} />
                </ListItemIcon>
                <ListItemText
                  primary={companyInfo && companyInfo.contactPersonTel}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

OrgInfo.propTypes = {
  openEditColorDialog: PropTypes.func,
  openEditCompanyDialog: PropTypes.func,
  companyInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  companyInfo: Selectors.makeSelectCompanyInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditCompanyDialog: evt => dispatch(Actions.openEditCompanyDialog(evt)),
    openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
  )(OrgInfo),
);
