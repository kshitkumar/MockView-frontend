import { useState } from "react";
import { Box, Input, VStack, Button, Text, Flex, Divider} from "@chakra-ui/react";

function Login() {

    const initialState = {
        emailAddress: "",
        password: "",
    };

    const [userCredentials, setUserCredentials] = useState(initialState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({ ...userCredentials, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userCredentials.emailAddress);
        console.log(userCredentials.password);
    };
    
    return (
        <Box w='30%' h='60%' borderWidth="1px" borderRadius="lg">
            <form onSubmit = {onSubmit}>
                <VStack pt = '30px' pl = '40px' pr='40px' spacing = '12px' w = '100%'>
                    <Input
                        fontSize = '15px'
                        variant = 'outline'
                        id="emailAddress"
                        name="emailAddress"
                        placeholder="Email Address"
                        onChange={onChange}
                    />
                    <Input 
                        fontSize = '15px'
                        variant = 'outline'
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}
                    />
                    <Flex justifyContent = 'flex-end' color = 'blue.900' w='100%'>
                        <Text fontSize='12px'>
                            Forgot Password
                        </Text>
                    </Flex>
                    <Button type = 'submit' colorScheme = 'blue' w='100%' fontSize='15px'>
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
                <Button colorScheme = 'blue' w='100%' fontSize='15px'>
                    Sign up
                </Button>  
            </Box> 
        </Box>
    );
}

export default Login;