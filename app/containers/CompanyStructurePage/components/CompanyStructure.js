import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Breadcrumbs,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  Grid,
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Link
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Add from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import * as Actions from '../actions';
import * as Selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '& :hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    }
  },
  breadcrumbs: {
    padding: theme.spacing(2, 0),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  partyButton: {
    float: 'right',
  },
  table: {
    minWidth: 650,
    '& td, th': {
      border: 0,
      '& button': {
        textAlign: 'left',
        width: theme.spacing(30),
      },
      '& div': {
        width: theme.spacing(30),
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '20px',
        padding: theme.spacing(1, 2)
      }
    }
  },
  header: {
    padding: theme.spacing(1.5, 0),
  },
}));

const CompanyStructure = props => {

  const { getPartyGroup, openNewPartyAction, openNewSubPartyAction, openNewRoleDialog, loading } = props;

  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getPartyGroup();
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log(`item ${index} clicked`);
  };
  


  console.log(openNewSubPartyAction, 'openNewSubPartyAction');

  function createData(title, description) {
    return { title, description };
  }

  const actions = [
    {title: 'Group', link: 'Add Group', action: openNewPartyAction},
    {title: 'Sub-Group', link: 'Add Sub-Group', action: openNewSubPartyAction},
    {title: 'Role', link: 'Add Role', action: openNewRoleDialog},
  ];

  const rows = [
    createData(
      'Description',
      "Lorem Ipsum copy in various charsets and languages for layouts... The dummy copy at this site is made from a dictionary of 500 words from Cicero's original ",
    ),
    createData('Head', 'Christian Okeme'),
    createData('Assistant', 'Tina Umeh'),
  ];

  return (
    <React.Fragment>
      <div>
        <Grid container justify="space-between" className={classes.header}>
          <Grid item>
            <Typography variant="h6">Company Information</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.partyButton}
              onClick={() => openNewPartyAction()}
            >
              <Add /> Add Party
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} md={2}>
            <Paper className={classes.paper}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.list}
              >
                <ListItem
                  button
                  selected={selectedIndex === 0}
                  onClick={event => handleListItemClick(event, 0)}
                >
                  <ListItemText primary="Region" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 0}
                  onClick={event => handleListItemClick(event, 0)}
                >
                  <ListItemText primary="Department" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 1}
                  onClick={event => handleListItemClick(event, 1)}
                >
                  <ListItemText primary="Department" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 1}
                  onClick={event => handleListItemClick(event, 1)}
                >
                  <ListItemText primary="Department" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={10} md={10}>
            <Paper className={classes.paper}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <div className={classes.breadcrumbs}>
                    <ListSubheader component="div" id="nested-list-subheader">
                      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Link color="inherit" href="/" onClick={handleClick}>
                          Region
                        </Link>
                        <Typography color="textPrimary">Group</Typography>
                      </Breadcrumbs>
                    </ListSubheader>
                  </div>
                }
                className={classes.root}
              >
                <Divider />
                <ListItem>
                  <Typography variant="h6">Information</Typography>
                </ListItem>
                <ListItem>
                  <Table className={classes.table} aria-label="simple table" size='small'>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.title}>
                          <TableCell component="th" scope="row" width="25%">
                            {row.title}
                          </TableCell>
                          <TableCell align="left" width="75%">
                            {row.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ListItem>
              </List>

              <Divider />
              <Table className={classes.table} aria-label="simple table" size='small'>
                <TableBody>
                  {actions.map(row => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row" width="25%">
                        <div>{row.title}</div>
                      </TableCell>
                      <TableCell width="75%">
                        <Link component="a" variant="body2" onClick={() => row.action()}>{row.link}</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

CompanyStructure.propTypes = {
  loading: PropTypes.bool,
  openNewPartyAction: PropTypes.func,
  openNewSubPartyAction: PropTypes.func,
  openNewRoleDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewPartyAction: () => dispatch(Actions.openNewPartyDialog()),
    openNewSubPartyAction: () => dispatch(Actions.openNewSubGroupDialog()),
    openNewRoleDialog: () => dispatch(Actions.openNewRoleDialog()),
    getPartyGroup: () => dispatch(Actions.getPartyGroupAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo
)(CompanyStructure);
