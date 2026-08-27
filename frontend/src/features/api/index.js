import setupInterceptors from "./interceptors";
import api from "./axios";

export {
    getUserDashboard
} from "../dashboard/services/dashboardService";

export {
    default as adminDashboardService
} from "../admin/services/adminDashboardService";

export {
    default as userService
} from "../admin/services/userService";


/*
|--------------------------------------------------------------------------
| Setup Axios Interceptors
|--------------------------------------------------------------------------
*/

setupInterceptors(api);


export default api;