import React from "react";
import { AwardModel } from "../../models/AwardModel";
import {  
    Input,Stack,Text,createStandaloneToast,Wrap,WrapItem,Heading,Box,HStack,Button,Select,
  } from "@chakra-ui/react";

  const toast = createStandaloneToast();
export default class AwardCertTabComponent extends React.Component<any,any>{
   
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

    handleAddAwardClick=()=>{

        if(this.state.awardName!==""
           && this.state.awardOrg!==""
           && this.state.awardCategory!==""
           && this.state.awardType!==""
           && this.state.awardRecDate ){
              
            let award : AwardModel = {  awardName:this.state.awardName,
                                    awardCategory:this.state.awardCategory,
                                    awardOrg:this.state.awardOrg,
                                    awardRecDate:this.state.awardRecDate,
                                    awardType:this.state.awardType};
            let awardArray : AwardModel[] = [award];    
            this.state.awardList.reverse().map((awardX:AwardModel)=>{
                awardArray.unshift(awardX);
            });
               this.props.onAddAward(awardArray);
               this.setState({awardList:awardArray}); 
               this.setState({awardName:"",awardOrg:"",awardCategory:"",awardRecDate:""});
           }
           else{
            toast({
                description: "Please fill the form before saving",
                 status: "error",
                 duration: 5000,
                 isClosable: true,
               })
           }
    }
    render(){
        return(
            <Box borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" width='6xl' height='96'>       
            
            <Stack style={{margin:"20px 20px 20px 20px"}}>
          
                <Heading size = 'sm' > AWARDS & CERTIFICATIONS <hr style = {{ height:'2px',
                backgroundColor : '#d1e0ef'}}/></Heading> 
                <Stack>
                  <HStack>
                        <Select value={this.state.awardType} onChange={(event)=>{this.setState({awardType:event.target.value})}}
                            onLoad={()=>{this.setState({awardType:"Award"})}} placeholder='-Select type-' type ='text' width='xs' size='xs' variant='filled'>
                            <option value="Award">Award</option>
                            <option value="Certificate">Certificate</option>
                        </Select>
                        <Input type = 'text' width='xs' onChange={(event)=>{this.setState({awardName:event.target.value})}} 
                        value={this.state.awardName} size='xs' placeholder="Award/Ceritificate Name" variant='filled'/>
                        <Input type = 'text' width='xs' onChange={(event)=>{this.setState({awardCategory:event.target.value})}} 
                        value={this.state.awardCategory} size='xs' placeholder="Award/Ceritificate Category" variant='filled'/>
                 </HStack>
                 <HStack>
                        <Input type = 'text' width='xs' onChange={(event)=>{this.setState({awardOrg:event.target.value})}} 
                        value={this.state.awardOrg} size='xs' placeholder="Award/Ceritificate Organisation" variant='filled'/>
                        
                        <Input type = {this.state.RecDateType} onFocus={()=>{this.setState({RecDateType:"Date"})}}
                        onBlur={()=>{this.setState({RecDateType:"text"})}} value={this.state.awardRecDate}
                        width='xs' onChange={(event)=>{this.setState({awardRecDate:event.target.value})}} 
                        size='xs' placeholder="Award/Ceritificate Receiving Date" variant='filled'/>          
                        
                        <Button variant='solid' color='white' backgroundColor='#0b294e' size='xs' width = '30mm' onClick={()=>{this.handleAddAwardClick()}}>Add</Button>
                  </HStack>
                </Stack>   
           
            <Wrap>
               {this.state.awardList.map((award:AwardModel,index)=>{
               return <WrapItem>{this.awardTile(award,index)}</WrapItem> 
              })}
            </Wrap>
           </Stack>         
           </Box>
        );
    }
}