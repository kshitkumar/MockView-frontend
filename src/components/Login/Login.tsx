import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Box, Input, VStack, Button, Text, Flex, Divider, Modal, ModalOverlay, ModalContent, ModalCloseButton, useDisclosure, useToast} from "@chakra-ui/react";
import SignUp from "../SignUp/SignUp";
import { UserCredentials } from "../../models/UserCredentials";
import { login } from "../../services/LoginService";
import { User } from "../../models/User";

interface Props {
    onLogin(user : User) : void
}

function Login(props : Props) {

    const initialState = {
        emailId: "",
        password: "",
    };

    const [userCredentials, setUserCredentials] = useState<UserCredentials>(initialState);

    let history = useHistory();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({ ...userCredentials, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await login(userCredentials);
            const user : User = response.data;
            if(response.status === 200) {
                console.log('User logged in');
                props.onLogin(user);
                window.sessionStorage.setItem("user",JSON.stringify(user));
                history.push({pathname : user.profileComplete?"/select-profile": "/user-profile", state : {user}});
            }
            else {
                toast({
                    title: "Invalid Credentials",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
            }
        }
        catch(error) {
            toast({
                title: "Invalid Credentials",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
        }
    };
    
    return (
        <Box borderWidth="1px" bgColor = 'white' w = '30%' h = '30%'>
            <form onSubmit = {onSubmit}>
                <VStack pt = '30px' pl = '40px' pr='40px' spacing = '12px' w = '100%'>
                    <Input
                        fontSize = '15px'
                        variant = 'outline'
                        id="emailId"
                        name="emailId"
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
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <SignUp onSignUp = {onClose}/>
                     </ModalContent>
                </Modal>
                </Flex>
            </Box>  
        </Box>
    );
}

export default Login;