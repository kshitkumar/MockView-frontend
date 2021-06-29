import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { saveInterviewSlots,fetchVacantAndBookedInterviewSlots } from "../../services/SlotService";
import { Slot,InterviewSlotModel,parseInterviewSlotModel } from "../../models/InterviewSlotModel";
import { parseBookInterviewRequest } from "../../models/OpenInterviewRequestModel";
import {DeleteIcon } from '@chakra-ui/icons'
import { Button ,Heading,Text,
    Stack,Box,HStack,createStandaloneToast,Spinner} from "@chakra-ui/react";


const toast=createStandaloneToast();

export default class SetAvailabilityComponent extends React.Component<any,any>{

initSlotsPerDay= ['07:00', '08:00' ,'09:00', '10:00' ,'11:00',
 '12:00' ,'13:00' ,'14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00','21:00'];
    
async componentDidMount(){
  if( !window.sessionStorage.getItem("user")){
    this.props.history.push('/login');
    return;
  }
  if( !window.sessionStorage.getItem("role")){
    this.props.history.push('/select-profile');
    return;
  }
  const response = await fetchVacantAndBookedInterviewSlots(this.state.loggedInUser.id);
       if(response.status===200){
          this.setState({selectedSlots: parseInterviewSlotModel(response.data)})
       }
}

   state={
        selectedSlots:[] as InterviewSlotModel[],
        slotsPerDay:[],
        selectedDate:"",
        loggedInUser: JSON.parse(window.sessionStorage.getItem("user")!),
        areSlotsSelected:false,
        loading:false
        }

    formatDate=(date:string)=>{
      let dateArr=  date.split('/');
      dateArr[0]=   dateArr[0].length===1 ? '0'+dateArr[0]:dateArr[0];
      dateArr[1]=  dateArr[1].length===1 ? '0'+dateArr[1]:dateArr[1];
          return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
    }

    checkSelectedSlotsForADate=(date:string)=>{

     return  this.state.selectedSlots.find((dateSlots)=>{
        return dateSlots.interviewDate === date;
      });
    }

    setStateforSelectedDate=(event:any)=>{
     if(new Date() >= event){
      toast({
        title: "Please select an upcoming date",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
     }else{
       this.setState({slotsPerDay:this.initSlotsPerDay});
       this.setState({selectedDate:this.formatDate(event.toLocaleDateString())},this.removeAndOpenSlots);
      }
    }

    removeAndOpenSlots=()=>{  
      console.log(this.state.selectedSlots);
      let dateSlots:InterviewSlotModel|undefined= this.checkSelectedSlotsForADate(this.state.selectedDate);
      if(dateSlots){

        let availableSlots = this.initSlotsPerDay.filter((slotString:string)=>{
            let isPresent = false;
             dateSlots?.interviewStartTime.forEach((slot:Slot)=>{
               
                if(slot.slotTime===slotString)
                isPresent =true;
               })    
                  return !isPresent;
            });
      this.setState({slotsPerDay:availableSlots});
    }
      else{
        if(this.state.selectedDate)
        this.setState({slotsPerDay:this.initSlotsPerDay});
      }     
    }

    handleAddSlotButtonClick=(slot:string)=>{     
      if(this.state.selectedDate===""){
          toast({
            description: "please select a date before adding a slot",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
     }        
     this.setState({areSlotsSelected:true});
      let slotTOBeAdded:InterviewSlotModel = {
        interviewDate :this.state.selectedDate,
        interviewStartTime:[]
      }
      let dateSlots:InterviewSlotModel|undefined= this.checkSelectedSlotsForADate(this.state.selectedDate);
     
      if(dateSlots){
        slotTOBeAdded.interviewStartTime=[...dateSlots.interviewStartTime,{slotId:0,slotTime:slot,slotStatus:"VACANT"}].sort((slotA:Slot,slotB:Slot)=>{
          return parseInt( slotA.slotTime.slice(0,2)) - parseInt( slotB.slotTime.slice(0,2));
        });      
        
      }else{
        slotTOBeAdded.interviewStartTime=[{slotTime:slot,slotStatus:"VACANT"}];
      }     
      this.setState({selectedSlots: 
        [...this.state.selectedSlots.filter((slot)=>slot.interviewDate!==slotTOBeAdded.interviewDate),slotTOBeAdded].sort(this.dateSortPradicate)
      },this.removeAndOpenSlots)
     }

     removeSelectedSlot=(slotDate:string,slotTime:string)=>{
      this.setState({areSoltsSelected:true});
      let dateSlots:InterviewSlotModel|undefined= this.checkSelectedSlotsForADate(slotDate);
           dateSlots!.interviewStartTime =  dateSlots!.interviewStartTime.filter((slot:Slot)=>{
                                                 return slot.slotTime !==slotTime });          
          if(dateSlots!.interviewStartTime.length<1){          
              this.setState({selectedSlots: 
                [...this.state.selectedSlots.filter((slot)=>{ return slot.interviewDate !== slotDate})].sort(this.dateSortPradicate)
                 },this.removeAndOpenSlots);              
          } else{                                 
             this.setState({selectedSlots:
          [...this.state.selectedSlots.filter((slot)=>{ return slot.interviewDate !== slotDate}),dateSlots!].sort(this.dateSortPradicate)
          },this.removeAndOpenSlots);
        }         
    }
   
    dateSortPradicate=(dateA:InterviewSlotModel,dateB:InterviewSlotModel)=>{
       return new Date(dateA.interviewDate) < new Date(dateB.interviewDate)?-1:1 ;
    }

    confirmAndSaveSelectedSlot=async ()=>{   
      this.setState({loading:true})
      if(this.state.areSlotsSelected){      
        const response = await saveInterviewSlots(this.state.loggedInUser.id,parseBookInterviewRequest(this.state.selectedSlots));
        if( response.status===201){
          this.setState({loading:false})
          toast({
            title: "Slots Updated for booking",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          this.props.history.push("/my-interviews")
        }
        else{
          this.setState({loading:false})
          toast({
            title: "Error Occurred",
            status: "error",
            duration: 5000,
            isClosable: true,
          }); 
        }
      }
      else{
      this.setState({loading:false})
      toast({
        title: "Slots Updated for booking",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      this.props.history.push("/my-interviews")
     }
   }

    displyDeleteIconOrBookedBasedOnSlotStatus=(status:string)=>{
        if(status==="BOOKED"){
          return <Text fontSize='xs' color='red'>Booked</Text>
        }
        else{
           return <DeleteIcon  />
        }
    }

   render(){
        return (
            <Stack p={100}  spacing={3} >
                 <Heading  fontSize = '20px' fontWeight = 'bold' color='#0b294e' >SET AVAILABILITY<hr style = {{ height:'2px',
                   backgroundColor : '#d1e0ef'}}/></Heading>
                   <HStack spacing={526}>
                   <Stack spacing={-1}>
                    <Text  color='#0b294e' fontSize='xs' fontWeight='semibold'>*Please Select date and time as per your availability, slots are set as one hour each</Text>
                    <Text  color='#0b294e' fontSize='xs' fontWeight='semibold'>*Slots which are already booked, will not be edited</Text>                   
                    </Stack>
                    <HStack><Spinner visibility={this.state.loading?"visible":"hidden"} size='md'/>
                       <Button onClick={this.confirmAndSaveSelectedSlot} bg='#0b294e' color='white' width='min-content' size='sm'>Confirm slots</Button>                                
                       </HStack>
                    </HStack>
                     <Box   color='#0b294e' height='sm' style={{alignItems:"center"}}  borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl">
                      
                       <HStack style = {{alignItems:"center"}}>
                      
                      <Box p={8} color='#0b294e' height='sm' style={{alignItems:"center"}} >
                     
                          <Calendar view='month'
                            onClickDay={(event)=>{this.setStateforSelectedDate(event)} }></Calendar>
                      </Box>                   
                    <Box>
                      <Box className='scroll'   style={{overflowY :'scroll',alignItems:"center"}} width="56" height='xs' p={15} color='#0b294e' >
                          <Stack style = {{alignItems:"center"}}>
                          <Heading  size = 'xs'  color='#0b294e' >OPEN SLOTS</Heading>
                        <br />
                          {this.state.slotsPerDay.map((slot:string)=>{
                           return   <Button   variant='solid' 
                                     key={slot} style={{borderWidth:"1px",
                                      height:'8mm', width:'18mm' ,borderColor:'#0b294e'}} 
                                       onClick={()=>{this.handleAddSlotButtonClick(slot)}}>{slot}</Button>
                   
                           })
                           }
                         </Stack>                   
                    </Box>
                </Box>
                <Stack>
                    <Box className='scroll'  width="sm" height='xs' style={{overflowY :'scroll',alignItems:"center"}} p={15} color='#0b294e' >
                        <Stack style = {{alignItems:"center"}}>
                        <Heading  size = 'xs'  color='#0b294e' >SELECTED SLOTS</Heading>
                        <br /><br />
                           {this.state.selectedSlots.map((slot:InterviewSlotModel)=>{
                               return <Stack style = {{alignItems:"center"}}>
                                         <Button size='md'width='xs' height='min-content'  variant='solid' key={slot.interviewDate}>{slot.interviewDate}</Button>
                                         {slot.interviewStartTime.map((slotTime)=>{
                                             return   <HStack spacing={40}>
                                                  <Button variant='solid' key={slotTime.slotTime} style={{borderWidth:"1px", height:'8mm', width:'25mm' ,borderColor:'#0b294e'  }}>
                                                    {`${slotTime.slotTime}-${parseInt(slotTime.slotTime.slice(0,2))+1 }:00`}</Button>
                                                   <Button isDisabled={slotTime.slotStatus==="BOOKED"} onClick={()=>{this.removeSelectedSlot(slot.interviewDate,slotTime.slotTime)}} variant="unstyled"> 
                                                  { this.displyDeleteIconOrBookedBasedOnSlotStatus(slotTime.slotStatus)}</Button>
                                                  </HStack> 
                                         })}                                       
                                        </Stack>                         
                                 })}
                         </Stack>                   
                   </Box>                  
                   </Stack>                   
                  </HStack>                
                   </Box>                   
              </Stack>
        );
    }

}