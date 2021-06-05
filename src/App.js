import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalState';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Musicians from './components/musician/Musicians';
import MusicianProfile from './components/musician/MusicianProfile';
import CreateProfile from './components/musician/CreateProfile';
import TokenForm from './components/token-form/Main';
import Alert from './components/common/Alert';

const App = () => {
  return (
    <GlobalProvider>
      <Router className="App">
        <Navbar />
        <Alert msg="This contract only works on Kovan Test Network" type="alert-info" />
        <Route exact path="/" component={Home} />
        <Route exact path="/musicians" component={Musicians} />
        <Route exact path="/musicians/:id" component={MusicianProfile} />
        <Route exact path="/create-profile" component={CreateProfile} />
        <Route exact path="/token-form" component={TokenForm} />
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;