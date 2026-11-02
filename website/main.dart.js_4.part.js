((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
bph(d){var x,w,v,u=J.a0(d),t=u.h(d,"date_debut"),s=J.q(t==null?"":t),r=s.length!==0?A.d5(s):null
t=u.h(d,"id")
t=J.q(t==null?"":t)
x=u.h(d,"nom")
x=J.q(x==null?"":x)
w=u.h(d,"description")
w=J.q(w==null?"":w)
v=u.h(d,"heure_debut")
v=J.q(v==null?"":v)
u=u.h(d,"salle_visio")
return new C.kA(t,x,w,r,v,J.q(u==null?"":u))},
F3(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$F3=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.am().dd("/evenements"),$async$F3)
case 7:s=a8
r=A.a([],y.E)
for(g=J.au(s);g.v();){q=g.gM(g)
f=J.p(q,"type")
if(J.q(f==null?"":f)==="reunion")J.ck(r,C.bph(q))}p=r
J.z9(p,new C.be_())
x=8
return A.e(A.dn(),$async$F3)
case 8:o=a8
n=A.a([],y.t)
for(r=p,g=r.length,f=y.N,e=y.z,d=0;d<r.length;r.length===g||(0,A.L)(r),++d){m=r[d]
a0=m
a1=a0.a
a2=a0.b
a3=a0.c
a4=a0.d
a4=a4==null?"":B.d.bi(B.e.j(A.aT(a4)),4,"0")+"-"+B.d.bi(B.e.j(A.ba(a4)),2,"0")+"-"+B.d.bi(B.e.j(A.dh(a4)),2,"0")
J.ck(n,A.ag(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
return A.e(o.de("String","reunions_cache_v1",B.a8.fX(n,null)),$async$F3)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dn(),$async$F3)
case 10:o=a8
l=o
k=A.aV(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.ab(k)===0)throw a6
j=y.j.a(B.a8.ek(0,k,null))
i=A.a([],y.E)
for(r=J.au(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gM(r)
J.ck(i,C.bph(J.n2(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$F3,w)},
bMB(){var x,w=$.bkm(),v=J.kl(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yL(31)]
return"cp-"+B.b.DU(v)},
bEb(){return new C.tr(null)},
kA:function kA(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
be_:function be_(){},
tr:function tr(d){this.a=d},
QV:function QV(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b4T:function b4T(d){this.a=d},
b4U:function b4U(d,e){this.a=d
this.b=e},
b4V:function b4V(d){this.a=d},
b4W:function b4W(){},
b4Z:function b4Z(){},
b4X:function b4X(d){this.a=d},
b4Y:function b4Y(d){this.a=d},
b56:function b56(d){this.a=d},
b53:function b53(){},
b54:function b54(){},
b57:function b57(d,e,f){this.a=d
this.b=e
this.c=f},
b5_:function b5_(d,e,f){this.a=d
this.b=e
this.c=f},
b50:function b50(d,e,f){this.a=d
this.b=e
this.c=f},
b51:function b51(d,e){this.a=d
this.b=e},
b52:function b52(d,e,f){this.a=d
this.b=e
this.c=f},
b55:function b55(d,e){this.a=d
this.b=e},
yz:function yz(d){this.a=d},
Q4:function Q4(d,e){var _=this
_.d=d
_.e=e
_.z=_.y=_.x=_.w=_.r=_.f=null
_.Q=!1
_.c=_.a=null},
b0p:function b0p(d){this.a=d},
b0q:function b0q(d){this.a=d},
b0w:function b0w(d){this.a=d},
b0v:function b0v(d,e){this.a=d
this.b=e},
b0x:function b0x(d){this.a=d},
b0u:function b0u(d,e){this.a=d
this.b=e},
b0y:function b0y(d){this.a=d},
b0t:function b0t(d,e){this.a=d
this.b=e},
b0z:function b0z(d){this.a=d},
b0s:function b0s(d,e){this.a=d
this.b=e},
b0A:function b0A(d){this.a=d},
b0r:function b0r(d,e){this.a=d
this.b=e},
beU(d,e){var x=0,w=A.n(y.H)
var $async$beU=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.z_(A.cW("https://meet.jit.si/"+e,0,null),B.Y0,"_blank"),$async$beU)
case 2:return A.l(null,w)}})
return A.m($async$beU,w)}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[3],C)
D=c[9]
C.kA.prototype={
gCZ(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.di(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.di(x[1],null)
t=w==null?0:w}else t=0
return A.bi(A.aT(s),A.ba(s),A.dh(s),u,t,0,0,0)},
gqa(){var x,w=this.gCZ()
if(w==null)return"bientot"
x=new A.aY(Date.now(),0,!1)
if(x.hx(w))return"avenir"
if(x.hx(w.mu(108e8)))return"direct"
return"terminee"}}
C.tr.prototype={
R(){return new C.QV(A.a([],y.E))}}
C.QV.prototype={
a0(){this.ac()
this.qJ()},
qJ(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qJ=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.q(new C.b4T(s))
u=4
x=7
return A.e(C.F3(),$async$qJ)
case 7:r=e
if(s.c==null){x=1
break}s.q(new C.b4U(s,r))
q=A.a([],y.l)
for(n=J.au(r);n.v();){p=n.gM(n)
if(p.gCZ()!=null&&p.gqa()==="avenir"){m=p.b
l=p.gCZ()
l.toString
J.ck(q,new A.a9q(l,m))}}o=q
x=8
return A.e($.kR().t5($.ap,o),$async$qJ)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.q(new C.b4V(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qJ,w)},
aCP(d){var x,w,v,u,t,s=d.d
if(s==null)return A.b("Date \xe0 confirmer")
x=$.ap==="en"
w=x?B.l7:D.a_d
v=""+A.dh(s)+" "+w[A.ba(s)-1]+" "+A.aT(s)
u=d.e
if(u.length>=5)u=B.d.W(u,0,5)
t=x?"at":"\xe0"
return u.length===0?v:v+" "+t+" "+u},
BA(d,e){return this.aDk(d,e)},
aDk(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$BA=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:p=e.f
if(p.length===0){p=A.b("Salle de r\xe9union non configur\xe9e. Contactez la structure.")
d.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(p,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}s=A.b("Ouverture de la r\xe9union\u2026")
r=y.q
d.u(r).f.J(A.F(null,null,null,null,null,B.i,null,A.c(s,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
u=4
s=$.X().a
s=s==null?null:s.a
x=7
return A.e(C.beU(s==null?"":s,p),$async$BA)
case 7:u=2
x=6
break
case 4:u=3
o=t
if(d.e!=null){p=A.b("Impossible d\u2019ouvrir la r\xe9union. V\xe9rifiez votre connexion.")
d.u(r).f.J(A.F(null,null,null,null,null,B.i,null,A.c(p,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$BA,w)},
Bu(d){return this.aCx(d)},
aCx(d){var x=0,w=A.n(y.H),v,u=this,t
var $async$Bu=A.j(function(e,f){if(e===1)return A.k(f,w)
while(true)switch(x){case 0:t=$.am().b
if(!(t!=null&&t.length!==0)){t=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(t,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}x=3
return A.e(A.aN(d,!1).hY(A.jK(new C.b4W(),null,y.y)),$async$Bu)
case 3:if(f!==!0||d.e==null){x=1
break}x=4
return A.e(u.qJ(),$async$Bu)
case 4:case 1:return A.l(v,w)}})
return A.m($async$Bu,w)},
wB(d,e){return this.aDR(d,e)},
aDR(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wB=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.dC(null,null,!0,null,new C.b4Z(),d,null,!0,!0,y.y),$async$wB)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.am().adA(e.a,!1),$async$wB)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(q,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qJ(),$async$wB)
case 9:u=2
x=7
break
case 5:u=4
o=t
r=A.U(o)
if(d.e!=null){q=A.r(r)
d.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c("Retrait refus\xe9 ("+q+").",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$wB,w)},
C(d){return A.eb(new C.b56(this))}}
C.yz.prototype={
R(){var x=$.ae()
return new C.Q4(new A.b6(B.V,x),new A.b6(B.V,x))}}
C.Q4.prototype={
m(){var x=this.d,w=$.ae()
x.go$=w
x.fy$=0
x=this.e
x.go$=w
x.fy$=0
this.ae()},
Qt(){var x,w,v,u,t=this
if(t.r!=null&&t.w!=null&&t.x!=null){x=t.x
x.toString
w=t.w
w.toString
v=A.dh(A.bi(x,w+1,0,0,0,0,0,0))
x=t.r
x.toString
if(x>v){t.r=v
x=v}w=t.x
w.toString
u=t.w
u.toString
t.f=A.bi(w,u,x,0,0,0,0,0)}},
Ix(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$Ix=A.j(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.Q){x=1
break}r=B.d.ab(s.d.a.a)
m=s.y
if(m!=null&&s.z!=null){m.toString
l=s.z
l.toString
k=new A.c9(m,l)}else k=null
j=A.bi(A.aT(new A.aY(Date.now(),0,!1)),A.ba(new A.aY(Date.now(),0,!1)),A.dh(new A.aY(Date.now(),0,!1)),0,0,0,0,0)
if(J.ab(r)!==0){m=s.f
m=m==null||k==null||m.hx(j)}else m=!0
if(m){m=s.c
m.toString
l=A.b("Le titre, la date et l\u2019heure sont requis.")
m.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(l,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}s.q(new C.b0p(s))
q=C.bMB()
p=B.d.bi(B.e.j(k.a),2,"0")
o=B.d.bi(B.e.j(k.b),2,"0")
u=4
m=$.am()
l=B.d.ab(s.e.a.a)
if(l.length===0)l=null
i=s.f
i.toString
i=B.d.bi(B.e.j(A.aT(i)),4,"0")
h=s.f
h.toString
h=B.d.bi(B.e.j(A.ba(h)),2,"0")
g=s.f
g.toString
x=7
return A.e(m.aLC(i+"-"+h+"-"+B.d.bi(B.e.j(A.dh(g)),2,"0"),l,A.r(p)+":"+A.r(o),r,q,"reunion"),$async$Ix)
case 7:m=s.c
if(m==null){x=1
break}l=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
m.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(l,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
l=s.c
l.toString
A.aN(l,!1).aY(!0)
u=2
x=6
break
case 4:u=3
e=t
n=A.U(e)
m=s.c
if(m!=null){l=A.r(n)
m.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c("Publication refus\xe9e ("+l+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
s.q(new C.b0q(s))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Ix,w)},
C(d){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=A.jo(h,h,h,h,h,h,h,h,h,h,A.c(A.b("Nouvelle r\xe9union en ligne"),h,h,h,h,h,h,h,h),h,h),f=A.b("Titre de la r\xe9union")
f=A.cw(!0,B.y,!1,h,!0,B.i,h,A.cz(),i.d,h,h,h,h,h,2,A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,f,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),B.J,!0,h,!0,h,!1,h,B.a5,h,h,h,h,h,h,h,1,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,B.a2,h,h,B.a4,B.a1,h,h,h,h,h,h,h,B.P,h,B.ac,h,h,h,h)
x=A.b("Description (facultatif)")
x=A.cw(!0,B.y,!1,h,!0,B.i,h,A.cz(),i.e,h,h,h,h,h,2,A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,x,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),B.J,!0,h,!0,h,!1,h,B.a5,h,h,h,h,h,h,h,3,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,B.a2,h,h,B.a4,B.a1,h,h,h,h,h,h,h,B.P,h,B.ac,h,h,h,h)
w=i.r
v=A.b("Jour")
v=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,v,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=y.I
t=A.a([],u)
for(s=y.c,r=1;r<=31;++r)t.push(new A.cR(r,A.c(""+r,h,h,h,h,h,h,h,h),B.az,h,s))
q=y.S
w=A.ah(A.eU(v,h,h,!0,t,new C.b0w(i),h,w,q),1)
t=i.w
v=A.b("Mois")
v=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,v,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
p=A.a([],u)
for(o=1;o<=12;++o){n=$.ap==="en"?B.cs:B.hj
p.push(new A.cR(o,A.c(n[o-1],h,h,h,h,h,h,h,h),B.az,h,s))}v=A.ah(A.eU(v,h,h,!0,p,new C.b0x(i),h,t,q),2)
t=i.x
p=A.b("Ann\xe9e")
p=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
n=A.a([],u)
for(m=A.aT(new A.aY(Date.now(),0,!1));m<=A.aT(new A.aY(Date.now(),0,!1))+1;++m)n.push(new A.cR(m,A.c(""+m,h,h,h,h,h,h,h,h),B.az,h,s))
l=y.p
t=A.a8(A.a([w,B.O,v,B.O,A.ah(A.eU(p,h,h,!0,n,new C.b0y(i),h,t,q),1)],l),B.n,B.f,B.h,h)
n=i.y
p=A.b("Heure")
p=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
v=A.a([],u)
for(k=0;k<24;++k)v.push(new A.cR(k,A.c(B.d.bi(B.e.j(k),2,"0"),h,h,h,h,h,h,h,h),B.az,h,s))
w=A.ah(A.eU(p,h,h,!0,v,new C.b0z(i),h,n,q),1)
v=i.z
p=A.b("Minutes")
p=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=A.a([],u)
for(n=[0,15,30,45],j=0;j<4;++j){o=n[j]
u.push(new A.cR(o,A.c(B.d.bi(B.e.j(o),2,"0"),h,h,h,h,h,h,h,h),B.az,h,s))}w=A.a8(A.a([w,B.O,A.ah(A.eU(p,h,h,!0,u,new C.b0A(i),h,v,q),1)],l),B.n,B.f,B.h,h)
v=i.Q?h:i.gaDW()
return A.hs(g,h,A.eF(new A.a4(B.H,A.W(A.a([f,B.k,x,B.k,t,B.k,w,B.r,A.af(A.bG(!1,A.c(A.b("Publier"),h,h,h,h,h,h,h,h),B.j,h,B.t,h,h,h,h,v,h,h),52,1/0)],l),B.p,B.f,B.h),h),h,h,h,B.ad),h)}}
var z=a.updateTypes(["ay<~>()","I(kA)","z(kA,kA)","yz(Q)","h(kA)"])
C.be_.prototype={
$2(d,e){var x=d.gCZ(),w=e.gCZ()
if(x==null&&w==null)return B.d.bt(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.Ff(x,w)},
$S:z+2}
C.b4T.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
C.b4U.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
C.b4V.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
C.b4W.prototype={
$1(d){return D.anX},
$S:z+3}
C.b4Z.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.dM(A.a([A.c8(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,B.t,x,x,x,x,new C.b4X(d),x,x),A.c8(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,B.t,x,x,x,x,new C.b4Y(d),x,x)],y.p),v,w)},
$S:11}
C.b4X.prototype={
$0(){return A.aN(this.a,!1).aY(!1)},
$S:0}
C.b4Y.prototype={
$0(){return A.aN(this.a,!1).aY(!0)},
$S:0}
C.b56.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.iy(l.d,new C.b53()),j=A.O(k,!0,k.$ti.i("u.E"))
k=J.iy(l.d,new C.b54())
x=A.O(k,!0,k.$ti.i("u.E"))
w=new C.b57(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.btH(v,u,t,$.X().c?A.beu(B.iE,A.b("Planifier"),new C.b55(l,d)):o),B.r],s)
if(l.e)t.push(D.NR)
else if(l.f!=null)t.push(A.dx(new A.a4(B.H,A.W(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),B.k,A.cQ(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,B.t,o,o,o,o,l.gaDV(),o,o)],s),B.n,B.f,B.h),o),o,o,o,o))
else if(J.ca(l.d))t.push(A.dx(new A.a4(B.H,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([B.k,A.c(q,o,o,o,o,p==null?o:p.b8(B.aa,B.z),o,o,o),B.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
B.b.A(v,s)}B.b.A(t,v)}l.a.toString
return A.bx(k,t,o,o)},
$S:4}
C.b53.prototype={
$1(d){return d.gqa()==="avenir"||d.gqa()==="direct"||d.gqa()==="bientot"},
$S:z+1}
C.b54.prototype={
$1(d){return d.gqa()==="terminee"},
$S:z+1}
C.b57.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gqa()==="direct",n=q.b,m=n.w
m=m==null?p:m.b8(B.q,B.A)
m=A.ah(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gqa()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=B.Cg
else t=x==="avenir"?B.v:B.aa
x=t.dQ(0.12)
w=A.a5(20)
u=A.aa(p,p,B.j,p,p,new A.ak(t,p,p,p,p,p,B.bC),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.a8(A.a([m,A.aa(p,A.a8(A.a([u,B.fy,A.c(v,p,p,p,p,s==null?p:s.b8(t,B.A),p,p,p)],r),B.n,B.f,B.a9,p),B.j,p,p,new A.ak(x,p,p,w,p,p,B.w),p,p,p,p,B.dU,p,p,p)],r),B.n,B.f,B.h,p)
x=q.a
s=x.aCP(d)
n=n.z
m=A.a([w,B.Y,A.a8(A.a([D.WQ,B.fy,A.c(s,p,p,p,p,n==null?p:n.aJ(B.aa),p,p,p)],r),B.n,B.f,B.h,p)],r)
w=d.c
if(w.length!==0)B.b.A(m,A.a([B.cy,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(B.k)
n=A.a([],r)
if(!o&&d.gqa()!=="terminee")n.push(A.ah(A.cE(D.Wn,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new C.b5_(x,q.c,d),p),1))
if(o){w=A.fu(B.Cg,B.m,p,p,p,p)
n.push(A.ah(A.cE(D.VO,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new C.b50(x,q.c,d),w),1))}w=$.X()
if(w.c&&d.f.length!==0)B.b.A(n,A.a([B.O,A.cu(D.WO,A.c(A.b("Copier le lien"),p,p,p,p,p,p,p,p),new C.b51(d,q.c),p)],r))
if(w.c)B.b.A(n,A.a([B.O,A.bM(p,p,p,D.VY,p,p,new C.b52(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.a8(n,B.n,B.f,B.h,p))
return A.dx(new A.a4(B.H,A.W(m,B.p,B.f,B.h),p),p,p,B.aB,p)},
$S:z+4}
C.b5_.prototype={
$0(){return this.a.BA(this.b,this.c)},
$S:0}
C.b50.prototype={
$0(){return this.a.BA(this.b,this.c)},
$S:0}
C.b51.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:x=2
return A.e(A.vf(new A.oI("https://meet.jit.si/"+v.a.f)),$async$$0)
case 2:u=v.b
if(u.e!=null){t=A.b("Lien de la r\xe9union copi\xe9.")
u.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(t,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
C.b52.prototype={
$0(){return this.a.wB(this.b,this.c)},
$S:0}
C.b55.prototype={
$0(){return this.a.Bu(this.b)},
$S:0}
C.b0p.prototype={
$0(){return this.a.Q=!0},
$S:0}
C.b0q.prototype={
$0(){return this.a.Q=!1},
$S:0}
C.b0w.prototype={
$1(d){var x=this.a
return x.q(new C.b0v(x,d))},
$S:61}
C.b0v.prototype={
$0(){var x=this.a
x.r=this.b
x.Qt()},
$S:0}
C.b0x.prototype={
$1(d){var x=this.a
return x.q(new C.b0u(x,d))},
$S:61}
C.b0u.prototype={
$0(){var x=this.a
x.w=this.b
x.Qt()},
$S:0}
C.b0y.prototype={
$1(d){var x=this.a
return x.q(new C.b0t(x,d))},
$S:61}
C.b0t.prototype={
$0(){var x=this.a
x.x=this.b
x.Qt()},
$S:0}
C.b0z.prototype={
$1(d){var x=this.a
return x.q(new C.b0s(x,d))},
$S:61}
C.b0s.prototype={
$0(){return this.a.y=this.b},
$S:0}
C.b0A.prototype={
$1(d){var x=this.a
return x.q(new C.b0r(x,d))},
$S:61}
C.b0r.prototype={
$0(){return this.a.z=this.b},
$S:0};(function installTearOffs(){var x=a._instance_0u
x(C.QV.prototype,"gaDV","qJ",0)
x(C.Q4.prototype,"gaDW","Ix",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.kA,A.T)
x(C.be_,A.vh)
w(A.S,[C.tr,C.yz])
w(A.a_,[C.QV,C.Q4])
w(A.vg,[C.b4T,C.b4U,C.b4V,C.b4X,C.b4Y,C.b5_,C.b50,C.b51,C.b52,C.b55,C.b0p,C.b0q,C.b0v,C.b0u,C.b0t,C.b0s,C.b0r])
w(A.lS,[C.b4W,C.b4Z,C.b56,C.b53,C.b54,C.b57,C.b0w,C.b0x,C.b0y,C.b0z,C.b0A])})()
A.b9v(b.typeUniverse,JSON.parse('{"yz":{"S":[],"h":[]},"tr":{"S":[],"h":[]},"QV":{"a_":["tr"]},"Q4":{"a_":["yz"]}}'))
var y=(function rtii(){var x=A.aL
return{c:x("cR<z>"),I:x("D<cR<z>>"),t:x("D<ao<o,@>>"),l:x("D<+debut,nom(aY,o)>"),E:x("D<kA>"),p:x("D<h>"),x:x("E<kA>"),j:x("E<@>"),f:x("ao<@,@>"),N:x("o"),q:x("uj"),y:x("I"),z:x("@"),S:x("z"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Tj=new A.ai(32,32,32,32)
D.a8U=new A.a4(D.Tj,B.i9,null)
D.NR=new A.hh(B.a6,null,null,D.a8U,null)
D.Um=new A.al(59048,!1)
D.VO=new A.aA(D.Um,null,null,null,null)
D.VY=new A.aA(B.kJ,null,B.aa,null,null)
D.Wn=new A.aA(B.o8,null,null,null,null)
D.UR=new A.al(61801,!1)
D.WO=new A.aA(D.UR,null,null,null,null)
D.V8=new A.al(62265,!1)
D.WQ=new A.aA(D.V8,16,B.aa,null,null)
D.a_d=A.a(x(["janv.","f\xe9vr.","mars","avr.","mai","juin","juil.","ao\xfbt","sept.","oct.","nov.","d\xe9c."]),A.aL("D<o>"))
D.anX=new C.yz(null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"gzJmRdJCfJs/ENBpMr3OeJ9YhVA=");