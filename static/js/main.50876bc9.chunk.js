(this["webpackJsonpbattle-ship"]=this["webpackJsonpbattle-ship"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(2),o=n.n(i),a=n(8),c=n.n(a),s=(n(14),n(5)),u=n(1),d=n(3),l=(n(15),n.p+"static/media/battleship.fe5c943a.svg"),h=n.p+"static/media/hit.c844d5aa.png",p=n.p+"static/media/sunk.ba66429c.jpg",f=n.p+"static/media/missed.89c6a26f.png",b=function(e){var t,n="27px",i={position:"relative",left:"-8px",bottom:"0",height:"27px"},o={},a="boardCell";switch(e.content[e.pos]){case"B":t=l,o.backgroundColor="skyblue",o.borderColor="steelblue";break;case"S":t=p,o.borderColor="yellow";break;case"X":t=h,o.backgroundColor="yellow",o.borderColor="red",n="12px",i={};break;case"/":t=f;break;default:t="#",i={},n="27px"}return e.hide?a+=" hide":a+=" show",Object(r.jsx)("button",{className:a,id:e.pos,onClick:e.onClick,onPointerDown:e.onPointerDown,onPointerMove:e.onPointerMove,onPointerUp:e.onPointerUp,onDoubleClick:e.onDoubleClick,disabled:e.disabled,style:o,children:Object(r.jsx)("img",{alt:"",src:t,width:n,style:i})},e.pos)},m=function(e){for(var t=[],n=0;n<100;n++)t.push(n);return Object(r.jsx)("div",{className:"board",id:e.id,onMouseLeave:e.onMouseLeave,children:t.map((function(t){return Object(r.jsx)(b,{pos:t,content:e.content,disabled:e.disabled,onClick:e.onClick,hide:e.areBoardCellsHidden[t],onPointerDown:e.onPointerDown,onPointerMove:e.onPointerMove,onPointerUp:e.onPointerUp,onDoubleClick:e.onDoubleClick},t)}))})},v=function(e){return Object(r.jsxs)("div",{className:"titleBar",children:[Object(r.jsx)("h1",{className:e.isTitleInView?"center":"",children:e.text}),Object(r.jsx)("div",{className:"left",children:Object(r.jsx)("h1",{className:"playerScore",children:e.playerScore})}),Object(r.jsx)("div",{className:"right",children:Object(r.jsx)("h1",{className:"computerScore",children:e.computerScore})})]})},j=function(e,t){return e.findIndex((function(e){return e.x===t.x&&e.y===t.y}))};function y(){return{x:Math.floor(10*Math.random()),y:Math.floor(10*Math.random())}}function x(e){var t=e.x;return 10*(9-e.y)+t}function O(e){return{x:e%10,y:9-Math.floor(e/10)}}function g(e,t){for(var n=[],r=0;r<100;r++)n.push(" ");return e.missedShots.forEach((function(e){var t=x(e);n[t]="/"})),e.ships.forEach((function(e){e.isSunk()?e.getCoordinates().forEach((function(e){var t=x(e);n[t]="S"})):(t&&e.getCoordinates().forEach((function(e){var t=x(e);n[t]="B"})),e.getDamages().forEach((function(e){var t=x(e);n[t]="X"})))})),n}function S(e){return{playerBoard:g(e.player.board,!0),enemyBoard:g(e.computer.board,!1)}}function k(e){e.placeShips(e.player.board,[{position:{x:1,y:2},direction:90},{position:{x:4,y:4},direction:0},{position:{x:4,y:9},direction:0},{position:{x:4,y:1},direction:0},{position:{x:8,y:7},direction:90},{position:{x:5,y:7},direction:0},{position:{x:8,y:1},direction:0}]),e.placeShipsRandom(e.computer.board)}function w(e,t){if(-1===e.indexOf(!t))return e;var n;do{n=x(y())}while(e[n]!==!t);return e[n]=t,e}function C(e,t){return e.ships.map((function(e){var n=e.getCoordinates();return j(n,t)})).findIndex((function(e){return-1!==e}))}function N(e,t){var n={};return n.x=e.x+t.x,n.y=e.y+t.y,n}function M(e){var t={};return t.x=-e.x,t.y=-e.y,t}function P(e,t){e.ships.splice(t,1),e.changeShipLengths(t)}var B=function(){var e=this;this.name="",this.enemy={},this.board={},this.attack=function(t){var n,r=e.enemy.board.missedShots,i=!1,o=!1;return-1!==j(r,t)?{success:i,hit:o}:(n=t,-1!==e.enemy.board.ships.map((function(e){return!(-1===j(e.getDamages(),n))})).indexOf(!0)?{success:i,hit:o}:{success:i=!0,hit:o=e.enemy.board.receiveAttack(t)})},this.autoAttack=function(t){var n={};do{n=e.attack(t())}while(!n.success);return n}};var E=function(e,t,n){var r=e,i=t,o=n,a=[],c=[];this.hit=function(e){if(-1!==j(c,e))return!1;var t,n=j(a,e);return-1!==n&&(t=n,c.push(Object(u.a)({},a[t])),!0)};var d=function(){a=[],c=[];for(var e=Object(u.a)({},function(){var e={dx:0,dy:0};switch(i){case 0:e={dx:1,dy:0};break;case 90:e={dx:0,dy:1};break;case 180:e={dx:-1,dy:0};break;case 270:e={dx:0,dy:-1}}return e}()),t=e.dx,n=e.dy,s=Object(u.a)({},r),d=0;d<o;d++)a.push(Object(u.a)({},s)),s.x+=t,s.y+=n};this.getCoordinates=function(){return Object(s.a)(a)},this.getDamages=function(){return Object(s.a)(c)},this.isSunk=function(){return c.length===o},Object.assign(this,{get position(){return r},set position(e){r.x=e.x,r.y=e.y,d()},get direction(){return i},set direction(e){i=e,d()},get length(){return o},set length(e){o=e,d()}}),d()};var D=function(){var e=this;this.ships=[],this.missedShots=[];var t=[5,4,3,2,2,1,1],n=function(e){var t=Object(u.a)({},e),n=t.x,r=t.y;return n>=0&&n<10&&r>=0&&r<10},r=function(e){return e.reduce((function(e,t){return t<e?t:e}),e[0])},i=function(e,t){var n=e.getCoordinates().map((function(e){return function(e,t){var n=Object(u.a)({},e),i=n.x,o=n.y,a=t.getCoordinates().map((function(e){return Math.pow(i-e.x,2)+Math.pow(o-e.y,2)}));return Math.sqrt(r(a))}(e,t)}));return r(n)};this.placeShip=function(o,a){var c=t[e.ships.length],s=new E(o,a,c),u=function(e){return-1===e.getCoordinates().map((function(e){return n(e)})).indexOf(!1)}(s),d=function(e,t){var n=t.map((function(t){return i(e,t)}));return r(n)}(s,e.ships)>=2||0===e.ships.length,l=u&&d;return l&&e.ships.push(s),l},this.receiveAttack=function(t){return!!n(t)&&(-1!==(r=t,e.ships.map((function(e){return e.hit(r)})).indexOf(!0))||(-1!==j(e.missedShots,t)&&0!==e.missedShots.length||e.missedShots.push(Object(u.a)({},t)),!1));var r},this.isAllShipSunk=function(){return-1===e.ships.map((function(e){return e.isSunk()})).indexOf(!1)},this.changeShipLengths=function(e){var n=t.splice(e,1);t.push(n)}};var A=function(){var e=this;this.player=new B,this.player.name="player",this.player.board=new D,this.computer=new B,this.computer.name="computer",this.computer.board=new D,this.player.enemy=this.computer,this.computer.enemy=this.player,this.setState=function(){},this.placeShips=function(e,t){t.forEach((function(t){e.placeShip(t.position,t.direction)}))},this.placeShipsRandom=function(e){for(var t=0;t<7;t++)for(;!e.placeShip(y(),90*Math.floor(4*Math.random())););},this.playerAttack=function(t){var n=e.player.attack(t),r=!1,i={};if(!n.success)return{gameOver:r,winner:i};if(e.setState(S(e)),n.hit)(r=e.computer.board.isAllShipSunk())&&(i=e.player);else do{n=e.computer.autoAttack(y),e.setState(S(e)),(r=e.player.board.isAllShipSunk())&&(i=e.computer)}while(n.hit&&!r);return{gameOver:r,winner:i}}},T=new A;k(T);var I,L,U=S(T),R={gameOver:!0,winner:""},F="BATTLESHIP",H=!1,V=!0,X={},G=!1;var J=function(){var e=Object(i.useState)(U),t=Object(d.a)(e,2),n=t[0],o=t[1],a=Object(i.useState)({player:0,computer:0}),c=Object(d.a)(a,2),l=c[0],h=c[1],p=Object(i.useState)(!1),f=Object(d.a)(p,2),b=f[0],j=f[1],y=Object(i.useState)(!1),g=Object(d.a)(y,2),B=g[0],E=g[1],D=function(e){if(G){var t=T.player.board,n=O(Number(e.currentTarget.id));L=N(n,M(I));var r=N(X.position,L);t.placeShip(r,X.direction)||t.placeShip(X.position,X.direction),G=!1,o(S(T))}};T.setState=o;var J=Object(i.useState)(function(){for(var e=[],t=0;t<100;t++)e.push(!0);return e}()),W=Object(d.a)(J,2),Y=W[0],q=W[1];return Object(i.useEffect)((function(){if(-1!==Y.indexOf(!H)){var e=w(Object(s.a)(Y),H);e=w(e,H),q(e)}}),[Y,b]),Object(i.useEffect)((function(){j(!0)}),[]),Object(r.jsxs)("div",{children:[Object(r.jsx)(v,{isTitleInView:b,playerScore:l.player,computerScore:l.computer,text:F}),Object(r.jsxs)("div",{className:"gameArea",children:[Object(r.jsx)("h1",{className:"winner",children:R.winner.name?"WINNER: ".concat(R.winner.name.toUpperCase()):"WINNER:"}),Object(r.jsxs)("div",{className:"boardContainer",children:[Object(r.jsx)("button",{className:"gameControl",onClick:function(){B?(V=!1,k(T=new A),R={gameOver:!0,winner:""},H=!0,j(!1),setTimeout((function(){F="BATTLESHIP",H=!1,V=!0,o(U),j(!0),E(!1)}),4e3)):(V=!1,R.gameOver=!1,E(!0))},disabled:!V,children:B?"New Game":"Start"}),Object(r.jsx)(m,{id:"player",content:n.playerBoard,disabled:B,areBoardCellsHidden:Y,onPointerDown:function(e){var t=O(Number(e.currentTarget.id)),n=T.player.board,r=n.ships,i=C(n,t);if(-1!==i){var o=r[i];X.position=Object(u.a)({},o.position),X.direction=o.direction,X.length=o.length,X.coordinates=o.getCoordinates(),I=Object(u.a)({},t),P(n,i),G=!0}},onPointerMove:function(e){if(G){var t,n=document.elementFromPoint(e.clientX,e.clientY);n&&"boardCell"===n.classList[0]?t=O(Number(n.id)):(t=I,G=!1,T.player.board.placeShip(X.position,X.direction)),L=N(t,M(I));var r=S(T),i=r.playerBoard;X.coordinates.forEach((function(e){var t=N(e,L),n=x(t);t.x>=0&&t.x<10&&t.y>=0&&t.y<10&&(i[n]="B")})),o(r)}},onPointerUp:D,onMouseLeave:D,onDoubleClick:function(e){D(e);var t=O(Number(e.currentTarget.id)),n=T.player.board,r=n.ships,i=C(n,t);if(-1!==i){var a=r[i],c=a.direction,s=a.position,u=(c+90)%360;P(n,i),n.placeShip(s,u)||n.placeShip(s,c),o(S(T))}}})]}),Object(r.jsxs)("div",{className:"boardContainer",children:[Object(r.jsx)("button",{className:"gameControl",children:"Reset"}),Object(r.jsx)(m,{id:"computer",content:n.enemyBoard,disabled:R.gameOver,onClick:function(e){var t=e.target.id;if(t){var n=T.playerAttack(O(t));if(R=Object(u.a)({},n),n.gameOver){var r=Object(u.a)({},l);r[n.winner.name]+=1,h(r),F="GAME OVER",V=!0}}},areBoardCellsHidden:Y})]}),Object(r.jsx)("div",{className:"info",children:Object(r.jsx)("p",{children:"You can drag and drop your ships to their place. Use double click to rotate the ships. The program maintains 2 cells distance between the ships and keeps them on the game board."})})]})]})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),o(e),a(e)}))};c.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(J,{})}),document.getElementById("root")),W()}},[[16,1,2]]]);
//# sourceMappingURL=main.50876bc9.chunk.js.map