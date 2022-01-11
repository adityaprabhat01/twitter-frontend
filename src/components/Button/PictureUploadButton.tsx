import { Button } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useSelector, RootStateOrAny } from "react-redux";

const PictureUploadButton = () => {
  const [show, setShow] = useState(false)
  const inputRef = useRef<any>()
  const storage = getStorage();
  const x = useSelector((state: RootStateOrAny) => state)

  function handleOenFileSelector() {
    setShow(!show)
  }

  function handleUploadPhoto() {
    if(inputRef.current.files.length === 0) return;
    const file = inputRef.current.files[0]
    const storageRef = ref(storage, x.auth.user_id + '.jpg');
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      setShow(false)
    });
  }
  
  return (
    <>
      <Button onClick={handleOenFileSelector}>
        Choose Photo
      </Button>
      {
        show === true ?
        <>
          <input ref={inputRef} className="ml-3" style={{ backgroundColor: "#e2e6e9", width: "15em" }} type="file" name="photo" id="upload-file" />
          <Button onClick={handleUploadPhoto}>
            Upload
          </Button>
        </> :
        null
      }
    </>
  )
}

export default PictureUploadButton