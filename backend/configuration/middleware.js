export const verifySession = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json('No valid session');
    }
  
    next();  
  };
  
  export const verifyTester = (req, res, next) => {
    verifySession(req, res, () => {
      if (req.session.user && req.session.user.userType === 'tester') {
        next();  
      } else {
        return res.status(403).json('Forbidden');  
      }
    });
  };
  
  export const verifyTeamMember = (req, res, next) => {
    verifySession(req, res, () => {
      if (req.session.user && req.session.user.userType === 'teammember') {
        next();  
      } else {
        return res.status(403).json('Forbidden');  
      }
    });
  };
  