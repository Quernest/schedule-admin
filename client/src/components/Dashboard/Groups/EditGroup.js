import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Heading from '../../Heading';
import ActivityLoader from '../../ActivityLoader';
import scheduleActions from '../../../actions/schedule.actions';

/**
 * TODO:
 *
 * - translate heading and inner elements
 * - create schedule form
 */

class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // schedule schema
      id: undefined,
      groupId: undefined,
      lesson: undefined,
      location: '',
      subjectId: undefined,
      teacherId: undefined,
      weekDay: undefined,
      weekType: undefined,
    };
  }

  componentDidMount() {
    const { dispatch, groupId } = this.props;

    dispatch(scheduleActions.getById(groupId));
  }

  render() {
    const { intl, schedule, groups } = this.props;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.semesters.buttons.editgroup' }),
      link: {
        path: '/dashboard/groups',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-editgroup">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />

        <form className="form">
          <div className="row">
            <div className="col-xs-12">
              <input className="form__input" placeholder="group name" />
            </div>

            <div className="col-xs-12">
              <h2>Расписание</h2>
            </div>

            <div className="col-xs-12 col-sm-6">
              <h3>Нечетная неделя</h3>

              <div className="form__group">
                <fieldset>
                  <legend>Понедельник</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

              <div className="form__group">
                <fieldset>
                  <legend>Вторник</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

              <div className="form__group">
                <fieldset>
                  <legend>Среда</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

              <div className="form__group">
                <fieldset>
                  <legend>Четверг</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

              <div className="form__group">
                <fieldset>
                  <legend>Пятница</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

            </div>

            <div className="col-xs-12 col-sm-6">
              <h3>Четная неделя</h3>

              <div className="form__group">
                <fieldset>
                  <legend>Понедельник</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

              <div className="form__group">
                <fieldset>
                  <legend>Вторник</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

              <div className="form__group">
                <fieldset>
                  <legend>Среда</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

              <div className="form__group">
                <fieldset>
                  <legend>Четверг</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

              <div className="form__group">
                <fieldset>
                  <legend>Пятница</legend>
                  <input className="form__input" />
                  <input className="form__input" />
                </fieldset>
              </div>

            </div>
          </div>
        </form>

        <ActivityLoader
          fetching={schedule.fetching || groups.fetching}
        />
      </div>
    );
  }
}

EditGroup.propTypes = {
  intl: intlShape.isRequired,
  groupId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  const { groups, schedule } = state;
  const { id } = props.match.params;

  return {
    groups,
    schedule,
    groupId: id,
  };
};

export default injectIntl(connect(mapStateToProps)(EditGroup));
