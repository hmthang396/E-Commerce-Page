import React, { Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import LayoutRoutes from './pages/LayoutRoutes';
import "./assets/scss/app.scss";
import OAuthGoogle from './pages/page/account/OAuthGoogle';
//import { initFacebookSdk } from './services/init-facebook-sdk';
import OAuthFacebook from './pages/page/account/OAuthFacebook';

//initFacebookSdk().then(App)
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path={`/oauth/google`} element={<OAuthGoogle />} />
        <Route path={`/oauth/facebook`} element={<OAuthFacebook />} />
        <Route path={`/*`} element={<LayoutRoutes />} />
      </Routes>
    </Fragment>
  );
}

export default App;
