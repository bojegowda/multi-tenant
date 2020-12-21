var createNamespace = require('continuation-local-storage').createNamespace;
var session = createNamespace('mySession');


// export function to bind current namespace to the req and res
exports.bindCurrentNamespace = function (req, res, next) {
    session.bindEmitter(req);
    session.bindEmitter(res);

    session.run(() => {

        // console.log(req.headers);
        let tenantId = req.headers.tenantid;
        session.set('tenant', tenantId);
        next();

    });
}