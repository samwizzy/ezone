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
  TextField,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Slide,
  AppBar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Toolbar,
  Typography,
  FormLabel,
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MailOutline from '@material-ui/icons/MailOutline';
import Smartphone from '@material-ui/icons/Smartphone';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import { lighten } from '@material-ui/core/styles/colorManipulator'
import { blue } from '@material-ui/core/colors'
import LoadingIndicator from '../../../../components/LoadingIndicator';
import user from '../../../../images/user.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: theme.spacing(1),
    border: `1px solid ${lighten(theme.palette.primary.main, 0.3)}`
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

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactDetailsDialog = props => {
  const classes = useStyles();
  const { loading, contactDetailsDialog, closeNewContactDetailsDialog } = props;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Dialog
        {...contactDetailsDialog.props}
        onClose={closeNewContactDetailsDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="relative">
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <List className={classes.list}>
                  <ListItem
                    alignItems="flex-start"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Company Logo"
                        src={user}
                        className={classes.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color="inherit">
                          First Marine
                        </Typography>
                      }
                      secondary={
                        <Typography variant="subtitle1" color="inherit">
                          info@firstmarine.ng
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  disableElevation
                  variant="contained"
                  color="primary"
                  onClick={() => {}}
                >
                  Assign Contact Group
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Divider />

        <DialogContent>
          <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Basic Info #1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell><MailOutline /></TableCell>
                    <TableCell>info@firstmarine.ng</TableCell>
                    <TableCell align="right" colSpan={2}>
                      <Button variant="contained" color="primary" disableElevation>Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Smartphone /></TableCell>
                    <TableCell>+23408097864356</TableCell>
                    <TableCell align="left" colSpan={2}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Life Stage</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Contact Owner</TableCell>
                    <TableCell>Funke</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Funke</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ExpansionPanelDetails>
            <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Additional Info #2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>DOB</TableCell>
                    <TableCell align="right">Aug 17, 2020</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fax</TableCell>
                    <TableCell align="right">Aug 17, 2020</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Website</TableCell>
                    <TableCell align="right">Aug 17, 2020</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell align="right">Suite 42, Adekunle Cresent, Ibeju Lekki, Lagos Nigera</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell align="right">Ibeju Lekki</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell align="right">Lagos State</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell align="right">Nigeria</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </DialogContent>

        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ContactDetailsDialog.propTypes = {
  loading: PropTypes.bool,
  contactDetailsDialog: PropTypes.object,
  closeNewContactDetailsDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  contactDetailsDialog: Selectors.makeSelectContactDetailsDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewContactDetailsDialog: () => dispatch(Actions.closeNewContactDetailsDialog()),
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
