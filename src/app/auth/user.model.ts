export interface User {
    id?: number;
    nome: string;
    username: string;
    email: string;
    enabled: boolean;
    password: string;

    roles?: string[];
    isAdmin?: User;
    authenticationToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
}
