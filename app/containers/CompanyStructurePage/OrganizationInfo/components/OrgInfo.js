import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils'
import {
  makeStyles,
  Avatar,
  Button,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Paper,
  Typography,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import EditOutlined from '@material-ui/icons/EditOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {
  fade,
  darken,
  lighten,
} from '@material-ui/core/styles/colorManipulator';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import firstmarine from '../../../../images/firstmarine.svg';
import user from '../../../../images/user.svg';
import msg from '../../../../images/msg.svg';
import phone2 from '../../../../images/phone2.svg';
import phone from '../../../../images/phone.svg';
import web from '../../../../images/web.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: 180,
    color: theme.palette.common.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    backgroundImage:
      'linear-gradient(111.61deg, #1A88E1 38.84%, #3F0A96 101.73%)',
  },
  list: {
    "& .MuiListItemAvatar-root": {
      marginRight: theme.spacing(2)
    }
  },
  container: {
    position: "relative",
    "&:hover > $overlay": {
      opacity: 1,
    }
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    transition: ".3s ease",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    border: `1px solid ${lighten(theme.palette.primary.main, 0.3)}`,
  },
  icon: {
    color: theme.palette.text.secondary,
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "-ms-transform": "translate(-50%, -50%)",
    textAlign: "center",
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
    backgroundColor: theme.palette.common.white,
    "&: hover": {
      color: theme.palette.common.white,
    }
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
    updateCompanyInfo,
    history,
  } = props;

  // const store = useSelector(state => state.loading)
  // console.log(state, "useSelector check")

  const handleImageChange = ({target}) => {
    const { name, files } = target
    const result = EzoneUtils.toBase64(files[0])
    result.then(data => updateCompanyInfo({...companyInfo, logo: data}))
  }

  console.log(companyInfo, "companyInfo")

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
                  {companyInfo.logo?
                  <div className={classes.container}>
                    <div className={classes.overlay}>
                      <Button
                        size="small"
                        component="label"
                        className={classes.icon}
                      >
                        <PhotoCameraIcon />
                        <input
                          name="attachments"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                          multiple
                        />
                      </Button>
                    </div>
                    <label htmlFor="contained-button-file">
                      <IconButton size="small">
                        <Avatar
                          alt="Company Logo"
                          src={`data:image/jpg;base64,${companyInfo.logo}`}
                          className={classes.avatar}
                        />
                      </IconButton>
                    </label>
                  </div>
                    :
                    <Avatar className={classes.avatar}>D</Avatar>
                  }
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
                  onClick={() => openEditColorDialog(companyInfo)}
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
                  // variant="contained"
                  variant="outlined"
                  color="primary"
                  className={classNames(classes.button, classes.editButton)}
                  onClick={() =>
                    history.push('/organization/company/structure')
                  }
                >
                  Company Structure
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
    updateCompanyInfo: evt => dispatch(Actions.updateCompanyInfo(evt)),
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
)(OrgInfo);
