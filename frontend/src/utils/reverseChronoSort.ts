import { Tweet } from "./APITypes";

export const reverseChronoSort = (arr: Tweet[]) => {
    const compare = (a: Tweet, b: Tweet) => {
        if (a.time < b.time){
            return 1
        } 
        return -1
    }
    return arr.sort(compare)
}