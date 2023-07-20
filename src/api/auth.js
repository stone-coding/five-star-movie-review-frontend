import client from "./client";

/**
 * function to create a brand new user object
 * @param {*} userInfo contains name, email, and password
 * @returns error info or the response data
 */
export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    // ?. optional chanining operatial return undefined or null if obj on left not exist
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

/**
 *
 * @param {*} userInfo contains user id and OTP
 * @returns
 */
export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/user/verify-email", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    // ?. optional chanining operatial return undefined or null if obj on left not exist
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

/**
 *
 * @param {*} userInfo contains user id and OTP
 * @returns
 */
export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-in", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    // ?. optional chanining operatial return undefined or null if obj on left not exist
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

/**
 *
 * @param {*} userInfo contains user id and OTP
 * @returns
 */
export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/user/is-auth", {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    // ?. optional chanining operatial return undefined or null if obj on left not exist
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/user/forget-password", {email});
    return data;
  } catch (error) {
    const { response } = error;
    // ?. optional chanining operatial return undefined or null if obj on left not exist
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyPasswordResetToken = async (token, userId) => {
    try {
      const { data } = await client.post("/user/verify-password-reset-token", {
        token,
        userId
      });
      return data;
    } catch (error) {
      const { response } = error;
      // ?. optional chanining operatial return undefined or null if obj on left not exist
      if (response?.data) return response.data;
  
      return { error: error.message || error };
    }
  };

  export const resetPassword = async (passwordInfo) => {
    try {
      const { data } = await client.post("/user/reset-password", passwordInfo);
      return data;
    } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
  
      return { error: error.message || error };
    }
  };

  export const resendEmailVerificationToken = async (userId) => {
    try {
      const { data } = await client.post("/user/resend-email-verification-token", {userId});
      return data;
    } catch (error) {
      const { response } = error;
      if (response?.data) return response.data;
  
      return { error: error.message || error };
    }
  };


  
