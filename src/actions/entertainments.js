/**
 * Created by debal on 02.03.2016.
 */
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
const receiveEntertainments = function (entertainmentsType)
{
    return {
        type: RECEIVE_ENTERTAINMENTS,
        payload: {
            entertainmentsType,
            entertainments: [],
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

module.exports = {
    REQUEST_ENTERTAINMENTS,
    requestEntertainments,
    RECEIVE_ENTERTAINMENTS,
    receiveEntertainments,
    ERROR_ENTERTAINMENTS,
    errorEntertainments
};