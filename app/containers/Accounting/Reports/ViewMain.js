import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import CardBoard from './components/CardBoard';
import reportData from './reportData.json';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    height: '868px',
    '& .MuiGrid-root': {
      flex: '1',
      width: '300px',
    },
  },
}));

const Report = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0} square>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AppBar
              position="static"
              color="inherit"
              className={classes.appBar}
              elevation={1}
            >
              <Toolbar variant="dense">
                <Typography variant="h6" component="h1">
                  Reports
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>

          <Grid item xs={12}>
            <Grid
              container
              className={classes.grid}
              spacing={2}
              direction="column"
              alignContent="space-between"
              wrap="wrap"
            >
              {reportData.map((report, i) => (
                <Grid item xs={3} key={i}>
                  <CardBoard
                    color={report.color}
                    title={report.title}
                    contents={report.data}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Report;
