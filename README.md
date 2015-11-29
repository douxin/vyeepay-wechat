# vyeepay-wechat
Nodejs 微信支付模块，仅支持 es6，所以需要在 Node V4.X 版本上进行使用

## 状态
目前仅接入了企业支付，还未进行测试

## 使用说明
按照 [微信企业支付](https://pay.weixin.qq.com/wiki/doc/api/mch_pay.php?chapter=14_1) 的参数说明，构造对应的参数，参数需要为 Map 格式

### 企业付款

```javascript
var params = new Map();
var key = new Map();

new transfer(params, key).toPay().then(val => {
    // pay is ok
}).catch(err => {
    // failed
});
```

### 企业付款查询

```javascript
var params = new Map();
var key = new Map();

new transfer(params, key).toQuery().then(val => {
    // pay is ok
}).catch(err => {
    // failed
});
```
