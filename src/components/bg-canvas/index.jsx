import React, { Component } from 'react';
import { is, fromJS} from 'immutable';
import $ from 'jquery';

import './index.scss';

class BgCanvas extends Component {
  constructor(props,connect) {
    super(props,connect);
  }

  shouldComponentUpdate(nextProps, nextState) {
      return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentWillUpdate(nextProps,nextState){
      if (this.props !== nextProps) {

      }
  }

  componentDidMount(){

    {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
              || window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame)
          window.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };

      if (!window.cancelAnimationFrame)
          window.cancelAnimationFrame = function(id) {
              clearTimeout(id);
          };
    }

    {
      var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

      // Main
      initHeader();
      addListeners();

      function initHeader() {
          largeHeader = $('.large_header');
          width = largeHeader.width();
          height = window.innerHeight;
          target = {x: 0, y: height};

          largeHeader.css({
            height: height+'px',
          })

          canvas = $('.large_header .demo_canvas')[0];
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');

          // create particles
          circles = [];
          for(var x = 0; x < width*0.5; x++) {
              var c = new Circle();
              circles.push(c);
          }
          animate();
      }

      // Event handling
      function addListeners() {
          window.addEventListener('scroll', scrollCheck);
          window.addEventListener('resize', resize);
      }

      function scrollCheck() {
          if(document.body.scrollTop > height) animateHeader = false;
          else animateHeader = true;
      }

      function resize() {
          width = largeHeader.width();
          height = window.innerHeight;
          largeHeader.css({
            height: height+'px',
          })
          canvas.width = width;
          canvas.height = height;
      }

      function animate() {
          if(animateHeader) {
              ctx.clearRect(0,0,width,height);
              for(var i in circles) {
                  circles[i].draw();
              }
          }
          requestAnimationFrame(animate);
      }

      // Canvas manipulation
      function Circle() {
          var _this = this;

          // constructor
          (function() {
              _this.pos = {};
              init();
          })();

          function init() {
              _this.pos.x = Math.random()*width;
              _this.pos.y = height+Math.random()*100;
              _this.alpha = 0.1+Math.random()*0.3;
              _this.scale = 0.1+Math.random()*0.3;
              _this.velocity = Math.random();
          }

          this.draw = function() {
              if(_this.alpha <= 0) {
                  init();
              }
              _this.pos.y -= _this.velocity;
              _this.alpha -= 0.0005;
              ctx.beginPath();
              ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
              ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
              ctx.fill();
          };
      }
    }
  }

  render() {
    if ( __DEV__ ){
      console.log('%c 子组件不会做重复刷新! ', 'background: #222; color: #bada55;');
    }
    
    return (
  		<div className="large_header">
  			<canvas className="demo_canvas"></canvas>
      </div>
    );
  }
}

export default BgCanvas;
