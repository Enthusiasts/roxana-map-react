/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');

var Actions = require('../../actions/entertainments');
var Properties = require('../../const/properties');

var NavUnknownElem = React.createClass({
   /* contextTypes: {
        store: React.PropTypes.object.isRequired
    },*/

    testActionDispatch: function ()
    {
        console.log("clicked");
        //this.store.dispatch(Actions.fetchEntertainments(Properties.ENTERTAINMENT_TYPE.CAFE));
    },

    render: function(){
        return  (
            <li className="pure-menu-item">
                <a onClick={this.testActionDispatch} className="pure-menu-link">{this.props.bname}</a>
            </li>
        );
    }

});

module.exports = NavUnknownElem;