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

const add = (name) => {
  const request = name => ({
    type: groupsConstants.ADD_REQUEST,
    name,
  });

  const success = () => ({
    type: groupsConstants.ADD_SUCCESS,
  });

  const failure = error => ({
    type: groupsConstants.ADD_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request(name));

    try {
      // FIXME: make sure that msg here
      const msg = await groupsService.add(name);
      dispatch(success(msg));
      // redirect to groups page
      history.push('/dashboard/groups');
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const remove = (id) => {
  const request = id => ({
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
    dispatch(request(id));

    try {
      // FIXME: make sure that msg here
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
  add,
  remove,
};

export default groupsActions;