((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
a_D(d){return new C.tv(d,null)},
tv:function tv(d,e){this.c=d
this.a=e},
Ra:function Ra(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
b4e:function b4e(d){this.a=d},
b4f:function b4f(d){this.a=d},
b4c:function b4c(d){this.a=d},
b4d:function b4d(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[5],C)
D=c[9]
C.tv.prototype={
N(){return new C.Ra(new A.bx(null,y.z))}}
C.Ra.prototype={
tV(){var x=0,w=A.m(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$tV=A.h(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.q(new C.b4e(r))
u=4
l=$.aN.ak$.x.h(0,r.d)
l=l==null?null:l.ga2()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.zT(3),$async$tV)
case 7:p=e
x=8
return A.e(p.vT(B.eh),$async$tV)
case 8:o=e
l=o
n=l==null?null:J.f8(J.ahP(l))
if(n==null||J.a8(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.mm(n,"recu-"+r.a.c.a+".png"),$async$tV)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.oC(A.a([A.qQ(J.nF(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$tV)
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
if(r.c!=null)r.q(new C.b4f(r))
x=s.pop()
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$tV,w)},
wL(){var x=0,w=A.m(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$wL=A.h(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.aj()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.q(new C.b4c(r))
u=4
x=7
return A.e(o.Le(l.a),$async$wL)
case 7:q=e
x=8
return A.e(A.mm(q,"facture-"+l.a+".pdf"),$async$wL)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.G(A.B(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.oC(A.a([A.qQ(J.nF(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$wL)
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
if(r.c!=null)r.q(new C.b4d(r))
x=s.pop()
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$wL,w)},
B(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.z(d).p2,j=n.a.c
if(!j.ch)return A.bt(A.b("Facture"),A.a([new A.ci(B.lz,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.b("Facture")
w=$.an==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jP(t==null?j.ay:t)
else w="Date : "+A.jP(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.an==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.X,w,r,A.c(s,m,m,m,m,t,m,m,m),B.oi],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.VI(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.I)(w),++p){o=w[p]
s.push(new A.a7(B.op,A.a5(A.a([new A.du(1,B.aB,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bS(o.b),m,m,m,m,r,m,m,m)],q),B.n,B.f,B.i,m),m))}s.push(B.oi)
s.push(A.a5(A.a([A.ah(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1),A.c(A.bS(j.at),m,m,m,m,u,m,m,m)],q),B.n,B.f,B.i,m))
w=A.dE(new A.a7(B.G,A.M(s,B.r,B.f,B.i),m),m,m,m,m)
v=n.e
u=v?m:n.gauw()
u=A.ab(A.cb(D.Y8,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaux()
return A.bt(x,A.a([new A.ht(w,n.d),B.q,u,B.k,A.ab(A.bT(B.je,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.k,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["aq<~>()"])
C.b4e.prototype={
$0(){return this.a.f=!0},
$S:0}
C.b4f.prototype={
$0(){return this.a.f=!1},
$S:0}
C.b4c.prototype={
$0(){return this.a.e=!0},
$S:0}
C.b4d.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.Ra.prototype,"gaux","tV",0)
x(w,"gauw","wL",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.tv,A.U)
x(C.Ra,A.a_)
w(A.wf,[C.b4e,C.b4f,C.b4c,C.b4d])})()
A.bis(b.typeUniverse,JSON.parse('{"tv":{"U":[],"i":[]},"Ra":{"a_":["tv"]}}'))
var y={u:A.aJ("G<i>"),w:A.aJ("G<f5>"),z:A.aJ("bx<a_<U>>"),v:A.aJ("vj"),n:A.aJ("yl?"),q:A.aJ("~")};(function constants(){D.Xe=new A.ak(62116,!1)
D.Y8=new A.ar(D.Xe,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"WQ16wUsLjuYAthmYmd1ezKRIrSw=");