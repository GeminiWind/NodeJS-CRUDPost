import {default as swal} from 'sweetalert2';

//delete process
$('.deletePost').each(function() {
    var $this = $(this);
    $this.on("click", function() {
        swal({
            title: 'Enter post title',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            showLoaderOnConfirm: true,
            preConfirm: function(title) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        if (title != $this.data('post-title')) {
                            reject('Your title is not match.')
                        } else {
                            resolve()
                        }
                    }, 2000)
                })
            },
            allowOutsideClick: false
        }).then(function(title) {
            $.ajax({
                url: "/posts/" + $this.data('post-id') + "",
                type: "DELETE",
                success: function() {
                    $this.parent().parent().remove();
                    swal("Done!", "It was succesfully deleted!", "success");
                },
                error: function() {
                    swal({
                        title: "error",
                        text: "error",
                        type: "error"
                    })
                }
            });
        })
    });
});