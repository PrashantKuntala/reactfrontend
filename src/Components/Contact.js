import React from 'react';

const Contact =(props) =>{
    // the router sends in some pre-defined props that you can use to route
    console.log(props);
    
    // programmatic routing to about page after 2 seconds upon clicking the contact page.
    // setTimeout(() => {
    //     props.history.push('/about')
    // },2000);
    
    return (
        <div className="container">
            <h4 className="center">Contact</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum adipisci, iure fugit officiis, blanditiis magni nisi, voluptate nesciunt dignissimos in voluptatum? Quaerat vitae corporis minima sint debitis obcaecati pariatur neque.</p>

        </div>
    )
}

export default Contact;