/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');

var RouteItem = React.createClass({


    render: function () {
        var entertainment = this.props.info;
        return (
            <div>

                <div className="routeListElem">
                    <small>{entertainment.type}</small>
                    {entertainment.title} $: {entertainment.cost}
                </div>
                <div className="change-ent-order">
                    <i onClick="" className="fa fa-arrow-up standart-coursor"/>
                    <i onClick="" className="fa fa-arrow-down standart-coursor"/>
                </div>
                <div className="delete">
                    <i onClick="" className="fa fa-minus standart-coursor"/>
                </div>
            </div>
        );
    }
});

RouteItem.propTypes = {
    // Объект вида
    // {
    //  id: 0,
    //  title: 'Сохо'
    //  zoneTitle: 'район замоскворечье',
    // }
    info: React.PropTypes.object.isRequired
};


module.exports = RouteItem;