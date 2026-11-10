// import API from "./axios";

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve();
//     }
//   });

//   failedQueue = [];
// };

// // Response interceptor
// API.interceptors.response.use(
//   // (response) => response,
//   undefined,
//   async (error) => {
//     console.log("INTERCEPTOR CALLED");
//     const originalRequest = error.config;


//     // Check if access token has expired
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/refresh") &&
//       !originalRequest.url.includes("/auth/login")
//     ) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => API(originalRequest));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // Call refresh endpoint
//         await API.post("/auth/refresh");

//         processQueue(null);

//         // Retry original request
//         return API(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);

//         // Refresh token is invalid or expired
//         window.location.href = "/login";

//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject({ ...error });
//   },
// );



import API from "./axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Only handle 401 errors
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    // IMPORTANT: Mark request before putting it in the queue
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => API(originalRequest));
    }

    isRefreshing = true;

    try {
      // Request a new access token
      await API.post("/auth/refresh");

      // Retry queued requests
      processQueue(null);

      // Retry original request
      return API(originalRequest);

    } catch (refreshError) {
      processQueue(refreshError);

      localStorage.removeItem("isLoggedIn");

      window.location.href = "/login";

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

export default API;
