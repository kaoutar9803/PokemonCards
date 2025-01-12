const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send('Accès interdit. Vous devez être administrateur.');
    }
    next();
  };
  
  module.exports = isAdmin;
  