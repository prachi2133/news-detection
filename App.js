//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
  fetchFromStorage=(parameter,defaultpara)=>{
  if(localStorage.getItem(parameter)==null){
    return defaultpara;
  }
  else{
    return localStorage.getItem(parameter);
  }

  }
  apiKey='e515e156be254089be425102eb891301';
  constructor(){
    super();
    this.state={
      category:this.fetchFromStorage('newsAppCategory','general'),
      key:this.fetchFromStorage('newsAppKey','India-general'),
      country:this.fetchFromStorage('newsAppCountry','in'),
      countryName:this.fetchFromStorage('newsAppCountryName','India'),
      mode:this.fetchFromStorage('newsAppMode','light'),
      progress:0
    }
    
  }
  changeCategory=(newCategory)=>{
    let newKey=`${this.state.countryName}-${newCategory}`;
    this.setState({
      category:newCategory,
      key:`${this.state.countryName}-${newCategory}`
    })
    localStorage.setItem('newsAppCategory',newCategory);
    localStorage.setItem('newsAppKey',newKey);
    console.log(`Category changed to ${this.state.category}`);
  }
  changeCountry=(countryCode,countryNameparam)=>{
    let newKey=`${countryNameparam}-${this.state.category}`;
    this.setState({
      country:countryCode,
      countryName:countryNameparam,
      key:`${countryNameparam}-${this.state.category}`
    })
    localStorage.setItem('newsAppCountry',countryCode);
    localStorage.setItem('newsAppCountryName',countryNameparam);
    localStorage.setItem('newsAppKey',newKey);
  }
  changeMode=()=>{
    let modeRev=this.state.mode==='light'?'dark':'light';
    this.setState({
      mode:modeRev,
    })
    localStorage.setItem('newsAppMode',modeRev);
    // document.body.style.backgroundColor = modeRev==='light'?'white':'black';
    // document.body.style.color = modeRev==='dark'?'white':'black';
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  
  render() {
    document.body.style.backgroundColor = this.state.mode==='light'?'white':'black';
    document.body.style.color = this.state.mode==='dark'?'white':'black';
    return (
      <div>
       
       <Navbar category={this.state.category} changeCategory={this.changeCategory} changeCountry={this.changeCountry} mode={this.state.mode} changeMode={this.changeMode}/>
       <div>
            <LoadingBar
              color="#f11946"
              height={3}
              progress={this.state.progress}
              
            />
          </div>
       <News key={this.state.key} apiKey={this.apiKey} category={this.state.category}  country={this.state.country} countryName={this.state.countryName} mode={this.state.mode} setProgress={this.setProgress}/>
      </div>
    )
  }
}
