import { Heading, Input, VStack, HStack, Select, Button} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Interviewer } from "../../models/Interviewer";
import { Timeslot } from "../../models/Timeslot";
import { fetchIndustries , fetchPositions, fetchCompanies} from "../../services/WorkDetailService";
import { getInterviewers } from "../../services/InterviewService";
import { InterviewerDetails} from "../InterviewerDetails/InterviewerDetails";
import { InterviewerFilter } from "../../models/InterviewerFilter";

interface Timing {
    "id" : number
    "startTime" : string,
    "endTime" : string,
    "label" : string
}

function BookInterview() {

    const [interviewers, setInterviewers] = useState<Interviewer[]>([]);

    const [industries, setIndustries] = useState<string[]>([]);

    const [positions, setPositions] = useState<string[]>([]);

    const [companies, setCompanies] = useState<string[]>([]);

    const timings = [
        {"startTime" : "", "endTime" : "", "label" : "", "id" : 0},
        {"startTime" : "07:00", "endTime" : "12:00", "label" : "7AM - 12PM", "id" : 1},
        {"startTime" : "12:00", "endTime" : "17:00", "label" : "12PM - 5PM", "id" : 2},
        {"startTime" : "17:00", "endTime" : "22:00", "label" : "5PM - 10PM", "id" : 3},
    ]

    const initialFilter = {
        "industry" : "",
        "date" : "",
        "timing" : timings[0],
        "position" : "",
        "company" : ""
    }

    const [filter, setFilter] = useState<InterviewerFilter>(initialFilter);

    const [selectedTiming, setSelectedTiming] = useState<Timing>(timings[0]);

    const getIndustries = useCallback( () => {
        fetchIndustries()
        .then((data) => {
          setIndustries(data.values);
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    const getCompanies = useCallback( () => {
        fetchCompanies()
        .then((data) => {
          setCompanies(data.values);
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    const getPositions = useCallback( () => {
        fetchPositions()
        .then((data) => {
          setPositions(data);
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    useEffect(() =>  {
        getCompanies()
        getIndustries()
        getPositions()
      }, []);

    const handleIndustryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    const handleTimingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter({ ...filter, timing: timings[Number.parseInt(event.target.value)] });
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    const handleSearch = (event : React.MouseEvent) => {
        getInterviewers(filter)
        .then((response) => {
          setInterviewers(response.data);
        })
        .catch((error) => {
          console.log(error)
        })
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
                    <Select placeHolder = "Industry" w= '20%' onChange = {handleIndustryChange} name = "industry">
                        <option selected></option>
                        {industries.map(industry => 
                            {return <option>{industry}</option> })}
                    </Select>
                    <Input type = 'date' placeholder = "Date" w = '20%' onChange = {handleDateChange} name = "date"></Input>
                    <Button bgColor = '#0B294E' color = 'white' fontSize = '13px' onClick = {handleSearch}>Search</Button>
                </HStack>
            </VStack>
            <HStack alignItems = 'flex-start'>
                <VStack spacing = {4} boxShadow = '0px 3px 6px #00000029' align = 'left' p = '15px' w = '220px' justifyContent = 'flex-end'>
                    <Heading fontSize = '13px'>Filters</Heading>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Timing</Heading>
                        <Select onChange = {handleTimingChange}>
                            {timings.map(timing => {
                                return <option value = {timing.id}>{timing.label}</option>
                            })}
                        </Select>
                    </VStack>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Company</Heading>
                        <Select onChange = {handleCompanyChange} name = "company">
                            <option selected></option>
                            {companies.map(company => 
                                {return <option>{company}</option> })}
                        </Select>
                    </VStack>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Position</Heading>
                        <Select onChange = {handlePositionChange} name = "position">
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