    import React,{Component} from "react";
    import {SkillModel} from '../../models/SkillModel' ;
    import {
    FormControl,
    FormErrorMessage,
    Input,Stack,Tag,Select,
    Heading,Box,HStack,Button
    } from "@chakra-ui/react";
     
 
    export default  class SkillsTabComponent extends Component<any,any>{

        state = {
            skillsBadge : [] as SkillModel[],
            languageBadge : [] as SkillModel[],
            hobbiesBadge:[] as SkillModel[],
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
                const skillObject = {name:this.state.skillName,proficiency:this.state.skillProf,type:"SKILL"};
                let skillArray :SkillModel[] = [skillObject];
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
                    const langObject = {name:this.state.languageName,proficiency:this.state.languageProf,type:"LANGUAGE"};
                    let langArray :SkillModel[] = [langObject];
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
                    let hobby = {name:this.state.hobbyName,proficiency:"NA",type:"HOBBY"};                  
                    let hobbyArray :SkillModel[] = [...this.state.hobbiesBadge,...[hobby]];
                    this.setState({ 
                        hobbiesBadge : hobbyArray ,
                         hobbyName:"",
                         hobbyAddbuttonPress:false,
                         hobbyError:false}) ;
                   
                    this.props.onHobbyAdd(hobbyArray);
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
                <Box  style={{alignItems:"center"}}  borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl" width='6xl' height='96' >
                    <Stack spacing={1} style={{margin:"20px 20px 1px 20px"}}>
                    
                    <Heading size = 'sm' color='#0b294e' >SKILLS<hr style = {{ height:'2px',
                    backgroundColor : '#d1e0ef'}}/></Heading>
                    <HStack spacing={-4} >

                    <Box height='30px'>
                    
                    <FormControl isInvalid={this.state.skillNameError} width="sm">
                    <Input  value={this.state.skillName} onChange={(event)=>{this.handleSkillNameInput(event)}} type ='text' width='xs' size='xs' variant='filled' placeholder='Skills(Ex. FrontEnd Development)'></Input>                   
                    <FormErrorMessage>please enter</FormErrorMessage>  
                    </FormControl>                    
                    </Box>
                     
                    <Box height='30px'>
                    <FormControl isInvalid={this.state.skillProfError} width="sm">
                    <Select value= {this.state.skillProf} onChange={(event)=>{this.handleSkillProfInput(event)}} type ='text' width='xs' size='xs' variant='filled' placeholder='-Select Proficiency-'>
                        <option   value="BEGINNER">BEGINNER</option>
                        <option  value="INTERMEDIATE">INTERMEDIATE</option>
                        <option value="EXPERT">EXPERT</option>
                    </Select>
                    <FormErrorMessage>please enter</FormErrorMessage>                  
                    </FormControl>
                    </Box>
                     <Button size='xs' variant='solid' color='white' backgroundColor='#0b294e'  width = '30mm' onClick={()=>{this.addSkillsBadge()}}> Add</Button>
                   
                    </HStack> 
                   
                    <Box height='50px'>
                    <HStack>
                    {this.state.skillsBadge.map((skill:SkillModel)=>{
                       return <Tag fontSize='xs' size='sm' backgroundColor='#0b294e' color='white' width="fit-content"  variant ='solid' key={skill.name.replace(/\s/g, '')} >{skill.name+"-"+skill.proficiency}</Tag>
                    })}
                    </HStack>
                    </Box>
                    
                    <Heading size = 'sm' color='#0b294e' >LANGUAGES<hr style = {{ height:'2px',
                     backgroundColor : '#d1e0ef'}}/></Heading>
                    <HStack spacing={-4}>

                    <Box height='30px'>
                    <FormControl isInvalid={this.state.languageNameError} width="sm">
                    <Input value={this.state.languageName}  onChange={(event)=>{this.handleLangNameInput(event)}} type ='text' width='xs' size='xs' variant='filled' placeholder='Language'></Input>
                    <FormErrorMessage>please enter</FormErrorMessage>                   
                    </FormControl>
                    </Box>
                    
                    <Box height='30px'>
                    <FormControl isInvalid={this.state.languageProfError} width="sm">
                    <Select value={this.state.languageProf} onChange={(event)=>{this.handleLangProfInput(event)}} type ='text' width='xs' size='xs' variant='filled' placeholder='-Select Proficiency-'>
                        <option value="BEGINNER">BEGINNER</option>
                        <option value="INTERMEDIATE">INTERMEDIATE</option>
                        <option value="EXPERT">EXPERT</option>
                    </Select> 
                    <FormErrorMessage>please enter</FormErrorMessage>                  
                    </FormControl>
                    </Box>
                    <Button size='xs' variant='solid'  color='white' backgroundColor='#0b294e'  width = '30mm' onClick={()=>{this.addLanguageBadge()}}> Add</Button>
                 
                    </HStack>
                   
                    <Box height='50px'>
                    <HStack>
                    {this.state.languageBadge.map((lang:SkillModel)=>{
                       return <Tag fontSize='xs' size='sm' backgroundColor='#0b294e' color='white' width="fit-content" variant ='solid' key={lang. name.replace(/\s/g, '')} >{lang.name+"-"+lang.proficiency}</Tag>
                    })}
                    </HStack>
                    </Box>
                   
                    <Heading size = 'sm' color='#0b294e'>HOBBIES<hr style = {{ height:'2px',
                     backgroundColor : '#d1e0ef'}}/></Heading>
                    <HStack spacing={-4}>  

                    <Box height='30px'>
                    <FormControl isInvalid={this.state.hobbyError} width="sm">
                    <Input value={this.state.hobbyName} onChange={(event)=>{this.handleHobbyInput(event)}} type ='text' width='xs' size='xs' variant='filled' placeholder='Hobbies'></Input>                   
                    <FormErrorMessage>please enter</FormErrorMessage>                    
                    </FormControl>
                    </Box>
                    <Button size='xs' variant='solid' color='white' backgroundColor='#0b294e'  width = '30mm' onClick={()=>{this.addHobbiesBadge()}}> Add</Button>
                  
                    </HStack>
                   
                    <Box height='50px'>
                    <HStack>
                    {this.state.hobbiesBadge.map((hobby:SkillModel)=>{
                       return <Tag fontSize='xs' size='sm' backgroundColor='#0b294e' color='white' width="fit-content" variant ='solid' key={hobby.name.replace(/\s/g, '')} >{hobby.name}</Tag>
                    })}
                    </HStack>
                    </Box>
                    </Stack>
                </Box>
                </Box>
            );
        }
    }

