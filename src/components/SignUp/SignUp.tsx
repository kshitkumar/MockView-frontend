import { Input, HStack, VStack, Text, Flex, Button, Select, useToast} from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../../models/User";
import { saveUser } from "../../services/UserService";

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
        if(!isInvalidPassword()) {
            try {
                const response = await saveUser(user) ;
                    if(response.status === 201) {
                        toast({
                            title: "User Signed up Successfully",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        });
                }
            }
            catch(error) {
                    toast({
                        title: "Some error occured",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
            }
            props.onSignUp();
        }
    };

    function isInvalidPassword() {
        return rePassword !== "" && user.password !== rePassword;
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
                fontSize = '15px'
                variant = 'outline'
                id="emailId"
                name="emailId"
                placeholder="*Email Address"
                isRequired
                onChange = {onChange}
            />
            <Input
                fontSize = '15px'
                variant = 'outline'
                id="phoneNumber"
                name="phoneNumber"
                placeholder="*Phone Number"
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
                    isInvalid = {isInvalidPassword()}
                    errorBorderColor="crimson"
                    fontSize = '15px'
                    variant = 'outline'
                    id="rePassword"
                    name="rePassword"
                    type='password'
                    placeholder="*Re-enter Password"
                    isRequired
                    onChange = {(event)=>{onChange(event);
                                         setRePassword(event.target.value)   }}
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