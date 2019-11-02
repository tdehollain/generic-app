import React from 'react';
import { Button } from '@blueprintjs/core';
import './loadingPage.css';

const LoadingPage = props => (
  <div className="loadingPage bp3-dark">
    <Button large loading={true}></Button>
  </div>
);

export default LoadingPage;
