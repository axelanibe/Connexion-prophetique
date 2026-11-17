((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_12",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,D,B={CW:function CW(){},Pw:function Pw(d){this.$ti=d},aNr:function aNr(d){this.a=d},aNs:function aNs(d,e){this.a=d
this.b=e},
ZA(d){var x,w,v,u,t,s=new B.anG(),r=J.P(d),q=r.h(d,"id")
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
return new B.anF(q,x,w,v,u,t)},
bSJ(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.m1(t,y.N,y.z):D.fk
if(u.h(d,"cree_le")!=null)A.c2(J.l(u.h(d,"cree_le")))
return new B.Fx(s,x,w,v)},
c2s(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return C.Tz
x=A.b([],y.t)
for(r=J.ap(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.m1(s,u,t))}return new B.a05(x)},
bFv(d){var x=D.h.b6(d.a,1e6)
return D.c.b0(D.h.j(D.h.b6(x,60)),2,"0")+":"+D.c.b0(D.h.j(D.h.aO(x,60)),2,"0")},
bXs(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oh(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.afi(w,v)},
cfF(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.afl(u,A.kk(w)?w:null,v)},
anF:function anF(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
anG:function anG(){},
Fx:function Fx(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a05:function a05(d){this.a=d},
bPQ(d,e,f,g,h,i){return new B.oL(e,f,i,h,d,null)},
bPP(d,e,f,g,h){return new B.xX(e,h,f,g,d,null)},
bTV(d,e,f,g,h,i,j,k,l,m,n){return new B.a9X(g,f,e,i,h,d,m,l,k,j,n,null)},
oL:function oL(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
SM:function SM(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b7N:function b7N(d){this.a=d},
b7O:function b7O(d){this.a=d},
b7K:function b7K(d){this.a=d},
b7L:function b7L(d){this.a=d},
b7H:function b7H(d){this.a=d},
b7I:function b7I(d){this.a=d},
b7J:function b7J(d){this.a=d},
b7E:function b7E(d){this.a=d},
b7F:function b7F(d){this.a=d},
b7G:function b7G(d){this.a=d},
b7M:function b7M(d){this.a=d},
Ru:function Ru(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
xX:function xX(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
SL:function SL(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b7o:function b7o(d){this.a=d},
b7p:function b7p(d){this.a=d},
b7n:function b7n(){},
b7q:function b7q(d){this.a=d},
b7r:function b7r(d){this.a=d},
b7s:function b7s(d){this.a=d},
b7t:function b7t(d){this.a=d},
b7m:function b7m(d,e){this.a=d
this.b=e},
b7u:function b7u(){},
b7v:function b7v(d){this.a=d},
b7x:function b7x(d){this.a=d},
b7y:function b7y(d){this.a=d},
b7z:function b7z(d){this.a=d},
b7A:function b7A(d){this.a=d},
b7B:function b7B(d){this.a=d},
b7C:function b7C(d){this.a=d},
b7w:function b7w(d){this.a=d},
b7l:function b7l(d,e){this.a=d
this.b=e},
b7k:function b7k(d,e){this.a=d
this.b=e},
b7j:function b7j(d,e){this.a=d
this.b=e},
b7D:function b7D(d){this.a=d},
a9X:function a9X(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
w5:function w5(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aMR:function aMR(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aMS:function aMS(d){this.a=d},
aMT:function aMT(d){this.a=d},
aMU:function aMU(d){this.a=d},
a_Q:function a_Q(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aqv:function aqv(d){this.a=d},
aqw:function aqw(d){this.a=d},
bGo(d){var x=y.U,w=A.I(new A.Y(A.b(d.split(" "),y.s),new B.bGp(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.q(D.b.gS(w),0).toUpperCase()
return(J.q(D.b.gS(w),0)+J.q(D.b.gaG(w),0)).toUpperCase()},
bGp:function bGp(){},
aIg:function aIg(){},
mr:function mr(d,e,f){this.e=d
this.a=e
this.b=f},
aDI:function aDI(d){this.a=d},
aDJ:function aDJ(d){this.a=d},
bJO(d){var x=new B.a3y(d)
x.atO(d)
return x},
a3y:function a3y(d){this.d=d},
aDF:function aDF(d){this.a=d},
aDG:function aDG(d){this.a=d},
aDH:function aDH(d){this.a=d},
aDu:function aDu(){},
aDw:function aDw(){},
aDx:function aDx(){},
aDy:function aDy(d){this.a=d},
aDv:function aDv(d){this.a=d},
c72(d,e){var x=y.N
x=new B.a54(d,e,A.C(x,y.E),A.C(x,y.z))
x.atT(d,e)
return x},
a54:function a54(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aIj:function aIj(d){this.a=d},
aIk:function aIk(d){this.a=d},
aIl:function aIl(d){this.a=d},
aIm:function aIm(d){this.a=d},
aIn:function aIn(d){this.a=d},
aIo:function aIo(d){this.a=d},
aIp:function aIp(d){this.a=d},
aIq:function aIq(d){this.a=d},
aIh:function aIh(d){this.a=d},
aIi:function aIi(d,e){this.a=d
this.b=e},
bKk:function bKk(d){this.a=d},
chs(){return D.b.mN(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bGx())!==-1},
bGx:function bGx(){},
bSa(){var x=A.b([],y.d),w=$.bSb
$.bSb=w+1
return new B.O5(w,x,C.ahd,$.af())},
O5:function O5(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aIw:function aIw(d){this.a=d},
aIs:function aIs(d){this.a=d},
aIt:function aIt(d){this.a=d},
aIu:function aIu(d){this.a=d},
aIv:function aIv(){},
bSc(d,e,f){return new B.O7(d,f,e,null)},
O7:function O7(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
O8:function O8(){this.c=this.a=null},
aIx:function aIx(){},
aIz:function aIz(d){this.a=d},
aIy:function aIy(d){this.a=d},
bQm(d,e,f,g){var x,w={}
w.a=d
x=new B.a23(g.i("a23<0>"))
x.atF(e,f,w,g)
return x},
a23:function a23(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
axb:function axb(d,e){this.a=d
this.b=e},
axa:function axa(d){this.a=d},
TB:function TB(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bcs:function bcs(){},
a7e:function a7e(d){this.b=this.a=$
this.$ti=d},
a7f:function a7f(){},
bIA(d,e){return B.c1L(d,e)},
c1L(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bIA=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nL("ws")&&!d.nL("wss"))throw A.n(A.fh(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xj(r,A.fJ(null,null,null,!1,y.D))
u=new A.ax($.aI,y.k)
p=new A.b3(u,y.V)
if(J.p(r.readyState,1))p.cK(0,q)
else if(J.p(r.readyState,2)||J.p(r.readyState,3))p.hj(new B.Gn("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o6(r,"open",!1,y.C).gS(0).aE(new B.apq(p,q),y.H)
t=y.C
s=y.H
new A.o6(r,"error",!1,t).gS(0).aE(new B.apr(p,q),s)
A.hE(r,"message",new B.aps(q),!1,y.m)
new A.o6(r,"close",!1,t).gS(0).aE(new B.apt(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bIA,w)},
xj:function xj(d,e){this.a=d
this.b=e},
apq:function apq(d,e){this.a=d
this.b=e},
apr:function apr(d,e){this.a=d
this.b=e},
aps:function aps(d){this.a=d},
apt:function apt(d,e){this.a=d
this.b=e},
bKU(){return new B.Gm("Connection Closed")},
rR:function rR(){},
FV:function FV(d){this.a=d},
Cb:function Cb(d){this.a=d},
Cz:function Cz(d,e){this.a=d
this.b=e},
Gn:function Gn(d){this.a=d},
Gm:function Gm(d){this.a=d},
c1h(d){var x=null,w=$.aI,v=new B.a7e(y.Z),u=y.X,t=A.fJ(x,x,x,!0,u),s=A.fJ(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bQm(new A.cE(s,r.i("cE<1>")),new A.Bq(t,q.i("Bq<1>")),!0,u)
v.b=B.bQm(new A.cE(t,q.i("cE<1>")),new A.Bq(s,r.i("Bq<1>")),!1,u)
v=new B.alW(new A.b3(new A.ax(w,y.W),y.R),v)
v.atw(d)
return v},
alW:function alW(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
am_:function am_(d){this.a=d},
alX:function alX(d){this.a=d},
alY:function alY(d){this.a=d},
alZ:function alZ(d,e){this.a=d
this.b=e},
am0:function am0(d){this.a=d},
aiX:function aiX(d,e){this.b=d
this.a=e},
a8k:function a8k(d){this.a=d},
ch3(d){switch(d){case"new":return C.ah0
case"checking":return C.ah1
case"connected":return C.ah3
case"completed":return C.ah2
case"failed":return C.JV
case"disconnected":return C.ah5
case"closed":return C.JW
case"count":return C.ah4}return C.JW},
ch4(d){switch(d){case"new":return C.JX
case"gathering":return C.ah6
case"complete":return C.ah7}return C.JX},
civ(d){switch(d){case"stable":return C.ah8
case"have-local-offer":return C.ah9
case"have-local-pranswer":return C.ahb
case"have-remote-offer":return C.aha
case"have-remote-pranswer":return C.ahc
case"closed":return C.K2}return C.K2},
ci7(d){switch(d){case"new":return C.K_
case"connecting":return C.K0
case"connected":return C.K1
case"closed":return C.rz
case"disconnected":return C.JZ
case"failed":return C.JY}return C.rz},
vn:function vn(d,e){this.a=d
this.b=e},
O2:function O2(d,e){this.a=d
this.b=e},
vm:function vm(d,e){this.a=d
this.b=e},
mC:function mC(d,e){this.a=d
this.b=e},
a55:function a55(d,e){this.a=d
this.b=e},
aIf:function aIf(){},
MF:function MF(){},
E8:function E8(){},
aDt:function aDt(){},
EN:function EN(d,e,f){this.a=d
this.b=e
this.c=f},
O3:function O3(){},
aIr:function aIr(){},
zK:function zK(d,e){this.a=d
this.b=e},
O4:function O4(d){this.b=d},
O6:function O6(d,e,f){this.a=d
this.b=e
this.c=f},
bJv(d){var x=0,w=A.k(y.y)
var $async$bJv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bJv,w)},
aGb(d){var x=0,w=A.k(y.H),v
var $async$aGb=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aRt("enableSpeakerphone",A.a8(["enable",d],y.N,v),v,v),$async$aGb)
case 2:return A.i(null,w)}})
return A.j($async$aGb,w)},
aRt(d,e,f,g){return B.c9F(d,e,f,g,f.i("0?"))},
c9F(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aRt=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.aRs(),$async$aRt)
case 3:v=C.FD.cr(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aRt,w)},
aRs(){var x=0,w=A.k(y.H),v,u
var $async$aRs=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.bTM?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(C.FD.cr("initialize",A.a8(["options",A.C(v,u)],v,u),!1,y.H),$async$aRs)
case 4:$.bTM=!0
case 3:return A.i(null,w)}})
return A.j($async$aRs,w)}},C,E
J=c[1]
A=c[0]
D=c[2]
B=a.updateHolder(c[5],B)
C=c[28]
E=c[20]
B.CW.prototype={
E(d,e){this.a.E(0,e)},
cZ(d,e){this.a.cZ(d,e)},
a8(d){return this.a.a8(0)},
$idC:1}
B.Pw.prototype={
iF(d){var x=A.ct("subscription"),w=A.fJ(new B.aNr(x),null,null,!0,this.$ti.y[1])
x.b=d.eM(new B.aNs(this,w),w.glN(w),w.gnn())
return new A.cE(w,A.u(w).i("cE<1>"))}}
B.anF.prototype={}
B.Fx.prototype={}
B.a05.prototype={}
B.oL.prototype={
N(){return new B.SM()}}
B.SM.prototype={
U(){var x=this
x.V()
x.Jp()
x.r=A.db(D.c_,new B.b7N(x))
x.w=A.k7(D.x6,new B.b7O(x))},
k(){var x=this,w=x.r
if(w!=null)w.Z(0)
w=x.w
if(w!=null)w.Z(0)
w=x.x
if(w!=null)w.Z(0)
x.a4()},
VL(){var x=this.x
if(x!=null)x.Z(0)
this.x=A.db(D.fV,new B.b7K(this))},
MS(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$MS=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a6()
x=7
return A.e(o.zO(p.c),$async$MS)
case 7:r=e
q=B.ZA(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b7L(s))
p=s.r
if(p!=null)p.Z(0)
p=s.w
if(p!=null)p.Z(0)
s.VL()}u=2
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
return A.j($async$MS,w)},
Jp(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Jp=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a6()
x=7
return A.e(n.zO(o.c),$async$Jp)
case 7:r=e
q=B.ZA(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaiU()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b7H(s))
s.VL()
x=1
break}s.n(new B.b7I(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b7J(s))
s.VL()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jp,w)},
Jf(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Jf=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b7E(s))
u=4
q=s.a
q.toString
p=$.a6()
x=7
return A.e(p.Zq(q.c,"accepte"),$async$Jf)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b7F(s))
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
if(q!=null)q.Z(0)
q=s.w
if(q!=null)q.Z(0)
q=s.c
q.toString
A.aa(q,!1).wF(A.e7(new B.b7G(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jf,w)},
Ck(d){return this.aNN(d)},
avq(){return this.Ck(!1)},
aNN(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Ck=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Z(0)
r=s.w
if(r!=null)r.Z(0)
u=4
r=s.a
r.toString
q=$.a6()
x=7
return A.e(q.Zq(r.c,"refuse"),$async$Ck)
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
return A.j($async$Ck,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.oD(D.u,s,A.c(B.bGo(r.d),s,s,s,s,C.Ma,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,C.M5,D.a3,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,D.ay,new A.a2(C.xr,x,s),D.j,A.c(q,s,s,s,s,C.tD,s,s,s),C.Lv],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b7M(t)
v=A.a("Accepter")
u=t.f?s:t.gaux()
q.push(A.Z(A.b([new B.Ru(C.yb,D.k6,r,x,s),C.akC,new B.Ru(C.ya,C.adI,v,u,s)],w),D.o,D.bS,D.i,s))}if(t.d)q.push(E.vK)
return A.eX(s,D.n,A.fH(!0,A.cI(A.M(q,D.o,D.e,D.U),s,s),!0,D.ai,!0,!0),s,s)}}
B.Ru.prototype={
C(d){var x=this,w=null,v=A.di(x.d,w,w,D.ai,D.cs,w)
return A.M(A.b([A.ab(A.b5(!1,A.cd(x.c,D.l,w,32),D.k,w,D.q,w,w,w,w,x.f,w,v),72,72),D.j,A.c(x.e,w,w,w,w,D.eL,w,w,w)],y.p),D.o,D.e,D.U)}}
B.xX.prototype={
N(){return new B.SL(A.b_(y.N),D.V)}}
B.SL.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bSa()
w=B.bSa()
v.d!==$&&A.bi()
v.d=new B.aMR(x,w)
v.a.toString
x=new B.a_Q(new A.es(u,u,y.g),new A.es(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.uI()},
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
w.wp()
w=x.e
w===$&&A.d()
w.FJ()
x.a4()},
uI(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$uI=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a6()
x=7
return A.e(l.zO(m.c),$async$uI)
case 7:r=e
q=B.ZA(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mn(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.Oo(),$async$uI)
case 8:p=e
o=B.c2s(p)
x=9
return A.e(s.SP(),$async$uI)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))}s.mn(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.tS(A.a8(["iceServers",o.a],y.N,y.z),k==="video"),$async$uI)
case 10:m.f=new B.b7o(s)
m.r=new B.b7p(s)
m.w=new B.b7q(s)
if(s.c==null){x=1
break}s.n(new B.b7r(s))
s.ch=A.db(D.c_,new B.b7s(s))
s.CW=A.k7(D.cS,new B.b7t(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cN(k,A.u(k).i("cN<1>")).cT(s.gaSx())
k=m.w
s.cy=new A.cN(k,A.u(k).i("cN<1>")).cT(new B.b7u())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.Nz(D.c.QB("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f8(D.c9,n,D.aj,!0))}s.ay=A.k7(D.fV,new B.b7v(s))
s.Dq()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
s.mn(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uI,w)},
SP(){var x=0,w=A.k(y.y),v
var $async$SP=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$SP,w)},
Dq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Dq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a6()
x=7
return A.e(o.bT("/messagerie/appels/"+p.c+"/signaux"),$async$Dq)
case 7:r=e
for(p=J.ap(r);p.A();){q=p.gK(p)
s.ad6(B.bSJ(q))}u=2
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
return A.j($async$Dq,w)},
ad6(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bXs(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.zj(A.a8(["sdp",v.a,"type",v.b],y.N,y.z)).aE(new B.b7x(s),y.a).h3(new B.b7y(s))
break
case"reponse":if(!s.a.f)return
u=B.bXs(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.Ng(A.a8(["sdp",u.a,"type",u.b],y.N,y.z)).aE(new B.b7z(s),y.a).h3(new B.b7A(s))
break
case"candidat_ice":t=B.cfF(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.Nb(A.a8(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.FC().aE(new B.b7B(s),y.a).h3(new B.b7C(s))
break
case"refuse":s.mn(A.a("Appel refus\xe9"))
break
case"annule":s.mn(A.a("Appel annul\xe9"))
break
case"termine":s.mn(A.a("Appel termin\xe9"))
break}},
aai(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.Z(0)
w.n(new B.b7w(w))},
xS(d,e,f){return this.aB2(d,e,f)},
a6O(d,e){return this.xS(d,e,!0)},
aB2(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$xS=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a6()
x=6
return A.e(r.agY(s.c,e,d),$async$xS)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mn(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$xS,w)},
DV(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$DV=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.Z(0)
u=4
r=s.a
r.toString
q=$.a6()
x=7
return A.e(q.Zq(r.c,"termine"),$async$DV)
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
return A.j($async$DV,w)},
mn(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.Z(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.B(v,v,v,v,v,D.f,v,A.c(d,v,v,v,v,v,v,v,v),v,D.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.aa(x,!1).bG()},
Jy(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Jy=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.RP(u),$async$Jy)
case 2:if(v.c!=null)v.n(new B.b7l(v,u))
return A.i(null,w)}})
return A.j($async$Jy,w)},
Jx(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Jx=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Iv(u),$async$Jx)
case 2:if(v.c!=null)v.n(new B.b7k(v,u))
return A.i(null,w)}})
return A.j($async$Jx,w)},
Jv(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Jv=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.RM(u),$async$Jv)
case 2:if(v.c!=null)v.n(new B.b7j(v,u))
return A.i(null,w)}})
return A.j($async$Jv,w)},
Jw(){var x=0,w=A.k(y.H),v=this,u
var $async$Jw=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.Nj(),$async$Jw)
case 2:return A.i(null,w)}})
return A.j($async$Jw,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bSc(o.e,!1,C.K4)
else{x=A.oD(D.u,q,A.c(B.bGo(w.e),q,q,q,q,C.ap3,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,C.ans,q,q,q)
x=A.cI(A.M(A.b([x,D.p,w,D.j,A.c(r.w?B.bFv(r.ax):A.a(p),q,q,q,q,C.tD,q,q,q)],y.p),D.o,D.e,D.U),q,q)}x=A.NO(0,x)
o=A.jZ(q,A.fr(A.Q(12),B.bSc(o.d,!0,C.K4),D.at),160,q,q,16,16,110)
w=r.w
v=B.bFv(r.ax)
u=r.z
t=r.Q
u=A.fI(D.bl,A.b([x,o,A.jZ(24,B.bTV(r.as,v,w,!0,t,u,r.ga4r(),r.ga4q(),r.ga4s(),r.ga4t(),r.gaaA()),q,q,0,0,q,q)],y.p),D.f,D.br,q)
o=u}else{o=A.oD(D.u,q,A.c(B.bGo(w.e),q,q,q,q,C.Ma,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,C.M5,D.a3,q,q)
if(r.w)w=B.bFv(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,C.tD,q,q,q)
v=r.w
u=B.bFv(r.ax)
t=r.z
s=r.Q
t=A.cI(A.M(A.b([o,D.ay,new A.a2(C.xr,x,q),D.j,w,C.Lv,B.bTV(r.as,u,v,!1,s,t,r.ga4r(),r.ga4q(),r.ga4s(),r.ga4t(),r.gaaA())],y.p),D.o,D.e,D.U),q,q)
o=t}return A.bRV(!1,A.eX(q,D.n,A.fH(!0,o,!0,D.ai,!0,!0),q,q),new B.b7D(r),y.K)}}
B.a9X.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,C.aof,u,u,u))
if(r&&v.c)s.push(D.p)
r=v.f
x=r?C.YU:C.YT
t=A.b([new B.w5(x,r,A.a("Muet"),v.x,u,u),C.nA,new B.w5(C.Z3,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(C.nA)
if(r){x=v.w
w=x?C.yh:C.Z2
t.push(new B.w5(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(C.nA)
if(r)t.push(new B.w5(C.Z1,!1,A.a("Basculer"),v.Q,u,u))
t.push(C.nA)
t.push(new B.w5(C.yb,!1,A.a("Raccrocher"),v.as,D.k6,u))
s.push(A.Z(t,D.o,D.bS,D.i,u))
return A.M(s,D.o,D.e,D.U)}}
B.w5.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?D.l:D.lh
if(!t)x=D.l
else x=w.d?D.n:D.l
t=A.di(u,v,v,D.ai,D.cs,v)
return A.M(A.b([A.ab(A.b5(!1,A.cd(w.c,x,v,26),D.k,v,D.q,v,v,v,v,w.f,v,t),56,56),D.b2,A.c(w.e,v,v,v,v,C.aog,v,v,v)],y.p),D.o,D.e,D.U)}}
B.aMR.prototype={
tS(d,e){return this.b4D(d,e)},
b4D(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tS=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.iJ(0),$async$tS)
case 2:x=3
return A.e(v.e.iJ(0),$async$tS)
case 3:u=$.bZ5()
if(e){t=y.N
t=A.a8(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aDu().BC(0,A.a8(["audio",!0,"video",t],s,r)),$async$tS)
case 4:q=v.b=g
o.sa2A(0,q)
x=5
return A.e(u.YF(d,A.C(s,r)),$async$tS)
case 5:p=v.a=g
x=6
return A.e(p.kg(0,q),$async$tS)
case 6:p.e=new B.aMS(v)
p.Q=new B.aMT(v)
p.d=new B.aMU(v)
return A.i(null,w)}})
return A.j($async$tS,w)},
azx(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa2A(0,d)
x=w.r
if(x!=null)x.$0()}},
FC(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$FC=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.NL(0),$async$FC)
case 3:t=e
x=4
return A.e(s.BR(0,t),$async$FC)
case 4:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$FC,w)},
zj(d){return this.aXy(d)},
aXy(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$zj=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BT(0,new B.zK(d.h(0,"sdp"),d.h(0,"type"))),$async$zj)
case 3:x=4
return A.e(s.NJ(0),$async$zj)
case 4:t=f
x=5
return A.e(s.BR(0,t),$async$zj)
case 5:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$zj,w)},
Ng(d){return this.aUK(d)},
aUK(d){var x=0,w=A.k(y.H),v=this,u
var $async$Ng=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BT(0,new B.zK(d.h(0,"sdp"),d.h(0,"type"))),$async$Ng)
case 2:return A.i(null,w)}})
return A.j($async$Ng,w)},
Nb(d){return this.aUw(d)},
aUw(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$Nb=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.N1(new B.EN(A.aR(d.h(0,"candidate")),A.aR(d.h(0,"sdpMid")),A.e6(d.h(0,"sdpMLineIndex")))),$async$Nb)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nb,w)},
RP(d){return this.any(d)},
any(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$RP=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Rl(0)
if(r==null)r=D.dh
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.L)(r),++s)r[s].skk(0,t)
return A.i(null,w)}})
return A.j($async$RP,w)},
Iv(d){return this.ano(d)},
ano(d){var x=0,w=A.k(y.H)
var $async$Iv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGb(d),$async$Iv)
case 2:return A.i(null,w)}})
return A.j($async$Iv,w)},
RM(d){return this.ang(d)},
ang(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$RM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.Ie(0)
if(s==null)s=D.dh
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.L)(s),++t)s[t].skk(0,d)
return A.i(null,w)}})
return A.j($async$RM,w)},
Nj(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Nj=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.Ie(0)
if(s==null)s=C.a9M
if(s.length===0){x=1
break}x=3
return A.e(B.bJv(D.b.gS(s)),$async$Nj)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Nj,w)},
wp(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$wp=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a8(0)
x=7
return A.e(y.x.b(q)?q:A.dK(q,y.H),$async$wp)
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
else{o=A.I(q.Rl(0),!0,y.G)
D.b.t(o,q.Ie(0))
q=o}if(q==null)q=D.dh
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c19(r)
if(!m.b(k)){j=new A.ax($.aI,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$wp)
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
return A.e(s.d.k(),$async$wp)
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
return A.e(s.e.k(),$async$wp)
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
return A.j($async$wp,w)}}
B.a_Q.prototype={
Nz(d){return this.aVZ(d)},
aVZ(d){var x=0,w=A.k(y.H),v=this
var $async$Nz=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Cl(),$async$Nz)
case 2:return A.i(null,w)}})
return A.j($async$Nz,w)},
Cl(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Cl=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c1h(B.bIA(A.cH(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Cl)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cE(p,A.u(p).i("cE<1>")).aR(s.gaNB(),!0,s.gaMJ(),new B.aqv(s))
u=2
x=6
break
case 4:u=3
n=t
s.VC()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Cl,w)},
aNC(d){var x,w,v,u
try{x=D.a_.cQ(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.p(J.q(x,"type"),"signal_appel"))return
w=J.q(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.bSJ(w))}catch(u){}},
VC(){var x,w=this,v=w.c
if(v!=null)v.Z(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=C.a61[v]
w.f=v+1
v=w.d
if(v!=null)v.Z(0)
w.d=A.db(A.dn(0,0,0,0,x),new B.aqw(w))},
FJ(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$FJ=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Z(0)
s=t.c
s=s==null?null:s.Z(0)
x=2
return A.e(y.x.b(s)?s:A.dK(s,y.H),$async$FJ)
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
r=s.w=new B.aiX(s,q)}s=r.a8(0)}x=7
return A.e(y._.b(s)?s:A.dK(s,y.z),$async$FJ)
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
return A.j($async$FJ,w)}}
B.aIg.prototype={
YF(d,e){return this.aXp(d,e)},
aXp(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$YF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a8(["mandatory",A.C(r,r),"optional",A.b([A.a8(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fm(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bR(t)))
t=J.l(s)
v=B.c72(D.d5.glQ().bx(new A.eK(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$YF,w)}}
B.mr.prototype={
Rl(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.de(w,A.X(w).i("de<1,aB>"))
J.h0(w,new B.aDI(x))
return x},
Ie(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.de(w,A.X(w).i("de<1,aB>"))
J.h0(w,new B.aDJ(x))
return x}}
B.a3y.prototype={
atO(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aDF(x)))
w.addEventListener("mute",A.bV(new B.aDG(x)))
w.addEventListener("unmute",A.bV(new B.aDH(x)))},
skk(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aDu.prototype={
BC(d,e){return this.amp(0,e)},
amp(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$BC=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.chs())if(y.f.b(e.h(0,"video"))&&J.q(e.h(0,"video"),"facingMode")!=null)J.iu(e.h(0,"video"),"facingMode")
e.cm(0,"video",new B.aDw())
e.cm(0,"audio",new B.aDx())}catch(a0){A.n6("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hT(e.h(0,"audio"),i,i).aP(0,"optional")&&y.F.b(J.q(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.q(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h0(s,new B.aDy(r))
J.iu(e.h(0,"audio"),"optional")
J.iX(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.bd(a0)
A.n6("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bR(e)
x=10
return A.e(A.eA(o.getUserMedia(h.a(n)),h),$async$BC)
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
return A.e(A.eA(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$BC)
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
return A.j($async$BC,w)}}
B.a54.prototype={
atT(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aIj(x)))
w.addEventListener("icecandidate",A.bV(new B.aIk(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aIl(x)))
w.onicegatheringstatechange=A.bV(new B.aIm(x))
w.addEventListener("signalingstatechange",A.bV(new B.aIn(x)))
if(!$.bMM())w.addEventListener("connectionstatechange",A.bV(new B.aIo(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aIp(x)))
w.addEventListener("track",A.bV(new B.aIq(x)))},
NL(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eA(s.createOffer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$NL)
case 3:t=f
v=new B.zK(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NL,w)},
NJ(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$NJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eA(s.createAnswer(y.m.a(A.bR(A.C(y.N,y.z)))),y.A),$async$NJ)
case 3:t=f
v=new B.zK(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$NJ,w)},
kg(d,e){var x
this.ax.cm(0,e.a,new B.aIi(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cK(null,y.H)},
BR(d,e){return this.ans(0,e)},
ans(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BR=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eA(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BR)
case 2:return A.i(null,w)}})
return A.j($async$BR,w)},
BT(d,e){return this.anJ(0,e)},
anJ(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BT=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eA(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BT)
case 2:return A.i(null,w)}})
return A.j($async$BT,w)},
N1(d){return this.aUd(d)},
aUd(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$N1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eA(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$N1)
case 2:return A.i(null,w)}})
return A.j($async$N1,w)},
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
B.bKk.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.O5.prototype={
saj6(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.G8()
if(x!=null)x.style.objectFit=e},
adg(){var x=this,w=x.G8(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sm(0,v.ag2(u,x.z!=null,0,t))},
sa2A(d,e){var x,w,v,u,t=this
t.z=e
if(e.Ie(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ap(y.l.b(x)?x:new A.de(x,A.X(x).i("de<1,aB>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.Rl(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ap(y.l.b(x)?x:new A.de(x,A.X(x).i("de<1,aB>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aAR()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.G8()
if(u!=null){u.srcObject=t.x
x=t.G8()
x.toString
t.a4g(x)}t.sm(0,t.a.aWm(t.z!=null))},
aAR(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
G8(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.L)(t),++r)t[r].Z(0)
q=u.G8()
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
while(true)switch(x){case 0:$.ID()
$.q5().tW("RTCVideoRenderer-"+v.Q,new B.aIw(v),!0)
return A.i(null,w)}})
return A.j($async$iJ,w)},
a4g(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.O7.prototype={
N(){return new B.O8()}}
B.O8.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a6(0,v.gaKW())
x=v.a
w=x.c
w.as=x.e
w.saj6(0,x.d===C.K3?"contain":"cover")},
aKX(){if(this.c!=null)this.n(new B.aIx())},
k(){if(this.c!=null)this.a4()},
aS(d){var x,w
this.b8(d)
A.db(A.dn(0,0,10,0,0),new B.aIz(this))
x=this.a
w=x.c
w.saj6(0,x.d===C.K3?"contain":"cover")},
C(d){return new A.lr(new B.aIy(this),null)}}
B.a23.prototype={
atF(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.bi()
x.a=new B.TB(d,x,new A.b3(new A.ax(w,y.c),y.r),e,g.i("TB<0>"))
if(f.a.ghU())f.a=new B.Pw(g.i("@<0>").bS(g).i("Pw<1,2>")).iF(f.a)
w=A.fJ(null,new B.axb(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
a9W(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Z(0)
w=this.b
w===$&&A.d()
w.a8(0)}}
B.TB.prototype={
E(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
cZ(d,e){if(this.e)throw A.n(A.am("Cannot add event after closing."))
if(this.d)return
this.aDe(d,e)},
jG(d){return this.cZ(d,null)},
aDe(d,e){var x=this
if(x.w){x.a.a.cZ(d,e)
return}x.c.fi(d,e)
x.a9X()
x.b.a9W()
x.a.a.a8(0).h3(new B.bcs())},
a8(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.a9W()
x.c.cK(0,x.a.a.a8(0))}return x.c.a},
a9X(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dN(0)
return},
$idC:1}
B.a7e.prototype={}
B.a7f.prototype={}
B.xj.prototype={
a5r(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Cz(d,e))
x.a8(0)},
a2b(d){var x
if((this.b.b&4)!==0)throw A.n(B.bKU())
x=A.bR(d)
x.toString
this.a.send(x)},
vw(d,e,f){return this.aVK(0,e,f)},
aVK(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vw=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bKU())
u.a8(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vw,w)},
$ibKT:1}
B.rR.prototype={}
B.FV.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.FV&&e.a===this.a},
gH(d){return D.c.gH(this.a)}}
B.Cb.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Cb&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fE(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Cz.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.Cz&&e.a===this.a&&e.b===this.b},
gH(d){return A.fE([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gn.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Gm.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.alW.prototype={
atw(d){d.ey(new B.am_(this),new B.am0(this),y.a)}}
B.aiX.prototype={
a8(d){var x=this.b
x.e=x.d=null
return this.apj(0)}}
B.a8k.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vn.prototype={
M(){return"RTCSignalingState."+this.b}}
B.O2.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vm.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.mC.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a55.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aIf.prototype={}
B.MF.prototype={}
B.E8.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aDt.prototype={}
B.EN.prototype={}
B.O3.prototype={}
B.aIr.prototype={}
B.zK.prototype={}
B.O4.prototype={}
B.O6.prototype={
ag2(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.O6(x,w,v)},
aWm(d){return this.ag2(null,d,null,null)},
j(d){var x=this
return A.a0(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~()","xX(H)","~(Fx)","bo(EN)","bo(O4)","bo(mC)","~(@)","mr(@)","mr()","bo(bKT)","~(rR)"])
B.aNr.prototype={
$0(){return J.c0z(this.a.bk())},
$S:1}
B.aNs.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.e.b(u)){x=u
w=A.bd(v)
this.b.cZ(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.anG.prototype={
$1(d){if(d==null)return null
return A.c2(J.l(d))},
$S:150}
B.b7N.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.Ck(!0)},
$S:0}
B.b7O.prototype={
$1(d){return this.a.MS()},
$S:39}
B.b7K.prototype={
$0(){var x=this.a.c
if(x!=null)A.aa(x,!1).bG()},
$S:0}
B.b7L.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b7H.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b7I.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b7J.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b7E.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b7F.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b7G.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bPP(x.w,w,u,!1,v)},
$S:z+2}
B.b7M.prototype={
$0(){return this.a.avq()},
$S:0}
B.b7o.prototype={
$1(d){this.a.xS("candidat_ice",d,!1)},
$S:375}
B.b7p.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b7n())},
$S:0}
B.b7n.prototype={
$0(){},
$S:0}
B.b7q.prototype={
$0(){this.a.mn(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b7r.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b7s.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.xS("annule",D.fk,!1)
x.mn(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b7t.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b7m(x,w))},
$S:39}
B.b7m.prototype={
$0(){return this.a.ax=new A.av(Date.now(),0,!1).eG(this.b)},
$S:0}
B.b7u.prototype={
$1(d){},
$S:153}
B.b7v.prototype={
$1(d){this.a.Dq()},
$S:39}
B.b7x.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.aai()
x.a6O("reponse",d)},
$S:376}
B.b7y.prototype={
$1(d){this.a.mn(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b7z.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.aai()},
$S:28}
B.b7A.prototype={
$1(d){this.a.mn(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b7B.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a6O("offre",d)},
$S:376}
B.b7C.prototype={
$1(d){this.a.mn(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:18}
B.b7w.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.av(Date.now(),0,!1)
x.ax=D.V},
$S:0}
B.b7l.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b7k.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b7j.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b7D.prototype={
$2(d,e){if(!d)this.a.DV()},
$S:931}
B.aMS.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a8(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+4}
B.aMT.prototype={
$1(d){var x=d.b,w=x.length!==0?D.b.gS(x):null
if(w!=null)this.a.azx(w)},
$S:z+5}
B.aMU.prototype={
$1(d){var x
if(d===C.JV){x=this.a.w
if(x!=null)x.$0()}},
$S:z+6}
B.aqv.prototype={
$1(d){return this.a.VC()},
$S:21}
B.aqw.prototype={
$0(){var x=this.a
if(!x.e)x.Cl()},
$S:0}
B.bGp.prototype={
$1(d){return d.length!==0},
$S:12}
B.aDI.prototype={
$1(d){return this.a.push(B.bJO(d))},
$S:21}
B.aDJ.prototype={
$1(d){return this.a.push(B.bJO(d))},
$S:21}
B.aDF.prototype={
$1(d){},
$S:22}
B.aDG.prototype={
$1(d){},
$S:22}
B.aDH.prototype={
$1(d){},
$S:22}
B.aDw.prototype={
$0(){return!1},
$S:48}
B.aDx.prototype={
$0(){return!1},
$S:48}
B.aDy.prototype={
$1(d){J.h0(d,new B.aDv(this.a))},
$S:375}
B.aDv.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:50}
B.aIj.prototype={
$1(d){},
$S:22}
B.aIk.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.EN(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aIl.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.ch3(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bMM())switch(w.cx.a){case 0:w.cy=C.K_
break
case 1:w.cy=C.K0
break
case 3:w.cy=C.K1
break
case 5:w.cy=C.JY
break
case 6:w.cy=C.JZ
break
case 7:w.cy=C.rz
break
default:break}},
$S:38}
B.aIm.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.ch4(w.iceGatheringState)},
$S:38}
B.aIn.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.civ(w.signalingState)},
$S:38}
B.aIo.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.ci7(w.connectionState)},
$S:38}
B.aIp.prototype={
$1(d){},
$S:38}
B.aIq.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bJO(d.track)
x=d.streams
x=y.l.b(x)?x:new A.de(x,A.X(x).i("de<1,aB>"))
w=J.eR(x,new B.aIh(w),y.h)
v.$1(new B.O4(A.I(w,!0,w.$ti.i("aD.E"))))}},
$S:22}
B.aIh.prototype={
$1(d){return new B.mr(d,d.id,this.a.as)},
$S:z+8}
B.aIi.prototype={
$0(){var x=this.b.e
return new B.mr(x,x.id,this.a.as)},
$S:z+9}
B.bGx.prototype={
$1(d){return J.fM(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aIw.prototype={
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
x.a4g(t)
v=y.i.c
w.push(A.hE(t,"canplay",new B.aIs(x),!1,v))
w.push(A.hE(t,"resize",new B.aIt(x),!1,v))
w.push(A.hE(t,"error",new B.aIu(t),!1,v))
w.push(A.hE(t,"ended",new B.aIv(),!1,v))
return t},
$S:194}
B.aIs.prototype={
$1(d){this.a.adg()},
$S:21}
B.aIt.prototype={
$1(d){this.a.adg()},
$S:21}
B.aIu.prototype={
$1(d){var x,w,v=this.a.error
A.n6("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=D.Fp.h(0,A.al(v,"code"))
x.toString
w=!J.p(A.al(v,"message"),"")?A.al(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pd(x,D.Fo.h(0,A.al(v,"code")),w,null))},
$S:40}
B.aIv.prototype={
$1(d){},
$S:21}
B.aIx.prototype={
$0(){},
$S:0}
B.aIz.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aIy.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a2k("RTCVideoRenderer-"+w.Q)
else w=A.U(x,x,D.k,x,x,x,x,x,x,x,x,x,x,x)
return A.cI(A.U(x,w,D.k,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:932}
B.axb.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eM(w.ghA(w),new B.axa(v),w.gnn())},
$S:0}
B.axa.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.a9X()
x=x.b
x===$&&A.d()
x.a8(0)},
$S:0}
B.bcs.prototype={
$1(d){},
$S:18}
B.apq.prototype={
$1(d){this.a.cK(0,this.b)},
$S:22}
B.apr.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hj(new B.Gn("Failed to connect WebSocket"))
else this.b.a5r(1006,"error")},
$S:22}
B.aps.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.ct("data")
if(typeof x==="string")w.b=new B.FV(A.bB(x))
else if(typeof x==="object"&&A.c5b(y.m.a(x),"ArrayBuffer"))w.b=new B.Cb(A.a3W(y.o.a(x),0,null))
else throw A.n(A.am("unexpected message type: "+J.az(x).j(0)))
v.E(0,w.bk())},
$S:40}
B.apt.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cK(0,this.b)
this.b.a5r(d.code,d.reason)},
$S:22}
B.am_.prototype={
$1(d){var x=d.b,w=this.a
new A.cE(x,A.u(x).i("cE<1>")).cT(new B.alX(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cE(x,A.u(x).i("cE<1>")).b1R(new B.alY(d),new B.alZ(w,d))
w.f.dN(0)},
$S:z+10}
B.alX.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.FV
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.Cb
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.Cz){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a8(0)}}},
$S:z+11}
B.alY.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.bKU())
s=A.bR(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a2b(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a2b(new Uint8Array(A.dD(u)))
break $label1$1}t=A.aK("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Gm))throw r}},
$S:16}
B.alZ.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.vw(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.O(q) instanceof B.Gm))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.am0.prototype={
$1(d){var x,w=d instanceof A.Qv?d:new B.a8k(J.l(d)),v=this.a
v.f.hj(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.jG(w)
v=v.a
v===$&&A.d()
v.a8(0)},
$S:38};(function aliases(){var x=B.CW.prototype
x.apj=x.a8})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.SM.prototype,"gaux","Jf",0)
var v
w(v=B.SL.prototype,"gaSx","ad6",3)
x(v,"gaaA","DV",0)
x(v,"ga4t","Jy",0)
x(v,"ga4s","Jx",0)
x(v,"ga4q","Jv",0)
x(v,"ga4r","Jw",0)
w(v=B.a_Q.prototype,"gaNB","aNC",7)
x(v,"gaMJ","VC",1)
x(B.O5.prototype,"gdF","k",0)
x(B.O8.prototype,"gaKW","aKX",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a1,[B.CW,B.anF,B.Fx,B.a05,B.aMR,B.a_Q,B.aIf,B.MF,B.E8,B.aDt,B.O3,B.aIr,B.a7f,B.TB,B.a7e,B.xj,B.rR,B.Gn,B.a8k,B.EN,B.zK,B.O4,B.O6])
w(B.Pw,A.fd)
x(A.jE,[B.aNr,B.b7N,B.b7K,B.b7L,B.b7H,B.b7I,B.b7J,B.b7E,B.b7F,B.b7M,B.b7p,B.b7n,B.b7q,B.b7r,B.b7s,B.b7m,B.b7w,B.b7l,B.b7k,B.b7j,B.aqw,B.aDw,B.aDx,B.aIi,B.aIx,B.aIz,B.axb,B.axa,B.alZ])
x(A.ie,[B.aNs,B.anG,B.b7O,B.b7G,B.b7o,B.b7t,B.b7u,B.b7v,B.b7x,B.b7y,B.b7z,B.b7A,B.b7B,B.b7C,B.aMS,B.aMT,B.aMU,B.aqv,B.bGp,B.aDI,B.aDJ,B.aDF,B.aDG,B.aDH,B.aDy,B.aIj,B.aIk,B.aIl,B.aIm,B.aIn,B.aIo,B.aIp,B.aIq,B.aIh,B.bGx,B.aIw,B.aIs,B.aIt,B.aIu,B.aIv,B.bcs,B.apq,B.apr,B.aps,B.apt,B.am_,B.alX,B.alY,B.am0])
x(A.N,[B.oL,B.xX,B.O7])
x(A.T,[B.SM,B.SL,B.O8])
x(A.at,[B.Ru,B.a9X,B.w5])
x(A.ql,[B.b7D,B.aDv,B.aIy])
w(B.aIg,B.aIf)
w(B.mr,B.MF)
w(B.a3y,B.E8)
w(B.aDu,B.aDt)
w(B.a54,B.O3)
w(B.bKk,B.aIr)
w(B.O5,A.d0)
x(B.a7f,[B.a23,B.alW])
x(B.rR,[B.FV,B.Cb,B.Cz])
w(B.Gm,B.Gn)
w(B.aiX,B.CW)
x(A.GP,[B.vn,B.O2,B.vm,B.mC,B.a55])})()
A.oc(b.typeUniverse,JSON.parse('{"CW":{"dC":["1"]},"Pw":{"fd":["1","2"],"fd.S":"1","fd.T":"2"},"xX":{"N":[],"m":[]},"oL":{"N":[],"m":[]},"SM":{"T":["oL"]},"Ru":{"at":[],"m":[]},"SL":{"T":["xX"]},"a9X":{"at":[],"m":[]},"w5":{"at":[],"m":[]},"mr":{"MF":[]},"a3y":{"E8":[]},"a54":{"O3":[]},"O5":{"d0":["O6"],"aX":[]},"O7":{"N":[],"m":[]},"O8":{"T":["O7"]},"TB":{"dC":["1"]},"xj":{"bKT":[]},"FV":{"rR":[]},"Cb":{"rR":[]},"Cz":{"rR":[]},"Gn":{"bM":[]},"Gm":{"bM":[]},"aiX":{"dC":["@"]},"a8k":{"bM":[]}}'))
A.bLl(b.typeUniverse,JSON.parse('{"CW":1,"a7f":1}'))
var y=(function rtii(){var x=A.au
return{b:x("xj"),L:x("bM"),_:x("as<@>"),x:x("as<~>"),S:x("E<ae<o,J>>"),t:x("E<ae<o,@>>"),Q:x("E<E8>"),d:x("E<il<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aB"),l:x("K<aB>"),F:x("K<ae<o,@>>"),j:x("K<@>"),I:x("K<w>"),P:x("ae<o,@>"),f:x("ae<@,@>"),E:x("MF"),G:x("E8"),h:x("mr"),o:x("p8"),a:x("bo"),K:x("a1"),J:x("O3"),v:x("zK"),Z:x("a7e<a1?>"),N:x("o"),e:x("pD"),M:x("e5"),D:x("rR"),U:x("Y<o>"),g:x("es<Fx>"),n:x("es<~>"),V:x("b3<xj>"),r:x("b3<@>"),R:x("b3<~>"),i:x("SW<aB>"),C:x("o6<aB>"),k:x("ax<xj>"),c:x("ax<@>"),W:x("ax<~>"),q:x("kf"),y:x("J"),z:x("@"),A:x("aB?"),X:x("a1?"),H:x("~")}})();(function constants(){var x=a.makeConstList
C.Tz=new B.a05(D.jY)
C.xr=new A.aq(32,0,32,0)
C.ya=new A.ah(57638,!1)
C.yb=new A.ah(57639,!1)
C.YT=new A.ah(58337,!1)
C.YU=new A.ah(58341,!1)
C.Z1=new A.ah(58923,!1)
C.yh=new A.ah(59048,!1)
C.Z2=new A.ah(59049,!1)
C.Z3=new A.ah(59077,!1)
C.a61=A.b(x([1,2,4,8,16]),A.au("E<w>"))
C.a9M=A.b(x([]),y.Q)
C.Ts=new A.G(1,0.9098039215686274,0.9607843137254902,0.9137254901960784,D.r)
C.RT=new A.G(1,0.7843137254901961,0.9019607843137255,0.788235294117647,D.r)
C.Sg=new A.G(1,0.6470588235294118,0.8392156862745098,0.6549019607843137,D.r)
C.SI=new A.G(1,0.5058823529411764,0.7803921568627451,0.5176470588235295,D.r)
C.S1=new A.G(1,0.4,0.7333333333333333,0.41568627450980394,D.r)
C.S2=new A.G(1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Tu=new A.G(1,0.2627450980392157,0.6274509803921569,0.2784313725490196,D.r)
C.SA=new A.G(1,0.2196078431372549,0.5568627450980392,0.23529411764705882,D.r)
C.SM=new A.G(1,0.1803921568627451,0.49019607843137253,0.19607843137254902,D.r)
C.RK=new A.G(1,0.10588235294117647,0.3686274509803922,0.12549019607843137,D.r)
C.adx=new A.ds([50,C.Ts,100,C.RT,200,C.Sg,300,C.SI,400,C.S1,500,C.S2,600,C.Tu,700,C.SA,800,C.SM,900,C.RK],A.au("ds<w,G>"))
C.adI=new A.yW(C.adx,1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.FD=new A.fC("FlutterWebRTC.Method",D.ba,null)
C.ah0=new B.mC(0,"RTCIceConnectionStateNew")
C.ah1=new B.mC(1,"RTCIceConnectionStateChecking")
C.ah2=new B.mC(2,"RTCIceConnectionStateCompleted")
C.ah3=new B.mC(3,"RTCIceConnectionStateConnected")
C.ah4=new B.mC(4,"RTCIceConnectionStateCount")
C.JV=new B.mC(5,"RTCIceConnectionStateFailed")
C.ah5=new B.mC(6,"RTCIceConnectionStateDisconnected")
C.JW=new B.mC(7,"RTCIceConnectionStateClosed")
C.JX=new B.O2(0,"RTCIceGatheringStateNew")
C.ah6=new B.O2(1,"RTCIceGatheringStateGathering")
C.ah7=new B.O2(2,"RTCIceGatheringStateComplete")
C.rz=new B.vm(0,"RTCPeerConnectionStateClosed")
C.JY=new B.vm(1,"RTCPeerConnectionStateFailed")
C.JZ=new B.vm(2,"RTCPeerConnectionStateDisconnected")
C.K_=new B.vm(3,"RTCPeerConnectionStateNew")
C.K0=new B.vm(4,"RTCPeerConnectionStateConnecting")
C.K1=new B.vm(5,"RTCPeerConnectionStateConnected")
C.ah8=new B.vn(0,"RTCSignalingStateStable")
C.ah9=new B.vn(1,"RTCSignalingStateHaveLocalOffer")
C.aha=new B.vn(2,"RTCSignalingStateHaveRemoteOffer")
C.ahb=new B.vn(3,"RTCSignalingStateHaveLocalPrAnswer")
C.ahc=new B.vn(4,"RTCSignalingStateHaveRemotePrAnswer")
C.K2=new B.vn(5,"RTCSignalingStateClosed")
C.ahd=new B.O6(0,0,0)
C.K3=new B.a55(0,"RTCVideoViewObjectFitContain")
C.K4=new B.a55(1,"RTCVideoViewObjectFitCover")
C.nA=new A.cg(20,null,null,null)
C.akC=new A.cg(48,null,null,null)
C.Lv=new A.cg(null,64,null,null)
C.ans=new A.y(!0,D.l,null,null,null,null,22,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.M5=new A.y(!0,D.l,null,null,null,null,26,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.tD=new A.y(!0,D.ar,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aog=new A.y(!0,D.l,null,null,null,null,12,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aof=new A.y(!0,D.l,null,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.ap3=new A.y(!0,D.n,null,null,null,null,32,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.Ma=new A.y(!0,D.n,null,null,null,null,40,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bTM=!1
$.bSb=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"clP","bZ5",()=>new B.aIg())
x($,"cjX","bMM",()=>D.c.q(A.al(A.al(A.al(A.bMt(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_12",e:"endPart",h:b})})($__dart_deferred_initializers__,"GaGHvpMt1Jc+MmgkAai0CXWQflc=");