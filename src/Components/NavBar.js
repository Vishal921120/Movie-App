import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <>
      <div style = {{padding:'0.5 rem', display:'flex'}}>
          <Link to='/' style={{textDecoration:'none'}}><h1>Movies App</h1></Link>
          <Link to='/fav' style={{textDecoration:'none'}}><h2 style={{marginTop:'1.5 rem' ,marginLeft:'2rem' }}>Favourites</h2></Link>
      </div>
      </>
    )
  }
}
