import { Box, Flex, Heading, Link, Input, Text, VStack, HStack, Select, Button} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Interviewer } from "../../models/Interviewer";
import { getInterviewers } from "../../services/InterviewService";
import { InterviewerDetails} from "../InterviewerDetails/InterviewerDetails";

function BookInterview() {

    const [interviewers, setInterviewers] = useState<Interviewer[]>([]);

    const fetchInterviewers = useCallback( () => {
        getInterviewers()
        .then((data) => {
          setInterviewers(data);
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    useEffect(() =>  {
        fetchInterviewers()
      }, [fetchInterviewers]);

    return (
        <VStack pt = '100px' pl = '40px' pr = '100px' color = '#0B294E' spacing = {5} align = 'normal'>
            <Heading fontSize = '20px' fontWeight = 'bold' >Book Interviews</Heading>
            <VStack spacing = {2} fontSize = '15px' align = 'normal' color = '#0B294E' p = '20px' pt= '15px' boxShadow = '0px 3px 6px #00000029'>
                <Heading fontSize = '13px'>Select the industry and date</Heading>
                <HStack spacing = {8}>
                    <Select placeHolder = "Industry" w= '20%'>
                    </Select>
                    <Input type = 'date' placeholder = "Date" w = '20%'></Input>
                    <Button bgColor = '#0B294E' color = 'white' fontSize = '13px'>Search</Button>
                </HStack>
            </VStack>
            <HStack alignItems = 'flex-start'>
                <VStack spacing = {4} boxShadow = '0px 3px 6px #00000029' align = 'left' p = '15px' w = '220px' justifyContent = 'flex-end'>
                    <Heading fontSize = '13px'>Filters</Heading>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Timing</Heading>
                        <Select></Select>
                    </VStack>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Company</Heading>
                        <Select></Select>
                    </VStack>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Position</Heading>
                        <Select></Select>
                    </VStack>
                </VStack>
                <VStack>
                    {interviewers.map(interviewer => <InterviewerDetails key = {interviewer.id} interviewer = {interviewer}/>)}
                </VStack>
            </HStack>
        </VStack>
    );

}

export default BookInterview;