import { Input, HStack, VStack, Text, Flex, Button, Select, useToast} from "@chakra-ui/react";
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

    const toast = useToast();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const onOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
             try {
                if(isValidPassword() && validator.isEmail(user.emailId) && validator.isMobilePhone(user.phoneNumber)) {    
                   const response = await saveUser(user) ;
                    if(response.status === 201) {
                        toastForSignUpForm("success","User Signed up Successfully");
                    }
                    else{
                        toastForSignUpForm("error","Some error occurred");
                    }
                   }
                   else{
                        toastForSignUpForm("error","Enter valid details");
                   }
             }
            catch(error) {
                        toastForSignUpForm("error","Some error occurred");
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
       if( validator.isStrongPassword(user.password,{minLength:8,minSymbols:1,minNumbers:1})){
           toastForSignUpForm('error',"Password should contain at least a symbol and a number and of 8 digit long")
           return false;
       }
       if (rePassword === "" && user.password === rePassword){
           toastForSignUpForm('error',"Passwords not matching")
           return false;
       }
       return true
    }
    function isInvalidPassword(){
        return rePassword !== "" && user.password !== rePassword
    }
    

    return (
        <form onSubmit = {onSubmit}>
        <VStack  w='100%' h='100%'p = '20px' spacing = {4} align = 'normal'>
            <Flex>
                <Text fontSize = "18px" color = 'blue.900'>
                    Create Account
                </Text>
            </Flex>
            <HStack justifyContent = 'flex-end' spacing = {4}>
                <Input
                    fontSize = '15px'
                    variant = 'outline'
                    id="firstName"
                    name="firstName"
                    placeholder="*First Name"
                    isRequired
                    onChange = {onChange}
                />
                <Input
                    fontSize = '15px'
                    variant = 'outline'
                    id="lastName"
                    name="lastName"
                    placeholder="*Last Name"
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
                isInvalid={!validator.isEmail(user.emailId)}
                fontSize = '15px'
                variant = 'outline'
                id="emailId"
                name="emailId"
                placeholder="*Email Address"
                isRequired
                onChange = {onChange}
            />
            <Input
                 isInvalid={!validator.isEmail(user.phoneNumber)}
                fontSize = '15px'
                variant = 'outline'
                id="phoneNumber"
                name="phoneNumber"
                placeholder="*Phone Number"
                type="number"
                isRequired
                onChange = {onChange}
            />
            <HStack justifyContent = 'flex-end' spacing = {4}>
                <Input
                    fontSize = '15px'
                    variant = 'outline'
                    id="password"
                    name="password"
                    placeholder="*Password"
                    type='password'
                    isRequired
                    onChange = {onChange}
                />
                <Input
                    isInvalid = {!isInvalidPassword()}
                    errorBorderColor="crimson"
                    fontSize = '15px'
                    variant = 'outline'
                    id="rePassword"
                    name="rePassword"
                    type='password'
                    placeholder="*Re-enter Password"
                    isRequired
                    onChange = {(event)=>{setRePassword(event.target.value)}}
                />
            </HStack>
            <Button type = 'submit' bgColor = '#0B294E' color = 'white' w='100%' fontSize='15px'>
                Sign Up
            </Button>
        </VStack>
        </form>   
    );
}

export default SignUp;