((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
av_(d){return new C.tx(d,null)},
tx:function tx(d,e){this.c=d
this.a=e},
Rg:function Rg(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
b4u:function b4u(d){this.a=d},
b4v:function b4v(d){this.a=d},
b4s:function b4s(d){this.a=d},
b4t:function b4t(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[5],C)
D=c[9]
C.tx.prototype={
N(){return new C.Rg(new A.bz(null,y.z))}}
C.Rg.prototype={
tU(){var x=0,w=A.l(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$tU=A.h(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.q(new C.b4u(r))
u=4
l=$.aO.al$.x.h(0,r.d)
l=l==null?null:l.ga4()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.NK(3),$async$tU)
case 7:p=e
x=8
return A.e(p.FV(B.fB),$async$tU)
case 8:o=e
l=o
n=l==null?null:J.fs(J.bpT(l))
if(n==null||J.a4(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.mp(n,"recu-"+r.a.c.a+".png"),$async$tU)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.qC(A.a([A.qV(J.nH(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$tU)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.b("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.q(new C.b4v(r))
x=s.pop()
break
case 6:case 1:return A.j(v,w)
case 2:return A.i(t,w)}})
return A.k($async$tU,w)},
wH(){var x=0,w=A.l(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$wH=A.h(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.ah()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.q(new C.b4s(r))
u=4
x=7
return A.e(o.Ll(l.a),$async$wH)
case 7:q=e
x=8
return A.e(A.mp(q,"facture-"+l.a+".pdf"),$async$wH)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.qC(A.a([A.qV(J.nH(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$wH)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.b("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.q(new C.b4t(r))
x=s.pop()
break
case 6:case 1:return A.j(v,w)
case 2:return A.i(t,w)}})
return A.k($async$wH,w)},
C(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.z(d).p2,j=n.a.c
if(!j.ch)return A.bv(A.b("Facture"),A.a([new A.ci(B.lD,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.b("Facture")
w=$.aC==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.k1(t==null?j.ay:t)
else w="Date : "+A.k1(t==null?j.ay:t)
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
s=A.a([v,B.S,w,r,A.c(s,m,m,m,m,t,m,m,m),B.on],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.VN(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.I)(w),++p){o=w[p]
s.push(new A.a7(B.kW,A.a8(A.a([new A.dj(1,B.az,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bx(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.f,B.i,m),m))}s.push(B.on)
s.push(A.a8(A.a([A.al(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bx(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.f,B.i,m))
w=A.dW(new A.a7(B.P,A.R(s,B.r,B.f,B.i),m),m,m,m,m)
v=n.e
u=v?m:n.gauN()
u=A.ai(A.cf(D.XL,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gauO()
return A.bv(x,A.a([new A.io(w,n.d),B.q,u,B.k,A.ai(A.c9(B.ja,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.k,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["ap<~>()"])
C.b4u.prototype={
$0(){return this.a.f=!0},
$S:0}
C.b4v.prototype={
$0(){return this.a.f=!1},
$S:0}
C.b4s.prototype={
$0(){return this.a.e=!0},
$S:0}
C.b4t.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.Rg.prototype,"gauO","tU",0)
x(w,"gauN","wH",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.tx,A.U)
x(C.Rg,A.a_)
w(A.wm,[C.b4u,C.b4v,C.b4s,C.b4t])})()
A.bio(b.typeUniverse,JSON.parse('{"tx":{"U":[],"m":[]},"Rg":{"a_":["tx"]}}'))
var y={u:A.aG("F<m>"),w:A.aG("F<f7>"),z:A.aG("bz<a_<U>>"),v:A.aG("vm"),n:A.aG("yt?"),q:A.aG("~")};(function constants(){D.WZ=new A.ak(62116,!1)
D.XL=new A.at(D.WZ,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"+BF2m438EzVGbqOzzcs3zww8RJ0=");