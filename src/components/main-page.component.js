import React from "react";
import HeaderBanner from "./header-banner.component";

class MainPage extends React.Component {

    constructor(){
      super()
      this.state = {
        query: "king",
        api_id: "tt3896198",
        api_key: "4944d547",
        type:"json",
        page: 1,
        movies: []
      }
    }

    // Event listener on search bar input box
    // Captures keystrokes
    // sets query state to target value

    queryChange = event => 
        this.setState({query:event.target.value})   


    // On search button click 
    // fetches the api url sets the necessary variable from the state
    // Always start with page on and reset the page state to 1 to handle loading more later
    // On successful call the this.renderLib is called with the response argument

    searchTerm = () => {
      fetch(`http://www.omdbapi.com/?i=${this.state.api_id}&apikey=${this.state.api_key}&r=${this.state.type}&s=${this.state.query}&page=1`)
          .then(response => response.json())
          .then(this.renderLib);
      this.setState({page: 1});
    }

    // This function takes the argument response that is returned by the api as json object 
    // We can access the necessary data by the period search extension
    // We then set the state of movie to the response

    renderLib = (response) => 
      this.setState({movies: response.Search})

    //This function handles the load more argument and take a response argument
    // The previous movies object array is concatnated to the current array
    // The current array is also sliced to provide only five from each page

    renderLoad = async(response) => {
       await this.setState({movies: [...this.state.movies,...response.Search.slice(0,5)]})
    }

    // we mount the api url and wait for a response and calls the renderLib function 
    // This renders movies on page load population 10 movies as default.

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?i=${this.state.api_id}&apikey=${this.state.api_key}&r=${this.state.type}&s=king`)
          .then(response => response.json())
          .then(this.renderLib)
    }

    // On loadmore button press we call this function to set and increment pages 
    // it the returns a new array and passes it to the render Load function

    onLoad = () => {
      var pagecur = this.state.page;
      pagecur++;
      this.setState({page: pagecur});
      fetch(`http://www.omdbapi.com/?i=${this.state.api_id}&page=${pagecur}&apikey=${this.state.api_key}&plot=${this.state.plot}&r=${this.state.type}&s=${this.state.query}`)
        .then(response => response.json())
        .then(this.renderLoad)
    }


    render(){
      const height="300px";
      return ( 
              <>
                <nav className="navbar fixed-top shadow bg-dark mb-5">
                  <div className="container-fluid">
                    <a className="navbar-brand nav-color" href="/">Simple API {}</a>
                    <div className="d-flex ms-auto">
                      <input type="text" className="form-control rounded-pill me-2 pl-5 col-xs-4" placeholder="Search by title" aria-label="search" aria-describedby="button" value={ this.state.query || '' } onChange={this.queryChange}/>
                      <button className="btn border-custom rounded-pill" type="submit" id="button" onClick={this.searchTerm}>Search</button>
                    </div>
                </div>
              </nav>
                  <HeaderBanner height={height}/>
              <main>
              <div className="container-fluid">
                <div className="card card-main">
                  <h5 className="card-header card-head">Featured</h5>
                  <section>
                  <div className="card-body">
                    <div className="row">
                        {
                          this.state.movies.map((movie, index) =>                         
                              <div className="col-6 col-sm-2 mb-3" key={index}> 
                                  <img src={movie.Poster}  style={{ objectFit:'contain', height:'280px' }} className="shadow" alt={movie.Title}/>
                              </div>
                            )
                          }

                    </div>
                  </div>
                  </section>
                  <div className="card-footer card-foot row">
                   <div className="col col-sm-4">

                   </div>
                    <div className="col-12 col-sm-4 text-center">
                        <button className="btn btn-outline-primary w-50 rounded-pill" onClick={this.onLoad} type="button">Load More</button>
                    </div>
                    <div className="col col-sm-4">
                     
                     </div>
                  </div>
                </div>
              </div>
              </main>
              <footer className="container-fluid mt-5">  
                <div className="row mb-3 shadow pb-3 bg-darkp-5">
                        <div className="col-12 col-sm-6">
                            <h3>Company</h3>
                            <p className="addrs">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                            aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt
                             mollit anim id est laborum.
                            </p>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h3 className="addrs">Contact Us</h3>
                            <address className="addrs">

                                  MovieApi, Mutuku.<br/>
                                  1355 Market St, Suite 900<br/>
                                  Location, CA 94103<br/>
                                  P: (123) 456-7890<br/>
                                  
                                  first.last@example.com<br/>

                            </address>
                        </div>
                        <div className="col-12 col-sm-12 text-center">
                            <p>CopyRight &copy; 2021</p>
                        </div>
                </div>
            </footer>
              </>
              )
    }
}


export default MainPage;