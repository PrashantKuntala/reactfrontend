import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Home from './Home';
import SearchBox from './SearchBox';



const styles = ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection:'column',
        background: 'linear-gradient(to bottom,#fce4ed,#ffe8cc)'
        // fontFamily: 'Roboto Slab'             
    },
    content:{
        flex : '1 0 auto',
       
        // textAlign: 'center',
    },
    footer: {
        /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
        flexShrink: 0,
        padding: 20,
        
        // height: '20vh',
        // background: '#344955',
        // color: "white"
        // border: '2px solid green'
      },
      jumbotron:{
          padding: '4rem 2rem',
          bottomMargin:'2rem',
        //   background: '#314d64',
        //   color: "white"
      },
      container:{
          maxWidth: '1140px',
          paddingRight: 15,
          paddingLeft: 15,
          margin: "auto"
      }, 
      center : {
        margin: 'auto',
        maxWidth: 1140,
        // padding: 10,    
      },

});

const LandingPage = (props) => {
    const { classes } = props;

    return (
         
        <div className={classes.root}>
            
            <div className={classes.content}>
            <Paper elevation={1}>
            {/* Jumbotron or main message */}
                <div className={classes.jumbotron}>
                    <div className={classes.container}>
                        <Typography variant="h2" gutterBottom>
                            Yeast Epigenome Project
                        </Typography>
                        <Divider/>
                        <Typography variant="subtitle1" gutterBottom>
                        Saccharomyces cerevisiae epigenome                        
                        </Typography>
                        <Typography variant="caption" component="p" gutterBottom>
                        An improved understanding of how genes are regulated requires an improved understanding of where gene regulatory proteins are bound.
                        </Typography> 
                        <br/>
                        <br/>
                        <br/>
                        <SearchBox/>                                       
                    </div>
                </div> 
                </Paper>
                <br/>
                <Grid container spacing={0} direction="column" justify="space-evenly" >
                
                {/* Contributors Section */}
                    <Grid item className={classes.center}>                    
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Contributors
                                </Typography>
                                <Typography variant="body1">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi possimus illo molestias temporibus aperiam repellat veritatis corporis alias qui quam a rem, architecto laborum numquam eveniet explicabo nam impedit quos.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sample Explore Table */}
                    <Grid item style={{padding: 20}}>                    
                        <Home/>
                    </Grid>

                    {/* Contirbutors Section */}
                    {/* <Grid item className={classes.center}>                    
                        <Card >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Contributors
                                </Typography>
                                <Typography variant="body1">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi possimus illo molestias temporibus aperiam repellat veritatis corporis alias qui quam a rem, architecto laborum numquam eveniet explicabo nam impedit quos.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid> */}

                </Grid>                
            </div>

            {/* footer */}
            {/* <CardContent className={classes.footer}> 
                footer                
            </CardContent> */}
          
        </div>
        
       
    );
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
