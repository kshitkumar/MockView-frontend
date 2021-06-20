import React from "react";
import { AwardModel } from "./userprofiletabscomponent";
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
    InputGroup  ,Center,
    Checkbox, CheckboxGroup ,Wrap,WrapItem,
    Heading,Box,HStack,Button,CloseButton,Select,
  } from "@chakra-ui/react";
import { thisExpression } from "@babel/types";

 
export default class AwardCertTabComponent extends React.Component{

    
    
    state={
        awardName:"",
        awardCategory:"",
        awardOrg:"",
        awardRecDate:"",
        awardType:"",
        RecDateType:"text",
        awardList:[] as AwardModel[]
    }
    awardTile = (award:AwardModel,index:number)=>{ 
        return( <Box bg='#e2e8f0' style={{margin:"5px 5px 5px 5px"}} key={index} borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl">
             <Stack spacing={1}  style={{margin:"5px 5px 5px 5px"}}> 
            <Text  isTruncated width="60" fontSize='xl' fontWeight='semibold'>{award.awardType}</Text>           
             <Text isTruncated width="60" fontSize='sm'>{'Name :'+ award.awardName}</Text>
            <Text isTruncated width="60"  fontSize='sm'>{' Category :'+award.awardCategory}</Text>
            <Text isTruncated width="60"  fontSize='sm'>{' Organisation :'+award.awardOrg}</Text>
            <Text isTruncated width="60"  fontSize='sm'>{' Receiving Date :'+award.awardRecDate}</Text>                                         
          </Stack>
          </Box>);
}

    HandleAddAwardClick=()=>{

        if(this.state.awardName!==""
           && this.state.awardOrg!==""
           && this.state.awardCategory!==""
           && this.state.awardType!==""
           && this.state.awardRecDate || true){
              
            let award : AwardModel = {  awardName:this.state.awardName,
                                    awardCategory:this.state.awardCategory,
                                    awardOrg:this.state.awardOrg,
                                    awardRecDate:this.state.awardRecDate,
                                    awardType:this.state.awardType};
            let awardArray : AwardModel[] = [award];
            this.state.awardList.reverse().map((awardX:AwardModel)=>{
                awardArray.unshift(awardX);
            });
               this.setState({awardList:awardArray},this.print); 
           }
    }
    print(){
        console.log(JSON.stringify(this.state.awardList)+"   kya karu");
    }
    render(){
        return(
            <Box borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" width='full'>       
            
            <HStack>
            <Stack spacing={8} style={{margin:"20px 20px 20px 20px"}}>
                <Heading size = 'md' > AWARDS & CERTIFICATIONS <hr style = {{ height:'2px',
                backgroundColor : '#d1e0ef'}}/></Heading> 
            <Select value={this.state.awardType} onChange={(event)=>{this.setState({awardType:event.target.value})}}
                onLoad={()=>{this.setState({awardType:"Award"})}} placeholder='-Select type-' >
                <option value="Award">Award</option>
                <option value="Certificate">Certificate</option>
            </Select>
             <Input type = 'text' width='xs' onChange={(event)=>{this.setState({awardName:event.target.value})}} 
             value={this.state.awardName} size='sm' placeholder="Award/Ceritificate Name" variant='filled'/>
             <Input type = 'text' width='xs' onChange={(event)=>{this.setState({awardCategory:event.target.value})}} 
             value={this.state.awardCategory} size='sm' placeholder="Award/Ceritificate Category" variant='filled'/>
             <Input type = 'text' width='xs' onChange={(event)=>{this.setState({awardOrg:event.target.value})}} 
             value={this.state.awardOrg} size='sm' placeholder="Award/Ceritificate Organisation" variant='filled'/>
             <Input type = {this.state.RecDateType} onFocus={()=>{this.setState({RecDateType:"Date"})}}
              onBlur={()=>{this.setState({RecDateType:"text"})}} value={this.state.awardRecDate}
              width='xs' onChange={(event)=>{this.setState({awardRecDate:event.target.value})}} 
              size='sm' placeholder="Award/Ceritificate Receiving Date" variant='filled'/>          
            <Stack alignItems="center">
             <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.HandleAddAwardClick()}}>Add</Button>
             </Stack>
            </Stack>
            <Wrap>
            {this.state.awardList.map((award:AwardModel,index)=>{
               return <WrapItem>{this.awardTile(award,index)}</WrapItem> 
            })}
            </Wrap>
            </HStack>
          
           </Box>
        );
    }
}