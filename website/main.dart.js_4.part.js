((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={
blZ(d){var x,w,v,u=J.a4(d),t=u.h(d,"date_debut"),s=J.x(t==null?"":t),r=s.length!==0?A.de(s):null
t=u.h(d,"id")
t=J.x(t==null?"":t)
x=u.h(d,"nom")
x=J.x(x==null?"":x)
w=u.h(d,"description")
w=J.x(w==null?"":w)
v=u.h(d,"heure_debut")
v=J.x(v==null?"":v)
u=u.h(d,"salle_visio")
return new B.kx(t,x,w,r,v,J.x(u==null?"":u))},
EZ(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$EZ=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.aJ().ef("/evenements"),$async$EZ)
case 7:s=a8
r=A.a([],y.E)
for(g=J.aH(s);g.u();){q=g.gM(g)
f=J.p(q,"type")
if(J.x(f==null?"":f)==="reunion")J.cs(r,B.blZ(q))}p=r
J.yV(p,new B.baK())
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
J.cs(n,A.ah(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
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
for(r=J.aH(j),n=y.f,g=y.N,f=y.z;r.u();){h=r.gM(r)
J.cs(i,B.blZ(J.mV(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$EZ,w)},
bJg(){var x,w=$.bh2(),v=J.kg(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yD(31)]
return"cp-"+C.b.DE(v)},
bAS(){return new B.ti(null)},
kx:function kx(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
baK:function baK(){},
ti:function ti(d){this.a=d},
Qx:function Qx(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b1Y:function b1Y(d){this.a=d},
b1Z:function b1Z(d,e){this.a=d
this.b=e},
b2_:function b2_(d){this.a=d},
b26:function b26(d,e,f){this.a=d
this.b=e
this.c=f},
b25:function b25(d,e,f){this.a=d
this.b=e
this.c=f},
b22:function b22(d,e,f){this.a=d
this.b=e
this.c=f},
b21:function b21(d,e){this.a=d
this.b=e},
b23:function b23(d,e,f){this.a=d
this.b=e
this.c=f},
b20:function b20(d,e){this.a=d
this.b=e},
b24:function b24(d){this.a=d},
b29:function b29(){},
b27:function b27(d){this.a=d},
b28:function b28(d){this.a=d},
b2g:function b2g(d){this.a=d},
b2d:function b2d(){},
b2e:function b2e(){},
b2h:function b2h(d,e,f){this.a=d
this.b=e
this.c=f},
b2a:function b2a(d,e,f){this.a=d
this.b=e
this.c=f},
b2b:function b2b(d,e,f){this.a=d
this.b=e
this.c=f},
b2c:function b2c(d,e,f){this.a=d
this.b=e
this.c=f},
b2f:function b2f(d,e){this.a=d
this.b=e},
ajP:function ajP(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var _=this
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
biV(d,e){var x=B.bKV(e,B.bIJ(),null)
x.toString
x=new B.na(new B.ajO(),x)
x.RZ(d)
return x},
bws(d){var x=$.bcT()
x.toString
if(B.yD(d)!=="en_US")x.wM()
return!0},
bwr(){return A.a([new B.ajL(),new B.ajM(),new B.ajN()],y.n)},
bDa(d){var x,w
if(d==="''")return"'"
else{x=C.d.V(d,1,d.length-1)
w=$.bsA()
return A.a3(x,w,"'")}},
na:function na(d,e){var _=this
_.a=d
_.c=e
_.x=_.w=_.f=_.e=_.d=null},
ajO:function ajO(){},
ajL:function ajL(){},
ajM:function ajM(){},
ajN:function ajN(){},
tR:function tR(){},
Dh:function Dh(d,e){this.a=d
this.b=e},
Dj:function Dj(d,e,f){this.d=d
this.a=e
this.b=f},
Di:function Di(d,e){this.a=d
this.b=e},
bn0(d,e){return new B.a28(d,e,A.a([],y.s))},
bpc(d){var x,w=d.length
if(w<3)return-1
x=d[2]
if(x==="-"||x==="_")return 2
if(w<4)return-1
w=d[3]
if(w==="-"||w==="_")return 3
return-1},
yD(d){var x,w,v,u
if(d==null){if(B.bpS()==null)$.bot="en_US"
x=B.bpS()
x.toString
return x}if(d==="C")return"en_ISO"
if(d.length<5)return d
w=B.bpc(d)
if(w===-1)return d
v=C.d.V(d,0,w)
u=C.d.c1(d,w+1)
if(u.length<=3)u=u.toUpperCase()
return v+"_"+u},
bKV(d,e,f){var x,w,v
if(e.$1(d))return d
x=[B.bJE(),B.bJG(),B.bJF(),new B.bcF(),new B.bcG(),new B.bcH()]
for(w=0;w<6;++w){v=x[w].$1(d)
if(e.$1(v))return v}return B.bHu(d)},
bHu(d){throw A.f(A.cb('Invalid locale "'+d+'"',null))},
bgn(d){switch(d){case"iw":return"he"
case"he":return"iw"
case"fil":return"tl"
case"tl":return"fil"
case"id":return"in"
case"in":return"id"
case"no":return"nb"
case"nb":return"no"}return d},
bqB(d){var x,w
if(d==="invalid")return"in"
x=d.length
if(x<2)return d
w=B.bpc(d)
if(w===-1)if(x<4)return d.toLowerCase()
else return d
return C.d.V(d,0,w).toLowerCase()},
a28:function a28(d,e,f){this.a=d
this.b=e
this.c=f},
Yx:function Yx(d){this.a=d},
bcF:function bcF(){},
bcG:function bcG(){},
bcH:function bcH(){},
bbE(d,e){var x=0,w=A.n(y.H)
var $async$bbE=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.yK(A.d1("https://meet.jit.si/"+e,0,null),C.Xl,"_blank"),$async$bbE)
case 2:return A.l(null,w)}})
return A.m($async$bbE,w)},
bpS(){var x=$.bot
return x},
bIK(d,e,f){var x,w
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
B.kx.prototype={
gCG(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.dC(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.dC(x[1],null)
t=w==null?0:w}else t=0
return A.bm(A.bf(s),A.bp(s),A.e3(s),u,t,0,0,0)},
gq5(){var x,w=this.gCG()
if(w==null)return"bientot"
x=new A.aY(Date.now(),0,!1)
if(x.hR(w))return"avenir"
if(x.hR(w.lu(108e8)))return"direct"
return"terminee"}}
B.ti.prototype={
R(){return new B.Qx(A.a([],y.E))}}
B.Qx.prototype={
a4(){this.ah()
this.qC()},
qC(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qC=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.t(new B.b1Y(s))
u=4
x=7
return A.e(B.EZ(),$async$qC)
case 7:r=e
if(s.c==null){x=1
break}s.t(new B.b1Z(s,r))
q=A.a([],y.l)
for(n=J.aH(r);n.u();){p=n.gM(n)
if(p.gCG()!=null&&p.gq5()==="avenir"){m=p.b
l=p.gCG()
l.toString
J.cs(q,new A.a9_(l,m))}}o=q
x=8
return A.e($.kL().rX($.aw,o),$async$qC)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.t(new B.b2_(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qC,w)},
aBX(d){var x,w,v,u=d.d
if(u==null)return A.b("Date \xe0 confirmer")
x=B.biV("d MMM yyyy",$.aw)
w=d.e
if(w.length>=5)w=C.d.V(w,0,5)
v=$.aw==="en"?"at":"\xe0"
return w.length===0?x.yf(u):x.yf(u)+" "+v+" "+w},
Bm(d,e){return this.aCs(d,e)},
aCs(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$Bm=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:p=e.f
if(p.length===0){p=A.b("Salle de r\xe9union non configur\xe9e. Contactez la structure.")
d.v(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}s=A.b("Ouverture de la r\xe9union\u2026")
r=y.q
d.v(r).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(s,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
u=4
s=$.a_().a
s=s==null?null:s.a
x=7
return A.e(B.bbE(s==null?"":s,p),$async$Bm)
case 7:u=2
x=6
break
case 4:u=3
o=t
if(d.e!=null){p=A.b("Impossible d\u2019ouvrir la r\xe9union. V\xe9rifiez votre connexion.")
d.v(r).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Bm,w)},
wn(d){return this.aBG(d)},
aBG(d){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g
var $async$wn=A.j(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:j={}
i=$.aJ()
h=i.b
if(!(h!=null&&h.length!==0)){j=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.v(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}h=$.ai()
l=new A.bv(C.ah,h)
r=new A.bv(C.ah,h)
j.a=j.b=null
x=3
return A.e(A.qt(C.bE,new B.b26(j,l,r),d,!0,C.dW,y.y),$async$wn)
case 3:if(f!==!0||d.e==null){x=1
break}q=C.d.aw(l.a.a)
if(J.a9(q)===0||j.b==null||j.a==null){j=A.b("Le titre, la date et l\u2019heure sont requis.")
d.v(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break}p=B.bJg()
o=C.d.b8(C.e.j(j.a.a),2,"0")
n=C.d.b8(C.e.j(j.a.b),2,"0")
u=5
h=C.d.aw(r.a.a).length===0?null:C.d.aw(r.a.a)
x=8
return A.e(i.aKD(C.d.b8(C.e.j(j.b.gba()),4,"0")+"-"+C.d.b8(C.e.j(j.b.gb5()),2,"0")+"-"+C.d.b8(C.e.j(j.b.gbj()),2,"0"),h,A.q(o)+":"+A.q(n),q,p,"reunion"),$async$wn)
case 8:if(d.e==null){x=1
break}j=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
d.v(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(j,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qC(),$async$wn)
case 9:u=2
x=7
break
case 5:u=4
g=t
m=A.W(g)
if(d.e!=null){j=A.q(m)
d.v(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c("Publication refus\xe9e ("+j+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wn,w)},
wt(d,e){return this.aCY(d,e)},
aCY(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wt=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.e_(null,null,!0,null,new B.b29(),d,null,!0,!0,y.y),$async$wt)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.aJ().acR(e.a,!1),$async$wt)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.v(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c(q,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qC(),$async$wt)
case 9:u=2
x=7
break
case 5:u=4
o=t
r=A.W(o)
if(d.e!=null){q=A.q(r)
d.v(y.q).f.L(A.Q(null,null,null,null,null,C.i,null,A.c("Retrait refus\xe9 ("+q+").",null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wt,w)},
F(d){return A.eH(new B.b2g(this))}}
B.ajP.prototype={
j(d){return this.a}}
B.na.prototype={
yf(d){var x,w,v,u=this,t=u.e
if(t==null){if(u.d==null){u.RZ("yMMMMd")
u.RZ("jms")}t=u.d
t.toString
t=u.a3a(t)
x=A.a1(t).i("cS<1>")
x=u.e=A.P(new A.cS(t,x),!0,x.i("aR.E"))
t=x}x=t.length
w=0
v=""
for(;w<t.length;t.length===x||(0,A.K)(t),++w)v+=t[w].yf(d)
return v.charCodeAt(0)==0?v:v},
Z1(d,e){var x=this.d
this.d=x==null?d:x+e+d},
RZ(d){var x,w,v=this
v.e=null
x=$.bhC()
w=v.c
x.toString
if(!(B.yD(w)==="en_US"?x.b:x.wM()).aL(0,d))v.Z1(d," ")
else{x=$.bhC()
x.toString
v.Z1((B.yD(w)==="en_US"?x.b:x.wM()).h(0,d)," ")}return v},
gix(){var x,w=this.c
if(w!==$.bbG){$.bbG=w
x=$.bcT()
x.toString
$.bao=B.yD(w)==="en_US"?x.b:x.wM()}w=$.bao
w.toString
return w},
gaUb(){var x=this.f
if(x==null){$.biW.h(0,this.c)
x=this.f=!0}return x},
j3(d){var x,w,v,u,t,s,r=this
r.gaUb()
x=r.w
w=$.bu2()
if(x===w)return d
x=d.length
v=A.c3(x,0,!1,y.S)
for(u=r.c,t=0;t<x;++t){s=r.w
if(s==null){s=r.x
if(s==null){s=r.f
if(s==null){$.biW.h(0,u)
s=r.f=!0}if(s){if(u!==$.bbG){$.bbG=u
s=$.bcT()
s.toString
$.bao=B.yD(u)==="en_US"?s.b:s.wM()}$.bao.toString}s=r.x="0"}s=r.w=s.charCodeAt(0)}v[t]=d.charCodeAt(t)+s-w}return A.eW(v,0,null)},
a3a(d){var x,w
if(d.length===0)return A.a([],y.T)
x=this.ayH(d)
if(x==null)return A.a([],y.T)
w=this.a3a(C.d.c1(d,x.a9N().length))
w.push(x)
return w},
ayH(d){var x,w,v,u
for(x=0;w=$.bqT(),x<3;++x){v=w[x].pp(d)
if(v!=null){w=B.bwr()[x]
u=v.b[0]
u.toString
return w.$2(u,this)}}return null}}
B.tR.prototype={
a9N(){return this.a},
j(d){return this.a},
yf(d){return this.a}}
B.Dh.prototype={}
B.Dj.prototype={
a9N(){return this.d}}
B.Di.prototype={
yf(d){return this.aN0(d)},
aN0(d){var x,w,v,u,t,s=this,r="0",q=s.a
switch(q[0]){case"a":x=d.gla()
w=x>=12&&x<24?1:0
return s.b.gix().CW[w]
case"c":return s.aN4(d)
case"d":return s.b.j3(C.d.b8(""+d.gbj(),q.length,r))
case"D":return s.b.j3(C.d.b8(""+B.bIK(d.gb5(),d.gbj(),A.bp(A.bm(d.gba(),2,29,0,0,0,0,0))===2),q.length,r))
case"E":return s.aN_(d)
case"G":v=d.gba()>0?1:0
u=s.b
return q.length>=4?u.gix().c[v]:u.gix().b[v]
case"h":x=d.gla()
if(d.gla()>12)x-=12
return s.b.j3(C.d.b8(""+(x===0?12:x),q.length,r))
case"H":return s.b.j3(C.d.b8(""+d.gla(),q.length,r))
case"K":return s.b.j3(C.d.b8(""+C.e.aq(d.gla(),12),q.length,r))
case"k":return s.b.j3(C.d.b8(""+(d.gla()===0?24:d.gla()),q.length,r))
case"L":return s.aN5(d)
case"M":return s.aN2(d)
case"m":return s.b.j3(C.d.b8(""+d.guR(),q.length,r))
case"Q":return s.aN3(d)
case"S":return s.aN1(d)
case"s":return s.b.j3(C.d.b8(""+d.grY(),q.length,r))
case"y":t=d.gba()
if(t<0)t=-t
q=q.length
u=s.b
return q===2?u.j3(C.d.b8(""+C.e.aq(t,100),2,r)):u.j3(C.d.b8(""+t,q,r))
default:return""}},
aN2(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.gix().d[d.gb5()-1]
case 4:return w.gix().f[d.gb5()-1]
case 3:return w.gix().w[d.gb5()-1]
default:return w.j3(C.d.b8(""+d.gb5(),x,"0"))}},
aN1(d){var x=this.b,w=x.j3(C.d.b8(""+d.gDS(),3,"0")),v=this.a.length-3
if(v>0)return w+x.j3(C.d.b8(""+0,v,"0"))
else return w},
aN4(d){var x=this.b
switch(this.a.length){case 5:return x.gix().ax[C.e.aq(d.gpS(),7)]
case 4:return x.gix().z[C.e.aq(d.gpS(),7)]
case 3:return x.gix().as[C.e.aq(d.gpS(),7)]
default:return x.j3(C.d.b8(""+d.gbj(),1,"0"))}},
aN5(d){var x=this.a.length,w=this.b
switch(x){case 5:return w.gix().e[d.gb5()-1]
case 4:return w.gix().r[d.gb5()-1]
case 3:return w.gix().x[d.gb5()-1]
default:return w.j3(C.d.b8(""+d.gb5(),x,"0"))}},
aN3(d){var x=C.c.E((d.gb5()-1)/3),w=this.a.length,v=this.b
switch(w){case 4:return v.gix().ch[x]
case 3:return v.gix().ay[x]
default:return v.j3(C.d.b8(""+(x+1),w,"0"))}},
aN_(d){var x,w=this,v=w.a.length
$label0$0:{if(v<=3){x=w.b.gix().Q
break $label0$0}if(v===4){x=w.b.gix().y
break $label0$0}if(v===5){x=w.b.gix().at
break $label0$0}if(v>=6)A.aa(A.aN('"Short" weekdays are currently not supported.'))
x=A.aa(A.k5("unreachable"))}return x[C.e.aq(d.gpS(),7)]}}
B.a28.prototype={
h(d,e){return B.yD(e)==="en_US"?this.b:this.wM()},
wM(){throw A.f(new B.Yx("Locale data has not been initialized, call "+this.a+"."))}}
B.Yx.prototype={
j(d){return"LocaleDataException: "+this.a},
$ibt:1}
var z=a.updateTypes(["H(kx)","o(o)","y(kx,kx)","as<~>()","h(kx)","Dj(o,na)","Di(o,na)","Dh(o,na)","H(o?)","o(o?)"])
B.baK.prototype={
$2(d,e){var x=d.gCG(),w=e.gCG()
if(x==null&&w==null)return C.d.bs(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.F7(x,w)},
$S:z+2}
B.b1Y.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
B.b1Z.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
B.b2_.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
B.b26.prototype={
$1(d){return new A.iX(new B.b25(this.a,this.b,this.c),null)},
$S:54}
B.b25.prototype={
$2(d,e){var x,w,v,u,t,s=null,r=y.w,q=A.an(d,s,r).w,p=A.c(A.b("Nouvelle r\xe9union en ligne"),s,s,s,s,A.A(d).p2.r,s,s,s),o=A.b("Titre de la r\xe9union")
o=A.d0(!0,C.y,!1,s,!0,C.i,s,A.d9(),this.b,s,s,s,s,s,2,A.cK(s,new A.c7(4,A.a6(14),C.ao),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,o,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.P,!0,s,!0,s,!1,s,C.ad,s,s,s,s,s,s,s,1,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a8,s,s,C.aa,C.a7,s,s,s,s,s,s,s,C.S,s,C.al,s,s,s,s)
x=A.b("Description (facultatif)")
x=A.d0(!0,C.y,!1,s,!0,C.i,s,A.d9(),this.c,s,s,s,s,s,2,A.cK(s,new A.c7(4,A.a6(14),C.ao),s,s,s,s,s,s,!0,s,s,s,s,s,s,C.l,!0,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,s,x,!0,s,s,s,s,s,s,s,s,s,s,s,s,s),C.P,!0,s,!0,s,!1,s,C.ad,s,s,s,s,s,s,s,3,s,s,!1,"\u2022",s,s,s,s,s,!1,s,!1,s,!0,s,C.a8,s,s,C.aa,C.a7,s,s,s,s,s,s,s,C.S,s,C.al,s,s,s,s)
w=this.a
if(w.b==null)v=A.b("Date")
else{v=B.biV("d MMM yyyy",$.aw)
u=w.b
u.toString
u=v.yf(u)
v=u}v=A.at(A.d_(D.Vi,A.c(v,s,s,s,s,s,s,s,s),new B.b22(w,d,e),s),1)
u=w.a
if(u==null)r=A.b("Heure")
else{t=A.bK(d,C.U,y.v)
t.toString
A.an(d,C.d8,r).toString
u=t.a9J(u,!1)
r=u}u=y.p
return new A.ab(new A.ad(16,16,16,q.f.d+16),A.eC(A.Z(A.a([p,C.u,o,C.k,x,C.k,A.ac(A.a([v,C.Z,A.at(A.d_(D.VF,A.c(r,s,s,s,s,s,s,s,s),new B.b23(w,d,e),s),1)],u),C.o,C.f,C.h,s),C.u,A.ag(A.bW(!1,A.c(A.b("Publier"),s,s,s,s,s,s,s,s),C.j,s,C.q,s,s,s,s,new B.b24(d),s,s),52,1/0)],u),C.p,C.f,C.a1),s,s,s,C.a6),s)},
$S:95}
B.b22.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.b
if(s==null)s=new A.aY(Date.now(),0,!1)
x=2
return A.e(A.Tq(null,null,null,v.b,new A.aY(Date.now(),0,!1).lu(-864e8),null,s,new A.aY(Date.now(),0,!1).lu(31536e9)),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b21(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b21.prototype={
$0(){return this.a.b=this.b},
$S:0}
B.b23.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t,s
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:t=v.a
s=t.a
if(s==null){s=new A.aY(Date.now(),0,!1)
s=new A.c1(A.pr(s),A.ps(s))}x=2
return A.e(A.bcw(null,null,null,v.b,null,s),$async$$0)
case 2:u=e
if(u!=null)v.c.$1(new B.b20(t,u))
return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
B.b20.prototype={
$0(){return this.a.a=this.b},
$S:0}
B.b24.prototype={
$0(){return A.aX(this.a,!1).be(!0)},
$S:0}
B.b29.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.ei(A.a([A.cg(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,C.q,x,x,x,x,new B.b27(d),x,x),A.cg(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,C.q,x,x,x,x,new B.b28(d),x,x)],y.p),v,w)},
$S:13}
B.b27.prototype={
$0(){return A.aX(this.a,!1).be(!1)},
$S:0}
B.b28.prototype={
$0(){return A.aX(this.a,!1).be(!0)},
$S:0}
B.b2g.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.jj(l.d,new B.b2d()),j=A.P(k,!0,k.$ti.i("t.E"))
k=J.jj(l.d,new B.b2e())
x=A.P(k,!0,k.$ti.i("t.E"))
w=new B.b2h(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.bqk(v,u,t,$.a_().c?A.bbe(C.ip,A.b("Planifier"),new B.b2f(l,d)):o),C.u],s)
if(l.e)t.push(D.Nx)
else if(l.f!=null)t.push(A.ds(new A.ab(C.N,A.Z(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),C.k,A.cR(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,C.q,o,o,o,o,l.gaD0(),o,o)],s),C.o,C.f,C.h),o),o,o,o,o))
else if(J.cH(l.d))t.push(A.ds(new A.ab(C.N,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([C.k,A.c(q,o,o,o,o,p==null?o:p.bQ(C.ak,C.z),o,o,o),C.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
C.b.B(v,s)}C.b.B(t,v)}l.a.toString
return A.c5(k,t,o,o)},
$S:8}
B.b2d.prototype={
$1(d){return d.gq5()==="avenir"||d.gq5()==="direct"||d.gq5()==="bientot"},
$S:z+0}
B.b2e.prototype={
$1(d){return d.gq5()==="terminee"},
$S:z+0}
B.b2h.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gq5()==="direct",n=q.b,m=n.w
m=m==null?p:m.bQ(C.t,C.B)
m=A.at(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gq5()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=C.C_
else t=x==="avenir"?C.w:C.ak
x=t.e1(0.12)
w=A.a6(20)
u=A.af(p,p,C.j,p,p,new A.ax(t,p,p,p,p,p,C.bA),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.ac(A.a([m,A.af(p,A.ac(A.a([u,C.fq,A.c(v,p,p,p,p,s==null?p:s.bQ(t,C.B),p,p,p)],r),C.o,C.f,C.a1,p),C.j,p,p,new A.ax(x,p,p,w,p,p,C.x),p,p,p,p,C.fQ,p,p,p)],r),C.o,C.f,C.h,p)
x=q.a
s=x.aBX(d)
n=n.z
m=A.a([w,C.a_,A.ac(A.a([D.Wc,C.fq,A.c(s,p,p,p,p,n==null?p:n.aV(C.ak),p,p,p)],r),C.o,C.f,C.h,p)],r)
w=d.c
if(w.length!==0)C.b.B(m,A.a([C.cs,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(C.k)
n=A.a([],r)
if(!o&&d.gq5()!=="terminee")n.push(A.at(A.cJ(D.VN,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new B.b2a(x,q.c,d),p),1))
if(o){w=A.hD(C.C_,C.l,p,p,p,p)
n.push(A.at(A.cJ(D.Ve,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new B.b2b(x,q.c,d),w),1))}if($.a_().c)C.b.B(n,A.a([C.Z,A.c_(p,p,p,D.Vo,p,p,new B.b2c(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.ac(n,C.o,C.f,C.h,p))
return A.ds(new A.ab(C.N,A.Z(m,C.p,C.f,C.h),p),p,p,C.bs,p)},
$S:z+4}
B.b2a.prototype={
$0(){return this.a.Bm(this.b,this.c)},
$S:0}
B.b2b.prototype={
$0(){return this.a.Bm(this.b,this.c)},
$S:0}
B.b2c.prototype={
$0(){return this.a.wt(this.b,this.c)},
$S:0}
B.b2f.prototype={
$0(){return this.a.wn(this.b)},
$S:0}
B.ajO.prototype={
$8(d,e,f,g,h,i,j,k){if(k)return A.bdy(d,e,f,g,h,i,j,0)
else return A.bm(d,e,f,g,h,i,j,0)},
$S:845}
B.ajL.prototype={
$2(d,e){var x=B.bDa(d)
C.d.aw(x)
return new B.Dj(d,x,e)},
$S:z+5}
B.ajM.prototype={
$2(d,e){C.d.aw(d)
return new B.Di(d,e)},
$S:z+6}
B.ajN.prototype={
$2(d,e){C.d.aw(d)
return new B.Dh(d,e)},
$S:z+7}
B.bcF.prototype={
$1(d){return B.bgn(B.bqB(d))},
$S:121}
B.bcG.prototype={
$1(d){return B.bgn(B.yD(d))},
$S:121}
B.bcH.prototype={
$1(d){return"fallback"},
$S:121};(function installTearOffs(){var x=a._instance_0u,w=a._static_1
x(B.Qx.prototype,"gaD0","qC",3)
w(B,"bIJ","bws",8)
w(B,"bJE","yD",9)
w(B,"bJF","bgn",1)
w(B,"bJG","bqB",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.S,[B.kx,B.ajP,B.na,B.tR,B.a28,B.Yx])
x(A.v4,[B.baK,B.b25,B.ajL,B.ajM,B.ajN])
w(B.ti,A.U)
w(B.Qx,A.Y)
x(A.v3,[B.b1Y,B.b1Z,B.b2_,B.b22,B.b21,B.b23,B.b20,B.b24,B.b27,B.b28,B.b2a,B.b2b,B.b2c,B.b2f])
x(A.lK,[B.b26,B.b29,B.b2g,B.b2d,B.b2e,B.b2h,B.ajO,B.bcF,B.bcG,B.bcH])
x(B.tR,[B.Dh,B.Dj,B.Di])})()
A.b6i(b.typeUniverse,JSON.parse('{"ti":{"U":[],"h":[]},"Qx":{"Y":["ti"]},"Dh":{"tR":[]},"Dj":{"tR":[]},"Di":{"tR":[]},"Yx":{"bt":[]}}'))
A.bfR(b.typeUniverse,JSON.parse('{"a28":1}'))
var y=(function rtii(){var x=A.aK
return{t:x("D<au<o,@>>"),l:x("D<+debut,nom(aY,o)>"),E:x("D<kx>"),s:x("D<o>"),p:x("D<h>"),T:x("D<tR>"),n:x("D<tR(o,na)>"),x:x("E<kx>"),j:x("E<@>"),f:x("au<@,@>"),v:x("rE"),w:x("ko"),N:x("o"),q:x("ub"),y:x("H"),z:x("@"),S:x("y"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.SU=new A.ad(32,32,32,32)
D.a8h=new A.ab(D.SU,C.hX,null)
D.Nx=new A.i1(C.a2,null,null,D.a8h,null)
D.TU=new A.aj(59048,!1)
D.Ve=new A.aC(D.TU,null,null,null,null)
D.Vi=new A.aC(C.nI,null,null,null,null)
D.Vo=new A.aC(C.nE,null,C.ak,null,null)
D.vo=new A.aj(62265,!1)
D.VF=new A.aC(D.vo,null,null,null,null)
D.VN=new A.aC(C.vs,null,null,null,null)
D.Wc=new A.aC(D.vo,16,C.ak,null,null)
D.a_h=A.a(x(["AM","PM"]),y.s)
D.a_j=A.a(x(["BC","AD"]),y.s)
D.ws=A.a(x(["J","F","M","A","M","J","J","A","S","O","N","D"]),y.s)
D.a_R=A.a(x(["1st quarter","2nd quarter","3rd quarter","4th quarter"]),y.s)
D.wx=A.a(x(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),y.s)
D.a_S=A.a(x(["Before Christ","Anno Domini"]),y.s)
D.a0_=A.a(x(["Q1","Q2","Q3","Q4"]),y.s)
D.wL=A.a(x(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]),y.s)
D.a7i={d:0,E:1,EEEE:2,LLL:3,LLLL:4,M:5,Md:6,MEd:7,MMM:8,MMMd:9,MMMEd:10,MMMM:11,MMMMd:12,MMMMEEEEd:13,QQQ:14,QQQQ:15,y:16,yM:17,yMd:18,yMEd:19,yMMM:20,yMMMd:21,yMMMEd:22,yMMMM:23,yMMMMd:24,yMMMMEEEEd:25,yQQQ:26,yQQQQ:27,H:28,Hm:29,Hms:30,j:31,jm:32,jms:33,jmv:34,jmz:35,jz:36,m:37,ms:38,s:39,v:40,z:41,zzzz:42,ZZZZ:43}
D.a62=new A.cp(D.a7i,["d","ccc","cccc","LLL","LLLL","L","M/d","EEE, M/d","LLL","MMM d","EEE, MMM d","LLLL","MMMM d","EEEE, MMMM d","QQQ","QQQQ","y","M/y","M/d/y","EEE, M/d/y","MMM y","MMM d, y","EEE, MMM d, y","MMMM y","MMMM d, y","EEEE, MMMM d, y","QQQ y","QQQQ y","HH","HH:mm","HH:mm:ss","h\u202fa","h:mm\u202fa","h:mm:ss\u202fa","h:mm\u202fa v","h:mm\u202fa z","h\u202fa z","m","mm:ss","s","v","z","zzzz","ZZZZ"],A.aK("cp<o,o>"))})();(function staticFields(){$.bao=null
$.bbG=null
$.bot=null
$.biW=A.C(y.N,y.y)})();(function lazyInitializers(){var x=a.lazyFinal,w=a.lazy
x($,"bR7","bu3",()=>new B.ajP("en_US",D.a_j,D.a_S,D.ws,D.ws,C.cW,C.cW,C.iI,C.iI,D.wL,D.wL,D.wx,D.wx,C.kV,C.kV,D.a0_,D.a_R,D.a_h))
w($,"bPy","bcT",()=>B.bn0("initializeDateFormatting(<locale>)",$.bu3()))
w($,"bR4","bhC",()=>B.bn0("initializeDateFormatting(<locale>)",D.a62))
x($,"bQW","bu2",()=>48)
x($,"bLy","bqT",()=>A.a([A.c0("^'(?:[^']|'')*'",!0,!1),A.c0("^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)",!0,!1),A.c0("^[^'GyMkSEahKHcLQdDmsvzZ]+",!0,!1)],A.aK("D<blL>")))
x($,"bOG","bsA",()=>A.c0("''",!0,!1))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"jSqP2jqqDz+gqDXGCYi2pHAkWmQ=");