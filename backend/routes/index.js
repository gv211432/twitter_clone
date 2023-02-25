var router = require('express').Router();

router.get('/', function (req, res, next) {
  console.log(req.session);
  // if (req.session.views) {
  //   req.session.views++;
  //   res.setHeader('Content-Type', 'text/html');
  //   res.write('<p>views: ' + req.session.views + '</p>');
  //   res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
  //   res.end();
  // } else {
  //   req.session.views = 1;
  //   res.end('welcome to the session demo. refresh!');
  // }
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Node.js upload images</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
      <style>
        div.preview-images > img {
          width: 30%;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <div class="row">
          <div class="col-sm-8 mt-3">
            <h4>Node.js upload images - bezkoder.com</h4>
  
            <form class="mt-4"
              action="api/user/63f5c606cc5f492375671a24/uploadProfilePic"
              method="POST"
              enctype="multipart/form-data"
            >
              <div class="form-group">
                <input
                  type="file"
                  name="file"
                  id="input-files"
                  class="form-control-file border"
                />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-sm-12">
            <div class="preview-images"></div>
          </div>
        </div>
      </div>
  
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
      <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      <script>
        $(document).ready(function() {
          let imagesPreview = function(input, placeToInsertImagePreview) {
            if (input.files) {
              let filesAmount = input.files.length;
              for (i = 0; i < filesAmount; i++) {
                let reader = new FileReader();
                reader.onload = function(event) {
                  $($.parseHTML("<img>"))
                    .attr("src", event.target.result)
                    .appendTo(placeToInsertImagePreview);
                };
                reader.readAsDataURL(input.files[i]);
              }
            }
          };
          $("#input-files").on("change", function() {
            imagesPreview(this, "div.preview-images");
          });
        });
      </script>
    </body>
  </html>
  `);
});

module.exports = router;
