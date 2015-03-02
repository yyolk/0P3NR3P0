exports.getShowLogo = function(name) {
  logoMap = {
      'netartizens': "netartizens.png",
      'furtherfield': "furtherfield_logo.png",
      'glitChicago': "glitchicago.jpg"
  }
  return logoMap[name]
}