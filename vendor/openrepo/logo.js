exports.getShowLogo = function(req) {
  logoMap = {
      'netartizens': "netartizens.png",
      'furtherfield': "furtherfield_logo.png",
      'glitChicago': "glitchicago.jpg"
  }
  return logoMap[req.path[req.path.length-1]]
}