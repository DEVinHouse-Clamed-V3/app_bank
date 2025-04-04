import axios from "axios"

interface LoginResponse {
    token: string
}

export const login = (cpf: string, password: string) => {
    return axios.post<LoginResponse>("http://192.168.0.37:3000/login" , {
        cpf: cpf,
        password: password
    })
}

