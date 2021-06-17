import { useState } from "react";
import { Box, Input, VStack, Button, Text, Flex, Divider, Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure} from "@chakra-ui/react";
import SignUp from "../SignUp/SignUp";

function Login() {

    const initialState = {
        emailAddress: "",
        password: "",
    };

    const [userCredentials, setUserCredentials] = useState(initialState);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({ ...userCredentials, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userCredentials.emailAddress);
        console.log(userCredentials.password);
    };
    
    return (
        <Box borderWidth="1px" bgColor = 'white' w = '30%' h = '30%'>
            <form onSubmit = {onSubmit}>
                <VStack pt = '30px' pl = '40px' pr='40px' spacing = '12px' w = '100%'>
                    <Input
                        fontSize = '15px'
                        variant = 'outline'
                        id="emailAddress"
                        name="emailAddress"
                        placeholder="Email Address"
                        isRequired
                        onChange={onChange}
                    />
                    <Input 
                        fontSize = '15px'
                        variant = 'outline'
                        id="password"
                        name="password"
                        placeholder="Password"
                        type='password'
                        isRequired
                        onChange={onChange}
                    />
                    <Flex justifyContent = 'flex-end' w='100%'>
                        <Text fontSize='12px' color = '#0B294E' >
                            Forgot Password
                        </Text>
                    </Flex>
                    <Button type = 'submit' bgColor = '#0B294E' color = 'white' w='100%' fontSize='15px'>
                        Login
                    </Button>
                    <Divider orientation="horizontal" />
                </VStack>
            </form>
            <Box  pt = '30px' pl = '40px' pr='40px' pb= '30px' spacing = '12px' w = '100%'>
                <Flex justifyContent = 'center' pb='10px'>
                    <Text fontSize='13px'>
                        New to Mockview? Create an account
                    </Text>
                </Flex>
                <Button bgColor = '#0B294E' color = 'white' w='100%' fontSize='15px' onClick={onOpen}>
                    Sign up
                </Button>
                <Flex justifyContent = 'flex-end'>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <SignUp />
                     </ModalContent>
                </Modal>
                </Flex>
            </Box>  
        </Box>
    );
}

export default Login;