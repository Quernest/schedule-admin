import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import ActivityLoader from '../../ActivityLoader';
import groupsActions from '../../../actions/groups.actions';
import Heading from '../../Heading';
import List from './List';

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(groupsActions.getAll());
  }

  onRemove(id) {
    const { dispatch } = this.props;

    dispatch(groupsActions.remove(id));
  }

  render() {
    const { groups: { list, fetching }, intl } = this.props;
    const { formatMessage } = intl;
    const headingParams = {
      title: formatMessage({ id: 'app.sidebar.menu.item.groups' }),
      link: {
        path: '/dashboard/groups/add',
        label: formatMessage({ id: 'app.dashboard.groups.button.addgroup' }),
      },
    };

    return (
      <div className="dashboard-groups">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        {!fetching && <List
          items={list}
          onRemove={this.onRemove}
        />}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

Groups.propTypes = {
  dispatch: PropTypes.func.isRequired,
  groups: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
  intl: intlShape.isRequired,
};

Groups.defaultProps = {
  groups: {
    list: [],
    fetching: false,
  },
};

const mapStateToProps = (state) => {
  const { groups } = state;

  return {
    groups,
  };
};

export default injectIntl(connect(mapStateToProps)(Groups));
