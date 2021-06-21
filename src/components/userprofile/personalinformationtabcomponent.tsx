        import React from "react";
        import  validator from "validator";
        import {PersonalDetailModel} from './UserProfileComponent'
        import {fetchAllCitieOfState,fetchAllCountries,fetchAllStatesOfCountry} from "../../services/utilService"
        import {
            FormControl,AlertIcon,
            FormLabel,Alert,Text,
            FormErrorMessage,Select,
            FormHelperText,HStack,
            Input,Box,Stack,Heading,Button
        } from "@chakra-ui/react";

        export type Country = {
            country_name:string,
            country_short_name:string,
            country_phone_code:string
        } 
        export type State={
            state_name:string
        }
        export type  City={
            city_name:string
        }

        export class PersonalInformationComponent extends React.Component<any,any>{

            constructor(props:any){
                super(props);
            }

            componentDidMount(){
                fetchAllCountries().then(data=>{
                this.setState({ countryList:data})
                })
            }
            
        state={
            pinCodeError:false,
            countryList:[],
            stateList:[],
            cityList:[],
            emailId:'visgoswami@deloitte.com',
            phoneNo:'8237752082',
            name :'Vishal Goswami',
            dateOfBirth:'04/May/1992',
            age:'28',
            gender:'Male',
            selectedCountry:"",
            selectedState:"",
            selectedCity:"",
            pinCode:"" 
        }
            validateEmail =(event : React.ChangeEvent<HTMLInputElement>)=>{
                if( !validator.isEmail(event.target.value)){
                        this.setState({emailError:true}); 
                }            
            } 

            validatePhone =(event : React.ChangeEvent<HTMLInputElement>)=>{
                if( !validator.isMobilePhone(event.target.value,"en-IN")){
                    this.setState({phoneNoError:true}); 
                }            
            }

            validatePinCode=(event : React.ChangeEvent<HTMLInputElement>)=>{
                if(!validator.isPostalCode(event.target.value,'IN')){
                    this.setState({pinCodeError:true});
                }
                else{
                    this.setState({pinCodeError:false,pinCode:event.target.value},this.checkForCompletionAndSendData);
                    
                }
            }

            selectCountyAndLoadStateData=(event : React.ChangeEvent<HTMLSelectElement>)=>{
                fetchAllStatesOfCountry(event.target.value).then((data)=>{
                    this.setState({stateList:data});
                });
                this.setState({selectedCountry:event.target.value});
            }

            selectStateAndLoadCityData=(event : React.ChangeEvent<HTMLSelectElement>)=>{
                fetchAllCitieOfState(event.target.value).then((data)=>{
                    this.setState({cityList:data});
                });
                this.setState({selectedState:event.target.value});            
            }
            selectCityAndSendData=(event : React.ChangeEvent<HTMLSelectElement>)=>{
                    this.setState({selectedCity:event.target.value},this.checkForCompletionAndSendData);                   
            }
            
            checkForCompletionAndSendData=()=>{
                if(this.state.selectedCountry !== ""  
                && this.state.selectedState !=="" 
                && this.state.selectedCity !== ""
                && this.state.pinCode !=="" 
                && !this.state.pinCodeError ){            
                    let personalDetail = {
                        country:this.state.selectedCountry,
                        state:this.state.selectedState,
                        city:this.state.selectedCity,
                        pinCode:this.state.pinCode
                    };
                    this.props.onPersonalDetailAdd(personalDetail);
                }
            
            }
            render(){
                return (
                        <Box style={{alignItems:"center"}} borderWidth="1px"  borderRadius='xl'  shadow="xl" boxShadow="xl"   >
                        <Stack spacing={5}>
                        <Box  style={{margin:'20px 20px 20px 20px'}} >
                        <Stack spacing={1}  >
                        <Heading size = 'md' > BIO <hr style = {{ height:'2px',
                        backgroundColor : '#d1e0ef'}}/></Heading> 
                        <Text fontWeight='semibold' fontSize="x-large" >{this.state.name}</Text>
                        <Text>{'Date of Birth: '+ this.state.dateOfBirth}</Text>
                        <Text>{ 'Age: '+ this.state.age}</Text>
                        <Text>{'Gender: ' + this.state.gender}</Text>                        
                        </Stack>  
                        </Box>
                        <Box style={{margin:'15px 15px 30px 15px'}}>
                        <Stack spacing={2}>
                        <Heading size = 'md' > CONTACT INFORMATION  <hr style = {{ height:'2px',
                        backgroundColor : '#d1e0ef'}}/></Heading> 
                        <HStack>                           
                            <Input width='xs' size='sm' value={this.state.emailId} isReadOnly variant='filled' type = 'email'  placeholder="Email" />                       
                            <Input width='xs' size='sm' value={this.state.phoneNo} isReadOnly variant='filled' type = 'tel'  placeholder="Phone No" />                            
                        </HStack>
                        <HStack>                    
                            <Select width='xs' size='sm' variant="filled" type = 'text' placeholder="-Select Country-" onChange={(event)=>{this.selectCountyAndLoadStateData(event)}} >                  
                            { this.state.countryList.map((country:Country,index)=>{
                            return  <option key={index} value={country.country_name.replace(/\s/g, '')}>{country.country_name}</option>
                            })}
                            </Select>                        
                            <Select width='xs' size='sm' variant="filled" type = 'text' placeholder="-Select State-"  onChange={(event)=>{this.selectStateAndLoadCityData(event)}}>
                            {this.state.stateList.map((stateName:State,index)=>{
                            return <option key={index} value={stateName.state_name.replace(/\s/g,'')}>{stateName.state_name}</option>
                            })}
                            </Select>                        
                        </HStack>
                        
                        <HStack>                          
                            <Select width='xs' size='sm' variant="filled" type = 'text' placeholder="-Select City-" onChange={(event)=>{this.selectCityAndSendData(event)}}>
                            {this.state.cityList.map((cityName:City,index)=>{
                            return <option key={index} value={cityName.city_name.replace(/\s/g,'')}>{cityName.city_name}</option>
                            })
                            }
                            </Select>                           
                            <Box height="30px">
                            <FormControl isInvalid = {this.state.pinCodeError} id="pinCode" isRequired >
                            <Input width='xs' size='sm' variant='filled' onFocus={()=>{this.setState({pinCodeError:false})}} onChange={(event)=>{this.validatePinCode(event)}} type = 'pincode' placeholder="Pin Code" />                       
                            <FormErrorMessage> Please enter valid pin code</FormErrorMessage>
                            </FormControl>
                            </Box>                        
                            </HStack>                       
                        </Stack>
                        </Box>
                        </Stack>
                        </Box>    
                    );
            }
        }

        export  default PersonalInformationComponent ;