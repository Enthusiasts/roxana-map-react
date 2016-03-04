/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var Actions = require('../../actions/routes');

var RouteItem = require('./route-item');

var RouteList = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    renderEntertainments: function ()
    {
        var entertainments = this.props.items;
        if (entertainments)
        {
            return entertainments.map(
                ent => {
                    return (
                        <RouteItem key={"ri-" + ent.id} info={ent}/>
                    );
                }
            );
        } else return null;
    },

    clearList: function()
    {
        this.context.store.dispatch(Actions.clearRouteList());
    },

    renderSaveButton: function(){
            return this.context.store.getState().User.isAuthorized
                ? <button>Сохранить</button>
                : null;
    },

    renderClearButton: function(){
        return this.props.items.length > 0
            ? <button onClick={this.clearList}>Очистить</button>
            : null;
    },

    render: function()
    {
        return (
            // TODO: здесь
            <div>
                {this.renderEntertainments()}
                {this.renderClearButton()}
                {this.renderSaveButton()}
            </div>
        );
    }
});

RouteList.propTypes = {

    /* Массив объектов вида
     [{
      id: 0,
      title: 'Сохо'
      zoneTitle: 'район замоскворечье',

     }]*/

    items: React.PropTypes.array.isRequired
};





module.exports = RouteList;