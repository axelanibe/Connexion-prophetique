((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Da:function Da(){},Q0:function Q0(d){this.$ti=d},aOm:function aOm(d){this.a=d},aOn:function aOn(d,e){this.a=d
this.b=e},
a_h(d){var x,w,v,u,t,s=new B.aov(),r=J.N(d),q=r.h(d,"id")
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
return new B.aou(q,x,w,v,u,t)},
bUZ(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.m6(t,y.N,y.z):C.e0
if(u.h(d,"cree_le")!=null)A.c1(J.l(u.h(d,"cree_le")))
return new B.FL(s,x,w,v)},
c4N(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.T7
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.m6(s,u,t))}return new B.a0L(x)},
bHy(d){var x=C.h.b3(d.a,1e6)
return C.c.b_(C.h.j(C.h.b3(x,60)),2,"0")+":"+C.c.b_(C.h.j(C.h.aO(x,60)),2,"0")},
bZM(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.om(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ag4(w,v)},
cia(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ag7(u,A.jA(w)?w:null,v)},
aou:function aou(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aov:function aov(){},
FL:function FL(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a0L:function a0L(d){this.a=d},
bS5(d,e,f,g,h,i){return new B.oP(e,f,i,h,d,null)},
bS4(d,e,f,g,h){return new B.y6(e,h,f,g,d,null)},
bWd(d,e,f,g,h,i,j,k,l,m,n){return new B.aaH(g,f,e,i,h,d,m,l,k,j,n,null)},
oP:function oP(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Tm:function Tm(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b99:function b99(d){this.a=d},
b9a:function b9a(d){this.a=d},
b96:function b96(d){this.a=d},
b97:function b97(d){this.a=d},
b93:function b93(d){this.a=d},
b94:function b94(d){this.a=d},
b95:function b95(d){this.a=d},
b90:function b90(d){this.a=d},
b91:function b91(d){this.a=d},
b92:function b92(d){this.a=d},
b98:function b98(d){this.a=d},
S0:function S0(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
y6:function y6(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Tl:function Tl(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b8L:function b8L(d){this.a=d},
b8M:function b8M(d){this.a=d},
b8K:function b8K(){},
b8N:function b8N(d){this.a=d},
b8O:function b8O(d){this.a=d},
b8P:function b8P(d){this.a=d},
b8Q:function b8Q(d){this.a=d},
b8J:function b8J(d,e){this.a=d
this.b=e},
b8R:function b8R(){},
b8S:function b8S(d){this.a=d},
b8U:function b8U(d){this.a=d},
b8V:function b8V(d){this.a=d},
b8W:function b8W(d){this.a=d},
b8X:function b8X(d){this.a=d},
b8Y:function b8Y(d){this.a=d},
b8Z:function b8Z(d){this.a=d},
b8T:function b8T(d){this.a=d},
b8I:function b8I(d,e){this.a=d
this.b=e},
b8H:function b8H(d,e){this.a=d
this.b=e},
b8G:function b8G(d,e){this.a=d
this.b=e},
b9_:function b9_(d){this.a=d},
aaH:function aaH(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wc:function wc(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aNM:function aNM(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aNN:function aNN(d){this.a=d},
aNO:function aNO(d){this.a=d},
aNP:function aNP(d){this.a=d},
a0v:function a0v(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
ark:function ark(d){this.a=d},
arl:function arl(d){this.a=d},
alQ(d){var x=y.U,w=A.H(new A.Z(A.b(d.split(" "),y.s),new B.bIr(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gT(w),0).toUpperCase()
return(J.p(C.b.gT(w),0)+J.p(C.b.gaG(w),0)).toUpperCase()},
bIr:function bIr(){},
aJ4:function aJ4(){},
mw:function mw(d,e,f){this.e=d
this.a=e
this.b=f},
aEv:function aEv(d){this.a=d},
aEw:function aEw(d){this.a=d},
bLT(d){var x=new B.a4d(d)
x.aus(d)
return x},
a4d:function a4d(d){this.d=d},
aEs:function aEs(d){this.a=d},
aEt:function aEt(d){this.a=d},
aEu:function aEu(d){this.a=d},
aEh:function aEh(){},
aEj:function aEj(){},
aEk:function aEk(){},
aEl:function aEl(d){this.a=d},
aEi:function aEi(d){this.a=d},
c9v(d,e){var x=y.N
x=new B.a5P(d,e,A.C(x,y.E),A.C(x,y.z))
x.aux(d,e)
return x},
a5P:function a5P(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aJ7:function aJ7(d){this.a=d},
aJ8:function aJ8(d){this.a=d},
aJ9:function aJ9(d){this.a=d},
aJa:function aJa(d){this.a=d},
aJb:function aJb(d){this.a=d},
aJc:function aJc(d){this.a=d},
aJd:function aJd(d){this.a=d},
aJe:function aJe(d){this.a=d},
aJ5:function aJ5(d){this.a=d},
aJ6:function aJ6(d,e){this.a=d
this.b=e},
bMp:function bMp(d){this.a=d},
ck2(){return C.b.mQ(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bIz())!==-1},
bIz:function bIz(){},
bUr(){var x=A.b([],y.d),w=$.bUs
$.bUs=w+1
return new B.Ox(w,x,D.agz,$.ae())},
Ox:function Ox(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aJk:function aJk(d){this.a=d},
aJg:function aJg(d){this.a=d},
aJh:function aJh(d){this.a=d},
aJi:function aJi(d){this.a=d},
aJj:function aJj(){},
bUt(d,e,f){return new B.Oz(d,f,e,null)},
Oz:function Oz(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
OA:function OA(){this.c=this.a=null},
aJl:function aJl(){},
aJn:function aJn(d){this.a=d},
aJm:function aJm(d){this.a=d},
bSE(d,e,f,g){var x,w={}
w.a=d
x=new B.a2J(g.i("a2J<0>"))
x.auj(e,f,w,g)
return x},
a2J:function a2J(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
ay0:function ay0(d,e){this.a=d
this.b=e},
ay_:function ay_(d){this.a=d},
Ub:function Ub(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bdP:function bdP(){},
a80:function a80(d){this.b=this.a=$
this.$ti=d},
a81:function a81(){},
bKF(d,e){return B.c45(d,e)},
c45(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bKF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nP("ws")&&!d.nP("wss"))throw A.n(A.fm(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xr(r,A.fN(null,null,null,!1,y.D))
u=new A.av($.aH,y.k)
p=new A.b2(u,y.V)
if(J.q(r.readyState,1))p.cN(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.hj(new B.GD("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.ob(r,"open",!1,y.C).gT(0).aC(new B.aqf(p,q),y.H)
t=y.C
s=y.H
new A.ob(r,"error",!1,t).gT(0).aC(new B.aqg(p,q),s)
A.hK(r,"message",new B.aqh(q),!1,y.m)
new A.ob(r,"close",!1,t).gT(0).aC(new B.aqi(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bKF,w)},
xr:function xr(d,e){this.a=d
this.b=e},
aqf:function aqf(d,e){this.a=d
this.b=e},
aqg:function aqg(d,e){this.a=d
this.b=e},
aqh:function aqh(d){this.a=d},
aqi:function aqi(d,e){this.a=d
this.b=e},
bN0(){return new B.GC("Connection Closed")},
rS:function rS(){},
G9:function G9(d){this.a=d},
Cs:function Cs(d){this.a=d},
CQ:function CQ(d,e){this.a=d
this.b=e},
GD:function GD(d){this.a=d},
GC:function GC(d){this.a=d},
c3D(d){var x=null,w=$.aH,v=new B.a80(y.Z),u=y.X,t=A.fN(x,x,x,!0,u),s=A.fN(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bSE(new A.cE(s,r.i("cE<1>")),new A.BF(t,q.i("BF<1>")),!0,u)
v.b=B.bSE(new A.cE(t,q.i("cE<1>")),new A.BF(s,r.i("BF<1>")),!1,u)
v=new B.amL(new A.b2(new A.av(w,y.W),y.R),v)
v.aua(d)
return v},
amL:function amL(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
amP:function amP(d){this.a=d},
amM:function amM(d){this.a=d},
amN:function amN(d){this.a=d},
amO:function amO(d,e){this.a=d
this.b=e},
amQ:function amQ(d){this.a=d},
ajL:function ajL(d,e){this.b=d
this.a=e},
a96:function a96(d){this.a=d},
cjC(d){switch(d){case"new":return D.agm
case"checking":return D.agn
case"connected":return D.agp
case"completed":return D.ago
case"failed":return D.JX
case"disconnected":return D.agr
case"closed":return D.JY
case"count":return D.agq}return D.JY},
cjD(d){switch(d){case"new":return D.JZ
case"gathering":return D.ags
case"complete":return D.agt}return D.JZ},
cl7(d){switch(d){case"stable":return D.agu
case"have-local-offer":return D.agv
case"have-local-pranswer":return D.agx
case"have-remote-offer":return D.agw
case"have-remote-pranswer":return D.agy
case"closed":return D.K4}return D.K4},
ckJ(d){switch(d){case"new":return D.K1
case"connecting":return D.K2
case"connected":return D.K3
case"closed":return D.rz
case"disconnected":return D.K0
case"failed":return D.K_}return D.rz},
vs:function vs(d,e){this.a=d
this.b=e},
Ou:function Ou(d,e){this.a=d
this.b=e},
vr:function vr(d,e){this.a=d
this.b=e},
mI:function mI(d,e){this.a=d
this.b=e},
a5Q:function a5Q(d,e){this.a=d
this.b=e},
aJ3:function aJ3(){},
N4:function N4(){},
En:function En(){},
aEg:function aEg(){},
F0:function F0(d,e,f){this.a=d
this.b=e
this.c=f},
Ov:function Ov(){},
aJf:function aJf(){},
zY:function zY(d,e){this.a=d
this.b=e},
Ow:function Ow(d){this.b=d},
Oy:function Oy(d,e,f){this.a=d
this.b=e
this.c=f},
bLA(d){var x=0,w=A.k(y.y)
var $async$bLA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bLA,w)},
aGY(d){var x=0,w=A.k(y.H),v
var $async$aGY=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aSs("enableSpeakerphone",A.a8(["enable",d],y.N,v),v,v),$async$aGY)
case 2:return A.i(null,w)}})
return A.j($async$aGY,w)},
aSs(d,e,f,g){return B.cc9(d,e,f,g,f.i("0?"))},
cc9(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aSs=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aSr(),$async$aSs)
case 3:v=D.FE.ct(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aSs,w)},
aSr(){var x=0,w=A.k(y.H),v,u
var $async$aSr=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bW4?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.FE.ct("initialize",A.a8(["options",A.C(v,u)],v,u),!1,y.H),$async$aSr)
case 4:$.bW4=!0
case 3:return A.i(null,w)}})
return A.j($async$aSr,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[27]
E=c[19]
B.Da.prototype={
D(d,e){this.a.D(0,e)},
d4(d,e){this.a.d4(d,e)},
a7(d){return this.a.a7(0)},
$idC:1}
B.Q0.prototype={
iH(d){var x=A.cw("subscription"),w=A.fN(new B.aOm(x),null,null,!0,this.$ti.y[1])
x.b=d.eN(new B.aOn(this,w),w.glS(w),w.gnq())
return new A.cE(w,A.u(w).i("cE<1>"))}}
B.aou.prototype={}
B.FL.prototype={}
B.a0L.prototype={}
B.oP.prototype={
M(){return new B.Tm()}}
B.Tm.prototype={
U(){var x=this
x.V()
x.JK()
x.r=A.de(C.c0,new B.b99(x))
x.w=A.kb(C.x4,new B.b9a(x))},
k(){var x=this,w=x.r
if(w!=null)w.Z(0)
w=x.w
if(w!=null)w.Z(0)
w=x.x
if(w!=null)w.Z(0)
x.a4()},
We(){var x=this.x
if(x!=null)x.Z(0)
this.x=A.de(C.fQ,new B.b96(this))},
Ne(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Ne=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.A7(p.c),$async$Ne)
case 7:r=e
q=B.a_h(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b97(s))
p=s.r
if(p!=null)p.Z(0)
p=s.w
if(p!=null)p.Z(0)
s.We()}u=2
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
return A.j($async$Ne,w)},
JK(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$JK=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.A7(o.c),$async$JK)
case 7:r=e
q=B.a_h(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gajt()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b93(s))
s.We()
x=1
break}s.n(new B.b94(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b95(s))
s.We()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$JK,w)},
JA(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$JA=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b90(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.ZU(q.c,"accepte"),$async$JA)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b91(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.B(A.A(null,null,null,null,null,C.f,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
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
A.aa(q,!1).wR(A.dY(new B.b92(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$JA,w)},
Eh(d){return this.aOH(d)},
aOG(){return this.Eh(!1)},
aOH(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Eh=A.f(function(e,f){if(e===1){t=f
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
return A.e(q.ZU(r.c,"refuse"),$async$Eh)
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
if(r!=null)A.aa(r,!1).bC()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Eh,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.kr(C.o,s,A.c(B.alQ(r.d),s,s,s,s,D.Mj,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.M5,C.X,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.at,new A.a_(D.xq,x,s),C.k,A.c(q,s,s,s,s,D.tE,s,s,s),D.Lv],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b98(t)
v=A.a("Accepter")
u=t.f?s:t.gavb()
q.push(A.Y(A.b([new B.S0(D.yb,C.aD,r,x,s),D.ak0,new B.S0(D.ya,C.cu,v,u,s)],w),C.p,C.bs,C.i,s))}if(t.d)q.push(C.vM)
return A.ex(s,C.n,A.ft(!0,A.cF(A.I(q,C.p,C.e,C.T),s,s),!0,C.ai,!0,!0),s,s)}}
B.S0.prototype={
C(d){var x=this,w=null,v=A.dh(x.d,w,w,C.ai,C.cg,w)
return A.I(A.b([A.ab(A.b5(!1,A.c7(x.c,C.l,w,32),C.j,w,C.r,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e7,w,w,w)],y.p),C.p,C.e,C.T)}}
B.y6.prototype={
M(){return new B.Tl(A.b_(y.N),C.U)}}
B.Tl.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bUr()
w=B.bUr()
v.d!==$&&A.bi()
v.d=new B.aNM(x,w)
v.a.toString
x=new B.a0v(new A.et(u,u,y.g),new A.et(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.uU()},
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
w.wB()
w=x.e
w===$&&A.d()
w.G3()
x.a4()},
uU(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$uU=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a7()
x=7
return A.e(l.A7(m.c),$async$uU)
case 7:r=e
q=B.a_h(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mq(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.OM(),$async$uU)
case 8:p=e
o=B.c4N(p)
x=9
return A.e(s.Td(),$async$uU)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.A(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mq(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.u1(A.a8(["iceServers",o.a],y.N,y.z),k==="video"),$async$uU)
case 10:m.f=new B.b8L(s)
m.r=new B.b8M(s)
m.w=new B.b8N(s)
if(s.c==null){x=1
break}s.n(new B.b8O(s))
s.ch=A.de(C.c0,new B.b8P(s))
s.CW=A.kb(C.cK,new B.b8Q(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cO(k,A.u(k).i("cO<1>")).cY(s.gaTx())
k=m.w
s.cy=new A.cO(k,A.u(k).i("cO<1>")).cY(new B.b8R())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.NX(C.c.R_("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f2(C.c9,n,C.aj,!0))}s.ay=A.kb(C.fQ,new B.b8S(s))
s.DI()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.A(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mq(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uU,w)},
Td(){var x=0,w=A.k(y.y),v
var $async$Td=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Td,w)},
DI(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$DI=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.bX("/messagerie/appels/"+p.c+"/signaux"),$async$DI)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gK(p)
s.adF(B.bUZ(q))}u=2
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
return A.j($async$DI,w)},
adF(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bZM(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.zC(A.a8(["sdp",v.a,"type",v.b],y.N,y.z)).aC(new B.b8U(s),y.a).fN(new B.b8V(s))
break
case"reponse":if(!s.a.f)return
u=B.bZM(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.ND(A.a8(["sdp",u.a,"type",u.b],y.N,y.z)).aC(new B.b8W(s),y.a).fN(new B.b8X(s))
break
case"candidat_ice":t=B.cia(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.Ny(A.a8(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.FY().aC(new B.b8Y(s),y.a).fN(new B.b8Z(s))
break
case"refuse":s.mq(A.a("Appel refus\xe9"))
break
case"annule":s.mq(A.a("Appel annul\xe9"))
break
case"termine":s.mq(A.a("Appel termin\xe9"))
break}},
aaO(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.Z(0)
w.n(new B.b8T(w))},
y7(d,e,f){return this.aBT(d,e,f)},
a7e(d,e){return this.y7(d,e,!0)},
aBT(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$y7=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.ahx(s.c,e,d),$async$y7)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$y7,w)},
Ed(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Ed=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.Z(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.ZU(r.c,"termine"),$async$Ed)
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
if(r!=null)A.aa(r,!1).bC()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ed,w)},
mq(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.Z(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.A(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.aa(x,!1).bC()},
JS(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JS=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.Sd(u),$async$JS)
case 2:if(v.c!=null)v.n(new B.b8I(v,u))
return A.i(null,w)}})
return A.j($async$JS,w)},
JR(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.IQ(u),$async$JR)
case 2:if(v.c!=null)v.n(new B.b8H(v,u))
return A.i(null,w)}})
return A.j($async$JR,w)},
JP(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JP=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Sa(u),$async$JP)
case 2:if(v.c!=null)v.n(new B.b8G(v,u))
return A.i(null,w)}})
return A.j($async$JP,w)},
JQ(){var x=0,w=A.k(y.H),v=this,u
var $async$JQ=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.NG(),$async$JQ)
case 2:return A.i(null,w)}})
return A.j($async$JQ,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bUt(o.e,!1,D.K6)
else{x=A.kr(C.o,q,A.c(B.alQ(w.e),q,q,q,q,D.aos,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.amM,q,q,q)
x=A.cF(A.I(A.b([x,C.q,w,C.k,A.c(r.w?B.bHy(r.ax):A.a(p),q,q,q,q,D.tE,q,q,q)],y.p),C.p,C.e,C.T),q,q)}x=A.Oe(0,x)
o=A.i1(q,A.f6(A.Q(12),B.bUt(o.d,!0,D.K6),C.aq),160,q,q,16,16,110)
w=r.w
v=B.bHy(r.ax)
u=r.z
t=r.Q
u=A.f_(C.bb,A.b([x,o,A.i1(24,B.bWd(r.as,v,w,!0,t,u,r.ga4T(),r.ga4S(),r.ga4U(),r.ga4V(),r.gab4()),q,q,0,0,q,q)],y.p),C.f,C.b9,q)
o=u}else{o=A.kr(C.o,q,A.c(B.alQ(w.e),q,q,q,q,D.Mj,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.M5,C.X,q,q)
if(r.w)w=B.bHy(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.tE,q,q,q)
v=r.w
u=B.bHy(r.ax)
t=r.z
s=r.Q
t=A.cF(A.I(A.b([o,C.at,new A.a_(D.xq,x,q),C.k,w,D.Lv,B.bWd(r.as,u,v,!1,s,t,r.ga4T(),r.ga4S(),r.ga4U(),r.ga4V(),r.gab4())],y.p),C.p,C.e,C.T),q,q)
o=t}return A.bMj(!1,A.ex(q,C.n,A.ft(!0,o,!0,C.ai,!0,!0),q,q),new B.b9_(r),y.K)}}
B.aaH.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Mc,u,u,u))
if(r&&v.c)s.push(C.q)
r=v.f
x=r?D.Yv:D.Yu
t=A.b([new B.wc(x,r,A.a("Muet"),v.x,u,u),D.nK,new B.wc(D.YB,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nK)
if(r){x=v.w
w=x?D.yd:D.YA
t.push(new B.wc(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nK)
if(r)t.push(new B.wc(D.Yz,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nK)
t.push(new B.wc(D.yb,!1,A.a("Raccrocher"),v.as,C.aD,u))
s.push(A.Y(t,C.p,C.bs,C.i,u))
return A.I(s,C.p,C.e,C.T)}}
B.wc.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.lo
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.dh(u,v,v,C.ai,C.cg,v)
return A.I(A.b([A.ab(A.b5(!1,A.c7(w.c,x,v,26),C.j,v,C.r,v,v,v,v,w.f,v,t),56,56),C.b1,A.c(w.e,v,v,v,v,C.anw,v,v,v)],y.p),C.p,C.e,C.T)}}
B.aNM.prototype={
u1(d,e){return this.b5I(d,e)},
b5I(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$u1=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.ij(0),$async$u1)
case 2:x=3
return A.e(v.e.ij(0),$async$u1)
case 3:u=$.c0s()
if(e){t=y.N
t=A.a8(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aEh().BT(0,A.a8(["audio",!0,"video",t],s,r)),$async$u1)
case 4:q=v.b=g
o.sa33(0,q)
x=5
return A.e(u.Z8(d,A.C(s,r)),$async$u1)
case 5:p=v.a=g
x=6
return A.e(p.kh(0,q),$async$u1)
case 6:p.e=new B.aNN(v)
p.Q=new B.aNO(v)
p.d=new B.aNP(v)
return A.i(null,w)}})
return A.j($async$u1,w)},
aAk(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa33(0,d)
x=w.r
if(x!=null)x.$0()}},
FY(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$FY=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.O8(0),$async$FY)
case 3:t=e
x=4
return A.e(s.C7(0,t),$async$FY)
case 4:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$FY,w)},
zC(d){return this.aYA(d)},
aYA(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$zC=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.C9(0,new B.zY(d.h(0,"sdp"),d.h(0,"type"))),$async$zC)
case 3:x=4
return A.e(s.O6(0),$async$zC)
case 4:t=f
x=5
return A.e(s.C7(0,t),$async$zC)
case 5:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$zC,w)},
ND(d){return this.aVM(d)},
aVM(d){var x=0,w=A.k(y.H),v=this,u
var $async$ND=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.C9(0,new B.zY(d.h(0,"sdp"),d.h(0,"type"))),$async$ND)
case 2:return A.i(null,w)}})
return A.j($async$ND,w)},
Ny(d){return this.aVy(d)},
aVy(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Ny=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.No(new B.F0(A.aR(d.h(0,"candidate")),A.aR(d.h(0,"sdpMid")),A.e9(d.h(0,"sdpMLineIndex")))),$async$Ny)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Ny,w)},
Sd(d){return this.ao7(d)},
ao7(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Sd=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.RL(0)
if(r==null)r=C.dl
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.J)(r),++s)r[s].skl(0,t)
return A.i(null,w)}})
return A.j($async$Sd,w)},
IQ(d){return this.anZ(d)},
anZ(d){var x=0,w=A.k(y.H)
var $async$IQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGY(d),$async$IQ)
case 2:return A.i(null,w)}})
return A.j($async$IQ,w)},
Sa(d){return this.anR(d)},
anR(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Sa=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Iz(0)
if(s==null)s=C.dl
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.J)(s),++t)s[t].skl(0,d)
return A.i(null,w)}})
return A.j($async$Sa,w)},
NG(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$NG=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Iz(0)
if(s==null)s=D.a97
if(s.length===0){x=1
break}x=3
return A.e(B.bLA(C.b.gT(s)),$async$NG)
case 3:case 1:return A.i(v,w)}})
return A.j($async$NG,w)},
wB(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$wB=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a7(0)
x=7
return A.e(y.x.b(q)?q:A.dJ(q,y.H),$async$wB)
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
else{o=A.H(q.RL(0),!0,y.G)
C.b.t(o,q.Iz(0))
q=o}if(q==null)q=C.dl
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c3x(r)
if(!m.b(k)){j=new A.av($.aH,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$wB)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.J)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.e(s.d.k(),$async$wB)
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
return A.e(s.e.k(),$async$wB)
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
return A.j($async$wB,w)}}
B.a0v.prototype={
NX(d){return this.aX1(d)},
aX1(d){var x=0,w=A.k(y.H),v=this
var $async$NX=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.CC(),$async$NX)
case 2:return A.i(null,w)}})
return A.j($async$NX,w)},
CC(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$CC=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c3D(B.bKF(A.cD(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$CC)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cE(p,A.u(p).i("cE<1>")).aT(s.gaOr(),!0,s.gaNz(),new B.ark(s))
u=2
x=6
break
case 4:u=3
n=t
s.W5()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$CC,w)},
aOs(d){var x,w,v,u
try{x=C.Y.cO(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bUZ(w))}catch(u){}},
W5(){var x,w=this,v=w.c
if(v!=null)v.Z(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a5r[v]
w.f=v+1
v=w.d
if(v!=null)v.Z(0)
w.d=A.de(A.dq(0,0,0,0,x),new B.arl(w))},
G3(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$G3=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Z(0)
s=t.c
s=s==null?null:s.Z(0)
x=2
return A.e(y.x.b(s)?s:A.dJ(s,y.H),$async$G3)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.aV()
r=s.w=new B.ajL(s,q)}s=r.a7(0)}x=7
return A.e(y._.b(s)?s:A.dJ(s,y.z),$async$G3)
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
return A.j($async$G3,w)}}
B.aJ4.prototype={
Z8(d,e){return this.aYr(d,e)},
aYr(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$Z8=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a8(["mandatory",A.C(r,r),"optional",A.b([A.a8(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fq(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bR(t)))
t=J.l(s)
v=B.c9v(C.d_.gl3().bv(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Z8,w)}}
B.mw.prototype={
RL(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dg(w,A.W(w).i("dg<1,aA>"))
J.h4(w,new B.aEv(x))
return x},
Iz(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dg(w,A.W(w).i("dg<1,aA>"))
J.h4(w,new B.aEw(x))
return x}}
B.a4d.prototype={
aus(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aEs(x)))
w.addEventListener("mute",A.bV(new B.aEt(x)))
w.addEventListener("unmute",A.bV(new B.aEu(x)))},
skl(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aEh.prototype={
BT(d,e){return this.an_(0,e)},
an_(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$BT=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.ck2())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iy(e.h(0,"video"),"facingMode")
e.cn(0,"video",new B.aEj())
e.cn(0,"audio",new B.aEk())}catch(a0){A.nb("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hX(e.h(0,"audio"),i,i).aQ(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h4(s,new B.aEl(r))
J.iy(e.h(0,"audio"),"optional")
J.j2(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.bf(a0)
A.nb("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bR(e)
x=10
return A.e(A.eC(o.getUserMedia(h.a(n)),h),$async$BT)
case 10:m=a2
i=m
h=i.id
v=new B.mw(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eC(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$BT)
case 11:l=a2
h=l
g=h.id
v=new B.mw(h,g,"local")
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
return A.j($async$BT,w)}}
B.a5P.prototype={
aux(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aJ7(x)))
w.addEventListener("icecandidate",A.bV(new B.aJ8(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aJ9(x)))
w.onicegatheringstatechange=A.bV(new B.aJa(x))
w.addEventListener("signalingstatechange",A.bV(new B.aJb(x)))
if(!$.bOV())w.addEventListener("connectionstatechange",A.bV(new B.aJc(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aJd(x)))
w.addEventListener("track",A.bV(new B.aJe(x)))},
O8(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$O8=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eC(s.createOffer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$O8)
case 3:t=f
v=new B.zY(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$O8,w)},
O6(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$O6=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eC(s.createAnswer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$O6)
case 3:t=f
v=new B.zY(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$O6,w)},
kh(d,e){var x
this.ax.cn(0,e.a,new B.aJ6(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cJ(null,y.H)},
C7(d,e){return this.ao2(0,e)},
ao2(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$C7=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eC(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$C7)
case 2:return A.i(null,w)}})
return A.j($async$C7,w)},
C9(d,e){return this.aoi(0,e)},
aoi(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$C9=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eC(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$C9)
case 2:return A.i(null,w)}})
return A.j($async$C9,w)},
No(d){return this.aVf(d)},
aVf(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$No=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eC(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$No)
case 2:return A.i(null,w)}})
return A.j($async$No,w)},
a7(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a7=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cJ(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a7,w)}}
B.bMp.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.Ox.prototype={
sajG(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Gt()
if(x!=null)x.style.objectFit=e},
adO(){var x=this,w=x.Gt(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.agA(u,x.z!=null,0,t))},
sa33(d,e){var x,w,v,u,t=this
t.z=e
if(e.Iz(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.RL(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aBH()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Gt()
if(u!=null){u.srcObject=t.x
x=t.Gt()
x.toString
t.a4I(x)}t.sl(0,t.a.aXp(t.z!=null))},
aBH(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Gt(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.J)(t),++r)t[r].Z(0)
q=u.Gt()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eh()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
ij(d){var x=0,w=A.k(y.H),v=this
var $async$ij=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.IX()
$.q9().u6("RTCVideoRenderer-"+v.Q,new B.aJk(v),!0)
return A.i(null,w)}})
return A.j($async$ij,w)},
a4I(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Oz.prototype={
M(){return new B.OA()}}
B.OA.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a6(0,v.gaLL())
x=v.a
w=x.c
w.as=x.e
w.sajG(0,x.d===D.K5?"contain":"cover")},
aLM(){if(this.c!=null)this.n(new B.aJl())},
k(){if(this.c!=null)this.a4()},
aR(d){var x,w
this.b6(d)
A.de(A.dq(0,0,10,0,0),new B.aJn(this))
x=this.a
w=x.c
w.sajG(0,x.d===D.K5?"contain":"cover")},
C(d){return new A.kJ(new B.aJm(this),null)}}
B.a2J.prototype={
auj(d,e,f,g){var x=this,w=$.aH
x.a!==$&&A.bi()
x.a=new B.Ub(d,x,new A.b2(new A.av(w,y.c),y.r),e,g.i("Ub<0>"))
if(f.a.ghU())f.a=new B.Q0(g.i("@<0>").bW(g).i("Q0<1,2>")).iH(f.a)
w=A.fN(null,new B.ay0(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
aar(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Z(0)
w=this.b
w===$&&A.d()
w.a7(0)}}
B.Ub.prototype={
D(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d4(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aE3(d,e)},
jJ(d){return this.d4(d,null)},
aE3(d,e){var x=this
if(x.w){x.a.a.d4(d,e)
return}x.c.fi(d,e)
x.aas()
x.b.aar()
x.a.a.a7(0).fN(new B.bdP())},
a7(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aar()
x.c.cN(0,x.a.a.a7(0))}return x.c.a},
aas(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dG(0)
return},
$idC:1}
B.a80.prototype={}
B.a81.prototype={}
B.xr.prototype={
a5Q(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.CQ(d,e))
x.a7(0)},
a2E(d){var x
if((this.b.b&4)!==0)throw A.n(B.bN0())
x=A.bR(d)
x.toString
this.a.send(x)},
vI(d,e,f){return this.aWN(0,e,f)},
aWN(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vI=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bN0())
u.a7(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vI,w)},
$ibN_:1}
B.rS.prototype={}
B.G9.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.G9&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.Cs.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Cs&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fK(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.CQ.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.CQ&&e.a===this.a&&e.b===this.b},
gH(d){return A.fK([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.GD.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibN:1}
B.GC.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.amL.prototype={
aua(d){d.ez(new B.amP(this),new B.amQ(this),y.a)}}
B.ajL.prototype={
a7(d){var x=this.b
x.e=x.d=null
return this.apT(0)}}
B.a96.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibN:1}
B.vs.prototype={
N(){return"RTCSignalingState."+this.b}}
B.Ou.prototype={
N(){return"RTCIceGatheringState."+this.b}}
B.vr.prototype={
N(){return"RTCPeerConnectionState."+this.b}}
B.mI.prototype={
N(){return"RTCIceConnectionState."+this.b}}
B.a5Q.prototype={
N(){return"RTCVideoViewObjectFit."+this.b}}
B.aJ3.prototype={}
B.N4.prototype={}
B.En.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aEg.prototype={}
B.F0.prototype={}
B.Ov.prototype={}
B.aJf.prototype={}
B.zY.prototype={}
B.Ow.prototype={}
B.Oy.prototype={
agA(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Oy(x,w,v)},
aXp(d){return this.agA(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","y6(F)","~(FL)","bo(F0)","bo(Ow)","bo(mI)","~(@)","mw(@)","mw()","bo(bN_)","~(rS)"])
B.aOm.prototype={
$0(){return J.c2V(this.a.bk())},
$S:1}
B.aOn.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bf(v)
this.b.d4(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aov.prototype={
$1(d){if(d==null)return null
return A.c1(J.l(d))},
$S:159}
B.b99.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.Eh(!0)},
$S:0}
B.b9a.prototype={
$1(d){return this.a.Ne()},
$S:40}
B.b96.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bC()},
$S:0}
B.b97.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b93.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b94.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b95.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b90.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b91.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b92.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bS4(x.w,w,u,!1,v)},
$S:z+2}
B.b98.prototype={
$0(){return this.a.aOG()},
$S:0}
B.b8L.prototype={
$1(d){this.a.y7("candidat_ice",d,!1)},
$S:269}
B.b8M.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b8K())},
$S:0}
B.b8K.prototype={
$0(){},
$S:0}
B.b8N.prototype={
$0(){this.a.mq(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b8O.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b8P.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.y7("annule",C.e0,!1)
x.mq(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b8Q.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b8J(x,w))},
$S:40}
B.b8J.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eG(this.b)},
$S:0}
B.b8R.prototype={
$1(d){},
$S:147}
B.b8S.prototype={
$1(d){this.a.DI()},
$S:40}
B.b8U.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.aaO()
x.a7e("reponse",d)},
$S:267}
B.b8V.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b8W.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.aaO()},
$S:27}
B.b8X.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b8Y.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a7e("offre",d)},
$S:267}
B.b8Z.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b8T.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.U},
$S:0}
B.b8I.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b8H.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b8G.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b9_.prototype={
$2(d,e){if(!d)this.a.Ed()},
$S:942}
B.aNN.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a8(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aNO.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gT(x):null
if(w!=null)this.a.aAk(w)},
$S:z+5}
B.aNP.prototype={
$1(d){var x
if(d===D.JX){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.ark.prototype={
$1(d){return this.a.W5()},
$S:21}
B.arl.prototype={
$0(){var x=this.a
if(!x.e)x.CC()},
$S:0}
B.bIr.prototype={
$1(d){return d.length!==0},
$S:12}
B.aEv.prototype={
$1(d){return this.a.push(B.bLT(d))},
$S:21}
B.aEw.prototype={
$1(d){return this.a.push(B.bLT(d))},
$S:21}
B.aEs.prototype={
$1(d){},
$S:22}
B.aEt.prototype={
$1(d){},
$S:22}
B.aEu.prototype={
$1(d){},
$S:22}
B.aEj.prototype={
$0(){return!1},
$S:48}
B.aEk.prototype={
$0(){return!1},
$S:48}
B.aEl.prototype={
$1(d){J.h4(d,new B.aEi(this.a))},
$S:269}
B.aEi.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:47}
B.aJ7.prototype={
$1(d){},
$S:22}
B.aJ8.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.F0(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aJ9.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cjC(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bOV())switch(w.cx.a){case 0:w.cy=D.K1
break
case 1:w.cy=D.K2
break
case 3:w.cy=D.K3
break
case 5:w.cy=D.K_
break
case 6:w.cy=D.K0
break
case 7:w.cy=D.rz
break
default:break}},
$S:39}
B.aJa.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cjD(w.iceGatheringState)},
$S:39}
B.aJb.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cl7(w.signalingState)},
$S:39}
B.aJc.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.ckJ(w.connectionState)},
$S:39}
B.aJd.prototype={
$1(d){},
$S:39}
B.aJe.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bLT(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>"))
w=J.eT(x,new B.aJ5(w),y.h)
v.$1(new B.Ow(A.H(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aJ5.prototype={
$1(d){return new B.mw(d,d.id,this.a.as)},
$S:z+8}
B.aJ6.prototype={
$0(){var x=this.b.e
return new B.mw(x,x.id,this.a.as)},
$S:z+9}
B.bIz.prototype={
$1(d){return J.fP(self.window.navigator.userAgent,A.bJ(d,!1,!1))},
$S:12}
B.aJk.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.J)(w),++u)w[u].Z(0)
C.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a4I(t)
v=y.i.c
w.push(A.hK(t,"canplay",new B.aJg(x),!1,v))
w.push(A.hK(t,"resize",new B.aJh(x),!1,v))
w.push(A.hK(t,"error",new B.aJi(t),!1,v))
w.push(A.hK(t,"ended",new B.aJj(),!1,v))
return t},
$S:210}
B.aJg.prototype={
$1(d){this.a.adO()},
$S:21}
B.aJh.prototype={
$1(d){this.a.adO()},
$S:21}
B.aJi.prototype={
$1(d){var x,w,v=this.a.error
A.nb("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Fs.h(0,A.am(v,"code"))
x.toString
w=!J.q(A.am(v,"message"),"")?A.am(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pg(x,C.Fr.h(0,A.am(v,"code")),w,null))},
$S:38}
B.aJj.prototype={
$1(d){},
$S:21}
B.aJl.prototype={
$0(){},
$S:0}
B.aJn.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aJm.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a2Z("RTCVideoRenderer-"+w.Q)
else w=A.T(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cF(A.T(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:943}
B.ay0.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eN(w.ghB(w),new B.ay_(v),w.gnq())},
$S:0}
B.ay_.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aas()
x=x.b
x===$&&A.d()
x.a7(0)},
$S:0}
B.bdP.prototype={
$1(d){},
$S:17}
B.aqf.prototype={
$1(d){this.a.cN(0,this.b)},
$S:22}
B.aqg.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hj(new B.GD("Failed to connect WebSocket"))
else this.b.a5Q(1006,"error")},
$S:22}
B.aqh.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cw("data")
if(typeof x==="string")w.b=new B.G9(A.bC(x))
else if(typeof x==="object"&&A.c7A(y.m.a(x),"ArrayBuffer"))w.b=new B.Cs(A.a4z(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.az(x).j(0)))
v.D(0,w.bk())},
$S:38}
B.aqi.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cN(0,this.b)
this.b.a5Q(d.code,d.reason)},
$S:22}
B.amP.prototype={
$1(d){var x=d.b,w=this.a
new A.cE(x,A.u(x).i("cE<1>")).cY(new B.amM(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cE(x,A.u(x).i("cE<1>")).b2U(new B.amN(d),new B.amO(w,d))
w.f.dG(0)},
$S:z+10}
B.amM.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.G9
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.Cs
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.CQ){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a7(0)}}},
$S:z+11}
B.amN.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bN0())
s=A.bR(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a2E(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a2E(new Uint8Array(A.d1(u)))
break $label1$1}t=A.aM("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.GC))throw r}},
$S:18}
B.amO.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.vI(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.O(q) instanceof B.GC))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.amQ.prototype={
$1(d){var x,w=d instanceof A.R_?d:new B.a96(J.l(d)),v=this.a
v.f.hj(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.jJ(w)
v=v.a
v===$&&A.d()
v.a7(0)},
$S:39};(function aliases(){var x=B.Da.prototype
x.apT=x.a7})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Tm.prototype,"gavb","JA",0)
var v
w(v=B.Tl.prototype,"gaTx","adF",3)
x(v,"gab4","Ed",0)
x(v,"ga4V","JS",0)
x(v,"ga4U","JR",0)
x(v,"ga4S","JP",0)
x(v,"ga4T","JQ",0)
w(v=B.a0v.prototype,"gaOr","aOs",7)
x(v,"gaNz","W5",1)
x(B.Ox.prototype,"gdI","k",0)
x(B.OA.prototype,"gaLL","aLM",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a2,[B.Da,B.aou,B.FL,B.a0L,B.aNM,B.a0v,B.aJ3,B.N4,B.En,B.aEg,B.Ov,B.aJf,B.a81,B.Ub,B.a80,B.xr,B.rS,B.GD,B.a96,B.F0,B.zY,B.Ow,B.Oy])
w(B.Q0,A.fi)
x(A.jI,[B.aOm,B.b99,B.b96,B.b97,B.b93,B.b94,B.b95,B.b90,B.b91,B.b98,B.b8M,B.b8K,B.b8N,B.b8O,B.b8P,B.b8J,B.b8T,B.b8I,B.b8H,B.b8G,B.arl,B.aEj,B.aEk,B.aJ6,B.aJl,B.aJn,B.ay0,B.ay_,B.amO])
x(A.ii,[B.aOn,B.aov,B.b9a,B.b92,B.b8L,B.b8Q,B.b8R,B.b8S,B.b8U,B.b8V,B.b8W,B.b8X,B.b8Y,B.b8Z,B.aNN,B.aNO,B.aNP,B.ark,B.bIr,B.aEv,B.aEw,B.aEs,B.aEt,B.aEu,B.aEl,B.aJ7,B.aJ8,B.aJ9,B.aJa,B.aJb,B.aJc,B.aJd,B.aJe,B.aJ5,B.bIz,B.aJk,B.aJg,B.aJh,B.aJi,B.aJj,B.bdP,B.aqf,B.aqg,B.aqh,B.aqi,B.amP,B.amM,B.amN,B.amQ])
x(A.M,[B.oP,B.y6,B.Oz])
x(A.P,[B.Tm,B.Tl,B.OA])
x(A.at,[B.S0,B.aaH,B.wc])
x(A.qo,[B.b9_,B.aEi,B.aJm])
w(B.aJ4,B.aJ3)
w(B.mw,B.N4)
w(B.a4d,B.En)
w(B.aEh,B.aEg)
w(B.a5P,B.Ov)
w(B.bMp,B.aJf)
w(B.Ox,A.d4)
x(B.a81,[B.a2J,B.amL])
x(B.rS,[B.G9,B.Cs,B.CQ])
w(B.GC,B.GD)
w(B.ajL,B.Da)
x(A.H7,[B.vs,B.Ou,B.vr,B.mI,B.a5Q])})()
A.oh(b.typeUniverse,JSON.parse('{"Da":{"dC":["1"]},"Q0":{"fi":["1","2"],"fi.S":"1","fi.T":"2"},"y6":{"M":[],"m":[]},"oP":{"M":[],"m":[]},"Tm":{"P":["oP"]},"S0":{"at":[],"m":[]},"Tl":{"P":["y6"]},"aaH":{"at":[],"m":[]},"wc":{"at":[],"m":[]},"mw":{"N4":[]},"a4d":{"En":[]},"a5P":{"Ov":[]},"Ox":{"d4":["Oy"],"aX":[]},"Oz":{"M":[],"m":[]},"OA":{"P":["Oz"]},"Ub":{"dC":["1"]},"xr":{"bN_":[]},"G9":{"rS":[]},"Cs":{"rS":[]},"CQ":{"rS":[]},"GD":{"bN":[]},"GC":{"bN":[]},"ajL":{"dC":["@"]},"a96":{"bN":[]}}'))
A.bNs(b.typeUniverse,JSON.parse('{"Da":1,"a81":1}'))
var y=(function rtii(){var x=A.ax
return{b:x("xr"),L:x("bN"),_:x("as<@>"),x:x("as<~>"),S:x("E<af<o,K>>"),t:x("E<af<o,@>>"),Q:x("E<En>"),d:x("E<ip<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aA"),l:x("L<aA>"),F:x("L<af<o,@>>"),j:x("L<@>"),I:x("L<w>"),P:x("af<o,@>"),f:x("af<@,@>"),E:x("N4"),G:x("En"),h:x("mw"),o:x("pc"),a:x("bo"),K:x("a2"),J:x("Ov"),v:x("zY"),Z:x("a80<a2?>"),N:x("o"),e:x("pH"),M:x("e8"),D:x("rS"),U:x("Z<o>"),g:x("et<FL>"),n:x("et<~>"),V:x("b2<xr>"),r:x("b2<@>"),R:x("b2<~>"),i:x("Tw<aA>"),C:x("ob<aA>"),k:x("av<xr>"),c:x("av<@>"),W:x("av<~>"),q:x("kj"),y:x("K"),z:x("@"),A:x("aA?"),X:x("a2?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.T7=new B.a0L(C.jW)
D.xq=new A.ao(32,0,32,0)
D.ya=new A.al(57638,!1)
D.yb=new A.al(57639,!1)
D.Yu=new A.al(58337,!1)
D.Yv=new A.al(58341,!1)
D.Yz=new A.al(58923,!1)
D.yd=new A.al(59048,!1)
D.YA=new A.al(59049,!1)
D.YB=new A.al(59077,!1)
D.a5r=A.b(x([1,2,4,8,16]),A.ax("E<w>"))
D.a97=A.b(x([]),y.Q)
D.FE=new A.fI("FlutterWebRTC.Method",C.bd,null)
D.agm=new B.mI(0,"RTCIceConnectionStateNew")
D.agn=new B.mI(1,"RTCIceConnectionStateChecking")
D.ago=new B.mI(2,"RTCIceConnectionStateCompleted")
D.agp=new B.mI(3,"RTCIceConnectionStateConnected")
D.agq=new B.mI(4,"RTCIceConnectionStateCount")
D.JX=new B.mI(5,"RTCIceConnectionStateFailed")
D.agr=new B.mI(6,"RTCIceConnectionStateDisconnected")
D.JY=new B.mI(7,"RTCIceConnectionStateClosed")
D.JZ=new B.Ou(0,"RTCIceGatheringStateNew")
D.ags=new B.Ou(1,"RTCIceGatheringStateGathering")
D.agt=new B.Ou(2,"RTCIceGatheringStateComplete")
D.rz=new B.vr(0,"RTCPeerConnectionStateClosed")
D.K_=new B.vr(1,"RTCPeerConnectionStateFailed")
D.K0=new B.vr(2,"RTCPeerConnectionStateDisconnected")
D.K1=new B.vr(3,"RTCPeerConnectionStateNew")
D.K2=new B.vr(4,"RTCPeerConnectionStateConnecting")
D.K3=new B.vr(5,"RTCPeerConnectionStateConnected")
D.agu=new B.vs(0,"RTCSignalingStateStable")
D.agv=new B.vs(1,"RTCSignalingStateHaveLocalOffer")
D.agw=new B.vs(2,"RTCSignalingStateHaveRemoteOffer")
D.agx=new B.vs(3,"RTCSignalingStateHaveLocalPrAnswer")
D.agy=new B.vs(4,"RTCSignalingStateHaveRemotePrAnswer")
D.K4=new B.vs(5,"RTCSignalingStateClosed")
D.agz=new B.Oy(0,0,0)
D.K5=new B.a5Q(0,"RTCVideoViewObjectFitContain")
D.K6=new B.a5Q(1,"RTCVideoViewObjectFitCover")
D.nK=new A.cd(20,null,null,null)
D.ak0=new A.cd(48,null,null,null)
D.Lv=new A.cd(null,64,null,null)
D.amM=new A.y(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.M5=new A.y(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.tE=new A.y(!0,C.ad,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aos=new A.y(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Mj=new A.y(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bW4=!1
$.bUs=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cot","c0s",()=>new B.aJ4())
x($,"cmA","bOV",()=>C.c.q(A.am(A.am(A.am(A.bOB(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"rBJb8jeeexZ1rbF6SuCzmIgbv7A=");