((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={E4:function E4(){},R8:function R8(d){this.$ti=d},aRR:function aRR(d){this.a=d},aRS:function aRS(d,e){this.a=d
this.b=e},
a0J(d){var x,w,v,u,t,s=new B.aqX(),r=J.L(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
x=r.h(d,"conversation_id")
J.l(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.l(w==null?"":w)
v=A.aj(r.h(d,"appele_id"))
A.aj(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.aqW(q,x,w,v,u,t)},
c0j(d){var x,w,v,u=J.L(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mk(t,y.N,y.z):C.ea
if(u.h(d,"cree_le")!=null)A.c3(J.l(u.h(d,"cree_le")))
return new B.GN(s,x,w,v)},
cbp(d){var x,w,v,u,t,s,r=J.L(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.UC
x=A.b([],y.t)
for(r=J.ar(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mk(s,u,t))}return new B.a2c(x)},
bNh(d){var x=C.h.aZ(d.a,1e6)
return C.c.aV(C.h.j(C.h.aZ(x,60)),2,"0")+":"+C.c.aV(C.h.j(C.h.aP(x,60)),2,"0")},
c5b(d){var x=J.L(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oO(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.ai4(w,v)},
cpg(d){var x,w,v=J.L(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ai7(u,A.jO(w)?w:null,v)},
aqW:function aqW(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
aqX:function aqX(){},
GN:function GN(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a2c:function a2c(d){this.a=d},
bYk(d,e,f,g,h,i){return new B.ph(e,f,i,h,d,null)},
bYj(d,e,f,g,h){return new B.yM(e,h,f,g,d,null)},
c1z(d,e,f,g,h,i,j,k,l,m,n){return new B.acA(g,f,e,i,h,d,m,l,k,j,n,null)},
ph:function ph(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
UB:function UB(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
bd5:function bd5(d){this.a=d},
bd6:function bd6(d){this.a=d},
bd2:function bd2(d){this.a=d},
bd3:function bd3(d){this.a=d},
bd_:function bd_(d){this.a=d},
bd0:function bd0(d){this.a=d},
bd1:function bd1(d){this.a=d},
bcX:function bcX(d){this.a=d},
bcY:function bcY(d){this.a=d},
bcZ:function bcZ(d){this.a=d},
bd4:function bd4(d){this.a=d},
Tf:function Tf(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
yM:function yM(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
UA:function UA(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
bcG:function bcG(d){this.a=d},
bcH:function bcH(d){this.a=d},
bcF:function bcF(){},
bcI:function bcI(d){this.a=d},
bcJ:function bcJ(d){this.a=d},
bcK:function bcK(d){this.a=d},
bcL:function bcL(d){this.a=d},
bcE:function bcE(d,e){this.a=d
this.b=e},
bcM:function bcM(){},
bcN:function bcN(d){this.a=d},
bcQ:function bcQ(d){this.a=d},
bcR:function bcR(d){this.a=d},
bcS:function bcS(d){this.a=d},
bcT:function bcT(d){this.a=d},
bcU:function bcU(d){this.a=d},
bcV:function bcV(d){this.a=d},
bcO:function bcO(d){this.a=d},
bcP:function bcP(){},
bcD:function bcD(d,e){this.a=d
this.b=e},
bcC:function bcC(d,e){this.a=d
this.b=e},
bcB:function bcB(d,e){this.a=d
this.b=e},
bcW:function bcW(d){this.a=d},
acA:function acA(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
wN:function wN(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aRd:function aRd(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aRe:function aRe(d){this.a=d},
aRf:function aRf(d){this.a=d},
aRg:function aRg(d){this.a=d},
a1Z:function a1Z(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
au_:function au_(d){this.a=d},
au0:function au0(d){this.a=d},
ao0(d){var x=y.U,w=A.D(new A.U(A.b(d.split(" "),y.s),new B.bOb(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gP(w),0).toUpperCase()
return(J.p(C.b.gP(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bOb:function bOb(){},
aMf:function aMf(){},
mR:function mR(d,e,f){this.e=d
this.a=e
this.b=f},
aI5:function aI5(d){this.a=d},
aI6:function aI6(d){this.a=d},
bS_(d){var x=new B.a5S(d)
x.axk(d)
return x},
a5S:function a5S(d){this.d=d},
aI2:function aI2(d){this.a=d},
aI3:function aI3(d){this.a=d},
aI4:function aI4(d){this.a=d},
aHP:function aHP(){},
aHR:function aHR(){},
aHS:function aHS(){},
aHT:function aHT(d){this.a=d},
aHQ:function aHQ(d){this.a=d},
cgo(d,e){var x=y.N
x=new B.a7y(d,e,A.C(x,y.E),A.C(x,y.z))
x.axp(d,e)
return x},
a7y:function a7y(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aMi:function aMi(d){this.a=d},
aMj:function aMj(d){this.a=d},
aMk:function aMk(d){this.a=d},
aMl:function aMl(d){this.a=d},
aMm:function aMm(d){this.a=d},
aMn:function aMn(d){this.a=d},
aMo:function aMo(d){this.a=d},
aMp:function aMp(d){this.a=d},
aMg:function aMg(d){this.a=d},
aMh:function aMh(d,e){this.a=d
this.b=e},
bSx:function bSx(d){this.a=d},
crf(){return C.b.mb(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bOj())!==-1},
bOj:function bOj(){},
c_K(){var x=A.b([],y.d),w=$.c_L
$.c_L=w+1
return new B.PE(w,x,D.akm,$.ad())},
PE:function PE(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.k2$=0
_.k3$=g
_.ok$=_.k4$=0},
aMv:function aMv(d){this.a=d},
aMr:function aMr(d){this.a=d},
aMs:function aMs(d){this.a=d},
aMt:function aMt(d){this.a=d},
aMu:function aMu(){},
c_M(d,e,f){return new B.PG(d,f,e,null)},
PG:function PG(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
PH:function PH(){this.c=this.a=null},
aMw:function aMw(){},
aMy:function aMy(d){this.a=d},
aMx:function aMx(d){this.a=d},
bYX(d,e,f,g){var x,w={}
w.a=d
x=new B.a4k(g.i("a4k<0>"))
x.axb(e,f,w,g)
return x},
a4k:function a4k(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aBn:function aBn(d,e){this.a=d
this.b=e},
aBm:function aBm(d){this.a=d},
Vt:function Vt(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bhJ:function bhJ(){},
a9M:function a9M(d){this.b=this.a=$
this.$ti=d},
a9N:function a9N(){},
bQL(d,e){return B.caH(d,e)},
caH(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bQL=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.ob("ws")&&!d.ob("wss"))throw A.n(A.f9(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.y5(r,A.fp(null,null,null,!1,y.D))
u=new A.av($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.cf(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fJ(new B.HG("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.oz(r,"open",!1,y.C).gP(0).ar(new B.asU(p,q),y.H)
t=y.C
s=y.H
new A.oz(r,"error",!1,t).gP(0).ar(new B.asV(p,q),s)
A.hT(r,"message",new B.asW(q),!1,y.m)
new A.oz(r,"close",!1,t).gP(0).ar(new B.asX(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bQL,w)},
y5:function y5(d,e){this.a=d
this.b=e},
asU:function asU(d,e){this.a=d
this.b=e},
asV:function asV(d,e){this.a=d
this.b=e},
asW:function asW(d){this.a=d},
asX:function asX(d,e){this.a=d
this.b=e},
bTa(){return new B.HF("Connection Closed")},
tn:function tn(){},
Hb:function Hb(d){this.a=d},
Dh:function Dh(d){this.a=d},
DH:function DH(d,e){this.a=d
this.b=e},
HG:function HG(d){this.a=d},
HF:function HF(d){this.a=d},
cac(d){var x=null,w=$.aE,v=new B.a9M(y.Z),u=y.X,t=A.fp(x,x,x,!0,u),s=A.fp(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bYX(new A.co(s,r.i("co<1>")),new A.Cv(t,q.i("Cv<1>")),!0,u)
v.b=B.bYX(new A.co(t,q.i("co<1>")),new A.Cv(s,r.i("Cv<1>")),!1,u)
v=new B.ap3(new A.aZ(new A.av(w,y.W),y.R),v)
v.ax1(d)
return v},
ap3:function ap3(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
ap7:function ap7(d){this.a=d},
ap4:function ap4(d){this.a=d},
ap5:function ap5(d){this.a=d},
ap6:function ap6(d,e){this.a=d
this.b=e},
ap8:function ap8(d){this.a=d},
alQ:function alQ(d,e){this.b=d
this.a=e},
aaV:function aaV(d){this.a=d},
cqP(d){switch(d){case"new":return D.ak9
case"checking":return D.aka
case"connected":return D.akc
case"completed":return D.akb
case"failed":return D.KW
case"disconnected":return D.ake
case"closed":return D.KX
case"count":return D.akd}return D.KX},
cqQ(d){switch(d){case"new":return D.KY
case"gathering":return D.akf
case"complete":return D.akg}return D.KY},
csm(d){switch(d){case"stable":return D.akh
case"have-local-offer":return D.aki
case"have-local-pranswer":return D.akk
case"have-remote-offer":return D.akj
case"have-remote-pranswer":return D.akl
case"closed":return D.L3}return D.L3},
cs1(d){switch(d){case"new":return D.L0
case"connecting":return D.L1
case"connected":return D.L2
case"closed":return D.t8
case"disconnected":return D.L_
case"failed":return D.KZ}return D.t8},
w_:function w_(d,e){this.a=d
this.b=e},
PB:function PB(d,e){this.a=d
this.b=e},
vZ:function vZ(d,e){this.a=d
this.b=e},
n3:function n3(d,e){this.a=d
this.b=e},
a7z:function a7z(d,e){this.a=d
this.b=e},
aMe:function aMe(){},
Og:function Og(){},
Fn:function Fn(){},
aHO:function aHO(){},
G2:function G2(d,e,f){this.a=d
this.b=e
this.c=f},
PC:function PC(){},
aMq:function aMq(){},
AK:function AK(d,e){this.a=d
this.b=e},
PD:function PD(d){this.b=d},
PF:function PF(d,e,f){this.a=d
this.b=e
this.c=f},
bRG(d){var x=0,w=A.k(y.y)
var $async$bRG=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bRG,w)},
aK5(d){var x=0,w=A.k(y.H),v
var $async$aK5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.d(B.aWf("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aK5)
case 2:return A.i(null,w)}})
return A.j($async$aK5,w)},
aWf(d,e,f,g){return B.cj6(d,e,f,g,f.i("0?"))},
cj6(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aWf=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.d(B.aWe(),$async$aWf)
case 3:v=D.Gz.c6(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aWf,w)},
aWe(){var x=0,w=A.k(y.H),v,u
var $async$aWe=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c1q?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.d(D.Gz.c6("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aWe)
case 4:$.c1q=!0
case 3:return A.i(null,w)}})
return A.j($async$aWe,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[5],B)
D=c[28]
E=c[18]
B.E4.prototype={
D(d,e){this.a.D(0,e)},
d1(d,e){this.a.d1(d,e)},
a3(d){return this.a.a3(0)},
$idK:1}
B.R8.prototype={
fT(d){var x=A.cA("subscription"),w=A.fp(new B.aRR(x),null,null,!0,this.$ti.y[1])
x.b=d.eW(new B.aRS(this,w),w.gm4(w),w.gnL())
return new A.co(w,A.u(w).i("co<1>"))}}
B.aqW.prototype={}
B.GN.prototype={}
B.a2c.prototype={}
B.ph.prototype={
N(){return new B.UB()}}
B.UB.prototype={
U(){var x=this
x.X()
x.L8()
x.r=A.dj(C.c3,new B.bd5(x))
x.w=A.iE(C.xQ,new B.bd6(x))},
l(){var x=this,w=x.r
if(w!=null)w.W(0)
w=x.w
if(w!=null)w.W(0)
w=x.x
if(w!=null)w.W(0)
x.a0()},
Yk(){var x=this.x
if(x!=null)x.W(0)
this.x=A.dj(C.fT,new B.bd2(this))},
OT(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$OT=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.d(o.B0(p.c),$async$OT)
case 7:r=e
q=B.a0J(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.m(new B.bd3(s))
p=s.r
if(p!=null)p.W(0)
p=s.w
if(p!=null)p.W(0)
s.Yk()}u=2
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
return A.j($async$OT,w)},
L8(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$L8=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.d(n.B0(o.c),$async$L8)
case 7:r=e
q=B.a0J(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.galX()
p=m
if(q.w!=="sonne"||q.c===p){s.m(new B.bd_(s))
s.Yk()
x=1
break}s.m(new B.bd0(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.m(new B.bd1(s))
s.Yk()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$L8,w)},
KW(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$KW=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.m(new B.bcX(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.d(p.Qx(q.c,"accepte"),$async$KW)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.m(new B.bcY(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(p,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.W(0)
q=s.w
if(q!=null)q.W(0)
q=s.c
q.toString
A.aa(q,!1).xz(A.e7(new B.bcZ(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KW,w)},
Fn(d){return this.aSl(d)},
aSk(){return this.Fn(!1)},
aSl(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Fn=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.W(0)
r=s.w
if(r!=null)r.W(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.d(q.Qx(r.c,"refuse"),$async$Fn)
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
if(r!=null)A.aa(r,!1).bt()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Fn,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jW(C.t,s,A.c(B.ao0(r.d),s,s,s,s,D.Nm,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.Ne,C.W,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.ay,new A.Z(D.yc,x,s),C.l,A.c(q,s,s,s,s,D.ui,s,s,s),D.MA],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bd4(t)
v=A.a("Accepter")
u=t.f?s:t.gay3()
q.push(A.V(A.b([new B.Tf(D.yU,C.aB,r,x,s),D.anS,new B.Tf(D.ql,C.cy,v,u,s)],w),C.o,C.bo,C.i,s))}if(t.d)q.push(C.wv)
return A.eB(s,C.n,A.fo(!0,A.cB(A.I(q,C.o,C.e,C.V),s,s),!0,C.ag,!0,!0),s,s,s)}}
B.Tf.prototype={
C(d){var x=this,w=null,v=A.d3(x.d,w,w,C.ag,C.cO,w)
return A.I(A.b([A.ac(A.b3(!1,A.c4(x.c,C.k,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.dT,w,w,w)],y.p),C.o,C.e,C.V)}}
B.yM.prototype={
N(){return new B.UA(A.b0(y.N),C.Q)}}
B.UA.prototype={
U(){var x,w,v=this,u=null
v.X()
v.a.toString
x=B.c_K()
w=B.c_K()
v.d!==$&&A.bj()
v.d=new B.aRd(x,w)
v.a.toString
x=new B.a1Z(new A.dv(u,u,y.g),new A.dv(u,u,y.n))
v.e!==$&&A.bj()
v.e=x
v.vn()},
l(){var x=this,w=x.ay
if(w!=null)w.W(0)
w=x.ch
if(w!=null)w.W(0)
w=x.CW
if(w!=null)w.W(0)
w=x.cx
if(w!=null)w.W(0)
w=x.cy
if(w!=null)w.W(0)
w=x.d
w===$&&A.e()
w.iX()
w=x.e
w===$&&A.e()
w.Hd()
x.a0()},
vn(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$vn=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a7()
x=7
return A.d(l.B0(m.c),$async$vn)
case 7:r=e
q=B.a0J(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mI(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.d(l.QF(),$async$vn)
case 8:p=e
o=B.cbp(p)
x=9
return A.d(s.Vi(),$async$vn)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))}s.mI(null)
x=1
break}m=s.d
m===$&&A.e()
k=s.a.d
x=10
return A.d(m.uA(A.a6(["iceServers",o.a],y.N,y.z),k==="video"),$async$vn)
case 10:m.f=new B.bcG(s)
m.r=new B.bcH(s)
m.w=new B.bcI(s)
if(s.c==null){x=1
break}s.m(new B.bcJ(s))
s.ch=A.dj(C.c3,new B.bcK(s))
s.CW=A.iE(C.ck,new B.bcL(s))
m=s.e
m===$&&A.e()
k=m.r
s.cx=new A.bX(k,A.u(k).i("bX<1>")).cB(s.gaXz())
k=m.w
s.cy=new A.bX(k,A.u(k).i("bX<1>")).cB(new B.bcM())
s.a.toString
n=l.b
if(n!=null&&J.a5(n)!==0){s.a.toString
m.PM(C.c.T1("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eD(C.bN,n,C.af,!0))}s.ay=A.iE(C.fT,new B.bcN(s))
s.EN()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(l,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mI(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$vn,w)},
Vi(){var x=0,w=A.k(y.y),v
var $async$Vi=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Vi,w)},
EN(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$EN=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.d(o.bW("/messagerie/appels/"+p.c+"/signaux"),$async$EN)
case 7:r=e
for(p=J.ar(r);p.A();){q=p.gK(p)
s.ag3(B.c0j(q))}u=2
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
return A.j($async$EN,w)},
ag3(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c5b(d.e)
if(v==null)return
x=s.d
x===$&&A.e()
x.Ax(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).ar(new B.bcQ(s),y.a).fg(new B.bcR(s))
break
case"reponse":if(!s.a.f)return
u=B.c5b(d.e)
if(u==null)return
x=s.d
x===$&&A.e()
x.Pl(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).ar(new B.bcS(s),y.a).fg(new B.bcT(s))
break
case"candidat_ice":t=B.cpg(d.e)
if(t==null)return
x=s.d
x===$&&A.e()
x.Pf(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.e()
x.H7().ar(new B.bcU(s),y.a).fg(new B.bcV(s))
break
case"refuse":s.mI(A.a("Appel refus\xe9"))
break
case"annule":s.mI(A.a("Appel annul\xe9"))
break
case"termine":s.mI(A.a("Appel termin\xe9"))
break}},
ad2(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.W(0)
w.m(new B.bcO(w))},
z_(d,e,f){return this.aF5(d,e,f)},
a9u(d,e){return this.z_(d,e,!0)},
aF5(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$z_=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.d(r.ajX(s.c,e,d),$async$z_)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mI(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$z_,w)},
Fj(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Fj=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.W(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.d(q.Qx(r.c,"termine"),$async$Fj)
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
if(r!=null)A.aa(r,!1).bt()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Fj,w)},
mI(d){var x,w,v=this,u=null
if(v.x)return
v.x=!0
x=v.ch
if(x!=null)x.W(0)
x=v.a
x.toString
w=$.a7()
w.Qx(x.c,"termine").fg(new B.bcP())
if(d!=null&&v.c!=null)v.c.u(y.q).f.B(A.z(u,u,u,u,u,C.f,u,A.c(d,u,u,u,u,u,u,u,u),u,C.m,u,u,u,u,u,u,u,u,u))
x=v.c
if(x!=null)A.aa(x,!1).bt()},
Lh(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Lh=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.e()
x=2
return A.d(t.Ue(u),$async$Lh)
case 2:if(v.c!=null)v.m(new B.bcD(v,u))
return A.i(null,w)}})
return A.j($async$Lh,w)},
Lg(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Lg=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.e()
x=2
return A.d(t.Kb(u),$async$Lg)
case 2:if(v.c!=null)v.m(new B.bcC(v,u))
return A.i(null,w)}})
return A.j($async$Lg,w)},
Ld(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ld=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.e()
x=2
return A.d(t.Ub(u),$async$Ld)
case 2:if(v.c!=null)v.m(new B.bcB(v,u))
return A.i(null,w)}})
return A.j($async$Ld,w)},
Le(){var x=0,w=A.k(y.H),v=this,u
var $async$Le=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.e()
x=2
return A.d(u.Pq(),$async$Le)
case 2:return A.i(null,w)}})
return A.j($async$Le,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.e()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.c_M(o.e,!1,D.L5)
else{x=A.jW(C.t,q,A.c(B.ao0(w.e),q,q,q,q,D.arq,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,D.ar0,q,q,q)
x=A.cB(A.I(A.b([x,C.p,w,C.l,A.c(r.w?B.bNh(r.ax):A.a(p),q,q,q,q,D.ui,q,q,q)],y.p),C.o,C.e,C.V),q,q)}x=A.Pl(0,x)
o=A.fz(q,A.f1(A.Q(12),B.c_M(o.d,!0,D.L5),C.aq),160,q,q,16,16,110)
w=r.w
v=B.bNh(r.ax)
u=r.z
t=r.Q
u=A.eC(C.b5,A.b([x,o,A.fz(24,B.c1z(r.as,v,w,!0,t,u,r.ga7b(),r.ga7a(),r.ga7c(),r.ga7d(),r.gadn()),q,q,0,0,q,q)],y.p),C.f,C.b1,q)
o=u}else{o=A.jW(C.t,q,A.c(B.ao0(w.e),q,q,q,q,D.Nm,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,D.Ne,C.W,q,q)
if(r.w)w=B.bNh(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,D.ui,q,q,q)
v=r.w
u=B.bNh(r.ax)
t=r.z
s=r.Q
t=A.cB(A.I(A.b([o,C.ay,new A.Z(D.yc,x,q),C.l,w,D.MA,B.c1z(r.as,u,v,!1,s,t,r.ga7b(),r.ga7a(),r.ga7c(),r.ga7d(),r.gadn())],y.p),C.o,C.e,C.V),q,q)
o=t}return A.bSr(!1,A.eB(q,C.n,A.fo(!0,o,!0,C.ag,!0,!0),q,q,q),new B.bcW(r),y.K)}}
B.acA.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Np,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_i:D.a_h
t=A.b([new B.wN(x,r,A.a("Muet"),v.x,u,u),D.nV,new B.wN(D.a_o,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nV)
if(r){x=v.w
w=x?D.z_:D.a_n
t.push(new B.wN(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nV)
if(r)t.push(new B.wN(D.a_m,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nV)
t.push(new B.wN(D.yU,!1,A.a("Raccrocher"),v.as,C.aB,u))
s.push(A.V(t,C.o,C.bo,C.i,u))
return A.I(s,C.o,C.e,C.V)}}
B.wN.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.k:C.lL
if(!t)x=C.k
else x=w.d?C.n:C.k
t=A.d3(u,v,v,C.ag,C.cO,v)
return A.I(A.b([A.ac(A.b3(!1,A.c4(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aR,A.c(w.e,v,v,v,v,C.Nq,v,v,v)],y.p),C.o,C.e,C.V)}}
B.aRd.prototype={
uA(d,e){return this.bao(d,e)},
bao(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$uA=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.d(o.ix(0),$async$uA)
case 2:x=3
return A.d(v.e.ix(0),$async$uA)
case 3:u=$.c6S()
if(e){t=y.N
t=A.a6(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.d(new B.aHP().CQ(0,A.a6(["audio",!0,"video",t],s,r)),$async$uA)
case 4:q=v.b=g
o.sa5i(0,q)
x=5
return A.d(u.a0g(d,A.C(s,r)),$async$uA)
case 5:p=v.a=g
x=6
return A.d(p.ji(0,q),$async$uA)
case 6:p.e=new B.aRe(v)
p.Q=new B.aRf(v)
p.d=new B.aRg(v)
return A.i(null,w)}})
return A.j($async$uA,w)},
aDt(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa5i(0,d)
x=w.r
if(x!=null)x.$0()}},
H7(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$H7=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.PZ(0),$async$H7)
case 3:t=e
x=4
return A.d(s.D3(0,t),$async$H7)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$H7,w)},
Ax(d){return this.b1X(d)},
b1X(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ax=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.D5(0,new B.AK(d.h(0,"sdp"),d.h(0,"type"))),$async$Ax)
case 3:x=4
return A.d(s.PW(0),$async$Ax)
case 4:t=f
x=5
return A.d(s.D3(0,t),$async$Ax)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ax,w)},
Pl(d){return this.aZU(d)},
aZU(d){var x=0,w=A.k(y.H),v=this,u
var $async$Pl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.d(u.D5(0,new B.AK(d.h(0,"sdp"),d.h(0,"type"))),$async$Pl)
case 2:return A.i(null,w)}})
return A.j($async$Pl,w)},
Pf(d){return this.aZF(d)},
aZF(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Pf=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.d(t.P3(new B.G2(A.aj(d.h(0,"candidate")),A.aj(d.h(0,"sdpMid")),A.dI(d.h(0,"sdpMLineIndex")))),$async$Pf)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Pf,w)},
Ue(d){return this.aqQ(d)},
aqQ(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Ue=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.TN(0)
if(r==null)r=C.dn
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.M)(r),++s)r[s].skq(0,t)
return A.i(null,w)}})
return A.j($async$Ue,w)},
Kb(d){return this.aqH(d)},
aqH(d){var x=0,w=A.k(y.H)
var $async$Kb=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.d(B.aK5(d),$async$Kb)
case 2:return A.i(null,w)}})
return A.j($async$Kb,w)},
Ub(d){return this.aqz(d)},
aqz(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Ub=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.JV(0)
if(s==null)s=C.dn
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.M)(s),++t)s[t].skq(0,d)
return A.i(null,w)}})
return A.j($async$Ub,w)},
Pq(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Pq=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.JV(0)
if(s==null)s=D.abI
if(s.length===0){x=1
break}x=3
return A.d(B.bRG(C.b.gP(s)),$async$Pq)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Pq,w)},
iX(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$iX=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a3(0)
x=7
return A.d(y.x.b(q)?q:A.dk(q,y.H),$async$iX)
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
else{o=A.D(q.TN(0),!0,y.G)
C.b.t(o,q.JV(0))
q=o}if(q==null)q=C.dn
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.ca6(r)
if(!m.b(k)){j=new A.av($.aE,n)
j.a=8
j.c=k
k=j}x=15
return A.d(k,$async$iX)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.M)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.d(s.d.l(),$async$iX)
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
return A.d(s.e.l(),$async$iX)
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
return A.j($async$iX,w)}}
B.a1Z.prototype={
PM(d){return this.b0d(d)},
b0d(d){var x=0,w=A.k(y.H),v=this
var $async$PM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.d(v.DA(),$async$PM)
case 2:return A.i(null,w)}})
return A.j($async$PM,w)},
DA(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$DA=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a5(r)===0){x=1
break}u=4
q=B.cac(B.bQL(A.cy(r,0,null),null))
s.b=q
x=7
return A.d(q.f.a,$async$DA)
case 7:s.f=0
p=q.r.b
p===$&&A.e()
p=p.b
p===$&&A.e()
s.c=new A.co(p,A.u(p).i("co<1>")).aR(s.gaS3(),!0,s.gaRb(),new B.au_(s))
u=2
x=6
break
case 4:u=3
n=t
s.Yb()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$DA,w)},
aS4(d){var x,w,v,u
try{x=C.Y.cD(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.c0j(w))}catch(u){}},
Yb(){var x,w=this,v=w.c
if(v!=null)v.W(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a7X[v]
w.f=v+1
v=w.d
if(v!=null)v.W(0)
w.d=A.dj(A.d2(0,0,0,0,x),new B.au0(w))},
Hd(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Hd=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.W(0)
s=t.c
s=s==null?null:s.W(0)
x=2
return A.d(y.x.b(s)?s:A.dk(s,y.H),$async$Hd)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.e()
q=q.a
q===$&&A.e()
r!==$&&A.aX()
r=s.w=new B.alQ(s,q)}s=r.a3(0)}x=7
return A.d(y._.b(s)?s:A.dk(s,y.z),$async$Hd)
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
return A.j($async$Hd,w)}}
B.aMf.prototype={
a0g(d,e){return this.b1N(d,e)},
b1N(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a0g=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.b([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fd(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bT(t)))
t=J.l(s)
v=B.cgo(C.cw.glg().be(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0g,w)}}
B.mR.prototype={
TN(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cK(w,A.T(w).i("cK<1,ax>"))
J.fR(w,new B.aI5(x))
return x},
JV(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cK(w,A.T(w).i("cK<1,ax>"))
J.fR(w,new B.aI6(x))
return x}}
B.a5S.prototype={
axk(d){var x=this,w=x.d
w.addEventListener("ended",A.bG(new B.aI2(x)))
w.addEventListener("mute",A.bG(new B.aI3(x)))
w.addEventListener("unmute",A.bG(new B.aI4(x)))},
skq(d,e){this.d.enabled=e},
aH(d){var x=0,w=A.k(y.H),v=this
var $async$aH=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aH,w)}}
B.aHP.prototype={
CQ(d,e){return this.apG(0,e)},
apG(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CQ=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.crf())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iN(e.h(0,"video"),"facingMode")
e.cq(0,"video",new B.aHR())
e.cq(0,"audio",new B.aHS())}catch(a0){A.nv("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hQ(e.h(0,"audio"),i,i).au(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fR(s,new B.aHT(r))
J.iN(e.h(0,"audio"),"optional")
J.iM(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.bc(a0)
A.nv("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bT(e)
x=10
return A.d(A.dV(o.getUserMedia(h.a(n)),h),$async$CQ)
case 10:m=a2
i=m
h=i.id
v=new B.mR(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.d(A.dV(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$CQ)
case 11:l=a2
h=l
g=h.id
v=new B.mR(h,g,"local")
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
return A.j($async$CQ,w)}}
B.a7y.prototype={
axp(d,e){var x=this,w=x.at
w===$&&A.e()
w.addEventListener("datachannel",A.bG(new B.aMi(x)))
w.addEventListener("icecandidate",A.bG(new B.aMj(x)))
w.addEventListener("iceconnectionstatechange",A.bG(new B.aMk(x)))
w.onicegatheringstatechange=A.bG(new B.aMl(x))
w.addEventListener("signalingstatechange",A.bG(new B.aMm(x)))
if(!$.bVd())w.addEventListener("connectionstatechange",A.bG(new B.aMn(x)))
w.addEventListener("negotiationneeded",A.bG(new B.aMo(x)))
w.addEventListener("track",A.bG(new B.aMp(x)))},
PZ(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$PZ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dV(s.createOffer(y.m.a(A.bT(A.C(y.N,y.z)))),y.A),$async$PZ)
case 3:t=f
v=new B.AK(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$PZ,w)},
PW(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$PW=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dV(s.createAnswer(y.m.a(A.bT(A.C(y.N,y.z)))),y.A),$async$PW)
case 3:t=f
v=new B.AK(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$PW,w)},
ji(d,e){var x
this.ax.cq(0,e.a,new B.aMh(this,e))
x=this.at
x===$&&A.e()
x.addStream(e.e)
return A.cH(null,y.H)},
D3(d,e){return this.aqL(0,e)},
aqL(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$D3=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dV(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$D3)
case 2:return A.i(null,w)}})
return A.j($async$D3,w)},
D5(d,e){return this.ar0(0,e)},
ar0(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$D5=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dV(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$D5)
case 2:return A.i(null,w)}})
return A.j($async$D5,w)},
P3(d){return this.aZk(d)},
aZk(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$P3=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.e()
u=d.b
u.toString
x=2
return A.d(A.dV(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$P3)
case 2:return A.i(null,w)}})
return A.j($async$P3,w)},
a3(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a3=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.e()
t.close()
v=A.cH(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a3,w)}}
B.bSx.prototype={
aH(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aH=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aH,w)}}
B.PE.prototype={
sama(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.HJ()
if(x!=null)x.style.objectFit=e},
aga(){var x=this,w=x.HJ(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.aj2(u,x.z!=null,0,t))},
sa5i(d,e){var x,w,v,u,t=this
t.z=e
if(e.JV(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ar(y.l.b(x)?x:new A.cK(x,A.T(x).i("cK<1,ax>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.TN(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ar(y.l.b(x)?x:new A.cK(x,A.T(x).i("cK<1,ax>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aEU()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.HJ()
if(u!=null){u.srcObject=t.x
x=t.HJ()
x.toString
t.a70(x)}t.sp(0,t.a.b0C(t.z!=null))},
aEU(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
HJ(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
l(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$l=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.M)(t),++r)t[r].W(0)
q=u.HJ()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eq()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$l,w)},
ix(d){var x=0,w=A.k(y.H),v=this
var $async$ix=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.CX()
$.oQ().re("RTCVideoRenderer-"+v.Q,new B.aMv(v),!0)
return A.i(null,w)}})
return A.j($async$ix,w)},
a70(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.PG.prototype={
N(){return new B.PH()}}
B.PH.prototype={
U(){var x,w,v=this
v.X()
v.a.c.a8(0,v.gaPh())
x=v.a
w=x.c
w.as=x.e
w.sama(0,x.d===D.L4?"contain":"cover")},
aPi(){if(this.c!=null)this.m(new B.aMw())},
l(){if(this.c!=null)this.a0()},
aT(d){var x,w
this.b7(d)
A.dj(A.d2(0,0,10,0,0),new B.aMy(this))
x=this.a
w=x.c
w.sama(0,x.d===D.L4?"contain":"cover")},
C(d){return new A.i6(new B.aMx(this),null)}}
B.a4k.prototype={
axb(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bj()
x.a=new B.Vt(d,x,new A.aZ(new A.av(w,y.c),y.r),e,g.i("Vt<0>"))
if(f.a.gi5())f.a=new B.R8(g.i("@<0>").bV(g).i("R8<1,2>")).fT(f.a)
w=A.fp(null,new B.aBn(f,x),null,!0,g)
x.b!==$&&A.bj()
x.b=w},
acH(){var x,w
this.d=!0
x=this.c
if(x!=null)x.W(0)
w=this.b
w===$&&A.e()
w.a3(0)}}
B.Vt.prototype={
D(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.a.a.D(0,e)},
d1(d,e){if(this.e)throw A.n(A.an("Cannot add event after closing."))
if(this.d)return
this.aHj(d,e)},
hb(d){return this.d1(d,null)},
aHj(d,e){var x=this
if(x.w){x.a.a.d1(d,e)
return}x.c.fq(d,e)
x.acI()
x.b.acH()
x.a.a.a3(0).fg(new B.bhJ())},
a3(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.acH()
x.c.cf(0,x.a.a.a3(0))}return x.c.a},
acI(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.df(0)
return},
$idK:1}
B.a9M.prototype={}
B.a9N.prototype={}
B.y5.prototype={
a8a(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.DH(d,e))
x.a3(0)},
a4P(d){var x
if((this.b.b&4)!==0)throw A.n(B.bTa())
x=A.bT(d)
x.toString
this.a.send(x)},
wj(d,e,f){return this.b_Z(0,e,f)},
b_Z(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$wj=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bTa())
u.a3(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$wj,w)},
$ibT9:1}
B.tn.prototype={}
B.Hb.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.Hb&&e.a===this.a},
gH(d){return C.c.gH(this.a)}}
B.Dh.prototype={
n(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Dh&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fX(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.DH.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.DH&&e.a===this.a&&e.b===this.b},
gH(d){return A.fX([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.HG.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibN:1}
B.HF.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.ap3.prototype={
ax1(d){d.eH(new B.ap7(this),new B.ap8(this),y.a)}}
B.alQ.prototype={
a3(d){var x=this.b
x.e=x.d=null
return this.asG(0)}}
B.aaV.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibN:1}
B.w_.prototype={
M(){return"RTCSignalingState."+this.b}}
B.PB.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vZ.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.n3.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a7z.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aMe.prototype={}
B.Og.prototype={}
B.Fn.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aHO.prototype={}
B.G2.prototype={}
B.PC.prototype={}
B.aMq.prototype={}
B.AK.prototype={}
B.PD.prototype={}
B.PF.prototype={
aj2(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.PF(x,w,v)},
b0C(d){return this.aj2(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","yM(F)","~(GN)","bn(G2)","bn(PD)","bn(n3)","~(@)","mR(@)","mR()","bn(bT9)","~(tn)"])
B.aRR.prototype={
$0(){return J.c9q(this.a.bo())},
$S:1}
B.aRS.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bc(v)
this.b.d1(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.aqX.prototype={
$1(d){if(d==null)return null
return A.c3(J.l(d))},
$S:145}
B.bd5.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.Fn(!0)},
$S:0}
B.bd6.prototype={
$1(d){return this.a.OT()},
$S:34}
B.bd2.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bt()},
$S:0}
B.bd3.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bd_.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bd0.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bd1.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bcX.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bcY.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bcZ.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bYj(x.w,w,u,!1,v)},
$S:z+2}
B.bd4.prototype={
$0(){return this.a.aSk()},
$S:0}
B.bcG.prototype={
$1(d){this.a.z_("candidat_ice",d,!1)},
$S:388}
B.bcH.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bcF())},
$S:0}
B.bcF.prototype={
$0(){},
$S:0}
B.bcI.prototype={
$0(){this.a.mI(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bcJ.prototype={
$0(){return this.a.y=!0},
$S:0}
B.bcK.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.z_("annule",C.ea,!1)
x.mI(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bcL.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.m(new B.bcE(x,w))},
$S:34}
B.bcE.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).er(this.b)},
$S:0}
B.bcM.prototype={
$1(d){},
$S:153}
B.bcN.prototype={
$1(d){this.a.EN()},
$S:34}
B.bcQ.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.ad2()
x.a9u("reponse",d)},
$S:389}
B.bcR.prototype={
$1(d){this.a.mI(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bcS.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.ad2()},
$S:29}
B.bcT.prototype={
$1(d){this.a.mI(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bcU.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a9u("offre",d)},
$S:389}
B.bcV.prototype={
$1(d){this.a.mI(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bcO.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=C.Q},
$S:0}
B.bcP.prototype={
$1(d){return A.C(y.N,y.z)},
$S:167}
B.bcD.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.bcC.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bcB.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bcW.prototype={
$2(d,e){if(!d)this.a.Fj()},
$S:996}
B.aRe.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aRf.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gP(x):null
if(w!=null)this.a.aDt(w)},
$S:z+5}
B.aRg.prototype={
$1(d){var x
if(d===D.KW){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.au_.prototype={
$1(d){return this.a.Yb()},
$S:21}
B.au0.prototype={
$0(){var x=this.a
if(!x.e)x.DA()},
$S:0}
B.bOb.prototype={
$1(d){return d.length!==0},
$S:11}
B.aI5.prototype={
$1(d){return this.a.push(B.bS_(d))},
$S:21}
B.aI6.prototype={
$1(d){return this.a.push(B.bS_(d))},
$S:21}
B.aI2.prototype={
$1(d){},
$S:22}
B.aI3.prototype={
$1(d){},
$S:22}
B.aI4.prototype={
$1(d){},
$S:22}
B.aHR.prototype={
$0(){return!1},
$S:49}
B.aHS.prototype={
$0(){return!1},
$S:49}
B.aHT.prototype={
$1(d){J.fR(d,new B.aHQ(this.a))},
$S:388}
B.aHQ.prototype={
$2(d,e){this.a.k(0,d,e)},
$S:48}
B.aMi.prototype={
$1(d){},
$S:22}
B.aMj.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.G2(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aMk.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.e()
v=B.cqP(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bVd())switch(w.cx.a){case 0:w.cy=D.L0
break
case 1:w.cy=D.L1
break
case 3:w.cy=D.L2
break
case 5:w.cy=D.KZ
break
case 6:w.cy=D.L_
break
case 7:w.cy=D.t8
break
default:break}},
$S:30}
B.aMl.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.CW=B.cqQ(w.iceGatheringState)},
$S:30}
B.aMm.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.ch=B.csm(w.signalingState)},
$S:30}
B.aMn.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.cy=B.cs1(w.connectionState)},
$S:30}
B.aMo.prototype={
$1(d){},
$S:30}
B.aMp.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bS_(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cK(x,A.T(x).i("cK<1,ax>"))
w=J.dn(x,new B.aMg(w),y.h)
v.$1(new B.PD(A.D(w,!0,w.$ti.i("aB.E"))))}},
$S:22}
B.aMg.prototype={
$1(d){return new B.mR(d,d.id,this.a.as)},
$S:z+8}
B.aMh.prototype={
$0(){var x=this.b.e
return new B.mR(x,x.id,this.a.as)},
$S:z+9}
B.bOj.prototype={
$1(d){return J.fQ(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:11}
B.aMv.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.M)(w),++u)w[u].W(0)
C.b.Z(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a70(t)
v=y.i.c
w.push(A.hT(t,"canplay",new B.aMr(x),!1,v))
w.push(A.hT(t,"resize",new B.aMs(x),!1,v))
w.push(A.hT(t,"error",new B.aMt(t),!1,v))
w.push(A.hT(t,"ended",new B.aMu(),!1,v))
return t},
$S:168}
B.aMr.prototype={
$1(d){this.a.aga()},
$S:21}
B.aMs.prototype={
$1(d){this.a.aga()},
$S:21}
B.aMt.prototype={
$1(d){var x,w,v=this.a.error
A.nv("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Gn.h(0,A.ao(v,"code"))
x.toString
w=!J.q(A.ao(v,"message"),"")?A.ao(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.mZ(x,C.Gm.h(0,A.ao(v,"code")),w,null))},
$S:23}
B.aMu.prototype={
$1(d){},
$S:21}
B.aMw.prototype={
$0(){},
$S:0}
B.aMy.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aMx.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a4A("RTCVideoRenderer-"+w.Q)
else w=A.P(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cB(A.P(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:997}
B.aBn.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.e()
v.c=x.eW(w.ghr(w),new B.aBm(v),w.gnL())},
$S:0}
B.aBm.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.e()
w.acI()
x=x.b
x===$&&A.e()
x.a3(0)},
$S:0}
B.bhJ.prototype={
$1(d){},
$S:16}
B.asU.prototype={
$1(d){this.a.cf(0,this.b)},
$S:22}
B.asV.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fJ(new B.HG("Failed to connect WebSocket"))
else this.b.a8a(1006,"error")},
$S:22}
B.asW.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cA("data")
if(typeof x==="string")w.b=new B.Hb(A.be(x))
else if(typeof x==="object"&&A.bZo(y.m.a(x),"ArrayBuffer"))w.b=new B.Dh(A.OG(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.aC(x).j(0)))
v.D(0,w.bo())},
$S:23}
B.asX.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cf(0,this.b)
this.b.a8a(d.code,d.reason)},
$S:22}
B.ap7.prototype={
$1(d){var x=d.b,w=this.a
new A.co(x,A.u(x).i("co<1>")).cB(new B.ap4(w))
x=w.r.a
x===$&&A.e()
x=x.b
x===$&&A.e()
new A.co(x,A.u(x).i("co<1>")).b7v(new B.ap5(d),new B.ap6(w,d))
w.f.df(0)},
$S:z+10}
B.ap4.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.Hb
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.D(0,w)
break $label0$0}x=d instanceof B.Dh
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.D(0,v)
break $label0$0}if(d instanceof B.DH){x=this.a.r.a
x===$&&A.e()
x=x.a
x===$&&A.e()
x.a3(0)}}},
$S:z+11}
B.ap5.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.aq(B.bTa())
s=A.bT(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a4P(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a4P(new Uint8Array(A.cV(u)))
break $label1$1}t=A.aN("Cannot send "+J.aC(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.HF))throw r}},
$S:18}
B.ap6.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.d(t.b.wj(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.O(q) instanceof B.HF))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.ap8.prototype={
$1(d){var x,w=d instanceof A.Sa?d:new B.aaV(J.l(d)),v=this.a
v.f.fJ(w)
v=v.r.a
v===$&&A.e()
x=v.a
x===$&&A.e()
x.hb(w)
v=v.a
v===$&&A.e()
v.a3(0)},
$S:30};(function aliases(){var x=B.E4.prototype
x.asG=x.a3})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.UB.prototype,"gay3","KW",0)
var v
w(v=B.UA.prototype,"gaXz","ag3",3)
x(v,"gadn","Fj",0)
x(v,"ga7d","Lh",0)
x(v,"ga7c","Lg",0)
x(v,"ga7a","Ld",0)
x(v,"ga7b","Le",0)
w(v=B.a1Z.prototype,"gaS3","aS4",7)
x(v,"gaRb","Yb",1)
x(B.PE.prototype,"gdL","l",0)
x(B.PH.prototype,"gaPh","aPi",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.E4,B.aqW,B.GN,B.a2c,B.aRd,B.a1Z,B.aMe,B.Og,B.Fn,B.aHO,B.PC,B.aMq,B.a9N,B.Vt,B.a9M,B.y5,B.tn,B.HG,B.aaV,B.G2,B.AK,B.PD,B.PF])
w(B.R8,A.fq)
x(A.jX,[B.aRR,B.bd5,B.bd2,B.bd3,B.bd_,B.bd0,B.bd1,B.bcX,B.bcY,B.bd4,B.bcH,B.bcF,B.bcI,B.bcJ,B.bcK,B.bcE,B.bcO,B.bcD,B.bcC,B.bcB,B.au0,B.aHR,B.aHS,B.aMh,B.aMw,B.aMy,B.aBn,B.aBm,B.ap6])
x(A.it,[B.aRS,B.aqX,B.bd6,B.bcZ,B.bcG,B.bcL,B.bcM,B.bcN,B.bcQ,B.bcR,B.bcS,B.bcT,B.bcU,B.bcV,B.bcP,B.aRe,B.aRf,B.aRg,B.au_,B.bOb,B.aI5,B.aI6,B.aI2,B.aI3,B.aI4,B.aHT,B.aMi,B.aMj,B.aMk,B.aMl,B.aMm,B.aMn,B.aMo,B.aMp,B.aMg,B.bOj,B.aMv,B.aMr,B.aMs,B.aMt,B.aMu,B.bhJ,B.asU,B.asV,B.asW,B.asX,B.ap7,B.ap4,B.ap5,B.ap8])
x(A.N,[B.ph,B.yM,B.PG])
x(A.S,[B.UB,B.UA,B.PH])
x(A.at,[B.Tf,B.acA,B.wN])
x(A.qS,[B.bcW,B.aHQ,B.aMx])
w(B.aMf,B.aMe)
w(B.mR,B.Og)
w(B.a5S,B.Fn)
w(B.aHP,B.aHO)
w(B.a7y,B.PC)
w(B.bSx,B.aMq)
w(B.PE,A.d5)
x(B.a9N,[B.a4k,B.ap3])
x(B.tn,[B.Hb,B.Dh,B.DH])
w(B.HF,B.HG)
w(B.alQ,B.E4)
x(A.I8,[B.w_,B.PB,B.vZ,B.n3,B.a7z])})()
A.oG(b.typeUniverse,JSON.parse('{"E4":{"dK":["1"]},"R8":{"fq":["1","2"],"fq.S":"1","fq.T":"2"},"yM":{"N":[],"m":[]},"ph":{"N":[],"m":[]},"UB":{"S":["ph"]},"Tf":{"at":[],"m":[]},"UA":{"S":["yM"]},"acA":{"at":[],"m":[]},"wN":{"at":[],"m":[]},"mR":{"Og":[]},"a5S":{"Fn":[]},"a7y":{"PC":[]},"PE":{"d5":["PF"],"aV":[]},"PG":{"N":[],"m":[]},"PH":{"S":["PG"]},"Vt":{"dK":["1"]},"y5":{"bT9":[]},"Hb":{"tn":[]},"Dh":{"tn":[]},"DH":{"tn":[]},"HG":{"bN":[]},"HF":{"bN":[]},"alQ":{"dK":["@"]},"aaV":{"bN":[]}}'))
A.bTC(b.typeUniverse,JSON.parse('{"E4":1,"a9N":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("y5"),L:x("bN"),_:x("as<@>"),x:x("as<~>"),S:x("E<ae<o,K>>"),t:x("E<ae<o,@>>"),Q:x("E<Fn>"),d:x("E<iC<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("ax"),l:x("J<ax>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("Og"),G:x("Fn"),h:x("mR"),o:x("pD"),a:x("bn"),K:x("a0"),J:x("PC"),v:x("AK"),Z:x("a9M<a0?>"),N:x("o"),e:x("q6"),M:x("e3"),D:x("tn"),U:x("U<o>"),g:x("dv<GN>"),n:x("dv<~>"),V:x("aZ<y5>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("UL<ax>"),C:x("oz<ax>"),k:x("av<y5>"),c:x("av<@>"),W:x("av<~>"),q:x("ky"),y:x("K"),z:x("@"),A:x("ax?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.UC=new B.a2c(C.k8)
D.yc=new A.am(32,0,32,0)
D.ql=new A.ak(57638,"MaterialIcons",null,!1)
D.yU=new A.ak(57639,"MaterialIcons",null,!1)
D.a_h=new A.ak(58337,"MaterialIcons",null,!1)
D.a_i=new A.ak(58341,"MaterialIcons",null,!1)
D.a_m=new A.ak(58923,"MaterialIcons",null,!1)
D.z_=new A.ak(59048,"MaterialIcons",null,!1)
D.a_n=new A.ak(59049,"MaterialIcons",null,!1)
D.a_o=new A.ak(59077,"MaterialIcons",null,!1)
D.a7X=A.b(x([1,2,4,8,16]),A.ay("E<v>"))
D.abI=A.b(x([]),y.Q)
D.Gz=new A.fn("FlutterWebRTC.Method",C.b7,null)
D.ak9=new B.n3(0,"RTCIceConnectionStateNew")
D.aka=new B.n3(1,"RTCIceConnectionStateChecking")
D.akb=new B.n3(2,"RTCIceConnectionStateCompleted")
D.akc=new B.n3(3,"RTCIceConnectionStateConnected")
D.akd=new B.n3(4,"RTCIceConnectionStateCount")
D.KW=new B.n3(5,"RTCIceConnectionStateFailed")
D.ake=new B.n3(6,"RTCIceConnectionStateDisconnected")
D.KX=new B.n3(7,"RTCIceConnectionStateClosed")
D.KY=new B.PB(0,"RTCIceGatheringStateNew")
D.akf=new B.PB(1,"RTCIceGatheringStateGathering")
D.akg=new B.PB(2,"RTCIceGatheringStateComplete")
D.t8=new B.vZ(0,"RTCPeerConnectionStateClosed")
D.KZ=new B.vZ(1,"RTCPeerConnectionStateFailed")
D.L_=new B.vZ(2,"RTCPeerConnectionStateDisconnected")
D.L0=new B.vZ(3,"RTCPeerConnectionStateNew")
D.L1=new B.vZ(4,"RTCPeerConnectionStateConnecting")
D.L2=new B.vZ(5,"RTCPeerConnectionStateConnected")
D.akh=new B.w_(0,"RTCSignalingStateStable")
D.aki=new B.w_(1,"RTCSignalingStateHaveLocalOffer")
D.akj=new B.w_(2,"RTCSignalingStateHaveRemoteOffer")
D.akk=new B.w_(3,"RTCSignalingStateHaveLocalPrAnswer")
D.akl=new B.w_(4,"RTCSignalingStateHaveRemotePrAnswer")
D.L3=new B.w_(5,"RTCSignalingStateClosed")
D.akm=new B.PF(0,0,0)
D.L4=new B.a7z(0,"RTCVideoViewObjectFitContain")
D.L5=new B.a7z(1,"RTCVideoViewObjectFitCover")
D.nV=new A.c0(20,null,null,null)
D.anS=new A.c0(48,null,null,null)
D.MA=new A.c0(null,64,null,null)
D.ar0=new A.x(!0,C.k,null,null,null,null,22,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Ne=new A.x(!0,C.k,null,null,null,null,26,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.arq=new A.x(!0,C.n,null,null,null,null,32,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Nm=new A.x(!0,C.n,null,null,null,null,40,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ui=new A.x(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c1q=!1
$.c_L=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cvM","c6S",()=>new B.aMf())
x($,"ctO","bVd",()=>C.c.q(A.ao(A.ao(A.ao(A.bUU(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"BKt6wT47jHiYuqSYtYpcguAdddg=");