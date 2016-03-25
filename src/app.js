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

// TODO: hack... remove
var HistoryActions = require('./actions/history');
setInterval(() => {
    var userId = store.getState().User.userInfo.id;
    if (userId) store.dispatch(HistoryActions.fetchUserHistory(userId))
}, 5000);

ReactDOM.render(
    <Provider store={store}>
        <RoxanaApp />
    </Provider>,
    document.getElementById("application"));
