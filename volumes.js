document.addEventListener("DOMContentLoaded", function() {
        const lockedVolumes = document.querySelectorAll('.volume.locked .btn-primary');
        lockedVolumes.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                alert('This volume is locked. Please support us on Patreon for early access to chapters or wait for the official release date.');
            });
        });
    });
    $(document).ready(function() {
    // Function to check Patreon authentication status
    function checkPatreonAccess(token, callback) {
        $.ajax({
            url: 'authenticate.php',
            type: 'POST',
            dataType: 'json',
            data: { token: token },
            success: function(response) {
                callback(response.authenticated);
            },
            error: function(xhr, status, error) {
                console.error('Error checking Patreon access:', error);
                callback(false); // Default to not authenticated
            }
        });
    }

    // Handle chapter button clicks
    $('.btn-primary').on('click', function() {
        var chapterNum = $(this).data('chapter');
        var accessToken = 'USER_PATREON_ACCESS_TOKEN'; // Replace with actual user's Patreon access token

        // Check Patreon access before proceeding
        checkPatreonAccess(accessToken, function(authenticated) {
            if (authenticated) {
                // Redirect to the respective chapter page
                window.location.href = 'chapter' + chapterNum + '.html';
            } else {
                // Display message about Patreon access
                alert('It looks like this chapter is currently locked. Visit our Patreon to learn how to unlock it or wait until the release date.');
            }
        });
    });

});