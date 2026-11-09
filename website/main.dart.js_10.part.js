((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_10",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
awp(d){return new C.u1(d,null)},
u1:function u1(d,e){this.c=d
this.a=e},
S_:function S_(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
ba8:function ba8(d){this.a=d},
ba9:function ba9(d){this.a=d},
ba6:function ba6(d){this.a=d},
ba7:function ba7(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[8],C)
D=c[23]
C.u1.prototype={
N(){return new C.S_(new A.bI(null,y.z))}}
C.S_.prototype={
uf(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$uf=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.p(new C.ba8(r))
u=4
l=$.aQ.ao$.x.h(0,r.d)
l=l==null?null:l.ga6()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.a("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.P2(3),$async$uf)
case 7:p=e
x=8
return A.e(p.Ak(B.f3),$async$uf)
case 8:o=e
l=o
n=l==null?null:J.fA(J.aiW(l))
if(n==null||J.a6(n)===0){l=r.c
if(l!=null){k=A.a("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.lJ(n,"recu-"+r.a.c.a+".png"),$async$uf)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.nr(A.b([A.rl(J.nZ(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$uf)
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
if(r.c!=null)r.p(new C.ba9(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uf,w)},
xc(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$xc=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.af()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.a("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.p(new C.ba6(r))
u=4
x=7
return A.e(o.MB(l.a),$async$xc)
case 7:q=e
x=8
return A.e(A.lJ(q,"facture-"+l.a+".pdf"),$async$xc)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.D(A.B(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.nr(A.b([A.rl(J.nZ(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xc)
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
if(r.c!=null)r.p(new C.ba7(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xc,w)},
B(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.w(d).p2,j=n.a.c
if(!j.ch)return A.bm(A.a("Facture"),A.b([new A.c0(B.m1,A.a("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.a("Facture")
w=$.aA==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jh(t==null?j.ay:t)
else w="Date : "+A.jh(t==null?j.ay:t)
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
s=A.b([v,B.L,w,r,A.c(s,m,m,m,m,t,m,m,m),B.p0],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.a("Contribution (don)")
else if(w==="cotisation")w=A.a("Cotisation mensuelle")
else if(w==="carte")w=A.a("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.WD(j):A.a("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.J)(w),++p){o=w[p]
s.push(new A.a5(B.hM,A.a2(A.b([new A.cW(1,B.aq,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bH(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.f,B.i,m),m))}s.push(B.p0)
s.push(A.a2(A.b([A.ag(A.c(A.a("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bH(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.f,B.i,m))
w=A.dl(new A.a5(B.Q,A.M(s,B.r,B.f,B.i),m),m,m,m,m,m)
v=n.e
u=v?m:n.gawQ()
u=A.ac(A.bM(D.Zr,A.c(v?A.a(l):A.a("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gawR()
return A.bm(x,A.b([new A.it(w,n.d),B.p,u,B.j,A.ac(A.bJ(B.jD,A.c(v?A.a(l):A.a("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.a("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["as<~>()"])
C.ba8.prototype={
$0(){return this.a.f=!0},
$S:0}
C.ba9.prototype={
$0(){return this.a.f=!1},
$S:0}
C.ba6.prototype={
$0(){return this.a.e=!0},
$S:0}
C.ba7.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.S_.prototype,"gawR","uf",0)
x(w,"gawQ","xc",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.u1,A.O)
x(C.S_,A.X)
w(A.l1,[C.ba8,C.ba9,C.ba6,C.ba7])})()
A.rG(b.typeUniverse,JSON.parse('{"u1":{"O":[],"n":[]},"S_":{"X":["u1"]}}'))
var y={u:A.au("F<n>"),w:A.au("F<fc>"),z:A.au("bI<X<O>>"),v:A.au("lC"),n:A.au("z_?"),q:A.au("~")};(function constants(){D.YD=new A.ah(62116,!1)
D.Zr=new A.ap(D.YD,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_10",e:"endPart",h:b})})($__dart_deferred_initializers__,"g0CneY0GgfO1WDBHvC79/7ZVf04=");