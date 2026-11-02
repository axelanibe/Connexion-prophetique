((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
bp1(d){var x,w,v,u=J.a0(d),t=u.h(d,"date_debut"),s=J.q(t==null?"":t),r=s.length!==0?A.d5(s):null
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
F2(){var x=0,w=A.n(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$F2=A.j(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.ap().dc("/evenements"),$async$F2)
case 7:s=a8
r=A.a([],y.E)
for(g=J.au(s);g.v();){q=g.gM(g)
f=J.p(q,"type")
if(J.q(f==null?"":f)==="reunion")J.ck(r,C.bp1(q))}p=r
J.z8(p,new C.bdO())
x=8
return A.e(A.dt(),$async$F2)
case 8:o=a8
n=A.a([],y.t)
for(r=p,g=r.length,f=y.N,e=y.z,d=0;d<r.length;r.length===g||(0,A.L)(r),++d){m=r[d]
a0=m
a1=a0.a
a2=a0.b
a3=a0.c
a4=a0.d
a4=a4==null?"":B.d.bi(B.e.j(A.aS(a4)),4,"0")+"-"+B.d.bi(B.e.j(A.ba(a4)),2,"0")+"-"+B.d.bi(B.e.j(A.dh(a4)),2,"0")
J.ck(n,A.ah(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
return A.e(o.dd("String","reunions_cache_v1",B.a8.fX(n,null)),$async$F2)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dt(),$async$F2)
case 10:o=a8
l=o
k=A.aW(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.ab(k)===0)throw a6
j=y.j.a(B.a8.ek(0,k,null))
i=A.a([],y.E)
for(r=J.au(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gM(r)
J.ck(i,C.bp1(J.n2(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$F2,w)},
bMg(){var x,w=$.bk6(),v=J.kl(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yL(31)]
return"cp-"+B.b.DT(v)},
bDQ(){return new C.tr(null)},
kA:function kA(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
bdO:function bdO(){},
tr:function tr(d){this.a=d},
QT:function QT(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b4H:function b4H(d){this.a=d},
b4I:function b4I(d,e){this.a=d
this.b=e},
b4J:function b4J(d){this.a=d},
b4K:function b4K(){},
b4N:function b4N(){},
b4L:function b4L(d){this.a=d},
b4M:function b4M(d){this.a=d},
b4V:function b4V(d){this.a=d},
b4S:function b4S(){},
b4T:function b4T(){},
b4W:function b4W(d,e,f){this.a=d
this.b=e
this.c=f},
b4O:function b4O(d,e,f){this.a=d
this.b=e
this.c=f},
b4P:function b4P(d,e,f){this.a=d
this.b=e
this.c=f},
b4Q:function b4Q(d,e){this.a=d
this.b=e},
b4R:function b4R(d,e,f){this.a=d
this.b=e
this.c=f},
b4U:function b4U(d,e){this.a=d
this.b=e},
yy:function yy(d){this.a=d},
Q2:function Q2(d,e){var _=this
_.d=d
_.e=e
_.z=_.y=_.x=_.w=_.r=_.f=null
_.Q=!1
_.c=_.a=null},
b0d:function b0d(d){this.a=d},
b0e:function b0e(d){this.a=d},
b0k:function b0k(d){this.a=d},
b0j:function b0j(d,e){this.a=d
this.b=e},
b0l:function b0l(d){this.a=d},
b0i:function b0i(d,e){this.a=d
this.b=e},
b0m:function b0m(d){this.a=d},
b0h:function b0h(d,e){this.a=d
this.b=e},
b0n:function b0n(d){this.a=d},
b0g:function b0g(d,e){this.a=d
this.b=e},
b0o:function b0o(d){this.a=d},
b0f:function b0f(d,e){this.a=d
this.b=e},
beI(d,e){var x=0,w=A.n(y.H)
var $async$beI=A.j(function(f,g){if(f===1)return A.k(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.yZ(A.cW("https://meet.jit.si/"+e,0,null),B.Y0,"_blank"),$async$beI)
case 2:return A.l(null,w)}})
return A.m($async$beI,w)}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[3],C)
D=c[9]
C.kA.prototype={
gCY(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.di(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.di(x[1],null)
t=w==null?0:w}else t=0
return A.bi(A.aS(s),A.ba(s),A.dh(s),u,t,0,0,0)},
gq9(){var x,w=this.gCY()
if(w==null)return"bientot"
x=new A.aY(Date.now(),0,!1)
if(x.hx(w))return"avenir"
if(x.hx(w.mu(108e8)))return"direct"
return"terminee"}}
C.tr.prototype={
R(){return new C.QT(A.a([],y.E))}}
C.QT.prototype={
a0(){this.ac()
this.qI()},
qI(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qI=A.j(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.q(new C.b4H(s))
u=4
x=7
return A.e(C.F2(),$async$qI)
case 7:r=e
if(s.c==null){x=1
break}s.q(new C.b4I(s,r))
q=A.a([],y.l)
for(n=J.au(r);n.v();){p=n.gM(n)
if(p.gCY()!=null&&p.gq9()==="avenir"){m=p.b
l=p.gCY()
l.toString
J.ck(q,new A.a9o(l,m))}}o=q
x=8
return A.e($.kR().t4($.ao,o),$async$qI)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.q(new C.b4J(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$qI,w)},
aCH(d){var x,w,v,u,t,s=d.d
if(s==null)return A.b("Date \xe0 confirmer")
x=$.ao==="en"
w=x?B.l6:D.a_d
v=""+A.dh(s)+" "+w[A.ba(s)-1]+" "+A.aS(s)
u=d.e
if(u.length>=5)u=B.d.W(u,0,5)
t=x?"at":"\xe0"
return u.length===0?v:v+" "+t+" "+u},
Bz(d,e){return this.aDc(d,e)},
aDc(d,e){var x=0,w=A.n(y.H),v,u=2,t,s,r,q,p,o
var $async$Bz=A.j(function(f,g){if(f===1){t=g
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
return A.e(C.beI(s==null?"":s,p),$async$Bz)
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
return A.m($async$Bz,w)},
Bt(d){return this.aCp(d)},
aCp(d){var x=0,w=A.n(y.H),v,u=this,t
var $async$Bt=A.j(function(e,f){if(e===1)return A.k(f,w)
while(true)switch(x){case 0:t=$.ap().b
if(!(t!=null&&t.length!==0)){t=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(t,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}x=3
return A.e(A.aN(d,!1).hX(A.jJ(new C.b4K(),null,y.y)),$async$Bt)
case 3:if(f!==!0||d.e==null){x=1
break}x=4
return A.e(u.qI(),$async$Bt)
case 4:case 1:return A.l(v,w)}})
return A.m($async$Bt,w)},
wB(d,e){return this.aDJ(d,e)},
aDJ(d,e){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wB=A.j(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.dC(null,null,!0,null,new C.b4N(),d,null,!0,!0,y.y),$async$wB)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.ap().adw(e.a,!1),$async$wB)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(q,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qI(),$async$wB)
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
C(d){return A.eb(new C.b4V(this))}}
C.yy.prototype={
R(){var x=$.ae()
return new C.Q2(new A.b6(B.V,x),new A.b6(B.V,x))}}
C.Q2.prototype={
m(){var x=this.d,w=$.ae()
x.go$=w
x.fy$=0
x=this.e
x.go$=w
x.fy$=0
this.ae()},
Qq(){var x,w,v,u,t=this
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
Iw(){var x=0,w=A.n(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$Iw=A.j(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.Q){x=1
break}r=B.d.ab(s.d.a.a)
m=s.y
if(m!=null&&s.z!=null){m.toString
l=s.z
l.toString
k=new A.c9(m,l)}else k=null
j=A.bi(A.aS(new A.aY(Date.now(),0,!1)),A.ba(new A.aY(Date.now(),0,!1)),A.dh(new A.aY(Date.now(),0,!1)),0,0,0,0,0)
if(J.ab(r)!==0){m=s.f
m=m==null||k==null||m.hx(j)}else m=!0
if(m){m=s.c
m.toString
l=A.b("Le titre, la date et l\u2019heure sont requis.")
m.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(l,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}s.q(new C.b0d(s))
q=C.bMg()
p=B.d.bi(B.e.j(k.a),2,"0")
o=B.d.bi(B.e.j(k.b),2,"0")
u=4
m=$.ap()
l=B.d.ab(s.e.a.a)
if(l.length===0)l=null
i=s.f
i.toString
i=B.d.bi(B.e.j(A.aS(i)),4,"0")
h=s.f
h.toString
h=B.d.bi(B.e.j(A.ba(h)),2,"0")
g=s.f
g.toString
x=7
return A.e(m.aLu(i+"-"+h+"-"+B.d.bi(B.e.j(A.dh(g)),2,"0"),l,A.r(p)+":"+A.r(o),r,q,"reunion"),$async$Iw)
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
s.q(new C.b0e(s))}x=6
break
case 3:x=2
break
case 6:case 1:return A.l(v,w)
case 2:return A.k(t,w)}})
return A.m($async$Iw,w)},
C(d){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=A.jn(h,h,h,h,h,h,h,h,h,h,A.c(A.b("Nouvelle r\xe9union en ligne"),h,h,h,h,h,h,h,h),h,h),f=A.b("Titre de la r\xe9union")
f=A.cw(!0,B.y,!1,h,!0,B.i,h,A.cz(),i.d,h,h,h,h,h,2,A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,f,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),B.J,!0,h,!0,h,!1,h,B.a5,h,h,h,h,h,h,h,1,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,B.a2,h,h,B.a4,B.a1,h,h,h,h,h,h,h,B.P,h,B.ac,h,h,h,h)
x=A.b("Description (facultatif)")
x=A.cw(!0,B.y,!1,h,!0,B.i,h,A.cz(),i.e,h,h,h,h,h,2,A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,x,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),B.J,!0,h,!0,h,!1,h,B.a5,h,h,h,h,h,h,h,3,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,B.a2,h,h,B.a4,B.a1,h,h,h,h,h,h,h,B.P,h,B.ac,h,h,h,h)
w=i.r
v=A.b("Jour")
v=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,v,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=y.I
t=A.a([],u)
for(s=y.c,r=1;r<=31;++r)t.push(new A.cQ(r,A.c(""+r,h,h,h,h,h,h,h,h),B.az,h,s))
q=y.S
w=A.ag(A.eU(v,h,h,!0,t,new C.b0k(i),h,w,q),1)
t=i.w
v=A.b("Mois")
v=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,v,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
p=A.a([],u)
for(o=1;o<=12;++o){n=$.ao==="en"?B.cs:B.hj
p.push(new A.cQ(o,A.c(n[o-1],h,h,h,h,h,h,h,h),B.az,h,s))}v=A.ag(A.eU(v,h,h,!0,p,new C.b0l(i),h,t,q),2)
t=i.x
p=A.b("Ann\xe9e")
p=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
n=A.a([],u)
for(m=A.aS(new A.aY(Date.now(),0,!1));m<=A.aS(new A.aY(Date.now(),0,!1))+1;++m)n.push(new A.cQ(m,A.c(""+m,h,h,h,h,h,h,h,h),B.az,h,s))
l=y.p
t=A.a8(A.a([w,B.O,v,B.O,A.ag(A.eU(p,h,h,!0,n,new C.b0m(i),h,t,q),1)],l),B.n,B.f,B.h,h)
n=i.y
p=A.b("Heure")
p=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
v=A.a([],u)
for(k=0;k<24;++k)v.push(new A.cQ(k,A.c(B.d.bi(B.e.j(k),2,"0"),h,h,h,h,h,h,h,h),B.az,h,s))
w=A.ag(A.eU(p,h,h,!0,v,new C.b0n(i),h,n,q),1)
v=i.z
p=A.b("Minutes")
p=A.bY(h,new A.bW(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=A.a([],u)
for(n=[0,15,30,45],j=0;j<4;++j){o=n[j]
u.push(new A.cQ(o,A.c(B.d.bi(B.e.j(o),2,"0"),h,h,h,h,h,h,h,h),B.az,h,s))}w=A.a8(A.a([w,B.O,A.ag(A.eU(p,h,h,!0,u,new C.b0o(i),h,v,q),1)],l),B.n,B.f,B.h,h)
v=i.Q?h:i.gaDO()
return A.hs(g,h,A.eF(new A.a4(B.H,A.W(A.a([f,B.k,x,B.k,t,B.k,w,B.r,A.af(A.bG(!1,A.c(A.b("Publier"),h,h,h,h,h,h,h,h),B.j,h,B.t,h,h,h,h,v,h,h),52,1/0)],l),B.p,B.f,B.h),h),h,h,h,B.ad),h)}}
var z=a.updateTypes(["ay<~>()","I(kA)","z(kA,kA)","yy(Q)","h(kA)"])
C.bdO.prototype={
$2(d,e){var x=d.gCY(),w=e.gCY()
if(x==null&&w==null)return B.d.bt(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.Fd(x,w)},
$S:z+2}
C.b4H.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
C.b4I.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
C.b4J.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
C.b4K.prototype={
$1(d){return D.anX},
$S:z+3}
C.b4N.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.dM(A.a([A.c8(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,B.t,x,x,x,x,new C.b4L(d),x,x),A.c8(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,B.t,x,x,x,x,new C.b4M(d),x,x)],y.p),v,w)},
$S:11}
C.b4L.prototype={
$0(){return A.aN(this.a,!1).aY(!1)},
$S:0}
C.b4M.prototype={
$0(){return A.aN(this.a,!1).aY(!0)},
$S:0}
C.b4V.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.iy(l.d,new C.b4S()),j=A.O(k,!0,k.$ti.i("u.E"))
k=J.iy(l.d,new C.b4T())
x=A.O(k,!0,k.$ti.i("u.E"))
w=new C.b4W(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.bts(v,u,t,$.X().c?A.bei(B.iD,A.b("Planifier"),new C.b4U(l,d)):o),B.r],s)
if(l.e)t.push(D.NR)
else if(l.f!=null)t.push(A.dx(new A.a4(B.H,A.W(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),B.k,A.cP(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,B.t,o,o,o,o,l.gaDN(),o,o)],s),B.n,B.f,B.h),o),o,o,o,o))
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
C.b4S.prototype={
$1(d){return d.gq9()==="avenir"||d.gq9()==="direct"||d.gq9()==="bientot"},
$S:z+1}
C.b4T.prototype={
$1(d){return d.gq9()==="terminee"},
$S:z+1}
C.b4W.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gq9()==="direct",n=q.b,m=n.w
m=m==null?p:m.b8(B.q,B.A)
m=A.ag(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gq9()
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
s=x.aCH(d)
n=n.z
m=A.a([w,B.Y,A.a8(A.a([D.WQ,B.fy,A.c(s,p,p,p,p,n==null?p:n.aJ(B.aa),p,p,p)],r),B.n,B.f,B.h,p)],r)
w=d.c
if(w.length!==0)B.b.A(m,A.a([B.cy,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(B.k)
n=A.a([],r)
if(!o&&d.gq9()!=="terminee")n.push(A.ag(A.cE(D.Wn,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new C.b4O(x,q.c,d),p),1))
if(o){w=A.fu(B.Cg,B.m,p,p,p,p)
n.push(A.ag(A.cE(D.VO,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new C.b4P(x,q.c,d),w),1))}w=$.X()
if(w.c&&d.f.length!==0)B.b.A(n,A.a([B.O,A.cu(D.WO,A.c(A.b("Copier le lien"),p,p,p,p,p,p,p,p),new C.b4Q(d,q.c),p)],r))
if(w.c)B.b.A(n,A.a([B.O,A.bM(p,p,p,D.VY,p,p,new C.b4R(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.a8(n,B.n,B.f,B.h,p))
return A.dx(new A.a4(B.H,A.W(m,B.p,B.f,B.h),p),p,p,B.aB,p)},
$S:z+4}
C.b4O.prototype={
$0(){return this.a.Bz(this.b,this.c)},
$S:0}
C.b4P.prototype={
$0(){return this.a.Bz(this.b,this.c)},
$S:0}
C.b4Q.prototype={
$0(){var x=0,w=A.n(y.H),v=this,u,t
var $async$$0=A.j(function(d,e){if(d===1)return A.k(e,w)
while(true)switch(x){case 0:x=2
return A.e(A.vf(new A.oH("https://meet.jit.si/"+v.a.f)),$async$$0)
case 2:u=v.b
if(u.e!=null){t=A.b("Lien de la r\xe9union copi\xe9.")
u.u(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(t,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}return A.l(null,w)}})
return A.m($async$$0,w)},
$S:2}
C.b4R.prototype={
$0(){return this.a.wB(this.b,this.c)},
$S:0}
C.b4U.prototype={
$0(){return this.a.Bt(this.b)},
$S:0}
C.b0d.prototype={
$0(){return this.a.Q=!0},
$S:0}
C.b0e.prototype={
$0(){return this.a.Q=!1},
$S:0}
C.b0k.prototype={
$1(d){var x=this.a
return x.q(new C.b0j(x,d))},
$S:61}
C.b0j.prototype={
$0(){var x=this.a
x.r=this.b
x.Qq()},
$S:0}
C.b0l.prototype={
$1(d){var x=this.a
return x.q(new C.b0i(x,d))},
$S:61}
C.b0i.prototype={
$0(){var x=this.a
x.w=this.b
x.Qq()},
$S:0}
C.b0m.prototype={
$1(d){var x=this.a
return x.q(new C.b0h(x,d))},
$S:61}
C.b0h.prototype={
$0(){var x=this.a
x.x=this.b
x.Qq()},
$S:0}
C.b0n.prototype={
$1(d){var x=this.a
return x.q(new C.b0g(x,d))},
$S:61}
C.b0g.prototype={
$0(){return this.a.y=this.b},
$S:0}
C.b0o.prototype={
$1(d){var x=this.a
return x.q(new C.b0f(x,d))},
$S:61}
C.b0f.prototype={
$0(){return this.a.z=this.b},
$S:0};(function installTearOffs(){var x=a._instance_0u
x(C.QT.prototype,"gaDN","qI",0)
x(C.Q2.prototype,"gaDO","Iw",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.kA,A.T)
x(C.bdO,A.vh)
w(A.S,[C.tr,C.yy])
w(A.a_,[C.QT,C.Q2])
w(A.vg,[C.b4H,C.b4I,C.b4J,C.b4L,C.b4M,C.b4O,C.b4P,C.b4Q,C.b4R,C.b4U,C.b0d,C.b0e,C.b0j,C.b0i,C.b0h,C.b0g,C.b0f])
w(A.lS,[C.b4K,C.b4N,C.b4V,C.b4S,C.b4T,C.b4W,C.b0k,C.b0l,C.b0m,C.b0n,C.b0o])})()
A.b9j(b.typeUniverse,JSON.parse('{"yy":{"S":[],"h":[]},"tr":{"S":[],"h":[]},"QT":{"a_":["tr"]},"Q2":{"a_":["yy"]}}'))
var y=(function rtii(){var x=A.aM
return{c:x("cQ<z>"),I:x("D<cQ<z>>"),t:x("D<an<o,@>>"),l:x("D<+debut,nom(aY,o)>"),E:x("D<kA>"),p:x("D<h>"),x:x("E<kA>"),j:x("E<@>"),f:x("an<@,@>"),N:x("o"),q:x("uj"),y:x("I"),z:x("@"),S:x("z"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Tj=new A.ai(32,32,32,32)
D.a8U=new A.a4(D.Tj,B.i9,null)
D.NR=new A.hh(B.a6,null,null,D.a8U,null)
D.Um=new A.al(59048,!1)
D.VO=new A.aA(D.Um,null,null,null,null)
D.VY=new A.aA(B.kI,null,B.aa,null,null)
D.Wn=new A.aA(B.o7,null,null,null,null)
D.UR=new A.al(61801,!1)
D.WO=new A.aA(D.UR,null,null,null,null)
D.V8=new A.al(62265,!1)
D.WQ=new A.aA(D.V8,16,B.aa,null,null)
D.a_d=A.a(x(["janv.","f\xe9vr.","mars","avr.","mai","juin","juil.","ao\xfbt","sept.","oct.","nov.","d\xe9c."]),A.aM("D<o>"))
D.anX=new C.yy(null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"HnTsZ2go6XDJf27QQ9mwmNal29A=");