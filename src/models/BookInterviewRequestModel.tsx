import {InterviewSlotModel} from './InterviewSlotModel';

type SlotDTO={
    interviewDate:string,
    interviewStartTime:string
}
export type BookInterviewRequestModel ={

    slotList:SlotDTO[],
    interviewCharges:number

}

export const parseBookInterviewRequest=(interviewSlots:InterviewSlotModel[])=>{
    let bookInterviewRequest:BookInterviewRequestModel={slotList:[],interviewCharges:10} ;
     interviewSlots.forEach((slot:InterviewSlotModel)=>{
             slot.interviewStartTime.forEach((time:string)=>{
                bookInterviewRequest.slotList.push({interviewDate:slot.interviewDate,interviewStartTime:time})
             });
    });
    bookInterviewRequest.interviewCharges =10;
    return bookInterviewRequest ;
}

