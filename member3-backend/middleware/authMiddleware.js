exports.protect = (req, res, next) => next();
exports.authorize = (...roles) => (req, res, next) => next();
