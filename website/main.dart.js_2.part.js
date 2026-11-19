((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={DI:function DI(){},QF:function QF(d){this.$ti=d},aQn:function aQn(d){this.a=d},aQo:function aQo(d,e){this.a=d
this.b=e},
a01(d){var x,w,v,u,t,s=new B.apE(),r=J.O(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
x=r.h(d,"conversation_id")
J.l(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.l(w==null?"":w)
v=A.aO(r.h(d,"appele_id"))
A.aO(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.apD(q,x,w,v,u,t)},
bYJ(d){var x,w,v,u=J.O(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mf(t,y.N,y.z):C.e3
if(u.h(d,"cree_le")!=null)A.c5(J.l(u.h(d,"cree_le")))
return new B.Gm(s,x,w,v)},
c8M(d){var x,w,v,u,t,s,r=J.O(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.TO
x=A.b([],y.t)
for(r=J.aq(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gL(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mf(s,u,t))}return new B.a1s(x)},
bL5(d){var x=C.h.b_(d.a,1e6)
return C.c.aW(C.h.j(C.h.b_(x,60)),2,"0")+":"+C.c.aW(C.h.j(C.h.aP(x,60)),2,"0")},
c2A(d){var x=J.O(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oC(v)
if(!x.m(v,"offer")&&!x.m(v,"answer"))return null
return new A.ah8(w,v)},
cmk(d){var x,w,v=J.O(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ahb(u,A.jJ(w)?w:null,v)},
apD:function apD(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
apE:function apE(){},
Gm:function Gm(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a1s:function a1s(d){this.a=d},
bVQ(d,e,f,g,h,i){return new B.p4(e,f,i,h,d,null)},
bVP(d,e,f,g,h){return new B.yx(e,h,f,g,d,null)},
c_0(d,e,f,g,h,i,j,k,l,m,n){return new B.abF(g,f,e,i,h,d,m,l,k,j,n,null)},
p4:function p4(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
U2:function U2(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
bbv:function bbv(d){this.a=d},
bbw:function bbw(d){this.a=d},
bbs:function bbs(d){this.a=d},
bbt:function bbt(d){this.a=d},
bbp:function bbp(d){this.a=d},
bbq:function bbq(d){this.a=d},
bbr:function bbr(d){this.a=d},
bbm:function bbm(d){this.a=d},
bbn:function bbn(d){this.a=d},
bbo:function bbo(d){this.a=d},
bbu:function bbu(d){this.a=d},
SH:function SH(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
yx:function yx(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
U1:function U1(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
bb6:function bb6(d){this.a=d},
bb7:function bb7(d){this.a=d},
bb5:function bb5(){},
bb8:function bb8(d){this.a=d},
bb9:function bb9(d){this.a=d},
bba:function bba(d){this.a=d},
bbb:function bbb(d){this.a=d},
bb4:function bb4(d,e){this.a=d
this.b=e},
bbc:function bbc(){},
bbd:function bbd(d){this.a=d},
bbf:function bbf(d){this.a=d},
bbg:function bbg(d){this.a=d},
bbh:function bbh(d){this.a=d},
bbi:function bbi(d){this.a=d},
bbj:function bbj(d){this.a=d},
bbk:function bbk(d){this.a=d},
bbe:function bbe(d){this.a=d},
bb3:function bb3(d,e){this.a=d
this.b=e},
bb2:function bb2(d,e){this.a=d
this.b=e},
bb1:function bb1(d,e){this.a=d
this.b=e},
bbl:function bbl(d){this.a=d},
abF:function abF(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wB:function wB(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aPL:function aPL(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aPM:function aPM(d){this.a=d},
aPN:function aPN(d){this.a=d},
aPO:function aPO(d){this.a=d},
a1e:function a1e(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
asG:function asG(d){this.a=d},
asH:function asH(d){this.a=d},
amV(d){var x=y.U,w=A.G(new A.W(A.b(d.split(" "),y.s),new B.bM_(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gR(w),0).toUpperCase()
return(J.p(C.b.gR(w),0)+J.p(C.b.gaH(w),0)).toUpperCase()},
bM_:function bM_(){},
aKS:function aKS(){},
mI:function mI(d,e,f){this.e=d
this.a=e
this.b=f},
aGh:function aGh(d){this.a=d},
aGi:function aGi(d){this.a=d},
bPy(d){var x=new B.a51(d)
x.awe(d)
return x},
a51:function a51(d){this.d=d},
aGe:function aGe(d){this.a=d},
aGf:function aGf(d){this.a=d},
aGg:function aGg(d){this.a=d},
aG_:function aG_(){},
aG1:function aG1(){},
aG2:function aG2(){},
aG3:function aG3(d){this.a=d},
aG0:function aG0(d){this.a=d},
cdy(d,e){var x=y.N
x=new B.a6G(d,e,A.C(x,y.E),A.C(x,y.z))
x.awj(d,e)
return x},
a6G:function a6G(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aKV:function aKV(d){this.a=d},
aKW:function aKW(d){this.a=d},
aKX:function aKX(d){this.a=d},
aKY:function aKY(d){this.a=d},
aKZ:function aKZ(d){this.a=d},
aL_:function aL_(d){this.a=d},
aL0:function aL0(d){this.a=d},
aL1:function aL1(d){this.a=d},
aKT:function aKT(d){this.a=d},
aKU:function aKU(d,e){this.a=d
this.b=e},
bQ5:function bQ5(d){this.a=d},
coh(){return C.b.m4(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bM7())!==-1},
bM7:function bM7(){},
bYb(){var x=A.b([],y.d),w=$.bYc
$.bYc=w+1
return new B.Pa(w,x,D.aiC,$.af())},
Pa:function Pa(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.k2$=0
_.k3$=g
_.ok$=_.k4$=0},
aL7:function aL7(d){this.a=d},
aL3:function aL3(d){this.a=d},
aL4:function aL4(d){this.a=d},
aL5:function aL5(d){this.a=d},
aL6:function aL6(){},
bYd(d,e,f){return new B.Pc(d,f,e,null)},
Pc:function Pc(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Pd:function Pd(){this.c=this.a=null},
aL8:function aL8(){},
aLa:function aLa(d){this.a=d},
aL9:function aL9(d){this.a=d},
bWo(d,e,f,g){var x,w={}
w.a=d
x=new B.a3w(g.i("a3w<0>"))
x.aw5(e,f,w,g)
return x},
a3w:function a3w(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
azG:function azG(d,e){this.a=d
this.b=e},
azF:function azF(d){this.a=d},
UT:function UT(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bga:function bga(){},
a8T:function a8T(d){this.b=this.a=$
this.$ti=d},
a8U:function a8U(){},
bOi(d,e){return B.c84(d,e)},
c84(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bOi=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.o_("ws")&&!d.o_("wss"))throw A.n(A.fh(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xS(r,A.fF(null,null,null,!1,y.D))
u=new A.au($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.ci(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fG(new B.He("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.oq(r,"open",!1,y.C).gR(0).az(new B.arB(p,q),y.H)
t=y.C
s=y.H
new A.oq(r,"error",!1,t).gR(0).az(new B.arC(p,q),s)
A.hR(r,"message",new B.arD(q),!1,y.m)
new A.oq(r,"close",!1,t).gR(0).az(new B.arE(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bOi,w)},
xS:function xS(d,e){this.a=d
this.b=e},
arB:function arB(d,e){this.a=d
this.b=e},
arC:function arC(d,e){this.a=d
this.b=e},
arD:function arD(d){this.a=d},
arE:function arE(d,e){this.a=d
this.b=e},
bQI(){return new B.Hd("Connection Closed")},
tc:function tc(){},
GL:function GL(d){this.a=d},
CX:function CX(d){this.a=d},
Dl:function Dl(d,e){this.a=d
this.b=e},
He:function He(d){this.a=d},
Hd:function Hd(d){this.a=d},
c7B(d){var x=null,w=$.aE,v=new B.a8T(y.Z),u=y.X,t=A.fF(x,x,x,!0,u),s=A.fF(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bWo(new A.cA(s,r.i("cA<1>")),new A.C9(t,q.i("C9<1>")),!0,u)
v.b=B.bWo(new A.cA(t,q.i("cA<1>")),new A.C9(s,r.i("C9<1>")),!1,u)
v=new B.anR(new A.aZ(new A.au(w,y.W),y.R),v)
v.avW(d)
return v},
anR:function anR(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
anV:function anV(d){this.a=d},
anS:function anS(d){this.a=d},
anT:function anT(d){this.a=d},
anU:function anU(d,e){this.a=d
this.b=e},
anW:function anW(d){this.a=d},
akO:function akO(d,e){this.b=d
this.a=e},
aa0:function aa0(d){this.a=d},
cnS(d){switch(d){case"new":return D.aip
case"checking":return D.aiq
case"connected":return D.ais
case"completed":return D.air
case"failed":return D.Kn
case"disconnected":return D.aiu
case"closed":return D.Ko
case"count":return D.ait}return D.Ko},
cnT(d){switch(d){case"new":return D.Kp
case"gathering":return D.aiv
case"complete":return D.aiw}return D.Kp},
cpp(d){switch(d){case"stable":return D.aix
case"have-local-offer":return D.aiy
case"have-local-pranswer":return D.aiA
case"have-remote-offer":return D.aiz
case"have-remote-pranswer":return D.aiB
case"closed":return D.Kv}return D.Kv},
cp0(d){switch(d){case"new":return D.Ks
case"connecting":return D.Kt
case"connected":return D.Ku
case"closed":return D.rR
case"disconnected":return D.Kr
case"failed":return D.Kq}return D.rR},
vQ:function vQ(d,e){this.a=d
this.b=e},
P7:function P7(d,e){this.a=d
this.b=e},
vP:function vP(d,e){this.a=d
this.b=e},
mV:function mV(d,e){this.a=d
this.b=e},
a6H:function a6H(d,e){this.a=d
this.b=e},
aKR:function aKR(){},
NM:function NM(){},
EX:function EX(){},
aFZ:function aFZ(){},
FC:function FC(d,e,f){this.a=d
this.b=e
this.c=f},
P8:function P8(){},
aL2:function aL2(){},
Aq:function Aq(d,e){this.a=d
this.b=e},
P9:function P9(d){this.b=d},
Pb:function Pb(d,e,f){this.a=d
this.b=e
this.c=f},
bPf(d){var x=0,w=A.k(y.y)
var $async$bPf=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bPf,w)},
aIL(d){var x=0,w=A.k(y.H),v
var $async$aIL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.d(B.aUG("enableSpeakerphone",A.a5(["enable",d],y.N,v),v,v),$async$aIL)
case 2:return A.i(null,w)}})
return A.j($async$aIL,w)},
aUG(d,e,f,g){return B.cge(d,e,f,g,f.i("0?"))},
cge(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aUG=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.d(B.aUF(),$async$aUG)
case 3:v=D.G1.c4(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aUG,w)},
aUF(){var x=0,w=A.k(y.H),v,u
var $async$aUF=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bZS?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.d(D.G1.c4("initialize",A.a5(["options",A.C(v,u)],v,u),!1,y.H),$async$aUF)
case 4:$.bZS=!0
case 3:return A.i(null,w)}})
return A.j($async$aUF,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[26]
E=c[18]
B.DI.prototype={
D(d,e){this.a.D(0,e)},
d4(d,e){this.a.d4(d,e)},
a5(d){return this.a.a5(0)},
$idH:1}
B.QF.prototype={
iI(d){var x=A.cz("subscription"),w=A.fF(new B.aQn(x),null,null,!0,this.$ti.y[1])
x.b=d.eP(new B.aQo(this,w),w.gm_(w),w.gnA())
return new A.cA(w,A.u(w).i("cA<1>"))}}
B.apD.prototype={}
B.Gm.prototype={}
B.a1s.prototype={}
B.p4.prototype={
N(){return new B.U2()}}
B.U2.prototype={
U(){var x=this
x.W()
x.KC()
x.r=A.dh(C.c0,new B.bbv(x))
x.w=A.iy(C.xp,new B.bbw(x))},
k(){var x=this,w=x.r
if(w!=null)w.V(0)
w=x.w
if(w!=null)w.V(0)
w=x.x
if(w!=null)w.V(0)
x.a3()},
Xw(){var x=this.x
if(x!=null)x.V(0)
this.x=A.dh(C.fT,new B.bbs(this))},
Oi(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Oi=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a8()
x=7
return A.d(o.AN(p.c),$async$Oi)
case 7:r=e
q=B.a01(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.bbt(s))
p=s.r
if(p!=null)p.V(0)
p=s.w
if(p!=null)p.V(0)
s.Xw()}u=2
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
return A.j($async$Oi,w)},
KC(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$KC=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a8()
x=7
return A.d(n.AN(o.c),$async$KC)
case 7:r=e
q=B.a01(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gal_()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.bbp(s))
s.Xw()
x=1
break}s.n(new B.bbq(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.bbr(s))
s.Xw()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KC,w)},
Ks(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Ks=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.bbm(s))
u=4
q=s.a
q.toString
p=$.a8()
x=7
return A.d(p.a0h(q.c,"accepte"),$async$Ks)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.N(n)
if(s.c==null){x=1
break}s.n(new B.bbn(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.B(A.y(null,null,null,null,null,C.f,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.V(0)
q=s.w
if(q!=null)q.V(0)
q=s.c
q.toString
A.aa(q,!1).xo(A.e4(new B.bbo(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ks,w)},
F0(d){return this.aR8(d)},
aR7(){return this.F0(!1)},
aR8(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$F0=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.V(0)
r=s.w
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.a8()
x=7
return A.d(q.a0h(r.c,"refuse"),$async$F0)
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
if(r!=null)A.aa(r,!1).bA()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F0,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.kz(C.o,s,A.c(B.amV(r.d),s,s,s,s,D.MN,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.My,C.V,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.au,new A.a_(D.xJ,x,s),C.k,A.c(q,s,s,s,s,D.tY,s,s,s),D.LZ],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bbu(t)
v=A.a("Accepter")
u=t.f?s:t.gawY()
q.push(A.X(A.b([new B.SH(D.yu,C.aB,r,x,s),D.am6,new B.SH(D.yt,C.cw,v,u,s)],w),C.p,C.bj,C.i,s))}if(t.d)q.push(C.w6)
return A.ex(s,C.n,A.fx(!0,A.cG(A.J(q,C.p,C.e,C.U),s,s),!0,C.aj,!0,!0),s,s,s)}}
B.SH.prototype={
C(d){var x=this,w=null,v=A.dj(x.d,w,w,C.aj,C.cg,w)
return A.J(A.b([A.ab(A.b5(!1,A.c1(x.c,C.l,w,32),C.j,w,C.r,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.ea,w,w,w)],y.p),C.p,C.e,C.U)}}
B.yx.prototype={
N(){return new B.U1(A.b0(y.N),C.R)}}
B.U1.prototype={
U(){var x,w,v=this,u=null
v.W()
v.a.toString
x=B.bYb()
w=B.bYb()
v.d!==$&&A.bj()
v.d=new B.aPL(x,w)
v.a.toString
x=new B.a1e(new A.ds(u,u,y.g),new A.ds(u,u,y.n))
v.e!==$&&A.bj()
v.e=x
v.v9()},
k(){var x=this,w=x.ay
if(w!=null)w.V(0)
w=x.ch
if(w!=null)w.V(0)
w=x.CW
if(w!=null)w.V(0)
w=x.cx
if(w!=null)w.V(0)
w=x.cy
if(w!=null)w.V(0)
w=x.d
w===$&&A.e()
w.iN()
w=x.e
w===$&&A.e()
w.GQ()
x.a3()},
v9(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$v9=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a8()
x=7
return A.d(l.AN(m.c),$async$v9)
case 7:r=e
q=B.a01(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mC(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.d(l.PU(),$async$v9)
case 8:p=e
o=B.c8M(p)
x=9
return A.d(s.Us(),$async$v9)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.y(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mC(null)
x=1
break}m=s.d
m===$&&A.e()
k=s.a.d
x=10
return A.d(m.uj(A.a5(["iceServers",o.a],y.N,y.z),k==="video"),$async$v9)
case 10:m.f=new B.bb6(s)
m.r=new B.bb7(s)
m.w=new B.bb8(s)
if(s.c==null){x=1
break}s.n(new B.bb9(s))
s.ch=A.dh(C.c0,new B.bba(s))
s.CW=A.iy(C.ch,new B.bbb(s))
m=s.e
m===$&&A.e()
k=m.r
s.cx=new A.c_(k,A.u(k).i("c_<1>")).cA(s.gaW8())
k=m.w
s.cy=new A.c_(k,A.u(k).i("c_<1>")).cA(new B.bbc())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.P4(C.c.Se("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f6(C.c9,n,C.ai,!0))}s.ay=A.iy(C.fT,new B.bbd(s))
s.Eq()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.y(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mC(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$v9,w)},
Us(){var x=0,w=A.k(y.y),v
var $async$Us=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Us,w)},
Eq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Eq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a8()
x=7
return A.d(o.bY("/messagerie/appels/"+p.c+"/signaux"),$async$Eq)
case 7:r=e
for(p=J.aq(r);p.A();){q=p.gL(p)
s.afc(B.bYJ(q))}u=2
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
return A.j($async$Eq,w)},
afc(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c2A(d.e)
if(v==null)return
x=s.d
x===$&&A.e()
x.Ah(A.a5(["sdp",v.a,"type",v.b],y.N,y.z)).az(new B.bbf(s),y.a).fF(new B.bbg(s))
break
case"reponse":if(!s.a.f)return
u=B.c2A(d.e)
if(u==null)return
x=s.d
x===$&&A.e()
x.OI(A.a5(["sdp",u.a,"type",u.b],y.N,y.z)).az(new B.bbh(s),y.a).fF(new B.bbi(s))
break
case"candidat_ice":t=B.cmk(d.e)
if(t==null)return
x=s.d
x===$&&A.e()
x.OD(A.a5(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.e()
x.GK().az(new B.bbj(s),y.a).fF(new B.bbk(s))
break
case"refuse":s.mC(A.a("Appel refus\xe9"))
break
case"annule":s.mC(A.a("Appel annul\xe9"))
break
case"termine":s.mC(A.a("Appel termin\xe9"))
break}},
ack(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.V(0)
w.n(new B.bbe(w))},
yK(d,e,f){return this.aDU(d,e,f)},
a8L(d,e){return this.yK(d,e,!0)},
aDU(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$yK=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a8()
x=6
return A.d(r.aj3(s.c,e,d),$async$yK)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$yK,w)},
EX(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$EX=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.V(0)
u=4
r=s.a
r.toString
q=$.a8()
x=7
return A.d(q.a0h(r.c,"termine"),$async$EX)
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
if(r!=null)A.aa(r,!1).bA()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$EX,w)},
mC(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.V(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.y(v,v,v,v,v,C.f,v,A.c(d,v,v,v,v,v,v,v,v),v,C.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.aa(x,!1).bA()},
KL(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KL=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.e()
x=2
return A.d(t.Ts(u),$async$KL)
case 2:if(v.c!=null)v.n(new B.bb3(v,u))
return A.i(null,w)}})
return A.j($async$KL,w)},
KK(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KK=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.e()
x=2
return A.d(t.JI(u),$async$KK)
case 2:if(v.c!=null)v.n(new B.bb2(v,u))
return A.i(null,w)}})
return A.j($async$KK,w)},
KH(){var x=0,w=A.k(y.H),v=this,u,t
var $async$KH=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.e()
x=2
return A.d(t.Tp(u),$async$KH)
case 2:if(v.c!=null)v.n(new B.bb1(v,u))
return A.i(null,w)}})
return A.j($async$KH,w)},
KI(){var x=0,w=A.k(y.H),v=this,u
var $async$KI=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.e()
x=2
return A.d(u.OL(),$async$KI)
case 2:return A.i(null,w)}})
return A.j($async$KI,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.e()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bYd(o.e,!1,D.Kx)
else{x=A.kz(C.o,q,A.c(B.amV(w.e),q,q,q,q,D.aqz,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.aoU,q,q,q)
x=A.cG(A.J(A.b([x,C.q,w,C.k,A.c(r.w?B.bL5(r.ax):A.a(p),q,q,q,q,D.tY,q,q,q)],y.p),C.p,C.e,C.U),q,q)}x=A.Ft(0,x)
o=A.i9(q,A.f8(A.P(12),B.bYd(o.d,!0,D.Kx),C.aq),160,q,q,16,16,110)
w=r.w
v=B.bL5(r.ax)
u=r.z
t=r.Q
u=A.eO(C.b5,A.b([x,o,A.i9(24,B.c_0(r.as,v,w,!0,t,u,r.ga6m(),r.ga6l(),r.ga6n(),r.ga6o(),r.gacB()),q,q,0,0,q,q)],y.p),C.f,C.b3,q)
o=u}else{o=A.kz(C.o,q,A.c(B.amV(w.e),q,q,q,q,D.MN,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.My,C.V,q,q)
if(r.w)w=B.bL5(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.tY,q,q,q)
v=r.w
u=B.bL5(r.ax)
t=r.z
s=r.Q
t=A.cG(A.J(A.b([o,C.au,new A.a_(D.xJ,x,q),C.k,w,D.LZ,B.c_0(r.as,u,v,!1,s,t,r.ga6m(),r.ga6l(),r.ga6n(),r.ga6o(),r.gacB())],y.p),C.p,C.e,C.U),q,q)
o=t}return A.bQ_(!1,A.ex(q,C.n,A.fx(!0,o,!0,C.aj,!0,!0),q,q,q),new B.bbl(r),y.K)}}
B.abF.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.MF,u,u,u))
if(r&&v.c)s.push(C.q)
r=v.f
x=r?D.Zk:D.Zj
t=A.b([new B.wB(x,r,A.a("Muet"),v.x,u,u),D.nU,new B.wB(D.Zr,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nU)
if(r){x=v.w
w=x?D.yy:D.Zq
t.push(new B.wB(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nU)
if(r)t.push(new B.wB(D.Zp,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nU)
t.push(new B.wB(D.yu,!1,A.a("Raccrocher"),v.as,C.aB,u))
s.push(A.X(t,C.p,C.bj,C.i,u))
return A.J(s,C.p,C.e,C.U)}}
B.wB.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.l:C.lA
if(!t)x=C.l
else x=w.d?C.n:C.l
t=A.dj(u,v,v,C.aj,C.cg,v)
return A.J(A.b([A.ab(A.b5(!1,A.c1(w.c,x,v,26),C.j,v,C.r,v,v,v,v,w.f,v,t),56,56),C.b2,A.c(w.e,v,v,v,v,C.MG,v,v,v)],y.p),C.p,C.e,C.U)}}
B.aPL.prototype={
uj(d,e){return this.b8L(d,e)},
b8L(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$uj=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.d(o.io(0),$async$uj)
case 2:x=3
return A.d(v.e.io(0),$async$uj)
case 3:u=$.c4h()
if(e){t=y.N
t=A.a5(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.d(new B.aG_().Cz(0,A.a5(["audio",!0,"video",t],s,r)),$async$uj)
case 4:q=v.b=g
o.sa4t(0,q)
x=5
return A.d(u.a_v(d,A.C(s,r)),$async$uj)
case 5:p=v.a=g
x=6
return A.d(p.kk(0,q),$async$uj)
case 6:p.e=new B.aPM(v)
p.Q=new B.aPN(v)
p.d=new B.aPO(v)
return A.i(null,w)}})
return A.j($async$uj,w)},
aCh(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa4t(0,d)
x=w.r
if(x!=null)x.$0()}},
GK(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$GK=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.Pg(0),$async$GK)
case 3:t=e
x=4
return A.d(s.CN(0,t),$async$GK)
case 4:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$GK,w)},
Ah(d){return this.b0l(d)},
b0l(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ah=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.CP(0,new B.Aq(d.h(0,"sdp"),d.h(0,"type"))),$async$Ah)
case 3:x=4
return A.d(s.Pe(0),$async$Ah)
case 4:t=f
x=5
return A.d(s.CN(0,t),$async$Ah)
case 5:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ah,w)},
OI(d){return this.aYp(d)},
aYp(d){var x=0,w=A.k(y.H),v=this,u
var $async$OI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.d(u.CP(0,new B.Aq(d.h(0,"sdp"),d.h(0,"type"))),$async$OI)
case 2:return A.i(null,w)}})
return A.j($async$OI,w)},
OD(d){return this.aYb(d)},
aYb(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$OD=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.d(t.Ot(new B.FC(A.aO(d.h(0,"candidate")),A.aO(d.h(0,"sdpMid")),A.ee(d.h(0,"sdpMLineIndex")))),$async$OD)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OD,w)},
Ts(d){return this.apN(d)},
apN(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Ts=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.T_(0)
if(r==null)r=C.dm
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skp(0,t)
return A.i(null,w)}})
return A.j($async$Ts,w)},
JI(d){return this.apE(d)},
apE(d){var x=0,w=A.k(y.H)
var $async$JI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.d(B.aIL(d),$async$JI)
case 2:return A.i(null,w)}})
return A.j($async$JI,w)},
Tp(d){return this.apw(d)},
apw(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Tp=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Jr(0)
if(s==null)s=C.dm
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skp(0,d)
return A.i(null,w)}})
return A.j($async$Tp,w)},
OL(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$OL=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Jr(0)
if(s==null)s=D.aao
if(s.length===0){x=1
break}x=3
return A.d(B.bPf(C.b.gR(s)),$async$OL)
case 3:case 1:return A.i(v,w)}})
return A.j($async$OL,w)},
iN(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$iN=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a5(0)
x=7
return A.d(y.x.b(q)?q:A.di(q,y.H),$async$iN)
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
else{o=A.G(q.T_(0),!0,y.G)
C.b.t(o,q.Jr(0))
q=o}if(q==null)q=C.dm
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c7v(r)
if(!m.b(k)){j=new A.au($.aE,n)
j.a=8
j.c=k
k=j}x=15
return A.d(k,$async$iN)
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
return A.d(s.d.k(),$async$iN)
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
return A.d(s.e.k(),$async$iN)
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
return A.j($async$iN,w)}}
B.a1e.prototype={
P4(d){return this.aZJ(d)},
aZJ(d){var x=0,w=A.k(y.H),v=this
var $async$P4=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.d(v.Dk(),$async$P4)
case 2:return A.i(null,w)}})
return A.j($async$P4,w)},
Dk(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Dk=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c7B(B.bOi(A.cy(r,0,null),null))
s.b=q
x=7
return A.d(q.f.a,$async$Dk)
case 7:s.f=0
p=q.r.b
p===$&&A.e()
p=p.b
p===$&&A.e()
s.c=new A.cA(p,A.u(p).i("cA<1>")).aS(s.gaQR(),!0,s.gaPY(),new B.asG(s))
u=2
x=6
break
case 4:u=3
n=t
s.Xn()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Dk,w)},
aQS(d){var x,w,v,u
try{x=C.W.cJ(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.bYJ(w))}catch(u){}},
Xn(){var x,w=this,v=w.c
if(v!=null)v.V(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a6A[v]
w.f=v+1
v=w.d
if(v!=null)v.V(0)
w.d=A.dh(A.d3(0,0,0,0,x),new B.asH(w))},
GQ(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$GQ=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.V(0)
s=t.c
s=s==null?null:s.V(0)
x=2
return A.d(y.x.b(s)?s:A.di(s,y.H),$async$GQ)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.e()
q=q.a
q===$&&A.e()
r!==$&&A.aV()
r=s.w=new B.akO(s,q)}s=r.a5(0)}x=7
return A.d(y._.b(s)?s:A.di(s,y.z),$async$GQ)
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
return A.j($async$GQ,w)}}
B.aKS.prototype={
a_v(d,e){return this.b0c(d,e)},
b0c(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a_v=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a5(["mandatory",A.C(r,r),"optional",A.b([A.a5(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fu(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bP(t)))
t=J.l(s)
v=B.cdy(C.ct.gl9().bh(new A.eJ(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_v,w)}}
B.mI.prototype={
T_(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cI(w,A.U(w).i("cI<1,av>"))
J.fK(w,new B.aGh(x))
return x},
Jr(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cI(w,A.U(w).i("cI<1,av>"))
J.fK(w,new B.aGi(x))
return x}}
B.a51.prototype={
awe(d){var x=this,w=x.d
w.addEventListener("ended",A.bF(new B.aGe(x)))
w.addEventListener("mute",A.bF(new B.aGf(x)))
w.addEventListener("unmute",A.bF(new B.aGg(x)))},
skp(d,e){this.d.enabled=e},
aI(d){var x=0,w=A.k(y.H),v=this
var $async$aI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aI,w)}}
B.aG_.prototype={
Cz(d,e){return this.aoE(0,e)},
aoE(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Cz=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.coh())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iF(e.h(0,"video"),"facingMode")
e.co(0,"video",new B.aG1())
e.co(0,"audio",new B.aG2())}catch(a0){A.no("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hO(e.h(0,"audio"),i,i).aR(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fK(s,new B.aG3(r))
J.iF(e.h(0,"audio"),"optional")
J.j9(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bc(a0)
A.no("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bP(e)
x=10
return A.d(A.dQ(o.getUserMedia(h.a(n)),h),$async$Cz)
case 10:m=a2
i=m
h=i.id
v=new B.mI(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.d(A.dQ(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Cz)
case 11:l=a2
h=l
g=h.id
v=new B.mI(h,g,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.N(f)
i=J.l(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cz,w)}}
B.a6G.prototype={
awj(d,e){var x=this,w=x.at
w===$&&A.e()
w.addEventListener("datachannel",A.bF(new B.aKV(x)))
w.addEventListener("icecandidate",A.bF(new B.aKW(x)))
w.addEventListener("iceconnectionstatechange",A.bF(new B.aKX(x)))
w.onicegatheringstatechange=A.bF(new B.aKY(x))
w.addEventListener("signalingstatechange",A.bF(new B.aKZ(x)))
if(!$.bSF())w.addEventListener("connectionstatechange",A.bF(new B.aL_(x)))
w.addEventListener("negotiationneeded",A.bF(new B.aL0(x)))
w.addEventListener("track",A.bF(new B.aL1(x)))},
Pg(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pg=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dQ(s.createOffer(y.m.a(A.bP(A.C(y.N,y.z)))),y.A),$async$Pg)
case 3:t=f
v=new B.Aq(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pg,w)},
Pe(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Pe=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dQ(s.createAnswer(y.m.a(A.bP(A.C(y.N,y.z)))),y.A),$async$Pe)
case 3:t=f
v=new B.Aq(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Pe,w)},
kk(d,e){var x
this.ax.co(0,e.a,new B.aKU(this,e))
x=this.at
x===$&&A.e()
x.addStream(e.e)
return A.cH(null,y.H)},
CN(d,e){return this.apI(0,e)},
apI(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CN=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dQ(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$CN)
case 2:return A.i(null,w)}})
return A.j($async$CN,w)},
CP(d,e){return this.apY(0,e)},
apY(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$CP=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dQ(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$CP)
case 2:return A.i(null,w)}})
return A.j($async$CP,w)},
Ot(d){return this.aXR(d)},
aXR(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ot=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.e()
u=d.b
u.toString
x=2
return A.d(A.dQ(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Ot)
case 2:return A.i(null,w)}})
return A.j($async$Ot,w)},
a5(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.e()
t.close()
v=A.cH(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5,w)}}
B.bQ5.prototype={
aI(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aI,w)}}
B.Pa.prototype={
salc(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Hh()
if(x!=null)x.style.objectFit=e},
afl(){var x=this,w=x.Hh(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sl(0,v.ai7(u,x.z!=null,0,t))},
sa4t(d,e){var x,w,v,u,t=this
t.z=e
if(e.Jr(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.x.addTrack(w)}}if(e.T_(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.aq(y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>")))
for(;x.A();){w=x.gL(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aDH()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Hh()
if(u!=null){u.srcObject=t.x
x=t.Hh()
x.toString
t.a6b(x)}t.sl(0,t.a.b_7(t.z!=null))},
aDH(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Hh(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].V(0)
q=u.Hh()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.en()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
io(d){var x=0,w=A.k(y.H),v=this
var $async$io=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.CC()
$.oF().r4("RTCVideoRenderer-"+v.Q,new B.aL7(v),!0)
return A.i(null,w)}})
return A.j($async$io,w)},
a6b(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Pc.prototype={
N(){return new B.Pd()}}
B.Pd.prototype={
U(){var x,w,v=this
v.W()
v.a.c.a7(0,v.gaO3())
x=v.a
w=x.c
w.as=x.e
w.salc(0,x.d===D.Kw?"contain":"cover")},
aO4(){if(this.c!=null)this.n(new B.aL8())},
k(){if(this.c!=null)this.a3()},
aT(d){var x,w
this.b7(d)
A.dh(A.d3(0,0,10,0,0),new B.aLa(this))
x=this.a
w=x.c
w.salc(0,x.d===D.Kw?"contain":"cover")},
C(d){return new A.jr(new B.aL9(this),null)}}
B.a3w.prototype={
aw5(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.UT(d,x,new A.aZ(new A.au(w,y.c),y.r),e,g.i("UT<0>"))
if(f.a.ghY())f.a=new B.QF(g.i("@<0>").bV(g).i("QF<1,2>")).iI(f.a)
w=A.fF(null,new B.azG(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
abZ(){var x,w
this.d=!0
x=this.c
if(x!=null)x.V(0)
w=this.b
w===$&&A.e()
w.a5(0)}}
B.UT.prototype={
D(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d4(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.aG7(d,e)},
hl(d){return this.d4(d,null)},
aG7(d,e){var x=this
if(x.w){x.a.a.d4(d,e)
return}x.c.fl(d,e)
x.ac_()
x.b.abZ()
x.a.a.a5(0).fF(new B.bga())},
a5(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.abZ()
x.c.ci(0,x.a.a.a5(0))}return x.c.a},
ac_(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.da(0)
return},
$idH:1}
B.a8T.prototype={}
B.a8U.prototype={}
B.xS.prototype={
a7l(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.Dl(d,e))
x.a5(0)},
a42(d){var x
if((this.b.b&4)!==0)throw A.n(B.bQI())
x=A.bP(d)
x.toString
this.a.send(x)},
w4(d,e,f){return this.aZu(0,e,f)},
aZu(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$w4=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bQI())
u.a5(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$w4,w)},
$ibQH:1}
B.tc.prototype={}
B.GL.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.GL&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.CX.prototype={
m(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.CX&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fP(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Dl.prototype={
m(d,e){if(e==null)return!1
return e instanceof B.Dl&&e.a===this.a&&e.b===this.b},
gH(d){return A.fP([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.He.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Hd.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.anR.prototype={
avW(d){d.eB(new B.anV(this),new B.anW(this),y.a)}}
B.akO.prototype={
a5(d){var x=this.b
x.e=x.d=null
return this.arC(0)}}
B.aa0.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vQ.prototype={
M(){return"RTCSignalingState."+this.b}}
B.P7.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vP.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mV.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a6H.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aKR.prototype={}
B.NM.prototype={}
B.EX.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aFZ.prototype={}
B.FC.prototype={}
B.P8.prototype={}
B.aL2.prototype={}
B.Aq.prototype={}
B.P9.prototype={}
B.Pb.prototype={
ai7(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Pb(x,w,v)},
b_7(d){return this.ai7(null,d,null,null)},
j(d){var x=this
return A.a2(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["ar<~>()","~()","yx(E)","~(Gm)","bn(FC)","bn(P9)","bn(mV)","~(@)","mI(@)","mI()","bn(bQH)","~(tc)"])
B.aQn.prototype={
$0(){return J.c6P(this.a.bn())},
$S:1}
B.aQo.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.e.b(u)){x=u
w=A.bc(v)
this.b.d4(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.apE.prototype={
$1(d){if(d==null)return null
return A.c5(J.l(d))},
$S:160}
B.bbv.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.F0(!0)},
$S:0}
B.bbw.prototype={
$1(d){return this.a.Oi()},
$S:32}
B.bbs.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bA()},
$S:0}
B.bbt.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bbp.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbq.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bbr.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bbm.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bbn.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bbo.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bVP(x.w,w,u,!1,v)},
$S:z+2}
B.bbu.prototype={
$0(){return this.a.aR7()},
$S:0}
B.bb6.prototype={
$1(d){this.a.yK("candidat_ice",d,!1)},
$S:275}
B.bb7.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.bb5())},
$S:0}
B.bb5.prototype={
$0(){},
$S:0}
B.bb8.prototype={
$0(){this.a.mC(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bb9.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bba.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.yK("annule",C.e3,!1)
x.mC(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bbb.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.bb4(x,w))},
$S:32}
B.bb4.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eJ(this.b)},
$S:0}
B.bbc.prototype={
$1(d){},
$S:149}
B.bbd.prototype={
$1(d){this.a.Eq()},
$S:32}
B.bbf.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.ack()
x.a8L("reponse",d)},
$S:377}
B.bbg.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbh.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.ack()},
$S:29}
B.bbi.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbj.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a8L("offre",d)},
$S:377}
B.bbk.prototype={
$1(d){this.a.mC(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bbe.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.R},
$S:0}
B.bb3.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.bb2.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bb1.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bbl.prototype={
$2(d,e){if(!d)this.a.EX()},
$S:968}
B.aPM.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a5(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aPN.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gR(x):null
if(w!=null)this.a.aCh(w)},
$S:z+5}
B.aPO.prototype={
$1(d){var x
if(d===D.Kn){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.asG.prototype={
$1(d){return this.a.Xn()},
$S:21}
B.asH.prototype={
$0(){var x=this.a
if(!x.e)x.Dk()},
$S:0}
B.bM_.prototype={
$1(d){return d.length!==0},
$S:12}
B.aGh.prototype={
$1(d){return this.a.push(B.bPy(d))},
$S:21}
B.aGi.prototype={
$1(d){return this.a.push(B.bPy(d))},
$S:21}
B.aGe.prototype={
$1(d){},
$S:22}
B.aGf.prototype={
$1(d){},
$S:22}
B.aGg.prototype={
$1(d){},
$S:22}
B.aG1.prototype={
$0(){return!1},
$S:45}
B.aG2.prototype={
$0(){return!1},
$S:45}
B.aG3.prototype={
$1(d){J.fK(d,new B.aG0(this.a))},
$S:275}
B.aG0.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:48}
B.aKV.prototype={
$1(d){},
$S:22}
B.aKW.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.FC(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aKX.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.e()
v=B.cnS(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bSF())switch(w.cx.a){case 0:w.cy=D.Ks
break
case 1:w.cy=D.Kt
break
case 3:w.cy=D.Ku
break
case 5:w.cy=D.Kq
break
case 6:w.cy=D.Kr
break
case 7:w.cy=D.rR
break
default:break}},
$S:30}
B.aKY.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.CW=B.cnT(w.iceGatheringState)},
$S:30}
B.aKZ.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.ch=B.cpp(w.signalingState)},
$S:30}
B.aL_.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.cy=B.cp0(w.connectionState)},
$S:30}
B.aL0.prototype={
$1(d){},
$S:30}
B.aL1.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bPy(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cI(x,A.U(x).i("cI<1,av>"))
w=J.ey(x,new B.aKT(w),y.h)
v.$1(new B.P9(A.G(w,!0,w.$ti.i("aC.E"))))}},
$S:22}
B.aKT.prototype={
$1(d){return new B.mI(d,d.id,this.a.as)},
$S:z+8}
B.aKU.prototype={
$0(){var x=this.b.e
return new B.mI(x,x.id,this.a.as)},
$S:z+9}
B.bM7.prototype={
$1(d){return J.fT(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aL7.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.L)(w),++u)w[u].V(0)
C.b.Z(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a6b(t)
v=y.i.c
w.push(A.hR(t,"canplay",new B.aL3(x),!1,v))
w.push(A.hR(t,"resize",new B.aL4(x),!1,v))
w.push(A.hR(t,"error",new B.aL5(t),!1,v))
w.push(A.hR(t,"ended",new B.aL6(),!1,v))
return t},
$S:145}
B.aL3.prototype={
$1(d){this.a.afl()},
$S:21}
B.aL4.prototype={
$1(d){this.a.afl()},
$S:21}
B.aL5.prototype={
$1(d){var x,w,v=this.a.error
A.no("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.FQ.h(0,A.an(v,"code"))
x.toString
w=!J.q(A.an(v,"message"),"")?A.an(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nX(x,C.FP.h(0,A.an(v,"code")),w,null))},
$S:25}
B.aL6.prototype={
$1(d){},
$S:21}
B.aL8.prototype={
$0(){},
$S:0}
B.aLa.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aL9.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a3M("RTCVideoRenderer-"+w.Q)
else w=A.R(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cG(A.R(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:969}
B.azG.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.e()
v.c=x.eP(w.ghk(w),new B.azF(v),w.gnA())},
$S:0}
B.azF.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.e()
w.ac_()
x=x.b
x===$&&A.e()
x.a5(0)},
$S:0}
B.bga.prototype={
$1(d){},
$S:17}
B.arB.prototype={
$1(d){this.a.ci(0,this.b)},
$S:22}
B.arC.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fG(new B.He("Failed to connect WebSocket"))
else this.b.a7l(1006,"error")},
$S:22}
B.arD.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cz("data")
if(typeof x==="string")w.b=new B.GL(A.by(x))
else if(typeof x==="object"&&A.bWR(y.m.a(x),"ArrayBuffer"))w.b=new B.CX(A.Od(y.o.a(x),0,null))
else throw A.n(A.am("unexpected message type: "+J.aA(x).j(0)))
v.D(0,w.bn())},
$S:25}
B.arE.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.ci(0,this.b)
this.b.a7l(d.code,d.reason)},
$S:22}
B.anV.prototype={
$1(d){var x=d.b,w=this.a
new A.cA(x,A.u(x).i("cA<1>")).cA(new B.anS(w))
x=w.r.a
x===$&&A.e()
x=x.b
x===$&&A.e()
new A.cA(x,A.u(x).i("cA<1>")).b5S(new B.anT(d),new B.anU(w,d))
w.f.da(0)},
$S:z+10}
B.anS.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.GL
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.D(0,w)
break $label0$0}x=d instanceof B.CX
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.D(0,v)
break $label0$0}if(d instanceof B.Dl){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.a5(0)}}},
$S:z+11}
B.anT.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.bQI())
s=A.bP(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a42(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a42(new Uint8Array(A.cT(u)))
break $label1$1}t=A.aM("Cannot send "+J.aA(d).j(0))
throw A.n(t)}}catch(r){if(!(A.N(r) instanceof B.Hd))throw r}},
$S:18}
B.anU.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.d(t.b.w4(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.N(q) instanceof B.Hd))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.anW.prototype={
$1(d){var x,w=d instanceof A.RE?d:new B.aa0(J.l(d)),v=this.a
v.f.fG(w)
v=v.r.a
v===$&&A.e()
x=v.a
x===$&&A.e()
x.hl(w)
v=v.a
v===$&&A.e()
v.a5(0)},
$S:30};(function aliases(){var x=B.DI.prototype
x.arC=x.a5})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.U2.prototype,"gawY","Ks",0)
var v
w(v=B.U1.prototype,"gaW8","afc",3)
x(v,"gacB","EX",0)
x(v,"ga6o","KL",0)
x(v,"ga6n","KK",0)
x(v,"ga6l","KH",0)
x(v,"ga6m","KI",0)
w(v=B.a1e.prototype,"gaQR","aQS",7)
x(v,"gaPY","Xn",1)
x(B.Pa.prototype,"gdH","k",0)
x(B.Pd.prototype,"gaO3","aO4",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.DI,B.apD,B.Gm,B.a1s,B.aPL,B.a1e,B.aKR,B.NM,B.EX,B.aFZ,B.P8,B.aL2,B.a8U,B.UT,B.a8T,B.xS,B.tc,B.He,B.aa0,B.FC,B.Aq,B.P9,B.Pb])
w(B.QF,A.fm)
x(A.jS,[B.aQn,B.bbv,B.bbs,B.bbt,B.bbp,B.bbq,B.bbr,B.bbm,B.bbn,B.bbu,B.bb7,B.bb5,B.bb8,B.bb9,B.bba,B.bb4,B.bbe,B.bb3,B.bb2,B.bb1,B.asH,B.aG1,B.aG2,B.aKU,B.aL8,B.aLa,B.azG,B.azF,B.anU])
x(A.iq,[B.aQo,B.apE,B.bbw,B.bbo,B.bb6,B.bbb,B.bbc,B.bbd,B.bbf,B.bbg,B.bbh,B.bbi,B.bbj,B.bbk,B.aPM,B.aPN,B.aPO,B.asG,B.bM_,B.aGh,B.aGi,B.aGe,B.aGf,B.aGg,B.aG3,B.aKV,B.aKW,B.aKX,B.aKY,B.aKZ,B.aL_,B.aL0,B.aL1,B.aKT,B.bM7,B.aL7,B.aL3,B.aL4,B.aL5,B.aL6,B.bga,B.arB,B.arC,B.arD,B.arE,B.anV,B.anS,B.anT,B.anW])
x(A.M,[B.p4,B.yx,B.Pc])
x(A.Q,[B.U2,B.U1,B.Pd])
x(A.at,[B.SH,B.abF,B.wB])
x(A.qH,[B.bbl,B.aG0,B.aL9])
w(B.aKS,B.aKR)
w(B.mI,B.NM)
w(B.a51,B.EX)
w(B.aG_,B.aFZ)
w(B.a6G,B.P8)
w(B.bQ5,B.aL2)
w(B.Pa,A.d5)
x(B.a8U,[B.a3w,B.anR])
x(B.tc,[B.GL,B.CX,B.Dl])
w(B.Hd,B.He)
w(B.akO,B.DI)
x(A.HI,[B.vQ,B.P7,B.vP,B.mV,B.a6H])})()
A.ox(b.typeUniverse,JSON.parse('{"DI":{"dH":["1"]},"QF":{"fm":["1","2"],"fm.S":"1","fm.T":"2"},"yx":{"M":[],"m":[]},"p4":{"M":[],"m":[]},"U2":{"Q":["p4"]},"SH":{"at":[],"m":[]},"U1":{"Q":["yx"]},"abF":{"at":[],"m":[]},"wB":{"at":[],"m":[]},"mI":{"NM":[]},"a51":{"EX":[]},"a6G":{"P8":[]},"Pa":{"d5":["Pb"],"aX":[]},"Pc":{"M":[],"m":[]},"Pd":{"Q":["Pc"]},"UT":{"dH":["1"]},"xS":{"bQH":[]},"GL":{"tc":[]},"CX":{"tc":[]},"Dl":{"tc":[]},"He":{"bM":[]},"Hd":{"bM":[]},"akO":{"dH":["@"]},"aa0":{"bM":[]}}'))
A.bR9(b.typeUniverse,JSON.parse('{"DI":1,"a8U":1}'))
var y=(function rtii(){var x=A.ax
return{b:x("xS"),L:x("bM"),_:x("ar<@>"),x:x("ar<~>"),S:x("D<ac<o,K>>"),t:x("D<ac<o,@>>"),Q:x("D<EX>"),d:x("D<iw<@>>"),s:x("D<o>"),p:x("D<m>"),m:x("av"),l:x("I<av>"),F:x("I<ac<o,@>>"),j:x("I<@>"),I:x("I<v>"),P:x("ac<o,@>"),f:x("ac<@,@>"),E:x("NM"),G:x("EX"),h:x("mI"),o:x("ps"),a:x("bn"),K:x("a0"),J:x("P8"),v:x("Aq"),Z:x("a8T<a0?>"),N:x("o"),e:x("pX"),M:x("e_"),D:x("tc"),U:x("W<o>"),g:x("ds<Gm>"),n:x("ds<~>"),V:x("aZ<xS>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("Uc<av>"),C:x("oq<av>"),k:x("au<xS>"),c:x("au<@>"),W:x("au<~>"),q:x("kr"),y:x("K"),z:x("@"),A:x("av?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.TO=new B.a1s(C.k3)
D.xJ=new A.ao(32,0,32,0)
D.yt=new A.al(57638,!1)
D.yu=new A.al(57639,!1)
D.Zj=new A.al(58337,!1)
D.Zk=new A.al(58341,!1)
D.Zp=new A.al(58923,!1)
D.yy=new A.al(59048,!1)
D.Zq=new A.al(59049,!1)
D.Zr=new A.al(59077,!1)
D.a6A=A.b(x([1,2,4,8,16]),A.ax("D<v>"))
D.aao=A.b(x([]),y.Q)
D.G1=new A.fl("FlutterWebRTC.Method",C.b6,null)
D.aip=new B.mV(0,"RTCIceConnectionStateNew")
D.aiq=new B.mV(1,"RTCIceConnectionStateChecking")
D.air=new B.mV(2,"RTCIceConnectionStateCompleted")
D.ais=new B.mV(3,"RTCIceConnectionStateConnected")
D.ait=new B.mV(4,"RTCIceConnectionStateCount")
D.Kn=new B.mV(5,"RTCIceConnectionStateFailed")
D.aiu=new B.mV(6,"RTCIceConnectionStateDisconnected")
D.Ko=new B.mV(7,"RTCIceConnectionStateClosed")
D.Kp=new B.P7(0,"RTCIceGatheringStateNew")
D.aiv=new B.P7(1,"RTCIceGatheringStateGathering")
D.aiw=new B.P7(2,"RTCIceGatheringStateComplete")
D.rR=new B.vP(0,"RTCPeerConnectionStateClosed")
D.Kq=new B.vP(1,"RTCPeerConnectionStateFailed")
D.Kr=new B.vP(2,"RTCPeerConnectionStateDisconnected")
D.Ks=new B.vP(3,"RTCPeerConnectionStateNew")
D.Kt=new B.vP(4,"RTCPeerConnectionStateConnecting")
D.Ku=new B.vP(5,"RTCPeerConnectionStateConnected")
D.aix=new B.vQ(0,"RTCSignalingStateStable")
D.aiy=new B.vQ(1,"RTCSignalingStateHaveLocalOffer")
D.aiz=new B.vQ(2,"RTCSignalingStateHaveRemoteOffer")
D.aiA=new B.vQ(3,"RTCSignalingStateHaveLocalPrAnswer")
D.aiB=new B.vQ(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Kv=new B.vQ(5,"RTCSignalingStateClosed")
D.aiC=new B.Pb(0,0,0)
D.Kw=new B.a6H(0,"RTCVideoViewObjectFitContain")
D.Kx=new B.a6H(1,"RTCVideoViewObjectFitCover")
D.nU=new A.c4(20,null,null,null)
D.am6=new A.c4(48,null,null,null)
D.LZ=new A.c4(null,64,null,null)
D.aoU=new A.z(!0,C.l,null,null,null,null,22,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.My=new A.z(!0,C.l,null,null,null,null,26,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.tY=new A.z(!0,C.ac,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aqz=new A.z(!0,C.n,null,null,null,null,32,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.MN=new A.z(!0,C.n,null,null,null,null,40,C.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bZS=!1
$.bYc=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"csO","c4h",()=>new B.aKS())
x($,"cqS","bSF",()=>C.c.q(A.an(A.an(A.an(A.bSl(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"WPGBkmrB+6vEUydzf78AJZFFyVk=");