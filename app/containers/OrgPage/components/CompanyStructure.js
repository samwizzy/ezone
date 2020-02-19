import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
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
  Link,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import PartyDialog from './PartyDialog';
import SubPartyDialog from './SubPartyDialog';
import * as Actions from '../actions';
import * as Selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  partyButton: {
    float: 'right',
  },
  root: {
    width: '100%',
    // minWidth: 780,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
    '& td, th': {
      border: 0,
    },
  },
}));

const CompanyStructure = props => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    // setSelectedIndex(index);
    console.log(`item ${index} clicked`);
  };

  const { openNewPartyAction, openNewSubPartyAction, loading } = props;

  function createData(title, description) {
    return { title, description };
  }

  const rows = [
    createData(
      'Description',
      "Lorem Ipsum copy in various charsets and languages....ßßß The dummy copy at this site is made from a dictionary of 500 words from Cicero's original ",
    ),
    createData('Head', 'Christian Okeme'),
    createData('Assistant', 'Tina Umeh'),
  ];

  return (
    <React.Fragment>
      <Typography variant="h6">Company Information</Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.partyButton}
        onClick={() => openNewPartyAction()}
      >
        > Add Party
      </Button>
      <Grid container>
        <Grid item xs={2} md={2}>
          <Paper className={classes.paper}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Region
                </ListSubheader>
              }
              className={classes.root}
            >
              <Divider />
              <ListItem
                button
                selected={selectedIndex === 0}
                onClick={event => handleListItemClick(event, 0)}
              >
              <ListItemText primary="Trash" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={event => handleListItemClick(event, 1)}
              >
              <ListItemText primary="Spam" />
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
                <ListSubheader component="div" id="nested-list-subheader">
                  Region
                </ListSubheader>
              }
              className={classes.root}
            >
              <Divider />
              <ListItem>
                <Typography variant="h6">Information</Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.title}>
                          <TableCell component="th" scope="row" width="25%">
                            {row.title}
                          </TableCell>
                          <TableCell align="justify" width="75%">
                            {row.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.root}>
                  <Link>Add Group</Link>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography onClick={() => openNewSubPartyAction()}>
                  <Link>Add Sub-Group</Link>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography className={classes.root}>
                  <Link>Add Role</Link>
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      <PartyDialog />
      <SubPartyDialog />
    </React.Fragment>
  );
};

CompanyStructure.propTypes = {
  loading: PropTypes.bool,
  openNewPartyAction: PropTypes.func,
  openNewSubPartyAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewPartyAction: () => dispatch(Actions.openNewPartyDialog()),
    openNewSubPartyAction: () => dispatch(Actions.openNewSubGroupDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompanyStructure);
