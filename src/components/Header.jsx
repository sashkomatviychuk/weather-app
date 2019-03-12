import React from 'react';
import setDisplayName from 'recompose/setDisplayName';
import Icon from './base/Icon';
import ShowModalButton from 'contianers/buttons/ButtonShowModal';
import ReloadCitiesButton from 'contianers/buttons/ButtonReload';

export default setDisplayName('Header')(() => {
    return (
        <header className="d-flex bg-app j-space-between ai-center">
            <div className="app-title">
                <Icon iconName="icon-app" />
            </div>
            <nav>
                <ul className="navbar">
                    <li className="nav-item">
                        <ReloadCitiesButton />
                    </li>
                    <li className="nav-item">
                        <ShowModalButton />
                    </li>
                </ul>
            </nav>
        </header>
    );
})