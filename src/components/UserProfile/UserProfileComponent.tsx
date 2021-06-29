  import React ,{Component} from "react";
  import PersonalInformationComponent from './PersonalInformationTabComponent';
  import WorkExperienceTabComponent from './WorkExperienceTabComponent' ;
  import SkillsTabComponent from './SkillsTabComponent';
  import AwardCertTabComponent from "./AwardCertTabComponent";
  import EducationTabComponent from "./EducationTabComponent";
  import SubmitTabComponent from "./SubmitTabComponent";
  import {ChevronLeftIcon,ChevronRightIcon } from '@chakra-ui/icons'
  import { Tabs, TabList, TabPanels, Tab, TabPanel,Button ,Stack,Box,HStack,createStandaloneToast,Spinner} from "@chakra-ui/react";
  import { AwardModel } from "../../models/AwardModel";
  import {WorkExperienceModel} from '../../models/WorkExperienceModel';
  import {EducationModel} from '../../models/EducationModel';
  import {SkillModel} from '../../models/SkillModel' ;
  import {AddressModel} from '../../models/AddressModel';
  import { saveUserDetail } from "../../services/UserDetailService";
  import { UserDetailModel } from "../../models/UserDetailModel";
  

  const toast = createStandaloneToast();

  export class UserProfileTabsComponent extends Component<any,any>  {

    constructor(props:any){
      super(props);
    }
    componentDidMount(){
      if(!window.sessionStorage.getItem('user')){
          this.props.history.push('/login');
          return;
      }
      this.calculateAge();      
    }
    
    state ={
      tabNo:0,
      workExperinceList:[] as WorkExperienceModel[] ,
      uniEducationList :[] as EducationModel[] ,
      scSchoolEdu:{} as EducationModel,
      srSchoolEdu:{} as EducationModel,
      skillsBadge : [] as SkillModel[],
      languageBadge : [] as SkillModel[],
      hobbiesBadge:[] as SkillModel[],
      awardList:[] as AwardModel[], 
      address: {} as AddressModel,
      isCurrentEmployeeSet: false,
      userAge:null,
      loading:false
    } 

    handleSkillBadgeCallBack = (skillModel : SkillModel)=>{
      let skillArray: SkillModel[] = [...this.state.skillsBadge,...[skillModel]];
      this.setState({ skillsBadge : skillArray});
    }

    handleLangBadgeCallBack = (languageModel : SkillModel)=>{
      let langArray: SkillModel[] = [...this.state.languageBadge,...[languageModel]];
    this.setState({ languageBadge : langArray});
  }

  handleHobbyBadgeCallBack = (hobby : SkillModel)=>{
    this.setState({hobbiesBadge:hobby});
  }

  handlePersonalDetailsCallBack=(personalDetail:AddressModel)=>{  
      this.setState({address:personalDetail});
  }


  handleWorkExperienceCallBack=(workExperienceModel:WorkExperienceModel)=>{
      
      if(!this.state.isCurrentEmployeeSet && workExperienceModel.currentEmployment){
        this.setState({isCurrentEmployeeSet:true});
      }
      let workExArray : WorkExperienceModel[] =[...this.state.workExperinceList,...[workExperienceModel]] ;
      this.setState({workExperinceList:workExArray});
  }

  handleAwardCallBack=(awardArr:AwardModel[])=>{  
    this.setState({awardList:awardArr});
  }

  handleSecondayEduCallback=(education:EducationModel)=>{
      this.setState({scSchoolEdu:education});
  }


  handleSeniorScEduCallback=(education:EducationModel)=>{
      this.setState({srSchoolEdu:education});
  }

  handleUniEduCallback=(education:EducationModel)=>{
    let uniArray = [...this.state.uniEducationList,...[education]];
        this.setState({uniEducationList:uniArray});
  }

  handleNextTabButton=(objArr: any[],tab:number)=>{
    let areStatesPopulated = true;
    objArr.forEach((obj)=>{
      if(Object.keys(obj).length === 0){
        areStatesPopulated=false;
      }      
    })
    if(!areStatesPopulated){
      toast({
        description: "Please fill the form to continue",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }   
    else{
      this.setState({tabNo:tab})
    }
  }

  submitUserDetails= async()=>{
      try {
        this.setState({loading:true});
        const userEducationRequest ={userEducationList: [this.state.scSchoolEdu,this.state.srSchoolEdu,...this.state.uniEducationList]};
        const userSkillRequest = {skillList:[...this.state.skillsBadge,...this.state.languageBadge,...this.state.hobbiesBadge]} ;
        const userAwardRequest ={userAwardList:this.state.awardList};
        const userExperienceRequest={userWorkExperienceList:this.state.workExperinceList}

        const userDetail:UserDetailModel={userEducationRequest:userEducationRequest,userProfile:this.state.address,
        userExperienceRequest:userExperienceRequest,userSkillRequest:userSkillRequest,userAwardRequest:userAwardRequest}
       
        const response = await saveUserDetail(this.props.user.id,userDetail);
  
        if(response.status === 201){
           console.log('user detail saved');
           this.setState({loading:false});
           toast({
             title: "User Details Saved",
             status: "success",
             duration: 5000,
             isClosable: true,
           });          
           this.props.history.push('/select-profile');        
         }
          else{
          this.setState({loading:false});
           toast({
             title: "Some error Occurred",
             status: "error",
             duration: 5000,
             isClosable: true,
           });

         }        
       } catch (error) {
         console.log(JSON.stringify(error))
         this.setState({loading:false});
        toast({
          title: "Some error Occurred",
           status: "error",
           duration: 5000,
           isClosable: true,
        });
        
      }
  }

  calculateAge=()=>{
    let  birthDate = new Date(this.props.user.dateOfBirth);
    let todayDate = new Date();
    let age= Math.abs(todayDate.getFullYear()-birthDate.getFullYear());
    console.log(todayDate.getFullYear());
  if((todayDate.getMonth()>birthDate.getMonth()) || 
  todayDate.getMonth() == birthDate.getMonth() && todayDate.getDate()>=birthDate.getDate()){
      this.setState({userAge:(age)});
  }
    else{
      this.setState({userAge:age===0?0:age-1});
    }   
  } 
      render(){
        console.log(JSON.stringify( this.props.user));
          return (
              <Box  p={20}>
                  <Tabs index={this.state.tabNo} size="md" variant="line" align='start' >
                    <TabList >
                      <Tab color='#0b294e'   fontWeight='semibold' fontSize='md'>Personal Information {'>'}</Tab>
                      <Tab color='#0b294e'  fontWeight='semibold' fontSize='md'>Education {'>'}</Tab>
                      <Tab color='#0b294e'  fontWeight='semibold' fontSize='md' >Skills {'>'}</Tab>
                      <Tab color='#0b294e'  fontWeight='semibold' fontSize='md'>Work Experience {'>'}</Tab>
                      <Tab color='#0b294e'  fontWeight='semibold' fontSize='md' >Awards & Recognition {'>'}</Tab>
                      <Tab color='#0b294e'  fontWeight='semibold' fontSize='md'>Submit</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                      <Stack style = {{alignItems:"center"}}>                    
                      <PersonalInformationComponent  userAge={this.state.userAge} 
                                  user={this.props.user}
                      onPersonalDetailAdd={this.handlePersonalDetailsCallBack}/>
                    
                      <HStack spacing={900}>
                        <span></span>
                      <Button  variant='ghost'  width = '30mm' onClick={()=>this.handleNextTabButton([this.state.address],1)}><ChevronRightIcon  w={10} h={10} /></Button>
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
                            <Button variant='ghost'  width = '30mm' onClick={()=>this.handleNextTabButton([this.state.scSchoolEdu,this.state.srSchoolEdu,this.state.uniEducationList],2)}><ChevronRightIcon  w={10} h={10} /></Button>
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
                      <Button variant='ghost'  width = '30mm' onClick={()=>{this.handleNextTabButton([this.state.skillsBadge,this.state.languageBadge],3)}}><ChevronRightIcon  w={10} h={10} /></Button>
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
                          <HStack spacing={832}>
                            <Button variant='ghost'  width = '30mm' onClick={()=>{this.setState({tabNo:4})}}><ChevronLeftIcon w={10} h={10} /></Button>
                             <HStack> <Spinner visibility={this.state.loading?"visible":"hidden"} size='md'/>
                              <Button onClick={this.submitUserDetails} bg='#0b294e' color='white' width='min-content' size='sm'>Confirm Profile and Save</Button>               
                              </HStack>
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