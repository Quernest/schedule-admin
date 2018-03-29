import sidebarConstants from '../constants/sidebar.constants';

const initialState = {
  isOpened: window.innerWidth > 768,
};

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case sidebarConstants.SHOW:
      return {
        isOpened: true,
      };
    case sidebarConstants.HIDE:
      return {
        isOpened: false,
      };
    default:
      return state;
  }
};

export default sidebar;
