import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import Dashboard from './pages/Dashboard/Dashboard';
import NotesPage from './pages/NotesPage/NotesPage';
import NoteForm from './pages/NoteForm/NoteForm';
import PageFooter from './components/PageFooter/PageFooter';

function App() {
  return (
    <Router>
      <PageHeader />
      <Switch>
        {/* <Route path='/signup' component={SignupPage} /> */}
        {/* <Route path='/login' component={LoginPage} /> */}
        <Route path='/' exact component={Dashboard} />
        <Route path='/notes' component={NotesPage} />
        {/* <Route path='/notes/:noteId' component={NotesPage} /> */}
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
        {/* <Route path='/lists' component={ListsPage} /> */}
      </Switch>
      <PageFooter />
    </Router>
  );
}

export default App;
