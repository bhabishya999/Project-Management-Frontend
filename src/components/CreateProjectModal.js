import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CreateProjectModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        featured: false,
        category: '',
        city: '',
        type: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'featured' ? (value === 'true') : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            title: '',
            description: '',
            featured: false,
            category: '',
            city: '',
            type: ''
        })
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Create Project">
            <div className="modal-content">
                <h2>Create Project</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="large-input" />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="large-textarea" />
                    </label>
                    <label>
                        Featured:
                        <select name="featured" value={formData.featured} onChange={handleChange} className="large-select">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    <label>
                        Category:
                        <input type="text" name="category" value={formData.category} onChange={handleChange} required className="large-input" />
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required className="large-input" />
                    </label>
                    <label>
                        Project Type:
                        <input type="text" name="type" value={formData.type} onChange={handleChange} required className="large-input" />
                    </label>
                    <div className="modal-buttons">
                        <button type="button" onClick={onRequestClose}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateProjectModal;
