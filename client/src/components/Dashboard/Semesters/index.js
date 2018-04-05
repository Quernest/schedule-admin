import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import semestersActions from '../../../actions/semesters.actions';
import ActivityLoader from '../../ActivityLoader';
import Heading from '../../Heading';
import List from './List';

class Semesters extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onRemove = this.onRemove.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(semestersActions.getAll());
  }

  onRemove(id) {
    const { dispatch } = this.props;

    dispatch(semestersActions.remove(id));
  }

  onEdit(id) {
    const { dispatch } = this.props;

    console.log('[callback]: clicked on edit btn', id);
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
          <List
            semesters={list}
            onEdit={this.onEdit}
            onRemove={this.onRemove}
          />
        )}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

Semesters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  semesters: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
};

Semesters.defaultProps = {
  semesters: {
    list: [],
    fetching: false,
  },
};

const mapStateToProps = (state) => {
  const { semesters } = state;

  return {
    semesters,
  };
};

export default injectIntl(connect(mapStateToProps)(Semesters));
