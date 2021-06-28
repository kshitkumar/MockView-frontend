import { OpenInterviewRequestModel , FetchResponseModel} from "./OpenInterviewRequestModel"

export type Slot={
    slotTime:string,
    slotStatus:string
}

export  type InterviewSlotModel = {
    interviewDate:string
    interviewStartTime:Slot[]  
}


export const parseInterviewSlotModel =(fetchResponse:FetchResponseModel[])=>{
     let selectedInterviewSlotArray:InterviewSlotModel[] = [];
     let interviewDateSet = new Set<string>() ;
     fetchResponse.forEach((requestModel)=>{          
        interviewDateSet.add(requestModel.date);
     });

     interviewDateSet.forEach((interviewDate)=>{
        let slots:Slot[] =[];
        fetchResponse.forEach((date)=>{
               if(interviewDate===date.date){
                    slots.push({slotTime:date.startTime.slice(0,5),slotStatus:date.slotStatus});               
                 }});
           slots.sort((x:Slot,y:Slot)=>parseInt(x.slotTime.slice(0,2))-parseInt(y.slotTime.slice(0,2)));
           selectedInterviewSlotArray.push({interviewDate:interviewDate , interviewStartTime:slots}); 
         })

      return selectedInterviewSlotArray.sort((x,y)=>{
         return  (new Date( x.interviewDate) > new Date(y.interviewDate)) ?  1:-1 ;
       })
    }
