$(document).ready(function(){
    
    
    $(document).on('submit', '#loginform', function(e){
    
        e.preventDefault();
        
        const data = new FormData($(this)[0]);
        
        const url = base_url+'login/authLogin';
        
        $('.msg').html('<p><img src="'+base_url+'assets/images/preloader.gif" width="100px" height="50px"></p>');

        sendAjax(url, data).done(function(response) {
            if(response.success){
                let page = window.location.href;
                location.reload();
            }else{
                $('.msg').html(response.message);
            }
       });
       
    });
    
    $(document).on('submit', '#createUserform', function(e){
    
        e.preventDefault();
        
        const data = new FormData($(this)[0]);
        
        const url = base_url+'login/createUser';
        
        $('.msg').html('<p><img src="'+base_url+'assets/images/preloader.gif" width="100px" height="50px"></p>');
        
        sendAjax(url, data).done(function(response) {
            if(response.success){
                $('.msg').html(response.message);
            }else{
                $('.msg').html(response.message);
            }
       });
       
    });
    
    $(document).on('submit', '#forgotform', function(e){
    
        e.preventDefault();
        
        const data = new FormData($(this)[0]);
        
        const url = base_url+'login/updatePassword';
        
        $('#prompt-message').html('<p><img src="'+base_url+'assets/images/preloader.gif" width="100px" height="50px"></p>');
        
        sendAjax(url, data).done(function(response) {
            if(response.success){
                
                $('#prompt-message').html(response.message);
                $('#success-message').show();
            }else{
                $('#prompt-message').html(response.message);
            }
       });
       
    });
    
    
    
});