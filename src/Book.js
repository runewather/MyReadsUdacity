import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info
        };
    }

    ChangeBookShelf = (e) => {
        if(e.target.value !== 'none') {
            this.props.setBookShelf(this.state.info, e.target.value);
        }             
    }

    render = () => {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + this.props.info.imageLinks.thumbnail + '")' }}></div>
                <div className="book-shelf-changer">
                    <select value={this.props.info.shelf} onChange={this.ChangeBookShelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.info.title}</div>
                <div className="book-authors">{this.props.info.authors[0]}</div>
            </div>
        )
    }
}

Book.propTypes = {
    info : PropTypes.object.isRequired,
    setBookShelf: PropTypes.func.isRequired
}

export default Book;
