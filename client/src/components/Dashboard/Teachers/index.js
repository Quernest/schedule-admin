import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import ActivityLoader from '../../ActivityLoader';
import Heading from '../../Heading';
import List from '../../List';
import teachersActions from '../../../actions/teachers.actions';

class Teachers extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onRemove = this.onRemove.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(teachersActions.getAll());
  }

  onRemove(id) {
    const { dispatch } = this.props;

    dispatch(teachersActions.remove(id));
  }

  onEdit(id) {
    const { dispatch } = this.props;

    console.log('[callback]: clicked on edit btn', id);
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
        <List
          items={list}
          fetching={fetching}
          onRemove={this.onRemove}
          onEdit={this.onEdit}
        />
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

Teachers.propTypes = {
  intl: intlShape.isRequired,
  teachers: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
  dispatch: PropTypes.func.isRequired,
};

Teachers.defaultProps = {
  teachers: {},
};

const mapStateToProps = (state) => {
  const { teachers } = state;

  return {
    teachers,
  };
};

export default injectIntl(connect(mapStateToProps)(Teachers));
