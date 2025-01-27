import React, {useEffect, useState, useRef} from 'react';
import ProjectCard from './ProjectCard';
import Filter from './FilterComponent';
import CreateProjectModal from './CreateProjectModal';
import axios from "axios";
import { toast } from 'react-toastify';

const FeaturedProjects = () => {
    const isInitialMount = useRef(true);
    const typingTimeout = useRef(null);
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        type: "",
        city: "",
        category: ""
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Added totalPages state
    const isFetching = useRef(false);

    useEffect(() => {
        if (isInitialMount.current) {
            fetchProjectDetails(1);
            isInitialMount.current = false;
        }
    }, []);

    useEffect(() => {
        if (search) {
            if (typingTimeout.current) {
                clearTimeout(typingTimeout.current);
            }

            typingTimeout.current = setTimeout(() => {
                fetchProjectDetails(1, false);
            }, 500);

            return () => clearTimeout(typingTimeout.current);
        }
    }, [search]);

    useEffect(() => {
        if (filters.type || filters.city || filters.category) {
            fetchProjectDetails(1, false);
        }
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProjectDetails(nextPage, false);
    };

    const fetchProjectDetails = async (currentPage, shouldShowToast = true) => {
        if (isFetching.current) return;

        isFetching.current = true;

        try {
            const params = {
                title: search,
                type: filters.type,
                city: filters.city,
                category: filters.category,
                page: currentPage,
                limit: 10
            };

            const url = process.env.REACT_APP_API_URL + "project";
            const result = await axios.get(url, { params });

            if (result.status === 200) {
                setProjects((prevProjects) =>
                    currentPage === 1 ? result.data.data : [...prevProjects, ...result.data.data]
                );
                setTotalPages(result.data.pagination.totalPages); // Set totalPages here
                if (shouldShowToast) {
                    toast.success("Projects loaded successfully!");
                }
            }
        } catch (error) {
            console.error("Error fetching project details", error);
            toast.error("Failed to load projects.");
        } finally {
            isFetching.current = false;
        }
    };

    const handleCreateProject = async (formData) => {
        const url = process.env.REACT_APP_API_URL + "project";

        try {
            const result = await axios.post(url, formData);

            if (result.status === 200) {
                await fetchProjectDetails(1, false);
                return toast.success("Project created successfully!");
            }

        } catch (error) {
            console.log(error.response.status)
            if (error.response.status === 400) {
                return toast.error("The project title already exists");
            }
            console.error("Error creating project", error);
            toast.error("Failed to create project.");
        }
    };

    const handleClearFilters = () => {
        setFilters({
            type: "",
            city: "",
            category: ""
        });
        setSearch("");
    };

    useEffect(() => {
        fetchProjectDetails(1, false);
    }, [filters, search]);

    const featuredProjects = projects.filter(project => project.featured);
    const unfeaturedProjects = projects.filter(project => !project.featured);

    return (
        <div className="featured-projects">
            <div className="header">
                <h2>Featured Projects</h2>
                <button className="create-project-btn" onClick={() => setIsModalOpen(true)}>Create Project</button>
            </div>
            <div className="featured-project-list-small">
                {featuredProjects.map((project, index) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
            <div className="search-and-clear">
                <input
                    className="search-bar small"
                    type="text"
                    value={search}
                    placeholder="Search Projects..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="clear-filters-btn" onClick={handleClearFilters}>Clear Filters</button>
            </div>
            <div className="filters">
                <Filter label="Project Type" name="type" value={filters.type} options={["Personal", "Work"]} onChange={handleFilterChange}/>
                <Filter label="City" name="city" value={filters.city} options={["Kathmandu", "Lalitpur", "Bhaktapur"]} onChange={handleFilterChange}/>
                <Filter label="Categories" name="category" value={filters.category} options={["Research", "Education", "IT project"]} onChange={handleFilterChange}/>
            </div>
            <div className="project-list">
                <h3>Other Projects</h3>
                {unfeaturedProjects.map((project, index) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
            <div className="load-more">
                {page < totalPages && (
                    <button className="load-more-btn" onClick={handleLoadMore}>Load More</button>
                )}
            </div>
            <CreateProjectModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateProject}
            />
        </div>
    );
};

export default FeaturedProjects;
