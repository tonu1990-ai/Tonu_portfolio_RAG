
function ProjectCard({ title, description, technologies }) {
  return (
    <article className="project-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <p>{technologies}</p>
    </article>
  )
}

export default ProjectCard
