import ProfileButton from "../Button/ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import HomeTweetList from "../Tweet/HomeTweetList";

const Homepage = () => {
  return (
    <div>
      Homepage
      <SearchBar />
      <ProfileButton />
      <HomeTweetList />
    </div>
  )
};    

export default Homepage;