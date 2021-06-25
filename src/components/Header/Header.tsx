import { Box, Flex, Heading, Link, Spacer, Text} from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import { User } from "../../models/User";

interface Props {
    isLoggedIn : boolean,
    user : User,
    onLogout() : void
}

function Header(props : Props) {

    const getComponentToRender = () => {
        if(!props.isLoggedIn)
            return (
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
            );
        else
            return(
                <Flex fontSize = '13px' w= '30%' justifyContent = 'space-evenly' pt = '10px'>
                    <Text>
                        User
                    </Text>
                    <Text>
                        {props.user.firstName + ' ' + props.user.lastName}
                    </Text>
                    <Text cursor='pointer' onClick = {props.onLogout}>
                        Logout
                    </Text>
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

export default Header;