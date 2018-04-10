import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import subjectsActions from '../../../actions/subjects.actions';
import ActivityLoader from '../../ActivityLoader';
import Heading from '../../Heading';
import List from './List';

class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(subjectsActions.getAll());
  }

  onRemove(id) {
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
          <List
            items={list}
            onRemove={this.onRemove}
          />
        )}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

Subjects.propTypes = {
  intl: intlShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  subjects: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
};

Subjects.defaultProps = {
  subjects: {},
};

const mapStateToProps = (state) => {
  const { subjects } = state;

  return {
    subjects,
  };
};

export default injectIntl(connect(mapStateToProps)(Subjects));
