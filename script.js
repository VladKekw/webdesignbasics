document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("consForm");

  form.addEventListener("submit", function(event) {
      event.preventDefault();

      var email = document.getElementById("email").value;
      var name = document.getElementById("name").value;

      alert("Дякуємо " + name + "\n" + "Необхідна інформація надіслана на " + email);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const blogForm = document.getElementById("blogForm");
  const userStories = document.getElementById("userStories");

  blogForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const storyTitle = document.getElementById("storyTitle").value;
      const storyText = document.getElementById("story").value;

      const data = JSON.stringify({ title: storyTitle, content: storyText });

      console.time('Save Post to PostgreSQL');
      fetch('http://localhost:3001/posts/postgresql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data
      })
      .then(response => {
          console.timeEnd('Save Post to PostgreSQL');
          if (response.ok) {
              console.log('Історія успішно збережена до PostgreSQL');
              const newStory = document.createElement('div');
              newStory.innerHTML = `<h2>${storyTitle}</h2><p>${storyText}</p>`;
              userStories.appendChild(newStory);
              blogForm.reset();
          } else {
              console.error('Помилка при збереженні історії до PostgreSQL:', response.statusText);
          }
      })
      .catch(error => console.error('Error saving post to PostgreSQL:', error));

      console.time('Save Post to MongoDB');
      fetch('http://localhost:3001/posts/mongodb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data
      })
      .then(response => {
          console.timeEnd('Save Post to MongoDB');
          if (response.ok) {
              console.log('Історія успішно збережена до MongoDB');
              blogForm.reset();
          } else {
              console.error('Помилка при збереженні історії до MongoDB:', response.statusText);
          }
      })
      .catch(error => console.error('Error saving post to MongoDB:', error));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const loadPostButtonPostgres = document.getElementById('loadPostButtonPostgres');
  const loadPostButtonMongo = document.getElementById('loadPostButtonMongo');
  const userStories = document.getElementById('userStories');

  if (loadPostButtonPostgres) {
      loadPostButtonPostgres.addEventListener('click', () => {
          console.time('Load Posts from PostgreSQL');
          fetch('http://localhost:3001/posts/postgresql')
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then(posts => {
                  console.timeEnd('Load Posts from PostgreSQL');
                  userStories.innerHTML = '';
                  posts.forEach(post => {
                      const postElement = document.createElement('div');
                      postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
                      userStories.appendChild(postElement);
                  });
              })
              .catch(error => console.error('Error fetching posts from PostgreSQL:', error));
      });
  } else {
      console.error('Button with ID "loadPostButtonPostgres" not found.');
  }

  if (loadPostButtonMongo) {
      loadPostButtonMongo.addEventListener('click', () => {
          console.time('Load Posts from MongoDB');
          fetch('http://localhost:3001/posts/mongodb')
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then(posts => {
                  console.timeEnd('Load Posts from MongoDB');
                  userStories.innerHTML = '';
                  posts.forEach(post => {
                      const postElement = document.createElement('div');
                      postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
                      userStories.appendChild(postElement);
                  });
              })
              .catch(error => console.error('Error fetching posts from MongoDB:', error));
      });
  } else {
      console.error('Button with ID "loadPostButtonMongo" not found.');
  }
});
