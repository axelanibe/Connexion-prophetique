((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_21",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,B,C={
aP_(d){return new C.y2(d,null)},
y2:function y2(d,e){this.c=d
this.a=e},
a1_:function a1_(d){var _=this
_.d=d
_.f=_.e=!1
_.c=_.a=null},
bFk:function bFk(d){this.a=d},
bFl:function bFl(d){this.a=d},
bFi:function bFi(d){this.a=d},
bFj:function bFj(d){this.a=d}},D
J=c[1]
A=c[0]
B=c[2]
C=a.updateHolder(c[11],C)
D=c[29]
C.y2.prototype={
P(){return new C.a1_(new A.bO(null,y.z))}}
C.a1_.prototype={
xX(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k,j,i
var $async$xX=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:r.k(new C.bFk(r))
u=4
l=$.aQ.x2$.x.h(0,r.d)
l=l==null?null:l.gag()
q=y.n.a(l)
if(q==null){l=r.c
if(l!=null){k=A.b("La facture n\u2019est pas encore affich\xe9e.")
l.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=7
return A.e(q.x8(3),$async$xX)
case 7:p=e
x=8
return A.e(p.uk(B.en),$async$xX)
case 8:o=e
l=o
n=l==null?null:J.d6(J.axo(l))
if(n==null||J.a8(n)===0){l=r.c
if(l!=null){k=A.b("Impossible de cr\xe9er l\u2019image du re\xe7u.")
l.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c(k,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}s=[1]
x=5
break}x=9
return A.e(A.nD(n,"recu-"+r.a.c.a+".png"),$async$xX)
case 9:m=e
l=r.c
if(l!=null){k=r.a.c
l.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c("Re\xe7u t\xe9l\xe9charg\xe9 : recu-"+k.a+".png",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=10
return A.e(A.pU(A.a([A.q5(J.qu(m),null,null,null,null)],y.w),"Re\xe7u "+r.a.c.a+" \u2014 CONNEXION PROPHETIQUE"),$async$xX)
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
if(r.c!=null)r.k(new C.bFl(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$xX,w)},
BV(){var x=0,w=A.k(y.q),v,u=2,t,s=[],r=this,q,p,o,n,m,l,k
var $async$BV=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:l=r.a.c
if(!l.ch){x=1
break}o=$.K().b
if(!(o!=null&&o.length!==0)){o=r.c
o.toString
n=A.b("La facture PDF du serveur demande une connexion et une demande cr\xe9\xe9e c\xf4t\xe9 serveur.")
o.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c(n,null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))
x=1
break}r.k(new C.bFi(r))
u=4
x=7
return A.e($.K().VZ(l.a),$async$BV)
case 7:q=e
x=8
return A.e(A.nD(q,"facture-"+l.a+".pdf"),$async$BV)
case 8:p=e
o=r.c
if(o!=null){n=l.a
o.q(y.v).f.v(A.z(null,null,null,null,null,B.h,null,A.c("Facture t\xe9l\xe9charg\xe9e : facture-"+n+".pdf",null,null,null,null,null,null,null,null),null,B.l,null,null,null,null,null,null,null,null,null))}x=9
return A.e(A.pU(A.a([A.q5(J.qu(p),null,null,null,null)],y.w),"Facture "+l.a+" \u2014 CONNEXION PROPHETIQUE"),$async$BV)
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
if(r.c!=null)r.k(new C.bFj(r))
x=s.pop()
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$BV,w)},
D(d){var x,w,v,u,t,s,r,q,p,o,n=this,m=null,l="Pr\xe9paration\u2026",k=A.A(d).p2,j=n.a.c
if(!j.ch)return A.bi(A.b("Facture"),A.a([new A.bX(B.o4,A.b("La facture n\u2019existe qu\u2019apr\xe8s confirmation du paiement."),m,m)],y.u),m,m,m,m,m,m)
x=A.b("Facture")
w=$.aN==="en"
v=j.a
v=w?"Invoice F-"+v:"Facture F-"+v
u=k.w
v=A.c(v,m,m,m,m,u,m,m,m)
t=j.CW
if(w)w="Date: "+A.kj(t==null?j.ay:t)
else w="Date : "+A.kj(t==null?j.ay:t)
t=k.z
w=A.c(w,m,m,m,m,t,m,m,m)
s=$.aN==="en"
r=j.c
q=j.d
r=A.c(s?"Customer: "+r+" ("+q+")":"Client : "+r+" ("+q+")",m,m,m,m,t,m,m,m)
q=j.Q
if(s){s=j.as
s=s.length===0?"":" ("+s+")"
s="Method: "+q+s}else{s=j.as
s=s.length===0?"":" ("+s+")"
s="Moyen : "+q+s}q=y.u
s=A.a([v,B.H,w,r,A.c(s,m,m,m,m,t,m,m,m),B.rz],q)
w=j.ax
v=w.length
if(v===0){w=j.b
if(w==="don")w=A.b("Contribution (don)")
else if(w==="cotisation")w=A.b("Cotisation mensuelle")
else if(w==="carte")w=A.b("Cr\xe9ation de carte de membre (paiement unique)")
else w=w==="camp"?A.a6o(j):A.b("Paiement")
s.push(A.c(w,m,m,m,m,k.as,m,m,m))}else for(r=k.as,p=0;p<w.length;w.length===v||(0,A.R)(w),++p){o=w[p]
s.push(new A.Z(B.fX,A.P(A.a([new A.cR(1,B.ar,A.c(o.c+" \u2014 "+o.d,m,m,m,m,r,m,m,m),m),A.c(A.cc(o.b),m,m,m,m,r,m,m,m)],q),B.n,B.f,B.i,m),m))}s.push(B.rz)
s.push(A.P(A.a([A.a9(A.c(A.b("Total pay\xe9"),m,m,m,m,u,m,m,m),1,m),A.c(A.cc(j.at),m,m,m,m,u,m,m,m)],q),B.n,B.f,B.i,m))
w=A.cO(new A.Z(B.Q,A.I(s,B.r,B.f,B.i),m),m,m,m,m,m,m)
v=n.e
u=v?m:n.gaPN()
u=A.ab(A.cb(D.a8J,A.c(v?A.b(l):A.b("T\xe9l\xe9charger la facture (PDF)"),m,m,m,m,m,m,m,m),u,m),52,1/0)
v=n.f
s=v?m:n.gaPO()
return A.bi(x,A.a([new A.fN(w,n.d),B.q,u,B.k,A.ab(A.bt(B.ld,A.c(v?A.b(l):A.b("T\xe9l\xe9charger le re\xe7u (PNG)"),m,m,m,m,m,m,m,m),s,m),52,1/0),B.k,A.c(A.b("La facture PDF est g\xe9n\xe9r\xe9e c\xf4t\xe9 serveur apr\xe8s confirmation v\xe9rifi\xe9e. Pour une demande locale, non cr\xe9\xe9e c\xf4t\xe9 serveur, le PDF serveur n\u2019existe pas : la facture d\xe9taill\xe9e ci-dessus, t\xe9l\xe9chargeable en PNG, fait foi."),m,m,m,m,t,m,m,m)],q),m,m,m,m,m,m)}}
var z=a.updateTypes(["av<~>()"])
C.bFk.prototype={
$0(){return this.a.f=!0},
$S:0}
C.bFl.prototype={
$0(){return this.a.f=!1},
$S:0}
C.bFi.prototype={
$0(){return this.a.e=!0},
$S:0}
C.bFj.prototype={
$0(){return this.a.e=!1},
$S:0};(function installTearOffs(){var x=a._instance_0u
var w
x(w=C.a1_.prototype,"gaPO","xX",0)
x(w,"gaPN","BV",0)})();(function inheritance(){var x=a.inherit,w=a.inheritMany
x(C.y2,A.T)
x(C.a1_,A.Y)
w(A.kp,[C.bFk,C.bFl,C.bFi,C.bFj])})()
A.oQ(b.typeUniverse,JSON.parse('{"y2":{"T":[],"q":[]},"a1_":{"Y":["y2"]}}'))
var y={u:A.aA("H<q>"),w:A.aA("H<ik>"),z:A.aA("bO<Y<T>>"),v:A.aA("kQ"),n:A.aA("EH?"),q:A.aA("~")};(function constants(){D.a5y=new A.ao(62116,"MaterialIcons",null,!1)
D.a8J=new A.aa(D.a5y,null,null,null,null)})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_21",e:"endPart",h:b})})($__dart_deferred_initializers__,"AXikG6gPhBp4sdyeokyC+l0ctrI=");