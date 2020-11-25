import React from "react"
import EzoneUtils from '../../../../../utils/EzoneUtils'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import {
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import WidgetBg from '../../../../../images/hrDash2.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    backgroundImage: `url(${WidgetBg})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center center`,
    backgroundSize: 'cover',
    color: theme.palette.secondary.contrastText,
    textAlign: 'center',
    '& .MuiCardContent-root': {
      minHeight: 200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .MuiCardActions-root': {
      justifyContent: 'center',
      background: theme.palette.background.paper
    }
  },
}));


const Widget1 = ({ accounts, accData }) => {
  const classes = useStyles()

  const receivablesAccounts = _.filter(accounts, (account) => account.accountType && account.accountType.id === 3)

  if (!receivablesAccounts && !accData) {
    return <Typography>There are currently no Receivables</Typography>
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">30</Typography>
          <Typography variant="h6">Approved Pay runs</Typography>
        </CardContent>

        <CardActions>
          <Button>Pay run List</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Widget1
