export interface Promoter {
  promoterId: string;
}

export interface ExternalLink {
  name: string;
  link: string;
}

export interface CreatePromotionPayload {
  discographyId: string;
  promotionLink: string;
  startDate: string;
  endDate: string;
  amount: number;
  bidAmount: number;
  frequency: string;
  promoters: Promoter[];
  minPlayCount: number;
  externalLinks: ExternalLink[];
  locations: string[];
  promototionTypes?: string[]; // Note: keeping typo as provided in API
  promotionTypes?: string[]; // Also support correct spelling
}

export interface PromotionPaymentSummaryPayload {
  promotionLink: string;
  startDate: string;
  endDate: string;
  amount: number;
  bidAmount: number;
  frequency: string;
  promoters: Promoter[];
  minPlayCount: number;
  externalLinks: ExternalLink[];
  locations: string[];
  promototionTypes?: string[]; // Note: keeping typo as provided in API
  promotionTypes?: string[]; // Also support correct spelling
}

export interface PromotionOwner {
  firstName: string;
  lastName: string;
  currentUserType: string;
  promoterId: string;
}

export interface PromotionDetails {
  paid: boolean;
  status: 'pending' | 'active' | 'completed' | 'Pending approval';
  promotionLink: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  minPlayCount: number;
  locations: string[];
  owner: PromotionOwner;
  bidAmount: number;
  amount: number;
  promotersCount: number;
  promotionId: string;
  promotionTypes: any[];
}

export interface StatusReport {
  reportId: string;
  status: 'pending' | 'accepted' | 'declined';
  firstName: string;
  lastName: string;
  brandName: string;
  email: string;
  bidAmount: number;
}

export interface Promotion {
  _id: string;
  statusReport?: StatusReport[];
  details: PromotionDetails;
  title?: string;
  djCount?: number;
  playlistName?: string;
  timeline?: string;
}

export interface PromotionRequestsData {
  promotionRequests: Promotion[];
}

export interface PromotionRequestsResponse {
  data: PromotionRequestsData;
  message: string;
  code: string;
  status: 'success' | 'failed';
}

export interface ApproveDeclinePromoRequestPayload {
  status: 'accepted' | 'declined';
}

export interface UploadProofOfPlayPayload {
  file: {
    uri: string;
    type?: string;
    name?: string;
  };
}
