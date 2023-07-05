const boom = require('@hapi/boom');

function checkRoles(...roles){
    return (req, res, next) => {
        if(roles.includes(req.user.role)) next();
        else next(boom.unauthorized());
    }
}

module.exports = checkRoles;
