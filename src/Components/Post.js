import React, {Component} from 'react';
import axios from 'axios';

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
        
        
        const post = this.state.post ? (
            <div className="post">
                <h4 className="center">{this.state.post.title}</h4>
                <p>{this.state.post.body}</p>
            </div>
        ) : (
            <div className="center">
                Loading Post ....
            </div>
        )
        return (
            <div className="container">
                {post}
            </div>
        )
    }
}

export default Post;