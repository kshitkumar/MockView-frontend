import {InterviewSlotModel,Slot} from './InterviewSlotModel';

type SlotDTO={
    interviewDate:string,
    interviewStartTime:string

}
export type OpenInterviewRequestModel ={
    slotList:SlotDTO[],
    interviewCharges:number
}

export type FetchResponseModel={
    startTime:string,
    date:string,
    slotStatus:string
}

export const parseBookInterviewRequest=(interviewSlots:InterviewSlotModel[])=>{
    let bookInterviewRequest:OpenInterviewRequestModel={slotList:[],interviewCharges:500} ;
     interviewSlots.forEach((slotList:InterviewSlotModel)=>{
        slotList.interviewStartTime.filter((slot:Slot)=>slot.slotStatus==="VACANT").forEach((slot:Slot)=>{
                bookInterviewRequest.slotList.push({interviewDate:slotList.interviewDate,interviewStartTime:slot.slotTime})
             });
    });
    bookInterviewRequest.interviewCharges =10;
    return bookInterviewRequest ;
}

