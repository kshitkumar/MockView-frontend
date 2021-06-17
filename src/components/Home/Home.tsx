import { Box, Flex } from "@chakra-ui/react";
import Login from '../Login/Login';
import image from '../../assets/images/home.jpg';

function Home() {
    return (
        <Box bgImage = {image} bgRepeat = 'no-repeat' w='100%' h='100vh' bgSize = 'cover'>
        <Flex justifyContent = 'flex-end' pt = '150px' pr = '70px'>
            <Login />
        </Flex>
        </Box>
    );
}

export default Home;