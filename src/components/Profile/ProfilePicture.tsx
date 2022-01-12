import { Image } from "@chakra-ui/react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";

const ProfilePicture = (props) => {
  const { tweet } = props
  const storage = getStorage();

  function getId() {
    if(tweet.user_id === undefined) return tweet.author_id;
    return tweet.user_id
  }
  
  useEffect(() => {
    if(tweet) {
      const image = getId() + '.jpg';
      getDownloadURL(ref(storage, image))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        const img = document.getElementById(tweet.tweet_id);
        
        img!.setAttribute('src', url);
      })
      .catch((error) => {
        // Handle any errors
      });
    }
  }, [])
  
  return (
    <>
      <Image
        id={tweet.tweet_id}
        borderRadius='full'
        boxSize='50px'
        src=''
        alt='Dan Abramov'
      />
    </>
  )
}

export default ProfilePicture