document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("🎉 Registration Successful! See you at the Tech Fest.");
    this.reset();
});
