import { Link } from 'react-router-dom'
import routes from '../routes'

const Navigation = () => {
  return (
    <div className="navigation flex justify-center items-center m-4">
      {routes.map((route, index) => (
        <>
          <Link key={route.path} to={route.path}>
            &nbsp;{route.name}&nbsp;
          </Link>

          {index !== routes.length - 1 ? '|' : ''}
        </>
      ))}
    </div>
  )
}

export default Navigation
