import React from 'react';

export default class Welcome extends React.Component{

    render(){
        const {message}=this.props;
        return (<h1>{message}</h1>);
    }
}
