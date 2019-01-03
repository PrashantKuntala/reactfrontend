import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 12
  },
  center : {
    margin: 'auto',
    width: '80%',
    padding: 20,
  },
});

const Downloads = (props) =>{
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.center} elevation={1}>
        <Typography variant="h5" component="h4" gutterBottom={true}>
          Downloads
        </Typography>
        <Divider/>
        <br/>
        <Typography component="p" variant="body1" gutterBottom={true}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati non blanditiis voluptatem, eius est reprehenderit pariatur doloremque vero deserunt, dolores quis cum, ex eaque doloribus qui quam laboriosam alias saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, vitae quidem minima harum dolorum tenetur eos aperiam aliquid voluptate. Tempore fugiat architecto obcaecati autem similique quaerat repudiandae ratione excepturi? Nobis. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint pariatur tempora neque, corrupti itaque, enim voluptates voluptas dolore in quod doloremque sed, laborum velit quam corporis? Nemo facilis fuga totam?
        </Typography>
      </Paper>
    </div>
  );
}

Downloads.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Downloads);
