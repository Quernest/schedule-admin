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

export default {
  getAll,
};
