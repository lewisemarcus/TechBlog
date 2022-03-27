//Create, delete, and edit comment posts
const newFormHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);
  if (event.target.hasAttribute('blog-id')) {
    const description = document.querySelector('#comment-desc').value.trim();
    const blog_id = event.target.getAttribute('blog-id');
    console.log('>>>>>>>>>DESC', blog_id);
    if (description) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ description, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('comment-id')) {
    const id = event.target.getAttribute('comment-id');
    //const blogId = event.target.getAttribute('blog-id');
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);
