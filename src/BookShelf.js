import React, {Component} from "react"
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
    render = () => {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.bookList.length > 0 ? this.props.bookList.map((book, index) => {   
                    if(!this.props.isLoading) {                       
                        return (<li key={index}><Book info={book} setBookShelf={this.props.setBookShelf} /></li>)
                    }
                    return null;   
                    }) : null}   
                </ol>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    name : PropTypes.string.isRequired,
    bookList : PropTypes.array.isRequired,
    setBookShelf: PropTypes.func.isRequired
}

export default BookShelf;