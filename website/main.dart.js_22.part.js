((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_22",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aOK(d){return new C.xH(d,null)},
xH:function xH(d,e){this.c=d
this.a=e},
a0H:function a0H(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bFa:function bFa(d){this.a=d},
bFb:function bFb(d){this.a=d},
bF8:function bF8(d){this.a=d},
bF9:function bF9(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[11],C)
D=c[30]
C.xH.prototype={
O(){return new C.a0H(new A.bP(null,y.z))}}
C.a0H.prototype={
ye(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$ye=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.k(new C.bFa(r))
u=4
l=$.aP.b_$.x.h(0,r.d)
l=l==null?null:l.gag()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.xp(3),$async$ye)
case 7:p=e
x=8
return A.e(p.ux(B.eo),$async$ye)
case 8:o=e
l=o
n=l==null?null:J.cZ(J.a6S(l))
if(n==null||J.a7(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.nn(n,"recu-"+r.a.c.a+".png"),$async$ye)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.pG(A.a([A.rD(J.qh(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$ye)
case 10:s.push(6)
x=5
break
case 4:u=3
i=t
l=r.c
if(l!=null){k=A.b("Impossible de t\xe9l\xe9charger le re\xe7u en PNG.")
l.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.k(new C.bFb(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$ye,w)},
Cd(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$Cd=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.K().b
if(!(o!=null&&o.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.k(new C.bF8(r))
u=4
x=7
return A.e($.K().Wz(l.a),$async$Cd)
case 7:q=e
x=8
return A.e(A.nn(q,"facture-"+l.a+".pdf"),$async$Cd)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.pG(A.a([A.rD(J.qh(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$Cd)
case 9:s.push(6)
x=5
break
case 4:u=3
k=t
o=r.c
if(o!=null){n=A.b("Facture PDF indisponible pour cette demande (demande locale ou non confirm\xe9e c\xf4t\xe9 serveur). La facture d\xe9taill\xe9e ci-dessous reste affich\xe9e.")
o.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s.push(6)
x=5
break
case 3:s=[2]
case 5:u=2
if(r.c!=null)r.k(new C.bF9(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cd,w)},
D(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.A(d).p2,j=n.a.c
if(!j.ch)return A.bk(A.b("Facture"),A.a([new A.bZ(B.nW,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m,m,m,m,m)
x=A.b("Facture")
w=$.aK==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.ka(t==null?j.ay:t)
else w="Date : "+A.ka(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aK==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.I,w,r,A.c(s,m,m,m,m,t,m,m,m),B.ro],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.a68(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.R)(w),++p){o=w[p]
s.push(new A.W(B.fW,A.P(A.a([new A.cQ(1,B.ar,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.cc(o.b),m,m,m,m,r,m,m,m)],q),B.n,B.f,B.i,m),m))}s.push(B.ro)
s.push(A.P(A.a([A.a8(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.cc(j.at),m,m,m,m,u,m,m,m)],q),B.n,B.f,B.i,m))
w=A.cO(new A.W(B.P,A.I(s,B.r,B.f,B.i),m),m,m,m,m,m,m)
v=n.e
u=v?m:n.gaQu()
u=A.ab(A.cb(D.a7X,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaQv()
return A.bk(x,A.a([new A.fJ(w,n.d),B.q,u,B.k,A.ab(A.bs(B.l6,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.k,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m,m,m,m,m)}}
var z=a.updateTypes(["av<~>()"])
C.bFa.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bFb.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bF8.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bF9.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.a0H.prototype,"gaQv","ye",0)
x(w,"gaQu","Cd",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.xH,A.T)
x(C.a0H,A.Z)
w(A.kg,[C.bFa,C.bFb,C.bF8,C.bF9])})()
A.oC(b.typeUniverse,JSON.parse('{"xH":{"T":[],"q":[]},"a0H":{"Z":["xH"]}}'))
var y={u:A.aB("H<q>"),w:A.aB("H<ic>"),z:A.aB("bP<Z<T>>"),v:A.aB("kG"),n:A.aB("Ek?"),q:A.aB("~")};(function constants(){D.a4J=new A.an(62116,"MaterialIcons",null,!1)
D.a7X=new A.aa(D.a4J,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_22",e:"endPart",h:b})})($__dart_deferred_initializers__,"pLzVR254GOQqQA7tVTQGazrzs4s=");