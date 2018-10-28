import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookSearch extends Component {

    constructor() {
        super();
        this.state = {
            booksFound : [],
            searchQuery : ''
        }
    }

    handleInput = (e) => {
        let query = e.target.value;
        this.setState(() => {
            return {searchQuery : query}
        })
        this.findBooks(query);
    }

    setBooksShelf(books) {
        let booksInShelf = this.props.books;
        for (let book of books) {
            book.shelf = "none";
        }

        for (let book of books) {
            for (let b of booksInShelf) {
                if (b.id === book.id) {
                    book.shelf = b.shelf;
                }
            }
        }
        return books;
    }
    
    findBooks = (query) => {
        if (query !== '') {
            BooksAPI.search(query).then((books) => {            
            this.setState({
                booksFound: []
            });
            if (books.length > 0) {    
                    let booksInShelf = this.setBooksShelf(books);
                    this.setState(() => {
                    return {booksFound : booksInShelf}
                    });
                }
            })
        } else {
            this.setState({
                booksFound: [], searchQuery: ''
            });
        }
    }

    render = () => {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/' className="close-search" onClick={this.props.getBookList}>Close</Link>
                <div className="search-books-input-wrapper">                
                    <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={this.handleInput}/>
                </div>
                </div>
                <div className="search-books-results">
                    {this.state.searchQuery.length > 0 ? <BookShelf name='Books Found' bookList={this.state.booksFound} setBookShelf={this.props.setBookShelf}/> : null}
                </div>
            </div>
        )
    }
}

BookSearch.propTypes = {
    setBookShelf : PropTypes.func.isRequired,
    getBookList : PropTypes.func.isRequired,
    books : PropTypes.array.isRequired
}

export default BookSearch