
import {
  FileText,
  BookOpen,
  ExternalLink
} from 'lucide-react'

import { FaGithub } from 'react-icons/fa'



function ProjectCard({
  title,
  description,
  technologies,
  links = []
}) {

  // Select the appropriate icon based on link type
 function getLinkIcon(type) {

  if (type === 'github') {
    return FaGithub
  }

  if (type === 'report') {
    return FileText
  }

  if (type === 'publication') {
    return BookOpen
  }

  return ExternalLink
}

  return (

    <article className="project-card">


    <h3 className="project-title">
      {title}
    </h3>

    <p className="project-description">
      {description}
    </p>

    <div className="project-tech-section">

      <span className="project-tech-label">
        Technologies
      </span>

      <div className="project-technologies">

        {technologies.split(',').map((tech) => (

          <span
            key={tech.trim()}
            className="project-tech-tag"
          >
            {tech.trim()}
          </span>

        ))}

      </div>

    </div>



      {/* Display project links if available */}
      {links.length > 0 && (

        <div className="project-links">

          {links.map((link) => {

            const LinkIcon = getLinkIcon(link.type)

            return (

              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >

                <LinkIcon
                  size={16}
                  aria-hidden="true"
                />

                <span>{link.label}</span>

                <ExternalLink
                  size={13}
                  aria-hidden="true"
                />

              </a>

            )

          })}

        </div>

      )}

    </article>

  )

}

export default ProjectCard
