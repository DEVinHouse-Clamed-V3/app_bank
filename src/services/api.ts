import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { navigate } from "./navigationService";

const api = axios.create({
    baseURL: "http://192.168.0.37:3000"
})

api.interceptors.request.use(async (config) => {
    console.log("Interceptando requisição")
    const token = await AsyncStorage.getItem("@token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, async (error) => {
    console.log("Interceptando resposta")
    console.log(error.response)
    if (error.response?.status === 401 && error.response?.data?.error === "TOKEN_EXPIRED") {
        Alert.alert("Aviso", "Sessão expirada, faça login novamente");
        await AsyncStorage.removeItem("@token");
        navigate("Login")
        return 
        // Verificar por que está indo para o catch da requisição
    } else {
        return Promise.reject(error);
    }
});



export default api;