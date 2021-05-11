import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeStyles,
  Avatar,
  Button,
  Card, CardContent, CardHeader,
  List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PersonIcon from '@material-ui/icons/Person';
import months from '../../../../utils/months'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minHeight: 210,
    borderRadius: theme.shape.borderRadius * 2,
    "& .MuiCardContent-root": {
      padding: 0,
      fontSize: theme.typography.body2.fontSize,
    },
    "& .MuiCardHeader-root": {
      "& .MuiTypography-root": {
        fontSize: theme.typography.subtitle1.fontSize
      }
    }
  },
}));


const Widget6 = ({ history, match, employees }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(moment().format('MMM'));
  let monthsList = [{ label: "Month", value: "Month" }, ...months];

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(monthsList[index].label);
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    history.push(`${match.url}/birthdays`)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!employees) {
    return ''
  }

  console.log(employees, "employees")

  const birthdayEmps = employees.length > 0 && employees.filter(emp => moment(emp.dob).format('MMM') === selectedIndex);

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          action={
            <React.Fragment>
              <Button color="primary" size="small" aria-label="settings" onClick={handleViewClick}>
                view all
              </Button>
              <Button color="primary" size="small" aria-label="settings" onClick={handleClickListItem}>
                {selectedIndex} <ExpandMoreIcon />
              </Button>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {monthsList.map((option, index) => (
                  <MenuItem
                    key={option.label}
                    disabled={index === 0}
                    selected={option.label === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </React.Fragment>
          }
          title="Upcoming Birthdays"
        />
        <CardContent>
          {birthdayEmps.length > 0 ?
            <List className={classes.root}>
              {birthdayEmps.slice(0, 2).map((emp, i) =>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      {emp.lastName ? emp.lastName[0].toUpperCase() : <PersonIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={emp.firstName + ' ' + emp.lastName} />
                  <ListItemSecondaryAction>
                    <Typography>{moment(emp.dob).format('MMM DD')}</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
            :
            <Typography align="center" color="textSecondary">No upcoming birthdays</Typography>
          }
        </CardContent>
      </Card>
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  departments: Selectors.makeSelectDepartments(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Widget6);
