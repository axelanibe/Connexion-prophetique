((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_18",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aC_(d){return new C.uY(d,null)},
uY:function uY(d,e){this.c=d
this.a=e},
Ve:function Ve(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bl0:function bl0(d){this.a=d},
bl1:function bl1(d){this.a=d},
bkZ:function bkZ(d){this.a=d},
bl_:function bl_(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[10],C)
D=c[28]
C.uY.prototype={
N(){return new C.Ve(new A.bz(null,y.z))}}
C.Ve.prototype={
vb(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$vb=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.n(new C.bl0(r))
u=4
l=$.aL.aJ$.x.h(0,r.d)
l=l==null?null:l.ga6()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.a("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.B(A.y(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.d(q.uw(3),$async$vb)
case 7:p=e
x=8
return A.d(p.r6(B.dH),$async$vb)
case 8:o=e
l=o
n=l==null?null:J.fq(J.anu(l))
if(n==null||J.a4(n)===0){l=r.c
if(l!=null){k=A.a("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.B(A.y(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.d(A.md(n,"recu-"+r.a.c.a+".png"),$async$vb)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.B(A.y(null,null,null,null,null,B.f,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.d(A.o9(A.b([A.ok(J.oI(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$vb)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.a("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.u(y.v).f.B(A.y(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.n(new C.bl1(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$vb,w)},
yF(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$yF=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a8()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.a("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.B(A.y(null,null,null,null,null,B.f,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.n(new C.bkZ(r))
u=4
x=7
return A.d(o.PG(l.a),$async$yF)
case 7:q=e
x=8
return A.d(A.md(q,"facture-"+l.a+".pdf"),$async$yF)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.B(A.y(null,null,null,null,null,B.f,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.d(A.o9(A.b([A.ok(J.oI(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$yF)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.a("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.u(y.v).f.B(A.y(null,null,null,null,null,B.f,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.n(new C.bl_(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$yF,w)},
C(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.x(d).p2,j=n.a.c
if(!j.ch)return A.b6(A.a("Facture"),A.b([new A.bE(B.mF,A.a("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m,m,m,m,m)
x=A.a("Facture")
w=$.aD==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jL(t==null?j.ay:t)
else w="Date : "+A.jL(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aD==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.b([v,B.F,w,r,A.c(s,m,m,m,m,t,m,m,m),B.pO],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.a("Contribution (don)")
else if(w==="cotisation")w=A.a("Cotisation mensuelle")
else if(w==="carte")w=A.a("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.a_4(j):A.a("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.L)(w),++p){o=w[p]
s.push(new A.a_(B.fU,A.X(A.b([new A.cM(1,B.an,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bS(o.b),m,m,m,m,r,m,m,m)],q),B.p,B.e,B.i,m),m))}s.push(B.pO)
s.push(A.X(A.b([A.ak(A.c(A.a("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bS(j.at),m,m,m,m,u,m,m,m)],q),B.p,B.e,B.i,m))
w=A.dn(new A.a_(B.N,A.J(s,B.t,B.e,B.i),m),m,m,m,m,m)
v=n.e
u=v?m:n.gaD6()
u=A.ab(A.bO(D.a09,A.c(v?A.a(l):A.a("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaD7()
return A.b6(x,A.b([new A.f3(w,n.d),B.q,u,B.k,A.ab(A.bD(B.iw,A.c(v?A.a(l):A.a("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.k,A.c(A.a("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m,m,m,m,m)}}
var z=a.updateTypes(["ar<~>()"])
C.bl0.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bl1.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bkZ.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bl_.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.Ve.prototype,"gaD7","vb",0)
x(w,"gaD6","yF",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.uY,A.M)
x(C.Ve,A.Q)
w(A.jS,[C.bl0,C.bl1,C.bkZ,C.bl_])})()
A.ox(b.typeUniverse,JSON.parse('{"uY":{"M":[],"m":[]},"Ve":{"Q":["uY"]}}'))
var y={u:A.ax("D<m>"),w:A.ax("D<ht>"),z:A.ax("bz<Q<M>>"),v:A.ax("kr"),n:A.ax("Ax?"),q:A.ax("~")};(function constants(){D.a_8=new A.al(62116,!1)
D.a09=new A.ae(D.a_8,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_18",e:"endPart",h:b})})($__dart_deferred_initializers__,"vi+EIbKbobT1pKevHGFP5JPjEto=");