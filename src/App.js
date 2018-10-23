import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {
  
  constructor() {
    super();
    this.state = {
      books : [],
      isLoading : true
    }
  }

  componentWillMount() {
    BooksAPI.getAll().then((bookList) => {   
      this.setState({
        books : bookList,
        isLoading : false
      });     
    });    
  }

  getBooksByShelf(shelfName) {
    return this.state.books.filter((book) => 
      book.shelf === shelfName
    );
  }

  render() {   
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
              <BookShelf name='Currently Reading' bookList={this.getBooksByShelf("currentlyReading")} isLoading={this.state.isLoading} />                
              <BookShelf name='Want to Read' bookList={this.getBooksByShelf("wantToRead")} isLoading={this.state.isLoading} /> 
              <BookShelf name='Read' bookList={this.getBooksByShelf("read")} isLoading={this.state.isLoading} /> 
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
