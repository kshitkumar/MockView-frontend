import { Box, Flex } from "@chakra-ui/react";
import Login from '../Login/Login';
import image from '../../assets/images/home.jpg';
import { User } from "../../models/User";

interface Props {
    onLogin(user : User) : void
}

function Home(props : Props) {
    return (
        <Box bgImage = {image} bgRepeat = 'no-repeat' w='100%' h='100vh' bgSize = 'cover'>
        <Flex justifyContent = 'flex-end' pt = '150px' pr = '70px'>
            <Login onLogin = {props.onLogin}/>
        </Flex>
        </Box>
    );
}

export default Home;