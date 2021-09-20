import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "1ba8fbc1-d243-45b8-a04c-4563ad8ec939"
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then( response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe})
    },
    logout(email, password, rememberMe = false ) {
        return instance.delete(`auth/login`)
    }

}
export const profileAPI = {
    getUserId(userId) {
        return instance.get(`profile/` + userId)
    },
    getUserStatus(userId) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status) {
        return instance.put('profile/status', {status : status})
    },
    savePhoto(file) {
        let formData = new FormData()
        formData.append("image", file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profileData) {
        return instance.put('profile', profileData)
    }
}
export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    }
}
