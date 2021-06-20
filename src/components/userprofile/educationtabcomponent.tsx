import React from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
  } from "@chakra-ui/react";


class EducationTabComponent extends React.Component {

    render(){
        return(
            <div>
            <FormControl id="email" isRequired width='96'> 
            <Input type = 'email' placeholder="Email" />
            </FormControl>
            <br />
            <FormControl id="phoneNo" isRequired width='96'>
            <Input type = 'phone' placeholder="Phone No" />
            </FormControl>
            <br />
            <FormControl id="city" isRequired  width='96' >
            <Input type = 'city' placeholder="City" />
            </FormControl>
            <br />
            <FormControl id="state" isRequired width='96'>
            <Input type = 'state' placeholder="State" />
            </FormControl>
            <br />
            <FormControl id="pinCode" isRequired width='96'>
            <Input type = 'pincode' placeholder="Pin Code" />
            </FormControl>
            <br />
            <FormControl id="country" isRequired width='96'>
            <Input type = 'country' placeholder="Country" />
            </FormControl>
        </div>    
        );
    }
}
export default EducationTabComponent;