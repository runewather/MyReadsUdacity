import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  
  constructor() {
    super();
    this.state = {
      books : [],
      booksFound : [],
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

  setBookShelf = (book, shelf) => {    
    BooksAPI.update(book, shelf).then(this.getBookList);
  }

  getBooksByShelf = (shelfName) => {
    return this.state.books.filter((book) => 
      book.shelf === shelfName
    );
  }

  findBook = (e) => {
    let query = e.target.value;
    if(query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if(books.length > 0) {
          this.setState({
            booksFound : books
          }); 
        }
      });
    }
  }

  render = () => {   
    return (
      <div className="app">
          <Route e path='/search' render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
                <div className="search-books-input-wrapper">                
                  <input type="text" placeholder="Search by title or author" onChange={this.findBook}/>
                </div>
              </div>
              <div className="search-books-results">
                <BookShelf name='Books Found' bookList={this.state.booksFound} setBookShelf={this.setBookShelf}/>
              </div>
            </div>
          )} />
          <Route exact path='/' render={() => (
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
                <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
              </div>
            </div>
          )} />          
      </div>
    )
  }
}

export default BooksApp
