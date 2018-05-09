import locationsConstants from '../constants/locations.constants';
import locationsService from '../services/locations.service';
import alertActions from '../actions/alert.actions';
import history from '../helpers/history';

const getAll = () => {
  const request = () => ({
    type: locationsConstants.GET_ALL_REQUEST,
  });

  const success = list => ({
    type: locationsConstants.GET_ALL_SUCCESS,
    list,
  });

  const failure = error => ({
    type: locationsConstants.GET_ALL_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const list = await locationsService.getAll();

      dispatch(success(list));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const getById = (id) => {
  const request = () => ({
    type: locationsConstants.GET_BY_ID_REQUEST,
    id,
  });

  const success = location => ({
    type: locationsConstants.GET_BY_ID_SUCCESS,
    location,
  });

  const failure = error => ({
    type: locationsConstants.GET_BY_ID_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const location = await locationsService.getById(id);
      dispatch(success(location));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const add = (data) => {
  const request = () => ({
    type: locationsConstants.ADD_REQUEST,
    data,
  });

  const success = location => ({
    type: locationsConstants.ADD_SUCCESS,
    location,
  });

  const failure = error => ({
    type: locationsConstants.ADD_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const location = await locationsService.add(data);
      history.push('/dashboard/locations');
      dispatch(success(location));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const edit = (data) => {
  const request = () => ({
    type: locationsConstants.EDIT_REQUEST,
    data,
  });

  const success = msg => ({
    type: locationsConstants.EDIT_SUCCESS,
    msg,
  });

  const failure = error => ({
    type: locationsConstants.EDIT_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const msg = await locationsService.edit(data);
      history.push('/dashboard/locations');
      dispatch(success(msg));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const remove = (id) => {
  const request = () => ({
    type: locationsConstants.REMOVE_REQUEST,
    id,
  });

  const success = msg => ({
    type: locationsConstants.REMOVE_SUCCESS,
    msg,
  });

  const failure = error => ({
    type: locationsConstants.REMOVE_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request(id));

    try {
      const msg = await locationsService.remove(id);
      dispatch(success(msg));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const locationsActions = {
  getAll,
  getById,
  add,
  edit,
  remove,
};

export default locationsActions;
