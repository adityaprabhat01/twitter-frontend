import { Center, Divider, Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { homeFetchTweets, homeFetchTweetsSuccess, homeLikedTweets, homeRetweetedTweets } from "../../store/home/homeAction";
import { URL } from "../../url";
import Tweet from "./Tweet";

const HomeTweetList = () => {
  const x = useSelector((state: RootStateOrAny) => state)
  const history = useHistory();
  const dispatch = useDispatch();
  let fetched = false;
  const [loading, setLoading] = useState(true)
  function mapToObject(tweets, type) {
    let obj = {}
    if(type === 'liked') {
      tweets.map(tweet => {
        let temp = {
          tweet_id: tweet.tweet_id,
          liked: true,
        }
        obj[tweet.tweet_id] = temp;
      })
    }
    else if(type === 'retweeted') {
      tweets.map(tweet => {
        let temp = {
          tweet_id: tweet.tweet_id,
          retweeted: true,
        }
        obj[tweet.tweet_id] = temp;
      })
    }
    return obj;
  }

  useEffect(() => {
    dispatch(homeFetchTweets());
    Promise.all([
      fetch(URL + 'allLiked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: x.auth.user_id
        }),
        credentials: 'include'
      }),
      fetch(URL + 'allRetweeted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: x.auth.user_id
        }),
        credentials: 'include'
      })
    ])
    .then(responses =>
        Promise.all(responses.map(res => res.json()))
      ).then(res => {
        const obj_liked = mapToObject(res[0], 'liked')
        const obj_retweeted = mapToObject(res[1], 'retweeted')
        dispatch(homeLikedTweets(obj_liked));
        dispatch(homeRetweetedTweets(obj_retweeted));
    })
    .catch(err => {
      console.log(err)
    })

    fetch(URL + 'homeTweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: x.auth.user_id
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if(typeof res === 'object' && res.redirect === true) {
        history.push('/signin')
      }
      let data: any = []
      res.map(val => {
        const {
          following_id,
          tweet_id,
          tweet,
          posted_on,
          likes_count,
          retweet_count,
          comment_count,
          name,
          email,
          username,
          author_id
      } = val
      const y = {
          following_id,
          tweet_id,
          tweet,
          posted_on,
          likes_count,
          comment_count,
          retweet_count,
          name,
          email,
          username,
          author_id,
          comments: []
      }
        data.push(y)
      })
      dispatch(homeFetchTweetsSuccess(data))
      fetched = true;
      setLoading(false)
    })
  }, [fetched])
  return (
    <>
      <Center>
        <Stack border={'2px'} alignItems={"center"} spacing={4} maxWidth={'600px'}>
          <div>TweetList</div>
          {
            loading === true ? <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          /> :
            x.home.tweets.map(tweet => {
              return (
                <>
                  <Tweet tweet={tweet} />
                  <Divider />
                </>
              )
            })
          }
        </Stack>
      </Center>
    </>
  )
}

export default HomeTweetList;