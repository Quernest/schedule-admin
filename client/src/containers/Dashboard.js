import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { Switch, Route, withRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Content from '../components/Dashboard/Content';

// routes
import Home from '../components/Dashboard/Home';
import Groups from '../components/Dashboard/Groups';
import Lessons from '../components/Dashboard/Lessons';
import Teachers from '../components/Dashboard/Teachers';

const Dashboard = ({ intl }) => {
  const { formatMessage } = intl;

  return (
    <div className="dashboard">
      <Helmet>
        <title>Schedule - {formatMessage({ id: 'app.dashboard.title' })}</title>
      </Helmet>
      <Sidebar />
      <Content>
        <Switch>
          <Route exact path="/dashboard" component={Home} />
          <Route path="/dashboard/groups" component={Groups} />
          <Route path="/dashboard/lessons" component={Lessons} />
          <Route path="/dashboard/teachers" component={Teachers} />
        </Switch>
      </Content>
    </div>
  );
};

Dashboard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(withRouter(Dashboard));
