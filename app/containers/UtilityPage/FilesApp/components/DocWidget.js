import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Box, Button, Card, Grid, IconButton, List, ListItem, ListItemText, ListItemAvatar, Paper, Tab, Tabs, TextField, Typography} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { grey } from '@material-ui/core/colors';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import DocFileIcon from '../../../../images/DocFileIcon.png';
import DocFormat from '../../../../images/DocFormat.jpg';
import DocFormat2 from '../../../../images/DocFormat2.jpg';

const tileData = [
    {img: 'DocFileIcon', title: 'Doc 1', author: 'Samuel Will'},
    {img: 'https://ibb.co/YdbMQ0N', title: 'Doc 2', author: 'Moore Green'},
    {img: 'https://ibb.co/YdbMQ0N', title: 'Doc 3', author: 'Vince Brown'},
]

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(4, 6)
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    sideMenu: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflowY: 'auto',
        maxHeight: 300,
    },
    button: {
        margin: theme.spacing(0, 1, 0, 0)
    },
    card: {
        flexGrow: 1
    },
    cardHeader: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '& span': {
            fontSize: '20px' 
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: grey[300],
        margin: theme.spacing(0, 1)
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        >
        {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function DocWidget() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [form, setForm] = React.useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button className={classes.button} variant="outlined" onClick={handleSubmit} color="primary">
                        Cancel
                    </Button>
                    <Button className={classes.button} variant="outlined" onClick={handleSubmit} color="primary">
                        Send
                    </Button>
                </Grid>
            </Grid>

            <Grid container justify='space-between'>
                <Grid item xs={2} md={2}>
                    <div className={classes.sideMenu}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label={<img src={DocFileIcon} width='100%' />} {...a11yProps(0)} />
                            <Tab label={<img src={DocFileIcon} width='100%' />} {...a11yProps(1)} />
                            <Tab label={<img src={DocFileIcon} width='100%' />} {...a11yProps(2)} />
                            <Tab label={<img src={DocFileIcon} width='100%' />} {...a11yProps(3)} />
                            <Tab label={<img src={DocFileIcon} width='100%' />} {...a11yProps(4)} />
                            <Tab label={<img src={DocFileIcon} width='100%' />} {...a11yProps(5)} />
                            <Tab label={<img src={DocFileIcon} width='100%' />} {...a11yProps(6)} />
                        </Tabs>
                    </div>
                </Grid>
                <Grid item xs={8} md={8}>
                    <TabPanel value={value} index={0}>
                        <img src={DocFormat} width='100%' />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <img src={DocFormat2} width='100%' />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Four
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Item Five
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        Item Six
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        Item Seven
                    </TabPanel>
                </Grid>
                <Grid item xs={2} md={2}>

                </Grid>
            </Grid>
        </Paper>
    );
}

DocWidget.propTypes = {
  openEditColorDialog: PropTypes.func,
  openEditCompanyDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditCompanyDialog: evt => dispatch(Actions.openEditCompanyDialog(evt)),
    openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(
  withConnect,
  memo,
)(DocWidget));
