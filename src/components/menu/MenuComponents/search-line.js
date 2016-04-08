/**
 * Created by Vlad on 07.04.2016.
 */
var React = require('react');

var Entertainments = require('../../../actions/entertainments');
var Properties = require('../../../const/properties');
var classNames = require('classnames');

var SearchLine = React.createClass({
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },

    changeHandler: function (event) {
        var value = event.target.value;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.context.store.dispatch(Entertainments.searchEnt(value)), 1000);


    },
    renderSearchResults: function(){
        if (this.props.searchEnt.searching){
            return (
                <div id="searchResult">
                    &nbsp;&nbsp;<i className="fa fa-spinner animated rotateIn"/>
                </div>
            )
        }
        else {
            if (this.props.searchEnt.candidates.length == 0 && this.props.searchEnt.hasResp) {
                return (<div id="searchResult">
                            Не найдено
                        </div>)
            }
            if (this.props.searchEnt.candidates.length > 0){
                return (
                    <div id="searchResult" className="list-group">
                        {this.renderResults(this.props.searchEnt.candidates)}
                    </div>
                )
            }
        }
        return null
    },
    clickOnLink: function(ent){
        return function(){
            this.context.store.dispatch(Entertainments.showEntFromSearchResult(ent));
        }.bind(this)
    },
    renderResults: function(results){
        return results.map (
          ent => {
              return (
                  <li className="list-group-item" key = {ent.id}>
                      <a onClick={this.clickOnLink(ent)}>{ent.title}</a>
                  </li>
                  )
          }
      )
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
SearchLine.propTypes = {
    searchEnt: React.PropTypes.object.isRequired
};

module.exports = SearchLine;

