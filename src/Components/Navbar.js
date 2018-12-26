import React from 'react';
import { Link, NavLink, withRouter} from 'react-router-dom';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


// each of the object below is a class that is references below within classNames
// these styles are injected using the HOC provided by mui
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Navbar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow} component={Link} to="/">            
           YEP
          </Typography>
          <Button color="inherit" component={Link} to="/about"> About </Button>
          <Button color="inherit" component={Link} to="/faq">FAQ</Button>
          <Button color="inherit" component={NavLink} to="/downloads">Downloads</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Navbar));
