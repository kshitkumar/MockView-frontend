import { Input, HStack,Stack, VStack, Text, Flex, Button, Select, useToast,Spinner} from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../../models/User";
import { saveUser } from "../../services/UserService";
import validator from 'validator';

interface Props {
    onSignUp() : void
}

function SignUp(props : Props) {

    const initialState = {
        id : 0,
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender:"",
        emailId: "",
        password: "",
        phoneNumber: "",
        profileComplete:false
    };

    const [user, setUser] = useState<User>(initialState);
    const [rePassword, setRePassword] =useState("");
    const [loading ,setLoading] = useState(false);
    const [phoneError,setPhoneError] =useState(false);
    const [emailError,setEmailError] =useState(false);
    const [passError,setPassError] =useState(false);
    const [rePassError,setRePassError] =useState(false);

    const toast = useToast();

    
    const handleRePass=(rePass:string)=>{
        if(rePass!==user.password){
            setRePassError(true);
        }
        else{
            setRePassError(false);
            setRePassword(rePass);
        }
    }
   

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        console.log((!emailError)&&(!phoneError)&&(!passError)&&(!rePassError));    
        if(event.target.name==="emailId"){
            if(validator.isEmail(event.target.value)){
                setEmailError(false);
            }
            else{
                setEmailError(true);
            }
        }
        if(event.target.name==="phoneNumber"){
            if(validator.isMobilePhone(event.target.value) && event.target.value.length===10 ){
                setPhoneError(false);
            }
            else{
                setPhoneError(true);
            }
        }
        if(event.target.name==="password"){
            if(event.target.value.length>=8){
                setPassError(false);
            }
            else{
                setPassError(true);
            }
        }
     
    };

    const onOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
             try {
                if( isValidPassword()&& validator.isEmail(user.emailId) && validator.isMobilePhone(user.phoneNumber)) {    
                   const response = await saveUser(user) ;
                    if(response.status === 201) {
                        toastForSignUpForm("success","User Signed up Successfully");
                    }
                    else{
                        toastForSignUpForm("error","Phone no or EmailId already registered");
                    }
                }
               else if(!validator.isEmail(user.emailId)){
                        toastForSignUpForm("error","Enter valid Email Id");
                }
               else if(!validator.isMobilePhone(user.phoneNumber)){
                    toastForSignUpForm("error","Enter valid Phone no");
                  }
             }
            catch(error) {
                        toastForSignUpForm("error","Phone no or EmailId already registered");
            }
            props.onSignUp();
      }

     const  toastForSignUpForm =(status:"info"|"warning"|"success"|"error",message:string)=>{
        toast({
            description: message,
            status: status,
            duration: 5000,
            isClosable: true,
          });
      }

    function isValidPassword() {
       if(user.password.length < 8){
        toastForSignUpForm('error',"Password should at least be 8 characters long")
        return false;
       }
       if ( user.password !== rePassword){
           toastForSignUpForm('error',"Passwords not matching")
           return false;
       }
       else{
       return true
       }
    }
    

    return (
        <form onSubmit = {onSubmit}>
        <VStack  w='100%' h='100%'p = '20px' spacing = {4} align = 'normal'>
            <Flex>
                <Text fontSize = "18px" color = 'blue.900'>
                    Create Account <Spinner visibility={loading?"visible":"hidden"} size='md' />
                </Text>
            </Flex>
            <HStack justifyContent = 'flex-end' spacing = {4}>
                <Input
                    fontSize = '15px'
                    variant = 'outline'
                    id="firstName"
                    name="firstName"
                    placeholder="*First Name"
                    type='text'
                    isRequired
                    onChange = {onChange}
                />
                <Input
                    fontSize = '15px'
                    variant = 'outline'
                    id="lastName"
                    name="lastName"
                    placeholder="*Last Name"
                    type='text'
                    isRequired
                    onChange = {onChange}
                />
            </HStack>
            <HStack justifyContent = 'flex-end' spacing = {4}>
                <Input
                    fontSize = '15px'
                    variant = 'outline'
                    type = 'date'
                    id="dateOfBirth"
                    name="dateOfBirth"
                    placeholder="*Date of Birth"
                    isRequired
                    onChange = {onChange}
                />
                <Select
                    fontSize = '15px'
                    variant = 'outline'
                    id="gender"
                    name="gender"
                    placeholder="*Gender"
                    isRequired
                    onChange = {onOptionChange}
                >
                    <option value = "MALE">MALE</option>
                    <option value = "FEMALE">FEMALE</option>
                </Select>
            </HStack>
            <Input
               
                fontSize = '15px'
                variant = 'outline'
                id="emailId"
                name="emailId"
                isInvalid={emailError}
                placeholder="*Email Address"
                isRequired
                onChange = {onChange}
            />
            <Input
               
                fontSize = '15px'
                variant = 'outline'
                id="phoneNumber"
                maxLength={10}
                isInvalid={phoneError}
                name="phoneNumber"
                placeholder="*Phone Number(10 digit long)"
                type="number"            
                isRequired              
                onChange = {onChange}
            />
            <Stack spacing={1}>
            <Text color='red' fontSize='xx-small' >* Password should be at least  8 characters long</Text>
            <HStack justifyContent = 'flex-end' spacing = {4}>
                <Input
                    fontSize = '15px'
                    variant = 'outline'
                    id="password"
                    name="password"
                    isInvalid={passError}
                    placeholder="*Password"
                    type='password'
                    isRequired
                    onChange = {onChange}
                />
                <Input
                    errorBorderColor="crimson"
                    fontSize = '15px'
                    variant = 'outline'
                    id="rePassword"
                    name="rePassword"
                    isInvalid={rePassError}
                    type='password'
                    placeholder="*Re-enter Password"
                    isRequired
                    onChange = {(event)=>{handleRePass(event.target.value)}}
                />
            </HStack>
            </Stack>
            <Button type = 'submit' bgColor = '#0B294E' 
            color = 'white' w='100%' fontSize='15px'>
                Sign Up
            </Button>
        </VStack>
        </form>   
    );
}

export default SignUp;