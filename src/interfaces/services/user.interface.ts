export interface UserProfileUpdateRequest {
  userType?: string;
  brandName: string;
  instagram: string;
  twitter: string;
  music_genres: string[];
  user_id?: string;
}

export interface BankListResponse {
  bankCode: string;
  name: string;
  active: boolean;
}

export interface KycSubmissionPayload {
  userId: string;
  file: {uri: string; type?: string; name?: string};
  identificationType: string;
  identificationNumber: string;
  homeAddress: string;
  phoneNumber: string;
}
