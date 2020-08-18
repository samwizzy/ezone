import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles, Tabs, Tab, Grid, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';
import General from './tabs/General'
import Questions from './tabs/Questions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(1)
  },
  toolbar: {
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  }
}));

const AntTabs = withStyles({
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const AddQuiz = props => {
  const classes = useStyles();
  const { loading, history } = props;
  const [value, setValue] = React.useState('general');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper} square elevation={1}>
          <AntTabs
            indicatorColor="primary"
            textColor="primary"
            value={value}
            onChange={handleTabChange}
            aria-label="ant example"
          >
            <AntTab label="General" value="general" />
            <AntTab label="Questions" value="questions" />
          </AntTabs>
          <Typography className={classes.padding} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        {value === 'general' &&
          <General />
        }
        {value === 'questions' &&
          <Questions />
        }
      </Grid>
    </Grid>
  );
};

AddQuiz.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(AddQuiz);
