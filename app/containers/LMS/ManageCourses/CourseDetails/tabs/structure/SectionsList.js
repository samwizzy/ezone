import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, IconButton, List, ListSubheader, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, ListItemAvatar, Menu, MenuItem, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../../App/selectors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import YouTubeIcon from '@material-ui/icons/YouTube';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssignmentDialog from './components/AssignmentDialog';
import LectureDialog from './components/LectureDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1)
  },
  list: {
    "& .MuiListItemAvatar-root": {
      minWidth: "30px !important"
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: { flexGrow: 1 },
  icon: {
    color: theme.palette.grey[800],
  },
  toolbar: {
    justifyContent: "space-between",
    padding: theme.spacing(1),
  }
}));

const StructureList = props => {
  const classes = useStyles();
  const { loading, history, openNewAssignmentDialog, openNewLectureDialog } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAssignmentDialog = () => {
    openNewAssignmentDialog()
    handleClose()
  }

  const openLectureDialog = () => {
    openNewLectureDialog()
    handleClose()
  }

  return (
    <Fragment>
      <Grid
        container
        justify='space-between'
      >
        <Grid item md={12}>
          <Paper className={classes.paper}>
            <List dense={true}>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">List of Course Syllabus</Typography>}
                />
                <ListItemSecondaryAction>
                  <Button size="small" variant="contained" color="primary" disableElevation startIcon={<AddIcon />}>
                    Add
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item md={12}>
          {_.range(0, 2).map((row, i) =>
            <Paper className={classes.paper} key={i}>
              <Toolbar variant="dense">
                <Typography className={classes.title}>Section 1:  Beginner’s guide to Statistics </Typography>
                <IconButton onClick={handleClick}><AddIcon /></IconButton>
              </Toolbar>
              <List dense={true}>
                <ListItem>
                  <ListItemIcon><YouTubeIcon /></ListItemIcon>
                  <ListItemText
                    primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
                  <ListItemText
                    primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                  <ListItemText
                    primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </ListItem>
              </List>
            </Paper>
          )}

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LibraryBooksIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Document" />
            </MenuItem>
            <MenuItem onClick={openLectureDialog}>
              <ListItemIcon>
                <YouTubeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Lecture" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Test" />
            </MenuItem>
            <MenuItem onClick={openAssignmentDialog}>
              <ListItemIcon>
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Assignment" />
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>

      <LectureDialog />
      <AssignmentDialog />
    </Fragment>
  );
};

StructureList.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAssignmentDialog: () => dispatch(Actions.openNewAssignmentDialog()),
    openNewLectureDialog: () => dispatch(Actions.openNewLectureDialog())
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
)(StructureList);
