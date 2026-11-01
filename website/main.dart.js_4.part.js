((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={
bnu(d){var x,w,v,u=J.a2(d),t=u.h(d,"date_debut"),s=J.x(t==null?"":t),r=s.length!==0?A.d7(s):null
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
F0(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$F0=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.az().e1("/evenements"),$async$F0)
case 7:s=a8
r=A.a([],y.E)
for(g=J.aE(s);g.v();){q=g.gM(g)
f=J.p(q,"type")
if(J.x(f==null?"":f)==="reunion")J.cp(r,B.bnu(q))}p=r
J.yV(p,new B.bcc())
x=8
return A.e(A.dq(),$async$F0)
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
return A.e(o.dc("String","reunions_cache_v1",C.aa.hr(n,null)),$async$F0)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dq(),$async$F0)
case 10:o=a8
l=o
k=A.aU(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.a9(k)===0)throw a6
j=y.j.a(C.aa.eF(0,k,null))
i=A.a([],y.E)
for(r=J.aE(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gM(r)
J.cp(i,B.bnu(J.n0(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$F0,w)},
bKL(){var x,w=$.biy(),v=J.kh(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yI(31)]
return"cp-"+C.b.DN(v)},
bCm(){return new B.tl(null)},
ky:function ky(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
bcc:function bcc(){},
tl:function tl(d){this.a=d},
QI:function QI(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b3s:function b3s(d){this.a=d},
b3t:function b3t(d,e){this.a=d
this.b=e},
b3u:function b3u(d){this.a=d},
b3B:function b3B(d,e,f){this.a=d
this.b=e
this.c=f},
b3A:function b3A(d,e,f){this.a=d
this.b=e
this.c=f},
b3x:function b3x(d,e,f){this.a=d
this.b=e
this.c=f},
b3w:function b3w(d,e){this.a=d
this.b=e},
b3y:function b3y(d,e,f){this.a=d
this.b=e
this.c=f},
b3v:function b3v(d,e){this.a=d
this.b=e},
b3z:function b3z(d){this.a=d},
b3E:function b3E(){},
b3C:function b3C(d){this.a=d},
b3D:function b3D(d){this.a=d},
b3L:function b3L(d){this.a=d},
b3I:function b3I(){},
b3J:function b3J(){},
b3M:function b3M(d,e,f){this.a=d
this.b=e
this.c=f},
b3F:function b3F(d,e,f){this.a=d
this.b=e
this.c=f},
b3G:function b3G(d,e,f){this.a=d
this.b=e
this.c=f},
b3H:function b3H(d,e,f){this.a=d
this.b=e
this.c=f},
b3K:function b3K(d,e){this.a=d
this.b=e},
ak7:function ak7(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var _=this
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
bkq(d,e){var x=B.bMo(e,B.bKd(),null)
x.toString
x=new B.nh(new B.ak6(),x)
x.Sc(d)
return x},
bxY(d){var x=$.bem()
x.toString
if(B.yE(d)!=="en_US")x.wR()
return!0},
bxX(){return A.a([new B.ak3(),new B.ak4(),new B.ak5()],y.n)},
bEF(d){var x,w
if(d==="''")return"'"
else{x=C.d.V(d,1,d.length-1)
w=$.bu6()
return A.a4(x,w,"'")}},
nh:function nh(d,e){var _=this
_.a=d
_.c=e
_.x=_.w=_.f=_.e=_.d=null},
ak6:function ak6(){},
ak3:function ak3(){},
ak4:function ak4(){},
ak5:function ak5(){},
tT:function tT(){},
Dj:function Dj(d,e){this.a=d
this.b=e},
Dl:function Dl(d,e,f){this.d=d
this.a=e
this.b=f},
Dk:function Dk(d,e){this.a=d
this.b=e},
bow(d,e){return new B.a2l(d,e,A.a([],y.s))},
bqI(d){var x,w=d.length
if(w<3)return-1
x=d[2]
if(x==="-"||x==="_")return 2
if(w<4)return-1
w=d[3]
if(w==="-"||w==="_")return 3
return-1},
yE(d){var x,w,v,u
if(d==null){if(B.brn()==null)$.bpZ="en_US"
x=B.brn()
x.toString
return x}if(d==="C")return"en_ISO"
if(d.length<5)return d
w=B.bqI(d)
if(w===-1)return d
v=C.d.V(d,0,w)
u=C.d.c1(d,w+1)
if(u.length<=3)u=u.toUpperCase()
return v+"_"+u},
bMo(d,e,f){var x,w,v
if(e.$1(d))return d
x=[B.bL7(),B.bL9(),B.bL8(),new B.be8(),new B.be9(),new B.bea()]
for(w=0;w<6;++w){v=x[w].$1(d)
if(e.$1(v))return v}return B.bIZ(d)},
bIZ(d){throw A.f(A.cf('Invalid locale "'+d+'"',null))},
bhT(d){switch(d){case"iw":return"he"
case"he":return"iw"
case"fil":return"tl"
case"tl":return"fil"
case"id":return"in"
case"in":return"id"
case"no":return"nb"
case"nb":return"no"}return d},
bs7(d){var x,w
if(d==="invalid")return"in"
x=d.length
if(x<2)return d
w=B.bqI(d)
if(w===-1)if(x<4)return d.toLowerCase()
else return d
return C.d.V(d,0,w).toLowerCase()},
a2l:function a2l(d,e,f){this.a=d
this.b=e
this.c=f},
YF:function YF(d){this.a=d},
be8:function be8(){},
be9:function be9(){},
bea:function bea(){},
bd6(d,e){var x=0,w=A.n(y.H)
var $async$bd6=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.yL(A.d1("https://meet.jit.si/"+e,0,null),C.XI,"_blank"),$async$bd6)
case 2:return A.l(null,w)}})
return A.m($async$bd6,w)},
brn(){var x=$.bpZ
return x},
bKe(d,e,f){var x,w
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
gCP(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.dv(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.dv(x[1],null)
t=w==null?0:w}else t=0
return A.bi(A.b1(s),A.bg(s),A.dE(s),u,t,0,0,0)},
gq8(){var x,w=this.gCP()
if(w==null)return"bientot"
x=new A.aZ(Date.now(),0,!1)
if(x.hS(w))return"avenir"
if(x.hS(w.kM(108e8)))return"direct"
return"terminee"}}
B.tl.prototype={
R(){return new B.QI(A.a([],y.E))}}
B.QI.prototype={
a2(){this.ac()
this.qH()},
qH(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qH=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.q(new B.b3s(s))
u=4
x=7
return A.e(B.F0(),$async$qH)
case 7:r=e
if(s.c==null){x=1
break}s.q(new B.b3t(s,r))
q=A.a([],y.l)
for(n=J.aE(r);n.v();){p=n.gM(n)
if(p.gCP()!=null&&p.gq8()==="avenir"){m=p.b
l=p.gCP()
l.toString
J.cp(q,new A.a9e(l,m))}}o=q
x=8
return A.e($.kM().t1($.am,o),$async$qH)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.q(new B.b3u(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qH,w)},
aCm(d){var x,w,v,u=d.d
if(u==null)return A.b("Date \xe0 confirmer")
x=B.bkq("d MMM yyyy",$.am)
w=d.e
if(w.length>=5)w=C.d.V(w,0,5)
v=$.am==="en"?"at":"\xe0"
return w.length===0?x.yk(u):x.yk(u)+" "+v+" "+w},
Bt(d,e){return this.aCS(d,e)},
aCS(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$Bt=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:p=e.f
if(p.length===0){p=A.b("Salle de r\xe9union non configur\xe9e. Contactez la structure.")
d.u(y.q).f.K(A.P(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}s=A.b("Ouverture de la r\xe9union\u2026")
r=y.q
d.u(r).f.K(A.P(null,null,null,null,null,C.i,null,A.c(s,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
u=4
s=$.Y().a
s=s==null?null:s.a
x=7
return A.e(B.bd6(s==null?"":s,p),$async$Bt)
case 7:u=2
x=6
break
case 4:u=3
o=t
if(d.e!=null){p=A.b("Impossible d\u2019ouvrir la r\xe9union. V\xe9rifiez votre connexion.")
d.u(r).f.K(A.P(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Bt,w)},
ws(d){return this.aC4(d)},
aC4(d){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g
var $async$ws=A.j(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:j={}
i=$.az()
h=i.b
if(!(h!=null&&h.length!==0)){j=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.u(y.q).f.K(A.P(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}h=$.ah()
l=new A.bo(C.ag,h)
r=new A.bo(C.ag,h)
j.a=j.b=null
x=3
return A.e(A.qy(C.bF,new B.b3B(j,l,r),d,!0,C.e_,y.y),$async$ws)
case 3:if(f!==!0||d.e==null){x=1
break}q=C.d.aq(l.a.a)
if(J.a9(q)===0||j.b==null||j.a==null){j=A.b("Le titre, la date et l\u2019heure sont requis.")
d.u(y.q).f.K(A.P(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}p=B.bKL()
o=C.d.b3(C.e.j(j.a.a),2,"0")
n=C.d.b3(C.e.j(j.a.b),2,"0")
u=5
h=C.d.aq(r.a.a).length===0?null:C.d.aq(r.a.a)
x=8
return A.e(i.aL5(C.d.b3(C.e.j(j.b.gb8()),4,"0")+"-"+C.d.b3(C.e.j(j.b.gaW()),2,"0")+"-"+C.d.b3(C.e.j(j.b.gbc()),2,"0"),h,A.q(o)+":"+A.q(n),q,p,"reunion"),$async$ws)
case 8:if(d.e==null){x=1
break}j=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
d.u(y.q).f.K(A.P(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qH(),$async$ws)
case 9:u=2
x=7
break
case 5:u=4
g=t
m=A.X(g)
if(d.e!=null){j=A.q(m)
d.u(y.q).f.K(A.P(null,null,null,null,null,C.i,null,A.c("Publication refus\xe9e ("+j+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$ws,w)},
wy(d,e){return this.aDn(d,e)},
aDn(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wy=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.dP(null,null,!0,null,new B.b3E(),d,null,!0,!0,y.y),$async$wy)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.az().adb(e.a,!1),$async$wy)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.u(y.q).f.K(A.P(null,null,null,null,null,C.i,null,A.c(q,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qH(),$async$wy)
case 9:u=2
x=7
break
case 5:u=4
o=t
r=A.X(o)
if(d.e!=null){q=A.q(r)
d.u(y.q).f.K(A.P(null,null,null,null,null,C.i,null,A.c("Retrait refus\xe9 ("+q+").",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wy,w)},
E(d){return A.e9(new B.b3L(this))}}
B.ak7.prototype={
j(d){return this.a}}
B.nh.prototype={
yk(d){var x,w,v,u=this,t=u.e
if(t==null){if(u.d==null){u.Sc("yMMMMd")
u.Sc("jms")}t=u.d
t.toString
t=u.a3r(t)
x=A.a0(t).i("cV<1>")
x=u.e=A.N(new A.cV(t,x),!0,x.i("aS.E"))
t=x}x=t.length
w=0
v=""
for(;w<t.length;t.length===x||(0,A.K)(t),++w)v+=t[w].yk(d)
return v.charCodeAt(0)==0?v:v},
Zh(d,e){var x=this.d
this.d=x==null?d:x+e+d},
Sc(d){var x,w,v=this
v.e=null
x=$.bj7()
w=v.c
x.toString
if(!(B.yE(w)==="en_US"?x.b:x.wR()).aL(0,d))v.Zh(d," ")
else{x=$.bj7()
x.toString
v.Zh((B.yE(w)==="en_US"?x.b:x.wR()).h(0,d)," ")}return v},
gix(){var x,w=this.c
if(w!==$.bd8){$.bd8=w
x=$.bem()
x.toString
$.bbR=B.yE(w)==="en_US"?x.b:x.wR()}w=$.bbR
w.toString
return w},
gaUJ(){var x=this.f
if(x==null){$.bkr.h(0,this.c)
x=this.f=!0}return x},
j3(d){var x,w,v,u,t,s,r=this
r.gaUJ()
x=r.w
w=$.bvz()
if(x===w)return d
x=d.length
v=A.ca(x,0,!1,y.S)
for(u=r.c,t=0;t<x;++t){s=r.w
if(s==null){s=r.x
if(s==null){s=r.f
if(s==null){$.bkr.h(0,u)
s=r.f=!0}if(s){if(u!==$.bd8){$.bd8=u
s=$.bem()
s.toString
$.bbR=B.yE(u)==="en_US"?s.b:s.wR()}$.bbR.toString}s=r.x="0"}s=r.w=s.charCodeAt(0)}v[t]=d.charCodeAt(t)+s-w}return A.eZ(v,0,null)},
a3r(d){var x,w
if(d.length===0)return A.a([],y.T)
x=this.apw(d)
if(x==null)return A.a([],y.T)
w=this.a3r(C.d.c1(d,x.aa7().length))
w.push(x)
return w},
apw(d){var x,w,v,u
for(x=0;w=$.bsp(),x<3;++x){v=w[x].pr(d)
if(v!=null){w=B.bxX()[x]
u=v.b[0]
u.toString
return w.$2(u,this)}}return null}}
B.tT.prototype={
aa7(){return this.a},
j(d){return this.a},
yk(d){return this.a}}
B.Dj.prototype={}
B.Dl.prototype={
aa7(){return this.d}}
B.Dk.prototype={
yk(d){return this.aNv(d)},
aNv(d){var x,w,v,u,t,s=this,r="0",q=s.a
switch(q[0]){case"a":x=d.glc()
w=x>=12&&x<24?1:0
return s.b.gix().CW[w]
case"c":return s.aNz(d)
case"d":return s.b.j3(C.d.b3(""+d.gbc(),q.length,r))
case"D":return s.b.j3(C.d.b3(""+B.bKe(d.gaW(),d.gbc(),A.bg(A.bi(d.gb8(),2,29,0,0,0,0,0))===2),q.length,r))
case"E":return s.aNu(d)
case"G":v=d.gb8()>0?1:0
u=s.b
return q.length>=4?u.gix().c[v]:u.gix().b[v]
case"h":x=d.glc()
if(d.glc()>12)x-=12
return s.b.j3(C.d.b3(""+(x===0?12:x),q.length,r))
case"H":return s.b.j3(C.d.b3(""+d.glc(),q.length,r))
case"K":return s.b.j3(C.d.b3(""+C.e.ar(d.glc(),12),q.length,r))
case"k":return s.b.j3(C.d.b3(""+(d.glc()===0?24:d.glc()),q.length,r))
case"L":return s.aNA(d)
case"M":return s.aNx(d)
case"m":return s.b.j3(C.d.b3(""+d.guW(),q.length,r))
case"Q":return s.aNy(d)
case"S":return s.aNw(d)
case"s":return s.b.j3(C.d.b3(""+d.gt2(),q.length,r))
case"y":t=d.gb8()
if(t<0)t=-t
q=q.length
u=s.b
return q===2?u.j3(C.d.b3(""+C.e.ar(t,100),2,r)):u.j3(C.d.b3(""+t,q,r))
default:return""}},
aNx(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.gix().d[d.gaW()-1]
case 4:return w.gix().f[d.gaW()-1]
case 3:return w.gix().w[d.gaW()-1]
default:return w.j3(C.d.b3(""+d.gaW(),x,"0"))}},
aNw(d){var x=this.b,w=x.j3(C.d.b3(""+d.gE0(),3,"0")),v=this.a.length-3
if(v>0)return w+x.j3(C.d.b3(""+0,v,"0"))
else return w},
aNz(d){var x=this.b
switch(this.a.length){case 5:return x.gix().ax[C.e.ar(d.gpV(),7)]
case 4:return x.gix().z[C.e.ar(d.gpV(),7)]
case 3:return x.gix().as[C.e.ar(d.gpV(),7)]
default:return x.j3(C.d.b3(""+d.gbc(),1,"0"))}},
aNA(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.gix().e[d.gaW()-1]
case 4:return w.gix().r[d.gaW()-1]
case 3:return w.gix().x[d.gaW()-1]
default:return w.j3(C.d.b3(""+d.gaW(),x,"0"))}},
aNy(d){var x=C.c.F((d.gaW()-1)/3),w=this.a.length,v=this.b
switch(w){case 4:return v.gix().ch[x]
case 3:return v.gix().ay[x]
default:return v.j3(C.d.b3(""+(x+1),w,"0"))}},
aNu(d){var x,w=this,v=w.a.length
$label0$0:{if(v<=3){x=w.b.gix().Q
break $label0$0}if(v===4){x=w.b.gix().y
break $label0$0}if(v===5){x=w.b.gix().at
break $label0$0}if(v>=6)A.ad(A.aO('"Short" weekdays are currently not supported.'))
x=A.ad(A.k5("unreachable"))}return x[C.e.ar(d.gpV(),7)]}}
B.a2l.prototype={
h(d,e){return B.yE(e)==="en_US"?this.b:this.wR()},
wR(){throw A.f(new B.YF("Locale data has not been initialized, call "+this.a+"."))}}
B.YF.prototype={
j(d){return"LocaleDataException: "+this.a},
$ibu:1}
var z=a.updateTypes(["H(ky)","o(o)","y(ky,ky)","av<~>()","h(ky)","Dl(o,nh)","Dk(o,nh)","Dj(o,nh)","H(o?)","o(o?)"])
B.bcc.prototype={
$2(d,e){var x=d.gCP(),w=e.gCP()
if(x==null&&w==null)return C.d.bs(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.Fa(x,w)},
$S:z+2}
B.b3s.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
B.b3t.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
B.b3u.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
B.b3B.prototype={
$1(d){return new A.iY(new B.b3A(this.a,this.b,this.c),null)},
$S:58}
B.b3A.prototype={
$2(d,e){var x,w,v,u,t,s=null,r=y.w,q=A.aq(d,s,r).w,p=A.c(A.b("Nouvelle r\xe9union en ligne"),s,s,s,s,A.A(d).p2.r,s,s,s),o=A.b("Titre de la r\xe9union")
o=A.cL(!0,C.y,!1,s,!0,C.i,s,A.cN(),this.b,s,s,s,s,s,2,A.cC(s,new A.c5(4,A.a6(14),C.an),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,o,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.N,!0,s,!0,s,!1,s,C.a9,s,s,s,s,s,s,s,1,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a6,s,s,C.a7,C.a5,s,s,s,s,s,s,s,C.Q,s,C.ac,s,s,s,s)
x=A.b("Description (facultatif)")
x=A.cL(!0,C.y,!1,s,!0,C.i,s,A.cN(),this.c,s,s,s,s,s,2,A.cC(s,new A.c5(4,A.a6(14),C.an),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,x,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.N,!0,s,!0,s,!1,s,C.a9,s,s,s,s,s,s,s,3,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a6,s,s,C.a7,C.a5,s,s,s,s,s,s,s,C.Q,s,C.ac,s,s,s,s)
w=this.a
if(w.b==null)v=A.b("Date")
else{v=B.bkq("d MMM yyyy",$.am)
u=w.b
u.toString
u=v.yk(u)
v=u}v=A.ak(A.cU(D.VA,A.c(v,s,s,s,s,s,s,s,s),new B.b3x(w,d,e),s),1)
u=w.a
if(u==null)r=A.b("Heure")
else{t=A.bM(d,C.V,y.v)
t.toString
A.aq(d,C.db,r).toString
u=t.aa3(u,!1)
r=u}u=y.p
return new A.a8(new A.ae(16,16,16,q.f.d+16),A.eD(A.V(A.a([p,C.t,o,C.k,x,C.k,A.ab(A.a([v,C.S,A.ak(A.cU(D.VZ,A.c(r,s,s,s,s,s,s,s,s),new B.b3y(w,d,e),s),1)],u),C.n,C.f,C.h,s),C.t,A.ag(A.bR(!1,A.c(A.b("Publier"),s,s,s,s,s,s,s,s),C.j,s,C.r,s,s,s,s,new B.b3z(d),s,s),52,1/0)],u),C.p,C.f,C.a2),s,s,s,C.ab),s)},
$S:96}
B.b3x.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.b
if(s==null)s=new A.aZ(Date.now(),0,!1)
x=2
return A.e(A.Tz(null,null,null,v.b,new A.aZ(Date.now(),0,!1).kM(-864e8),null,s,new A.aZ(Date.now(),0,!1).kM(31536e9)),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b3w(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b3w.prototype={
$0(){return this.a.b=this.b},
$S:0}
B.b3y.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.a
if(s==null){s=new A.aZ(Date.now(),0,!1)
s=new A.c7(A.mj(s),A.mk(s))}x=2
return A.e(A.be_(null,null,null,v.b,null,s),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b3v(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b3v.prototype={
$0(){return this.a.a=this.b},
$S:0}
B.b3z.prototype={
$0(){return A.aT(this.a,!1).bb(!0)},
$S:0}
B.b3E.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.e2(A.a([A.ce(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,C.r,x,x,x,x,new B.b3C(d),x,x),A.ce(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,C.r,x,x,x,x,new B.b3D(d),x,x)],y.p),v,w)},
$S:12}
B.b3C.prototype={
$0(){return A.aT(this.a,!1).bb(!1)},
$S:0}
B.b3D.prototype={
$0(){return A.aT(this.a,!1).bb(!0)},
$S:0}
B.b3L.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.jj(l.d,new B.b3I()),j=A.N(k,!0,k.$ti.i("t.E"))
k=J.jj(l.d,new B.b3J())
x=A.N(k,!0,k.$ti.i("t.E"))
w=new B.b3M(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.brS(v,u,t,$.Y().c?A.bcH(C.ix,A.b("Planifier"),new B.b3K(l,d)):o),C.t],s)
if(l.e)t.push(D.NL)
else if(l.f!=null)t.push(A.du(new A.a8(C.I,A.V(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),C.k,A.cR(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,C.r,o,o,o,o,l.gaDr(),o,o)],s),C.n,C.f,C.h),o),o,o,o,o))
else if(J.cy(l.d))t.push(A.du(new A.a8(C.I,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([C.k,A.c(q,o,o,o,o,p==null?o:p.by(C.a3,C.z),o,o,o),C.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
C.b.B(v,s)}C.b.B(t,v)}l.a.toString
return A.bJ(k,t,o,o)},
$S:5}
B.b3I.prototype={
$1(d){return d.gq8()==="avenir"||d.gq8()==="direct"||d.gq8()==="bientot"},
$S:z+0}
B.b3J.prototype={
$1(d){return d.gq8()==="terminee"},
$S:z+0}
B.b3M.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gq8()==="direct",n=q.b,m=n.w
m=m==null?p:m.by(C.q,C.A)
m=A.ak(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gq8()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=C.Cd
else t=x==="avenir"?C.v:C.a3
x=t.dZ(0.12)
w=A.a6(20)
u=A.ac(p,p,C.j,p,p,new A.an(t,p,p,p,p,p,C.bB),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.ab(A.a([m,A.ac(p,A.ab(A.a([u,C.fw,A.c(v,p,p,p,p,s==null?p:s.by(t,C.A),p,p,p)],r),C.n,C.f,C.a2,p),C.j,p,p,new A.an(x,p,p,w,p,p,C.x),p,p,p,p,C.fW,p,p,p)],r),C.n,C.f,C.h,p)
x=q.a
s=x.aCm(d)
n=n.z
m=A.a([w,C.a_,A.ab(A.a([D.Wy,C.fw,A.c(s,p,p,p,p,n==null?p:n.aI(C.a3),p,p,p)],r),C.n,C.f,C.h,p)],r)
w=d.c
if(w.length!==0)C.b.B(m,A.a([C.cu,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(C.k)
n=A.a([],r)
if(!o&&d.gq8()!=="terminee")n.push(A.ak(A.cJ(D.W6,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new B.b3F(x,q.c,d),p),1))
if(o){w=A.hF(C.Cd,C.l,p,p,p,p)
n.push(A.ak(A.cJ(D.Vv,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new B.b3G(x,q.c,d),w),1))}if($.Y().c)C.b.B(n,A.a([C.S,A.bT(p,p,p,D.VG,p,p,new B.b3H(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.ab(n,C.n,C.f,C.h,p))
return A.du(new A.a8(C.I,A.V(m,C.p,C.f,C.h),p),p,p,C.aC,p)},
$S:z+4}
B.b3F.prototype={
$0(){return this.a.Bt(this.b,this.c)},
$S:0}
B.b3G.prototype={
$0(){return this.a.Bt(this.b,this.c)},
$S:0}
B.b3H.prototype={
$0(){return this.a.wy(this.b,this.c)},
$S:0}
B.b3K.prototype={
$0(){return this.a.ws(this.b)},
$S:0}
B.ak6.prototype={
$8(d,e,f,g,h,i,j,k){if(k)return A.bf2(d,e,f,g,h,i,j,0)
else return A.bi(d,e,f,g,h,i,j,0)},
$S:847}
B.ak3.prototype={
$2(d,e){var x=B.bEF(d)
C.d.aq(x)
return new B.Dl(d,x,e)},
$S:z+5}
B.ak4.prototype={
$2(d,e){C.d.aq(d)
return new B.Dk(d,e)},
$S:z+6}
B.ak5.prototype={
$2(d,e){C.d.aq(d)
return new B.Dj(d,e)},
$S:z+7}
B.be8.prototype={
$1(d){return B.bhT(B.bs7(d))},
$S:110}
B.be9.prototype={
$1(d){return B.bhT(B.yE(d))},
$S:110}
B.bea.prototype={
$1(d){return"fallback"},
$S:110};(function installTearOffs(){var x=a._instance_0u,w=a._static_1
x(B.QI.prototype,"gaDr","qH",3)
w(B,"bKd","bxY",8)
w(B,"bL7","yE",9)
w(B,"bL8","bhT",1)
w(B,"bL9","bs7",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.S,[B.ky,B.ak7,B.nh,B.tT,B.a2l,B.YF])
x(A.v7,[B.bcc,B.b3A,B.ak3,B.ak4,B.ak5])
w(B.tl,A.U)
w(B.QI,A.Z)
x(A.v6,[B.b3s,B.b3t,B.b3u,B.b3x,B.b3w,B.b3y,B.b3v,B.b3z,B.b3C,B.b3D,B.b3F,B.b3G,B.b3H,B.b3K])
x(A.lL,[B.b3B,B.b3E,B.b3L,B.b3I,B.b3J,B.b3M,B.ak6,B.be8,B.be9,B.bea])
x(B.tT,[B.Dj,B.Dl,B.Dk])})()
A.b7N(b.typeUniverse,JSON.parse('{"tl":{"U":[],"h":[]},"QI":{"Z":["tl"]},"Dj":{"tT":[]},"Dl":{"tT":[]},"Dk":{"tT":[]},"YF":{"bu":[]}}'))
A.bhm(b.typeUniverse,JSON.parse('{"a2l":1}'))
var y=(function rtii(){var x=A.aM
return{t:x("D<aw<o,@>>"),l:x("D<+debut,nom(aZ,o)>"),E:x("D<ky>"),s:x("D<o>"),p:x("D<h>"),T:x("D<tT>"),n:x("D<tT(o,nh)>"),x:x("E<ky>"),j:x("E<@>"),f:x("aw<@,@>"),v:x("rG"),w:x("kp"),N:x("o"),q:x("ud"),y:x("H"),z:x("@"),S:x("y"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.T9=new A.ae(32,32,32,32)
D.a8H=new A.a8(D.T9,C.i4,null)
D.NL=new A.hf(C.a1,null,null,D.a8H,null)
D.U9=new A.ai(59048,!1)
D.Vv=new A.ay(D.U9,null,null,null,null)
D.VA=new A.ay(C.nR,null,null,null,null)
D.VG=new A.ay(C.kG,null,C.a3,null,null)
D.vF=new A.ai(62265,!1)
D.VZ=new A.ay(D.vF,null,null,null,null)
D.W6=new A.ay(C.o_,null,null,null,null)
D.Wy=new A.ay(D.vF,16,C.a3,null,null)
D.a_F=A.a(x(["AM","PM"]),y.s)
D.a_H=A.a(x(["BC","AD"]),y.s)
D.wH=A.a(x(["J","F","M","A","M","J","J","A","S","O","N","D"]),y.s)
D.a0e=A.a(x(["1st quarter","2nd quarter","3rd quarter","4th quarter"]),y.s)
D.wM=A.a(x(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),y.s)
D.a0f=A.a(x(["Before Christ","Anno Domini"]),y.s)
D.a0n=A.a(x(["Q1","Q2","Q3","Q4"]),y.s)
D.wZ=A.a(x(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]),y.s)
D.a7J={d:0,E:1,EEEE:2,LLL:3,LLLL:4,M:5,Md:6,MEd:7,MMM:8,MMMd:9,MMMEd:10,MMMM:11,MMMMd:12,MMMMEEEEd:13,QQQ:14,QQQQ:15,y:16,yM:17,yMd:18,yMEd:19,yMMM:20,yMMMd:21,yMMMEd:22,yMMMM:23,yMMMMd:24,yMMMMEEEEd:25,yQQQ:26,yQQQQ:27,H:28,Hm:29,Hms:30,j:31,jm:32,jms:33,jmv:34,jmz:35,jz:36,m:37,ms:38,s:39,v:40,z:41,zzzz:42,ZZZZ:43}
D.a6s=new A.cr(D.a7J,["d","ccc","cccc","LLL","LLLL","L","M/d","EEE, M/d","LLL","MMM d","EEE, MMM d","LLLL","MMMM d","EEEE, MMMM d","QQQ","QQQQ","y","M/y","M/d/y","EEE, M/d/y","MMM y","MMM d, y","EEE, MMM d, y","MMMM y","MMMM d, y","EEEE, MMMM d, y","QQQ y","QQQQ y","HH","HH:mm","HH:mm:ss","h\u202fa","h:mm\u202fa","h:mm:ss\u202fa","h:mm\u202fa v","h:mm\u202fa z","h\u202fa z","m","mm:ss","s","v","z","zzzz","ZZZZ"],A.aM("cr<o,o>"))})();(function staticFields(){$.bbR=null
$.bd8=null
$.bpZ=null
$.bkr=A.B(y.N,y.y)})();(function lazyInitializers(){var x=a.lazyFinal,w=a.lazy
x($,"bSB","bvA",()=>new B.ak7("en_US",D.a_H,D.a0f,D.wH,D.wH,C.co,C.co,C.iR,C.iR,D.wZ,D.wZ,D.wM,D.wM,C.l4,C.l4,D.a0n,D.a0e,D.a_F))
w($,"bR1","bem",()=>B.bow("initializeDateFormatting(<locale>)",$.bvA()))
w($,"bSy","bj7",()=>B.bow("initializeDateFormatting(<locale>)",D.a6s))
x($,"bSp","bvz",()=>48)
x($,"bN1","bsp",()=>A.a([A.c_("^'(?:[^']|'')*'",!0,!1),A.c_("^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)",!0,!1),A.c_("^[^'GyMkSEahKHcLQdDmsvzZ]+",!0,!1)],A.aM("D<bng>")))
x($,"bQ9","bu6",()=>A.c_("''",!0,!1))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"7ufMIFNgyYc4kqWrpepH64Ib1cc=");