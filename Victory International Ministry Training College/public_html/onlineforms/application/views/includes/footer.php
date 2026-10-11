</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
     const base_url = '<?= base_url() ?>';
     const company_name = '<?= get_bloginfo('name'); ?>';
     function sendAjax(url, data = {}, selector = '', type = true) {
          
          if(type){
               return $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    beforeSend: function() {
                         if(selector != '') $(selector).html('<div class="display-preloader"></div>');
                         
                    },
                    success: function(){
                         return true;
                    }
               })
               .fail(function(response) {
                    console.log(response);
                    if(selector != '') $(selector).html('AN ERROR HAS OCCURRED!');
               });
          }else{
               return $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    beforeSend: function() {
                         if(selector != '') $(selector).html('<div class="display-preloader"></div>');
                         
                    },
                    success: function(){
                         return true;
                    }
               })
               .fail(function(response) {
                    console.log(response);
                    if(selector != '') $(selector).html('AN ERROR HAS OCCURRED!');
               });
          }
          
               
     }
     
     const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
     })
     
     
     function swalHTML(data = {}){
          return Swal.fire({
               title: data.title,
               icon: data.icon,
               html: data.html,
               showCloseButton: true,
               showCancelButton: false,
               showConfirmButton: false,
               focusConfirm: false,
               backdrop: `
               rgba(0,0,123,0.4)
               left top
               no-repeat
               `
          }).then((result) => {
               return result;
          });
     }

     function toastNotification(data = {}){
          Toast.fire({
               icon: data.icon,
               title: data.title
          })
     }

     async function confirmationSwal(data = {}) {
          return Swal.fire({
               title: data.title,
               text: data.text,
               icon: data.icon,
               showCancelButton: true,
               confirmButtonColor: 'rgba(62,0,179,1)',
               cancelButtonColor: 'rgba(24,0,135,1)',
               confirmButtonText: 'Confirm',
               backdrop: `
               rgba(0,0,123,0.4)
               left top
               no-repeat
               `
          }).then((result) => {
               return result;
          });
     }
</script>

<script src="<?= base_url() ?>assets/js/global.js"></script>
<?php
__load_assets__($__assets__, 'js');
?>

</body>

</html>