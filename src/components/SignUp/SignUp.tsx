import { Input, HStack, VStack, Text, Flex, Button, Select} from "@chakra-ui/react";
import { useState } from "react";

function SignUp() {

    const initialState = {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender:"",
        emailAddress: "",
        password: "",
        rePassword: ""
    };

    const [user, setUser] = useState(initialState);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const onOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(user.emailAddress);
        console.log(user.password);
    };

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
                    <option value = "Male">Male</option>
                    <option value = "Female">Female</option>
                </Select>
            </HStack>
            <Input
                fontSize = '15px'
                variant = 'outline'
                id="emailAddress"
                name="emailAddress"
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
                    fontSize = '15px'
                    variant = 'outline'
                    id="rePassword"
                    name="rePassword"
                    type='password'
                    placeholder="*Re-enter Password"
                    isRequired
                    onChange = {onChange}
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