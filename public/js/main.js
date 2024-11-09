document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/blogs')
        .then(response => response.json())
        .then(data => {
            const blogContainer = document.getElementById('blogs');
            data.forEach(blog => {
                const blogElement = document.createElement('div');
                blogElement.classList.add('blog-post');
                blogElement.innerHTML = `
                    <h3>${blog.title}</h3>
                    <p>${blog.content}</p>
                `;
                blogContainer.appendChild(blogElement);
            });
        })
        .catch(error => console.error('Error fetching blogs:', error));
});
