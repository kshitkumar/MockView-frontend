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
                          <Tr>{this.props.scSchoolEdu.marks+'%,'+this.props.scSchoolEdu.degreeName}</Tr>
                          <Tr>{this.props.srSchoolEdu.marks+'%,'+this.props.srSchoolEdu.degreeName}</Tr>
                      </Td>
                      <Td>
                          <Tr>{this.props.scSchoolEdu.schoolName+','+this.props.scSchoolEdu.country+','+this.props.scSchoolEdu.year}</Tr>
                          <Tr>{this.props.srSchoolEdu.schoolName+','+this.props.srSchoolEdu.country+','+this.props.srSchoolEdu.year}</Tr>                     
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Heading size = 'xs' >UNIVERSITY EDUCATION </Heading></Td>
                      <Td>
                          {this.props.uniEducationList.map((universe:EducationModel,index:number)=>{
                              return <Tr key={index}>{universe.marks+'%,'+universe.degreeName}</Tr>
                          })}
                      </Td>
                      <Td>
                          {this.props.uniEducationList.map((universe:EducationModel,index:number)=>{
                              return <Tr key={index}>{universe.schoolName+','+universe.country+','+universe.year}</Tr>
                          })}
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Heading size = 'xs'> WORK EXPERIENCE</Heading> </Td>
                      <Td>
                          {this.props.workExperinceList.map((workX:WorkExperienceModel,index:number)=>{
                             return <Tr key={index}>{`${workX.position} at  ${workX.companyName} from
                              ${workX.joiningDate} to ${workX.currentEmployment?'Current':workX.endingDate }` }</Tr> 
                          })}
                      </Td>
                  </Tr>
                  <Tr>
                      <Td><Heading size = 'xs' >SKILLS</Heading></Td>
                      <Td>
                        {this.props.skillsBadge.map((skill:SkillModel,index:number)=>{
                            return <span key={index}>{ skill.name+ '-' + skill.proficiency +'. '  }  </span>                               
                        })}
                      </Td>
                  </Tr>
                  <Tr>
                      <Td> <Heading size = 'xs' >LANGUAGES</Heading></Td>
                      <Td>
                        {this.props.languageBadge.map((language:SkillModel,index:number)=>{
                            return <span key={index}> {language.name+ '-' + language.proficiency +'. ' } </span>          
                        })} 
                      </Td>
                  </Tr>
                  <Tr>
                      <Td> <Heading size = 'xs' >HOBBIES</Heading></Td>
                      <Td>
                        {this.props.hobbiesBadge.map((hobby:any,index:number)=>{
                            return <span key={index}> { hobby.name+'. ' }    </span>         
                         })} 
                      </Td>
                  </Tr>
                  <Tr>
                      <Td> <Heading size = 'xs' > AWARDS & CERTIFICATIONS </Heading> </Td> 
                       <Td>
                            {this.props.awardList.map((award:AwardModel,index:number)=>{
                                 return <Tr>{`${award.name} ${award.awardCategory} from ${award.organisation} on ${award.receivingDate}`}</Tr>
                            })}
                       </Td>                       
                 </Tr>    
               
                </Tbody>             
           </Table>          
         </Stack>
        </Box>
        );
    }
    

}