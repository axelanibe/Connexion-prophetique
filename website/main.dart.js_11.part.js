((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_11",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
axx(d){return new C.uf(d,null)},
uf:function uf(d,e){this.c=d
this.a=e},
SN:function SN(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bdv:function bdv(d){this.a=d},
bdw:function bdw(d){this.a=d},
bdt:function bdt(d){this.a=d},
bdu:function bdu(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[9],C)
D=c[27]
C.uf.prototype={
O(){return new C.SN(new A.bC(null,y.z))}}
C.SN.prototype={
uy(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$uy=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.n(new C.bdv(r))
u=4
l=$.aP.ap$.x.h(0,r.d)
l=l==null?null:l.ga3()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.a("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.Ay(3),$async$uy)
case 7:p=e
x=8
return A.e(p.wy(B.eu),$async$uy)
case 8:o=e
l=o
n=l==null?null:J.fD(J.ajZ(l))
if(n==null||J.a5(n)===0){l=r.c
if(l!=null){k=A.a("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.lQ(n,"recu-"+r.a.c.a+".png"),$async$uy)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.nz(A.b([A.ru(J.o4(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$uy)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.a("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.n(new C.bdw(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uy,w)},
xt(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$xt=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a8()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.a("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.n(new C.bdt(r))
u=4
x=7
return A.e(o.N3(l.a),$async$xt)
case 7:q=e
x=8
return A.e(A.lQ(q,"facture-"+l.a+".pdf"),$async$xt)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.nz(A.b([A.ru(J.o4(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xt)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.a("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.n(new C.bdu(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xt,w)},
C(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.x(d).p2,j=n.a.c
if(!j.ch)return A.b7(A.a("Facture"),A.b([new A.bA(B.m7,A.a("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.a("Facture")
w=$.aB==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jo(t==null?j.ay:t)
else w="Date : "+A.jo(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aB==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.b([v,B.G,w,r,A.c(s,m,m,m,m,t,m,m,m),B.pf],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.a("Contribution (don)")
else if(w==="cotisation")w=A.a("Cotisation mensuelle")
else if(w==="carte")w=A.a("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.Xs(j):A.a("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.J)(w),++p){o=w[p]
s.push(new A.a2(B.fS,A.a_(A.b([new A.cO(1,B.ao,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bP(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.e,B.i,m),m))}s.push(B.pf)
s.push(A.a_(A.b([A.al(A.c(A.a("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bP(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.e,B.i,m))
w=A.dl(new A.a2(B.O,A.M(s,B.r,B.e,B.i),m),m,m,m,m,m)
v=n.e
u=v?m:n.gaxS()
u=A.a9(A.bB(D.ZA,A.c(v?A.a(l):A.a("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaxT()
return A.b7(x,A.b([new A.i9(w,n.d),B.p,u,B.j,A.a9(A.bH(B.jH,A.c(v?A.a(l):A.a("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.a("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["as<~>()"])
C.bdv.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bdw.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bdt.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bdu.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.SN.prototype,"gaxT","uy",0)
x(w,"gaxS","xt",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.uf,A.N)
x(C.SN,A.U)
w(A.kc,[C.bdv,C.bdw,C.bdt,C.bdu])})()
A.pB(b.typeUniverse,JSON.parse('{"uf":{"N":[],"m":[]},"SN":{"U":["uf"]}}'))
var y={u:A.at("F<m>"),w:A.at("F<fh>"),z:A.at("bC<U<N>>"),v:A.at("kP"),n:A.at("zt?"),q:A.at("~")};(function constants(){D.YJ=new A.ag(62116,!1)
D.ZA=new A.ak(D.YJ,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_11",e:"endPart",h:b})})($__dart_deferred_initializers__,"vLNLRutZ99i4FRhCily/yEfCdqk=");