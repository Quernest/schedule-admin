import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Form from './Form';
import ActivityLoader from '../../ActivityLoader';
import locationsActions from '../../../actions/locations.actions';
import Heading from '../../Heading';

class EditLocation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    locations: PropTypes.shape({
      location: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    locationId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    locations: {
      list: [],
      fetching: false,
    },
  }

  state = {
    location: {
      id: undefined,
      name: '',
    },
    submitted: false,
  };

  componentDidMount() {
    const { dispatch, locationId } = this.props;

    dispatch(locationsActions.getById(locationId));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.locations !== this.props.locations) {
      const { location } = this.props.locations;

      this.setlocationToState(location);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { location } = this.state;

    this.setState({
      submitted: true,
    });

    const { id, name } = location;

    if (id && name) {
      dispatch(locationsActions.edit(location));
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

  setlocationToState = (location) => {
    this.setState({
      location,
    });
  };

  render() {
    const { locations, intl } = this.props;
    const { fetching } = locations;
    const { submitted, location } = this.state;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.locations.buttons.editlocation' }),
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
        {!fetching && (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <Form
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              location={location}
              submitted={submitted}
            />
          </ReactCSSTransitionGroup>
        )}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user, locations } = state;
  const { id } = props.match.params;

  return {
    locationId: id,
    locations,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(EditLocation));
