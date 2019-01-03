import React from 'react';

// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 12
  },
  faqExpansion: {   
    margin: 'auto',
    width: '80%', 
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  center : {
    margin: 'auto',
    width: '80%',
    padding: 20,
  },
});

const FAQ = (props) =>{
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.center} elevation={1}>
        <Typography variant="h5" component="h4" gutterBottom={true}>
          Frequently Asked Questions
        </Typography>
        <Divider/>
        <br/>
        <Typography component="p" variant="body1" gutterBottom={true}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati non blanditiis voluptatem, eius est reprehenderit pariatur doloremque vero deserunt, dolores quis cum, ex eaque doloribus qui quam laboriosam alias saepe.
        </Typography>
         

      </Paper>
      <br/>

       {/* expansion panels to show basic FAQ , this can be another component if need be, this can be a class based component instead of a stateless component*/}
      <div className={classes.faqExpansion}>
       
        <ExpansionPanel> 
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Question 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel> 
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Question 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      </div>
    </div>
  );
}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);

