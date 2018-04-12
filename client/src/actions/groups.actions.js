import groupsConstants from '../constants/groups.constants';
import groupsService from '../services/groups.service';
import alertActions from '../actions/alert.actions';
import history from '../helpers/history';

const getAll = () => {
  const request = () => ({
    type: groupsConstants.GET_ALL_REQUEST,
  });

  const success = list => ({
    type: groupsConstants.GET_ALL_SUCCESS,
    list,
  });

  const failure = error => ({
    type: groupsConstants.GET_ALL_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const list = await groupsService.getAll();

      dispatch(success(list));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const getById = (id) => {
  const request = () => ({
    type: groupsConstants.GET_BY_ID_REQUEST,
    id,
  });

  const success = group => ({
    type: groupsConstants.GET_BY_ID_SUCCESS,
    group,
  });

  const failure = error => ({
    type: groupsConstants.GET_BY_ID_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const group = await groupsService.getById(id);
      dispatch(success(group));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const add = (name) => {
  const request = () => ({
    type: groupsConstants.ADD_REQUEST,
    name,
  });

  const success = group => ({
    type: groupsConstants.ADD_SUCCESS,
    group,
  });

  const failure = error => ({
    type: groupsConstants.ADD_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const group = await groupsService.add(name);
      dispatch(success(group));
      history.push('/dashboard/groups');
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const remove = (id) => {
  const request = () => ({
    type: groupsConstants.REMOVE_REQUEST,
    id,
  });

  const success = msg => ({
    type: groupsConstants.REMOVE_SUCCESS,
    msg,
  });

  const failure = error => ({
    type: groupsConstants.REMOVE_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const msg = await groupsService.remove(id);
      dispatch(success(msg));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const groupsActions = {
  getAll,
  getById,
  add,
  remove,
};

export default groupsActions;
