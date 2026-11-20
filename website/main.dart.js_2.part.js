((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_2",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={E4:function E4(){},R8:function R8(d){this.$ti=d},aRT:function aRT(d){this.a=d},aRU:function aRU(d,e){this.a=d
this.b=e},
a0J(d){var x,w,v,u,t,s=new B.ar0(),r=J.L(d),q=r.h(d,"id")
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
return new B.ar_(q,x,w,v,u,t)},
c0p(d){var x,w,v,u=J.L(d),t=u.h(d,"contenu"),s=u.h(d,"id")
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
cbu(d){var x,w,v,u,t,s,r=J.L(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.UE
x=A.b([],y.t)
for(r=J.ar(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mk(s,u,t))}return new B.a2d(x)},
bNm(d){var x=C.h.aZ(d.a,1e6)
return C.c.aV(C.h.j(C.h.aZ(x,60)),2,"0")+":"+C.c.aV(C.h.j(C.h.aP(x,60)),2,"0")},
c5h(d){var x=J.L(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oO(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.ai7(w,v)},
cpl(d){var x,w,v=J.L(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aia(u,A.jP(w)?w:null,v)},
ar_:function ar_(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
ar0:function ar0(){},
GN:function GN(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a2d:function a2d(d){this.a=d},
bYr(d,e,f,g,h,i){return new B.ph(e,f,i,h,d,null)},
bYq(d,e,f,g,h,i){return new B.yM(f,i,g,h,d,e,null)},
c1F(d,e,f,g,h,i,j,k,l,m,n){return new B.acD(g,f,e,i,h,d,m,l,k,j,n,null)},
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
_.x=_.w=_.r=null
_.y=$
_.z=!1
_.c=_.a=null},
bd8:function bd8(d){this.a=d},
bd9:function bd9(d){this.a=d},
bd5:function bd5(d){this.a=d},
bd6:function bd6(d){this.a=d},
bd2:function bd2(d){this.a=d},
bd3:function bd3(d){this.a=d},
bd4:function bd4(d){this.a=d},
bd_:function bd_(d){this.a=d},
bd0:function bd0(d){this.a=d},
bd1:function bd1(d){this.a=d},
bd7:function bd7(d){this.a=d},
Tf:function Tf(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
yM:function yM(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.y=i
_.a=j},
UA:function UA(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=""
_.w=null
_.as=_.Q=_.z=_.y=_.x=!1
_.at=!0
_.ax=null
_.ay=e
_.db=_.cy=_.cx=_.CW=_.ch=null
_.dx=$
_.dy=!1
_.fr=null
_.fx=!1
_.c=_.a=null},
bcI:function bcI(d){this.a=d},
bcJ:function bcJ(d){this.a=d},
bcK:function bcK(d){this.a=d},
bcL:function bcL(d){this.a=d},
bcH:function bcH(d){this.a=d},
bcM:function bcM(d){this.a=d},
bcN:function bcN(d){this.a=d},
bcO:function bcO(d){this.a=d},
bcG:function bcG(d,e){this.a=d
this.b=e},
bcP:function bcP(){},
bcQ:function bcQ(d){this.a=d},
bcT:function bcT(d){this.a=d},
bcU:function bcU(d){this.a=d},
bcV:function bcV(d){this.a=d},
bcW:function bcW(d){this.a=d},
bcX:function bcX(d){this.a=d},
bcY:function bcY(d){this.a=d},
bcR:function bcR(d){this.a=d},
bcS:function bcS(){},
bcF:function bcF(d,e){this.a=d
this.b=e},
bcE:function bcE(d,e){this.a=d
this.b=e},
bcD:function bcD(d,e){this.a=d
this.b=e},
bcZ:function bcZ(d){this.a=d},
acD:function acD(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
aRg:function aRg(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aRh:function aRh(d){this.a=d},
aRi:function aRi(d){this.a=d},
aRj:function aRj(d){this.a=d},
a2_:function a2_(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
au2:function au2(d){this.a=d},
au3:function au3(d){this.a=d},
ao4(d){var x=y.U,w=A.D(new A.U(A.b(d.split(" "),y.s),new B.bOg(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(C.b.gP(w),0).toUpperCase()
return(J.p(C.b.gP(w),0)+J.p(C.b.gaI(w),0)).toUpperCase()},
bOg:function bOg(){},
a5s:function a5s(){this.a=null},
aMi:function aMi(){},
mR:function mR(d,e,f){this.e=d
this.a=e
this.b=f},
aI8:function aI8(d){this.a=d},
aI9:function aI9(d){this.a=d},
bS4(d){var x=new B.a5U(d)
x.axp(d)
return x},
a5U:function a5U(d){this.d=d},
aI5:function aI5(d){this.a=d},
aI6:function aI6(d){this.a=d},
aI7:function aI7(d){this.a=d},
aHS:function aHS(){},
aHU:function aHU(){},
aHV:function aHV(){},
aHW:function aHW(d){this.a=d},
aHT:function aHT(d){this.a=d},
cgt(d,e){var x=y.N
x=new B.a7A(d,e,A.C(x,y.E),A.C(x,y.z))
x.axu(d,e)
return x},
a7A:function a7A(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aMl:function aMl(d){this.a=d},
aMm:function aMm(d){this.a=d},
aMn:function aMn(d){this.a=d},
aMo:function aMo(d){this.a=d},
aMp:function aMp(d){this.a=d},
aMq:function aMq(d){this.a=d},
aMr:function aMr(d){this.a=d},
aMs:function aMs(d){this.a=d},
aMj:function aMj(d){this.a=d},
aMk:function aMk(d,e){this.a=d
this.b=e},
bSC:function bSC(d){this.a=d},
crk(){return C.b.md(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bOo())!==-1},
bOo:function bOo(){},
c_R(){var x=A.b([],y.d),w=$.c_S
$.c_S=w+1
return new B.PE(w,x,D.ako,$.ad())},
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
aMy:function aMy(d){this.a=d},
aMu:function aMu(d){this.a=d},
aMv:function aMv(d){this.a=d},
aMw:function aMw(d){this.a=d},
aMx:function aMx(){},
bSD(d,e,f){return new B.PG(d,f,e,null)},
PG:function PG(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
PH:function PH(){this.c=this.a=null},
aMz:function aMz(){},
aMB:function aMB(d){this.a=d},
aMA:function aMA(d){this.a=d},
bZ3(d,e,f,g){var x,w={}
w.a=d
x=new B.a4l(g.i("a4l<0>"))
x.axg(e,f,w,g)
return x},
a4l:function a4l(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aBq:function aBq(d,e){this.a=d
this.b=e},
aBp:function aBp(d){this.a=d},
Vt:function Vt(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bhM:function bhM(){},
a9P:function a9P(d){this.b=this.a=$
this.$ti=d},
a9Q:function a9Q(){},
bQQ(d,e){return B.caM(d,e)},
caM(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bQQ=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.oc("ws")&&!d.oc("wss"))throw A.n(A.f9(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.y5(r,A.fq(null,null,null,!1,y.D))
u=new A.av($.aE,y.k)
p=new A.aZ(u,y.V)
if(J.q(r.readyState,1))p.cf(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.fJ(new B.HG("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.oz(r,"open",!1,y.C).gP(0).ar(new B.asX(p,q),y.H)
t=y.C
s=y.H
new A.oz(r,"error",!1,t).gP(0).ar(new B.asY(p,q),s)
A.hT(r,"message",new B.asZ(q),!1,y.m)
new A.oz(r,"close",!1,t).gP(0).ar(new B.at_(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bQQ,w)},
y5:function y5(d,e){this.a=d
this.b=e},
asX:function asX(d,e){this.a=d
this.b=e},
asY:function asY(d,e){this.a=d
this.b=e},
asZ:function asZ(d){this.a=d},
at_:function at_(d,e){this.a=d
this.b=e},
bTg(){return new B.HF("Connection Closed")},
to:function to(){},
Hb:function Hb(d){this.a=d},
Dh:function Dh(d){this.a=d},
DH:function DH(d,e){this.a=d
this.b=e},
HG:function HG(d){this.a=d},
HF:function HF(d){this.a=d},
cah(d){var x=null,w=$.aE,v=new B.a9P(y.Z),u=y.X,t=A.fq(x,x,x,!0,u),s=A.fq(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bZ3(new A.co(s,r.i("co<1>")),new A.Cv(t,q.i("Cv<1>")),!0,u)
v.b=B.bZ3(new A.co(t,q.i("co<1>")),new A.Cv(s,r.i("Cv<1>")),!1,u)
v=new B.ap7(new A.aZ(new A.av(w,y.W),y.R),v)
v.ax6(d)
return v},
ap7:function ap7(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
apb:function apb(d){this.a=d},
ap8:function ap8(d){this.a=d},
ap9:function ap9(d){this.a=d},
apa:function apa(d,e){this.a=d
this.b=e},
apc:function apc(d){this.a=d},
alU:function alU(d,e){this.b=d
this.a=e},
aaY:function aaY(d){this.a=d},
cqU(d){switch(d){case"new":return D.akb
case"checking":return D.akc
case"connected":return D.ake
case"completed":return D.akd
case"failed":return D.KZ
case"disconnected":return D.akg
case"closed":return D.L_
case"count":return D.akf}return D.L_},
cqV(d){switch(d){case"new":return D.L0
case"gathering":return D.akh
case"complete":return D.aki}return D.L0},
csr(d){switch(d){case"stable":return D.akj
case"have-local-offer":return D.akk
case"have-local-pranswer":return D.akm
case"have-remote-offer":return D.akl
case"have-remote-pranswer":return D.akn
case"closed":return D.L6}return D.L6},
cs6(d){switch(d){case"new":return D.L3
case"connecting":return D.L4
case"connected":return D.L5
case"closed":return D.tb
case"disconnected":return D.L2
case"failed":return D.L1}return D.tb},
w_:function w_(d,e){this.a=d
this.b=e},
PB:function PB(d,e){this.a=d
this.b=e},
vZ:function vZ(d,e){this.a=d
this.b=e},
n3:function n3(d,e){this.a=d
this.b=e},
a7B:function a7B(d,e){this.a=d
this.b=e},
aMh:function aMh(){},
Og:function Og(){},
Fn:function Fn(){},
aHR:function aHR(){},
G2:function G2(d,e,f){this.a=d
this.b=e
this.c=f},
PC:function PC(){},
aMt:function aMt(){},
AK:function AK(d,e){this.a=d
this.b=e},
PD:function PD(d){this.b=d},
PF:function PF(d,e,f){this.a=d
this.b=e
this.c=f},
bRL(d){var x=0,w=A.k(y.y)
var $async$bRL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bRL,w)},
aK8(d){var x=0,w=A.k(y.H),v
var $async$aK8=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.d(B.aWh("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$aK8)
case 2:return A.i(null,w)}})
return A.j($async$aK8,w)},
aWh(d,e,f,g){return B.cjb(d,e,f,g,f.i("0?"))},
cjb(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aWh=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.d(B.aWg(),$async$aWh)
case 3:v=D.GC.c6(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aWh,w)},
aWg(){var x=0,w=A.k(y.H),v,u
var $async$aWg=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.c1w?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.d(D.GC.c6("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$aWg)
case 4:$.c1w=!0
case 3:return A.i(null,w)}})
return A.j($async$aWg,w)}},D,E
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
fT(d){var x=A.cA("subscription"),w=A.fq(new B.aRT(x),null,null,!0,this.$ti.y[1])
x.b=d.eW(new B.aRU(this,w),w.gm6(w),w.gnM())
return new A.co(w,A.u(w).i("co<1>"))}}
B.ar_.prototype={}
B.GN.prototype={}
B.a2d.prototype={}
B.ph.prototype={
N(){return new B.UB()}}
B.UB.prototype={
U(){var x,w=this
w.X()
w.a.toString
w.z=!0
x=new B.a5s()
w.y!==$&&A.bf()
w.y=x
x.r5("assets/audio/sonnerie-appel.wav")
w.Lb()
w.r=A.dk(C.c3,new B.bd8(w))
w.w=A.ii(C.xU,new B.bd9(w))},
l(){var x=this,w=x.r
if(w!=null)w.W(0)
w=x.w
if(w!=null)w.W(0)
w=x.x
if(w!=null)w.W(0)
w=x.y
w===$&&A.e()
w.hL()
if(x.z)w.h1()
x.a0()},
Yo(){var x=this.x
if(x!=null)x.W(0)
this.x=A.dk(C.fT,new B.bd5(this))},
OW(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$OW=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.d(o.B1(p.c),$async$OW)
case 7:r=e
q=B.a0J(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.m(new B.bd6(s))
p=s.r
if(p!=null)p.W(0)
p=s.w
if(p!=null)p.W(0)
p=s.y
p===$&&A.e()
p.hL()
s.Yo()}u=2
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
return A.j($async$OW,w)},
Lb(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Lb=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.d(n.B1(o.c),$async$Lb)
case 7:r=e
q=B.a0J(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gam0()
p=m
if(q.w!=="sonne"||q.c===p){s.m(new B.bd2(s))
o=s.y
o===$&&A.e()
o.hL()
s.Yo()
x=1
break}s.m(new B.bd3(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.m(new B.bd4(s))
o=s.y
o===$&&A.e()
o.hL()
s.Yo()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Lb,w)},
KZ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$KZ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.m(new B.bd_(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.d(p.QB(q.c,"accepte"),$async$KZ)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.m(new B.bd0(s))
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
q=s.y
q===$&&A.e()
q.hL()
q=s.c
q.toString
A.a9(q,!1).xA(A.e7(new B.bd1(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$KZ,w)},
Fr(d){return this.aSq(d)},
aSp(){return this.Fr(!1)},
aSq(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Fr=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.W(0)
r=s.w
if(r!=null)r.W(0)
r=s.y
r===$&&A.e()
r.hL()
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.d(q.QB(r.c,"refuse"),$async$Fr)
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
if(r!=null)A.a9(r,!1).br()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Fr,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jX(C.t,s,A.c(B.ao4(r.d),s,s,s,s,D.No,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,D.Ng,C.W,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,C.ay,new A.Z(D.yg,x,s),C.l,A.c(q,s,s,s,s,D.um,s,s,s),D.MC],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.bd7(t)
v=A.a("Accepter")
u=t.f?s:t.gay8()
q.push(A.V(A.b([new B.Tf(D.yX,C.aB,r,x,s),D.anU,new B.Tf(D.qn,C.cy,v,u,s)],w),C.o,C.bo,C.i,s))}if(t.d)q.push(C.wA)
return A.eC(s,C.n,A.fi(!0,A.cB(A.I(q,C.o,C.e,C.V),s,s),!0,C.ae,!0,!0),s,s,s)}}
B.Tf.prototype={
C(d){var x=this,w=null,v=A.d4(x.d,w,w,C.ae,C.cO,w)
return A.I(A.b([A.ac(A.b3(!1,A.c4(x.c,C.k,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.dT,w,w,w)],y.p),C.o,C.e,C.V)}}
B.yM.prototype={
N(){return new B.UA(A.b0(y.N),C.Q)}}
B.UA.prototype={
U(){var x,w,v=this,u=null
v.X()
v.r=v.a.c
x=B.c_R()
w=B.c_R()
v.d!==$&&A.bf()
v.d=new B.aRg(x,w)
x=v.a
x.toString
w=new B.a2_(new A.dv(u,u,y.g),new A.dv(u,u,y.n))
v.e!==$&&A.bf()
v.e=w
v.dy=!0
w=new B.a5s()
v.dx!==$&&A.bf()
v.dx=w
if(x.f)w.r5("assets/audio/tonalite-appel.wav")
v.q5()},
l(){var x=this,w=x.ch
if(w!=null)w.W(0)
w=x.CW
if(w!=null)w.W(0)
w=x.cx
if(w!=null)w.W(0)
w=x.cy
if(w!=null)w.W(0)
w=x.db
if(w!=null)w.W(0)
w=x.dx
w===$&&A.e()
w.hL()
if(x.dy)w.h1()
w=x.d
w===$&&A.e()
w.h1()
w=x.e
w===$&&A.e()
w.Hg()
x.a0()},
q5(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$q5=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:s.CW=A.dk(C.c3,new B.bcI(s))
u=4
r=null
j=s.a
i=j.y
x=i!=null?7:9
break
case 7:x=10
return A.d(i,$async$q5)
case 10:r=e
s.r=B.a0J(r).a
x=8
break
case 9:i=$.a7()
x=11
return A.d(i.B1(j.c),$async$q5)
case 11:r=e
s.r=s.a.c
case 8:q=B.a0J(r)
if(s.c==null){x=1
break}j=q.w
if(j==="termine"||j==="expire"){s.mK(A.a("Appel termin\xe9"))
x=1
break}s.w=s.a.f?q.c:q.e
j=$.a7()
p=j.QJ()
o=s.Fd()
x=12
return A.d(p,$async$q5)
case 12:n=e
m=B.cbu(n)
x=15
return A.d(o,$async$q5)
case 15:x=!e?13:14
break
case 13:if(s.c==null){x=1
break}s.m(new B.bcJ(s))
x=16
return A.d(A.jt(C.m4,null,y.z),$async$q5)
case 16:if(s.c==null){x=1
break}s.mK(null)
x=1
break
case 14:i=s.d
i===$&&A.e()
h=s.a.d
x=17
return A.d(i.xy(A.a6(["iceServers",m.a],y.N,y.z),h==="video"),$async$q5)
case 17:i.f=new B.bcK(s)
i.r=new B.bcL(s)
i.w=new B.bcM(s)
if(s.c==null){x=1
break}s.m(new B.bcN(s))
s.cx=A.ii(C.ck,new B.bcO(s))
i=s.e
i===$&&A.e()
h=i.r
s.cy=new A.bX(h,A.u(h).i("bX<1>")).cB(s.gaXE())
h=i.w
s.db=new A.bX(h,A.u(h).i("bX<1>")).cB(new B.bcP())
s.a.toString
l=j.b
if(l!=null&&J.a5(l)!==0){s.a.toString
i.PQ(C.c.T5("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eD(C.bN,l,C.ag,!0))}s.ch=A.ii(C.fT,new B.bcQ(s))
s.EQ()
u=2
x=6
break
case 4:u=3
f=t
k=A.O(f)
j=s.c
if(j==null){x=1
break}i=k instanceof A.d2?k.a:A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
j.u(y.q).f.B(A.z(null,null,null,null,null,C.f,null,A.c(i,null,null,null,null,null,null,null,null),null,C.m,null,null,null,null,null,null,null,null,null))
s.mK(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$q5,w)},
Fd(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Fd=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.d(s.Vm(),$async$Fd)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.e()
x=8
return A.d(r.BP(s.a.d==="video"),$async$Fd)
case 8:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
p=t
v=!1
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Fd,w)},
Vm(){var x=0,w=A.k(y.y),v
var $async$Vm=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Vm,w)},
EQ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$EQ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.a7()
x=7
return A.d(p.bW("/messagerie/appels/"+s.r+"/signaux"),$async$EQ)
case 7:r=e
for(p=J.ar(r);p.A();){q=p.gK(p)
s.ag7(B.c0p(q))}u=2
x=6
break
case 4:u=3
n=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$EQ,w)},
ag7(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.D(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.c5h(d.e)
if(v==null)return
x=s.d
x===$&&A.e()
x.Ay(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).ar(new B.bcT(s),y.a).f6(new B.bcU(s))
break
case"reponse":if(!s.a.f)return
u=B.c5h(d.e)
if(u==null)return
x=s.d
x===$&&A.e()
x.Po(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).ar(new B.bcV(s),y.a).f6(new B.bcW(s))
break
case"candidat_ice":t=B.cpl(d.e)
if(t==null)return
x=s.d
x===$&&A.e()
x.Pi(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.e()
x.Ha().ar(new B.bcX(s),y.a).f6(new B.bcY(s))
break
case"refuse":s.mK(A.a("Appel refus\xe9"))
break
case"annule":s.mK(A.a("Appel annul\xe9"))
break
case"termine":s.mK(A.a("Appel termin\xe9"))
break}},
ad6(){var x,w=this
if(w.x)return
x=w.CW
if(x!=null)x.W(0)
x=w.dx
x===$&&A.e()
x.hL()
w.m(new B.bcR(w))},
z_(d,e,f){return this.aFa(d,e,f)},
a9y(d,e){return this.z_(d,e,!0)},
aFa(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$z_=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.a7()
x=6
return A.d(s.ak0(t.r,e,d),$async$z_)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mK(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$z_,w)},
Fn(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Fn=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.CW
if(r!=null)r.W(0)
r=s.dx
r===$&&A.e()
r.hL()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.a7()
x=9
return A.d(q.QB(r,"termine"),$async$Fn)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:r=s.c
if(r!=null)A.a9(r,!1).br()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Fn,w)},
mK(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.CW
if(x!=null)x.W(0)
x=v.dx
x===$&&A.e()
x.hL()
x=v.r
if(x.length!==0){v.a.toString
w=$.a7()
w.QB(x,"termine").f6(new B.bcS())}if(d!=null&&v.c!=null)v.c.u(y.q).f.B(A.z(u,u,u,u,u,C.f,u,A.c(d,u,u,u,u,u,u,u,u),u,C.m,u,u,u,u,u,u,u,u,u))
x=v.c
if(x!=null)A.a9(x,!1).br()},
Lk(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Lk=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.e()
x=2
return A.d(t.Ui(u),$async$Lk)
case 2:if(v.c!=null)v.m(new B.bcF(v,u))
return A.i(null,w)}})
return A.j($async$Lk,w)},
Lj(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Lj=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.e()
x=2
return A.d(t.Ke(u),$async$Lj)
case 2:if(v.c!=null)v.m(new B.bcE(v,u))
return A.i(null,w)}})
return A.j($async$Lj,w)},
Lg(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Lg=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.at
t=v.d
t===$&&A.e()
x=2
return A.d(t.Uf(u),$async$Lg)
case 2:if(v.c!=null)v.m(new B.bcD(v,u))
return A.i(null,w)}})
return A.j($async$Lg,w)},
Lh(){var x=0,w=A.k(y.H),v=this,u
var $async$Lh=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.e()
x=2
return A.d(u.Pt(),$async$Lh)
case 2:return A.i(null,w)}})
return A.j($async$Lh,w)},
C(d){var x,w,v,u,t,s,r,q,p=this,o=null,n="Connexion\u2026",m=p.d
m===$&&A.e()
x=m.c
w=p.a
if(w.d==="video"&&p.z){if(x!=null)x=B.bSD(m.e,!1,D.L7)
else{x=A.jX(C.t,o,A.c(B.ao4(w.e),o,o,o,o,D.ars,o,o,o),o,48)
w=A.c(p.a.e,o,o,o,o,D.ar2,o,o,o)
x=A.cB(A.I(A.b([x,C.p,w,C.l,A.c(p.x?B.bNm(p.ay):A.a(n),o,o,o,o,D.um,o,o,o)],y.p),C.o,C.e,C.V),o,o)}x=A.Pl(0,x)
m=A.ff(o,A.f1(A.Q(12),B.bSD(m.d,!0,D.L7),C.aq),160,o,o,16,16,110)
w=p.x
v=B.bNm(p.ay)
u=p.Q
t=p.as
u=A.ej(C.aT,A.b([x,m,A.ff(24,B.c1F(p.at,v,w,!0,t,u,p.ga7f(),p.ga7e(),p.ga7g(),p.ga7h(),p.gadr()),o,o,0,0,o,o)],y.p),C.f,C.aS,o)
m=u}else{x=y.p
w=A.b([],x)
if(p.fx)w.push(A.ff(o,A.rE(B.bSD(m.e,!1,D.tc),0),1,o,0,o,0,1))
m=A.jX(C.t,o,A.c(B.ao4(p.a.e),o,o,o,o,D.No,o,o,o),o,56)
v=A.c(p.a.e,o,o,o,o,D.Ng,C.W,o,o)
u=p.fr
if(u==null)if(p.x)u=B.bNm(p.ay)
else u=p.z?A.a("Appel en cours\u2026"):A.a(n)
u=A.c(u,o,o,o,o,D.um,C.W,o,o)
t=p.x
s=B.bNm(p.ay)
r=p.Q
q=p.as
w.push(A.cB(A.I(A.b([m,C.ay,new A.Z(D.yg,v,o),C.l,u,D.MC,B.c1F(p.at,s,t,!1,q,r,p.ga7f(),p.ga7e(),p.ga7g(),p.ga7h(),p.gadr())],x),C.o,C.e,C.V),o,o))
w=A.ej(C.aT,w,C.f,C.aS,o)
m=w}return A.bSw(!1,A.eC(o,C.n,A.fi(!0,m,!0,C.ae,!0,!0),o,o,o),new B.bcZ(p),y.K)}}
B.acD.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Nr,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a_k:D.a_j
t=A.b([new B.wN(x,r,A.a("Muet"),v.x,u,u),D.nW,new B.wN(D.a_q,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.nW)
if(r){x=v.w
w=x?D.z2:D.a_p
t.push(new B.wN(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.nW)
if(r)t.push(new B.wN(D.a_o,!1,A.a("Basculer"),v.Q,u,u))
t.push(D.nW)
t.push(new B.wN(D.yX,!1,A.a("Raccrocher"),v.as,C.aB,u))
s.push(A.V(t,C.o,C.bo,C.i,u))
return A.I(s,C.o,C.e,C.V)}}
B.wN.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.k:C.lL
if(!t)x=C.k
else x=w.d?C.n:C.k
t=A.d4(u,v,v,C.ae,C.cO,v)
return A.I(A.b([A.ac(A.b3(!1,A.c4(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aR,A.c(w.e,v,v,v,v,C.Ns,v,v,v)],y.p),C.o,C.e,C.V)}}
B.aRg.prototype={
BP(d){return this.b9N(d)},
b9N(d){var x=0,w=A.k(y.H),v,u=this,t,s,r
var $async$BP=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.d(t.iz(0),$async$BP)
case 3:$.bVv()
if(d){s=y.N
s=A.a6(["facingMode","user"],s,s)}else s=!1
x=4
return A.d(new B.aHS().CS(0,A.a6(["audio",!0,"video",s],y.N,y.z)),$async$BP)
case 4:r=f
u.b=r
t.sa5m(0,r)
case 1:return A.i(v,w)}})
return A.j($async$BP,w)},
xy(d,e){return this.bav(d,e)},
bav(d,e){var x=0,w=A.k(y.H),v=this,u,t
var $async$xy=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.d(v.e.iz(0),$async$xy)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.d(v.BP(e),$async$xy)
case 5:case 4:u=v.b
u.toString
x=6
return A.d($.bVv().a0j(d,A.C(y.N,y.z)),$async$xy)
case 6:t=v.a=g
x=7
return A.d(t.jk(0,u),$async$xy)
case 7:t.e=new B.aRh(v)
t.Q=new B.aRi(v)
t.d=new B.aRj(v)
return A.i(null,w)}})
return A.j($async$xy,w)},
aDy(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa5m(0,d)
x=w.r
if(x!=null)x.$0()}},
Ha(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ha=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.Q2(0),$async$Ha)
case 3:t=e
x=4
return A.d(s.D5(0,t),$async$Ha)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ha,w)},
Ay(d){return this.b21(d)},
b21(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Ay=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=3
return A.d(s.D7(0,new B.AK(d.h(0,"sdp"),d.h(0,"type"))),$async$Ay)
case 3:x=4
return A.d(s.Q_(0),$async$Ay)
case 4:t=f
x=5
return A.d(s.D5(0,t),$async$Ay)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Ay,w)},
Po(d){return this.aZZ(d)},
aZZ(d){var x=0,w=A.k(y.H),v=this,u
var $async$Po=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.an("Connexion non pr\xe9par\xe9e."))
x=2
return A.d(u.D7(0,new B.AK(d.h(0,"sdp"),d.h(0,"type"))),$async$Po)
case 2:return A.i(null,w)}})
return A.j($async$Po,w)},
Pi(d){return this.aZK(d)},
aZK(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Pi=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.d(t.P6(new B.G2(A.aj(d.h(0,"candidate")),A.aj(d.h(0,"sdpMid")),A.dI(d.h(0,"sdpMLineIndex")))),$async$Pi)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Pi,w)},
Ui(d){return this.aqV(d)},
aqV(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Ui=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.TR(0)
if(r==null)r=C.dn
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.M)(r),++s)r[s].sks(0,t)
return A.i(null,w)}})
return A.j($async$Ui,w)},
Ke(d){return this.aqL(d)},
aqL(d){var x=0,w=A.k(y.H)
var $async$Ke=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.d(B.aK8(d),$async$Ke)
case 2:return A.i(null,w)}})
return A.j($async$Ke,w)},
Uf(d){return this.aqD(d)},
aqD(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Uf=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.JY(0)
if(s==null)s=C.dn
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.M)(s),++t)s[t].sks(0,d)
return A.i(null,w)}})
return A.j($async$Uf,w)},
Pt(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Pt=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.JY(0)
if(s==null)s=D.abL
if(s.length===0){x=1
break}x=3
return A.d(B.bRL(C.b.gP(s)),$async$Pt)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Pt,w)},
h1(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$h1=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a3(0)
x=7
return A.d(y.x.b(q)?q:A.da(q,y.H),$async$h1)
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
else{o=A.D(q.TR(0),!0,y.G)
C.b.t(o,q.JY(0))
q=o}if(q==null)q=C.dn
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.cab(r)
if(!m.b(k)){j=new A.av($.aE,n)
j.a=8
j.c=k
k=j}x=15
return A.d(k,$async$h1)
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
return A.d(s.d.l(),$async$h1)
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
return A.d(s.e.l(),$async$h1)
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
return A.j($async$h1,w)}}
B.a2_.prototype={
PQ(d){return this.b0i(d)},
b0i(d){var x=0,w=A.k(y.H),v=this
var $async$PQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.d(v.DD(),$async$PQ)
case 2:return A.i(null,w)}})
return A.j($async$PQ,w)},
DD(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$DD=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a5(r)===0){x=1
break}u=4
q=B.cah(B.bQQ(A.cy(r,0,null),null))
s.b=q
x=7
return A.d(q.f.a,$async$DD)
case 7:s.f=0
p=q.r.b
p===$&&A.e()
p=p.b
p===$&&A.e()
s.c=new A.co(p,A.u(p).i("co<1>")).aR(s.gaS8(),!0,s.gaRg(),new B.au2(s))
u=2
x=6
break
case 4:u=3
n=t
s.Yf()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$DD,w)},
aS9(d){var x,w,v,u
try{x=C.Y.cD(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.D(0,B.c0p(w))}catch(u){}},
Yf(){var x,w=this,v=w.c
if(v!=null)v.W(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.D(0,null)
return}x=D.a8_[v]
w.f=v+1
v=w.d
if(v!=null)v.W(0)
w.d=A.dk(A.d3(0,0,0,0,x),new B.au3(w))},
Hg(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Hg=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.W(0)
s=t.c
s=s==null?null:s.W(0)
x=2
return A.d(y.x.b(s)?s:A.da(s,y.H),$async$Hg)
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
r=s.w=new B.alU(s,q)}s=r.a3(0)}x=7
return A.d(y._.b(s)?s:A.da(s,y.z),$async$Hg)
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
return A.j($async$Hg,w)}}
B.a5s.prototype={
r5(d){return this.b7k(d)},
b7k(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$r5=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.d((s==null?t.a=A.a0V():s).aG(0),$async$r5)
case 6:x=7
return A.d(t.a.a4U(d),$async$r5)
case 7:x=8
return A.d(t.a.iH(C.Gk),$async$r5)
case 8:x=9
return A.d(t.a.hH(1),$async$r5)
case 9:x=10
return A.d(t.a.cP(0),$async$r5)
case 10:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$r5,w)},
hL(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hL=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aG(0)
x=6
return A.d(y.x.b(s)?s:A.da(s,y.H),$async$hL)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$hL,w)},
h1(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$h1=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.l()
x=6
return A.d(y.x.b(s)?s:A.da(s,y.H),$async$h1)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:t.a=null
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$h1,w)}}
B.aMi.prototype={
a0j(d,e){return this.b1S(d,e)},
b1S(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a0j=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.b([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fd(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bT(t)))
t=J.l(s)
v=B.cgt(C.cw.gli().be(new A.eM(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0j,w)}}
B.mR.prototype={
TR(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.cK(w,A.T(w).i("cK<1,ax>"))
J.fR(w,new B.aI8(x))
return x},
JY(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.cK(w,A.T(w).i("cK<1,ax>"))
J.fR(w,new B.aI9(x))
return x}}
B.a5U.prototype={
axp(d){var x=this,w=x.d
w.addEventListener("ended",A.bG(new B.aI5(x)))
w.addEventListener("mute",A.bG(new B.aI6(x)))
w.addEventListener("unmute",A.bG(new B.aI7(x)))},
sks(d,e){this.d.enabled=e},
aG(d){var x=0,w=A.k(y.H),v=this
var $async$aG=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aG,w)}}
B.aHS.prototype={
CS(d,e){return this.apK(0,e)},
apK(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$CS=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.crk())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.iN(e.h(0,"video"),"facingMode")
e.cq(0,"video",new B.aHU())
e.cq(0,"audio",new B.aHV())}catch(a0){A.nv("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hQ(e.h(0,"audio"),i,i).au(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.fR(s,new B.aHW(r))
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
return A.d(A.dV(o.getUserMedia(h.a(n)),h),$async$CS)
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
return A.d(A.dV(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$CS)
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
return A.j($async$CS,w)}}
B.a7A.prototype={
axu(d,e){var x=this,w=x.at
w===$&&A.e()
w.addEventListener("datachannel",A.bG(new B.aMl(x)))
w.addEventListener("icecandidate",A.bG(new B.aMm(x)))
w.addEventListener("iceconnectionstatechange",A.bG(new B.aMn(x)))
w.onicegatheringstatechange=A.bG(new B.aMo(x))
w.addEventListener("signalingstatechange",A.bG(new B.aMp(x)))
if(!$.bVj())w.addEventListener("connectionstatechange",A.bG(new B.aMq(x)))
w.addEventListener("negotiationneeded",A.bG(new B.aMr(x)))
w.addEventListener("track",A.bG(new B.aMs(x)))},
Q2(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Q2=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dV(s.createOffer(y.m.a(A.bT(A.C(y.N,y.z)))),y.A),$async$Q2)
case 3:t=f
v=new B.AK(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Q2,w)},
Q_(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Q_=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.e()
x=3
return A.d(A.dV(s.createAnswer(y.m.a(A.bT(A.C(y.N,y.z)))),y.A),$async$Q_)
case 3:t=f
v=new B.AK(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Q_,w)},
jk(d,e){var x
this.ax.cq(0,e.a,new B.aMk(this,e))
x=this.at
x===$&&A.e()
x.addStream(e.e)
return A.cH(null,y.H)},
D5(d,e){return this.aqP(0,e)},
aqP(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$D5=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dV(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$D5)
case 2:return A.i(null,w)}})
return A.j($async$D5,w)},
D7(d,e){return this.ar5(0,e)},
ar5(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$D7=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.e()
x=2
return A.d(A.dV(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$D7)
case 2:return A.i(null,w)}})
return A.j($async$D7,w)},
P6(d){return this.aZp(d)},
aZp(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$P6=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.e()
u=d.b
u.toString
x=2
return A.d(A.dV(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$P6)
case 2:return A.i(null,w)}})
return A.j($async$P6,w)},
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
B.bSC.prototype={
aG(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aG=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aG,w)}}
B.PE.prototype={
same(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.HM()
if(x!=null)x.style.objectFit=e},
age(){var x=this,w=x.HM(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.aj6(u,x.z!=null,0,t))},
sa5m(d,e){var x,w,v,u,t=this
t.z=e
if(e.JY(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ar(y.l.b(x)?x:new A.cK(x,A.T(x).i("cK<1,ax>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.TR(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ar(y.l.b(x)?x:new A.cK(x,A.T(x).i("cK<1,ax>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aEZ()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.HM()
if(u!=null){u.srcObject=t.x
x=t.HM()
x.toString
t.a74(x)}t.sp(0,t.a.b0H(t.z!=null))},
aEZ(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
HM(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
l(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$l=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.M)(t),++r)t[r].W(0)
q=u.HM()
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
iz(d){var x=0,w=A.k(y.H),v=this
var $async$iz=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.CX()
$.oQ().rh("RTCVideoRenderer-"+v.Q,new B.aMy(v),!0)
return A.i(null,w)}})
return A.j($async$iz,w)},
a74(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.PG.prototype={
N(){return new B.PH()}}
B.PH.prototype={
U(){var x,w,v=this
v.X()
v.a.c.a8(0,v.gaPm())
x=v.a
w=x.c
w.as=x.e
w.same(0,x.d===D.tc?"contain":"cover")},
aPn(){if(this.c!=null)this.m(new B.aMz())},
l(){if(this.c!=null)this.a0()},
aT(d){var x,w
this.b7(d)
A.dk(A.d3(0,0,10,0,0),new B.aMB(this))
x=this.a
w=x.c
w.same(0,x.d===D.tc?"contain":"cover")},
C(d){return new A.i6(new B.aMA(this),null)}}
B.a4l.prototype={
axg(d,e,f,g){var x=this,w=$.aE
x.a!==$&&A.bf()
x.a=new B.Vt(d,x,new A.aZ(new A.av(w,y.c),y.r),e,g.i("Vt<0>"))
if(f.a.gi7())f.a=new B.R8(g.i("@<0>").bV(g).i("R8<1,2>")).fT(f.a)
w=A.fq(null,new B.aBq(f,x),null,!0,g)
x.b!==$&&A.bf()
x.b=w},
acL(){var x,w
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
this.aHo(d,e)},
hc(d){return this.d1(d,null)},
aHo(d,e){var x=this
if(x.w){x.a.a.d1(d,e)
return}x.c.fq(d,e)
x.acM()
x.b.acL()
x.a.a.a3(0).f6(new B.bhM())},
a3(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.acL()
x.c.cf(0,x.a.a.a3(0))}return x.c.a},
acM(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.df(0)
return},
$idK:1}
B.a9P.prototype={}
B.a9Q.prototype={}
B.y5.prototype={
a8e(d,e){var x=this.b
if((x.b&4)!==0)return
x.D(0,new B.DH(d,e))
x.a3(0)},
a4S(d){var x
if((this.b.b&4)!==0)throw A.n(B.bTg())
x=A.bT(d)
x.toString
this.a.send(x)},
wj(d,e,f){return this.b03(0,e,f)},
b03(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$wj=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bTg())
u.a3(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$wj,w)},
$ibTf:1}
B.to.prototype={}
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
B.ap7.prototype={
ax6(d){d.eH(new B.apb(this),new B.apc(this),y.a)}}
B.alU.prototype={
a3(d){var x=this.b
x.e=x.d=null
return this.asL(0)}}
B.aaY.prototype={
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
B.a7B.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aMh.prototype={}
B.Og.prototype={}
B.Fn.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aHR.prototype={}
B.G2.prototype={}
B.PC.prototype={}
B.aMt.prototype={}
B.AK.prototype={}
B.PD.prototype={}
B.PF.prototype={
aj6(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.PF(x,w,v)},
b0H(d){return this.aj6(null,d,null,null)},
j(d){var x=this
return A.a1(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","yM(F)","~(GN)","bn(G2)","bn(PD)","bn(n3)","~(@)","mR(@)","mR()","bn(bTf)","~(to)"])
B.aRT.prototype={
$0(){return J.c9v(this.a.bo())},
$S:1}
B.aRU.prototype={
$1(d){var x,w,v,u
try{this.b.D(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bc(v)
this.b.d1(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.ar0.prototype={
$1(d){if(d==null)return null
return A.c3(J.l(d))},
$S:157}
B.bd8.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.Fr(!0)},
$S:0}
B.bd9.prototype={
$1(d){return this.a.OW()},
$S:32}
B.bd5.prototype={
$0(){var x=this.a.c
if(x!=null)A.a9(x,!1).br()},
$S:0}
B.bd6.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bd2.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bd3.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bd4.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bd_.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bd0.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bd1.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bYq(x.w,null,w,u,!1,v)},
$S:z+2}
B.bd7.prototype={
$0(){return this.a.aSp()},
$S:0}
B.bcI.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.z_("annule",C.ea,!1)
x.mK(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.bcJ.prototype={
$0(){var x=this.a
x.fr=x.a.d==="video"?A.a("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.a("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bcK.prototype={
$1(d){this.a.z_("candidat_ice",d,!1)},
$S:388}
B.bcL.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bcH(x))},
$S:0}
B.bcH.prototype={
$0(){return this.a.fx=!0},
$S:0}
B.bcM.prototype={
$0(){this.a.mK(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bcN.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bcO.prototype={
$1(d){var x=this.a,w=x.ax
if(x.c!=null&&w!=null&&x.x)x.m(new B.bcG(x,w))},
$S:32}
B.bcG.prototype={
$0(){return this.a.ay=new A.aw(Date.now(),0,!1).er(this.b)},
$S:0}
B.bcP.prototype={
$1(d){},
$S:154}
B.bcQ.prototype={
$1(d){this.a.EQ()},
$S:32}
B.bcT.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.ad6()
x.a9y("reponse",d)},
$S:389}
B.bcU.prototype={
$1(d){this.a.mK(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bcV.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.ad6()},
$S:29}
B.bcW.prototype={
$1(d){this.a.mK(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bcX.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.a9y("offre",d)},
$S:389}
B.bcY.prototype={
$1(d){this.a.mK(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bcR.prototype={
$0(){var x=this.a
x.x=!0
x.ax=new A.aw(Date.now(),0,!1)
x.ay=C.Q},
$S:0}
B.bcS.prototype={
$1(d){return A.C(y.N,y.z)},
$S:110}
B.bcF.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bcE.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bcD.prototype={
$0(){return this.a.at=this.b},
$S:0}
B.bcZ.prototype={
$2(d,e){if(!d)this.a.Fn()},
$S:996}
B.aRh.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aRi.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gP(x):null
if(w!=null)this.a.aDy(w)},
$S:z+5}
B.aRj.prototype={
$1(d){var x
if(d===D.KZ){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.au2.prototype={
$1(d){return this.a.Yf()},
$S:21}
B.au3.prototype={
$0(){var x=this.a
if(!x.e)x.DD()},
$S:0}
B.bOg.prototype={
$1(d){return d.length!==0},
$S:11}
B.aI8.prototype={
$1(d){return this.a.push(B.bS4(d))},
$S:21}
B.aI9.prototype={
$1(d){return this.a.push(B.bS4(d))},
$S:21}
B.aI5.prototype={
$1(d){},
$S:22}
B.aI6.prototype={
$1(d){},
$S:22}
B.aI7.prototype={
$1(d){},
$S:22}
B.aHU.prototype={
$0(){return!1},
$S:49}
B.aHV.prototype={
$0(){return!1},
$S:49}
B.aHW.prototype={
$1(d){J.fR(d,new B.aHT(this.a))},
$S:388}
B.aHT.prototype={
$2(d,e){this.a.k(0,d,e)},
$S:48}
B.aMl.prototype={
$1(d){},
$S:22}
B.aMm.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.G2(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aMn.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.e()
v=B.cqU(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bVj())switch(w.cx.a){case 0:w.cy=D.L3
break
case 1:w.cy=D.L4
break
case 3:w.cy=D.L5
break
case 5:w.cy=D.L1
break
case 6:w.cy=D.L2
break
case 7:w.cy=D.tb
break
default:break}},
$S:30}
B.aMo.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.CW=B.cqV(w.iceGatheringState)},
$S:30}
B.aMp.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.ch=B.csr(w.signalingState)},
$S:30}
B.aMq.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.e()
x.cy=B.cs6(w.connectionState)},
$S:30}
B.aMr.prototype={
$1(d){},
$S:30}
B.aMs.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bS4(d.track)
x=d.streams
x=y.l.b(x)?x:new A.cK(x,A.T(x).i("cK<1,ax>"))
w=J.dn(x,new B.aMj(w),y.h)
v.$1(new B.PD(A.D(w,!0,w.$ti.i("aB.E"))))}},
$S:22}
B.aMj.prototype={
$1(d){return new B.mR(d,d.id,this.a.as)},
$S:z+8}
B.aMk.prototype={
$0(){var x=this.b.e
return new B.mR(x,x.id,this.a.as)},
$S:z+9}
B.bOo.prototype={
$1(d){return J.fQ(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:11}
B.aMy.prototype={
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
x.a74(t)
v=y.i.c
w.push(A.hT(t,"canplay",new B.aMu(x),!1,v))
w.push(A.hT(t,"resize",new B.aMv(x),!1,v))
w.push(A.hT(t,"error",new B.aMw(t),!1,v))
w.push(A.hT(t,"ended",new B.aMx(),!1,v))
return t},
$S:168}
B.aMu.prototype={
$1(d){this.a.age()},
$S:21}
B.aMv.prototype={
$1(d){this.a.age()},
$S:21}
B.aMw.prototype={
$1(d){var x,w,v=this.a.error
A.nv("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Gq.h(0,A.ao(v,"code"))
x.toString
w=!J.q(A.ao(v,"message"),"")?A.ao(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.mZ(x,C.Gp.h(0,A.ao(v,"code")),w,null))},
$S:23}
B.aMx.prototype={
$1(d){},
$S:21}
B.aMz.prototype={
$0(){},
$S:0}
B.aMB.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aMA.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a4B("RTCVideoRenderer-"+w.Q)
else w=A.P(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cB(A.P(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:997}
B.aBq.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.e()
v.c=x.eW(w.ghs(w),new B.aBp(v),w.gnM())},
$S:0}
B.aBp.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.e()
w.acM()
x=x.b
x===$&&A.e()
x.a3(0)},
$S:0}
B.bhM.prototype={
$1(d){},
$S:16}
B.asX.prototype={
$1(d){this.a.cf(0,this.b)},
$S:22}
B.asY.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.fJ(new B.HG("Failed to connect WebSocket"))
else this.b.a8e(1006,"error")},
$S:22}
B.asZ.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cA("data")
if(typeof x==="string")w.b=new B.Hb(A.be(x))
else if(typeof x==="object"&&A.bZv(y.m.a(x),"ArrayBuffer"))w.b=new B.Dh(A.OG(y.o.a(x),0,null))
else throw A.n(A.an("unexpected message type: "+J.aC(x).j(0)))
v.D(0,w.bo())},
$S:23}
B.at_.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cf(0,this.b)
this.b.a8e(d.code,d.reason)},
$S:22}
B.apb.prototype={
$1(d){var x=d.b,w=this.a
new A.co(x,A.u(x).i("co<1>")).cB(new B.ap8(w))
x=w.r.a
x===$&&A.e()
x=x.b
x===$&&A.e()
new A.co(x,A.u(x).i("co<1>")).b7B(new B.ap9(d),new B.apa(w,d))
w.f.df(0)},
$S:z+10}
B.ap8.prototype={
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
B.ap9.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.aq(B.bTg())
s=A.bT(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a4S(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a4S(new Uint8Array(A.cV(u)))
break $label1$1}t=A.aN("Cannot send "+J.aC(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.HF))throw r}},
$S:18}
B.apa.prototype={
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
B.apc.prototype={
$1(d){var x,w=d instanceof A.Sa?d:new B.aaY(J.l(d)),v=this.a
v.f.fJ(w)
v=v.r.a
v===$&&A.e()
x=v.a
x===$&&A.e()
x.hc(w)
v=v.a
v===$&&A.e()
v.a3(0)},
$S:30};(function aliases(){var x=B.E4.prototype
x.asL=x.a3})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.UB.prototype,"gay8","KZ",0)
var v
w(v=B.UA.prototype,"gaXE","ag7",3)
x(v,"gadr","Fn",0)
x(v,"ga7h","Lk",0)
x(v,"ga7g","Lj",0)
x(v,"ga7e","Lg",0)
x(v,"ga7f","Lh",0)
w(v=B.a2_.prototype,"gaS8","aS9",7)
x(v,"gaRg","Yf",1)
x(B.PE.prototype,"gdL","l",0)
x(B.PH.prototype,"gaPm","aPn",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a0,[B.E4,B.ar_,B.GN,B.a2d,B.aRg,B.a2_,B.a5s,B.aMh,B.Og,B.Fn,B.aHR,B.PC,B.aMt,B.a9Q,B.Vt,B.a9P,B.y5,B.to,B.HG,B.aaY,B.G2,B.AK,B.PD,B.PF])
w(B.R8,A.fr)
x(A.jY,[B.aRT,B.bd8,B.bd5,B.bd6,B.bd2,B.bd3,B.bd4,B.bd_,B.bd0,B.bd7,B.bcI,B.bcJ,B.bcL,B.bcH,B.bcM,B.bcN,B.bcG,B.bcR,B.bcF,B.bcE,B.bcD,B.au3,B.aHU,B.aHV,B.aMk,B.aMz,B.aMB,B.aBq,B.aBp,B.apa])
x(A.iu,[B.aRU,B.ar0,B.bd9,B.bd1,B.bcK,B.bcO,B.bcP,B.bcQ,B.bcT,B.bcU,B.bcV,B.bcW,B.bcX,B.bcY,B.bcS,B.aRh,B.aRi,B.aRj,B.au2,B.bOg,B.aI8,B.aI9,B.aI5,B.aI6,B.aI7,B.aHW,B.aMl,B.aMm,B.aMn,B.aMo,B.aMp,B.aMq,B.aMr,B.aMs,B.aMj,B.bOo,B.aMy,B.aMu,B.aMv,B.aMw,B.aMx,B.bhM,B.asX,B.asY,B.asZ,B.at_,B.apb,B.ap8,B.ap9,B.apc])
x(A.N,[B.ph,B.yM,B.PG])
x(A.S,[B.UB,B.UA,B.PH])
x(A.at,[B.Tf,B.acD,B.wN])
x(A.qS,[B.bcZ,B.aHT,B.aMA])
w(B.aMi,B.aMh)
w(B.mR,B.Og)
w(B.a5U,B.Fn)
w(B.aHS,B.aHR)
w(B.a7A,B.PC)
w(B.bSC,B.aMt)
w(B.PE,A.d6)
x(B.a9Q,[B.a4l,B.ap7])
x(B.to,[B.Hb,B.Dh,B.DH])
w(B.HF,B.HG)
w(B.alU,B.E4)
x(A.I8,[B.w_,B.PB,B.vZ,B.n3,B.a7B])})()
A.oG(b.typeUniverse,JSON.parse('{"E4":{"dK":["1"]},"R8":{"fr":["1","2"],"fr.S":"1","fr.T":"2"},"yM":{"N":[],"m":[]},"ph":{"N":[],"m":[]},"UB":{"S":["ph"]},"Tf":{"at":[],"m":[]},"UA":{"S":["yM"]},"acD":{"at":[],"m":[]},"wN":{"at":[],"m":[]},"mR":{"Og":[]},"a5U":{"Fn":[]},"a7A":{"PC":[]},"PE":{"d6":["PF"],"aV":[]},"PG":{"N":[],"m":[]},"PH":{"S":["PG"]},"Vt":{"dK":["1"]},"y5":{"bTf":[]},"Hb":{"to":[]},"Dh":{"to":[]},"DH":{"to":[]},"HG":{"bN":[]},"HF":{"bN":[]},"alU":{"dK":["@"]},"aaY":{"bN":[]}}'))
A.bTI(b.typeUniverse,JSON.parse('{"E4":1,"a9Q":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("y5"),L:x("bN"),_:x("as<@>"),x:x("as<~>"),S:x("E<ae<o,K>>"),t:x("E<ae<o,@>>"),Q:x("E<Fn>"),d:x("E<iD<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("ax"),l:x("J<ax>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<v>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("Og"),G:x("Fn"),h:x("mR"),o:x("pD"),a:x("bn"),K:x("a0"),J:x("PC"),v:x("AK"),Z:x("a9P<a0?>"),N:x("o"),e:x("q6"),M:x("e3"),D:x("to"),U:x("U<o>"),g:x("dv<GN>"),n:x("dv<~>"),V:x("aZ<y5>"),r:x("aZ<@>"),R:x("aZ<~>"),i:x("UL<ax>"),C:x("oz<ax>"),k:x("av<y5>"),c:x("av<@>"),W:x("av<~>"),q:x("ky"),y:x("K"),z:x("@"),A:x("ax?"),X:x("a0?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.UE=new B.a2d(C.k8)
D.yg=new A.am(32,0,32,0)
D.qn=new A.ak(57638,"MaterialIcons",null,!1)
D.yX=new A.ak(57639,"MaterialIcons",null,!1)
D.a_j=new A.ak(58337,"MaterialIcons",null,!1)
D.a_k=new A.ak(58341,"MaterialIcons",null,!1)
D.a_o=new A.ak(58923,"MaterialIcons",null,!1)
D.z2=new A.ak(59048,"MaterialIcons",null,!1)
D.a_p=new A.ak(59049,"MaterialIcons",null,!1)
D.a_q=new A.ak(59077,"MaterialIcons",null,!1)
D.a8_=A.b(x([1,2,4,8,16]),A.ay("E<v>"))
D.abL=A.b(x([]),y.Q)
D.GC=new A.fp("FlutterWebRTC.Method",C.b7,null)
D.akb=new B.n3(0,"RTCIceConnectionStateNew")
D.akc=new B.n3(1,"RTCIceConnectionStateChecking")
D.akd=new B.n3(2,"RTCIceConnectionStateCompleted")
D.ake=new B.n3(3,"RTCIceConnectionStateConnected")
D.akf=new B.n3(4,"RTCIceConnectionStateCount")
D.KZ=new B.n3(5,"RTCIceConnectionStateFailed")
D.akg=new B.n3(6,"RTCIceConnectionStateDisconnected")
D.L_=new B.n3(7,"RTCIceConnectionStateClosed")
D.L0=new B.PB(0,"RTCIceGatheringStateNew")
D.akh=new B.PB(1,"RTCIceGatheringStateGathering")
D.aki=new B.PB(2,"RTCIceGatheringStateComplete")
D.tb=new B.vZ(0,"RTCPeerConnectionStateClosed")
D.L1=new B.vZ(1,"RTCPeerConnectionStateFailed")
D.L2=new B.vZ(2,"RTCPeerConnectionStateDisconnected")
D.L3=new B.vZ(3,"RTCPeerConnectionStateNew")
D.L4=new B.vZ(4,"RTCPeerConnectionStateConnecting")
D.L5=new B.vZ(5,"RTCPeerConnectionStateConnected")
D.akj=new B.w_(0,"RTCSignalingStateStable")
D.akk=new B.w_(1,"RTCSignalingStateHaveLocalOffer")
D.akl=new B.w_(2,"RTCSignalingStateHaveRemoteOffer")
D.akm=new B.w_(3,"RTCSignalingStateHaveLocalPrAnswer")
D.akn=new B.w_(4,"RTCSignalingStateHaveRemotePrAnswer")
D.L6=new B.w_(5,"RTCSignalingStateClosed")
D.ako=new B.PF(0,0,0)
D.tc=new B.a7B(0,"RTCVideoViewObjectFitContain")
D.L7=new B.a7B(1,"RTCVideoViewObjectFitCover")
D.nW=new A.c0(20,null,null,null)
D.anU=new A.c0(48,null,null,null)
D.MC=new A.c0(null,64,null,null)
D.ar2=new A.x(!0,C.k,null,null,null,null,22,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Ng=new A.x(!0,C.k,null,null,null,null,26,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ars=new A.x(!0,C.n,null,null,null,null,32,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.No=new A.x(!0,C.n,null,null,null,null,40,C.x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.um=new A.x(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c1w=!1
$.c_S=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cvR","bVv",()=>new B.aMi())
x($,"ctT","bVj",()=>C.c.q(A.ao(A.ao(A.ao(A.bV_(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_2",e:"endPart",h:b})})($__dart_deferred_initializers__,"xkMqChUUHEmSjw9FOdc/P47HzIk=");