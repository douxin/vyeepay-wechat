/**
 * @file
 * @module
 * @author Xin Dou
 * @copyright vyee.me
 * @date 11/29/15
 */
"use strict";


var transfer = require('./libs/transfer');
var params = new Map();
var key = new Map();

new transfer(params, key).toPay().then(val => {
    // pay is ok
}).catch(err => {
    // failed
});