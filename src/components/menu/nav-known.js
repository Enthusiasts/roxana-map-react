/**
 * Created by Vlad on 03.03.2016.
 */
var React = require('react');

var NavKnown = React.createClass({
    render: function(){
        return (
            <div id="knownMenuList">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon2"/>
                    <span className="input-group-addon" id="basic-addon2">.!.</span>
                </div>
                <br/>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon2"/>
                    <span className="input-group-addon" id="basic-addon2">.!.</span>
                </div>
                <br/>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon2"/>
                    <span className="input-group-addon" id="basic-addon2">.!.</span>
                </div>
                <br/>
            </div>
        )
    }
});

module.exports = NavKnown;