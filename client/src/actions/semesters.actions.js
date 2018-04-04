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

// const add = (name) => {
//   const request = () => ({
//     type: semestersConstants.ADD_REQUEST,
//     name,
//   });

//   const success = semester => ({
//     type: semestersConstants.ADD_SUCCESS,
//     semester,
//   });

//   const failure = error => ({
//     type: semestersConstants.ADD_FAILURE,
//     error,
//   });

//   return async (dispatch) => {
//     dispatch(request(name));

//     try {
//       // FIXME: make sure that msg here
//       const semester = await semestersService.add(name);
//       dispatch(success(semester));
//       // redirect to semesters page
//       history.push('/dashboard/semesters');
//     } catch (error) {
//       dispatch(failure(error));
//       dispatch(alertActions.error(error));
//     }
//   };
// };

// const remove = (id) => {
//   const request = () => ({
//     type: semestersConstants.REMOVE_REQUEST,
//     id,
//   });

//   const success = msg => ({
//     type: semestersConstants.REMOVE_SUCCESS,
//     msg,
//   });

//   const failure = error => ({
//     type: semestersConstants.REMOVE_FAILURE,
//     error,
//   });

//   return async (dispatch) => {
//     dispatch(request(id));

//     try {
//       // FIXME: make sure that msg here
//       const msg = await semestersService.remove(id);
//       dispatch(success(msg));
//     } catch (error) {
//       dispatch(failure(error));
//       dispatch(alertActions.error(error));
//     }
//   };
// };

const semestersActions = {
  getAll,
  // add,
  // remove,
};

export default semestersActions;
