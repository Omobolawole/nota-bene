import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotesPage from './pages/NotesPage/NotesPage';
import NoteForm from './pages/NoteForm/NoteForm';
import ListsPage from './pages/ListsPage/ListsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/notes' component={NotesPage} />
        <Route 
            path='/note/:noteId/edit' 
            exact
            render={(routerProps) => <NoteForm status='edit' {...routerProps} />} 
        />
        <Route 
            path='/note/add' 
            exact
            render={(routerProps) => <NoteForm status='add' {...routerProps} />} 
          />
        <Route path='/lists' component={ListsPage} />
      </Switch>
    </Router>
  );
}

export default App;
