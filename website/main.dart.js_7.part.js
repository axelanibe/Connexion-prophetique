((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_7",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
avL(d){return new C.tX(d,null)},
tX:function tX(d,e){this.c=d
this.a=e},
RN:function RN(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
b96:function b96(d){this.a=d},
b97:function b97(d){this.a=d},
b94:function b94(d){this.a=d},
b95:function b95(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[7],C)
D=c[18]
C.tX.prototype={
N(){return new C.RN(new A.bH(null,y.z))}}
C.RN.prototype={
u8(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$u8=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.p(new C.b96(r))
u=4
l=$.aS.an$.x.h(0,r.d)
l=l==null?null:l.ga7()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.a("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.G(A.C(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.Zn(3),$async$u8)
case 7:p=e
x=8
return A.e(p.Ox(B.i4),$async$u8)
case 8:o=e
l=o
n=l==null?null:J.hb(J.bvZ(l))
if(n==null||J.a6(n)===0){l=r.c
if(l!=null){k=A.a("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.G(A.C(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.lG(n,"recu-"+r.a.c.a+".png"),$async$u8)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.G(A.C(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.oX(A.b([A.rh(J.nW(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$u8)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.a("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.u(y.v).f.G(A.C(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.p(new C.b97(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$u8,w)},
x0(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$x0=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.ai()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.a("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.G(A.C(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.p(new C.b94(r))
u=4
x=7
return A.e(o.M9(l.a),$async$x0)
case 7:q=e
x=8
return A.e(A.lG(q,"facture-"+l.a+".pdf"),$async$x0)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.G(A.C(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.oX(A.b([A.rh(J.nW(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$x0)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.a("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.u(y.v).f.G(A.C(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.p(new C.b95(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$x0,w)},
B(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.y(d).p2,j=n.a.c
if(!j.ch)return A.bn(A.a("Facture"),A.b([new A.c1(B.m1,A.a("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.a("Facture")
w=$.aA==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.je(t==null?j.ay:t)
else w="Date : "+A.je(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aA==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.b([v,B.K,w,r,A.c(s,m,m,m,m,t,m,m,m),B.oW],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.a("Contribution (don)")
else if(w==="cotisation")w=A.a("Cotisation mensuelle")
else if(w==="carte")w=A.a("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.Wn(j):A.a("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.I)(w),++p){o=w[p]
s.push(new A.a4(B.hH,A.a1(A.b([new A.cP(1,B.aq,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bF(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.f,B.i,m),m))}s.push(B.oW)
s.push(A.a1(A.b([A.ag(A.c(A.a("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bF(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.f,B.i,m))
w=A.dl(new A.a4(B.Q,A.M(s,B.q,B.f,B.i),m),m,m,m,m,m)
v=n.e
u=v?m:n.gawn()
u=A.ac(A.bR(D.YW,A.c(v?A.a(l):A.a("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gawo()
return A.bn(x,A.b([new A.j0(w,n.d),B.p,u,B.j,A.ac(A.c0(B.jA,A.c(v?A.a(l):A.a("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.a("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["as<~>()"])
C.b96.prototype={
$0(){return this.a.f=!0},
$S:0}
C.b97.prototype={
$0(){return this.a.f=!1},
$S:0}
C.b94.prototype={
$0(){return this.a.e=!0},
$S:0}
C.b95.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.RN.prototype,"gawo","u8",0)
x(w,"gawn","x0",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.tX,A.R)
x(C.RN,A.X)
w(A.lN,[C.b96,C.b97,C.b94,C.b95])})()
A.vP(b.typeUniverse,JSON.parse('{"tX":{"R":[],"n":[]},"RN":{"X":["tX"]}}'))
var y={u:A.av("F<n>"),w:A.av("F<fa>"),z:A.av("bH<X<R>>"),v:A.av("mw"),n:A.av("yT?"),q:A.av("~")};(function constants(){D.Y5=new A.ae(62116,!1)
D.YW=new A.ar(D.Y5,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_7",e:"endPart",h:b})})($__dart_deferred_initializers__,"Doroizba1wXVV1YpsJTt1Dvuouw=");