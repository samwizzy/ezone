import React from "react"
import {
  makeStyles,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography
} from '@material-ui/core';
import CrmDashImage1 from '../../../../images/crmDash.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius * 4,
    backgroundImage: `url(${CrmDashImage1})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center bottom`,
    backgroundSize: 'cover',
    "& .MuiCardActions-root": {
      justifyContent: "center",
      backgroundColor: theme.palette.common.white,
      fontSize: theme.typography.subtitle1.fontSize,
    },
    "& .MuiCardContent-root": {
      minHeight: 160,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff"
    }
  },
}));


const Widget3 = () => {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h2">20</Typography>
        </CardContent>

        <Divider />

        <CardActions>
          <Button size="small" onClick={() => { }}>
            Enrollments
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Widget3
