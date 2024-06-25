import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Home from '../Home/Home';

import Vendors from '../Vendors/Vendors';
import VendorForm from '../Vendors/VendorForm/VendorForm';
import EditVendor from '../Vendors/EditVendor/EditVendor';

import BeerStyle from '../Beers/BeerStyle/BeerStyle';
import BeersByStyle from '../Beers/BeersByStyle/BeersByStyle';
import BeerForm from '../Beers/BeerForm/BeerForm';
import BeerDetails from '../Beers/BeerDetails/BeerDetails';
import EditBeer from '../Beers/EditBeer/EditBeer';

import WineVarietals from '../Wines/WineVarietals/WineVarietals';
import WinesByVarietal from '../Wines/WinesByVarietal/WinesByVarietal';
import WineForm from '../Wines/WineForm/WineForm';
import EditWine from '../Wines/EditWine/EditWine';
import './App.css';
import VendorDetails from '../Vendors/VendorDetails/VendorDetails';
import WineDetails from '../Wines/WineDetails/WineDetails';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route
            exact
            path='/about'
          >
            <AboutPage />
          </Route>

          <ProtectedRoute
            exact
            path='/user'
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute exact path='/home'>
            <Home />
          </ProtectedRoute>

          <ProtectedRoute exact path='/beerstyle'>
            <BeerStyle />
          </ProtectedRoute>
          <ProtectedRoute exact path='/beersbystyle/:id' component={BeersByStyle}>
            <BeersByStyle />
          </ProtectedRoute>
          <ProtectedRoute exact path='/beerform'>
            <BeerForm />
          </ProtectedRoute>
          <ProtectedRoute exact path='/beerdetails/:id' component={BeerDetails}>
            <BeerDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path='/editbeer/:id' component={EditBeer}>
            <EditBeer />
          </ProtectedRoute>

          <ProtectedRoute exact path='/winevarietals'>
            <WineVarietals />
          </ProtectedRoute>
          <ProtectedRoute exact path='/winesbyvarietal/:id' component={WinesByVarietal}>
            <WinesByVarietal />
          </ProtectedRoute>
          <ProtectedRoute exact path='/wineform'>
            <WineForm />
          </ProtectedRoute>
          <ProtectedRoute exact path='/winesbyvarietal/winedetails/:id' component={WineDetails}>
            <WineDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path='/winesbyvarietal/editwine/:id' component={EditWine}>
            <EditWine />
          </ProtectedRoute>

          <ProtectedRoute exact path='/vendors'>
            <Vendors />
          </ProtectedRoute>
          <ProtectedRoute exact path='/vendordetails/:id' component={VendorDetails}>
            <VendorDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path='/vendorform'>
            <VendorForm />
          </ProtectedRoute>
          <ProtectedRoute exact path='/editvendor/:id' component={EditVendor}>
            <EditVendor />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/info'
          >
            <InfoPage />
          </ProtectedRoute>

          <Route exact path='/login'>
            {user.id ? (
              <Redirect to='/home' />
            ) : (
              <LoginPage />
            )}
          </Route>

          <Route exact path='/registration'>
            {user.id ? (
              <Redirect to='/home' />
            ) : (
              <RegisterPage />
            )}
          </Route>

          <Route exact path='/home'>
            {user.id ? (
              <Redirect to='/user' />
            ) : (
              <LandingPage />
            )}
          </Route>
          <Route>
            <h1>404</h1>
            <p>This route doesn't exist.</p>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
