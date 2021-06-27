import React from "react";
import { User } from "../../models/User";
import { InterviewTileModel } from "../../models/MyInterviewTileModel";
import moment from "moment";
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box,Heading,Stack,Text,HStack ,Button} from "@chakra-ui/react"
import { getUpcomingInterviewForInterviewee ,
         getUpcomingInterviewForInterviewer,
         getCompletedInterviewForInterviewee,
         getCompletedInterviewForInterviewer} from "../../services/InterviewService";
import Jitsi from 'react-jitsi'
import { ZoomMtg } from "@zoomus/websdk";
import crypto from 'crypto'

 enum Role{
 INTERVIEWER="INTERVIEWER",CANDIDATE="CANDIDATE"
}

// crypto comes with Node.js
    let apiKey = 'JWT_API_KEY'
    let meetingNumber = 123456789
    let role = 0
    let leaveUrl = 'http://localhost:3000'
    let userName = 'WebSDK'
    let userEmail = ''
    let passWord = ''  
    let apiSecret=''
    let signature = ''
    // generateSignature(apiKey, apiSecret, meetingNumber , role).then((response)=>{
    //   signature=response;
    // })


// function generateSignature(apiKey :any, apiSecret:any, meetingNumbe:number, role:number) {

//     return new Promise<any>((res,rej)=>{
//         // Prevent time sync issue between client signature generation and zoom 
//         debugger;
//         const timestamp = new Date().getTime() - 30000
//         const msg = Buffer.from(apiKey + meetingNumber.toString() + timestamp + role).toString('base64')
//         const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
//         const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
//         res(signature);
//     });
// }

// pass in your Zoom JWT API Key, Zoom JWT API Secret, Zoom Meeting Number, and 0 to join meeting or webinar or 1 to start meeting
// console.log(generateSignature(process.env.API_KEY, process.env.API_SECRET, 123456789, 0))

       // setup your signautre endpoint here: https://github.com/zoom/websdk-sample-signature-node.js


export default class MyInterviewComponent extends React.Component<any,any>{

    state={
        upComingInterviews:[] as InterviewTileModel[],
        completedInterviews:[] as InterviewTileModel[],
        loggedInUser: {} as User,
        role:null
    }

    initiateMeeting=()=>{
        ZoomMtg.init({
            leaveUrl: leaveUrl,
            isSupportAV: true,
            success: (success:any) => {
              console.log(success)
          
              ZoomMtg.join({
                signature: signature,
                meetingNumber: meetingNumber,
                userName: userName,
                apiKey: apiKey,
                userEmail: userEmail,
                passWord: passWord,
                success: (success:any) => {
                  console.log(success)
                },
                error: (error:any) => {
                  console.log(error)
                }
              })
          
            },
            error: (error:any) => {
              console.log(error)
            }
          })
    }
        
    componentDidMount=async ()=>{
        let userString = window.sessionStorage.getItem("user");
        let roleString = window.sessionStorage.getItem("role");
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.5/lib', '/av'); 
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
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
         console.log(this.state.upComingInterviews)
     }
    loadInterviewData= async ()=>{
        if(this.state.role===Role.CANDIDATE){
            const upcomingInterviewResponse = await getUpcomingInterviewForInterviewee(this.state.loggedInUser.id);
             if( upcomingInterviewResponse.status===200){
                 this.setState({upcomingInterviews:upcomingInterviewResponse.data});
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
            <Heading p={3} size = 'sm' color='#0b294e' >MY INTERVIEWS<hr style = {{ height:'2px',
                   backgroundColor : '#d1e0ef'}}/></Heading>
                 
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
                 {this.state.completedInterviews.map((tile:InterviewTileModel,index)=>{
                    return  <InterviewTile key={index} tile={tile} role={this.state.role} tab="COMPLETED"  />
                })}
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
                        <Button color='white' isDisabled=
                        {new Date((new Date().setMinutes(new Date().getMinutes()+5)))
                            <=new Date( new Date(this.props.tile.startDate).setHours(this.props.tile.startTime))} bg='#0b294e'>
                            {this.props.tab==="UPCOMING"?'Join Interview':'Feedback'}</Button>
                        <Stack spacing={0}   alignItems='start' pr={20}>
                            <Text fontWeight='semibold'>{"DATE & TIME"}</Text>
                            <Text>{this.props.tile.startTime.slice(0,5)+"-"+this.props.tile.endTime.slice(0,5)}</Text>
                            <Text>{moment.localeData().ordinal( new Date(this.props.tile.startDate).getDate())},
                            {moment.localeData().weekdays()[new Date(this.props.tile.startDate).getDay()]} </Text>
                        </Stack>  
                    </HStack>  
             </Box>
  }
}