import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActivityLoader from '../../ActivityLoader';
import groupsActions from '../../../actions/groups.actions';
import Heading from '../../Heading';
import List from './List';

class Groups extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    groups: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    groups: {
      list: [],
      fetching: false,
    },
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(groupsActions.getAll());
  }

  onRemove = (id) => {
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
        {!fetching && (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <List
              items={list}
              onRemove={this.onRemove}
            />
          </ReactCSSTransitionGroup>
        )}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { groups } = state;

  return {
    groups,
  };
};

export default injectIntl(connect(mapStateToProps)(Groups));
