import teachersConstants from '../constants/teachers.constants';
import teachersService from '../services/teachers.service';
import alertActions from '../actions/alert.actions';
import history from '../helpers/history';

const getAll = (isUseStorage) => {
  const request = () => ({
    type: teachersConstants.GET_ALL_REQUEST,
  });

  const success = list => ({
    type: teachersConstants.GET_ALL_SUCCESS,
    list,
  });

  const failure = error => ({
    type: teachersConstants.GET_ALL_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const list = await teachersService.getAll(isUseStorage);

      dispatch(success(list));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const add = (name) => {
  const request = name => ({
    type: teachersConstants.ADD_REQUEST,
    name,
  });

  const success = teacher => ({
    type: teachersConstants.ADD_SUCCESS,
    teacher,
  });

  const failure = error => ({
    type: teachersConstants.ADD_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request(name));

    try {
      // FIXME: make sure that msg here
      const teacher = await teachersService.add(name);
      dispatch(success(teacher));
      // redirect to teachers page
      history.push('/dashboard/teachers');
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const remove = (id) => {
  const request = id => ({
    type: teachersConstants.REMOVE_REQUEST,
    id,
  });

  const success = msg => ({
    type: teachersConstants.REMOVE_SUCCESS,
    msg,
  });

  const failure = error => ({
    type: teachersConstants.REMOVE_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request(id));

    try {
      // FIXME: make sure that msg here
      const msg = await teachersService.remove(id);
      dispatch(success(msg));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const teachersActions = {
  getAll,
  add,
  remove,
};

export default teachersActions;
