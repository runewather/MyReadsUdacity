import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {
  
  constructor() {
    super();
    this.state = {
      books : [],
      searchBookName : '',
      isLoading : true
    }
  }

  componentWillMount = () => {
    this.getBookList();
  }

  getBookList = () => {
    this.setState({ isLoading : true });
    BooksAPI.getAll().then((bookList) => {   
      this.setState({
        books : bookList,
        isLoading : false
      });     
    }); 
  }

  getBooksByName(e) {
    
  }

  setBookShelf = (book, shelf) => {    
    BooksAPI.update(book, shelf).then(this.getBookList);
  }

  getBooksByShelf = (shelfName) => {
    return this.state.books.filter((book) => 
      book.shelf === shelfName
    );
  }

  render = () => {   
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {<BookShelf name='Search' bookList={this.state.bookList} setBookShelf={this.setBookShelf}/>  }
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf name='Currently Reading' bookList={this.getBooksByShelf("currentlyReading")} setBookShelf={this.setBookShelf}/>                
              <BookShelf name='Want to Read' bookList={this.getBooksByShelf("wantToRead")} setBookShelf={this.setBookShelf}/> 
              <BookShelf name='Read' bookList={this.getBooksByShelf("read")} setBookShelf={this.setBookShelf}/> 
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
