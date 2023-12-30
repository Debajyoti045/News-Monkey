import React, { Component } from 'react'
import Navbar from './componenets/Navbar'
import News from './componenets/News'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

export default class
 extends Component {
   apiKey = import.meta.env.VITE_NEWS_API
   category = ["business","entertainment","general","health","science","sports","technology"]
   pageSize = 20
   country = "in"
   state = {
     progress: 0
   }
   setProgress = (progress)=>{
      this.setState({
         progress: progress
      })
   }

  render() {
    return (
    <BrowserRouter>
      <div>
         <Navbar title="NewsMonkey" home="Home" category={this.category} about="About Us"/>
      <LoadingBar
        color='#f11946'
        height={3}
        progress= {this.state.progress}
      />

         <Routes>
             <Route exact path="/" element={<News key="general" country={this.country} category="general" pageSize={this.pageSize} setProgress={this.setProgress} apiKey={this.apiKey}/>}></Route>
             {
                this.category.map((ele,index)=>{
                   return <Route key={index} exact path={`/${ele}`} element={<News key={ele} country={this.country} category={ele} pageSize={this.pageSize} setProgress={this.setProgress} apiKey={this.apiKey}/>}></Route>
                })
             }
         </Routes>
      </div>
    </BrowserRouter>
    )
  }
}
