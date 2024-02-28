// // const multer = require("multer");

// // const upload = multer({
// //   dest: "images",
// //   limits: {
// //     fileSize: 1000000,
// //   },
// //   fileFilter(req, file, cb) {
// //     //   if (!file.originalname.endsWith(".pdf"))
// //     //   {
// //     //     return cb(new Error("Please upload a PDF"));
// //     //   }
// //     //   // cb(new Error("File must be in pdf"));
// //     //   cb(undefined, true);
// //     //   // cb(undefined, false);

// //     if (!file.originalname.match(/\.(doc|docx)$/)) {
// //       return cb(new Error("Please upload Document file"));
// //     }
// //     // cb(new Error("File must be in pdf"));
// //     cb(undefined, true);
// //     // cb(undefined, false);
// //   },
// // });

// // app.post("/upload", upload.single("upload"), (req, res) => {
// //   res.send("uploaded succesfully");
// // });

// const multer = require("multer");

// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload Document file"));
//     }
//     cb(undefined, true);
//   },
// });

// // const expressMiddleware = (req, res, next) => {
// //   throw new Error("From my middleware");
// // };
// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send("uploaded succesfully");
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );
