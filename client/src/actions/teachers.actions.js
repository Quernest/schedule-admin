import teachersConstants from '../constants/teachers.constants';
import teachersService from '../services/teachers.service';
import alertActions from '../actions/alert.actions';
import history from '../helpers/history';

const getAll = () => {
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
      const list = await teachersService.getAll();

      dispatch(success(list));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const getById = (id) => {
  const request = () => ({
    type: teachersConstants.GET_BY_ID_REQUEST,
    id,
  });

  const success = teacher => ({
    type: teachersConstants.GET_BY_ID_SUCCESS,
    teacher,
  });

  const failure = error => ({
    type: teachersConstants.GET_BY_ID_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const teacher = await teachersService.getById(id);
      dispatch(success(teacher));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const add = (data) => {
  const request = () => ({
    type: teachersConstants.ADD_REQUEST,
    data,
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
    dispatch(request());

    try {
      const teacher = await teachersService.add(data);
      history.push('/dashboard/teachers');
      dispatch(success(teacher));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const edit = (data) => {
  const request = () => ({
    type: teachersConstants.EDIT_REQUEST,
    data,
  });

  const success = msg => ({
    type: teachersConstants.EDIT_SUCCESS,
    msg,
  });

  const failure = error => ({
    type: teachersConstants.EDIT_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const msg = await teachersService.edit(data);
      history.push('/dashboard/teachers');
      dispatch(success(msg));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const remove = (id) => {
  const request = () => ({
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
  getById,
  add,
  edit,
  remove,
};

export default teachersActions;
