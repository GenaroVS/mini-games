import axios, { AxiosResponse } from 'axios'
import { Rank } from './leadersSlice'

const API_URL = 'https://arcade-gvsalinas.herokuapp.com';

export const getTopPlayers = (level: string): Promise<AxiosResponse<Rank[]>> => {
    return axios.get(`${API_URL}/ms/${level}`);
}

export const postEntry = (params: Rank): Promise<AxiosResponse<Rank[]>> => {
    return axios.post(`${API_URL}/ms/${params['level']}`, { params: params });
}

