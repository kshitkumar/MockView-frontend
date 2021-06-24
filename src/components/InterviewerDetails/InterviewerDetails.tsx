import { Box, Flex, Heading, Link, Input, Text, VStack, HStack, Select, Button, Image} from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import { useState } from "react";
import image from '../../assets/images/user-profile.jpg';
import { Interviewer } from "../../models/Interviewer";
import { Timeslot } from "../../models/Timeslot";

interface Props {
    interviewer : Interviewer
    onSelect(interviewer : Interviewer, timeslot : Timeslot) : void
}

export function InterviewerDetails(props : Props) {

    const initialTimeslot = {
        "startTime" : "",
        "endTime" : ""
    }

    const interviewer = props.interviewer;

    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>(initialTimeslot);

    const handleSelectBooking = (event : React.MouseEvent) => {
        props.onSelect(interviewer, selectedTimeslot);
    }

    const handleSelectTimeslot = (timeslot : Timeslot) => (event : React.MouseEvent) => {
        setSelectedTimeslot(timeslot);
    }

    return (
        <Box boxShadow = "0px 3px 6px #00000029">
            <HStack pl = '25px' pt='20px'>
                <Box bgImage = {image}>
                    <Image src = 'https://via.placeholder.com/120' />
                </Box>
                <Box pl = '5px' w = '300px'>
                    <Heading fontSize = "14px" pb = "6px" textColor = '#0073FF'>{interviewer.name}</Heading>
                    <Heading fontSize = "18px" pb = "6px" textColor = '#0B294E'>{interviewer.position}, {interviewer.company}</Heading>
                    <Text fontSize = "14px" pb = "10px" textColr = '#B1B1B1'>{interviewer.joiningDate}-{interviewer.endingDate}</Text>
                    <Text fontSize = "14px" pb = "5px" textColor = '#0B294E'>{interviewer.experience} years of experience</Text>
                </Box>
                <Box pl = "350px" pr = '50px'>
                    <Button borderColor = '#0B294E' textColor = '#0B294E' onClick = {handleSelectBooking}>Book Slot</Button>
                </Box>
            </HStack>
            <HStack spacing = {4} pt = '20px' pb= '20px' pl='160px'>
                <Text fontSize = "14px" pb = "5px" textColor = '#0B294E'>Select Slot</Text>
                {interviewer.timeslots.map(timeslot => {
                    return <Button 
                                fontSize = "14px"
                                pb = "5px"
                                textColor = '#0B294E' 
                                onClick = {handleSelectTimeslot(timeslot)}
                            >
                                {timeslot.startTime}-{timeslot.endTime}
                            </Button>
                })}
            </HStack>
        </Box>
    )

}

export default InterviewerDetails;