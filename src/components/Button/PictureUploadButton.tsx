import { Button } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import TwitterButton from "../UI/TwitterButton";

const PictureUploadButton = () => {
  const [show, setShow] = useState(false)
  const inputRef = useRef<any>()
  const storage = getStorage();

  const handleSelector = (state) => {
    const user_id = state.auth.user_id
    return { user_id }
  }
  const store = useSelector(handleSelector)

  function handleOenFileSelector() {
    setShow(!show)
  }

  function handleUploadPhoto() {
    if(inputRef.current.files.length === 0) return;
    const file = inputRef.current.files[0]
    const storageRef = ref(storage, store.user_id + '.jpg');
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      setShow(false)
    });
  }
  
  return (
    <>
      <TwitterButton method={handleOenFileSelector} text={'Photo'} />
      {
        show === true ?
        <>
          <input ref={inputRef} className="ml-3" style={{ backgroundColor: "#e2e6e9", width: "15em" }} type="file" name="photo" id="upload-file" />
          <TwitterButton method={handleUploadPhoto} text={'Upload'} />
        </> :
        null
      }
    </>
  )
}

export default PictureUploadButton