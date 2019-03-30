import React from 'react';
import setDisplayName from 'recompose/setDisplayName';
import Icon from './base/Icon';
import ShowModalButton from 'contianers/buttons/ButtonShowModal';
import ReloadCitiesButton from 'contianers/buttons/ButtonReload';

export default setDisplayName('Header')(() => {
    return (
        <header className="header">
            <div className="header__app-title">
                <Icon icon="app" />
            </div>
            <nav>
                <ul className="navbar">
                    <li className="navbar__item">
                        <ReloadCitiesButton />
                    </li>
                    <li className="navbar__item">
                        <ShowModalButton />
                    </li>
                </ul>
            </nav>
        </header>
    );
})