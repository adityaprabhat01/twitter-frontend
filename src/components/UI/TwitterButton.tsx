import { Button } from "@chakra-ui/react";

const TwitterButton = (props) => {
  const { method, text, style } = props;
  if(style) {

  }
  return (
    <>
      <Button
        borderRadius={"full"}
        onClick={method}
        backgroundColor={"#1d9af9"}
        _hover={{ bg: "#0084e8" }}
        textColor={"#ffffff"}
        mt={ style !== undefined ? style.mt : 0 }
        minWidth={'120px'}
      >
        {text}
      </Button>
    </>
  );
};

export default TwitterButton;
