$(document).ready(function () {

    let current_instance = 'inbox';
    //CJ Web2
    generateEmails();

    $(document).on('click', '.subject a', function (e) {

        e.stopPropagation();

        const email_id = $(this).closest('.email_status').attr('data-id');

        const email_status = $(this).parents('.email').hasClass('new') ? 'read' : 'new';

        let url = base_url + 'email/getEmailDetails/' + email_id + '/' + email_status;

        const selector = $(this).parents('.email');
        // to prevent spamming buttons
        if (!instance) {

            instance = true;

            sendAjax(url, {}, '').done(function (response) {

                if (selector.hasClass('read')) {
                    selector.removeClass('read').addClass('new');
                    $(selector).find('.email-circle-status').attr('src', base_url + 'assets/images/circle-active.png');
                    $(selector).find('.print-icon').attr('src', base_url + 'assets/images/active-print-icon.png');
                    $(selector).find('.trash-icon').attr('src', base_url + 'assets/images/active-trash-icon.png');
                } else {
                    selector.removeClass('new');
                    selector.addClass('read');
                    $(selector).find('.email-circle-status').attr('src', base_url + 'assets/images/circle-inactive.png');
                    $(selector).find('.print-icon').attr('src', base_url + 'assets/images/print-icon.png');
                    $(selector).find('.trash-icon').attr('src', base_url + 'assets/images/delete-icon.png');
                }

                if (response.success) {

                } else {
                    $('.msg').html(response.message);
                }

                instance = false;

            });
        }

    });

    function generateEmails(offset = 0) {

        const url = base_url + 'email/getE';

        $('#email_list').html(``);

        if ($('.email-table .display-preloader').length < 1) {
            $('.email-table').append('<div class="display-preloader"></div>');
        }

        $('#pagination-info').html('<div class="pagination-preloader"></div>');
        $('#pagination').html('<div class="pagination-preloader"></div>');

        sendAjax(url, { search: '', instance: current_instance, offset: offset }, '', false).done(function (response) {

            if (response.result == '') {
                $('#email_list').html(`<tr class="empty"><td><span>Empty</span></td></tr>`);
            } else {
                $('#email_list').html(`<tbody>${response.result}</tbody>`);
            }

            rowsToShow = 20;
            rowsTotal = response.total;

            numOfPages = Math.ceil(rowsTotal / rowsToShow);

            updateTableAndView();
            clearLoaders()


        });

    }

    $('.password-wrapper').on('click', function () {
        changePassword();
    });

    let debounceTimer;

    $(document).on('keyup', '#searchinput', function () {

        const url = base_url + 'email/searchEmails';

        const btn_selector = $(this).next().find('img');

        const search_icon = base_url + '/assets/images/search-icon-white.png';

        const preloader_link = base_url + '/assets/images/purple-preloader.gif';

        btn_selector.attr('src', preloader_link);

        emptyTag('#email_list');

        console.log($('.email-table .display-preloader').length);

        if ($('.email-table .display-preloader').length < 1) {
            $('.email-table').append('<div class="display-preloader"></div>');
        }


        $('#pagination-info').html('<div class="pagination-preloader"></div>');
        $('#pagination').html('<div class="pagination-preloader"></div>');

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            sendAjax(url, { search: $(this).val(), instance: current_instance }, '', false).done(function (response) {

                if (response.result == '') {
                    $('#email_list').html(`<tr class="empty"><td><span>Empty</span></td></tr>`);
                } else {
                    $('#email_list').html(`<tbody>${response.result}</tbody>`);
                }

                setTimeout(function () {
                    updateTableAndView();
                    clearLoaders()
                    btn_selector.attr('src', search_icon);
                }, 300);

            })
        }, 500);

    });

    $(document).on('click', '.printform', function () {

        const id = { emails: [$(this).attr('data-id')] };

        const url = base_url + 'email/printEmail_Bulk';

        sendAjax(url, id, '', false).done(function (response) {

            if (response.success) {

                var w = 900;

                var h = 1000;

                var left = Number((screen.width / 2) - (w / 2));

                var tops = Number((screen.height / 2) - (h / 2));

                var a = window.open('', '', 'width=900,height=900,scrollbars=yes');

                if (response.print_subject == undefined) {
                    a.document.write(response.form_details);
                } else {
                    a.document.write(response.print_subject + response.form_details);
                }


                a.print();

                a.close();

            } else {
                swalHTML({ title: '', icon: 'error', html: 'Error' });
            }

        });

    });

    // call ajax prevention / to avoid duplicate ajax request when clicking an email.
    var instance = false;

    // $(document).on('dblclick', '#email_list .email:not(input)', function(e){

    // 	e.stopPropagation();

    // 	let id = $(this).find('.email_status').attr('data-id');
    //     let url = base_url+'email/getEmailDetails/'+id;

    // 	emptyTag($('.showtable'));
    // 	emptyTag($('.show-attachment'));

    // 	const selector = $(this);

    // 	sendAjax(url, {}, '').done(function(response) {

    // 		if(response.success){
    // 			swalHTML({title:'', icon:'', html:response.subject+response.attachment+response.form_details});
    // 		}else{
    // 			swalHTML({title:'', icon:'error', html:'Error'});
    // 		}

    // 	});

    // });

    $(document).on('click', '#trash-list', function (e) {

        e.stopPropagation();

        $('#searchinput').val('');

        $('.bulk_checkbox').prop('checked', false);

        document.title = `Trash | Online Forms Database | ${$('.comp-name').text()}`;

        current_instance = 'trash';

        email_ids = []

        $(this).hide();

        $('#inbox-list').show();

        emptyTag('#email_list');

        $('.email-table').append('<div class="display-preloader"></div>');

        $('#pagination-info').html('<div class="pagination-preloader"></div>');

        $('#pagination').html('<div class="pagination-preloader"></div>');

        const url = base_url + 'email/getTrashEmails';

        sendAjax(url, {}, '', true).done(function (response) {

            if (response.result == '') {
                $('#email_list').html(`<tr class="empty"><td><span>Empty</span></td></tr>`);
            } else {
                $('#email_list').html(`<tbody>${response.result}</tbody>`);
                $('#inbox').find('span').html(`Inbox (${response.counter})`);

                rowsTotal = response.deleted_counter;
                numOfPages = Math.ceil(rowsTotal / rowsToShow);
            }

            setTimeout(function () {
                updateTableAndView();
                clearLoaders()

            }, 300);

        });

    });

    $(document).on('click', '#inbox-list', function (e) {

        e.stopPropagation();

        $('#searchinput').val('');

        $('.bulk_checkbox').prop('checked', false);

        current_instance = 'inbox';

        document.title = `${company_name} | Online Forms Database | ${$('.comp-name').text()}`;

        email_ids = []

        $(this).hide();

        $('#trash-list').show();

        emptyTag('#email_list');

        $('.email-table').append('<div class="display-preloader"></div>');

        $('#pagination-info').html('<div class="pagination-preloader"></div>');

        $('#pagination').html('<div class="pagination-preloader"></div>');

        const url = base_url + 'email/searchEmails';

        sendAjax(url, {}, '', true).done(function (response) {

        
            if (response.result == '') {
                $('#email_list').html(`<tr class="empty"><td><span>Empty</span></td></tr>`);
            } else {
                $('#email_list').html(`<tbody>${response.result}</tbody>`);
            }

            setTimeout(function () {
                rowsTotal = response.counter;
                numOfPages = Math.ceil(rowsTotal / rowsToShow);
                updateTableAndView();
                clearLoaders()

            }, 300);

        });

    })

    let read = '';

    $(document).on('click', '.delete-email', function () {

        const param = current_instance == 'inbox' ? { title: 'Delete Email?', text: 'This email will be sent to trash.', icon: 'warning' } : { title: 'Delete Email?', text: 'This email will be deleted permanently.', icon: 'warning' };

        const url = current_instance == 'inbox' ? base_url + 'email/trashEmail_Bulk' : base_url + 'email/deleteEmail_Bulk';

        const id = $(this).attr('data-id');

        const current_page = $('.page-btn.active').attr('data-page');

        email_id = { id };

        confirmationSwal(param).then(function (e) {
            if (e.isConfirmed) {
                sendAjax(url, { emails: email_id }, '', false).done(function (response) {

                    if (response.success) {

                        $.each(response.ids, function (key, val) {

                            $(`.email_status[data-id=${val}]`).parents('tr').slideUp(500, function () {
                                $(this).remove();
                            });

                            const email_id = val;
                            const index = email_ids.indexOf(email_id);

                            if (index !== -1) {
                                email_ids.splice(index, 1);
                            }

                        })

                        $('.email').show();

                        //placing delay to update the pagination sa contents sa emails

                        setTimeout(function () {
                            emptyTag('#pagination-info');
                            emptyTag('#pagination');
                            updateTableAndView();
                            $(`.page-btn[data-page=${current_page}]`).trigger('click');
                        }, 500);

                        toastNotification({ icon: 'success', title: `The selected email has been successfully sent to the trash.` });

                        showEmail();

                    } else {

                        toastNotification({ icon: 'error', title: `${response.message}` });

                    }

                }).then(function () {

                });
            }
        });
    });

    $(document).on('click', '#bulk-print', function (e) {

        e.stopPropagation();

        const url = base_url + 'email/printEmail_Bulk';

        const param = { title: `Print Email?`, text: '(' + email_ids.length + ') Email' + (email_ids.length > 1 ? 's' : '') + ' will be printed.', icon: 'warning' };

        const email_count = email_ids.length;

        if (email_count == 0) {

            toastNotification({ icon: 'warning', title: 'No Email Selected' });
            return 0;
        }

        confirmationSwal(param).then(function (e) {
            if (e.isConfirmed) {
                sendAjax(url, { emails: email_ids }, '', false).done(function (response) {

                    if (response.success) {

                        const width = 900;

                        const height = 1000;

                        var a = window.open('', '', `width=${width},height=${height},scrollbars=yes`);

                        a.document.write(response.form_details);

                        a.print();

                        a.close();

                    } else {

                        toastNotification({ icon: 'error', title: `${response.message}` });

                    }

                }).then(function () {

                });
            }
        });

    });

    $(document).on('click', '#bulk-delete', function (e) {

        e.stopPropagation();

        const url = current_instance == 'inbox' ? base_url + 'email/trashEmail_Bulk' : base_url + 'email/deleteEmail_Bulk';

        const param = { title: `Delete Email(s)?`, text: current_instance == 'inbox' ? '(' + email_ids.length + ') Email' + `${email_ids.length > 1 ? 's' : ''}` + ' will be transfered to trash.' : '(' + email_ids.length + ') Email' + `${email_ids.length > 1 ? 's' : ''}` + ' will be permanently deleted.', icon: 'warning' };

        const email_count = email_ids.length;

        const current_page = $('.page-btn.active').attr('data-page');

        if (email_count == 0) {

            toastNotification({ icon: 'warning', title: 'No Email Selected' });
            return 0;

        }

        confirmationSwal(param).then(function (e) {
            if (e.isConfirmed) {
                sendAjax(url, { emails: email_ids }, '', false).done(function (response) {

                    if (response.success) {

                        $.each(response.ids, function (key, val) {

                            $(`.email_status[data-id=${val}]`).parents('tr').slideUp(500, function () {
                                $(this).remove();
                            });

                            let email_id = val;
                            let index = email_ids.indexOf(email_id);
                            if (index !== -1) {
                                email_ids.splice(index, 1);
                            }

                        })

                        $('.email').show();

                        //placing delay to update the pagination sa contents sa emails

                        setTimeout(function () {
                            emptyTag('#pagination-info');
                            emptyTag('#pagination');
                            updateTableAndView();
                            $(`.page-btn[data-page=${current_page}]`).trigger('click');
                        }, 500);

                        toastNotification({ icon: 'success', title: current_instance == 'inbox' ? `(${email_count}) Email${email_ids.length > 1 ? 's' : ''} ${email_count > 1 ? 'have' : 'has'} been moved to the trash.` : `(${email_count}) Email${email_count > 1 ? 's' : ''} ${email_count > 1 ? 'have' : 'has'} been successfully deleted.` });

                        showEmail();

                    } else {

                        toastNotification({ icon: 'error', title: `${response.message}` });

                    }

                }).then(function () {

                });
            }
        });

    });

    var rowsToShow = 20;
    // var rowsTotal = $("#email_list .email").length;
    // var numOfPages = Math.ceil(rowsTotal / rowsToShow);
    var rowsTotal = 200;
    var numOfPages = 20;

    function displayRows(pageNum) {
        const startRow = rowsToShow * (pageNum - 1);
        const endRow = startRow + rowsToShow;
        $("#email_list tr").hide().slice(startRow, endRow).show();

        // Update the information about shown entries
        const currentStart = startRow + 1;
        const currentEnd = Math.min(endRow, rowsTotal);

        if (rowsTotal == 0) {
            $("#pagination-info").html(`0-0 of 0`);
        } else {
            $("#pagination-info").html(`${currentStart < 0 ? 0 : currentStart}-${currentEnd} of ${rowsTotal}`);
        }
    }

    // function updatePaginationButtons(currentPage) {

    // 	emptyTag($("#pagination"));

    // 	let prevButton = $('<button class="page-btn prev-page" data-page="' + (currentPage - 1) + '">⟨</button>');
    // 	if (currentPage === 1) {
    // 		prevButton.prop("disabled", true);
    // 	}

    // 	$("#pagination").append(prevButton);

    // 	for (let i = 1; i <= numOfPages; i++) {
    // 		if (i == currentPage) {
    // 			$("#pagination").append('<button class="page-btn active" data-page="' + i + '">' + i + '</button>');
    // 		} else if (i === 1 || i === numOfPages || i === currentPage - 1 || i === currentPage + 1) {
    // 			$("#pagination").append('<button class="page-btn" data-page="' + i + '">' + i + '</button>');
    // 		} else if (i === currentPage - 2 || i === currentPage + 2) {
    // 			$("#pagination").append('...');
    // 		}
    // 	}

    // 	let nextButton = $('<button class="page-btn next-page" data-page="' + (currentPage + 1) + '">⟩</button>');
    // 	if (currentPage === numOfPages) {
    // 		nextButton.prop("disabled", true);
    // 	}
    // 	$("#pagination").append(nextButton);
    // }

    function updatePaginationButtons(currentPage) {
        emptyTag($("#pagination"));

        let prevButton = $('<button class="page-btn prev-page" data-page="1"><svg fill="#180087" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg></button>&nbsp;<button class="page-btn prev-page" data-page="' + (currentPage - 1) + '"><svg fill="#180087" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>');

        if (currentPage === 1) {
            prevButton.prop("disabled", true);
            prevButton.attr("style", "opacity: 0.5;");
        }

        $("#pagination").append(prevButton);

        for (let i = 1; i <= numOfPages; i++) {
            if (i == currentPage) {
                $("#pagination").append('<button class="page-btn active" data-page="' + i + '">' + i + '</button>');
            } else if (
                // Pages adjacent to current page.
                i === currentPage - 1 || i === currentPage + 1 ||
                i === currentPage - 2 || i === currentPage + 2 ||

                // First 5 pages if current page is 3 or below.
                (i <= 5 && currentPage <= 3) ||

                // Last 5 pages if current page is the last or second to last page.
                (currentPage >= numOfPages - 1 && i > numOfPages - 5)

                // Last 2 pages.
                // (numOfPages - i < 2)
            ) {
                $("#pagination").append('<button class="page-btn" data-page="' + i + '">' + i + '</button>');
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                // If you want to insert ellipsis for gaps, uncomment the next line.
                // $("#pagination").append('...');
            }
        }


        let nextButton = $('<button class="page-btn next-page" data-page="' + (currentPage + 1) + '"><svg fill="#180087" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg></button>&nbsp;<button class="page-btn next-page" data-page="' + numOfPages + '"><svg fill="#180087" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg></button>');
        if (currentPage === numOfPages) {
            nextButton.prop("disabled", true);
            nextButton.attr("style", "opacity: 0.5;");
        }

        $("#pagination").append(nextButton);

    }

    function updateTableAndView() {

        const currentPage = 1;

        const updatedPage = Math.min(currentPage, numOfPages);

        displayRows(updatedPage);
        updatePaginationButtons(updatedPage);
    }

    // updateTableAndView();

    let checkboxes = $(`.email-checkbox:visible`).length;

    let checked_checkboxes = $(`.email-checkbox:checked`).length;

    // Handle pagination button click
    $(document).on("click", ".page-btn", function (e) {

        e.stopPropagation();

        $('.bulk_checkbox').prop('checked', false);

        const pageNum = $(this).data('page');

        displayRows(pageNum);
        updatePaginationButtons(pageNum);

        const offset = (pageNum - 1) * 20;

        const url = base_url + 'email/getE';

        $('#email_list').html(``);

        if ($('.email-table .display-preloader').length < 1) {
            $('.email-table').append('<div class="display-preloader"></div>');
        }

        // $('#pagination-info').html('<div class="pagination-preloader"></div>');
        // $('#pagination').html('<div class="pagination-preloader"></div>');

        sendAjax(url, { instance: current_instance, offset: offset }, '', false).done(function (response) {

            if (response.result == '') {
                $('#email_list').html(`<tr class="empty"><td><span>Empty</span></td></tr>`);
            } else {
                $('#email_list').html(`<tbody>${response.result}</tbody>`);
            }

            $('.display-preloader').remove();

            $('.email-checkbox').each(function () {
                const id = $(this).attr('email-id');
                if ($.inArray(id, email_ids) !== -1) {
                    $(this).prop('checked', true);
                }
            });
            
            if($('.email-checkbox:checked').length == 20){
                $('.bulk_checkbox').prop('checked', true);
            }

            // rowsToShow = 20;
            // rowsTotal = response.total;

            // numOfPages = Math.ceil(rowsTotal / rowsToShow);

            // updateTableAndView();
            // clearLoaders()


        });

        checkboxes = $(`.email-checkbox:visible`).length;
        checked_checkboxes = $(`.email-checkbox:visible:checked`).length;

        if (checkboxes == checked_checkboxes && (checkboxes != 0 && checked_checkboxes != 0)) {
            $('.bulk_checkbox').prop('checked', true);
        } else {
            $('.bulk_checkbox').prop('checked', false);
        }

    });

    // by web2 team

    let email_ids = [];

    let b = false;

    var screenWidth = $(window).width();

    $(document).on('click', '#email_list .email:not(input)', function (e) {

        e.stopPropagation();

        if (e.target.type == 'checkbox') {
            return 0;
        } else {
            $(`input[type="checkbox"]`).prop('checked', false);
        }

        showEmail();

        emptyTag($('#s-emails'));

        email_ids = [];

        $('.email').each(function () {
            if ($(this).hasClass('checkbox-selected')) $(this).removeClass('checkbox-selected');
        });

        if (read) {
            read.removeClass('current');
        }

        read = $(this);
        read.addClass('current');

        if ($(e.target).is('input') || $(e.target).is('img')) {
            return 0;
        }

        const id = $(this).find('.email_status').attr('data-id');
        const url = base_url + 'email/getEmailDetails/' + id;

        emptyTag($('.showtable'));
        emptyTag($('.show-attachment'));

        selected_emails = ``;

        const selector = $(this);
        // to prevent spamming buttons
        if (!instance) {

            instance = true;

            sendAjax(url, {}, $('.show-subject')).done(function (response) {

                if (selector.hasClass('new')) {
                    selector.removeClass('new').addClass('read');
                    $(selector).find('.email-circle-status').attr('src', base_url + 'assets/images/circle-inactive.png');
                    $(selector).find('.print-icon').attr('src', base_url + 'assets/images/print-icon.png');
                    $(selector).find('.trash-icon').attr('src', base_url + 'assets/images/delete-icon.png');
                }

                if (response.success) {
                    $('.show-subject').html(response.subject);
                    $('.showtable').html(response.form_details);
                    $('.showtable').find('table').removeAttr('cellpadding');
                    $('.showtable').find('table').removeAttr('border');
                    $('.showtable').find('table').removeAttr('cellspacing');
                    $('.showtable').find('table').removeAttr('width');
                    // $('.showtable').children('div').attr('style', `border: 1px solid  !important;
                    // background-color: #fff;
                    // border-radius: 10px;`);
                    $('.show-attachment').html(response.attachment);
                    if (screenWidth <= 1200) {
                        $('.email-list').fadeOut();
                        $('.email-content').fadeIn();
                        $('.subject-wrapper').before(`<a class="return-email"><img src="${base_url}assets/images/prev-btn.png">&nbsp;Go Back</a>`);
                    }

                } else {
                    $('.msg').html(response.message);
                }

                instance = false;

            });
        }
    });

    $(document).on('click', '.return-email', function () {
        $('.email-list').fadeIn();
        $('.email-content').fadeOut();
        $(this).remove();
    })

    if (screenWidth <= 1200) {
        $('.email-content').hide();
    }

    var selected_emails = ``;

    $(document).on('change', `input[name='bulk-action']`, function (e) {

        e.stopPropagation();

        if ($(`input[name='bulk-action']`).is(':checked')) {
            $('input[checkbox-type="1"]:not(:checked):visible').each(function () {
                $(this).prop("checked", true);

                if (!email_ids.includes($(this).attr('email-id'))) {
                    email_ids.push($(this).attr('email-id'));
                }
                
            });

            $('input[checkbox-type="1"]:checked').each(function (index, element) {

                const id = $(this).attr('email-id');
                let content = $(element).parents('.email').find('.subject-inline').html();
                selected_emails += `<p data-id="${id}">[${content}]</p>`;
                $(element).parents('.email').addClass('checkbox-selected');

            });

            hideEmail();

            $('#s-emails').append(selected_emails);

            $('#email_counter').html(`${email_ids.length}`);
            b = true;
        } else {
            $('input[checkbox-type="1"]:checked:visible').each(function (index, element) {
                $(element).prop("checked", false);
                if ($(element).parents('.email').hasClass('checkbox-selected')) {
                    $(element).parents('.email').removeClass('checkbox-selected');
                }
            });

            showEmail()
            // Remove the visible email_ids from the array
            $('input[checkbox-type="1"]:visible').each(function () {
                let email_id = $(this).attr('email-id');
                let index = email_ids.indexOf(email_id);
                if (index !== -1) {
                    email_ids.splice(index, 1);
                }
            });

            $('#email_counter').html(`${email_ids.length}`);

            $('#s-emails').html('');

            selected_emails = ``;

            b = false;
        }

    });

    $(document).on('change', `input[checkbox-type="1"]`, function (e) {

        e.stopPropagation();

        b = true;

        let email_id = $(this).attr('email-id');

        if ($(this).is(':checked')) {
            if (!email_ids.includes(email_id)) {
                email_ids.push(email_id);
            }

            $(this).parents('tr').addClass(`checkbox-selected`);

            let content = $(this).parents('.email').find('.subject-inline').html();
            hideEmail();

            $('#s-emails').append(`<p data-id="${email_id}">[${content}]</p>`);

            $('#email_counter').html(`${email_ids.length}`);

        } else {
            let index = email_ids.indexOf(email_id);

            $(`p[data-id='${email_id}']`).remove();

            $(this).parents('tr').removeClass(`checkbox-selected`);

            if (index !== -1) {
                email_ids.splice(index, 1);
            }

            $('#email_counter').html(`${email_ids.length}`);
        }

        if (email_ids.length == 0) {
            showEmail();
        }

    });

    function showEmail() {
        $('.showtable').show();
        $('.selected-emails').hide();
        $('.show-subject').show();
        $('.show-attachment').show();
    }

    function hideEmail() {
        $('.showtable').hide();
        $('.selected-emails').show();
        $('.show-subject').hide();
        $('.show-attachment').hide();
    }

    // by web2 team
    $(document).on('submit', '#change_password', function (e) {

        e.preventDefault();

        const formdata = new FormData($(this)[0]);

        const url = base_url + '/panel/updatePassword';

        const param = { title: 'Change Password?', text: 'Are you sure you want to change your password?', icon: 'question' };

        // confirmationSwal(param).then(function(e){
        // if(e.isConfirmed){
        sendAjax(url, formdata, '', true).done(function (response) {

            if (response.success) {

                toastNotification({ icon: 'success', title: response.message });

            } else {

                $('#change_password').find('.error-message').html(response.message);

            }

        }).then(function () {

        });
        // }
        // });
    });
});

function emptyTag(selector) {
    $(selector).html('');
}

function clearLoaders() {
    $('.display-preloader').remove();
    $('.pagination-preloader').remove();
}


function changePassword() {

    swalHTML({
        html: `
	<div class="change-password">
	
		<div class="title">

		<h2>Change Password <span class="extra-title muted"></span></h2>

		</div>

		<form id="change_password">
			<div class="form-horizontal">

			<div class="control-group">

				<label for="current_password" class="control-label">Current Password</label>

				<div class="controls">

					<input class="custom-input" id="current_password" name="current_password" type="password">

				</div>

			</div>

			<div class="control-group">

				<label for="new_password" class="control-label">New Password</label>

				<div class="controls">

					<input class="custom-input" id="new_password" name="new_password" type="password">

				</div>

			</div>

			<div class="control-group">

				<label for="confirm_password" class="control-label">Confirm Password</label>

				<div class="controls">

					<input class="custom-input" id="confirm_password" name="confirm_password" type="password">

				</div>

				<label class="error-message"></label>
				
			</div>      

		</div>
		<button class="custom-btn" href="#" class="save" id="password_modal_save">Save Changes</button>
	</form>
	</div>
`});
}