import React from 'react';

const ProjectCard = ({ image, title, description }) => {
    return (
        <div className="project-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="read-more-btn-container">
                <button className="read-more-btn">Read More</button>
            </div>
        </div>
    );
};

export default ProjectCard;
