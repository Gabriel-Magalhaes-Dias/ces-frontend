interface Role {
    name: string;
}

export interface User {
    id?: number;
    nome: string;
    username: string;
    email: string;
    enabled: boolean;
    password: string;
    roles?: Role[];
    isAdmin?: User;
    authenticationToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
}
