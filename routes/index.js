
const path = require("path");
const router = require("express").Router();



// router.use(function(req, res) {
//     // res.sendFile(path.join(__dirname, "../Client/build/index.html"));
//     res.sendFile(path.join(__dirname, '../Client','build', 'index.html'));
//   });
  
  
//   const root = require('path').join(__dirname, '../Client', 'build')
// router.use(express.static(root));
// router.get("*", (req, res) => {
//     res.sendFile('index.html', { root });
// })
// If no API routes are hit, send the React app
// router.get(function(req, res) {
//   res.sendFile(path.join(__dirname, "../Client/build/index.html"));
// });

// router.get('*', (req, res) => res.sendFile('../Client/build/index.html'));

// router.get('*', function (req, res) {
//   const index = path.join(__dirname, 'client', 'build', 'index.html');
//   res.sendFile(index);
// });

module.exports = router;