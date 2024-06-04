
document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("consForm");

  form.addEventListener("submit", function(event) {
      event.preventDefault();

      var email = document.getElementById("email").value;
      var name = document.getElementById("name").value;

      alert("Дякуємо " + name + "\n" + "Необхідна інформація надіслана на " + email);
  });
});



