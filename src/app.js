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

//TODO: move to another layer or smth
if (window.opener)
{
    // ?
} else {
    ReactDOM.render(
        <Provider store={store}>
            <RoxanaApp />
        </Provider>,
        document.getElementById("application"));

    //TODO: delete
    var EntActions = require('./actions/entertainments');
    var RouteActions = require('./actions/routes');
    var Properties = require('./const/properties');
    store.dispatch(EntActions.fetchEntertainments(Properties.ENTERTAINMENT_TYPE.BAR));

    var t = RouteActions.addRouteItem({id: 0, title: "It works", zoneTitle: "it works district"});
    store.dispatch(t);
}
