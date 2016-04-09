/**
 * Created by debal on 24.02.2016.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var RoxanaApp = require('./components/roxana-app');
var ReactRedux = require('react-redux');
var configureStore = require('./configureStore');

const Provider = ReactRedux.Provider;
const store = configureStore();

var HistoryActions = require('./actions/history');
if (window.location.search != '') {
    var splitten = window.location.search.substring(1).split('&');
    var route = '';
    splitten.forEach(
        x => {
            var t = x.match(/route=(.*)/i);
            if (t && t[1]) {
                route = t[1];
            }
        }
    );
    if (route != '') {
        var id = parseInt(atob(route), 10);
        if (!isNaN(id)) {
            console.log('Route is: ', id);
            store.dispatch(HistoryActions.watchRoute(id));
        }
    }
}

ReactDOM.render(
    <Provider store={store}>
        <RoxanaApp />
    </Provider>,
    document.getElementById("application"));
