((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={D0:function D0(){},PH:function PH(d){this.$ti=d},aNP:function aNP(d){this.a=d},aNQ:function aNQ(d,e){this.a=d
this.b=e},
ZT(d){var x,w,v,u,t,s=new B.ao3(),r=J.N(d),q=r.h(d,"id")
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
return new B.ao2(q,x,w,v,u,t)},
bTB(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.m2(t,y.N,y.z):C.ey
if(u.h(d,"cree_le")!=null)A.c3(J.l(u.h(d,"cree_le")))
return new B.FD(s,x,w,v)},
c3n(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.SP
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.m2(s,u,t))}return new B.a0n(x)},
bGh(d){var x=C.h.b2(d.a,1e6)
return C.c.b0(C.h.j(C.h.b2(x,60)),2,"0")+":"+C.c.b0(C.h.j(C.h.aO(x,60)),2,"0")},
bYn(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oi(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.afH(w,v)},
cgH(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.afK(u,A.jx(w)?w:null,v)},
ao2:function ao2(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
ao3:function ao3(){},
FD:function FD(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a0n:function a0n(d){this.a=d},
bQH(d,e,f,g,h,i){return new B.oN(e,f,i,h,d,null)},
bQG(d,e,f,g,h){return new B.y2(e,h,f,g,d,null)},
bUP(d,e,f,g,h,i,j,k,l,m,n){return new B.aal(g,f,e,i,h,d,m,l,k,j,n,null)},
oN:function oN(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
T1:function T1(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b8s:function b8s(d){this.a=d},
b8t:function b8t(d){this.a=d},
b8p:function b8p(d){this.a=d},
b8q:function b8q(d){this.a=d},
b8m:function b8m(d){this.a=d},
b8n:function b8n(d){this.a=d},
b8o:function b8o(d){this.a=d},
b8j:function b8j(d){this.a=d},
b8k:function b8k(d){this.a=d},
b8l:function b8l(d){this.a=d},
b8r:function b8r(d){this.a=d},
RI:function RI(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
y2:function y2(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
T0:function T0(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b83:function b83(d){this.a=d},
b84:function b84(d){this.a=d},
b82:function b82(){},
b85:function b85(d){this.a=d},
b86:function b86(d){this.a=d},
b87:function b87(d){this.a=d},
b88:function b88(d){this.a=d},
b81:function b81(d,e){this.a=d
this.b=e},
b89:function b89(){},
b8a:function b8a(d){this.a=d},
b8c:function b8c(d){this.a=d},
b8d:function b8d(d){this.a=d},
b8e:function b8e(d){this.a=d},
b8f:function b8f(d){this.a=d},
b8g:function b8g(d){this.a=d},
b8h:function b8h(d){this.a=d},
b8b:function b8b(d){this.a=d},
b80:function b80(d,e){this.a=d
this.b=e},
b8_:function b8_(d,e){this.a=d
this.b=e},
b7Z:function b7Z(d,e){this.a=d
this.b=e},
b8i:function b8i(d){this.a=d},
aal:function aal(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
aNe:function aNe(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aNf:function aNf(d){this.a=d},
aNg:function aNg(d){this.a=d},
aNh:function aNh(d){this.a=d},
a07:function a07(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aqT:function aqT(d){this.a=d},
aqU:function aqU(d){this.a=d},
bHa(d){var x=y.U,w=A.H(new A.Z(A.b(d.split(" "),y.s),new B.bHb(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gS(w),0).toUpperCase()
return(J.p(C.b.gS(w),0)+J.p(C.b.gaG(w),0)).toUpperCase()},
bHb:function bHb(){},
aIE:function aIE(){},
ms:function ms(d,e,f){this.e=d
this.a=e
this.b=f},
aE5:function aE5(d){this.a=d},
aE6:function aE6(d){this.a=d},
bKB(d){var x=new B.a3R(d)
x.au4(d)
return x},
a3R:function a3R(d){this.d=d},
aE2:function aE2(d){this.a=d},
aE3:function aE3(d){this.a=d},
aE4:function aE4(d){this.a=d},
aDS:function aDS(){},
aDU:function aDU(){},
aDV:function aDV(){},
aDW:function aDW(d){this.a=d},
aDT:function aDT(d){this.a=d},
c83(d,e){var x=y.N
x=new B.a5u(d,e,A.C(x,y.E),A.C(x,y.z))
x.au9(d,e)
return x},
a5u:function a5u(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aIH:function aIH(d){this.a=d},
aII:function aII(d){this.a=d},
aIJ:function aIJ(d){this.a=d},
aIK:function aIK(d){this.a=d},
aIL:function aIL(d){this.a=d},
aIM:function aIM(d){this.a=d},
aIN:function aIN(d){this.a=d},
aIO:function aIO(d){this.a=d},
aIF:function aIF(d){this.a=d},
aIG:function aIG(d,e){this.a=d
this.b=e},
bL8:function bL8(d){this.a=d},
ciy(){return C.b.mO(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bHj())!==-1},
bHj:function bHj(){},
bT2(){var x=A.b([],y.d),w=$.bT3
$.bT3=w+1
return new B.Og(w,x,D.agv,$.ae())},
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
aIU:function aIU(d){this.a=d},
aIQ:function aIQ(d){this.a=d},
aIR:function aIR(d){this.a=d},
aIS:function aIS(d){this.a=d},
aIT:function aIT(){},
bT4(d,e,f){return new B.Oi(d,f,e,null)},
Oi:function Oi(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Oj:function Oj(){this.c=this.a=null},
aIV:function aIV(){},
aIX:function aIX(d){this.a=d},
aIW:function aIW(d){this.a=d},
bRf(d,e,f,g){var x,w={}
w.a=d
x=new B.a2m(g.i("a2m<0>"))
x.atW(e,f,w,g)
return x},
a2m:function a2m(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
axA:function axA(d,e){this.a=d
this.b=e},
axz:function axz(d){this.a=d},
TR:function TR(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bd7:function bd7(){},
a7E:function a7E(d){this.b=this.a=$
this.$ti=d},
a7F:function a7F(){},
bJn(d,e){return B.c2G(d,e)},
c2G(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bJn=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nN("ws")&&!d.nN("wss"))throw A.n(A.fj(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xo(r,A.fL(null,null,null,!1,y.D))
u=new A.ax($.aI,y.k)
p=new A.b3(u,y.V)
if(J.q(r.readyState,1))p.cM(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.hj(new B.Gt("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o7(r,"open",!1,y.C).gS(0).aE(new B.apO(p,q),y.H)
t=y.C
s=y.H
new A.o7(r,"error",!1,t).gS(0).aE(new B.apP(p,q),s)
A.hH(r,"message",new B.apQ(q),!1,y.m)
new A.o7(r,"close",!1,t).gS(0).aE(new B.apR(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bJn,w)},
xo:function xo(d,e){this.a=d
this.b=e},
apO:function apO(d,e){this.a=d
this.b=e},
apP:function apP(d,e){this.a=d
this.b=e},
apQ:function apQ(d){this.a=d},
apR:function apR(d,e){this.a=d
this.b=e},
bLJ(){return new B.Gs("Connection Closed")},
rS:function rS(){},
G0:function G0(d){this.a=d},
Cg:function Cg(d){this.a=d},
CF:function CF(d,e){this.a=d
this.b=e},
Gt:function Gt(d){this.a=d},
Gs:function Gs(d){this.a=d},
c2c(d){var x=null,w=$.aI,v=new B.a7E(y.Z),u=y.X,t=A.fL(x,x,x,!0,u),s=A.fL(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bRf(new A.cD(s,r.i("cD<1>")),new A.Bx(t,q.i("Bx<1>")),!0,u)
v.b=B.bRf(new A.cD(t,q.i("cD<1>")),new A.Bx(s,r.i("Bx<1>")),!1,u)
v=new B.amk(new A.b3(new A.ax(w,y.W),y.R),v)
v.atN(d)
return v},
amk:function amk(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
amo:function amo(d){this.a=d},
aml:function aml(d){this.a=d},
amm:function amm(d){this.a=d},
amn:function amn(d,e){this.a=d
this.b=e},
amp:function amp(d){this.a=d},
ajl:function ajl(d,e){this.b=d
this.a=e},
a8J:function a8J(d){this.a=d},
ci7(d){switch(d){case"new":return D.agi
case"checking":return D.agj
case"connected":return D.agl
case"completed":return D.agk
case"failed":return D.JF
case"disconnected":return D.agn
case"closed":return D.JG
case"count":return D.agm}return D.JG},
ci8(d){switch(d){case"new":return D.JH
case"gathering":return D.ago
case"complete":return D.agp}return D.JH},
cjC(d){switch(d){case"stable":return D.agq
case"have-local-offer":return D.agr
case"have-local-pranswer":return D.agt
case"have-remote-offer":return D.ags
case"have-remote-pranswer":return D.agu
case"closed":return D.JN}return D.JN},
cjd(d){switch(d){case"new":return D.JK
case"connecting":return D.JL
case"connected":return D.JM
case"closed":return D.ru
case"disconnected":return D.JJ
case"failed":return D.JI}return D.ru},
vq:function vq(d,e){this.a=d
this.b=e},
Od:function Od(d,e){this.a=d
this.b=e},
vp:function vp(d,e){this.a=d
this.b=e},
mD:function mD(d,e){this.a=d
this.b=e},
a5v:function a5v(d,e){this.a=d
this.b=e},
aID:function aID(){},
MP:function MP(){},
Ee:function Ee(){},
aDR:function aDR(){},
ET:function ET(d,e,f){this.a=d
this.b=e
this.c=f},
Oe:function Oe(){},
aIP:function aIP(){},
zR:function zR(d,e){this.a=d
this.b=e},
Of:function Of(d){this.b=d},
Oh:function Oh(d,e,f){this.a=d
this.b=e
this.c=f},
bKi(d){var x=0,w=A.k(y.y)
var $async$bKi=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bKi,w)},
aGy(d){var x=0,w=A.k(y.H),v
var $async$aGy=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aRS("enableSpeakerphone",A.a9(["enable",d],y.N,v),v,v),$async$aGy)
case 2:return A.i(null,w)}})
return A.j($async$aGy,w)},
aRS(d,e,f,g){return B.caH(d,e,f,g,f.i("0?"))},
caH(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aRS=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aRR(),$async$aRS)
case 3:v=D.Fm.cr(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aRS,w)},
aRR(){var x=0,w=A.k(y.H),v,u
var $async$aRR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bUG?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Fm.cr("initialize",A.a9(["options",A.C(v,u)],v,u),!1,y.H),$async$aRR)
case 4:$.bUG=!0
case 3:return A.i(null,w)}})
return A.j($async$aRR,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[28]
E=c[20]
B.D0.prototype={
D(d,e){this.a.D(0,e)},
d0(d,e){this.a.d0(d,e)},
a8(d){return this.a.a8(0)},
$idC:1}
B.PH.prototype={
iF(d){var x=A.cu("subscription"),w=A.fL(new B.aNP(x),null,null,!0,this.$ti.y[1])
x.b=d.eM(new B.aNQ(this,w),w.glO(w),w.gno())
return new A.cD(w,A.u(w).i("cD<1>"))}}
B.ao2.prototype={}
B.FD.prototype={}
B.a0n.prototype={}
B.oN.prototype={
N(){return new B.T1()}}
B.T1.prototype={
U(){var x=this
x.V()
x.Jy()
x.r=A.d9(C.c_,new B.b8s(x))
x.w=A.k8(C.wR,new B.b8t(x))},
k(){var x=this,w=x.r
if(w!=null)w.Y(0)
w=x.w
if(w!=null)w.Y(0)
w=x.x
if(w!=null)w.Y(0)
x.a4()},
VY(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.d9(C.fP,new B.b8p(this))},
N1(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$N1=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.zV(p.c),$async$N1)
case 7:r=e
q=B.ZT(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b8q(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
s.VY()}u=2
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
return A.j($async$N1,w)},
Jy(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Jy=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.zV(o.c),$async$Jy)
case 7:r=e
q=B.ZT(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaj7()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b8m(s))
s.VY()
x=1
break}s.n(new B.b8n(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b8o(s))
s.VY()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jy,w)},
Jo(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Jo=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b8j(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.ZC(q.c,"accepte"),$async$Jo)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b8k(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.C(A.B(null,null,null,null,null,C.f,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
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
A.aa(q,!1).wL(A.e1(new B.b8l(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jo,w)},
E4(d){return this.aO8(d)},
aO7(){return this.E4(!1)},
aO8(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
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
return A.e(q.ZC(r.c,"refuse"),$async$E4)
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
r=A.oE(C.n,s,A.c(B.bHa(r.d),s,s,s,s,D.LZ,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.LN,C.a0,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.av,new A.a_(D.xb,x,s),C.k,A.c(q,s,s,s,s,D.tv,s,s,s),D.Ld],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b8r(t)
v=A.a("Accepter")
u=t.f?s:t.gauO()
q.push(A.Y(A.b([new B.RI(D.xW,C.aB,r,x,s),D.ajV,new B.RI(D.xV,C.cu,v,u,s)],w),C.p,C.bx,C.i,s))}if(t.d)q.push(C.vH)
return A.eG(s,C.o,A.fv(!0,A.cI(A.L(q,C.p,C.e,C.T),s,s),!0,C.ai,!0,!0),s,s)}}
B.RI.prototype={
B(d){var x=this,w=null,v=A.di(x.d,w,w,C.ai,C.cg,w)
return A.L(A.b([A.ab(A.b5(!1,A.c7(x.c,C.l,w,32),C.j,w,C.r,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e1,w,w,w)],y.p),C.p,C.e,C.T)}}
B.y2.prototype={
N(){return new B.T0(A.b_(y.N),C.U)}}
B.T0.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bT2()
w=B.bT2()
v.d!==$&&A.bi()
v.d=new B.aNe(x,w)
v.a.toString
x=new B.a07(new A.es(u,u,y.g),new A.es(u,u,y.n))
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
w.FS()
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
q=B.ZT(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mo(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.Oz(),$async$uP)
case 8:p=e
o=B.c3n(p)
x=9
return A.e(s.T0(),$async$uP)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.C(A.B(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mo(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.tX(A.a9(["iceServers",o.a],y.N,y.z),k==="video"),$async$uP)
case 10:m.f=new B.b83(s)
m.r=new B.b84(s)
m.w=new B.b85(s)
if(s.c==null){x=1
break}s.n(new B.b86(s))
s.ch=A.d9(C.c_,new B.b87(s))
s.CW=A.k8(C.cV,new B.b88(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cO(k,A.u(k).i("cO<1>")).cV(s.gaSV())
k=m.w
s.cy=new A.cO(k,A.u(k).i("cO<1>")).cV(new B.b89())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.NK(C.c.QN("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f9(C.c9,n,C.aj,!0))}s.ay=A.k8(C.fP,new B.b8a(s))
s.Dv()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.C(A.B(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mo(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uP,w)},
T0(){var x=0,w=A.k(y.y),v
var $async$T0=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$T0,w)},
Dv(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Dv=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.bV("/messagerie/appels/"+p.c+"/signaux"),$async$Dv)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gK(p)
s.adk(B.bTB(q))}u=2
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
return A.j($async$Dv,w)},
adk(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bYn(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.zq(A.a9(["sdp",v.a,"type",v.b],y.N,y.z)).aE(new B.b8c(s),y.a).h2(new B.b8d(s))
break
case"reponse":if(!s.a.f)return
u=B.bYn(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.Nq(A.a9(["sdp",u.a,"type",u.b],y.N,y.z)).aE(new B.b8e(s),y.a).h2(new B.b8f(s))
break
case"candidat_ice":t=B.cgH(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.Nl(A.a9(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.FL().aE(new B.b8g(s),y.a).h2(new B.b8h(s))
break
case"refuse":s.mo(A.a("Appel refus\xe9"))
break
case"annule":s.mo(A.a("Appel annul\xe9"))
break
case"termine":s.mo(A.a("Appel termin\xe9"))
break}},
aau(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.Y(0)
w.n(new B.b8b(w))},
y_(d,e,f){return this.aBs(d,e,f)},
a6V(d,e){return this.y_(d,e,!0)},
aBs(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$y_=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.ahb(s.c,e,d),$async$y_)
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
return A.e(q.ZC(r.c,"termine"),$async$E0)
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
if(d!=null&&w.c!=null)w.c.u(y.q).f.C(A.B(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.aa(x,!1).bG()},
JH(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JH=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.S0(u),$async$JH)
case 2:if(v.c!=null)v.n(new B.b80(v,u))
return A.i(null,w)}})
return A.j($async$JH,w)},
JG(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JG=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.IE(u),$async$JG)
case 2:if(v.c!=null)v.n(new B.b8_(v,u))
return A.i(null,w)}})
return A.j($async$JG,w)},
JE(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JE=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.RY(u),$async$JE)
case 2:if(v.c!=null)v.n(new B.b7Z(v,u))
return A.i(null,w)}})
return A.j($async$JE,w)},
JF(){var x=0,w=A.k(y.H),v=this,u
var $async$JF=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.Nt(),$async$JF)
case 2:return A.i(null,w)}})
return A.j($async$JF,w)},
B(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bT4(o.e,!1,D.JP)
else{x=A.oE(C.n,q,A.c(B.bHa(w.e),q,q,q,q,D.aon,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.amH,q,q,q)
x=A.cI(A.L(A.b([x,C.q,w,C.k,A.c(r.w?B.bGh(r.ax):A.a(p),q,q,q,q,D.tv,q,q,q)],y.p),C.p,C.e,C.T),q,q)}x=A.NY(0,x)
o=A.jk(q,A.fk(A.P(12),B.bT4(o.d,!0,D.JP),C.ar),160,q,q,16,16,110)
w=r.w
v=B.bGh(r.ax)
u=r.z
t=r.Q
u=A.fy(C.bi,A.b([x,o,A.jk(24,B.bUP(r.as,v,w,!0,t,u,r.ga4z(),r.ga4y(),r.ga4A(),r.ga4B(),r.gaaM()),q,q,0,0,q,q)],y.p),C.f,C.bm,q)
o=u}else{o=A.oE(C.n,q,A.c(B.bHa(w.e),q,q,q,q,D.LZ,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.LN,C.a0,q,q)
if(r.w)w=B.bGh(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.tv,q,q,q)
v=r.w
u=B.bGh(r.ax)
t=r.z
s=r.Q
t=A.cI(A.L(A.b([o,C.av,new A.a_(D.xb,x,q),C.k,w,D.Ld,B.bUP(r.as,u,v,!1,s,t,r.ga4z(),r.ga4y(),r.ga4A(),r.ga4B(),r.gaaM())],y.p),C.p,C.e,C.T),q,q)
o=t}return A.bL1(!1,A.eG(q,C.o,A.fv(!0,o,!0,C.ai,!0,!0),q,q),new B.b8i(r),y.K)}}
B.aal.prototype={
B(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.LU,u,u,u))
if(r&&v.c)s.push(C.q)
r=v.f
x=r?D.Yd:D.Yc
t=A.b([new B.w8(x,r,A.a("Muet"),v.x,u,u),D.ny,new B.w8(D.Yn,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.ny)
if(r){x=v.w
w=x?D.y0:D.Ym
t.push(new B.w8(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.ny)
if(r)t.push(new B.w8(D.Yl,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.ny)
t.push(new B.w8(D.xW,!1,A.a("Raccrocher"),v.as,C.aB,u))
s.push(A.Y(t,C.p,C.bx,C.i,u))
return A.L(s,C.p,C.e,C.T)}}
B.w8.prototype={
B(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.le
if(!t)x=C.l
else x=w.d?C.o:C.l
t=A.di(u,v,v,C.ai,C.cg,v)
return A.L(A.b([A.ab(A.b5(!1,A.c7(w.c,x,v,26),C.j,v,C.r,v,v,v,v,w.f,v,t),56,56),C.b3,A.c(w.e,v,v,v,v,C.anr,v,v,v)],y.p),C.p,C.e,C.T)}}
B.aNe.prototype={
tX(d,e){return this.b54(d,e)},
b54(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tX=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.iJ(0),$async$tX)
case 2:x=3
return A.e(v.e.iJ(0),$async$tX)
case 3:u=$.c_2()
if(e){t=y.N
t=A.a9(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aDS().BH(0,A.a9(["audio",!0,"video",t],s,r)),$async$tX)
case 4:q=v.b=g
o.sa2K(0,q)
x=5
return A.e(u.YR(d,A.C(s,r)),$async$tX)
case 5:p=v.a=g
x=6
return A.e(p.kg(0,q),$async$tX)
case 6:p.e=new B.aNf(v)
p.Q=new B.aNg(v)
p.d=new B.aNh(v)
return A.i(null,w)}})
return A.j($async$tX,w)},
azV(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa2K(0,d)
x=w.r
if(x!=null)x.$0()}},
FL(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$FL=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.NW(0),$async$FL)
case 3:t=e
x=4
return A.e(s.BW(0,t),$async$FL)
case 4:v=A.a9(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$FL,w)},
zq(d){return this.aXY(d)},
aXY(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$zq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BY(0,new B.zR(d.h(0,"sdp"),d.h(0,"type"))),$async$zq)
case 3:x=4
return A.e(s.NU(0),$async$zq)
case 4:t=f
x=5
return A.e(s.BW(0,t),$async$zq)
case 5:v=A.a9(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$zq,w)},
Nq(d){return this.aV8(d)},
aV8(d){var x=0,w=A.k(y.H),v=this,u
var $async$Nq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BY(0,new B.zR(d.h(0,"sdp"),d.h(0,"type"))),$async$Nq)
case 2:return A.i(null,w)}})
return A.j($async$Nq,w)},
Nl(d){return this.aUV(d)},
aUV(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Nl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Nb(new B.ET(A.aR(d.h(0,"candidate")),A.aR(d.h(0,"sdpMid")),A.e8(d.h(0,"sdpMLineIndex")))),$async$Nl)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nl,w)},
S0(d){return this.anN(d)},
anN(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$S0=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Rx(0)
if(r==null)r=C.dh
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.K)(r),++s)r[s].skk(0,t)
return A.i(null,w)}})
return A.j($async$S0,w)},
IE(d){return this.anD(d)},
anD(d){var x=0,w=A.k(y.H)
var $async$IE=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGy(d),$async$IE)
case 2:return A.i(null,w)}})
return A.j($async$IE,w)},
RY(d){return this.anv(d)},
anv(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$RY=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.In(0)
if(s==null)s=C.dh
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.K)(s),++t)s[t].skk(0,d)
return A.i(null,w)}})
return A.j($async$RY,w)},
Nt(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Nt=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.In(0)
if(s==null)s=D.a93
if(s.length===0){x=1
break}x=3
return A.e(B.bKi(C.b.gS(s)),$async$Nt)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nt,w)},
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
else{o=A.H(q.Rx(0),!0,y.G)
C.b.t(o,q.In(0))
q=o}if(q==null)q=C.dh
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c26(r)
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
B.a07.prototype={
NK(d){return this.aWo(d)},
aWo(d){var x=0,w=A.k(y.H),v=this
var $async$NK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Cq(),$async$NK)
case 2:return A.i(null,w)}})
return A.j($async$NK,w)},
Cq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Cq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c2c(B.bJn(A.cG(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Cq)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cD(p,A.u(p).i("cD<1>")).aS(s.gaNW(),!0,s.gaN3(),new B.aqT(s))
u=2
x=6
break
case 4:u=3
n=t
s.VP()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cq,w)},
aNX(d){var x,w,v,u
try{x=C.Y.cP(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bTB(w))}catch(u){}},
VP(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a5o[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.d9(A.dp(0,0,0,0,x),new B.aqU(w))},
FS(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$FS=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.dJ(s,y.H),$async$FS)
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
r=s.w=new B.ajl(s,q)}s=r.a8(0)}x=7
return A.e(y._.b(s)?s:A.dJ(s,y.z),$async$FS)
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
return A.j($async$FS,w)}}
B.aIE.prototype={
YR(d,e){return this.aXP(d,e)},
aXP(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$YR=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a9(["mandatory",A.C(r,r),"optional",A.b([A.a9(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fo(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bR(t)))
t=J.l(s)
v=B.c83(C.d9.glR().bx(new A.eL(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$YR,w)}}
B.ms.prototype={
Rx(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dg(w,A.X(w).i("dg<1,aA>"))
J.h1(w,new B.aE5(x))
return x},
In(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dg(w,A.X(w).i("dg<1,aA>"))
J.h1(w,new B.aE6(x))
return x}}
B.a3R.prototype={
au4(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aE2(x)))
w.addEventListener("mute",A.bV(new B.aE3(x)))
w.addEventListener("unmute",A.bV(new B.aE4(x)))},
skk(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aDS.prototype={
BH(d,e){return this.amE(0,e)},
amE(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$BH=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.ciy())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iv(e.h(0,"video"),"facingMode")
e.cm(0,"video",new B.aDU())
e.cm(0,"audio",new B.aDV())}catch(a0){A.n6("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hV(e.h(0,"audio"),i,i).aP(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h1(s,new B.aDW(r))
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
B.a5u.prototype={
au9(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aIH(x)))
w.addEventListener("icecandidate",A.bV(new B.aII(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aIJ(x)))
w.onicegatheringstatechange=A.bV(new B.aIK(x))
w.addEventListener("signalingstatechange",A.bV(new B.aIL(x)))
if(!$.bNB())w.addEventListener("connectionstatechange",A.bV(new B.aIM(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aIN(x)))
w.addEventListener("track",A.bV(new B.aIO(x)))},
NW(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NW=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eA(s.createOffer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$NW)
case 3:t=f
v=new B.zR(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NW,w)},
NU(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NU=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eA(s.createAnswer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$NU)
case 3:t=f
v=new B.zR(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NU,w)},
kg(d,e){var x
this.ax.cm(0,e.a,new B.aIG(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cL(null,y.H)},
BW(d,e){return this.anH(0,e)},
anH(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BW=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eA(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BW)
case 2:return A.i(null,w)}})
return A.j($async$BW,w)},
BY(d,e){return this.anY(0,e)},
anY(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BY=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eA(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BY)
case 2:return A.i(null,w)}})
return A.j($async$BY,w)},
Nb(d){return this.aUC(d)},
aUC(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Nb=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eA(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Nb)
case 2:return A.i(null,w)}})
return A.j($async$Nb,w)},
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
B.bL8.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.Og.prototype={
sajk(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Gh()
if(x!=null)x.style.objectFit=e},
adt(){var x=this,w=x.Gh(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sm(0,v.agf(u,x.z!=null,0,t))},
sa2K(d,e){var x,w,v,u,t=this
t.z=e
if(e.In(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.X(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.Rx(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.X(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aBg()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Gh()
if(u!=null){u.srcObject=t.x
x=t.Gh()
x.toString
t.a4o(x)}t.sm(0,t.a.aWM(t.z!=null))},
aBg(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Gh(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.K)(t),++r)t[r].Y(0)
q=u.Gh()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.e9()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
iJ(d){var x=0,w=A.k(y.H),v=this
var $async$iJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.IK()
$.q6().u1("RTCVideoRenderer-"+v.Q,new B.aIU(v),!0)
return A.i(null,w)}})
return A.j($async$iJ,w)},
a4o(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Oi.prototype={
N(){return new B.Oj()}}
B.Oj.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a6(0,v.gaLf())
x=v.a
w=x.c
w.as=x.e
w.sajk(0,x.d===D.JO?"contain":"cover")},
aLg(){if(this.c!=null)this.n(new B.aIV())},
k(){if(this.c!=null)this.a4()},
aT(d){var x,w
this.bb(d)
A.d9(A.dp(0,0,10,0,0),new B.aIX(this))
x=this.a
w=x.c
w.sajk(0,x.d===D.JO?"contain":"cover")},
B(d){return new A.ls(new B.aIW(this),null)}}
B.a2m.prototype={
atW(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.bi()
x.a=new B.TR(d,x,new A.b3(new A.ax(w,y.c),y.r),e,g.i("TR<0>"))
if(f.a.ghU())f.a=new B.PH(g.i("@<0>").bU(g).i("PH<1,2>")).iF(f.a)
w=A.fL(null,new B.axA(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
aa7(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a8(0)}}
B.TR.prototype={
D(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d0(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aDC(d,e)},
jG(d){return this.d0(d,null)},
aDC(d,e){var x=this
if(x.w){x.a.a.d0(d,e)
return}x.c.fh(d,e)
x.aa8()
x.b.aa7()
x.a.a.a8(0).h2(new B.bd7())},
a8(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aa7()
x.c.cM(0,x.a.a.a8(0))}return x.c.a},
aa8(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dO(0)
return},
$idC:1}
B.a7E.prototype={}
B.a7F.prototype={}
B.xo.prototype={
a5x(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.CF(d,e))
x.a8(0)},
a2l(d){var x
if((this.b.b&4)!==0)throw A.n(B.bLJ())
x=A.bR(d)
x.toString
this.a.send(x)},
vD(d,e,f){return this.aW9(0,e,f)},
aW9(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vD=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bLJ())
u.a8(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vD,w)},
$ibLI:1}
B.rS.prototype={}
B.G0.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.G0&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.Cg.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Cg&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fI(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.CF.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.CF&&e.a===this.a&&e.b===this.b},
gH(d){return A.fI([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gt.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Gs.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.amk.prototype={
atN(d){d.ey(new B.amo(this),new B.amp(this),y.a)}}
B.ajl.prototype={
a8(d){var x=this.b
x.e=x.d=null
return this.apy(0)}}
B.a8J.prototype={
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
B.a5v.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aID.prototype={}
B.MP.prototype={}
B.Ee.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aDR.prototype={}
B.ET.prototype={}
B.Oe.prototype={}
B.aIP.prototype={}
B.zR.prototype={}
B.Of.prototype={}
B.Oh.prototype={
agf(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Oh(x,w,v)},
aWM(d){return this.agf(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","y2(F)","~(FD)","bn(ET)","bn(Of)","bn(mD)","~(@)","ms(@)","ms()","bn(bLI)","~(rS)"])
B.aNP.prototype={
$0(){return J.c1w(this.a.bk())},
$S:1}
B.aNQ.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.d0(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.ao3.prototype={
$1(d){if(d==null)return null
return A.c3(J.l(d))},
$S:130}
B.b8s.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.E4(!0)},
$S:0}
B.b8t.prototype={
$1(d){return this.a.N1()},
$S:39}
B.b8p.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bG()},
$S:0}
B.b8q.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b8m.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8n.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b8o.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8j.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b8k.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b8l.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bQG(x.w,w,u,!1,v)},
$S:z+2}
B.b8r.prototype={
$0(){return this.a.aO7()},
$S:0}
B.b83.prototype={
$1(d){this.a.y_("candidat_ice",d,!1)},
$S:382}
B.b84.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b82())},
$S:0}
B.b82.prototype={
$0(){},
$S:0}
B.b85.prototype={
$0(){this.a.mo(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b86.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b87.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.y_("annule",C.ey,!1)
x.mo(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b88.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b81(x,w))},
$S:39}
B.b81.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eG(this.b)},
$S:0}
B.b89.prototype={
$1(d){},
$S:154}
B.b8a.prototype={
$1(d){this.a.Dv()},
$S:39}
B.b8c.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.aau()
x.a6V("reponse",d)},
$S:383}
B.b8d.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b8e.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.aau()},
$S:28}
B.b8f.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b8g.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a6V("offre",d)},
$S:383}
B.b8h.prototype={
$1(d){this.a.mo(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b8b.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.U},
$S:0}
B.b80.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b8_.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b7Z.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b8i.prototype={
$2(d,e){if(!d)this.a.E0()},
$S:938}
B.aNf.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a9(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aNg.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.azV(w)},
$S:z+5}
B.aNh.prototype={
$1(d){var x
if(d===D.JF){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.aqT.prototype={
$1(d){return this.a.VP()},
$S:21}
B.aqU.prototype={
$0(){var x=this.a
if(!x.e)x.Cq()},
$S:0}
B.bHb.prototype={
$1(d){return d.length!==0},
$S:12}
B.aE5.prototype={
$1(d){return this.a.push(B.bKB(d))},
$S:21}
B.aE6.prototype={
$1(d){return this.a.push(B.bKB(d))},
$S:21}
B.aE2.prototype={
$1(d){},
$S:22}
B.aE3.prototype={
$1(d){},
$S:22}
B.aE4.prototype={
$1(d){},
$S:22}
B.aDU.prototype={
$0(){return!1},
$S:46}
B.aDV.prototype={
$0(){return!1},
$S:46}
B.aDW.prototype={
$1(d){J.h1(d,new B.aDT(this.a))},
$S:382}
B.aDT.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:45}
B.aIH.prototype={
$1(d){},
$S:22}
B.aII.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.ET(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aIJ.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.ci7(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bNB())switch(w.cx.a){case 0:w.cy=D.JK
break
case 1:w.cy=D.JL
break
case 3:w.cy=D.JM
break
case 5:w.cy=D.JI
break
case 6:w.cy=D.JJ
break
case 7:w.cy=D.ru
break
default:break}},
$S:38}
B.aIK.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.ci8(w.iceGatheringState)},
$S:38}
B.aIL.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cjC(w.signalingState)},
$S:38}
B.aIM.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cjd(w.connectionState)},
$S:38}
B.aIN.prototype={
$1(d){},
$S:38}
B.aIO.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bKB(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dg(x,A.X(x).i("dg<1,aA>"))
w=J.eS(x,new B.aIF(w),y.h)
v.$1(new B.Of(A.H(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aIF.prototype={
$1(d){return new B.ms(d,d.id,this.a.as)},
$S:z+8}
B.aIG.prototype={
$0(){var x=this.b.e
return new B.ms(x,x.id,this.a.as)},
$S:z+9}
B.bHj.prototype={
$1(d){return J.fN(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aIU.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.K)(w),++u)w[u].Y(0)
C.b.Z(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a4o(t)
v=y.i.c
w.push(A.hH(t,"canplay",new B.aIQ(x),!1,v))
w.push(A.hH(t,"resize",new B.aIR(x),!1,v))
w.push(A.hH(t,"error",new B.aIS(t),!1,v))
w.push(A.hH(t,"ended",new B.aIT(),!1,v))
return t},
$S:222}
B.aIQ.prototype={
$1(d){this.a.adt()},
$S:21}
B.aIR.prototype={
$1(d){this.a.adt()},
$S:21}
B.aIS.prototype={
$1(d){var x,w,v=this.a.error
A.n6("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.F9.h(0,A.am(v,"code"))
x.toString
w=!J.q(A.am(v,"message"),"")?A.am(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pe(x,C.F8.h(0,A.am(v,"code")),w,null))},
$S:40}
B.aIT.prototype={
$1(d){},
$S:21}
B.aIV.prototype={
$0(){},
$S:0}
B.aIX.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aIW.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a2D("RTCVideoRenderer-"+w.Q)
else w=A.T(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cI(A.T(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:939}
B.axA.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eM(w.ghB(w),new B.axz(v),w.gno())},
$S:0}
B.axz.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aa8()
x=x.b
x===$&&A.d()
x.a8(0)},
$S:0}
B.bd7.prototype={
$1(d){},
$S:18}
B.apO.prototype={
$1(d){this.a.cM(0,this.b)},
$S:22}
B.apP.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hj(new B.Gt("Failed to connect WebSocket"))
else this.b.a5x(1006,"error")},
$S:22}
B.apQ.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cu("data")
if(typeof x==="string")w.b=new B.G0(A.bC(x))
else if(typeof x==="object"&&A.c69(y.m.a(x),"ArrayBuffer"))w.b=new B.Cg(A.a4e(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.az(x).j(0)))
v.D(0,w.bk())},
$S:40}
B.apR.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cM(0,this.b)
this.b.a5x(d.code,d.reason)},
$S:22}
B.amo.prototype={
$1(d){var x=d.b,w=this.a
new A.cD(x,A.u(x).i("cD<1>")).cV(new B.aml(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cD(x,A.u(x).i("cD<1>")).b2h(new B.amm(d),new B.amn(w,d))
w.f.dO(0)},
$S:z+10}
B.aml.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.G0
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.Cg
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.CF){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a8(0)}}},
$S:z+11}
B.amm.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.bLJ())
s=A.bR(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a2l(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a2l(new Uint8Array(A.d0(u)))
break $label1$1}t=A.aL("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Gs))throw r}},
$S:17}
B.amn.prototype={
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
if(!(A.O(q) instanceof B.Gs))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.amp.prototype={
$1(d){var x,w=d instanceof A.QG?d:new B.a8J(J.l(d)),v=this.a
v.f.hj(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.jG(w)
v=v.a
v===$&&A.d()
v.a8(0)},
$S:38};(function aliases(){var x=B.D0.prototype
x.apy=x.a8})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.T1.prototype,"gauO","Jo",0)
var v
w(v=B.T0.prototype,"gaSV","adk",3)
x(v,"gaaM","E0",0)
x(v,"ga4B","JH",0)
x(v,"ga4A","JG",0)
x(v,"ga4y","JE",0)
x(v,"ga4z","JF",0)
w(v=B.a07.prototype,"gaNW","aNX",7)
x(v,"gaN3","VP",1)
x(B.Og.prototype,"gdD","k",0)
x(B.Oj.prototype,"gaLf","aLg",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a2,[B.D0,B.ao2,B.FD,B.a0n,B.aNe,B.a07,B.aID,B.MP,B.Ee,B.aDR,B.Oe,B.aIP,B.a7F,B.TR,B.a7E,B.xo,B.rS,B.Gt,B.a8J,B.ET,B.zR,B.Of,B.Oh])
w(B.PH,A.ff)
x(A.jF,[B.aNP,B.b8s,B.b8p,B.b8q,B.b8m,B.b8n,B.b8o,B.b8j,B.b8k,B.b8r,B.b84,B.b82,B.b85,B.b86,B.b87,B.b81,B.b8b,B.b80,B.b8_,B.b7Z,B.aqU,B.aDU,B.aDV,B.aIG,B.aIV,B.aIX,B.axA,B.axz,B.amn])
x(A.ie,[B.aNQ,B.ao3,B.b8t,B.b8l,B.b83,B.b88,B.b89,B.b8a,B.b8c,B.b8d,B.b8e,B.b8f,B.b8g,B.b8h,B.aNf,B.aNg,B.aNh,B.aqT,B.bHb,B.aE5,B.aE6,B.aE2,B.aE3,B.aE4,B.aDW,B.aIH,B.aII,B.aIJ,B.aIK,B.aIL,B.aIM,B.aIN,B.aIO,B.aIF,B.bHj,B.aIU,B.aIQ,B.aIR,B.aIS,B.aIT,B.bd7,B.apO,B.apP,B.apQ,B.apR,B.amo,B.aml,B.amm,B.amp])
x(A.M,[B.oN,B.y2,B.Oi])
x(A.U,[B.T1,B.T0,B.Oj])
x(A.at,[B.RI,B.aal,B.w8])
x(A.ql,[B.b8i,B.aDT,B.aIW])
w(B.aIE,B.aID)
w(B.ms,B.MP)
w(B.a3R,B.Ee)
w(B.aDS,B.aDR)
w(B.a5u,B.Oe)
w(B.bL8,B.aIP)
w(B.Og,A.d4)
x(B.a7F,[B.a2m,B.amk])
x(B.rS,[B.G0,B.Cg,B.CF])
w(B.Gs,B.Gt)
w(B.ajl,B.D0)
x(A.GW,[B.vq,B.Od,B.vp,B.mD,B.a5v])})()
A.od(b.typeUniverse,JSON.parse('{"D0":{"dC":["1"]},"PH":{"ff":["1","2"],"ff.S":"1","ff.T":"2"},"y2":{"M":[],"m":[]},"oN":{"M":[],"m":[]},"T1":{"U":["oN"]},"RI":{"at":[],"m":[]},"T0":{"U":["y2"]},"aal":{"at":[],"m":[]},"w8":{"at":[],"m":[]},"ms":{"MP":[]},"a3R":{"Ee":[]},"a5u":{"Oe":[]},"Og":{"d4":["Oh"],"aX":[]},"Oi":{"M":[],"m":[]},"Oj":{"U":["Oi"]},"TR":{"dC":["1"]},"xo":{"bLI":[]},"G0":{"rS":[]},"Cg":{"rS":[]},"CF":{"rS":[]},"Gt":{"bM":[]},"Gs":{"bM":[]},"ajl":{"dC":["@"]},"a8J":{"bM":[]}}'))
A.bMa(b.typeUniverse,JSON.parse('{"D0":1,"a7F":1}'))
var y=(function rtii(){var x=A.av
return{b:x("xo"),L:x("bM"),_:x("as<@>"),x:x("as<~>"),S:x("E<af<o,J>>"),t:x("E<af<o,@>>"),Q:x("E<Ee>"),d:x("E<im<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aA"),l:x("I<aA>"),F:x("I<af<o,@>>"),j:x("I<@>"),I:x("I<w>"),P:x("af<o,@>"),f:x("af<@,@>"),E:x("MP"),G:x("Ee"),h:x("ms"),o:x("pa"),a:x("bn"),K:x("a2"),J:x("Oe"),v:x("zR"),Z:x("a7E<a2?>"),N:x("o"),e:x("pF"),M:x("e7"),D:x("rS"),U:x("Z<o>"),g:x("es<FD>"),n:x("es<~>"),V:x("b3<xo>"),r:x("b3<@>"),R:x("b3<~>"),i:x("Tb<aA>"),C:x("o7<aA>"),k:x("ax<xo>"),c:x("ax<@>"),W:x("ax<~>"),q:x("kg"),y:x("J"),z:x("@"),A:x("aA?"),X:x("a2?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.SP=new B.a0n(C.jS)
D.xb=new A.ap(32,0,32,0)
D.xV=new A.ag(57638,!1)
D.xW=new A.ag(57639,!1)
D.Yc=new A.ag(58337,!1)
D.Yd=new A.ag(58341,!1)
D.Yl=new A.ag(58923,!1)
D.y0=new A.ag(59048,!1)
D.Ym=new A.ag(59049,!1)
D.Yn=new A.ag(59077,!1)
D.a5o=A.b(x([1,2,4,8,16]),A.av("E<w>"))
D.a93=A.b(x([]),y.Q)
D.Fm=new A.fG("FlutterWebRTC.Method",C.ba,null)
D.agi=new B.mD(0,"RTCIceConnectionStateNew")
D.agj=new B.mD(1,"RTCIceConnectionStateChecking")
D.agk=new B.mD(2,"RTCIceConnectionStateCompleted")
D.agl=new B.mD(3,"RTCIceConnectionStateConnected")
D.agm=new B.mD(4,"RTCIceConnectionStateCount")
D.JF=new B.mD(5,"RTCIceConnectionStateFailed")
D.agn=new B.mD(6,"RTCIceConnectionStateDisconnected")
D.JG=new B.mD(7,"RTCIceConnectionStateClosed")
D.JH=new B.Od(0,"RTCIceGatheringStateNew")
D.ago=new B.Od(1,"RTCIceGatheringStateGathering")
D.agp=new B.Od(2,"RTCIceGatheringStateComplete")
D.ru=new B.vp(0,"RTCPeerConnectionStateClosed")
D.JI=new B.vp(1,"RTCPeerConnectionStateFailed")
D.JJ=new B.vp(2,"RTCPeerConnectionStateDisconnected")
D.JK=new B.vp(3,"RTCPeerConnectionStateNew")
D.JL=new B.vp(4,"RTCPeerConnectionStateConnecting")
D.JM=new B.vp(5,"RTCPeerConnectionStateConnected")
D.agq=new B.vq(0,"RTCSignalingStateStable")
D.agr=new B.vq(1,"RTCSignalingStateHaveLocalOffer")
D.ags=new B.vq(2,"RTCSignalingStateHaveRemoteOffer")
D.agt=new B.vq(3,"RTCSignalingStateHaveLocalPrAnswer")
D.agu=new B.vq(4,"RTCSignalingStateHaveRemotePrAnswer")
D.JN=new B.vq(5,"RTCSignalingStateClosed")
D.agv=new B.Oh(0,0,0)
D.JO=new B.a5v(0,"RTCVideoViewObjectFitContain")
D.JP=new B.a5v(1,"RTCVideoViewObjectFitCover")
D.ny=new A.ce(20,null,null,null)
D.ajV=new A.ce(48,null,null,null)
D.Ld=new A.ce(null,64,null,null)
D.amH=new A.y(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.LN=new A.y(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.tv=new A.y(!0,C.ac,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aon=new A.y(!0,C.o,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.LZ=new A.y(!0,C.o,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bUG=!1
$.bT3=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cmX","c_2",()=>new B.aIE())
x($,"cl3","bNB",()=>C.c.q(A.am(A.am(A.am(A.bNi(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"uTl/qesGq2Ep44O6wewd5es2pTE=");