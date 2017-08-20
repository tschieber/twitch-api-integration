var clientID = 'rnbgftyj4cpsqvj3oykz8i1ath4cn5',
    twitchAPIUrl = 'https://api.twitch.tv/kraken/';

$(function() {

    var user = 'timmy_san',
        follows = [];

    getUserFollows(user);

    function getUserFollows(userID) {
        $.getJSON(twitchAPIUrl + 'users/' + userID + '/follows/channels?client_id=' + clientID)
            .done(function(data) {
                $.each(data.follows, function ( i, val ) {
                    follows.push(data.follows[i].channel.name);
                });
                showFollowsStatus(follows);
            });
    }

    function showFollowsStatus(streams) {
        var streamStatusTable = $('#streamStatusTable'),
            streamStatusTableBody = streamStatusTable.find('tbody');

        $.each( streams, function( i, val ) {
            $.getJSON(twitchAPIUrl + 'streams/' + val + '?client_id=' + clientID)
                .done(function(data) {
                    // Stream is active
                    if (data.stream) {
                        streamStatusTableBody.append('<tr><td scope="row">' + val + '</td><td>Online</td><td>' + data.stream.game + '</td><td>' + data.stream.viewers + '</td></tr>');
                    } else {
                        streamStatusTableBody.append('<tr><td scope="row">' + val + '</td><td colspan=3>Offline</td></tr>');
                    }
                });
        });
    }

});
