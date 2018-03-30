import groupsConstants from '../constants/groups.constants';
import groupsService from '../services/groups.service';
import alertActions from '../actions/alert.actions';

const getAllGroups = () => {
  const request = () => ({
    type: groupsConstants.GET_ALL_GROUPS_REQUEST,
  });

  const success = list => ({
    type: groupsConstants.GET_ALL_GROUPS_SUCCESS,
    list,
  });

  const failure = error => ({
    type: groupsConstants.GET_ALL_GROUPS_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const list = await groupsService.getAllGroups();

      dispatch(success(list));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const groupsActions = {
  getAllGroups,
};

export default groupsActions;
