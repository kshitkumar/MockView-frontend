import { Flex } from "@chakra-ui/react";
import Login from '../Login/Login';

function Home() {
    return (
        <Flex justifyContent = 'flex-end' pt = '70px' pr = '70px'>
            <Login />
        </Flex>
    );
}

export default Home;