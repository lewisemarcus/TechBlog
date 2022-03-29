//Create, delete, and edit blog posts
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Failed to create blog');
    }
  }
};

const cancelButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('cancel-id')) {
    document.location.replace(`/dashboard`);
  }
};

const updateBlogHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('updoot-id')) {
    const id = event.target.getAttribute('updoot-id');
    const description = document.querySelector('#update-desc').value.trim();
    const name = document.querySelector('#update-name').value.trim();

    if (description && name) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ description, name }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to update blog');
      }
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Failed to delete blog');
    }
  }
};
if (document.querySelector('.new-blog-form') != null)
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);

if (document.querySelector('.blog-list') != null)
  document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);

if (document.querySelector('.update-blog-form') != null)
  document
    .querySelector('.update-blog-form')
    .addEventListener('submit', updateBlogHandler);
