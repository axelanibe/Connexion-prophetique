((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_21",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aOM(d){return new C.y0(d,null)},
y0:function y0(d,e){this.c=d
this.a=e},
a0X:function a0X(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bEM:function bEM(d){this.a=d},
bEN:function bEN(d){this.a=d},
bEK:function bEK(d){this.a=d},
bEL:function bEL(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[11],C)
D=c[29]
C.y0.prototype={
P(){return new C.a0X(new A.bN(null,y.z))}}
C.a0X.prototype={
y7(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$y7=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.l(new C.bEM(r))
u=4
l=$.aP.b1$.x.h(0,r.d)
l=l==null?null:l.gae()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.xh(3),$async$y7)
case 7:p=e
x=8
return A.e(p.ut(B.em),$async$y7)
case 8:o=e
l=o
n=l==null?null:J.d6(J.axj(l))
if(n==null||J.a8(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.nA(n,"recu-"+r.a.c.a+".png"),$async$y7)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.pT(A.a([A.q4(J.qr(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$y7)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.b("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.l(new C.bEN(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$y7,w)},
C4(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$C4=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a_()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))
x=1
break}r.l(new C.bEK(r))
u=4
x=7
return A.e(o.W0(l.a),$async$C4)
case 7:q=e
x=8
return A.e(A.nA(q,"facture-"+l.a+".pdf"),$async$C4)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.pT(A.a([A.q4(J.qr(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$C4)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.b("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.l(new C.bEL(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$C4,w)},
D(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.A(d).p2,j=n.a.c
if(!j.ch)return A.bl(A.b("Facture"),A.a([new A.c1(B.o3,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m,m,m,m,m)
x=A.b("Facture")
w=$.aN==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.kh(t==null?j.ay:t)
else w="Date : "+A.kh(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aN==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.I,w,r,A.c(s,m,m,m,m,t,m,m,m),B.rz],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.a6l(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.R)(w),++p){o=w[p]
s.push(new A.V(B.fV,A.P(A.a([new A.cU(1,B.ar,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.cc(o.b),m,m,m,m,r,m,m,m)],q),B.n,B.f,B.i,m),m))}s.push(B.rz)
s.push(A.P(A.a([A.a9(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.cc(j.at),m,m,m,m,u,m,m,m)],q),B.n,B.f,B.i,m))
w=A.cO(new A.V(B.Q,A.J(s,B.r,B.f,B.i),m),m,m,m,m,m,m)
v=n.e
u=v?m:n.gaPH()
u=A.ad(A.cb(D.a8E,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaPI()
return A.bl(x,A.a([new A.fM(w,n.d),B.q,u,B.l,A.ad(A.bx(B.lc,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.l,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m,m,m,m,m)}}
var z=a.updateTypes(["av<~>()"])
C.bEM.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bEN.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bEK.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bEL.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.a0X.prototype,"gaPI","y7",0)
x(w,"gaPH","C4",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.y0,A.S)
x(C.a0X,A.W)
w(A.km,[C.bEM,C.bEN,C.bEK,C.bEL])})()
A.oM(b.typeUniverse,JSON.parse('{"y0":{"S":[],"q":[]},"a0X":{"W":["y0"]}}'))
var y={u:A.az("G<q>"),w:A.az("G<ii>"),z:A.az("bN<W<S>>"),v:A.az("kN"),n:A.az("EG?"),q:A.az("~")};(function constants(){D.a5s=new A.ap(62116,"MaterialIcons",null,!1)
D.a8E=new A.aa(D.a5s,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_21",e:"endPart",h:b})})($__dart_deferred_initializers__,"wqMGkXKuEJ8DW4CIlz1Meud1Ozo=");