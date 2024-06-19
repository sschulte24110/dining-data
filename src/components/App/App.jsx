import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
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

import './App.css';
import BeerStyle from '../Beers/BeerStyle/BeerStyle';
import Beers from '../Beers/Beers/Beers';
import BeerForm from '../Beers/BeerForm/BeerForm';
import EditBeer from '../Beers/EditBeer/EditBeer';
import WineVarietals from '../Wines/WineVarietals/WineVarietals';
import WinesByVarietal from '../Wines/WinesByVarietal/WinesByVarietal';
import WineForm from '../Wines/WineForm/WineForm';
import EditWine from '../Wines/EditWine/EditWine';

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
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from='/' to='/home' />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path='/about'
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
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
          <ProtectedRoute exact path='/beers/:id' component={Beers}>
            <Beers />
          </ProtectedRoute>
          <ProtectedRoute exact path='/beerform'>
            <BeerForm />
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
          <ProtectedRoute exact path='/editwine/:id' component={EditWine}>
            <EditWine />
          </ProtectedRoute>

          <ProtectedRoute exact path='/vendors'>
            <Vendors />
          </ProtectedRoute>
          <ProtectedRoute exact path='/vendorform'>
            <VendorForm />
          </ProtectedRoute>
          <ProtectedRoute exact path='/editvendor/:id' component={EditVendor}>
            <EditVendor />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/info'
          >
            <InfoPage />
          </ProtectedRoute>

          <Route exact path='/login'>
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to='/home' />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path='/registration'>
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to='/user' />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path='/home'>
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to='/user' />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
        <Nav />
      </div>
    </Router>
  );
}

export default App;
