import React from 'react';
import "../ThanksPage/Thanks.css";

export const Thanks = () => {
    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const age = urlParams.get('age');

    return (
        <div className="thanks">
            <h2>Thanks for submitting your information!</h2>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            {/* Add more content as needed */}
        </div>
    );
};