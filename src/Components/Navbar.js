import React from 'react';
import { Link, NavLink, withRouter} from 'react-router-dom';


// const Navbar =(props) =>{
//     // console.log(props);
    
//     // setTimeout(() => {
//     //     props.history.push('/about')
//     // },2000);

//     return (
       
//        <nav className="nav-wrapper red darken-3">
//            <div className="container">
//                <Link className="brand-logo" to="/">Poke'Times</Link>
//                 <ul className="right">
//                     <li><Link to="/">Home</Link></li>
//                     <li><NavLink to="/about">About</NavLink></li>
//                     <li><NavLink to="/contact">Contact</NavLink></li>
//                 </ul>
//            </div>
//        </nav>
//     )
// }

// // withRouter is a higherorder component that is supercharging the Navbar and
// // applied the props that router send to this component.
// export default withRouter(Navbar);



import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));
