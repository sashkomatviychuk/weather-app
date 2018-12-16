import React from 'react';

export default function Button({ onClick, children, ...props }) {
    return (<button
        type="button"
        onClick={onClick}
        {...props}
    >
        {children}
    </button>);
}