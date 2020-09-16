import React from 'react';
import Typography from '@material-ui/core/Typography';
import './report.css';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[100],
  },
  box: {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ListBoard = props => {
  function selectColorBar(value) {
    switch (value) {
      case 'blue':
        return 'color_blue_bar';
      case 'green':
        return 'color_green_bar';
      case 'yellow':
        return 'color_yellow_bar';
      case 'pink':
        return 'color_pink_bar';
      case 'orchild':
        return 'color_orchild_bar';
      default:
        return 'color_purple_bar';
    }
  }

  const listcontents = props.contents.map(content => (
    <Typography key={content} variant="subtitle1" color="textSecondary">
      <Link
        style={{ textDecoration: 'none' }}
        to={`/account/reports/${content}`}
      >
        {content}
      </Link>
    </Typography>
  ));

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <div className={`list_board ${selectColorBar(props.bar)}`} />
        </Grid>
        <Grid item xs={10}>
          <div className="push_title">
            <Typography variant="h6" color="textSecondary">
              {props.title}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="list_content">{listcontents}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ListBoard;
