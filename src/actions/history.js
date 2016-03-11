/**
 * Created by debal on 11.03.2016.
 */
var Properites = require('../const/properties');

const FETCH_USER_HISTORY_BEGIN = 'FETCH_USER_HISTORY_BEGIN';
const fetchUserHistoryBegin = function()
{
    return {
        type: FETCH_USER_HISTORY_BEGIN
    };
};

const FETCH_USER_HISTORY_VALIDATE = 'FETCH_USER_HISTORY_VALIDATE';
const fetchUserHistoryValidate = function(items)
{
    return {
        type: FETCH_USER_HISTORY_VALIDATE,
        payload: {
            savedRoutes: items
        }
    };
};

const fetchUserHistory = function(userId)
{
    return (dispatch) =>
    {
        dispatch(fetchUserHistoryBegin());

        //TODO: handle with userId
        return fetch(Properites.API.ROOT + 'routes/')
            .then(response => response.json())
            .then(
                json =>
                {
                    var routes = json._embedded.routes;
                    console.log("History: " + json.page.totalElements + " found, " + json.page.size + " received.");
                    dispatch(fetchUserHistoryValidate(routes.map(
                        x =>
                            Object.assign({}, x, {first: {title: "pf"}, last: {title: "sd"}})
                    )));
                }
            );
    }
};

module.exports = {
    FETCH_USER_HISTORY_BEGIN,
    FETCH_USER_HISTORY_VALIDATE,
    fetchUserHistory
};