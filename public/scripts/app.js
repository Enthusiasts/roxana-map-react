/**
 * Created by debal on 24.02.2016.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var RoxanaApp = require('./components/roxana-app');

//TODO: move to another layer or smth
if (window.opener)
{
    // ?
} else {
    ReactDOM.render(<RoxanaApp />, document.getElementById("application"));
}
