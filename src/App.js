import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from './actions'; // Assume you have actions defined for Redux
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial data when the app loads
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
