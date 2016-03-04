/**
 * Created by debal on 02.03.2016.
 */
var Properties = require('../const/properties');

const REQUEST_ENTERTAINMENTS = 'GET_ENTERTAINMENTS';
const requestEntertainments = function (entertainmentsType)
{
    return {
        type: REQUEST_ENTERTAINMENTS,
        payload: {
            entertainmentsType
        }
    };
};

const RECEIVE_ENTERTAINMENTS = 'RECEIVE_ENTERTAINMENTS';
const receiveEntertainments = function (entertainmentsType, entertainments)
{
    return {
        type: RECEIVE_ENTERTAINMENTS,
        payload: {
            entertainmentsType,
            entertainments,
            receivedAt: Date.now()
        }
    };
};

const ERROR_ENTERTAINMENTS = 'ERROR_ENTERTAINMENTS';
const errorEntertainments = function (entertainmentsType)
{
    return {
        type: ERROR_ENTERTAINMENTS,
        payload: new Error(),
        error: 'Невозможно загрузить заведения "' + entertainmentsType + '" :('
    };
};

function fetchEntertainments(entertainmentsType)
{
    return function (dispatch)
    {
        dispatch(requestEntertainments(entertainmentsType));

        var ent_type = Properties.ENTERTAINMENT.TYPE;


        return fetch(Properties.API.ROOT + "entertainments/search/findByType/?type=" + ent_type.translate(entertainmentsType))
            .then(
                response =>
                    response.json()
            )
            .then(
                json => {
                    var ents = json._embedded.entertainments;
                    dispatch(receiveEntertainments(entertainmentsType, ents));
                }
            );
    }
}


module.exports = {
    REQUEST_ENTERTAINMENTS,
    RECEIVE_ENTERTAINMENTS,
    ERROR_ENTERTAINMENTS,
    errorEntertainments,
    fetchEntertainments
};