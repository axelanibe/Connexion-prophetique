((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={
bnL(d){var x,w,v,u=J.a3(d),t=u.h(d,"date_debut"),s=J.x(t==null?"":t),r=s.length!==0?A.d9(s):null
t=u.h(d,"id")
t=J.x(t==null?"":t)
x=u.h(d,"nom")
x=J.x(x==null?"":x)
w=u.h(d,"description")
w=J.x(w==null?"":w)
v=u.h(d,"heure_debut")
v=J.x(v==null?"":v)
u=u.h(d,"salle_visio")
return new B.kA(t,x,w,r,v,J.x(u==null?"":u))},
F2(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$F2=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.ay().e0("/evenements"),$async$F2)
case 7:s=a8
r=A.a([],y.E)
for(g=J.aE(s);g.v();){q=g.gM(g)
f=J.p(q,"type")
if(J.x(f==null?"":f)==="reunion")J.cq(r,B.bnL(q))}p=r
J.z_(p,new B.bcw())
x=8
return A.e(A.dr(),$async$F2)
case 8:o=a8
n=A.a([],y.t)
for(r=p,g=r.length,f=y.N,e=y.z,d=0;d<r.length;r.length===g||(0,A.K)(r),++d){m=r[d]
a0=m
a1=a0.a
a2=a0.b
a3=a0.c
a4=a0.d
a4=a4==null?"":C.d.b_(C.e.j(A.aZ(a4)),4,"0")+"-"+C.d.b_(C.e.j(A.b4(a4)),2,"0")+"-"+C.d.b_(C.e.j(A.d_(a4)),2,"0")
J.cq(n,A.ak(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
return A.e(o.da("String","reunions_cache_v1",C.aa.hs(n,null)),$async$F2)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dr(),$async$F2)
case 10:o=a8
l=o
k=A.aU(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.a9(k)===0)throw a6
j=y.j.a(C.aa.eE(0,k,null))
i=A.a([],y.E)
for(r=J.aE(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gM(r)
J.cq(i,B.bnL(J.n0(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$F2,w)},
bL1(){var x,w=$.biP(),v=J.kj(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yJ(31)]
return"cp-"+C.b.DO(v)},
bCD(){return new B.tm(null)},
kA:function kA(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
bcw:function bcw(){},
tm:function tm(d){this.a=d},
QJ:function QJ(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b3B:function b3B(d){this.a=d},
b3C:function b3C(d,e){this.a=d
this.b=e},
b3D:function b3D(d){this.a=d},
b3Q:function b3Q(d,e,f){this.a=d
this.b=e
this.c=f},
b3P:function b3P(d,e,f){this.a=d
this.b=e
this.c=f},
b3J:function b3J(d,e){this.a=d
this.b=e},
b3I:function b3I(d,e){this.a=d
this.b=e},
b3K:function b3K(d,e){this.a=d
this.b=e},
b3H:function b3H(d,e){this.a=d
this.b=e},
b3L:function b3L(d,e){this.a=d
this.b=e},
b3G:function b3G(d,e){this.a=d
this.b=e},
b3M:function b3M(d,e){this.a=d
this.b=e},
b3F:function b3F(d,e){this.a=d
this.b=e},
b3N:function b3N(d,e){this.a=d
this.b=e},
b3E:function b3E(d,e){this.a=d
this.b=e},
b3O:function b3O(d){this.a=d},
b3T:function b3T(){},
b3R:function b3R(d){this.a=d},
b3S:function b3S(d){this.a=d},
b40:function b40(d){this.a=d},
b3Y:function b3Y(){},
b3Z:function b3Z(){},
b41:function b41(d,e,f){this.a=d
this.b=e
this.c=f},
b3U:function b3U(d,e,f){this.a=d
this.b=e
this.c=f},
b3V:function b3V(d,e,f){this.a=d
this.b=e
this.c=f},
b3W:function b3W(d,e){this.a=d
this.b=e},
b3X:function b3X(d,e,f){this.a=d
this.b=e
this.c=f},
b4_:function b4_(d,e){this.a=d
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
bkH(d,e){var x=B.bMF(e,B.bKu(),null)
x.toString
x=new B.ni(new B.ak8(),x)
x.Se(d)
return x},
bye(d){var x=$.beF()
x.toString
if(B.yJ(d)!=="en_US")x.wQ()
return!0},
byd(){return A.a([new B.ak5(),new B.ak6(),new B.ak7()],y.n)},
bEW(d){var x,w
if(d==="''")return"'"
else{x=C.d.V(d,1,d.length-1)
w=$.bun()
return A.a5(x,w,"'")}},
ni:function ni(d,e){var _=this
_.a=d
_.c=e
_.x=_.w=_.f=_.e=_.d=null},
ak8:function ak8(){},
ak5:function ak5(){},
ak6:function ak6(){},
ak7:function ak7(){},
tU:function tU(){},
Dl:function Dl(d,e){this.a=d
this.b=e},
Dn:function Dn(d,e,f){this.d=d
this.a=e
this.b=f},
Dm:function Dm(d,e){this.a=d
this.b=e},
boN(d,e){return new B.a2k(d,e,A.a([],y.s))},
bqZ(d){var x,w=d.length
if(w<3)return-1
x=d[2]
if(x==="-"||x==="_")return 2
if(w<4)return-1
w=d[3]
if(w==="-"||w==="_")return 3
return-1},
yJ(d){var x,w,v,u
if(d==null){if(B.brE()==null)$.bqf="en_US"
x=B.brE()
x.toString
return x}if(d==="C")return"en_ISO"
if(d.length<5)return d
w=B.bqZ(d)
if(w===-1)return d
v=C.d.V(d,0,w)
u=C.d.c0(d,w+1)
if(u.length<=3)u=u.toUpperCase()
return v+"_"+u},
bMF(d,e,f){var x,w,v
if(e.$1(d))return d
x=[B.bLo(),B.bLq(),B.bLp(),new B.ber(),new B.bes(),new B.bet()]
for(w=0;w<6;++w){v=x[w].$1(d)
if(e.$1(v))return v}return B.bJf(d)},
bJf(d){throw A.f(A.cf('Invalid locale "'+d+'"',null))},
bi8(d){switch(d){case"iw":return"he"
case"he":return"iw"
case"fil":return"tl"
case"tl":return"fil"
case"id":return"in"
case"in":return"id"
case"no":return"nb"
case"nb":return"no"}return d},
bso(d){var x,w
if(d==="invalid")return"in"
x=d.length
if(x<2)return d
w=B.bqZ(d)
if(w===-1)if(x<4)return d.toLowerCase()
else return d
return C.d.V(d,0,w).toLowerCase()},
a2k:function a2k(d,e,f){this.a=d
this.b=e
this.c=f},
YF:function YF(d){this.a=d},
ber:function ber(){},
bes:function bes(){},
bet:function bet(){},
bdq(d,e){var x=0,w=A.n(y.H)
var $async$bdq=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.yQ(A.d2("https://meet.jit.si/"+e,0,null),C.XM,"_blank"),$async$bdq)
case 2:return A.l(null,w)}})
return A.m($async$bdq,w)},
brE(){var x=$.bqf
return x},
bKv(d,e,f){var x,w
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
B.kA.prototype={
gCR(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.dw(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.dw(x[1],null)
t=w==null?0:w}else t=0
return A.bc(A.aZ(s),A.b4(s),A.d_(s),u,t,0,0,0)},
gq8(){var x,w=this.gCR()
if(w==null)return"bientot"
x=new A.b_(Date.now(),0,!1)
if(x.hv(w))return"avenir"
if(x.hv(w.mu(108e8)))return"direct"
return"terminee"}}
B.tm.prototype={
R(){return new B.QJ(A.a([],y.E))}}
B.QJ.prototype={
a2(){this.ac()
this.qH()},
qH(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qH=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.q(new B.b3B(s))
u=4
x=7
return A.e(B.F2(),$async$qH)
case 7:r=e
if(s.c==null){x=1
break}s.q(new B.b3C(s,r))
q=A.a([],y.l)
for(n=J.aE(r);n.v();){p=n.gM(n)
if(p.gCR()!=null&&p.gq8()==="avenir"){m=p.b
l=p.gCR()
l.toString
J.cq(q,new A.a9d(l,m))}}o=q
x=8
return A.e($.kP().t1($.an,o),$async$qH)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.q(new B.b3D(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qH,w)},
aCn(d){var x,w,v,u=d.d
if(u==null)return A.b("Date \xe0 confirmer")
x=B.bkH("d MMM yyyy",$.an)
w=d.e
if(w.length>=5)w=C.d.V(w,0,5)
v=$.an==="en"?"at":"\xe0"
return w.length===0?x.yj(u):x.yj(u)+" "+v+" "+w},
Bu(d,e){return this.aCT(d,e)},
aCT(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$Bu=A.j(function(f,g){if(f===1){t=g
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
return A.e(B.bdq(s==null?"":s,p),$async$Bu)
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
return A.m($async$Bu,w)},
wr(d){return this.aC5(d)},
aC5(a1){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$wr=A.j(function(a2,a3){if(a2===1){t=a3
x=u}while(true)switch(x){case 0:f={}
e=$.ay()
d=e.b
if(!(d!=null&&d.length!==0)){f=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
a1.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(f,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}d=$.ah()
l=new A.bo(C.ag,d)
r=new A.bo(C.ag,d)
f.a=f.b=f.c=f.d=f.e=f.f=null
x=3
return A.e(A.qA(C.bv,new B.b3Q(f,l,r),a1,!0,C.e_,y.y),$async$wr)
case 3:if(a3!==!0||a1.e==null){x=1
break}q=C.d.aq(l.a.a)
d=f.b
if(d!=null&&f.a!=null){d.toString
k=f.a
k.toString
j=new A.c8(d,k)}else j=null
i=A.bc(A.aZ(new A.b_(Date.now(),0,!1)),A.b4(new A.b_(Date.now(),0,!1)),A.d_(new A.b_(Date.now(),0,!1)),0,0,0,0,0)
if(J.a9(q)!==0){d=f.f
d=d==null||j==null||d.hv(i)}else d=!0
if(d){f=A.b("Le titre, la date et l\u2019heure sont requis.")
a1.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(f,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}p=B.bL1()
o=C.d.b_(C.e.j(j.a),2,"0")
n=C.d.b_(C.e.j(j.b),2,"0")
u=5
d=C.d.aq(r.a.a).length===0?null:C.d.aq(r.a.a)
k=f.f
k.toString
k=C.d.b_(C.e.j(A.aZ(k)),4,"0")
h=f.f
h.toString
h=C.d.b_(C.e.j(A.b4(h)),2,"0")
f=f.f
f.toString
x=8
return A.e(e.aL7(k+"-"+h+"-"+C.d.b_(C.e.j(A.d_(f)),2,"0"),d,A.q(o)+":"+A.q(n),q,p,"reunion"),$async$wr)
case 8:if(a1.e==null){x=1
break}f=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
a1.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(f,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qH(),$async$wr)
case 9:u=2
x=7
break
case 5:u=4
a0=t
m=A.W(a0)
if(a1.e!=null){f=A.q(m)
a1.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c("Publication refus\xe9e ("+f+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wr,w)},
wx(d,e){return this.aDo(d,e)},
aDo(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wx=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.dI(null,null,!0,null,new B.b3T(),d,null,!0,!0,y.y),$async$wx)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.ay().adc(e.a,!1),$async$wx)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(q,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qH(),$async$wx)
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
return A.m($async$wx,w)},
E(d){return A.ea(new B.b40(this))}}
B.ak9.prototype={
j(d){return this.a}}
B.ni.prototype={
yj(d){var x,w,v,u=this,t=u.e
if(t==null){if(u.d==null){u.Se("yMMMMd")
u.Se("jms")}t=u.d
t.toString
t=u.a3u(t)
x=A.a0(t).i("cV<1>")
x=u.e=A.O(new A.cV(t,x),!0,x.i("aT.E"))
t=x}x=t.length
w=0
v=""
for(;w<t.length;t.length===x||(0,A.K)(t),++w)v+=t[w].yj(d)
return v.charCodeAt(0)==0?v:v},
Zl(d,e){var x=this.d
this.d=x==null?d:x+e+d},
Se(d){var x,w,v=this
v.e=null
x=$.bjo()
w=v.c
x.toString
if(!(B.yJ(w)==="en_US"?x.b:x.wQ()).aL(0,d))v.Zl(d," ")
else{x=$.bjo()
x.toString
v.Zl((B.yJ(w)==="en_US"?x.b:x.wQ()).h(0,d)," ")}return v},
giy(){var x,w=this.c
if(w!==$.bds){$.bds=w
x=$.beF()
x.toString
$.bca=B.yJ(w)==="en_US"?x.b:x.wQ()}w=$.bca
w.toString
return w},
gaUO(){var x=this.f
if(x==null){$.bkI.h(0,this.c)
x=this.f=!0}return x},
j4(d){var x,w,v,u,t,s,r=this
r.gaUO()
x=r.w
w=$.bvQ()
if(x===w)return d
x=d.length
v=A.ca(x,0,!1,y.S)
for(u=r.c,t=0;t<x;++t){s=r.w
if(s==null){s=r.x
if(s==null){s=r.f
if(s==null){$.bkI.h(0,u)
s=r.f=!0}if(s){if(u!==$.bds){$.bds=u
s=$.beF()
s.toString
$.bca=B.yJ(u)==="en_US"?s.b:s.wQ()}$.bca.toString}s=r.x="0"}s=r.w=s.charCodeAt(0)}v[t]=d.charCodeAt(t)+s-w}return A.eZ(v,0,null)},
a3u(d){var x,w
if(d.length===0)return A.a([],y.T)
x=this.apx(d)
if(x==null)return A.a([],y.T)
w=this.a3u(C.d.c0(d,x.aa8().length))
w.push(x)
return w},
apx(d){var x,w,v,u
for(x=0;w=$.bsG(),x<3;++x){v=w[x].ps(d)
if(v!=null){w=B.byd()[x]
u=v.b[0]
u.toString
return w.$2(u,this)}}return null}}
B.tU.prototype={
aa8(){return this.a},
j(d){return this.a},
yj(d){return this.a}}
B.Dl.prototype={}
B.Dn.prototype={
aa8(){return this.d}}
B.Dm.prototype={
yj(d){return this.aNy(d)},
aNy(d){var x,w,v,u,t,s=this,r="0",q=s.a
switch(q[0]){case"a":x=A.hO(d)
w=x>=12&&x<24?1:0
return s.b.giy().CW[w]
case"c":return s.aNC(d)
case"d":return s.b.j4(C.d.b_(""+A.d_(d),q.length,r))
case"D":return s.b.j4(C.d.b_(""+B.bKv(A.b4(d),A.d_(d),A.b4(A.bc(A.aZ(d),2,29,0,0,0,0,0))===2),q.length,r))
case"E":return s.aNx(d)
case"G":v=A.aZ(d)>0?1:0
u=s.b
return q.length>=4?u.giy().c[v]:u.giy().b[v]
case"h":x=A.hO(d)
if(A.hO(d)>12)x-=12
return s.b.j4(C.d.b_(""+(x===0?12:x),q.length,r))
case"H":return s.b.j4(C.d.b_(""+A.hO(d),q.length,r))
case"K":return s.b.j4(C.d.b_(""+C.e.ar(A.hO(d),12),q.length,r))
case"k":return s.b.j4(C.d.b_(""+(A.hO(d)===0?24:A.hO(d)),q.length,r))
case"L":return s.aND(d)
case"M":return s.aNA(d)
case"m":return s.b.j4(C.d.b_(""+A.ml(d),q.length,r))
case"Q":return s.aNB(d)
case"S":return s.aNz(d)
case"s":return s.b.j4(C.d.b_(""+A.ayq(d),q.length,r))
case"y":t=A.aZ(d)
if(t<0)t=-t
q=q.length
u=s.b
return q===2?u.j4(C.d.b_(""+C.e.ar(t,100),2,r)):u.j4(C.d.b_(""+t,q,r))
default:return""}},
aNA(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.giy().d[A.b4(d)-1]
case 4:return w.giy().f[A.b4(d)-1]
case 3:return w.giy().w[A.b4(d)-1]
default:return w.j4(C.d.b_(""+A.b4(d),x,"0"))}},
aNz(d){var x=this.b,w=x.j4(C.d.b_(""+A.ayp(d),3,"0")),v=this.a.length-3
if(v>0)return w+x.j4(C.d.b_(""+0,v,"0"))
else return w},
aNC(d){var x=this.b
switch(this.a.length){case 5:return x.giy().ax[C.e.ar(A.t7(d),7)]
case 4:return x.giy().z[C.e.ar(A.t7(d),7)]
case 3:return x.giy().as[C.e.ar(A.t7(d),7)]
default:return x.j4(C.d.b_(""+A.d_(d),1,"0"))}},
aND(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.giy().e[A.b4(d)-1]
case 4:return w.giy().r[A.b4(d)-1]
case 3:return w.giy().x[A.b4(d)-1]
default:return w.j4(C.d.b_(""+A.b4(d),x,"0"))}},
aNB(d){var x=C.c.F((A.b4(d)-1)/3),w=this.a.length,v=this.b
switch(w){case 4:return v.giy().ch[x]
case 3:return v.giy().ay[x]
default:return v.j4(C.d.b_(""+(x+1),w,"0"))}},
aNx(d){var x,w=this,v=w.a.length
$label0$0:{if(v<=3){x=w.b.giy().Q
break $label0$0}if(v===4){x=w.b.giy().y
break $label0$0}if(v===5){x=w.b.giy().at
break $label0$0}if(v>=6)A.ad(A.aO('"Short" weekdays are currently not supported.'))
x=A.ad(A.k7("unreachable"))}return x[C.e.ar(A.t7(d),7)]}}
B.a2k.prototype={
h(d,e){return B.yJ(e)==="en_US"?this.b:this.wQ()},
wQ(){throw A.f(new B.YF("Locale data has not been initialized, call "+this.a+"."))}}
B.YF.prototype={
j(d){return"LocaleDataException: "+this.a},
$ibu:1}
var z=a.updateTypes(["H(kA)","o(o)","y(kA,kA)","av<~>()","h(kA)","Dn(o,ni)","Dm(o,ni)","Dl(o,ni)","H(o?)","o(o?)"])
B.bcw.prototype={
$2(d,e){var x=d.gCR(),w=e.gCR()
if(x==null&&w==null)return C.d.bs(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.Fc(x,w)},
$S:z+2}
B.b3B.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
B.b3C.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
B.b3D.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
B.b3Q.prototype={
$1(d){return new A.j_(new B.b3P(this.a,this.b,this.c),null)},
$S:58}
B.b3P.prototype={
$2(d,a0){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h=null,g=A.aq(d,h,y.w).w,f=A.c(A.b("Nouvelle r\xe9union en ligne"),h,h,h,h,A.A(d).p2.r,h,h,h),e=A.b("Titre de la r\xe9union")
e=A.cI(!0,C.y,!1,h,!0,C.i,h,A.cM(),this.b,h,h,h,h,h,2,A.cl(h,new A.bS(4,A.a2(14),C.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,C.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,e,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),C.N,!0,h,!0,h,!1,h,C.a8,h,h,h,h,h,h,h,1,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,C.a6,h,h,C.a7,C.a4,h,h,h,h,h,h,h,C.Q,h,C.ac,h,h,h,h)
x=A.b("Description (facultatif)")
x=A.cI(!0,C.y,!1,h,!0,C.i,h,A.cM(),this.c,h,h,h,h,h,2,A.cl(h,new A.bS(4,A.a2(14),C.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,C.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,x,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),C.N,!0,h,!0,h,!1,h,C.a8,h,h,h,h,h,h,h,3,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,C.a6,h,h,C.a7,C.a4,h,h,h,h,h,h,h,C.Q,h,C.ac,h,h,h,h)
w=this.a
v=w.e
u=A.b("Jour")
u=A.cl(h,new A.bS(4,A.a2(14),C.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,C.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,u,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
t=y.I
s=A.a([],t)
for(r=y.c,q=1;q<=31;++q)s.push(new A.dK(q,A.c(""+q,h,h,h,h,h,h,h,h),C.b4,h,r))
p=y.S
v=A.ai(A.i9(u,h,h,!0,s,new B.b3J(w,a0),h,v,p),1)
s=w.d
u=A.b("Mois")
u=A.cl(h,new A.bS(4,A.a2(14),C.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,C.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,u,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
o=A.a([],t)
for(n=1;n<=12;++n)o.push(new A.dK(n,A.c(B.bkH("MMMM",$.an).yj(A.bc(2000,n,1,0,0,0,0,0)),h,h,h,h,h,h,h,h),C.b4,h,r))
u=A.ai(A.i9(u,h,h,!0,o,new B.b3K(w,a0),h,s,p),2)
s=w.c
o=A.b("Ann\xe9e")
o=A.cl(h,new A.bS(4,A.a2(14),C.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,C.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,o,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
m=A.a([],t)
for(l=A.aZ(new A.b_(Date.now(),0,!1));l<=A.aZ(new A.b_(Date.now(),0,!1))+1;++l)m.push(new A.dK(l,A.c(""+l,h,h,h,h,h,h,h,h),C.b4,h,r))
k=y.p
s=A.aa(A.a([v,C.P,u,C.P,A.ai(A.i9(o,h,h,!0,m,new B.b3L(w,a0),h,s,p),1)],k),C.n,C.f,C.h,h)
m=w.b
o=A.b("Heure")
o=A.cl(h,new A.bS(4,A.a2(14),C.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,C.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,o,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=A.a([],t)
for(j=0;j<24;++j)u.push(new A.dK(j,A.c(C.d.b_(C.e.j(j),2,"0"),h,h,h,h,h,h,h,h),C.b4,h,r))
v=A.ai(A.i9(o,h,h,!0,u,new B.b3M(w,a0),h,m,p),1)
u=w.a
o=A.b("Minutes")
o=A.cl(h,new A.bS(4,A.a2(14),C.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,C.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,o,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
t=A.a([],t)
for(m=[0,15,30,45],i=0;i<4;++i){n=m[i]
t.push(new A.dK(n,A.c(C.d.b_(C.e.j(n),2,"0"),h,h,h,h,h,h,h,h),C.b4,h,r))}return new A.a7(new A.ae(16,16,16,g.f.d+16),A.eD(A.V(A.a([f,C.t,e,C.k,x,C.k,s,C.k,A.aa(A.a([v,C.P,A.ai(A.i9(o,h,h,!0,t,new B.b3N(w,a0),h,u,p),1)],k),C.n,C.f,C.h,h),C.t,A.af(A.bN(!1,A.c(A.b("Publier"),h,h,h,h,h,h,h,h),C.j,h,C.r,h,h,h,h,new B.b3O(d),h,h),52,1/0)],k),C.p,C.f,C.a2),h,h,h,C.ab),h)},
$S:101}
B.b3J.prototype={
$1(d){return this.b.$1(new B.b3I(this.a,d))},
$S:60}
B.b3I.prototype={
$0(){var x,w,v,u,t=this.b,s=this.a
s.e=t
if(t!=null&&s.d!=null&&s.c!=null){x=s.c
x.toString
w=s.d
w.toString
v=A.d_(A.bc(x,w+1,0,0,0,0,0,0))
x=s.e
x.toString
if(x>v){s.e=v
x=v}w=s.c
w.toString
u=s.d
u.toString
s.f=A.bc(w,u,x,0,0,0,0,0)}},
$S:0}
B.b3K.prototype={
$1(d){return this.b.$1(new B.b3H(this.a,d))},
$S:60}
B.b3H.prototype={
$0(){var x,w,v,u,t=this.a,s=t.d=this.b
if(t.e!=null&&s!=null&&t.c!=null){x=t.c
x.toString
s.toString
w=A.d_(A.bc(x,s+1,0,0,0,0,0,0))
x=t.e
x.toString
if(x>w){t.e=w
x=w}v=t.c
v.toString
u=t.d
u.toString
t.f=A.bc(v,u,x,0,0,0,0,0)}},
$S:0}
B.b3L.prototype={
$1(d){return this.b.$1(new B.b3G(this.a,d))},
$S:60}
B.b3G.prototype={
$0(){var x,w,v,u,t=this.a,s=t.c=this.b
if(t.e!=null&&t.d!=null&&s!=null){x=t.d
x.toString
w=A.d_(A.bc(s,x+1,0,0,0,0,0,0))
x=t.e
x.toString
if(x>w){t.e=w
x=w}v=t.c
v.toString
u=t.d
u.toString
t.f=A.bc(v,u,x,0,0,0,0,0)}},
$S:0}
B.b3M.prototype={
$1(d){return this.b.$1(new B.b3F(this.a,d))},
$S:60}
B.b3F.prototype={
$0(){return this.a.b=this.b},
$S:0}
B.b3N.prototype={
$1(d){return this.b.$1(new B.b3E(this.a,d))},
$S:60}
B.b3E.prototype={
$0(){return this.a.a=this.b},
$S:0}
B.b3O.prototype={
$0(){return A.aR(this.a,!1).b8(!0)},
$S:0}
B.b3T.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.dZ(A.a([A.cc(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,C.r,x,x,x,x,new B.b3R(d),x,x),A.cc(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,C.r,x,x,x,x,new B.b3S(d),x,x)],y.p),v,w)},
$S:12}
B.b3R.prototype={
$0(){return A.aR(this.a,!1).b8(!1)},
$S:0}
B.b3S.prototype={
$0(){return A.aR(this.a,!1).b8(!0)},
$S:0}
B.b40.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.jl(l.d,new B.b3Y()),j=A.O(k,!0,k.$ti.i("t.E"))
k=J.jl(l.d,new B.b3Z())
x=A.O(k,!0,k.$ti.i("t.E"))
w=new B.b41(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.bs8(v,u,t,$.X().c?A.bd0(C.ix,A.b("Planifier"),new B.b4_(l,d)):o),C.t],s)
if(l.e)t.push(D.NN)
else if(l.f!=null)t.push(A.dv(new A.a7(C.I,A.V(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),C.k,A.cR(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,C.r,o,o,o,o,l.gaDs(),o,o)],s),C.n,C.f,C.h),o),o,o,o,o))
else if(J.cz(l.d))t.push(A.dv(new A.a7(C.I,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([C.k,A.c(q,o,o,o,o,p==null?o:p.by(C.a5,C.z),o,o,o),C.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
C.b.B(v,s)}C.b.B(t,v)}l.a.toString
return A.bK(k,t,o,o)},
$S:4}
B.b3Y.prototype={
$1(d){return d.gq8()==="avenir"||d.gq8()==="direct"||d.gq8()==="bientot"},
$S:z+0}
B.b3Z.prototype={
$1(d){return d.gq8()==="terminee"},
$S:z+0}
B.b41.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gq8()==="direct",n=q.b,m=n.w
m=m==null?p:m.by(C.q,C.A)
m=A.ai(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gq8()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=C.Cd
else t=x==="avenir"?C.v:C.a5
x=t.dO(0.12)
w=A.a2(20)
u=A.ac(p,p,C.j,p,p,new A.am(t,p,p,p,p,p,C.bC),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.aa(A.a([m,A.ac(p,A.aa(A.a([u,C.fw,A.c(v,p,p,p,p,s==null?p:s.by(t,C.A),p,p,p)],r),C.n,C.f,C.a2,p),C.j,p,p,new A.am(x,p,p,w,p,p,C.x),p,p,p,p,C.fW,p,p,p)],r),C.n,C.f,C.h,p)
x=q.a
s=x.aCn(d)
n=n.z
m=A.a([w,C.a_,A.aa(A.a([D.WC,C.fw,A.c(s,p,p,p,p,n==null?p:n.aI(C.a5),p,p,p)],r),C.n,C.f,C.h,p)],r)
w=d.c
if(w.length!==0)C.b.B(m,A.a([C.cu,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(C.k)
n=A.a([],r)
if(!o&&d.gq8()!=="terminee")n.push(A.ai(A.cK(D.W9,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new B.b3U(x,q.c,d),p),1))
if(o){w=A.hG(C.Cd,C.l,p,p,p,p)
n.push(A.ai(A.cK(D.Vz,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new B.b3V(x,q.c,d),w),1))}w=$.X()
if(w.c&&d.f.length!==0)C.b.B(n,A.a([C.P,A.cU(D.WA,A.c(A.b("Copier le lien"),p,p,p,p,p,p,p,p),new B.b3W(d,q.c),p)],r))
if(w.c)C.b.B(n,A.a([C.P,A.bU(p,p,p,D.VJ,p,p,new B.b3X(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.aa(n,C.n,C.f,C.h,p))
return A.dv(new A.a7(C.I,A.V(m,C.p,C.f,C.h),p),p,p,C.aD,p)},
$S:z+4}
B.b3U.prototype={
$0(){return this.a.Bu(this.b,this.c)},
$S:0}
B.b3V.prototype={
$0(){return this.a.Bu(this.b,this.c)},
$S:0}
B.b3W.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:x=2
return A.e(A.v7(new A.oE("https://meet.jit.si/"+v.a.f)),$async$$0)
case 2:u=v.b
if(u.e!=null){t=A.b("Lien de la r\xe9union copi\xe9.")
u.u(y.q).f.K(A.N(null,null,null,null,null,C.i,null,A.c(t,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b3X.prototype={
$0(){return this.a.wx(this.b,this.c)},
$S:0}
B.b4_.prototype={
$0(){return this.a.wr(this.b)},
$S:0}
B.ak8.prototype={
$8(d,e,f,g,h,i,j,k){if(k)return A.bfl(d,e,f,g,h,i,j,0)
else return A.bc(d,e,f,g,h,i,j,0)},
$S:851}
B.ak5.prototype={
$2(d,e){var x=B.bEW(d)
C.d.aq(x)
return new B.Dn(d,x,e)},
$S:z+5}
B.ak6.prototype={
$2(d,e){C.d.aq(d)
return new B.Dm(d,e)},
$S:z+6}
B.ak7.prototype={
$2(d,e){C.d.aq(d)
return new B.Dl(d,e)},
$S:z+7}
B.ber.prototype={
$1(d){return B.bi8(B.bso(d))},
$S:112}
B.bes.prototype={
$1(d){return B.bi8(B.yJ(d))},
$S:112}
B.bet.prototype={
$1(d){return"fallback"},
$S:112};(function installTearOffs(){var x=a._instance_0u,w=a._static_1
x(B.QJ.prototype,"gaDs","qH",3)
w(B,"bKu","bye",8)
w(B,"bLo","yJ",9)
w(B,"bLp","bi8",1)
w(B,"bLq","bso",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.S,[B.kA,B.ak9,B.ni,B.tU,B.a2k,B.YF])
x(A.v9,[B.bcw,B.b3P,B.ak5,B.ak6,B.ak7])
w(B.tm,A.U)
w(B.QJ,A.Z)
x(A.v8,[B.b3B,B.b3C,B.b3D,B.b3I,B.b3H,B.b3G,B.b3F,B.b3E,B.b3O,B.b3R,B.b3S,B.b3U,B.b3V,B.b3W,B.b3X,B.b4_])
x(A.lO,[B.b3Q,B.b3J,B.b3K,B.b3L,B.b3M,B.b3N,B.b3T,B.b40,B.b3Y,B.b3Z,B.b41,B.ak8,B.ber,B.bes,B.bet])
x(B.tU,[B.Dl,B.Dn,B.Dm])})()
A.b82(b.typeUniverse,JSON.parse('{"tm":{"U":[],"h":[]},"QJ":{"Z":["tm"]},"Dl":{"tU":[]},"Dn":{"tU":[]},"Dm":{"tU":[]},"YF":{"bu":[]}}'))
A.bhC(b.typeUniverse,JSON.parse('{"a2k":1}'))
var y=(function rtii(){var x=A.aM
return{c:x("dK<y>"),I:x("D<dK<y>>"),t:x("D<aw<o,@>>"),l:x("D<+debut,nom(b_,o)>"),E:x("D<kA>"),s:x("D<o>"),p:x("D<h>"),T:x("D<tU>"),n:x("D<tU(o,ni)>"),x:x("E<kA>"),j:x("E<@>"),f:x("aw<@,@>"),w:x("kr"),N:x("o"),q:x("ue"),y:x("H"),z:x("@"),S:x("y"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Tb=new A.ae(32,32,32,32)
D.a8L=new A.a7(D.Tb,C.i4,null)
D.NN=new A.hf(C.a1,null,null,D.a8L,null)
D.Ub=new A.aj(59048,!1)
D.Vz=new A.az(D.Ub,null,null,null,null)
D.VJ=new A.az(C.kH,null,C.a5,null,null)
D.W9=new A.az(C.o2,null,null,null,null)
D.UE=new A.aj(61801,!1)
D.WA=new A.az(D.UE,null,null,null,null)
D.UV=new A.aj(62265,!1)
D.WC=new A.az(D.UV,16,C.a5,null,null)
D.a_J=A.a(x(["AM","PM"]),y.s)
D.a_L=A.a(x(["BC","AD"]),y.s)
D.wH=A.a(x(["J","F","M","A","M","J","J","A","S","O","N","D"]),y.s)
D.a0i=A.a(x(["1st quarter","2nd quarter","3rd quarter","4th quarter"]),y.s)
D.wM=A.a(x(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),y.s)
D.a0j=A.a(x(["Before Christ","Anno Domini"]),y.s)
D.a0r=A.a(x(["Q1","Q2","Q3","Q4"]),y.s)
D.wZ=A.a(x(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]),y.s)
D.a7N={d:0,E:1,EEEE:2,LLL:3,LLLL:4,M:5,Md:6,MEd:7,MMM:8,MMMd:9,MMMEd:10,MMMM:11,MMMMd:12,MMMMEEEEd:13,QQQ:14,QQQQ:15,y:16,yM:17,yMd:18,yMEd:19,yMMM:20,yMMMd:21,yMMMEd:22,yMMMM:23,yMMMMd:24,yMMMMEEEEd:25,yQQQ:26,yQQQQ:27,H:28,Hm:29,Hms:30,j:31,jm:32,jms:33,jmv:34,jmz:35,jz:36,m:37,ms:38,s:39,v:40,z:41,zzzz:42,ZZZZ:43}
D.a6w=new A.cs(D.a7N,["d","ccc","cccc","LLL","LLLL","L","M/d","EEE, M/d","LLL","MMM d","EEE, MMM d","LLLL","MMMM d","EEEE, MMMM d","QQQ","QQQQ","y","M/y","M/d/y","EEE, M/d/y","MMM y","MMM d, y","EEE, MMM d, y","MMMM y","MMMM d, y","EEEE, MMMM d, y","QQQ y","QQQQ y","HH","HH:mm","HH:mm:ss","h\u202fa","h:mm\u202fa","h:mm:ss\u202fa","h:mm\u202fa v","h:mm\u202fa z","h\u202fa z","m","mm:ss","s","v","z","zzzz","ZZZZ"],A.aM("cs<o,o>"))})();(function staticFields(){$.bca=null
$.bds=null
$.bqf=null
$.bkI=A.C(y.N,y.y)})();(function lazyInitializers(){var x=a.lazyFinal,w=a.lazy
x($,"bSS","bvR",()=>new B.ak9("en_US",D.a_L,D.a0j,D.wH,D.wH,C.co,C.co,C.iR,C.iR,D.wZ,D.wZ,D.wM,D.wM,C.l5,C.l5,D.a0r,D.a0i,D.a_J))
w($,"bRi","beF",()=>B.boN("initializeDateFormatting(<locale>)",$.bvR()))
w($,"bSP","bjo",()=>B.boN("initializeDateFormatting(<locale>)",D.a6w))
x($,"bSG","bvQ",()=>48)
x($,"bNi","bsG",()=>A.a([A.c0("^'(?:[^']|'')*'",!0,!1),A.c0("^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)",!0,!1),A.c0("^[^'GyMkSEahKHcLQdDmsvzZ]+",!0,!1)],A.aM("D<bnx>")))
x($,"bQq","bun",()=>A.c0("''",!0,!1))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"TpyJPX9HoLOP9K5J7QFweMbJ+CI=");