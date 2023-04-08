import React, { Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import LayoutRoutes from './pages/LayoutRoutes';
import "./assets/scss/app.scss";
//import { initFacebookSdk } from './services/init-facebook-sdk';

//initFacebookSdk().then(App)
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path={`/*`} element={<LayoutRoutes />} />
      </Routes>
    </Fragment>
  );
}

export default App;
