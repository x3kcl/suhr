export interface AuthResponse {
    token: string;
    user: {
        id: number,
        status: string;
        role: string;
        first_name: string,
        last_name: string;
        email: string,
        timezone: string;
        locale: string;
    }
}
