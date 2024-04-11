document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("submit");
    var form = document.getElementById("consForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var email = document.getElementById("email").value; // Отримуємо значення електронної пошти
        var name = document.getElementById("name").value; // Отримуємо значення імені

        alert("Дякуємо " + name + "\n" + "Необхідна інформація надіслана на " + email);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var blogForm = document.getElementById("blogForm");
    var userStories = document.getElementById("userStories");

    blogForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var storyText = document.getElementById("story").value;
        var newStory = document.createElement("p");
        newStory.textContent = storyText;
        userStories.appendChild(newStory);
        blogForm.reset();
    });
});

