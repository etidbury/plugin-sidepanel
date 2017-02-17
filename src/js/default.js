import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from 'component/Welcome';
import plugins from 'plugins';plugins();

jQuery(document).ready(() => {

    ReactDOM.render(
        <Welcome message="ReactJS working." />,
        document.getElementById('root')
    );

});
