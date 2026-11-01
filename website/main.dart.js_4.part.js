((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={
bmg(d){var x,w,v,u=J.a4(d),t=u.h(d,"date_debut"),s=J.x(t==null?"":t),r=s.length!==0?A.df(s):null
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
EY(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$EY=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.aD().ef("/evenements"),$async$EY)
case 7:s=a8
r=A.a([],y.E)
for(g=J.aH(s);g.v();){q=g.gM(g)
f=J.p(q,"type")
if(J.x(f==null?"":f)==="reunion")J.ct(r,B.bmg(q))}p=r
J.yT(p,new B.bb1())
x=8
return A.e(A.dw(),$async$EY)
case 8:o=a8
n=A.a([],y.t)
for(r=p,g=r.length,f=y.N,e=y.z,d=0;d<r.length;r.length===g||(0,A.K)(r),++d){m=r[d]
a0=m
a1=a0.a
a2=a0.b
a3=a0.c
a4=a0.d
a4=a4==null?"":C.d.b8(C.e.j(A.bc(a4)),4,"0")+"-"+C.d.b8(C.e.j(A.bm(a4)),2,"0")+"-"+C.d.b8(C.e.j(A.e3(a4)),2,"0")
J.ct(n,A.ai(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
return A.e(o.di("String","reunions_cache_v1",C.a4.hr(n,null)),$async$EY)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dw(),$async$EY)
case 10:o=a8
l=o
k=A.aS(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.aa(k)===0)throw a6
j=y.j.a(C.a4.eD(0,k,null))
i=A.a([],y.E)
for(r=J.aH(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gM(r)
J.ct(i,B.bmg(J.mW(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$EY,w)},
bJx(){var x,w=$.bhl(),v=J.kh(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yE(31)]
return"cp-"+C.b.DH(v)},
bB8(){return new B.th(null)},
ky:function ky(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
bb1:function bb1(){},
th:function th(d){this.a=d},
Qz:function Qz(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b2h:function b2h(d){this.a=d},
b2i:function b2i(d,e){this.a=d
this.b=e},
b2j:function b2j(d){this.a=d},
b2q:function b2q(d,e,f){this.a=d
this.b=e
this.c=f},
b2p:function b2p(d,e,f){this.a=d
this.b=e
this.c=f},
b2m:function b2m(d,e,f){this.a=d
this.b=e
this.c=f},
b2l:function b2l(d,e){this.a=d
this.b=e},
b2n:function b2n(d,e,f){this.a=d
this.b=e
this.c=f},
b2k:function b2k(d,e){this.a=d
this.b=e},
b2o:function b2o(d){this.a=d},
b2t:function b2t(){},
b2r:function b2r(d){this.a=d},
b2s:function b2s(d){this.a=d},
b2A:function b2A(d){this.a=d},
b2x:function b2x(){},
b2y:function b2y(){},
b2B:function b2B(d,e,f){this.a=d
this.b=e
this.c=f},
b2u:function b2u(d,e,f){this.a=d
this.b=e
this.c=f},
b2v:function b2v(d,e,f){this.a=d
this.b=e
this.c=f},
b2w:function b2w(d,e,f){this.a=d
this.b=e
this.c=f},
b2z:function b2z(d,e){this.a=d
this.b=e},
ajR:function ajR(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var _=this
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
bjd(d,e){var x=B.bLc(e,B.bJ_(),null)
x.toString
x=new B.nc(new B.ajQ(),x)
x.S1(d)
return x},
bwK(d){var x=$.bda()
x.toString
if(B.yC(d)!=="en_US")x.wN()
return!0},
bwJ(){return A.a([new B.ajN(),new B.ajO(),new B.ajP()],y.n)},
bDr(d){var x,w
if(d==="''")return"'"
else{x=C.d.V(d,1,d.length-1)
w=$.bsS()
return A.a3(x,w,"'")}},
nc:function nc(d,e){var _=this
_.a=d
_.c=e
_.x=_.w=_.f=_.e=_.d=null},
ajQ:function ajQ(){},
ajN:function ajN(){},
ajO:function ajO(){},
ajP:function ajP(){},
tQ:function tQ(){},
Dg:function Dg(d,e){this.a=d
this.b=e},
Di:function Di(d,e,f){this.d=d
this.a=e
this.b=f},
Dh:function Dh(d,e){this.a=d
this.b=e},
bni(d,e){return new B.a29(d,e,A.a([],y.s))},
bpu(d){var x,w=d.length
if(w<3)return-1
x=d[2]
if(x==="-"||x==="_")return 2
if(w<4)return-1
w=d[3]
if(w==="-"||w==="_")return 3
return-1},
yC(d){var x,w,v,u
if(d==null){if(B.bq9()==null)$.boL="en_US"
x=B.bq9()
x.toString
return x}if(d==="C")return"en_ISO"
if(d.length<5)return d
w=B.bpu(d)
if(w===-1)return d
v=C.d.V(d,0,w)
u=C.d.c1(d,w+1)
if(u.length<=3)u=u.toUpperCase()
return v+"_"+u},
bLc(d,e,f){var x,w,v
if(e.$1(d))return d
x=[B.bJV(),B.bJX(),B.bJW(),new B.bcX(),new B.bcY(),new B.bcZ()]
for(w=0;w<6;++w){v=x[w].$1(d)
if(e.$1(v))return v}return B.bHL(d)},
bHL(d){throw A.f(A.cd('Invalid locale "'+d+'"',null))},
bgG(d){switch(d){case"iw":return"he"
case"he":return"iw"
case"fil":return"tl"
case"tl":return"fil"
case"id":return"in"
case"in":return"id"
case"no":return"nb"
case"nb":return"no"}return d},
bqT(d){var x,w
if(d==="invalid")return"in"
x=d.length
if(x<2)return d
w=B.bpu(d)
if(w===-1)if(x<4)return d.toLowerCase()
else return d
return C.d.V(d,0,w).toLowerCase()},
a29:function a29(d,e,f){this.a=d
this.b=e
this.c=f},
Yy:function Yy(d){this.a=d},
bcX:function bcX(){},
bcY:function bcY(){},
bcZ:function bcZ(){},
bbW(d,e){var x=0,w=A.n(y.H)
var $async$bbW=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.yJ(A.d2("https://meet.jit.si/"+e,0,null),C.Xv,"_blank"),$async$bbW)
case 2:return A.l(null,w)}})
return A.m($async$bbW,w)},
bq9(){var x=$.boL
return x},
bJ0(d,e,f){var x,w
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
gCJ(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.dD(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.dD(x[1],null)
t=w==null?0:w}else t=0
return A.bn(A.bc(s),A.bm(s),A.e3(s),u,t,0,0,0)},
gq5(){var x,w=this.gCJ()
if(w==null)return"bientot"
x=new A.aY(Date.now(),0,!1)
if(x.hR(w))return"avenir"
if(x.hR(w.lu(108e8)))return"direct"
return"terminee"}}
B.th.prototype={
R(){return new B.Qz(A.a([],y.E))}}
B.Qz.prototype={
a3(){this.ae()
this.qC()},
qC(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qC=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.t(new B.b2h(s))
u=4
x=7
return A.e(B.EY(),$async$qC)
case 7:r=e
if(s.c==null){x=1
break}s.t(new B.b2i(s,r))
q=A.a([],y.l)
for(n=J.aH(r);n.v();){p=n.gM(n)
if(p.gCJ()!=null&&p.gq5()==="avenir"){m=p.b
l=p.gCJ()
l.toString
J.ct(q,new A.a91(l,m))}}o=q
x=8
return A.e($.kM().rX($.ap,o),$async$qC)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.t(new B.b2j(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qC,w)},
aC3(d){var x,w,v,u=d.d
if(u==null)return A.b("Date \xe0 confirmer")
x=B.bjd("d MMM yyyy",$.ap)
w=d.e
if(w.length>=5)w=C.d.V(w,0,5)
v=$.ap==="en"?"at":"\xe0"
return w.length===0?x.yg(u):x.yg(u)+" "+v+" "+w},
Bo(d,e){return this.aCz(d,e)},
aCz(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$Bo=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:p=e.f
if(p.length===0){p=A.b("Salle de r\xe9union non configur\xe9e. Contactez la structure.")
d.u(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}s=A.b("Ouverture de la r\xe9union\u2026")
r=y.q
d.u(r).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(s,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
u=4
s=$.Z().a
s=s==null?null:s.a
x=7
return A.e(B.bbW(s==null?"":s,p),$async$Bo)
case 7:u=2
x=6
break
case 4:u=3
o=t
if(d.e!=null){p=A.b("Impossible d\u2019ouvrir la r\xe9union. V\xe9rifiez votre connexion.")
d.u(r).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Bo,w)},
wo(d){return this.aBN(d)},
aBN(d){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g
var $async$wo=A.j(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:j={}
i=$.aD()
h=i.b
if(!(h!=null&&h.length!==0)){j=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.u(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}h=$.ah()
l=new A.br(C.ai,h)
r=new A.br(C.ai,h)
j.a=j.b=null
x=3
return A.e(A.qv(C.bF,new B.b2q(j,l,r),d,!0,C.dX,y.y),$async$wo)
case 3:if(f!==!0||d.e==null){x=1
break}q=C.d.az(l.a.a)
if(J.aa(q)===0||j.b==null||j.a==null){j=A.b("Le titre, la date et l\u2019heure sont requis.")
d.u(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}p=B.bJx()
o=C.d.b8(C.e.j(j.a.a),2,"0")
n=C.d.b8(C.e.j(j.a.b),2,"0")
u=5
h=C.d.az(r.a.a).length===0?null:C.d.az(r.a.a)
x=8
return A.e(i.aKM(C.d.b8(C.e.j(j.b.gba()),4,"0")+"-"+C.d.b8(C.e.j(j.b.gb5()),2,"0")+"-"+C.d.b8(C.e.j(j.b.gbj()),2,"0"),h,A.q(o)+":"+A.q(n),q,p,"reunion"),$async$wo)
case 8:if(d.e==null){x=1
break}j=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
d.u(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qC(),$async$wo)
case 9:u=2
x=7
break
case 5:u=4
g=t
m=A.W(g)
if(d.e!=null){j=A.q(m)
d.u(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c("Publication refus\xe9e ("+j+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wo,w)},
wu(d,e){return this.aD4(d,e)},
aD4(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wu=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.e_(null,null,!0,null,new B.b2t(),d,null,!0,!0,y.y),$async$wu)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.aD().acX(e.a,!1),$async$wu)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.u(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(q,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qC(),$async$wu)
case 9:u=2
x=7
break
case 5:u=4
o=t
r=A.W(o)
if(d.e!=null){q=A.q(r)
d.u(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c("Retrait refus\xe9 ("+q+").",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wu,w)},
E(d){return A.eA(new B.b2A(this))}}
B.ajR.prototype={
j(d){return this.a}}
B.nc.prototype={
yg(d){var x,w,v,u=this,t=u.e
if(t==null){if(u.d==null){u.S1("yMMMMd")
u.S1("jms")}t=u.d
t.toString
t=u.a3e(t)
x=A.a0(t).i("cT<1>")
x=u.e=A.O(new A.cT(t,x),!0,x.i("aR.E"))
t=x}x=t.length
w=0
v=""
for(;w<t.length;t.length===x||(0,A.K)(t),++w)v+=t[w].yg(d)
return v.charCodeAt(0)==0?v:v},
Z5(d,e){var x=this.d
this.d=x==null?d:x+e+d},
S1(d){var x,w,v=this
v.e=null
x=$.bhV()
w=v.c
x.toString
if(!(B.yC(w)==="en_US"?x.b:x.wN()).aM(0,d))v.Z5(d," ")
else{x=$.bhV()
x.toString
v.Z5((B.yC(w)==="en_US"?x.b:x.wN()).h(0,d)," ")}return v},
gix(){var x,w=this.c
if(w!==$.bbY){$.bbY=w
x=$.bda()
x.toString
$.baG=B.yC(w)==="en_US"?x.b:x.wN()}w=$.baG
w.toString
return w},
gaUk(){var x=this.f
if(x==null){$.bje.h(0,this.c)
x=this.f=!0}return x},
j3(d){var x,w,v,u,t,s,r=this
r.gaUk()
x=r.w
w=$.buk()
if(x===w)return d
x=d.length
v=A.c7(x,0,!1,y.S)
for(u=r.c,t=0;t<x;++t){s=r.w
if(s==null){s=r.x
if(s==null){s=r.f
if(s==null){$.bje.h(0,u)
s=r.f=!0}if(s){if(u!==$.bbY){$.bbY=u
s=$.bda()
s.toString
$.baG=B.yC(u)==="en_US"?s.b:s.wN()}$.baG.toString}s=r.x="0"}s=r.w=s.charCodeAt(0)}v[t]=d.charCodeAt(t)+s-w}return A.eZ(v,0,null)},
a3e(d){var x,w
if(d.length===0)return A.a([],y.T)
x=this.ayN(d)
if(x==null)return A.a([],y.T)
w=this.a3e(C.d.c1(d,x.a9T().length))
w.push(x)
return w},
ayN(d){var x,w,v,u
for(x=0;w=$.bra(),x<3;++x){v=w[x].pp(d)
if(v!=null){w=B.bwJ()[x]
u=v.b[0]
u.toString
return w.$2(u,this)}}return null}}
B.tQ.prototype={
a9T(){return this.a},
j(d){return this.a},
yg(d){return this.a}}
B.Dg.prototype={}
B.Di.prototype={
a9T(){return this.d}}
B.Dh.prototype={
yg(d){return this.aN9(d)},
aN9(d){var x,w,v,u,t,s=this,r="0",q=s.a
switch(q[0]){case"a":x=d.gla()
w=x>=12&&x<24?1:0
return s.b.gix().CW[w]
case"c":return s.aNd(d)
case"d":return s.b.j3(C.d.b8(""+d.gbj(),q.length,r))
case"D":return s.b.j3(C.d.b8(""+B.bJ0(d.gb5(),d.gbj(),A.bm(A.bn(d.gba(),2,29,0,0,0,0,0))===2),q.length,r))
case"E":return s.aN8(d)
case"G":v=d.gba()>0?1:0
u=s.b
return q.length>=4?u.gix().c[v]:u.gix().b[v]
case"h":x=d.gla()
if(d.gla()>12)x-=12
return s.b.j3(C.d.b8(""+(x===0?12:x),q.length,r))
case"H":return s.b.j3(C.d.b8(""+d.gla(),q.length,r))
case"K":return s.b.j3(C.d.b8(""+C.e.aq(d.gla(),12),q.length,r))
case"k":return s.b.j3(C.d.b8(""+(d.gla()===0?24:d.gla()),q.length,r))
case"L":return s.aNe(d)
case"M":return s.aNb(d)
case"m":return s.b.j3(C.d.b8(""+d.guS(),q.length,r))
case"Q":return s.aNc(d)
case"S":return s.aNa(d)
case"s":return s.b.j3(C.d.b8(""+d.grY(),q.length,r))
case"y":t=d.gba()
if(t<0)t=-t
q=q.length
u=s.b
return q===2?u.j3(C.d.b8(""+C.e.aq(t,100),2,r)):u.j3(C.d.b8(""+t,q,r))
default:return""}},
aNb(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.gix().d[d.gb5()-1]
case 4:return w.gix().f[d.gb5()-1]
case 3:return w.gix().w[d.gb5()-1]
default:return w.j3(C.d.b8(""+d.gb5(),x,"0"))}},
aNa(d){var x=this.b,w=x.j3(C.d.b8(""+d.gDV(),3,"0")),v=this.a.length-3
if(v>0)return w+x.j3(C.d.b8(""+0,v,"0"))
else return w},
aNd(d){var x=this.b
switch(this.a.length){case 5:return x.gix().ax[C.e.aq(d.gpS(),7)]
case 4:return x.gix().z[C.e.aq(d.gpS(),7)]
case 3:return x.gix().as[C.e.aq(d.gpS(),7)]
default:return x.j3(C.d.b8(""+d.gbj(),1,"0"))}},
aNe(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.gix().e[d.gb5()-1]
case 4:return w.gix().r[d.gb5()-1]
case 3:return w.gix().x[d.gb5()-1]
default:return w.j3(C.d.b8(""+d.gb5(),x,"0"))}},
aNc(d){var x=C.c.F((d.gb5()-1)/3),w=this.a.length,v=this.b
switch(w){case 4:return v.gix().ch[x]
case 3:return v.gix().ay[x]
default:return v.j3(C.d.b8(""+(x+1),w,"0"))}},
aN8(d){var x,w=this,v=w.a.length
$label0$0:{if(v<=3){x=w.b.gix().Q
break $label0$0}if(v===4){x=w.b.gix().y
break $label0$0}if(v===5){x=w.b.gix().at
break $label0$0}if(v>=6)A.ab(A.aN('"Short" weekdays are currently not supported.'))
x=A.ab(A.k5("unreachable"))}return x[C.e.aq(d.gpS(),7)]}}
B.a29.prototype={
h(d,e){return B.yC(e)==="en_US"?this.b:this.wN()},
wN(){throw A.f(new B.Yy("Locale data has not been initialized, call "+this.a+"."))}}
B.Yy.prototype={
j(d){return"LocaleDataException: "+this.a},
$ibu:1}
var z=a.updateTypes(["H(ky)","o(o)","y(ky,ky)","av<~>()","h(ky)","Di(o,nc)","Dh(o,nc)","Dg(o,nc)","H(o?)","o(o?)"])
B.bb1.prototype={
$2(d,e){var x=d.gCJ(),w=e.gCJ()
if(x==null&&w==null)return C.d.bs(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.F6(x,w)},
$S:z+2}
B.b2h.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
B.b2i.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
B.b2j.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
B.b2q.prototype={
$1(d){return new A.jK(new B.b2p(this.a,this.b,this.c),null)},
$S:62}
B.b2p.prototype={
$2(d,e){var x,w,v,u,t,s=null,r=y.w,q=A.ao(d,s,r).w,p=A.c(A.b("Nouvelle r\xe9union en ligne"),s,s,s,s,A.A(d).p2.r,s,s,s),o=A.b("Titre de la r\xe9union")
o=A.cR(!0,C.y,!1,s,!0,C.i,s,A.cW(),this.b,s,s,s,s,s,2,A.cN(s,new A.c8(4,A.a6(14),C.ao),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,o,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.O,!0,s,!0,s,!1,s,C.aa,s,s,s,s,s,s,s,1,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a7,s,s,C.a9,C.a6,s,s,s,s,s,s,s,C.R,s,C.ag,s,s,s,s)
x=A.b("Description (facultatif)")
x=A.cR(!0,C.y,!1,s,!0,C.i,s,A.cW(),this.c,s,s,s,s,s,2,A.cN(s,new A.c8(4,A.a6(14),C.ao),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,x,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.O,!0,s,!0,s,!1,s,C.aa,s,s,s,s,s,s,s,3,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a7,s,s,C.a9,C.a6,s,s,s,s,s,s,s,C.R,s,C.ag,s,s,s,s)
w=this.a
if(w.b==null)v=A.b("Date")
else{v=B.bjd("d MMM yyyy",$.ap)
u=w.b
u.toString
u=v.yg(u)
v=u}v=A.aj(A.d1(D.Vr,A.c(v,s,s,s,s,s,s,s,s),new B.b2m(w,d,e),s),1)
u=w.a
if(u==null)r=A.b("Heure")
else{t=A.bJ(d,C.V,y.v)
t.toString
A.ao(d,C.da,r).toString
u=t.a9P(u,!1)
r=u}u=y.p
return new A.a9(new A.ae(16,16,16,q.f.d+16),A.eF(A.X(A.a([p,C.t,o,C.k,x,C.k,A.ac(A.a([v,C.S,A.aj(A.d1(D.VO,A.c(r,s,s,s,s,s,s,s,s),new B.b2n(w,d,e),s),1)],u),C.n,C.f,C.h,s),C.t,A.ag(A.bV(!1,A.c(A.b("Publier"),s,s,s,s,s,s,s,s),C.j,s,C.r,s,s,s,s,new B.b2o(d),s,s),52,1/0)],u),C.p,C.f,C.a2),s,s,s,C.a8),s)},
$S:91}
B.b2m.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.b
if(s==null)s=new A.aY(Date.now(),0,!1)
x=2
return A.e(A.Tr(null,null,null,v.b,new A.aY(Date.now(),0,!1).lu(-864e8),null,s,new A.aY(Date.now(),0,!1).lu(31536e9)),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b2l(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b2l.prototype={
$0(){return this.a.b=this.b},
$S:0}
B.b2n.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.a
if(s==null){s=new A.aY(Date.now(),0,!1)
s=new A.c5(A.pt(s),A.pu(s))}x=2
return A.e(A.bcO(null,null,null,v.b,null,s),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b2k(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b2k.prototype={
$0(){return this.a.a=this.b},
$S:0}
B.b2o.prototype={
$0(){return A.aX(this.a,!1).be(!0)},
$S:0}
B.b2t.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.ei(A.a([A.ci(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,C.r,x,x,x,x,new B.b2r(d),x,x),A.ci(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,C.r,x,x,x,x,new B.b2s(d),x,x)],y.p),v,w)},
$S:12}
B.b2r.prototype={
$0(){return A.aX(this.a,!1).be(!1)},
$S:0}
B.b2s.prototype={
$0(){return A.aX(this.a,!1).be(!0)},
$S:0}
B.b2A.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.ji(l.d,new B.b2x()),j=A.O(k,!0,k.$ti.i("t.E"))
k=J.ji(l.d,new B.b2y())
x=A.O(k,!0,k.$ti.i("t.E"))
w=new B.b2B(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.bqC(v,u,t,$.Z().c?A.bbw(C.it,A.b("Planifier"),new B.b2z(l,d)):o),C.t],s)
if(l.e)t.push(D.NE)
else if(l.f!=null)t.push(A.ds(new A.a9(C.L,A.X(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),C.k,A.cQ(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,C.r,o,o,o,o,l.gaD7(),o,o)],s),C.n,C.f,C.h),o),o,o,o,o))
else if(J.cD(l.d))t.push(A.ds(new A.a9(C.L,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([C.k,A.c(q,o,o,o,o,p==null?o:p.bQ(C.ae,C.z),o,o,o),C.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
C.b.B(v,s)}C.b.B(t,v)}l.a.toString
return A.bT(k,t,o,o)},
$S:8}
B.b2x.prototype={
$1(d){return d.gq5()==="avenir"||d.gq5()==="direct"||d.gq5()==="bientot"},
$S:z+0}
B.b2y.prototype={
$1(d){return d.gq5()==="terminee"},
$S:z+0}
B.b2B.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gq5()==="direct",n=q.b,m=n.w
m=m==null?p:m.bQ(C.q,C.A)
m=A.aj(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gq5()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=C.C3
else t=x==="avenir"?C.v:C.ae
x=t.e1(0.12)
w=A.a6(20)
u=A.ad(p,p,C.j,p,p,new A.aq(t,p,p,p,p,p,C.bB),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.ac(A.a([m,A.ad(p,A.ac(A.a([u,C.fr,A.c(v,p,p,p,p,s==null?p:s.bQ(t,C.A),p,p,p)],r),C.n,C.f,C.a2,p),C.j,p,p,new A.aq(x,p,p,w,p,p,C.x),p,p,p,p,C.fS,p,p,p)],r),C.n,C.f,C.h,p)
x=q.a
s=x.aC3(d)
n=n.z
m=A.a([w,C.a_,A.ac(A.a([D.Wm,C.fr,A.c(s,p,p,p,p,n==null?p:n.aT(C.ae),p,p,p)],r),C.n,C.f,C.h,p)],r)
w=d.c
if(w.length!==0)C.b.B(m,A.a([C.cs,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(C.k)
n=A.a([],r)
if(!o&&d.gq5()!=="terminee")n.push(A.aj(A.cJ(D.VW,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new B.b2u(x,q.c,d),p),1))
if(o){w=A.hE(C.C3,C.l,p,p,p,p)
n.push(A.aj(A.cJ(D.Vn,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new B.b2v(x,q.c,d),w),1))}if($.Z().c)C.b.B(n,A.a([C.S,A.c0(p,p,p,D.Vx,p,p,new B.b2w(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.ac(n,C.n,C.f,C.h,p))
return A.ds(new A.a9(C.L,A.X(m,C.p,C.f,C.h),p),p,p,C.aV,p)},
$S:z+4}
B.b2u.prototype={
$0(){return this.a.Bo(this.b,this.c)},
$S:0}
B.b2v.prototype={
$0(){return this.a.Bo(this.b,this.c)},
$S:0}
B.b2w.prototype={
$0(){return this.a.wu(this.b,this.c)},
$S:0}
B.b2z.prototype={
$0(){return this.a.wo(this.b)},
$S:0}
B.ajQ.prototype={
$8(d,e,f,g,h,i,j,k){if(k)return A.bdQ(d,e,f,g,h,i,j,0)
else return A.bn(d,e,f,g,h,i,j,0)},
$S:845}
B.ajN.prototype={
$2(d,e){var x=B.bDr(d)
C.d.az(x)
return new B.Di(d,x,e)},
$S:z+5}
B.ajO.prototype={
$2(d,e){C.d.az(d)
return new B.Dh(d,e)},
$S:z+6}
B.ajP.prototype={
$2(d,e){C.d.az(d)
return new B.Dg(d,e)},
$S:z+7}
B.bcX.prototype={
$1(d){return B.bgG(B.bqT(d))},
$S:118}
B.bcY.prototype={
$1(d){return B.bgG(B.yC(d))},
$S:118}
B.bcZ.prototype={
$1(d){return"fallback"},
$S:118};(function installTearOffs(){var x=a._instance_0u,w=a._static_1
x(B.Qz.prototype,"gaD7","qC",3)
w(B,"bJ_","bwK",8)
w(B,"bJV","yC",9)
w(B,"bJW","bgG",1)
w(B,"bJX","bqT",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.S,[B.ky,B.ajR,B.nc,B.tQ,B.a29,B.Yy])
x(A.v3,[B.bb1,B.b2p,B.ajN,B.ajO,B.ajP])
w(B.th,A.U)
w(B.Qz,A.a_)
x(A.v2,[B.b2h,B.b2i,B.b2j,B.b2m,B.b2l,B.b2n,B.b2k,B.b2o,B.b2r,B.b2s,B.b2u,B.b2v,B.b2w,B.b2z])
x(A.lK,[B.b2q,B.b2t,B.b2A,B.b2x,B.b2y,B.b2B,B.ajQ,B.bcX,B.bcY,B.bcZ])
x(B.tQ,[B.Dg,B.Di,B.Dh])})()
A.b6C(b.typeUniverse,JSON.parse('{"th":{"U":[],"h":[]},"Qz":{"a_":["th"]},"Dg":{"tQ":[]},"Di":{"tQ":[]},"Dh":{"tQ":[]},"Yy":{"bu":[]}}'))
A.bg9(b.typeUniverse,JSON.parse('{"a29":1}'))
var y=(function rtii(){var x=A.aK
return{t:x("D<aw<o,@>>"),l:x("D<+debut,nom(aY,o)>"),E:x("D<ky>"),s:x("D<o>"),p:x("D<h>"),T:x("D<tQ>"),n:x("D<tQ(o,nc)>"),x:x("E<ky>"),j:x("E<@>"),f:x("aw<@,@>"),v:x("rD"),w:x("kp"),N:x("o"),q:x("ua"),y:x("H"),z:x("@"),S:x("y"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.T3=new A.ae(32,32,32,32)
D.a8r=new A.a9(D.T3,C.i_,null)
D.NE=new A.hz(C.a1,null,null,D.a8r,null)
D.U3=new A.ak(59048,!1)
D.Vn=new A.aB(D.U3,null,null,null,null)
D.Vr=new A.aB(C.nM,null,null,null,null)
D.Vx=new A.aB(C.nH,null,C.ae,null,null)
D.vu=new A.ak(62265,!1)
D.VO=new A.aB(D.vu,null,null,null,null)
D.VW=new A.aB(C.vy,null,null,null,null)
D.Wm=new A.aB(D.vu,16,C.ae,null,null)
D.a_r=A.a(x(["AM","PM"]),y.s)
D.a_t=A.a(x(["BC","AD"]),y.s)
D.wx=A.a(x(["J","F","M","A","M","J","J","A","S","O","N","D"]),y.s)
D.a00=A.a(x(["1st quarter","2nd quarter","3rd quarter","4th quarter"]),y.s)
D.wC=A.a(x(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),y.s)
D.a01=A.a(x(["Before Christ","Anno Domini"]),y.s)
D.a09=A.a(x(["Q1","Q2","Q3","Q4"]),y.s)
D.wP=A.a(x(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]),y.s)
D.a7t={d:0,E:1,EEEE:2,LLL:3,LLLL:4,M:5,Md:6,MEd:7,MMM:8,MMMd:9,MMMEd:10,MMMM:11,MMMMd:12,MMMMEEEEd:13,QQQ:14,QQQQ:15,y:16,yM:17,yMd:18,yMEd:19,yMMM:20,yMMMd:21,yMMMEd:22,yMMMM:23,yMMMMd:24,yMMMMEEEEd:25,yQQQ:26,yQQQQ:27,H:28,Hm:29,Hms:30,j:31,jm:32,jms:33,jmv:34,jmz:35,jz:36,m:37,ms:38,s:39,v:40,z:41,zzzz:42,ZZZZ:43}
D.a6c=new A.cq(D.a7t,["d","ccc","cccc","LLL","LLLL","L","M/d","EEE, M/d","LLL","MMM d","EEE, MMM d","LLLL","MMMM d","EEEE, MMMM d","QQQ","QQQQ","y","M/y","M/d/y","EEE, M/d/y","MMM y","MMM d, y","EEE, MMM d, y","MMMM y","MMMM d, y","EEEE, MMMM d, y","QQQ y","QQQQ y","HH","HH:mm","HH:mm:ss","h\u202fa","h:mm\u202fa","h:mm:ss\u202fa","h:mm\u202fa v","h:mm\u202fa z","h\u202fa z","m","mm:ss","s","v","z","zzzz","ZZZZ"],A.aK("cq<o,o>"))})();(function staticFields(){$.baG=null
$.bbY=null
$.boL=null
$.bje=A.C(y.N,y.y)})();(function lazyInitializers(){var x=a.lazyFinal,w=a.lazy
x($,"bRp","bul",()=>new B.ajR("en_US",D.a_t,D.a01,D.wx,D.wx,C.cY,C.cY,C.iM,C.iM,D.wP,D.wP,D.wC,D.wC,C.kZ,C.kZ,D.a09,D.a00,D.a_r))
w($,"bPQ","bda",()=>B.bni("initializeDateFormatting(<locale>)",$.bul()))
w($,"bRm","bhV",()=>B.bni("initializeDateFormatting(<locale>)",D.a6c))
x($,"bRd","buk",()=>48)
x($,"bLQ","bra",()=>A.a([A.c1("^'(?:[^']|'')*'",!0,!1),A.c1("^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)",!0,!1),A.c1("^[^'GyMkSEahKHcLQdDmsvzZ]+",!0,!1)],A.aK("D<bm2>")))
x($,"bOY","bsS",()=>A.c1("''",!0,!1))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"lpp3h3KJFV/EW+ymgeBBYbe/JWU=");