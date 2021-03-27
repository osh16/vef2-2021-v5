import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div>
      <p>Síða fannst ekki</p>
      <Link to='/'>Til baka</Link>
    </div>
  )
}
