import axios, { AxiosResponse } from 'axios'
import { Rank } from './leadersSlice'

let API_URL:string;

if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://arcade-gvsalinas.herokuapp.com';
} else {
    API_URL = 'http://localhost:5000'
}

export const getTopPlayers = (level: string): Promise<AxiosResponse<Rank[]>> => {
    return axios.get(`${API_URL}/ms/${level}`);
}

export const postEntry = (data: Rank): Promise<AxiosResponse<Rank[]>> => {
    return axios.post(`${API_URL}/ms/${data['level']}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

