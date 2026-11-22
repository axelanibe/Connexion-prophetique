((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_21",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aNw(d){return new C.xJ(d,null)},
xJ:function xJ(d,e){this.c=d
this.a=e},
a0f:function a0f(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bBr:function bBr(d){this.a=d},
bBs:function bBs(d){this.a=d},
bBp:function bBp(d){this.a=d},
bBq:function bBq(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[11],C)
D=c[31]
C.xJ.prototype={
P(){return new C.a0f(new A.bK(null,y.z))}}
C.a0f.prototype={
xO(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$xO=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.l(new C.bBr(r))
u=4
l=$.aO.aY$.x.h(0,r.d)
l=l==null?null:l.gaf()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.x_(3),$async$xO)
case 7:p=e
x=8
return A.e(p.uc(B.e9),$async$xO)
case 8:o=e
l=o
n=l==null?null:J.d1(J.awa(l))
if(n==null||J.a7(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.nq(n,"recu-"+r.a.c.a+".png"),$async$xO)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.pG(A.a([A.pR(J.qd(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xO)
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
if(r.c!=null)r.l(new C.bBs(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xO,w)},
BF(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$BF=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a1()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))
x=1
break}r.l(new C.bBp(r))
u=4
x=7
return A.e(o.V8(l.a),$async$BF)
case 7:q=e
x=8
return A.e(A.nq(q,"facture-"+l.a+".pdf"),$async$BF)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.A(A.z(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.k,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.pG(A.a([A.pR(J.qd(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$BF)
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
if(r.c!=null)r.l(new C.bBq(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$BF,w)},
D(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.A(d).p2,j=n.a.c
if(!j.ch)return A.bf(A.b("Facture"),A.a([new A.bX(B.nF,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m,m,m,m,m)
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
s=A.a([v,B.J,w,r,A.c(s,m,m,m,m,t,m,m,m),B.r7],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.a5q(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.R)(w),++p){o=w[p]
s.push(new A.a_(B.hD,A.U(A.a([new A.d5(1,B.at,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.c9(o.b),m,m,m,m,r,m,m,m)],q),B.n,B.f,B.i,m),m))}s.push(B.r7)
s.push(A.U(A.a([A.ae(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.c9(j.at),m,m,m,m,u,m,m,m)],q),B.n,B.f,B.i,m))
w=A.cP(new A.a_(B.O,A.J(s,B.r,B.f,B.i),m),m,m,m,m,m,m)
v=n.e
u=v?m:n.gaNX()
u=A.ad(A.cd(D.a7q,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaNY()
return A.bf(x,A.a([new A.fF(w,n.d),B.q,u,B.l,A.ad(A.bA(B.kS,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.l,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m,m,m,m,m)}}
var z=a.updateTypes(["av<~>()"])
C.bBr.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bBs.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bBp.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bBq.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.a0f.prototype,"gaNY","xO",0)
x(w,"gaNX","BF",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.xJ,A.S)
x(C.a0f,A.W)
w(A.ka,[C.bBr,C.bBs,C.bBp,C.bBq])})()
A.oD(b.typeUniverse,JSON.parse('{"xJ":{"S":[],"q":[]},"a0f":{"W":["xJ"]}}'))
var y={u:A.ay("H<q>"),w:A.ay("H<ie>"),z:A.ay("bK<W<S>>"),v:A.ay("kC"),n:A.ay("Eo?"),q:A.ay("~")};(function constants(){D.a4h=new A.aq(62116,"MaterialIcons",null,!1)
D.a7q=new A.ac(D.a4h,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_21",e:"endPart",h:b})})($__dart_deferred_initializers__,"qPj+cAeHUZZBrkx3+lBWWqPCjdI=");