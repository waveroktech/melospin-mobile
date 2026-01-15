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

// New response structure for promo requests
export interface PlayInfo {
  logType: string;
  playId: string;
  bidAmount: number;
  originalAmount: number;
  createdAt: string;
  promoStatus: string;
  requestStatus: string;
  rating: number;
  plays: number;
  launchDate: string | null;
}

export interface PromotionInfo {
  _id: string;
  status: string;
  promotionLink: string;
  paid: boolean;
  startDate: string;
  endDate: string;
  externalPlatformsLink: any[];
  amount: number;
  bidAmount: number;
  locations: string[];
  minPlayCount: number;
  promotionTypes: string[];
  paymentReference: string;
  promotersCount: number;
}

export interface PromoterInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  brandName: string;
  instagram: string;
}

export interface OwnerInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  brandName: string;
  instagram: string;
}

export interface PromoRequest {
  playInfo: PlayInfo;
  promotion: PromotionInfo;
  promoter: PromoterInfo;
  owner: OwnerInfo;
  proofs: any[];
}

export interface PaginationInfo {
  prevPage: number | null;
  nextPage: number | null;
  perPage: number;
  offset: number;
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface PromoRequestsData {
  promoRequests: PromoRequest[];
}

export interface PromoRequestsResponse {
  status: 'success' | 'failed';
  data: PromoRequestsData;
  message: string;
  code: string;
  pagination: PaginationInfo;
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
