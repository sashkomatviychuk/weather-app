import React from 'react';

export default function Loader({ cityName, cityId, onRemove }) {
    return (
        <div className="card mt-3">
            <div className="card-body">
                <div className="d-flex j-space-between ai-center p-relative">
                    <h5 className="card-title">{cityName}</h5>
                    <button
                        className="remove-btn icon-close"
                        onClick={() => onRemove(cityId)}
                    >
                    </button>
                </div>
                <div>Loading...</div>
            </div>
        </div>
    );
}