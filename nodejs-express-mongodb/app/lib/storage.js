var createNamespace = require('continuation-local-storage').createNamespace;
// define namespace name
const namespaceName = 'request';

// create namespace instance
const ns = createNamespace(namespaceName);


// export function to bind current namespace to the req and res
exports.bindCurrentNamespace = function (req, res, next) {
    ns.bindEmitter(req);
    ns.bindEmitter(res);

    ns.run(() => {
        next();
    });
}

// export function to set tenantId for current request being processed
exports.setCurrentTenantId = function (tenantId) {

    return ns.set(tenantId, tenantId);
}


// export function to get previously set tenantId of request
exports.getCurrentTenantId = function () {

    return ns.get('tenantId');
}