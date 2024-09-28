const t=["https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=yZMn0M2qMZZ73db9jKLRryq2vpGRHVZj","https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=FGFGfSjcUsbw09HuTzKJsY2fAZMmkqwT"];async function e(){try{let e=t.map(t=>fetch(t).then(t=>{if(!t.ok)throw Error(`HTTP error! Status: ${t.status}`);return t.json()})),o=await Promise.all(e),r=o[0].results,n=o[1].results.books,i=r.map(t=>`
          <div class="book">
              <h2>${t.book_title}</h2>
              <p><strong>Author:</strong> ${t.book_author}</p>
              <p><strong></strong> ${t.summary}</p>
              <p><strong>Publication Date:</strong> ${t.publication_dt}</p>
              <a href="${t.url}" target="_blank">Read more</a>
              <hr>
          </div>
      `).join(""),s=n.map(t=>{let e=t.buy_links?t.buy_links.map(t=>`
              <li><a href="${t.url}" target="_blank">${t.name}</a></li>
          `).join(""):"";return`
              <div class="book">
                  <h2>${t.title}</h2>
                  <p><strong>Author:</strong> ${t.author}</p>
                  <img src="${t.book_image}" alt="${t.title}" width="${t.book_image_width}" height="${t.book_image_height}">
                  <p><strong></strong> ${t.description}</p>
                  <p><strong>Publisher:</strong> ${t.publisher}</p>
                  <p><strong>Buy Links:</strong>
                      <ul>${e}</ul>
                  </p>
                  <hr>
              </div>
          `}).join("");document.getElementById("book-review").innerHTML=i,document.getElementById("to-read").innerHTML=s}catch(t){console.error("Error fetching data:",t),document.getElementById("content").innerText="Error fetching data."}}document.addEventListener("DOMContentLoaded",()=>{e()}),document.querySelectorAll(".scroll-link").forEach(t=>{t.addEventListener("click",function(t){t.preventDefault();let e=this.getAttribute("href"),o=document.querySelector(e);if(o){let t=document.querySelector("header").offsetHeight,e=o.getBoundingClientRect().top+window.pageYOffset-t;window.scrollTo({top:e,behavior:"smooth"})}})});
//# sourceMappingURL=index.723a9507.js.map
