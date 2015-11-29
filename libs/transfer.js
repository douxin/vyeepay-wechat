/**
 * @file
 * @module
 * @author Xin Dou
 * @copyright vyee.me
 * @date 11/29/15
 */
"use strict";

var sign = require('./sign');
var request = require('request');
var parseString = require('xml2js').parseString;

class Transfer {
    const payUrl = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers';
    const queryUrl = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/gettransferinfo';

    constructor(payParams, key) {
        this.payParams = payParams;
        this.key = key;
    }

    toPay() {
        this._toRequest(this.payUrl);
    }

    toQuery() {
        this._toRequest(this.queryUrl);
    }

    _toRequest(url) {
        return new Promise((resolve, reject) => {
            new sign(this.payParams, this.key).getSignature().then(signStr => {
                return this._httpRequest({
                    url: url,
                    body: signStr,
                    method: 'POST'
                });
            }).then(payRet => {
                if (payRet && payRet["return_code"] === 'SUCCESS' && payRet["result_code"] === 'SUCCESS') {
                    resolve(payRet);
                } else {
                    reject(new Error('transfer failed, err_code is', payRet["err_code"], 'err_code_des is', payRet["err_code_des"]));
                }
            }).catch(err => {
                reject(err);
            })
        })
    }

    _httpRequest(options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    parseString(body, {trim: true}, (err, ret) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(ret["xml"]);
                        }
                    })
                } else {
                    reject(error);
                }
            })
        })
    }
}