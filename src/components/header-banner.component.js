import React from "react";

class HeaderBanner extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        query: "king",
        api_id: "tt3896198",
        api_key: "4944d547",
        type:"json",
        plot:"short",
        banner: []
      }
    }

    // Sets banner array to the response passed
    renderLib = (response) => {
        this.setState({banner: response});
    }
    // Renders a single movie banner on page load
    componentDidMount() {
        fetch(`http://www.omdbapi.com/?i=${this.state.api_id}&apikey=${this.state.api_key}&plot=${this.state.plot}&r=${this.state.type}&t=${this.state.query}`)
          .then(response => response.json())
          .then(this.renderLib)
          
    }

    render(){
      return ( 
        <>
            <header className="container-fluid mt-5">  
                <div className="row mb-3 shadow pb-3 banner">
                    <div className="col-12 col-sm-12 mt-3">
                    <h3 className="text-center text-uppercase mt-5">{this.state.banner.Title}</h3> 
                    </div>
                    <div className="col-12 col-sm-6 mt-3 p-0">
                     <img src={this.state.banner.Poster} className="img-fluid mx-auto d-block" alt={this.state.banner.Title} height={this.props.height} /> 
                    </div>
                    <div className="col-12 col-sm-6 mt-3 ">
                      
                      <div className="row">
                          <div className="col-6 col-sm-6">
                            <p>&nbsp;<i className="fa fa-calendar text-white"></i>&nbsp;<span  className="text-white">Year</span>&nbsp;<span className="text-dark detail">{this.state.banner.Year}</span></p>
                            <p>&nbsp;<i className="fa fa-calendar text-white"></i>&nbsp;<span  className="text-white">Released</span>&nbsp;<span className="text-dark detail">{this.state.banner.Released}</span></p>
                            <p>&nbsp;<i className="fa fa-film text-white"></i>&nbsp;<span  className="text-white">Movie Type</span>&nbsp;<span className="text-dark text-capitalize detail">{this.state.banner.Type}</span></p>
                          </div>
                          <div className="col-6 col-sm-6">
                            <p><i className="fa fa-star text-white"></i>&nbsp;<span  className="text-white">Rated</span>&nbsp;<span className="text-dark detail">{this.state.banner.Rated}</span></p>
                            <p><i className="fa fa-clock-o text-white"></i>&nbsp;<span  className="text-white">Duration</span>&nbsp;<span className="text-dark text-capitalize detail">{this.state.banner.Runtime}</span></p>
                            <p><i className="fa fa-star text-white"></i>&nbsp;<span  className="text-white">imdbRating</span>&nbsp;<span className="text-dark text-capitalize detail">{this.state.banner.imdbRating}</span></p>
                          </div>
                      </div>
                      <p className="text-white mt-3">&nbsp;<i className="fa fa-pencil"></i>&nbsp;Plot</p>
                      <p className="mt-3 mb-5 text-dark detail">&nbsp;{this.state.banner.Plot}</p>
                      <p>&nbsp;<i className="fa fa-users text-white"></i>&nbsp;<span  className="text-white">Writer/s</span>&nbsp;<span className="text-dark text-truncate d-block detail">{this.state.banner.Writer}</span></p>
                      <p>&nbsp;<i className="fa fa-users text-white"></i>&nbsp;<span  className="text-white">Actor/s</span>&nbsp;<span className="text-dark text-truncate d-block detail">{this.state.banner.Actors}</span></p>
                    </div>
                </div>
            </header>
        </>
        )
    }
}


export default HeaderBanner;