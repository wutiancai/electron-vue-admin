import {get,deletes,post,put} from "@/utils/request";

export default {
    annotation_segment (data) {
        return post(`/mark`, data)
    },
    annotation_crop (data) {
        return post(`/cropImg`, data)
    },
    do_fun (data) {
        return post(`/doFun`, data)
    }
}
