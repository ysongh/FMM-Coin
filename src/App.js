import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Musicians from './components/musician/Musicians';
import MusicianProfile from './components/musician/MusicianProfile';
import CreateProfile from './components/musician/CreateProfile';
import TokenForm from './components/token-form/Main';

const App = () => {
  return (
    <Router className="App">
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/musicians" component={Musicians} />
      <Route exact path="/musicians/:id" component={MusicianProfile} />
      <Route exact path="/create-profile" component={CreateProfile} />
      <Route exact path="/token-form" component={TokenForm} />
      <Footer />
    </Router>
  );
}

export default App;