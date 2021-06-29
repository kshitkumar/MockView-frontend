import { Box, HStack, Heading} from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";

function ProfileSelection(props:any) {

    const location = useLocation();

    const history = useHistory();

    const handleInterviewerProfile = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log("Interviewer Selected");
        console.log(location.state); 
        props.updateRole("INTERVIEWER");
        window.sessionStorage.setItem("role","INTERVIEWER");
        history.push({pathname : "/my-interviews", state : location.state});
    };

    const handleCandidateProfile = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log("Candidate Selected");
        // console.log(location.state); 
        props.updateRole("CANDIDATE");
        window.sessionStorage.setItem("role","CANDIDATE");
        history.push({pathname : "/book-interview", state : location.state});
    };

  const  redirectIfNotLoggedIn=()=>{
       if( !props.isLoggedIn){
           console.log(props.isLoggedIn)
           history.push('/login');
       }
    }

    return(
      
        <Box  pt = "140px" w = '100%' color = '#0B294E'>
              {redirectIfNotLoggedIn()}
            <Heading textAlign = 'center' fontSize = '28px'>
                Choose a profile to continue
            </Heading>
            <HStack spacing = {20} justifyContent = 'center' pt = "50px" >
                <Box as="button" borderRadius = '8px' boxShadow = '0px 3px 6px #00000029' onClick = {handleInterviewerProfile}>
                    <Heading fontSize = '18px' m = '40px'>
                        I want to continue as an <br /><Heading fontSize = '24px'>Interviewer</Heading>
                    </Heading>
                </Box>
                <Box as="button" borderRadius = '3px' boxShadow = '0px 3px 6px #00000029' onClick = {handleCandidateProfile}>
                    <Heading fontSize = '18px' m = '40px'>
                        I want to continue as a <br /><Heading fontSize = '24px'>Candidate</Heading>
                    </Heading>
                </Box>
            </HStack>
            <Heading pt = '70px' textAlign = 'center' fontSize = '18px'>
                Want to do both? <br />You can always switch to the other profile later            
            </Heading>
        </Box>
    )
}

export default ProfileSelection;