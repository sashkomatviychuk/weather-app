import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import classNames from 'classnames';

import { showModal } from './../actions/modal';
import { reloadAllCards } from './../actions/cards';

const navClasses = classNames([
    'navbar',
    'navbar-expand-sm',
    'bg-app',
    'navbar-dark',
    'justify-content-between',
]);

const navUlClasses = classNames([
    'navbar-nav',
    'navbar-collapse',
    'justify-content-end',
]);

class Header extends Component {

    reloadCardsHandler = () => {
        this.props.reloadCards();
    }

    showCitiesModalHandler = () => {
        this.props.showCitiesModal();
    }

    render() {
        return (
            <nav className={navClasses}>
                <div className="app__title">
                    <span className="custom-icon icon-app"></span>
                </div>
                <ul className={navUlClasses} id="navbarSupportedContent">
                    <li className="nav-item">
                        <button
                            onClick={this.reloadCardsHandler}
                            type="button"
                            className="btn btn-link nav-link custom-icon icon-reload"
                        >
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            onClick={this.showCitiesModalHandler}
                            type="button"
                            className="btn btn-link nav-link custom-icon icon-add"
                        >
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // reload cards modal
        reloadCards() {
            dispatch(reloadAllCards())
        },
        // show modal action
        showCitiesModal() {
            dispatch(showModal())
        }
    }
};

export default connect(undefined, mapDispatchToProps)(Header);
