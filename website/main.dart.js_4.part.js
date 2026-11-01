((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={
bnB(d){var x,w,v,u=J.a2(d),t=u.h(d,"date_debut"),s=J.x(t==null?"":t),r=s.length!==0?A.d8(s):null
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
F1(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$F1=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.az().e0("/evenements"),$async$F1)
case 7:s=a8
r=A.a([],y.E)
for(g=J.aE(s);g.v();){q=g.gM(g)
f=J.p(q,"type")
if(J.x(f==null?"":f)==="reunion")J.cp(r,B.bnB(q))}p=r
J.yY(p,new B.bcj())
x=8
return A.e(A.dq(),$async$F1)
case 8:o=a8
n=A.a([],y.t)
for(r=p,g=r.length,f=y.N,e=y.z,d=0;d<r.length;r.length===g||(0,A.K)(r),++d){m=r[d]
a0=m
a1=a0.a
a2=a0.b
a3=a0.c
a4=a0.d
a4=a4==null?"":C.d.b3(C.e.j(A.b1(a4)),4,"0")+"-"+C.d.b3(C.e.j(A.bg(a4)),2,"0")+"-"+C.d.b3(C.e.j(A.dE(a4)),2,"0")
J.cp(n,A.aj(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
return A.e(o.da("String","reunions_cache_v1",C.aa.hs(n,null)),$async$F1)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dq(),$async$F1)
case 10:o=a8
l=o
k=A.aU(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.a9(k)===0)throw a6
j=y.j.a(C.aa.eE(0,k,null))
i=A.a([],y.E)
for(r=J.aE(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gM(r)
J.cp(i,B.bnB(J.n0(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$F1,w)},
bKS(){var x,w=$.biF(),v=J.kh(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yK(31)]
return"cp-"+C.b.DO(v)},
bCt(){return new B.tl(null)},
ky:function ky(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
bcj:function bcj(){},
tl:function tl(d){this.a=d},
QI:function QI(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b3y:function b3y(d){this.a=d},
b3z:function b3z(d,e){this.a=d
this.b=e},
b3A:function b3A(d){this.a=d},
b3H:function b3H(d,e,f){this.a=d
this.b=e
this.c=f},
b3G:function b3G(d,e,f){this.a=d
this.b=e
this.c=f},
b3D:function b3D(d,e,f){this.a=d
this.b=e
this.c=f},
b3C:function b3C(d,e){this.a=d
this.b=e},
b3E:function b3E(d,e,f){this.a=d
this.b=e
this.c=f},
b3B:function b3B(d,e){this.a=d
this.b=e},
b3F:function b3F(d){this.a=d},
b3K:function b3K(){},
b3I:function b3I(d){this.a=d},
b3J:function b3J(d){this.a=d},
b3S:function b3S(d){this.a=d},
b3P:function b3P(){},
b3Q:function b3Q(){},
b3T:function b3T(d,e,f){this.a=d
this.b=e
this.c=f},
b3L:function b3L(d,e,f){this.a=d
this.b=e
this.c=f},
b3M:function b3M(d,e,f){this.a=d
this.b=e
this.c=f},
b3N:function b3N(d,e){this.a=d
this.b=e},
b3O:function b3O(d,e,f){this.a=d
this.b=e
this.c=f},
b3R:function b3R(d,e){this.a=d
this.b=e},
ak9:function ak9(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var _=this
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
bkx(d,e){var x=B.bMv(e,B.bKk(),null)
x.toString
x=new B.nh(new B.ak8(),x)
x.Sd(d)
return x},
by4(d){var x=$.bet()
x.toString
if(B.yH(d)!=="en_US")x.wT()
return!0},
by3(){return A.a([new B.ak5(),new B.ak6(),new B.ak7()],y.n)},
bEM(d){var x,w
if(d==="''")return"'"
else{x=C.d.V(d,1,d.length-1)
w=$.bud()
return A.a4(x,w,"'")}},
nh:function nh(d,e){var _=this
_.a=d
_.c=e
_.x=_.w=_.f=_.e=_.d=null},
ak8:function ak8(){},
ak5:function ak5(){},
ak6:function ak6(){},
ak7:function ak7(){},
tT:function tT(){},
Dk:function Dk(d,e){this.a=d
this.b=e},
Dm:function Dm(d,e,f){this.d=d
this.a=e
this.b=f},
Dl:function Dl(d,e){this.a=d
this.b=e},
boD(d,e){return new B.a2l(d,e,A.a([],y.s))},
bqP(d){var x,w=d.length
if(w<3)return-1
x=d[2]
if(x==="-"||x==="_")return 2
if(w<4)return-1
w=d[3]
if(w==="-"||w==="_")return 3
return-1},
yH(d){var x,w,v,u
if(d==null){if(B.bru()==null)$.bq5="en_US"
x=B.bru()
x.toString
return x}if(d==="C")return"en_ISO"
if(d.length<5)return d
w=B.bqP(d)
if(w===-1)return d
v=C.d.V(d,0,w)
u=C.d.c0(d,w+1)
if(u.length<=3)u=u.toUpperCase()
return v+"_"+u},
bMv(d,e,f){var x,w,v
if(e.$1(d))return d
x=[B.bLe(),B.bLg(),B.bLf(),new B.bef(),new B.beg(),new B.beh()]
for(w=0;w<6;++w){v=x[w].$1(d)
if(e.$1(v))return v}return B.bJ5(d)},
bJ5(d){throw A.f(A.cf('Invalid locale "'+d+'"',null))},
bi_(d){switch(d){case"iw":return"he"
case"he":return"iw"
case"fil":return"tl"
case"tl":return"fil"
case"id":return"in"
case"in":return"id"
case"no":return"nb"
case"nb":return"no"}return d},
bse(d){var x,w
if(d==="invalid")return"in"
x=d.length
if(x<2)return d
w=B.bqP(d)
if(w===-1)if(x<4)return d.toLowerCase()
else return d
return C.d.V(d,0,w).toLowerCase()},
a2l:function a2l(d,e,f){this.a=d
this.b=e
this.c=f},
YF:function YF(d){this.a=d},
bef:function bef(){},
beg:function beg(){},
beh:function beh(){},
bdd(d,e){var x=0,w=A.n(y.H)
var $async$bdd=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.yO(A.d1("https://meet.jit.si/"+e,0,null),C.XL,"_blank"),$async$bdd)
case 2:return A.l(null,w)}})
return A.m($async$bdd,w)},
bru(){var x=$.bq5
return x},
bKl(d,e,f){var x,w
if(d===1)return e
if(d===2)return e+31
x=C.c.fX(30.6*d-91.4)
w=f?1:0
return x+e+59+w}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[9]
B.ky.prototype={
gCR(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.dv(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.dv(x[1],null)
t=w==null?0:w}else t=0
return A.bi(A.b1(s),A.bg(s),A.dE(s),u,t,0,0,0)},
gqa(){var x,w=this.gCR()
if(w==null)return"bientot"
x=new A.aZ(Date.now(),0,!1)
if(x.hT(w))return"avenir"
if(x.hT(w.kN(108e8)))return"direct"
return"terminee"}}
B.tl.prototype={
R(){return new B.QI(A.a([],y.E))}}
B.QI.prototype={
a2(){this.ac()
this.qJ()},
qJ(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qJ=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.q(new B.b3y(s))
u=4
x=7
return A.e(B.F1(),$async$qJ)
case 7:r=e
if(s.c==null){x=1
break}s.q(new B.b3z(s,r))
q=A.a([],y.l)
for(n=J.aE(r);n.v();){p=n.gM(n)
if(p.gCR()!=null&&p.gqa()==="avenir"){m=p.b
l=p.gCR()
l.toString
J.cp(q,new A.a9e(l,m))}}o=q
x=8
return A.e($.kM().t3($.am,o),$async$qJ)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.q(new B.b3A(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qJ,w)},
aCn(d){var x,w,v,u=d.d
if(u==null)return A.b("Date \xe0 confirmer")
x=B.bkx("d MMM yyyy",$.am)
w=d.e
if(w.length>=5)w=C.d.V(w,0,5)
v=$.am==="en"?"at":"\xe0"
return w.length===0?x.ym(u):x.ym(u)+" "+v+" "+w},
Bv(d,e){return this.aCT(d,e)},
aCT(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$Bv=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:p=e.f
if(p.length===0){p=A.b("Salle de r\xe9union non configur\xe9e. Contactez la structure.")
d.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}s=A.b("Ouverture de la r\xe9union\u2026")
r=y.q
d.u(r).f.K(A.N(null,null,null,null,null,C.i,null,A.c(s,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
u=4
s=$.X().a
s=s==null?null:s.a
x=7
return A.e(B.bdd(s==null?"":s,p),$async$Bv)
case 7:u=2
x=6
break
case 4:u=3
o=t
if(d.e!=null){p=A.b("Impossible d\u2019ouvrir la r\xe9union. V\xe9rifiez votre connexion.")
d.u(r).f.K(A.N(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Bv,w)},
wu(d){return this.aC5(d)},
aC5(d){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g
var $async$wu=A.j(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:j={}
i=$.az()
h=i.b
if(!(h!=null&&h.length!==0)){j=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}h=$.ah()
l=new A.bo(C.ag,h)
r=new A.bo(C.ag,h)
j.a=j.b=null
x=3
return A.e(A.qz(C.bF,new B.b3H(j,l,r),d,!0,C.e_,y.y),$async$wu)
case 3:if(f!==!0||d.e==null){x=1
break}q=C.d.aq(l.a.a)
if(J.a9(q)===0||j.b==null||j.a==null){j=A.b("Le titre, la date et l\u2019heure sont requis.")
d.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}p=B.bKS()
o=C.d.b3(C.e.j(j.a.a),2,"0")
n=C.d.b3(C.e.j(j.a.b),2,"0")
u=5
h=C.d.aq(r.a.a).length===0?null:C.d.aq(r.a.a)
x=8
return A.e(i.aL6(C.d.b3(C.e.j(j.b.gb8()),4,"0")+"-"+C.d.b3(C.e.j(j.b.gaW()),2,"0")+"-"+C.d.b3(C.e.j(j.b.gbc()),2,"0"),h,A.q(o)+":"+A.q(n),q,p,"reunion"),$async$wu)
case 8:if(d.e==null){x=1
break}j=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
d.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qJ(),$async$wu)
case 9:u=2
x=7
break
case 5:u=4
g=t
m=A.W(g)
if(d.e!=null){j=A.q(m)
d.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c("Publication refus\xe9e ("+j+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wu,w)},
wA(d,e){return this.aDo(d,e)},
aDo(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wA=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.dI(null,null,!0,null,new B.b3K(),d,null,!0,!0,y.y),$async$wA)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.az().ade(e.a,!1),$async$wA)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(q,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qJ(),$async$wA)
case 9:u=2
x=7
break
case 5:u=4
o=t
r=A.W(o)
if(d.e!=null){q=A.q(r)
d.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c("Retrait refus\xe9 ("+q+").",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wA,w)},
E(d){return A.e9(new B.b3S(this))}}
B.ak9.prototype={
j(d){return this.a}}
B.nh.prototype={
ym(d){var x,w,v,u=this,t=u.e
if(t==null){if(u.d==null){u.Sd("yMMMMd")
u.Sd("jms")}t=u.d
t.toString
t=u.a3u(t)
x=A.a0(t).i("cV<1>")
x=u.e=A.O(new A.cV(t,x),!0,x.i("aT.E"))
t=x}x=t.length
w=0
v=""
for(;w<t.length;t.length===x||(0,A.K)(t),++w)v+=t[w].ym(d)
return v.charCodeAt(0)==0?v:v},
Zk(d,e){var x=this.d
this.d=x==null?d:x+e+d},
Sd(d){var x,w,v=this
v.e=null
x=$.bje()
w=v.c
x.toString
if(!(B.yH(w)==="en_US"?x.b:x.wT()).aL(0,d))v.Zk(d," ")
else{x=$.bje()
x.toString
v.Zk((B.yH(w)==="en_US"?x.b:x.wT()).h(0,d)," ")}return v},
giy(){var x,w=this.c
if(w!==$.bdf){$.bdf=w
x=$.bet()
x.toString
$.bbY=B.yH(w)==="en_US"?x.b:x.wT()}w=$.bbY
w.toString
return w},
gaUM(){var x=this.f
if(x==null){$.bky.h(0,this.c)
x=this.f=!0}return x},
j4(d){var x,w,v,u,t,s,r=this
r.gaUM()
x=r.w
w=$.bvG()
if(x===w)return d
x=d.length
v=A.ca(x,0,!1,y.S)
for(u=r.c,t=0;t<x;++t){s=r.w
if(s==null){s=r.x
if(s==null){s=r.f
if(s==null){$.bky.h(0,u)
s=r.f=!0}if(s){if(u!==$.bdf){$.bdf=u
s=$.bet()
s.toString
$.bbY=B.yH(u)==="en_US"?s.b:s.wT()}$.bbY.toString}s=r.x="0"}s=r.w=s.charCodeAt(0)}v[t]=d.charCodeAt(t)+s-w}return A.eZ(v,0,null)},
a3u(d){var x,w
if(d.length===0)return A.a([],y.T)
x=this.apy(d)
if(x==null)return A.a([],y.T)
w=this.a3u(C.d.c0(d,x.aa9().length))
w.push(x)
return w},
apy(d){var x,w,v,u
for(x=0;w=$.bsw(),x<3;++x){v=w[x].pt(d)
if(v!=null){w=B.by3()[x]
u=v.b[0]
u.toString
return w.$2(u,this)}}return null}}
B.tT.prototype={
aa9(){return this.a},
j(d){return this.a},
ym(d){return this.a}}
B.Dk.prototype={}
B.Dm.prototype={
aa9(){return this.d}}
B.Dl.prototype={
ym(d){return this.aNx(d)},
aNx(d){var x,w,v,u,t,s=this,r="0",q=s.a
switch(q[0]){case"a":x=d.gld()
w=x>=12&&x<24?1:0
return s.b.giy().CW[w]
case"c":return s.aNB(d)
case"d":return s.b.j4(C.d.b3(""+d.gbc(),q.length,r))
case"D":return s.b.j4(C.d.b3(""+B.bKl(d.gaW(),d.gbc(),A.bg(A.bi(d.gb8(),2,29,0,0,0,0,0))===2),q.length,r))
case"E":return s.aNw(d)
case"G":v=d.gb8()>0?1:0
u=s.b
return q.length>=4?u.giy().c[v]:u.giy().b[v]
case"h":x=d.gld()
if(d.gld()>12)x-=12
return s.b.j4(C.d.b3(""+(x===0?12:x),q.length,r))
case"H":return s.b.j4(C.d.b3(""+d.gld(),q.length,r))
case"K":return s.b.j4(C.d.b3(""+C.e.ar(d.gld(),12),q.length,r))
case"k":return s.b.j4(C.d.b3(""+(d.gld()===0?24:d.gld()),q.length,r))
case"L":return s.aNC(d)
case"M":return s.aNz(d)
case"m":return s.b.j4(C.d.b3(""+d.guY(),q.length,r))
case"Q":return s.aNA(d)
case"S":return s.aNy(d)
case"s":return s.b.j4(C.d.b3(""+d.gt4(),q.length,r))
case"y":t=d.gb8()
if(t<0)t=-t
q=q.length
u=s.b
return q===2?u.j4(C.d.b3(""+C.e.ar(t,100),2,r)):u.j4(C.d.b3(""+t,q,r))
default:return""}},
aNz(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.giy().d[d.gaW()-1]
case 4:return w.giy().f[d.gaW()-1]
case 3:return w.giy().w[d.gaW()-1]
default:return w.j4(C.d.b3(""+d.gaW(),x,"0"))}},
aNy(d){var x=this.b,w=x.j4(C.d.b3(""+d.gE1(),3,"0")),v=this.a.length-3
if(v>0)return w+x.j4(C.d.b3(""+0,v,"0"))
else return w},
aNB(d){var x=this.b
switch(this.a.length){case 5:return x.giy().ax[C.e.ar(d.gpX(),7)]
case 4:return x.giy().z[C.e.ar(d.gpX(),7)]
case 3:return x.giy().as[C.e.ar(d.gpX(),7)]
default:return x.j4(C.d.b3(""+d.gbc(),1,"0"))}},
aNC(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.giy().e[d.gaW()-1]
case 4:return w.giy().r[d.gaW()-1]
case 3:return w.giy().x[d.gaW()-1]
default:return w.j4(C.d.b3(""+d.gaW(),x,"0"))}},
aNA(d){var x=C.c.F((d.gaW()-1)/3),w=this.a.length,v=this.b
switch(w){case 4:return v.giy().ch[x]
case 3:return v.giy().ay[x]
default:return v.j4(C.d.b3(""+(x+1),w,"0"))}},
aNw(d){var x,w=this,v=w.a.length
$label0$0:{if(v<=3){x=w.b.giy().Q
break $label0$0}if(v===4){x=w.b.giy().y
break $label0$0}if(v===5){x=w.b.giy().at
break $label0$0}if(v>=6)A.ad(A.aO('"Short" weekdays are currently not supported.'))
x=A.ad(A.k5("unreachable"))}return x[C.e.ar(d.gpX(),7)]}}
B.a2l.prototype={
h(d,e){return B.yH(e)==="en_US"?this.b:this.wT()},
wT(){throw A.f(new B.YF("Locale data has not been initialized, call "+this.a+"."))}}
B.YF.prototype={
j(d){return"LocaleDataException: "+this.a},
$ibu:1}
var z=a.updateTypes(["H(ky)","o(o)","y(ky,ky)","av<~>()","h(ky)","Dm(o,nh)","Dl(o,nh)","Dk(o,nh)","H(o?)","o(o?)"])
B.bcj.prototype={
$2(d,e){var x=d.gCR(),w=e.gCR()
if(x==null&&w==null)return C.d.bs(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.Fb(x,w)},
$S:z+2}
B.b3y.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
B.b3z.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
B.b3A.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
B.b3H.prototype={
$1(d){return new A.iY(new B.b3G(this.a,this.b,this.c),null)},
$S:58}
B.b3G.prototype={
$2(d,e){var x,w,v,u,t,s=null,r=y.w,q=A.aq(d,s,r).w,p=A.c(A.b("Nouvelle r\xe9union en ligne"),s,s,s,s,A.A(d).p2.r,s,s,s),o=A.b("Titre de la r\xe9union")
o=A.cI(!0,C.y,!1,s,!0,C.i,s,A.cM(),this.b,s,s,s,s,s,2,A.cA(s,new A.c5(4,A.a6(14),C.an),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,o,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.M,!0,s,!0,s,!1,s,C.a8,s,s,s,s,s,s,s,1,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a5,s,s,C.a7,C.a3,s,s,s,s,s,s,s,C.P,s,C.ac,s,s,s,s)
x=A.b("Description (facultatif)")
x=A.cI(!0,C.y,!1,s,!0,C.i,s,A.cM(),this.c,s,s,s,s,s,2,A.cA(s,new A.c5(4,A.a6(14),C.an),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,x,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.M,!0,s,!0,s,!1,s,C.a8,s,s,s,s,s,s,s,3,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a5,s,s,C.a7,C.a3,s,s,s,s,s,s,s,C.P,s,C.ac,s,s,s,s)
w=this.a
if(w.b==null)v=A.b("Date")
else{v=B.bkx("d MMM yyyy",$.am)
u=w.b
u.toString
u=v.ym(u)
v=u}v=A.ak(A.cS(D.VB,A.c(v,s,s,s,s,s,s,s,s),new B.b3D(w,d,e),s),1)
u=w.a
if(u==null)r=A.b("Heure")
else{t=A.bM(d,C.V,y.v)
t.toString
A.aq(d,C.db,r).toString
u=t.aa5(u,!1)
r=u}u=y.p
return new A.a8(new A.ae(16,16,16,q.f.d+16),A.eD(A.V(A.a([p,C.t,o,C.k,x,C.k,A.ab(A.a([v,C.R,A.ak(A.cS(D.W0,A.c(r,s,s,s,s,s,s,s,s),new B.b3E(w,d,e),s),1)],u),C.n,C.f,C.h,s),C.t,A.ag(A.bO(!1,A.c(A.b("Publier"),s,s,s,s,s,s,s,s),C.j,s,C.r,s,s,s,s,new B.b3F(d),s,s),52,1/0)],u),C.p,C.f,C.a2),s,s,s,C.ab),s)},
$S:97}
B.b3D.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.b
if(s==null)s=new A.aZ(Date.now(),0,!1)
x=2
return A.e(A.Tz(null,null,null,v.b,new A.aZ(Date.now(),0,!1).kN(-864e8),null,s,new A.aZ(Date.now(),0,!1).kN(31536e9)),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b3C(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b3C.prototype={
$0(){return this.a.b=this.b},
$S:0}
B.b3E.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.a
if(s==null){s=new A.aZ(Date.now(),0,!1)
s=new A.c7(A.mj(s),A.mk(s))}x=2
return A.e(A.be6(null,null,null,v.b,null,s),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b3B(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b3B.prototype={
$0(){return this.a.a=this.b},
$S:0}
B.b3F.prototype={
$0(){return A.aR(this.a,!1).ba(!0)},
$S:0}
B.b3K.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.dY(A.a([A.cc(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,C.r,x,x,x,x,new B.b3I(d),x,x),A.cc(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,C.r,x,x,x,x,new B.b3J(d),x,x)],y.p),v,w)},
$S:12}
B.b3I.prototype={
$0(){return A.aR(this.a,!1).ba(!1)},
$S:0}
B.b3J.prototype={
$0(){return A.aR(this.a,!1).ba(!0)},
$S:0}
B.b3S.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.jj(l.d,new B.b3P()),j=A.O(k,!0,k.$ti.i("t.E"))
k=J.jj(l.d,new B.b3Q())
x=A.O(k,!0,k.$ti.i("t.E"))
w=new B.b3T(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.brZ(v,u,t,$.X().c?A.bcO(C.ix,A.b("Planifier"),new B.b3R(l,d)):o),C.t],s)
if(l.e)t.push(D.NL)
else if(l.f!=null)t.push(A.du(new A.a8(C.I,A.V(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),C.k,A.cR(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,C.r,o,o,o,o,l.gaDs(),o,o)],s),C.n,C.f,C.h),o),o,o,o,o))
else if(J.cy(l.d))t.push(A.du(new A.a8(C.I,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([C.k,A.c(q,o,o,o,o,p==null?o:p.by(C.a4,C.z),o,o,o),C.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
C.b.B(v,s)}C.b.B(t,v)}l.a.toString
return A.bJ(k,t,o,o)},
$S:4}
B.b3P.prototype={
$1(d){return d.gqa()==="avenir"||d.gqa()==="direct"||d.gqa()==="bientot"},
$S:z+0}
B.b3Q.prototype={
$1(d){return d.gqa()==="terminee"},
$S:z+0}
B.b3T.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gqa()==="direct",n=q.b,m=n.w
m=m==null?p:m.by(C.q,C.A)
m=A.ak(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gqa()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=C.Cd
else t=x==="avenir"?C.v:C.a4
x=t.dY(0.12)
w=A.a6(20)
u=A.ac(p,p,C.j,p,p,new A.an(t,p,p,p,p,p,C.bB),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.ab(A.a([m,A.ac(p,A.ab(A.a([u,C.fw,A.c(v,p,p,p,p,s==null?p:s.by(t,C.A),p,p,p)],r),C.n,C.f,C.a2,p),C.j,p,p,new A.an(x,p,p,w,p,p,C.x),p,p,p,p,C.fW,p,p,p)],r),C.n,C.f,C.h,p)
x=q.a
s=x.aCn(d)
n=n.z
m=A.a([w,C.a_,A.ab(A.a([D.WB,C.fw,A.c(s,p,p,p,p,n==null?p:n.aI(C.a4),p,p,p)],r),C.n,C.f,C.h,p)],r)
w=d.c
if(w.length!==0)C.b.B(m,A.a([C.cu,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(C.k)
n=A.a([],r)
if(!o&&d.gqa()!=="terminee")n.push(A.ak(A.cK(D.W8,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new B.b3L(x,q.c,d),p),1))
if(o){w=A.hG(C.Cd,C.l,p,p,p,p)
n.push(A.ak(A.cK(D.Vw,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new B.b3M(x,q.c,d),w),1))}w=$.X()
if(w.c&&d.f.length!==0)C.b.B(n,A.a([C.R,A.cS(D.Wz,A.c(A.b("Copier le lien"),p,p,p,p,p,p,p,p),new B.b3N(d,q.c),p)],r))
if(w.c)C.b.B(n,A.a([C.R,A.bT(p,p,p,D.VH,p,p,new B.b3O(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.ab(n,C.n,C.f,C.h,p))
return A.du(new A.a8(C.I,A.V(m,C.p,C.f,C.h),p),p,p,C.aC,p)},
$S:z+4}
B.b3L.prototype={
$0(){return this.a.Bv(this.b,this.c)},
$S:0}
B.b3M.prototype={
$0(){return this.a.Bv(this.b,this.c)},
$S:0}
B.b3N.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:x=2
return A.e(A.v6(new A.oD("https://meet.jit.si/"+v.a.f)),$async$$0)
case 2:u=v.b
if(u.e!=null){t=A.b("Lien de la r\xe9union copi\xe9.")
u.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(t,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b3O.prototype={
$0(){return this.a.wA(this.b,this.c)},
$S:0}
B.b3R.prototype={
$0(){return this.a.wu(this.b)},
$S:0}
B.ak8.prototype={
$8(d,e,f,g,h,i,j,k){if(k)return A.bf9(d,e,f,g,h,i,j,0)
else return A.bi(d,e,f,g,h,i,j,0)},
$S:848}
B.ak5.prototype={
$2(d,e){var x=B.bEM(d)
C.d.aq(x)
return new B.Dm(d,x,e)},
$S:z+5}
B.ak6.prototype={
$2(d,e){C.d.aq(d)
return new B.Dl(d,e)},
$S:z+6}
B.ak7.prototype={
$2(d,e){C.d.aq(d)
return new B.Dk(d,e)},
$S:z+7}
B.bef.prototype={
$1(d){return B.bi_(B.bse(d))},
$S:110}
B.beg.prototype={
$1(d){return B.bi_(B.yH(d))},
$S:110}
B.beh.prototype={
$1(d){return"fallback"},
$S:110};(function installTearOffs(){var x=a._instance_0u,w=a._static_1
x(B.QI.prototype,"gaDs","qJ",3)
w(B,"bKk","by4",8)
w(B,"bLe","yH",9)
w(B,"bLf","bi_",1)
w(B,"bLg","bse",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.S,[B.ky,B.ak9,B.nh,B.tT,B.a2l,B.YF])
x(A.v8,[B.bcj,B.b3G,B.ak5,B.ak6,B.ak7])
w(B.tl,A.U)
w(B.QI,A.Z)
x(A.v7,[B.b3y,B.b3z,B.b3A,B.b3D,B.b3C,B.b3E,B.b3B,B.b3F,B.b3I,B.b3J,B.b3L,B.b3M,B.b3N,B.b3O,B.b3R])
x(A.lL,[B.b3H,B.b3K,B.b3S,B.b3P,B.b3Q,B.b3T,B.ak8,B.bef,B.beg,B.beh])
x(B.tT,[B.Dk,B.Dm,B.Dl])})()
A.b7U(b.typeUniverse,JSON.parse('{"tl":{"U":[],"h":[]},"QI":{"Z":["tl"]},"Dk":{"tT":[]},"Dm":{"tT":[]},"Dl":{"tT":[]},"YF":{"bu":[]}}'))
A.bht(b.typeUniverse,JSON.parse('{"a2l":1}'))
var y=(function rtii(){var x=A.aM
return{t:x("D<aw<o,@>>"),l:x("D<+debut,nom(aZ,o)>"),E:x("D<ky>"),s:x("D<o>"),p:x("D<h>"),T:x("D<tT>"),n:x("D<tT(o,nh)>"),x:x("E<ky>"),j:x("E<@>"),f:x("aw<@,@>"),v:x("rG"),w:x("kp"),N:x("o"),q:x("ud"),y:x("H"),z:x("@"),S:x("y"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.T9=new A.ae(32,32,32,32)
D.a8K=new A.a8(D.T9,C.i4,null)
D.NL=new A.hf(C.a1,null,null,D.a8K,null)
D.U9=new A.ai(59048,!1)
D.Vw=new A.ay(D.U9,null,null,null,null)
D.VB=new A.ay(C.nR,null,null,null,null)
D.VH=new A.ay(C.kG,null,C.a4,null,null)
D.vF=new A.ai(62265,!1)
D.W0=new A.ay(D.vF,null,null,null,null)
D.W8=new A.ay(C.o_,null,null,null,null)
D.UC=new A.ai(61801,!1)
D.Wz=new A.ay(D.UC,null,null,null,null)
D.WB=new A.ay(D.vF,16,C.a4,null,null)
D.a_I=A.a(x(["AM","PM"]),y.s)
D.a_K=A.a(x(["BC","AD"]),y.s)
D.wH=A.a(x(["J","F","M","A","M","J","J","A","S","O","N","D"]),y.s)
D.a0h=A.a(x(["1st quarter","2nd quarter","3rd quarter","4th quarter"]),y.s)
D.wM=A.a(x(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),y.s)
D.a0i=A.a(x(["Before Christ","Anno Domini"]),y.s)
D.a0q=A.a(x(["Q1","Q2","Q3","Q4"]),y.s)
D.wZ=A.a(x(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]),y.s)
D.a7M={d:0,E:1,EEEE:2,LLL:3,LLLL:4,M:5,Md:6,MEd:7,MMM:8,MMMd:9,MMMEd:10,MMMM:11,MMMMd:12,MMMMEEEEd:13,QQQ:14,QQQQ:15,y:16,yM:17,yMd:18,yMEd:19,yMMM:20,yMMMd:21,yMMMEd:22,yMMMM:23,yMMMMd:24,yMMMMEEEEd:25,yQQQ:26,yQQQQ:27,H:28,Hm:29,Hms:30,j:31,jm:32,jms:33,jmv:34,jmz:35,jz:36,m:37,ms:38,s:39,v:40,z:41,zzzz:42,ZZZZ:43}
D.a6u=new A.cr(D.a7M,["d","ccc","cccc","LLL","LLLL","L","M/d","EEE, M/d","LLL","MMM d","EEE, MMM d","LLLL","MMMM d","EEEE, MMMM d","QQQ","QQQQ","y","M/y","M/d/y","EEE, M/d/y","MMM y","MMM d, y","EEE, MMM d, y","MMMM y","MMMM d, y","EEEE, MMMM d, y","QQQ y","QQQQ y","HH","HH:mm","HH:mm:ss","h\u202fa","h:mm\u202fa","h:mm:ss\u202fa","h:mm\u202fa v","h:mm\u202fa z","h\u202fa z","m","mm:ss","s","v","z","zzzz","ZZZZ"],A.aM("cr<o,o>"))})();(function staticFields(){$.bbY=null
$.bdf=null
$.bq5=null
$.bky=A.B(y.N,y.y)})();(function lazyInitializers(){var x=a.lazyFinal,w=a.lazy
x($,"bSI","bvH",()=>new B.ak9("en_US",D.a_K,D.a0i,D.wH,D.wH,C.co,C.co,C.iR,C.iR,D.wZ,D.wZ,D.wM,D.wM,C.l4,C.l4,D.a0q,D.a0h,D.a_I))
w($,"bR8","bet",()=>B.boD("initializeDateFormatting(<locale>)",$.bvH()))
w($,"bSF","bje",()=>B.boD("initializeDateFormatting(<locale>)",D.a6u))
x($,"bSw","bvG",()=>48)
x($,"bN8","bsw",()=>A.a([A.c_("^'(?:[^']|'')*'",!0,!1),A.c_("^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)",!0,!1),A.c_("^[^'GyMkSEahKHcLQdDmsvzZ]+",!0,!1)],A.aM("D<bnn>")))
x($,"bQg","bud",()=>A.c_("''",!0,!1))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"10nD8e/IUeCCqUpV0gZwO0KDm50=");