import { INC_COUNTER, DEC_COUNTER } from "./testContent";

export const inc_counter = () => {
    return {
        type: INC_COUNTER   
    }
}

export const dec_counter = () => {
    return {
        type: DEC_COUNTER   
    }
}