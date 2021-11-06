import { useParams } from "react-router";

const UserTweetList = () => {
  const params = useParams();
  type NoParams = {};
  type Params = { user_name: string };

  

  return (
    <div>
      UserTweetList
    </div>
  )
}

export default UserTweetList;