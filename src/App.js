import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotesPage from './pages/NotesPage/NotesPage';
import NoteForm from './pages/NoteForm/NoteForm';
import ListsPage from './pages/ListsPage/ListsPage';
import AccountPage from './pages/AccountPage/AccountPage';
import './App.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const App = () => {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const authToken = sessionStorage.getItem('authToken');

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsAuthenticating(true);
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('authToken');
    }

    useEffect(() => {
        if(authToken) {
            axios
                .get(`${SERVER_URL}/users/current`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                .then((response) => {
                    setIsAuthenticating(false);
                    setIsLoggedIn(true);
                    setUser(response.data);
                })
                .catch((error) => {
                    console.log(`Error Authenticating: ${error}`);
                });
        };
    })

    useEffect(() => {
        axios
            .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
            .then((response) => {
                setIsAuthenticating(false);
                setIsLoggedIn(true);
                setUser(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setIsAuthenticating(false);
                    setIsLoggedIn(false);
                } else {
                    console.log(`Error Authenticating: ${error}`);
                }
            });
    }, []);

    if (isAuthenticating && isLoggedIn ) {
        return <p>Getting Started...</p>
    }

    return (
        <Router>
            <Switch>
                <Route 
                    path='/' 
                    exact 
                    render={(routerProps) => 
                        <Dashboard 
                            user={user} 
                            isLoggedIn={isLoggedIn}
                            authToken={authToken}
                            onLogin={handleLogin}
                            onLogout={authToken && handleLogout} 
                            {...routerProps} 
                        />
                    }
                />
                <Route path='/signup' component={SignupPage} />
                <Route path='/login' component={LoginPage} />
                <Route 
                    path='/notes' 
                    render={(routerProps) => 
                        <NotesPage {...routerProps} />
                    } 
                />
                <Route 
                    path='/note/:noteId/edit'
                    exact
                    render={(routerProps) => 
                        <NoteForm status='edit' {...routerProps}/>
                    } 
                />
                <Route 
                    path='/note/add' 
                    exact
                    render={(routerProps) => 
                        <NoteForm status='add' {...routerProps} />
                    } 
                  />
                <Route 
                    path='/lists' 
                    render={(routerProps) => 
                        <ListsPage {...routerProps} />
                    }
                />
                <Route path='/account' component={AccountPage} />
            </Switch>
        </Router>
  );
};

export default App;
