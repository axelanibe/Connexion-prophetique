((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_12",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,D,B={CZ:function CZ(){},PB:function PB(d){this.$ti=d},aNF:function aNF(d){this.a=d},aNG:function aNG(d,e){this.a=d
this.b=e},
ZI(d){var x,w,v,u,t,s=new B.anV(),r=J.P(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
x=r.h(d,"conversation_id")
J.l(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.l(w==null?"":w)
v=A.aR(r.h(d,"appele_id"))
A.aR(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.anU(q,x,w,v,u,t)},
bTf(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.m1(t,y.N,y.z):D.fl
if(u.h(d,"cree_le")!=null)A.c3(J.l(u.h(d,"cree_le")))
return new B.FB(s,x,w,v)},
c3_(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return C.TD
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.m1(s,u,t))}return new B.a0d(x)},
bFY(d){var x=D.h.b2(d.a,1e6)
return D.c.b0(D.h.j(D.h.b2(x,60)),2,"0")+":"+D.c.b0(D.h.j(D.h.aO(x,60)),2,"0")},
bY0(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oh(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.afx(w,v)},
cgi(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.afA(u,A.kj(w)?w:null,v)},
anU:function anU(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
anV:function anV(){},
FB:function FB(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a0d:function a0d(d){this.a=d},
bQk(d,e,f,g,h,i){return new B.oM(e,f,i,h,d,null)},
bQj(d,e,f,g,h){return new B.y_(e,h,f,g,d,null)},
bUs(d,e,f,g,h,i,j,k,l,m,n){return new B.aab(g,f,e,i,h,d,m,l,k,j,n,null)},
oM:function oM(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
SU:function SU(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b8g:function b8g(d){this.a=d},
b8h:function b8h(d){this.a=d},
b8d:function b8d(d){this.a=d},
b8e:function b8e(d){this.a=d},
b8a:function b8a(d){this.a=d},
b8b:function b8b(d){this.a=d},
b8c:function b8c(d){this.a=d},
b87:function b87(d){this.a=d},
b88:function b88(d){this.a=d},
b89:function b89(d){this.a=d},
b8f:function b8f(d){this.a=d},
RA:function RA(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
y_:function y_(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
ST:function ST(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b7S:function b7S(d){this.a=d},
b7T:function b7T(d){this.a=d},
b7R:function b7R(){},
b7U:function b7U(d){this.a=d},
b7V:function b7V(d){this.a=d},
b7W:function b7W(d){this.a=d},
b7X:function b7X(d){this.a=d},
b7Q:function b7Q(d,e){this.a=d
this.b=e},
b7Y:function b7Y(){},
b7Z:function b7Z(d){this.a=d},
b80:function b80(d){this.a=d},
b81:function b81(d){this.a=d},
b82:function b82(d){this.a=d},
b83:function b83(d){this.a=d},
b84:function b84(d){this.a=d},
b85:function b85(d){this.a=d},
b8_:function b8_(d){this.a=d},
b7P:function b7P(d,e){this.a=d
this.b=e},
b7O:function b7O(d,e){this.a=d
this.b=e},
b7N:function b7N(d,e){this.a=d
this.b=e},
b86:function b86(d){this.a=d},
aab:function aab(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.z=l
_.Q=m
_.as=n
_.a=o},
w7:function w7(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aN4:function aN4(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aN5:function aN5(d){this.a=d},
aN6:function aN6(d){this.a=d},
aN7:function aN7(d){this.a=d},
a_Y:function a_Y(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aqK:function aqK(d){this.a=d},
aqL:function aqL(d){this.a=d},
bGR(d){var x=y.U,w=A.I(new A.Y(A.b(d.split(" "),y.s),new B.bGS(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(D.b.gS(w),0).toUpperCase()
return(J.p(D.b.gS(w),0)+J.p(D.b.gaG(w),0)).toUpperCase()},
bGS:function bGS(){},
aIv:function aIv(){},
mr:function mr(d,e,f){this.e=d
this.a=e
this.b=f},
aDW:function aDW(d){this.a=d},
aDX:function aDX(d){this.a=d},
bKg(d){var x=new B.a3G(d)
x.atY(d)
return x},
a3G:function a3G(d){this.d=d},
aDT:function aDT(d){this.a=d},
aDU:function aDU(d){this.a=d},
aDV:function aDV(d){this.a=d},
aDI:function aDI(){},
aDK:function aDK(){},
aDL:function aDL(){},
aDM:function aDM(d){this.a=d},
aDJ:function aDJ(d){this.a=d},
c7G(d,e){var x=y.N
x=new B.a5k(d,e,A.C(x,y.E),A.C(x,y.z))
x.au2(d,e)
return x},
a5k:function a5k(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aIy:function aIy(d){this.a=d},
aIz:function aIz(d){this.a=d},
aIA:function aIA(d){this.a=d},
aIB:function aIB(d){this.a=d},
aIC:function aIC(d){this.a=d},
aID:function aID(d){this.a=d},
aIE:function aIE(d){this.a=d},
aIF:function aIF(d){this.a=d},
aIw:function aIw(d){this.a=d},
aIx:function aIx(d,e){this.a=d
this.b=e},
bKN:function bKN(d){this.a=d},
ci8(){return D.b.mO(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bH_())!==-1},
bH_:function bH_(){},
bSH(){var x=A.b([],y.d),w=$.bSI
$.bSI=w+1
return new B.Oa(w,x,C.ahn,$.af())},
Oa:function Oa(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aIL:function aIL(d){this.a=d},
aIH:function aIH(d){this.a=d},
aII:function aII(d){this.a=d},
aIJ:function aIJ(d){this.a=d},
aIK:function aIK(){},
bSJ(d,e,f){return new B.Oc(d,f,e,null)},
Oc:function Oc(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Od:function Od(){this.c=this.a=null},
aIM:function aIM(){},
aIO:function aIO(d){this.a=d},
aIN:function aIN(d){this.a=d},
bQT(d,e,f,g){var x,w={}
w.a=d
x=new B.a2b(g.i("a2b<0>"))
x.atP(e,f,w,g)
return x},
a2b:function a2b(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
axq:function axq(d,e){this.a=d
this.b=e},
axp:function axp(d){this.a=d},
TJ:function TJ(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bcW:function bcW(){},
a7u:function a7u(d){this.b=this.a=$
this.$ti=d},
a7v:function a7v(){},
bJ2(d,e){return B.c2i(d,e)},
c2i(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bJ2=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nN("ws")&&!d.nN("wss"))throw A.n(A.fi(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xl(r,A.fL(null,null,null,!1,y.D))
u=new A.ax($.aI,y.k)
p=new A.b3(u,y.V)
if(J.q(r.readyState,1))p.cL(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.hj(new B.Gr("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o6(r,"open",!1,y.C).gS(0).aE(new B.apF(p,q),y.H)
t=y.C
s=y.H
new A.o6(r,"error",!1,t).gS(0).aE(new B.apG(p,q),s)
A.hG(r,"message",new B.apH(q),!1,y.m)
new A.o6(r,"close",!1,t).gS(0).aE(new B.apI(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bJ2,w)},
xl:function xl(d,e){this.a=d
this.b=e},
apF:function apF(d,e){this.a=d
this.b=e},
apG:function apG(d,e){this.a=d
this.b=e},
apH:function apH(d){this.a=d},
apI:function apI(d,e){this.a=d
this.b=e},
bLn(){return new B.Gq("Connection Closed")},
rS:function rS(){},
FZ:function FZ(d){this.a=d},
Cf:function Cf(d){this.a=d},
CD:function CD(d,e){this.a=d
this.b=e},
Gr:function Gr(d){this.a=d},
Gq:function Gq(d){this.a=d},
c1P(d){var x=null,w=$.aI,v=new B.a7u(y.Z),u=y.X,t=A.fL(x,x,x,!0,u),s=A.fL(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bQT(new A.cE(s,r.i("cE<1>")),new A.Bu(t,q.i("Bu<1>")),!0,u)
v.b=B.bQT(new A.cE(t,q.i("cE<1>")),new A.Bu(s,r.i("Bu<1>")),!1,u)
v=new B.ama(new A.b3(new A.ax(w,y.W),y.R),v)
v.atG(d)
return v},
ama:function ama(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
ame:function ame(d){this.a=d},
amb:function amb(d){this.a=d},
amc:function amc(d){this.a=d},
amd:function amd(d,e){this.a=d
this.b=e},
amf:function amf(d){this.a=d},
ajb:function ajb(d,e){this.b=d
this.a=e},
a8z:function a8z(d){this.a=d},
chI(d){switch(d){case"new":return C.aha
case"checking":return C.ahb
case"connected":return C.ahd
case"completed":return C.ahc
case"failed":return C.JX
case"disconnected":return C.ahf
case"closed":return C.JY
case"count":return C.ahe}return C.JY},
chJ(d){switch(d){case"new":return C.JZ
case"gathering":return C.ahg
case"complete":return C.ahh}return C.JZ},
cjc(d){switch(d){case"stable":return C.ahi
case"have-local-offer":return C.ahj
case"have-local-pranswer":return C.ahl
case"have-remote-offer":return C.ahk
case"have-remote-pranswer":return C.ahm
case"closed":return C.K4}return C.K4},
ciO(d){switch(d){case"new":return C.K1
case"connecting":return C.K2
case"connected":return C.K3
case"closed":return C.rC
case"disconnected":return C.K0
case"failed":return C.K_}return C.rC},
vp:function vp(d,e){this.a=d
this.b=e},
O7:function O7(d,e){this.a=d
this.b=e},
vo:function vo(d,e){this.a=d
this.b=e},
mC:function mC(d,e){this.a=d
this.b=e},
a5l:function a5l(d,e){this.a=d
this.b=e},
aIu:function aIu(){},
ML:function ML(){},
Ec:function Ec(){},
aDH:function aDH(){},
ER:function ER(d,e,f){this.a=d
this.b=e
this.c=f},
O8:function O8(){},
aIG:function aIG(){},
zP:function zP(d,e){this.a=d
this.b=e},
O9:function O9(d){this.b=d},
Ob:function Ob(d,e,f){this.a=d
this.b=e
this.c=f},
bJY(d){var x=0,w=A.k(y.y)
var $async$bJY=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bJY,w)},
aGp(d){var x=0,w=A.k(y.H),v
var $async$aGp=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aRH("enableSpeakerphone",A.a9(["enable",d],y.N,v),v,v),$async$aGp)
case 2:return A.i(null,w)}})
return A.j($async$aGp,w)},
aRH(d,e,f,g){return B.cai(d,e,f,g,f.i("0?"))},
cai(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aRH=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aRG(),$async$aRH)
case 3:v=C.FE.cr(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aRH,w)},
aRG(){var x=0,w=A.k(y.H),v,u
var $async$aRG=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bUj?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(C.FE.cr("initialize",A.a9(["options",A.C(v,u)],v,u),!1,y.H),$async$aRG)
case 4:$.bUj=!0
case 3:return A.i(null,w)}})
return A.j($async$aRG,w)}},C
J=c[1]
A=c[0]
D=c[2]
B=a.updateHolder(c[5],B)
C=c[27]
B.CZ.prototype={
E(d,e){this.a.E(0,e)},
d_(d,e){this.a.d_(d,e)},
a8(d){return this.a.a8(0)},
$idD:1}
B.PB.prototype={
iF(d){var x=A.ct("subscription"),w=A.fL(new B.aNF(x),null,null,!0,this.$ti.y[1])
x.b=d.eM(new B.aNG(this,w),w.glO(w),w.gno())
return new A.cE(w,A.u(w).i("cE<1>"))}}
B.anU.prototype={}
B.FB.prototype={}
B.a0d.prototype={}
B.oM.prototype={
N(){return new B.SU()}}
B.SU.prototype={
U(){var x=this
x.V()
x.Jx()
x.r=A.dc(D.c_,new B.b8g(x))
x.w=A.k6(D.x9,new B.b8h(x))},
k(){var x=this,w=x.r
if(w!=null)w.Z(0)
w=x.w
if(w!=null)w.Z(0)
w=x.x
if(w!=null)w.Z(0)
x.a4()},
VW(){var x=this.x
if(x!=null)x.Z(0)
this.x=A.dc(D.fW,new B.b8d(this))},
N_(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$N_=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.zV(p.c),$async$N_)
case 7:r=e
q=B.ZI(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b8e(s))
p=s.r
if(p!=null)p.Z(0)
p=s.w
if(p!=null)p.Z(0)
s.VW()}u=2
x=6
break
case 4:u=3
m=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$N_,w)},
Jx(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Jx=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.zV(o.c),$async$Jx)
case 7:r=e
q=B.ZI(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaj2()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b8a(s))
s.VW()
x=1
break}s.n(new B.b8b(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b8c(s))
s.VW()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jx,w)},
Jn(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Jn=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b87(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.Zz(q.c,"accepte"),$async$Jn)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b88(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.C(A.B(null,null,null,null,null,D.f,null,A.c(p,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.Z(0)
q=s.w
if(q!=null)q.Z(0)
q=s.c
q.toString
A.aa(q,!1).wL(A.e1(new B.b89(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jn,w)},
Cp(d){return this.aNY(d)},
avA(){return this.Cp(!1)},
aNY(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Cp=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Z(0)
r=s.w
if(r!=null)r.Z(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.Zz(r.c,"refuse"),$async$Cp)
case 7:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:r=s.c
if(r!=null)A.aa(r,!1).bG()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cp,w)},
B(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.oD(D.t,s,A.c(B.bGR(r.d),s,s,s,s,C.Mc,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,C.M7,D.a2,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,D.ay,new A.a_(C.xu,x,s),D.j,A.c(q,s,s,s,s,C.tG,s,s,s),C.Lx],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b8f(t)
v=A.a("Accepter")
u=t.f?s:t.gauH()
q.push(A.Z(A.b([new B.RA(C.ye,D.k9,r,x,s),C.akM,new B.RA(C.yd,C.adR,v,u,s)],w),D.o,D.bI,D.i,s))}if(t.d)q.push(D.vN)
return A.eO(s,D.n,A.fJ(!0,A.cI(A.M(q,D.o,D.e,D.U),s,s),!0,D.ai,!0,!0),s,s)}}
B.RA.prototype={
B(d){var x=this,w=null,v=A.dk(x.d,w,w,D.ai,D.cg,w)
return A.M(A.b([A.ab(A.b5(!1,A.c9(x.c,D.l,w,32),D.k,w,D.q,w,w,w,w,x.f,w,v),72,72),D.j,A.c(x.e,w,w,w,w,D.e7,w,w,w)],y.p),D.o,D.e,D.U)}}
B.y_.prototype={
N(){return new B.ST(A.b_(y.N),D.V)}}
B.ST.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bSH()
w=B.bSH()
v.d!==$&&A.bi()
v.d=new B.aN4(x,w)
v.a.toString
x=new B.a_Y(new A.es(u,u,y.g),new A.es(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.uP()},
k(){var x=this,w=x.ay
if(w!=null)w.Z(0)
w=x.ch
if(w!=null)w.Z(0)
w=x.CW
if(w!=null)w.Z(0)
w=x.cx
if(w!=null)w.Z(0)
w=x.cy
if(w!=null)w.Z(0)
w=x.d
w===$&&A.d()
w.ww()
w=x.e
w===$&&A.d()
w.FR()
x.a4()},
uP(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$uP=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a7()
x=7
return A.e(l.zV(m.c),$async$uP)
case 7:r=e
q=B.ZI(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mo(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.Ox(),$async$uP)
case 8:p=e
o=B.c3_(p)
x=9
return A.e(s.SY(),$async$uP)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.C(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))}s.mo(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.tX(A.a9(["iceServers",o.a],y.N,y.z),k==="video"),$async$uP)
case 10:m.f=new B.b7S(s)
m.r=new B.b7T(s)
m.w=new B.b7U(s)
if(s.c==null){x=1
break}s.n(new B.b7V(s))
s.ch=A.dc(D.c_,new B.b7W(s))
s.CW=A.k6(D.cU,new B.b7X(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cN(k,A.u(k).i("cN<1>")).cU(s.gaSP())
k=m.w
s.cy=new A.cN(k,A.u(k).i("cN<1>")).cU(new B.b7Y())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.NI(D.c.QK("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f9(D.c9,n,D.aj,!0))}s.ay=A.k6(D.fW,new B.b7Z(s))
s.Dw()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.C(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
s.mo(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uP,w)},
SY(){var x=0,w=A.k(y.y),v
var $async$SY=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$SY,w)},
Dw(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Dw=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.bU("/messagerie/appels/"+p.c+"/signaux"),$async$Dw)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gK(p)
s.adf(B.bTf(q))}u=2
x=6
break
case 4:u=3
m=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Dw,w)},
adf(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bY0(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.zq(A.a9(["sdp",v.a,"type",v.b],y.N,y.z)).aE(new B.b80(s),y.a).h3(new B.b81(s))
break
case"reponse":if(!s.a.f)return
u=B.bY0(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.No(A.a9(["sdp",u.a,"type",u.b],y.N,y.z)).aE(new B.b82(s),y.a).h3(new B.b83(s))
break
case"candidat_ice":t=B.cgi(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.Nj(A.a9(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.FK().aE(new B.b84(s),y.a).h3(new B.b85(s))
break
case"refuse":s.mo(A.a("Appel refus\xe9"))
break
case"annule":s.mo(A.a("Appel annul\xe9"))
break
case"termine":s.mo(A.a("Appel termin\xe9"))
break}},
aap(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.Z(0)
w.n(new B.b8_(w))},
y_(d,e,f){return this.aBf(d,e,f)},
a6S(d,e){return this.y_(d,e,!0)},
aBf(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$y_=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.ah6(s.c,e,d),$async$y_)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$y_,w)},
E0(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$E0=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.Z(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.Zz(r.c,"termine"),$async$E0)
case 7:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:r=s.c
if(r!=null)A.aa(r,!1).bG()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$E0,w)},
mo(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.Z(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.C(A.B(v,v,v,v,v,D.f,v,A.c(d,v,v,v,v,v,v,v,v),v,D.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.aa(x,!1).bG()},
JG(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JG=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.RY(u),$async$JG)
case 2:if(v.c!=null)v.n(new B.b7P(v,u))
return A.i(null,w)}})
return A.j($async$JG,w)},
JF(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JF=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.ID(u),$async$JF)
case 2:if(v.c!=null)v.n(new B.b7O(v,u))
return A.i(null,w)}})
return A.j($async$JF,w)},
JD(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JD=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.RV(u),$async$JD)
case 2:if(v.c!=null)v.n(new B.b7N(v,u))
return A.i(null,w)}})
return A.j($async$JD,w)},
JE(){var x=0,w=A.k(y.H),v=this,u
var $async$JE=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.Nr(),$async$JE)
case 2:return A.i(null,w)}})
return A.j($async$JE,w)},
B(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bSJ(o.e,!1,C.K6)
else{x=A.oD(D.t,q,A.c(B.bGR(w.e),q,q,q,q,C.ape,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,C.anD,q,q,q)
x=A.cI(A.M(A.b([x,D.p,w,D.j,A.c(r.w?B.bFY(r.ax):A.a(p),q,q,q,q,C.tG,q,q,q)],y.p),D.o,D.e,D.U),q,q)}x=A.NT(0,x)
o=A.jY(q,A.fj(A.Q(12),B.bSJ(o.d,!0,C.K6),D.ar),160,q,q,16,16,110)
w=r.w
v=B.bFY(r.ax)
u=r.z
t=r.Q
u=A.fK(D.bm,A.b([x,o,A.jY(24,B.bUs(r.as,v,w,!0,t,u,r.ga4v(),r.ga4u(),r.ga4w(),r.ga4x(),r.gaaH()),q,q,0,0,q,q)],y.p),D.f,D.br,q)
o=u}else{o=A.oD(D.t,q,A.c(B.bGR(w.e),q,q,q,q,C.Mc,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,C.M7,D.a2,q,q)
if(r.w)w=B.bFY(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,C.tG,q,q,q)
v=r.w
u=B.bFY(r.ax)
t=r.z
s=r.Q
t=A.cI(A.M(A.b([o,D.ay,new A.a_(C.xu,x,q),D.j,w,C.Lx,B.bUs(r.as,u,v,!1,s,t,r.ga4v(),r.ga4u(),r.ga4w(),r.ga4x(),r.gaaH())],y.p),D.o,D.e,D.U),q,q)
o=t}return A.bSr(!1,A.eO(q,D.n,A.fJ(!0,o,!0,D.ai,!0,!0),q,q),new B.b86(r),y.K)}}
B.aab.prototype={
B(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,C.aoq,u,u,u))
if(r&&v.c)s.push(D.p)
r=v.f
x=r?C.Z0:C.Z_
t=A.b([new B.w7(x,r,A.a("Muet"),v.x,u,u),C.nB,new B.w7(C.Za,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(C.nB)
if(r){x=v.w
w=x?C.yj:C.Z9
t.push(new B.w7(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(C.nB)
if(r)t.push(new B.w7(C.Z8,!1,A.a("Basculer"),v.Q,u,u))
t.push(C.nB)
t.push(new B.w7(C.ye,!1,A.a("Raccrocher"),v.as,D.k9,u))
s.push(A.Z(t,D.o,D.bI,D.i,u))
return A.M(s,D.o,D.e,D.U)}}
B.w7.prototype={
B(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?D.l:D.lk
if(!t)x=D.l
else x=w.d?D.n:D.l
t=A.dk(u,v,v,D.ai,D.cg,v)
return A.M(A.b([A.ab(A.b5(!1,A.c9(w.c,x,v,26),D.k,v,D.q,v,v,v,v,w.f,v,t),56,56),D.b2,A.c(w.e,v,v,v,v,D.aor,v,v,v)],y.p),D.o,D.e,D.U)}}
B.aN4.prototype={
tX(d,e){return this.b4X(d,e)},
b4X(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tX=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.iJ(0),$async$tX)
case 2:x=3
return A.e(v.e.iJ(0),$async$tX)
case 3:u=$.bZE()
if(e){t=y.N
t=A.a9(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aDI().BH(0,A.a9(["audio",!0,"video",t],s,r)),$async$tX)
case 4:q=v.b=g
o.sa2G(0,q)
x=5
return A.e(u.YO(d,A.C(s,r)),$async$tX)
case 5:p=v.a=g
x=6
return A.e(p.kg(0,q),$async$tX)
case 6:p.e=new B.aN5(v)
p.Q=new B.aN6(v)
p.d=new B.aN7(v)
return A.i(null,w)}})
return A.j($async$tX,w)},
azK(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa2G(0,d)
x=w.r
if(x!=null)x.$0()}},
FK(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$FK=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.NU(0),$async$FK)
case 3:t=e
x=4
return A.e(s.BW(0,t),$async$FK)
case 4:v=A.a9(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$FK,w)},
zq(d){return this.aXQ(d)},
aXQ(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$zq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BY(0,new B.zP(d.h(0,"sdp"),d.h(0,"type"))),$async$zq)
case 3:x=4
return A.e(s.NS(0),$async$zq)
case 4:t=f
x=5
return A.e(s.BW(0,t),$async$zq)
case 5:v=A.a9(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$zq,w)},
No(d){return this.aV1(d)},
aV1(d){var x=0,w=A.k(y.H),v=this,u
var $async$No=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BY(0,new B.zP(d.h(0,"sdp"),d.h(0,"type"))),$async$No)
case 2:return A.i(null,w)}})
return A.j($async$No,w)},
Nj(d){return this.aUO(d)},
aUO(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Nj=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.N9(new B.ER(A.aR(d.h(0,"candidate")),A.aR(d.h(0,"sdpMid")),A.e7(d.h(0,"sdpMLineIndex")))),$async$Nj)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nj,w)},
RY(d){return this.anI(d)},
anI(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$RY=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Ru(0)
if(r==null)r=D.dj
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skk(0,t)
return A.i(null,w)}})
return A.j($async$RY,w)},
ID(d){return this.any(d)},
any(d){var x=0,w=A.k(y.H)
var $async$ID=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGp(d),$async$ID)
case 2:return A.i(null,w)}})
return A.j($async$ID,w)},
RV(d){return this.anq(d)},
anq(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$RV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Im(0)
if(s==null)s=D.dj
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skk(0,d)
return A.i(null,w)}})
return A.j($async$RV,w)},
Nr(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Nr=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Im(0)
if(s==null)s=C.a9U
if(s.length===0){x=1
break}x=3
return A.e(B.bJY(D.b.gS(s)),$async$Nr)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nr,w)},
ww(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$ww=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a8(0)
x=7
return A.e(y.x.b(q)?q:A.dJ(q,y.H),$async$ww)
case 7:u=2
x=6
break
case 4:u=3
i=t
x=6
break
case 3:x=2
break
case 6:s.a=null
q=s.b
if(q==null)q=null
else{o=A.I(q.Ru(0),!0,y.G)
D.b.t(o,q.Im(0))
q=o}if(q==null)q=D.dj
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c1I(r)
if(!m.b(k)){j=new A.ax($.aI,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$ww)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.L)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.e(s.d.k(),$async$ww)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:u=22
x=25
return A.e(s.e.k(),$async$ww)
case 25:u=2
x=24
break
case 22:u=21
f=t
x=24
break
case 21:x=2
break
case 24:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$ww,w)}}
B.a_Y.prototype={
NI(d){return this.aWg(d)},
aWg(d){var x=0,w=A.k(y.H),v=this
var $async$NI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Cq(),$async$NI)
case 2:return A.i(null,w)}})
return A.j($async$NI,w)},
Cq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Cq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c1P(B.bJ2(A.cH(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Cq)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cE(p,A.u(p).i("cE<1>")).aS(s.gaNM(),!0,s.gaMU(),new B.aqK(s))
u=2
x=6
break
case 4:u=3
n=t
s.VN()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cq,w)},
aNN(d){var x,w,v,u
try{x=D.a_.cR(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.bTf(w))}catch(u){}},
VN(){var x,w=this,v=w.c
if(v!=null)v.Z(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=C.a6a[v]
w.f=v+1
v=w.d
if(v!=null)v.Z(0)
w.d=A.dc(A.dp(0,0,0,0,x),new B.aqL(w))},
FR(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$FR=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Z(0)
s=t.c
s=s==null?null:s.Z(0)
x=2
return A.e(y.x.b(s)?s:A.dJ(s,y.H),$async$FR)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.aW()
r=s.w=new B.ajb(s,q)}s=r.a8(0)}x=7
return A.e(y._.b(s)?s:A.dJ(s,y.z),$async$FR)
case 7:v=1
x=6
break
case 4:v=3
o=u
x=6
break
case 3:x=1
break
case 6:t.b=null
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$FR,w)}}
B.aIv.prototype={
YO(d,e){return this.aXH(d,e)},
aXH(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$YO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a9(["mandatory",A.C(r,r),"optional",A.b([A.a9(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fo(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bR(t)))
t=J.l(s)
v=B.c7G(D.d8.glR().by(new A.eK(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$YO,w)}}
B.mr.prototype={
Ru(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dg(w,A.X(w).i("dg<1,aA>"))
J.h1(w,new B.aDW(x))
return x},
Im(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dg(w,A.X(w).i("dg<1,aA>"))
J.h1(w,new B.aDX(x))
return x}}
B.a3G.prototype={
atY(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aDT(x)))
w.addEventListener("mute",A.bV(new B.aDU(x)))
w.addEventListener("unmute",A.bV(new B.aDV(x)))},
skk(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aDI.prototype={
BH(d,e){return this.amz(0,e)},
amz(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$BH=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.ci8())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iv(e.h(0,"video"),"facingMode")
e.cm(0,"video",new B.aDK())
e.cm(0,"audio",new B.aDL())}catch(a0){A.n6("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hU(e.h(0,"audio"),i,i).aP(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h1(s,new B.aDM(r))
J.iv(e.h(0,"audio"),"optional")
J.iZ(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.bd(a0)
A.n6("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bR(e)
x=10
return A.e(A.eA(o.getUserMedia(h.a(n)),h),$async$BH)
case 10:m=a2
i=m
h=i.id
v=new B.mr(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eA(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$BH)
case 11:l=a2
h=l
g=h.id
v=new B.mr(h,g,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.O(f)
i=J.l(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$BH,w)}}
B.a5k.prototype={
au2(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aIy(x)))
w.addEventListener("icecandidate",A.bV(new B.aIz(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aIA(x)))
w.onicegatheringstatechange=A.bV(new B.aIB(x))
w.addEventListener("signalingstatechange",A.bV(new B.aIC(x)))
if(!$.bNf())w.addEventListener("connectionstatechange",A.bV(new B.aID(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aIE(x)))
w.addEventListener("track",A.bV(new B.aIF(x)))},
NU(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NU=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eA(s.createOffer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$NU)
case 3:t=f
v=new B.zP(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NU,w)},
NS(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NS=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eA(s.createAnswer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$NS)
case 3:t=f
v=new B.zP(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NS,w)},
kg(d,e){var x
this.ax.cm(0,e.a,new B.aIx(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cK(null,y.H)},
BW(d,e){return this.anC(0,e)},
anC(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BW=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eA(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BW)
case 2:return A.i(null,w)}})
return A.j($async$BW,w)},
BY(d,e){return this.anT(0,e)},
anT(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BY=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eA(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BY)
case 2:return A.i(null,w)}})
return A.j($async$BY,w)},
N9(d){return this.aUv(d)},
aUv(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$N9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eA(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$N9)
case 2:return A.i(null,w)}})
return A.j($async$N9,w)},
a8(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a8=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cK(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a8,w)}}
B.bKN.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.Oa.prototype={
sajf(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Gg()
if(x!=null)x.style.objectFit=e},
ado(){var x=this,w=x.Gg(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sm(0,v.aga(u,x.z!=null,0,t))},
sa2G(d,e){var x,w,v,u,t=this
t.z=e
if(e.Im(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.X(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.Ru(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.X(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aB3()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Gg()
if(u!=null){u.srcObject=t.x
x=t.Gg()
x.toString
t.a4k(x)}t.sm(0,t.a.aWE(t.z!=null))},
aB3(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Gg(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].Z(0)
q=u.Gg()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.ef()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
iJ(d){var x=0,w=A.k(y.H),v=this
var $async$iJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.II()
$.q6().u1("RTCVideoRenderer-"+v.Q,new B.aIL(v),!0)
return A.i(null,w)}})
return A.j($async$iJ,w)},
a4k(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Oc.prototype={
N(){return new B.Od()}}
B.Od.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a6(0,v.gaL6())
x=v.a
w=x.c
w.as=x.e
w.sajf(0,x.d===C.K5?"contain":"cover")},
aL7(){if(this.c!=null)this.n(new B.aIM())},
k(){if(this.c!=null)this.a4()},
aT(d){var x,w
this.bb(d)
A.dc(A.dp(0,0,10,0,0),new B.aIO(this))
x=this.a
w=x.c
w.sajf(0,x.d===C.K5?"contain":"cover")},
B(d){return new A.lr(new B.aIN(this),null)}}
B.a2b.prototype={
atP(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.bi()
x.a=new B.TJ(d,x,new A.b3(new A.ax(w,y.c),y.r),e,g.i("TJ<0>"))
if(f.a.ghU())f.a=new B.PB(g.i("@<0>").bT(g).i("PB<1,2>")).iF(f.a)
w=A.fL(null,new B.axq(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
aa2(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Z(0)
w=this.b
w===$&&A.d()
w.a8(0)}}
B.TJ.prototype={
E(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
d_(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aDr(d,e)},
jG(d){return this.d_(d,null)},
aDr(d,e){var x=this
if(x.w){x.a.a.d_(d,e)
return}x.c.fi(d,e)
x.aa3()
x.b.aa2()
x.a.a.a8(0).h3(new B.bcW())},
a8(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aa2()
x.c.cL(0,x.a.a.a8(0))}return x.c.a},
aa3(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dN(0)
return},
$idD:1}
B.a7u.prototype={}
B.a7v.prototype={}
B.xl.prototype={
a5u(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.CD(d,e))
x.a8(0)},
a2h(d){var x
if((this.b.b&4)!==0)throw A.n(B.bLn())
x=A.bR(d)
x.toString
this.a.send(x)},
vD(d,e,f){return this.aW1(0,e,f)},
aW1(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vD=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bLn())
u.a8(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vD,w)},
$ibLm:1}
B.rS.prototype={}
B.FZ.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.FZ&&e.a===this.a},
gH(d){return D.c.gH(this.a)}}
B.Cf.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Cf&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fG(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.CD.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.CD&&e.a===this.a&&e.b===this.b},
gH(d){return A.fG([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gr.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Gq.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.ama.prototype={
atG(d){d.ey(new B.ame(this),new B.amf(this),y.a)}}
B.ajb.prototype={
a8(d){var x=this.b
x.e=x.d=null
return this.apt(0)}}
B.a8z.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vp.prototype={
M(){return"RTCSignalingState."+this.b}}
B.O7.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vo.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mC.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a5l.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aIu.prototype={}
B.ML.prototype={}
B.Ec.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aDH.prototype={}
B.ER.prototype={}
B.O8.prototype={}
B.aIG.prototype={}
B.zP.prototype={}
B.O9.prototype={}
B.Ob.prototype={
aga(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Ob(x,w,v)},
aWE(d){return this.aga(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","y_(H)","~(FB)","bn(ER)","bn(O9)","bn(mC)","~(@)","mr(@)","mr()","bn(bLm)","~(rS)"])
B.aNF.prototype={
$0(){return J.c17(this.a.bk())},
$S:1}
B.aNG.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.d_(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.anV.prototype={
$1(d){if(d==null)return null
return A.c3(J.l(d))},
$S:128}
B.b8g.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.Cp(!0)},
$S:0}
B.b8h.prototype={
$1(d){return this.a.N_()},
$S:40}
B.b8d.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bG()},
$S:0}
B.b8e.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b8a.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8b.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b8c.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b87.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b88.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b89.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bQj(x.w,w,u,!1,v)},
$S:z+2}
B.b8f.prototype={
$0(){return this.a.avA()},
$S:0}
B.b7S.prototype={
$1(d){this.a.y_("candidat_ice",d,!1)},
$S:288}
B.b7T.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b7R())},
$S:0}
B.b7R.prototype={
$0(){},
$S:0}
B.b7U.prototype={
$0(){this.a.mo(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b7V.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b7W.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.y_("annule",D.fl,!1)
x.mo(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b7X.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b7Q(x,w))},
$S:40}
B.b7Q.prototype={
$0(){return this.a.ax=new A.av(Date.now(),0,!1).eG(this.b)},
$S:0}
B.b7Y.prototype={
$1(d){},
$S:142}
B.b7Z.prototype={
$1(d){this.a.Dw()},
$S:40}
B.b80.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.aap()
x.a6S("reponse",d)},
$S:287}
B.b81.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b82.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.aap()},
$S:28}
B.b83.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b84.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a6S("offre",d)},
$S:287}
B.b85.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b8_.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.av(Date.now(),0,!1)
x.ax=D.V},
$S:0}
B.b7P.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b7O.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b7N.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b86.prototype={
$2(d,e){if(!d)this.a.E0()},
$S:935}
B.aN5.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a9(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aN6.prototype={
$1(d){var x=d.b,w=x.length!==0?D.b.gS(x):null
if(w!=null)this.a.azK(w)},
$S:z+5}
B.aN7.prototype={
$1(d){var x
if(d===C.JX){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.aqK.prototype={
$1(d){return this.a.VN()},
$S:22}
B.aqL.prototype={
$0(){var x=this.a
if(!x.e)x.Cq()},
$S:0}
B.bGS.prototype={
$1(d){return d.length!==0},
$S:12}
B.aDW.prototype={
$1(d){return this.a.push(B.bKg(d))},
$S:22}
B.aDX.prototype={
$1(d){return this.a.push(B.bKg(d))},
$S:22}
B.aDT.prototype={
$1(d){},
$S:21}
B.aDU.prototype={
$1(d){},
$S:21}
B.aDV.prototype={
$1(d){},
$S:21}
B.aDK.prototype={
$0(){return!1},
$S:50}
B.aDL.prototype={
$0(){return!1},
$S:50}
B.aDM.prototype={
$1(d){J.h1(d,new B.aDJ(this.a))},
$S:288}
B.aDJ.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:46}
B.aIy.prototype={
$1(d){},
$S:21}
B.aIz.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.ER(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:21}
B.aIA.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.chI(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bNf())switch(w.cx.a){case 0:w.cy=C.K1
break
case 1:w.cy=C.K2
break
case 3:w.cy=C.K3
break
case 5:w.cy=C.K_
break
case 6:w.cy=C.K0
break
case 7:w.cy=C.rC
break
default:break}},
$S:41}
B.aIB.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.chJ(w.iceGatheringState)},
$S:41}
B.aIC.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cjc(w.signalingState)},
$S:41}
B.aID.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.ciO(w.connectionState)},
$S:41}
B.aIE.prototype={
$1(d){},
$S:41}
B.aIF.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bKg(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dg(x,A.X(x).i("dg<1,aA>"))
w=J.eS(x,new B.aIw(w),y.h)
v.$1(new B.O9(A.I(w,!0,w.$ti.i("aD.E"))))}},
$S:21}
B.aIw.prototype={
$1(d){return new B.mr(d,d.id,this.a.as)},
$S:z+8}
B.aIx.prototype={
$0(){var x=this.b.e
return new B.mr(x,x.id,this.a.as)},
$S:z+9}
B.bH_.prototype={
$1(d){return J.fN(self.window.navigator.userAgent,A.bJ(d,!1,!1))},
$S:12}
B.aIL.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.L)(w),++u)w[u].Z(0)
D.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a4k(t)
v=y.i.c
w.push(A.hG(t,"canplay",new B.aIH(x),!1,v))
w.push(A.hG(t,"resize",new B.aII(x),!1,v))
w.push(A.hG(t,"error",new B.aIJ(t),!1,v))
w.push(A.hG(t,"ended",new B.aIK(),!1,v))
return t},
$S:221}
B.aIH.prototype={
$1(d){this.a.ado()},
$S:22}
B.aII.prototype={
$1(d){this.a.ado()},
$S:22}
B.aIJ.prototype={
$1(d){var x,w,v=this.a.error
A.n6("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=D.Fr.h(0,A.al(v,"code"))
x.toString
w=!J.q(A.al(v,"message"),"")?A.al(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pe(x,D.Fq.h(0,A.al(v,"code")),w,null))},
$S:38}
B.aIK.prototype={
$1(d){},
$S:22}
B.aIM.prototype={
$0(){},
$S:0}
B.aIO.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aIN.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a2s("RTCVideoRenderer-"+w.Q)
else w=A.U(x,x,D.k,x,x,x,x,x,x,x,x,x,x,x)
return A.cI(A.U(x,w,D.k,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:936}
B.axq.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eM(w.ghB(w),new B.axp(v),w.gno())},
$S:0}
B.axp.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aa3()
x=x.b
x===$&&A.d()
x.a8(0)},
$S:0}
B.bcW.prototype={
$1(d){},
$S:19}
B.apF.prototype={
$1(d){this.a.cL(0,this.b)},
$S:21}
B.apG.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hj(new B.Gr("Failed to connect WebSocket"))
else this.b.a5u(1006,"error")},
$S:21}
B.apH.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.ct("data")
if(typeof x==="string")w.b=new B.FZ(A.bC(x))
else if(typeof x==="object"&&A.c5M(y.m.a(x),"ArrayBuffer"))w.b=new B.Cf(A.a43(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.az(x).j(0)))
v.E(0,w.bk())},
$S:38}
B.apI.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cL(0,this.b)
this.b.a5u(d.code,d.reason)},
$S:21}
B.ame.prototype={
$1(d){var x=d.b,w=this.a
new A.cE(x,A.u(x).i("cE<1>")).cU(new B.amb(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cE(x,A.u(x).i("cE<1>")).b29(new B.amc(d),new B.amd(w,d))
w.f.dN(0)},
$S:z+10}
B.amb.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.FZ
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.Cf
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.CD){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a8(0)}}},
$S:z+11}
B.amc.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.bLn())
s=A.bR(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a2h(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a2h(new Uint8Array(A.cZ(u)))
break $label1$1}t=A.aK("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Gq))throw r}},
$S:17}
B.amd.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.vD(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.O(q) instanceof B.Gq))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.amf.prototype={
$1(d){var x,w=d instanceof A.QA?d:new B.a8z(J.l(d)),v=this.a
v.f.hj(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.jG(w)
v=v.a
v===$&&A.d()
v.a8(0)},
$S:41};(function aliases(){var x=B.CZ.prototype
x.apt=x.a8})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.SU.prototype,"gauH","Jn",0)
var v
w(v=B.ST.prototype,"gaSP","adf",3)
x(v,"gaaH","E0",0)
x(v,"ga4x","JG",0)
x(v,"ga4w","JF",0)
x(v,"ga4u","JD",0)
x(v,"ga4v","JE",0)
w(v=B.a_Y.prototype,"gaNM","aNN",7)
x(v,"gaMU","VN",1)
x(B.Oa.prototype,"gdF","k",0)
x(B.Od.prototype,"gaL6","aL7",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a2,[B.CZ,B.anU,B.FB,B.a0d,B.aN4,B.a_Y,B.aIu,B.ML,B.Ec,B.aDH,B.O8,B.aIG,B.a7v,B.TJ,B.a7u,B.xl,B.rS,B.Gr,B.a8z,B.ER,B.zP,B.O9,B.Ob])
w(B.PB,A.fe)
x(A.jE,[B.aNF,B.b8g,B.b8d,B.b8e,B.b8a,B.b8b,B.b8c,B.b87,B.b88,B.b8f,B.b7T,B.b7R,B.b7U,B.b7V,B.b7W,B.b7Q,B.b8_,B.b7P,B.b7O,B.b7N,B.aqL,B.aDK,B.aDL,B.aIx,B.aIM,B.aIO,B.axq,B.axp,B.amd])
x(A.ie,[B.aNG,B.anV,B.b8h,B.b89,B.b7S,B.b7X,B.b7Y,B.b7Z,B.b80,B.b81,B.b82,B.b83,B.b84,B.b85,B.aN5,B.aN6,B.aN7,B.aqK,B.bGS,B.aDW,B.aDX,B.aDT,B.aDU,B.aDV,B.aDM,B.aIy,B.aIz,B.aIA,B.aIB,B.aIC,B.aID,B.aIE,B.aIF,B.aIw,B.bH_,B.aIL,B.aIH,B.aII,B.aIJ,B.aIK,B.bcW,B.apF,B.apG,B.apH,B.apI,B.ame,B.amb,B.amc,B.amf])
x(A.N,[B.oM,B.y_,B.Oc])
x(A.T,[B.SU,B.ST,B.Od])
x(A.at,[B.RA,B.aab,B.w7])
x(A.ql,[B.b86,B.aDJ,B.aIN])
w(B.aIv,B.aIu)
w(B.mr,B.ML)
w(B.a3G,B.Ec)
w(B.aDI,B.aDH)
w(B.a5k,B.O8)
w(B.bKN,B.aIG)
w(B.Oa,A.d3)
x(B.a7v,[B.a2b,B.ama])
x(B.rS,[B.FZ,B.Cf,B.CD])
w(B.Gq,B.Gr)
w(B.ajb,B.CZ)
x(A.GU,[B.vp,B.O7,B.vo,B.mC,B.a5l])})()
A.oc(b.typeUniverse,JSON.parse('{"CZ":{"dD":["1"]},"PB":{"fe":["1","2"],"fe.S":"1","fe.T":"2"},"y_":{"N":[],"m":[]},"oM":{"N":[],"m":[]},"SU":{"T":["oM"]},"RA":{"at":[],"m":[]},"ST":{"T":["y_"]},"aab":{"at":[],"m":[]},"w7":{"at":[],"m":[]},"mr":{"ML":[]},"a3G":{"Ec":[]},"a5k":{"O8":[]},"Oa":{"d3":["Ob"],"aX":[]},"Oc":{"N":[],"m":[]},"Od":{"T":["Oc"]},"TJ":{"dD":["1"]},"xl":{"bLm":[]},"FZ":{"rS":[]},"Cf":{"rS":[]},"CD":{"rS":[]},"Gr":{"bM":[]},"Gq":{"bM":[]},"ajb":{"dD":["@"]},"a8z":{"bM":[]}}'))
A.bLP(b.typeUniverse,JSON.parse('{"CZ":1,"a7v":1}'))
var y=(function rtii(){var x=A.au
return{b:x("xl"),L:x("bM"),_:x("as<@>"),x:x("as<~>"),S:x("E<ae<o,J>>"),t:x("E<ae<o,@>>"),Q:x("E<Ec>"),d:x("E<im<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aA"),l:x("K<aA>"),F:x("K<ae<o,@>>"),j:x("K<@>"),I:x("K<w>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("ML"),G:x("Ec"),h:x("mr"),o:x("p9"),a:x("bn"),K:x("a2"),J:x("O8"),v:x("zP"),Z:x("a7u<a2?>"),N:x("o"),e:x("pE"),M:x("e6"),D:x("rS"),U:x("Y<o>"),g:x("es<FB>"),n:x("es<~>"),V:x("b3<xl>"),r:x("b3<@>"),R:x("b3<~>"),i:x("T3<aA>"),C:x("o6<aA>"),k:x("ax<xl>"),c:x("ax<@>"),W:x("ax<~>"),q:x("ke"),y:x("J"),z:x("@"),A:x("aA?"),X:x("a2?"),H:x("~")}})();(function constants(){var x=a.makeConstList
C.TD=new B.a0d(D.k0)
C.xu=new A.ap(32,0,32,0)
C.yd=new A.ah(57638,!1)
C.ye=new A.ah(57639,!1)
C.Z_=new A.ah(58337,!1)
C.Z0=new A.ah(58341,!1)
C.Z8=new A.ah(58923,!1)
C.yj=new A.ah(59048,!1)
C.Z9=new A.ah(59049,!1)
C.Za=new A.ah(59077,!1)
C.a6a=A.b(x([1,2,4,8,16]),A.au("E<w>"))
C.a9U=A.b(x([]),y.Q)
C.Tw=new A.F(1,0.9098039215686274,0.9607843137254902,0.9137254901960784,D.r)
C.RW=new A.F(1,0.7843137254901961,0.9019607843137255,0.788235294117647,D.r)
C.Sj=new A.F(1,0.6470588235294118,0.8392156862745098,0.6549019607843137,D.r)
C.SL=new A.F(1,0.5058823529411764,0.7803921568627451,0.5176470588235295,D.r)
C.S4=new A.F(1,0.4,0.7333333333333333,0.41568627450980394,D.r)
C.S5=new A.F(1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Ty=new A.F(1,0.2627450980392157,0.6274509803921569,0.2784313725490196,D.r)
C.SD=new A.F(1,0.2196078431372549,0.5568627450980392,0.23529411764705882,D.r)
C.SQ=new A.F(1,0.1803921568627451,0.49019607843137253,0.19607843137254902,D.r)
C.RN=new A.F(1,0.10588235294117647,0.3686274509803922,0.12549019607843137,D.r)
C.adG=new A.dt([50,C.Tw,100,C.RW,200,C.Sj,300,C.SL,400,C.S4,500,C.S5,600,C.Ty,700,C.SD,800,C.SQ,900,C.RN],A.au("dt<w,F>"))
C.adR=new A.yZ(C.adG,1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.FE=new A.fE("FlutterWebRTC.Method",D.ba,null)
C.aha=new B.mC(0,"RTCIceConnectionStateNew")
C.ahb=new B.mC(1,"RTCIceConnectionStateChecking")
C.ahc=new B.mC(2,"RTCIceConnectionStateCompleted")
C.ahd=new B.mC(3,"RTCIceConnectionStateConnected")
C.ahe=new B.mC(4,"RTCIceConnectionStateCount")
C.JX=new B.mC(5,"RTCIceConnectionStateFailed")
C.ahf=new B.mC(6,"RTCIceConnectionStateDisconnected")
C.JY=new B.mC(7,"RTCIceConnectionStateClosed")
C.JZ=new B.O7(0,"RTCIceGatheringStateNew")
C.ahg=new B.O7(1,"RTCIceGatheringStateGathering")
C.ahh=new B.O7(2,"RTCIceGatheringStateComplete")
C.rC=new B.vo(0,"RTCPeerConnectionStateClosed")
C.K_=new B.vo(1,"RTCPeerConnectionStateFailed")
C.K0=new B.vo(2,"RTCPeerConnectionStateDisconnected")
C.K1=new B.vo(3,"RTCPeerConnectionStateNew")
C.K2=new B.vo(4,"RTCPeerConnectionStateConnecting")
C.K3=new B.vo(5,"RTCPeerConnectionStateConnected")
C.ahi=new B.vp(0,"RTCSignalingStateStable")
C.ahj=new B.vp(1,"RTCSignalingStateHaveLocalOffer")
C.ahk=new B.vp(2,"RTCSignalingStateHaveRemoteOffer")
C.ahl=new B.vp(3,"RTCSignalingStateHaveLocalPrAnswer")
C.ahm=new B.vp(4,"RTCSignalingStateHaveRemotePrAnswer")
C.K4=new B.vp(5,"RTCSignalingStateClosed")
C.ahn=new B.Ob(0,0,0)
C.K5=new B.a5l(0,"RTCVideoViewObjectFitContain")
C.K6=new B.a5l(1,"RTCVideoViewObjectFitCover")
C.nB=new A.ce(20,null,null,null)
C.akM=new A.ce(48,null,null,null)
C.Lx=new A.ce(null,64,null,null)
C.anD=new A.y(!0,D.l,null,null,null,null,22,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.M7=new A.y(!0,D.l,null,null,null,null,26,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.tG=new A.y(!0,D.as,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aoq=new A.y(!0,D.l,null,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.ape=new A.y(!0,D.n,null,null,null,null,32,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.Mc=new A.y(!0,D.n,null,null,null,null,40,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bUj=!1
$.bSI=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cmx","bZE",()=>new B.aIv())
x($,"ckE","bNf",()=>D.c.q(A.al(A.al(A.al(A.bMX(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_12",e:"endPart",h:b})})($__dart_deferred_initializers__,"V0hX08IpYW72CB1ii6kxP6Zpko0=");