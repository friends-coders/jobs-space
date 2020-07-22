'use strict'
// work.ejs  


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
// /* Demo purposes only */
// for hire me page
$(".hover").mouseleave(
    function() {
        $(this).removeClass("hover");
    }
);
$(document).ready(function() {
    let user;
    let pass;
    let spass;



    $('#SIO').on('click', function(event) {
        signOut();
    })

    function signOut() {
        user = 'guest';
        pass = 'guest';
        spass = 'guest';

        set();
    }






    function get() {
        let uu = localStorage.getItem('user');
        let pp = localStorage.getItem('pass');
        let ss = localStorage.getItem('spass');
        if (uu && pp) {
            user = JSON.parse(uu);
            pass = JSON.parse(pp);
            spass = JSON.parse(ss);
        } else {
            user = 'guest';
            pass = 'guest';
            spass = 'guest';
        }
    }

    get();

    $('#SIForm').on('submit', function(event) {
        // event.preventDefault();
        // console.log(event)
        spass = event.target[1].value;
        set();
    })

    if ($('#ST').text() == "true") {
        user = $('#UN').text();
        pass = spass;
        set();
    }
    if ($('#te').text() == 'Congraidlation !!') {
        window.location.reload();
    }
    $('#SUForm').on('submit', function(event) {
        // event.preventDefault();
        user = event.target[0].value;
        pass = event.target[2].value;
        spass = event.target[2].value;
        // console.log(event.target[2].value)
        set();
    })

    if (user != 'guest') {
        $('#SIO').html('<a href="/signOut" onclick="signOut()">Sign out</a>')
    } else {
        $('#SIO').html('<a href="/sign">Sign in</a>')
    }

    function set() {
        let uu = JSON.stringify(user);
        let pp = JSON.stringify(pass);
        let ss = JSON.stringify(spass);
        localStorage.setItem('user', uu);
        localStorage.setItem('pass', pp);
        localStorage.setItem('spass', ss);
    }

    // console.log($('#ST').text() )


    var xhr = new XMLHttpRequest();
    var data = {
        param: user,
        param2: pass,
    };
    xhr.open('POST', '/data');
    xhr.onload = function(data) {
        console.log('loaded', this.responseText);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));



});


// profile

$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                first_name: {
                    validators: {
                        stringLength: {
                            min: 2,
                        },
                        notEmpty: {
                            message: 'Please supply your first name'
                        }
                    }
                },
                last_name: {
                    validators: {
                        stringLength: {
                            min: 2,
                        },
                        notEmpty: {
                            message: 'Please supply your last name'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your email address'
                        },
                        emailAddress: {
                            message: 'Please supply a valid email address'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your phone number'
                        },
                        phone: {
                            country: 'US',
                            message: 'Please supply a vaild phone number with area code'
                        }
                    }
                },
                address: {
                    validators: {
                        stringLength: {
                            min: 8,
                        },
                        notEmpty: {
                            message: 'Please supply your street address'
                        }
                    }
                },
                city: {
                    validators: {
                        stringLength: {
                            min: 4,
                        },
                        notEmpty: {
                            message: 'Please supply your city'
                        }
                    }
                },
                state: {
                    validators: {
                        notEmpty: {
                            message: 'Please select your state'
                        }
                    }
                },
                zip: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your zip code'
                        },
                        zipCode: {
                            country: 'US',
                            message: 'Please supply a vaild zip code'
                        }
                    }
                },
                comment: {
                    validators: {
                        stringLength: {
                            min: 10,
                            max: 200,
                            message: 'Please enter at least 10 characters and no more than 200'
                        },
                        notEmpty: {
                            message: 'Please supply a description of your project'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
    // Profile Forms
    // $("#updateInfoToggleBtn").click(function() {
    //     $("#contact_form").removeClass('hide');
    // });
});