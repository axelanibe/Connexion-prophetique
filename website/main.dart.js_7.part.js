((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_7",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
avy(d){return new C.tP(d,null)},
tP:function tP(d,e){this.c=d
this.a=e},
RB:function RB(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
b7B:function b7B(d){this.a=d},
b7C:function b7C(d){this.a=d},
b7z:function b7z(d){this.a=d},
b7A:function b7A(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[6],C)
D=c[15]
C.tP.prototype={
N(){return new C.RB(new A.bG(null,y.z))}}
C.RB.prototype={
u7(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$u7=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.q(new C.b7B(r))
u=4
l=$.aS.an$.x.h(0,r.d)
l=l==null?null:l.ga7()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.G(A.C(null,null,null,null,null,B.i,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.Z8(3),$async$u7)
case 7:p=e
x=8
return A.e(p.Ok(B.i1),$async$u7)
case 8:o=e
l=o
n=l==null?null:J.ha(J.bum(l))
if(n==null||J.a6(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.G(A.C(null,null,null,null,null,B.i,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.lF(n,"recu-"+r.a.c.a+".png"),$async$u7)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.G(A.C(null,null,null,null,null,B.i,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.oR(A.a([A.rc(J.nT(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$u7)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.b("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.u(y.v).f.G(A.C(null,null,null,null,null,B.i,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.q(new C.b7C(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$u7,w)},
wY(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$wY=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.ak()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.G(A.C(null,null,null,null,null,B.i,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.q(new C.b7z(r))
u=4
x=7
return A.e(o.LY(l.a),$async$wY)
case 7:q=e
x=8
return A.e(A.lF(q,"facture-"+l.a+".pdf"),$async$wY)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.G(A.C(null,null,null,null,null,B.i,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.oR(A.a([A.rc(J.nT(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$wY)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.b("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.u(y.v).f.G(A.C(null,null,null,null,null,B.i,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.q(new C.b7A(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$wY,w)},
B(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.y(d).p2,j=n.a.c
if(!j.ch)return A.bs(A.b("Facture"),A.a([new A.c5(B.lW,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.b("Facture")
w=$.az==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.je(t==null?j.ay:t)
else w="Date : "+A.je(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.az==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.L,w,r,A.c(s,m,m,m,m,t,m,m,m),B.oM],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.Wb(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.H)(w),++p){o=w[p]
s.push(new A.a3(B.hC,A.a0(A.a([new A.cO(1,B.ap,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bE(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.f,B.h,m),m))}s.push(B.oM)
s.push(A.a0(A.a([A.ah(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bE(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.f,B.h,m))
w=A.dq(new A.a3(B.S,A.P(s,B.q,B.f,B.h),m),m,m,m,m,m)
v=n.e
u=v?m:n.gavX()
u=A.ag(A.bY(D.YL,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gavY()
return A.bs(x,A.a([new A.j0(w,n.d),B.p,u,B.j,A.ag(A.c3(B.jy,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["ar<~>()"])
C.b7B.prototype={
$0(){return this.a.f=!0},
$S:0}
C.b7C.prototype={
$0(){return this.a.f=!1},
$S:0}
C.b7z.prototype={
$0(){return this.a.e=!0},
$S:0}
C.b7A.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.RB.prototype,"gavY","u7",0)
x(w,"gavX","wY",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.tP,A.R)
x(C.RB,A.a_)
w(A.oa,[C.b7B,C.b7C,C.b7z,C.b7A])})()
A.Gn(b.typeUniverse,JSON.parse('{"tP":{"R":[],"m":[]},"RB":{"a_":["tP"]}}'))
var y={u:A.aw("F<m>"),w:A.aw("F<f9>"),z:A.aw("bG<a_<R>>"),v:A.aw("nH"),n:A.aw("yL?"),q:A.aw("~")};(function constants(){D.XW=new A.ae(62116,!1)
D.YL=new A.aq(D.XW,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_7",e:"endPart",h:b})})($__dart_deferred_initializers__,"Dtu9pMSOtZpeo+ylv7/Vja3lHDw=");