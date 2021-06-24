import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { InterviewSlotModel } from "../../models/InterviewSlotModel";
import {DeleteIcon } from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Button ,Heading,
    Stack,Box,HStack,createStandaloneToast,Wrap} from "@chakra-ui/react";



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

    checkIfSlotSelectedForADate=(date:string)=>{

     return  this.state.selectedSlots.find((dateSlots)=>{
        return dateSlots.interviewDate === this.state.selectedDate;
      });
    }

    handleCalendarDateClick=(event:any)=>{
      this.setState({selectedDate:this.formatDate(event.toLocaleDateString())});
       

    }

    handleAddSlotButtonClick=(slot:string)=>{
      let slotTOBeAdded:InterviewSlotModel = {
        interviewDate :"",
        interviewStartTimes:[]

      }

    
       this.setState({slotsPerDay:
            this.state.slotsPerDay.filter((islot:string)=>{
             return islot !== slot
            })
            
    })
    }

   render(){
        return (
            <Stack p={100}  >
                 <Heading  size = 'sm' color='#0b294e' >SET AVAILABILITY<hr style = {{ height:'2px',
                   backgroundColor : '#d1e0ef'}}/></Heading>
                     <Box   color='#0b294e' height='sm' style={{alignItems:"center"}}  borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl">
                       <HStack style = {{alignItems:"center"}}>
                      
                      <Box p={10} color='#0b294e' height='sm' style={{alignItems:"center"}} >
                          <Calendar view='month'
                            onClickDay={(event)=>{this.handleCalendarDateClick(event)} }></Calendar>
                      </Box>                   
                    <Box>
                      <Box className='scroll'   style={{overflowY :'scroll',alignItems:"center"}} width="56" height='xs' p={10} color='#0b294e' >
                          <Stack style = {{alignItems:"center"}}>
                          <Heading  size = 'xs'  color='#0b294e' >OPEN SLOTS</Heading>
                        <br /><br />
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
                    <Box className='scroll'  width="sm" height='xs' style={{overflowY :'scroll',alignItems:"center"}} p={20} color='#0b294e' >
                        <Stack style = {{alignItems:"center"}}>
                        <Heading  size = 'xs'  color='#0b294e' >SELECTED SLOTS</Heading>
                        <br /><br />
                           {this.state.selectedSlots.map((slot:InterviewSlotModel)=>{
                               return <Stack>
                                         <span key={slot.interviewDate}>{slot.interviewDate}</span>
                                         {slot.interviewStartTimes.map((slotTime)=>{
                                         <HStack spacing={40}>
                                           <Button disabled  variant='solid' key={slotTime} style={{borderWidth:"1px", height:'8mm', width:'18mm' ,borderColor:'#0b294e'  }}>
                                           {slotTime}  </Button>
                                            <DeleteIcon/>
                                        </HStack> 
                                         })}
                                        </Stack> 
                        
                            })
                                }
                            <br /><br /><br />
                         </Stack>                   
                   </Box>
                   </HStack>
                   </Box>
                   <Button  bg='#0b294e' color='white' width='min-content' size='sm'>Confirm slots</Button>               
                     
              </Stack>
        );
    }

}