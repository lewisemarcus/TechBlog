//Create, delete, and edit comment posts
const newFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('blog-id')) {
    const description = document.querySelector('#comment-desc').value.trim();
    const blog_id = event.target.getAttribute('blog-id');
    if (description) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ description, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace(`/blogs/${blog_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('comment-id')) {
    const id = event.target.getAttribute('comment-id');
    //const blogId = event.target.getAttribute('blog-id');
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  }
};

const cancelButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('cancel-id')) {
    const blog_id = event.target.getAttribute('blog-id');
    document.location.replace(`/blogs/${blog_id}`);
  }
};

const updateCommentHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('blog-id')) {
    const id = event.target.getAttribute('update-id');
    const description = document.querySelector('#comment-desc').value.trim();
    const blog_id = event.target.getAttribute('blog-id');

    if (description) {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/blogs/${blog_id}`);
      } else {
        alert('Failed to update comment');
      }
    }
  }
};

if (document.querySelector('.new-comment-form') != null)
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);

if (document.querySelector('.update-comment-form') != null)
  document
    .querySelector('.update-comment-form')
    //Why does submit not work in place of click?
    .addEventListener('click', updateCommentHandler);

if (document.querySelector('.comment-list') != null)
  document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);

if (document.querySelector('.cancel-button') != null)
  document
    .querySelector('.cancel-button')
    .addEventListener('click', cancelButtonHandler);
