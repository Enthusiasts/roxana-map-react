/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');

var Actions = require('../../actions/routes');

var RouteItem = React.createClass({

    renderMoveButtons: function() {
        if (!this.props.showEditButtons) return null;
        return (
            <div className="change-ent-order">
                <i onClick={this.props.onMoveUp} className="fa fa-arrow-up standart-coursor"/>
                <i onClick={this.props.onMoveDown} className="fa fa-arrow-down standart-coursor"/>
            </div>
        );
    },

    renderDeleteButton: function() {
        if (!this.props.showEditButtons) return null;
        return (
            <div className="delete">
                <i onClick={this.props.onDelete} className="fa fa-minus standart-coursor"/>
            </div>
        );
    },

    render: function () {
        var entertainment = this.props.info;
        return (
            <div className="routeListElem">
                <div className="props">
                    <small>{entertainment.type}</small>
                    <br/>
                    {entertainment.title} <i className= "fa fa-rub"/>: {entertainment.cost}
                </div>
                <div className="state">
                    {this.renderMoveButtons()}
                    {this.renderDeleteButton()}
                </div>
            </div>
        );
    }
});

RouteItem.propTypes = {
    info: React.PropTypes.object.isRequired,
    showEditButtons: React.PropTypes.bool.isRequired
};


module.exports = RouteItem;