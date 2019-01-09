import React, {Component} from 'react';
import axios from 'axios';

// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LaunchIcon from '@material-ui/icons/Launch';
import TrackHubIcon from '@material-ui/icons/AssessmentOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Drawer from '@material-ui/core/Drawer';
import DownloadIcon from '@material-ui/icons/GetAppOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';

// remove these after you figured out the sample information
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// For Replicate tabs
import ReplicateTabs from './ReplicateTabs';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: 12
    },
    gridRoot: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    center : {
        margin: 'auto',
        width: '80%',
        padding: 10,
      },
    card: {
        margin: 20
    },   
      iconHover: {        
        color:blue[500],
        '&:hover': {
          color: blue[800],
        },
      },      
      leftIcon: {
        marginRight: theme.spacing.unit,
        fontSize: 20,
      },      
      fullList: {
        width: 'auto',
        // backgroundColor: "#a0a0a0",
        // height: 500
      },
    
});

class Post extends Component{
    state ={
        post : null,
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
        
        axios.get('http://localhost:8080/reviewSamples/'+id)
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
    axios.get('http://localhost:8080/reviewSamples/'+id)
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

        // content that you want to show case inside the drawer, you can create smaller components to display this data, if you like a list or a table of cards, whatever. The anchor on drawer determines if it is going to be big or small, maybe you can adjust the width, choose one for now.
        const fullList = (
            <div className={classes.fullList}>
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          );


        const post = this.state.post ? (
            <div>
                
                <Card className={classes.card}>

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
                        <Drawer anchor="bottom" open={this.state.drawer} onClose={this.toggleDrawer(false)}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer( false)}
                                onKeyDown={this.toggleDrawer( false)}
                            >
                                {fullList}
                            </div>
                        </Drawer>

                </Card>
            
            {/* Second Section with Tabs */}
            <ReplicateTabs samples={this.state.samples}/>
            
            </div>
        ) : (
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

