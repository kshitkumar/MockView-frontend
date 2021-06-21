import React from "react";
import {WorkExperienceModel} from "./UserProfileComponent";
import {
   
    Input,
    Textarea,
    Stack,
    Text,
    InputLeftAddon,
    InputGroup  ,
    Checkbox, CheckboxGroup ,Wrap,WrapItem,
    Heading,Box,HStack,Button,CloseButton,createStandaloneToast
  } from "@chakra-ui/react";
  import { PhoneIcon, AddIcon, WarningIcon, MinusIcon } from '@chakra-ui/icons'
 
  const toast = createStandaloneToast();
  class WorkExperienceTabComponent extends React.Component<any,any> { 

    state={
      workExList : [] as WorkExperienceModel[],
      workExTileList :[1],
      joiningDateType : "text",
      endingDateType : "text" ,
      companyName:"",
      industry:"",
      role:"",
      position:"",
      responsibilities:"",
      joiningDate:"",
      endingDate:"",
      isCurrentEmployee:false,
      isCurrentEmpSet:false,
      isFormCompleted:false
    }

    handleDoneButtonClick=()=>{
      if(this.state.isCurrentEmployee && !this.state.isCurrentEmpSet){
        this.setState({isCurrentEmpSet:true});
      }
      if( this.state.companyName !=="" 
        && this.state.industry !=="" 
        && this.state.role !=="" 
        && this.state.position !=="" 
        && this.state.responsibilities !=="" 
        && this.state.joiningDate !=="" 
        && this.state.endingDate !=="")
        {                   
          let workEx : WorkExperienceModel  = {
            companyName:this.state.companyName,
            industry:this.state.industry,
            role:this.state.role,
            position:this.state.position,
            responsibilities:this.state.responsibilities,
            joiningDate:this.state.joiningDate,
            endingDate:this.state.endingDate,
            isCurrentEmployee:this.state.isCurrentEmployee,
            isCurrentEmpSet:this.state.isCurrentEmpSet
          };         
          let workExArray : WorkExperienceModel[]  = [...this.state.workExList,workEx] ;
          this.state.workExList.reverse().map((workX)=>{
            workExArray.unshift(workX);
          });          
          this.props.onAddWorkEx(workEx);  
            this.setState({companyName:"",industry:"",role:"",position:"",responsibilities:"",
           joiningDate:"",isCurrentEmployee:false,workExList:workExArray,isFormCompleted:true},this.formSuccess);
        }

        else{
             this.formInComplete();
        }
    }

    formSuccess =()=>{    
      return(
        toast({
          title: "Form saved",         
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      );
    }

    formInComplete=()=>{
      return(
        toast({
          title: "Incomplete Form",
          description: "Please fill the form to save",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
    }

    PlusIconClickHandler=()=>{
     if(this.state.isFormCompleted){
       let countArr=[...this.state.workExTileList,[1]];
       this.setState({workExTileList:countArr});
       this.setState({isFormCompleted:false});
     }
     else{
       this.formAddError();
     }
    }

    formAddError=()=>{
      return(
        toast({
         description: "Please fill and save the empty form to add more",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
    }
     
    workExTile = ()=>{
      return ( <Box>
                <Stack>
                  <HStack>                     
                    <Input type = 'text' width='xs'
                     onChange={(event)=>{this.setState({companyName:event.target.value})}} 
                       size='xs' placeholder="Company Name" variant='filled'/>
                          
                    <Input type = 'text' width='xs' size='xs'  onChange={(event)=>{this.setState({industry:event.target.value})}} 
                       placeholder="Industry" variant='filled'/>
                  
                    <Input type = 'text' width='xs' size='xs'  onChange={(event)=>{this.setState({role:event.target.value})}} 
                      placeholder="Role"  variant='filled'/>
                 </HStack>  
                 
                 <HStack>
                    <Textarea  resize='none' placeholder="Responsibilities"  onChange={(event)=>{this.setState({responsibilities:event.target.value})}} 
                          width='xs' size='xs' variant='filled'/>

                      <Stack spacing={3.5}>

                      <Input width='xs' size='xs'  type = {this.state.joiningDateType} onFocus={()=>{ this.setState({joiningDateType : "Date"})}}  
                        onBlur={()=>{this.setState({joiningDateType : "text"})}} 
                        onChange={(event)=>{this.setState({joiningDate:event.target.value})}}  placeholder="Joining Date" variant='filled' />
                    
                      <Input  width='xs' size='xs' type = {this.state.endingDateType} onFocus={()=>{ this.setState({endingDateType : "Date"});}}  
                        onBlur={()=>{this.setState({endingDateType : "text"})}} 
                        onChange={(event)=>{this.setState({endingDate:event.target.value})}} placeholder="Ending Date" variant='filled' />
                                                      
                       </Stack>
                    <Stack spacing={3.5}>
                    <Input type = 'text' width='xs' size='xs'  onChange={(event)=>{this.setState({position:event.target.value})}}  
                           placeholder="Position" variant='filled'/>
                    <HStack>
                      <Checkbox onChange ={()=>{this.setState({isCurrentEmployee: !this.state.isCurrentEmployee})}}>
                      <Text fontSize='sm' bg='#e2e8f0' pr={1} pl={1}>Currently working here</Text>  </Checkbox>
                      <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' size='xs' onClick={()=>{this.handleDoneButtonClick()}}>Save</Button>
                    </HStack>
                  </Stack>
                </HStack> 
                  <hr style = {{ height:'2px', backgroundColor : '#d1e0ef'}}/>
                </Stack>
              </Box> );
    }
     
  

    render(){
      
        return (
         
            <Box borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" width='full'>       
                
              <Stack spacing={2} style={{margin:"10px 20px 20px 20px"}}>
                <Heading size = 'md' > WORK EXPERIENCE &nbsp;
                <Button  onClick={()=>{this.PlusIconClickHandler()}} variant='link' size='xs'> <AddIcon/>Add</Button>
                 <hr style = {{ height:'2px',
                backgroundColor : '#d1e0ef'}}/></Heading> 
                {
                 this.state.workExTileList.map(()=>{
                   return this.workExTile();
                 })
                }
               
                   </Stack>
             </Box>  
       
        );
    }
  }

  export default WorkExperienceTabComponent;