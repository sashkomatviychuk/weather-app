import React from 'react';

export default function IconButton({ onClick, icon, children, ...props }) {
    return (<button
        type="button"
        onClick={onClick}
        className={`custom-icon ${icon}`}
        {...props}
    >
        {children}
    </button>);
}