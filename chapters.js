document.addEventListener('DOMContentLoaded', function() {
    const totalChapters = 36;
    const chapterNames = ['Introduction', 'Prologue']; // Add names for special chapters
    for (let i = 1; i <= totalChapters - 2; i++) {
        chapterNames.push(`Chapter ${i}`);
    }
    const username = 'You'; // Replace with actual username logic if needed

    function getCurrentChapter() {
        const url = window.location.pathname;
        if (url.includes('introduction.html')) return 'Introduction';
        if (url.includes('prologue.html')) return 'Prologue';
        const chapterMatch = url.match(/chapter(\d+)\.html/);
        return chapterMatch ? `Chapter ${parseInt(chapterMatch[1])}` : 'Introduction';
    }

    function navigateToChapter(chapter) {
        if (chapter === 'Introduction') {
            window.location.href = 'introduction.html';
        } else if (chapter === 'Prologue') {
            window.location.href = 'prologue.html';
        } else {
            const chapterNumber = parseInt(chapter.replace('Chapter ', ''));
            window.location.href = `chapter${chapterNumber}.html`;
        }
    }

    const currentChapter = getCurrentChapter();

    // Populate dropdowns with chapters
    const topChapterDropdown = document.getElementById('topChapterDropdown');
    const bottomChapterDropdown = document.getElementById('bottomChapterDropdown');

    chapterNames.forEach((name, index) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        if (name === currentChapter) {
            option.selected = true;
        }
        topChapterDropdown.appendChild(option.cloneNode(true));
        bottomChapterDropdown.appendChild(option);
    });

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

    // Function to get the current volume
    function getCurrentVolume(chapter) {
        const index = chapterNames.indexOf(chapter);
        return Math.floor(index / 3);
    }

    // Function to update chapter navigation buttons
    function updateNavigationButtons(chapter) {
        const volume = getCurrentVolume(chapter);
        const isFirstVolume = volume === 0;
        const isLastVolume = volume === Math.floor((totalChapters - 1) / 3);

        document.getElementById('firstChapterTopBtn').disabled = isFirstVolume && chapter === 'Introduction';
        document.getElementById('prevVolumeTopBtn').disabled = isFirstVolume;
        document.getElementById('prevChapterTopBtn').disabled = chapter === 'Introduction';
        document.getElementById('nextChapterTopBtn').disabled = isLastVolume && chapter === `Chapter ${totalChapters - 2}`;
        document.getElementById('nextVolumeTopBtn').disabled = isLastVolume;
        document.getElementById('lastChapterTopBtn').disabled = isLastVolume && chapter === `Chapter ${totalChapters - 2}`;

        document.getElementById('firstChapterBottomBtn').disabled = isFirstVolume && chapter === 'Introduction';
        document.getElementById('prevVolumeBottomBtn').disabled = isFirstVolume;
        document.getElementById('prevChapterBottomBtn').disabled = chapter === 'Introduction';
        document.getElementById('nextChapterBottomBtn').disabled = isLastVolume && chapter === `Chapter ${totalChapters - 2}`;
        document.getElementById('nextVolumeBottomBtn').disabled = isLastVolume;
        document.getElementById('lastChapterBottomBtn').disabled = isLastVolume && chapter === `Chapter ${totalChapters - 2}`;
    }

    // Initial call to update buttons and dropdowns based on current chapter
    updateNavigationButtons(currentChapter);
    updateChapterDropdowns(currentChapter);

    // Event listeners for navigation buttons
    document.getElementById('firstChapterTopBtn').addEventListener('click', () => navigateToChapter('Introduction'));
    document.getElementById('prevVolumeTopBtn').addEventListener('click', () => {
        const volume = getCurrentVolume(currentChapter);
        if (volume > 0) {
            const firstChapterOfPrevVolume = chapterNames[(volume - 1) * 3];
            navigateToChapter(firstChapterOfPrevVolume);
        }
    });
    document.getElementById('prevChapterTopBtn').addEventListener('click', () => {
        const index = chapterNames.indexOf(currentChapter);
        if (index > 0) {
            navigateToChapter(chapterNames[index - 1]);
        }
    });
    document.getElementById('nextChapterTopBtn').addEventListener('click', () => {
        const index = chapterNames.indexOf(currentChapter);
        if (index < chapterNames.length - 1) {
            navigateToChapter(chapterNames[index + 1]);
        }
    });
    document.getElementById('nextVolumeTopBtn').addEventListener('click', () => {
        const volume = getCurrentVolume(currentChapter);
        if (volume < Math.floor((totalChapters - 1) / 3)) {
            const firstChapterOfNextVolume = chapterNames[(volume + 1) * 3];
            navigateToChapter(firstChapterOfNextVolume);
        }
    });
    document.getElementById('lastChapterTopBtn').addEventListener('click', () => navigateToChapter(`Chapter ${totalChapters - 2}`));

    document.getElementById('firstChapterBottomBtn').addEventListener('click', () => navigateToChapter('Introduction'));
    document.getElementById('prevVolumeBottomBtn').addEventListener('click', () => {
        const volume = getCurrentVolume(currentChapter);
        if (volume > 0) {
            const firstChapterOfPrevVolume = chapterNames[(volume - 1) * 3];
            navigateToChapter(firstChapterOfPrevVolume);
        }
    });
    document.getElementById('prevChapterBottomBtn').addEventListener('click', () => {
        const index = chapterNames.indexOf(currentChapter);
        if (index > 0) {
            navigateToChapter(chapterNames[index - 1]);
        }
    });
    document.getElementById('nextChapterBottomBtn').addEventListener('click', () => {
        const index = chapterNames.indexOf(currentChapter);
        if (index < chapterNames.length - 1) {
            navigateToChapter(chapterNames[index + 1]);
        }
    });
    document.getElementById('nextVolumeBottomBtn').addEventListener('click', () => {
        const volume = getCurrentVolume(currentChapter);
        if (volume < Math.floor((totalChapters - 1) / 3)) {
            const firstChapterOfNextVolume = chapterNames[(volume + 1) * 3];
            navigateToChapter(firstChapterOfNextVolume);
        }
    });
    document.getElementById('lastChapterBottomBtn').addEventListener('click', () => navigateToChapter(`Chapter ${totalChapters - 2}`));

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
