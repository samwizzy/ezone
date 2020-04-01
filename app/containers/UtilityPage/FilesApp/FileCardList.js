import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, Card, CardHeader, CardContent, CardMedia, CardActions, CardActionArea, Grid, Divider, List, ListItem, ListSubheader, ListItemText, ListItemIcon, Icon, IconButton, Typography, Hidden, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import InfoIcon from '@material-ui/icons/Info';
import MoreVert from '@material-ui/icons/MoreVert';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Favorite from '@material-ui/icons/Favorite';
import Share from '@material-ui/icons/Share';

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      overflowY: 'auto',
      height: '500px'
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 250,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  cardRoot: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const FileList = props => {
  const classes = useStyles();
  const { loading, openNewTaskDialog, getUtilityFiles, files, file, users, container } = props;
  const [expanded, setExpanded] = React.useState(false);

  console.log(files, "all files")

  const handleFileClick = (id) => {
    console.log(id, "id")
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    // getUtilityFiles()
  }, []);

  const drawer = (
    <div className={classes.drawer}>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="subtitle1">Tasks</Typography>
          </ListSubheader>
        }
      >
        {files && files.map((file, index) => (
          <ListItem button key={file.id} onClick={() => handleFileClick(file.id)}>
            <ListItemIcon><AssignmentTurnedIn /></ListItemIcon>
            <ListItemText primary={file.docName} secondary={file.description} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-around'
      >
        <Grid item md={2}>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              
            </Hidden>
            <Hidden xsDown implementation="css">
              <div
                className={classes.drawerPaper}
              >
                {drawer}
              </div>
            </Hidden>
          </nav>
        </Grid>
        <Grid item md={7}>
          <div className={classes.content}>
          <Typography variant="subtitle2">Document Details</Typography>
          {file && file.description}
          <Card className={classes.cardRoot}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia
              className={classes.media}
              image={file.fileUrl}
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Favorite />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMore />
              </IconButton>
            </CardActions>
          </Card>
          </div>
        </Grid>
        <Grid item md={3}>
          <Typography variant="subtitle2">Document Info</Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableBody>
                {file && Object.keys(file).map(key => (
                  <TableRow key={file.docName}>
                    <TableCell component="th" scope="row">
                      Document Name
                    </TableCell>
                    <TableCell align="right">{file[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

FileList.propTypes = {
  loading: PropTypes.bool,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  files: Selectors.makeSelectFiles(),
  file : Selectors.makeSelectFile(),
  users: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: () => dispatch(Actions.openNewTaskDialog()),
    getUtilityFiles: () => dispatch(Actions.getUtilityFiles()),
    getEmployees: () => dispatch(Actions.getEmployees()),
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
)(FileList));
