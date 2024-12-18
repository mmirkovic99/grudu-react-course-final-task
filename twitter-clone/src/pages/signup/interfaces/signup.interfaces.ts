export interface SignupData {
  email: FieldData;
  password: FieldData;
  username: FieldData;
  fullName: FieldData;
}

export interface FieldData {
  value: string;
  error: string;
}
