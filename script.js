console.log("script.js loaded!");

async function getMovieData() {
  const movieName = document.getElementById("movieName").value.trim();
  const resultDiv = document.getElementById("result");

  if (!movieName) {
    resultDiv.innerHTML = "<p>❗ Please enter a movie name.</p>";
    return;
  }

  const apiKey = "483c16d7"; // 🔑 Replace with your own OMDb API key
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      resultDiv.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster}" alt="Poster of ${data.Title}" width="200"/>
        <p><strong>Rating:</strong> ⭐ ${data.imdbRating}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>❌ Movie not found. Try another title.</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>⚠️ Error fetching movie data. Please try again later.</p>`;
    console.error(error);
  }
}

function analyzeReview() {
  const review = document.getElementById("userReview").value;
  if (!review.trim()) {
    alert("Please write something!");
    return;
  }

  const positiveWords = ["good", "great", "amazing", "awesome", "excellent", "love", "like", "wonderful", "fantastic", "thalapathy"];
  const negativeWords = ["bad", "boring", "terrible", "hate", "awful", "poor", "worst"];

  let score = 0;

  const words = review.toLowerCase().split(/\s+/);

  words.forEach(word => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });

  let sentiment;
  if (score > 0) sentiment = "Positive 😊";
  else if (score < 0) sentiment = "Negative 😞";
  else sentiment = "Neutral 😐";

  document.getElementById("sentimentResult").innerText = `Sentiment: ${sentiment}`;
}
