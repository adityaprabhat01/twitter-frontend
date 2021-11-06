import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Homepage from "./components/Homepage/Homepage";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import store from "./store/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/profile/:user_name" component={Profile} />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
