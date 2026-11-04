((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
Zv(d){return new C.rU(d,null)},
rU:function rU(d,e){this.c=d
this.a=e},
Qd:function Qd(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
b1t:function b1t(d){this.a=d},
b1u:function b1u(d){this.a=d},
b1r:function b1r(d){this.a=d},
b1s:function b1s(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[5],C)
D=c[9]
C.rU.prototype={
O(){return new C.Qd(new A.bw(null,y.z))}}
C.Qd.prototype={
tE(){var x=0,w=A.m(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$tE=A.i(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.q(new C.b1t(r))
u=4
l=$.aN.ak$.x.h(0,r.d)
l=l==null?null:l.ga2()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.Fk(3),$async$tE)
case 7:p=e
x=8
return A.e(p.zx(B.eH),$async$tE)
case 8:o=e
l=o
n=l==null?null:J.fm(J.bm5(l))
if(n==null||J.a8(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.nd(n,"recu-"+r.a.c.a+".png"),$async$tE)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.ob(A.a([A.qm(m.a,null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$tE)
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
if(r.c!=null)r.q(new C.b1u(r))
x=s.pop()
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$tE,w)},
wq(){var x=0,w=A.m(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$wq=A.i(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.ah()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.q(new C.b1r(r))
u=4
x=7
return A.e(o.KJ(l.a),$async$wq)
case 7:q=e
x=8
return A.e(A.nd(q,"facture-"+l.a+".pdf"),$async$wq)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.ob(A.a([A.qm(p.a,null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$wq)
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
if(r.c!=null)r.q(new C.b1s(r))
x=s.pop()
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$wq,w)},
C(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.y(d).p2,j=n.a.c
if(!j.ch)return A.bs(A.b("Facture"),A.a([new A.ci(B.l7,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.b("Facture")
w=$.au==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jy(t==null?j.ay:t)
else w="Date : "+A.jy(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.au==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.Y,w,r,A.c(s,m,m,m,m,t,m,m,m),B.nT],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.UF(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.F)(w),++p){o=w[p]
s.push(new A.a3(B.o_,A.a5(A.a([new A.dn(1,B.ay,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bN(o.b),m,m,m,m,r,m,m,m)],q),B.n,B.f,B.i,m),m))}s.push(B.nT)
s.push(A.a5(A.a([A.ai(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1),A.c(A.bN(j.at),m,m,m,m,u,m,m,m)],q),B.n,B.f,B.i,m))
w=A.dB(new A.a3(B.E,A.N(s,B.r,B.f,B.i),m),m,m,m,m)
v=n.e
u=v?m:n.gasE()
u=A.ab(A.c9(D.WT,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gasF()
return A.bs(x,A.a([new A.hC(w,n.d),B.p,u,B.j,A.ab(A.bX(B.iU,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["ax<~>()"])
C.b1t.prototype={
$0(){return this.a.f=!0},
$S:0}
C.b1u.prototype={
$0(){return this.a.f=!1},
$S:0}
C.b1r.prototype={
$0(){return this.a.e=!0},
$S:0}
C.b1s.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.Qd.prototype,"gasF","tE",0)
x(w,"gasE","wq",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.rU,A.U)
x(C.Qd,A.a_)
w(A.vK,[C.b1t,C.b1u,C.b1r,C.b1s])})()
A.bf4(b.typeUniverse,JSON.parse('{"rU":{"U":[],"h":[]},"Qd":{"a_":["rU"]}}'))
var y={u:A.aM("E<h>"),w:A.aM("E<eY>"),z:A.aM("bw<a_<U>>"),v:A.aM("uL"),n:A.aM("xO?"),q:A.aM("~")};(function constants(){D.W2=new A.ak(62116,!1)
D.WT=new A.ap(D.W2,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"1X6lroCxMLCjhQGJvTyJt7icrkI=");