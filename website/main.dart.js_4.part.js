((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
bnp(d){var x,w,v,u=J.a3(d),t=u.h(d,"date_debut"),s=J.x(t==null?"":t),r=s.length!==0?A.d8(s):null
t=u.h(d,"id")
t=J.x(t==null?"":t)
x=u.h(d,"nom")
x=J.x(x==null?"":x)
w=u.h(d,"description")
w=J.x(w==null?"":w)
v=u.h(d,"heure_debut")
v=J.x(v==null?"":v)
u=u.h(d,"salle_visio")
return new C.kx(t,x,w,r,v,J.x(u==null?"":u))},
EX(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$EX=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.ay().e0("/evenements"),$async$EX)
case 7:s=a8
r=A.a([],y.E)
for(g=J.aE(s);g.v();){q=g.gM(g)
f=J.p(q,"type")
if(J.x(f==null?"":f)==="reunion")J.cq(r,C.bnp(q))}p=r
J.yY(p,new C.bcg())
x=8
return A.e(A.dr(),$async$EX)
case 8:o=a8
n=A.a([],y.t)
for(r=p,g=r.length,f=y.N,e=y.z,d=0;d<r.length;r.length===g||(0,A.K)(r),++d){m=r[d]
a0=m
a1=a0.a
a2=a0.b
a3=a0.c
a4=a0.d
a4=a4==null?"":B.d.bm(B.e.j(A.b_(a4)),4,"0")+"-"+B.d.bm(B.e.j(A.bf(a4)),2,"0")+"-"+B.d.bm(B.e.j(A.dk(a4)),2,"0")
J.cq(n,A.ak(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
return A.e(o.da("String","reunions_cache_v1",B.aa.hs(n,null)),$async$EX)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dr(),$async$EX)
case 10:o=a8
l=o
k=A.aU(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.a9(k)===0)throw a6
j=y.j.a(B.aa.eE(0,k,null))
i=A.a([],y.E)
for(r=J.aE(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gM(r)
J.cq(i,C.bnp(J.mZ(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$EX,w)},
bKt(){var x,w=$.biv(),v=J.kh(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yF(31)]
return"cp-"+B.b.DK(v)},
bC7(){return new C.tl(null)},
kx:function kx(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
bcg:function bcg(){},
tl:function tl(d){this.a=d},
QE:function QE(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b3y:function b3y(d){this.a=d},
b3z:function b3z(d,e){this.a=d
this.b=e},
b3A:function b3A(d){this.a=d},
b3B:function b3B(){},
b3E:function b3E(){},
b3C:function b3C(d){this.a=d},
b3D:function b3D(d){this.a=d},
b3M:function b3M(d){this.a=d},
b3J:function b3J(){},
b3K:function b3K(){},
b3N:function b3N(d,e,f){this.a=d
this.b=e
this.c=f},
b3F:function b3F(d,e,f){this.a=d
this.b=e
this.c=f},
b3G:function b3G(d,e,f){this.a=d
this.b=e
this.c=f},
b3H:function b3H(d,e){this.a=d
this.b=e},
b3I:function b3I(d,e,f){this.a=d
this.b=e
this.c=f},
b3L:function b3L(d,e){this.a=d
this.b=e},
ym:function ym(d){this.a=d},
PQ:function PQ(d,e){var _=this
_.d=d
_.e=e
_.z=_.y=_.x=_.w=_.r=_.f=null
_.Q=!1
_.c=_.a=null},
b_O:function b_O(d){this.a=d},
b_P:function b_P(d){this.a=d},
b_V:function b_V(d){this.a=d},
b_U:function b_U(d,e){this.a=d
this.b=e},
b_W:function b_W(d){this.a=d},
b_T:function b_T(d,e){this.a=d
this.b=e},
b_X:function b_X(d){this.a=d},
b_S:function b_S(d,e){this.a=d
this.b=e},
b_Y:function b_Y(d){this.a=d},
b_R:function b_R(d,e){this.a=d
this.b=e},
b_Z:function b_Z(d){this.a=d},
b_Q:function b_Q(d,e){this.a=d
this.b=e},
bda(d,e){var x=0,w=A.n(y.H)
var $async$bda=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.yO(A.d0("https://meet.jit.si/"+e,0,null),B.XM,"_blank"),$async$bda)
case 2:return A.l(null,w)}})
return A.m($async$bda,w)}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[3],C)
D=c[9]
C.kx.prototype={
gCN(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.dw(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.dw(x[1],null)
t=w==null?0:w}else t=0
return A.bi(A.b_(s),A.bf(s),A.dk(s),u,t,0,0,0)},
gq5(){var x,w=this.gCN()
if(w==null)return"bientot"
x=new A.b0(Date.now(),0,!1)
if(x.hv(w))return"avenir"
if(x.hv(w.ms(108e8)))return"direct"
return"terminee"}}
C.tl.prototype={
R(){return new C.QE(A.a([],y.E))}}
C.QE.prototype={
a2(){this.ac()
this.qE()},
qE(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qE=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.q(new C.b3y(s))
u=4
x=7
return A.e(C.EX(),$async$qE)
case 7:r=e
if(s.c==null){x=1
break}s.q(new C.b3z(s,r))
q=A.a([],y.l)
for(n=J.aE(r);n.v();){p=n.gM(n)
if(p.gCN()!=null&&p.gq5()==="avenir"){m=p.b
l=p.gCN()
l.toString
J.cq(q,new A.a96(l,m))}}o=q
x=8
return A.e($.kM().t0($.an,o),$async$qE)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.q(new C.b3A(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qE,w)},
aCi(d){var x,w,v,u,t,s=d.d
if(s==null)return A.b("Date \xe0 confirmer")
x=$.an==="en"
w=x?B.l3:D.a__
v=""+A.dk(s)+" "+w[A.bf(s)-1]+" "+A.b_(s)
u=d.e
if(u.length>=5)u=B.d.W(u,0,5)
t=x?"at":"\xe0"
return u.length===0?v:v+" "+t+" "+u},
Bq(d,e){return this.aCO(d,e)},
aCO(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$Bq=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:p=e.f
if(p.length===0){p=A.b("Salle de r\xe9union non configur\xe9e. Contactez la structure.")
d.u(y.q).f.K(A.N(null,null,null,null,null,B.i,null,A.c(p,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}s=A.b("Ouverture de la r\xe9union\u2026")
r=y.q
d.u(r).f.K(A.N(null,null,null,null,null,B.i,null,A.c(s,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
u=4
s=$.X().a
s=s==null?null:s.a
x=7
return A.e(C.bda(s==null?"":s,p),$async$Bq)
case 7:u=2
x=6
break
case 4:u=3
o=t
if(d.e!=null){p=A.b("Impossible d\u2019ouvrir la r\xe9union. V\xe9rifiez votre connexion.")
d.u(r).f.K(A.N(null,null,null,null,null,B.i,null,A.c(p,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Bq,w)},
Bk(d){return this.aC0(d)},
aC0(d){var x=0,w=A.n(y.H),v,u=this,t
var $async$Bk=A.j(function(e,f){if(e===1)return A.k(f,w)
while(true)switch(x){case 0:t=$.ay().b
if(!(t!=null&&t.length!==0)){t=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.u(y.q).f.K(A.N(null,null,null,null,null,B.i,null,A.c(t,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}x=3
return A.e(A.aR(d,!1).jY(A.nv(new C.b3B(),null,y.y)),$async$Bk)
case 3:if(f!==!0||d.e==null){x=1
break}x=4
return A.e(u.qE(),$async$Bk)
case 4:case 1:return A.l(v,w)}})
return A.m($async$Bk,w)},
wv(d,e){return this.aDj(d,e)},
aDj(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wv=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.dJ(null,null,!0,null,new C.b3E(),d,null,!0,!0,y.y),$async$wv)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.ay().ada(e.a,!1),$async$wv)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.u(y.q).f.K(A.N(null,null,null,null,null,B.i,null,A.c(q,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qE(),$async$wv)
case 9:u=2
x=7
break
case 5:u=4
o=t
r=A.W(o)
if(d.e!=null){q=A.q(r)
d.u(y.q).f.K(A.N(null,null,null,null,null,B.i,null,A.c("Retrait refus\xe9 ("+q+").",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wv,w)},
E(d){return A.ea(new C.b3M(this))}}
C.ym.prototype={
R(){var x=$.ag()
return new C.PQ(new A.bo(B.ag,x),new A.bo(B.ag,x))}}
C.PQ.prototype={
m(){var x=this.d,w=$.ag()
x.go$=w
x.fy$=0
x=this.e
x.go$=w
x.fy$=0
this.ae()},
Qa(){var x,w,v,u,t=this
if(t.r!=null&&t.w!=null&&t.x!=null){x=t.x
x.toString
w=t.w
w.toString
v=A.dk(A.bi(x,w+1,0,0,0,0,0,0))
x=t.r
x.toString
if(x>v){t.r=v
x=v}w=t.x
w.toString
u=t.w
u.toString
t.f=A.bi(w,u,x,0,0,0,0,0)}},
Il(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$Il=A.j(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.Q){x=1
break}r=B.d.ar(s.d.a.a)
m=s.y
if(m!=null&&s.z!=null){m.toString
l=s.z
l.toString
k=new A.c7(m,l)}else k=null
j=A.bi(A.b_(new A.b0(Date.now(),0,!1)),A.bf(new A.b0(Date.now(),0,!1)),A.dk(new A.b0(Date.now(),0,!1)),0,0,0,0,0)
if(J.a9(r)!==0){m=s.f
m=m==null||k==null||m.hv(j)}else m=!0
if(m){m=s.c
m.toString
l=A.b("Le titre, la date et l\u2019heure sont requis.")
m.u(y.q).f.K(A.N(null,null,null,null,null,B.i,null,A.c(l,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}s.q(new C.b_O(s))
q=C.bKt()
p=B.d.bm(B.e.j(k.a),2,"0")
o=B.d.bm(B.e.j(k.b),2,"0")
u=4
m=$.ay()
l=B.d.ar(s.e.a.a)
if(l.length===0)l=null
i=s.f
i.toString
i=B.d.bm(B.e.j(A.b_(i)),4,"0")
h=s.f
h.toString
h=B.d.bm(B.e.j(A.bf(h)),2,"0")
g=s.f
g.toString
x=7
return A.e(m.aL3(i+"-"+h+"-"+B.d.bm(B.e.j(A.dk(g)),2,"0"),l,A.q(p)+":"+A.q(o),r,q,"reunion"),$async$Il)
case 7:m=s.c
if(m==null){x=1
break}l=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
m.u(y.q).f.K(A.N(null,null,null,null,null,B.i,null,A.c(l,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
l=s.c
l.toString
A.aR(l,!1).b7(!0)
u=2
x=6
break
case 4:u=3
e=t
n=A.W(e)
m=s.c
if(m!=null){l=A.q(n)
m.u(y.q).f.K(A.N(null,null,null,null,null,B.i,null,A.c("Publication refus\xe9e ("+l+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
s.q(new C.b_P(s))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Il,w)},
E(d){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=A.jm(h,h,h,h,h,h,h,h,h,h,A.c(A.b("Nouvelle r\xe9union en ligne"),h,h,h,h,h,h,h,h),h,h),f=A.b("Titre de la r\xe9union")
f=A.cI(!0,B.y,!1,h,!0,B.i,h,A.cM(),i.d,h,h,h,h,h,2,A.cl(h,new A.bS(4,A.a2(14),B.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,f,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),B.N,!0,h,!0,h,!1,h,B.a8,h,h,h,h,h,h,h,1,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,B.a6,h,h,B.a7,B.a4,h,h,h,h,h,h,h,B.Q,h,B.ac,h,h,h,h)
x=A.b("Description (facultatif)")
x=A.cI(!0,B.y,!1,h,!0,B.i,h,A.cM(),i.e,h,h,h,h,h,2,A.cl(h,new A.bS(4,A.a2(14),B.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,x,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),B.N,!0,h,!0,h,!1,h,B.a8,h,h,h,h,h,h,h,3,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,B.a6,h,h,B.a7,B.a4,h,h,h,h,h,h,h,B.Q,h,B.ac,h,h,h,h)
w=i.r
v=A.b("Jour")
v=A.cl(h,new A.bS(4,A.a2(14),B.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,v,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=y.I
t=A.a([],u)
for(s=y.c,r=1;r<=31;++r)t.push(new A.dL(r,A.c(""+r,h,h,h,h,h,h,h,h),B.b4,h,s))
q=y.S
w=A.ai(A.i9(v,h,h,!0,t,new C.b_V(i),h,w,q),1)
t=i.w
v=A.b("Mois")
v=A.cl(h,new A.bS(4,A.a2(14),B.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,v,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
p=A.a([],u)
for(o=1;o<=12;++o){n=$.an==="en"?B.cJ:B.iT
p.push(new A.dL(o,A.c(n[o-1],h,h,h,h,h,h,h,h),B.b4,h,s))}v=A.ai(A.i9(v,h,h,!0,p,new C.b_W(i),h,t,q),2)
t=i.x
p=A.b("Ann\xe9e")
p=A.cl(h,new A.bS(4,A.a2(14),B.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
n=A.a([],u)
for(m=A.b_(new A.b0(Date.now(),0,!1));m<=A.b_(new A.b0(Date.now(),0,!1))+1;++m)n.push(new A.dL(m,A.c(""+m,h,h,h,h,h,h,h,h),B.b4,h,s))
l=y.p
t=A.aa(A.a([w,B.P,v,B.P,A.ai(A.i9(p,h,h,!0,n,new C.b_X(i),h,t,q),1)],l),B.n,B.f,B.h,h)
n=i.y
p=A.b("Heure")
p=A.cl(h,new A.bS(4,A.a2(14),B.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
v=A.a([],u)
for(k=0;k<24;++k)v.push(new A.dL(k,A.c(B.d.bm(B.e.j(k),2,"0"),h,h,h,h,h,h,h,h),B.b4,h,s))
w=A.ai(A.i9(p,h,h,!0,v,new C.b_Y(i),h,n,q),1)
v=i.z
p=A.b("Minutes")
p=A.cl(h,new A.bS(4,A.a2(14),B.ah),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.l,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=A.a([],u)
for(n=[0,15,30,45],j=0;j<4;++j){o=n[j]
u.push(new A.dL(o,A.c(B.d.bm(B.e.j(o),2,"0"),h,h,h,h,h,h,h,h),B.b4,h,s))}w=A.aa(A.a([w,B.P,A.ai(A.i9(p,h,h,!0,u,new C.b_Z(i),h,v,q),1)],l),B.n,B.f,B.h,h)
v=i.Q?h:i.gaDo()
return A.hq(g,h,A.eD(new A.a7(B.I,A.V(A.a([f,B.k,x,B.k,t,B.k,w,B.t,A.af(A.bN(!1,A.c(A.b("Publier"),h,h,h,h,h,h,h,h),B.j,h,B.r,h,h,h,h,v,h,h),52,1/0)],l),B.p,B.f,B.h),h),h,h,h,B.ab),h)}}
var z=a.updateTypes(["av<~>()","H(kx)","z(kx,kx)","ym(R)","h(kx)"])
C.bcg.prototype={
$2(d,e){var x=d.gCN(),w=e.gCN()
if(x==null&&w==null)return B.d.bs(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.F6(x,w)},
$S:z+2}
C.b3y.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
C.b3z.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
C.b3A.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
C.b3B.prototype={
$1(d){return D.anA},
$S:z+3}
C.b3E.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.dZ(A.a([A.cc(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,B.r,x,x,x,x,new C.b3C(d),x,x),A.cc(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,B.r,x,x,x,x,new C.b3D(d),x,x)],y.p),v,w)},
$S:12}
C.b3C.prototype={
$0(){return A.aR(this.a,!1).b7(!1)},
$S:0}
C.b3D.prototype={
$0(){return A.aR(this.a,!1).b7(!0)},
$S:0}
C.b3M.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.jk(l.d,new C.b3J()),j=A.P(k,!0,k.$ti.i("t.E"))
k=J.jk(l.d,new C.b3K())
x=A.P(k,!0,k.$ti.i("t.E"))
w=new C.b3N(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.brL(v,u,t,$.X().c?A.bcL(B.iy,A.b("Planifier"),new C.b3L(l,d)):o),B.t],s)
if(l.e)t.push(D.NK)
else if(l.f!=null)t.push(A.dv(new A.a7(B.I,A.V(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),B.k,A.cR(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,B.r,o,o,o,o,l.gaDn(),o,o)],s),B.n,B.f,B.h),o),o,o,o,o))
else if(J.cz(l.d))t.push(A.dv(new A.a7(B.I,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([B.k,A.c(q,o,o,o,o,p==null?o:p.by(B.a5,B.z),o,o,o),B.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
B.b.B(v,s)}B.b.B(t,v)}l.a.toString
return A.bK(k,t,o,o)},
$S:4}
C.b3J.prototype={
$1(d){return d.gq5()==="avenir"||d.gq5()==="direct"||d.gq5()==="bientot"},
$S:z+1}
C.b3K.prototype={
$1(d){return d.gq5()==="terminee"},
$S:z+1}
C.b3N.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gq5()==="direct",n=q.b,m=n.w
m=m==null?p:m.by(B.q,B.A)
m=A.ai(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gq5()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=B.Ca
else t=x==="avenir"?B.v:B.a5
x=t.dO(0.12)
w=A.a2(20)
u=A.ac(p,p,B.j,p,p,new A.am(t,p,p,p,p,p,B.bB),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.aa(A.a([m,A.ac(p,A.aa(A.a([u,B.fw,A.c(v,p,p,p,p,s==null?p:s.by(t,B.A),p,p,p)],r),B.n,B.f,B.a3,p),B.j,p,p,new A.am(x,p,p,w,p,p,B.x),p,p,p,p,B.fW,p,p,p)],r),B.n,B.f,B.h,p)
x=q.a
s=x.aCi(d)
n=n.z
m=A.a([w,B.a_,A.aa(A.a([D.WC,B.fw,A.c(s,p,p,p,p,n==null?p:n.aJ(B.a5),p,p,p)],r),B.n,B.f,B.h,p)],r)
w=d.c
if(w.length!==0)B.b.B(m,A.a([B.ct,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(B.k)
n=A.a([],r)
if(!o&&d.gq5()!=="terminee")n.push(A.ai(A.cK(D.W9,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new C.b3F(x,q.c,d),p),1))
if(o){w=A.hH(B.Ca,B.l,p,p,p,p)
n.push(A.ai(A.cK(D.Vz,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new C.b3G(x,q.c,d),w),1))}w=$.X()
if(w.c&&d.f.length!==0)B.b.B(n,A.a([B.P,A.cU(D.WA,A.c(A.b("Copier le lien"),p,p,p,p,p,p,p,p),new C.b3H(d,q.c),p)],r))
if(w.c)B.b.B(n,A.a([B.P,A.bU(p,p,p,D.VJ,p,p,new C.b3I(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.aa(n,B.n,B.f,B.h,p))
return A.dv(new A.a7(B.I,A.V(m,B.p,B.f,B.h),p),p,p,B.aD,p)},
$S:z+4}
C.b3F.prototype={
$0(){return this.a.Bq(this.b,this.c)},
$S:0}
C.b3G.prototype={
$0(){return this.a.Bq(this.b,this.c)},
$S:0}
C.b3H.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:x=2
return A.e(A.v5(new A.oD("https://meet.jit.si/"+v.a.f)),$async$$0)
case 2:u=v.b
if(u.e!=null){t=A.b("Lien de la r\xe9union copi\xe9.")
u.u(y.q).f.K(A.N(null,null,null,null,null,B.i,null,A.c(t,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
C.b3I.prototype={
$0(){return this.a.wv(this.b,this.c)},
$S:0}
C.b3L.prototype={
$0(){return this.a.Bk(this.b)},
$S:0}
C.b_O.prototype={
$0(){return this.a.Q=!0},
$S:0}
C.b_P.prototype={
$0(){return this.a.Q=!1},
$S:0}
C.b_V.prototype={
$1(d){var x=this.a
return x.q(new C.b_U(x,d))},
$S:59}
C.b_U.prototype={
$0(){var x=this.a
x.r=this.b
x.Qa()},
$S:0}
C.b_W.prototype={
$1(d){var x=this.a
return x.q(new C.b_T(x,d))},
$S:59}
C.b_T.prototype={
$0(){var x=this.a
x.w=this.b
x.Qa()},
$S:0}
C.b_X.prototype={
$1(d){var x=this.a
return x.q(new C.b_S(x,d))},
$S:59}
C.b_S.prototype={
$0(){var x=this.a
x.x=this.b
x.Qa()},
$S:0}
C.b_Y.prototype={
$1(d){var x=this.a
return x.q(new C.b_R(x,d))},
$S:59}
C.b_R.prototype={
$0(){return this.a.y=this.b},
$S:0}
C.b_Z.prototype={
$1(d){var x=this.a
return x.q(new C.b_Q(x,d))},
$S:59}
C.b_Q.prototype={
$0(){return this.a.z=this.b},
$S:0};(function installTearOffs(){var x=a._instance_0u
x(C.QE.prototype,"gaDn","qE",0)
x(C.PQ.prototype,"gaDo","Il",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.kx,A.S)
x(C.bcg,A.v7)
w(A.U,[C.tl,C.ym])
w(A.Z,[C.QE,C.PQ])
w(A.v6,[C.b3y,C.b3z,C.b3A,C.b3C,C.b3D,C.b3F,C.b3G,C.b3H,C.b3I,C.b3L,C.b_O,C.b_P,C.b_U,C.b_T,C.b_S,C.b_R,C.b_Q])
w(A.lN,[C.b3B,C.b3E,C.b3M,C.b3J,C.b3K,C.b3N,C.b_V,C.b_W,C.b_X,C.b_Y,C.b_Z])})()
A.b7O(b.typeUniverse,JSON.parse('{"ym":{"U":[],"h":[]},"tl":{"U":[],"h":[]},"QE":{"Z":["tl"]},"PQ":{"Z":["ym"]}}'))
var y=(function rtii(){var x=A.aM
return{c:x("dL<z>"),I:x("D<dL<z>>"),t:x("D<aw<o,@>>"),l:x("D<+debut,nom(b0,o)>"),E:x("D<kx>"),p:x("D<h>"),x:x("E<kx>"),j:x("E<@>"),f:x("aw<@,@>"),N:x("o"),q:x("uc"),y:x("H"),z:x("@"),S:x("z"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.T8=new A.ae(32,32,32,32)
D.a8F=new A.a7(D.T8,B.i5,null)
D.NK=new A.hf(B.a1,null,null,D.a8F,null)
D.Ub=new A.aj(59048,!1)
D.Vz=new A.az(D.Ub,null,null,null,null)
D.VJ=new A.az(B.kH,null,B.a5,null,null)
D.W9=new A.az(B.o1,null,null,null,null)
D.UE=new A.aj(61801,!1)
D.WA=new A.az(D.UE,null,null,null,null)
D.UV=new A.aj(62265,!1)
D.WC=new A.az(D.UV,16,B.a5,null,null)
D.a__=A.a(x(["janv.","f\xe9vr.","mars","avr.","mai","juin","juil.","ao\xfbt","sept.","oct.","nov.","d\xe9c."]),A.aM("D<o>"))
D.anA=new C.ym(null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"RWYuJI1g45iQg0fb4A/Gw+z4n0U=");