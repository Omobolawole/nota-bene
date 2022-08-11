import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import SignupPage from './pages/SignupPage/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotesPage from './pages/NotesPage/NotesPage';
import NoteForm from './pages/NoteForm/NoteForm';
import ListsPage from './pages/ListsPage/ListsPage';
import ListForm from './pages/ListForm/ListForm';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import DetailForm from './pages/DetailForm/DetailForm';
import AccountPage from './pages/AccountPage/AccountPage';
import './App.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const App = () => {

    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isAxiosError, setIsAxiosError] = useState(false);
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
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;

        const loginInformation = {
            email: email,
            password: password
        }

        if (!email || !password) {
            setIsError(true);
            return;
        }

        axios
            .post(`${SERVER_URL}/users/login`, loginInformation) 
            .then((response) => {
                sessionStorage.setItem('authToken', response.data.token);

                setIsError(false);
                handleLogin();
            })
            .catch((error) => {
                console.log(`Error logging in: ${error}`);
                setIsAxiosError(true);
            });
        
        event.target.reset();
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
                    setUser(response.data);
                    setIsAuthenticating(false);
                    handleLogin();
                })
                .catch((error) => {
                    console.log(`Error Authenticating: ${error}`);
                });
        } else {
            axios
                .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
                .then((response) => {
                    setUser(response.data);
                    setIsAuthenticating(false);
                    handleLogin();
                })
                .catch(() => {
                    setIsAuthenticating(false);
                    setIsLoggedIn(false);
                });
        }
    }, [authToken])

    if (isAuthenticating) {
        return <p>Loading...</p>
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
                            onSubmit={handleSubmit}
                            onError={isError}
                            onAxiosError={isAxiosError}
                            onLogout={authToken && handleLogout} 
                            {...routerProps} 
                        />
                    }
                />
                <Route path='/signup' component={SignupPage} />
                <Route 
                    path='/notes' 
                    render={(routerProps) => 
                        <NotesPage user={user} {...routerProps} />
                    } 
                />
                <Route 
                    path='/note/:noteId/edit'
                    render={(routerProps) => 
                        <NoteForm user={user} status='edit' {...routerProps}/>
                    } 
                />
                <Route 
                    path='/note/add' 
                    render={(routerProps) => 
                        <NoteForm user={user} status='add' {...routerProps} />
                    } 
                />
                <Route 
                    path='/lists' 
                    render={(routerProps) => 
                        <ListsPage user={user} {...routerProps} />
                    }
                />
                <Route 
                    path='/list/:listId/edit'
                    render={(routerProps) => 
                        <ListForm user={user} status='edit' {...routerProps}/>
                    } 
                />
                <Route 
                    path='/list/add' 
                    render={(routerProps) => 
                        <ListForm user={user} status='add' {...routerProps} />
                    } 
                />
                <Route 
                    path='/details' 
                    render={(routerProps) => 
                        <DetailsPage user={user} {...routerProps} />
                    }
                />
                <Route 
                    path='/detail/:detailId/edit'
                    render={(routerProps) => 
                        <DetailForm user={user} status='edit' {...routerProps}/>
                    } 
                />
                <Route 
                    path='/detail/add'
                    render={(routerProps) => 
                        <DetailForm user={user} status='add' {...routerProps}/>
                    } 
                />
                <Route path='/account' component={AccountPage} />
            </Switch>
        </Router>
  );
};

export default App;
