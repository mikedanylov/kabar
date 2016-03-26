/**
 * Created by mikedanylov on 3/26/16.
 */

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

// production kabar
//ServiceConfiguration.configurations.insert({
//    service: 'facebook',
//    appId: '1676912622557127',
//    secret: '08b972abd33c60483593f3c37799e7b7'
//});

// development kabar-dev
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1692183457696710',
    secret: '314ff1bb18f34b14e848aeed6369f3c9'
});