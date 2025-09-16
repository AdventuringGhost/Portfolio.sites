import { SEO } from '../components/SEO'
import { NotesComponent } from '../components/NotesComponent'

export const Notes = () => {
  return (
    <>
      <SEO 
        title="Notes - Adventuring Ghost"
        description="A simple note-taking app connected to an API for persistent storage."
        keywords="notes, note-taking, productivity, app"
      />
      <NotesComponent 
        projectSlug="portfolio"
        title="Notes"
        description="A simple note-taking app connected to an API for persistent storage."
      />
    </>
  )
}
