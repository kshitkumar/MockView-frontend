import { Box, Flex, Heading, Spacer, Text,Button,useToast} from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { Route , useHistory} from "react-router-dom";




function Header(props : any) {

    const history = useHistory();
const [loggedInUser,setLoggedInUser] = useState(JSON.parse(window.sessionStorage.getItem("user")!));
 const toast = useToast();
    const getComponentToRender = () => {
        if(!props.isLoggedIn)
            return (
                <Flex fontSize = '13px' w= '30%' justifyContent = 'space-evenly' pt = '10px'>
                    <Text cursor='pointer' onClick={()=>{ toast({
                                description: "Feature is still under development",
                                status: "info",
                                duration: 3000,
                                isClosable: true,
                              })}}>
                        About Us
                    </Text>
                    <Text cursor='pointer' onClick={()=>{ toast({
                                description: "Feature is still under development",
                                status: "info",
                                duration: 3000,
                                isClosable: true,
                              })}}>
                        FAQs
                    </Text>
                </Flex>
            );
        else 
            return(
                <Flex fontSize = '13px' w= '30%' justifyContent = 'space-evenly' pt = '10px'>
                    <Button pb={1.95} size='xs' bg='#0b294e' color="white" disabled={props.role==="Switch User"}
                     onClick={()=>{ props.updateRole("Switch User"); history.push('/select-profile');}}>
                        {props.role}
                    </Button>
                    <Text pt={0.4} fontWeight='semibold'>
                      { props.user.firstName + ' ' + props.user.lastName}
                    </Text>
                    <Button pb={1.9} size='xs' bg='#0b294e' color="white"  cursor='pointer' onClick = {props.onLogout}>
                        Logout
                    </Button>
                </Flex>
            );
    }

    return (
        <Flex zIndex = {2} bgColor = '#0B294E' p="5" pl ='100px' pr='30px' color = 'white' w ='100%' position ='fixed'>
            <Box >
                <Heading fontSize = '30px'>MOCKVIEW</Heading>
            </Box>
            <Spacer />
            {getComponentToRender()}
        </Flex>           
    );
}

export default Header