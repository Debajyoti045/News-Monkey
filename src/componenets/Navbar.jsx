import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    home: PropTypes.string,
    category: PropTypes.array,
    about: PropTypes.string
  }
  render() {
     let  { title, home, category,about } = this.props
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">{title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">{home}</Link>
              </li>
              {
                category.map((element,index)=>{
                  return (<li key={index} className="nav-item">
                  <Link className="nav-link" to={`/${element}`}>{element}</Link>
                </li>)
                })
              }
            </ul>
        <button className="btn btn-outline-success" type="submit">{about}</button>
          </div>
        </div>
      </nav>
    )
  }
}
