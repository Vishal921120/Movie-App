// import { movies } from './GetMovies'
import React, { Component } from 'react'
import axios from 'axios'

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage:1,
            movies:[],
            Favourites:[]
        }
    }

    async componentDidMount(){
        // all works which requires time will be done here , basically side effect work will be done here 
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=c5594f127abd8cac959794c04c284901&language=en-US&page=${this.state.currPage}`)
        const data = res.data
        this.setState({
            movies:[...data.results]
        })
    }

    changeMovies = async() => {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=c5594f127abd8cac959794c04c284901&language=en-US&page=${this.state.currPage}`)
        const data = res.data
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight = () => {
        let tempArr = [];
        for(let i=1; i<=this.state.parr.length+1; i++){
            tempArr.push(i);
        }
        this.setState({
            parr:[...tempArr],
            currPage : this.state.currPage+1
        },this.changeMovies)
        
    }

    handleLeft = () => {
        if(this.state.currPage != 1){
            this.setState({
                currPage: this.state.currPage-1,
                
            },this.changeMovies)
        }
    }

    handleClick = (value) => {
        if( value != this.state.currPage){
            this.setState({
                currPage : value
            },this.changeMovies)
        }
    }

    handleFav = (Movies) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        if(this.state.Favourites.includes(Movies.id)){
            oldData = oldData.filter((m)=>m.id!=Movies.id)
        }else{
            oldData.push(Movies);
        }
        localStorage.setItem('movies',JSON.stringify(oldData))
        console.log(oldData)
        this.handleFavState();
    }
    handleFavState = ()=> {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        let temp = oldData.map((movie) =>movie.id);
        this.setState({
            Favourites:[...temp]
        })
    }
    render() {
        // let movie = movies.results
        console.log('render')
        return (
            <>
                {
                    this.state.movies.length == 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : <div>
                            <h3 className='text-center'><strong>Trending</strong></h3>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img" />
                                            {/* <div className="card-body"> */}
                                            <h3 className="card-title movies-title">{movieObj.original_title}</h3>
                                            {/* <p className="card-text banner-text">{movieObj.overview}</p> */}
                                            <div className='movies-button' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                {
                                                    this.state.hover == movieObj.id &&
                                                    <a className="btn btn-primary" onClick={()=>this.handleFav(movieObj)}>{this.state.Favourites.includes(movieObj.id)?'Remove from favourites':'Add to favourites'}</a>
                                                }
                                            </div>

                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.parr.map((value) => (

                                                <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                                            ))
                                        }

                                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                }
            </>
        )
    }
}
