((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_10",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
ax_(d){return new C.u6(d,null)},
u6:function u6(d,e){this.c=d
this.a=e},
Sr:function Sr(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bce:function bce(d){this.a=d},
bcf:function bcf(d){this.a=d},
bcc:function bcc(d){this.a=d},
bcd:function bcd(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[8],C)
D=c[23]
C.u6.prototype={
N(){return new C.Sr(new A.bA(null,y.z))}}
C.Sr.prototype={
ut(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$ut=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.n(new C.bce(r))
u=4
l=$.aQ.ap$.x.h(0,r.d)
l=l==null?null:l.ga3()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.a("La facture n\u2019est pas encore affich\xe9e.")
l.t(y.v).f.B(A.B(null,null,null,null,null,B.e,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.Aq(3),$async$ut)
case 7:p=e
x=8
return A.e(p.wt(B.er),$async$ut)
case 8:o=e
l=o
n=l==null?null:J.fC(J.ajt(l))
if(n==null||J.a6(n)===0){l=r.c
if(l!=null){k=A.a("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.t(y.v).f.B(A.B(null,null,null,null,null,B.e,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.lM(n,"recu-"+r.a.c.a+".png"),$async$ut)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.t(y.v).f.B(A.B(null,null,null,null,null,B.e,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.nw(A.b([A.rp(J.nY(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$ut)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.a("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.t(y.v).f.B(A.B(null,null,null,null,null,B.e,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.n(new C.bcf(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$ut,w)},
xn(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$xn=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.aa()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.a("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.t(y.v).f.B(A.B(null,null,null,null,null,B.e,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.n(new C.bcc(r))
u=4
x=7
return A.e(o.MN(l.a),$async$xn)
case 7:q=e
x=8
return A.e(A.lM(q,"facture-"+l.a+".pdf"),$async$xn)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.t(y.v).f.B(A.B(null,null,null,null,null,B.e,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.nw(A.b([A.rp(J.nY(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xn)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.a("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.t(y.v).f.B(A.B(null,null,null,null,null,B.e,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.n(new C.bcd(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xn,w)},
D(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.w(d).p2,j=n.a.c
if(!j.ch)return A.bg(A.a("Facture"),A.b([new A.bQ(B.lY,A.a("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.a("Facture")
w=$.aA==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.jn(t==null?j.ay:t)
else w="Date : "+A.jn(t==null?j.ay:t)
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
s=A.b([v,B.H,w,r,A.c(s,m,m,m,m,t,m,m,m),B.p3],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.a("Contribution (don)")
else if(w==="cotisation")w=A.a("Cotisation mensuelle")
else if(w==="carte")w=A.a("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.X2(j):A.a("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.I)(w),++p){o=w[p]
s.push(new A.a4(B.fP,A.a2(A.b([new A.cR(1,B.ao,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bN(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.h,B.i,m),m))}s.push(B.p3)
s.push(A.a2(A.b([A.ap(A.c(A.a("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bN(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.h,B.i,m))
w=A.dl(new A.a4(B.N,A.O(s,B.t,B.h,B.i),m),m,m,m,m,m)
v=n.e
u=v?m:n.gaxn()
u=A.ac(A.bz(D.Za,A.c(v?A.a(l):A.a("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaxo()
return A.bg(x,A.b([new A.i6(w,n.d),B.p,u,B.j,A.ac(A.bH(B.jy,A.c(v?A.a(l):A.a("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.a("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["as<~>()"])
C.bce.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bcf.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bcc.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bcd.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.Sr.prototype,"gaxo","ut",0)
x(w,"gaxn","xn",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.u6,A.M)
x(C.Sr,A.V)
w(A.l1,[C.bce,C.bcf,C.bcc,C.bcd])})()
A.rK(b.typeUniverse,JSON.parse('{"u6":{"M":[],"m":[]},"Sr":{"V":["u6"]}}'))
var y={u:A.at("G<m>"),w:A.at("G<fe>"),z:A.at("bA<V<M>>"),v:A.at("lF"),n:A.at("zg?"),q:A.at("~")};(function constants(){D.Yk=new A.ah(62116,!1)
D.Za=new A.al(D.Yk,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_10",e:"endPart",h:b})})($__dart_deferred_initializers__,"d3k/bcZj6gOCy3T8LKwzz4LIjMg=");