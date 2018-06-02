import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import semestersActions from '../../../actions/semesters.actions';
import ActivityLoader from '../../ActivityLoader';
import Heading from '../../Heading';
import List from './List';

class Semesters extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    semesters: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
  }

  static defaultProps = {
    semesters: {
      list: [],
      fetching: false,
    },
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(semestersActions.getAll());
  }

  onRemove = (id) => {
    const { dispatch } = this.props;

    dispatch(semestersActions.remove(id));
  }

  render() {
    const { intl, semesters } = this.props;
    const { formatMessage } = intl;
    const { fetching, list } = semesters;

    const headingParams = {
      title: formatMessage({
        id: 'app.sidebar.menu.item.semesters',
      }),
      link: {
        path: '/dashboard/semesters/add',
        label: formatMessage({
          id: 'app.dashboard.semesters.buttons.addsemester',
        }),
      },
    };

    return (
      <div className="dashboard-semesters">
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
              semesters={list}
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
  const { semesters } = state;

  return {
    semesters,
  };
};

export default injectIntl(connect(mapStateToProps)(Semesters));
