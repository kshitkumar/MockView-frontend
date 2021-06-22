import React ,{Component} from "react";
import PersonalInformationComponent from './PersonalInformationTabComponent';
import WorkExperienceTabComponent from './WorkExperienceTabComponent' ;
import SkillsTabComponent from './SkillsTabComponent';
import AwardCertTabComponent from "./AwardCertTabComponent";
import EducationTabComponent from "./EducationTabComponent";
import SubmitTabComponent from "./SubmitTabComponent";
import {ChevronLeftIcon,ChevronRightIcon, } from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Button ,Stack,Box,HStack,createStandaloneToast} from "@chakra-ui/react";
import { AwardModel } from "../../models/AwardModel";
import {WorkExperienceModel} from '../../models/WorkExperienceModel';
import {EducationModel} from '../../models/EducationModel';
import {SkillModel} from '../../models/SkillModel' ;
import {AddressModel} from '../../models/PersonalDetailModel';
import {User} from '../../models/User';

const toast = createStandaloneToast();

interface Props {
  isLoggedIn : boolean,
  user : User,
  onLogout() : void
}

export class UserProfileTabsComponent extends Component<any,any>  {

  constructor(props:any){
     super(props);
  }
  componentDidMount(){
    this.calculateAge();
  }
 
  state ={
    tabNo:5,
    workExperinceList:[] as WorkExperienceModel[] ,
    uniEducationList :[] as EducationModel[] ,
    scSchoolEdu:{} as EducationModel,
    srSchoolEdu:{} as EducationModel,
    skillsBadge : [] as SkillModel[],
    languageBadge : [] as SkillModel[],
    hobbiesBadge:[] as string[],
    awardList:[] as AwardModel[], 
    address: {} as AddressModel,
    isCurrentEmployeeSet: false,
    userAge:null
  } 

  handleSkillBadgeCallBack = (skillModel : SkillModel)=>{
    let skillArray: SkillModel[] = [...this.state.skillsBadge,...[skillModel]];
    this.setState({ skillsBadge : skillArray},this.printSkill);
  }

  printSkill(){
    console.log(JSON.stringify(this.state.skillsBadge));
  }
 

  handleLangBadgeCallBack = (skillModel : SkillModel)=>{
    let langArray: SkillModel[] = [...this.state.languageBadge,...[skillModel]];
  this.setState({ languageBadge : langArray},this.printLang);
 }

 printLang(){
  console.log(JSON.stringify(this.state.languageBadge));
}

 handleHobbyBadgeCallBack = (hobby : string)=>{
   let hobbyArray : string[] = [...this.state.hobbiesBadge,...[hobby]] ;
   this.setState({hobbiesBadge:hobbyArray},this.printHObby);
 }

 printHObby(){
  console.log(JSON.stringify(this.state.hobbiesBadge));
}

 handlePersonalDetailsCallBack=(personalDetail:AddressModel)=>{  
    this.setState({address:personalDetail},this.printPersonD);
 }

 printPersonD(){
  console.log(JSON.stringify(this.state.address));
 }

 handleWorkExperienceCallBack=(workExperienceModel:WorkExperienceModel)=>{
     
    if(!this.state.isCurrentEmployeeSet && workExperienceModel.isCurrentEmployee){
      this.setState({isCurrentEmployeeSet:true});
    }
     let workExArray : WorkExperienceModel[] =[...this.state.workExperinceList,...[workExperienceModel]] ;
     this.setState({workExperinceList:workExArray},this.printEx);
 }

 printEx(){
  console.log(JSON.stringify(this.state.workExperinceList));
 }

 handleAwardCallBack=(awardArr:AwardModel[])=>{  
   this.setState({awardList:awardArr},this.printAw);
 }
 printAw(){
  console.log(JSON.stringify(this.state.workExperinceList));
 }

 handleSecondayEduCallback=(education:EducationModel)=>{
    this.setState({scSchoolEdu:education},this.printEd);
 }

 printEd(){
  console.log(JSON.stringify(this.state.scSchoolEdu));
 
 }

 handleSeniorScEduCallback=(education:EducationModel)=>{
    this.setState({srSchoolEdu:education},this.printEd2);
 }
 printEd2(){
  console.log( JSON.stringify(this.state.srSchoolEdu));
 }

 handleUniEduCallback=(education:EducationModel)=>{
   let uniArray = [...this.state.uniEducationList,...[education]];
       this.setState({uniEducationList:uniArray},this.printEd3);
 }

 printEd3(){
  console.log( JSON.stringify(this.state.uniEducationList));
 }

 handlePersonalInfoTabNextButton=()=>{
  if(Object.keys(this.state.address).length === 0){
    toast({
      description: "Please fill the form to continue",
       status: "error",
       duration: 5000,
       isClosable: true,
     });
  }
  else{
    this.setState({tabNo:1})
  }
 }

 calculateAge=()=>{
  let  birthDate = new Date(this.props.user.dateOfBirth);
  let todayDate = new Date();
  let age= Math.abs(todayDate.getFullYear()-birthDate.getFullYear());
  console.log(todayDate.getFullYear());
 if((todayDate.getMonth()>birthDate.getMonth()) || 
 todayDate.getMonth() == birthDate.getMonth() && todayDate.getDate()>=birthDate.getDate()){
    this.setState({userAge:(age)},this.printAge);
 }
  else{
    this.setState({userAge:age===0?0:age-1},this.printAge);
  }   
} 
printAge(){
  console.log(JSON.stringify(this.state.userAge));
}
    render(){
      console.log(JSON.stringify( this.props.user));
        return (
             <Box  p={20}>
                <Tabs index={this.state.tabNo} size="md" variant="line" align='start'>
                  <TabList>
                    <Tab    fontWeight='semibold' fontSize='md'>Personal Information {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='md'>Education {'>'}</Tab>
                     <Tab   fontWeight='semibold' fontSize='md' >Skills {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='md'>Work Experience {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='md' >Awards & Recognition {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='md'>Submit</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                    <Stack style = {{alignItems:"center"}}>                    
                    <PersonalInformationComponent  userAge={this.state.userAge} 
                                user={this.props.user}
                     onPersonalDetailAdd={this.handlePersonalDetailsCallBack}/>
                   
                    <HStack spacing={900}>
                    <Button  variant='solid' backgroundColor='#d1e0ef' width = '30mm'   onClick={()=>{this.setState({tabNo:1})}}>Next2</Button>                  
                    <Button  variant='ghost'  width = '30mm' onClick={this.handlePersonalInfoTabNextButton}><ChevronRightIcon  w={10} h={10} /></Button>
                    </HStack>
                  
                     </Stack> 
                     
                    </TabPanel>
                    <TabPanel>
                      <Box>
                    <Stack spacing={2}  style = {{alignItems:"center"}}>
                    <EducationTabComponent  onAddSecSchool={this.handleSecondayEduCallback}
                                             onAddSrSchool={this.handleSeniorScEduCallback}
                                             onAddUniverse={this.handleUniEduCallback}     />
                    <HStack spacing={900}>
                          <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:0})}}><ChevronLeftIcon w={10} h={10} /></Button>
                           <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:2})}}><ChevronRightIcon  w={10} h={10} /></Button>
                      </HStack>
                      </Stack>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                     <Stack style = {{alignItems:"center"}}>
                    < SkillsTabComponent  
                      onSkillAdd = {this.handleSkillBadgeCallBack} 
                      onLangAdd = {this.handleLangBadgeCallBack}
                      onHobbyAdd ={this.handleHobbyBadgeCallBack}
                    /> 
                    <HStack spacing={900}>
                     <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:1})}}><ChevronLeftIcon w={10} h={10} /></Button>
                     <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:3})}}><ChevronRightIcon  w={10} h={10} /></Button>
                     </HStack>
                    </Stack >
                  </TabPanel>
                    <TabPanel  id='WorkExTag' >
                      <Stack style = {{alignItems:"center"}}>
                     <WorkExperienceTabComponent onAddWorkEx = {this.handleWorkExperienceCallBack} />
                     <HStack spacing={900}>
                     <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:2})}}><ChevronLeftIcon w={10} h={10} /></Button>
                     <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:4})}}><ChevronRightIcon  w={10} h={10} /></Button>
                     </HStack>
                     </Stack>
                  </TabPanel>
                  <TabPanel>
                    <Stack spacing={2}  style = {{alignItems:"center"}}>
                       <AwardCertTabComponent onAddAward = {this.handleAwardCallBack} />
                       <HStack spacing={900}>
                          <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:3})}}><ChevronLeftIcon w={10} h={10} /></Button>
                           <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:5})}}><ChevronRightIcon  w={10} h={10} /></Button>
                      </HStack>
                      </Stack>
                  </TabPanel>
                  <TabPanel>
                  <Stack spacing={2}  style = {{alignItems:"center"}}>
                      <SubmitTabComponent   user={this.props.user}
                                            userAge={this.state.userAge} 
                                            address={this.state.address}
                                            scSchoolEdu = {this.state.scSchoolEdu}
                                            srSchoolEdu={this.state.srSchoolEdu}
                                            uniEducationList={this.state.uniEducationList}
                                            workExperinceList={this.state.workExperinceList}
                                            skillsBadge={this.state.skillsBadge}
                                            languageBadge={this.state.languageBadge}
                                            hobbiesBadge={this.state.hobbiesBadge}
                                            awardList={this.state.awardList} />
                        <HStack spacing={900}>
                          <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:4})}}><ChevronLeftIcon w={10} h={10} /></Button>
                      </HStack>
                 </Stack>                 
                  </TabPanel>
                  </TabPanels>
                </Tabs>
             </Box>

        );
    }
}

 export default UserProfileTabsComponent ;