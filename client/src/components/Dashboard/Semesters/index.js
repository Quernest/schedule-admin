import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import semestersActions from '../../../actions/semesters.actions';
import ActivityLoader from '../../ActivityLoader';
import Heading from '../../Heading';

class Semesters extends Component {
  constructor(props) {
    super(props);

    this.state = {

};

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
          <ul className="list">
            {list &&
              list.map((semester) => {
                const {
                  id,
                  number,
                  start,
                  end,
                  firstWeekType
                } = semester;

                // TODO: parse and display start and end dates in list
                // USE moment.js

                return (
                  <li key={id} className="list__item">
                    <h3>№{number}</h3>
                    <div className="list__item-controls">
                      <button
                        className="icon icon-pencil list__item-controls-btn"
                        onClick={() => this.onEdit(id)}
                      />
                      <button
                        className="icon icon-dustbin list__item-controls-btn"
                        onClick={() => this.onRemove(id)}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
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
