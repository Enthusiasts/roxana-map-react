/**
 * Created by Vlad on 26.02.2016.
 */

var React = require('react');

var Actions = require('../../actions/entertainments');
var Properties = require('../../const/properties');
var classNames = require('classnames');

var NavUnknownElem = React.createClass({
   contextTypes: {
        store: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return {isActive: false}
    },

    testActionDispatch: function ()
    {
        console.log(this.props.type + " requested.");
        this.setState({isActive: true })
        this.context.store.dispatch(Actions.fetchEntertainments(this.props.type));
    },

    render: function(){
        var active = classNames({
            'pure-menu-link active': this.state.isActive,
            'pure-menu-link': !this.state.isActive
        });
        return  (
            <li className="pure-menu-item">
                <a onClick={this.testActionDispatch} className={active}>
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