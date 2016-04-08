/**
 * Created by Vlad on 07.04.2016.
 */
var React = require('react');

var Actions = require('../../../actions/entertainments');
var Properties = require('../../../const/properties');
var classNames = require('classnames');

var SearchLine = React.createClass({

    changeHandler: function (event) {
        console.log(event.target.value);
    },
    renderSearchResults: function(){

        return (false) ?  (<div id="searchResult"></div>): null
    },

    render: function(){
        return (
            <div className="searchComponent">
                <div className="form-group has-feedback ">
                    <input type="text" className="form-control squaredBorders" placeholder="Выберите место" onChange = {this.changeHandler}/>
                    <i className="glyphicon glyphicon-search form-control-feedback"/>
                </div>
                {this.renderSearchResults()}

            </div>

        )
    }

});

module.exports = SearchLine;

