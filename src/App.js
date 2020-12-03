import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import { loadWeb3, loadBlockchainData } from './blockchain';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Musicians from './components/musician/Musicians';
import MusicianProfile from './components/musician/MusicianProfile';
import CreateProfile from './components/musician/CreateProfile';
import BuyTokenForm from './components/BuyTokenForm';

const App = () => {
  useEffect(() => {
    async function load(){
      await loadWeb3();
    }

    async function getBlockchain(){
      await loadBlockchainData();
    }
    
    load();
    getBlockchain();
  }, []);

  return (
    <Router className="App">
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/musicians" component={Musicians} />
      <Route exact path="/musicians/:id" component={MusicianProfile} />
      <Route exact path="/create-profile" component={CreateProfile} />
      <Route exact path="/buytoken" component={BuyTokenForm} />
      <Footer />
    </Router>
  );
}

export default App;