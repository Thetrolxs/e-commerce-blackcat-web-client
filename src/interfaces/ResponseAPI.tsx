export interface ResponseAPI {
    success?: boolean;
    message?: string;
    data?: any; // Use a more specific type if possible
    error?: string; // Optional field for error messages
}