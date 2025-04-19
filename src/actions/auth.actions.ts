import api from "../services/api"

interface LoginResponse {
    token: string
    name: string
}

export const login = (cpf: string, password: string) => {
    return api.post<LoginResponse>("/login" , {
        document: cpf,
        password: password
    })
}

