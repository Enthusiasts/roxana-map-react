/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');

var Actions = require('../../actions/entertainments');
var Properties = require('../../const/properties');

var NavUnknownElem = React.createClass({
   contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    testActionDispatch: function ()
    {
        console.log(this.props.type + " requested.");
        this.context.store.dispatch(Actions.fetchEntertainments(this.props.type));
    },

    render: function(){
        return  (
            <li className="pure-menu-item">
                <a onClick={this.testActionDispatch} className="pure-menu-link">
                    {Properties.ENTERTAINMENT.TYPE.translate(this.props.type)}
                </a>
            </li>
        );
    }

});

NavUnknownElem.propTypes = {
    type: React.PropTypes.string.isRequired
};

module.exports = NavUnknownElem;