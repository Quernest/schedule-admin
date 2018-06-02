import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import subjectsActions from '../../../actions/subjects.actions';
import ActivityLoader from '../../ActivityLoader';
import Heading from '../../Heading';
import List from './List';

class Subjects extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    dispatch: PropTypes.func.isRequired,
    subjects: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
  }

  static defaultProps = {
    subjects: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(subjectsActions.getAll());
  }

  onRemove = (id) => {
    const { dispatch } = this.props;

    dispatch(subjectsActions.remove(id));
  }

  render() {
    const { intl, subjects } = this.props;
    const { formatMessage } = intl;
    const { list, fetching } = subjects;

    const headingParams = {
      title: formatMessage({ id: 'app.sidebar.menu.item.subjects' }),
      link: {
        path: '/dashboard/subjects/add',
        label: formatMessage({ id: 'app.dashboard.subjects.button.addsubject' }),
      },
    };

    return (
      <div className="dashboard-subjects">
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
  const { subjects } = state;

  return {
    subjects,
  };
};

export default injectIntl(connect(mapStateToProps)(Subjects));
