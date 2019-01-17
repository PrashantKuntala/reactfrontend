import React, {Component} from 'react';
import axios from 'axios';

// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LaunchIcon from '@material-ui/icons/Launch';
import TrackHubIcon from '@material-ui/icons/AssessmentOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Drawer from '@material-ui/core/Drawer';
import DownloadIcon from '@material-ui/icons/GetAppOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';

// For Sample Meta information Drawer
import SampleStats from './SampleStats';

// For Replicate tabs
import ReplicateTabs from './ReplicateTabs';

// For SampleStats Notifications
import { SnackbarProvider } from 'notistack';

const styles = theme => ({
          
    center : {
        margin: 'auto',      
        maxWidth: 1200,
        padding: 10,
        // border: '2px solid green'
      },
    card: {
        maxWidth: 1200
    },   
            
      leftIcon: {
        marginRight: theme.spacing.unit,
        fontSize: 20,
      }
    
});

class Post extends Component{
    state ={
        post : null, // setting it to one sample 
        proteinName :  null,
        drawer :false,
        samples : null
    }

    // you would access the route parameter here and then maybe fetch stuff
    componentDidMount(){
        console.log("component mounted and started fetching data");
        
        // you automatically get the props for class based components.
        console.log(this.props);
        
        let id = this.props.match.params.post_id;
        
        axios.get('http://172.29.0.74:8080/reviewSamples/'+id)
            .then(res =>{
                console.log("SampleData");                
                console.log(res.data.samples);
             
                this.setState({
                    post : res.data.samples[0],
                    proteinName: id,
                    samples: res.data.samples
                })
                console.log(this.props.match);        
                console.log(this.props.history.location);
                // console.log(res.data);                
            })        
    }
componentDidUpdate(){
    console.log("component updated");  
    console.log(this.props.match.params.post_id);      
}
componentWillReceiveProps(nextProps){
    console.log('route chnaged')
    console.log(nextProps);
    let id = nextProps.match.params.post_id;
    axios.get('http://172.29.0.74:8080/reviewSamples/'+id)
        .then(res =>{
            this.setState({
                post : res.data
            })
            console.log(nextProps.match);        
            console.log(nextProps.history.location);
            // console.log(res.data);                
        })
     
 }

//  Custom Handlers

handleSGDClick = () => {
    let url = "https://www.yeastgenome.org/locus/" + this.state.post.sgdId;
    let sgdWin = window.open(url, '_blank');
    sgdWin.focus();
}

handleTrackHubClick = () => {
    console.log("handleTrackHubClick() from Post.js =>  Navigate to Track Hub");    
}

handleDownloadClick = () => {
    console.log("handleDownloadClick() from Post.js =>  Initiate Download for the entire protein or redirect to bulk downloads");    
}

toggleDrawer = (option) => () => {
    this.setState({
      drawer: option,
    });
  };

    render() {
        console.log("Rendering POST.js ");
        
        const { classes } = this.props;
        // Retrieve only the header information, might need to change the sample model for that.
        // Then send all the samples to replicate tabs as props which uses map to create each individual
        // sections, which are themselves individual components

        const post = this.state.post ? (
            <div className={classes.card}>
                {/* Header Section */}
                <Card >
                        <CardContent >
                            <Grid container spacing={8} alignItems={"center"} >
                                <Grid item sm={"auto"}>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        {this.state.proteinName}
                                        <Typography component="p" variant="caption" >
                                        {this.state.post.featureName}
                                        </Typography> 
                                    </Typography>                                                              
                                </Grid>                               
                            </Grid>   
                            <Grid container spacing={8} alignItems={"center"}>
                                <Grid item sm={"auto"}>
                                    <Typography component="p" variant="body1" >
                                    {this.state.post.description}
                                    </Typography>
                                </Grid>
                            </Grid>                          
                        </CardContent>
                        <Divider variant="middle"/>

                        {/* Action toolbar */}
                        <CardActions>
                            <Grid container alignItems={"center"} justify={"space-between"}>
                                <Grid item sm={"auto"}>
                                    {/* <Button size="small" color="primary" component={Link} to='/'>Back</Button> */}
                                    <Button size="small" color="primary" onClick={this.handleTrackHubClick}>
                                    <TrackHubIcon className={classes.leftIcon}/>
                                    TrackHub
                                    </Button>
                                    <Button size="small" color="primary" onClick={this.handleSGDClick}>
                                    <LaunchIcon className={classes.leftIcon} />
                                    view on SGD
                                    </Button>
                                    <Button size="small" color="primary" onClick={this.toggleDrawer(true)}>
                                    <InfoIcon className={classes.leftIcon} />
                                        More Info
                                    </Button>
                                </Grid>
                                <Grid item sm={"auto"}>
                                <Button size="small" color="primary"  onClick={this.handleDownloadClick}>
                                    <DownloadIcon className={classes.leftIcon}/>
                                    Download
                                    </Button>
                                </Grid>
                            </Grid>   
                        </CardActions>

                        {/* Drawer to show all the individual sample stats */}
                        <Drawer anchor="top" open={this.state.drawer} onClose={this.toggleDrawer(false)}>
                            <div tabIndex={0} role="button">
                                {/* Sending the toggleDrawer function as a prop that is called inside sampleStats.js */}
                                <SnackbarProvider maxSnack={1} 
                                                  anchorOrigin={{vertical: 'top',horizontal:'right', }} hideIconVariant={true}>
                                    <SampleStats stats={this.state.samples} handleBack={this.toggleDrawer(false)}/>
                                </SnackbarProvider>
                            </div>
                        </Drawer>
                </Card>
            
            {/* Second Section with Tabs */}
            <ReplicateTabs samples={this.state.samples}/>
            
            </div>
        ) : (
            // not so clear , need to use promises to show a loading and a message incase there are no public samples.
            <Typography component="div" className={classes.center}>                   
                    <Typography component="p" variant="subtitle1" >
                        Fetching Samples
                    </Typography>
                    <LinearProgress variant="query" />
            </Typography>
        )
        return (
            <Typography component="div" className={classes.center}>
                {post}
            </Typography>
        )
    }
}


Post.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);

