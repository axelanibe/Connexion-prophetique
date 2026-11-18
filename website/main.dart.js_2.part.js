((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={D3:function D3(){},PP:function PP(d){this.$ti=d},aO8:function aO8(d){this.a=d},aO9:function aO9(d,e){this.a=d
this.b=e},
a_1(d){var x,w,v,u,t,s=new B.aog(),r=J.N(d),q=r.h(d,"id")
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
return new B.aof(q,x,w,v,u,t)},
bU4(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.m4(t,y.N,y.z):C.ex
if(u.h(d,"cree_le")!=null)A.c2(J.l(u.h(d,"cree_le")))
return new B.FE(s,x,w,v)},
c3Q(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.SR
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.m4(s,u,t))}return new B.a0w(x)},
bGG(d){var x=C.h.b3(d.a,1e6)
return C.c.b0(C.h.j(C.h.b3(x,60)),2,"0")+":"+C.c.b0(C.h.j(C.h.aO(x,60)),2,"0")},
bYR(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.ok(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.afS(w,v)},
chc(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.afV(u,A.jz(w)?w:null,v)},
aof:function aof(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aog:function aog(){},
FE:function FE(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a0w:function a0w(d){this.a=d},
bRb(d,e,f,g,h,i){return new B.oO(e,f,i,h,d,null)},
bRa(d,e,f,g,h){return new B.y4(e,h,f,g,d,null)},
bVi(d,e,f,g,h,i,j,k,l,m,n){return new B.aau(g,f,e,i,h,d,m,l,k,j,n,null)},
oO:function oO(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
T9:function T9(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b8L:function b8L(d){this.a=d},
b8M:function b8M(d){this.a=d},
b8I:function b8I(d){this.a=d},
b8J:function b8J(d){this.a=d},
b8F:function b8F(d){this.a=d},
b8G:function b8G(d){this.a=d},
b8H:function b8H(d){this.a=d},
b8C:function b8C(d){this.a=d},
b8D:function b8D(d){this.a=d},
b8E:function b8E(d){this.a=d},
b8K:function b8K(d){this.a=d},
RP:function RP(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
y4:function y4(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
T8:function T8(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b8m:function b8m(d){this.a=d},
b8n:function b8n(d){this.a=d},
b8l:function b8l(){},
b8o:function b8o(d){this.a=d},
b8p:function b8p(d){this.a=d},
b8q:function b8q(d){this.a=d},
b8r:function b8r(d){this.a=d},
b8k:function b8k(d,e){this.a=d
this.b=e},
b8s:function b8s(){},
b8t:function b8t(d){this.a=d},
b8v:function b8v(d){this.a=d},
b8w:function b8w(d){this.a=d},
b8x:function b8x(d){this.a=d},
b8y:function b8y(d){this.a=d},
b8z:function b8z(d){this.a=d},
b8A:function b8A(d){this.a=d},
b8u:function b8u(d){this.a=d},
b8j:function b8j(d,e){this.a=d
this.b=e},
b8i:function b8i(d,e){this.a=d
this.b=e},
b8h:function b8h(d,e){this.a=d
this.b=e},
b8B:function b8B(d){this.a=d},
aau:function aau(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wa:function wa(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aNy:function aNy(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aNz:function aNz(d){this.a=d},
aNA:function aNA(d){this.a=d},
aNB:function aNB(d){this.a=d},
a0g:function a0g(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
ar5:function ar5(d){this.a=d},
ar6:function ar6(d){this.a=d},
bHz(d){var x=y.U,w=A.H(new A.Y(A.b(d.split(" "),y.s),new B.bHA(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gT(w),0).toUpperCase()
return(J.p(C.b.gT(w),0)+J.p(C.b.gaG(w),0)).toUpperCase()},
bHA:function bHA(){},
aIR:function aIR(){},
mu:function mu(d,e,f){this.e=d
this.a=e
this.b=f},
aEh:function aEh(d){this.a=d},
aEi:function aEi(d){this.a=d},
bL0(d){var x=new B.a4_(d)
x.aud(d)
return x},
a4_:function a4_(d){this.d=d},
aEe:function aEe(d){this.a=d},
aEf:function aEf(d){this.a=d},
aEg:function aEg(d){this.a=d},
aE3:function aE3(){},
aE5:function aE5(){},
aE6:function aE6(){},
aE7:function aE7(d){this.a=d},
aE4:function aE4(d){this.a=d},
c8y(d,e){var x=y.N
x=new B.a5D(d,e,A.C(x,y.E),A.C(x,y.z))
x.aui(d,e)
return x},
a5D:function a5D(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aIU:function aIU(d){this.a=d},
aIV:function aIV(d){this.a=d},
aIW:function aIW(d){this.a=d},
aIX:function aIX(d){this.a=d},
aIY:function aIY(d){this.a=d},
aIZ:function aIZ(d){this.a=d},
aJ_:function aJ_(d){this.a=d},
aJ0:function aJ0(d){this.a=d},
aIS:function aIS(d){this.a=d},
aIT:function aIT(d,e){this.a=d
this.b=e},
bLx:function bLx(d){this.a=d},
cj3(){return C.b.mQ(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bHI())!==-1},
bHI:function bHI(){},
bTx(){var x=A.b([],y.d),w=$.bTy
$.bTy=w+1
return new B.Ol(w,x,D.agf,$.ae())},
Ol:function Ol(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aJ6:function aJ6(d){this.a=d},
aJ2:function aJ2(d){this.a=d},
aJ3:function aJ3(d){this.a=d},
aJ4:function aJ4(d){this.a=d},
aJ5:function aJ5(){},
bTz(d,e,f){return new B.On(d,f,e,null)},
On:function On(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Oo:function Oo(){this.c=this.a=null},
aJ7:function aJ7(){},
aJ9:function aJ9(d){this.a=d},
aJ8:function aJ8(d){this.a=d},
bRK(d,e,f,g){var x,w={}
w.a=d
x=new B.a2v(g.i("a2v<0>"))
x.au4(e,f,w,g)
return x},
a2v:function a2v(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
axM:function axM(d,e){this.a=d
this.b=e},
axL:function axL(d){this.a=d},
TZ:function TZ(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bdq:function bdq(){},
a7P:function a7P(d){this.b=this.a=$
this.$ti=d},
a7Q:function a7Q(){},
bJN(d,e){return B.c38(d,e)},
c38(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bJN=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nO("ws")&&!d.nO("wss"))throw A.n(A.fm(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xq(r,A.fM(null,null,null,!1,y.D))
u=new A.av($.aH,y.k)
p=new A.b2(u,y.V)
if(J.q(r.readyState,1))p.cN(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.hj(new B.Gv("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o9(r,"open",!1,y.C).gT(0).aD(new B.aq0(p,q),y.H)
t=y.C
s=y.H
new A.o9(r,"error",!1,t).gT(0).aD(new B.aq1(p,q),s)
A.hJ(r,"message",new B.aq2(q),!1,y.m)
new A.o9(r,"close",!1,t).gT(0).aD(new B.aq3(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bJN,w)},
xq:function xq(d,e){this.a=d
this.b=e},
aq0:function aq0(d,e){this.a=d
this.b=e},
aq1:function aq1(d,e){this.a=d
this.b=e},
aq2:function aq2(d){this.a=d},
aq3:function aq3(d,e){this.a=d
this.b=e},
bM8(){return new B.Gu("Connection Closed")},
rR:function rR(){},
G2:function G2(d){this.a=d},
Ck:function Ck(d){this.a=d},
CJ:function CJ(d,e){this.a=d
this.b=e},
Gv:function Gv(d){this.a=d},
Gu:function Gu(d){this.a=d},
c2G(d){var x=null,w=$.aH,v=new B.a7P(y.Z),u=y.X,t=A.fM(x,x,x,!0,u),s=A.fM(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bRK(new A.cD(s,r.i("cD<1>")),new A.BA(t,q.i("BA<1>")),!0,u)
v.b=B.bRK(new A.cD(t,q.i("cD<1>")),new A.BA(s,r.i("BA<1>")),!1,u)
v=new B.amx(new A.b2(new A.av(w,y.W),y.R),v)
v.atW(d)
return v},
amx:function amx(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
amB:function amB(d){this.a=d},
amy:function amy(d){this.a=d},
amz:function amz(d){this.a=d},
amA:function amA(d,e){this.a=d
this.b=e},
amC:function amC(d){this.a=d},
ajy:function ajy(d,e){this.b=d
this.a=e},
a8U:function a8U(d){this.a=d},
ciD(d){switch(d){case"new":return D.ag2
case"checking":return D.ag3
case"connected":return D.ag5
case"completed":return D.ag4
case"failed":return D.JF
case"disconnected":return D.ag7
case"closed":return D.JG
case"count":return D.ag6}return D.JG},
ciE(d){switch(d){case"new":return D.JH
case"gathering":return D.ag8
case"complete":return D.ag9}return D.JH},
ck7(d){switch(d){case"stable":return D.aga
case"have-local-offer":return D.agb
case"have-local-pranswer":return D.agd
case"have-remote-offer":return D.agc
case"have-remote-pranswer":return D.age
case"closed":return D.JN}return D.JN},
cjJ(d){switch(d){case"new":return D.JK
case"connecting":return D.JL
case"connected":return D.JM
case"closed":return D.rv
case"disconnected":return D.JJ
case"failed":return D.JI}return D.rv},
vq:function vq(d,e){this.a=d
this.b=e},
Oi:function Oi(d,e){this.a=d
this.b=e},
vp:function vp(d,e){this.a=d
this.b=e},
mF:function mF(d,e){this.a=d
this.b=e},
a5E:function a5E(d,e){this.a=d
this.b=e},
aIQ:function aIQ(){},
MV:function MV(){},
Eg:function Eg(){},
aE2:function aE2(){},
EU:function EU(d,e,f){this.a=d
this.b=e
this.c=f},
Oj:function Oj(){},
aJ1:function aJ1(){},
zU:function zU(d,e){this.a=d
this.b=e},
Ok:function Ok(d){this.b=d},
Om:function Om(d,e,f){this.a=d
this.b=e
this.c=f},
bKI(d){var x=0,w=A.k(y.y)
var $async$bKI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bKI,w)},
aGK(d){var x=0,w=A.k(y.H),v
var $async$aGK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aSc("enableSpeakerphone",A.a8(["enable",d],y.N,v),v,v),$async$aGK)
case 2:return A.i(null,w)}})
return A.j($async$aGK,w)},
aSc(d,e,f,g){return B.cbb(d,e,f,g,f.i("0?"))},
cbb(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aSc=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aSb(),$async$aSc)
case 3:v=D.Fm.cs(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aSc,w)},
aSb(){var x=0,w=A.k(y.H),v,u
var $async$aSb=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bV9?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Fm.cs("initialize",A.a8(["options",A.C(v,u)],v,u),!1,y.H),$async$aSb)
case 4:$.bV9=!0
case 3:return A.i(null,w)}})
return A.j($async$aSb,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[27]
E=c[19]
B.D3.prototype={
D(d,e){this.a.D(0,e)},
d3(d,e){this.a.d3(d,e)},
a7(d){return this.a.a7(0)},
$idC:1}
B.PP.prototype={
iF(d){var x=A.cu("subscription"),w=A.fM(new B.aO8(x),null,null,!0,this.$ti.y[1])
x.b=d.eN(new B.aO9(this,w),w.glR(w),w.gnp())
return new A.cD(w,A.u(w).i("cD<1>"))}}
B.aof.prototype={}
B.FE.prototype={}
B.a0w.prototype={}
B.oO.prototype={
N(){return new B.T9()}}
B.T9.prototype={
U(){var x=this
x.V()
x.Jz()
x.r=A.de(C.c0,new B.b8L(x))
x.w=A.ka(C.wW,new B.b8M(x))},
k(){var x=this,w=x.r
if(w!=null)w.Z(0)
w=x.w
if(w!=null)w.Z(0)
w=x.x
if(w!=null)w.Z(0)
x.a4()},
W2(){var x=this.x
if(x!=null)x.Z(0)
this.x=A.de(C.fN,new B.b8I(this))},
N2(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$N2=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.zW(p.c),$async$N2)
case 7:r=e
q=B.a_1(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b8J(s))
p=s.r
if(p!=null)p.Z(0)
p=s.w
if(p!=null)p.Z(0)
s.W2()}u=2
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
return A.j($async$N2,w)},
Jz(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Jz=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.zW(o.c),$async$Jz)
case 7:r=e
q=B.a_1(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaje()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b8F(s))
s.W2()
x=1
break}s.n(new B.b8G(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b8H(s))
s.W2()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jz,w)},
Jp(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Jp=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b8C(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.ZH(q.c,"accepte"),$async$Jp)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b8D(s))
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
if(q!=null)q.Z(0)
q=s.w
if(q!=null)q.Z(0)
q=s.c
q.toString
A.aa(q,!1).wL(A.e2(new B.b8E(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jp,w)},
E6(d){return this.aOo(d)},
aOn(){return this.E6(!1)},
aOo(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$E6=A.f(function(e,f){if(e===1){t=f
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
return A.e(q.ZH(r.c,"refuse"),$async$E6)
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
return A.j($async$E6,w)},
B(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.oG(C.o,s,A.c(B.bHz(r.d),s,s,s,s,D.M1,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.LO,C.a1,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.av,new A.a_(D.xg,x,s),C.k,A.c(q,s,s,s,s,D.tz,s,s,s),D.Le],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b8K(t)
v=A.a("Accepter")
u=t.f?s:t.gauX()
q.push(A.Z(A.b([new B.RP(D.y0,C.aC,r,x,s),D.ajH,new B.RP(D.y_,C.cv,v,u,s)],w),C.p,C.bx,C.i,s))}if(t.d)q.push(C.vI)
return A.eH(s,C.n,A.fx(!0,A.cI(A.L(q,C.p,C.e,C.T),s,s),!0,C.ai,!0,!0),s,s)}}
B.RP.prototype={
B(d){var x=this,w=null,v=A.di(x.d,w,w,C.ai,C.cg,w)
return A.L(A.b([A.ab(A.b5(!1,A.c6(x.c,C.l,w,32),C.j,w,C.r,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.e3,w,w,w)],y.p),C.p,C.e,C.T)}}
B.y4.prototype={
N(){return new B.T8(A.b_(y.N),C.U)}}
B.T8.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bTx()
w=B.bTx()
v.d!==$&&A.bh()
v.d=new B.aNy(x,w)
v.a.toString
x=new B.a0g(new A.et(u,u,y.g),new A.et(u,u,y.n))
v.e!==$&&A.bh()
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
w.FU()
x.a4()},
uP(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$uP=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a7()
x=7
return A.e(l.zW(m.c),$async$uP)
case 7:r=e
q=B.a_1(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mq(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.OA(),$async$uP)
case 8:p=e
o=B.c3Q(p)
x=9
return A.e(s.T1(),$async$uP)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.C(A.B(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mq(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.tX(A.a8(["iceServers",o.a],y.N,y.z),k==="video"),$async$uP)
case 10:m.f=new B.b8m(s)
m.r=new B.b8n(s)
m.w=new B.b8o(s)
if(s.c==null){x=1
break}s.n(new B.b8p(s))
s.ch=A.de(C.c0,new B.b8q(s))
s.CW=A.ka(C.cJ,new B.b8r(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cO(k,A.u(k).i("cO<1>")).cX(s.gaTb())
k=m.w
s.cy=new A.cO(k,A.u(k).i("cO<1>")).cX(new B.b8s())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.NL(C.c.QO("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.fa(C.c9,n,C.aj,!0))}s.ay=A.ka(C.fN,new B.b8t(s))
s.Dx()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.C(A.B(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mq(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uP,w)},
T1(){var x=0,w=A.k(y.y),v
var $async$T1=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$T1,w)},
Dx(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Dx=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.bX("/messagerie/appels/"+p.c+"/signaux"),$async$Dx)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gK(p)
s.adq(B.bU4(q))}u=2
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
return A.j($async$Dx,w)},
adq(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bYR(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.zr(A.a8(["sdp",v.a,"type",v.b],y.N,y.z)).aD(new B.b8v(s),y.a).h4(new B.b8w(s))
break
case"reponse":if(!s.a.f)return
u=B.bYR(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.Nr(A.a8(["sdp",u.a,"type",u.b],y.N,y.z)).aD(new B.b8x(s),y.a).h4(new B.b8y(s))
break
case"candidat_ice":t=B.chc(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.Nm(A.a8(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.FN().aD(new B.b8z(s),y.a).h4(new B.b8A(s))
break
case"refuse":s.mq(A.a("Appel refus\xe9"))
break
case"annule":s.mq(A.a("Appel annul\xe9"))
break
case"termine":s.mq(A.a("Appel termin\xe9"))
break}},
aaA(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.Z(0)
w.n(new B.b8u(w))},
y0(d,e,f){return this.aBC(d,e,f)},
a70(d,e){return this.y0(d,e,!0)},
aBC(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$y0=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.ahi(s.c,e,d),$async$y0)
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
return A.j($async$y0,w)},
E2(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$E2=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.Z(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.ZH(r.c,"termine"),$async$E2)
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
return A.j($async$E2,w)},
mq(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.Z(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.C(A.B(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.aa(x,!1).bG()},
JH(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JH=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.S1(u),$async$JH)
case 2:if(v.c!=null)v.n(new B.b8j(v,u))
return A.i(null,w)}})
return A.j($async$JH,w)},
JG(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JG=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.IF(u),$async$JG)
case 2:if(v.c!=null)v.n(new B.b8i(v,u))
return A.i(null,w)}})
return A.j($async$JG,w)},
JE(){var x=0,w=A.k(y.H),v=this,u,t
var $async$JE=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.RZ(u),$async$JE)
case 2:if(v.c!=null)v.n(new B.b8h(v,u))
return A.i(null,w)}})
return A.j($async$JE,w)},
JF(){var x=0,w=A.k(y.H),v=this,u
var $async$JF=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.Nu(),$async$JF)
case 2:return A.i(null,w)}})
return A.j($async$JF,w)},
B(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bTz(o.e,!1,D.JP)
else{x=A.oG(C.o,q,A.c(B.bHz(w.e),q,q,q,q,D.ao7,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.amr,q,q,q)
x=A.cI(A.L(A.b([x,C.q,w,C.k,A.c(r.w?B.bGG(r.ax):A.a(p),q,q,q,q,D.tz,q,q,q)],y.p),C.p,C.e,C.T),q,q)}x=A.O2(0,x)
o=A.il(q,A.fc(A.Q(12),B.bTz(o.d,!0,D.JP),C.aq),160,q,q,16,16,110)
w=r.w
v=B.bGG(r.ax)
u=r.z
t=r.Q
u=A.fh(C.bd,A.b([x,o,A.il(24,B.bVi(r.as,v,w,!0,t,u,r.ga4F(),r.ga4E(),r.ga4G(),r.ga4H(),r.gaaR()),q,q,0,0,q,q)],y.p),C.f,C.bi,q)
o=u}else{o=A.oG(C.o,q,A.c(B.bHz(w.e),q,q,q,q,D.M1,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.LO,C.a1,q,q)
if(r.w)w=B.bGG(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.tz,q,q,q)
v=r.w
u=B.bGG(r.ax)
t=r.z
s=r.Q
t=A.cI(A.L(A.b([o,C.av,new A.a_(D.xg,x,q),C.k,w,D.Le,B.bVi(r.as,u,v,!1,s,t,r.ga4F(),r.ga4E(),r.ga4G(),r.ga4H(),r.gaaR())],y.p),C.p,C.e,C.T),q,q)
o=t}return A.bLr(!1,A.eH(q,C.n,A.fx(!0,o,!0,C.ai,!0,!0),q,q),new B.b8B(r),y.K)}}
B.aau.prototype={
B(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.LV,u,u,u))
if(r&&v.c)s.push(C.q)
r=v.f
x=r?D.Yg:D.Yf
t=A.b([new B.wa(x,r,A.a("Muet"),v.x,u,u),D.nE,new B.wa(D.Ym,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nE)
if(r){x=v.w
w=x?D.y2:D.Yl
t.push(new B.wa(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nE)
if(r)t.push(new B.wa(D.Yk,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nE)
t.push(new B.wa(D.y0,!1,A.a("Raccrocher"),v.as,C.aC,u))
s.push(A.Z(t,C.p,C.bx,C.i,u))
return A.L(s,C.p,C.e,C.T)}}
B.wa.prototype={
B(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.lh
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.di(u,v,v,C.ai,C.cg,v)
return A.L(A.b([A.ab(A.b5(!1,A.c6(w.c,x,v,26),C.j,v,C.r,v,v,v,v,w.f,v,t),56,56),C.b3,A.c(w.e,v,v,v,v,C.anb,v,v,v)],y.p),C.p,C.e,C.T)}}
B.aNy.prototype={
tX(d,e){return this.b5l(d,e)},
b5l(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tX=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.iJ(0),$async$tX)
case 2:x=3
return A.e(v.e.iJ(0),$async$tX)
case 3:u=$.c_w()
if(e){t=y.N
t=A.a8(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aE3().BI(0,A.a8(["audio",!0,"video",t],s,r)),$async$tX)
case 4:q=v.b=g
o.sa2Q(0,q)
x=5
return A.e(u.YW(d,A.C(s,r)),$async$tX)
case 5:p=v.a=g
x=6
return A.e(p.kg(0,q),$async$tX)
case 6:p.e=new B.aNz(v)
p.Q=new B.aNA(v)
p.d=new B.aNB(v)
return A.i(null,w)}})
return A.j($async$tX,w)},
aA3(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa2Q(0,d)
x=w.r
if(x!=null)x.$0()}},
FN(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$FN=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.NX(0),$async$FN)
case 3:t=e
x=4
return A.e(s.BX(0,t),$async$FN)
case 4:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$FN,w)},
zr(d){return this.aYd(d)},
aYd(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$zr=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BZ(0,new B.zU(d.h(0,"sdp"),d.h(0,"type"))),$async$zr)
case 3:x=4
return A.e(s.NV(0),$async$zr)
case 4:t=f
x=5
return A.e(s.BX(0,t),$async$zr)
case 5:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$zr,w)},
Nr(d){return this.aVp(d)},
aVp(d){var x=0,w=A.k(y.H),v=this,u
var $async$Nr=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BZ(0,new B.zU(d.h(0,"sdp"),d.h(0,"type"))),$async$Nr)
case 2:return A.i(null,w)}})
return A.j($async$Nr,w)},
Nm(d){return this.aVb(d)},
aVb(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Nm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Nc(new B.EU(A.aR(d.h(0,"candidate")),A.aR(d.h(0,"sdpMid")),A.e8(d.h(0,"sdpMLineIndex")))),$async$Nm)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nm,w)},
S1(d){return this.anT(d)},
anT(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$S1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Ry(0)
if(r==null)r=C.dk
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.K)(r),++s)r[s].skk(0,t)
return A.i(null,w)}})
return A.j($async$S1,w)},
IF(d){return this.anJ(d)},
anJ(d){var x=0,w=A.k(y.H)
var $async$IF=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGK(d),$async$IF)
case 2:return A.i(null,w)}})
return A.j($async$IF,w)},
RZ(d){return this.anB(d)},
anB(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$RZ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Io(0)
if(s==null)s=C.dk
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.K)(s),++t)s[t].skk(0,d)
return A.i(null,w)}})
return A.j($async$RZ,w)},
Nu(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Nu=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Io(0)
if(s==null)s=D.a8O
if(s.length===0){x=1
break}x=3
return A.e(B.bKI(C.b.gT(s)),$async$Nu)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nu,w)},
ww(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$ww=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a7(0)
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
else{o=A.H(q.Ry(0),!0,y.G)
C.b.t(o,q.Io(0))
q=o}if(q==null)q=C.dk
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c2A(r)
if(!m.b(k)){j=new A.av($.aH,n)
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
B.a0g.prototype={
NL(d){return this.aWF(d)},
aWF(d){var x=0,w=A.k(y.H),v=this
var $async$NL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Cr(),$async$NL)
case 2:return A.i(null,w)}})
return A.j($async$NL,w)},
Cr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Cr=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c2G(B.bJN(A.cG(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Cr)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cD(p,A.u(p).i("cD<1>")).aT(s.gaO8(),!0,s.gaNg(),new B.ar5(s))
u=2
x=6
break
case 4:u=3
n=t
s.VU()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cr,w)},
aO9(d){var x,w,v,u
try{x=C.Y.cS(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bU4(w))}catch(u){}},
VU(){var x,w=this,v=w.c
if(v!=null)v.Z(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a57[v]
w.f=v+1
v=w.d
if(v!=null)v.Z(0)
w.d=A.de(A.dp(0,0,0,0,x),new B.ar6(w))},
FU(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$FU=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Z(0)
s=t.c
s=s==null?null:s.Z(0)
x=2
return A.e(y.x.b(s)?s:A.dJ(s,y.H),$async$FU)
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
r=s.w=new B.ajy(s,q)}s=r.a7(0)}x=7
return A.e(y._.b(s)?s:A.dJ(s,y.z),$async$FU)
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
return A.j($async$FU,w)}}
B.aIR.prototype={
YW(d,e){return this.aY4(d,e)},
aY4(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$YW=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a8(["mandatory",A.C(r,r),"optional",A.b([A.a8(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fq(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bQ(t)))
t=J.l(s)
v=B.c8y(C.da.glU().bx(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$YW,w)}}
B.mu.prototype={
Ry(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dg(w,A.W(w).i("dg<1,aA>"))
J.h2(w,new B.aEh(x))
return x},
Io(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dg(w,A.W(w).i("dg<1,aA>"))
J.h2(w,new B.aEi(x))
return x}}
B.a4_.prototype={
aud(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aEe(x)))
w.addEventListener("mute",A.bV(new B.aEf(x)))
w.addEventListener("unmute",A.bV(new B.aEg(x)))},
skk(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aE3.prototype={
BI(d,e){return this.amK(0,e)},
amK(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$BI=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cj3())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iy(e.h(0,"video"),"facingMode")
e.cn(0,"video",new B.aE5())
e.cn(0,"audio",new B.aE6())}catch(a0){A.n8("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hX(e.h(0,"audio"),i,i).aP(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h2(s,new B.aE7(r))
J.iy(e.h(0,"audio"),"optional")
J.j1(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.be(a0)
A.n8("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bQ(e)
x=10
return A.e(A.eB(o.getUserMedia(h.a(n)),h),$async$BI)
case 10:m=a2
i=m
h=i.id
v=new B.mu(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eB(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$BI)
case 11:l=a2
h=l
g=h.id
v=new B.mu(h,g,"local")
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
return A.j($async$BI,w)}}
B.a5D.prototype={
aui(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aIU(x)))
w.addEventListener("icecandidate",A.bV(new B.aIV(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aIW(x)))
w.onicegatheringstatechange=A.bV(new B.aIX(x))
w.addEventListener("signalingstatechange",A.bV(new B.aIY(x)))
if(!$.bO0())w.addEventListener("connectionstatechange",A.bV(new B.aIZ(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aJ_(x)))
w.addEventListener("track",A.bV(new B.aJ0(x)))},
NX(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NX=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eB(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$NX)
case 3:t=f
v=new B.zU(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NX,w)},
NV(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eB(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$NV)
case 3:t=f
v=new B.zU(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NV,w)},
kg(d,e){var x
this.ax.cn(0,e.a,new B.aIT(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cJ(null,y.H)},
BX(d,e){return this.anN(0,e)},
anN(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BX=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eB(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BX)
case 2:return A.i(null,w)}})
return A.j($async$BX,w)},
BZ(d,e){return this.ao3(0,e)},
ao3(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BZ=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eB(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BZ)
case 2:return A.i(null,w)}})
return A.j($async$BZ,w)},
Nc(d){return this.aUT(d)},
aUT(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Nc=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eB(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Nc)
case 2:return A.i(null,w)}})
return A.j($async$Nc,w)},
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
B.bLx.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.Ol.prototype={
sajr(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Gj()
if(x!=null)x.style.objectFit=e},
adz(){var x=this,w=x.Gj(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.agl(u,x.z!=null,0,t))},
sa2Q(d,e){var x,w,v,u,t=this
t.z=e
if(e.Io(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.Ry(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aBq()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Gj()
if(u!=null){u.srcObject=t.x
x=t.Gj()
x.toString
t.a4u(x)}t.sl(0,t.a.aX2(t.z!=null))},
aBq(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Gj(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.K)(t),++r)t[r].Z(0)
q=u.Gj()
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
iJ(d){var x=0,w=A.k(y.H),v=this
var $async$iJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.IO()
$.q7().u1("RTCVideoRenderer-"+v.Q,new B.aJ6(v),!0)
return A.i(null,w)}})
return A.j($async$iJ,w)},
a4u(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.On.prototype={
N(){return new B.Oo()}}
B.Oo.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a6(0,v.gaLs())
x=v.a
w=x.c
w.as=x.e
w.sajr(0,x.d===D.JO?"contain":"cover")},
aLt(){if(this.c!=null)this.n(new B.aJ7())},
k(){if(this.c!=null)this.a4()},
aR(d){var x,w
this.b6(d)
A.de(A.dp(0,0,10,0,0),new B.aJ9(this))
x=this.a
w=x.c
w.sajr(0,x.d===D.JO?"contain":"cover")},
B(d){return new A.lt(new B.aJ8(this),null)}}
B.a2v.prototype={
au4(d,e,f,g){var x=this,w=$.aH
x.a!==$&&A.bh()
x.a=new B.TZ(d,x,new A.b2(new A.av(w,y.c),y.r),e,g.i("TZ<0>"))
if(f.a.ghU())f.a=new B.PP(g.i("@<0>").bW(g).i("PP<1,2>")).iF(f.a)
w=A.fM(null,new B.axM(f,x),null,!0,g)
x.b!==$&&A.bh()
x.b=w},
aad(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Z(0)
w=this.b
w===$&&A.d()
w.a7(0)}}
B.TZ.prototype={
D(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d3(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.aDN(d,e)},
jI(d){return this.d3(d,null)},
aDN(d,e){var x=this
if(x.w){x.a.a.d3(d,e)
return}x.c.fi(d,e)
x.aae()
x.b.aad()
x.a.a.a7(0).h4(new B.bdq())},
a7(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aad()
x.c.cN(0,x.a.a.a7(0))}return x.c.a},
aae(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dF(0)
return},
$idC:1}
B.a7P.prototype={}
B.a7Q.prototype={}
B.xq.prototype={
a5C(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.CJ(d,e))
x.a7(0)},
a2r(d){var x
if((this.b.b&4)!==0)throw A.n(B.bM8())
x=A.bQ(d)
x.toString
this.a.send(x)},
vD(d,e,f){return this.aWq(0,e,f)},
aWq(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vD=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bM8())
u.a7(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vD,w)},
$ibM7:1}
B.rR.prototype={}
B.G2.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.G2&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.Ck.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Ck&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fJ(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.CJ.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.CJ&&e.a===this.a&&e.b===this.b},
gH(d){return A.fJ([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gv.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibL:1}
B.Gu.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.amx.prototype={
atW(d){d.ey(new B.amB(this),new B.amC(this),y.a)}}
B.ajy.prototype={
a7(d){var x=this.b
x.e=x.d=null
return this.apE(0)}}
B.a8U.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibL:1}
B.vq.prototype={
M(){return"RTCSignalingState."+this.b}}
B.Oi.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vp.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mF.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a5E.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aIQ.prototype={}
B.MV.prototype={}
B.Eg.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aE2.prototype={}
B.EU.prototype={}
B.Oj.prototype={}
B.aJ1.prototype={}
B.zU.prototype={}
B.Ok.prototype={}
B.Om.prototype={
agl(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Om(x,w,v)},
aX2(d){return this.agl(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","y4(F)","~(FE)","bn(EU)","bn(Ok)","bn(mF)","~(@)","mu(@)","mu()","bn(bM7)","~(rR)"])
B.aO8.prototype={
$0(){return J.c1Z(this.a.bk())},
$S:1}
B.aO9.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.be(v)
this.b.d3(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aog.prototype={
$1(d){if(d==null)return null
return A.c2(J.l(d))},
$S:130}
B.b8L.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.E6(!0)},
$S:0}
B.b8M.prototype={
$1(d){return this.a.N2()},
$S:39}
B.b8I.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bG()},
$S:0}
B.b8J.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b8F.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8G.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b8H.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b8C.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b8D.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b8E.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bRa(x.w,w,u,!1,v)},
$S:z+2}
B.b8K.prototype={
$0(){return this.a.aOn()},
$S:0}
B.b8m.prototype={
$1(d){this.a.y0("candidat_ice",d,!1)},
$S:383}
B.b8n.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b8l())},
$S:0}
B.b8l.prototype={
$0(){},
$S:0}
B.b8o.prototype={
$0(){this.a.mq(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b8p.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b8q.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.y0("annule",C.ex,!1)
x.mq(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b8r.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b8k(x,w))},
$S:39}
B.b8k.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eG(this.b)},
$S:0}
B.b8s.prototype={
$1(d){},
$S:159}
B.b8t.prototype={
$1(d){this.a.Dx()},
$S:39}
B.b8v.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.aaA()
x.a70("reponse",d)},
$S:384}
B.b8w.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b8x.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.aaA()},
$S:28}
B.b8y.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b8z.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a70("offre",d)},
$S:384}
B.b8A.prototype={
$1(d){this.a.mq(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b8u.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.U},
$S:0}
B.b8j.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b8i.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b8h.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b8B.prototype={
$2(d,e){if(!d)this.a.E2()},
$S:939}
B.aNz.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a8(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aNA.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gT(x):null
if(w!=null)this.a.aA3(w)},
$S:z+5}
B.aNB.prototype={
$1(d){var x
if(d===D.JF){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.ar5.prototype={
$1(d){return this.a.VU()},
$S:21}
B.ar6.prototype={
$0(){var x=this.a
if(!x.e)x.Cr()},
$S:0}
B.bHA.prototype={
$1(d){return d.length!==0},
$S:12}
B.aEh.prototype={
$1(d){return this.a.push(B.bL0(d))},
$S:21}
B.aEi.prototype={
$1(d){return this.a.push(B.bL0(d))},
$S:21}
B.aEe.prototype={
$1(d){},
$S:22}
B.aEf.prototype={
$1(d){},
$S:22}
B.aEg.prototype={
$1(d){},
$S:22}
B.aE5.prototype={
$0(){return!1},
$S:47}
B.aE6.prototype={
$0(){return!1},
$S:47}
B.aE7.prototype={
$1(d){J.h2(d,new B.aE4(this.a))},
$S:383}
B.aE4.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:50}
B.aIU.prototype={
$1(d){},
$S:22}
B.aIV.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.EU(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aIW.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.ciD(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bO0())switch(w.cx.a){case 0:w.cy=D.JK
break
case 1:w.cy=D.JL
break
case 3:w.cy=D.JM
break
case 5:w.cy=D.JI
break
case 6:w.cy=D.JJ
break
case 7:w.cy=D.rv
break
default:break}},
$S:40}
B.aIX.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.ciE(w.iceGatheringState)},
$S:40}
B.aIY.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.ck7(w.signalingState)},
$S:40}
B.aIZ.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cjJ(w.connectionState)},
$S:40}
B.aJ_.prototype={
$1(d){},
$S:40}
B.aJ0.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bL0(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dg(x,A.W(x).i("dg<1,aA>"))
w=J.eT(x,new B.aIS(w),y.h)
v.$1(new B.Ok(A.H(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aIS.prototype={
$1(d){return new B.mu(d,d.id,this.a.as)},
$S:z+8}
B.aIT.prototype={
$0(){var x=this.b.e
return new B.mu(x,x.id,this.a.as)},
$S:z+9}
B.bHI.prototype={
$1(d){return J.fO(self.window.navigator.userAgent,A.bJ(d,!1,!1))},
$S:12}
B.aJ6.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.K)(w),++u)w[u].Z(0)
C.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a4u(t)
v=y.i.c
w.push(A.hJ(t,"canplay",new B.aJ2(x),!1,v))
w.push(A.hJ(t,"resize",new B.aJ3(x),!1,v))
w.push(A.hJ(t,"error",new B.aJ4(t),!1,v))
w.push(A.hJ(t,"ended",new B.aJ5(),!1,v))
return t},
$S:222}
B.aJ2.prototype={
$1(d){this.a.adz()},
$S:21}
B.aJ3.prototype={
$1(d){this.a.adz()},
$S:21}
B.aJ4.prototype={
$1(d){var x,w,v=this.a.error
A.n8("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Fa.h(0,A.al(v,"code"))
x.toString
w=!J.q(A.al(v,"message"),"")?A.al(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pf(x,C.F9.h(0,A.al(v,"code")),w,null))},
$S:41}
B.aJ5.prototype={
$1(d){},
$S:21}
B.aJ7.prototype={
$0(){},
$S:0}
B.aJ9.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aJ8.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a2M("RTCVideoRenderer-"+w.Q)
else w=A.U(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cI(A.U(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:940}
B.axM.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eN(w.ghB(w),new B.axL(v),w.gnp())},
$S:0}
B.axL.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aae()
x=x.b
x===$&&A.d()
x.a7(0)},
$S:0}
B.bdq.prototype={
$1(d){},
$S:18}
B.aq0.prototype={
$1(d){this.a.cN(0,this.b)},
$S:22}
B.aq1.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hj(new B.Gv("Failed to connect WebSocket"))
else this.b.a5C(1006,"error")},
$S:22}
B.aq2.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cu("data")
if(typeof x==="string")w.b=new B.G2(A.bC(x))
else if(typeof x==="object"&&A.c6D(y.m.a(x),"ArrayBuffer"))w.b=new B.Ck(A.a4n(y.o.a(x),0,null))
else throw A.n(A.am("unexpected message type: "+J.az(x).j(0)))
v.D(0,w.bk())},
$S:41}
B.aq3.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cN(0,this.b)
this.b.a5C(d.code,d.reason)},
$S:22}
B.amB.prototype={
$1(d){var x=d.b,w=this.a
new A.cD(x,A.u(x).i("cD<1>")).cX(new B.amy(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cD(x,A.u(x).i("cD<1>")).b2x(new B.amz(d),new B.amA(w,d))
w.f.dF(0)},
$S:z+10}
B.amy.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.G2
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,w)
break $label0$0}x=d instanceof B.Ck
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.D(0,v)
break $label0$0}if(d instanceof B.CJ){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a7(0)}}},
$S:z+11}
B.amz.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bM8())
s=A.bQ(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a2r(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a2r(new Uint8Array(A.d1(u)))
break $label1$1}t=A.aL("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Gu))throw r}},
$S:17}
B.amA.prototype={
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
if(!(A.O(q) instanceof B.Gu))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.amC.prototype={
$1(d){var x,w=d instanceof A.QN?d:new B.a8U(J.l(d)),v=this.a
v.f.hj(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.jI(w)
v=v.a
v===$&&A.d()
v.a7(0)},
$S:40};(function aliases(){var x=B.D3.prototype
x.apE=x.a7})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.T9.prototype,"gauX","Jp",0)
var v
w(v=B.T8.prototype,"gaTb","adq",3)
x(v,"gaaR","E2",0)
x(v,"ga4H","JH",0)
x(v,"ga4G","JG",0)
x(v,"ga4E","JE",0)
x(v,"ga4F","JF",0)
w(v=B.a0g.prototype,"gaO8","aO9",7)
x(v,"gaNg","VU",1)
x(B.Ol.prototype,"gdH","k",0)
x(B.Oo.prototype,"gaLs","aLt",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a2,[B.D3,B.aof,B.FE,B.a0w,B.aNy,B.a0g,B.aIQ,B.MV,B.Eg,B.aE2,B.Oj,B.aJ1,B.a7Q,B.TZ,B.a7P,B.xq,B.rR,B.Gv,B.a8U,B.EU,B.zU,B.Ok,B.Om])
w(B.PP,A.fi)
x(A.jH,[B.aO8,B.b8L,B.b8I,B.b8J,B.b8F,B.b8G,B.b8H,B.b8C,B.b8D,B.b8K,B.b8n,B.b8l,B.b8o,B.b8p,B.b8q,B.b8k,B.b8u,B.b8j,B.b8i,B.b8h,B.ar6,B.aE5,B.aE6,B.aIT,B.aJ7,B.aJ9,B.axM,B.axL,B.amA])
x(A.ih,[B.aO9,B.aog,B.b8M,B.b8E,B.b8m,B.b8r,B.b8s,B.b8t,B.b8v,B.b8w,B.b8x,B.b8y,B.b8z,B.b8A,B.aNz,B.aNA,B.aNB,B.ar5,B.bHA,B.aEh,B.aEi,B.aEe,B.aEf,B.aEg,B.aE7,B.aIU,B.aIV,B.aIW,B.aIX,B.aIY,B.aIZ,B.aJ_,B.aJ0,B.aIS,B.bHI,B.aJ6,B.aJ2,B.aJ3,B.aJ4,B.aJ5,B.bdq,B.aq0,B.aq1,B.aq2,B.aq3,B.amB,B.amy,B.amz,B.amC])
x(A.M,[B.oO,B.y4,B.On])
x(A.P,[B.T9,B.T8,B.Oo])
x(A.at,[B.RP,B.aau,B.wa])
x(A.qm,[B.b8B,B.aE4,B.aJ8])
w(B.aIR,B.aIQ)
w(B.mu,B.MV)
w(B.a4_,B.Eg)
w(B.aE3,B.aE2)
w(B.a5D,B.Oj)
w(B.bLx,B.aJ1)
w(B.Ol,A.d4)
x(B.a7Q,[B.a2v,B.amx])
x(B.rR,[B.G2,B.Ck,B.CJ])
w(B.Gu,B.Gv)
w(B.ajy,B.D3)
x(A.GZ,[B.vq,B.Oi,B.vp,B.mF,B.a5E])})()
A.of(b.typeUniverse,JSON.parse('{"D3":{"dC":["1"]},"PP":{"fi":["1","2"],"fi.S":"1","fi.T":"2"},"y4":{"M":[],"m":[]},"oO":{"M":[],"m":[]},"T9":{"P":["oO"]},"RP":{"at":[],"m":[]},"T8":{"P":["y4"]},"aau":{"at":[],"m":[]},"wa":{"at":[],"m":[]},"mu":{"MV":[]},"a4_":{"Eg":[]},"a5D":{"Oj":[]},"Ol":{"d4":["Om"],"aX":[]},"On":{"M":[],"m":[]},"Oo":{"P":["On"]},"TZ":{"dC":["1"]},"xq":{"bM7":[]},"G2":{"rR":[]},"Ck":{"rR":[]},"CJ":{"rR":[]},"Gv":{"bL":[]},"Gu":{"bL":[]},"ajy":{"dC":["@"]},"a8U":{"bL":[]}}'))
A.bMA(b.typeUniverse,JSON.parse('{"D3":1,"a7Q":1}'))
var y=(function rtii(){var x=A.ax
return{b:x("xq"),L:x("bL"),_:x("as<@>"),x:x("as<~>"),S:x("E<af<o,I>>"),t:x("E<af<o,@>>"),Q:x("E<Eg>"),d:x("E<ip<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aA"),l:x("J<aA>"),F:x("J<af<o,@>>"),j:x("J<@>"),I:x("J<w>"),P:x("af<o,@>"),f:x("af<@,@>"),E:x("MV"),G:x("Eg"),h:x("mu"),o:x("pb"),a:x("bn"),K:x("a2"),J:x("Oj"),v:x("zU"),Z:x("a7P<a2?>"),N:x("o"),e:x("pG"),M:x("e7"),D:x("rR"),U:x("Y<o>"),g:x("et<FE>"),n:x("et<~>"),V:x("b2<xq>"),r:x("b2<@>"),R:x("b2<~>"),i:x("Tj<aA>"),C:x("o9<aA>"),k:x("av<xq>"),c:x("av<@>"),W:x("av<~>"),q:x("ki"),y:x("I"),z:x("@"),A:x("aA?"),X:x("a2?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.SR=new B.a0w(C.jT)
D.xg=new A.ao(32,0,32,0)
D.y_=new A.an(57638,!1)
D.y0=new A.an(57639,!1)
D.Yf=new A.an(58337,!1)
D.Yg=new A.an(58341,!1)
D.Yk=new A.an(58923,!1)
D.y2=new A.an(59048,!1)
D.Yl=new A.an(59049,!1)
D.Ym=new A.an(59077,!1)
D.a57=A.b(x([1,2,4,8,16]),A.ax("E<w>"))
D.a8O=A.b(x([]),y.Q)
D.Fm=new A.fH("FlutterWebRTC.Method",C.ba,null)
D.ag2=new B.mF(0,"RTCIceConnectionStateNew")
D.ag3=new B.mF(1,"RTCIceConnectionStateChecking")
D.ag4=new B.mF(2,"RTCIceConnectionStateCompleted")
D.ag5=new B.mF(3,"RTCIceConnectionStateConnected")
D.ag6=new B.mF(4,"RTCIceConnectionStateCount")
D.JF=new B.mF(5,"RTCIceConnectionStateFailed")
D.ag7=new B.mF(6,"RTCIceConnectionStateDisconnected")
D.JG=new B.mF(7,"RTCIceConnectionStateClosed")
D.JH=new B.Oi(0,"RTCIceGatheringStateNew")
D.ag8=new B.Oi(1,"RTCIceGatheringStateGathering")
D.ag9=new B.Oi(2,"RTCIceGatheringStateComplete")
D.rv=new B.vp(0,"RTCPeerConnectionStateClosed")
D.JI=new B.vp(1,"RTCPeerConnectionStateFailed")
D.JJ=new B.vp(2,"RTCPeerConnectionStateDisconnected")
D.JK=new B.vp(3,"RTCPeerConnectionStateNew")
D.JL=new B.vp(4,"RTCPeerConnectionStateConnecting")
D.JM=new B.vp(5,"RTCPeerConnectionStateConnected")
D.aga=new B.vq(0,"RTCSignalingStateStable")
D.agb=new B.vq(1,"RTCSignalingStateHaveLocalOffer")
D.agc=new B.vq(2,"RTCSignalingStateHaveRemoteOffer")
D.agd=new B.vq(3,"RTCSignalingStateHaveLocalPrAnswer")
D.age=new B.vq(4,"RTCSignalingStateHaveRemotePrAnswer")
D.JN=new B.vq(5,"RTCSignalingStateClosed")
D.agf=new B.Om(0,0,0)
D.JO=new B.a5E(0,"RTCVideoViewObjectFitContain")
D.JP=new B.a5E(1,"RTCVideoViewObjectFitCover")
D.nE=new A.cg(20,null,null,null)
D.ajH=new A.cg(48,null,null,null)
D.Le=new A.cg(null,64,null,null)
D.amr=new A.z(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.LO=new A.z(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.tz=new A.z(!0,C.ah,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ao7=new A.z(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.M1=new A.z(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bV9=!1
$.bTy=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cns","c_w",()=>new B.aIR())
x($,"clz","bO0",()=>C.c.q(A.al(A.al(A.al(A.bNI(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"nzKe204ihrXuM9olghrkXzktwfQ=");