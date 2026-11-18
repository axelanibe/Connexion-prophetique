((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={D7:function D7(){},PX:function PX(d){this.$ti=d},aOh:function aOh(d){this.a=d},aOi:function aOi(d,e){this.a=d
this.b=e},
a_c(d){var x,w,v,u,t,s=new B.aop(),r=J.N(d),q=r.h(d,"id")
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
return new B.aoo(q,x,w,v,u,t)},
bUL(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.m5(t,y.N,y.z):C.e0
if(u.h(d,"cree_le")!=null)A.c1(J.l(u.h(d,"cree_le")))
return new B.FI(s,x,w,v)},
c4x(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.T_
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.m5(s,u,t))}return new B.a0G(x)},
bHk(d){var x=C.h.b3(d.a,1e6)
return C.c.b_(C.h.j(C.h.b3(x,60)),2,"0")+":"+C.c.b_(C.h.j(C.h.aO(x,60)),2,"0")},
bZy(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.om(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ag_(w,v)},
chV(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ag2(u,A.jA(w)?w:null,v)},
aoo:function aoo(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aop:function aop(){},
FI:function FI(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a0G:function a0G(d){this.a=d},
bRS(d,e,f,g,h,i){return new B.oP(e,f,i,h,d,null)},
bRR(d,e,f,g,h){return new B.y6(e,h,f,g,d,null)},
bW_(d,e,f,g,h,i,j,k,l,m,n){return new B.aaC(g,f,e,i,h,d,m,l,k,j,n,null)},
oP:function oP(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Ti:function Ti(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b91:function b91(d){this.a=d},
b92:function b92(d){this.a=d},
b8Z:function b8Z(d){this.a=d},
b9_:function b9_(d){this.a=d},
b8W:function b8W(d){this.a=d},
b8X:function b8X(d){this.a=d},
b8Y:function b8Y(d){this.a=d},
b8T:function b8T(d){this.a=d},
b8U:function b8U(d){this.a=d},
b8V:function b8V(d){this.a=d},
b90:function b90(d){this.a=d},
RX:function RX(d,e,f,g,h){var _=this
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
Th:function Th(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b8D:function b8D(d){this.a=d},
b8E:function b8E(d){this.a=d},
b8C:function b8C(){},
b8F:function b8F(d){this.a=d},
b8G:function b8G(d){this.a=d},
b8H:function b8H(d){this.a=d},
b8I:function b8I(d){this.a=d},
b8B:function b8B(d,e){this.a=d
this.b=e},
b8J:function b8J(){},
b8K:function b8K(d){this.a=d},
b8M:function b8M(d){this.a=d},
b8N:function b8N(d){this.a=d},
b8O:function b8O(d){this.a=d},
b8P:function b8P(d){this.a=d},
b8Q:function b8Q(d){this.a=d},
b8R:function b8R(d){this.a=d},
b8L:function b8L(d){this.a=d},
b8A:function b8A(d,e){this.a=d
this.b=e},
b8z:function b8z(d,e){this.a=d
this.b=e},
b8y:function b8y(d,e){this.a=d
this.b=e},
b8S:function b8S(d){this.a=d},
aaC:function aaC(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wb:function wb(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aNH:function aNH(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aNI:function aNI(d){this.a=d},
aNJ:function aNJ(d){this.a=d},
aNK:function aNK(d){this.a=d},
a0q:function a0q(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
are:function are(d){this.a=d},
arf:function arf(d){this.a=d},
bId(d){var x=y.U,w=A.H(new A.Y(A.b(d.split(" "),y.s),new B.bIe(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gT(w),0).toUpperCase()
return(J.p(C.b.gT(w),0)+J.p(C.b.gaG(w),0)).toUpperCase()},
bIe:function bIe(){},
aJ_:function aJ_(){},
mv:function mv(d,e,f){this.e=d
this.a=e
this.b=f},
aEq:function aEq(d){this.a=d},
aEr:function aEr(d){this.a=d},
bLG(d){var x=new B.a49(d)
x.aup(d)
return x},
a49:function a49(d){this.d=d},
aEn:function aEn(d){this.a=d},
aEo:function aEo(d){this.a=d},
aEp:function aEp(d){this.a=d},
aEc:function aEc(){},
aEe:function aEe(){},
aEf:function aEf(){},
aEg:function aEg(d){this.a=d},
aEd:function aEd(d){this.a=d},
c9f(d,e){var x=y.N
x=new B.a5L(d,e,A.C(x,y.E),A.C(x,y.z))
x.auu(d,e)
return x},
a5L:function a5L(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aJ2:function aJ2(d){this.a=d},
aJ3:function aJ3(d){this.a=d},
aJ4:function aJ4(d){this.a=d},
aJ5:function aJ5(d){this.a=d},
aJ6:function aJ6(d){this.a=d},
aJ7:function aJ7(d){this.a=d},
aJ8:function aJ8(d){this.a=d},
aJ9:function aJ9(d){this.a=d},
aJ0:function aJ0(d){this.a=d},
aJ1:function aJ1(d,e){this.a=d
this.b=e},
bMc:function bMc(d){this.a=d},
cjN(){return C.b.mQ(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bIm())!==-1},
bIm:function bIm(){},
bUd(){var x=A.b([],y.d),w=$.bUe
$.bUe=w+1
return new B.Ot(w,x,D.agw,$.ae())},
Ot:function Ot(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aJf:function aJf(d){this.a=d},
aJb:function aJb(d){this.a=d},
aJc:function aJc(d){this.a=d},
aJd:function aJd(d){this.a=d},
aJe:function aJe(){},
bUf(d,e,f){return new B.Ov(d,f,e,null)},
Ov:function Ov(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Ow:function Ow(){this.c=this.a=null},
aJg:function aJg(){},
aJi:function aJi(d){this.a=d},
aJh:function aJh(d){this.a=d},
bSq(d,e,f,g){var x,w={}
w.a=d
x=new B.a2F(g.i("a2F<0>"))
x.aug(e,f,w,g)
return x},
a2F:function a2F(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
axV:function axV(d,e){this.a=d
this.b=e},
axU:function axU(d){this.a=d},
U7:function U7(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bdH:function bdH(){},
a7X:function a7X(d){this.b=this.a=$
this.$ti=d},
a7Y:function a7Y(){},
bKs(d,e){return B.c3Q(d,e)},
c3Q(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bKs=A.f(function(f,g){if(f===1)return A.h(g,w)
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
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.hj(new B.GA("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.ob(r,"open",!1,y.C).gT(0).aC(new B.aq9(p,q),y.H)
t=y.C
s=y.H
new A.ob(r,"error",!1,t).gT(0).aC(new B.aqa(p,q),s)
A.hK(r,"message",new B.aqb(q),!1,y.m)
new A.ob(r,"close",!1,t).gT(0).aC(new B.aqc(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bKs,w)},
xr:function xr(d,e){this.a=d
this.b=e},
aq9:function aq9(d,e){this.a=d
this.b=e},
aqa:function aqa(d,e){this.a=d
this.b=e},
aqb:function aqb(d){this.a=d},
aqc:function aqc(d,e){this.a=d
this.b=e},
bMO(){return new B.Gz("Connection Closed")},
rS:function rS(){},
G6:function G6(d){this.a=d},
Cp:function Cp(d){this.a=d},
CN:function CN(d,e){this.a=d
this.b=e},
GA:function GA(d){this.a=d},
Gz:function Gz(d){this.a=d},
c3n(d){var x=null,w=$.aH,v=new B.a7X(y.Z),u=y.X,t=A.fN(x,x,x,!0,u),s=A.fN(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bSq(new A.cD(s,r.i("cD<1>")),new A.BE(t,q.i("BE<1>")),!0,u)
v.b=B.bSq(new A.cD(t,q.i("cD<1>")),new A.BE(s,r.i("BE<1>")),!1,u)
v=new B.amF(new A.b2(new A.av(w,y.W),y.R),v)
v.au7(d)
return v},
amF:function amF(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
amJ:function amJ(d){this.a=d},
amG:function amG(d){this.a=d},
amH:function amH(d){this.a=d},
amI:function amI(d,e){this.a=d
this.b=e},
amK:function amK(d){this.a=d},
ajG:function ajG(d,e){this.b=d
this.a=e},
a91:function a91(d){this.a=d},
cjm(d){switch(d){case"new":return D.agj
case"checking":return D.agk
case"connected":return D.agm
case"completed":return D.agl
case"failed":return D.JP
case"disconnected":return D.ago
case"closed":return D.JQ
case"count":return D.agn}return D.JQ},
cjn(d){switch(d){case"new":return D.JR
case"gathering":return D.agp
case"complete":return D.agq}return D.JR},
ckS(d){switch(d){case"stable":return D.agr
case"have-local-offer":return D.ags
case"have-local-pranswer":return D.agu
case"have-remote-offer":return D.agt
case"have-remote-pranswer":return D.agv
case"closed":return D.JX}return D.JX},
ckt(d){switch(d){case"new":return D.JU
case"connecting":return D.JV
case"connected":return D.JW
case"closed":return D.ry
case"disconnected":return D.JT
case"failed":return D.JS}return D.ry},
vr:function vr(d,e){this.a=d
this.b=e},
Oq:function Oq(d,e){this.a=d
this.b=e},
vq:function vq(d,e){this.a=d
this.b=e},
mH:function mH(d,e){this.a=d
this.b=e},
a5M:function a5M(d,e){this.a=d
this.b=e},
aIZ:function aIZ(){},
N0:function N0(){},
Ek:function Ek(){},
aEb:function aEb(){},
EY:function EY(d,e,f){this.a=d
this.b=e
this.c=f},
Or:function Or(){},
aJa:function aJa(){},
zX:function zX(d,e){this.a=d
this.b=e},
Os:function Os(d){this.b=d},
Ou:function Ou(d,e,f){this.a=d
this.b=e
this.c=f},
bLn(d){var x=0,w=A.k(y.y)
var $async$bLn=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bLn,w)},
aGT(d){var x=0,w=A.k(y.H),v
var $async$aGT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aSl("enableSpeakerphone",A.a8(["enable",d],y.N,v),v,v),$async$aGT)
case 2:return A.i(null,w)}})
return A.j($async$aGT,w)},
aSl(d,e,f,g){return B.cbU(d,e,f,g,f.i("0?"))},
cbU(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aSl=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aSk(),$async$aSl)
case 3:v=D.Fw.ct(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aSl,w)},
aSk(){var x=0,w=A.k(y.H),v,u
var $async$aSk=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bVR?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Fw.ct("initialize",A.a8(["options",A.C(v,u)],v,u),!1,y.H),$async$aSk)
case 4:$.bVR=!0
case 3:return A.i(null,w)}})
return A.j($async$aSk,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[27]
E=c[19]
B.D7.prototype={
D(d,e){this.a.D(0,e)},
d4(d,e){this.a.d4(d,e)},
a7(d){return this.a.a7(0)},
$idC:1}
B.PX.prototype={
iH(d){var x=A.cv("subscription"),w=A.fN(new B.aOh(x),null,null,!0,this.$ti.y[1])
x.b=d.eN(new B.aOi(this,w),w.glS(w),w.gnq())
return new A.cD(w,A.u(w).i("cD<1>"))}}
B.aoo.prototype={}
B.FI.prototype={}
B.a0G.prototype={}
B.oP.prototype={
M(){return new B.Ti()}}
B.Ti.prototype={
U(){var x=this
x.V()
x.JH()
x.r=A.de(C.c0,new B.b91(x))
x.w=A.kb(C.x0,new B.b92(x))},
k(){var x=this,w=x.r
if(w!=null)w.Z(0)
w=x.w
if(w!=null)w.Z(0)
w=x.x
if(w!=null)w.Z(0)
x.a4()},
Wb(){var x=this.x
if(x!=null)x.Z(0)
this.x=A.de(C.fN,new B.b8Z(this))},
Nb(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Nb=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.A4(p.c),$async$Nb)
case 7:r=e
q=B.a_c(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b9_(s))
p=s.r
if(p!=null)p.Z(0)
p=s.w
if(p!=null)p.Z(0)
s.Wb()}u=2
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
return A.j($async$Nb,w)},
JH(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$JH=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.A4(o.c),$async$JH)
case 7:r=e
q=B.a_c(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gajq()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b8W(s))
s.Wb()
x=1
break}s.n(new B.b8X(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b8Y(s))
s.Wb()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$JH,w)},
Jx(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Jx=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b8T(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.ZR(q.c,"accepte"),$async$Jx)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b8U(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.C(A.A(null,null,null,null,null,C.f,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
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
A.aa(q,!1).wQ(A.dY(new B.b8V(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jx,w)},
Ee(d){return this.aOD(d)},
aOC(){return this.Ee(!1)},
aOD(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Ee=A.f(function(e,f){if(e===1){t=f
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
return A.e(q.ZR(r.c,"refuse"),$async$Ee)
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
return A.j($async$Ee,w)},
B(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.nk(C.o,s,A.c(B.bId(r.d),s,s,s,s,D.Mb,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.LY,C.a0,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.at,new A.a_(D.xl,x,s),C.k,A.c(q,s,s,s,s,D.tC,s,s,s),D.Lo],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b90(t)
v=A.a("Accepter")
u=t.f?s:t.gav8()
q.push(A.Z(A.b([new B.RX(D.y5,C.aD,r,x,s),D.ajY,new B.RX(D.y4,C.cu,v,u,s)],w),C.p,C.by,C.i,s))}if(t.d)q.push(C.vK)
return A.ex(s,C.n,A.ft(!0,A.cE(A.K(q,C.p,C.e,C.U),s,s),!0,C.ai,!0,!0),s,s)}}
B.RX.prototype={
B(d){var x=this,w=null,v=A.dj(x.d,w,w,C.ai,C.cg,w)
return A.K(A.b([A.ab(A.b5(!1,A.c7(x.c,C.l,w,32),C.j,w,C.r,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e7,w,w,w)],y.p),C.p,C.e,C.U)}}
B.y6.prototype={
M(){return new B.Th(A.b_(y.N),C.T)}}
B.Th.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bUd()
w=B.bUd()
v.d!==$&&A.bi()
v.d=new B.aNH(x,w)
v.a.toString
x=new B.a0q(new A.et(u,u,y.g),new A.et(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.uT()},
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
w.wA()
w=x.e
w===$&&A.d()
w.G0()
x.a4()},
uT(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$uT=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a7()
x=7
return A.e(l.A4(m.c),$async$uT)
case 7:r=e
q=B.a_c(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mq(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.OJ(),$async$uT)
case 8:p=e
o=B.c4x(p)
x=9
return A.e(s.Ta(),$async$uT)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.C(A.A(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mq(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.u0(A.a8(["iceServers",o.a],y.N,y.z),k==="video"),$async$uT)
case 10:m.f=new B.b8D(s)
m.r=new B.b8E(s)
m.w=new B.b8F(s)
if(s.c==null){x=1
break}s.n(new B.b8G(s))
s.ch=A.de(C.c0,new B.b8H(s))
s.CW=A.kb(C.cJ,new B.b8I(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cO(k,A.u(k).i("cO<1>")).cY(s.gaTs())
k=m.w
s.cy=new A.cO(k,A.u(k).i("cO<1>")).cY(new B.b8J())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.NU(C.c.QX("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.fb(C.c9,n,C.aj,!0))}s.ay=A.kb(C.fN,new B.b8K(s))
s.DF()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.C(A.A(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mq(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uT,w)},
Ta(){var x=0,w=A.k(y.y),v
var $async$Ta=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ta,w)},
DF(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$DF=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.bX("/messagerie/appels/"+p.c+"/signaux"),$async$DF)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gK(p)
s.adC(B.bUL(q))}u=2
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
return A.j($async$DF,w)},
adC(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bZy(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.zz(A.a8(["sdp",v.a,"type",v.b],y.N,y.z)).aC(new B.b8M(s),y.a).fN(new B.b8N(s))
break
case"reponse":if(!s.a.f)return
u=B.bZy(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.NA(A.a8(["sdp",u.a,"type",u.b],y.N,y.z)).aC(new B.b8O(s),y.a).fN(new B.b8P(s))
break
case"candidat_ice":t=B.chV(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.Nv(A.a8(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.FV().aC(new B.b8Q(s),y.a).fN(new B.b8R(s))
break
case"refuse":s.mq(A.a("Appel refus\xe9"))
break
case"annule":s.mq(A.a("Appel annul\xe9"))
break
case"termine":s.mq(A.a("Appel termin\xe9"))
break}},
aaL(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.Z(0)
w.n(new B.b8L(w))},
y7(d,e,f){return this.aBQ(d,e,f)},
a7b(d,e){return this.y7(d,e,!0)},
aBQ(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$y7=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.ahu(s.c,e,d),$async$y7)
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
Ea(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Ea=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.Z(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.ZR(r.c,"termine"),$async$Ea)
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
return A.j($async$Ea,w)},
mq(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.Z(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.C(A.A(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.aa(x,!1).bG()},
JP(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JP=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.Sa(u),$async$JP)
case 2:if(v.c!=null)v.n(new B.b8A(v,u))
return A.i(null,w)}})
return A.j($async$JP,w)},
JO(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JO=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.IN(u),$async$JO)
case 2:if(v.c!=null)v.n(new B.b8z(v,u))
return A.i(null,w)}})
return A.j($async$JO,w)},
JM(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JM=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.S7(u),$async$JM)
case 2:if(v.c!=null)v.n(new B.b8y(v,u))
return A.i(null,w)}})
return A.j($async$JM,w)},
JN(){var x=0,w=A.k(y.H),v=this,u
var $async$JN=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.ND(),$async$JN)
case 2:return A.i(null,w)}})
return A.j($async$JN,w)},
B(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bUf(o.e,!1,D.JZ)
else{x=A.nk(C.o,q,A.c(B.bId(w.e),q,q,q,q,D.aoo,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.amI,q,q,q)
x=A.cE(A.K(A.b([x,C.q,w,C.k,A.c(r.w?B.bHk(r.ax):A.a(p),q,q,q,q,D.tC,q,q,q)],y.p),C.p,C.e,C.U),q,q)}x=A.Oa(0,x)
o=A.i1(q,A.fd(A.Q(12),B.bUf(o.d,!0,D.JZ),C.aq),160,q,q,16,16,110)
w=r.w
v=B.bHk(r.ax)
u=r.z
t=r.Q
u=A.eZ(C.ba,A.b([x,o,A.i1(24,B.bW_(r.as,v,w,!0,t,u,r.ga4Q(),r.ga4P(),r.ga4R(),r.ga4S(),r.gab1()),q,q,0,0,q,q)],y.p),C.f,C.b8,q)
o=u}else{o=A.nk(C.o,q,A.c(B.bId(w.e),q,q,q,q,D.Mb,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.LY,C.a0,q,q)
if(r.w)w=B.bHk(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.tC,q,q,q)
v=r.w
u=B.bHk(r.ax)
t=r.z
s=r.Q
t=A.cE(A.K(A.b([o,C.at,new A.a_(D.xl,x,q),C.k,w,D.Lo,B.bW_(r.as,u,v,!1,s,t,r.ga4Q(),r.ga4P(),r.ga4R(),r.ga4S(),r.gab1())],y.p),C.p,C.e,C.U),q,q)
o=t}return A.bM6(!1,A.ex(q,C.n,A.ft(!0,o,!0,C.ai,!0,!0),q,q),new B.b8S(r),y.K)}}
B.aaC.prototype={
B(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.M4,u,u,u))
if(r&&v.c)s.push(C.q)
r=v.f
x=r?D.Yp:D.Yo
t=A.b([new B.wb(x,r,A.a("Muet"),v.x,u,u),D.nI,new B.wb(D.Yv,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nI)
if(r){x=v.w
w=x?D.y7:D.Yu
t.push(new B.wb(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nI)
if(r)t.push(new B.wb(D.Yt,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nI)
t.push(new B.wb(D.y5,!1,A.a("Raccrocher"),v.as,C.aD,u))
s.push(A.Z(t,C.p,C.by,C.i,u))
return A.K(s,C.p,C.e,C.U)}}
B.wb.prototype={
B(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.ln
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.dj(u,v,v,C.ai,C.cg,v)
return A.K(A.b([A.ab(A.b5(!1,A.c7(w.c,x,v,26),C.j,v,C.r,v,v,v,v,w.f,v,t),56,56),C.b3,A.c(w.e,v,v,v,v,C.ans,v,v,v)],y.p),C.p,C.e,C.U)}}
B.aNH.prototype={
u0(d,e){return this.b5C(d,e)},
b5C(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$u0=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.ij(0),$async$u0)
case 2:x=3
return A.e(v.e.ij(0),$async$u0)
case 3:u=$.c0d()
if(e){t=y.N
t=A.a8(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aEc().BQ(0,A.a8(["audio",!0,"video",t],s,r)),$async$u0)
case 4:q=v.b=g
o.sa30(0,q)
x=5
return A.e(u.Z5(d,A.C(s,r)),$async$u0)
case 5:p=v.a=g
x=6
return A.e(p.kh(0,q),$async$u0)
case 6:p.e=new B.aNI(v)
p.Q=new B.aNJ(v)
p.d=new B.aNK(v)
return A.i(null,w)}})
return A.j($async$u0,w)},
aAh(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa30(0,d)
x=w.r
if(x!=null)x.$0()}},
FV(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$FV=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.O5(0),$async$FV)
case 3:t=e
x=4
return A.e(s.C4(0,t),$async$FV)
case 4:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$FV,w)},
zz(d){return this.aYu(d)},
aYu(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$zz=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.C6(0,new B.zX(d.h(0,"sdp"),d.h(0,"type"))),$async$zz)
case 3:x=4
return A.e(s.O3(0),$async$zz)
case 4:t=f
x=5
return A.e(s.C4(0,t),$async$zz)
case 5:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$zz,w)},
NA(d){return this.aVG(d)},
aVG(d){var x=0,w=A.k(y.H),v=this,u
var $async$NA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.C6(0,new B.zX(d.h(0,"sdp"),d.h(0,"type"))),$async$NA)
case 2:return A.i(null,w)}})
return A.j($async$NA,w)},
Nv(d){return this.aVs(d)},
aVs(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Nv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Nl(new B.EY(A.aR(d.h(0,"candidate")),A.aR(d.h(0,"sdpMid")),A.e8(d.h(0,"sdpMLineIndex")))),$async$Nv)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nv,w)},
Sa(d){return this.ao4(d)},
ao4(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Sa=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.RI(0)
if(r==null)r=C.dl
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.I)(r),++s)r[s].skl(0,t)
return A.i(null,w)}})
return A.j($async$Sa,w)},
IN(d){return this.anW(d)},
anW(d){var x=0,w=A.k(y.H)
var $async$IN=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGT(d),$async$IN)
case 2:return A.i(null,w)}})
return A.j($async$IN,w)},
S7(d){return this.anO(d)},
anO(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$S7=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Iw(0)
if(s==null)s=C.dl
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.I)(s),++t)s[t].skl(0,d)
return A.i(null,w)}})
return A.j($async$S7,w)},
ND(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$ND=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Iw(0)
if(s==null)s=D.a94
if(s.length===0){x=1
break}x=3
return A.e(B.bLn(C.b.gT(s)),$async$ND)
case 3:case 1:return A.i(v,w)}})
return A.j($async$ND,w)},
wA(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$wA=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a7(0)
x=7
return A.e(y.x.b(q)?q:A.dJ(q,y.H),$async$wA)
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
else{o=A.H(q.RI(0),!0,y.G)
C.b.t(o,q.Iw(0))
q=o}if(q==null)q=C.dl
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c3h(r)
if(!m.b(k)){j=new A.av($.aH,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$wA)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.I)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.e(s.d.k(),$async$wA)
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
return A.e(s.e.k(),$async$wA)
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
return A.j($async$wA,w)}}
B.a0q.prototype={
NU(d){return this.aWW(d)},
aWW(d){var x=0,w=A.k(y.H),v=this
var $async$NU=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Cz(),$async$NU)
case 2:return A.i(null,w)}})
return A.j($async$NU,w)},
Cz(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Cz=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c3n(B.bKs(A.cF(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Cz)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cD(p,A.u(p).i("cD<1>")).aT(s.gaOn(),!0,s.gaNv(),new B.are(s))
u=2
x=6
break
case 4:u=3
n=t
s.W2()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cz,w)},
aOo(d){var x,w,v,u
try{x=C.X.cO(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bUL(w))}catch(u){}},
W2(){var x,w=this,v=w.c
if(v!=null)v.Z(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a5o[v]
w.f=v+1
v=w.d
if(v!=null)v.Z(0)
w.d=A.de(A.dq(0,0,0,0,x),new B.arf(w))},
G0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$G0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Z(0)
s=t.c
s=s==null?null:s.Z(0)
x=2
return A.e(y.x.b(s)?s:A.dJ(s,y.H),$async$G0)
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
r=s.w=new B.ajG(s,q)}s=r.a7(0)}x=7
return A.e(y._.b(s)?s:A.dJ(s,y.z),$async$G0)
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
return A.j($async$G0,w)}}
B.aJ_.prototype={
Z5(d,e){return this.aYl(d,e)},
aYl(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$Z5=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a8(["mandatory",A.C(r,r),"optional",A.b([A.a8(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fq(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bR(t)))
t=J.l(s)
v=B.c9f(C.d_.gl3().bv(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Z5,w)}}
B.mv.prototype={
RI(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dg(w,A.W(w).i("dg<1,aA>"))
J.h4(w,new B.aEq(x))
return x},
Iw(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dg(w,A.W(w).i("dg<1,aA>"))
J.h4(w,new B.aEr(x))
return x}}
B.a49.prototype={
aup(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aEn(x)))
w.addEventListener("mute",A.bV(new B.aEo(x)))
w.addEventListener("unmute",A.bV(new B.aEp(x)))},
skl(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aEc.prototype={
BQ(d,e){return this.amX(0,e)},
amX(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$BQ=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cjN())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iy(e.h(0,"video"),"facingMode")
e.cn(0,"video",new B.aEe())
e.cn(0,"audio",new B.aEf())}catch(a0){A.na("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hX(e.h(0,"audio"),i,i).aP(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h4(s,new B.aEg(r))
J.iy(e.h(0,"audio"),"optional")
J.j2(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.bf(a0)
A.na("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bR(e)
x=10
return A.e(A.eC(o.getUserMedia(h.a(n)),h),$async$BQ)
case 10:m=a2
i=m
h=i.id
v=new B.mv(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eC(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$BQ)
case 11:l=a2
h=l
g=h.id
v=new B.mv(h,g,"local")
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
return A.j($async$BQ,w)}}
B.a5L.prototype={
auu(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aJ2(x)))
w.addEventListener("icecandidate",A.bV(new B.aJ3(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aJ4(x)))
w.onicegatheringstatechange=A.bV(new B.aJ5(x))
w.addEventListener("signalingstatechange",A.bV(new B.aJ6(x)))
if(!$.bOH())w.addEventListener("connectionstatechange",A.bV(new B.aJ7(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aJ8(x)))
w.addEventListener("track",A.bV(new B.aJ9(x)))},
O5(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$O5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eC(s.createOffer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$O5)
case 3:t=f
v=new B.zX(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$O5,w)},
O3(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$O3=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eC(s.createAnswer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$O3)
case 3:t=f
v=new B.zX(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$O3,w)},
kh(d,e){var x
this.ax.cn(0,e.a,new B.aJ1(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cJ(null,y.H)},
C4(d,e){return this.ao_(0,e)},
ao_(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$C4=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eC(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$C4)
case 2:return A.i(null,w)}})
return A.j($async$C4,w)},
C6(d,e){return this.aof(0,e)},
aof(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$C6=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eC(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$C6)
case 2:return A.i(null,w)}})
return A.j($async$C6,w)},
Nl(d){return this.aV9(d)},
aV9(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Nl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eC(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Nl)
case 2:return A.i(null,w)}})
return A.j($async$Nl,w)},
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
B.bMc.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.Ot.prototype={
sajD(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Gq()
if(x!=null)x.style.objectFit=e},
adL(){var x=this,w=x.Gq(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.agx(u,x.z!=null,0,t))},
sa30(d,e){var x,w,v,u,t=this
t.z=e
if(e.Iw(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.RI(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aBE()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Gq()
if(u!=null){u.srcObject=t.x
x=t.Gq()
x.toString
t.a4F(x)}t.sl(0,t.a.aXj(t.z!=null))},
aBE(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Gq(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.I)(t),++r)t[r].Z(0)
q=u.Gq()
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
while(true)switch(x){case 0:$.IT()
$.q9().u5("RTCVideoRenderer-"+v.Q,new B.aJf(v),!0)
return A.i(null,w)}})
return A.j($async$ij,w)},
a4F(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Ov.prototype={
M(){return new B.Ow()}}
B.Ow.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a6(0,v.gaLH())
x=v.a
w=x.c
w.as=x.e
w.sajD(0,x.d===D.JY?"contain":"cover")},
aLI(){if(this.c!=null)this.n(new B.aJg())},
k(){if(this.c!=null)this.a4()},
aR(d){var x,w
this.b6(d)
A.de(A.dq(0,0,10,0,0),new B.aJi(this))
x=this.a
w=x.c
w.sajD(0,x.d===D.JY?"contain":"cover")},
B(d){return new A.lt(new B.aJh(this),null)}}
B.a2F.prototype={
aug(d,e,f,g){var x=this,w=$.aH
x.a!==$&&A.bi()
x.a=new B.U7(d,x,new A.b2(new A.av(w,y.c),y.r),e,g.i("U7<0>"))
if(f.a.ghU())f.a=new B.PX(g.i("@<0>").bW(g).i("PX<1,2>")).iH(f.a)
w=A.fN(null,new B.axV(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
aao(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Z(0)
w=this.b
w===$&&A.d()
w.a7(0)}}
B.U7.prototype={
D(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d4(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aE0(d,e)},
jJ(d){return this.d4(d,null)},
aE0(d,e){var x=this
if(x.w){x.a.a.d4(d,e)
return}x.c.fi(d,e)
x.aap()
x.b.aao()
x.a.a.a7(0).fN(new B.bdH())},
a7(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aao()
x.c.cN(0,x.a.a.a7(0))}return x.c.a},
aap(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dG(0)
return},
$idC:1}
B.a7X.prototype={}
B.a7Y.prototype={}
B.xr.prototype={
a5N(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.CN(d,e))
x.a7(0)},
a2B(d){var x
if((this.b.b&4)!==0)throw A.n(B.bMO())
x=A.bR(d)
x.toString
this.a.send(x)},
vH(d,e,f){return this.aWH(0,e,f)},
aWH(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vH=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bMO())
u.a7(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vH,w)},
$ibMN:1}
B.rS.prototype={}
B.G6.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.G6&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.Cp.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Cp&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fK(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.CN.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.CN&&e.a===this.a&&e.b===this.b},
gH(d){return A.fK([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.GA.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Gz.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.amF.prototype={
au7(d){d.ez(new B.amJ(this),new B.amK(this),y.a)}}
B.ajG.prototype={
a7(d){var x=this.b
x.e=x.d=null
return this.apQ(0)}}
B.a91.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vr.prototype={
N(){return"RTCSignalingState."+this.b}}
B.Oq.prototype={
N(){return"RTCIceGatheringState."+this.b}}
B.vq.prototype={
N(){return"RTCPeerConnectionState."+this.b}}
B.mH.prototype={
N(){return"RTCIceConnectionState."+this.b}}
B.a5M.prototype={
N(){return"RTCVideoViewObjectFit."+this.b}}
B.aIZ.prototype={}
B.N0.prototype={}
B.Ek.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aEb.prototype={}
B.EY.prototype={}
B.Or.prototype={}
B.aJa.prototype={}
B.zX.prototype={}
B.Os.prototype={}
B.Ou.prototype={
agx(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Ou(x,w,v)},
aXj(d){return this.agx(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","y6(F)","~(FI)","bn(EY)","bn(Os)","bn(mH)","~(@)","mv(@)","mv()","bn(bMN)","~(rS)"])
B.aOh.prototype={
$0(){return J.c2G(this.a.bk())},
$S:1}
B.aOi.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bf(v)
this.b.d4(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aop.prototype={
$1(d){if(d==null)return null
return A.c1(J.l(d))},
$S:130}
B.b91.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.Ee(!0)},
$S:0}
B.b92.prototype={
$1(d){return this.a.Nb()},
$S:39}
B.b8Z.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bG()},
$S:0}
B.b9_.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b8W.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8X.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b8Y.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8T.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b8U.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b8V.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bRR(x.w,w,u,!1,v)},
$S:z+2}
B.b90.prototype={
$0(){return this.a.aOC()},
$S:0}
B.b8D.prototype={
$1(d){this.a.y7("candidat_ice",d,!1)},
$S:383}
B.b8E.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b8C())},
$S:0}
B.b8C.prototype={
$0(){},
$S:0}
B.b8F.prototype={
$0(){this.a.mq(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b8G.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b8H.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.y7("annule",C.e0,!1)
x.mq(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b8I.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b8B(x,w))},
$S:39}
B.b8B.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eG(this.b)},
$S:0}
B.b8J.prototype={
$1(d){},
$S:159}
B.b8K.prototype={
$1(d){this.a.DF()},
$S:39}
B.b8M.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.aaL()
x.a7b("reponse",d)},
$S:384}
B.b8N.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b8O.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.aaL()},
$S:27}
B.b8P.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b8Q.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a7b("offre",d)},
$S:384}
B.b8R.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b8L.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.T},
$S:0}
B.b8A.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b8z.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b8y.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b8S.prototype={
$2(d,e){if(!d)this.a.Ea()},
$S:940}
B.aNI.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a8(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aNJ.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gT(x):null
if(w!=null)this.a.aAh(w)},
$S:z+5}
B.aNK.prototype={
$1(d){var x
if(d===D.JP){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.are.prototype={
$1(d){return this.a.W2()},
$S:21}
B.arf.prototype={
$0(){var x=this.a
if(!x.e)x.Cz()},
$S:0}
B.bIe.prototype={
$1(d){return d.length!==0},
$S:12}
B.aEq.prototype={
$1(d){return this.a.push(B.bLG(d))},
$S:21}
B.aEr.prototype={
$1(d){return this.a.push(B.bLG(d))},
$S:21}
B.aEn.prototype={
$1(d){},
$S:22}
B.aEo.prototype={
$1(d){},
$S:22}
B.aEp.prototype={
$1(d){},
$S:22}
B.aEe.prototype={
$0(){return!1},
$S:47}
B.aEf.prototype={
$0(){return!1},
$S:47}
B.aEg.prototype={
$1(d){J.h4(d,new B.aEd(this.a))},
$S:383}
B.aEd.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:50}
B.aJ2.prototype={
$1(d){},
$S:22}
B.aJ3.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.EY(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aJ4.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cjm(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bOH())switch(w.cx.a){case 0:w.cy=D.JU
break
case 1:w.cy=D.JV
break
case 3:w.cy=D.JW
break
case 5:w.cy=D.JS
break
case 6:w.cy=D.JT
break
case 7:w.cy=D.ry
break
default:break}},
$S:40}
B.aJ5.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cjn(w.iceGatheringState)},
$S:40}
B.aJ6.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.ckS(w.signalingState)},
$S:40}
B.aJ7.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.ckt(w.connectionState)},
$S:40}
B.aJ8.prototype={
$1(d){},
$S:40}
B.aJ9.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bLG(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>"))
w=J.eT(x,new B.aJ0(w),y.h)
v.$1(new B.Os(A.H(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aJ0.prototype={
$1(d){return new B.mv(d,d.id,this.a.as)},
$S:z+8}
B.aJ1.prototype={
$0(){var x=this.b.e
return new B.mv(x,x.id,this.a.as)},
$S:z+9}
B.bIm.prototype={
$1(d){return J.fP(self.window.navigator.userAgent,A.bJ(d,!1,!1))},
$S:12}
B.aJf.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.I)(w),++u)w[u].Z(0)
C.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a4F(t)
v=y.i.c
w.push(A.hK(t,"canplay",new B.aJb(x),!1,v))
w.push(A.hK(t,"resize",new B.aJc(x),!1,v))
w.push(A.hK(t,"error",new B.aJd(t),!1,v))
w.push(A.hK(t,"ended",new B.aJe(),!1,v))
return t},
$S:222}
B.aJb.prototype={
$1(d){this.a.adL()},
$S:21}
B.aJc.prototype={
$1(d){this.a.adL()},
$S:21}
B.aJd.prototype={
$1(d){var x,w,v=this.a.error
A.na("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Fk.h(0,A.am(v,"code"))
x.toString
w=!J.q(A.am(v,"message"),"")?A.am(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pg(x,C.Fj.h(0,A.am(v,"code")),w,null))},
$S:41}
B.aJe.prototype={
$1(d){},
$S:21}
B.aJg.prototype={
$0(){},
$S:0}
B.aJi.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aJh.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a2W("RTCVideoRenderer-"+w.Q)
else w=A.U(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cE(A.U(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:941}
B.axV.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eN(w.ghB(w),new B.axU(v),w.gnq())},
$S:0}
B.axU.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aap()
x=x.b
x===$&&A.d()
x.a7(0)},
$S:0}
B.bdH.prototype={
$1(d){},
$S:17}
B.aq9.prototype={
$1(d){this.a.cN(0,this.b)},
$S:22}
B.aqa.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hj(new B.GA("Failed to connect WebSocket"))
else this.b.a5N(1006,"error")},
$S:22}
B.aqb.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cv("data")
if(typeof x==="string")w.b=new B.G6(A.bC(x))
else if(typeof x==="object"&&A.c7k(y.m.a(x),"ArrayBuffer"))w.b=new B.Cp(A.a4v(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.az(x).j(0)))
v.D(0,w.bk())},
$S:41}
B.aqc.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cN(0,this.b)
this.b.a5N(d.code,d.reason)},
$S:22}
B.amJ.prototype={
$1(d){var x=d.b,w=this.a
new A.cD(x,A.u(x).i("cD<1>")).cY(new B.amG(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cD(x,A.u(x).i("cD<1>")).b2O(new B.amH(d),new B.amI(w,d))
w.f.dG(0)},
$S:z+10}
B.amG.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.G6
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.Cp
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.CN){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a7(0)}}},
$S:z+11}
B.amH.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bMO())
s=A.bR(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a2B(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a2B(new Uint8Array(A.d1(u)))
break $label1$1}t=A.aL("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Gz))throw r}},
$S:18}
B.amI.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.vH(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.O(q) instanceof B.Gz))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.amK.prototype={
$1(d){var x,w=d instanceof A.QW?d:new B.a91(J.l(d)),v=this.a
v.f.hj(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.jJ(w)
v=v.a
v===$&&A.d()
v.a7(0)},
$S:40};(function aliases(){var x=B.D7.prototype
x.apQ=x.a7})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Ti.prototype,"gav8","Jx",0)
var v
w(v=B.Th.prototype,"gaTs","adC",3)
x(v,"gab1","Ea",0)
x(v,"ga4S","JP",0)
x(v,"ga4R","JO",0)
x(v,"ga4P","JM",0)
x(v,"ga4Q","JN",0)
w(v=B.a0q.prototype,"gaOn","aOo",7)
x(v,"gaNv","W2",1)
x(B.Ot.prototype,"gdI","k",0)
x(B.Ow.prototype,"gaLH","aLI",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a2,[B.D7,B.aoo,B.FI,B.a0G,B.aNH,B.a0q,B.aIZ,B.N0,B.Ek,B.aEb,B.Or,B.aJa,B.a7Y,B.U7,B.a7X,B.xr,B.rS,B.GA,B.a91,B.EY,B.zX,B.Os,B.Ou])
w(B.PX,A.fi)
x(A.jI,[B.aOh,B.b91,B.b8Z,B.b9_,B.b8W,B.b8X,B.b8Y,B.b8T,B.b8U,B.b90,B.b8E,B.b8C,B.b8F,B.b8G,B.b8H,B.b8B,B.b8L,B.b8A,B.b8z,B.b8y,B.arf,B.aEe,B.aEf,B.aJ1,B.aJg,B.aJi,B.axV,B.axU,B.amI])
x(A.ii,[B.aOi,B.aop,B.b92,B.b8V,B.b8D,B.b8I,B.b8J,B.b8K,B.b8M,B.b8N,B.b8O,B.b8P,B.b8Q,B.b8R,B.aNI,B.aNJ,B.aNK,B.are,B.bIe,B.aEq,B.aEr,B.aEn,B.aEo,B.aEp,B.aEg,B.aJ2,B.aJ3,B.aJ4,B.aJ5,B.aJ6,B.aJ7,B.aJ8,B.aJ9,B.aJ0,B.bIm,B.aJf,B.aJb,B.aJc,B.aJd,B.aJe,B.bdH,B.aq9,B.aqa,B.aqb,B.aqc,B.amJ,B.amG,B.amH,B.amK])
x(A.M,[B.oP,B.y6,B.Ov])
x(A.P,[B.Ti,B.Th,B.Ow])
x(A.at,[B.RX,B.aaC,B.wb])
x(A.qo,[B.b8S,B.aEd,B.aJh])
w(B.aJ_,B.aIZ)
w(B.mv,B.N0)
w(B.a49,B.Ek)
w(B.aEc,B.aEb)
w(B.a5L,B.Or)
w(B.bMc,B.aJa)
w(B.Ot,A.d4)
x(B.a7Y,[B.a2F,B.amF])
x(B.rS,[B.G6,B.Cp,B.CN])
w(B.Gz,B.GA)
w(B.ajG,B.D7)
x(A.H4,[B.vr,B.Oq,B.vq,B.mH,B.a5M])})()
A.oh(b.typeUniverse,JSON.parse('{"D7":{"dC":["1"]},"PX":{"fi":["1","2"],"fi.S":"1","fi.T":"2"},"y6":{"M":[],"m":[]},"oP":{"M":[],"m":[]},"Ti":{"P":["oP"]},"RX":{"at":[],"m":[]},"Th":{"P":["y6"]},"aaC":{"at":[],"m":[]},"wb":{"at":[],"m":[]},"mv":{"N0":[]},"a49":{"Ek":[]},"a5L":{"Or":[]},"Ot":{"d4":["Ou"],"aX":[]},"Ov":{"M":[],"m":[]},"Ow":{"P":["Ov"]},"U7":{"dC":["1"]},"xr":{"bMN":[]},"G6":{"rS":[]},"Cp":{"rS":[]},"CN":{"rS":[]},"GA":{"bM":[]},"Gz":{"bM":[]},"ajG":{"dC":["@"]},"a91":{"bM":[]}}'))
A.bNf(b.typeUniverse,JSON.parse('{"D7":1,"a7Y":1}'))
var y=(function rtii(){var x=A.ax
return{b:x("xr"),L:x("bM"),_:x("as<@>"),x:x("as<~>"),S:x("E<af<o,J>>"),t:x("E<af<o,@>>"),Q:x("E<Ek>"),d:x("E<ip<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aA"),l:x("L<aA>"),F:x("L<af<o,@>>"),j:x("L<@>"),I:x("L<w>"),P:x("af<o,@>"),f:x("af<@,@>"),E:x("N0"),G:x("Ek"),h:x("mv"),o:x("pc"),a:x("bn"),K:x("a2"),J:x("Or"),v:x("zX"),Z:x("a7X<a2?>"),N:x("o"),e:x("pH"),M:x("e7"),D:x("rS"),U:x("Y<o>"),g:x("et<FI>"),n:x("et<~>"),V:x("b2<xr>"),r:x("b2<@>"),R:x("b2<~>"),i:x("Ts<aA>"),C:x("ob<aA>"),k:x("av<xr>"),c:x("av<@>"),W:x("av<~>"),q:x("kj"),y:x("J"),z:x("@"),A:x("aA?"),X:x("a2?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.T_=new B.a0G(C.jW)
D.xl=new A.ao(32,0,32,0)
D.y4=new A.al(57638,!1)
D.y5=new A.al(57639,!1)
D.Yo=new A.al(58337,!1)
D.Yp=new A.al(58341,!1)
D.Yt=new A.al(58923,!1)
D.y7=new A.al(59048,!1)
D.Yu=new A.al(59049,!1)
D.Yv=new A.al(59077,!1)
D.a5o=A.b(x([1,2,4,8,16]),A.ax("E<w>"))
D.a94=A.b(x([]),y.Q)
D.Fw=new A.fI("FlutterWebRTC.Method",C.bc,null)
D.agj=new B.mH(0,"RTCIceConnectionStateNew")
D.agk=new B.mH(1,"RTCIceConnectionStateChecking")
D.agl=new B.mH(2,"RTCIceConnectionStateCompleted")
D.agm=new B.mH(3,"RTCIceConnectionStateConnected")
D.agn=new B.mH(4,"RTCIceConnectionStateCount")
D.JP=new B.mH(5,"RTCIceConnectionStateFailed")
D.ago=new B.mH(6,"RTCIceConnectionStateDisconnected")
D.JQ=new B.mH(7,"RTCIceConnectionStateClosed")
D.JR=new B.Oq(0,"RTCIceGatheringStateNew")
D.agp=new B.Oq(1,"RTCIceGatheringStateGathering")
D.agq=new B.Oq(2,"RTCIceGatheringStateComplete")
D.ry=new B.vq(0,"RTCPeerConnectionStateClosed")
D.JS=new B.vq(1,"RTCPeerConnectionStateFailed")
D.JT=new B.vq(2,"RTCPeerConnectionStateDisconnected")
D.JU=new B.vq(3,"RTCPeerConnectionStateNew")
D.JV=new B.vq(4,"RTCPeerConnectionStateConnecting")
D.JW=new B.vq(5,"RTCPeerConnectionStateConnected")
D.agr=new B.vr(0,"RTCSignalingStateStable")
D.ags=new B.vr(1,"RTCSignalingStateHaveLocalOffer")
D.agt=new B.vr(2,"RTCSignalingStateHaveRemoteOffer")
D.agu=new B.vr(3,"RTCSignalingStateHaveLocalPrAnswer")
D.agv=new B.vr(4,"RTCSignalingStateHaveRemotePrAnswer")
D.JX=new B.vr(5,"RTCSignalingStateClosed")
D.agw=new B.Ou(0,0,0)
D.JY=new B.a5M(0,"RTCVideoViewObjectFitContain")
D.JZ=new B.a5M(1,"RTCVideoViewObjectFitCover")
D.nI=new A.cg(20,null,null,null)
D.ajY=new A.cg(48,null,null,null)
D.Lo=new A.cg(null,64,null,null)
D.amI=new A.z(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.LY=new A.z(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.tC=new A.z(!0,C.ad,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aoo=new A.z(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Mb=new A.z(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bVR=!1
$.bUe=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"coc","c0d",()=>new B.aJ_())
x($,"cmj","bOH",()=>C.c.q(A.am(A.am(A.am(A.bOn(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"7ufDwT2yTx9G0KRvMK3ux2XdyRw=");