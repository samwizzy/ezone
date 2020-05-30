import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Box, Button, IconButton, Checkbox, FormControl, FormControlLabel, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Table, TableRow, TableCell, TableBody, Grid, Paper, TextField, Typography, Toolbar, Stepper, Step, StepLabel } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import Check from '@material-ui/icons/Check';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GoalSideGrid from './goal/GoalSideGrid';
import CustomCheckBox from './goal/CustomCheckBox';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(1, 0)
  },
  table: {  
    whiteSpace: 'nowrap',
    '& .MuiTableCell-root': {
      border: "0 !important"
    },
  },
  content: { margin: theme.spacing(2, 0) },
  customCheck: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  toolbar: theme.mixins.toolbar,
  icon: {
    width: 20,
    height: 20,
    '&.active': {color: green[500]},
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(1)
  },
  button: { 
    borderRadius: theme.shape.borderRadius * 5,
    padding: theme.spacing(1, 4)
  },
}));

const GoalsDetails = props => {
  const classes = useStyles();
  const { loading, openNewGoalsDialog } = props;
  const [state, setState] = React.useState({text: true, call: false, email: false})
  const [comment, setComment] = React.useState({comment: ""})
	
  React.useEffect(() => {
  }, []);

  const handleChange = ({target}) => {
    setComment({...state, [target.name]: target.value})
  }
  const handleCommentChange = ({target}) => {
    setComment({...comment, [target.name]: target.value})
  }

  return (
    <div className={classes.root}>
      <Grid container>
				<Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Goals Details
              </Typography>
              <Button variant="contained" color="primary" onClick={openNewGoalsDialog}>Add Goal</Button>
            </Toolbar>
          </AppBar>
				</Grid>
        <Grid item md={12}>
          <Paper square className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item md={8} xs={12}>
                <Typography variant="h6" color="primary">Customer follow up session</Typography>
                <Typography variant="subtitle1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </Typography>

                <div className={classes.content}>
                  <Typography variant="subtitle1"><strong>Key Results</strong></Typography>

                  <div className={classes.customCheck}>
                    <FormControlLabel
                      control={<Checkbox checked={state.text} onChange={handleChange} name="text" />}
                      label="Text"
                    />
                    <AvatarGroup max={3}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                  </div>
                  <div className={classes.customCheck}>
                    <FormControlLabel
                      control={<Checkbox checked={state.call} onChange={handleChange} name="call" />}
                      label="Call"
                    />
                    <AvatarGroup max={3}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                  </div>
                  <div className={classes.customCheck}>
                    <FormControlLabel
                      control={<Checkbox checked={state.email} onChange={handleChange} name="email" />}
                      label="Email"
                    />
                    <AvatarGroup max={3}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                  </div>
                </div>
                <div className={classes.content}>
                  <TextField
                    label="Comment"
                    name="comment"
                    value=""
                    onChange={handleCommentChange}
                    variant="outlined"
                    margin="normal"
                    rows={3}
                    multiline
                    fullWidth
                  />
                  <Button variant="contained" color="primary">Comment</Button>
                </div>
                <div className={classes.content}>
                  <Typography variant="subtitle1">Activities</Typography>
                  <List dense={true}>
                    <ListItem>
                      <ListItemAvatar>
                        <IconButton edge="end" aria-label="delete">
                          <EditOutlined />
                        </IconButton>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Status changed to Inprogress by Essien Joy"}
                        secondary={"3rd Jul 2019    3:00pm"}
                      />
                    </ListItem>
                  </List>
                </div>

              </Grid>
              <Grid item md={4} xs={12}>
                <GoalSideGrid />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

GoalsDetails.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewGoalsDialog: () => dispatch(Actions.openNewGoalsDialog())
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
)(GoalsDetails);
