import axios from "axios";

import {
    DashboardSummary,
    SpeciesDistribution,
    CategoryDistribution
} from "../types/analytics";


const API =
"http://localhost:8080/api/analytics";



const analyticsAxios = axios.create();



analyticsAxios.interceptors.request.use(
    (config)=>{


        const token =
            localStorage.getItem("token");


        console.log("JWT TOKEN:", token);



        if(token){

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    }
);



export const getDashboardSummary = () =>

    analyticsAxios.get<DashboardSummary>(
        `${API}/dashboard`
    );




export const getSpeciesDistribution = () =>

    analyticsAxios.get<SpeciesDistribution[]>(
        `${API}/species-distribution`
    );




export const getCategoryDistribution = () =>

    analyticsAxios.get<CategoryDistribution[]>(
        `${API}/category-distribution`
    );