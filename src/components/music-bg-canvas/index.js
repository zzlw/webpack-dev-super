import React, { Component } from 'react';
import $ from 'jquery';

import './index.scss';

class BgCanvas extends Component {

  componentDidMount(){
    function project3D(x, y, z, vars) {

      var p, d;
      x -= vars.camX;
      y -= vars.camY;
      z -= vars.camZ;
      p = Math.atan2(x, z);
      d = Math.sqrt(x * x + z * z);
      x = Math.sin(p - vars.yaw) * d;
      z = Math.cos(p - vars.yaw) * d;
      p = Math.atan2(y, z);
      d = Math.sqrt(y * y + z * z);
      y = Math.sin(p - vars.pitch) * d;
      z = Math.cos(p - vars.pitch) * d;
      var rx1 = -9;
      var ry1 = 1;
      var rx2 = 9;
      var ry2 = 1;
      var rx3 = 0;
      var ry3 = 0;
      var rx4 = x;
      var ry4 = z;
      var uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1);
      var ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc;
      var ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc;
      if (!z) z = 0.000000001;
      if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
        return {
          x: vars.cx + (rx1 + ua * (rx2 - rx1)) * vars.scale,
          y: vars.cy + y / z * vars.scale,
          d: (x * x + y * y + z * z)
        };
      } else {
        return {
          d: -1
        };
      }
    }

    function segVert(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    function Seg(x1, y1, z1, x2, y2, z2, color, alpha, weight) {
      this.a = new segVert(x1, y1, z1);
      this.b = new segVert(x2, y2, z2);
      this.color = color;
      this.alpha = alpha;
      this.weight = weight;
    }

    function elevation(x, y, z) {

      var dist = Math.sqrt(x * x + y * y + z * z);
      if (dist && z / dist >= -1 && z / dist <= 1) return Math.acos(z / dist);
      return 0.00000001;
    }

    function rgb(col) {

      col += 0.000001;
      var r = parseInt((0.5 + Math.sin(col) * 0.5) * 16);
      var g = parseInt((0.5 + Math.cos(col) * 0.5) * 16);
      var b = parseInt((0.5 - Math.sin(col) * 0.5) * 16);
      return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }

    function interpolateColors(RGB1, RGB2, degree) {

      var w2 = degree;
      var w1 = 1 - w2;
      return [w1 * RGB1[0] + w2 * RGB2[0], w1 * RGB1[1] + w2 * RGB2[1], w1 * RGB1[2] + w2 * RGB2[2]];
    }

    function rgbArray(col) {

      col += 0.000001;
      var r = parseInt((0.5 + Math.sin(col) * 0.5) * 16);
      var g = parseInt((0.5 + Math.cos(col) * 0.5) * 16);
      var b = parseInt((0.5 - Math.sin(col) * 0.5) * 16);
      return [r, g, b];
    }

    function colorString(arr) {

      var r = parseInt(arr[0]);
      var g = parseInt(arr[1]);
      var b = parseInt(arr[2]);
      return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }

    function process(vars) {

      var p, d, t;
      p = Math.atan2(vars.camX, vars.camZ);
      d = Math.sqrt(vars.camX * vars.camX + vars.camZ * vars.camZ);
      //d -= Math.sin(vars.frameNo / 80) / 20;
      t = Math.cos(vars.frameNo / 50) / 50;
      vars.camX = Math.sin(p + t) * d;
      vars.camZ = Math.cos(p + t) * d;
      vars.yaw = Math.PI + p + t;
      t = vars.frameNo / 50;
      vars.camY = -8 - Math.cos(p + t) * 10;
      vars.pitch = elevation(vars.camX, vars.camZ, vars.camY) - Math.PI / 2;

      if (!vars.offset) {
        for (var i = -5; i <= 5; ++i) {
          var x = i * 4;
          var z = 100;
          var s = 1.75 - Math.cos(Math.PI * 2 / 11 * i + vars.frameNo / 20) * 1.725;
          var c = s;
          spawnFloorBlock(x, 12, z, s, c, vars);
          spawnCeilingBlock(x, -12, z, s, c, vars);
        }
      }
      var speed = 1.25 + Math.sin(vars.frameNo / 20) * 1.2;
      vars.offset -= speed;
      for (var i = 0; i < vars.shapes.length; ++i) {
        vars.shapes[i].z -= speed;
        if (vars.shapes[i].z < -100) vars.shapes.splice(i, 1);
      }
      if (vars.offset < -12) vars.offset = 0;
    }

    function draw(vars) {

      vars.ctx.globalAlpha = .85;
      vars.ctx.fillStyle = "#000";
      vars.ctx.fillRect(0, 0, vars.ctx.canvas.width, vars.ctx.canvas.height);

      for (var i = vars.shapes.length - 1; i >= 0; --i) {
        for (var j = 0; j < vars.shapes[i].segs.length; ++j) {
          var x = vars.shapes[i].x + vars.shapes[i].segs[j].a.x;
          var y = vars.shapes[i].y + vars.shapes[i].segs[j].a.y;
          var z = vars.shapes[i].z + vars.shapes[i].segs[j].a.z;
          var pointa = project3D(x, y, z, vars);
          if (pointa.d != -1) {
            var x = vars.shapes[i].x + vars.shapes[i].segs[j].b.x;
            var y = vars.shapes[i].y + vars.shapes[i].segs[j].b.y;
            var z = vars.shapes[i].z + vars.shapes[i].segs[j].b.z;
            var pointb = project3D(x, y, z, vars);
            if (pointb.d != -1) {
              vars.ctx.strokeStyle = colorString(interpolateColors(rgbArray(1 + Math.PI - vars.shapes[i].c), [0, 15, 2], .5 + Math.sin(vars.frameNo / 20) / 2));
              vars.ctx.globalAlpha = 1 - Math.pow(vars.shapes[i].z / 100, 2);
              vars.ctx.lineWidth = 1 + 2000 / (1 + pointa.d);
              vars.ctx.beginPath();
              vars.ctx.moveTo(pointa.x, pointa.y);
              vars.ctx.lineTo(pointb.x, pointb.y);
              vars.ctx.stroke();
            }
          }
        }
      }
    }

    function transform(shape, scaleX, scaleY, scaleZ) {

      for (var i = 0; i < shape.segs.length; ++i) {
        shape.segs[i].a.x *= scaleX;
        shape.segs[i].a.y *= scaleY;
        shape.segs[i].a.z *= scaleZ;
        shape.segs[i].b.x *= scaleX;
        shape.segs[i].b.y *= scaleY;
        shape.segs[i].b.z *= scaleZ;
      }
    }

    function loadCube(x, y, z, lineWidth) {

      var shape = {};
      shape.x = x;
      shape.y = y;
      shape.z = z;
      shape.segs = [];
      shape.segs.push(new Seg(-1, -1, -1, 1, -1, -1));
      shape.segs.push(new Seg(1, -1, -1, 1, 1, -1));
      shape.segs.push(new Seg(1, 1, -1, -1, 1, -1));
      shape.segs.push(new Seg(-1, 1, -1, -1, -1, -1));
      shape.segs.push(new Seg(-1, -1, 1, 1, -1, 1));
      shape.segs.push(new Seg(1, -1, 1, 1, 1, 1));
      shape.segs.push(new Seg(1, 1, 1, -1, 1, 1));
      shape.segs.push(new Seg(-1, 1, 1, -1, -1, 1));
      shape.segs.push(new Seg(-1, -1, -1, -1, -1, 1));
      shape.segs.push(new Seg(1, -1, -1, 1, -1, 1));
      shape.segs.push(new Seg(1, 1, -1, 1, 1, 1));
      shape.segs.push(new Seg(-1, 1, -1, -1, 1, 1));
      shape.lineWidth = lineWidth;
      return shape;
    }

    function spawnFloorBlock(x, y, z, s, c, vars) {

      vars.shapes.push(loadCube(x, y - s, z, 0));
      vars.shapes[vars.shapes.length - 1].c = c;
      transform(vars.shapes[vars.shapes.length - 1], 1, s, 1);
    }

    function spawnCeilingBlock(x, y, z, s, c, vars) {

      vars.shapes.push(loadCube(x, y + s, z, 0));
      vars.shapes[vars.shapes.length - 1].c = c;
      transform(vars.shapes[vars.shapes.length - 1], 1, s, 1);
    }

    function frame(vars) {

      if (vars === undefined) {
        var vars = {};
        vars.canvas = document.querySelectorAll(".music_canvas_box")[0];
        vars.ctx = vars.canvas.getContext("2d");
        vars.canvas.width = $(vars.canvas).width();
        vars.canvas.height = $(vars.canvas).height();
        window.addEventListener("resize", function() {
          vars.canvas.width = $(vars.canvas).width();
          vars.canvas.height = $(vars.canvas).height();
          vars.cx = vars.canvas.width / 2;
          vars.cy = vars.canvas.height / 2;
        }, true);
        vars.frameNo = 0;

        vars.camX = 0;
        vars.camY = 0;
        vars.camZ = -50;
        vars.pitch = 0;
        vars.yaw = 0;
        vars.cx = vars.canvas.width / 2;
        vars.cy = vars.canvas.height / 2;
        vars.scale = 700;
        vars.shapes = [];
        vars.offset = 0;
      }

      vars.frameNo++;
      requestAnimationFrame(function() {
        frame(vars);
      });

      process(vars);
      draw(vars);
    }
    frame();
  }

  render() {
    return (
  		<div className="music_canvas">
  			<canvas className="music_canvas_box"></canvas>
      </div>
    );
  }
}

export default BgCanvas;
