module.exports = function(req, res) {

    var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
    url += '?' + $.param({
        'api-key': "cf9b4f4cd0454fd3b15ac584bcc5dd35",
        'query': req.body.search
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
        console.log(result)
        res.status(200)
            .json(result)
    }).fail(function(err) {
        throw err;
    });
}