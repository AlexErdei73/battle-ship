(this["webpackJsonpbattle-ship"]=this["webpackJsonpbattle-ship"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(2),o=n.n(i),a=n(8),s=n.n(a),c=(n(14),n(5)),u=n(1),h=n(3),d=(n(15),n.p+"static/media/battleship.fe5c943a.svg"),l=n.p+"static/media/hit.c844d5aa.png",p=n.p+"static/media/sunk.ba66429c.jpg",f=n.p+"static/media/missed.89c6a26f.png",b=function(e){var t,n="27px",i={position:"relative",left:"-8px",bottom:"0",height:"27px"},o={},a="boardCell";switch(e.content[e.pos]){case"B":t=d,o.backgroundColor="skyblue",o.borderColor="steelblue";break;case"S":t=p,o.borderColor="yellow";break;case"X":t=l,o.backgroundColor="yellow",o.borderColor="red",n="12px",i={};break;case"/":t=f;break;default:t="#",i={},n="27px"}return e.hide?a+=" hide":a+=" show",Object(r.jsx)("button",{className:a,id:e.pos,onClick:e.onClick,onPointerDown:e.onPointerDown,onPointerMove:e.onPointerMove,onPointerUp:e.onPointerUp,onDoubleClick:e.onDoubleClick,disabled:e.disabled,style:o,children:Object(r.jsx)("img",{alt:"",src:t,width:n,style:i})},e.pos)},m=function(e){for(var t=[],n=0;n<100;n++)t.push(n);return Object(r.jsx)("div",{className:"board",id:e.id,onMouseLeave:e.onMouseLeave,children:t.map((function(t){return Object(r.jsx)(b,{pos:t,content:e.content,disabled:e.disabled,onClick:e.onClick,hide:e.areBoardCellsHidden[t],onPointerDown:e.onPointerDown,onPointerMove:e.onPointerMove,onPointerUp:e.onPointerUp,onDoubleClick:e.onDoubleClick},t)}))})},v=function(e){return Object(r.jsxs)("div",{className:"titleBar",children:[Object(r.jsx)("h1",{className:e.isTitleInView?"center":"",children:e.text}),Object(r.jsx)("div",{className:"left",children:Object(r.jsx)("h1",{className:"playerScore",children:e.playerScore})}),Object(r.jsx)("div",{className:"right",children:Object(r.jsx)("h1",{className:"computerScore",children:e.computerScore})})]})},x=function(e){var t="info";return e.hide?t+=" hide":t+=" show",Object(r.jsx)("div",{className:t,id:"usage",children:Object(r.jsx)("p",{children:"You can drag and drop your ships to their place. Use double click to rotate the ships. The program maintains 2 cells distance between the ships and keeps them on the game board."})})},y=function(e){var t="info";return e.hide?t+=" hide":t+=" show",Object(r.jsx)("h1",{className:t,id:"winner",children:e.winner.name?"WINNER: ".concat(e.winner.name.toUpperCase()):"WINNER:"})},j=function(e,t){return e.findIndex((function(e){return e.x===t.x&&e.y===t.y}))};function O(){return{x:Math.floor(10*Math.random()),y:Math.floor(10*Math.random())}}function g(e){var t=e.x;return 10*(9-e.y)+t}function S(e){return{x:e%10,y:9-Math.floor(e/10)}}function k(e,t){for(var n=[],r=0;r<100;r++)n.push(" ");return e.missedShots.forEach((function(e){var t=g(e);n[t]="/"})),e.ships.forEach((function(e){e.isSunk()?e.getCoordinates().forEach((function(e){var t=g(e);n[t]="S"})):(t&&e.getCoordinates().forEach((function(e){var t=g(e);n[t]="B"})),e.getDamages().forEach((function(e){var t=g(e);n[t]="X"})))})),n}function w(e){return{playerBoard:k(e.player.board,!0),enemyBoard:k(e.computer.board,!1)}}function C(e){e.placeShipsRandom(e.player.board),e.placeShipsRandom(e.computer.board)}function N(){for(var e=[],t=0;t<100;t++)e.push(!0);return e}function P(e,t){if(-1===e.indexOf(!t))return e;var n;do{n=g(O())}while(e[n]!==!t);return e[n]=t,e}function M(e,t){return e.ships.map((function(e){var n=e.getCoordinates();return j(n,t)})).findIndex((function(e){return-1!==e}))}function T(e,t){var n={};return n.x=e.x+t.x,n.y=e.y+t.y,n}function A(e){var t={};return t.x=-e.x,t.y=-e.y,t}function B(e,t){e.ships.splice(t,1),e.changeShipLengths(t)}var E=function(){var e=this;this.name="",this.enemy={},this.board={},this.attack=function(t){var n,r=e.enemy.board.missedShots,i=!1,o=-1;return t?-1!==j(r,t)?{success:i,hit:o}:(n=t,-1!==e.enemy.board.ships.map((function(e){return!(-1===j(e.getDamages(),n))})).indexOf(!0)?{success:i,hit:o}:(o=e.enemy.board.receiveAttack(t),{success:i=e.enemy.board.isPieceOnGameboard(t),hit:o})):{success:i,hit:o}},this.autoAttack=function(t){var n={};do{n=e.attack(t())}while(!n.success);return n};var t={x:-1,y:-1},n=[],r={x:0,y:0},i=function(e,t){return e.x===t.x&&e.y===t.y};this.autoAttackSmart=function(o){var a,s={},c=e.enemy.board;do{a=i(t,{x:-1,y:-1})?o():n.pop(),c.isAttackTooCloseToSunkShips(a)?(s.success=!1,s.hit=-1):s=e.attack(a),s.success||i(r,{x:0,y:0})||(r=A(r))}while(!s.success);return-1!==s.hit?c.ships[s.hit].isSunk()?(t={x:-1,y:-1},n=[],r={x:0,y:0}):i(t,{x:-1,y:-1})?(t=a,0===n.length&&(n.push(T(t,{x:0,y:-1})),n.push(T(t,{x:-1,y:0})),n.push(T(t,{x:0,y:1})),n.push(T(t,{x:1,y:0})))):i(r,{x:0,y:0})?(r=T(a,A(t)),n=[T(t,A(r)),T(a,r)]):n.push(T(a,r)):i(t,{x:-1,y:-1})||i(r,{x:0,y:0})||(r=A(r)),s}};var D=function(e,t,n){var r=e,i=t,o=n,a=[],s=[];this.hit=function(e){if(-1!==j(s,e))return!1;var t,n=j(a,e);return-1!==n&&(t=n,s.push(Object(u.a)({},a[t])),!0)};var h=function(){a=[],s=[];for(var e=Object(u.a)({},function(){var e={dx:0,dy:0};switch(i){case 0:e={dx:1,dy:0};break;case 90:e={dx:0,dy:1};break;case 180:e={dx:-1,dy:0};break;case 270:e={dx:0,dy:-1}}return e}()),t=e.dx,n=e.dy,c=Object(u.a)({},r),h=0;h<o;h++)a.push(Object(u.a)({},c)),c.x+=t,c.y+=n};this.getCoordinates=function(){return Object(c.a)(a)},this.getDamages=function(){return Object(c.a)(s)},this.isSunk=function(){return s.length===a.length},Object.assign(this,{get position(){return r},set position(e){r.x=e.x,r.y=e.y,h()},get direction(){return i},set direction(e){i=e,h()},get length(){return o},set length(e){o=e,h()}}),h()};var I=function(){var e=this;this.ships=[],this.missedShots=[];var t=[5,4,3,2,2,1,1];this.isPieceOnGameboard=function(e){var t=Object(u.a)({},e),n=t.x,r=t.y;return n>=0&&n<10&&r>=0&&r<10};var n=function(e){return e.reduce((function(e,t){return t<e?t:e}),e[0])},r=function(e,t){var r=Object(u.a)({},e),i=r.x,o=r.y,a=t.getCoordinates().map((function(e){return Math.pow(i-e.x,2)+Math.pow(o-e.y,2)}));return Math.sqrt(n(a))},i=function(e,t){var i=t.map((function(t){return function(e,t){var i=e.getCoordinates().map((function(e){return r(e,t)}));return n(i)}(e,t)}));return n(i)};this.placeShip=function(n,r){var o=t[e.ships.length],a=new D(n,r,o),s=function(t){return-1===t.getCoordinates().map((function(t){return e.isPieceOnGameboard(t)})).indexOf(!1)}(a),c=i(a,e.ships)>=2||0===e.ships.length,u=s&&c;return u&&e.ships.push(a),u},this.receiveAttack=function(t){if(e.isPieceOnGameboard(t)){var n=(r=t,e.ships.map((function(e){return e.hit(r)})).indexOf(!0));return-1!==n?(console.log("shipIndex = ".concat(n)),console.log(e.ships[n].getCoordinates()),console.log(e.ships[n].getDamages()),console.log("ship sunk is ".concat(e.ships[n].isSunk())),n):(-1!==j(e.missedShots,t)&&0!==e.missedShots.length||e.missedShots.push(Object(u.a)({},t)),-1)}return-1;var r},this.isAllShipSunk=function(){return-1===e.ships.map((function(e){return e.isSunk()})).indexOf(!1)},this.changeShipLengths=function(e){var n=t.splice(e,1);t.push(n)},this.isAttackTooCloseToSunkShips=function(t){var i=e.ships.filter((function(e){return e.isSunk()})).map((function(e){return r(t,e)}));return n(i)<2}};var L=function(){var e=this;this.player=new E,this.player.name="player",this.player.board=new I,this.computer=new E,this.computer.name="computer",this.computer.board=new I,this.player.enemy=this.computer,this.computer.enemy=this.player,this.setState=function(){},this.placeShips=function(e,t){t.forEach((function(t){e.placeShip(t.position,t.direction)}))},this.placeShipsRandom=function(e){for(var t=0;t<7;t++)for(;!e.placeShip(O(),90*Math.floor(4*Math.random())););},this.playerAttack=function(t){var n=e.player.attack(t),r=!1,i={};if(!n.success)return{gameOver:r,winner:i};if(e.setState(w(e)),-1!==n.hit)(r=e.computer.board.isAllShipSunk())&&(i=e.player);else do{n=e.computer.autoAttackSmart(O),e.setState(w(e)),(r=e.player.board.isAllShipSunk())&&(i=e.computer)}while(-1!==n.hit&&!r);return{gameOver:r,winner:i}}},R=new L;C(R);var U,G,F=w(R),H={gameOver:!0,winner:""},V="BATTLESHIP",X=!1,J=!0,W={},Y=!1;var q=function(){var e=Object(i.useState)(F),t=Object(h.a)(e,2),n=t[0],o=t[1],a=Object(i.useState)({player:0,computer:0}),s=Object(h.a)(a,2),d=s[0],l=s[1],p=Object(i.useState)(!1),f=Object(h.a)(p,2),b=f[0],j=f[1],O=Object(i.useState)(!1),k=Object(h.a)(O,2),E=k[0],D=k[1],I=function(e){if(Y){var t=R.player.board,n=T(W.position,G);t.placeShip(n,W.direction)||t.placeShip(W.position,W.direction),Y=!1,o(w(R))}};R.setState=o;var q=Object(i.useState)(N()),z=Object(h.a)(q,2),K=z[0],Q=z[1],Z=function(){-1!==K.indexOf(!X)&&setTimeout((function(){var e=P(P(Object(c.a)(K),X),X);Q(e)}),50)};return Object(i.useEffect)(Z,[K]),Object(i.useEffect)((function(){j(!0)}),[]),Object(r.jsxs)("div",{children:[Object(r.jsx)(v,{isTitleInView:b,playerScore:d.player,computerScore:d.computer,text:V}),Object(r.jsxs)("div",{className:"gameArea",children:[Object(r.jsx)(y,{winner:H.winner,hide:!J||!H.gameOver||!E}),Object(r.jsxs)("div",{className:"boardContainer",children:[Object(r.jsx)("button",{className:"gameControl",onClick:function(){E?(J=!1,C(R=new L),H={gameOver:!0,winner:""},X=!0,j(!1),Z(),setTimeout((function(){V="BATTLESHIP",X=!1,Q(N()),J=!0,o(w(R)),j(!0),D(!1)}),4e3)):(J=!1,H.gameOver=!1,D(!0))},disabled:!J,children:E?"New Game":"Start"}),Object(r.jsx)(m,{id:"player",content:n.playerBoard,disabled:E,areBoardCellsHidden:K,onPointerDown:function(e){var t=S(Number(e.currentTarget.id)),n=R.player.board,r=n.ships,i=M(n,t);if(-1!==i){var o=r[i];W.position=Object(u.a)({},o.position),W.direction=o.direction,W.length=o.length,W.coordinates=o.getCoordinates(),U=Object(u.a)({},t),B(n,i),Y=!0}},onPointerMove:function(e){if(Y){var t,n=document.elementFromPoint(e.clientX,e.clientY);n&&-1!==n.className.indexOf("boardCell")?t=S(Number(n.id)):(t=U,Y=!1,R.player.board.placeShip(W.position,W.direction)),G=T(t,A(U));var r=w(R),i=r.playerBoard;W.coordinates.forEach((function(e){var t=T(e,G),n=g(t);t.x>=0&&t.x<10&&t.y>=0&&t.y<10&&(i[n]="B")})),o(r)}},onPointerUp:I,onMouseLeave:I,onDoubleClick:function(e){I();var t=S(Number(e.currentTarget.id)),n=R.player.board,r=n.ships,i=M(n,t);if(-1!==i){var a=r[i],s=a.direction,c=a.position,u=(s+90)%360;B(n,i),n.placeShip(c,u)||n.placeShip(c,s),o(w(R))}}})]}),Object(r.jsxs)("div",{className:"boardContainer",children:[Object(r.jsx)("button",{className:"gameControl",children:"Reset"}),Object(r.jsx)(m,{id:"computer",content:n.enemyBoard,disabled:H.gameOver,onClick:function(e){var t=e.target.id;if(t){var n=R.playerAttack(S(t));if(H=Object(u.a)({},n),n.gameOver){var r=Object(u.a)({},d);r[n.winner.name]+=1,l(r),V="GAME OVER",J=!0}}},areBoardCellsHidden:K})]}),Object(r.jsx)(x,{hide:!J||!H.gameOver||E})]})]})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),o(e),a(e)}))};s.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(q,{})}),document.getElementById("root")),z()}},[[16,1,2]]]);
//# sourceMappingURL=main.34e4c615.chunk.js.map