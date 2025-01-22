// Get references to the DOM elements
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postList = document.getElementById('postList');
const clearButton = document.getElementById('clearPosts');

// Load saved posts from localStorage
document.addEventListener('DOMContentLoaded', loadPosts);

// Function to handle form submission
postForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get values from the inputs
    const title = titleInput.value;
    const content = contentInput.value;

    if (title && content) {
        // Create a new post object
        const newPost = { title, content };
        
        // Save the post to localStorage
        savePost(newPost);

        // Add the post to the list
        addPostToPage(newPost);

        // Clear the form inputs
        titleInput.value = '';
        contentInput.value = '';
    }
});

// Function to save a new post to localStorage
function savePost(post) {
    // Get existing posts from localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Add the new post to the array
    posts.push(post);

    // Save the updated posts array back to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to load posts from localStorage and display them on page
function loadPosts() {
    // Get saved posts from localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Display each post
    posts.forEach(post => {
        addPostToPage(post);
    });
}

// Function to add a post to the page
function addPostToPage(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
    `;
    
    postList.prepend(postElement);
}

// Event listener for the Clear All Posts button
clearButton.addEventListener('click', () => {
    // Clear all posts from localStorage
    localStorage.removeItem('posts');

    // Clear all posts from the page
    postList.innerHTML = '';
});

