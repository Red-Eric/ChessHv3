let Chess=function(r){var e="b",n="w",t=-1,o="p",i="n",f="b",l="r",a="q",u="k",s="pnbrqkPNBRQK",p="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",c=["1-0","0-1","1/2-1/2","*"],v={b:[16,32,17,15],w:[-16,-32,-17,-15]},g={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},h=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],E=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],d={p:0,n:1,b:2,r:3,q:4,k:5},b={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q"},_={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64},A=7,S=6,m=1,y=0,C={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},T={w:[{square:C.a1,flag:_.QSIDE_CASTLE},{square:C.h1,flag:_.KSIDE_CASTLE}],b:[{square:C.a8,flag:_.QSIDE_CASTLE},{square:C.h8,flag:_.KSIDE_CASTLE}]},I=new Array(128),P={w:t,b:t},w=n,L={w:0,b:0},R=t,N=0,O=1,k=[],q={};function D(r){void 0===r&&(r=!1),I=new Array(128),P={w:t,b:t},w=n,L={w:0,b:0},R=t,N=0,O=1,k=[],r||(q={}),B(x())}function K(){Q(p)}function Q(r,o){void 0===o&&(o=!1);var i=r.split(/\s+/),f=i[0],l=0;if(!U(r).valid)return!1;D(o);for(var a=0;a<f.length;a++){var u=f.charAt(a);if("/"===u)l+=8;else if(-1!=="0123456789".indexOf(u))l+=parseInt(u,10);else{var s=u<"a"?n:e;M({type:u.toLowerCase(),color:s},fr(l)),l++}}return w=i[1],i[2].indexOf("K")>-1&&(L.w|=_.KSIDE_CASTLE),i[2].indexOf("Q")>-1&&(L.w|=_.QSIDE_CASTLE),i[2].indexOf("k")>-1&&(L.b|=_.KSIDE_CASTLE),i[2].indexOf("q")>-1&&(L.b|=_.QSIDE_CASTLE),R="-"===i[3]?t:C[i[3]],N=parseInt(i[4],10),O=parseInt(i[5],10),B(x()),!0}function U(r){var e="No errors.",n="FEN string must contain six space-delimited fields.",t="6th field (move number) must be a positive integer.",o="5th field (half move counter) must be a non-negative integer.",i="4th field (en-passant square) is invalid.",f="3rd field (castling availability) is invalid.",l="2nd field (side to move) is invalid.",a="1st field (piece positions) does not contain 8 '/'-delimited rows.",u="1st field (piece positions) is invalid [consecutive numbers].",s="1st field (piece positions) is invalid [invalid piece].",p="1st field (piece positions) is invalid [row too large].",c="Illegal en-passant square",v=r.split(/\s+/);if(6!==v.length)return{valid:!1,error_number:1,error:n};if(isNaN(v[5])||parseInt(v[5],10)<=0)return{valid:!1,error_number:2,error:t};if(isNaN(v[4])||parseInt(v[4],10)<0)return{valid:!1,error_number:3,error:o};if(!/^(-|[abcdefgh][36])$/.test(v[3]))return{valid:!1,error_number:4,error:i};if(!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(v[2]))return{valid:!1,error_number:5,error:f};if(!/^(w|b)$/.test(v[1]))return{valid:!1,error_number:6,error:l};var g=v[0].split("/");if(8!==g.length)return{valid:!1,error_number:7,error:a};for(var h=0;h<g.length;h++){for(var E=0,d=!1,b=0;b<g[h].length;b++)if(isNaN(g[h][b])){if(!/^[prnbqkPRNBQK]$/.test(g[h][b]))return{valid:!1,error_number:9,error:s};E+=1,d=!1}else{if(d)return{valid:!1,error_number:8,error:u};E+=parseInt(g[h][b],10),d=!0}if(8!==E)return{valid:!1,error_number:10,error:p}}return"3"==v[3][1]&&"w"==v[1]||"6"==v[3][1]&&"b"==v[1]?{valid:!1,error_number:11,error:c}:{valid:!0,error_number:0,error:e}}function x(){for(var r=0,o="",i=C.a8;i<=C.h1;i++){if(null==I[i])r++;else{r>0&&(o+=r,r=0);var f=I[i].color,l=I[i].type;o+=f===n?l.toUpperCase():l.toLowerCase()}i+1&136&&(r>0&&(o+=r),i!==C.h1&&(o+="/"),r=0,i+=8)}var a="";L[n]&_.KSIDE_CASTLE&&(a+="K"),L[n]&_.QSIDE_CASTLE&&(a+="Q"),L[e]&_.KSIDE_CASTLE&&(a+="k"),L[e]&_.QSIDE_CASTLE&&(a+="q"),a=a||"-";var u=R===t?"-":fr(R);return[o,w,a,u,N,O].join(" ")}function j(r){for(var e=0;e<r.length;e+=2)"string"==typeof r[e]&&"string"==typeof r[e+1]&&(q[r[e]]=r[e+1]);return q}function B(r){k.length>0||(r!==p?(q.SetUp="1",q.FEN=r):(delete q.SetUp,delete q.FEN))}function $(r){var e=I[C[r]];return e?{type:e.type,color:e.color}:null}function M(r,e){if(!("type"in r)||!("color"in r))return!1;if(-1===s.indexOf(r.type.toLowerCase()))return!1;if(!(e in C))return!1;var n=C[e];return(r.type!=u||P[r.color]==t||P[r.color]==n)&&(I[n]={type:r.type,color:r.color},r.type===u&&(P[r.color]=n),B(x()),!0)}function G(r,e,n,t,i){var f={color:w,from:e,to:n,flags:t,piece:r[e].type};return i&&(f.flags|=_.PROMOTION,f.promotion=i),r[n]?f.captured=r[n].type:t&_.EP_CAPTURE&&(f.captured=o),f}function F(r){function e(r,e,n,t,u){if(r[n].type!==o||or(t)!==y&&or(t)!==A)e.push(G(r,n,t,u));else for(var s=[a,l,f,i],p=0,c=s.length;p<c;p++)e.push(G(r,n,t,u,s[p]))}var n=[],t=w,u=lr(t),s={b:m,w:S},p=C.a8,c=C.h1,h=!1,E=void 0===r||!("legal"in r)||r.legal;if(void 0!==r&&"square"in r){if(!(r.square in C))return[];p=c=C[r.square],h=!0}for(var d=p;d<=c;d++)if(136&d)d+=7;else{var b=I[d];if(null!=b&&b.color===t)if(b.type===o){var T=d+v[t][0];if(null==I[T]){e(I,n,d,T,_.NORMAL);T=d+v[t][1];s[t]===or(d)&&null==I[T]&&e(I,n,d,T,_.BIG_PAWN)}for(N=2;N<4;N++){136&(T=d+v[t][N])||(null!=I[T]&&I[T].color===u?e(I,n,d,T,_.CAPTURE):T===R&&e(I,n,d,R,_.EP_CAPTURE))}}else for(var N=0,O=g[b.type].length;N<O;N++){var k=g[b.type][N];for(T=d;!(136&(T+=k));){if(null!=I[T]){if(I[T].color===t)break;e(I,n,d,T,_.CAPTURE);break}if(e(I,n,d,T,_.NORMAL),"n"===b.type||"k"===b.type)break}}}if(!h||c===P[t]){if(L[t]&_.KSIDE_CASTLE){var q=(D=P[t])+2;null!=I[D+1]||null!=I[q]||Z(u,P[t])||Z(u,D+1)||Z(u,q)||e(I,n,P[t],q,_.KSIDE_CASTLE)}if(L[t]&_.QSIDE_CASTLE){var D;q=(D=P[t])-2;null!=I[D-1]||null!=I[D-2]||null!=I[D-3]||Z(u,P[t])||Z(u,D-1)||Z(u,q)||e(I,n,P[t],q,_.QSIDE_CASTLE)}}if(!E)return n;var K=[];for(d=0,O=n.length;d<O;d++)er(n[d]),z(t)||K.push(n[d]),nr();return K}function W(r,e){var n="";if(r.flags&_.KSIDE_CASTLE)n="O-O";else if(r.flags&_.QSIDE_CASTLE)n="O-O-O";else{var t=function(r,e){for(var n=F({legal:!e}),t=r.from,o=r.to,i=r.piece,f=0,l=0,a=0,u=0,s=n.length;u<s;u++){var p=n[u].from,c=n[u].to;i===n[u].piece&&t!==p&&o===c&&(f++,or(t)===or(p)&&l++,ir(t)===ir(p)&&a++)}if(f>0)return l>0&&a>0?fr(t):a>0?fr(t).charAt(1):fr(t).charAt(0);return""}(r,e);r.piece!==o&&(n+=r.piece.toUpperCase()+t),r.flags&(_.CAPTURE|_.EP_CAPTURE)&&(r.piece===o&&(n+=fr(r.from)[0]),n+="x"),n+=fr(r.to),r.flags&_.PROMOTION&&(n+="="+r.promotion.toUpperCase())}return er(r),J()&&(V()?n+="#":n+="+"),nr(),n}function H(r){return r.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}function Z(r,t){for(var i=C.a8;i<=C.h1;i++)if(136&i)i+=7;else if(null!=I[i]&&I[i].color===r){var f=I[i],l=i-t,a=l+119;if(h[a]&1<<d[f.type]){if(f.type===o){if(l>0){if(f.color===n)return!0}else if(f.color===e)return!0;continue}if("n"===f.type||"k"===f.type)return!0;for(var u=E[a],s=i+u,p=!1;s!==t;){if(null!=I[s]){p=!0;break}s+=u}if(!p)return!0}}return!1}function z(r){return Z(lr(r),P[r])}function J(){return z(w)}function V(){return J()&&0===F().length}function X(){return!J()&&0===F().length}function Y(){for(var r={},e=[],n=0,t=0,o=C.a8;o<=C.h1;o++)if(t=(t+1)%2,136&o)o+=7;else{var l=I[o];l&&(r[l.type]=l.type in r?r[l.type]+1:1,l.type===f&&e.push(t),n++)}if(2===n)return!0;if(3===n&&(1===r[f]||1===r[i]))return!0;if(n===r[f]+2){var a=0,u=e.length;for(o=0;o<u;o++)a+=e[o];if(0===a||a===u)return!0}return!1}function rr(){for(var r=[],e={},n=!1;;){var t=nr();if(!t)break;r.push(t)}for(;;){var o=x().split(" ").slice(0,4).join(" ");if(e[o]=o in e?e[o]+1:1,e[o]>=3&&(n=!0),!r.length)break;er(r.pop())}return n}function er(r){var n=w,i=lr(n);if(function(r){k.push({move:r,kings:{b:P.b,w:P.w},turn:w,castling:{b:L.b,w:L.w},ep_square:R,half_moves:N,move_number:O})}(r),I[r.to]=I[r.from],I[r.from]=null,r.flags&_.EP_CAPTURE&&(w===e?I[r.to-16]=null:I[r.to+16]=null),r.flags&_.PROMOTION&&(I[r.to]={type:r.promotion,color:n}),I[r.to].type===u){if(P[I[r.to].color]=r.to,r.flags&_.KSIDE_CASTLE){var f=r.to-1,l=r.to+1;I[f]=I[l],I[l]=null}else if(r.flags&_.QSIDE_CASTLE){f=r.to+1,l=r.to-2;I[f]=I[l],I[l]=null}L[n]=""}if(L[n])for(var a=0,s=T[n].length;a<s;a++)if(r.from===T[n][a].square&&L[n]&T[n][a].flag){L[n]^=T[n][a].flag;break}if(L[i])for(a=0,s=T[i].length;a<s;a++)if(r.to===T[i][a].square&&L[i]&T[i][a].flag){L[i]^=T[i][a].flag;break}R=r.flags&_.BIG_PAWN?"b"===w?r.to-16:r.to+16:t,r.piece===o||r.flags&(_.CAPTURE|_.EP_CAPTURE)?N=0:N++,w===e&&O++,w=lr(w)}function nr(){var r=k.pop();if(null==r)return null;var n=r.move;P=r.kings,w=r.turn,L=r.castling,R=r.ep_square,N=r.half_moves,O=r.move_number;var t,i,f=w,l=lr(w);if(I[n.from]=I[n.to],I[n.from].type=n.piece,I[n.to]=null,n.flags&_.CAPTURE)I[n.to]={type:n.captured,color:l};else if(n.flags&_.EP_CAPTURE){var a;a=f===e?n.to-16:n.to+16,I[a]={type:o,color:l}}n.flags&(_.KSIDE_CASTLE|_.QSIDE_CASTLE)&&(n.flags&_.KSIDE_CASTLE?(t=n.to+1,i=n.to-1):n.flags&_.QSIDE_CASTLE&&(t=n.to-2,i=n.to+1),I[t]=I[i],I[i]=null);return n}function tr(r,e){var n=H(r);if(e){var t=n.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);if(t)var o=t[1],i=t[2],f=t[3],l=t[4]}for(var a=F(),u=0,s=a.length;u<s;u++){if(n===H(W(a[u]))||e&&n===H(W(a[u],!0)))return a[u];if(t&&(!o||o.toLowerCase()==a[u].piece)&&C[i]==a[u].from&&C[f]==a[u].to&&(!l||l.toLowerCase()==a[u].promotion))return a[u]}return null}function or(r){return r>>4}function ir(r){return 15&r}function fr(r){var e=ir(r),n=or(r);return"abcdefgh".substring(e,e+1)+"87654321".substring(n,n+1)}function lr(r){return r===n?e:n}function ar(r){var e=ur(r);e.san=W(e,!1),e.to=fr(e.to),e.from=fr(e.from);var n="";for(var t in _)_[t]&e.flags&&(n+=b[t]);return e.flags=n,e}function ur(r){var e=r instanceof Array?[]:{};for(var n in r)e[n]="object"==typeof n?ur(r[n]):r[n];return e}function sr(r){return r.replace(/^\s+|\s+$/g,"")}function pr(r){for(var e=F({legal:!1}),n=0,t=w,o=0,i=e.length;o<i;o++){if(er(e[o]),!z(t))if(r-1>0)n+=pr(r-1);else n++;nr()}return n}return Q(void 0===r?p:r),{WHITE:n,BLACK:e,PAWN:o,KNIGHT:i,BISHOP:f,ROOK:l,QUEEN:a,KING:u,SQUARES:function(){for(var r=[],e=C.a8;e<=C.h1;e++)136&e?e+=7:r.push(fr(e));return r}(),FLAGS:b,load:function(r){return Q(r)},reset:function(){return K()},moves:function(r){for(var e=F(r),n=[],t=0,o=e.length;t<o;t++)void 0!==r&&"verbose"in r&&r.verbose?n.push(ar(e[t])):n.push(W(e[t],!1));return n},in_check:function(){return J()},in_checkmate:function(){return V()},in_stalemate:function(){return X()},in_draw:function(){return N>=100||X()||Y()||rr()},insufficient_material:function(){return Y()},in_threefold_repetition:function(){return rr()},game_over:function(){return N>=100||V()||X()||Y()||rr()},validate_fen:function(r){return U(r)},fen:function(){return x()},board:function(){for(var r=[],e=[],n=C.a8;n<=C.h1;n++)null==I[n]?e.push(null):e.push({type:I[n].type,color:I[n].color}),n+1&136&&(r.push(e),e=[],n+=8);return r},pgn:function(r){var e="object"==typeof r&&"string"==typeof r.newline_char?r.newline_char:"\n",n="object"==typeof r&&"number"==typeof r.max_width?r.max_width:0,t=[],o=!1;for(var i in q)t.push("["+i+' "'+q[i]+'"]'+e),o=!0;o&&k.length&&t.push(e);for(var f=[];k.length>0;)f.push(nr());for(var l=[],a="";f.length>0;){var u=f.pop();k.length||"b"!==u.color?"w"===u.color&&(a.length&&l.push(a),a=O+"."):a=O+". ...",a=a+" "+W(u,!1),er(u)}if(a.length&&l.push(a),void 0!==q.Result&&l.push(q.Result),0===n)return t.join("")+l.join(" ");var s=0;for(i=0;i<l.length;i++)s+l[i].length>n&&0!==i?(" "===t[t.length-1]&&t.pop(),t.push(e),s=0):0!==i&&(t.push(" "),s++),t.push(l[i]),s+=l[i].length;return t.join("")},load_pgn:function(r,e){var n=void 0!==e&&"sloppy"in e&&e.sloppy;function t(r){return r.replace(/\\/g,"\\")}var o="object"==typeof e&&"string"==typeof e.newline_char?e.newline_char:"\r?\n",i=new RegExp("^(\\[((?:"+t(o)+")|.)*\\])(?:"+t(o)+"){2}"),f=i.test(r)?i.exec(r)[1]:"";K();var l=function(r,e){for(var n="object"==typeof e&&"string"==typeof e.newline_char?e.newline_char:"\r?\n",o={},i=r.split(new RegExp(t(n))),f="",l="",a=0;a<i.length;a++)f=i[a].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/,"$1"),l=i[a].replace(/^\[[A-Za-z]+\s"(.*)"\]$/,"$1"),sr(f).length>0&&(o[f]=l);return o}(f,e);for(var a in l)j([a,l[a]]);if(!("1"!==l.SetUp||"FEN"in l&&Q(l.FEN,!0)))return!1;var u=r.replace(f,"").replace(new RegExp(t(o),"g")," ");u=u.replace(/(\{[^}]+\})+?/g,"");for(var s=/(\([^\(\)]+\))+?/g;s.test(u);)u=u.replace(s,"");var p=sr(u=(u=(u=u.replace(/\d+\.(\.\.)?/g,"")).replace(/\.\.\./g,"")).replace(/\$\d+/g,"")).split(new RegExp(/\s+/));p=p.join(",").replace(/,,+/g,",").split(",");for(var v="",g=0;g<p.length-1;g++){if(null==(v=tr(p[g],n)))return!1;er(v)}if(v=p[p.length-1],c.indexOf(v)>-1)(function(r){for(var e in r)return!0;return!1})(q)&&void 0===q.Result&&j(["Result",v]);else{if(null==(v=tr(v,n)))return!1;er(v)}return!0},header:function(){return j(arguments)},ascii:function(){return function(){for(var r="   +------------------------+\n",e=C.a8;e<=C.h1;e++){if(0===ir(e)&&(r+=" "+"87654321"[or(e)]+" |"),null==I[e])r+=" . ";else{var t=I[e].type;r+=" "+(I[e].color===n?t.toUpperCase():t.toLowerCase())+" "}e+1&136&&(r+="|\n",e+=8)}return r+="   +------------------------+\n",r+"     a  b  c  d  e  f  g  h\n"}()},turn:function(){return w},move:function(r,e){var n=void 0!==e&&"sloppy"in e&&e.sloppy,t=null;if("string"==typeof r)t=tr(r,n);else if("object"==typeof r)for(var o=F(),i=0,f=o.length;i<f;i++)if(r.from===fr(o[i].from)&&r.to===fr(o[i].to)&&(!("promotion"in o[i])||r.promotion===o[i].promotion)){t=o[i];break}if(!t)return null;var l=ar(t);return er(t),l},undo:function(){var r=nr();return r?ar(r):null},clear:function(){return D()},put:function(r,e){return M(r,e)},get:function(r){return $(r)},remove:function(r){return function(r){var e=$(r);return I[C[r]]=null,e&&e.type===u&&(P[e.color]=t),B(x()),e}(r)},perft:function(r){return pr(r)},square_color:function(r){if(r in C){var e=C[r];return(or(e)+ir(e))%2==0?"light":"dark"}return null},history:function(r){for(var e=[],n=[],t=(void 0!==r&&"verbose"in r&&r.verbose);k.length>0;)e.push(nr());for(;e.length>0;){var o=e.pop();t?n.push(ar(o)):n.push(W(o)),er(o)}return n}}};
let currentConfig = null;
let currentConfig2 = null;
function getStartFEN(fen) {
  const board = fen.split(" ")[0];
  const rows = board.split("/");

  const blackBackRank = rows[0];
  const whiteBackRank = blackBackRank.toUpperCase();

  return `${blackBackRank}/pppppppp/8/8/8/8/PPPPPPPP/${whiteBackRank} w KQkq - 0 1`;
}

const game = Chess();


function pgnToFenArray(pgn) {

  const fenTag = pgn.match(/\[FEN\s+"([^"]+)"\]/);
  const initialFen = fenTag ? fenTag[1] : undefined;

  game.reset();
  if (initialFen) game.load(initialFen);

  const success = game.load_pgn(pgn);
  if (!success) {
    throw new Error("PGN invalide");
  }

  const moves = game.history({ verbose: true });

  game.reset();
  if (initialFen) game.load(initialFen);

  const fenArray = [game.fen()];

  for (let move of moves) {
    game.move(move);
    fenArray.push(game.fen());
  }

  return fenArray;
}


let popupTabs = [];

function sendConfigToSite(type, config, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, config });
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "config":
      currentConfig = message.config;

      sendConfigToSite("config", currentConfig, "*://*.chess.com/*");
      sendConfigToSite("config", currentConfig, "*://*.lichess.org/*");
      sendConfigToSite("config", currentConfig, "*://*.worldchess.com/*");
      sendConfigToSite("config", currentConfig, "*://worldchess.com/*");
      sendConfigToSite("config", currentConfig, "*://worldchess.com/game/*");
      sendConfigToSite("config", currentConfig, "*://*.worldchess.com/game/*");

      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, {
          type: "config",
          config: currentConfig,
        });
      }
      break;

    case "FROM_CONTENT":
      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, {
          type: "TO_POPUP",
          data: message.data,
        });
      }
      break;

    case "popupReady":
      if (sender.tab?.id) {
        if (!popupTabs.includes(sender.tab.id)) popupTabs.push(sender.tab.id);

        if (currentConfig) {
          chrome.tabs.sendMessage(sender.tab.id, {
            type: "config",
            config: currentConfig,
          });
        }
        if (currentConfig2) {
          chrome.tabs.sendMessage(sender.tab.id, {
            type: "config2",
            config: currentConfig2,
          });
        }
      }
      break;
  }
});

let popupWindowId = null;

chrome.action.onClicked.addListener(() => {
  if (popupWindowId) {
    chrome.windows.update(popupWindowId, { focused: true });
    return;
  }

  chrome.windows.create(
    {
      url: "popup/index.html",
      type: "popup",
      state: "fullscreen",
    },
    (newWindow) => {
      popupWindowId = newWindow.id;

      const tab = newWindow.tabs?.[0];
      if (tab?.id) {
        const tabId = tab.id;
        if (!popupTabs.includes(tabId)) popupTabs.push(tabId);

        if (currentConfig)
          chrome.tabs.sendMessage(tabId, {
            type: "config",
            config: currentConfig,
          });
        if (currentConfig2)
          chrome.tabs.sendMessage(tabId, {
            type: "config2",
            config: currentConfig2,
          });
      }

      chrome.windows.onRemoved.addListener((id) => {
        if (id === popupWindowId) {
          popupWindowId = null;
          popupTabs = [];
        }
      });
    },
  );
});

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action) {
    const offscreen = await chrome.offscreen.hasDocument();
    if (!offscreen) {
      await chrome.offscreen.createDocument({
        url: "offscreen.html",
        reasons: ["WORKERS"],
        justification: "Test",
      });
    }

    chrome.runtime.sendMessage({ ...msg, target: "offscreen" });
  }
});

function sendMovesToSite(type, moves, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, moves });
    }
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "returnContent") {
    sendMovesToSite("returnContent", msg.moves, "*://*.chess.com/*");
    sendMovesToSite("returnContent", msg.moves, "*://*.lichess.org/*");
    sendMovesToSite("returnContent", msg.moves, "*://*.worldchess.com/*");
    sendMovesToSite("returnContent", msg.moves, "*://worldchess.com/*");
    sendMovesToSite("returnContent", msg.moves, "*://worldchess.com/game/*");
    sendMovesToSite("returnContent", msg.moves, "*://*.worldchess.com/game/*");
    sendMovesToSite("returnContent", msg.moves, "*://*.chess.com/*");
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!sender.tab || !sender.tab.id) return;
  const tabId = sender.tab.id;

  if (message.type === "ATTACH_DEBUGGER") {
    chrome.tabs.get(tabId, async (tab) => {
      if (!tab || !tab.url) {
        sendResponse({ success: false, error: "No tab URL" });
        return;
      }

      const urlTab = new URL(tab.url);
      const host = urlTab.hostname;

      const allowedDomains = ["lichess.org", "worldchess.com"];
      if (!allowedDomains.includes(host)) {
        sendResponse({ success: false, error: "Domain not allowed" });
        return;
      }

      chrome.debugger.detach({ tabId }, () => {
        chrome.debugger.attach({ tabId }, "1.3", async () => {
          if (chrome.runtime.lastError) {
            sendResponse({
              success: false,
              error: chrome.runtime.lastError.message,
            });
            return;
          }

          await chrome.debugger.sendCommand({ tabId }, "Debugger.enable");

          let urls = [];
          try {
            const results = await chrome.scripting.executeScript({
              target: { tabId },
              func: () =>
                [...document.scripts].map((s) => s.src).filter(Boolean),
            });
            urls = results[0]?.result || [];
          } catch (err) {
            console.error(err);
          }

          let breakpointId = null;
          let found = false;

          let TARGET = "";
          let BREAK_SEARCH = "";

          if (host === "lichess.org") {
            TARGET = "this.onMove=(e,t,s)=>{s||this.enpassant(e,t)";
          BREAK_SEARCH = "s||";
          }

          if (host === "worldchess.com") {
            TARGET = 'n.on("history",e=>{this.clearAll()}';
            BREAK_SEARCH = "this.clearAll";
          }

          for (const url of urls) {
            try {
              const res = await fetch(url);
              const code = await res.text();

              const index = code.indexOf(TARGET);
              if (index === -1) continue;

              found = true;

              const before = code.slice(0, index);
              const lineNumber = before.split("\n").length - 1;

              const columnNumber =
                before.split("\n").pop().length + TARGET.indexOf(BREAK_SEARCH);

              chrome.debugger.sendCommand(
                { tabId },
                "Debugger.setBreakpointByUrl",
                {
                  url,
                  lineNumber,
                  columnNumber,
                },
                (res) => {
                  if (res && res.breakpointId) breakpointId = res.breakpointId;
                  console.log("Breakpoint posé dans :", url, res);
                },
              );

              break;
            } catch (e) {
              console.log("Impossible de lire :", url, e);
            }
          }

          if (!found) console.log("Script cible non trouvé");

          chrome.debugger.onEvent.addListener(
            async (source, method, params) => {
              if (method !== "Debugger.paused") return;

              if (
                !params.hitBreakpoints ||
                !breakpointId ||
                !params.hitBreakpoints.includes(breakpointId)
              )
                return;

              if (!params.callFrames || params.callFrames.length === 0) return;

              try {
                let expression = "";

                if (host === "lichess.org") {
                  expression = "this.data.steps";
                  const evalRes = await chrome.debugger.sendCommand(
                    source,
                    "Debugger.evaluateOnCallFrame",
                    {
                      callFrameId: params.callFrames[0].callFrameId,
                      expression,
                      returnByValue: true,
                    },
                  );

                  expression = "({ e, t })";

                  const evalRes2 = await chrome.debugger.sendCommand(
                    source,
                    "Debugger.evaluateOnCallFrame",
                    {
                      callFrameId: params.callFrames[0].callFrameId,
                      expression,
                      returnByValue: true,
                    },
                  );

                  const { e, t, n } = evalRes2.result.value;
                  const lastMove = e + t;

                  const movesHistory = evalRes.result?.value || [];
                  let fenhistory = [];
                  if (movesHistory.length > 0) {
                    game.load(movesHistory[0].fen);

                    for (let i = 1; i < movesHistory.length; i++) {
                      const move = movesHistory[i].san || movesHistory[i].uci;
                      if (!move) continue;

                      const result = game.move(move, { sloppy: true });

                      if (!result)
                        console.error(
                          "Impossible de jouer le coup:",
                          move,
                          "index",
                          i,
                        );
                    }

                    game.move(lastMove, { sloppy: true });
                    game.header(
                      "Variant",
                      "Chess960",
                      "SetUp",
                      "1",
                      "FEN",
                      movesHistory[0].fen,
                    );


                    // console.clear()
                    fenhistory = pgnToFenArray(game.pgn())
                    // console.log(fenhistory)
                    // console.log(game.pgn())

                    chrome.tabs.query({}, (tabs) => {
                      for (const tab of tabs) {
                        if (tab.url && tab.url.includes("lichess")) {
                          chrome.tabs.sendMessage(tab.id, {
                            type: "history",
                            data: fenhistory
                          });
                        }
                      }
                    });

                    
                  }
                }

                if (host === "worldchess.com") {
                  expression = "e";

                  const evalRes = await chrome.debugger.sendCommand(
                    source,
                    "Debugger.evaluateOnCallFrame",
                    {
                      callFrameId: params.callFrames[0].callFrameId,
                      expression,
                      returnByValue: true,
                    },
                  );

                  console.clear();

                  const movesHistory = evalRes.result?.value || [];
                  const fenhistory = [];
                  // console.log(movesHistory);

                  const fenInit = movesHistory[0].fen;
                  const startFen = getStartFEN(fenInit);

                  game.load(startFen);

                  fenhistory.push(game.fen());

                  movesHistory.forEach((e, i) => {
                    game.move(e.lan, { sloppy: true });
                    fenhistory.push(game.fen());
                  });

                  game.header(
                    "Variant",
                    "Chess960",
                    "SetUp",
                    "1",
                    "FEN",
                    startFen,
                  );

                  chrome.tabs.query({}, (tabs) => {
                    for (const tab of tabs) {
                      if (tab.url && tab.url.includes("worldchess")) {
                        chrome.tabs.sendMessage(tab.id, {
                          type: "history",
                          data: fenhistory,
                        });
                      }
                    }
                  });

                  // console.clear()
                  // console.log(fenhistory)
                  // console.log(game.pgn());
                }
              } catch (e) {
                console.error(e);
              } finally {
                chrome.debugger.sendCommand(source, "Debugger.resume");
              }
            },
          );

          sendResponse({ success: true });
        });
      });
    });

    return true;
  }

  if (message.type === "DETACH_DEBUGGER") {
    chrome.debugger.detach({ tabId }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message,
        });
        return;
      }

      console.log("Debugger detached from tab", tabId);
      sendResponse({ success: true });
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type !== "DRAG_MOVE") return;

  const { fromX, fromY, toX, toY } = message;

  const tabs = await chrome.tabs.query({});

  const allowedDomains = ["lichess.org", "worldchess.com"];
  const targetTabs = tabs.filter((tab) => {
    if (!tab.url) return false;
    const url = new URL(tab.url);
    return allowedDomains.includes(url.hostname);
  });

  for (const tab of targetTabs) {
    const tabId = tab.id;

    if (!tabId) continue;

    await sendMouseEvent(tabId, {
      type: "mousePressed",
      x: fromX,
      y: fromY,
      button: "left",
      clickCount: 1,
    });

    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      const x = fromX + (toX - fromX) * (i / steps);
      const y = fromY + (toY - fromY) * (i / steps);
      await sendMouseEvent(tabId, { type: "mouseMoved", x, y, button: "left" });
    }

    await sendMouseEvent(tabId, {
      type: "mouseReleased",
      x: toX,
      y: toY,
      button: "left",
      clickCount: 1,
    });
  }
});

function sendMouseEvent(tabId, params) {
  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(
      { tabId },
      "Input.dispatchMouseEvent",
      params,
      (res) => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
        resolve(res);
      },
    );
  });
}
