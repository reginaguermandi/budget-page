import React, { useState } from 'react';

export default function InputNumber() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleChange = (e) => {
        e.preventDefault();
        // Do something with the input value
        console.log(inputValue);
    };

    return (
        <form onChange={handleChange}>
            <input className="border-2 border-gray-950"
                type="number"
                value={inputValue}
                onChange={handleInputChange} />
            <button type="submit">Submit</button>
        </form>
    );
}