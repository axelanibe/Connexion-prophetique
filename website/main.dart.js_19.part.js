((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_19",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
ayV(d){return new C.ut(d,null)},
ut:function ut(d,e){this.c=d
this.a=e},
TD:function TD(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bgP:function bgP(d){this.a=d},
bgQ:function bgQ(d){this.a=d},
bgN:function bgN(d){this.a=d},
bgO:function bgO(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[10],C)
D=c[30]
C.ut.prototype={
O(){return new C.TD(new A.bB(null,y.z))}}
C.TD.prototype={
uD(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$uD=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.n(new C.bgP(r))
u=4
l=$.aQ.ap$.x.h(0,r.d)
l=l==null?null:l.ga4()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.a("La facture n\u2019est pas encore affich\xe9e.")
l.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.AM(3),$async$uD)
case 7:p=e
x=8
return A.e(p.wI(B.ew),$async$uD)
case 8:o=e
l=o
n=l==null?null:J.fH(J.al1(l))
if(n==null||J.a4(n)===0){l=r.c
if(l!=null){k=A.a("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c(k,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.lW(n,"recu-"+r.a.c.a+".png"),$async$uD)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.nM(A.b([A.rJ(J.oh(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$uD)
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
if(r.c!=null)r.n(new C.bgQ(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uD,w)},
xF(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$xF=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.a7()
n=o.b
if(!(n!=null&&n.length!==0)){o=r.c
o.toString
n=A.a("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c(n,null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))
x=1
break}r.n(new C.bgN(r))
u=4
x=7
return A.e(o.NL(l.a),$async$xF)
case 7:q=e
x=8
return A.e(A.lW(q,"facture-"+l.a+".pdf"),$async$xF)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.u(y.v).f.B(A.B(null,null,null,null,null,B.f,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.m,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.nM(A.b([A.rJ(J.oh(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xF)
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
if(r.c!=null)r.n(new C.bgO(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xF,w)},
C(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.w(d).p2,j=n.a.c
if(!j.ch)return A.b8(A.a("Facture"),A.b([new A.bC(B.mi,A.a("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m)
x=A.a("Facture")
w=$.aC==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.ju(t==null?j.ay:t)
else w="Date : "+A.ju(t==null?j.ay:t)
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
s=A.b([v,B.G,w,r,A.c(s,m,m,m,m,t,m,m,m),B.pv],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.a("Contribution (don)")
else if(w==="cotisation")w=A.a("Cotisation mensuelle")
else if(w==="carte")w=A.a("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.Yh(j):A.a("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.J)(w),++p){o=w[p]
s.push(new A.a0(B.fV,A.a_(A.b([new A.cQ(1,B.ao,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.bP(o.b),m,m,m,m,r,m,m,m)],q),B.o,B.e,B.i,m),m))}s.push(B.pv)
s.push(A.a_(A.b([A.am(A.c(A.a("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.bP(j.at),m,m,m,m,u,m,m,m)],q),B.o,B.e,B.i,m))
w=A.dr(new A.a0(B.O,A.M(s,B.t,B.e,B.i),m),m,m,m,m,m)
v=n.e
u=v?m:n.gazu()
u=A.aa(A.bD(D.a_r,A.c(v?A.a(l):A.a("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gazv()
return A.b8(x,A.b([new A.hA(w,n.d),B.p,u,B.j,A.aa(A.bH(B.jM,A.c(v?A.a(l):A.a("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.j,A.c(A.a("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m)}}
var z=a.updateTypes(["as<~>()"])
C.bgP.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bgQ.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bgN.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bgO.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.TD.prototype,"gazv","uD",0)
x(w,"gazu","xF",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.ut,A.N)
x(C.TD,A.T)
w(A.jA,[C.bgP,C.bgQ,C.bgN,C.bgO])})()
A.o7(b.typeUniverse,JSON.parse('{"ut":{"N":[],"m":[]},"TD":{"T":["ut"]}}'))
var y={u:A.au("E<m>"),w:A.au("E<hg>"),z:A.au("bB<T<N>>"),v:A.au("k9"),n:A.au("zL?"),q:A.au("~")};(function constants(){D.ZA=new A.ah(62116,!1)
D.a_r=new A.ak(D.ZA,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_19",e:"endPart",h:b})})($__dart_deferred_initializers__,"P6ebfpzrIOZAQJCfWbNzhRk+/cM=");