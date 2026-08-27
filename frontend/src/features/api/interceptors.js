const setupInterceptors = (api) => {

    /*
    |--------------------------------------------------------------------------
    | Request Interceptor
    |--------------------------------------------------------------------------
    */

    api.interceptors.request.use(
        (config) => {
            const token =
                localStorage.getItem("access_token");
            if (token) {
                config.headers =
                    config.headers || {};
                config.headers.Authorization =
                    `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );


    /*
    |--------------------------------------------------------------------------
    | Response Interceptor
    |--------------------------------------------------------------------------
    */

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                console.warn(
                    "Authentication required or token expired."
                );
            }
            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;