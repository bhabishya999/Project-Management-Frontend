import React from 'react';

const Filter = ({ label, name, value, options, onChange }) => {
    return (
        <div className="filter">
            <label>{label}</label>
            <select name={name} value={value} onChange={onChange}>
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
