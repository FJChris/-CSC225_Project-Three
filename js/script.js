jQuery(document).ready(function ($) {

    $("#loadSpin2").modal("show"); // need these two commands at the top or else the page loads with the second spinner showing
    $("#loadSpin2").modal("hide");



    function createBookListItem(book) {
        var $li = $('<li>');
        $li.addClass('list-group-item hover-invert cursor-pointer');
        $li.html(book.title);
        $li.data('bookId', book.id);
        return $li;
    }

    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function (response) {

        $("#loadSpin").modal("show");

        response.data.forEach( function (book) {
            $('#book-list').append(createBookListItem(book));
        });

        $("#loadSpin").modal("hide");
        
        $('.list-group-item').on('click', function() {
            
            $('.list-group-item').removeClass('active');
            var bookId = $(this).data('bookId');
            $(this).addClass('active');
            $('#cover').empty();
            $('#card-title').empty();
            $('#card-text').empty();
            $('#card-link').empty();

            $("#loadSpin2").modal("show");

            axios.get('http://csc225.mockable.io/books/' + bookId).then( function(response) { 

                console.log(response.data.cover); // making sure correct image loads
                var $img = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title);
                $('#cover').html($img);

                $("#loadSpin2").modal("hide");

                // loading information section
                var $bookTitle = '<u>' + response.data.title + '</u>';
                console.log($bookTitle); // was used to check errors
                $('#card-title').html($bookTitle);

                var $bookData = response.data;
                var $bookInfo;
                $bookInfo = '<p>' + '<b>Author:</b> ' + $bookData.author + ' <b>Language:</b> ' + $bookData.language + '</p>';
                $bookInfo += '<p>' + '<b>Pages:</b> ' + $bookData.pages + ' <b>Year:</b> ' + $bookData.year + '</p>';
                $bookInfo += '<p>' + '<b>Country of Origin:</b> ' + $bookData.country + '</p>';
                console.log($bookInfo); // was used to check errors
                $('#card-text').html($bookInfo);

                var $bookLink = response.data.link;
                $('#card-link').html($bookLink);
                $('#card-link').attr('href', $bookLink);
            });
            
        });

    });

});