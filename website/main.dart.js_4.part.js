((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
bpx(d){var x,w,v,u=J.a0(d),t=u.h(d,"date_debut"),s=J.q(t==null?"":t),r=s.length!==0?A.d5(s):null
t=u.h(d,"id")
t=J.q(t==null?"":t)
x=u.h(d,"nom")
x=J.q(x==null?"":x)
w=u.h(d,"description")
w=J.q(w==null?"":w)
v=u.h(d,"heure_debut")
v=J.q(v==null?"":v)
u=u.h(d,"salle_visio")
return new C.kC(t,x,w,r,v,J.q(u==null?"":u))},
F6(){var x=0,w=A.m(y.x),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2,a3,a4,a5,a6
var $async$F6=A.i(function(a7,a8){if(a7===1){t=a8
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e($.am().dc("/evenements"),$async$F6)
case 7:s=a8
r=A.a([],y.E)
for(g=J.as(s);g.v();){q=g.gL(g)
f=J.p(q,"type")
if(J.q(f==null?"":f)==="reunion")J.ci(r,C.bpx(q))}p=r
J.zb(p,new C.beh())
x=8
return A.e(A.dn(),$async$F6)
case 8:o=a8
n=A.a([],y.t)
for(r=p,g=r.length,f=y.N,e=y.z,d=0;d<r.length;r.length===g||(0,A.K)(r),++d){m=r[d]
a0=m
a1=a0.a
a2=a0.b
a3=a0.c
a4=a0.d
a4=a4==null?"":B.d.bi(B.e.j(A.aS(a4)),4,"0")+"-"+B.d.bi(B.e.j(A.b6(a4)),2,"0")+"-"+B.d.bi(B.e.j(A.dh(a4)),2,"0")
J.ci(n,A.ag(["id",a1,"nom",a2,"description",a3,"date_debut",a4,"heure_debut",a0.e,"salle_visio",a0.f,"type","reunion"],f,e))}x=9
return A.e(o.de("String","reunions_cache_v1",B.a8.fX(n,null)),$async$F6)
case 9:v=p
x=1
break
u=2
x=6
break
case 4:u=3
a6=t
x=10
return A.e(A.dn(),$async$F6)
case 10:o=a8
l=o
k=A.aV(J.p(l.a,"reunions_cache_v1"))
if(k==null||J.ab(k)===0)throw a6
j=y.j.a(B.a8.ek(0,k,null))
i=A.a([],y.E)
for(r=J.as(j),n=y.f,g=y.N,f=y.z;r.v();){h=r.gL(r)
J.ci(i,C.bpx(J.n3(n.a(h),g,f)))}v=i
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$F6,w)},
bMR(){var x,w=$.bkD(),v=J.kn(6,y.N)
for(x=0;x<6;++x)v[x]="abcdefghjkmnpqrstuvwxyz23456789"[w.yK(31)]
return"cp-"+B.b.DW(v)},
bEs(){return new C.tq(null)},
kC:function kC(d,e,f,g,h,i){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i},
beh:function beh(){},
tq:function tq(d){this.a=d},
QY:function QY(d){var _=this
_.d=d
_.e=!0
_.c=_.a=_.f=null},
b58:function b58(d){this.a=d},
b59:function b59(d,e){this.a=d
this.b=e},
b5a:function b5a(d){this.a=d},
b5b:function b5b(){},
b5e:function b5e(){},
b5c:function b5c(d){this.a=d},
b5d:function b5d(d){this.a=d},
b5m:function b5m(d){this.a=d},
b5j:function b5j(){},
b5k:function b5k(){},
b5n:function b5n(d,e,f){this.a=d
this.b=e
this.c=f},
b5f:function b5f(d,e,f){this.a=d
this.b=e
this.c=f},
b5g:function b5g(d,e,f){this.a=d
this.b=e
this.c=f},
b5h:function b5h(d,e){this.a=d
this.b=e},
b5i:function b5i(d,e,f){this.a=d
this.b=e
this.c=f},
b5l:function b5l(d,e){this.a=d
this.b=e},
yz:function yz(d){this.a=d},
Q7:function Q7(d,e){var _=this
_.d=d
_.e=e
_.z=_.y=_.x=_.w=_.r=_.f=null
_.Q=!1
_.c=_.a=null},
b0F:function b0F(d){this.a=d},
b0G:function b0G(d){this.a=d},
b0M:function b0M(d){this.a=d},
b0L:function b0L(d,e){this.a=d
this.b=e},
b0N:function b0N(d){this.a=d},
b0K:function b0K(d,e){this.a=d
this.b=e},
b0O:function b0O(d){this.a=d},
b0J:function b0J(d,e){this.a=d
this.b=e},
b0P:function b0P(d){this.a=d},
b0I:function b0I(d,e){this.a=d
this.b=e},
b0Q:function b0Q(d){this.a=d},
b0H:function b0H(d,e){this.a=d
this.b=e},
bfb(d,e){var x=0,w=A.m(y.H)
var $async$bfb=A.i(function(f,g){if(f===1)return A.j(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.z_(A.cW("https://meet.jit.si/"+e,0,null),B.Y_,"_blank"),$async$bfb)
case 2:return A.k(null,w)}})
return A.l($async$bfb,w)}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[3],C)
D=c[9]
C.kC.prototype={
gD0(){var x,w,v,u,t,s=this.d
if(s==null)return null
x=this.e.split(":")
w=x.length
if(w!==0){v=A.di(x[0],null)
u=v==null?0:v}else u=0
if(w>1){w=A.di(x[1],null)
t=w==null?0:w}else t=0
return A.bf(A.aS(s),A.b6(s),A.dh(s),u,t,0,0,0)},
gqa(){var x,w=this.gD0()
if(w==null)return"bientot"
x=new A.aW(Date.now(),0,!1)
if(x.hy(w))return"avenir"
if(x.hy(w.mv(108e8)))return"direct"
return"terminee"}}
C.tq.prototype={
R(){return new C.QY(A.a([],y.E))}}
C.QY.prototype={
a0(){this.ac()
this.qJ()},
qJ(){var x=0,w=A.m(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j
var $async$qJ=A.i(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.q(new C.b58(s))
u=4
x=7
return A.e(C.F6(),$async$qJ)
case 7:r=e
if(s.c==null){x=1
break}s.q(new C.b59(s,r))
q=A.a([],y.l)
for(n=J.as(r);n.v();){p=n.gL(n)
if(p.gD0()!=null&&p.gqa()==="avenir"){m=p.b
l=p.gD0()
l.toString
J.ci(q,new A.a9u(l,m))}}o=q
x=8
return A.e($.kS().t4($.ap,o),$async$qJ)
case 8:u=2
x=6
break
case 4:u=3
j=t
if(s.c==null){x=1
break}s.q(new C.b5a(s))
x=6
break
case 3:x=2
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$qJ,w)},
aCP(d){var x,w,v,u,t,s=d.d
if(s==null)return A.b("Date \xe0 confirmer")
x=$.ap==="en"
w=x?B.l7:D.a_d
v=""+A.dh(s)+" "+w[A.b6(s)-1]+" "+A.aS(s)
u=d.e
if(u.length>=5)u=B.d.W(u,0,5)
t=x?"at":"\xe0"
return u.length===0?v:v+" "+t+" "+u},
BC(d,e){return this.aDk(d,e)},
aDk(d,e){var x=0,w=A.m(y.H),v,u=2,t,s,r,q,p,o
var $async$BC=A.i(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:p=e.f
if(p.length===0){p=A.b("Salle de r\xe9union non configur\xe9e. Contactez la structure.")
d.t(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(p,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}s=A.b("Ouverture de la r\xe9union\u2026")
r=y.q
d.t(r).f.J(A.F(null,null,null,null,null,B.i,null,A.c(s,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
u=4
s=$.X().a
s=s==null?null:s.a
x=7
return A.e(C.bfb(s==null?"":s,p),$async$BC)
case 7:u=2
x=6
break
case 4:u=3
o=t
if(d.e!=null){p=A.b("Impossible d\u2019ouvrir la r\xe9union. V\xe9rifiez votre connexion.")
d.t(r).f.J(A.F(null,null,null,null,null,B.i,null,A.c(p,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=6
break
case 3:x=2
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$BC,w)},
Bw(d){return this.aCx(d)},
aCx(d){var x=0,w=A.m(y.H),v,u=this,t
var $async$Bw=A.i(function(e,f){if(e===1)return A.j(f,w)
while(true)switch(x){case 0:t=$.am().b
if(!(t!=null&&t.length!==0)){t=A.b("Connectez-vous au serveur avec un compte administrateur g\xe9n\xe9ral pour planifier une r\xe9union.")
d.t(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(t,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}x=3
return A.e(A.aN(d,!1).hY(A.jK(new C.b5b(),null,y.y)),$async$Bw)
case 3:if(f!==!0||d.e==null){x=1
break}x=4
return A.e(u.qJ(),$async$Bw)
case 4:case 1:return A.k(v,w)}})
return A.l($async$Bw,w)},
wA(d,e){return this.aDR(d,e)},
aDR(d,e){var x=0,w=A.m(y.H),v,u=2,t,s=this,r,q,p,o
var $async$wA=A.i(function(f,g){if(f===1){t=g
x=u}while(true)switch(x){case 0:x=3
return A.e(A.dC(null,null,!0,null,new C.b5e(),d,null,!0,!0,y.y),$async$wA)
case 3:if(g!==!0||d.e==null){x=1
break}u=5
x=8
return A.e($.am().adx(e.a,!1),$async$wA)
case 8:if(d.e==null){x=1
break}q=A.b("R\xe9union retir\xe9e.")
d.t(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(q,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=9
return A.e(s.qJ(),$async$wA)
case 9:u=2
x=7
break
case 5:u=4
o=t
r=A.V(o)
if(d.e!=null){q=A.r(r)
d.t(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c("Retrait refus\xe9 ("+q+").",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=7
break
case 4:x=2
break
case 7:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$wA,w)},
D(d){return A.eb(new C.b5m(this))}}
C.yz.prototype={
R(){var x=$.ae()
return new C.Q7(new A.b7(B.W,x),new A.b7(B.W,x))}}
C.Q7.prototype={
m(){var x=this.d,w=$.ae()
x.go$=w
x.fy$=0
x=this.e
x.go$=w
x.fy$=0
this.ae()},
Qv(){var x,w,v,u,t=this
if(t.r!=null&&t.w!=null&&t.x!=null){x=t.x
x.toString
w=t.w
w.toString
v=A.dh(A.bf(x,w+1,0,0,0,0,0,0))
x=t.r
x.toString
if(x>v){t.r=v
x=v}w=t.x
w.toString
u=t.w
u.toString
t.f=A.bf(w,u,x,0,0,0,0,0)}},
Iz(){var x=0,w=A.m(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$Iz=A.i(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.Q){x=1
break}r=B.d.ab(s.d.a.a)
m=s.y
if(m!=null&&s.z!=null){m.toString
l=s.z
l.toString
k=new A.cb(m,l)}else k=null
j=A.bf(A.aS(new A.aW(Date.now(),0,!1)),A.b6(new A.aW(Date.now(),0,!1)),A.dh(new A.aW(Date.now(),0,!1)),0,0,0,0,0)
if(J.ab(r)!==0){m=s.f
m=m==null||k==null||m.hy(j)}else m=!0
if(m){m=s.c
m.toString
l=A.b("Le titre, la date et l\u2019heure sont requis.")
m.t(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(l,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}s.q(new C.b0F(s))
q=C.bMR()
p=B.d.bi(B.e.j(k.a),2,"0")
o=B.d.bi(B.e.j(k.b),2,"0")
u=4
m=$.am()
l=B.d.ab(s.e.a.a)
if(l.length===0)l=null
i=s.f
i.toString
i=B.d.bi(B.e.j(A.aS(i)),4,"0")
h=s.f
h.toString
h=B.d.bi(B.e.j(A.b6(h)),2,"0")
g=s.f
g.toString
x=7
return A.e(m.aLC(i+"-"+h+"-"+B.d.bi(B.e.j(A.dh(g)),2,"0"),l,A.r(p)+":"+A.r(o),r,q,"reunion"),$async$Iz)
case 7:m=s.c
if(m==null){x=1
break}l=A.b("R\xe9union planifi\xe9e et publi\xe9e.")
m.t(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(l,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
l=s.c
l.toString
A.aN(l,!1).aZ(!0)
u=2
x=6
break
case 4:u=3
e=t
n=A.V(e)
m=s.c
if(m!=null){l=A.r(n)
m.t(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c("Publication refus\xe9e ("+l+"). La route /admin/evenements est r\xe9serv\xe9e au compte administrateur g\xe9n\xe9ral.",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
s.q(new C.b0G(s))}x=6
break
case 3:x=2
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$Iz,w)},
D(d){var x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i=this,h=null,g=A.jn(h,h,h,h,h,h,h,h,h,h,A.c(A.b("Nouvelle r\xe9union en ligne"),h,h,h,h,h,h,h,h),h,h),f=A.b("Titre de la r\xe9union")
f=A.cw(!0,B.z,!1,h,!0,B.i,h,A.cz(),i.d,h,h,h,h,h,2,A.bY(h,new A.bZ(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,f,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),B.J,!0,h,!0,h,!1,h,B.a5,h,h,h,h,h,h,h,1,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,B.a2,h,h,B.a4,B.a1,h,h,h,h,h,h,h,B.P,h,B.ac,h,h,h,h)
x=A.b("Description (facultatif)")
x=A.cw(!0,B.z,!1,h,!0,B.i,h,A.cz(),i.e,h,h,h,h,h,2,A.bY(h,new A.bZ(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,x,!0,h,h,h,h,h,h,h,h,h,h,h,h,h),B.J,!0,h,!0,h,!1,h,B.a5,h,h,h,h,h,h,h,3,h,h,!1,"\u2022",h,h,h,h,h,!1,h,!1,h,!0,h,B.a2,h,h,B.a4,B.a1,h,h,h,h,h,h,h,B.P,h,B.ac,h,h,h,h)
w=i.r
v=A.b("Jour")
v=A.bY(h,new A.bZ(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,v,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=y.I
t=A.a([],u)
for(s=y.c,r=1;r<=31;++r)t.push(new A.cQ(r,A.c(""+r,h,h,h,h,h,h,h,h),B.ax,h,s))
q=y.S
w=A.ah(A.eP(v,h,h,!0,t,new C.b0M(i),h,w,q),1)
t=i.w
v=A.b("Mois")
v=A.bY(h,new A.bZ(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,v,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
p=A.a([],u)
for(o=1;o<=12;++o){n=$.ap==="en"?B.cs:B.hj
p.push(new A.cQ(o,A.c(n[o-1],h,h,h,h,h,h,h,h),B.ax,h,s))}v=A.ah(A.eP(v,h,h,!0,p,new C.b0N(i),h,t,q),2)
t=i.x
p=A.b("Ann\xe9e")
p=A.bY(h,new A.bZ(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
n=A.a([],u)
for(m=A.aS(new A.aW(Date.now(),0,!1));m<=A.aS(new A.aW(Date.now(),0,!1))+1;++m)n.push(new A.cQ(m,A.c(""+m,h,h,h,h,h,h,h,h),B.ax,h,s))
l=y.p
t=A.a8(A.a([w,B.O,v,B.O,A.ah(A.eP(p,h,h,!0,n,new C.b0O(i),h,t,q),1)],l),B.n,B.f,B.h,h)
n=i.y
p=A.b("Heure")
p=A.bY(h,new A.bZ(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
v=A.a([],u)
for(k=0;k<24;++k)v.push(new A.cQ(k,A.c(B.d.bi(B.e.j(k),2,"0"),h,h,h,h,h,h,h,h),B.ax,h,s))
w=A.ah(A.eP(p,h,h,!0,v,new C.b0P(i),h,n,q),1)
v=i.z
p=A.b("Minutes")
p=A.bY(h,new A.bZ(4,A.a5(14),B.ai),h,h,h,h,h,h,!0,h,h,h,h,h,h,B.m,!0,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,h,p,!0,h,h,h,h,h,h,h,h,h,h,h,h,h)
u=A.a([],u)
for(n=[0,15,30,45],j=0;j<4;++j){o=n[j]
u.push(new A.cQ(o,A.c(B.d.bi(B.e.j(o),2,"0"),h,h,h,h,h,h,h,h),B.ax,h,s))}w=A.a8(A.a([w,B.O,A.ah(A.eP(p,h,h,!0,u,new C.b0Q(i),h,v,q),1)],l),B.n,B.f,B.h,h)
v=i.Q?h:i.gaDW()
return A.hs(g,h,A.eF(new A.a4(B.H,A.U(A.a([f,B.k,x,B.k,t,B.k,w,B.r,A.af(A.bH(!1,A.c(A.b("Publier"),h,h,h,h,h,h,h,h),B.j,h,B.t,h,h,h,h,v,h,h),52,1/0)],l),B.q,B.f,B.h),h),h,h,h,B.ad),h)}}
var z=a.updateTypes(["ay<~>()","I(kC)","z(kC,kC)","yz(Q)","h(kC)"])
C.beh.prototype={
$2(d,e){var x=d.gD0(),w=e.gD0()
if(x==null&&w==null)return B.d.bt(d.b,e.b)
if(x==null)return 1
if(w==null)return-1
return J.Fh(x,w)},
$S:z+2}
C.b58.prototype={
$0(){var x=this.a
x.e=!0
x.f=null},
$S:0}
C.b59.prototype={
$0(){var x=this.a
x.d=this.b
x.e=!1},
$S:0}
C.b5a.prototype={
$0(){var x=this.a
x.e=!1
x.f="offline"},
$S:0}
C.b5b.prototype={
$1(d){return D.anX},
$S:z+3}
C.b5e.prototype={
$1(d){var x=null,w=A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),v=A.c(A.b("Retirer cette r\xe9union ? Elle ne sera plus visible par les membres."),x,x,x,x,x,x,x,x)
return A.dM(A.a([A.c9(!1,A.c(A.b("Annuler"),x,x,x,x,x,x,x,x),x,x,B.t,x,x,x,x,new C.b5c(d),x,x),A.c9(!1,A.c(A.b("Retirer"),x,x,x,x,x,x,x,x),x,x,B.t,x,x,x,x,new C.b5d(d),x,x)],y.p),v,w)},
$S:11}
C.b5c.prototype={
$0(){return A.aN(this.a,!1).aZ(!1)},
$S:0}
C.b5d.prototype={
$0(){return A.aN(this.a,!1).aZ(!0)},
$S:0}
C.b5m.prototype={
$1(d){var x,w,v,u,t,s,r,q,p,o=null,n="R\xe9unions en ligne",m=A.A(d).p2,l=this.a,k=J.ix(l.d,new C.b5j()),j=A.O(k,!0,k.$ti.i("u.E"))
k=J.ix(l.d,new C.b5k())
x=A.O(k,!0,k.$ti.i("u.E"))
w=new C.b5n(l,m,d)
k=A.b(n)
v=A.A(d)
u=A.b(n)
t=A.b("Rejoignez nos r\xe9unions en vid\xe9o, en direct dans l\u2019application.")
s=y.p
t=A.a([A.btX(v,u,t,$.X().c?A.beM(B.iD,A.b("Planifier"),new C.b5l(l,d)):o),B.r],s)
if(l.e)t.push(D.NR)
else if(l.f!=null)t.push(A.dx(new A.a4(B.H,A.U(A.a([A.c(A.b("Connexion impossible et aucune r\xe9union en cache. R\xe9essayez avec internet."),o,o,o,o,o,o,o,o),B.k,A.cR(!1,A.c(A.b("R\xe9essayer"),o,o,o,o,o,o,o,o),o,o,B.t,o,o,o,o,l.gaDV(),o,o)],s),B.n,B.f,B.h),o),o,o,o,o))
else if(J.ca(l.d))t.push(A.dx(new A.a4(B.H,A.c(A.b("Aucune r\xe9union planifi\xe9e pour le moment."),o,o,o,o,o,o,o,o),o),o,o,o,o))
else{v=A.a([],s)
for(u=j.length,r=0;r<u;++r)v.push(w.$1(j[r]))
u=x.length
if(u!==0){q=A.b("R\xe9unions pass\xe9es")
p=m.x
s=A.a([B.k,A.c(q,o,o,o,o,p==null?o:p.aX(B.aa,B.A),o,o,o),B.k],s)
for(r=0;r<u;++r)s.push(w.$1(x[r]))
B.b.A(v,s)}B.b.A(t,v)}l.a.toString
return A.bw(k,t,o,o)},
$S:4}
C.b5j.prototype={
$1(d){return d.gqa()==="avenir"||d.gqa()==="direct"||d.gqa()==="bientot"},
$S:z+1}
C.b5k.prototype={
$1(d){return d.gqa()==="terminee"},
$S:z+1}
C.b5n.prototype={
$1(d){var x,w,v,u,t,s,r,q=this,p=null,o=d.gqa()==="direct",n=q.b,m=n.w
m=m==null?p:m.aX(B.p,B.y)
m=A.ah(A.c(d.b,p,p,p,p,m,p,p,p),1)
x=d.gqa()
w=x==="direct"
if(w)v=A.b("En direct")
else if(x==="avenir"){u=A.b("\xc0 venir")
v=u}else{u=x==="terminee"?A.b("Termin\xe9e"):A.b("Bient\xf4t")
v=u}if(w)t=B.Cg
else t=x==="avenir"?B.w:B.aa
x=t.dQ(0.12)
w=A.a5(20)
u=A.aa(p,p,B.j,p,p,new A.ak(t,p,p,p,p,p,B.bC),p,8,p,p,p,p,p,8)
s=n.at
r=y.p
w=A.a8(A.a([m,A.aa(p,A.a8(A.a([u,B.fz,A.c(v,p,p,p,p,s==null?p:s.aX(t,B.y),p,p,p)],r),B.n,B.f,B.a9,p),B.j,p,p,new A.ak(x,p,p,w,p,p,B.v),p,p,p,p,B.dV,p,p,p)],r),B.n,B.f,B.h,p)
x=q.a
s=x.aCP(d)
n=n.z
m=A.a([w,B.U,A.a8(A.a([D.WP,B.fz,A.c(s,p,p,p,p,n==null?p:n.aI(B.aa),p,p,p)],r),B.n,B.f,B.h,p)],r)
w=d.c
if(w.length!==0)B.b.A(m,A.a([B.cy,A.c(w,p,p,p,p,n,p,p,p)],r))
m.push(B.k)
n=A.a([],r)
if(!o&&d.gqa()!=="terminee")n.push(A.ah(A.cE(D.Wm,A.c(A.b("Rejoindre"),p,p,p,p,p,p,p,p),new C.b5f(x,q.c,d),p),1))
if(o){w=A.fu(B.Cg,B.m,p,p,p,p)
n.push(A.ah(A.cE(D.VN,A.c(A.b("Rejoindre \u2014 en direct"),p,p,p,p,p,p,p,p),new C.b5g(x,q.c,d),w),1))}w=$.X()
if(w.c&&d.f.length!==0)B.b.A(n,A.a([B.O,A.cs(D.WN,A.c(A.b("Copier le lien"),p,p,p,p,p,p,p,p),new C.b5h(d,q.c),p)],r))
if(w.c)B.b.A(n,A.a([B.O,A.bI(p,p,p,D.VX,p,p,new C.b5i(x,q.c,d),p,p,p,A.b("Retirer"),p)],r))
m.push(A.a8(n,B.n,B.f,B.h,p))
return A.dx(new A.a4(B.H,A.U(m,B.q,B.f,B.h),p),p,p,B.az,p)},
$S:z+4}
C.b5f.prototype={
$0(){return this.a.BC(this.b,this.c)},
$S:0}
C.b5g.prototype={
$0(){return this.a.BC(this.b,this.c)},
$S:0}
C.b5h.prototype={
$0(){var x=0,w=A.m(y.H),v=this,u,t
var $async$$0=A.i(function(d,e){if(d===1)return A.j(e,w)
while(true)switch(x){case 0:x=2
return A.e(A.vf(new A.oL("https://meet.jit.si/"+v.a.f)),$async$$0)
case 2:u=v.b
if(u.e!=null){t=A.b("Lien de la r\xe9union copi\xe9.")
u.t(y.q).f.J(A.F(null,null,null,null,null,B.i,null,A.c(t,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}return A.k(null,w)}})
return A.l($async$$0,w)},
$S:2}
C.b5i.prototype={
$0(){return this.a.wA(this.b,this.c)},
$S:0}
C.b5l.prototype={
$0(){return this.a.Bw(this.b)},
$S:0}
C.b0F.prototype={
$0(){return this.a.Q=!0},
$S:0}
C.b0G.prototype={
$0(){return this.a.Q=!1},
$S:0}
C.b0M.prototype={
$1(d){var x=this.a
return x.q(new C.b0L(x,d))},
$S:61}
C.b0L.prototype={
$0(){var x=this.a
x.r=this.b
x.Qv()},
$S:0}
C.b0N.prototype={
$1(d){var x=this.a
return x.q(new C.b0K(x,d))},
$S:61}
C.b0K.prototype={
$0(){var x=this.a
x.w=this.b
x.Qv()},
$S:0}
C.b0O.prototype={
$1(d){var x=this.a
return x.q(new C.b0J(x,d))},
$S:61}
C.b0J.prototype={
$0(){var x=this.a
x.x=this.b
x.Qv()},
$S:0}
C.b0P.prototype={
$1(d){var x=this.a
return x.q(new C.b0I(x,d))},
$S:61}
C.b0I.prototype={
$0(){return this.a.y=this.b},
$S:0}
C.b0Q.prototype={
$1(d){var x=this.a
return x.q(new C.b0H(x,d))},
$S:61}
C.b0H.prototype={
$0(){return this.a.z=this.b},
$S:0};(function installTearOffs(){var x=a._instance_0u
x(C.QY.prototype,"gaDV","qJ",0)
x(C.Q7.prototype,"gaDW","Iz",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.kC,A.T)
x(C.beh,A.vh)
w(A.S,[C.tq,C.yz])
w(A.a_,[C.QY,C.Q7])
w(A.vg,[C.b58,C.b59,C.b5a,C.b5c,C.b5d,C.b5f,C.b5g,C.b5h,C.b5i,C.b5l,C.b0F,C.b0G,C.b0L,C.b0K,C.b0J,C.b0I,C.b0H])
w(A.lT,[C.b5b,C.b5e,C.b5m,C.b5j,C.b5k,C.b5n,C.b0M,C.b0N,C.b0O,C.b0P,C.b0Q])})()
A.b9L(b.typeUniverse,JSON.parse('{"yz":{"S":[],"h":[]},"tq":{"S":[],"h":[]},"QY":{"a_":["tq"]},"Q7":{"a_":["yz"]}}'))
var y=(function rtii(){var x=A.aL
return{c:x("cQ<z>"),I:x("D<cQ<z>>"),t:x("D<ao<o,@>>"),l:x("D<+debut,nom(aW,o)>"),E:x("D<kC>"),p:x("D<h>"),x:x("E<kC>"),j:x("E<@>"),f:x("ao<@,@>"),N:x("o"),q:x("ui"),y:x("I"),z:x("@"),S:x("z"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Tk=new A.ai(32,32,32,32)
D.a8U=new A.a4(D.Tk,B.i9,null)
D.NR=new A.hh(B.a6,null,null,D.a8U,null)
D.Uk=new A.al(59048,!1)
D.VN=new A.aA(D.Uk,null,null,null,null)
D.VX=new A.aA(B.kK,null,B.aa,null,null)
D.Wm=new A.aA(B.o8,null,null,null,null)
D.UQ=new A.al(61801,!1)
D.WN=new A.aA(D.UQ,null,null,null,null)
D.V7=new A.al(62265,!1)
D.WP=new A.aA(D.V7,16,B.aa,null,null)
D.a_d=A.a(x(["janv.","f\xe9vr.","mars","avr.","mai","juin","juil.","ao\xfbt","sept.","oct.","nov.","d\xe9c."]),A.aL("D<o>"))
D.anX=new C.yz(null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"zs+sVA6IkYQwHVUA2y7aIyzero0=");