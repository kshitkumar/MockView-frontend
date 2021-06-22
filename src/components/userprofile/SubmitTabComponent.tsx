import React from "react";
import {Stack,Box,Heading,Button,HStack,Text,Table,Tbody,Tr,Td, Center} from "@chakra-ui/react";
import {User} from '../../models/User'
import {EducationModel} from '../../models/EducationModel';
import { WorkExperienceModel } from '../../models/WorkExperienceModel';
import { SkillModel } from '../../models/SkillModel';
import { AwardModel } from '../../models/AwardModel';

export default class SubmitTabComponent extends React.Component<any,any>{
      
    render(){  
        return (
        <Box p={3}  color='blue.800' width='6xl' height='96' maxHeight='max-content'   borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" >
          <Stack style={{justifyItems:'center'}}>
           <Table variant="simple" size='xs' fontSize='xs'>
               <Tbody>
                 <Tr>
                    <Td><Heading size = 'xs' > BIO </Heading></Td>
                    <Td>
                        <Tr>{this.props.user.firstName +" "+this.props.user.lastName }</Tr>
                        <Tr>{"Age: "+ this.props.userAge}</Tr>
                    </Td>
                    <Td>
                        <Tr>{"Gender: "+this.props.user.gender}</Tr>
                        <Tr>{"Date of Birth: "+this.props.user.dateOfBirth }</Tr>
                    </Td>
                  </Tr>
                  <Tr>
                      <Td><Heading size = 'xs' > CONTACT INFORMATION  </Heading> </Td>
                      <Td>
                          <Tr>{this.props.user.phoneNumber}</Tr>
                          <Tr>{this.props.user.emailId}</Tr>
                      </Td>
                      <Td>{this.props.address.city+','
                      +this.props.address.state+','
                      +this.props.address.country+','
                      +this.props.address.pinCode}</Td>
                  </Tr>
                  <Tr>
                      <Td><Heading size = 'xs' >SCHOOL EDUCATION</Heading></Td>
                      <Td>
                          <Tr>{this.props.scSchoolEdu.percentage+','+this.props.scSchoolEdu.degreeName}</Tr>
                          <Tr>{this.props.srSchoolEdu.percentage+','+this.props.srSchoolEdu.degreeName}</Tr>
                      </Td>
                      <Td>
                          <Tr>{this.props.scSchoolEdu.schoolName+','+this.props.scSchoolEdu.country+','+this.props.scSchoolEdu.completionYear}</Tr>
                          <Tr>{this.props.srSchoolEdu.schoolName+','+this.props.srSchoolEdu.country+','+this.props.srSchoolEdu.completionYear}</Tr>                     
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Heading size = 'xs' >UNIVERSITY EDUCATION </Heading></Td>
                      <Td>
                          {this.props.uniEducationList.map((universe:EducationModel,index:number)=>{
                              return <Tr key={index}>{universe.percentage+','+universe.degreeName}</Tr>
                          })}
                      </Td>
                      <Td>
                          {this.props.uniEducationList.map((universe:EducationModel,index:number)=>{
                              return <Tr key={index}>{universe.schoolName+','+universe.country+','+universe.completionYear}</Tr>
                          })}
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Heading size = 'xs'> WORK EXPERIENCE</Heading> </Td>
                      <Td>
                          {this.props.workExperinceList.map((workX:WorkExperienceModel)=>{
                             return <Tr>{`${workX.position} at  ${workX.companyName} from
                              ${workX.joiningDate} to ${workX.isCurrentEmployee?'Current':workX.endingDate }` }</Tr> 
                          })}
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Heading size = 'xs' >SKILLS</Heading></Td>
                      <Td>
                        {this.props.skillsBadge.map((skill:SkillModel)=>{
                            return skill.skillName+ '-' + skill.skillProf +'. '                                   
                        })}
                      </Td>
                  </Tr>
                  <Tr>
                      <Td> <Heading size = 'xs' >LANGUAGES</Heading></Td>
                      <Td>
                        {this.props.languageBadge.map((language:SkillModel)=>{
                            return language.skillName+ '-' + language.skillProf +'. '            
                        })} 
                      </Td>
                  </Tr>
                  <Tr>
                      <Td> <Heading size = 'xs' >HOBBIES</Heading></Td>
                      <Td>
                        {this.props.hobbiesBadge.map((hobby:string)=>{
                            return  hobby+'. '              
                         })} 
                      </Td>
                  </Tr>
                  <Tr>
                      <Td> <Heading size = 'xs' > AWARDS & CERTIFICATIONS </Heading> </Td> 
                       <Td>
                            {this.props.awardList.map((award:AwardModel)=>{
                                 return <Tr>{`${award.awardName} ${award.awardType} from ${award.awardOrg} on ${award.awardRecDate}`}</Tr>
                            })}
                       </Td>                       
                 </Tr>    
               
                </Tbody>             
           </Table>          
           <Button  bg='#0b294e' color='white' width='min-content' size='sm'>Confirm Profile and Save</Button>               
           </Stack>
        </Box>
        );
    }
    

}