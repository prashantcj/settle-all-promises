import { PromiseResult } from "./model/PromiseResult";


/**
 * @param promises Array of promises to be resolved
 * @returns {@link PromiseResult[]} array with results of all promises executions
 */
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

/**
 * @param results  {@link PromiseResult[]} array returned by {@link settle(promises: Promise<any>[])} method
 * @returns {@link PromiseResult[]} array with results of all promises executions
 */
export function stat(results: PromiseResult[]): {
    resolvedCount: number
    rejectedCount: number
} {
    let stat = {
        resolvedCount: 0,
        rejectedCount: 0
    }
    for (let i = 0; i < results.length; i++) {
        if (results[i].errorData) {
            stat.rejectedCount += 1;
        } else {
            stat.resolvedCount += 1;
        }
    }
    return stat;
}
