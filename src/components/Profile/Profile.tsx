import { useEffect } from 'react'
import TweetArea from '../Tweet/TweetArea';
import TweetList from '../Tweet/TweetList';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import Follow from './Follow';
import { URL } from '../../url';
import { fetchProfile, fetchProfileFailure, fetchProfileSuccess, setFollowing } from '../../store/profile/profileAction';
import SearchBar from '../SearchBar/SearchBar';
import Followers from '../Button/Followers';
import Following from '../Button/Following';
import LikedTweetsButton from '../Button/LikedTweetButton';
import useAuthCookies from '../../hooks/useAuthCookies';
import { Center, Grid, VStack } from '@chakra-ui/layout';
import LogOut from '../Auth/LogOut';

const Profile = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const params = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  useAuthCookies()
  const controller = new AbortController()
  useEffect(() => {
    type Params = { user_name: string };
    type NoParams = {};
    function isParams(params: Params | NoParams): params is Params {
      return (params as Params).user_name !== undefined;
    }
    if(isParams(params))  {
      dispatch(fetchProfile())
      fetch(URL + 'search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: params.user_name
        }),
        credentials: 'include',
        signal: controller.signal
      })
      .then(res => res.json())
      .then(res => {
        const { user_id, username, name } = res;
        const data = {
          user_id,
          user_name: username,
          name
        }
        dispatch(fetchProfileSuccess(data))
        

        fetch(URL + 'checkFollow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            follower_id: x.auth.user_id,
            following_id: user_id
          }),
          credentials: 'include',
          signal: controller.signal
        })
        .then(res => res.json())
        .then(res => {
          if(res.length !== 0) {
            dispatch(setFollowing(true))
          } else {
            dispatch(setFollowing(false))
          }
        })
      })
      .catch(err => dispatch(fetchProfileFailure()))
      
    }

    return () => {
      controller.abort()
    }
  }, [history.location.pathname])


  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={4} mb={4}>
        <VStack>
          {
            x.auth.user_name !== x.profile.user_name ? <Follow />  : null
          }
          <Followers user_id={x.profile.user_id} />
          <Following user_id={x.profile.user_id} />
          <LikedTweetsButton user_id={x.profile.user_id} />
          <LogOut />
        </VStack>
        <VStack>
          {
            x.auth.user_name === x.profile.user_name ? <TweetArea />  : null
          }
          <TweetList />
        </VStack>
        <VStack>
          <SearchBar />
        </VStack>
        
      </Grid>
      <Center>
        <VStack>
          Profile

          { x.profile.name }
          { x.profile.user_name }
          

          
        </VStack>
        
      </Center>
      
    </>
  )
}

export default Profile;