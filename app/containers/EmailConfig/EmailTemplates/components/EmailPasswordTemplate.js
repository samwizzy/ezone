import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import TextEditor from './TextEditor';

const useStyles = makeStyles(theme => ({
  contain: {
    margin: theme.spacing(0, 1, 0, 0),
  },
  card: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
    borderRadius: '20px',
  },
  resetButton: {
    // float: 'right',
    background: '#F3F3F3',
    border: '1px solid #CCCCCC',
    boxSizing: 'border-box',
    borderRadius: '10px',
    margin: theme.spacing(2),
  },
}));

const EmailPasswordTemplate = props => {
  const classes = useStyles();

  const [content, setContent] = useState('');

  console.log(content, 'content password extends');

  const {} = props;
  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.contain}>
        <Grid item xs={12} md={3} lg={3}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <ListItem alignItems="flex-start">
                <ListItemText secondary="Email Templates" />
              </ListItem>
              <Divider component="hr" />
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Choose Template" />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText secondary="Password reset" />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText secondary="New user welcome message" />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText secondary="Signature Approval" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9} lg={9}>
          <ListItem alignItems="flex-start">
            <ListItemText secondary="Password reset Template" />
          </ListItem>
          <Button variant="contained" className={classes.resetButton}>
            Reset Default Template
          </Button>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <TextEditor content={content} setContent={setContent} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

EmailPasswordTemplate.propTypes = {
  // openEditColorDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    // openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmailPasswordTemplate);
