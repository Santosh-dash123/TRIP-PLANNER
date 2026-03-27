export interface Member {
  Name: string;
  Email: string;
  Address: string;
  Role: string;
}
export interface MemberUI extends Member {
  isEdit: boolean; //Only For UI
}
export interface TripCreate {
  TripName: string;
  Location: string;
  TripDate: string;
  CreatedBy: number;
  Members: Member[];
}
