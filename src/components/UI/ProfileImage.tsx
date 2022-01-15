import { Image } from "@chakra-ui/react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";

const ProfileImage = (props) => {
  const { user_id, author_id } = props;
  const storage = getStorage();
  function getId() {
    if (user_id === undefined) return author_id;
    return user_id;
  }

  useEffect(() => {
    const image = getId() + ".jpg";
    getDownloadURL(ref(storage, image))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        const img = document.getElementById(user_id);

        img!.setAttribute("src", url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }, []);

  return (
    <>
      <Image
        id={user_id}
        borderRadius="full"
        boxSize="100px"
        src=""
        alt="profile"
      />
    </>
  );
};

export default ProfileImage;
