/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');

var NavKnown = React.createClass({
    getInitialState: function(){
        return {searchNum: 3}
    },

    fieldElem: function(){
      return (
          <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Выберите место" />
              <i className="glyphicon glyphicon-search form-control-feedback"/>
          </div>
      )
    },

    menuMaker: function(){
        var fields =[]
        for (var i=0; i<this.state.searchNum; i++){
            fields.push(this.fieldElem())
            //fields.push(<br/>)
        }
        return (<div className="searchForm">{fields}</div>)
    },

    render: function(){

        return (
            <div id="knownMenuList">
                {this.menuMaker()}
            </div>
        )
    }
});

module.exports = NavKnown;