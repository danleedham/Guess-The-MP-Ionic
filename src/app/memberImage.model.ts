export interface ParliDataTypeValue {
  name: string;
  value: any;
}

export interface MemberImage {
  person: ParliDataTypeValue;
  image: ParliDataTypeValue;
  givenName: ParliDataTypeValue;
  familyName: ParliDataTypeValue;
  displayAs: ParliDataTypeValue;
  mnisId: ParliDataTypeValue;
}
