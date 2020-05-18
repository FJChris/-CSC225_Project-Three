jQuery(document).ready(function ($) {

    function createBookListItem(book) {
        var $li = $('<li>');
        $li.addClass('list-group-item hover-invert cursor-pointer');
        $li.html(book.title);
        $li.data('bookId', book.id);
        $li.data('bookTitle', book.title);
        return $li;
    }

    var request = axios.get('http://csc225.mockable.io/books');

    request.then(function (response) {
        response.data.forEach( function (book) {
            $('#book-list').append(createBookListItem(book));
        });

        $('.list-group-item').on('click', function() {
            $('.list-group-item').removeClass('active');
            var bookId = $(this).data('bookId');
            $(this).addClass('active');
            $('#cover').html('Loading....');

            axios.get('http://csc225.mockable.io/books/' + bookId).then( function(response) { 
                console.log(response.data.cover);
                var $img = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title);
                $('#cover').html($img);

                // part that was added and not working
                var $title = $(this).attr(response.data.title);
                console.log(response.data.title);
                $('#card-title').html($title);
            });
            
        });

    });

});