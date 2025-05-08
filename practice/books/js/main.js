const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputGenre = document.getElementById('genre');
const inputImage = document.getElementById('image');


// adding book func
function addBook() {
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const genre = inputGenre.value;
    const image = inputImage.value;

    fetch('http://localhost:3000/api/v1/books/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            author: author,
            genre: genre,
            image: image
        })
    })
        .then(() => {console.log('Book added successfully');
        // Clear input fields
        inputTitle.value = '';
        inputAuthor.value = '';
        inputGenre.value = '';
        inputImage.value = '';
})
        .catch(error => console.log('Error', error));
}

function getBooks() {
   let result = '';
   let booksList = [];
   fetch('http://localhost:3000/api/v1/books/')
      .then(response => response.json())
      .then(responseJson => {
        booksList = responseJson;
        console.log(responseJson);
        booksList.forEach(book => {
            result += `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.image}</td>
                <td><button class="delete-btn" data-id="${book.id}">Delete</button></td>
            </tr>`;
        });
            document.getElementById('books').innerHTML = result;
        // Add event listeners after the buttons are created
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', 
                    function() {
                        const id = this.getAttribute
                        ('data-id');
                        deleteBook(id);
                    });
                });  
      })
      .catch(error => {
         console.log('Error', error);
         
      })
}

function deleteBook(id) {
  fetch(`http://localhost:3000/api/v1/books/${id}`,
  {
    method: 'DELETE'
  })
  .then(response => {
    console.log('Book deleted successfully');
    getBooks();
  }) 
 .catch(error => console.log('Error', error));
}


// event listeners
document.getElementById('addBook').addEventListener('click', addBook);
document.getElementById('showBooks').addEventListener('click', getBooks);
  
