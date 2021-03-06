/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  makeStyles,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Slide,
  AppBar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Toolbar,
  Typography,
  FormLabel,
} from '@material-ui/core';
import moment from 'moment'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MailOutline from '@material-ui/icons/MailOutline';
import CloseIcon from '@material-ui/icons/Close';
import Smartphone from '@material-ui/icons/Smartphone';
import ContactsIcon from '@material-ui/icons/Contacts';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BallotIcon from '@material-ui/icons/Ballot';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { blue } from '@material-ui/core/colors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import user from '../../../../images/user.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    "& td": {
      border: 0
    }
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(1),
    border: `1px solid ${lighten(theme.palette.primary.main, 0.3)}`,
  },
  list: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: blue[400],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: blue[500],
    },
  },
}));

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactDetailsDialog = props => {
  const classes = useStyles();
  const {
    loading,
    contactDetailsDialog,
    closeContactDetailsDialog,
  } = props;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // console.log(contactDetailsDialog, 'contactDetailsDialog');
  return (
    <div>
      <Dialog
        {...contactDetailsDialog.props}
        onClose={closeContactDetailsDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        {contactDetailsDialog.data && (
          <AppBar position="static">
            <Toolbar>
              <List className={classes.list}>
                <ListItem
                  alignItems="flex-start"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Company Logo"
                      src={contactDetailsDialog.data.imageUrl}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="inherit">
                        {contactDetailsDialog.data.firstName}{' '}
                        {contactDetailsDialog.data.lastName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="subtitle1" color="inherit">
                        {contactDetailsDialog.data.emailAddress}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={closeContactDetailsDialog} edge="end" aria-label="delete">
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Toolbar>
          </AppBar>
        )}

        <DialogContent dividers>
          {contactDetailsDialog.data && (
            <ExpansionPanel
              square
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel-1-header"
              >
                <Typography>Basic Info #1</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table className={classes.table} size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <MailOutline /> Email
                      </TableCell>
                      <TableCell>
                        {contactDetailsDialog.data.emailAddress}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Smartphone /> Phone Number
                      </TableCell>
                      <TableCell>
                        {contactDetailsDialog.data.phoneNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><BallotIcon /> Life Stage</TableCell>
                      <TableCell>
                        {contactDetailsDialog.data.lifeStage}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><ContactsIcon /> Contact Owner</TableCell>
                      <TableCell>{contactDetailsDialog.data.ownerId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><AccountCircleIcon /> Vendor</TableCell>
                      <TableCell>
                        {contactDetailsDialog.data.associationType}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
              <ExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel-2-header"
              >
                <Typography>Additional Info #2</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table className={classes.table} size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell align="left">
                        {moment(contactDetailsDialog.data.dob).format('ll')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fax</TableCell>
                      <TableCell align="left">
                        {contactDetailsDialog.data.fax}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Website</TableCell>
                      <TableCell align="left">
                        {contactDetailsDialog.data.website}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell align="left">
                        {contactDetailsDialog.data.address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>City</TableCell>
                      <TableCell align="left">
                        {contactDetailsDialog.data.city}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>State</TableCell>
                      <TableCell align="left">
                        {contactDetailsDialog.data.state}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Country</TableCell>
                      <TableCell align="left">
                        {contactDetailsDialog.data.country}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
              <ExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel-3-header"
              >
                <Typography>Contact Group #3</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table className={classes.table} size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Contact Group</TableCell>
                      <TableCell align="left">
                        {contactDetailsDialog.data.contactGroup}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
              <ExpansionPanelSummary
                aria-controls="panel1d-content"
                id="panel-4-header"
              >
                <Typography>Additional Info #4</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table className={classes.table} size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Contact Source</TableCell>
                      <TableCell align="left">
                        {contactDetailsDialog.data.contactSource}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Notes</Typography>
                        <Typography variant="body2">{contactDetailsDialog.data.notes}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
        </DialogContent>

        <DialogActions />
      </Dialog>
    </div>
  );
};

ContactDetailsDialog.propTypes = {
  loading: PropTypes.bool,
  contactDetailsDialog: PropTypes.object,
  closeContactDetailsDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  contactDetailsDialog: Selectors.makeSelectContactDetailsDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeContactDetailsDialog: () => dispatch(Actions.closeContactDetailsDialog()),
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
)(ContactDetailsDialog);
