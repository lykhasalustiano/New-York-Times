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

// const apiUrls = [
//     'https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=yZMn0M2qMZZ73db9jKLRryq2vpGRHVZj',
//     'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=FGFGfSjcUsbw09HuTzKJsY2fAZMmkqwT'
// ];

// async function fetchAllData() {
//     try {
//         const fetchPromises = apiUrls.map(url => fetch(url).then(response => response.json()));
//         const results = await Promise.all(fetchPromises);

//         const reviews = results[0].results;
//         const bestsellers = results[1].results.books; 

//         const formattedReviews = reviews.map((review) => `
//             <div class="book">
//                 <h2>${review.book_title}</h2>
//                 <p><strong>Author:</strong> ${review.book_author}</p>
//                 <p><strong>Summary:</strong> ${review.summary}</p>
//                 <p><strong>Publication Date:</strong> ${review.publication_dt}</p>
//                 <a href="${review.url}" target="_blank">Read more</a>
//                 <hr>
//             </div>
//         `).join('');

//         const formattedBestsellers = bestsellers.map((book) => {
//             const buyLinks = book.buy_links ? book.buy_links.map(link => `
//                 <li><a href="${link.url}" target="_blank">${link.name}</a></li>
//             `).join('') : '';

//             return `
//                 <div class="book">
//                     <h2>${book.title}</h2>
//                     <p><strong>Author:</strong> ${book.author}</p>
//                     <img src="${book.book_image}" alt="${book.title}" width="${book.book_image_width}" height="${book.book_image_height}">
//                     <p><strong>Description:</strong> ${book.description}</p>
//                     <p><strong>Publisher:</strong> ${book.publisher}</p>
//                     <ul>
//                         <p><strong>Buy Links:</strong> ${buyLinks} </p>
//                     </ul>
//                     <hr>
//                 </div>
//             `;
//         }).join('');

//         document.getElementById('book-reviews').innerHTML = formattedReviews;
//         document.getElementById('to-read').innerHTML = formattedBestsellers;

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         document.getElementById('book-reviews').innerText = 'Error fetching data.';
//         document.getElementById('to-read').innerText = 'Error fetching data.';
//     }
// }

// function loadContent(sectionId) {
//     document.querySelectorAll('.section').forEach(section => {
//         section.style.display = 'none';
//     });

//     document.getElementById(sectionId).style.display = 'block';
// }

// document.addEventListener('DOMContentLoaded', () => {
//     loadContent('book-reviews');
//     fetchAllData();
// });

//     const backToTopButton = document.getElementById("back-to-top");

//     window.onscroll = function() {
//         scrollFunction();
//     };

//     function scrollFunction() {
//         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//             backToTopButton.style.display = "block";
//         } else {
//             backToTopButton.style.display = "none";
//         }
//     }

//     backToTopButton.onclick = function() {
//         document.body.scrollTop = 0; 
//         document.documentElement.scrollTop = 0; 
//     };


// TODO: enable this and remove line 5
// const API_URL =
// 'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key={token}';

// Define API URLs in an object
//const API_URLS = {
  //BookReviews: 'https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=yZMn0M2qMZZ73db9jKLRryq2vpGRHVZj',
//TopRead: 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=FGFGfSjcUsbw09HuTzKJsY2fAZMmkqwT'
//};

//const bookReviewsContainer = document.getElementById('book-reviews');
//const toReadContainer = document.getElementById('to-read');

// Function to fetch data from a given URL
//const fetchData = async (endpoint) => {
 // try {
   //   const response = await fetch(API_URLS[endpoint]);
//      const data = await response.json();
//      return data;
//  } catch (error) {
//      console.error('Error fetching data:', error);
 //     return [];
 // }
//};

// Function to create a list of book reviews
//const updateBookReviews = (data) => {
//  bookReviewsContainer.innerHTML = ''; // Clear previous content
 // const ul = document.createElement('ul'); // Create a <ul> element for the list

  //(data.results || []).forEach((review) => {
    //  const li = document.createElement('li'); // Create a list item for each review
      //li.innerHTML = `
        //  <div class="book">
          //    <h2>${review.book_title}</h2>
            //  <p><strong>Author:</strong> ${review.book_author}</p>
              //<p><strong>Summary:</strong> ${review.summary}</p>
           //   <p><strong>Publication Date:</strong> ${review.publication_dt}</p>
 //             <a href="${review.url}" target="_blank">Read more</a>
   //           <hr>
     //     </div>
     // `;
     // ul.appendChild(li); // Append the list item to the <ul>
 // });

 // bookReviewsContainer.appendChild(ul); // Append the <ul> to the container
//};

// Function to create a list of top reads
//const updateToRead = (data) => {
 // toReadContainer.innerHTML = ''; // Clear previous content
 // const ul = document.createElement('ul'); // Create a <ul> element for the list

  //(data.results || []).forEach((book) => {
   //   const li = document.createElement('li'); // Create a list item for each book
    //  const buyLinks = book.buy_links.map(link => `<li><a href="${link.url}" target="_blank">${link.name}</a></li>`).join('');
      
     // li.innerHTML = `
       //   <div class="book">
       //       <h2>${book.title}</h2>
             // <p><strong>Author:</strong> ${book.author}</p>
              //<img src="${book.book_image}" alt="${book.title}" width="${book.book_image_width}" height="${book.book_image_height}">
             // <p><strong>Description:</strong> ${book.description}</p>
              //<p><strong>Publisher:</strong> ${book.publisher}</p>
              //<ul>
                //  <p><strong>Buy Links:</strong></p>
                 // ${buyLinks}
              //</ul>
             // <hr>
          //</div>
    //  `;
      //ul.appendChild(li); // Append the list item to the <ul>
  //});

  //toReadContainer.appendChild(ul); // Append the <ul> to the container
//};

// Use Promise.all to fetch book reviews and top reads concurrently
//(async () => {
  //try {
    //  const [reviewData, toReadData] = await Promise.all([
      //    fetchData('BookReviews'),
        //  fetchData('TopRead')
    //  ]);

      //updateBookReviews(reviewData);
      //updateToRead(toReadData);
  //} catch (error) {
    //  console.error('Error:', error);
 // }
//})();


