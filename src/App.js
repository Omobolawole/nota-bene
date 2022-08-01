import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import PageFooter from './components/PageFooter/PageFooter';

function App() {
  return (
    <Router>
      <PageHeader />
      <Switch>
        {/* <Route path='/' exact component={Dashboard} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/notes' component={NotesPage} />
        <Route path='/lists' component={ListsPage} /> */}
      </Switch>
      <PageFooter />
    </Router>
  );
}

export default App;
