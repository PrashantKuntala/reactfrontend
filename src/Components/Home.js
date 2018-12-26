import React, { Component } from 'react';
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

// Mui Datatable
import Datatable from './Datatable';
// import CustomTableHeader from './CustomTableHeader';

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
        padding: 10
        
      },
    card: {
        maxWidth: 700,
        margin: 20
    },   
    avatar: {
        backgroundColor: red[500],
    },
});

class Home extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                // console.log(res);
                this.setState({
                    posts: res.data.slice(0, 10)
                });
            })

        axios.get('http://localhost:8080/reviewSamples')
        .then(res => {
            console.log(res.data.count);
            console.log(res.data.samples);
            });
       
    }

    render() {
        const { classes } = this.props;
        const { posts } = this.state;


        // creating individuals posts
        const postList = posts.length ? (posts.map(post => {
            return (
                <Card className={classes.card} key={post.id}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Post No." className={classes.avatar}>
                                {post.id}
                            </Avatar>
                        }
                        title={post.title}
                        subheader="September 14, 2016"
                    />

                    <CardContent>
                        <Typography component="p">
                            {post.body}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small" color="primary" component={Link} to={'/' + post.id}>Learn More</Button>
                    </CardActions>
                </Card>

            )
        })) : (

                <Typography component="p" variant="subtitle1" className={classes.center}>
                    No Posts Yet
                </Typography>
            );

        return (
            <div>
           
            {/* <CustomTableHeader/> */}
            <Typography component="div" className={classes.center}>                
                <Datatable/>
                {/* {postList} */}
            </Typography>
            </div>
           
        )

    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
