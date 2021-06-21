import React from "react";
import {WorkExperienceModel} from "./UserProfileComponent";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea,
    Stack,
    Text,
    InputLeftAddon,
    InputGroup  ,
    Checkbox, CheckboxGroup ,Wrap,WrapItem,
    Heading,Box,HStack,Button,CloseButton
  } from "@chakra-ui/react";
 

  class WorkExperienceTabComponent extends React.Component<any,any> { 

    state={
      workExList : [] as WorkExperienceModel[],
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
      isCurrentEmployeeSet:false
    }

    handleCompleteButtonClick=()=>{
      console.log( this.state.companyName +" "+this.state.industry+" "+this.state.role 
      +" "+this.state.position+" "+this.state.responsibilities+" "+" "+this.state.joiningDate+" "+this.state.endingDate);

      if( ( this.state.companyName !=="" 
        && this.state.industry !=="" 
        && this.state.role !=="" 
        && this.state.position !=="" 
        && this.state.responsibilities !=="" 
        && this.state.joiningDate !=="" 
        && this.state.endingDate !=="" ) || true){
         
          let workEx  = {
            companyName:this.state.companyName,
            industry:this.state.industry,
            role:this.state.role,
            position:this.state.position,
            responsibilities:this.state.responsibilities,
            joiningDate:this.state.joiningDate,
            endingDate:this.state.endingDate,
            isCurrentEmployee:this.state.isCurrentEmployee
          };
          
          let workExArray : WorkExperienceModel[]  = [workEx] ;
          this.state.workExList.reverse().map((workX)=>{
            workExArray.unshift(workX);
          });
           
          this.props.onAddWorkEx(workEx);

          this.setState({ companyName:"",
          industry:"",
          role:"",
          position:"",
          responsibilities:"",
          joiningDate:"",
          endingDate:"",
          isCurrentEmployee:false,
          workExList:workExArray},this.print);
        }
    }

    print(){
      console.log(JSON.stringify(this.state.workExList));
    }
    handleCheckBoxInput=(event:React.ChangeEvent<HTMLInputElement>)=>{           
          this.setState({isCurrentEmployee:true});
          this.props.onAddWorkEx(event.target.value);          
    }

    workExTile = (workX:WorkExperienceModel,index:number)=>{ 
               return( <Box bg='#e2e8f0' style={{margin:"5px 5px 5px 5px"}} key={index} borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl">
                    <Stack spacing={1}  style={{margin:"5px 5px 5px 5px"}}>
                    <Text isTruncated width="60" fontSize='sm'>{'Company Name :'+ workX.companyName}</Text>
                      <Text isTruncated width="60"  fontSize='sm'>{'Industry :'+workX.industry}</Text>
                      <Text isTruncated width="60"  fontSize='sm'>{'Role :'+workX.role}</Text>
                      <Text isTruncated width="60"  fontSize='sm'>{'Position :'+workX.position}</Text>                     
                      <Text isTruncated width="60" fontSize='sm'>{'Responsibilities :'+workX.responsibilities}</Text>
                      <Text isTruncated width="60"  fontSize='sm'>{'Joining Date :'+workX.joiningDate}</Text>
                      <Text isTruncated width="60"  fontSize='sm'>{'Ending Date :'+workX.endingDate}</Text>                      
                 </Stack>
                 </Box>);
    }

    render(){
      
        return (
         
            <Box borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" width='full'>       
            <HStack>     
              <Stack spacing={1} style={{margin:"10px 20px 20px 20px"}}>
                <Heading size = 'md' > WORK EXPERIENCE <hr style = {{ height:'2px',
                backgroundColor : '#d1e0ef'}}/></Heading> 
                                    
            <Input type = 'text' width='xs' onChange={(event)=>{this.setState({companyName:event.target.value})}} 
             value={this.state.companyName} size='sm' placeholder="Company Name" variant='filled'/>
                       
             <Input type = 'text' width='xs' size='sm'  onChange={(event)=>{this.setState({industry:event.target.value})}} 
               value={this.state.industry} placeholder="Industry" variant='filled'/>
               
             <Input type = 'text' width='xs' size='sm'  onChange={(event)=>{this.setState({role:event.target.value})}} 
                 value={this.state.role}   placeholder="Role"  variant='filled'/>
                   
             <Input type = 'text' width='xs' size='sm'  onChange={(event)=>{this.setState({position:event.target.value})}}  
                  value={this.state.position}  placeholder="Position" variant='filled'/>
                    
            <Textarea placeholder="Responsibilities"  onChange={(event)=>{this.setState({responsibilities:event.target.value})}} 
                 value={this.state.responsibilities}  width='xs' size='sm' variant='filled'/>
                    
            <Input width='xs' size='sm'  type = {this.state.joiningDateType} onFocus={()=>{ this.setState({joiningDateType : "Date"})}}  
             onBlur={()=>{this.setState({joiningDateType : "text"})}} value={this.state.joiningDate}
             onChange={(event)=>{this.setState({joiningDate:event.target.value})}}  placeholder="Joining Date" variant='filled' />
         
            <Input  width='xs' size='sm' type = {this.state.endingDateType} onFocus={()=>{ this.setState({endingDateType : "Date"});}}  
               onBlur={()=>{this.setState({endingDateType : "text"})}} value={this.state.endingDate}
               onChange={(event)=>{this.setState({endingDate:event.target.value})}} placeholder="Ending Date" variant='filled' />
                                   
             <HStack>
           
              <Checkbox disabled={this.props.isCurrEmpSet } onChange={(event)=>(this.handleCheckBoxInput(event))} >I am currently working here</Checkbox>
            
            <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.handleCompleteButtonClick()}}>Add</Button>
            </HStack>
           </Stack>
           <Wrap spacing={1}>
           {this.state.workExList.map((workX:WorkExperienceModel,index)=>{
             return   <WrapItem>{this.workExTile(workX,index)}</WrapItem> 
           })
           }
           </Wrap>
           </HStack> 
          
        </Box>  
        );
    }
  }

  export default WorkExperienceTabComponent;