((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={
bm9(d){var x,w,v,u=J.a4(d),t=u.h(d,"date_debut"),s=J.x(t==null?"":t),r=s.length!==0?A.df(s):null
t=u.h(d,"id")
t=J.x(t==null?"":t)
x=u.h(d,"nom")
x=J.x(x==null?"":x)
w=u.h(d,"description")
w=J.x(w==null?"":w)
v=u.h(d,"heure_debut")
v=J.x(v==null?"":v)
u=u.h(d,"salle_visio")
return new B.ky(t,x,w,r,v,J.x(u==null?"":u))},
EZ(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$EZ=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.aD().ef("/evenements"),$async$EZ)
case 7:s=a8
r=A.a([],y.E)
for(g=J.aH(s);g.v();){q=g.gM(g)
f=J.p(q,"type")
if(J.x(f==null?"":f)==="reunion")J.ct(r,B.bm9(q))}p=r
J.yU(p,new B.baW())
x=8
return A.e(A.dw(),$async$EZ)
case 8:o=a8
n=A.a([],y.t)
for(r=p,g=r.length,f=y.N,e=y.z,d=0;d<r.length;r.length===g||(0,A.K)(r),++d){m=r[d]
a0=m
a1=a0.a
a2=a0.b
a3=a0.c
a4=a0.d
a4=a4==null?"":C.d.b8(C.e.j(A.bf(a4)),4,"0")+"-"+C.d.b8(C.e.j(A.bp(a4)),2,"0")+"-"+C.d.b8(C.e.j(A.e3(a4)),2,"0")
J.ct(n,A.ah(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
return A.e(o.di("String","reunions_cache_v1",C.a4.hr(n,null)),$async$EZ)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dw(),$async$EZ)
case 10:o=a8
l=o
k=A.aT(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.a9(k)===0)throw a6
j=y.j.a(C.a4.eD(0,k,null))
i=A.a([],y.E)
for(r=J.aH(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gM(r)
J.ct(i,B.bm9(J.mW(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$EZ,w)},
bJr(){var x,w=$.bhe(),v=J.kh(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yD(31)]
return"cp-"+C.b.DG(v)},
bB2(){return new B.th(null)},
ky:function ky(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
baW:function baW(){},
th:function th(d){this.a=d},
Qy:function Qy(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b2b:function b2b(d){this.a=d},
b2c:function b2c(d,e){this.a=d
this.b=e},
b2d:function b2d(d){this.a=d},
b2k:function b2k(d,e,f){this.a=d
this.b=e
this.c=f},
b2j:function b2j(d,e,f){this.a=d
this.b=e
this.c=f},
b2g:function b2g(d,e,f){this.a=d
this.b=e
this.c=f},
b2f:function b2f(d,e){this.a=d
this.b=e},
b2h:function b2h(d,e,f){this.a=d
this.b=e
this.c=f},
b2e:function b2e(d,e){this.a=d
this.b=e},
b2i:function b2i(d){this.a=d},
b2n:function b2n(){},
b2l:function b2l(d){this.a=d},
b2m:function b2m(d){this.a=d},
b2u:function b2u(d){this.a=d},
b2r:function b2r(){},
b2s:function b2s(){},
b2v:function b2v(d,e,f){this.a=d
this.b=e
this.c=f},
b2o:function b2o(d,e,f){this.a=d
this.b=e
this.c=f},
b2p:function b2p(d,e,f){this.a=d
this.b=e
this.c=f},
b2q:function b2q(d,e,f){this.a=d
this.b=e
this.c=f},
b2t:function b2t(d,e){this.a=d
this.b=e},
ajQ:function ajQ(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i
_.r=j
_.w=k
_.x=l
_.y=m
_.z=n
_.Q=o
_.as=p
_.at=q
_.ax=r
_.ay=s
_.ch=t
_.CW=u},
bj6(d,e){var x=B.bL5(e,B.bIU(),null)
x.toString
x=new B.nc(new B.ajP(),x)
x.S0(d)
return x},
bwD(d){var x=$.bd4()
x.toString
if(B.yC(d)!=="en_US")x.wM()
return!0},
bwC(){return A.a([new B.ajM(),new B.ajN(),new B.ajO()],y.n)},
bDl(d){var x,w
if(d==="''")return"'"
else{x=C.d.V(d,1,d.length-1)
w=$.bsL()
return A.a3(x,w,"'")}},
nc:function nc(d,e){var _=this
_.a=d
_.c=e
_.x=_.w=_.f=_.e=_.d=null},
ajP:function ajP(){},
ajM:function ajM(){},
ajN:function ajN(){},
ajO:function ajO(){},
tQ:function tQ(){},
Dh:function Dh(d,e){this.a=d
this.b=e},
Dj:function Dj(d,e,f){this.d=d
this.a=e
this.b=f},
Di:function Di(d,e){this.a=d
this.b=e},
bnb(d,e){return new B.a28(d,e,A.a([],y.s))},
bpn(d){var x,w=d.length
if(w<3)return-1
x=d[2]
if(x==="-"||x==="_")return 2
if(w<4)return-1
w=d[3]
if(w==="-"||w==="_")return 3
return-1},
yC(d){var x,w,v,u
if(d==null){if(B.bq2()==null)$.boE="en_US"
x=B.bq2()
x.toString
return x}if(d==="C")return"en_ISO"
if(d.length<5)return d
w=B.bpn(d)
if(w===-1)return d
v=C.d.V(d,0,w)
u=C.d.c1(d,w+1)
if(u.length<=3)u=u.toUpperCase()
return v+"_"+u},
bL5(d,e,f){var x,w,v
if(e.$1(d))return d
x=[B.bJP(),B.bJR(),B.bJQ(),new B.bcR(),new B.bcS(),new B.bcT()]
for(w=0;w<6;++w){v=x[w].$1(d)
if(e.$1(v))return v}return B.bHF(d)},
bHF(d){throw A.f(A.cb('Invalid locale "'+d+'"',null))},
bgz(d){switch(d){case"iw":return"he"
case"he":return"iw"
case"fil":return"tl"
case"tl":return"fil"
case"id":return"in"
case"in":return"id"
case"no":return"nb"
case"nb":return"no"}return d},
bqM(d){var x,w
if(d==="invalid")return"in"
x=d.length
if(x<2)return d
w=B.bpn(d)
if(w===-1)if(x<4)return d.toLowerCase()
else return d
return C.d.V(d,0,w).toLowerCase()},
a28:function a28(d,e,f){this.a=d
this.b=e
this.c=f},
Yx:function Yx(d){this.a=d},
bcR:function bcR(){},
bcS:function bcS(){},
bcT:function bcT(){},
bbQ(d,e){var x=0,w=A.n(y.H)
var $async$bbQ=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.yJ(A.d1("https://meet.jit.si/"+e,0,null),C.Xm,"_blank"),$async$bbQ)
case 2:return A.l(null,w)}})
return A.m($async$bbQ,w)},
bq2(){var x=$.boE
return x},
bIV(d,e,f){var x,w
if(d===1)return e
if(d===2)return e+31
x=C.c.fW(30.6*d-91.4)
w=f?1:0
return x+e+59+w}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[9]
B.ky.prototype={
gCI(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.dC(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.dC(x[1],null)
t=w==null?0:w}else t=0
return A.bm(A.bf(s),A.bp(s),A.e3(s),u,t,0,0,0)},
gq5(){var x,w=this.gCI()
if(w==null)return"bientot"
x=new A.aY(Date.now(),0,!1)
if(x.hR(w))return"avenir"
if(x.hR(w.lu(108e8)))return"direct"
return"terminee"}}
B.th.prototype={
R(){return new B.Qy(A.a([],y.E))}}
B.Qy.prototype={
a3(){this.ag()
this.qC()},
qC(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qC=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.t(new B.b2b(s))
u=4
x=7
return A.e(B.EZ(),$async$qC)
case 7:r=e
if(s.c==null){x=1
break}s.t(new B.b2c(s,r))
q=A.a([],y.l)
for(n=J.aH(r);n.v();){p=n.gM(n)
if(p.gCI()!=null&&p.gq5()==="avenir"){m=p.b
l=p.gCI()
l.toString
J.ct(q,new A.a90(l,m))}}o=q
x=8
return A.e($.kM().rX($.aw,o),$async$qC)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.t(new B.b2d(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qC,w)},
aC2(d){var x,w,v,u=d.d
if(u==null)return A.b("Date \xe0 confirmer")
x=B.bj6("d MMM yyyy",$.aw)
w=d.e
if(w.length>=5)w=C.d.V(w,0,5)
v=$.aw==="en"?"at":"\xe0"
return w.length===0?x.yf(u):x.yf(u)+" "+v+" "+w},
Bn(d,e){return this.aCy(d,e)},
aCy(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$Bn=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:p=e.f
if(p.length===0){p=A.b("Salle de r\xe9union non configur\xe9e. Contactez la structure.")
d.u(y.q).f.L(A.P(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}s=A.b("Ouverture de la r\xe9union\u2026")
r=y.q
d.u(r).f.L(A.P(null,null,null,null,null,C.i,null,A.c(s,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
u=4
s=$.a_().a
s=s==null?null:s.a
x=7
return A.e(B.bbQ(s==null?"":s,p),$async$Bn)
case 7:u=2
x=6
break
case 4:u=3
o=t
if(d.e!=null){p=A.b("Impossible d\u2019ouvrir la r\xe9union. V\xe9rifiez votre connexion.")
d.u(r).f.L(A.P(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Bn,w)},
wn(d){return this.aBM(d)},
aBM(d){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g
var $async$wn=A.j(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:j={}
i=$.aD()
h=i.b
if(!(h!=null&&h.length!==0)){j=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.u(y.q).f.L(A.P(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}h=$.ai()
l=new A.bv(C.ah,h)
r=new A.bv(C.ah,h)
j.a=j.b=null
x=3
return A.e(A.qu(C.bE,new B.b2k(j,l,r),d,!0,C.dX,y.y),$async$wn)
case 3:if(f!==!0||d.e==null){x=1
break}q=C.d.aw(l.a.a)
if(J.a9(q)===0||j.b==null||j.a==null){j=A.b("Le titre, la date et l\u2019heure sont requis.")
d.u(y.q).f.L(A.P(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}p=B.bJr()
o=C.d.b8(C.e.j(j.a.a),2,"0")
n=C.d.b8(C.e.j(j.a.b),2,"0")
u=5
h=C.d.aw(r.a.a).length===0?null:C.d.aw(r.a.a)
x=8
return A.e(i.aKK(C.d.b8(C.e.j(j.b.gba()),4,"0")+"-"+C.d.b8(C.e.j(j.b.gb5()),2,"0")+"-"+C.d.b8(C.e.j(j.b.gbj()),2,"0"),h,A.q(o)+":"+A.q(n),q,p,"reunion"),$async$wn)
case 8:if(d.e==null){x=1
break}j=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
d.u(y.q).f.L(A.P(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qC(),$async$wn)
case 9:u=2
x=7
break
case 5:u=4
g=t
m=A.W(g)
if(d.e!=null){j=A.q(m)
d.u(y.q).f.L(A.P(null,null,null,null,null,C.i,null,A.c("Publication refus\xe9e ("+j+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wn,w)},
wt(d,e){return this.aD3(d,e)},
aD3(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wt=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.dW(null,null,!0,null,new B.b2n(),d,null,!0,!0,y.y),$async$wt)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.aD().acV(e.a,!1),$async$wt)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.u(y.q).f.L(A.P(null,null,null,null,null,C.i,null,A.c(q,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qC(),$async$wt)
case 9:u=2
x=7
break
case 5:u=4
o=t
r=A.W(o)
if(d.e!=null){q=A.q(r)
d.u(y.q).f.L(A.P(null,null,null,null,null,C.i,null,A.c("Retrait refus\xe9 ("+q+").",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wt,w)},
F(d){return A.eB(new B.b2u(this))}}
B.ajQ.prototype={
j(d){return this.a}}
B.nc.prototype={
yf(d){var x,w,v,u=this,t=u.e
if(t==null){if(u.d==null){u.S0("yMMMMd")
u.S0("jms")}t=u.d
t.toString
t=u.a3c(t)
x=A.a0(t).i("cS<1>")
x=u.e=A.Q(new A.cS(t,x),!0,x.i("aR.E"))
t=x}x=t.length
w=0
v=""
for(;w<t.length;t.length===x||(0,A.K)(t),++w)v+=t[w].yf(d)
return v.charCodeAt(0)==0?v:v},
Z3(d,e){var x=this.d
this.d=x==null?d:x+e+d},
S0(d){var x,w,v=this
v.e=null
x=$.bhO()
w=v.c
x.toString
if(!(B.yC(w)==="en_US"?x.b:x.wM()).aM(0,d))v.Z3(d," ")
else{x=$.bhO()
x.toString
v.Z3((B.yC(w)==="en_US"?x.b:x.wM()).h(0,d)," ")}return v},
gix(){var x,w=this.c
if(w!==$.bbS){$.bbS=w
x=$.bd4()
x.toString
$.baA=B.yC(w)==="en_US"?x.b:x.wM()}w=$.baA
w.toString
return w},
gaUi(){var x=this.f
if(x==null){$.bj7.h(0,this.c)
x=this.f=!0}return x},
j3(d){var x,w,v,u,t,s,r=this
r.gaUi()
x=r.w
w=$.bud()
if(x===w)return d
x=d.length
v=A.c5(x,0,!1,y.S)
for(u=r.c,t=0;t<x;++t){s=r.w
if(s==null){s=r.x
if(s==null){s=r.f
if(s==null){$.bj7.h(0,u)
s=r.f=!0}if(s){if(u!==$.bbS){$.bbS=u
s=$.bd4()
s.toString
$.baA=B.yC(u)==="en_US"?s.b:s.wM()}$.baA.toString}s=r.x="0"}s=r.w=s.charCodeAt(0)}v[t]=d.charCodeAt(t)+s-w}return A.eX(v,0,null)},
a3c(d){var x,w
if(d.length===0)return A.a([],y.T)
x=this.ayM(d)
if(x==null)return A.a([],y.T)
w=this.a3c(C.d.c1(d,x.a9R().length))
w.push(x)
return w},
ayM(d){var x,w,v,u
for(x=0;w=$.br3(),x<3;++x){v=w[x].pp(d)
if(v!=null){w=B.bwC()[x]
u=v.b[0]
u.toString
return w.$2(u,this)}}return null}}
B.tQ.prototype={
a9R(){return this.a},
j(d){return this.a},
yf(d){return this.a}}
B.Dh.prototype={}
B.Dj.prototype={
a9R(){return this.d}}
B.Di.prototype={
yf(d){return this.aN7(d)},
aN7(d){var x,w,v,u,t,s=this,r="0",q=s.a
switch(q[0]){case"a":x=d.gla()
w=x>=12&&x<24?1:0
return s.b.gix().CW[w]
case"c":return s.aNb(d)
case"d":return s.b.j3(C.d.b8(""+d.gbj(),q.length,r))
case"D":return s.b.j3(C.d.b8(""+B.bIV(d.gb5(),d.gbj(),A.bp(A.bm(d.gba(),2,29,0,0,0,0,0))===2),q.length,r))
case"E":return s.aN6(d)
case"G":v=d.gba()>0?1:0
u=s.b
return q.length>=4?u.gix().c[v]:u.gix().b[v]
case"h":x=d.gla()
if(d.gla()>12)x-=12
return s.b.j3(C.d.b8(""+(x===0?12:x),q.length,r))
case"H":return s.b.j3(C.d.b8(""+d.gla(),q.length,r))
case"K":return s.b.j3(C.d.b8(""+C.e.aq(d.gla(),12),q.length,r))
case"k":return s.b.j3(C.d.b8(""+(d.gla()===0?24:d.gla()),q.length,r))
case"L":return s.aNc(d)
case"M":return s.aN9(d)
case"m":return s.b.j3(C.d.b8(""+d.guR(),q.length,r))
case"Q":return s.aNa(d)
case"S":return s.aN8(d)
case"s":return s.b.j3(C.d.b8(""+d.grY(),q.length,r))
case"y":t=d.gba()
if(t<0)t=-t
q=q.length
u=s.b
return q===2?u.j3(C.d.b8(""+C.e.aq(t,100),2,r)):u.j3(C.d.b8(""+t,q,r))
default:return""}},
aN9(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.gix().d[d.gb5()-1]
case 4:return w.gix().f[d.gb5()-1]
case 3:return w.gix().w[d.gb5()-1]
default:return w.j3(C.d.b8(""+d.gb5(),x,"0"))}},
aN8(d){var x=this.b,w=x.j3(C.d.b8(""+d.gDU(),3,"0")),v=this.a.length-3
if(v>0)return w+x.j3(C.d.b8(""+0,v,"0"))
else return w},
aNb(d){var x=this.b
switch(this.a.length){case 5:return x.gix().ax[C.e.aq(d.gpS(),7)]
case 4:return x.gix().z[C.e.aq(d.gpS(),7)]
case 3:return x.gix().as[C.e.aq(d.gpS(),7)]
default:return x.j3(C.d.b8(""+d.gbj(),1,"0"))}},
aNc(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.gix().e[d.gb5()-1]
case 4:return w.gix().r[d.gb5()-1]
case 3:return w.gix().x[d.gb5()-1]
default:return w.j3(C.d.b8(""+d.gb5(),x,"0"))}},
aNa(d){var x=C.c.E((d.gb5()-1)/3),w=this.a.length,v=this.b
switch(w){case 4:return v.gix().ch[x]
case 3:return v.gix().ay[x]
default:return v.j3(C.d.b8(""+(x+1),w,"0"))}},
aN6(d){var x,w=this,v=w.a.length
$label0$0:{if(v<=3){x=w.b.gix().Q
break $label0$0}if(v===4){x=w.b.gix().y
break $label0$0}if(v===5){x=w.b.gix().at
break $label0$0}if(v>=6)A.aa(A.aN('"Short" weekdays are currently not supported.'))
x=A.aa(A.k5("unreachable"))}return x[C.e.aq(d.gpS(),7)]}}
B.a28.prototype={
h(d,e){return B.yC(e)==="en_US"?this.b:this.wM()},
wM(){throw A.f(new B.Yx("Locale data has not been initialized, call "+this.a+"."))}}
B.Yx.prototype={
j(d){return"LocaleDataException: "+this.a},
$ibt:1}
var z=a.updateTypes(["H(ky)","o(o)","y(ky,ky)","as<~>()","h(ky)","Dj(o,nc)","Di(o,nc)","Dh(o,nc)","H(o?)","o(o?)"])
B.baW.prototype={
$2(d,e){var x=d.gCI(),w=e.gCI()
if(x==null&&w==null)return C.d.bs(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.F7(x,w)},
$S:z+2}
B.b2b.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
B.b2c.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
B.b2d.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
B.b2k.prototype={
$1(d){return new A.iX(new B.b2j(this.a,this.b,this.c),null)},
$S:54}
B.b2j.prototype={
$2(d,e){var x,w,v,u,t,s=null,r=y.w,q=A.an(d,s,r).w,p=A.c(A.b("Nouvelle r\xe9union en ligne"),s,s,s,s,A.A(d).p2.r,s,s,s),o=A.b("Titre de la r\xe9union")
o=A.d0(!0,C.y,!1,s,!0,C.i,s,A.d9(),this.b,s,s,s,s,s,2,A.cK(s,new A.c7(4,A.a6(14),C.ao),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,o,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.P,!0,s,!0,s,!1,s,C.ad,s,s,s,s,s,s,s,1,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a8,s,s,C.aa,C.a7,s,s,s,s,s,s,s,C.S,s,C.al,s,s,s,s)
x=A.b("Description (facultatif)")
x=A.d0(!0,C.y,!1,s,!0,C.i,s,A.d9(),this.c,s,s,s,s,s,2,A.cK(s,new A.c7(4,A.a6(14),C.ao),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,x,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.P,!0,s,!0,s,!1,s,C.ad,s,s,s,s,s,s,s,3,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a8,s,s,C.aa,C.a7,s,s,s,s,s,s,s,C.S,s,C.al,s,s,s,s)
w=this.a
if(w.b==null)v=A.b("Date")
else{v=B.bj6("d MMM yyyy",$.aw)
u=w.b
u.toString
u=v.yf(u)
v=u}v=A.at(A.d_(D.Vj,A.c(v,s,s,s,s,s,s,s,s),new B.b2g(w,d,e),s),1)
u=w.a
if(u==null)r=A.b("Heure")
else{t=A.bJ(d,C.U,y.v)
t.toString
A.an(d,C.d9,r).toString
u=t.a9N(u,!1)
r=u}u=y.p
return new A.ab(new A.ae(16,16,16,q.f.d+16),A.eA(A.Z(A.a([p,C.u,o,C.k,x,C.k,A.ac(A.a([v,C.Y,A.at(A.d_(D.VG,A.c(r,s,s,s,s,s,s,s,s),new B.b2h(w,d,e),s),1)],u),C.n,C.f,C.h,s),C.u,A.ag(A.bU(!1,A.c(A.b("Publier"),s,s,s,s,s,s,s,s),C.j,s,C.q,s,s,s,s,new B.b2i(d),s,s),52,1/0)],u),C.p,C.f,C.a1),s,s,s,C.a6),s)},
$S:95}
B.b2g.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.b
if(s==null)s=new A.aY(Date.now(),0,!1)
x=2
return A.e(A.Tq(null,null,null,v.b,new A.aY(Date.now(),0,!1).lu(-864e8),null,s,new A.aY(Date.now(),0,!1).lu(31536e9)),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b2f(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b2f.prototype={
$0(){return this.a.b=this.b},
$S:0}
B.b2h.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.a
if(s==null){s=new A.aY(Date.now(),0,!1)
s=new A.c3(A.ps(s),A.pt(s))}x=2
return A.e(A.bcI(null,null,null,v.b,null,s),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b2e(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b2e.prototype={
$0(){return this.a.a=this.b},
$S:0}
B.b2i.prototype={
$0(){return A.aX(this.a,!1).bc(!0)},
$S:0}
B.b2n.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.e7(A.a([A.ce(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,C.q,x,x,x,x,new B.b2l(d),x,x),A.ce(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,C.q,x,x,x,x,new B.b2m(d),x,x)],y.p),v,w)},
$S:12}
B.b2l.prototype={
$0(){return A.aX(this.a,!1).bc(!1)},
$S:0}
B.b2m.prototype={
$0(){return A.aX(this.a,!1).bc(!0)},
$S:0}
B.b2u.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.jj(l.d,new B.b2r()),j=A.Q(k,!0,k.$ti.i("t.E"))
k=J.jj(l.d,new B.b2s())
x=A.Q(k,!0,k.$ti.i("t.E"))
w=new B.b2v(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.bqv(v,u,t,$.a_().c?A.bbq(C.io,A.b("Planifier"),new B.b2t(l,d)):o),C.u],s)
if(l.e)t.push(D.Nz)
else if(l.f!=null)t.push(A.ds(new A.ab(C.M,A.Z(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),C.k,A.cQ(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,C.q,o,o,o,o,l.gaD6(),o,o)],s),C.n,C.f,C.h),o),o,o,o,o))
else if(J.cD(l.d))t.push(A.ds(new A.ab(C.M,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([C.k,A.c(q,o,o,o,o,p==null?o:p.bQ(C.ak,C.z),o,o,o),C.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
C.b.B(v,s)}C.b.B(t,v)}l.a.toString
return A.bX(k,t,o,o)},
$S:8}
B.b2r.prototype={
$1(d){return d.gq5()==="avenir"||d.gq5()==="direct"||d.gq5()==="bientot"},
$S:z+0}
B.b2s.prototype={
$1(d){return d.gq5()==="terminee"},
$S:z+0}
B.b2v.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gq5()==="direct",n=q.b,m=n.w
m=m==null?p:m.bQ(C.t,C.B)
m=A.at(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gq5()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=C.BZ
else t=x==="avenir"?C.w:C.ak
x=t.e1(0.12)
w=A.a6(20)
u=A.ad(p,p,C.j,p,p,new A.ax(t,p,p,p,p,p,C.bA),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.ac(A.a([m,A.ad(p,A.ac(A.a([u,C.fp,A.c(v,p,p,p,p,s==null?p:s.bQ(t,C.B),p,p,p)],r),C.n,C.f,C.a1,p),C.j,p,p,new A.ax(x,p,p,w,p,p,C.x),p,p,p,p,C.fQ,p,p,p)],r),C.n,C.f,C.h,p)
x=q.a
s=x.aC2(d)
n=n.z
m=A.a([w,C.a_,A.ac(A.a([D.Wd,C.fp,A.c(s,p,p,p,p,n==null?p:n.aV(C.ak),p,p,p)],r),C.n,C.f,C.h,p)],r)
w=d.c
if(w.length!==0)C.b.B(m,A.a([C.cs,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(C.k)
n=A.a([],r)
if(!o&&d.gq5()!=="terminee")n.push(A.at(A.cJ(D.VO,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new B.b2o(x,q.c,d),p),1))
if(o){w=A.hE(C.BZ,C.l,p,p,p,p)
n.push(A.at(A.cJ(D.Vf,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new B.b2p(x,q.c,d),w),1))}if($.a_().c)C.b.B(n,A.a([C.Y,A.c0(p,p,p,D.Vp,p,p,new B.b2q(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.ac(n,C.n,C.f,C.h,p))
return A.ds(new A.ab(C.M,A.Z(m,C.p,C.f,C.h),p),p,p,C.bs,p)},
$S:z+4}
B.b2o.prototype={
$0(){return this.a.Bn(this.b,this.c)},
$S:0}
B.b2p.prototype={
$0(){return this.a.Bn(this.b,this.c)},
$S:0}
B.b2q.prototype={
$0(){return this.a.wt(this.b,this.c)},
$S:0}
B.b2t.prototype={
$0(){return this.a.wn(this.b)},
$S:0}
B.ajP.prototype={
$8(d,e,f,g,h,i,j,k){if(k)return A.bdK(d,e,f,g,h,i,j,0)
else return A.bm(d,e,f,g,h,i,j,0)},
$S:845}
B.ajM.prototype={
$2(d,e){var x=B.bDl(d)
C.d.aw(x)
return new B.Dj(d,x,e)},
$S:z+5}
B.ajN.prototype={
$2(d,e){C.d.aw(d)
return new B.Di(d,e)},
$S:z+6}
B.ajO.prototype={
$2(d,e){C.d.aw(d)
return new B.Dh(d,e)},
$S:z+7}
B.bcR.prototype={
$1(d){return B.bgz(B.bqM(d))},
$S:121}
B.bcS.prototype={
$1(d){return B.bgz(B.yC(d))},
$S:121}
B.bcT.prototype={
$1(d){return"fallback"},
$S:121};(function installTearOffs(){var x=a._instance_0u,w=a._static_1
x(B.Qy.prototype,"gaD6","qC",3)
w(B,"bIU","bwD",8)
w(B,"bJP","yC",9)
w(B,"bJQ","bgz",1)
w(B,"bJR","bqM",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.S,[B.ky,B.ajQ,B.nc,B.tQ,B.a28,B.Yx])
x(A.v3,[B.baW,B.b2j,B.ajM,B.ajN,B.ajO])
w(B.th,A.U)
w(B.Qy,A.Y)
x(A.v2,[B.b2b,B.b2c,B.b2d,B.b2g,B.b2f,B.b2h,B.b2e,B.b2i,B.b2l,B.b2m,B.b2o,B.b2p,B.b2q,B.b2t])
x(A.lL,[B.b2k,B.b2n,B.b2u,B.b2r,B.b2s,B.b2v,B.ajP,B.bcR,B.bcS,B.bcT])
x(B.tQ,[B.Dh,B.Dj,B.Di])})()
A.b6w(b.typeUniverse,JSON.parse('{"th":{"U":[],"h":[]},"Qy":{"Y":["th"]},"Dh":{"tQ":[]},"Dj":{"tQ":[]},"Di":{"tQ":[]},"Yx":{"bt":[]}}'))
A.bg2(b.typeUniverse,JSON.parse('{"a28":1}'))
var y=(function rtii(){var x=A.aK
return{t:x("D<au<o,@>>"),l:x("D<+debut,nom(aY,o)>"),E:x("D<ky>"),s:x("D<o>"),p:x("D<h>"),T:x("D<tQ>"),n:x("D<tQ(o,nc)>"),x:x("E<ky>"),j:x("E<@>"),f:x("au<@,@>"),v:x("rD"),w:x("kp"),N:x("o"),q:x("ua"),y:x("H"),z:x("@"),S:x("y"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.SX=new A.ae(32,32,32,32)
D.a8i=new A.ab(D.SX,C.hW,null)
D.Nz=new A.hz(C.a2,null,null,D.a8i,null)
D.TX=new A.ak(59048,!1)
D.Vf=new A.aC(D.TX,null,null,null,null)
D.Vj=new A.aC(C.nJ,null,null,null,null)
D.Vp=new A.aC(C.nE,null,C.ak,null,null)
D.vn=new A.ak(62265,!1)
D.VG=new A.aC(D.vn,null,null,null,null)
D.VO=new A.aC(C.vr,null,null,null,null)
D.Wd=new A.aC(D.vn,16,C.ak,null,null)
D.a_i=A.a(x(["AM","PM"]),y.s)
D.a_k=A.a(x(["BC","AD"]),y.s)
D.ws=A.a(x(["J","F","M","A","M","J","J","A","S","O","N","D"]),y.s)
D.a_S=A.a(x(["1st quarter","2nd quarter","3rd quarter","4th quarter"]),y.s)
D.wx=A.a(x(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),y.s)
D.a_T=A.a(x(["Before Christ","Anno Domini"]),y.s)
D.a00=A.a(x(["Q1","Q2","Q3","Q4"]),y.s)
D.wK=A.a(x(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]),y.s)
D.a7k={d:0,E:1,EEEE:2,LLL:3,LLLL:4,M:5,Md:6,MEd:7,MMM:8,MMMd:9,MMMEd:10,MMMM:11,MMMMd:12,MMMMEEEEd:13,QQQ:14,QQQQ:15,y:16,yM:17,yMd:18,yMEd:19,yMMM:20,yMMMd:21,yMMMEd:22,yMMMM:23,yMMMMd:24,yMMMMEEEEd:25,yQQQ:26,yQQQQ:27,H:28,Hm:29,Hms:30,j:31,jm:32,jms:33,jmv:34,jmz:35,jz:36,m:37,ms:38,s:39,v:40,z:41,zzzz:42,ZZZZ:43}
D.a64=new A.cq(D.a7k,["d","ccc","cccc","LLL","LLLL","L","M/d","EEE, M/d","LLL","MMM d","EEE, MMM d","LLLL","MMMM d","EEEE, MMMM d","QQQ","QQQQ","y","M/y","M/d/y","EEE, M/d/y","MMM y","MMM d, y","EEE, MMM d, y","MMMM y","MMMM d, y","EEEE, MMMM d, y","QQQ y","QQQQ y","HH","HH:mm","HH:mm:ss","h\u202fa","h:mm\u202fa","h:mm:ss\u202fa","h:mm\u202fa v","h:mm\u202fa z","h\u202fa z","m","mm:ss","s","v","z","zzzz","ZZZZ"],A.aK("cq<o,o>"))})();(function staticFields(){$.baA=null
$.bbS=null
$.boE=null
$.bj7=A.C(y.N,y.y)})();(function lazyInitializers(){var x=a.lazyFinal,w=a.lazy
x($,"bRi","bue",()=>new B.ajQ("en_US",D.a_k,D.a_T,D.ws,D.ws,C.cX,C.cX,C.iH,C.iH,D.wK,D.wK,D.wx,D.wx,C.kV,C.kV,D.a00,D.a_S,D.a_i))
w($,"bPJ","bd4",()=>B.bnb("initializeDateFormatting(<locale>)",$.bue()))
w($,"bRf","bhO",()=>B.bnb("initializeDateFormatting(<locale>)",D.a64))
x($,"bR6","bud",()=>48)
x($,"bLJ","br3",()=>A.a([A.c1("^'(?:[^']|'')*'",!0,!1),A.c1("^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)",!0,!1),A.c1("^[^'GyMkSEahKHcLQdDmsvzZ]+",!0,!1)],A.aK("D<blW>")))
x($,"bOR","bsL",()=>A.c1("''",!0,!1))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"fceEIcREz5UTpFV9BQasB5qMOu4=");