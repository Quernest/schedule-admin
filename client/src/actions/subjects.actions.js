import subjectsConstants from '../constants/subjects.constants';
import subjectsService from '../services/subjects.service';
import alertActions from '../actions/alert.actions';
import history from '../helpers/history';

const getAll = () => {
  const request = () => ({
    type: subjectsConstants.GET_ALL_REQUEST,
  });

  const success = list => ({
    type: subjectsConstants.GET_ALL_SUCCESS,
    list,
  });

  const failure = error => ({
    type: subjectsConstants.GET_ALL_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const list = await subjectsService.getAll();

      dispatch(success(list));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const getById = (id) => {
  const request = () => ({
    type: subjectsConstants.GET_BY_ID_REQUEST,
    id,
  });

  const success = subject => ({
    type: subjectsConstants.GET_BY_ID_SUCCESS,
    subject,
  });

  const failure = error => ({
    type: subjectsConstants.GET_BY_ID_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const subject = await subjectsService.getById(id);
      dispatch(success(subject));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const add = (data) => {
  const request = () => ({
    type: subjectsConstants.ADD_REQUEST,
    data,
  });

  const success = subject => ({
    type: subjectsConstants.ADD_SUCCESS,
    subject,
  });

  const failure = error => ({
    type: subjectsConstants.ADD_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const subject = await subjectsService.add(data);
      history.push('/dashboard/subjects');
      dispatch(success(subject));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const remove = (id) => {
  const request = () => ({
    type: subjectsConstants.REMOVE_REQUEST,
    id,
  });

  const success = msg => ({
    type: subjectsConstants.REMOVE_SUCCESS,
    msg,
  });

  const failure = error => ({
    type: subjectsConstants.REMOVE_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request(id));

    try {
      const msg = await subjectsService.remove(id);
      dispatch(success(msg));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

export default {
  getAll,
  getById,
  add,
  remove,
};
