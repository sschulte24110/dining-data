import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <img
        className='home-logo-about'
        src='../images/dining-data-vert.png'
        alt='Dining Data logo'
      />
      <div>
        <p>This application is made for use in restaurants and bar with large beer and wine offerings or lists to manage. The application has a way to list beer and wine by specific category that can be decided by the operator.</p>
        <p>The beer and wines can be clicked on and edited right on the application. This allows you to also remove the beer or wine from current inventory if you aren't carrying it or there is a supply issue.</p>
        <p>There is a form that allows the user to add a new beer, wine or vendor right on the application.</p>
        <p>It also provides a vendor tracking system so that each item will have that tracked as well when it is added to the application.</p>
      </div>
    </div>
  );
}

export default AboutPage;
