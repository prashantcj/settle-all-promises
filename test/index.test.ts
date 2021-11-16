import { settle, stat } from './../src/index';
import { PromiseResult } from '../src/model/PromiseResult';

const p1 = new Promise<any>((resolve, reject) => {
    resolve('p1')
});

const p2 = new Promise<any>((resolve, reject) => {
  resolve('p2')
});

const p3 = new Promise<any>((resolve, reject) => {
  resolve('p3')
});

const p4 = new Promise<any>((resolve, reject) => {
  resolve('p4')
});

const p5 = new Promise<any>((resolve, reject) => {
  reject('p5')
});


const p6 = new Promise<any>((resolve, reject) => {
  reject(new Error('Test Error'))
});

const promises: Promise<any>[] = new Array(6);
promises[0] = p1;
promises[1] = p2;
promises[2] = p3;
promises[3] = p4;
promises[4] = p5;
promises[5] = p6;

test('Calling using settle() async-await', async (done) => {
  const results: PromiseResult[] = await settle(promises);
  verifyResult(results);
  done();
});

test('Calling using settle() using arrow function or lambda function', (done) => {
  settle(promises).then((results: PromiseResult[]) => {
    verifyResult(results);
    done();
  });
});

test('Calling using settle() using callback function', (done) => {
  const verifyResultsCallback = function (results: PromiseResult[]) {
    verifyResult(results);
    done();
  };
  settle(promises).then(verifyResultsCallback);
});

test('stat() test ', async (done) => {
  const results: PromiseResult[] = await settle(promises);
  const statistic = stat(results);
  expect(statistic.resolvedCount).toEqual(4);
  expect(statistic.rejectedCount).toEqual(2);
  done();
});


test('Call using async await ', async (done) => {
  const results: PromiseResult[] = await settle(promises);
  const statistic = stat(results);
  expect(statistic.resolvedCount).toEqual(4);
  expect(statistic.rejectedCount).toEqual(2);
  done();
});

function verifyResult(results: PromiseResult[]) {
  expect(results[0].original).toEqual(p1);
  expect(results[0].resultData).toEqual('p1');
  expect(results[0].errorData).toBeNull();

  expect(results[1].original).toEqual(p2);
  expect(results[1].resultData).toEqual('p2');
  expect(results[1].errorData).toBeNull();

  expect(results[2].original).toEqual(p3);
  expect(results[2].resultData).toEqual('p3');
  expect(results[2].errorData).toBeNull();

  expect(results[3].original).toEqual(p4);
  expect(results[3].resultData).toEqual('p4');
  expect(results[3].errorData).toBeNull();

  expect(results[4].original).toEqual(p5);
  expect(results[4].resultData).toBeNull();
  expect(results[4].errorData).toEqual('p5');

  expect(results[5].original).toEqual(p6);
  expect(results[5].resultData).toBeNull();
  expect(results[5].errorData instanceof Error).toBeTruthy();
  expect(results[5].errorData.message).toEqual('Test Error');
}
