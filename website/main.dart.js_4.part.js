((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_4",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
auU(d){return new C.tw(d,null)},
tw:function tw(d,e){this.c=d
this.a=e},
R7:function R7(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
b3u:function b3u(d){this.a=d},
b3v:function b3v(d){this.a=d},
b3s:function b3s(d){this.a=d},
b3t:function b3t(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[5],C)
D=c[9]
C.tw.prototype={
O(){return new C.R7(new A.bx(null,y.z))}}
C.R7.prototype={
tV(){var x=0,w=A.m(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$tV=A.i(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.q(new C.b3u(r))
u=4
l=$.aO.ak$.x.h(0,r.d)
l=l==null?null:l.ga4()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.Nx(3),$async$tV)
case 7:p=e
x=8
return A.e(p.FL(B.fx),$async$tV)
case 8:o=e
l=o
n=l==null?null:J.fq(J.box(l))
if(n==null||J.a6(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.mm(n,"recu-"+r.a.c.a+".png"),$async$tV)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.qz(A.a([A.qS(J.nD(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$tV)
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
if(r.c!=null)r.q(new C.b3v(r))
x=s.pop()
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$tV,w)},
wF(){var x=0,w=A.m(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$wF=A.i(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.ah()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.q(new C.b3s(r))
u=4
x=7
return A.e(o.L7(l.a),$async$wF)
case 7:q=e
x=8
return A.e(A.mm(q,"facture-"+l.a+".pdf"),$async$wF)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.H(A.C(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.qz(A.a([A.qS(J.nD(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$wF)
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
if(r.c!=null)r.q(new C.b3t(r))
x=s.pop()
break
case 6:case 1:return A.k(v,w)
case 2:return A.j(t,w)}})
return A.l($async$wF,w)},
B(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.z(d).p2,j=n.a.c
if(!j.ch)return A.bv(A.b("Facture"),A.a([new A.cl(B.lr,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.b("Facture")
w=$.aD==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jS(t==null?j.ay:t)
else w="Date : "+A.jS(t==null?j.ay:t)
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
s=A.a([v,B.Z,w,r,A.c(s,m,m,m,m,t,m,m,m),B.ob],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.VD(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.I)(w),++p){o=w[p]
s.push(new A.a9(B.oi,A.a8(A.a([new A.dz(1,B.aF,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bP(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.f,B.i,m),m))}s.push(B.ob)
s.push(A.a8(A.a([A.al(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1),A.c(A.bP(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.f,B.i,m))
w=A.dV(new A.a9(B.K,A.S(s,B.r,B.f,B.i),m),m,m,m,m)
v=n.e
u=v?m:n.gauk()
u=A.ai(A.cg(D.Xr,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaul()
return A.bv(x,A.a([new A.ig(w,n.d),B.q,u,B.k,A.ai(A.ch(B.j_,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.k,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["ap<~>()"])
C.b3u.prototype={
$0(){return this.a.f=!0},
$S:0}
C.b3v.prototype={
$0(){return this.a.f=!1},
$S:0}
C.b3s.prototype={
$0(){return this.a.e=!0},
$S:0}
C.b3t.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.R7.prototype,"gaul","tV",0)
x(w,"gauk","wF",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.tw,A.T)
x(C.R7,A.a_)
w(A.wg,[C.b3u,C.b3v,C.b3s,C.b3t])})()
A.bhj(b.typeUniverse,JSON.parse('{"tw":{"T":[],"h":[]},"R7":{"a_":["tw"]}}'))
var y={u:A.aJ("F<h>"),w:A.aJ("F<f5>"),z:A.aJ("bx<a_<T>>"),v:A.aJ("vk"),n:A.aJ("ym?"),q:A.aJ("~")};(function constants(){D.WH=new A.ak(62116,!1)
D.Xr=new A.as(D.WH,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_4",e:"endPart",h:b})})($__dart_deferred_initializers__,"iBLsUvRXakgYMMfFuRlexuzaunQ=");