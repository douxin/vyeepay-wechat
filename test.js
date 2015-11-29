/**
 * @file
 * @module
 * @author Xin Dou
 * @copyright vyee.me
 * @date 11/29/15
 */
"use strict";

var sign = require('./libs/sign');

const key = new Map();
key.set('key', '192006250b4c09247ec02edce69f6a2d');

var params = new Map();
params.set('appid', 'wxd930ea5d5a258f4f');
params.set('mch_id', '10000100');
params.set('device_info', '1000');
params.set('body', 'test');
params.set('nonce_str', 'ibuaiVcKdpRxkhJA');

var s = new sign(params, key);
var signature = s.getSignature();
//console.log(signature);

var xml = `<xml>
<return_code><![CDATA[SUCCESS]]></return_code>
<return_msg><![CDATA[]]></return_msg>
<mch_appid><![CDATA[wxec38b8ff840bd989]]></mch_appid>
<mchid><![CDATA[10013274]]></mchid>
<device_info><![CDATA[]]></device_info>
<nonce_str><![CDATA[lxuDzMnRjpcXzxLx0q]]></nonce_str>
<result_code><![CDATA[SUCCESS]]></result_code>
<partner_trade_no><![CDATA[10013574201505191526582441]]></partner_trade_no>
<payment_no><![CDATA[1000018301201505190181489473]]></payment_no>
<payment_time><![CDATA[2015-05-19 15：26：59]]></payment_time>
</xml>`;
var parseString = require('xml2js').parseString;
parseString(xml, {trim: true}, (err, ret) => {
    if (err) {
        console.error(err);
    } else {
        console.log(ret);
    }
});