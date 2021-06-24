import React from "react";
import {EducationModel} from '../../models/EducationModel';
import { Input,Box,Stack,Heading,HStack,Button,createStandaloneToast } from "@chakra-ui/react";
import {AddIcon} from '@chakra-ui/icons'
import  '../../GlobalStyles/ScrollBar.css';

  
const toast = createStandaloneToast();

class EducationTabComponent extends React.Component<any,any> {

    state={
        universeTileList:[1],
        uniEducationList:[] as EducationModel[],
        secondaryEdu:{} as EducationModel,
        srSecEducation:{} as EducationModel, 
        scSchool:"",
        scDegree:"Grade 10",
        scStream:"General",
        scPercent:"",
        scYearOfCompletion:"",
        scCountry:"",
        srSchool:"",
        srDegree:"Grade 12",
        srStream:"General",
        srPercent:"",
        srYearOfCompletion:"",
        srCountry:"",
        unSchool:"",
        unDegree:"",
        unStream:"",
        unPercent:"",
        unYearOfCompletion:"",
        unCountry:"",
        isScFormCompleted:false ,
        isSrFormCompleted:false,
        isUnFormCompleted:false
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
               marks: parseInt(this.state.scPercent),
               year:parseInt(this.state.scYearOfCompletion),
               schoolName:this.state.scSchool,
               stream:this.state.scStream,
               country:this.state.scCountry,
               educationCategory:"SCHOOL"
                                    }
           this.setState({secondaryEdu:education},this.formSuccess);
           this.props.onAddSecSchool(education);
       }
       else{
           this.formAddError("Please fill the form to save");
       }
   } 


 checkFormCompleteAndSendSeniorData=()=>{
    if(
        this.state.srCountry !=="" &&
        this.state.srDegree !=="" &&
        this.state.srPercent !=="" &&
        this.state.srSchool !=="" &&
        this.state.srStream !=="" &&
        this.state.srYearOfCompletion!==""
    ){
            let education:EducationModel = { 
            degreeName: this.state.srDegree,
            marks:parseInt(this.state.srPercent),
            year:parseInt(this.state.srYearOfCompletion),
            schoolName:this.state.srSchool,
            stream:this.state.srStream,
            country:this.state.srCountry,
            educationCategory:"SCHOOL" };

            this.setState({srSecEducation:education},this.formSuccess);
            this.props.onAddSrSchool(education);       
    }
    else{
        this.formAddError("Please fill the for to save");
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
                marks:parseInt(this.state.unPercent),
                year:parseInt(this.state.unYearOfCompletion),
                schoolName:this.state.unSchool,
                stream:this.state.unStream,
                country:this.state.unCountry,
                educationCategory:"UNIVERSITY" };

                this.setState({uniEducationList:[...this.state.uniEducationList,education]
                        ,isUnFormCompleted:true},this.formSuccess);
                          this.props.onAddUniverse(education);           
      }
        else{
            this.formAddError("Please fill the form to save");
        }

    }

 PlusIconClickHandler=()=>{
    if(this.state.isUnFormCompleted){
      let countArr=[...this.state.universeTileList,1];
      this.setState({isUnFormCompleted:false, universeTileList:countArr,
        unDegree:"",unPercent:"",unYearOfCompletion:"",unSchool:"",unStream:"",unCountry:""
       });
    }
    else{
      this.formAddError("Please fill and save the empty form to add more");
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

  formAddError=(msg:string)=>{
    return(
      toast({
       description: msg,
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
        onChange={(event)=>{this.setState({unSchool:event.target.value})}} ></Input>
        <Input placeholder='Degree Name' type = 'text' width='72'  variant='filled' size='xs'
        onChange={(event)=>{this.setState({unDegree:event.target.value})}}   ></Input>
        </Stack>
        <Stack>
        <Input placeholder='Stream' type = 'text' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unStream:event.target.value})}}   ></Input>
         <Input  placeholder='Country' type = 'text' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unCountry:event.target.value})}}   ></Input>
       </Stack>
        <Stack>
        <Input   placeholder='Percentage' type = 'number' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unPercent:event.target.value})}}  ></Input>
        
        <Input  placeholder='Year of completion' type = 'number' width='72' variant='filled' size='xs'
        onChange={(event)=>{this.setState({unYearOfCompletion:event.target.value})}} ></Input>
        </Stack> 
        <Button color='white' variant='solid' backgroundColor='#0b294e' width = '30mm' size='xs' 
                   onClick={this.checkFormCompleteAndSendUniversData} >save</Button>
        </HStack> 
        <hr style = {{ height:'2px', backgroundColor : '#d1e0ef'}}/>
        </Stack>
     );
 }

    render(){      
        return(
            <Box className='scroll'  style={{overflowY :'scroll',alignItems:"center"}} width='6xl' height='96' borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" >
            <Stack spacing={2} style={{margin:"20px 20px 20px 20px"}}>
            <Heading size = 'sm' color='#0b294e'>SCHOOL EDUCATION<hr style = {{ height:'2px',
                    backgroundColor : '#d1e0ef'}}/></Heading>
                   <HStack>
                   <Stack>
                    <Input placeholder='School Name' value={this.state.scSchool} type = 'text' 
                    width='72' variant='filled' size='xs' onChange={(event)=>{this.setState({scSchool:event.target.value})}}></Input>
                    <Input isReadOnly  placeholder='Secondary Certificate' value={this.state.scDegree} type = 'text' width='72'  variant='filled' 
                     size='xs'></Input>
                    </Stack>
                    <Stack>
                    <Input isReadOnly placeholder='Stream' value={this.state.scStream} type = 'text'
                       width='72' variant='filled' size='xs'></Input>
                     <Input  placeholder='Country' value={this.state.scCountry} type = 'text' width='72' 
                     onChange={(event)=>{this.setState({scCountry:event.target.value})}} variant='filled' size='xs'></Input>
                  
                   </Stack>
                    <Stack>
                    <Input  placeholder='Percentage' value={this.state.scPercent} type = 'number' 
                     onChange={(event)=>{this.setState({scPercent:event.target.value})}} 
                     width='72' variant='filled' size='xs'></Input>
                   
                   
                    <Input  placeholder='Year of completion' value={this.state.scYearOfCompletion} type = 'number' 
                        onChange={(event)=>{this.setState({scYearOfCompletion:event.target.value})}} width='72' variant='filled' size='xs'></Input>
                      </Stack>
                      <Button color='white' onClick={this.checkFormCompleteAndSendSecondaryData} variant='solid' backgroundColor='#0b294e' width = '30mm' size='xs'
                        >save</Button>
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
                    <Input isReadOnly  placeholder='Stream' value={this.state.srStream} type = 'text' width='72' 
                       variant='filled' size='xs'></Input>
                       <Input  placeholder='Country' value={this.state.srCountry} type = 'text' width='72' 
                    onChange={(event)=>{this.setState({srCountry:event.target.value})}} variant='filled' size='xs'></Input>
                  
                    </Stack>
                    <Stack>
                    <Input  placeholder='Percentage' value={this.state.srPercent} type = 'number' width='72' 
                    onChange={(event)=>{
                      this.setState({srPercent:event.target.value})}} 
                    variant='filled' size='xs'></Input>
                                    
                    <Input  placeholder='Year of completion' value={this.state.srYearOfCompletion} type = 'number' 
                    onChange={(event)=>{this.setState({srYearOfCompletion:event.target.value})}} width='72' variant='filled' size='xs'></Input>
                   </Stack>
                   <Button color='white' backgroundColor='#0b294e' onClick={this.checkFormCompleteAndSendSeniorData} variant='solid'  width = '30mm' size='xs'>save</Button>
                    </HStack> 
            <Heading size = 'sm' color='#0b294e' >UNIVERSITY EDUCATION &nbsp;
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