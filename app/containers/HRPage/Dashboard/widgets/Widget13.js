import React, { memo, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles, Card, CardHeader, CardContent, Icon, Link, List, ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core'
import LensIcon from '@material-ui/icons/Lens'
import * as Selectors from '../../selectors';
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
  root: {
    borderRadius: theme.shape.borderRadius * 2,
    "& .MuiCardHeader-root": {}
  },
  status: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    width: 12,
    height: 12,
  }
})

class Widget13 extends React.Component {
  render() {
    const { classes, announcements } = this.props
    const orderedAnnouncements = _.orderBy(announcements, 'dateCreated', 'desc')

    console.log(announcements, "announcements widget 13")

    return (
      <div>
        {announcements.length > 0 ?
          <Fragment>
            {announcements && orderedAnnouncements.splice(0, 1).map((announcement, i) => (
              <Card className={classes.root} key={i}>
                <CardHeader
                  titleTypographyProps={{ variant: 'subtitle1' }}
                  title={<Link href="#">{announcement.title}</Link>}
                  subheader={<Typography variant="subtitle2">— {moment(announcement.dateCreated).format('Do MMMM, YYYY')}</Typography>}
                  action={
                    <Typography variant="body2">Priority: <LensIcon className={classes.icon} fontSize="small" /> Low</Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body2">{announcement.message}</Typography>
                </CardContent>
              </Card>
            ))}
          </Fragment>
          :
          <Card>
            <CardContent>
              <Typography align="center" color="textSecondary">No announcement has been made yet</Typography>
            </CardContent>
          </Card>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  announcements: Selectors.makeSelectAnnouncements(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
  memo,
)(Widget13);
