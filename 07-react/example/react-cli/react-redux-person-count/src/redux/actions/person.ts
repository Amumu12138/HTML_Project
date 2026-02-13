import { ADD_PERSON } from "../../contants"

export const addPersonAction = (data: Record<string, any>) => {
    return { type: ADD_PERSON, data }
}