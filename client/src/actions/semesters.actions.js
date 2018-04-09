import semestersConstants from '../constants/semesters.constants';
import semestersService from '../services/semesters.service';
import alertActions from '../actions/alert.actions';
import history from '../helpers/history';

const getAll = () => {
  const request = () => ({
    type: semestersConstants.GET_ALL_REQUEST,
  });

  const success = list => ({
    type: semestersConstants.GET_ALL_SUCCESS,
    list,
  });

  const failure = error => ({
    type: semestersConstants.GET_ALL_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const list = await semestersService.getAll();

      dispatch(success(list));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const getById = (id) => {
  const request = () => ({
    type: semestersConstants.GET_BY_ID_REQUEST,
    id,
  });

  const success = semester => ({
    type: semestersConstants.GET_BY_ID_SUCCESS,
    semester,
  });

  const failure = error => ({
    type: semestersConstants.GET_BY_ID_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const semester = await semestersService.getById(id);
      dispatch(success(semester));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const add = (data) => {
  const request = () => ({
    type: semestersConstants.ADD_REQUEST,
    data,
  });

  const success = semester => ({
    type: semestersConstants.ADD_SUCCESS,
    semester,
  });

  const failure = error => ({
    type: semestersConstants.ADD_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const semester = await semestersService.add(data);
      dispatch(success(semester));
      history.push('/dashboard/semesters');
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const remove = (id) => {
  const request = () => ({
    type: semestersConstants.REMOVE_REQUEST,
    id,
  });

  const success = msg => ({
    type: semestersConstants.REMOVE_SUCCESS,
    msg,
  });

  const failure = error => ({
    type: semestersConstants.REMOVE_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const msg = await semestersService.remove(id);
      dispatch(success(msg));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const edit = (data) => {
  const request = () => ({
    type: semestersConstants.EDIT_REQUEST,
    data,
  });

  const success = semester => ({
    type: semestersConstants.EDIT_SUCCESS,
    semester,
  });

  const failure = error => ({
    type: semestersConstants.EDIT_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const semester = await semestersService.edit(data);
      dispatch(success(semester));
      history.push('/dashboard/semesters');
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const semestersActions = {
  getAll,
  getById,
  add,
  remove,
  edit,
};

export default semestersActions;
