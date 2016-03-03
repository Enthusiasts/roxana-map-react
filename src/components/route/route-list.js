/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var RouteItem = require('./route-item');

var RouteList = React.createClass({
    renderEntertainments: function ()
    {
        // TODO: здесь
        var entertainments = this.props.items;
        return entertainments.map(
            ent => {
                return (
                    <RouteItem key={"ri-" + ent.id} info={ent}/>
                );
            }
        );
    },

    render: function()
    {
        return (
            // TODO: здесь
            <div>
                {this.renderEntertainments()}
            </div>
        );
    }
});

RouteList.propTypes = {
    // Массив объектов вида
    // [{
    //  id: 0,
    //  title: 'Сохо'
    //  zoneTitle: 'район замоскворечье',
    // }]
    items: React.PropTypes.array.isRequired
};

module.exports = RouteList;