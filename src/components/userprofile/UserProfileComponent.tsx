import React ,{Component} from "react";
import PersonalInformationComponent from './PersonalInformationTabComponent';
import WorkExperienceTabComponent from './WorkExperienceTabComponent' ;
import SkillsTabComponent from './SkillsTabComponent';
import AwardCertTabComponent from "./AwardCertTabComponent";
import EducationTabComponent from "./EducationTabComponent";
import { Tabs, TabList, TabPanels, Tab, TabPanel,Button ,Stack,Box,HStack} from "@chakra-ui/react";

export type AwardModel={
  awardName:string,
  awardCategory:string,
  awardOrg:string,
  awardRecDate:string,
  awardType:string
}
export type WorkExperienceModel = {
  companyName:string,
  industry:string,
  role:string,
  position:string,
  responsibilities:string,
  joiningDate:string,
  endingDate:string,
  isCurrentEmployee:boolean,
  isCurrentEmpSet:boolean
}
export type PersonalDetailModel ={    
    country:string,
    state:string,
    city:string,
    pinCode:string   
}

export type SkillModel={
  skillName:string,
  skillProf:string
}

export type EducationModel={
  degreeName:string,
  schoolName:string,
  stream:string,
  percentage:string,
  completionYear:string,
  eduType:string,
  country:string
}

export class UserProfileTabsComponent extends Component<any,any>  {
 
  state ={
    tabNo:0,
    workExperinceList:[] as WorkExperienceModel[] ,
    uniEducationList :[] as EducationModel[] ,
    scSchoolEdu:{} as EducationModel,
    srSchoolEdu:{} as EducationModel,
    skillsBadge : [] ,
    languageBadge : [],
    hobbiesBadge:[],
    awardList:[], 
    personalDetails:  {} as PersonalDetailModel,
    isCurrentEmployeeSet: false

  } 

  handleSkillBadgeCallBack = (skillModel : SkillModel)=>{
    let skillArray: SkillModel[] = [skillModel];
    this.state.skillsBadge.reverse().map((name)=>{
      skillArray.unshift(name);
    })
    this.setState({ skillsBadge : skillArray},this.printSkill);
  }

  printSkill(){
    console.log(JSON.stringify(this.state.skillsBadge));
  }
 

  handleLangBadgeCallBack = (skillModel : SkillModel)=>{
    let langArray: SkillModel[] = [skillModel];
    this.state.languageBadge.reverse().map((name)=>{
       langArray.unshift(name);
   })
  this.setState({ languageBadge : langArray},this.printLang);
 }

 printLang(){
  console.log(JSON.stringify(this.state.languageBadge));
}

 handleHobbyBadgeCallBack = (hobby : string)=>{
   let hobbyArray : string[] = [hobby] ;
    this.state.hobbiesBadge.reverse().map((hobb)=>{
        hobbyArray.unshift(hobb);
    });
   this.setState({hobbiesBadge:hobbyArray},this.printHObby);
 }

 printHObby(){
  console.log(JSON.stringify(this.state.hobbiesBadge));
}

 handlePersonalDetailsCallBack=(personalDetail:PersonalDetailModel)=>{  
    this.setState({personalDetails:personalDetail},this.printPersonD);
 }

 printPersonD(){
  console.log(JSON.stringify(this.state.personalDetails));
 }

 handleWorkExperienceCallBack=(workExperienceModel:WorkExperienceModel)=>{
     
    if(!this.state.isCurrentEmployeeSet && workExperienceModel.isCurrentEmployee){
      this.setState({isCurrentEmployeeSet:true});
    }
     let workExArray : WorkExperienceModel[] =[workExperienceModel] ;
     this.state.workExperinceList.reverse().map((workX)=>{
        workExArray.unshift(workX);
     });
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
    this.setState({srSchoolEdu:education});
 }
 printEd2(){
  console.log( JSON.stringify(this.state.srSchoolEdu));
 }

 handleUniEduCallback=(education:EducationModel[])=>{
       this.setState({uniEducationList:education});
 }

 printEd3(){
  console.log( JSON.stringify(this.state.uniEducationList));
 }
 






    render(){
        return (
             <Box  p={20}>
                <Tabs index={this.state.tabNo} size="md" variant="line" align='start'>
                  <TabList>
                    <Tab    fontWeight='semibold' fontSize='large'>Personal Information {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large'>Education {'>'}</Tab>
                     <Tab   fontWeight='semibold' fontSize='large' >Skills {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large'>Work Experience {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large' >Awards & Recognition {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large'>Submit</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                    <Stack style = {{alignItems:"center"}}>                    
                    <PersonalInformationComponent onPersonalDetailAdd={this.handlePersonalDetailsCallBack}/>
                   
                    <HStack spacing={900}>
                    <Button   variant='solid' backgroundColor='#d1e0ef' width = '30mm'   onClick={()=>{this.setState({tabNo:1})}}>Next2</Button>
                   
                    <Button  disabled ={Object.keys(this.state.personalDetails).length === 0} variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:2})}}>Next</Button>
                    </HStack>
                     </Stack> 
                     
                    </TabPanel>
                    <TabPanel>
                      <Box>
                    <Stack spacing={2}>
                    <EducationTabComponent  onAddSecSchool={this.handleSecondayEduCallback}
                                             onAddSrSchool={this.handleSeniorScEduCallback}
                                             onAddUni={this.handleUniEduCallback}     />
                    <HStack spacing={900}>
                          <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:0})}}>Prev</Button>
                           <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:2})}}>Next</Button>
                      </HStack>
                      </Stack>
                      </Box>
                    </TabPanel>
                    <TabPanel> <Stack style = {{alignItems:"center"}}>
                    < SkillsTabComponent  
                      onSkillAdd = {this.handleSkillBadgeCallBack} 
                      onLangAdd = {this.handleLangBadgeCallBack}
                      onHobbyAdd ={this.handleHobbyBadgeCallBack}
                    /> 
                    <HStack spacing={900}>
                     <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:1})}}>Prev</Button>
                     <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:3})}}>Next</Button>
                     </HStack>
                    </Stack>
                  </TabPanel>
                    <TabPanel  id='WorkExTag' >
                      <Stack>
                     <WorkExperienceTabComponent onAddWorkEx = {this.handleWorkExperienceCallBack} />
                     <HStack spacing={900}>
                     <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:2})}}>Prev</Button>
                     <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:4})}}>Next</Button>
                     </HStack>
                     </Stack>
                  </TabPanel>
                  <TabPanel>
                    <Stack spacing={2}>
                       <AwardCertTabComponent onAddAward = {this.handleAwardCallBack} />
                       <HStack spacing={900}>
                          <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:3})}}>Prev</Button>
                           <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:5})}}>Next</Button>
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