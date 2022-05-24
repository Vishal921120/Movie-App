import React, { Component } from 'react'
import { movies } from './GetMovies'

class Favourites extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        genre : [],
        currgen :'All Genres',
        movie :[],
        currText:'',
        limit : 5,
        currPage : 1
      }
    }

    componentDidMount(){
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let data = JSON.parse(localStorage.getItem('movies') || '[]')
        let temp = []
        data.forEach((movieObj) => {
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Genres')
        this.setState({
            genre:[...temp],
            movie : [...data]
        })

    }
    handleGenreChange = (genre) => {
        this.setState({
            currgen:genre
        })
    }
    sortPopularityDesc = () => {
        let temp = this.state.movie;
        temp.sort(function(objA , objB){
            return objB.popularity - objA.popularity
        })
        this.setState ({
            movie : [...temp]
        })
    } 
    sortPopularityAsc = () => {
        let temp = this.state.movie;
        temp.sort(function(objA , objB){
            return objA.popularity - objB.popularity
        })
        this.setState ({
            movie : [...temp]
        })
    } 
    sortRatingDesc=()=>{
        let temp = this.state.movie;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc=()=>{
        let temp = this.state.movie;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange = (page) => {
        this.setState({
            currPage:page
        })
    }
    handleDelete=(id)=>{
        let newarr = [];
        newarr = this.state.movie.filter((movieObj)=>movieObj.id!=id)
        this.setState({
            movie:[...newarr]
        })
        localStorage.setItem("movies",JSON.stringify(newarr))
    }
    render(props) {
        // console.log(this.props.name)
       
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let filterArr = []
        if(this.state.currText===''){
            filterArr = this.state.movie
        }else{
            filterArr = this.state.movie.filter((movieObj)=>{
                let title = movieObj.original_title;
                if(title){ // to avoid empty movie name  
                    title = movieObj.original_title.toLowerCase()
                    return title.includes(this.state.currText.toLowerCase())
                }
            })
        }
        if(this.state.currgen != 'All Genres'){
            filterArr = this.state.movie.filter((movieObj) => genreids[movieObj.genre_ids[0]]==this.state.currgen)
        }
        
        let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesArr = [];
        for(let i=1; i<=pages; i++){
            pagesArr.push(i);
        }
        let startingIndex = (this.state.currPage-1)*this.state.limit;
        let endingIndex = startingIndex+this.state.limit;
        filterArr = filterArr.slice(startingIndex,endingIndex);


        return (
            <>
                <div className='main'>
                    <div className='row'>
                        <div className='col-lg-3 col-sm-12'>
                            <ul class="list-group favourites-genres">
                                {
                                    this.state.genre.map((genre) =>(
                                        this.state.currgen == genre ?
                                        <li class="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}}>{genre}</li>
                                        :<li class="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='col-lg-9 favourites-table col-sm-12'>
                            <div className='row '>
                                <input type='text' className="input-group-text col" placeholder='Search movies' value={this.state.currText} onChange= {(e)=>this.setState({currText:e.target.value})}></input>
                                <input type='number' className="input-group-text col" placeholder='row count' value={this.state.limit} onChange={(e) => {if(e.target.value>0)this.setState({limit :e.target.value})}}></input>
                            </div>
                            <div className='row'>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc}/>Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                            <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map((movieObj)=>(
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}} />
                                                    {movieObj.original_title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pagesArr.map((page)=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                        
                                       
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>

                </div>
            </>
        )
    }
}

export default Favourites