/**
 * Created by debal on 03.03.2016.
 */
var React = require('react');
var RouteItem = require('./route-item');

var RouteList = React.createClass({
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

    shura: function(props){

        if (props == true){
            return(
                <div>
                    <button>Привет ЛОХ</button>
                    <button>Привет НЛОХ</button>
                </div>
            );

        }else
        {
            return(
                <div >
                    <button>Привет НелоХ</button>

                </div>
            );
        }
    },

    render: function()
    {
        return (
            // TODO: здесь
            <div>
                {this.renderEntertainments()}
                {this.shura(this.props.isAuthorized)}


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


    isAuthorized: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired
};





module.exports = RouteList;