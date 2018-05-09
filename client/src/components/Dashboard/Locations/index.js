import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActivityLoader from '../../ActivityLoader';
import Heading from '../../Heading';
import List from './List';
import locationsActions from '../../../actions/locations.actions';

class locations extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    locations: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    locations: {},
  }

  constructor(props) {
    super(props);

    this.state = {};
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(locationsActions.getAll());
  }

  onRemove(id) {
    const { dispatch } = this.props;

    dispatch(locationsActions.remove(id));
  }

  render() {
    const { locations, intl } = this.props;
    const { formatMessage } = intl;
    const { list, fetching } = locations;
    const headingParams = {
      title: formatMessage({ id: 'app.sidebar.menu.item.locations' }),
      link: {
        path: '/dashboard/locations/add',
        label: formatMessage({
          id: 'app.dashboard.locations.buttons.addlocation',
        }),
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
  const { locations } = state;

  return {
    locations,
  };
};

export default injectIntl(connect(mapStateToProps)(locations));
