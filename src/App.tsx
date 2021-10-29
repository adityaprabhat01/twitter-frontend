import { BrowserRouter, Route } from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/homepage" component={Homepage} />
        <Route exact path="/profile" component={Profile} />
      </BrowserRouter>
    </>
  );
}

export default App;
