import {get,deletes,post,put} from "@/utils/request";

export default {
    getFiles (data) {
        return get(`/task/getImgPaths`, data)
    },
    getTasktypeFunArgs (data) {
        return get(`/task/getTasktypeFunArgs`, data)
    },
    getTasks (data) {
        return get(`/task/tasks/getTasks`, data)
    },
    getTasksTest (data) {
        return get(`/task/tasks/getTasksTest`, data)
    },
    getTaskById (data) {
        return get(`/task/tasks/getTaskById/${data.id}`, data)
    },
    getTaskTestById (data) {
        return get(`/task/tasks/getTaskTestById/${data.id}`, data)
    },
    deleteTasks (data) {
        return deletes(`/task/tasks/deleteTasks/${data.ids}`, data)
    },
    deleteTasksTest (data) {
        return deletes(`/task/tasks/deleteTasksTest/${data.ids}`, data)
    },
    createTasks (data) {
        return post(`/task/tasks/createTasks`, data)
    },
    updateTasks (data) {
        return put(`/task/tasks/updateTasks`, data)
    }
}
