import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {
    fontSize: '2rem',
    cursor: 'default',
    marginBottom: '1em',
  }
});

class BalanceButton extends React.Component {
  state = {
    value: 0,
  };

  render() {
    const { classes, balance } = this.props;
  
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              Balance: { balance} ECT
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(BalanceButton)
