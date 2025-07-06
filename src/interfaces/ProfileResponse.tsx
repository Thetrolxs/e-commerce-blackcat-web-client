export interface ProfileResponse {
  firtsName: string;
  lastName: string;
  email: string;
  thelephone: string;
  street: string;
  number?: number;
  commune?: string;
  region?: string;
  postalCode?: string;
  birthDate?: Date;
  registeredAt: Date;
  lastAccess: Date;
  isActive: boolean;
}
