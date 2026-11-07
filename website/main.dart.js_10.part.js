((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_10",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aw8(d){return new C.u3(d,null)},
u3:function u3(d,e){this.c=d
this.a=e},
RX:function RX(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
b9J:function b9J(d){this.a=d},
b9K:function b9K(d){this.a=d},
b9H:function b9H(d){this.a=d},
b9I:function b9I(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[8],C)
D=c[23]
C.u3.prototype={
N(){return new C.RX(new A.bG(null,y.z))}}
C.RX.prototype={
ud(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$ud=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.p(new C.b9J(r))
u=4
l=$.aQ.ao$.x.h(0,r.d)
l=l==null?null:l.ga6()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.a("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.OL(3),$async$ud)
case 7:p=e
x=8
return A.e(p.Gt(B.fV),$async$ud)
case 8:o=e
l=o
n=l==null?null:J.fN(J.bxv(l))
if(n==null||J.a6(n)===0){l=r.c
if(l!=null){k=A.a("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.lJ(n,"recu-"+r.a.c.a+".png"),$async$ud)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.nq(A.b([A.rm(J.nZ(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$ud)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.a("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.p(new C.b9K(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$ud,w)},
x5(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$x5=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.ah()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.a("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.p(new C.b9H(r))
u=4
x=7
return A.e(o.Mk(l.a),$async$x5)
case 7:q=e
x=8
return A.e(A.lJ(q,"facture-"+l.a+".pdf"),$async$x5)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.nq(A.b([A.rm(J.nZ(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$x5)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.a("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.p(new C.b9I(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$x5,w)},
B(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.w(d).p2,j=n.a.c
if(!j.ch)return A.bl(A.a("Facture"),A.b([new A.c0(B.m2,A.a("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.a("Facture")
w=$.ay==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jg(t==null?j.ay:t)
else w="Date : "+A.jg(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.ay==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.b([v,B.L,w,r,A.c(s,m,m,m,m,t,m,m,m),B.oY],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.a("Contribution (don)")
else if(w==="cotisation")w=A.a("Cotisation mensuelle")
else if(w==="carte")w=A.a("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.WA(j):A.a("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.J)(w),++p){o=w[p]
s.push(new A.a5(B.hL,A.a2(A.b([new A.cU(1,B.aq,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bF(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.e,B.i,m),m))}s.push(B.oY)
s.push(A.a2(A.b([A.ae(A.c(A.a("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bF(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.e,B.i,m))
w=A.dg(new A.a5(B.Q,A.M(s,B.r,B.e,B.i),m),m,m,m,m,m)
v=n.e
u=v?m:n.gawJ()
u=A.ac(A.bN(D.Zl,A.c(v?A.a(l):A.a("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gawK()
return A.bl(x,A.b([new A.iu(w,n.d),B.p,u,B.j,A.ac(A.bJ(B.jD,A.c(v?A.a(l):A.a("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.a("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["as<~>()"])
C.b9J.prototype={
$0(){return this.a.f=!0},
$S:0}
C.b9K.prototype={
$0(){return this.a.f=!1},
$S:0}
C.b9H.prototype={
$0(){return this.a.e=!0},
$S:0}
C.b9I.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.RX.prototype,"gawK","ud",0)
x(w,"gawJ","x5",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.u3,A.Q)
x(C.RX,A.X)
w(A.l2,[C.b9J,C.b9K,C.b9H,C.b9I])})()
A.rH(b.typeUniverse,JSON.parse('{"u3":{"Q":[],"n":[]},"RX":{"X":["u3"]}}'))
var y={u:A.av("E<n>"),w:A.av("E<fc>"),z:A.av("bG<X<Q>>"),v:A.av("lC"),n:A.av("z_?"),q:A.av("~")};(function constants(){D.Yy=new A.af(62116,!1)
D.Zl=new A.ap(D.Yy,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_10",e:"endPart",h:b})})($__dart_deferred_initializers__,"Bs+L3JKXd3mtHlvOkepDlbATIVo=");