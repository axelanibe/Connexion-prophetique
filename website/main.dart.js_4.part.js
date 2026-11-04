((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
a_u(d){return new C.tr(d,null)},
tr:function tr(d,e){this.c=d
this.a=e},
R4:function R4(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
b46:function b46(d){this.a=d},
b47:function b47(d){this.a=d},
b44:function b44(d){this.a=d},
b45:function b45(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[5],C)
D=c[9]
C.tr.prototype={
O(){return new C.R4(new A.bx(null,y.z))}}
C.R4.prototype={
tV(){var x=0,w=A.m(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$tV=A.i(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.q(new C.b46(r))
u=4
l=$.aN.ak$.x.h(0,r.d)
l=l==null?null:l.ga2()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.FP(3),$async$tV)
case 7:p=e
x=8
return A.e(p.zQ(B.eN),$async$tV)
case 8:o=e
l=o
n=l==null?null:J.fg(J.bp4(l))
if(n==null||J.a8(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.mk(n,"recu-"+r.a.c.a+".png"),$async$tV)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.oz(A.a([A.qN(J.nD(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$tV)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.b("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.q(new C.b47(r))
x=s.pop()
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$tV,w)},
wH(){var x=0,w=A.m(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$wH=A.i(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.ai()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.q(new C.b44(r))
u=4
x=7
return A.e(o.L9(l.a),$async$wH)
case 7:q=e
x=8
return A.e(A.mk(q,"facture-"+l.a+".pdf"),$async$wH)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.oz(A.a([A.qN(J.nD(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$wH)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.b("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.q(new C.b45(r))
x=s.pop()
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$wH,w)},
B(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.z(d).p2,j=n.a.c
if(!j.ch)return A.bt(A.b("Facture"),A.a([new A.ci(B.ln,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.b("Facture")
w=$.av==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jM(t==null?j.ay:t)
else w="Date : "+A.jM(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.av==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.Y,w,r,A.c(s,m,m,m,m,t,m,m,m),B.o7],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.VA(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.I)(w),++p){o=w[p]
s.push(new A.a5(B.oe,A.a6(A.a([new A.dt(1,B.ay,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bO(o.b),m,m,m,m,r,m,m,m)],q),B.n,B.f,B.i,m),m))}s.push(B.o7)
s.push(A.a6(A.a([A.aj(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1),A.c(A.bO(j.at),m,m,m,m,u,m,m,m)],q),B.n,B.f,B.i,m))
w=A.dD(new A.a5(B.E,A.O(s,B.r,B.f,B.i),m),m,m,m,m)
v=n.e
u=v?m:n.gaul()
u=A.ad(A.ca(D.XJ,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaum()
return A.bt(x,A.a([new A.hM(w,n.d),B.p,u,B.j,A.ad(A.bY(B.j0,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["ap<~>()"])
C.b46.prototype={
$0(){return this.a.f=!0},
$S:0}
C.b47.prototype={
$0(){return this.a.f=!1},
$S:0}
C.b44.prototype={
$0(){return this.a.e=!0},
$S:0}
C.b45.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.R4.prototype,"gaum","tV",0)
x(w,"gaul","wH",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.tr,A.U)
x(C.R4,A.a_)
w(A.wb,[C.b46,C.b47,C.b44,C.b45])})()
A.bhW(b.typeUniverse,JSON.parse('{"tr":{"U":[],"h":[]},"R4":{"a_":["tr"]}}'))
var y={u:A.aJ("F<h>"),w:A.aJ("F<f3>"),z:A.aJ("bx<a_<U>>"),v:A.aJ("vf"),n:A.aJ("yi?"),q:A.aJ("~")};(function constants(){D.WS=new A.ak(62116,!1)
D.XJ=new A.as(D.WS,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"uercuhV9+MA59p/9F+I/34V+cNk=");