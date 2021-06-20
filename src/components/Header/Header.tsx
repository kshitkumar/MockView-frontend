import { Box, Flex, Heading, Spacer, Text} from "@chakra-ui/react";

function Header() {
    return (
        <Flex bgColor = '#0B294E' p="5" pl ='100px' pr='30px' color = 'white' w ='100%' position ='fixed'>
            <Box >
                <Heading fontSize = '30px'>MOCKVIEW</Heading>
            </Box>
            <Spacer />
            <Flex fontSize = '13px' w= '30%' justifyContent = 'space-evenly' pt = '10px'>
                <Text>
                    About Us
                </Text>
                <Text>
                    FAQs
                </Text>
                <Text>
                    Login
                </Text>
            </Flex>
        </Flex>           
    );
}

export default Header;