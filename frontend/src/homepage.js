document.addEventListener("DOMContentLoaded", () => {
  const navbarHTML = `
    <nav class = "navbar">
      <div class = "navbar-left">
        <button class = "nav-btn">Social Media</button>
        <button class = "nav-btn">Contact Us</button>
      </div>
      <div class = "navbar-title">StudyBuddy</div>
      <div class = "navbar-right">
        <button class = "nav-btn" onclick="location.href='login.html'">Login</button>
        <button class = "nav-btn" onclick="location.href='2ndpage.html'">Sign Up</button>
      </div>
    </nav>
  `;

  const descriptionHTML = `
    <div class = "description-container">
        <div class = "description">
            <h2 class = "description-title">What is Study Buddy?</h2>
            <p class = "description-text">Study Buddy is a place to find like minded people and study with them to improve the studying experience. All you need to do is sign up and fill out the preferences you want so that we can try and find the best suited people for you.</p>
        </div>
    </div>
  `;

  const successHTML = `
    <div class = "success-container">
        <div class = "container">
            <h3 class = "name">Rebecca</h3>
            <p class = "description-text">StudyBuddy connected me with peers who matched my schedule and learning style—now studying feels productive and fun!</p>
        </div>

        <div class = "container">
            <h3 class = "name">Joshua</h3>
            <p class = "description-text">I used to struggle with motivation, but through StudyBuddy I found an accountability partner who kept me on track every week.</p>
        </div>

        <div class = "container">
            <h3 class = "name">David</h3>
            <p class = "description-text">Thanks to StudyBuddy, I joined a study group that helped me finally understand algorithms—and I aced my midterms!</p>
        </div>
    </div>
  `;

  document.getElementById("navbar").innerHTML = navbarHTML;
  document.getElementById("description").innerHTML = descriptionHTML;
  document.getElementById("success-stories").innerHTML = successHTML;
});