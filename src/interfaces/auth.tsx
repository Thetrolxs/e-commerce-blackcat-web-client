export interface LoginRequest {
    email:    string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data:    Data;
    errors:  null;
}

export interface Data {
    firtsName: string;
    lastName:  string;
    email:     string;
    token:     string;
}