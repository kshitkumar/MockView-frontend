import React from "react";
import { User } from "../../models/User";
import { InterviewTileModel } from "../../models/MyInterviewTileModel";
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box } from "@chakra-ui/react"



export default class UpcomingInterviewComponent extends React.Component<any,any>{

    constructor(props:any){
        super(props)
        this.state=({loggedInUser: window.sessionStorage.getItem("user")});
    }

    state={
        upComingInterviews:[],
        completedInterviews:[],
        loggedInUser: ""|null
    }
  


    myInterviewTile =(interviwTile:InterviewTileModel)=>{
     return({
           
     });
    }

    render(){
        return( 
            <Box  p={20}>
            <Tabs align='start' variant = 'enclosed-colored'>
            <TabList>
              <Tab>Upcoming</Tab>
              <Tab>Completed</Tab>
            </TabList>         
            <TabPanels>
              <TabPanel>
                
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
          </Box>


         );
    }
}