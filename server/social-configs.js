/**
 * Created by mikedanylov on 3/26/16.
 */

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

if (process.env.NODE_ENV === 'development') {
    console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
    // development kabar-dev
    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '1692183457696710',
        secret: '314ff1bb18f34b14e848aeed6369f3c9'
    });
} else if (process.env.NODE_ENV === 'production') {
    console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
    // production kabar
    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '1676912622557127',
        secret: '08b972abd33c60483593f3c37799e7b7'
    });
}
