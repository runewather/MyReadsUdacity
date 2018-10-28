import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import './App.css'

class Book extends PureComponent {

    changeBookShelf = (e) => {
        this.props.setBookShelf(this.props.info, e.target.value);            
    }

    render = () => {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.info.imageLinks ? this.props.info.imageLinks.thumbnail : null}")`}}></div>
                <div className="book-shelf-changer">                    
                    <select value={this.props.info.shelf} onChange={this.changeBookShelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.info.title ? this.props.info.title : null}</div>
                {this.props.info.authors ? this.props.info.authors.map((author, index) => {
                    return (<div key={index} className="book-authors">{author}</div>)
                }) : null}                
            </div>
        )
    }
}

Book.propTypes = {
    info : PropTypes.object.isRequired,
    setBookShelf: PropTypes.func.isRequired
}

export default Book;
