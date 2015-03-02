exports.getShowLogo = function(name) {
  logoMap = {
      'netartizens': 'netartizens.png',
      'furtherfield': 'furtherfield_logo.png',
      'furtherfieldgallery': 'furtherfield_logo.png',
      'glitChicago': 'glitchicago.jpg',
      'sudlab': 'sudlablogo.png',
      'mcainternetsuperheroes': 'mca.gif',
  }
  return logoMap[name]
}