import React from 'react';
import { injectIntl } from 'react-intl';

import Heading from '../Heading';

const Home = () => (
  <div className="dashboard-home">
    <Heading title="Title" subtitle="Subtitle ... " />
  </div>
);

export default injectIntl(Home);
