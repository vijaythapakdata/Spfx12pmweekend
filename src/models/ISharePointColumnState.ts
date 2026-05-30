export interface ISharePointColumnState{
    Name:string;
    Email:string;
    Department:string;
}

export interface ISharePointFormState{
    Name:string;
    Email:string;
    Age:any;
    Experience:number;
    FullAddress:string;
    Compensation:any;
    Permission:boolean;
    Admin:any;
    AdminId:any;
    Manager:any[];
    ManagerId:any[];
    City:string;
    Department:string;
    Gender:string;
    Skills:any[];
    DOB:any;
}


export interface ISPHTTPCLIENTCOLUMNSTATE{
    ID:number;
    Title:string;
    Age:any;
}

export interface IPaginatedTableState{
    key:number;
    Title:string;
    EmailAddress:string;
    Age:number;
    City:string;
    Admin:string;
}
export interface IUserInfo{
    id:string;
    displayName:string;
    mail:string;
    jobTitle?:string;
    department?:string;

}