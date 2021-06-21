import React from "react";
import {EducationModel} from './UserProfileComponent';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,Box,Stack,Heading,HStack,Button,createStandaloneToast
  } from "@chakra-ui/react";
  import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
  
const toast = createStandaloneToast();

class EducationTabComponent extends React.Component<any,any> {

    state={
        universeTileList:[1],
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
        unCountry:"",
        isFormCompleted:false
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
           this.setState({secondaryEdu:education},this.formSuccess);
           this.props.onAddSecSchool(education);
       }
       else{
           this.formInComplete();
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
        this.setState({uniEducationList:[...this.state.uniEducationList,...[education]]
            ,isFormCompleted:true},this.formSuccess);
        this.props.onAddUniverse(education);
    }
    else{
        this.formInComplete();
    }
    
 } 

 checkFormCompleteAndSendUniversData=()=>{
    if(
        this.state.unCountry !=="" &&
        this.state.unDegree !=="" &&
        this.state.unPercent !=="" &&
        this.state.unSchool !=="" &&
        this.state.unStream !=="" &&
        this.state.unYearOfCompletion!==""
    ){
            let education:EducationModel = { 
                degreeName: this.state.unDegree,
                percentage:this.state.unPercent,
                completionYear:this.state.unYearOfCompletion,
                schoolName:this.state.unSchool,
                stream:this.state.unStream,
                country:this.state.unCountry,
                eduType:"UNIVERSITY" };

            this.setState({srSecEducation:education},this.formSuccess);
            this.props.onAddSecSchool(education);
      }
        else{
            this.formInComplete();
        }

    }

 PlusIconClickHandler=()=>{
    if(this.state.isFormCompleted){
      let countArr=[...this.state.universeTileList,[1]];
      this.setState({workExTileList:countArr});
      this.setState({isFormCompleted:false});
    }
    else{
      this.formAddError();
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


 universityTile=()=>{
     return(
      <Stack>
        <HStack>
        <Stack>
        <Input placeholder='University Name' type = 'text' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unSchool:event.target.value})}} value={this.state.unSchool}  ></Input>
        <Input placeholder='Degree Name' type = 'text' width='72'  variant='filled' size='xs'
        onChange={(event)=>{this.setState({unDegree:event.target.value})}} value={this.state.unDegree}  ></Input>
        </Stack>
        <Stack>
        <Input placeholder='Stream' type = 'text' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unStream:event.target.value})}} value={this.state.unStream}  ></Input>
         <Input  placeholder='Country' type = 'text' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unCountry:event.target.value})}} value={this.state.unCountry}  ></Input>
       </Stack>
        <Stack>
        <Input  placeholder='Percentage' type = 'text' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unPercent:event.target.value})}} value={this.state.unPercent}  ></Input>
        
        <Input  placeholder='Year of completion' type = 'text' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unYearOfCompletion:event.target.value})}} value={this.state.unYearOfCompletion}  ></Input>
        </Stack> 
        <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' size='xs' 
                   onClick={this.formSuccess} >save</Button>
        </HStack> 
        <hr style = {{ height:'2px', backgroundColor : '#d1e0ef'}}/>
        </Stack>
     );
 }

    render(){
      
        return(
            <Box width='6xl' height='96'  style={{alignItems:"center"}}  borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" >
            <Stack spacing={2} style={{margin:"20px 20px 20px 20px"}}>
            <Heading size = 'sm' >SCHOOL EDUCATION<hr style = {{ height:'2px',
                    backgroundColor : '#d1e0ef'}}/></Heading>
                   <HStack>
                   <Stack>
                    <Input placeholder='School Name' value={this.state.scSchool} type = 'text' onBlur={this.checkFormCompleteAndSendSecondaryData}
                    width='72' variant='filled' size='xs' onChange={(event)=>{this.setState({scSchool:event.target.value})}}></Input>
                    <Input isReadOnly  placeholder='Secondary Certificate' value={this.state.scDegree} type = 'text' width='72'  variant='filled' 
                     size='xs'></Input>
                    </Stack>
                    <Stack>
                    <Input placeholder='Stream' value={this.state.scStream} type = 'text'
                    onChange={(event)=>{this.setState({scStream:event.target.value})}} width='72' variant='filled' size='xs'></Input>
                     <Input  placeholder='Country' value={this.state.scCountry} type = 'text' width='72' 
                     onChange={(event)=>{this.setState({scCountry:event.target.value})}} variant='filled' size='xs'></Input>
                  
                   </Stack>
                    <Stack>
                    <Input  placeholder='Percentage' value={this.state.scPercent} type = 'text' 
                     onChange={(event)=>{this.setState({scPercent:event.target.value})}} width='72' variant='filled' size='xs'></Input>
                   
                   
                    <Input  placeholder='Year of completion' value={this.state.scYearOfCompletion} type = 'text' 
                    onChange={(event)=>{this.setState({scYearOfCompletion:event.target.value})}} width='72' variant='filled' size='xs'></Input>
                      </Stack>
                      <Button onClock={this.checkFormCompleteAndSendSecondaryData} variant='solid' backgroundColor='#d1e0ef' width = '30mm' size='xs'
                       onClick={this.formSuccess} >save</Button>
                    </HStack> 
                    
                    <hr style = {{ height:'2px', backgroundColor : '#d1e0ef'}}/>
                    
                    <HStack>
                   <Stack>
                    <Input placeholder='School Name' value={this.state.srSchool} type = 'text' 
                    onChange={(event)=>{this.setState({srSchool:event.target.value})}} width='72' variant='filled' size='xs'></Input>
                    <Input isReadOnly placeholder='Senior Secondary Certificate' value={this.state.srDegree} type = 'text' 
                    width='72'  variant='filled' size='xs'></Input>
                    </Stack>
                    <Stack>
                    <Input  placeholder='Stream' value={this.state.srStream} type = 'text' width='72' 
                     onChange={(event)=>{this.setState({srStream:event.target.value})}} variant='filled' size='xs'></Input>
                       <Input  placeholder='Country' value={this.state.srCountry} type = 'text' width='72' 
                    onChange={(event)=>{this.setState({srCountry:event.target.value})}} variant='filled' size='xs'></Input>
                  
                    </Stack>
                    <Stack>
                    <Input  placeholder='Percentage' value={this.state.srPercent} type = 'text' width='72' 
                    onChange={(event)=>{this.setState({srPercent:event.target.value})}} variant='filled' size='xs'></Input>
                                    
                    <Input  placeholder='Year of completion' value={this.state.srYearOfCompletion} type = 'text' 
                    onChange={(event)=>{this.setState({srYearOfCompletion:event.target.value})}} width='72' variant='filled' size='xs'></Input>
                   </Stack>
                   <Button onClick={this.checkFormCompleteAndSendSeniorData} variant='solid' backgroundColor='#d1e0ef' width = '30mm' size='xs'>save</Button>
                    </HStack> 
            <Heading size = 'sm' >UNIVERSITY EDUCATION &nbsp;
             <Button variant='link' size='xs' onClick={this.PlusIconClickHandler}> <AddIcon/>Add</Button>
            <hr style = {{ height:'2px',
                    backgroundColor : '#d1e0ef'}}/></Heading>
                    {this.state.universeTileList.map(()=>{
                        return this.universityTile();
                    })}
         
            </Stack>
            </Box> 
        );
    }
}
export default EducationTabComponent;