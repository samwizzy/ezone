import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, List, ListItem, ListItemText, ListItemAvatar, Slide, Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import FolderIcon from '@material-ui/icons/Folder';
import { blue, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    }
  },
  table: {
    '& tr, td': {
      border: 0
    }
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500]
  },
  ongoing: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: theme.status.ongoing
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TaskPreviewDialog(props) {
  const classes = useStyles();
  const { closeTaskPreviewDialog, data } = props;

  console.log(data, 'checking preview task...')

  return (
    <div>
      <Dialog
        {...data.props}
        // open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeTaskPreviewDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Invoicing</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          </DialogContentText>

          <Grid container>
            <Grid item xs={12}><Typography variant='h6'>Assigned To:</Typography></Grid>
            <Grid item xs={12}>
              <List dense={true} style={{ display: 'flex' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.blue}>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Christian"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.purple}>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Christian"
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={7}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell><Typography variant="subtitle2">Mark as:</Typography></TableCell>
                    <TableCell align="right"><Chip className={classes.ongoing} label="Ongoing" /></TableCell>
                    <TableCell align="right"><Chip color="default" label="Completed" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}


TaskPreviewDialog.propTypes = {
  openTaskPreviewDialog: PropTypes.func,
  closeTaskPreviewDialog: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  data: Selectors.makeSelectPreviewTaskDialog()
});

function mapDispatchToProps(dispatch) {
  return {
    openTaskPreviewDialog: ev => dispatch(Actions.openTaskPreviewDialog(ev)),
    closeTaskPreviewDialog: () => dispatch(Actions.closeTaskPreviewDialog()),
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
)(TaskPreviewDialog);
