import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Homepage from "./components/Homepage/Homepage";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Thread from "./components/Thread/Thread";
import store from "./store/store";
import FollowersList from "./components/Profile/FollowersList";
import FollowingList from "./components/Profile/FollowingList";
import LikedTweetsList from "./components/Profile/LikedTweetsList"
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <CSSReset />
        <Provider store={store}>
            <BrowserRouter>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/homepage" component={Homepage} />
              <Route exact path="/profile/:user_name" component={Profile} />
              <Route exact path="/thread/:user_id/:tweet_id" component={Thread} />
              <Route exact path="/followersList/:user_id" component={FollowersList} />
              <Route exact path="/followingList/:user_id" component={FollowingList} />
              <Route exact path="/likedTweetsList/:user_id" component={LikedTweetsList} />
            </BrowserRouter>
          </Provider>
      </ChakraProvider>
    </>
  );
};

export default App;
