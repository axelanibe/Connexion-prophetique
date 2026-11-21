((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_21",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aM2(d){return new C.xs(d,null)},
xs:function xs(d,e){this.c=d
this.a=e},
a_u:function a_u(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bxC:function bxC(d){this.a=d},
bxD:function bxD(d){this.a=d},
bxA:function bxA(d){this.a=d},
bxB:function bxB(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[11],C)
D=c[31]
C.xs.prototype={
P(){return new C.a_u(new A.bN(null,y.z))}}
C.a_u.prototype={
xi(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$xi=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.m(new C.bxC(r))
u=4
l=$.aM.aY$.x.h(0,r.d)
l=l==null?null:l.gab()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.C(A.A(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.wy(3),$async$xi)
case 7:p=e
x=8
return A.e(p.tP(B.e2),$async$xi)
case 8:o=e
l=o
n=l==null?null:J.cX(J.auL(l))
if(n==null||J.a3(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.C(A.A(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.ni(n,"recu-"+r.a.c.a+".png"),$async$xi)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.C(A.A(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.pz(A.a([A.pK(J.q4(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xi)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.b("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.u(y.v).f.C(A.A(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.m(new C.bxD(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xi,w)},
AX(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$AX=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a4()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.C(A.A(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.m(new C.bxA(r))
u=4
x=7
return A.e(o.TT(l.a),$async$AX)
case 7:q=e
x=8
return A.e(A.ni(q,"facture-"+l.a+".pdf"),$async$AX)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.C(A.A(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.pz(A.a([A.pK(J.q4(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$AX)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.b("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.u(y.v).f.C(A.A(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.m(new C.bxB(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$AX,w)},
D(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.B(d).p2,j=n.a.c
if(!j.ch)return A.bd(A.b("Facture"),A.a([new A.bV(B.np,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m,m,m,m,m)
x=A.b("Facture")
w=$.aK==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jZ(t==null?j.ay:t)
else w="Date : "+A.jZ(t==null?j.ay:t)
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
s=A.a([v,B.H,w,r,A.c(s,m,m,m,m,t,m,m,m),B.qG],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.a4y(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.P)(w),++p){o=w[p]
s.push(new A.a0(B.hp,A.U(A.a([new A.da(1,B.at,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.c2(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.f,B.i,m),m))}s.push(B.qG)
s.push(A.U(A.a([A.ag(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.c2(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.f,B.i,m))
w=A.d1(new A.a0(B.P,A.K(s,B.t,B.f,B.i),m),m,m,m,m,m,m)
v=n.e
u=v?m:n.gaLy()
u=A.ae(A.ca(D.a5W,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaLz()
return A.bd(x,A.a([new A.fB(w,n.d),B.p,u,B.k,A.ae(A.bK(B.kx,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.k,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m,m,m,m,m)}}
var z=a.updateTypes(["av<~>()"])
C.bxC.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bxD.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bxA.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bxB.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.a_u.prototype,"gaLz","xi",0)
x(w,"gaLy","AX",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.xs,A.S)
x(C.a_u,A.X)
w(A.k5,[C.bxC,C.bxD,C.bxA,C.bxB])})()
A.os(b.typeUniverse,JSON.parse('{"xs":{"S":[],"q":[]},"a_u":{"X":["xs"]}}'))
var y={u:A.aA("H<q>"),w:A.aA("H<i8>"),z:A.aA("bN<X<S>>"),v:A.aA("kx"),n:A.aA("DX?"),q:A.aA("~")};(function constants(){D.a2V=new A.aq(62116,"MaterialIcons",null,!1)
D.a5W=new A.ac(D.a2V,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_21",e:"endPart",h:b})})($__dart_deferred_initializers__,"vqBG4sEQnegQWzaaVeR26FDaBMo=");