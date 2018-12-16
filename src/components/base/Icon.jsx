import React from 'react';

export default function Icon({ iconName }) {
    return (
        <span className={`custom-icon ${iconName}`}></span>
    );
}