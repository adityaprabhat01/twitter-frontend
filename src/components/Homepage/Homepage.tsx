import LogOut from "../Auth/LogOut";
import ProfileButton from "../Button/ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import HomeTweetList from "../Tweet/HomeTweetList";
import Cookies from 'js-cookie'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { setAuthFromCookies } from "../../store/auth/authAction";
import useAuthCookies from "../../hooks/useAuthCookies";

const Homepage = () => {
  useAuthCookies()
  return (
    <div>
      Homepage
      <LogOut />
      <SearchBar />
      <ProfileButton />
      <HomeTweetList />
    </div>
  )
};    

export default Homepage;