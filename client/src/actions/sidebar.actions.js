import sidebarConstants from '../constants/sidebar.constants';

const show = () => ({
  type: sidebarConstants.SHOW,
  isOpened: true,
});

const hide = () => ({
  type: sidebarConstants.HIDE,
  isOpened: false,
});

const sidebarActions = {
  show,
  hide,
};

export default sidebarActions;
