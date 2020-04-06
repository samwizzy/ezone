import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles';
import Header from '../../Header';
import Footer from '../../Footer';
import Sidebar from '../../Sidebar';
import theme from './../themeConfig'
import Backdrop from  './../../Backdrop/Loadable'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },
});

class Layout3 extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <Backdrop />
            <Header />
            <Sidebar
              content={this.props.children}
            />
          </ThemeProvider>
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(Layout3);
