    import React,{Component} from "react";
    import {SkillModel} from './UserProfileComponent'
    import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,Alert,
    Textarea,AlertIcon,
    Stack,Tag,
    Text,Badge,Select,
    Checkbox, CheckboxGroup ,
    Heading,Box,HStack,Button
    } from "@chakra-ui/react";
     
    type Skill=  {
        name:string;
        prof:string;
    }
 
    export default  class SkillsTabComponent extends Component<any,any>{

        state = {
            skillsBadge : [] ,
            languageBadge : [],
            hobbiesBadge:[],
            skillName:"",
            skillProf:"",
            languageName:"",
            languageProf:"",        
            hobbyName:"",
            skillAddButtonPress:false,
            langAddButtonPress:false,
            hobbyAddbuttonPress:false,
            skillNameError:false,
            skillProfError:false,
            languageNameError:false,
            languageProfError:false,
            hobbyError:false
        } 
        
        addSkillsBadge(){
           if(this.state.skillName !== "" && this.state.skillProf !=="") {
                const skillObject = {name:this.state.skillName,prof:this.state.skillProf};
                let skillArray :Skill[] = [skillObject];
                    this.state.skillsBadge.reverse().map((name)=>{
                        skillArray.unshift(name);                       
                });
                this.setState({skillAddButtonPress:false});
                this.setState({ skillsBadge : skillArray , 
                               skillName:"",
                               skillProf:"",
                               skillAddButtonPress:false,
                               skillNameError:false,
                               skillProfError:false }) ;
                this.props.onSkillAdd(skillObject);
           }
           else{
               if(this.state.skillName === ""){
                   this.setState({skillNameError:true});
               }
               if(this.state.skillProf === ""){
                this.setState({skillProfError:true});
               }
                 this.setState({skillAddButtonPress:true});
           }           
             
        }
        addLanguageBadge(){
            if(this.state.languageName !== "" && this.state.languageProf !=="") {
                    const langObject = {name:this.state.languageName,prof:this.state.languageProf};
                    let langArray :Skill[] = [langObject];
                    this.state.languageBadge.reverse().map((name)=>{
                        langArray.unshift(name);
                    });
                    this.setState({langAddButtonPress:false});
                    this.setState({ 
                        languageBadge : langArray , 
                        languageName : "" , 
                        languageProf : "",
                        languageNameError : false , 
                        languageProfError : false,         
                        }) ;
                    this.props.onLangAdd(langObject);
            }
            else{
                if(this.state.languageName === ""){
                    this.setState({languageNameError:true});
                }
                if(this.state.languageProf === ""){
                 this.setState({languageProfError:true});
                }
                this.setState({langAddButtonPress:true});
               } 
              
        }
        addHobbiesBadge(){
            if(this.state.hobbyName !== "") {                    
                    let hobbyArray :string[] = [this.state.hobbyName];
                    this.state.hobbiesBadge.reverse().map((hobby)=>{
                        hobbyArray.unshift(hobby);
                    })
                    this.setState({ 
                        hobbiesBadge : hobbyArray ,
                         hobbyName:"",
                         hobbyAddbuttonPress:false,
                         hobbyError:false}) ;
                   
                    this.props.onHobbyAdd(this.state.hobbyName);
            }
            else{

                this.setState({hobbyAddbuttonPress:true,
                               hobbyError:true  });
               } 

        }

        handleSkillNameInput(event: React.ChangeEvent<HTMLInputElement>) {
         this.setState({skillName:event.target.value})
         this.setState({skillNameError:false});
        }
        handleSkillProfInput(event: React.ChangeEvent<HTMLSelectElement>) {
            this.setState({skillProf:event.target.value})
            this.setState({skillProfError:false});
        }
        handleLangNameInput(event: React.ChangeEvent<HTMLInputElement>) {
            this.setState({languageName:event.target.value})
            this.setState({languageNameError:false});
        }
        handleLangProfInput(event: React.ChangeEvent<HTMLSelectElement>) {
            this.setState({languageProf:event.target.value})
            this.setState({languageProfError:false});
        }
        handleHobbyInput(event: React.ChangeEvent<HTMLInputElement>) {
            this.setState({hobbyName:event.target.value})
            this.setState({hobbyError:false})
        }
           
        render(){
            return(
                <Box>
                <Box height="400px" style={{alignItems:"center"}}  borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" >
                    <Stack spacing={1} style={{margin:"20px 20px 1px 20px"}}>
                    
                    <Heading size = 'sm' >SKILLS<hr style = {{ height:'2px',
                    backgroundColor : '#d1e0ef'}}/></Heading>
                    <HStack spacing={-4} >

                    <Box height='30px'>
                    
                    <FormControl isInvalid={this.state.skillNameError} width="sm">
                    <Input  value={this.state.skillName} onChange={(event)=>{this.handleSkillNameInput(event)}} type ='text' width='xs' size='sm' variant='filled' placeholder='Skills(Ex. FrontEnd Development)'></Input>                   
                    <FormErrorMessage>please enter</FormErrorMessage>  
                    </FormControl>                    
                    </Box>
                     
                    <Box height='30px'>
                    <FormControl isInvalid={this.state.skillProfError} width="sm">
                    <Select value= {this.state.skillProf} onChange={(event)=>{this.handleSkillProfInput(event)}} type ='text' width='xs' size='sm' variant='filled' placeholder='-Select Proficiency-'>
                        <option   value="Novice">Novice</option>
                        <option  value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Select>
                    <FormErrorMessage>please enter</FormErrorMessage>                  
                    </FormControl>
                    </Box>
                     <Button size='sm' variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.addSkillsBadge()}}> Add</Button>
                   
                    </HStack> 
                   
                    <Box height='50px'>
                    <HStack>
                    {this.state.skillsBadge.map((skill:Skill)=>{
                       return <Tag width="fit-content"  variant ='solid' key={skill.name.replace(/\s/g, '')} >{skill.name+"-"+skill.prof}</Tag>
                    })}
                    </HStack>
                    </Box>
                    
                    <Heading size = 'sm' >LANGUAGES<hr style = {{ height:'2px',
                     backgroundColor : '#d1e0ef'}}/></Heading>
                    <HStack spacing={-4}>

                    <Box height='30px'>
                    <FormControl isInvalid={this.state.languageNameError} width="sm">
                    <Input value={this.state.languageName}  onChange={(event)=>{this.handleLangNameInput(event)}} type ='text' width='xs' size='sm' variant='filled' placeholder='Language'></Input>
                    <FormErrorMessage>please enter</FormErrorMessage>                   
                    </FormControl>
                    </Box>
                    
                    <Box height='30px'>
                    <FormControl isInvalid={this.state.languageProfError} width="sm">
                    <Select value={this.state.languageProf} onChange={(event)=>{this.handleLangProfInput(event)}} type ='text' width='xs' size='sm' variant='filled' placeholder='-Select Proficiency-'>
                        <option value="Novice">Novice</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Select> 
                    <FormErrorMessage>please enter</FormErrorMessage>                  
                    </FormControl>
                    </Box>
                    <Button size='sm' variant='solid'  backgroundColor='#d1e0ef'width = '30mm' onClick={()=>{this.addLanguageBadge()}}> Add</Button>
                 
                    </HStack>
                   
                    <Box height='50px'>
                    <HStack>
                    {this.state.languageBadge.map((lang:Skill)=>{
                       return <Tag width="fit-content" variant ='solid' key={lang.name.replace(/\s/g, '')} >{lang.name+"-"+lang.prof}</Tag>
                    })}
                    </HStack>
                    </Box>
                   
                    <Heading size = 'sm' >HOBBIES<hr style = {{ height:'2px',
                     backgroundColor : '#d1e0ef'}}/></Heading>
                    <HStack spacing={-4}>  

                    <Box height='30px'>
                    <FormControl isInvalid={this.state.hobbyError} width="sm">
                    <Input value={this.state.hobbyName} onChange={(event)=>{this.handleHobbyInput(event)}} type ='text' width='xs' size='sm' variant='filled' placeholder='Hobbies'></Input>                   
                    <FormErrorMessage>please enter</FormErrorMessage>                    
                    </FormControl>
                    </Box>
                    <Button size='sm' variant='solid' backgroundColor='#d1e0ef' width = '30mm' onClick={()=>{this.addHobbiesBadge()}}> Add</Button>
                  
                    </HStack>
                   
                    <Box height='50px'>
                    <HStack>
                    {this.state.hobbiesBadge.map((hobby:string)=>{
                       return <Tag width="fit-content" variant ='solid' key={hobby.replace(/\s/g, '')} >{hobby}</Tag>
                    })}
                    </HStack>
                    </Box>
                    </Stack>
                </Box>
                </Box>
            );
        }
    }

