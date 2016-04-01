/**
 * Created by Vlad on 01.04.2016.
 */
var React = require('react');
var classNames = require('classnames');

var Entertainments = require('../../../actions/entertainments');
var Properties = require('../../../const/properties');

var LikeCluster = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    getInitialState: function(){
      return ({like: []})
    },

    setLike (like) {
        return function(){
            var temp = this.state.like;

            if (!this.state.like.includes(like)) {
                temp.push(like);
            }
            else {
                temp = temp.filter(x=> x != like);
            }

            this.setState({like: temp});
            this.context.store.dispatch(Entertainments.showClusterType(Properties.CLUSTER.TYPE.LIKE,true, temp));
            console.log(this.context.store.getState());
        }.bind(this)
    },

    render: function () {
        var classi1 = classNames({
            'fa fa-heart chosen': this.state.like.includes(1),
            'fa fa-heart': !this.state.like.includes(1)
        });
        var classi2 = classNames({
            'fa fa-heart chosen': this.state.like.includes(2),
            'fa fa-heart': !this.state.like.includes(2)
        });
        var classi3 = classNames({
            'fa fa-heart chosen': this.state.like.includes(3),
            'fa fa-heart': !this.state.like.includes(3)
        });
        var classi4 = classNames({
            'fa fa-heart chosen': this.state.like.includes(4),
            'fa fa-heart': !this.state.like.includes(4)
        });

        return (
            <div  className="range like">
                <b>Likes</b><br/>
                <i onClick={this.setLike(1)} className={classi1} title="Мало"/> &nbsp;
                <i onClick={this.setLike(2)} className={classi2} title="Меньше среднего"/> &nbsp;
                <i onClick={this.setLike(3)} className={classi3} title="Больше среднего"/> &nbsp;
                <i onClick={this.setLike(4)} className={classi4} title="Много"/>
            </div>
        )

    }
});

module.exports = LikeCluster;