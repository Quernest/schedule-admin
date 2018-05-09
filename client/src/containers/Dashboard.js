import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { Switch, Route, withRouter } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Content from '../components/Dashboard/Content';
import Home from '../components/Dashboard/Home/index';
import Groups from '../components/Dashboard/Groups';
import AddGroup from '../components/Dashboard/Groups/AddGroup';
import EditGroup from '../components/Dashboard/Groups/EditGroup';
import Subjects from '../components/Dashboard/Subjects';
import AddSubject from '../components/Dashboard/Subjects/AddSubject';
import EditSubject from '../components/Dashboard/Subjects/EditSubject';
import Teachers from '../components/Dashboard/Teachers';
import EditTeacher from '../components/Dashboard/Teachers/EditTeacher';
import AddTeacher from '../components/Dashboard/Teachers/AddTeacher';
import Locations from '../components/Dashboard/Locations';
import EditLocation from '../components/Dashboard/Locations/EditLocation';
import AddLocation from '../components/Dashboard/Locations/AddLocation';
import Semesters from '../components/Dashboard/Semesters';
import AddSemester from '../components/Dashboard/Semesters/AddSemester';
import EditSemester from '../components/Dashboard/Semesters/EditSemester';

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
          <Route exact path="/dashboard/groups" component={Groups} />
          <Route path="/dashboard/groups/add" component={AddGroup} />
          <Route path="/dashboard/groups/edit/:id" component={EditGroup} />
          <Route exact path="/dashboard/subjects" component={Subjects} />
          <Route path="/dashboard/subjects/add" component={AddSubject} />
          <Route path="/dashboard/subjects/edit/:id" component={EditSubject} />
          <Route exact path="/dashboard/teachers" component={Teachers} />
          <Route path="/dashboard/teachers/add" component={AddTeacher} />
          <Route path="/dashboard/teachers/edit/:id" component={EditTeacher} />
          <Route exact path="/dashboard/locations" component={Locations} />
          <Route path="/dashboard/locations/add" component={AddLocation} />
          <Route path="/dashboard/locations/edit/:id" component={EditLocation} />
          <Route exact path="/dashboard/semesters" component={Semesters} />
          <Route path="/dashboard/semesters/add" component={AddSemester} />
          <Route path="/dashboard/semesters/edit/:id" component={EditSemester} />
        </Switch>
      </Content>
    </div>
  );
};

Dashboard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(withRouter(Dashboard));
