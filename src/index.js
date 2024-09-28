const apiUrls = [
  'https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=yZMn0M2qMZZ73db9jKLRryq2vpGRHVZj',
  'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=FGFGfSjcUsbw09HuTzKJsY2fAZMmkqwT'
];

async function fetchAllData() {
  try {
      const fetchPromises = apiUrls.map(url => fetch(url).then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      }));

      const results = await Promise.all(fetchPromises);
      const reviews = results[0].results;
      const bestsellers = results[1].results.books;

      const formattedReviews = reviews.map((review) => `
          <div class="book">
              <h2>${review.book_title}</h2>
              <p><strong>Author:</strong> ${review.book_author}</p>
              <p><strong></strong> ${review.summary}</p>
              <p><strong>Publication Date:</strong> ${review.publication_dt}</p>
              <a href="${review.url}" target="_blank">Read more</a>
              <hr>
          </div>
      `).join('');

      const formattedBestsellers = bestsellers.map((book) => {
          const buyLinks = book.buy_links ? book.buy_links.map(link => `
              <li><a href="${link.url}" target="_blank">${link.name}</a></li>
          `).join('') : '';

          return `
              <div class="book">
                  <h2>${book.title}</h2>
                  <p><strong>Author:</strong> ${book.author}</p>
                  <img src="${book.book_image}" alt="${book.title}" width="${book.book_image_width}" height="${book.book_image_height}">
                  <p><strong></strong> ${book.description}</p>
                  <p><strong>Publisher:</strong> ${book.publisher}</p>
                  <p><strong>Buy Links:</strong>
                      <ul>${buyLinks}</ul>
                  </p>
                  <hr>
              </div>
          `;
      }).join('');

      document.getElementById('book-review').innerHTML = formattedReviews;
      document.getElementById('to-read').innerHTML = formattedBestsellers;

  } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('content').innerText = 'Error fetching data.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAllData();
});

document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault(); 
      const targetId = this.getAttribute('href'); 
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight; 

          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth' 
          });
      }
  });
});