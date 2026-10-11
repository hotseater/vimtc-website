          </div>

          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

          <script>
               const base_url = '<?= base_url() ?>';

               function sendAjax(url, data = {}) {
                    return $.ajax({
                              url: url,
                              type: 'POST',
                              data: data,
                              dataType: 'json',
                              processData: false,
                              contentType: false
                         })
                         .fail(function(response) {
                              alert('AN ERROR HAS OCCURRED!', response);
                         });
               }

               // Usage:
               
               
          </script>

          <script src="<?= base_url() ?>assets/js/global.js"></script>
          <?php
          __load_assets__($__assets__, 'js');
          ?>

          </body>

          </html>