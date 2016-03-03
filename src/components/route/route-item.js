/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');

var RouteItem = React.createClass({
    render: function()
    {
        var entertainment = this.props.info;
        return (
            // TODO: здесь
            <div>

                {entertainment.title}



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