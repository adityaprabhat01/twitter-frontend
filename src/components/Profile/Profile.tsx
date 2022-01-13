import { useEffect } from "react";
import TweetArea from "../Tweet/TweetArea";
import TweetList from "../Tweet/TweetList";
import { useSelector, useDispatch } from "react-redux";
import Follow from "./Follow";
import {
  fetchProfileSuccess,
  setFollowing,
} from "../../store/profile/profileAction";
import SearchBar from "../SearchBar/SearchBar";
import Followers from "../Button/Followers";
import Following from "../Button/Following";
import LikedTweetsButton from "../Button/LikedTweetButton";
import useAuthCookies from "../../hooks/useAuthCookies";
import { Box, Center, Grid, Heading, HStack, VStack } from "@chakra-ui/layout";
import LogOut from "../Auth/LogOut";
import PictureUploadButton from "../Button/PictureUploadButton";
import axios from "axios";
import useCheckParams from "../../hooks/useCheckParams";
import { URL } from "../../url";
import HomepageButton from "../Button/HomepageButton";

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});
const source = axios.CancelToken.source();

const Profile = () => {
  const handleSelector = (state) => {
    const user_id = state.auth.user_id;
    const profile_user_id = state.profile.user_id;
    const user_name = state.auth.user_name;
    const profile_user_name = state.profile.user_name;
    const profile_name = state.profile.name;
    return {
      user_id,
      profile_user_id,
      profile_user_name,
      user_name,
      profile_name,
    };
  };
  const store = useSelector(handleSelector);
  const dispatch = useDispatch();
  useAuthCookies();
  const user_name = useCheckParams("USER_NAME");
  useEffect(() => {
    let unmounted = false;
    api
      .post("search", {
        user_name,
      })
      .then((res) => {
        if (!unmounted) {
          const { user_id, username, name } = res.data;
          const data = {
            user_id,
            user_name: username,
            name,
          };
          dispatch(fetchProfileSuccess(data));
          api
            .post("checkFollow", {
              follower_id: store.user_id,
              following_id: user_id,
            })
            .then((res) => {
              if (res.data.length !== 0) {
                dispatch(setFollowing(true));
              } else {
                dispatch(setFollowing(false));
              }
            });
        }
      })
      .catch((err) => {});

    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [user_name, dispatch, store.user_id]);

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={4} mb={4}>
        <VStack>
          {store.user_name !== store.profile_user_name ? <Follow /> : null}
          <Followers user_id={store.profile_user_id} />
          <Following user_id={store.profile_user_id} />
          <LikedTweetsButton user_id={store.profile_user_id} />
          <HomepageButton />
          <PictureUploadButton />
          <LogOut />
        </VStack>
        <VStack>
          <Box ml={0}>
            <HStack>
              <VStack>
              <Heading>{store.profile_name}</Heading>
              <Heading as='h6' size='s' color={'#718096'}>@{store.profile_user_name}</Heading>
              </VStack>
            </HStack>
          </Box>
          {store.user_name === store.profile_user_name ? <TweetArea /> : null}
          <TweetList />
        </VStack>
        <VStack>
          <SearchBar />
        </VStack>
      </Grid>
      <Center></Center>
    </>
  );
};

export default Profile;
