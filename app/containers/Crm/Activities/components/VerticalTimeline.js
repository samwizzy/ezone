import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { makeStyles, Grid, Card, CardContent, Divider } from '@material-ui/core'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey[100]
    }
}))

const VerticalTime = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
        <VerticalTimeline layout={'1-column'}>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', padding: 0 }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<CalendarTodayIcon />}
            >
                <CardContent>
                    <h3 className="vertical-timeline-element-title">You created a task</h3>
                    <h4 className="vertical-timeline-element-subtitle">2019-09-23</h4>
                </CardContent>
                <Divider />
                <CardContent>
                    <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                </CardContent>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ padding: 0 }}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<CalendarTodayIcon />}
            >
                <CardContent>
                    <h3 className="vertical-timeline-element-title">You have scheduled for Paul Okeme and Samuel Okeke</h3>
                </CardContent>
                <Divider />
                <CardContent>
                    <p>Creative Direction, User Experience, Visual Design, SEO, Online Marketing</p>
                </CardContent>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ padding: 0 }}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<CalendarTodayIcon />}
            >
                <CardContent>
                    <h3 className="vertical-timeline-element-title">You have scheduled for Paul Okeme and Samuel Okeke</h3>
                </CardContent>
                <Divider />
                <CardContent>
                    <p>Creative Direction, User Experience, Visual Design, SEO, Online Marketing</p>
                </CardContent>
            </VerticalTimelineElement>
        </VerticalTimeline>
        </div>
    )
}

export default VerticalTime;
