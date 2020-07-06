import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@material-ui/core';
import moment from 'moment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey[100],
  },
}));

const VerticalTime = props => {
  const classes = useStyles();

  const { crmActivities } = props;

  return (
    <div className={classes.root}>
      <VerticalTimeline layout="1-column">
        {crmActivities && crmActivities.length > 0 &&
          crmActivities.map((activity, i) => (
            <VerticalTimelineElement
              key={i}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: 'rgb(33, 150, 243)',
                color: '#fff',
                padding: 0,
              }}
              contentArrowStyle={{
                borderRight: '7px solid  rgb(33, 150, 243)',
              }}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<CalendarTodayIcon />}
            >
              <CardContent>
                <h3 className="vertical-timeline-element-title">
                  {activity.description}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {moment(activity.dateCreated).format('LT')}
                </h4>
              </CardContent>
              <Divider />
              <CardContent>
                <p>{activity.description}</p>
              </CardContent>
            </VerticalTimelineElement>
          ))}
      </VerticalTimeline>
    </div>
  );
};

export default VerticalTime;
