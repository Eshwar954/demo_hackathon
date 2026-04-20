import SimpleTable from '../components/SimpleTable'
import { enumLabels } from '../services/api'

function ProjectsPage({ role, sessionUser, form, onChange, onSubmit, projects, loading }) {
  const visibleProjects =
    role === 'PROJECT_OWNER' && sessionUser?.id
      ? projects.filter((project) => String(project.ownerId) === String(sessionUser.id))
      : projects

  const canCreate = role === 'PROJECT_OWNER'

  return (
    <div className="section-stack">
      {canCreate ? (
        <section className="content-card">
          <div className="section-header">
            <h3>Create project</h3>
            <p>Submit a new carbon reduction project to the backend.</p>
          </div>

          <div className="form-grid three-column">
            <label>
              <span>Project name</span>
              <input name="projectName" value={form.projectName} onChange={onChange} />
            </label>
            <label>
              <span>Project type</span>
              <select name="projectType" value={form.projectType} onChange={onChange}>
                {enumLabels.projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Location</span>
              <input name="location" value={form.location} onChange={onChange} />
            </label>
            <label>
              <span>Estimated reduction</span>
              <input name="estimatedReduction" type="number" value={form.estimatedReduction} onChange={onChange} />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="primary-button" onClick={onSubmit} disabled={loading}>
              Create project
            </button>
          </div>
        </section>
      ) : (
        <section className="content-card read-only-card">
          <p className="read-only-label">Read only</p>
          <h3>Project list</h3>
          <p>Only project owners can create projects. This view shows the available project records.</p>
        </section>
      )}

      <SimpleTable
        columns={['Name', 'Type', 'Location', 'Reduction', 'Status', 'Owner']}
        rows={visibleProjects.map((project) => ({
          id: project.id,
          cells: [
            project.projectName,
            project.projectType,
            project.location,
            project.estimatedReduction,
            project.status,
            project.ownerId,
          ],
        }))}
        emptyMessage="No projects found."
      />
    </div>
  )
}

export default ProjectsPage