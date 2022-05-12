import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    return (
      <>
      <div style = {{padding:'0.5 rem', display:'flex'}}>
          <h1>Movies App</h1>
          <h2 style={{marginTop:'1.5 rem' ,marginLeft:'2rem' }}>Favourites</h2>
      </div>
      </>
    )
  }
}
