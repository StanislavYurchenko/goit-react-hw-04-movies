(this["webpackJsonpgoit-react-hw-04-movies"]=this["webpackJsonpgoit-react-hw-04-movies"]||[]).push([[6],{36:function(t,e,n){"use strict";n.r(e);var a=n(43),r=n(44),c=n(46),i=n(45),o=n(2),u=n(0),s=n(41),d=function(t){Object(c.a)(n,t);var e=Object(i.a)(n);function n(){var t;Object(a.a)(this,n);for(var r=arguments.length,c=new Array(r),i=0;i<r;i++)c[i]=arguments[i];return(t=e.call.apply(e,[this].concat(c))).state={reviews:[],page:1,error:!1,loading:!1},t.componentDidMount=function(){var e=t.props.match.params.movieId,n=t.state.page;Object(s.c)(e,n).then((function(e){t.setState({reviews:e.results})}))},t}return Object(r.a)(n,[{key:"render",value:function(){var t=this.state.reviews;return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("h2",{children:" Reviews"}),t.length>0&&Object(o.jsx)("ul",{children:t.map((function(t){var e=t.author,n=t.content,a=t.id;return Object(o.jsxs)("li",{children:[Object(o.jsx)("h3",{children:e}),Object(o.jsx)("p",{children:n})]},a)}))})]})}}]),n}(u.Component);e.default=d},41:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"e",(function(){return o})),n.d(e,"f",(function(){return u})),n.d(e,"d",(function(){return s})),n.d(e,"b",(function(){return d})),n.d(e,"c",(function(){return h}));var a=n(47),r=n.n(a),c="1172fc2ae56a45677284ff05c420b54f";r.a.defaults.baseURL="https://api.themoviedb.org/3";var i="https://image.tmdb.org/t/p/original";function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return r.a.get("/trending/all/day?api_key=".concat(c,"&page=").concat(t)).then((function(t){return t.data}))}function u(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return r.a.get("/search/movie?api_key=".concat(c,"&language=en-US&query=").concat(t,"&page=").concat(e,"&include_adult=false")).then((function(t){return t.data}))}function s(t){return r.a.get("https://api.themoviedb.org/3/movie/".concat(t,"?api_key=").concat(c,"&language=en-US")).then((function(t){return t.data}))}function d(t){return r.a.get("/movie/".concat(t,"/credits?api_key=").concat(c,"&language=en-US")).then((function(t){return t.data}))}function h(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return r.a.get("/movie/".concat(t,"/reviews?api_key=").concat(c,"&language=en-US&page=").concat(e)).then((function(t){return t.data}))}}}]);
//# sourceMappingURL=Reviews.1e7ee52a.chunk.js.map