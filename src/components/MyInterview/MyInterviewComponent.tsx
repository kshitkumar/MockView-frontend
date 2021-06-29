import React from "react";
import { User } from "../../models/User";
import { InterviewTileModel } from "../../models/MyInterviewTileModel";
import moment from "moment";
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box,Heading,Stack,Text,HStack ,Button,createStandaloneToast,Spinner} from "@chakra-ui/react"
import { getUpcomingInterviewForInterviewee ,
         getUpcomingInterviewForInterviewer,
         getCompletedInterviewForInterviewee,
         getCompletedInterviewForInterviewer} from "../../services/InterviewService";


         enum Role{
          INTERVIEWER="INTERVIEWER",CANDIDATE="CANDIDATE"
         }

         const toast = createStandaloneToast();
export default class MyInterviewComponent extends React.Component<any,any>{

    state={
        upComingInterviews:[] as InterviewTileModel[],
        completedInterviews:[] as InterviewTileModel[],
        loggedInUser: {} as User,
        role:null,
        loadingUp:false,
        loadingCom:false
    }
        
    componentDidMount=async ()=>{
       
        let userString = window.sessionStorage.getItem("user");
        let roleString = window.sessionStorage.getItem("role");
        if(!userString){
           this.props.history.push('./login');
        }
        else if(!roleString){           
            this.props.history.push('./select-profile')
         }
        else{
            this.setState({loggedInUser:JSON.parse(userString),role:roleString},this.loadInterviewData);
         } 
    }
     p=()=>{
         console.log(this.state.upComingInterviews);
     }
    loadInterviewData= async ()=>{
        this.setState({loadingUp:true,loadingCom:true});
        if(this.state.role===Role.CANDIDATE){
            const upcomingInterviewResponse = await getUpcomingInterviewForInterviewee(this.state.loggedInUser.id);
             if( upcomingInterviewResponse.status===200){
                console.log(upcomingInterviewResponse.data);
                this.setState({loadingUp:false});
                this.setState({upComingInterviews:upcomingInterviewResponse.data},this.p);    
                if(upcomingInterviewResponse.data.length===0){
                    toast({
                        description: "No upcoming interviews",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                }          
             }
             else{
                this.setState({loadingUp:false});
                toast({
                    description: "Error fetching upcoming interviews",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
             }
             const completedInterviewResponse = await getCompletedInterviewForInterviewee(this.state.loggedInUser.id);
             if(completedInterviewResponse.status===200){
                this.setState({loadingCom:false});
                this.setState({completedInterviews:completedInterviewResponse.data});
                if(completedInterviewResponse.data.length===0){
                    toast({
                        description: "No upcoming interviews",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                 }
             }
             else{
                toast({
                    description: "Error fetching completed interviews",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                this.setState({loadingCom:false});
             }
        }else if(this.state.role===Role.INTERVIEWER){
            const upcomingInterviewResponse = await getUpcomingInterviewForInterviewer(this.state.loggedInUser.id);
             if( upcomingInterviewResponse.status===200){
                 console.log(upcomingInterviewResponse.data);
                 this.setState({loadingUp:false});
                 this.setState({upComingInterviews:upcomingInterviewResponse.data},this.p);
                 if(upcomingInterviewResponse.data.length===0){
                    toast({
                        description: "No upcoming interviews",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                 }    
             }
             else{
                this.setState({loadingUp:false});
                toast({
                    description: "Error fetching upcoming interviews",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
             }
             const completedInterviewResponse = await getCompletedInterviewForInterviewer(this.state.loggedInUser.id);
             if(completedInterviewResponse.status===200){
                this.setState({loadingCom:false});
                this.setState({completedInterviews:completedInterviewResponse.data});
                if(completedInterviewResponse.data.length===0){
                    toast({
                        description: "No completed interviews",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                 }    
             }
             else{
                toast({
                    description: "Error fetching completed interviews",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                this.setState({loadingCom:false});
             }
         }
        else{
            this.props.history.push('/select-profile')
        }
       }

    render(){
        return( 
            <Stack pl={5} pt={20} spacing={1}>
            <Heading p={3} size = 'md' color='#0b294e' >MY INTERVIEWS<hr style = {{ height:'2px',
                   backgroundColor : '#d1e0ef'}}/></Heading>
             <Box pb={5} pl={950}>     
                <Button display={this.state.role===Role.CANDIDATE?"none":"block"}  onClick={()=>{this.props.history.push('/set-availability')}} size='md' width='min-content' bg='#0b294e' color="white">Set Availability</Button>
                <Button display={this.state.role===Role.INTERVIEWER?"none":"block"} onClick={()=>{this.props.history.push('/book-interview')}} size='md' width='min-content' bg='#0b294e' color="white">Book Interview</Button>
           
            </Box> 
            <Tabs  align='center' isFitted variant = 'enclosed-colored' size="lg">
            <TabList>
              <Tab color='#0b294e' fontWeight='semibold' fontSize='md'><Spinner
               visibility={this.state.loadingUp?'visible':'hidden'}/>&nbsp; UPCOMING INTERVIEWS</Tab>
              <Tab color='#0b294e' fontWeight='semibold' fontSize='md'><Spinner  
              visibility={this.state.loadingCom?'visible':'hidden'}/>&nbsp; COMPLETED INTERVIEWS</Tab>
            </TabList>         
            <TabPanels>
              <TabPanel>
                 <Stack pb={2}  pl={135} fontSize='sm' fontWeight='semibold'  alignItems='start'>
                 <Text  color='#0b294e'>*You can join the interview session five minutes before the start time</Text>
                 </Stack>
                  <Stack spacing={5} alignItems='center'>
                   {this.state.upComingInterviews.map((tile:InterviewTileModel,index)=>{                  
                     return  <InterviewTile key={index} tile={tile} role={this.state.role} tab="UPCOMING" />
                  })}
                </Stack>
              </TabPanel>
              <TabPanel>
              <Stack pb={2}  pl={135} fontSize='sm' fontWeight='semibold'  alignItems='start'>
                 <Text   visibility='hidden'  color='#0b294e'>{"xx"}</Text>
                 </Stack>
                 <Stack spacing={5} alignItems='center'>
                    {this.state.completedInterviews.map((tile:InterviewTileModel,index)=>{
                        return  <InterviewTile key={index} tile={tile} role={this.state.role} tab="COMPLETED"  />
                    })}
                 </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          </Stack>


         );
    }
}

class InterviewTile extends React.Component<any,any>{



  render(){
    
      return <Box width='1000px' p={1}  borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl"> 
                   <HStack bg='#e2e8f0' borderRadius='xl' p={4} spacing={180} color='#0b294e'>
                        <Stack spacing={0}  pl={20} alignItems='start'>
                            <Text fontWeight='semibold'>{this.props.role==="INTERVIEWER"?"CANDIDATE":"INTERVIEWER"}</Text>
                            <Text>{this.props.tile.name}</Text>
                            <Text>{(this.props.tile.position&&this.props.tile.company)?
                                this.props.tile.position+' at '+this.props.tile.company:"Currently unemployed"}
                            </Text>
                        </Stack> 
                        <Button color='white' width="32"  bg='#0b294e' disabled={new Date(new Date(new Date(this.props.tile.startDate).setHours(this.props.tile.startTime.slice(0,2))).setMinutes(0))
                                >= new Date((new Date().setMinutes(new Date().getMinutes()-5)))}
                                onClick={()=>{
                                    toast({
                                        description: "Feature is still under development",
                                        status: "info",
                                        duration: 3000,
                                        isClosable: true,
                                      });
                                }}>
                            {this.props.tab==="UPCOMING"?'Join Interview':'Feedback'}</Button>
                        <Stack spacing={0}   alignItems='start' pr={20}>
                            <Text fontWeight='semibold'>{"DATE & TIME"}</Text>
                            <Text>{(this.props.tile.startTime.slice(0,5)+"-"+this.props.tile.endTime.slice(0,5))}</Text>
                            <Text>{moment.localeData().weekdays()[new Date(this.props.tile.startDate).getDay()]},
                            {moment.localeData().ordinal( new Date(this.props.tile.startDate).getDate())} {moment.monthsShort()[ parseInt(this.props.tile.startDate.split("-")[1])]}
                             </Text>
                        </Stack>  
                    </HStack>  
             </Box>
  }
}


