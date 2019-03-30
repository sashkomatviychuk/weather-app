import React from 'react';

export default function Icon({ icon }) {
    return (
        <span className={`icon icon--tool icon--${icon}`}></span>
    );
}