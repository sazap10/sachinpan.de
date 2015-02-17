/*global $:false */
$(window).scroll(function() {
    if ($('.navbar').offset().top > 50) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
    } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
    }
});

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(function() {
    $('body').on('input propertychange', '.floating-label-form-group', function(e) {
        $(this).toggleClass('floating-label-form-group-with-value', !! $(e.target).val());
    }).on('focus', '.floating-label-form-group', function() {
        $(this).addClass('floating-label-form-group-with-focus');
    }).on('blur', '.floating-label-form-group', function() {
        $(this).removeClass('floating-label-form-group-with-focus');
    });
});

$(function() {

    $('input,textarea').jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            console.log($form);
            console.log(event);
            console.log(errors);
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $('input#name').val();
            var email = $('input#email').val();
            var message = $('textarea#message').val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: '/contact',
                type: 'POST',
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html('<div class=\'alert alert-success\'>');
                    $('#success > .alert-success').html('<button type=\'button\' class=\'close\' data-dismiss=\'alert\' aria-hidden=\'true\'>&times;')
                        .append('</button>');
                    $('#success > .alert-success')
                        .append('<strong>Your message has been sent. </strong>');
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger('reset');
                },
                error: function() {
                    // Fail message
                    $('#success').html('<div class=\'alert alert-danger\'>');
                    $('#success > .alert-danger').html('<button type=\'button\' class=\'close\' data-dismiss=\'alert\' aria-hidden=\'true\'>&times;')
                        .append('</button>');
                    $('#success > .alert-danger').append('<strong>Sorry ' + firstName + ', it seems that my mail server is not responding. Please try again later!');
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger('reset');
                },
            });
        },
        filter: function() {
            return $(this).is(':visible');
        },
    });

    $('a[data-toggle=\'tab\']').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

$(function() {
   $('hr').each(function () {
        var sibling = $(this).siblings('.title');
        if(sibling.length === 1){ 
            var width = sibling.css('width');
            console.log(width);
            $(this).css('max-width', width);
        }
    });
});
