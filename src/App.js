import React from 'react';
import FeaturedProjects from './components/FeaturedProject';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <ToastContainer/>
            <FeaturedProjects/>
        </div>
    );
};

export default App;
