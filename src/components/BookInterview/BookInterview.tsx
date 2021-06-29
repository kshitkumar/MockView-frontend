import { Heading, Input, VStack, HStack, Select, Button, useToast,Box,Spinner} from "@chakra-ui/react";
import React, { useCallback, useEffect  } from "react";
import { useState } from "react";
import { Interviewer } from "../../models/Interviewer";
import { Timeslot } from "../../models/Timeslot";
import { fetchIndustries , fetchPositions, fetchCompanies} from "../../services/WorkDetailService";
import { bookInterview, getInterviewers } from "../../services/InterviewService";
import { InterviewerDetails} from "../InterviewerDetails/InterviewerDetails";
import { InterviewerFilter } from "../../models/InterviewerFilter";
import { useHistory } from "react-router-dom";


interface Timing {
    "id" : number
    "startTime" : string,
    "endTime" : string,
    "label" : string
}

function BookInterview(props:any) {

    const initialState = {
        id : 0,
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender:"",
        emailId: "",
        password: "",
        phoneNumber: "",
        profileComplete:false
    };

    const [interviewers, setInterviewers] = useState<Interviewer[]>([]);

    const [industries, setIndustries] = useState<string[]>([]);

    const [positions, setPositions] = useState<string[]>([]);

    const [companies, setCompanies] = useState<string[]>([]);

    let history = useHistory();

    

    const initialTimeslot = {
        "id": 0,
        "startTime" : "",
        "endTime" : ""
    }

    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>(initialTimeslot);

    let toast = useToast();

    const timings = [
        {"startTime" : "", "endTime" : "", "label" : "--Select Timing--", "id" : 0},
        {"startTime" : "07:00", "endTime" : "12:00", "label" : "7AM - 12PM", "id" : 1},
        {"startTime" : "12:00", "endTime" : "17:00", "label" : "12PM - 5PM", "id" : 2},
        {"startTime" : "17:00", "endTime" : "22:00", "label" : "5PM - 10PM", "id" : 3},
    ]

    const initialFilter = {
        "industry" : "",
        "date" : "",
        "timing" : timings[0],
        "position" : "",
        "company" : "",
        "userId" : 0
    }

    const [filter, setFilter] = useState<InterviewerFilter>(initialFilter);

    const getIndustries = useCallback( () => {
        fetchIndustries()
        .then((data) => {
          setIndustries(data.values);
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: "No interviewer available",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
    }, [])

    const getCompanies = useCallback( () => {
        fetchCompanies()
        .then((data) => {
          setCompanies(data.values);
        })
        .catch((error) => {
           console.log(error)
          toast({
            title: "No interviewer available",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
    }, [])

    const getPositions = useCallback( () => {
        fetchPositions()
        .then((data) => {
          setPositions(data);
        })
        .catch((error) => {
            console.log(error)
          toast({
            title: "No interviewer available",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
    }, [])

    const fetchInterviewers = () => {
        getInterviewers(filter)
        .then((response) => {
            setLoading(false);
            if(response.status === 200)
                setInterviewers(response.data);
            else
                setInterviewers([]);
        })
        .catch((error) => {
          setLoading(false);
          setInterviewers([]);
            console.log(error)
          toast({
            title: "No interviewer available",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
    }

    useEffect(() =>  {
       let userString = window.sessionStorage.getItem("user");
       let roleString = window.sessionStorage.getItem("role");
       if(!roleString){
        history.push('/select-profile');
        return;
      }
       if(!userString){
           history.push('/login');
           return;
       }
      
        setFilter({...filter, userId : JSON.parse(userString)});
        getCompanies();
        getIndustries();
        getPositions();
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
        setLoading(true);  
        let userId =  JSON.parse( window.sessionStorage.getItem("user")!).id ;
        console.log(userId);
        setFilter({...filter, userId : userId});
        console.log(filter);
        fetchInterviewers();
    }

    const handleBooking = async (interviewer : Interviewer) => {
        console.log(interviewer);
        console.log(selectedTimeslot);
        setLoadingBook(true);
        let userId =  JSON.parse( window.sessionStorage.getItem("user")!).id ;
        try {
            const response = await bookInterview(userId, selectedTimeslot.id);
            if(response.status === 200) {
                setLoadingBook(false);
                toast({
                    title: "Booking successful",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
            else {
                setLoadingBook(false);
                toast({
                    title: "Booking failed",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
            }
        }
        catch(error) {
            setLoadingBook(false);
            toast({
                title: "Booking failed",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
        }
        fetchInterviewers();
        setSelectedTimeslot(initialTimeslot);
    }

    const handleTimeslotSelect = (timeslot : Timeslot) => {
        setSelectedTimeslot(timeslot);
    }

    const  redirectIfNotLoggedIn=()=>{
        if( !props.isLoggedIn){
            console.log(props.isLoggedIn)
            history.push('/login');
        }
     }
     const [loading,setLoading]=useState(false);
     const [loadingBook,setLoadingBook] = useState(false);
    return (
      
        <VStack pt = '100px' pl = '40px' pr = '100px' color = '#0B294E' spacing = {5} align = 'normal'>
             
            <Heading fontSize = '20px' fontWeight = 'bold' >BOOK INTERVIEWS<hr style = {{ height:'2px',
                   backgroundColor : '#d1e0ef'}}/></Heading>
            <VStack spacing = {2} fontSize = '15px' align = 'normal' color = '#0B294E' p = '20px' pt= '15px' boxShadow = '0px 3px 6px #00000029'>
                <Heading fontSize = '13px'><span style={{color:'red'}}>*</span>Select the industry and date</Heading>
                <HStack spacing = {8}>
                    <Select placeholder = " --Select Industry--" w= '20%' onChange = {handleIndustryChange} name = "industry">
                        {industries.map((industry )=> 
                            {return <option key={industry}>{industry}</option> })}
                    </Select>
                    <Input type = 'date' placeholder = "Date" w = '20%' onChange = {handleDateChange} name = "date"></Input>
                   <HStack>
                    <Button isDisabled={filter.date.length===0 || filter.industry.length===0}         
                    bgColor = '#0B294E' color = 'white' fontSize = '13px' onClick = {handleSearch}>Search</Button>
                     <Spinner visibility={loading?"visible":"hidden"} size='md'/>
                     </HStack>
                   <Box pl={350}>
                      <Button width='40' bg='#0b294e' color='white'  onClick={()=>(history.push('./my-interviews'))}>My Interviews</Button>
                    </Box>
                </HStack>
            </VStack>
            <HStack alignItems = 'flex-start'>
                <VStack spacing = {4} boxShadow = '0px 3px 6px #00000029' align = 'left' p = '15px' w = '300px' justifyContent = 'flex-end'>
                    <Heading fontSize = '13px'>FILTERS</Heading>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Timing</Heading>
                        <Select onChange = {handleTimingChange}  >
                            {timings.map((timing,index) => {
                                return <option key={index} value = {timing.id}>{timing.label}</option>
                            })}
                        </Select>
                    </VStack>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Company</Heading>
                        <Select onChange = {handleCompanyChange} name = "company" placeholder="--Select Company--">
                            {companies.map(company => 
                                {return <option key={company}>{company}</option> })}
                        </Select>
                    </VStack>
                    <VStack spacing = {3} align = 'normal'>
                        <Heading fontSize = '13px'>Position</Heading>
                        <Select onChange = {handlePositionChange} name = "position" placeholder="--Select Position--">
                            {positions.map(position => 
                                {return <option key={position}>{position}</option> })}     
                        </Select>
                    </VStack>
                </VStack>
                <VStack>
                    {interviewers.map(interviewer => 
                        <InterviewerDetails 
                            key = {interviewer.id} 
                            interviewer = {interviewer} 
                            onSelect = {handleBooking} 
                            selectedTimeslot = {selectedTimeslot}
                            onTimeslotSelect = {handleTimeslotSelect} 
                            loadingBook ={loadingBook}
                        />)}
                </VStack>
            </HStack>
        </VStack>
    );

}

export default BookInterview;