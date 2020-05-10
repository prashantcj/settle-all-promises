import { PromiseResult } from "./model/PromiseResult";


export async function settle(promises: Promise<any>[]) {
    return new Promise<any>((resolve, reject) => {
        try {
            const results: PromiseResult[] = new Array(promises.length);
            for (let i = 0; i < promises.length; i++) {
                const promise = promises[i];
                promise.then(data => {
                    results[i] = new PromiseResult(promise, data, null);
                    if(promises.length === results.length) {
                        resolve(results);
                    }
                }).catch(err => {
                    results[i] = new PromiseResult(promise, null, err);
                    if(promises.length === results.length) {
                        resolve(results);
                    }
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}

export function stat(results: PromiseResult[]): {
    suceededCount: number
    failedCount: number
} {
    let stat = {
        suceededCount: 0,
        failedCount: 0
    }
    for (let i = 0; i < results.length; i++) {
        if (results[i].errorData) {
            stat.failedCount += 1;
        } else {
            stat.suceededCount += 1;
        }
    }
    return stat;
}
