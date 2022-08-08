import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotesPage from './pages/NotesPage/NotesPage';
import NoteForm from './pages/NoteForm/NoteForm';
import ListsPage from './pages/ListsPage/ListsPage';
import ListForm from './pages/ListForm/ListForm';
import AccountPage from './pages/AccountPage/AccountPage';
import './App.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const App = () => {

    // const [isGoogle, setIsGoogle] = useState(false); 
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    const authToken = sessionStorage.getItem('authToken');

    const handleLogin = () => {
        console.log('rrr')
        setIsLoggedIn(true);
        <Redirect to="/"/>
    };

    const handleLogout = () => {
        setIsAuthenticating(true);
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('authToken');
    };

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        if(authToken) {
            axios
                .get(`${SERVER_URL}/users/current`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                .then((response) => {
                    console.log(response)
                    
                    setUser(response.data);
                    setIsAuthenticating(false);
                    handleLogin();
                    
                    console.log(isLoggedIn)
                })
                .catch((error) => {
                    console.log(`Error Authenticating: ${error}`);
                });
        };
    }, [])

    useEffect(() => {
        axios
            .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
            .then((response) => {
                setUser(response.data);
                setIsAuthenticating(false);
                handleLogin();
            })
            .catch((error) => {
                console.log(`Error Authenticating: ${error}`);
                setIsAuthenticating(false);
                setIsLoggedIn(false);
            });
    }, []);

    if (isAuthenticating) {
        return <p>Please wait ...</p>
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
                            onLogout={authToken && handleLogout} 
                            onOpen={handleOpenModal}
                            {...routerProps} 
                        />
                    }
                />
                <Route exact path='/signup' component={SignupPage} />
                <Route exact path='/login' component={LoginPage} />
                <Route 
                    path='/notes' 
                    exact 
                    render={(routerProps) => 
                        <NotesPage user={user} {...routerProps} />
                    } 
                />
                <Route 
                    path='/note/:noteId/edit'
                    exact
                    render={(routerProps) => 
                        <NoteForm user={user} status='edit' {...routerProps}/>
                    } 
                />
                <Route 
                    path='/note/add' 
                    exact
                    render={(routerProps) => 
                        <NoteForm user={user} status='add' {...routerProps} />
                    } 
                />
                <Route 
                    path='/lists' 
                    exact 
                    render={(routerProps) => 
                        <ListsPage user={user} {...routerProps} />
                    }
                />
                <Route 
                    path='/list/:listId/edit'
                    exact
                    render={(routerProps) => 
                        <ListForm user={user} status='edit' {...routerProps}/>
                    } 
                />
                <Route 
                    path='/list/add' 
                    exact
                    render={(routerProps) => 
                        <ListForm user={user} status='add' {...routerProps} />
                    } 
                />
                <Route 
                    path='/account' 
                    exact 
                    render={(routerProps) => 
                        <AccountPage onClose={handleCloseModal} isOpen={modalIsOpen} {...routerProps} />
                    } 
                />
            </Switch>
        </Router>
  );
};

export default App;
