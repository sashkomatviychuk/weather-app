import React from 'react';

export default function IconButton({ onClick, icon, children, ...props }) {
    return (<button
        type="button"
        onClick={onClick}
        className={`button icon--tool icon--${icon}`}
        {...props}
    >
        {children}
    </button>);
}