import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { saveInterviewSlots } from "../../services/InterviewerService";
import { InterviewSlotModel } from "../../models/InterviewSlotModel";
import { parseBookInterviewRequest } from "../../models/BookInterviewRequestModel";
import {DeleteIcon } from '@chakra-ui/icons'
import { Button ,Heading,Text,
    Stack,Box,HStack,createStandaloneToast} from "@chakra-ui/react";

const toast=createStandaloneToast();

export default class SetAvailabilityComponent extends React.Component<any,any>{

initSlotsPerDay= ['07:00', '08:00' ,'09:00', '10:00' ,'11:00',
 '12:00' ,'13:00' ,'14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00','21:00'];
    

   state={
        selectedSlots:[] as InterviewSlotModel[],
        slotsPerDay:this.initSlotsPerDay,
        selectedDate:""
    }

    formatDate=(date:string)=>{
      let dateArr=  date.split('/');
          return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`;
    }

    checkSelectedSlotsForADate=(date:string)=>{

     return  this.state.selectedSlots.find((dateSlots)=>{
        return dateSlots.interviewDate === date;
      });
    }
    x(y:any,a:string){
      console.log(JSON.stringify(y) + a);
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
       this.setState({selectedDate:this.formatDate(event.toLocaleDateString())},this.removeAndOpenSlots);
      }
    }

    removeAndOpenSlots=()=>{  
      let dateSlots:InterviewSlotModel|undefined= this.checkSelectedSlotsForADate(this.state.selectedDate);
      if(dateSlots){
          let availableSlots = this.initSlotsPerDay.filter((slot)=>{
             return !dateSlots!.interviewStartTime.includes(slot);
          });
          this.setState({slotsPerDay:availableSlots});
      }
      else{
        this.setState({slotsPerDay:this.initSlotsPerDay});
      }     
    }

    handleAddSlotButtonClick=(slot:string)=>{     
      if(this.state.selectedDate===""){
          toast({
            description: "please select a date before adding a slot",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
     }     
      let slotTOBeAdded:InterviewSlotModel = {
        interviewDate :this.state.selectedDate,
        interviewStartTime:[]
      }
      let dateSlots:InterviewSlotModel|undefined= this.checkSelectedSlotsForADate(this.state.selectedDate);
     
      if(dateSlots){
        slotTOBeAdded.interviewStartTime=[...dateSlots.interviewStartTime,slot].sort((slotA:string,slotB:string)=>{
          return parseInt( slotA.slice(0,2)) - parseInt( slotB.slice(0,2));
        });      
        
      }else{
        slotTOBeAdded.interviewStartTime=[slot];
      }     
      this.setState({selectedSlots: 
        [...this.state.selectedSlots.filter((slot)=>slot.interviewDate!==slotTOBeAdded.interviewDate),slotTOBeAdded].sort(this.dateSortPradicate)
      },this.removeAndOpenSlots)
     }

     removeSelectedSlot=(slotDate:string,slotTime:string)=>{

      let dateSlots:InterviewSlotModel|undefined= this.checkSelectedSlotsForADate(slotDate);
           dateSlots!.interviewStartTime =  dateSlots!.interviewStartTime.filter((time:string)=>{
                                                 return time !==slotTime });          
          if(dateSlots!.interviewStartTime.length<1){
              this.setState({selectedSlots: 
                [...this.state.selectedSlots.filter((slot)=>{ return slot.interviewDate !== slotDate})]
                 },this.removeAndOpenSlots);
              
            } else{                                 

             this.setState({selectedSlots:
          [...this.state.selectedSlots.filter((slot)=>{ return slot.interviewDate !== slotDate}),dateSlots]
          },this.removeAndOpenSlots);
        }
         
    }
   
    dateSortPradicate=(dateA:InterviewSlotModel,dateB:InterviewSlotModel)=>{
       return new Date(dateA.interviewDate) < new Date(dateB.interviewDate)?-1:1 ;
    }

    confirmAndSaveSelectedSlot=async ()=>{

      const response = await saveInterviewSlots(this.props.user.id,parseBookInterviewRequest(this.state.selectedSlots));
      if( response.status===201){
        toast({
          title: "Slots Opened for booking",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      else{
        toast({
          title: "Error Occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        }); 
      }
    }

   render(){
        return (
            <Stack p={100}  spacing={3} >
                 <Heading  size = 'sm' color='#0b294e' >SET AVAILABILITY<hr style = {{ height:'2px',
                   backgroundColor : '#d1e0ef'}}/></Heading>
                   <HStack spacing={526}>
                   <Stack spacing={-1}>
                    <Text  color='#0b294e' fontSize='xs' fontWeight='semibold'>*Please Select date and time as per your availability, slots are set as one hour each</Text>
                    <Text  color='#0b294e' fontSize='xs' fontWeight='semibold'>*Slots which are already booked, will not be edited</Text>                   
                    </Stack>
                    <Button onClick={this.confirmAndSaveSelectedSlot} bg='#0b294e' color='white' width='min-content' size='sm'>Confirm slots</Button>                                
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
                                                  <Button variant='solid' key={slotTime} style={{borderWidth:"1px", height:'8mm', width:'25mm' ,borderColor:'#0b294e'  }}>
                                                    {`${slotTime}-${parseInt(slotTime.slice(0,2))+1 }:00`}</Button>
                                                   <Button onClick={()=>{this.removeSelectedSlot(slot.interviewDate,slotTime)}} variant="unstyled"> <DeleteIcon/></Button>
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