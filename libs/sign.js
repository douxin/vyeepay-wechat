/**
 * @file
 * @module
 * @author Xin Dou
 * @copyright vyee.me
 * @date 11/29/15
 */
"use strict";

var md5 = require('md5');
var xml2js = require('xml2js');

class Sign {

    constructor(params, key) {
        this.params = params;
        this.key = key;

        this._setNonceString(32);
    }

    getSignature() {
        return new Promise((resolve, reject) => {
            if (!this.params) {
                reject(new Error('params is null'))
            } else if (!this.key) {
                reject(new Error('key is null'))
            } else {
                let signString = this._getSignatureString();
                this.params.set('sign', signString);
                resolve(this._mapToXml(this.params));
            }
        })
    }

    _setNonceString(length) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = chars.length;
        var nonceStr = '';
        var i;
        for (i = 0; i < (length || 32); i++) {
            nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        this.params.set('nonce_str', nonceStr);
    }

    _mapToXml(map) {
        var tmpArr = [];
        tmpArr.push(`<xml>`);
        map.forEach((val, key, map) => {
            tmpArr.push(`<${key}>${val}</${key}>`);
        });
        tmpArr.push(`</xml>`);
        return tmpArr.join('\n');
    }

    _getSignatureString() {
        let paramsString = this._paramsToString();
        let keyString = `key=${this.key.get('key')}`;
        let tmpString = [paramsString, keyString].join('&');
        return md5(tmpString).toUpperCase();
    }

    _paramsToString() {
        return this._setParamsToString(this._getKeysArray());
    }

    _getKeysArray() {
        let tmpArray = [];
        this.params.forEach((value, key, map) => {
            tmpArray.push(key);
        });
        return tmpArray.sort();
    }

    _setParamsToString(array) {
        var tmpArray = [];
        for (let p of array) {
            if (this.params.get(p)) {
                tmpArray.push(`${p}=${this.params.get(p)}`);
            }
        }
        return tmpArray.join('&');
    }
}

module.exports = Sign;