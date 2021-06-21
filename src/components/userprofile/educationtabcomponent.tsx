import React from "react";
import {EducationModel} from './UserProfileComponent';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,Box,Stack,Heading,HStack,Button,
  } from "@chakra-ui/react";
  import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
  

class EducationTabComponent extends React.Component<any,any> {

    state={
        uniEducationList:[] as EducationModel[],
        secondaryEdu:{} as EducationModel,
        srSecEducation:{} as EducationModel, 
        scSchool:"",
        scDegree:"Secondary Certificate",
        scStream:"",
        scPercent:"",
        scYearOfCompletion:"",
        scCountry:"",
        srSchool:"",
        srDegree:"Senior Secondary Certificate",
        srStream:"",
        srPercent:"",
        srYearOfCompletion:"",
        srCountry:"",
        unSchool:"",
        unDegree:"",
        unStream:"",
        unPercent:"",
        unYearOfCompletion:"",
        unCountry:""
    }
       
   checkFormCompleteAndSendSecondaryData=()=>{
       if(
           this.state.scCountry!==""&&
           this.state.scDegree!==""&&
           this.state.scPercent!==""&&
           this.state.scSchool!==""&&
           this.state.scStream!==""&&
           this.state.scYearOfCompletion!==""
       ){
           let education:EducationModel = { 
               degreeName: this.state.scDegree,
               percentage:this.state.scPercent,
               completionYear:this.state.scYearOfCompletion,
               schoolName:this.state.scSchool,
               stream:this.state.scStream,
               country:this.state.scCountry,
               eduType:"SCHOOL"
                                    }
           this.setState({secondaryEdu:education});
           this.props.onAddSecSchool(education);
       }
   } 

 checkFormCompleteAndSendSeniorData=()=>{
    if(
        this.state.scCountry !=="" &&
        this.state.scDegree !=="" &&
        this.state.scPercent !=="" &&
        this.state.scSchool !=="" &&
        this.state.scStream !=="" &&
        this.state.scYearOfCompletion!==""
    ){
       
        let education:EducationModel = { 
            degreeName: this.state.scDegree,
            percentage:this.state.scPercent,
            completionYear:this.state.scYearOfCompletion,
            schoolName:this.state.scSchool,
            stream:this.state.scStream,
            country:this.state.scCountry,
            eduType:"SCHOOL" };
        this.setState({srSecEducation:education});
        this.props.onAddSecSchool(education);
    }
    
 } 

 checkFormCompleteAndSendUniversData=()=>{

 }


 universityTile=()=>{
     return(
      <Stack>
        <HStack>
        <Stack>
        <Input placeholder='University Name' type = 'text' width='xs' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unSchool:event.target.value})}} value={this.state.unSchool}  ></Input>
        <Input placeholder='Degree Name' type = 'text' width='xs'  variant='filled' size='xs'
        onChange={(event)=>{this.setState({unDegree:event.target.value})}} value={this.state.unDegree}  ></Input>
        </Stack>
        <Stack>
        <Input placeholder='Stream' type = 'text' width='xs' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unStream:event.target.value})}} value={this.state.unStream}  ></Input>
        <Input  placeholder='Percentage' type = 'text' width='xs' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unPercent:event.target.value})}} value={this.state.unPercent}  ></Input>
        </Stack>
        <Stack>
        <Input  placeholder='Year of completion' type = 'text' width='xs' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unYearOfCompletion:event.target.value})}} value={this.state.unYearOfCompletion}  ></Input>
        <Input  placeholder='Country' type = 'text' width='xs' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unCountry:event.target.value})}} value={this.state.unCountry}  ></Input>
        </Stack> 
        </HStack> 
        <hr style = {{ height:'2px', backgroundColor : '#d1e0ef'}}/>
        </Stack>
     );
 }

    render(){
      
        return(
            <Box margin=''  style={{alignItems:"center"}}  borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" >
            <Stack spacing={2} style={{margin:"20px 20px 20px 20px"}}>
            <Heading size = 'sm' >SCHOOL EDUCATION<hr style = {{ height:'2px',
                    backgroundColor : '#d1e0ef'}}/></Heading>
                   <HStack>
                   <Stack>
                    <Input placeholder='School Name' value={this.state.scSchool} type = 'text' onBlur={()=>{this.checkFormCompleteAndSendSecondaryData()}}
                    width='xs' variant='filled' size='xs' onChange={(event)=>{this.setState({scSchool:event.target.value})}}></Input>
                    <Input isReadOnly  placeholder='Secondary Certificate' value={this.state.scDegree} type = 'text' width='xs'  variant='filled' 
                     size='xs'></Input>
                    </Stack>
                    <Stack>
                    <Input placeholder='Stream' value={this.state.scStream} type = 'text' onBlur={()=>{this.checkFormCompleteAndSendSecondaryData()}}
                    onChange={(event)=>{this.setState({scStream:event.target.value})}} width='xs' variant='filled' size='xs'></Input>
                    <Input  placeholder='Percentage' value={this.state.scPercent} type = 'text' onBlur={()=>{this.checkFormCompleteAndSendSecondaryData()}}
                     onChange={(event)=>{this.setState({scPercent:event.target.value})}} width='xs' variant='filled' size='xs'></Input>
                    </Stack>
                    <Stack>
                    <Input  placeholder='Year of completion' value={this.state.scYearOfCompletion} type = 'text' onBlur={()=>{this.checkFormCompleteAndSendSecondaryData()}}
                    onChange={(event)=>{this.setState({scYearOfCompletion:event.target.value})}} width='xs' variant='filled' size='xs'></Input>
                    <Input  placeholder='Country' value={this.state.scCountry} type = 'text' width='xs' onBlur={()=>{this.checkFormCompleteAndSendSecondaryData()}}
                     onChange={(event)=>{this.setState({scCountry:event.target.value})}} variant='filled' size='xs'></Input>
                    </Stack>
                    </HStack> 
                    
                    <hr style = {{ height:'2px', backgroundColor : '#d1e0ef'}}/>
                    
                    <HStack>
                   <Stack>
                    <Input placeholder='School Name' value={this.state.srSchool} type = 'text' onBlur={()=>{this.checkFormCompleteAndSendSeniorData()}}
                    onChange={(event)=>{this.setState({srSchool:event.target.value})}} width='xs' variant='filled' size='xs'></Input>
                    <Input isReadOnly placeholder='Senior Secondary Certificate' value={this.state.srDegree} type = 'text' onBlur={()=>{this.checkFormCompleteAndSendSeniorData()}}
                    width='xs'  variant='filled' size='xs'></Input>
                    </Stack>
                    <Stack>
                    <Input  placeholder='Stream' value={this.state.srStream} type = 'text' width='xs' onBlur={()=>{this.checkFormCompleteAndSendSeniorData()}}
                     onChange={(event)=>{this.setState({srStream:event.target.value})}} variant='filled' size='xs'></Input>
                    <Input  placeholder='Percentage' value={this.state.srPercent} type = 'text' width='xs' onBlur={()=>{this.checkFormCompleteAndSendSeniorData()}}
                    onChange={(event)=>{this.setState({srPercent:event.target.value})}} variant='filled' size='xs'></Input>
                    </Stack>
                    <Stack>
                    <Input  placeholder='Year of completion' value={this.state.srYearOfCompletion} type = 'text' onBlur={()=>{this.checkFormCompleteAndSendSeniorData()}}
                    onChange={(event)=>{this.setState({srYearOfCompletion:event.target.value})}} width='xs' variant='filled' size='xs'></Input>
                    <Input  placeholder='Country' value={this.state.srCountry} type = 'text' width='xs' onBlur={()=>{this.checkFormCompleteAndSendSeniorData()}}
                    onChange={(event)=>{this.setState({srCountry:event.target.value})}} variant='filled' size='xs'></Input>
                    </Stack>
                    </HStack> 
            <Heading size = 'sm' >UNIVERSITY EDUCATION &nbsp;
             <Button variant='link' size='xs'> <AddIcon/>Add</Button>
            <hr style = {{ height:'2px',
                    backgroundColor : '#d1e0ef'}}/></Heading>
          {this.universityTile()} {this.universityTile()}
         
            </Stack>
            </Box> 
        );
    }
}
export default EducationTabComponent;