((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,D,B={D1:function D1(){},PH:function PH(d){this.$ti=d},aNK:function aNK(d){this.a=d},aNL:function aNL(d,e){this.a=d
this.b=e},
ZQ(d){var x,w,v,u,t,s=new B.ao_(),r=J.P(d),q=r.h(d,"id")
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
return new B.anZ(q,x,w,v,u,t)},
bTu(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.m2(t,y.N,y.z):D.fl
if(u.h(d,"cree_le")!=null)A.c3(J.l(u.h(d,"cree_le")))
return new B.FE(s,x,w,v)},
c3g(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return C.TD
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.m2(s,u,t))}return new B.a0k(x)},
bGb(d){var x=D.h.b2(d.a,1e6)
return D.c.b0(D.h.j(D.h.b2(x,60)),2,"0")+":"+D.c.b0(D.h.j(D.h.aO(x,60)),2,"0")},
bYf(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oi(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.afD(w,v)},
cgz(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.afG(u,A.kk(w)?w:null,v)},
anZ:function anZ(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
ao_:function ao_(){},
FE:function FE(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a0k:function a0k(d){this.a=d},
bQz(d,e,f,g,h,i){return new B.oN(e,f,i,h,d,null)},
bQy(d,e,f,g,h){return new B.y1(e,h,f,g,d,null)},
bUH(d,e,f,g,h,i,j,k,l,m,n){return new B.aah(g,f,e,i,h,d,m,l,k,j,n,null)},
oN:function oN(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
T_:function T_(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b8o:function b8o(d){this.a=d},
b8p:function b8p(d){this.a=d},
b8l:function b8l(d){this.a=d},
b8m:function b8m(d){this.a=d},
b8i:function b8i(d){this.a=d},
b8j:function b8j(d){this.a=d},
b8k:function b8k(d){this.a=d},
b8f:function b8f(d){this.a=d},
b8g:function b8g(d){this.a=d},
b8h:function b8h(d){this.a=d},
b8n:function b8n(d){this.a=d},
RG:function RG(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
y1:function y1(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
SZ:function SZ(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b8_:function b8_(d){this.a=d},
b80:function b80(d){this.a=d},
b7Z:function b7Z(){},
b81:function b81(d){this.a=d},
b82:function b82(d){this.a=d},
b83:function b83(d){this.a=d},
b84:function b84(d){this.a=d},
b7Y:function b7Y(d,e){this.a=d
this.b=e},
b85:function b85(){},
b86:function b86(d){this.a=d},
b88:function b88(d){this.a=d},
b89:function b89(d){this.a=d},
b8a:function b8a(d){this.a=d},
b8b:function b8b(d){this.a=d},
b8c:function b8c(d){this.a=d},
b8d:function b8d(d){this.a=d},
b87:function b87(d){this.a=d},
b7X:function b7X(d,e){this.a=d
this.b=e},
b7W:function b7W(d,e){this.a=d
this.b=e},
b7V:function b7V(d,e){this.a=d
this.b=e},
b8e:function b8e(d){this.a=d},
aah:function aah(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
w8:function w8(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aN9:function aN9(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aNa:function aNa(d){this.a=d},
aNb:function aNb(d){this.a=d},
aNc:function aNc(d){this.a=d},
a04:function a04(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aqP:function aqP(d){this.a=d},
aqQ:function aqQ(d){this.a=d},
bH4(d){var x=y.U,w=A.I(new A.Z(A.b(d.split(" "),y.s),new B.bH5(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(D.b.gT(w),0).toUpperCase()
return(J.p(D.b.gT(w),0)+J.p(D.b.gaG(w),0)).toUpperCase()},
bH5:function bH5(){},
aIA:function aIA(){},
ms:function ms(d,e,f){this.e=d
this.a=e
this.b=f},
aE1:function aE1(d){this.a=d},
aE2:function aE2(d){this.a=d},
bKu(d){var x=new B.a3N(d)
x.au0(d)
return x},
a3N:function a3N(d){this.d=d},
aDZ:function aDZ(d){this.a=d},
aE_:function aE_(d){this.a=d},
aE0:function aE0(d){this.a=d},
aDO:function aDO(){},
aDQ:function aDQ(){},
aDR:function aDR(){},
aDS:function aDS(d){this.a=d},
aDP:function aDP(d){this.a=d},
c7X(d,e){var x=y.N
x=new B.a5q(d,e,A.C(x,y.E),A.C(x,y.z))
x.au5(d,e)
return x},
a5q:function a5q(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aID:function aID(d){this.a=d},
aIE:function aIE(d){this.a=d},
aIF:function aIF(d){this.a=d},
aIG:function aIG(d){this.a=d},
aIH:function aIH(d){this.a=d},
aII:function aII(d){this.a=d},
aIJ:function aIJ(d){this.a=d},
aIK:function aIK(d){this.a=d},
aIB:function aIB(d){this.a=d},
aIC:function aIC(d,e){this.a=d
this.b=e},
bL0:function bL0(d){this.a=d},
cip(){return D.b.mO(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bHd())!==-1},
bHd:function bHd(){},
bSW(){var x=A.b([],y.d),w=$.bSX
$.bSX=w+1
return new B.Og(w,x,C.ahp,$.ae())},
Og:function Og(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aIQ:function aIQ(d){this.a=d},
aIM:function aIM(d){this.a=d},
aIN:function aIN(d){this.a=d},
aIO:function aIO(d){this.a=d},
aIP:function aIP(){},
bSY(d,e,f){return new B.Oi(d,f,e,null)},
Oi:function Oi(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Oj:function Oj(){this.c=this.a=null},
aIR:function aIR(){},
aIT:function aIT(d){this.a=d},
aIS:function aIS(d){this.a=d},
bR7(d,e,f,g){var x,w={}
w.a=d
x=new B.a2i(g.i("a2i<0>"))
x.atS(e,f,w,g)
return x},
a2i:function a2i(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
axw:function axw(d,e){this.a=d
this.b=e},
axv:function axv(d){this.a=d},
TP:function TP(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bd3:function bd3(){},
a7A:function a7A(d){this.b=this.a=$
this.$ti=d},
a7B:function a7B(){},
bJg(d,e){return B.c2z(d,e)},
c2z(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bJg=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nN("ws")&&!d.nN("wss"))throw A.n(A.fj(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xn(r,A.fL(null,null,null,!1,y.D))
u=new A.ax($.aI,y.k)
p=new A.b3(u,y.V)
if(J.q(r.readyState,1))p.cL(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.hj(new B.Gu("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o7(r,"open",!1,y.C).gT(0).aE(new B.apK(p,q),y.H)
t=y.C
s=y.H
new A.o7(r,"error",!1,t).gT(0).aE(new B.apL(p,q),s)
A.hH(r,"message",new B.apM(q),!1,y.m)
new A.o7(r,"close",!1,t).gT(0).aE(new B.apN(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bJg,w)},
xn:function xn(d,e){this.a=d
this.b=e},
apK:function apK(d,e){this.a=d
this.b=e},
apL:function apL(d,e){this.a=d
this.b=e},
apM:function apM(d){this.a=d},
apN:function apN(d,e){this.a=d
this.b=e},
bLB(){return new B.Gt("Connection Closed")},
rS:function rS(){},
G1:function G1(d){this.a=d},
Ch:function Ch(d){this.a=d},
CG:function CG(d,e){this.a=d
this.b=e},
Gu:function Gu(d){this.a=d},
Gt:function Gt(d){this.a=d},
c25(d){var x=null,w=$.aI,v=new B.a7A(y.Z),u=y.X,t=A.fL(x,x,x,!0,u),s=A.fL(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bR7(new A.cE(s,r.i("cE<1>")),new A.Bx(t,q.i("Bx<1>")),!0,u)
v.b=B.bR7(new A.cE(t,q.i("cE<1>")),new A.Bx(s,r.i("Bx<1>")),!1,u)
v=new B.amg(new A.b3(new A.ax(w,y.W),y.R),v)
v.atJ(d)
return v},
amg:function amg(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
amk:function amk(d){this.a=d},
amh:function amh(d){this.a=d},
ami:function ami(d){this.a=d},
amj:function amj(d,e){this.a=d
this.b=e},
aml:function aml(d){this.a=d},
ajh:function ajh(d,e){this.b=d
this.a=e},
a8F:function a8F(d){this.a=d},
chZ(d){switch(d){case"new":return C.ahc
case"checking":return C.ahd
case"connected":return C.ahf
case"completed":return C.ahe
case"failed":return C.JZ
case"disconnected":return C.ahh
case"closed":return C.K_
case"count":return C.ahg}return C.K_},
ci_(d){switch(d){case"new":return C.K0
case"gathering":return C.ahi
case"complete":return C.ahj}return C.K0},
cjt(d){switch(d){case"stable":return C.ahk
case"have-local-offer":return C.ahl
case"have-local-pranswer":return C.ahn
case"have-remote-offer":return C.ahm
case"have-remote-pranswer":return C.aho
case"closed":return C.K6}return C.K6},
cj4(d){switch(d){case"new":return C.K3
case"connecting":return C.K4
case"connected":return C.K5
case"closed":return C.rF
case"disconnected":return C.K2
case"failed":return C.K1}return C.rF},
vq:function vq(d,e){this.a=d
this.b=e},
Od:function Od(d,e){this.a=d
this.b=e},
vp:function vp(d,e){this.a=d
this.b=e},
mD:function mD(d,e){this.a=d
this.b=e},
a5r:function a5r(d,e){this.a=d
this.b=e},
aIz:function aIz(){},
MP:function MP(){},
Ef:function Ef(){},
aDN:function aDN(){},
EU:function EU(d,e,f){this.a=d
this.b=e
this.c=f},
Oe:function Oe(){},
aIL:function aIL(){},
zR:function zR(d,e){this.a=d
this.b=e},
Of:function Of(d){this.b=d},
Oh:function Oh(d,e,f){this.a=d
this.b=e
this.c=f},
bKb(d){var x=0,w=A.k(y.y)
var $async$bKb=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bKb,w)},
aGu(d){var x=0,w=A.k(y.H),v
var $async$aGu=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aRN("enableSpeakerphone",A.a9(["enable",d],y.N,v),v,v),$async$aGu)
case 2:return A.i(null,w)}})
return A.j($async$aGu,w)},
aRN(d,e,f,g){return B.caz(d,e,f,g,f.i("0?"))},
caz(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aRN=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aRM(),$async$aRN)
case 3:v=C.FG.cr(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aRN,w)},
aRM(){var x=0,w=A.k(y.H),v,u
var $async$aRM=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bUy?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(C.FG.cr("initialize",A.a9(["options",A.C(v,u)],v,u),!1,y.H),$async$aRM)
case 4:$.bUy=!0
case 3:return A.i(null,w)}})
return A.j($async$aRM,w)}},C
J=c[1]
A=c[0]
D=c[2]
B=a.updateHolder(c[5],B)
C=c[27]
B.D1.prototype={
D(d,e){this.a.D(0,e)},
d_(d,e){this.a.d_(d,e)},
a8(d){return this.a.a8(0)},
$idD:1}
B.PH.prototype={
iF(d){var x=A.cu("subscription"),w=A.fL(new B.aNK(x),null,null,!0,this.$ti.y[1])
x.b=d.eM(new B.aNL(this,w),w.glO(w),w.gno())
return new A.cE(w,A.u(w).i("cE<1>"))}}
B.anZ.prototype={}
B.FE.prototype={}
B.a0k.prototype={}
B.oN.prototype={
N(){return new B.T_()}}
B.T_.prototype={
U(){var x=this
x.V()
x.Jx()
x.r=A.d9(D.c_,new B.b8o(x))
x.w=A.k7(D.xb,new B.b8p(x))},
k(){var x=this,w=x.r
if(w!=null)w.Y(0)
w=x.w
if(w!=null)w.Y(0)
w=x.x
if(w!=null)w.Y(0)
x.a4()},
VW(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.d9(D.fW,new B.b8l(this))},
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
q=B.ZQ(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b8m(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
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
q=B.ZQ(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaj3()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b8i(s))
s.VW()
x=1
break}s.n(new B.b8j(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b8k(s))
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
break}s.n(new B.b8f(s))
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
break}s.n(new B.b8g(s))
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
if(q!=null)q.Y(0)
q=s.w
if(q!=null)q.Y(0)
q=s.c
q.toString
A.aa(q,!1).wL(A.e1(new B.b8h(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jn,w)},
E4(d){return this.aO_(d)},
aNZ(){return this.E4(!1)},
aO_(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$E4=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Y(0)
r=s.w
if(r!=null)r.Y(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.Zz(r.c,"refuse"),$async$E4)
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
return A.j($async$E4,w)},
B(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.oE(D.r,s,A.c(B.bH4(r.d),s,s,s,s,C.Mh,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,C.M7,D.a2,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,D.ay,new A.a_(C.xw,x,s),D.k,A.c(q,s,s,s,s,C.tJ,s,s,s),C.Lz],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b8n(t)
v=A.a("Accepter")
u=t.f?s:t.gauK()
q.push(A.Y(A.b([new B.RG(C.yg,D.k9,r,x,s),C.akP,new B.RG(C.yf,C.adS,v,u,s)],w),D.o,D.bD,D.i,s))}if(t.d)q.push(D.vR)
return A.eO(s,D.n,A.fK(!0,A.cH(A.M(q,D.o,D.e,D.U),s,s),!0,D.ai,!0,!0),s,s)}}
B.RG.prototype={
B(d){var x=this,w=null,v=A.dk(x.d,w,w,D.ai,D.cg,w)
return A.M(A.b([A.ab(A.b5(!1,A.c7(x.c,D.l,w,32),D.j,w,D.q,w,w,w,w,x.f,w,v),72,72),D.k,A.c(x.e,w,w,w,w,D.e8,w,w,w)],y.p),D.o,D.e,D.U)}}
B.y1.prototype={
N(){return new B.SZ(A.b_(y.N),D.V)}}
B.SZ.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bSW()
w=B.bSW()
v.d!==$&&A.bi()
v.d=new B.aN9(x,w)
v.a.toString
x=new B.a04(new A.es(u,u,y.g),new A.es(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.uP()},
k(){var x=this,w=x.ay
if(w!=null)w.Y(0)
w=x.ch
if(w!=null)w.Y(0)
w=x.CW
if(w!=null)w.Y(0)
w=x.cx
if(w!=null)w.Y(0)
w=x.cy
if(w!=null)w.Y(0)
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
q=B.ZQ(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mo(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.Ox(),$async$uP)
case 8:p=e
o=B.c3g(p)
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
case 10:m.f=new B.b8_(s)
m.r=new B.b80(s)
m.w=new B.b81(s)
if(s.c==null){x=1
break}s.n(new B.b82(s))
s.ch=A.d9(D.c_,new B.b83(s))
s.CW=A.k7(D.cV,new B.b84(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cO(k,A.u(k).i("cO<1>")).cU(s.gaSR())
k=m.w
s.cy=new A.cO(k,A.u(k).i("cO<1>")).cU(new B.b85())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.NI(D.c.QK("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f9(D.c9,n,D.aj,!0))}s.ay=A.k7(D.fW,new B.b86(s))
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
s.adg(B.bTu(q))}u=2
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
adg(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bYf(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.zq(A.a9(["sdp",v.a,"type",v.b],y.N,y.z)).aE(new B.b88(s),y.a).h3(new B.b89(s))
break
case"reponse":if(!s.a.f)return
u=B.bYf(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.No(A.a9(["sdp",u.a,"type",u.b],y.N,y.z)).aE(new B.b8a(s),y.a).h3(new B.b8b(s))
break
case"candidat_ice":t=B.cgz(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.Nj(A.a9(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.FK().aE(new B.b8c(s),y.a).h3(new B.b8d(s))
break
case"refuse":s.mo(A.a("Appel refus\xe9"))
break
case"annule":s.mo(A.a("Appel annul\xe9"))
break
case"termine":s.mo(A.a("Appel termin\xe9"))
break}},
aaq(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.Y(0)
w.n(new B.b87(w))},
y_(d,e,f){return this.aBh(d,e,f)},
a6S(d,e){return this.y_(d,e,!0)},
aBh(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$y_=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.ah7(s.c,e,d),$async$y_)
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
if(r!=null)r.Y(0)
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
if(x!=null)x.Y(0)
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
case 2:if(v.c!=null)v.n(new B.b7X(v,u))
return A.i(null,w)}})
return A.j($async$JG,w)},
JF(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JF=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.ID(u),$async$JF)
case 2:if(v.c!=null)v.n(new B.b7W(v,u))
return A.i(null,w)}})
return A.j($async$JF,w)},
JD(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JD=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.RV(u),$async$JD)
case 2:if(v.c!=null)v.n(new B.b7V(v,u))
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
if(w.d==="video"&&r.y){if(x!=null)x=B.bSY(o.e,!1,C.K8)
else{x=A.oE(D.r,q,A.c(B.bH4(w.e),q,q,q,q,C.aps,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,C.anE,q,q,q)
x=A.cH(A.M(A.b([x,D.p,w,D.k,A.c(r.w?B.bGb(r.ax):A.a(p),q,q,q,q,C.tJ,q,q,q)],y.p),D.o,D.e,D.U),q,q)}x=A.NY(0,x)
o=A.jl(q,A.fk(A.Q(12),B.bSY(o.d,!0,C.K8),D.ar),160,q,q,16,16,110)
w=r.w
v=B.bGb(r.ax)
u=r.z
t=r.Q
u=A.fx(D.bh,A.b([x,o,A.jl(24,B.bUH(r.as,v,w,!0,t,u,r.ga4v(),r.ga4u(),r.ga4w(),r.ga4x(),r.gaaI()),q,q,0,0,q,q)],y.p),D.f,D.bm,q)
o=u}else{o=A.oE(D.r,q,A.c(B.bH4(w.e),q,q,q,q,C.Mh,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,C.M7,D.a2,q,q)
if(r.w)w=B.bGb(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,C.tJ,q,q,q)
v=r.w
u=B.bGb(r.ax)
t=r.z
s=r.Q
t=A.cH(A.M(A.b([o,D.ay,new A.a_(C.xw,x,q),D.k,w,C.Lz,B.bUH(r.as,u,v,!1,s,t,r.ga4v(),r.ga4u(),r.ga4w(),r.ga4x(),r.gaaI())],y.p),D.o,D.e,D.U),q,q)
o=t}return A.bSG(!1,A.eO(q,D.n,A.fK(!0,o,!0,D.ai,!0,!0),q,q),new B.b8e(r),y.K)}}
B.aah.prototype={
B(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,C.aot,u,u,u))
if(r&&v.c)s.push(D.p)
r=v.f
x=r?C.Z0:C.Z_
t=A.b([new B.w8(x,r,A.a("Muet"),v.x,u,u),C.nC,new B.w8(C.Za,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(C.nC)
if(r){x=v.w
w=x?C.yl:C.Z9
t.push(new B.w8(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(C.nC)
if(r)t.push(new B.w8(C.Z8,!1,A.a("Basculer"),v.Q,u,u))
t.push(C.nC)
t.push(new B.w8(C.yg,!1,A.a("Raccrocher"),v.as,D.k9,u))
s.push(A.Y(t,D.o,D.bD,D.i,u))
return A.M(s,D.o,D.e,D.U)}}
B.w8.prototype={
B(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?D.l:D.ll
if(!t)x=D.l
else x=w.d?D.n:D.l
t=A.dk(u,v,v,D.ai,D.cg,v)
return A.M(A.b([A.ab(A.b5(!1,A.c7(w.c,x,v,26),D.j,v,D.q,v,v,v,v,w.f,v,t),56,56),D.b3,A.c(w.e,v,v,v,v,D.aou,v,v,v)],y.p),D.o,D.e,D.U)}}
B.aN9.prototype={
tX(d,e){return this.b4Z(d,e)},
b4Z(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tX=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.iJ(0),$async$tX)
case 2:x=3
return A.e(v.e.iJ(0),$async$tX)
case 3:u=$.bZV()
if(e){t=y.N
t=A.a9(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aDO().BH(0,A.a9(["audio",!0,"video",t],s,r)),$async$tX)
case 4:q=v.b=g
o.sa2G(0,q)
x=5
return A.e(u.YO(d,A.C(s,r)),$async$tX)
case 5:p=v.a=g
x=6
return A.e(p.kg(0,q),$async$tX)
case 6:p.e=new B.aNa(v)
p.Q=new B.aNb(v)
p.d=new B.aNc(v)
return A.i(null,w)}})
return A.j($async$tX,w)},
azM(d){var x,w=this
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
zq(d){return this.aXS(d)},
aXS(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$zq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BY(0,new B.zR(d.h(0,"sdp"),d.h(0,"type"))),$async$zq)
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
No(d){return this.aV3(d)},
aV3(d){var x=0,w=A.k(y.H),v=this,u
var $async$No=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BY(0,new B.zR(d.h(0,"sdp"),d.h(0,"type"))),$async$No)
case 2:return A.i(null,w)}})
return A.j($async$No,w)},
Nj(d){return this.aUQ(d)},
aUQ(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Nj=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.N9(new B.EU(A.aR(d.h(0,"candidate")),A.aR(d.h(0,"sdpMid")),A.e8(d.h(0,"sdpMLineIndex")))),$async$Nj)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nj,w)},
RY(d){return this.anJ(d)},
anJ(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$RY=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Ru(0)
if(r==null)r=D.dk
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.K)(r),++s)r[s].skk(0,t)
return A.i(null,w)}})
return A.j($async$RY,w)},
ID(d){return this.anz(d)},
anz(d){var x=0,w=A.k(y.H)
var $async$ID=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGu(d),$async$ID)
case 2:return A.i(null,w)}})
return A.j($async$ID,w)},
RV(d){return this.anr(d)},
anr(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$RV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Im(0)
if(s==null)s=D.dk
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.K)(s),++t)s[t].skk(0,d)
return A.i(null,w)}})
return A.j($async$RV,w)},
Nr(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Nr=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Im(0)
if(s==null)s=C.a9S
if(s.length===0){x=1
break}x=3
return A.e(B.bKb(D.b.gT(s)),$async$Nr)
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
q=o}if(q==null)q=D.dk
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c1Z(r)
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
case 14:case 9:q.length===o||(0,A.K)(q),++l
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
B.a04.prototype={
NI(d){return this.aWi(d)},
aWi(d){var x=0,w=A.k(y.H),v=this
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
q=B.c25(B.bJg(A.cI(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Cq)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cE(p,A.u(p).i("cE<1>")).aS(s.gaNN(),!0,s.gaMV(),new B.aqP(s))
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
aNO(d){var x,w,v,u
try{x=D.a_.cR(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bTu(w))}catch(u){}},
VN(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=C.a6a[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.d9(A.dp(0,0,0,0,x),new B.aqQ(w))},
FR(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$FR=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
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
r=s.w=new B.ajh(s,q)}s=r.a8(0)}x=7
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
B.aIA.prototype={
YO(d,e){return this.aXJ(d,e)},
aXJ(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
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
v=B.c7X(D.d9.glR().bx(new A.eK(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$YO,w)}}
B.ms.prototype={
Ru(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dg(w,A.X(w).i("dg<1,aA>"))
J.h1(w,new B.aE1(x))
return x},
Im(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dg(w,A.X(w).i("dg<1,aA>"))
J.h1(w,new B.aE2(x))
return x}}
B.a3N.prototype={
au0(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aDZ(x)))
w.addEventListener("mute",A.bV(new B.aE_(x)))
w.addEventListener("unmute",A.bV(new B.aE0(x)))},
skk(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aDO.prototype={
BH(d,e){return this.amA(0,e)},
amA(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$BH=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cip())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iv(e.h(0,"video"),"facingMode")
e.cm(0,"video",new B.aDQ())
e.cm(0,"audio",new B.aDR())}catch(a0){A.n6("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hV(e.h(0,"audio"),i,i).aP(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h1(s,new B.aDS(r))
J.iv(e.h(0,"audio"),"optional")
J.j_(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
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
v=new B.ms(i,h,"local")
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
v=new B.ms(h,g,"local")
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
B.a5q.prototype={
au5(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aID(x)))
w.addEventListener("icecandidate",A.bV(new B.aIE(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aIF(x)))
w.onicegatheringstatechange=A.bV(new B.aIG(x))
w.addEventListener("signalingstatechange",A.bV(new B.aIH(x)))
if(!$.bNt())w.addEventListener("connectionstatechange",A.bV(new B.aII(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aIJ(x)))
w.addEventListener("track",A.bV(new B.aIK(x)))},
NU(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NU=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eA(s.createOffer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$NU)
case 3:t=f
v=new B.zR(t.sdp,t.type)
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
v=new B.zR(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NS,w)},
kg(d,e){var x
this.ax.cm(0,e.a,new B.aIC(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cL(null,y.H)},
BW(d,e){return this.anD(0,e)},
anD(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BW=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eA(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BW)
case 2:return A.i(null,w)}})
return A.j($async$BW,w)},
BY(d,e){return this.anU(0,e)},
anU(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BY=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eA(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BY)
case 2:return A.i(null,w)}})
return A.j($async$BY,w)},
N9(d){return this.aUx(d)},
aUx(d){var x=0,w=A.k(y.H),v=this,u,t
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
v=A.cL(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a8,w)}}
B.bL0.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.Og.prototype={
sajg(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Gg()
if(x!=null)x.style.objectFit=e},
adp(){var x=this,w=x.Gg(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sm(0,v.agb(u,x.z!=null,0,t))},
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
x=t.aB5()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Gg()
if(u!=null){u.srcObject=t.x
x=t.Gg()
x.toString
t.a4k(x)}t.sm(0,t.a.aWG(t.z!=null))},
aB5(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
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
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.K)(t),++r)t[r].Y(0)
q=u.Gg()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.e8()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
iJ(d){var x=0,w=A.k(y.H),v=this
var $async$iJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.IL()
$.q6().u1("RTCVideoRenderer-"+v.Q,new B.aIQ(v),!0)
return A.i(null,w)}})
return A.j($async$iJ,w)},
a4k(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Oi.prototype={
N(){return new B.Oj()}}
B.Oj.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a6(0,v.gaL7())
x=v.a
w=x.c
w.as=x.e
w.sajg(0,x.d===C.K7?"contain":"cover")},
aL8(){if(this.c!=null)this.n(new B.aIR())},
k(){if(this.c!=null)this.a4()},
aT(d){var x,w
this.bb(d)
A.d9(A.dp(0,0,10,0,0),new B.aIT(this))
x=this.a
w=x.c
w.sajg(0,x.d===C.K7?"contain":"cover")},
B(d){return new A.ls(new B.aIS(this),null)}}
B.a2i.prototype={
atS(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.bi()
x.a=new B.TP(d,x,new A.b3(new A.ax(w,y.c),y.r),e,g.i("TP<0>"))
if(f.a.ghU())f.a=new B.PH(g.i("@<0>").bT(g).i("PH<1,2>")).iF(f.a)
w=A.fL(null,new B.axw(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
aa3(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a8(0)}}
B.TP.prototype={
D(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d_(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aDs(d,e)},
jG(d){return this.d_(d,null)},
aDs(d,e){var x=this
if(x.w){x.a.a.d_(d,e)
return}x.c.fi(d,e)
x.aa4()
x.b.aa3()
x.a.a.a8(0).h3(new B.bd3())},
a8(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aa3()
x.c.cL(0,x.a.a.a8(0))}return x.c.a},
aa4(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dN(0)
return},
$idD:1}
B.a7A.prototype={}
B.a7B.prototype={}
B.xn.prototype={
a5u(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.CG(d,e))
x.a8(0)},
a2h(d){var x
if((this.b.b&4)!==0)throw A.n(B.bLB())
x=A.bR(d)
x.toString
this.a.send(x)},
vD(d,e,f){return this.aW3(0,e,f)},
aW3(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vD=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bLB())
u.a8(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vD,w)},
$ibLA:1}
B.rS.prototype={}
B.G1.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.G1&&e.a===this.a},
gH(d){return D.c.gH(this.a)}}
B.Ch.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Ch&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fH(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.CG.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.CG&&e.a===this.a&&e.b===this.b},
gH(d){return A.fH([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gu.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Gt.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.amg.prototype={
atJ(d){d.ey(new B.amk(this),new B.aml(this),y.a)}}
B.ajh.prototype={
a8(d){var x=this.b
x.e=x.d=null
return this.apu(0)}}
B.a8F.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vq.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Od.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vp.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mD.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a5r.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aIz.prototype={}
B.MP.prototype={}
B.Ef.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aDN.prototype={}
B.EU.prototype={}
B.Oe.prototype={}
B.aIL.prototype={}
B.zR.prototype={}
B.Of.prototype={}
B.Oh.prototype={
agb(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Oh(x,w,v)},
aWG(d){return this.agb(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","y1(F)","~(FE)","bn(EU)","bn(Of)","bn(mD)","~(@)","ms(@)","ms()","bn(bLA)","~(rS)"])
B.aNK.prototype={
$0(){return J.c1o(this.a.bk())},
$S:1}
B.aNL.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.d_(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.ao_.prototype={
$1(d){if(d==null)return null
return A.c3(J.l(d))},
$S:128}
B.b8o.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.E4(!0)},
$S:0}
B.b8p.prototype={
$1(d){return this.a.N_()},
$S:39}
B.b8l.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bG()},
$S:0}
B.b8m.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b8i.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8j.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b8k.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8f.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b8g.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b8h.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bQy(x.w,w,u,!1,v)},
$S:z+2}
B.b8n.prototype={
$0(){return this.a.aNZ()},
$S:0}
B.b8_.prototype={
$1(d){this.a.y_("candidat_ice",d,!1)},
$S:375}
B.b80.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b7Z())},
$S:0}
B.b7Z.prototype={
$0(){},
$S:0}
B.b81.prototype={
$0(){this.a.mo(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b82.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b83.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.y_("annule",D.fl,!1)
x.mo(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b84.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b7Y(x,w))},
$S:39}
B.b7Y.prototype={
$0(){return this.a.ax=new A.av(Date.now(),0,!1).eG(this.b)},
$S:0}
B.b85.prototype={
$1(d){},
$S:131}
B.b86.prototype={
$1(d){this.a.Dw()},
$S:39}
B.b88.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.aaq()
x.a6S("reponse",d)},
$S:376}
B.b89.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b8a.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.aaq()},
$S:28}
B.b8b.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b8c.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a6S("offre",d)},
$S:376}
B.b8d.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b87.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.av(Date.now(),0,!1)
x.ax=D.V},
$S:0}
B.b7X.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b7W.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b7V.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b8e.prototype={
$2(d,e){if(!d)this.a.E0()},
$S:937}
B.aNa.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a9(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aNb.prototype={
$1(d){var x=d.b,w=x.length!==0?D.b.gT(x):null
if(w!=null)this.a.azM(w)},
$S:z+5}
B.aNc.prototype={
$1(d){var x
if(d===C.JZ){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.aqP.prototype={
$1(d){return this.a.VN()},
$S:21}
B.aqQ.prototype={
$0(){var x=this.a
if(!x.e)x.Cq()},
$S:0}
B.bH5.prototype={
$1(d){return d.length!==0},
$S:12}
B.aE1.prototype={
$1(d){return this.a.push(B.bKu(d))},
$S:21}
B.aE2.prototype={
$1(d){return this.a.push(B.bKu(d))},
$S:21}
B.aDZ.prototype={
$1(d){},
$S:22}
B.aE_.prototype={
$1(d){},
$S:22}
B.aE0.prototype={
$1(d){},
$S:22}
B.aDQ.prototype={
$0(){return!1},
$S:45}
B.aDR.prototype={
$0(){return!1},
$S:45}
B.aDS.prototype={
$1(d){J.h1(d,new B.aDP(this.a))},
$S:375}
B.aDP.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:48}
B.aID.prototype={
$1(d){},
$S:22}
B.aIE.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.EU(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aIF.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.chZ(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bNt())switch(w.cx.a){case 0:w.cy=C.K3
break
case 1:w.cy=C.K4
break
case 3:w.cy=C.K5
break
case 5:w.cy=C.K1
break
case 6:w.cy=C.K2
break
case 7:w.cy=C.rF
break
default:break}},
$S:40}
B.aIG.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.ci_(w.iceGatheringState)},
$S:40}
B.aIH.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cjt(w.signalingState)},
$S:40}
B.aII.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cj4(w.connectionState)},
$S:40}
B.aIJ.prototype={
$1(d){},
$S:40}
B.aIK.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bKu(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dg(x,A.X(x).i("dg<1,aA>"))
w=J.eS(x,new B.aIB(w),y.h)
v.$1(new B.Of(A.I(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aIB.prototype={
$1(d){return new B.ms(d,d.id,this.a.as)},
$S:z+8}
B.aIC.prototype={
$0(){var x=this.b.e
return new B.ms(x,x.id,this.a.as)},
$S:z+9}
B.bHd.prototype={
$1(d){return J.fN(self.window.navigator.userAgent,A.bJ(d,!1,!1))},
$S:12}
B.aIQ.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.K)(w),++u)w[u].Y(0)
D.b.Z(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a4k(t)
v=y.i.c
w.push(A.hH(t,"canplay",new B.aIM(x),!1,v))
w.push(A.hH(t,"resize",new B.aIN(x),!1,v))
w.push(A.hH(t,"error",new B.aIO(t),!1,v))
w.push(A.hH(t,"ended",new B.aIP(),!1,v))
return t},
$S:224}
B.aIM.prototype={
$1(d){this.a.adp()},
$S:21}
B.aIN.prototype={
$1(d){this.a.adp()},
$S:21}
B.aIO.prototype={
$1(d){var x,w,v=this.a.error
A.n6("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=D.Ft.h(0,A.am(v,"code"))
x.toString
w=!J.q(A.am(v,"message"),"")?A.am(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pe(x,D.Fs.h(0,A.am(v,"code")),w,null))},
$S:41}
B.aIP.prototype={
$1(d){},
$S:21}
B.aIR.prototype={
$0(){},
$S:0}
B.aIT.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aIS.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a2z("RTCVideoRenderer-"+w.Q)
else w=A.T(x,x,D.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cH(A.T(x,w,D.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:938}
B.axw.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eM(w.ghB(w),new B.axv(v),w.gno())},
$S:0}
B.axv.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aa4()
x=x.b
x===$&&A.d()
x.a8(0)},
$S:0}
B.bd3.prototype={
$1(d){},
$S:19}
B.apK.prototype={
$1(d){this.a.cL(0,this.b)},
$S:22}
B.apL.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hj(new B.Gu("Failed to connect WebSocket"))
else this.b.a5u(1006,"error")},
$S:22}
B.apM.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cu("data")
if(typeof x==="string")w.b=new B.G1(A.bC(x))
else if(typeof x==="object"&&A.c62(y.m.a(x),"ArrayBuffer"))w.b=new B.Ch(A.a4a(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.az(x).j(0)))
v.D(0,w.bk())},
$S:41}
B.apN.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cL(0,this.b)
this.b.a5u(d.code,d.reason)},
$S:22}
B.amk.prototype={
$1(d){var x=d.b,w=this.a
new A.cE(x,A.u(x).i("cE<1>")).cU(new B.amh(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cE(x,A.u(x).i("cE<1>")).b2b(new B.ami(d),new B.amj(w,d))
w.f.dN(0)},
$S:z+10}
B.amh.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.G1
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.Ch
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.CG){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a8(0)}}},
$S:z+11}
B.ami.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.bLB())
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
if(t){this.a.a2h(new Uint8Array(A.d_(u)))
break $label1$1}t=A.aL("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Gt))throw r}},
$S:17}
B.amj.prototype={
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
if(!(A.O(q) instanceof B.Gt))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.aml.prototype={
$1(d){var x,w=d instanceof A.QG?d:new B.a8F(J.l(d)),v=this.a
v.f.hj(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.jG(w)
v=v.a
v===$&&A.d()
v.a8(0)},
$S:40};(function aliases(){var x=B.D1.prototype
x.apu=x.a8})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.T_.prototype,"gauK","Jn",0)
var v
w(v=B.SZ.prototype,"gaSR","adg",3)
x(v,"gaaI","E0",0)
x(v,"ga4x","JG",0)
x(v,"ga4w","JF",0)
x(v,"ga4u","JD",0)
x(v,"ga4v","JE",0)
w(v=B.a04.prototype,"gaNN","aNO",7)
x(v,"gaMV","VN",1)
x(B.Og.prototype,"gdD","k",0)
x(B.Oj.prototype,"gaL7","aL8",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a2,[B.D1,B.anZ,B.FE,B.a0k,B.aN9,B.a04,B.aIz,B.MP,B.Ef,B.aDN,B.Oe,B.aIL,B.a7B,B.TP,B.a7A,B.xn,B.rS,B.Gu,B.a8F,B.EU,B.zR,B.Of,B.Oh])
w(B.PH,A.ff)
x(A.jF,[B.aNK,B.b8o,B.b8l,B.b8m,B.b8i,B.b8j,B.b8k,B.b8f,B.b8g,B.b8n,B.b80,B.b7Z,B.b81,B.b82,B.b83,B.b7Y,B.b87,B.b7X,B.b7W,B.b7V,B.aqQ,B.aDQ,B.aDR,B.aIC,B.aIR,B.aIT,B.axw,B.axv,B.amj])
x(A.ie,[B.aNL,B.ao_,B.b8p,B.b8h,B.b8_,B.b84,B.b85,B.b86,B.b88,B.b89,B.b8a,B.b8b,B.b8c,B.b8d,B.aNa,B.aNb,B.aNc,B.aqP,B.bH5,B.aE1,B.aE2,B.aDZ,B.aE_,B.aE0,B.aDS,B.aID,B.aIE,B.aIF,B.aIG,B.aIH,B.aII,B.aIJ,B.aIK,B.aIB,B.bHd,B.aIQ,B.aIM,B.aIN,B.aIO,B.aIP,B.bd3,B.apK,B.apL,B.apM,B.apN,B.amk,B.amh,B.ami,B.aml])
x(A.N,[B.oN,B.y1,B.Oi])
x(A.U,[B.T_,B.SZ,B.Oj])
x(A.at,[B.RG,B.aah,B.w8])
x(A.ql,[B.b8e,B.aDP,B.aIS])
w(B.aIA,B.aIz)
w(B.ms,B.MP)
w(B.a3N,B.Ef)
w(B.aDO,B.aDN)
w(B.a5q,B.Oe)
w(B.bL0,B.aIL)
w(B.Og,A.d4)
x(B.a7B,[B.a2i,B.amg])
x(B.rS,[B.G1,B.Ch,B.CG])
w(B.Gt,B.Gu)
w(B.ajh,B.D1)
x(A.GX,[B.vq,B.Od,B.vp,B.mD,B.a5r])})()
A.od(b.typeUniverse,JSON.parse('{"D1":{"dD":["1"]},"PH":{"ff":["1","2"],"ff.S":"1","ff.T":"2"},"y1":{"N":[],"m":[]},"oN":{"N":[],"m":[]},"T_":{"U":["oN"]},"RG":{"at":[],"m":[]},"SZ":{"U":["y1"]},"aah":{"at":[],"m":[]},"w8":{"at":[],"m":[]},"ms":{"MP":[]},"a3N":{"Ef":[]},"a5q":{"Oe":[]},"Og":{"d4":["Oh"],"aX":[]},"Oi":{"N":[],"m":[]},"Oj":{"U":["Oi"]},"TP":{"dD":["1"]},"xn":{"bLA":[]},"G1":{"rS":[]},"Ch":{"rS":[]},"CG":{"rS":[]},"Gu":{"bM":[]},"Gt":{"bM":[]},"ajh":{"dD":["@"]},"a8F":{"bM":[]}}'))
A.bM2(b.typeUniverse,JSON.parse('{"D1":1,"a7B":1}'))
var y=(function rtii(){var x=A.au
return{b:x("xn"),L:x("bM"),_:x("as<@>"),x:x("as<~>"),S:x("E<af<o,J>>"),t:x("E<af<o,@>>"),Q:x("E<Ef>"),d:x("E<im<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aA"),l:x("L<aA>"),F:x("L<af<o,@>>"),j:x("L<@>"),I:x("L<w>"),P:x("af<o,@>"),f:x("af<@,@>"),E:x("MP"),G:x("Ef"),h:x("ms"),o:x("pa"),a:x("bn"),K:x("a2"),J:x("Oe"),v:x("zR"),Z:x("a7A<a2?>"),N:x("o"),e:x("pE"),M:x("e7"),D:x("rS"),U:x("Z<o>"),g:x("es<FE>"),n:x("es<~>"),V:x("b3<xn>"),r:x("b3<@>"),R:x("b3<~>"),i:x("T9<aA>"),C:x("o7<aA>"),k:x("ax<xn>"),c:x("ax<@>"),W:x("ax<~>"),q:x("kf"),y:x("J"),z:x("@"),A:x("aA?"),X:x("a2?"),H:x("~")}})();(function constants(){var x=a.makeConstList
C.TD=new B.a0k(D.k0)
C.xw=new A.ap(32,0,32,0)
C.yf=new A.ag(57638,!1)
C.yg=new A.ag(57639,!1)
C.Z_=new A.ag(58337,!1)
C.Z0=new A.ag(58341,!1)
C.Z8=new A.ag(58923,!1)
C.yl=new A.ag(59048,!1)
C.Z9=new A.ag(59049,!1)
C.Za=new A.ag(59077,!1)
C.a6a=A.b(x([1,2,4,8,16]),A.au("E<w>"))
C.a9S=A.b(x([]),y.Q)
C.Tw=new A.H(1,0.9098039215686274,0.9607843137254902,0.9137254901960784,D.t)
C.RW=new A.H(1,0.7843137254901961,0.9019607843137255,0.788235294117647,D.t)
C.Sj=new A.H(1,0.6470588235294118,0.8392156862745098,0.6549019607843137,D.t)
C.SL=new A.H(1,0.5058823529411764,0.7803921568627451,0.5176470588235295,D.t)
C.S4=new A.H(1,0.4,0.7333333333333333,0.41568627450980394,D.t)
C.S5=new A.H(1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.t)
C.Ty=new A.H(1,0.2627450980392157,0.6274509803921569,0.2784313725490196,D.t)
C.SD=new A.H(1,0.2196078431372549,0.5568627450980392,0.23529411764705882,D.t)
C.SQ=new A.H(1,0.1803921568627451,0.49019607843137253,0.19607843137254902,D.t)
C.RN=new A.H(1,0.10588235294117647,0.3686274509803922,0.12549019607843137,D.t)
C.adH=new A.dt([50,C.Tw,100,C.RW,200,C.Sj,300,C.SL,400,C.S4,500,C.S5,600,C.Ty,700,C.SD,800,C.SQ,900,C.RN],A.au("dt<w,H>"))
C.adS=new A.z0(C.adH,1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.t)
C.FG=new A.fF("FlutterWebRTC.Method",D.ba,null)
C.ahc=new B.mD(0,"RTCIceConnectionStateNew")
C.ahd=new B.mD(1,"RTCIceConnectionStateChecking")
C.ahe=new B.mD(2,"RTCIceConnectionStateCompleted")
C.ahf=new B.mD(3,"RTCIceConnectionStateConnected")
C.ahg=new B.mD(4,"RTCIceConnectionStateCount")
C.JZ=new B.mD(5,"RTCIceConnectionStateFailed")
C.ahh=new B.mD(6,"RTCIceConnectionStateDisconnected")
C.K_=new B.mD(7,"RTCIceConnectionStateClosed")
C.K0=new B.Od(0,"RTCIceGatheringStateNew")
C.ahi=new B.Od(1,"RTCIceGatheringStateGathering")
C.ahj=new B.Od(2,"RTCIceGatheringStateComplete")
C.rF=new B.vp(0,"RTCPeerConnectionStateClosed")
C.K1=new B.vp(1,"RTCPeerConnectionStateFailed")
C.K2=new B.vp(2,"RTCPeerConnectionStateDisconnected")
C.K3=new B.vp(3,"RTCPeerConnectionStateNew")
C.K4=new B.vp(4,"RTCPeerConnectionStateConnecting")
C.K5=new B.vp(5,"RTCPeerConnectionStateConnected")
C.ahk=new B.vq(0,"RTCSignalingStateStable")
C.ahl=new B.vq(1,"RTCSignalingStateHaveLocalOffer")
C.ahm=new B.vq(2,"RTCSignalingStateHaveRemoteOffer")
C.ahn=new B.vq(3,"RTCSignalingStateHaveLocalPrAnswer")
C.aho=new B.vq(4,"RTCSignalingStateHaveRemotePrAnswer")
C.K6=new B.vq(5,"RTCSignalingStateClosed")
C.ahp=new B.Oh(0,0,0)
C.K7=new B.a5r(0,"RTCVideoViewObjectFitContain")
C.K8=new B.a5r(1,"RTCVideoViewObjectFitCover")
C.nC=new A.ce(20,null,null,null)
C.akP=new A.ce(48,null,null,null)
C.Lz=new A.ce(null,64,null,null)
C.anE=new A.y(!0,D.l,null,null,null,null,22,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.M7=new A.y(!0,D.l,null,null,null,null,26,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.tJ=new A.y(!0,D.as,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aot=new A.y(!0,D.l,null,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aps=new A.y(!0,D.n,null,null,null,null,32,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.Mh=new A.y(!0,D.n,null,null,null,null,40,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bUy=!1
$.bSX=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cmO","bZV",()=>new B.aIA())
x($,"ckV","bNt",()=>D.c.q(A.am(A.am(A.am(A.bNa(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"KB0S+LWV3EkCBa9mPfqIJj3/FTY=");