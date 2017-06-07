import {
    default as swal
} from 'sweetalert2';
import axios from 'axios';
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
            axios.delete("/api/posts/" + $this.data('post-id')).then(function(response) {
                $this.parent().parent().remove();
                swal("Done!", "It was succesfully deleted!", "success");
            }).catch(function(error) {
                swal({
                    title: "Error",
                    text: "Whoops!!!Something went wrong",
                    type: "error"
                });
            });
        })
    });
});