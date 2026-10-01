import { AspectRatio, Button, CloseButton, Dialog, Portal, Image, Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const ProfileDialog = () => {
  const { user } = ChatState();

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button variant="ghost" w="100%">
          My Profile
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body pt="4">
              <Dialog.Title>{user?.user?.name}</Dialog.Title>
              <br />
              <Image rounded="md" src={user?.user?.pic} alt={user?.user?.name} />
              <br />
              <Text>Email: {user?.user?.email}</Text>
              {/* <Dialog.Description mb="4">This is a dialog with some content and a video.</Dialog.Description> */}
              {/* <AspectRatio ratio={4 / 3} rounded="lg" overflow="hidden">
                <iframe title="naruto" src="https://www.youtube.com/embed/QhBnZ6NPOY0" allowFullScreen />
              </AspectRatio> */}
            </Dialog.Body>
            <Dialog.CloseTrigger top="0" insetEnd="-12" asChild>
              <CloseButton bg="bg" size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ProfileDialog;
