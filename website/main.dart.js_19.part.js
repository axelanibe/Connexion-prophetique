((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_19",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
azG(d){return new C.uA(d,null)},
uA:function uA(d,e){this.c=d
this.a=e},
U0:function U0(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bhC:function bhC(d){this.a=d},
bhD:function bhD(d){this.a=d},
bhA:function bhA(d){this.a=d},
bhB:function bhB(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[10],C)
D=c[29]
C.uA.prototype={
N(){return new C.U0(new A.bz(null,y.z))}}
C.U0.prototype={
uR(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$uR=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.n(new C.bhC(r))
u=4
l=$.aP.ap$.x.h(0,r.d)
l=l==null?null:l.ga5()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.a("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.C(A.B(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.wV(3),$async$uR)
case 7:p=e
x=8
return A.e(p.ua(B.dX),$async$uR)
case 8:o=e
l=o
n=l==null?null:J.fC(J.alM(l))
if(n==null||J.a4(n)===0){l=r.c
if(l!=null){k=A.a("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.C(A.B(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.m_(n,"recu-"+r.a.c.a+".png"),$async$uR)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.C(A.B(null,null,null,null,null,B.f,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.nR(A.b([A.pK(J.om(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$uR)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.a("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.u(y.v).f.C(A.B(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.n(new C.bhD(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uR,w)},
xV(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$xV=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a7()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.a("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.C(A.B(null,null,null,null,null,B.f,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.n(new C.bhA(r))
u=4
x=7
return A.e(o.Oj(l.a),$async$xV)
case 7:q=e
x=8
return A.e(A.m_(q,"facture-"+l.a+".pdf"),$async$xV)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.C(A.B(null,null,null,null,null,B.f,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.nR(A.b([A.pK(J.om(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xV)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.a("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.u(y.v).f.C(A.B(null,null,null,null,null,B.f,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.n(new C.bhB(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xV,w)},
B(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.x(d).p2,j=n.a.c
if(!j.ch)return A.b8(A.a("Facture"),A.b([new A.bD(B.mp,A.a("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.a("Facture")
w=$.aC==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jx(t==null?j.ay:t)
else w="Date : "+A.jx(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aC==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.b([v,B.G,w,r,A.c(s,m,m,m,m,t,m,m,m),B.pC],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.a("Contribution (don)")
else if(w==="cotisation")w=A.a("Cotisation mensuelle")
else if(w==="carte")w=A.a("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.YH(j):A.a("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.L)(w),++p){o=w[p]
s.push(new A.a_(B.fX,A.Z(A.b([new A.cQ(1,B.ao,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bQ(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.e,B.i,m),m))}s.push(B.pC)
s.push(A.Z(A.b([A.am(A.c(A.a("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bQ(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.e,B.i,m))
w=A.ds(new A.a_(B.N,A.M(s,B.u,B.e,B.i),m),m,m,m,m,m)
v=n.e
u=v?m:n.gaAq()
u=A.ab(A.bE(D.a_R,A.c(v?A.a(l):A.a("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaAr()
return A.b8(x,A.b([new A.hi(w,n.d),B.p,u,B.j,A.ab(A.bF(B.jT,A.c(v?A.a(l):A.a("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.a("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["as<~>()"])
C.bhC.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bhD.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bhA.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bhB.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.U0.prototype,"gaAr","uR",0)
x(w,"gaAq","xV",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.uA,A.N)
x(C.U0,A.T)
w(A.jD,[C.bhC,C.bhD,C.bhA,C.bhB])})()
A.oc(b.typeUniverse,JSON.parse('{"uA":{"N":[],"m":[]},"U0":{"T":["uA"]}}'))
var y={u:A.au("E<m>"),w:A.au("E<hl>"),z:A.au("bz<T<N>>"),v:A.au("ke"),n:A.au("zT?"),q:A.au("~")};(function constants(){D.ZW=new A.ah(62116,!1)
D.a_R=new A.aj(D.ZW,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_19",e:"endPart",h:b})})($__dart_deferred_initializers__,"DpUGT37yyyFkShTSfkhvPVmTOI8=");