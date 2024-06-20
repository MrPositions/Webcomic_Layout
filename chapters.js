document.addEventListener('DOMContentLoaded', function() {
    const totalChapters = 36;
    const username = 'You'; // Replace with actual username logic if needed

    function getCurrentChapter() {
        const url = window.location.pathname;
        const chapterMatch = url.match(/chapter(\d+)\.html/);
        return chapterMatch ? parseInt(chapterMatch[1]) : 1;
    }

    function navigateToChapter(chapter) {
        window.location.href = `chapter${chapter}.html`;
    }

    const currentChapter = getCurrentChapter();

    // Populate dropdowns with chapters
    const topChapterDropdown = document.getElementById('topChapterDropdown');
    const bottomChapterDropdown = document.getElementById('bottomChapterDropdown');

    for (let i = 1; i <= totalChapters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Chapter ${i}`;
        if (i === currentChapter) {
            option.selected = true;
        }
        topChapterDropdown.appendChild(option.cloneNode(true));
        bottomChapterDropdown.appendChild(option);
    }

    // Event listener for top dropdown
    topChapterDropdown.addEventListener('change', (event) => {
        navigateToChapter(event.target.value);
    });

    // Event listener for bottom dropdown
    bottomChapterDropdown.addEventListener('change', (event) => {
        navigateToChapter(event.target.value);
    });

    // Function to update both dropdowns
    function updateChapterDropdowns(chapter) {
        topChapterDropdown.value = chapter;
        bottomChapterDropdown.value = chapter;
    }

    // Function to update chapter navigation buttons
    function updateNavigationButtons(chapter) {
        const isFirstChapter = chapter === 1;
        const isLastChapter = chapter === totalChapters;

        document.getElementById('firstChapterTopBtn').disabled = isFirstChapter;
        document.getElementById('prevVolumeTopBtn').disabled = chapter <= 3;
        document.getElementById('prevChapterTopBtn').disabled = isFirstChapter;
        document.getElementById('nextChapterTopBtn').disabled = isLastChapter;
        document.getElementById('nextVolumeTopBtn').disabled = chapter >= totalChapters - 2;
        document.getElementById('lastChapterTopBtn').disabled = isLastChapter;

        document.getElementById('firstChapterBottomBtn').disabled = isFirstChapter;
        document.getElementById('prevVolumeBottomBtn').disabled = chapter <= 3;
        document.getElementById('prevChapterBottomBtn').disabled = isFirstChapter;
        document.getElementById('nextChapterBottomBtn').disabled = isLastChapter;
        document.getElementById('nextVolumeBottomBtn').disabled = chapter >= totalChapters - 2;
        document.getElementById('lastChapterBottomBtn').disabled = isLastChapter;
    }

    // Initial call to update buttons and dropdowns based on current chapter
    updateNavigationButtons(currentChapter);
    updateChapterDropdowns(currentChapter);

    // Event listeners for navigation buttons
    document.getElementById('firstChapterTopBtn').addEventListener('click', () => navigateToChapter(1));
    document.getElementById('prevVolumeTopBtn').addEventListener('click', () => {
        const prevVolumeChapter = Math.max(currentChapter - 3, 1);
        navigateToChapter(prevVolumeChapter);
    });
    document.getElementById('prevChapterTopBtn').addEventListener('click', () => {
        const prevChapter = Math.max(currentChapter - 1, 1);
        navigateToChapter(prevChapter);
    });
    document.getElementById('nextChapterTopBtn').addEventListener('click', () => {
        const nextChapter = Math.min(currentChapter + 1, totalChapters);
        navigateToChapter(nextChapter);
    });
    document.getElementById('nextVolumeTopBtn').addEventListener('click', () => {
        const nextVolumeChapter = Math.min(currentChapter + 3, totalChapters);
        navigateToChapter(nextVolumeChapter);
    });
    document.getElementById('lastChapterTopBtn').addEventListener('click', () => navigateToChapter(totalChapters));

    document.getElementById('firstChapterBottomBtn').addEventListener('click', () => navigateToChapter(1));
    document.getElementById('prevVolumeBottomBtn').addEventListener('click', () => {
        const prevVolumeChapter = Math.max(currentChapter - 3, 1);
        navigateToChapter(prevVolumeChapter);
    });
    document.getElementById('prevChapterBottomBtn').addEventListener('click', () => {
        const prevChapter = Math.max(currentChapter - 1, 1);
        navigateToChapter(prevChapter);
    });
    document.getElementById('nextChapterBottomBtn').addEventListener('click', () => {
        const nextChapter = Math.min(currentChapter + 1, totalChapters);
        navigateToChapter(nextChapter);
    });
    document.getElementById('nextVolumeBottomBtn').addEventListener('click', () => {
        const nextVolumeChapter = Math.min(currentChapter + 3, totalChapters);
        navigateToChapter(nextVolumeChapter);
    });
    document.getElementById('lastChapterBottomBtn').addEventListener('click', () => navigateToChapter(totalChapters));

    // Handle comment form submission and loading comments
    const commentsKey = `comments-chapter-${currentChapter}`;

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
        const commentContainer = document.getElementById('submittedComments');
        commentContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-box');
            commentDiv.setAttribute('data-id', comment.id);
            commentDiv.innerHTML = `
                <strong>${comment.username}:</strong> <span class="comment-text">${comment.text}</span>
                ${comment.username === username ? `
                    <div class="comment-buttons">
                        <button class="btn btn-sm btn-secondary edit-comment" data-id="${comment.id}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-comment" data-id="${comment.id}">Delete</button>
                    </div>
                ` : ''}
            `;
            commentContainer.appendChild(commentDiv);
        });

        document.querySelectorAll('.edit-comment').forEach(button => {
            button.addEventListener('click', (event) => {
                const commentId = event.target.getAttribute('data-id');
                const commentBox = document.querySelector(`.comment-box[data-id="${commentId}"]`);
                const commentText = commentBox.querySelector('.comment-text').textContent;
                commentBox.innerHTML = `
                    <textarea class="form-control edit-area">${commentText}</textarea>
                    <div class="comment-buttons">
                        <button class="btn btn-sm btn-primary save-comment" data-id="${commentId}">Save</button>
                        <button class="btn btn-sm btn-secondary cancel-edit" data-id="${commentId}">Cancel</button>
                    </div>
                `;

                commentBox.querySelector('.save-comment').addEventListener('click', () => {
                    const newText = commentBox.querySelector('.edit-area').value;
                    let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
                    comments = comments.map(comment => {
                        if (comment.id === commentId) {
                            return { ...comment, text: newText };
                        }
                        return comment;
                    });
                    localStorage.setItem(commentsKey, JSON.stringify(comments));
                    loadComments();
                });

                commentBox.querySelector('.cancel-edit').addEventListener('click', () => {
                    loadComments();
                });
            });
        });

        document.querySelectorAll('.delete-comment').forEach(button => {
            button.addEventListener('click', (event) => {
                const commentId = event.target.getAttribute('data-id');
                let comments = JSON.parse(localStorage.getItem(commentsKey));
                comments = comments.filter(c => c.id !== commentId);
                localStorage.setItem(commentsKey, JSON.stringify(comments));
                loadComments();
            });
        });
    }

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        const commentText = document.getElementById('commentText').value;
        if (commentText.trim() !== '') {
            let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
            const newComment = {
                id: Date.now().toString(),
                username,
                text: commentText
            };
            comments.push(newComment);
            localStorage.setItem(commentsKey, JSON.stringify(comments));
            document.getElementById('commentText').value = '';
            loadComments();
        }
    });

    loadComments();
});
