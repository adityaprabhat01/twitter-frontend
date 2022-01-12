import { useParams } from "react-router";

const useCheckParams = (type: string) => {
  const params = useParams();
  
  type Params_user_id = { user_id: string };
  type NoParams_user_id = {};
  function isParamsUserId(params: Params_user_id | NoParams_user_id): params is Params_user_id {
    return (params as Params_user_id).user_id !== undefined;
  }

  type Params_user_name = { user_name: string };
  type NoParams_user_name = {};
  function isParamsUserName(params: Params_user_name | NoParams_user_name): params is Params_user_name {
    return (params as Params_user_name).user_name !== undefined;
  }

  type Params_user_id_tweetid = { user_id: string, tweet_id: string };
  type NoParams_user_id_tweetid = {};
  function isParamsUseridTweetid(params: Params_user_id_tweetid | NoParams_user_id_tweetid): params is Params_user_id_tweetid {
    return (params as Params_user_id_tweetid).user_id !== undefined && (params as Params_user_id_tweetid).tweet_id !== undefined;
  }

  function getUser_id() {
    if (isParamsUserId(params)) {
      return params.user_id;
    }
    return "";
  }

  function getUser_name() {
    if (isParamsUserName(params)) {
      return params.user_name;
    }
    return "";
  }

  function getUserNameUserId() {
    if (isParamsUseridTweetid(params)) {
      return params.tweet_id;
    }
    return "";
  }

  switch(type) {
    case 'USER_ID':
      return getUser_id()
    case 'USER_NAME':
      return getUser_name()
    case 'USER_NAME_TWEET_ID':
      return getUserNameUserId()
  }
  

  
}
export default useCheckParams;