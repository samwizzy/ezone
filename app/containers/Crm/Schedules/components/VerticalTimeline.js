import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { makeStyles, Grid, Card, CardContent, Divider } from '@material-ui/core'
import WorkIcon from '@material-ui/icons/Work'
import SchoolIcon from '@material-ui/icons/School'
import StarIcon from '@material-ui/icons/Star'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'

const VerticalTime = (props) => {
    return (
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
                contentStyle={{ background: 'rgba(228, 233, 237, 1)', color: '#666', padding: 0 }}
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
    )
}

export default VerticalTime