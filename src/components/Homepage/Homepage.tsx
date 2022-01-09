import LogOut from "../Auth/LogOut";
import ProfileButton from "../Button/ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import HomeTweetList from "../Tweet/HomeTweetList";
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