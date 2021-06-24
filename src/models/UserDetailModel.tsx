import React from 'react';
import {User} from './User';
import {EducationModel} from './EducationModel';
import { WorkExperienceModel } from './WorkExperienceModel';
import { SkillModel } from './SkillModel';
import { AwardModel } from './AwardModel';
import {AddressModel} from './AddressModel';


export type UserDetailModel={
    userEducationRequest:{userEducationList:EducationModel[]},
    userExperienceRequest:{userWorkExperienceList:WorkExperienceModel[]},    
    userSkillRequest:{skillList:SkillModel[]},
    userProfile:AddressModel,
    userAwardRequest:{userAwardList:AwardModel[]}
}


