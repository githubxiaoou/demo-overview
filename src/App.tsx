import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Eye, Code, Loader2 } from "lucide-react";
import { siteConfig, type Project } from "./config";
import { ApiService } from "./services/api";
import "./App.css";

function App() {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取项目数据
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "未知错误");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const allTags = [
    "all",
    ...Array.from(new Set(projects.flatMap((p) => p.tags))),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesTag =
      selectedTag === "all" || project.tags.includes(selectedTag);
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  // 加载状态
  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
          <p>正在加载项目数据...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>加载失败</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h1 className="title">
            <span className="gradient-text">{siteConfig.title}</span>
          </h1>
          <p className="subtitle">{siteConfig.subtitle}</p>
        </div>
      </motion.header>

      {/* Search and Filter */}
      <motion.section
        className="search-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              placeholder="搜索项目..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="tags-container">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`tag ${selectedTag === tag ? "active" : ""}`}
              >
                {tag === "all" ? "全部" : tag}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <motion.section
          className="featured-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="container">
            <h2 className="section-title">
              <Star className="icon" />
              精选项目
            </h2>
            <div className="projects-grid featured">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  featured
                />
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* All Projects */}
      <motion.section
        className="projects-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="container">
          <h2 className="section-title">
            <Code className="icon" />
            所有项目
          </h2>
          <div className="projects-grid">
            {regularProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container">
          <p>© 2024 前端项目概览. 用 ❤️ 和 React 构建</p>
        </div>
      </motion.footer>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      className={`project-card ${featured ? "featured" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="card-header">
        <h3 className="project-title">{project.title}</h3>
        {featured && <span className="featured-badge">精选</span>}
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="project-stats">
        {project.stars && (
          <span className="stat">
            <Star className="stat-icon" />
            {project.stars}
          </span>
        )}
        {project.views && (
          <span className="stat">
            <Eye className="stat-icon" />
            {project.views}
          </span>
        )}
      </div>

      <div className="card-actions">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <ExternalLink className="btn-icon" />
          查看演示
        </a>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Github className="btn-icon" />
            源码
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default App;
