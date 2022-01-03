
export function logger(message) {
    if(process.env.DEBUG == 1) {
        console.log(message);
    }
}