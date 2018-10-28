import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  
  constructor() {
    super();
    this.state = {
      books : []
    }
  }

  componentWillMount = () => {
    this.getBookList();
  }

  getBookList = () => {
    BooksAPI.getAll().then((bookList) => {   
      this.setState({
        books : bookList
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

  render = () => {   
    return (
      <div className="app">
          <Route exact path='/search' render={() => {return (<BookSearch handleInput={this.handleInput} books={this.state.books} setBookShelf={this.setBookShelf}/>)}} />
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
