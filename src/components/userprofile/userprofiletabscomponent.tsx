import React ,{Component} from "react";
import PersonalInformationComponent from './personalinformationtabcomponent';
import WorkExperienceTabComponent from './workexperiencetabcomponent' ;
import SkillsTabComponent from './skillstabcomponent';
import AwardCertTabComponent from "./awardcerttabcomponent";
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
  isCurrentEmployee:boolean
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

export class UserProfileTabsComponent extends Component<any,any>  {
 
  state ={
    tabNo:0,
    workExChild : [1], 
    workExperinceList:[] as WorkExperienceModel[] ,
    educationList :[],
    skillsBadge : [] ,
    languageBadge : [],
    hobbiesBadge:[],
    awardRecognitionList:[], 
    personalDetails:  {} as PersonalDetailModel,
    isCurrentEmployeeSet: false

  } 

  HandleSkillBadgeCallBack = (skillModel : SkillModel)=>{
    let skillArray: SkillModel[] = [skillModel];
    this.state.skillsBadge.reverse().map((name)=>{
      skillArray.unshift(name);
    })
    this.setState({ skillsBadge : skillArray});
  }
  Print(){
    console.log(JSON.stringify(this.state.workExperinceList));
  }

  HandleLangBadgeCallBack = (skillModel : SkillModel)=>{
    let langArray: SkillModel[] = [skillModel];
    this.state.languageBadge.reverse().map((name)=>{
       langArray.unshift(name);
   })
  this.setState({ languageBadge : langArray});
 }

 HandleHobbyBadgeCallBack = (hobby : string)=>{
   let hobbyArray : string[] = [hobby] ;
    this.state.hobbiesBadge.reverse().map((hobb)=>{
        hobbyArray.unshift(hobb);
    });
   this.setState({hobbiesBadge:hobbyArray});
 }

 HandlePersonalDetailsCallBack=(personalDetail:PersonalDetailModel)=>{
  
    this.setState({personalDetails:personalDetail});
 }

 HandleWorkExperienceCallBack=(workExperienceModel:WorkExperienceModel)=>{
     
    if(!this.state.isCurrentEmployeeSet && workExperienceModel.isCurrentEmployee){
      this.setState({isCurrentEmployeeSet:true});
    }
     let workExArray : WorkExperienceModel[] =[workExperienceModel] ;
     this.state.workExperinceList.reverse().map((workX)=>{
        workExArray.unshift(workX);
     });
     this.setState({workExperinceList:workExArray},this.Print);
 }


  AddWorkExComponent(){
    this.state.workExChild.push(1);
    this.setState(this.state.workExChild);
  }
  RemoveWorkExComponent(){
    this.state.workExChild.pop()
    this.setState(this.state.workExChild);
  }
    render(){
        return (
             <Box  style={{margin: "10px 30px 30px 30px"}}>
                <Tabs index={this.state.tabNo} size="md" variant="line" align='start'>
                  <TabList>
                    <Tab    fontWeight='semibold' fontSize='large'>Personal Information {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large'>Education {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large' >Skills {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large'>Work Experience {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large' >Awards & Recognition {'>'}</Tab>
                    <Tab   fontWeight='semibold' fontSize='large'>Overview</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                    <Stack style = {{alignItems:"center"}}>                    
                    <PersonalInformationComponent onPersonalDetailAdd={this.HandlePersonalDetailsCallBack}/>
                    
                    <HStack spacing={900}>
                    <Button visibility="hidden" disabled ={Object.keys(this.state.personalDetails).length === 0} variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:2})}}>Next</Button>
                    <Button   variant='solid' backgroundColor='#d1e0ef' width = '30mm'   onClick={()=>{this.setState({tabNo:2})}}>Next2</Button>
                    </HStack>
                     </Stack> 
                    </TabPanel>
                    <TabPanel>
                          <div></div>
                    </TabPanel>
                    <TabPanel> <Stack style = {{alignItems:"center"}}>
                    < SkillsTabComponent  
                      onSkillAdd = {this.HandleSkillBadgeCallBack} 
                      onLangAdd = {this.HandleLangBadgeCallBack}
                      onHobbyAdd ={this.HandleHobbyBadgeCallBack}
                    /> 
                    <HStack spacing={900}>
                     <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:0})}}>Prev</Button>
                     <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:3})}}>Next</Button>
                     </HStack>
                    </Stack>
                  </TabPanel>
                    <TabPanel  id='WorkExTag' >
                     <WorkExperienceTabComponent onAddWorkEx = {this.HandleWorkExperienceCallBack} 
                     isCurrEmpSet ={this.state.isCurrentEmployeeSet}/>
                     <br />
                     <HStack spacing={900}>
                     <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:2})}}>Prev</Button>
                     <Button variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.setState({tabNo:4})}}>Next</Button>
                     </HStack>
                  </TabPanel>
                  <TabPanel>
                       <AwardCertTabComponent />
                  </TabPanel>
                  </TabPanels>
                </Tabs>
             </Box>

        );
    }
}

 export default UserProfileTabsComponent ;