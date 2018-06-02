import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import Form from './Form';
import ActivityLoader from '../../ActivityLoader';
import locationsActions from '../../../actions/locations.actions';
import Heading from '../../Heading';

class AddLocation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    locations: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
  }

  static defaultProps = {
    locations: {
      list: [],
      fetching: false,
    },
  }

  state = {
    location: {
      name: '',
    },
    submitted: false,
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { location } = this.state;

    this.setState({
      submitted: true,
    });

    const { name } = location;

    if (name) {
      dispatch(locationsActions.add(location));
    }
  }

  onChange = (e) => {
    const { value, name } = e.target;
    const { location } = this.state;

    this.setState({
      location: update(location, {
        $merge: {
          [name]: value,
        },
      }),
    });
  }

  render() {
    const { locations, intl } = this.props;
    const { fetching } = locations;
    const { submitted, location } = this.state;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.locations.buttons.addlocation' }),
      link: {
        path: '/dashboard/locations',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-locations">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        {!fetching && <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          location={location}
          submitted={submitted}
        />}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, locations } = state;

  return {
    locations,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(AddLocation));
