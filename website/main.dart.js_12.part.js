((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_12",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,D,B={CP:function CP(){},Pj:function Pj(d){this.$ti=d},aMV:function aMV(d){this.a=d},aMW:function aMW(d,e){this.a=d
this.b=e},
Zi(d){var x,w,v,u,t,s=new B.ana(),r=J.P(d),q=r.h(d,"id")
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
return new B.an9(q,x,w,v,u,t)},
bRm(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.lZ(t,y.N,y.z):D.fj
if(u.h(d,"cree_le")!=null)A.c5(J.l(u.h(d,"cree_le")))
return new B.Fq(s,x,w,v)},
c13(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return C.Tl
x=A.b([],y.t)
for(r=J.ap(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.lZ(s,u,t))}return new B.a_M(x)},
bEc(d){var x=D.h.bb(d.a,1e6)
return D.c.b0(D.h.j(D.h.bb(x,60)),2,"0")+":"+D.c.b0(D.h.j(D.h.aP(x,60)),2,"0")},
bW4(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.od(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.aeT(w,v)},
cef(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aeW(u,A.kf(w)?w:null,v)},
an9:function an9(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
ana:function ana(){},
Fq:function Fq(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a_M:function a_M(d){this.a=d},
bOv(d,e,f,g,h,i){return new B.oH(e,f,i,h,d,null)},
bOu(d,e,f,g,h){return new B.xS(e,h,f,g,d,null)},
bSy(d,e,f,g,h,i,j,k,l,m,n){return new B.a9x(g,f,e,i,h,d,m,l,k,j,n,null)},
oH:function oH(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Sv:function Sv(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b6Y:function b6Y(d){this.a=d},
b6Z:function b6Z(d){this.a=d},
b6V:function b6V(d){this.a=d},
b6W:function b6W(d){this.a=d},
b6S:function b6S(d){this.a=d},
b6T:function b6T(d){this.a=d},
b6U:function b6U(d){this.a=d},
b6P:function b6P(d){this.a=d},
b6Q:function b6Q(d){this.a=d},
b6R:function b6R(d){this.a=d},
b6X:function b6X(d){this.a=d},
Rd:function Rd(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
xS:function xS(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Su:function Su(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b6z:function b6z(d){this.a=d},
b6A:function b6A(d){this.a=d},
b6y:function b6y(){},
b6B:function b6B(d){this.a=d},
b6C:function b6C(d){this.a=d},
b6D:function b6D(d){this.a=d},
b6E:function b6E(d){this.a=d},
b6x:function b6x(d,e){this.a=d
this.b=e},
b6F:function b6F(){},
b6G:function b6G(d){this.a=d},
b6I:function b6I(d){this.a=d},
b6J:function b6J(d){this.a=d},
b6K:function b6K(d){this.a=d},
b6L:function b6L(d){this.a=d},
b6M:function b6M(d){this.a=d},
b6N:function b6N(d){this.a=d},
b6H:function b6H(d){this.a=d},
b6w:function b6w(d,e){this.a=d
this.b=e},
b6v:function b6v(d,e){this.a=d
this.b=e},
b6u:function b6u(d,e){this.a=d
this.b=e},
b6O:function b6O(d){this.a=d},
a9x:function a9x(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
w0:function w0(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aMk:function aMk(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aMl:function aMl(d){this.a=d},
aMm:function aMm(d){this.a=d},
aMn:function aMn(d){this.a=d},
a_w:function a_w(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aq_:function aq_(d){this.a=d},
aq0:function aq0(d){this.a=d},
bF5(d){var x=y.U,w=A.H(new A.Y(A.b(d.split(" "),y.s),new B.bF6(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.p(D.b.gS(w),0).toUpperCase()
return(J.p(D.b.gS(w),0)+J.p(D.b.gaG(w),0)).toUpperCase()},
bF6:function bF6(){},
aHL:function aHL(){},
mo:function mo(d,e,f){this.e=d
this.a=e
this.b=f},
aDa:function aDa(d){this.a=d},
aDb:function aDb(d){this.a=d},
bIu(d){var x=new B.a3d(d)
x.at5(d)
return x},
a3d:function a3d(d){this.d=d},
aD7:function aD7(d){this.a=d},
aD8:function aD8(d){this.a=d},
aD9:function aD9(d){this.a=d},
aCX:function aCX(){},
aCZ:function aCZ(){},
aD_:function aD_(){},
aD0:function aD0(d){this.a=d},
aCY:function aCY(d){this.a=d},
c5G(d,e){var x=y.N
x=new B.a4I(d,e,A.C(x,y.E),A.C(x,y.z))
x.ata(d,e)
return x},
a4I:function a4I(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aHO:function aHO(d){this.a=d},
aHP:function aHP(d){this.a=d},
aHQ:function aHQ(d){this.a=d},
aHR:function aHR(d){this.a=d},
aHS:function aHS(d){this.a=d},
aHT:function aHT(d){this.a=d},
aHU:function aHU(d){this.a=d},
aHV:function aHV(d){this.a=d},
aHM:function aHM(d){this.a=d},
aHN:function aHN(d,e){this.a=d
this.b=e},
bJ0:function bJ0(d){this.a=d},
cg1(){return D.b.mL(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bFe())!==-1},
bFe:function bFe(){},
bQO(){var x=A.b([],y.d),w=$.bQP
$.bQP=w+1
return new B.NV(w,x,C.agP,$.ag())},
NV:function NV(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aI0:function aI0(d){this.a=d},
aHX:function aHX(d){this.a=d},
aHY:function aHY(d){this.a=d},
aHZ:function aHZ(d){this.a=d},
aI_:function aI_(){},
bQQ(d,e,f){return new B.NX(d,f,e,null)},
NX:function NX(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
NY:function NY(){this.c=this.a=null},
aI1:function aI1(){},
aI3:function aI3(d){this.a=d},
aI2:function aI2(d){this.a=d},
bP1(d,e,f,g){var x,w={}
w.a=d
x=new B.a1K(g.i("a1K<0>"))
x.asX(e,f,w,g)
return x},
a1K:function a1K(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
awD:function awD(d,e){this.a=d
this.b=e},
awC:function awC(d){this.a=d},
Tk:function Tk(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bbD:function bbD(){},
a6R:function a6R(d){this.b=this.a=$
this.$ti=d},
a6S:function a6S(){},
bHh(d,e){return B.c0m(d,e)},
c0m(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bHh=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nI("ws")&&!d.nI("wss"))throw A.n(A.fg(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xe(r,A.fV(null,null,null,!1,y.D))
u=new A.aw($.aJ,y.k)
p=new A.b3(u,y.V)
if(J.q(r.readyState,1))p.cO(0,q)
else if(J.q(r.readyState,2)||J.q(r.readyState,3))p.hB(new B.Gf("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o2(r,"open",!1,y.C).gS(0).aE(new B.aoV(p,q),y.H)
t=y.C
s=y.H
new A.o2(r,"error",!1,t).gS(0).aE(new B.aoW(p,q),s)
A.mR(r,"message",new B.aoX(q),!1,y.m)
new A.o2(r,"close",!1,t).gS(0).aE(new B.aoY(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bHh,w)},
xe:function xe(d,e){this.a=d
this.b=e},
aoV:function aoV(d,e){this.a=d
this.b=e},
aoW:function aoW(d,e){this.a=d
this.b=e},
aoX:function aoX(d){this.a=d},
aoY:function aoY(d,e){this.a=d
this.b=e},
bJA(){return new B.Ge("Connection Closed")},
rJ:function rJ(){},
FO:function FO(d){this.a=d},
C4:function C4(d){this.a=d},
Cs:function Cs(d,e){this.a=d
this.b=e},
Gf:function Gf(d){this.a=d},
Ge:function Ge(d){this.a=d},
c_T(d){var x=null,w=$.aJ,v=new B.a6R(y.Z),u=y.X,t=A.fV(x,x,x,!0,u),s=A.fV(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bP1(new A.cE(s,r.i("cE<1>")),new A.Bj(t,q.i("Bj<1>")),!0,u)
v.b=B.bP1(new A.cE(t,q.i("cE<1>")),new A.Bj(s,r.i("Bj<1>")),!1,u)
v=new B.alr(new A.b3(new A.aw(w,y.W),y.R),v)
v.asO(d)
return v},
alr:function alr(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
alv:function alv(d){this.a=d},
als:function als(d){this.a=d},
alt:function alt(d){this.a=d},
alu:function alu(d,e){this.a=d
this.b=e},
alw:function alw(d){this.a=d},
ait:function ait(d,e){this.b=d
this.a=e},
a7X:function a7X(d){this.a=d},
cfD(d){switch(d){case"new":return C.agC
case"checking":return C.agD
case"connected":return C.agF
case"completed":return C.agE
case"failed":return C.JM
case"disconnected":return C.agH
case"closed":return C.JN
case"count":return C.agG}return C.JN},
cfE(d){switch(d){case"new":return C.JO
case"gathering":return C.agI
case"complete":return C.agJ}return C.JO},
ch4(d){switch(d){case"stable":return C.agK
case"have-local-offer":return C.agL
case"have-local-pranswer":return C.agN
case"have-remote-offer":return C.agM
case"have-remote-pranswer":return C.agO
case"closed":return C.JU}return C.JU},
cgH(d){switch(d){case"new":return C.JR
case"connecting":return C.JS
case"connected":return C.JT
case"closed":return C.rw
case"disconnected":return C.JQ
case"failed":return C.JP}return C.rw},
vj:function vj(d,e){this.a=d
this.b=e},
NS:function NS(d,e){this.a=d
this.b=e},
vi:function vi(d,e){this.a=d
this.b=e},
mz:function mz(d,e){this.a=d
this.b=e},
a4J:function a4J(d,e){this.a=d
this.b=e},
aHK:function aHK(){},
Mu:function Mu(){},
E1:function E1(){},
aCW:function aCW(){},
EG:function EG(d,e,f){this.a=d
this.b=e
this.c=f},
NT:function NT(){},
aHW:function aHW(){},
zF:function zF(d,e){this.a=d
this.b=e},
NU:function NU(d){this.b=d},
NW:function NW(d,e,f){this.a=d
this.b=e
this.c=f},
bIc(d){var x=0,w=A.k(y.y)
var $async$bIc=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bIc,w)},
aFG(d){var x=0,w=A.k(y.H),v
var $async$aFG=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aQG("enableSpeakerphone",A.a8(["enable",d],y.N,v),v,v),$async$aFG)
case 2:return A.i(null,w)}})
return A.j($async$aFG,w)},
aQG(d,e,f,g){return B.c8g(d,e,f,g,f.i("0?"))},
c8g(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aQG=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aQF(),$async$aQG)
case 3:v=C.Fv.cw(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aQG,w)},
aQF(){var x=0,w=A.k(y.H),v,u
var $async$aQF=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bSp?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(C.Fv.cw("initialize",A.a8(["options",A.C(v,u)],v,u),!1,y.H),$async$aQF)
case 4:$.bSp=!0
case 3:return A.i(null,w)}})
return A.j($async$aQF,w)}},C,E
J=c[1]
A=c[0]
D=c[2]
B=a.updateHolder(c[5],B)
C=c[28]
E=c[20]
B.CP.prototype={
E(d,e){this.a.E(0,e)},
cZ(d,e){this.a.cZ(d,e)},
a6(d){return this.a.a6(0)},
$idB:1}
B.Pj.prototype={
iF(d){var x=A.cC("subscription"),w=A.fV(new B.aMV(x),null,null,!0,this.$ti.y[1])
x.b=d.eI(new B.aMW(this,w),w.glK(w),w.gnk())
return new A.cE(w,A.u(w).i("cE<1>"))}}
B.an9.prototype={}
B.Fq.prototype={}
B.a_M.prototype={}
B.oH.prototype={
N(){return new B.Sv()}}
B.Sv.prototype={
T(){var x=this
x.V()
x.J4()
x.r=A.de(D.bZ,new B.b6Y(x))
x.w=A.kO(C.WE,new B.b6Z(x))},
k(){var x=this,w=x.r
if(w!=null)w.a2(0)
w=x.w
if(w!=null)w.a2(0)
w=x.x
if(w!=null)w.a2(0)
x.a5()},
Vj(){var x=this.x
if(x!=null)x.a2(0)
this.x=A.de(D.fU,new B.b6V(this))},
Mu(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Mu=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.zF(p.c),$async$Mu)
case 7:r=e
q=B.Zi(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b6W(s))
p=s.r
if(p!=null)p.a2(0)
p=s.w
if(p!=null)p.a2(0)
s.Vj()}u=2
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
return A.j($async$Mu,w)},
J4(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$J4=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.zF(o.c),$async$J4)
case 7:r=e
q=B.Zi(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaig()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b6S(s))
s.Vj()
x=1
break}s.n(new B.b6T(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b6U(s))
s.Vj()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$J4,w)},
IV(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$IV=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b6P(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.YX(q.c,"accepte"),$async$IV)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b6Q(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(p,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.a2(0)
q=s.w
if(q!=null)q.a2(0)
q=s.c
q.toString
A.ab(q,!1).wv(A.ee(new B.b6R(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IV,w)},
C9(d){return this.aMW(d)},
auG(){return this.C9(!1)},
aMW(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$C9=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.a2(0)
r=s.w
if(r!=null)r.a2(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.YX(r.c,"refuse"),$async$C9)
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
if(r!=null)A.ab(r,!1).bJ()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$C9,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.oz(D.u,s,A.c(B.bF5(r.d),s,s,s,s,C.M1,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,C.LX,D.a2,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,D.az,new A.a0(C.xo,x,s),D.j,A.c(q,s,s,s,s,C.tA,s,s,s),C.Lm],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b6X(t)
v=A.a("Accepter")
u=t.f?s:t.gatO()
q.push(A.a_(A.b([new B.Rd(C.y8,D.k1,r,x,s),C.akd,new B.Rd(C.y7,C.adi,v,u,s)],w),D.o,D.bS,D.i,s))}if(t.d)q.push(E.vH)
return A.f3(s,D.n,A.he(!0,A.cO(A.M(q,D.o,D.e,D.U),s,s),!0,D.aj,!0,!0),s,s)}}
B.Rd.prototype={
C(d){var x=this,w=null,v=A.di(x.d,w,w,D.aj,D.cs,w)
return A.M(A.b([A.aa(A.b4(!1,A.cc(x.c,D.l,w,32),D.k,w,D.q,w,w,w,w,x.f,w,v),72,72),D.j,A.c(x.e,w,w,w,w,D.eL,w,w,w)],y.p),D.o,D.e,D.U)}}
B.xS.prototype={
N(){return new B.Su(A.b_(y.N),D.a3)}}
B.Su.prototype={
T(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bQO()
w=B.bQO()
v.d!==$&&A.bi()
v.d=new B.aMk(x,w)
v.a.toString
x=new B.a_w(new A.es(u,u,y.O),new A.es(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.uB()},
k(){var x=this,w=x.ay
if(w!=null)w.a2(0)
w=x.ch
if(w!=null)w.a2(0)
w=x.CW
if(w!=null)w.a2(0)
w=x.cx
if(w!=null)w.a2(0)
w=x.cy
if(w!=null)w.a2(0)
w=x.d
w===$&&A.d()
w.wg()
w=x.e
w===$&&A.d()
w.Fu()
x.a5()},
uB(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$uB=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a7()
x=7
return A.e(l.zF(m.c),$async$uB)
case 7:r=e
q=B.Zi(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.ml(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.O0(),$async$uB)
case 8:p=e
o=B.c13(p)
x=9
return A.e(s.Sn(),$async$uB)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))}s.ml(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.tO(A.a8(["iceServers",o.a],y.N,y.z),k==="video"),$async$uB)
case 10:m.f=new B.b6z(s)
m.r=new B.b6A(s)
m.w=new B.b6B(s)
if(s.c==null){x=1
break}s.n(new B.b6C(s))
s.ch=A.de(D.bZ,new B.b6D(s))
s.CW=A.kO(D.cS,new B.b6E(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cL(k,A.u(k).i("cL<1>")).cQ(s.gaRC())
k=m.w
s.cy=new A.cL(k,A.u(k).i("cL<1>")).cQ(new B.b6F())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.Na(D.c.Q9("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f6(D.c9,n,D.ai,!0))}s.ay=A.kO(D.fU,new B.b6G(s))
s.Df()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
s.ml(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uB,w)},
Sn(){var x=0,w=A.k(y.y),v
var $async$Sn=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Sn,w)},
Df(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Df=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.bQ("/messagerie/appels/"+p.c+"/signaux"),$async$Df)
case 7:r=e
for(p=J.ap(r);p.A();){q=p.gK(p)
s.acz(B.bRm(q))}u=2
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
return A.j($async$Df,w)},
acz(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bW4(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.z9(A.a8(["sdp",v.a,"type",v.b],y.N,y.z)).aE(new B.b6I(s),y.a).hi(new B.b6J(s))
break
case"reponse":if(!s.a.f)return
u=B.bW4(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.MS(A.a8(["sdp",u.a,"type",u.b],y.N,y.z)).aE(new B.b6K(s),y.a).hi(new B.b6L(s))
break
case"candidat_ice":t=B.cef(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.MO(A.a8(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.Fo().aE(new B.b6M(s),y.a).hi(new B.b6N(s))
break
case"refuse":s.ml(A.a("Appel refus\xe9"))
break
case"annule":s.ml(A.a("Appel annul\xe9"))
break
case"termine":s.ml(A.a("Appel termin\xe9"))
break}},
a9M(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.a2(0)
w.n(new B.b6H(w))},
xK(d,e,f){return this.aAh(d,e,f)},
a6g(d,e){return this.xK(d,e,!0)},
aAh(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$xK=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.agk(s.c,e,d),$async$xK)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$xK,w)},
DJ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$DJ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.a2(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.YX(r.c,"termine"),$async$DJ)
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
if(r!=null)A.ab(r,!1).bJ()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$DJ,w)},
ml(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.a2(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.B(v,v,v,v,v,D.f,v,A.c(d,v,v,v,v,v,v,v,v),v,D.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.ab(x,!1).bJ()},
Ja(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ja=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.Rn(u),$async$Ja)
case 2:if(v.c!=null)v.n(new B.b6w(v,u))
return A.i(null,w)}})
return A.j($async$Ja,w)},
J9(){var x=0,w=A.k(y.H),v=this,u,t
var $async$J9=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Id(u),$async$J9)
case 2:if(v.c!=null)v.n(new B.b6v(v,u))
return A.i(null,w)}})
return A.j($async$J9,w)},
J7(){var x=0,w=A.k(y.H),v=this,u,t
var $async$J7=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Rk(u),$async$J7)
case 2:if(v.c!=null)v.n(new B.b6u(v,u))
return A.i(null,w)}})
return A.j($async$J7,w)},
J8(){var x=0,w=A.k(y.H),v=this,u
var $async$J8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.MV(),$async$J8)
case 2:return A.i(null,w)}})
return A.j($async$J8,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bQQ(o.e,!1,C.JW)
else{x=A.oz(D.u,q,A.c(B.bF5(w.e),q,q,q,q,C.aoD,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,C.an1,q,q,q)
x=A.cO(A.M(A.b([x,D.p,w,D.j,A.c(r.w?B.bEc(r.ax):A.a(p),q,q,q,q,C.tA,q,q,q)],y.p),D.o,D.e,D.U),q,q)}x=A.ND(0,x)
o=A.lz(q,A.fr(A.Q(12),B.bQQ(o.d,!0,C.JW),D.as),160,q,q,16,16,110)
w=r.w
v=B.bEc(r.ax)
u=r.z
t=r.Q
u=A.fS(D.bp,A.b([x,o,A.lz(24,B.bSy(r.as,v,w,!0,t,u,r.ga3V(),r.ga3U(),r.ga3W(),r.ga3X(),r.gaa3()),q,q,0,0,q,q)],y.p),D.f,D.bz,q)
o=u}else{o=A.oz(D.u,q,A.c(B.bF5(w.e),q,q,q,q,C.M1,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,C.LX,D.a2,q,q)
if(r.w)w=B.bEc(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,C.tA,q,q,q)
v=r.w
u=B.bEc(r.ax)
t=r.z
s=r.Q
t=A.cO(A.M(A.b([o,D.az,new A.a0(C.xo,x,q),D.j,w,C.Lm,B.bSy(r.as,u,v,!1,s,t,r.ga3V(),r.ga3U(),r.ga3W(),r.ga3X(),r.gaa3())],y.p),D.o,D.e,D.U),q,q)
o=t}return A.bQy(!1,A.f3(q,D.n,A.he(!0,o,!0,D.aj,!0,!0),q,q),new B.b6O(r),y.K)}}
B.a9x.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,C.anP,u,u,u))
if(r&&v.c)s.push(D.p)
r=v.f
x=r?C.YG:C.YF
t=A.b([new B.w0(x,r,A.a("Muet"),v.x,u,u),C.nw,new B.w0(C.YP,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(C.nw)
if(r){x=v.w
w=x?C.yd:C.YO
t.push(new B.w0(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(C.nw)
if(r)t.push(new B.w0(C.YN,!1,A.a("Basculer"),v.Q,u,u))
t.push(C.nw)
t.push(new B.w0(C.y8,!1,A.a("Raccrocher"),v.as,D.k1,u))
s.push(A.a_(t,D.o,D.bS,D.i,u))
return A.M(s,D.o,D.e,D.U)}}
B.w0.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?D.l:D.lc
if(!t)x=D.l
else x=w.d?D.n:D.l
t=A.di(u,v,v,D.aj,D.cs,v)
return A.M(A.b([A.aa(A.b4(!1,A.cc(w.c,x,v,26),D.k,v,D.q,v,v,v,v,w.f,v,t),56,56),D.b5,A.c(w.e,v,v,v,v,C.anQ,v,v,v)],y.p),D.o,D.e,D.U)}}
B.aMk.prototype={
tO(d,e){return this.b3y(d,e)},
b3y(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.lQ(0),$async$tO)
case 2:x=3
return A.e(v.e.lQ(0),$async$tO)
case 3:u=$.bXJ()
if(e){t=y.N
t=A.a8(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aCX().Bs(0,A.a8(["audio",!0,"video",t],s,r)),$async$tO)
case 4:q=v.b=g
o.sa25(0,q)
x=5
return A.e(u.Yb(d,A.C(s,r)),$async$tO)
case 5:p=v.a=g
x=6
return A.e(p.kc(0,q),$async$tO)
case 6:p.e=new B.aMl(v)
p.Q=new B.aMm(v)
p.d=new B.aMn(v)
return A.i(null,w)}})
return A.j($async$tO,w)},
ayN(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa25(0,d)
x=w.r
if(x!=null)x.$0()}},
Fo(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Fo=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Nm(0),$async$Fo)
case 3:t=e
x=4
return A.e(s.BG(0,t),$async$Fo)
case 4:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Fo,w)},
z9(d){return this.aWy(d)},
aWy(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$z9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BI(0,new B.zF(d.h(0,"sdp"),d.h(0,"type"))),$async$z9)
case 3:x=4
return A.e(s.Nk(0),$async$z9)
case 4:t=f
x=5
return A.e(s.BG(0,t),$async$z9)
case 5:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$z9,w)},
MS(d){return this.aTP(d)},
aTP(d){var x=0,w=A.k(y.H),v=this,u
var $async$MS=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BI(0,new B.zF(d.h(0,"sdp"),d.h(0,"type"))),$async$MS)
case 2:return A.i(null,w)}})
return A.j($async$MS,w)},
MO(d){return this.aTB(d)},
aTB(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$MO=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.ME(new B.EG(A.aR(d.h(0,"candidate")),A.aR(d.h(0,"sdpMid")),A.e5(d.h(0,"sdpMLineIndex")))),$async$MO)
case 3:case 1:return A.i(v,w)}})
return A.j($async$MO,w)},
Rn(d){return this.amP(d)},
amP(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Rn=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.QU(0)
if(r==null)r=D.dg
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skg(0,t)
return A.i(null,w)}})
return A.j($async$Rn,w)},
Id(d){return this.amG(d)},
amG(d){var x=0,w=A.k(y.H)
var $async$Id=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aFG(d),$async$Id)
case 2:return A.i(null,w)}})
return A.j($async$Id,w)},
Rk(d){return this.amy(d)},
amy(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Rk=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.HY(0)
if(s==null)s=D.dg
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skg(0,d)
return A.i(null,w)}})
return A.j($async$Rk,w)},
MV(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$MV=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.HY(0)
if(s==null)s=C.a9k
if(s.length===0){x=1
break}x=3
return A.e(B.bIc(D.b.gS(s)),$async$MV)
case 3:case 1:return A.i(v,w)}})
return A.j($async$MV,w)},
wg(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$wg=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a6(0)
x=7
return A.e(y.x.b(q)?q:A.dQ(q,y.H),$async$wg)
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
else{o=A.H(q.QU(0),!0,y.G)
D.b.t(o,q.HY(0))
q=o}if(q==null)q=D.dg
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c_L(r)
if(!m.b(k)){j=new A.aw($.aJ,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$wg)
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
return A.e(s.d.k(),$async$wg)
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
return A.e(s.e.k(),$async$wg)
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
return A.j($async$wg,w)}}
B.a_w.prototype={
Na(d){return this.aV4(d)},
aV4(d){var x=0,w=A.k(y.H),v=this
var $async$Na=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Ca(),$async$Na)
case 2:return A.i(null,w)}})
return A.j($async$Na,w)},
Ca(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Ca=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c_T(B.bHh(A.cP(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Ca)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cE(p,A.u(p).i("cE<1>")).aR(s.gaMK(),!0,s.gaLS(),new B.aq_(s))
u=2
x=6
break
case 4:u=3
n=t
s.Va()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ca,w)},
aML(d){var x,w,v,u
try{x=D.a_.cT(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.q(J.p(x,"type"),"signal_appel"))return
w=J.p(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.bRm(w))}catch(u){}},
Va(){var x,w=this,v=w.c
if(v!=null)v.a2(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=C.a5A[v]
w.f=v+1
v=w.d
if(v!=null)v.a2(0)
w.d=A.de(A.dw(0,0,0,0,x),new B.aq0(w))},
Fu(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Fu=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.a2(0)
s=t.c
s=s==null?null:s.a2(0)
x=2
return A.e(y.x.b(s)?s:A.dQ(s,y.H),$async$Fu)
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
r=s.w=new B.ait(s,q)}s=r.a6(0)}x=7
return A.e(y._.b(s)?s:A.dQ(s,y.z),$async$Fu)
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
return A.j($async$Fu,w)}}
B.aHL.prototype={
Yb(d,e){return this.aWq(d,e)},
aWq(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$Yb=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a8(["mandatory",A.C(r,r),"optional",A.b([A.a8(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fm(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bQ(t)))
t=J.l(s)
v=B.c5G(D.d5.glN().bs(new A.eJ(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Yb,w)}}
B.mo.prototype={
QU(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dd(w,A.V(w).i("dd<1,aB>"))
J.h_(w,new B.aDa(x))
return x},
HY(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dd(w,A.V(w).i("dd<1,aB>"))
J.h_(w,new B.aDb(x))
return x}}
B.a3d.prototype={
at5(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aD7(x)))
w.addEventListener("mute",A.bV(new B.aD8(x)))
w.addEventListener("unmute",A.bV(new B.aD9(x)))},
skg(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aCX.prototype={
Bs(d,e){return this.alL(0,e)},
alL(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Bs=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cg1())if(y.f.b(e.h(0,"video"))&&J.p(e.h(0,"video"),"facingMode")!=null)J.is(e.h(0,"video"),"facingMode")
e.cl(0,"video",new B.aCZ())
e.cl(0,"audio",new B.aD_())}catch(a0){A.n3("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hR(e.h(0,"audio"),i,i).aO(0,"optional")&&y.F.b(J.p(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.p(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h_(s,new B.aD0(r))
J.is(e.h(0,"audio"),"optional")
J.iV(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.bd(a0)
A.n3("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bQ(e)
x=10
return A.e(A.eH(o.getUserMedia(h.a(n)),h),$async$Bs)
case 10:m=a2
i=m
h=i.id
v=new B.mo(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eH(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Bs)
case 11:l=a2
h=l
g=h.id
v=new B.mo(h,g,"local")
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
return A.j($async$Bs,w)}}
B.a4I.prototype={
ata(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aHO(x)))
w.addEventListener("icecandidate",A.bV(new B.aHP(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aHQ(x)))
w.onicegatheringstatechange=A.bV(new B.aHR(x))
w.addEventListener("signalingstatechange",A.bV(new B.aHS(x)))
if(!$.bLs())w.addEventListener("connectionstatechange",A.bV(new B.aHT(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aHU(x)))
w.addEventListener("track",A.bV(new B.aHV(x)))},
Nm(d){var x=0,w=A.k(y.g),v,u=this,t,s
var $async$Nm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eH(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Nm)
case 3:t=f
v=new B.zF(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Nm,w)},
Nk(d){var x=0,w=A.k(y.g),v,u=this,t,s
var $async$Nk=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eH(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Nk)
case 3:t=f
v=new B.zF(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Nk,w)},
kc(d,e){var x
this.ax.cl(0,e.a,new B.aHN(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cI(null,y.H)},
BG(d,e){return this.amK(0,e)},
amK(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BG=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eH(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BG)
case 2:return A.i(null,w)}})
return A.j($async$BG,w)},
BI(d,e){return this.amZ(0,e)},
amZ(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BI=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eH(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BI)
case 2:return A.i(null,w)}})
return A.j($async$BI,w)},
ME(d){return this.aTi(d)},
aTi(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$ME=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eH(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$ME)
case 2:return A.i(null,w)}})
return A.j($async$ME,w)},
a6(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a6=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cI(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a6,w)}}
B.bJ0.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.NV.prototype={
saiu(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.FU()
if(x!=null)x.style.objectFit=e},
acI(){var x=this,w=x.FU(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sm(0,v.afq(u,x.z!=null,0,t))},
sa25(d,e){var x,w,v,u,t=this
t.z=e
if(e.HY(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ap(y.l.b(x)?x:new A.dd(x,A.V(x).i("dd<1,aB>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.QU(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ap(y.l.b(x)?x:new A.dd(x,A.V(x).i("dd<1,aB>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aA5()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.FU()
if(u!=null){u.srcObject=t.x
x=t.FU()
x.toString
t.a3K(x)}t.sm(0,t.a.aVq(t.z!=null))},
aA5(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
FU(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].a2(0)
q=u.FU()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.el()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
lQ(d){var x=0,w=A.k(y.H),v=this
var $async$lQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.YX()
$.tl().wA("RTCVideoRenderer-"+v.Q,new B.aI0(v),!0)
return A.i(null,w)}})
return A.j($async$lQ,w)},
a3K(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.NX.prototype={
N(){return new B.NY()}}
B.NY.prototype={
T(){var x,w,v=this
v.V()
v.a.c.a8(0,v.gaK9())
x=v.a
w=x.c
w.as=x.e
w.saiu(0,x.d===C.JV?"contain":"cover")},
aKa(){if(this.c!=null)this.n(new B.aI1())},
k(){if(this.c!=null)this.a5()},
aU(d){var x,w
this.ba(d)
A.de(A.dw(0,0,10,0,0),new B.aI3(this))
x=this.a
w=x.c
w.saiu(0,x.d===C.JV?"contain":"cover")},
C(d){return new A.lo(new B.aI2(this),null)}}
B.a1K.prototype={
asX(d,e,f,g){var x=this,w=$.aJ
x.a!==$&&A.bi()
x.a=new B.Tk(d,x,new A.b3(new A.aw(w,y.c),y.r),e,g.i("Tk<0>"))
if(f.a.ghU())f.a=new B.Pj(g.i("@<0>").bP(g).i("Pj<1,2>")).iF(f.a)
w=A.fV(null,new B.awD(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
a9o(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a2(0)
w=this.b
w===$&&A.d()
w.a6(0)}}
B.Tk.prototype={
E(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
cZ(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.aCs(d,e)},
kV(d){return this.cZ(d,null)},
aCs(d,e){var x=this
if(x.w){x.a.a.cZ(d,e)
return}x.c.fg(d,e)
x.a9p()
x.b.a9o()
x.a.a.a6(0).hi(new B.bbD())},
a6(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.a9o()
x.c.cO(0,x.a.a.a6(0))}return x.c.a},
a9p(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dL(0)
return},
$idB:1}
B.a6R.prototype={}
B.a6S.prototype={}
B.xe.prototype={
a4U(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Cs(d,e))
x.a6(0)},
a1H(d){var x
if((this.b.b&4)!==0)throw A.n(B.bJA())
x=A.bQ(d)
x.toString
this.a.send(x)},
vp(d,e,f){return this.aUP(0,e,f)},
aUP(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vp=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bJA())
u.a6(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vp,w)},
$ibJz:1}
B.rJ.prototype={}
B.FO.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.FO&&e.a===this.a},
gH(d){return D.c.gH(this.a)}}
B.C4.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.C4&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fE(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Cs.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.Cs&&e.a===this.a&&e.b===this.b},
gH(d){return A.fE([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gf.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Ge.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.alr.prototype={
asO(d){d.ex(new B.alv(this),new B.alw(this),y.a)}}
B.ait.prototype={
a6(d){var x=this.b
x.e=x.d=null
return this.aoz(0)}}
B.a7X.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vj.prototype={
M(){return"RTCSignalingState."+this.b}}
B.NS.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vi.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mz.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a4J.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aHK.prototype={}
B.Mu.prototype={}
B.E1.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aCW.prototype={}
B.EG.prototype={}
B.NT.prototype={}
B.aHW.prototype={}
B.zF.prototype={}
B.NU.prototype={}
B.NW.prototype={
afq(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.NW(x,w,v)},
aVq(d){return this.afq(null,d,null,null)},
j(d){var x=this
return A.a2(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","xS(I)","~(Fq)","bo(EG)","bo(NU)","bo(mz)","~(@)","mo(@)","mo()","bo(bJz)","~(rJ)"])
B.aMV.prototype={
$0(){return J.c_b(this.a.bk())},
$S:1}
B.aMW.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.cZ(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.ana.prototype={
$1(d){if(d==null)return null
return A.c5(J.l(d))},
$S:126}
B.b6Y.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.C9(!0)},
$S:0}
B.b6Z.prototype={
$1(d){return this.a.Mu()},
$S:38}
B.b6V.prototype={
$0(){var x=this.a.c
if(x!=null)A.ab(x,!1).bJ()},
$S:0}
B.b6W.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b6S.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b6T.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b6U.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b6P.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b6Q.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b6R.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bOu(x.w,w,u,!1,v)},
$S:z+2}
B.b6X.prototype={
$0(){return this.a.auG()},
$S:0}
B.b6z.prototype={
$1(d){this.a.xK("candidat_ice",d,!1)},
$S:376}
B.b6A.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b6y())},
$S:0}
B.b6y.prototype={
$0(){},
$S:0}
B.b6B.prototype={
$0(){this.a.ml(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b6C.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b6D.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.xK("annule",D.fj,!1)
x.ml(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b6E.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b6x(x,w))},
$S:38}
B.b6x.prototype={
$0(){return this.a.ax=new A.av(Date.now(),0,!1).eD(this.b)},
$S:0}
B.b6F.prototype={
$1(d){},
$S:140}
B.b6G.prototype={
$1(d){this.a.Df()},
$S:38}
B.b6I.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.a9M()
x.a6g("reponse",d)},
$S:377}
B.b6J.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b6K.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a9M()},
$S:31}
B.b6L.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b6M.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a6g("offre",d)},
$S:377}
B.b6N.prototype={
$1(d){this.a.ml(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:19}
B.b6H.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.av(Date.now(),0,!1)
x.ax=D.a3},
$S:0}
B.b6w.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b6v.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b6u.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b6O.prototype={
$2(d,e){if(!d)this.a.DJ()},
$S:923}
B.aMl.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a8(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aMm.prototype={
$1(d){var x=d.b,w=x.length!==0?D.b.gS(x):null
if(w!=null)this.a.ayN(w)},
$S:z+5}
B.aMn.prototype={
$1(d){var x
if(d===C.JM){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.aq_.prototype={
$1(d){return this.a.Va()},
$S:27}
B.aq0.prototype={
$0(){var x=this.a
if(!x.e)x.Ca()},
$S:0}
B.bF6.prototype={
$1(d){return d.length!==0},
$S:12}
B.aDa.prototype={
$1(d){return this.a.push(B.bIu(d))},
$S:27}
B.aDb.prototype={
$1(d){return this.a.push(B.bIu(d))},
$S:27}
B.aD7.prototype={
$1(d){},
$S:21}
B.aD8.prototype={
$1(d){},
$S:21}
B.aD9.prototype={
$1(d){},
$S:21}
B.aCZ.prototype={
$0(){return!1},
$S:49}
B.aD_.prototype={
$0(){return!1},
$S:49}
B.aD0.prototype={
$1(d){J.h_(d,new B.aCY(this.a))},
$S:376}
B.aCY.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:46}
B.aHO.prototype={
$1(d){},
$S:21}
B.aHP.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.EG(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:21}
B.aHQ.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cfD(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bLs())switch(w.cx.a){case 0:w.cy=C.JR
break
case 1:w.cy=C.JS
break
case 3:w.cy=C.JT
break
case 5:w.cy=C.JP
break
case 6:w.cy=C.JQ
break
case 7:w.cy=C.rw
break
default:break}},
$S:40}
B.aHR.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cfE(w.iceGatheringState)},
$S:40}
B.aHS.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.ch4(w.signalingState)},
$S:40}
B.aHT.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cgH(w.connectionState)},
$S:40}
B.aHU.prototype={
$1(d){},
$S:40}
B.aHV.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bIu(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dd(x,A.V(x).i("dd<1,aB>"))
w=J.eZ(x,new B.aHM(w),y.h)
v.$1(new B.NU(A.H(w,!0,w.$ti.i("aD.E"))))}},
$S:21}
B.aHM.prototype={
$1(d){return new B.mo(d,d.id,this.a.as)},
$S:z+8}
B.aHN.prototype={
$0(){var x=this.b.e
return new B.mo(x,x.id,this.a.as)},
$S:z+9}
B.bFe.prototype={
$1(d){return J.fJ(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aI0.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.L)(w),++u)w[u].a2(0)
D.b.Y(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.a3K(t)
v=y.i.c
w.push(A.mR(t,"canplay",new B.aHX(x),!1,v))
w.push(A.mR(t,"resize",new B.aHY(x),!1,v))
w.push(A.mR(t,"error",new B.aHZ(t),!1,v))
w.push(A.mR(t,"ended",new B.aI_(),!1,v))
return t},
$S:378}
B.aHX.prototype={
$1(d){this.a.acI()},
$S:27}
B.aHY.prototype={
$1(d){this.a.acI()},
$S:27}
B.aHZ.prototype={
$1(d){var x,w,v=this.a.error
A.n3("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.acG.h(0,A.ak(v,"code"))
x.toString
w=!J.q(A.ak(v,"message"),"")?A.ak(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pa(x,C.acF.h(0,A.ak(v,"code")),w,null))},
$S:43}
B.aI_.prototype={
$1(d){},
$S:27}
B.aI1.prototype={
$0(){},
$S:0}
B.aI3.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aI2.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.axv("RTCVideoRenderer-"+w.Q)
else w=A.W(x,x,D.k,x,x,x,x,x,x,x,x,x,x,x)
return A.cO(A.W(x,w,D.k,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:925}
B.awD.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eI(w.ghz(w),new B.awC(v),w.gnk())},
$S:0}
B.awC.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.a9p()
x=x.b
x===$&&A.d()
x.a6(0)},
$S:0}
B.bbD.prototype={
$1(d){},
$S:19}
B.aoV.prototype={
$1(d){this.a.cO(0,this.b)},
$S:21}
B.aoW.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hB(new B.Gf("Failed to connect WebSocket"))
else this.b.a4U(1006,"error")},
$S:21}
B.aoX.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cC("data")
if(typeof x==="string")w.b=new B.FO(A.bA(x))
else if(typeof x==="object"&&A.c3N(y.m.a(x),"ArrayBuffer"))w.b=new B.C4(A.a3z(y.o.a(x),0,null))
else throw A.n(A.am("unexpected message type: "+J.az(x).j(0)))
v.E(0,w.bk())},
$S:43}
B.aoY.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cO(0,this.b)
this.b.a4U(d.code,d.reason)},
$S:21}
B.alv.prototype={
$1(d){var x=d.b,w=this.a
new A.cE(x,A.u(x).i("cE<1>")).cQ(new B.als(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cE(x,A.u(x).i("cE<1>")).b0P(new B.alt(d),new B.alu(w,d))
w.f.dL(0)},
$S:z+10}
B.als.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.FO
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.C4
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.Cs){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a6(0)}}},
$S:z+11}
B.alt.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.bJA())
s=A.bQ(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a1H(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a1H(new Uint8Array(A.dC(u)))
break $label1$1}t=A.aK("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Ge))throw r}},
$S:17}
B.alu.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.vp(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.O(q) instanceof B.Ge))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.alw.prototype={
$1(d){var x,w=d instanceof A.Qh?d:new B.a7X(J.l(d)),v=this.a
v.f.hB(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.kV(w)
v=v.a
v===$&&A.d()
v.a6(0)},
$S:40};(function aliases(){var x=B.CP.prototype
x.aoz=x.a6})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Sv.prototype,"gatO","IV",0)
var v
w(v=B.Su.prototype,"gaRC","acz",3)
x(v,"gaa3","DJ",0)
x(v,"ga3X","Ja",0)
x(v,"ga3W","J9",0)
x(v,"ga3U","J7",0)
x(v,"ga3V","J8",0)
w(v=B.a_w.prototype,"gaMK","aML",7)
x(v,"gaLS","Va",1)
x(B.NV.prototype,"gdM","k",0)
x(B.NY.prototype,"gaK9","aKa",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a1,[B.CP,B.an9,B.Fq,B.a_M,B.aMk,B.a_w,B.aHK,B.Mu,B.E1,B.aCW,B.NT,B.aHW,B.a6S,B.Tk,B.a6R,B.xe,B.rJ,B.Gf,B.a7X,B.EG,B.zF,B.NU,B.NW])
w(B.Pj,A.fb)
x(A.jB,[B.aMV,B.b6Y,B.b6V,B.b6W,B.b6S,B.b6T,B.b6U,B.b6P,B.b6Q,B.b6X,B.b6A,B.b6y,B.b6B,B.b6C,B.b6D,B.b6x,B.b6H,B.b6w,B.b6v,B.b6u,B.aq0,B.aCZ,B.aD_,B.aHN,B.aI1,B.aI3,B.awD,B.awC,B.alu])
x(A.ib,[B.aMW,B.ana,B.b6Z,B.b6R,B.b6z,B.b6E,B.b6F,B.b6G,B.b6I,B.b6J,B.b6K,B.b6L,B.b6M,B.b6N,B.aMl,B.aMm,B.aMn,B.aq_,B.bF6,B.aDa,B.aDb,B.aD7,B.aD8,B.aD9,B.aD0,B.aHO,B.aHP,B.aHQ,B.aHR,B.aHS,B.aHT,B.aHU,B.aHV,B.aHM,B.bFe,B.aI0,B.aHX,B.aHY,B.aHZ,B.aI_,B.bbD,B.aoV,B.aoW,B.aoX,B.aoY,B.alv,B.als,B.alt,B.alw])
x(A.N,[B.oH,B.xS,B.NX])
x(A.T,[B.Sv,B.Su,B.NY])
x(A.at,[B.Rd,B.a9x,B.w0])
x(A.qg,[B.b6O,B.aCY,B.aI2])
w(B.aHL,B.aHK)
w(B.mo,B.Mu)
w(B.a3d,B.E1)
w(B.aCX,B.aCW)
w(B.a4I,B.NT)
w(B.bJ0,B.aHW)
w(B.NV,A.d3)
x(B.a6S,[B.a1K,B.alr])
x(B.rJ,[B.FO,B.C4,B.Cs])
w(B.Ge,B.Gf)
w(B.ait,B.CP)
x(A.GH,[B.vj,B.NS,B.vi,B.mz,B.a4J])})()
A.o8(b.typeUniverse,JSON.parse('{"CP":{"dB":["1"]},"Pj":{"fb":["1","2"],"fb.S":"1","fb.T":"2"},"xS":{"N":[],"m":[]},"oH":{"N":[],"m":[]},"Sv":{"T":["oH"]},"Rd":{"at":[],"m":[]},"Su":{"T":["xS"]},"a9x":{"at":[],"m":[]},"w0":{"at":[],"m":[]},"mo":{"Mu":[]},"a3d":{"E1":[]},"a4I":{"NT":[]},"NV":{"d3":["NW"],"aX":[]},"NX":{"N":[],"m":[]},"NY":{"T":["NX"]},"Tk":{"dB":["1"]},"xe":{"bJz":[]},"FO":{"rJ":[]},"C4":{"rJ":[]},"Cs":{"rJ":[]},"Gf":{"bM":[]},"Ge":{"bM":[]},"ait":{"dB":["@"]},"a7X":{"bM":[]}}'))
A.bK1(b.typeUniverse,JSON.parse('{"CP":1,"a6S":1}'))
var y=(function rtii(){var x=A.au
return{b:x("xe"),L:x("bM"),_:x("as<@>"),x:x("as<~>"),v:x("dn<w,o>"),S:x("E<ae<o,K>>"),t:x("E<ae<o,@>>"),Q:x("E<E1>"),d:x("E<ii<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aB"),l:x("J<aB>"),F:x("J<ae<o,@>>"),j:x("J<@>"),I:x("J<w>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("Mu"),G:x("E1"),h:x("mo"),o:x("p4"),a:x("bo"),K:x("a1"),J:x("NT"),g:x("zF"),Z:x("a6R<a1?>"),N:x("o"),e:x("pB"),M:x("e4"),D:x("rJ"),U:x("Y<o>"),O:x("es<Fq>"),n:x("es<~>"),V:x("b3<xe>"),r:x("b3<@>"),R:x("b3<~>"),i:x("SF<aB>"),C:x("o2<aB>"),k:x("aw<xe>"),c:x("aw<@>"),W:x("aw<~>"),q:x("ka"),y:x("K"),z:x("@"),A:x("aB?"),X:x("a1?"),H:x("~")}})();(function constants(){var x=a.makeConstList
C.Tl=new B.a_M(D.mI)
C.WE=new A.b5(5e6)
C.xo=new A.aq(32,0,32,0)
C.y7=new A.ai(57638,!1)
C.y8=new A.ai(57639,!1)
C.YF=new A.ai(58337,!1)
C.YG=new A.ai(58341,!1)
C.YN=new A.ai(58923,!1)
C.yd=new A.ai(59048,!1)
C.YO=new A.ai(59049,!1)
C.YP=new A.ai(59077,!1)
C.a5A=A.b(x([1,2,4,8,16]),A.au("E<w>"))
C.a9k=A.b(x([]),y.Q)
C.acF=new A.dn([1,"The user canceled the fetching of the video.",2,"A network error occurred while fetching the video, despite having previously been available.",3,"An error occurred while trying to decode the video, despite having previously been determined to be usable.",4,"The video has been found to be unsuitable (missing or in a format not supported by your browser)."],y.v)
C.acG=new A.dn([1,"MEDIA_ERR_ABORTED",2,"MEDIA_ERR_NETWORK",3,"MEDIA_ERR_DECODE",4,"MEDIA_ERR_SRC_NOT_SUPPORTED"],y.v)
C.Te=new A.G(1,0.9098039215686274,0.9607843137254902,0.9137254901960784,D.r)
C.RF=new A.G(1,0.7843137254901961,0.9019607843137255,0.788235294117647,D.r)
C.S2=new A.G(1,0.6470588235294118,0.8392156862745098,0.6549019607843137,D.r)
C.Su=new A.G(1,0.5058823529411764,0.7803921568627451,0.5176470588235295,D.r)
C.RO=new A.G(1,0.4,0.7333333333333333,0.41568627450980394,D.r)
C.RP=new A.G(1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Tg=new A.G(1,0.2627450980392157,0.6274509803921569,0.2784313725490196,D.r)
C.Sm=new A.G(1,0.2196078431372549,0.5568627450980392,0.23529411764705882,D.r)
C.Sy=new A.G(1,0.1803921568627451,0.49019607843137253,0.19607843137254902,D.r)
C.Rw=new A.G(1,0.10588235294117647,0.3686274509803922,0.12549019607843137,D.r)
C.ad7=new A.dn([50,C.Te,100,C.RF,200,C.S2,300,C.Su,400,C.RO,500,C.RP,600,C.Tg,700,C.Sm,800,C.Sy,900,C.Rw],A.au("dn<w,G>"))
C.adi=new A.yR(C.ad7,1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Fv=new A.fC("FlutterWebRTC.Method",D.b8,null)
C.agC=new B.mz(0,"RTCIceConnectionStateNew")
C.agD=new B.mz(1,"RTCIceConnectionStateChecking")
C.agE=new B.mz(2,"RTCIceConnectionStateCompleted")
C.agF=new B.mz(3,"RTCIceConnectionStateConnected")
C.agG=new B.mz(4,"RTCIceConnectionStateCount")
C.JM=new B.mz(5,"RTCIceConnectionStateFailed")
C.agH=new B.mz(6,"RTCIceConnectionStateDisconnected")
C.JN=new B.mz(7,"RTCIceConnectionStateClosed")
C.JO=new B.NS(0,"RTCIceGatheringStateNew")
C.agI=new B.NS(1,"RTCIceGatheringStateGathering")
C.agJ=new B.NS(2,"RTCIceGatheringStateComplete")
C.rw=new B.vi(0,"RTCPeerConnectionStateClosed")
C.JP=new B.vi(1,"RTCPeerConnectionStateFailed")
C.JQ=new B.vi(2,"RTCPeerConnectionStateDisconnected")
C.JR=new B.vi(3,"RTCPeerConnectionStateNew")
C.JS=new B.vi(4,"RTCPeerConnectionStateConnecting")
C.JT=new B.vi(5,"RTCPeerConnectionStateConnected")
C.agK=new B.vj(0,"RTCSignalingStateStable")
C.agL=new B.vj(1,"RTCSignalingStateHaveLocalOffer")
C.agM=new B.vj(2,"RTCSignalingStateHaveRemoteOffer")
C.agN=new B.vj(3,"RTCSignalingStateHaveLocalPrAnswer")
C.agO=new B.vj(4,"RTCSignalingStateHaveRemotePrAnswer")
C.JU=new B.vj(5,"RTCSignalingStateClosed")
C.agP=new B.NW(0,0,0)
C.JV=new B.a4J(0,"RTCVideoViewObjectFitContain")
C.JW=new B.a4J(1,"RTCVideoViewObjectFitCover")
C.nw=new A.cf(20,null,null,null)
C.akd=new A.cf(48,null,null,null)
C.Lm=new A.cf(null,64,null,null)
C.an1=new A.y(!0,D.l,null,null,null,null,22,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.LX=new A.y(!0,D.l,null,null,null,null,26,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.tA=new A.y(!0,D.aq,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.anQ=new A.y(!0,D.l,null,null,null,null,12,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.anP=new A.y(!0,D.l,null,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aoD=new A.y(!0,D.n,null,null,null,null,32,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.M1=new A.y(!0,D.n,null,null,null,null,40,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bSp=!1
$.bQP=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"ckn","bXJ",()=>new B.aHL())
x($,"civ","bLs",()=>D.c.q(A.ak(A.ak(A.ak(A.bL9(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_12",e:"endPart",h:b})})($__dart_deferred_initializers__,"ZZnl46Bci29HxHMrrmvgN81iGu4=");