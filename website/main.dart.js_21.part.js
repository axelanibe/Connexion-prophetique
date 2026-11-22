((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_21",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aN8(d){return new C.xB(d,null)},
xB:function xB(d,e){this.c=d
this.a=e},
a07:function a07(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bAI:function bAI(d){this.a=d},
bAJ:function bAJ(d){this.a=d},
bAG:function bAG(d){this.a=d},
bAH:function bAH(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[11],C)
D=c[31]
C.xB.prototype={
P(){return new C.a07(new A.bK(null,y.z))}}
C.a07.prototype={
xJ(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$xJ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.l(new C.bAI(r))
u=4
l=$.aM.aY$.x.h(0,r.d)
l=l==null?null:l.gae()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.B(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.wT(3),$async$xJ)
case 7:p=e
x=8
return A.e(p.u5(B.e8),$async$xJ)
case 8:o=e
l=o
n=l==null?null:J.d0(J.avO(l))
if(n==null||J.a6(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.B(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.nq(n,"recu-"+r.a.c.a+".png"),$async$xJ)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.B(A.z(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.pF(A.a([A.pQ(J.qb(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xJ)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.b("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.t(y.v).f.B(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.l(new C.bAJ(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xJ,w)},
By(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$By=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a1()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.B(A.z(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))
x=1
break}r.l(new C.bAG(r))
u=4
x=7
return A.e(o.UW(l.a),$async$By)
case 7:q=e
x=8
return A.e(A.nq(q,"facture-"+l.a+".pdf"),$async$By)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.B(A.z(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.pF(A.a([A.pQ(J.qb(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$By)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.b("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.t(y.v).f.B(A.z(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.l(new C.bAH(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$By,w)},
D(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.A(d).p2,j=n.a.c
if(!j.ch)return A.bf(A.b("Facture"),A.a([new A.bW(B.nB,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m,m,m,m,m)
x=A.b("Facture")
w=$.aK==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.k3(t==null?j.ay:t)
else w="Date : "+A.k3(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aK==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.I,w,r,A.c(s,m,m,m,m,t,m,m,m),B.qZ],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.a5j(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.Q)(w),++p){o=w[p]
s.push(new A.Y(B.hz,A.U(A.a([new A.db(1,B.at,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.c6(o.b),m,m,m,m,r,m,m,m)],q),B.n,B.f,B.i,m),m))}s.push(B.qZ)
s.push(A.U(A.a([A.ag(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.c6(j.at),m,m,m,m,u,m,m,m)],q),B.n,B.f,B.i,m))
w=A.cJ(new A.Y(B.N,A.J(s,B.t,B.f,B.i),m),m,m,m,m,m,m)
v=n.e
u=v?m:n.gaNB()
u=A.ad(A.ca(D.a6K,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaNC()
return A.bf(x,A.a([new A.fF(w,n.d),B.p,u,B.l,A.ad(A.bz(B.kN,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.l,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m,m,m,m,m)}}
var z=a.updateTypes(["au<~>()"])
C.bAI.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bAJ.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bAG.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bAH.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.a07.prototype,"gaNC","xJ",0)
x(w,"gaNB","By",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.xB,A.R)
x(C.a07,A.V)
w(A.k9,[C.bAI,C.bAJ,C.bAG,C.bAH])})()
A.oB(b.typeUniverse,JSON.parse('{"xB":{"R":[],"q":[]},"a07":{"V":["xB"]}}'))
var y={u:A.ay("H<q>"),w:A.ay("H<id>"),z:A.ay("bK<V<R>>"),v:A.ay("kB"),n:A.ay("Ei?"),q:A.ay("~")};(function constants(){D.a3E=new A.aq(62116,"MaterialIcons",null,!1)
D.a6K=new A.ac(D.a3E,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_21",e:"endPart",h:b})})($__dart_deferred_initializers__,"twnuD+aeb/sgZbiLcnHMnOgq0mg=");