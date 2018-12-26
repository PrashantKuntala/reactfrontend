import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: 12
    },
    center : {
        margin: 'auto',
        width: '50%',
        padding: 10,
      },
    card: {
        maxWidth: 700,
        margin: 20
    },   
    avatar: {
        backgroundColor: red[500],
    },
});

class Post extends Component{
    state ={
        post : null,
        id :  null
    }

    // you would access the route parameter here and then maybe fetch stuff
    componentDidMount(){
        console.log("component mounted and started fetching data");
        
        // you automatically get the props for class based components.
        console.log(this.props);
        
        let id = this.props.match.params.post_id;
        axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
            .then(res =>{
                this.setState({
                    post : res.data
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
    axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
        .then(res =>{
            this.setState({
                post : res.data
            })
            console.log(nextProps.match);        
            console.log(nextProps.history.location);
            // console.log(res.data);                
        })
     
 }
    render() {
        console.log("Rendering POST.js ");
        
        const { classes } = this.props;

        const post = this.state.post ? (
            <div>
                <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Post No." className={classes.avatar}>
                                    {this.state.post.id}
                                </Avatar>
                            }
                            title={this.state.post.title}
                            subheader="September 14, 2016"
                        />

                        <CardContent>
                            <Typography component="p">
                            {this.state.post.body}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button size="small" color="primary" component={Link} to='/'>Back</Button>
                        </CardActions>
                    </Card>
            </div>
        ) : (
            <Typography component="p" variant="subtitle1" className={classes.center}>
                    Loading Posts ...
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

