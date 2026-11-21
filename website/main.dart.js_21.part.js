((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_21",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aJ7(d){return new C.wM(d,null)},
wM:function wM(d,e){this.c=d
this.a=e},
YM:function YM(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
btr:function btr(d){this.a=d},
bts:function bts(d){this.a=d},
btp:function btp(d){this.a=d},
btq:function btq(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[11],C)
D=c[31]
C.wM.prototype={
N(){return new C.YM(new A.bJ(null,y.z))}}
C.YM.prototype={
ws(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$ws=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.m(new C.btr(r))
u=4
l=$.aL.aQ$.x.h(0,r.d)
l=l==null?null:l.ga6()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.B(A.A(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.vO(3),$async$ws)
case 7:p=e
x=8
return A.e(p.t8(B.dU),$async$ws)
case 8:o=e
l=o
n=l==null?null:J.fO(J.asm(l))
if(n==null||J.a3(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.B(A.A(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.mT(n,"recu-"+r.a.c.a+".png"),$async$ws)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.B(A.A(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.p_(A.a([A.p8(J.pt(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$ws)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.b("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.u(y.v).f.B(A.A(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.m(new C.bts(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$ws,w)},
A3(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$A3=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a8()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.B(A.A(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.m(new C.btp(r))
u=4
x=7
return A.e(o.Si(l.a),$async$A3)
case 7:q=e
x=8
return A.e(A.mT(q,"facture-"+l.a+".pdf"),$async$A3)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.B(A.A(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.p_(A.a([A.p8(J.pt(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$A3)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.b("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.u(y.v).f.B(A.A(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.m(new C.btq(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$A3,w)},
C(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.z(d).p2,j=n.a.c
if(!j.ch)return A.bd(A.b("Facture"),A.a([new A.bW(B.mZ,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m,m,m,m,m)
x=A.b("Facture")
w=$.aJ==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jG(t==null?j.ay:t)
else w="Date : "+A.jG(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aJ==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.H,w,r,A.c(s,m,m,m,m,t,m,m,m),B.qa],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.a2N(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.Q)(w),++p){o=w[p]
s.push(new A.a1(B.h3,A.U(A.a([new A.d1(1,B.aq,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.c_(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.f,B.i,m),m))}s.push(B.qa)
s.push(A.U(A.a([A.ag(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.c_(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.f,B.i,m))
w=A.d8(new A.a1(B.P,A.J(s,B.t,B.f,B.i),m),m,m,m,m,m,m)
v=n.e
u=v?m:n.gaHG()
u=A.ae(A.cc(D.a3K,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaHH()
return A.bd(x,A.a([new A.fm(w,n.d),B.p,u,B.k,A.ae(A.bK(B.ke,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.k,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m,m,m,m,m)}}
var z=a.updateTypes(["av<~>()"])
C.btr.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bts.prototype={
$0(){return this.a.f=!1},
$S:0}
C.btp.prototype={
$0(){return this.a.e=!0},
$S:0}
C.btq.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.YM.prototype,"gaHH","ws",0)
x(w,"gaHG","A3",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.wM,A.O)
x(C.YM,A.W)
w(A.jM,[C.btr,C.bts,C.btp,C.btq])})()
A.nZ(b.typeUniverse,JSON.parse('{"wM":{"O":[],"p":[]},"YM":{"W":["wM"]}}'))
var y={u:A.aB("H<p>"),w:A.aB("H<hX>"),z:A.aB("bJ<W<O>>"),v:A.aB("kf"),n:A.aB("CW?"),q:A.aB("~")};(function constants(){D.a0I=new A.ar(62116,"MaterialIcons",null,!1)
D.a3K=new A.ac(D.a0I,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_21",e:"endPart",h:b})})($__dart_deferred_initializers__,"dtrn9vxNO9J4sJs15prP4OkqfrA=");