(this.webpackJsonpjeopardy=this.webpackJsonpjeopardy||[]).push([[0],{47:function(e,t,a){e.exports=a(63)},52:function(e,t,a){},53:function(e,t,a){},63:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(12),l=a.n(c),o=(a(52),a(53),a(17)),i=a(5),u=a(37),s=function e(t,a,n){Object(u.a)(this,e),this.name=t,this.score=a,this.isActive=n};function m(e){var t=e.topics,a=e.hideAllTopics;return r.a.createElement("div",{className:"topics-table",onClick:a},t.map((function(e,t){return r.a.createElement("div",{className:"topics-table-cell",key:t},e)})))}var d="https://cors-anywhere.herokuapp.com/",p=[100,200,300,400,500],f=[-1,20,30,45,60,80,120];function v(e){var t=e.hideRound;return r.a.createElement("div",{className:"centered round",onClick:t},e.round<=3?e.round:"\u0424\u0438\u043d\u0430\u043b\u044c\u043d\u044b\u0439"," \u0440\u0430\u0443\u043d\u0434")}var b=a(65),E=a(46);function h(e){var t=e.question,a=e.answer,c=e.limitedTime,l=e.goToGameBoard,o=e.playersAnswers,u=e.isFinalRound,s=Object(n.useState)(!1),m=Object(i.a)(s,2),d=m[0],p=m[1],f=Object(n.useState)(c),v=Object(i.a)(f,2),h=v[0],g=v[1],j=Object(n.useState)(!1),O=Object(i.a)(j,2),y=O[0],w=O[1],S=d||o.some((function(e){return 1===e}));Object(n.useEffect)((function(){if(!S&&!(h<=0)&&!y){var e=setTimeout((function(){return g(h-1)}),1e3);return function(){return clearInterval(e)}}}),[h,y,S,u]);return r.a.createElement("div",{className:"question"},r.a.createElement("div",{className:"question-title"},t),r.a.createElement("div",{className:"answer ".concat(S?"":"hidden")},a),-1!==c&&r.a.createElement(b.a,{animated:!0,variant:"danger",className:"pointer",now:c-h,min:0,max:c,onClick:function(){w(!y)}}),!S&&r.a.createElement(E.a,{variant:"warning",block:!0,onClick:function(){d||p(!0)}},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0442\u0432\u0435\u0442"),S&&r.a.createElement(E.a,{variant:"warning",block:!0,onClick:function(){return l()},disabled:!l},"\u0413\u043b\u0430\u0432\u043d\u044b\u0439 \u044d\u043a\u0440\u0430\u043d"))}var g=function(e){var t=e.topicIndex,a=e.topic,n=e.handleQuestionSelect,c=e.rowPlayedQuestions,l=e.values,o=e.round,i=l.map((function(e,a){return 1!==c[a]?r.a.createElement("div",{key:a,className:"cell-value pointer",onClick:function(){return n(t,a)}},e*o):r.a.createElement("div",{key:a,className:"cell-empty"})}));return r.a.createElement("div",{className:"topicRow"},r.a.createElement("div",{className:"topicName"},a.name),i)},j=a(69),O=a(70);function y(e){var t=e.players,a=e.canAnswer,c=e.handlePlayerAnswer,l=e.playersAnswers,o=e.changeScore,u=e.setShowFinalScore,s=e.questionValue,m=Object(n.useState)(0),d=Object(i.a)(m,2),p=d[0],f=d[1],v=Object(n.useState)(-1),b=Object(i.a)(v,2),h=b[0],g=b[1],y=Object(n.useState)(!1),w=Object(i.a)(y,2),S=w[0],k=w[1],N=t.map((function(e,t){return r.a.createElement("div",{key:t,className:"player-info ".concat(e.isActive?"is-current":"")},r.a.createElement("div",{className:"player-name"},e.name),a&&r.a.createElement(E.a,{className:"btn btn-danger rounded-circle change-score-button",disabled:0!==l[t]||l.some((function(e){return 1===e})),onClick:function(){return c(t,!1,s)}},r.a.createElement("strong",null,"-")),r.a.createElement("div",{className:"player-score pointer",onClick:function(){return a=e.score,n=t,f(a),g(n),void k(!0);var a,n}},e.score),a&&r.a.createElement(E.a,{className:"btn btn-warning rounded-circle change-score-button",disabled:0!==l[t]||l.some((function(e){return 1===e})),onClick:function(){return c(t,!0,s)}},r.a.createElement("strong",null,"+")))})),C=function(){return k(!1)};return r.a.createElement("div",{className:"player-info-container"},N,r.a.createElement(E.a,{variant:"danger",onClick:function(){return u(!0)}},"\u0417\u0430\u043a\u043e\u043d\u0447\u0438\u0442\u044c \u0440\u0430\u0443\u043d\u0434"),r.a.createElement(j.a,{show:S,onHide:C,centered:!0,onShow:function(){document.getElementById("editing-score").select()}},r.a.createElement(j.a.Header,{closeButton:!0},r.a.createElement(j.a.Title,null,"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u0441\u0447\u0435\u0442\u0430")),r.a.createElement(j.a.Body,null,r.a.createElement(O.a.Control,{id:"editing-score",type:"number",value:p,onChange:function(e){return f(+e.target.value)}})),r.a.createElement(j.a.Footer,null,r.a.createElement(E.a,{variant:"warning",onClick:function(){o(h,p),k(!1)}},"\u041f\u0440\u0438\u043d\u044f\u0442\u044c"),r.a.createElement(E.a,{variant:"secondary",onClick:C},"\u041e\u0442\u043c\u0435\u043d\u0430"))))}function w(e){return r.a.createElement("div",{className:"centered topic"},e.topicName)}function S(e){var t=e.players,a=e.updateScore,c=e.round,l=e.roundData,o=e.limitedTime,u=e.changeScore,s=e.setShowFinalScore,m=Object(n.useState)(0),d=Object(i.a)(m,2),f=d[0],v=d[1],b=Object(n.useState)(new Array(6).fill(new Array(5).fill(0))),S=Object(i.a)(b,2),k=S[0],N=S[1],C=Object(n.useState)(-1),A=Object(i.a)(C,2),q=A[0],F=A[1],x=Object(n.useState)(-1),T=Object(i.a)(x,2),R=T[0],B=T[1],G=Object(n.useState)(new Array(t.length).fill(0)),P=Object(i.a)(G,2),H=P[0],I=P[1],V=Object(n.useState)(!1),L=Object(i.a)(V,2),D=L[0],Q=L[1],J=Object(n.useState)(""),z=Object(i.a)(J,2),W=z[0],K=z[1],M=Object(n.useState)(0),Y=Object(i.a)(M,2),$=Y[0],U=Y[1],X=Object(n.useState)(p[0]*c),Z=Object(i.a)(X,2),_=Z[0],ee=Z[1],te=Object(n.useState)(!1),ae=Object(i.a)(te,2),ne=ae[0],re=ae[1],ce=Object(n.useState)(0),le=Object(i.a)(ce,2),oe=le[0],ie=le[1],ue=Object(n.useState)(0),se=Object(i.a)(ue,2),me=se[0],de=se[1];Object(n.useEffect)((function(){if(-1!==f){var e=setTimeout((function(){return v(f<l.topics.length-1?f+1:-1)}),1e3);return function(){return clearTimeout(e)}}}),[f,l]);var pe=function(e,a){var n=-1!==e&&-1!==a;if(F(e),B(a),n){if(l.topics[e].questions[a].isCat)return K(l.topics[e].questions[a].topicName),void Q(!0);if(l.topics[e].questions[a].isAuction)return de(p[a]*c),void re(!0)}if(!n){I(new Array(t.length).fill(0));var r=k.map((function(e){return e.slice()}));r[q][R]=1,N(r),r.every((function(e){return e.every((function(e){return 1===e}))}))&&s(!0)}},fe=t.map((function(e,t){return r.a.createElement("option",{disabled:e.isActive,key:t,value:t},e.name)})),ve=function(e){return t[e].isActive||t[e].score>p[R]*c},be=function(e){return p[R]*c},Ee=function(e){return Math.max(p[R]*c,t[e].score)},he=t.map((function(e,t){return r.a.createElement("option",{disabled:!ve(t),key:t,value:t},e.name)})),ge=l.topics.map((function(e,t){return r.a.createElement(g,{key:t,topicIndex:t,topic:e,handleQuestionSelect:pe,rowPlayedQuestions:k[t],values:p,round:c})})),je=-1!==q&&-1!==R&&!D&&!ne,Oe=je?l.topics[q].questions[R].isCat?_:l.topics[q].questions[R].isAuction?me:p[R]*c:0;return f>=0?r.a.createElement(w,{topicName:l.topics[f].name}):r.a.createElement("div",{className:"Gameboard"},r.a.createElement("div",{className:"content"},!je&&ge,je&&r.a.createElement(h,{topicName:l.topics[q].name,question:l.topics[q].questions[R].question,answer:l.topics[q].questions[R].answer,limitedTime:o,playersAnswers:H,goToGameBoard:function(){return pe(-1,-1)},isFinalRound:!1})),r.a.createElement(y,{players:t,canAnswer:je,playersAnswers:H,handlePlayerAnswer:function(e,t,n){if(0===H[e]&&!H.some((function(e){return 1===e}))){a(e,n,t);var r=Object.assign([],H);r[e]=t?1:-1,I(r)}},changeScore:u,setShowFinalScore:s,questionValue:Oe}),r.a.createElement(j.a,{show:D,onHide:function(){return Q(!1)},centered:!0,backdrop:!1},r.a.createElement(j.a.Header,null,r.a.createElement(j.a.Title,null,"\u041a\u043e\u0442 \u0432 \u043c\u0435\u0448\u043a\u0435. \u0422\u0435\u043c\u0430: ",W)),r.a.createElement(j.a.Body,null,r.a.createElement(O.a,null,r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,{htmlFor:"catPlayer"},"\u0418\u0433\u0440\u043e\u043a"),r.a.createElement(O.a.Control,{as:"select",value:$,onChange:function(e){U(+e.target.value)},id:"catPlayer"},fe)),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,{htmlFor:"catValue"},"\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c"),r.a.createElement(O.a.Control,{as:"select",value:_,onChange:function(e){ee(+e.target.value)},id:"catValue"},r.a.createElement("option",{value:p[0]*c},p[0]*c),r.a.createElement("option",{value:p[p.length-1]*c},p[p.length-1]*c))))),r.a.createElement(j.a.Footer,null,r.a.createElement(E.a,{variant:"warning",onClick:function(){Q(!1);var e=new Array(t.length).fill(null).map((function(e,t){return t===$?0:-1}));I(e),a($,0,!0)},block:!0,disabled:t[$].isActive},"\u0418\u0433\u0440\u0430\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441"))),r.a.createElement(j.a,{show:ne,onHide:function(){return re(!1)},centered:!0,backdrop:!1},r.a.createElement(j.a.Header,null,r.a.createElement(j.a.Title,null,"\u0412\u043e\u043f\u0440\u043e\u0441-\u0430\u0443\u043a\u0446\u0438\u043e\u043d")),r.a.createElement(j.a.Body,null,r.a.createElement(O.a,null,r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,{htmlFor:"auctionPlayer"},"\u0418\u0433\u0440\u043e\u043a"),r.a.createElement(O.a.Control,{as:"select",value:oe,onChange:function(e){ie(+e.target.value)},id:"auctionPlayer"},he)),r.a.createElement(O.a.Group,null,r.a.createElement(O.a.Label,{htmlFor:"auctionValue"},"\u0421\u0442\u0430\u0432\u043a\u0430"),r.a.createElement(O.a.Control,{as:"input",type:"number",step:100,min:be(),max:Ee(oe),value:me,onChange:function(e){de(+e.target.value)},id:"auctionValue"})))),r.a.createElement(j.a.Footer,null,r.a.createElement(E.a,{variant:"warning",onClick:function(){re(!1);var e=new Array(t.length).fill(null).map((function(e,t){return t===oe?0:-1}));I(e),a(oe,0,!0)},block:!0,disabled:!(ve(oe)&&me>=be()&&me<=Ee(oe))},"\u0418\u0433\u0440\u0430\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441"))))}var k=a(66);function N(e){var t=e.finalRoundData,a=e.players,c=e.changeScore,l=e.setShowFinalScore,u=Object(n.useState)(Object(o.a)(t.questions)),s=Object(i.a)(u,2),m=s[0],d=s[1],p=Object(n.useState)(null),f=Object(i.a)(p,2),v=f[0],b=f[1],g=m.map((function(e){return r.a.createElement(E.a,{key:e.id,block:!0,variant:"warning mt-2 mb-2 btn-lg",onClick:function(){return t=e.id,1===m.length&&b(m[0]),void d(m.filter((function(e){return e.id!==t})));var t}},e.topicName)}));return r.a.createElement("div",{className:"final-round-container"},r.a.createElement(k.a,{className:"final-round-topics-container"},!v&&g,v&&r.a.createElement(h,{topicName:v.topicName,question:v.question,answer:v.answer,isLimitedTime:!0,limitedTime:60,playersAnswers:[],isFinalRound:!0})),r.a.createElement(y,{players:a,canAnswer:!1,changeScore:c,setShowFinalScore:l}))}var C=a(19);function A(e){var t=e.players,a=e.updateRound,c=e.isFinalRound,l=t.map((function(e,t){return r.a.createElement(n.Fragment,{key:t},r.a.createElement("div",{className:"player-name"},e.name),r.a.createElement("div",{className:"player-score"},e.score))}));return r.a.createElement("div",{className:"player-info-container-fs",onClick:a},r.a.createElement("div",{className:"player-info-container-fs-grid"},l),c&&r.a.createElement(C.b,{className:"no-decoration",to:{pathname:"/"}},r.a.createElement(E.a,{variant:"warning",block:!0},"\u041d\u043e\u0432\u0430\u044f \u0438\u0433\u0440\u0430")))}var q=function(e){var t=e.location,a=t.playersNames,c=t.limitedTime,l=t.questionsPackage,u=Object(n.useState)((function(){return a?a.map((function(e,t){return new s(e,0,0===t)})):[]})),d=Object(i.a)(u,2),p=d[0],f=d[1],b=Object(n.useState)(!0),E=Object(i.a)(b,2),h=E[0],g=E[1],j=Object(n.useState)(1),O=Object(i.a)(j,2),y=O[0],w=O[1],k=Object(n.useState)(!1),C=Object(i.a)(k,2),q=C[0],F=C[1],x=Object(n.useState)(!1),T=Object(i.a)(x,2),R=T[0],B=T[1],G=l?l.rounds.map((function(e){return e.topics})).reduce((function(e,t){return[].concat(Object(o.a)(e),Object(o.a)(t))}),[]).map((function(e){return e.name})):[],P=4===y||l&&!l.finalRound&&3===y;if(!a)return e.history.push("/"),null;var H=function(e,t){var a=Object.assign([],p);a[e].score=t,f(a)};return h?r.a.createElement(m,{topics:G,hideAllTopics:function(){g(!1),F(!0)}}):q?r.a.createElement(v,{round:y,hideRound:function(){return F(!1)}}):R?r.a.createElement(A,{players:p,updateRound:function(){if(!P&&(w(y+1),B(!1),F(!0),y+1===4)){var e=Object.assign([],p),t=!0,a=!1,n=void 0;try{for(var r,c=e[Symbol.iterator]();!(t=(r=c.next()).done);t=!0){r.value.isActive=!1}}catch(l){a=!0,n=l}finally{try{t||null==c.return||c.return()}finally{if(a)throw n}}f(e)}},isFinalRound:P}):y<=3?r.a.createElement(S,{players:p,questionsPackage:l,updateScore:function(e,t,a){var n=Object.assign([],p);if(a){n[e].score+=t;for(var r=0;r<n.length;++r)n[r].isActive=r===e}else n[e].score-=t;f(n)},round:y,roundData:l.rounds[y-1],limitedTime:c,changeScore:H,setShowFinalScore:B}):r.a.createElement(N,{finalRoundData:l.finalRound,players:p,changeScore:H,setShowFinalScore:B})},F=a(15),x=a(16),T=a.n(x),R=a(23),B=a(71),G=a(68),P=a(40),H=a(72),I=a(45),V=a(67);function L(){return r.a.createElement("div",{className:"loading"},r.a.createElement(V.a,{animation:"grow",variant:"warning"}))}var D=function(e){return t=e,new Promise((function(e,a){var n=new FileReader;n.onload=function(t){var n=JSON.parse(t.target.result);(!n.rounds||n.rounds.length<3||!n.rounds.every((function(e){return e.topics})))&&a(new Error("\u0421\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u0435 \u0444\u0430\u0439\u043b\u0430 \u043d\u0435 \u0441\u043e\u043e\u0442\u0432\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0448\u0430\u0431\u043b\u043e\u043d\u0443")),e(n)},n.readAsText(t)}));var t},Q=function(){var e=Object(R.a)(T.a.mark((function e(t){var a,n,r,c,l,o,i,u,s,m,p,f,v;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(d).concat("http://api.baza-voprosov.ru/packages/").concat(t));case 2:return a=e.sent,e.next=5,a.json();case 5:for(n=e.sent,r=n.tours[0].questions.slice(0,18),c=r.map((function(e){return e.question.split("\n ")[0]})),l=r.map((function(e){return e.question.split("\n ").slice(1)})),o=r.map((function(e){return e.answer.split("\n ")})),i={rounds:[],finalRound:null},u=0;u<3;++u){for(s={name:"\u0420\u0430\u0443\u043d\u0434 ".concat(u+1),topics:[]},m=0;m<6;++m){for(p={name:c[6*u+m],questions:[]},f=0;f<5;++f)v={id:"".concat(u+1,".").concat(m+1,".").concat(f+1),question:l[6*u+m][f],answer:o[6*u+m][f]},p.questions.push(v);s.topics.push(p)}i.rounds.push(s)}return e.abrupt("return",i);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function J(e){var t=Object(n.useState)([]),a=Object(i.a)(t,2),c=a[0],l=a[1],u=Object(n.useState)(-1),s=Object(i.a)(u,2),m=s[0],p=s[1],v=Object(n.useState)(0),b=Object(i.a)(v,2),h=b[0],g=b[1],y=Object(n.useState)(!1),w=Object(i.a)(y,2),S=w[0],N=w[1],A=Object(n.useState)(""),q=Object(i.a)(A,2),F=q[0],x=q[1],V=Object(n.useState)(0),J=Object(i.a)(V,2),z=J[0],W=J[1],K=Object(n.useState)(-1),M=Object(i.a)(K,2),Y=M[0],$=M[1],U=Object(n.useState)(!1),X=Object(i.a)(U,2),Z=X[0],_=X[1],ee=Object(n.useState)([]),te=Object(i.a)(ee,2),ae=te[0],ne=te[1],re=Object(n.useState)(""),ce=Object(i.a)(re,2),le=ce[0],oe=ce[1],ie=Object(n.useState)(-1),ue=Object(i.a)(ie,2),se=ue[0],me=ue[1],de=Object(n.useState)(null),pe=Object(i.a)(de,2),fe=pe[0],ve=pe[1],be=Object(n.useState)(!1),Ee=Object(i.a)(be,2),he=Ee[0],ge=Ee[1],je=Object(n.useState)(""),Oe=Object(i.a)(je,2),ye=Oe[0],we=Oe[1],Se=function(){we(""),ge(!1)},ke=function(){return N(!1)},Ne=c.map((function(e,t){return r.a.createElement(B.a.Item,{className:"text-center pointer player-item",active:t===m,key:t,onClick:function(){return p(t)}},e)})),Ce=[r.a.createElement("option",{key:-1,value:-1,disabled:!0},"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u043f\u0430\u043a\u0435\u0442...")].concat(Object(o.a)(ae.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.title)})))),Ae=f.map((function(e){return r.a.createElement("option",{key:e,value:e},-1===e?"\u0412\u0440\u0435\u043c\u044f \u043d\u0430 \u043e\u0442\u0432\u0435\u0442 \u043d\u0435 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u043e":"".concat(e," \u0441"))}));return Z?r.a.createElement(L,null):r.a.createElement("div",{className:"Registration"},r.a.createElement(k.a,null,r.a.createElement(O.a,null,r.a.createElement(O.a.Group,{as:G.a},r.a.createElement(P.a,null,r.a.createElement(B.a,null,Ne))),r.a.createElement(O.a.Group,{as:G.a},r.a.createElement(P.a,{sm:"6"},r.a.createElement(E.a,{variant:"warning",onClick:function(){x("\u0418\u0433\u0440\u043e\u043a ".concat(h+1)),N(!0)},block:!0},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0438\u0433\u0440\u043e\u043a\u0430")),r.a.createElement(P.a,{sm:"6"},r.a.createElement(E.a,{variant:"danger",onClick:function(){var e=Object.assign([],c);e.splice(m,1),l(e)},block:!0,disabled:m<0||m>=c.length},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0433\u0440\u043e\u043a\u0430"))),r.a.createElement(O.a.Group,{as:G.a},r.a.createElement(P.a,null,r.a.createElement(H.a,{type:"radio",name:"packageSource",value:z,onChange:function(e){W(e),1===e&&(_(!0),fetch(d+"http://api.baza-voprosov.ru/groups/SVOYAK").then((function(e){return e.json()})).then((function(e){ne(e.packages)})).finally((function(){return _(!1)})))},className:"package-source-group d-flex"},r.a.createElement(I.a,{variant:"outline-secondary",value:0},"\u0412\u043e\u043f\u0440\u043e\u0441\u044b \u0438\u0437 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0444\u0430\u0439\u043b\u0430"),r.a.createElement(I.a,{variant:"outline-secondary",value:1},"\u0412\u043e\u043f\u0440\u043e\u0441\u044b \u0438\u0437 \u0431\u0430\u0437\u044b ",r.a.createElement("strong",null,"db.chgk.info"))))),0===z&&r.a.createElement(O.a.Group,{as:G.a},r.a.createElement(P.a,{sm:"6"},r.a.createElement("div",{className:"custom-file"},r.a.createElement("input",{type:"file",className:"custom-file-input pointer",id:"packageFile",accept:".json",onChange:function(e){var t=e.target.files[0];Object(R.a)(T.a.mark((function e(){var a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,_(!0),e.next=4,D(t);case 4:a=e.sent,oe(t.name),ve(a),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),we(e.t0.message),ge(!0);case 13:return e.prev=13,_(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[0,9,13,16]])})))()},required:!0}),r.a.createElement("label",{className:"custom-file-label",htmlFor:"packageFile","data-browse":"\u041e\u0431\u0437\u043e\u0440..."},""!==le?le:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0444\u0430\u0439\u043b \u0441 \u0432\u043e\u043f\u0440\u043e\u0441\u0430\u043c\u0438"))),r.a.createElement(P.a,{sm:"6"},r.a.createElement(E.a,{variant:"secondary",href:"./package.json",block:!0,download:!0},"\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0448\u0430\u0431\u043b\u043e\u043d"))),1===z&&r.a.createElement(O.a.Group,{as:G.a},r.a.createElement(P.a,null,r.a.createElement(O.a.Control,{as:"select",value:se,onChange:function(e){var t=e.target.value;Object(R.a)(T.a.mark((function e(){var a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,_(!0),e.next=4,Q(t);case 4:a=e.sent,me(t),ve(a),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),we(e.t0.message),ge(!0);case 13:return e.prev=13,_(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[0,9,13,16]])})))()}},Ce))),r.a.createElement(O.a.Group,{as:G.a},r.a.createElement(P.a,null,r.a.createElement(O.a.Control,{as:"select",value:Y,onChange:function(e){return $(+e.target.value)}},Ae))),r.a.createElement("div",{className:"d-flex"},r.a.createElement(C.b,{className:"no-decoration ml-auto",to:{pathname:"/game",playersNames:c,limitedTime:Y,questionsPackage:fe}},r.a.createElement(E.a,{disabled:!fe||0===c.length,className:"btn btn-warning start-game-button rounded-circle",title:0===c.length?"\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u043d\u043e\u0433\u043e \u0438\u0433\u0440\u043e\u043a\u0430":fe?"":"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0433\u0440\u043e\u0432\u043e\u0439 \u043f\u0430\u043a\u0435\u0442"},"\u0421\u0442\u0430\u0440\u0442")))),r.a.createElement(j.a,{show:he,onHide:Se,centered:!0},r.a.createElement(j.a.Header,{closeButton:!0},r.a.createElement(j.a.Title,null,"\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u043f\u0430\u043a\u0435\u0442\u0430")),r.a.createElement(j.a.Body,null,ye),r.a.createElement(j.a.Footer,null,r.a.createElement(E.a,{variant:"secondary",block:!0,onClick:Se},"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"))),r.a.createElement(j.a,{show:S,onHide:ke,centered:!0,onShow:function(){document.getElementById("new-player-name").select()}},r.a.createElement(j.a.Header,{closeButton:!0},r.a.createElement(j.a.Title,null,"\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0438\u0433\u0440\u043e\u043a\u0430")),r.a.createElement(j.a.Body,null,r.a.createElement(O.a.Control,{id:"new-player-name",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f",value:F,onChange:function(e){return x(e.target.value)}})),r.a.createElement(j.a.Footer,null,r.a.createElement(E.a,{variant:"warning",onClick:function(){var e=Object.assign([],c);e.push(F),g(h+1),l(e),N(!1)},disabled:""===F},"\u041f\u0440\u0438\u043d\u044f\u0442\u044c"),r.a.createElement(E.a,{variant:"secondary",onClick:ke},"\u041e\u0442\u043c\u0435\u043d\u0430")))))}var z=function(){return r.a.createElement(C.a,{basename:"/jeopardy"},r.a.createElement("div",{className:"App"},r.a.createElement(F.c,null,r.a.createElement(F.a,{exact:!0,path:"/game",render:function(e){return r.a.createElement(q,e)}}),r.a.createElement(F.a,{path:"/"},r.a.createElement(J,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(62);l.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[47,1,2]]]);
//# sourceMappingURL=main.62f9e53a.chunk.js.map