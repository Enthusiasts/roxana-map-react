/**
 * Created by Vlad on 01.04.2016.
 */
var React = require('react');
var classNames = require('classnames');

var Entertainments = require('../../../actions/entertainments');
var Properties = require('../../../const/properties');

var CheckinCluster = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    getInitialState: function(){
        return ({checkin: []})
    },

    setCheckin (checkin) {
        return function(){
            var temp = this.state.checkin;

            if (!this.state.checkin.includes(checkin)) {
                temp.push(checkin);
            }
            else {
                temp = temp.filter(x=> x != checkin);
            }

            this.setState({checkin: temp});
            this.context.store.dispatch(Entertainments.showClusterType(Properties.CLUSTER.TYPE.CHECKIN,true, temp));
            console.log(this.context.store.getState());
        }.bind(this)
    },

    render: function () {
        var classi1 = classNames({
            'fa fa-check chosen': this.state.checkin.includes(1),
            'fa fa-check': !this.state.checkin.includes(1)
        });
        var classi2 = classNames({
            'fa fa-check chosen': this.state.checkin.includes(2),
            'fa fa-check': !this.state.checkin.includes(2)
        });
        var classi3 = classNames({
            'fa fa-check chosen': this.state.checkin.includes(3),
            'fa fa-check': !this.state.checkin.includes(3)
        });
        var classi4 = classNames({
            'fa fa-check chosen': this.state.checkin.includes(4),
            'fa fa-check': !this.state.checkin.includes(4)
        });

        return (
            <div  className="range checkin">
                <b>Checkins</b><br/>
                <i onClick={this.setCheckin(1)} className={classi1} title="Мало"/> &nbsp;
                <i onClick={this.setCheckin(2)} className={classi2} title="Меньше среднего"/> &nbsp;
                <i onClick={this.setCheckin(3)} className={classi3} title="Больше среднего"/> &nbsp;
                <i onClick={this.setCheckin(4)} className={classi4} title="Много"/>
            </div>
        )

    }
});

module.exports = CheckinCluster;