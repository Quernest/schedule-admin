import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActivityLoader from '../../ActivityLoader';
import Heading from '../../Heading';
import List from './List';
import teachersActions from '../../../actions/teachers.actions';

class Teachers extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    teachers: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    teachers: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(teachersActions.getAll());
  }

  onRemove = (id) => {
    const { dispatch } = this.props;

    dispatch(teachersActions.remove(id));
  }

  render() {
    const { teachers, intl } = this.props;
    const { formatMessage } = intl;
    const { list, fetching } = teachers;
    const headingParams = {
      title: formatMessage({ id: 'app.sidebar.menu.item.teachers' }),
      link: {
        path: '/dashboard/teachers/add',
        label: formatMessage({
          id: 'app.dashboard.teachers.buttons.addteacher',
        }),
      },
    };

    return (
      <div className="dashboard-teachers">
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
  const { teachers } = state;

  return {
    teachers,
  };
};

export default injectIntl(connect(mapStateToProps)(Teachers));
