import React from "react";
import { User } from "../../models/User";
import { InterviewTileModel } from "../../models/MyInterviewTileModel";
import moment from "moment";
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box,Heading,Stack,Text,HStack ,Button} from "@chakra-ui/react"
import { getUpcomingInterviewForInterviewee ,
         getUpcomingInterviewForInterviewer,
         getCompletedInterviewForInterviewee,
         getCompletedInterviewForInterviewer} from "../../services/InterviewService";
import { timeLog } from "console";

         enum Role{
          INTERVIEWER="INTERVIEWER",CANDIDATE="CANDIDATE"
         }

export default class MyInterviewComponent extends React.Component<any,any>{

    state={
        upComingInterviews:[] ,
        completedInterviews:[] ,
        loggedInUser: {} as User,
        role:null
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
        if(this.state.role===Role.CANDIDATE){
            const upcomingInterviewResponse = await getUpcomingInterviewForInterviewee(this.state.loggedInUser.id);
             if( upcomingInterviewResponse.status===200){
                console.log(upcomingInterviewResponse.data);
                this.setState({upComingInterviews:upcomingInterviewResponse.data},this.p);              
             }
             else{

             }
             const completedInterviewResponse = await getCompletedInterviewForInterviewee(this.state.loggedInUser.id);
             if(completedInterviewResponse.status===200){
                this.setState({completedInterviews:completedInterviewResponse.data});
             }
             else{

             }
        }else if(this.state.role===Role.INTERVIEWER){
            const upcomingInterviewResponse = await getUpcomingInterviewForInterviewer(this.state.loggedInUser.id);
             if( upcomingInterviewResponse.status===200){
                 console.log(upcomingInterviewResponse.data);
                 this.setState({upComingInterviews:upcomingInterviewResponse.data},this.p);
             }
             else{

             }
             const completedInterviewResponse = await getCompletedInterviewForInterviewer(this.state.loggedInUser.id);
             if(completedInterviewResponse.status===200){
                this.setState({completedInterviews:completedInterviewResponse.data});
             }
             else{

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
            <Tabs align='center' isFitted variant = 'enclosed-colored' size="lg">
            <TabList>
              <Tab color='#0b294e'   fontWeight='semibold' fontSize='md'>UPCOMING INTERVIEWS</Tab>
              <Tab color='#0b294e'   fontWeight='semibold' fontSize='md'>COMPLETED INTERVIEWS</Tab>
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
      return <Box width='max-content' p={1}  borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl"> 
                   <HStack bg='#e2e8f0' borderRadius='xl' p={4} spacing={180} color='#0b294e'>
                        <Stack spacing={0}  pl={20} alignItems='start'>
                            <Text fontWeight='semibold'>{this.props.role==="INTERVIEWER"?"CANDIDATE":"INTERVIEWER"}</Text>
                            <Text>{this.props.tile.name}</Text>
                            <Text>{(this.props.tile.position&&this.props.tile.company)?
                                this.props.tile.position+' at '+this.props.tile.company:"Currently unemployed"}
                            </Text>
                        </Stack> 
                        <Button color='white' width="32" isDisabled=
                        {new Date((new Date().setMinutes(new Date().getMinutes()+5)))
                            <=new Date( new Date(this.props.tile.startDate).setHours(this.props.tile.startTime))} bg='#0b294e'>
                            {this.props.tab==="UPCOMING"?'Join Interview':'Feedback'}</Button>
                        <Stack spacing={0}   alignItems='start' pr={20}>
                            <Text fontWeight='semibold'>{"DATE & TIME"}</Text>
                            <Text>{(this.props.tile.startTime.slice(0,5)+"-"+this.props.tile.endTime.slice(0,5))}</Text>
                            <Text>{moment.localeData().ordinal( new Date(this.props.tile.startDate).getDate())},
                            {moment.localeData().weekdays()[new Date(this.props.tile.startDate).getDay()]} </Text>
                        </Stack>  
                    </HStack>  
             </Box>
  }
}