$(document).on('click', '#printform', function(e) {

    e.stopPropagation();

    const data = formcontent;
    
    const w = 900;

    const h = 1000;

    const left = Number((screen.width / 2) - (w / 2));

    const tops = Number((screen.height / 2) - (h / 2));

    const a = window.open('', '', 'width=900,height=900,scrollbars=yes');

    a.document.write(data);

    a.print();

    a.close();

});

function sendAjax(url, data = {}, selector = '', type = true) {

    if (type) {
        return $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: false,
                beforeSend: function() {
                    if (selector != '') $(selector).html('<div class="display-preloader"></div>');

                },
                success: function() {
                    return true;
                }
            })
            .fail(function(response) {
                console.log(response);
                if (selector != '') $(selector).html('AN ERROR HAS OCCURRED!');
            });
    } else {
        return $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                beforeSend: function() {
                    if (selector != '') $(selector).html('<div class="display-preloader"></div>');

                },
                success: function() {
                    return true;
                }
            })
            .fail(function(response) {
                console.log(response);
                if (selector != '') $(selector).html('AN ERROR HAS OCCURRED!');
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


function swalHTML(data = {}) {
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

function toastNotification(data = {}) {
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