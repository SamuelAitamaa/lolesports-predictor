import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
        <h3><Link to="/">Home</Link></h3>
        <ul id="nav">
          <li><Link className="hvr-wobble-skew" to="/about">About</Link></li>
          <li><a className="hvr-wobble-skew" href="https://github.com/SamuelAitamaa/lolesports-predictor" target="_blank">Github</a></li>
          <li><a className="hvr-wobble-skew" href="https://github.com/SamuelAitamaa/lolesports-predictor/blob/main/model-notebook/modelNotebook.ipynb" target="_blank">Machine Learning</a></li>
      </ul>
      </header>
    )
  }

  export default Header