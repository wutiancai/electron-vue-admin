import {post} from "@/utils/request";

export default {
    runTrain (data) {
        return post(`/train/run_neural_net`, data)
    }
}
