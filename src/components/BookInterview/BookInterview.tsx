import { Box, Flex, Heading, Input, Text, VStack, HStack, Select, Button} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Interviewer } from "../../models/Interviewer";
import { Timeslot } from "../../models/Timeslot";
import { getCompanies, getIndustries, getPositions } from "../../services/GlobalService";
import { getInterviewers } from "../../services/InterviewService";
import { InterviewerDetails} from "../InterviewerDetails/InterviewerDetails";

function BookInterview() {

    const [interviewers, setInterviewers] = useState<Interviewer[]>([]);

    const [industries, setIndustries] = useState<string[]>([]);

    const [positions, setPositions] = useState<string[]>([]);

    const [companies, setCompanies] = useState<string[]>([]);

    const [selectedIndustry, setSelectedIndustry] = useState<string>("");
    
    const [selectedPosition, setSelectedPosition] = useState<string>("");

    const [selectedCompany, setSelectedCompany] = useState<string>("");

    const [selectedDate, setSelectedDate] = useState<string>("");

    const [selectedTiming, setSelectedTiming] = useState<string>("");

    const fetchInterviewers = useCallback( () => {
        getInterviewers()
        .then((data) => {
          setInterviewers(data);
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    const fetchIndustries = useCallback( () => {
        getIndustries()
        .then((data) => {
          setIndustries(data);
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    const fetchCompanies = useCallback( () => {
        getCompanies()
        .then((data) => {
          setCompanies(data);
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    const fetchPositions = useCallback( () => {
        getPositions()
        .then((data) => {
          setPositions(data);
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    useEffect(() =>  {
        fetchInterviewers()
        fetchCompanies()
        fetchIndustries()
        fetchPositions()
      }, []);

    const handleIndustryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIndustry(event.target.value);
    };

    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompany(event.target.value);
    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPosition(event.target.value);
    };

    const handleTimingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTiming(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleSearch = (event : React.MouseEvent) => {
        console.log(selectedDate);
        console.log(selectedIndustry);
        console.log(selectedTiming);
        console.log(selectedCompany);
        console.log(selectedPosition);
    }

    const handleBooking = (interviewer : Interviewer, timeslot : Timeslot) => {
        console.log(interviewer);
        console.log(timeslot);
    }

    return (
        <VStack pt = '100px' pl = '40px' pr = '100px' color = '#0B294E' spacing = {5} align = 'normal'>
            <Heading fontSize = '20px' fontWeight = 'bold' >Book Interviews</Heading>
            <VStack spacing = {2} fontSize = '15px' align = 'normal' color = '#0B294E' p = '20px' pt= '15px' boxShadow = '0px 3px 6px #00000029'>
                <Heading fontSize = '13px'>Select the industry and date</Heading>
                <HStack spacing = {8}>
                    <Select placeHolder = "Industry" w= '20%' onChange = {handleIndustryChange}>
                        <option selected></option>
                        {industries.map(industry => 
                            {return <option>{industry}</option> })}
                    </Select>
                    <Input type = 'date' placeholder = "Date" w = '20%' onChange = {handleDateChange}></Input>
                    <Button bgColor = '#0B294E' color = 'white' fontSize = '13px' onClick = {handleSearch}>Search</Button>
                </HStack>
            </VStack>
            <HStack alignItems = 'flex-start'>
                <VStack spacing = {4} boxShadow = '0px 3px 6px #00000029' align = 'left' p = '15px' w = '220px' justifyContent = 'flex-end'>
                    <Heading fontSize = '13px'>Filters</Heading>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Timing</Heading>
                        <Select onChange = {handleTimingChange}>
                            <option selected></option>
                            <option>
                                7AM-12PM
                            </option>
                            <option>
                                12PM-5PM
                            </option>
                            <option>
                                5PM-10PM
                            </option>
                        </Select>
                    </VStack>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Company</Heading>
                        <Select onChange = {handleCompanyChange}>
                            <option selected></option>
                            {companies.map(company => 
                                {return <option>{company}</option> })}
                        </Select>
                    </VStack>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Position</Heading>
                        <Select onChange = {handlePositionChange}>
                            <option selected></option>
                            {positions.map(position => 
                                {return <option>{position}</option> })}     
                        </Select>
                    </VStack>
                </VStack>
                <VStack>
                    {interviewers.map(interviewer => <InterviewerDetails key = {interviewer.id} interviewer = {interviewer} onSelect = {handleBooking}/>)}
                </VStack>
            </HStack>
        </VStack>
    );

}

export default BookInterview;