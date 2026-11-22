((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Ih:function Ih(){},WR:function WR(d){this.$ti=d},b3I:function b3I(d){this.a=d},b3J:function b3J(d,e){this.a=d
this.b=e},
cuT(d){var x
B.c85()
if(d.length===0)return
x=A.c0(new B.c9U(d))
self.window.addEventListener("beforeunload",x)
$.chH=new B.c9T(x)},
c85(){var x=$.chH
if(x!=null)x.$0()
$.chH=null},
c9U:function c9U(d){this.a=d},
c9T:function c9T(d){this.a=d},
a7q(d){var x,w,v,u,t=new B.aA4(),s=J.M(d),r=s.h(d,"id")
r=J.l(r==null?"":r)
x=s.h(d,"conversation_id")
J.l(x==null?"":x)
x=s.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=s.h(d,"appelant_nom")
w=J.l(w==null?"":w)
A.an(s.h(d,"appele_id"))
A.an(s.h(d,"appele_nom"))
v=s.h(d,"type")
v=J.l(v==null?"audio":v)
u=s.h(d,"statut")
u=J.l(u==null?"sonne":u)
t.$1(s.h(d,"cree_le"))
t.$1(s.h(d,"repondu_le"))
return new B.aA3(r,x,w,v,u)},
cge(d){var x,w,v,u=J.M(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mM(t,y.N,y.z):C.bn
if(u.h(d,"cree_le")!=null)A.bQ(J.l(u.h(d,"cree_le")))
return new B.LC(s,x,w,v)},
cEq(d){var x,w,v,u,t,s,r=J.M(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.ZN
x=A.a([],y.t)
for(r=J.ar(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mM(s,u,t))}return new B.a92(x)},
cvI(d){var x=J.M(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oX(v)
if(!x.p(v,"offer")&&!x.p(v,"answer"))return null
return new A.aqk(w,v)},
cV3(d){var x,w,v=J.M(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aqn(u,A.i4(w)?w:null,v)},
aA3:function aA3(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
aA4:function aA4(){},
LC:function LC(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a92:function a92(d){this.a=d},
cmN(d,e,f,g,h,i,j){return new B.qT(f,g,j,i,e,d,null)},
cex(d,e,f,g,h,i,j,k,l,m){return new B.qS(f,m,h,l,i,d,j,k,e,g,null)},
crC(d,e,f,g,h,i,j,k,l,m,n){return new B.akv(e,g,f,d,n,j,i,h,m,k,l,null)},
ctD(d,e){var x=null
return new A.Y(D.rR,A.c(d.toUpperCase(),2,C.a4,x,x,A.c8(x,x,C.m,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.A,x,x,!0,x,1.2,x,x,x,x,x,x),C.X,x,x),x)},
qT:function qT(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_F:function a_F(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bv0:function bv0(d){this.a=d},
bv1:function bv1(d){this.a=d},
buY:function buY(d){this.a=d},
buZ:function buZ(d){this.a=d},
buV:function buV(d){this.a=d},
buW:function buW(d){this.a=d},
buX:function buX(d){this.a=d},
buS:function buS(d){this.a=d},
buT:function buT(d){this.a=d},
buU:function buU(d){this.a=d},
bv_:function bv_(d){this.a=d},
Z6:function Z6(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qS:function qS(d,e,f,g,h,i,j,k,l,m,n){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.z=l
_.as=m
_.a=n},
a_E:function a_E(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=""
_.w=null
_.at=_.as=_.Q=_.z=_.y=_.x=!1
_.ax=!0
_.ay=null
_.ch=e
_.dx=_.db=_.cy=_.cx=_.CW=null
_.dy=$
_.fr=!1
_.fx=null
_.go=_.fy=!1
_.c=_.a=null},
buD:function buD(d){this.a=d},
buE:function buE(d){this.a=d},
buC:function buC(d){this.a=d},
buF:function buF(d){this.a=d},
buG:function buG(){},
buH:function buH(d){this.a=d},
buB:function buB(d,e){this.a=d
this.b=e},
buI:function buI(){},
buJ:function buJ(d){this.a=d},
bul:function bul(d){this.a=d},
bum:function bum(d){this.a=d},
bun:function bun(d){this.a=d},
buo:function buo(d){this.a=d},
buk:function buk(d){this.a=d},
bup:function bup(d){this.a=d},
buq:function buq(d){this.a=d},
bur:function bur(d){this.a=d},
buj:function buj(d,e){this.a=d
this.b=e},
bus:function bus(){},
but:function but(d){this.a=d},
buL:function buL(d){this.a=d},
buM:function buM(d){this.a=d},
buN:function buN(d){this.a=d},
buO:function buO(d){this.a=d},
buP:function buP(d){this.a=d},
buQ:function buQ(d){this.a=d},
buy:function buy(d,e){this.a=d
this.b=e},
buz:function buz(d){this.a=d},
buA:function buA(d){this.a=d},
buK:function buK(){},
bui:function bui(d,e){this.a=d
this.b=e},
buh:function buh(d,e){this.a=d
this.b=e},
bug:function bug(d,e){this.a=d
this.b=e},
buv:function buv(d){this.a=d},
buw:function buw(d){this.a=d},
buu:function buu(d){this.a=d},
bux:function bux(d){this.a=d},
buR:function buR(d){this.a=d},
akv:function akv(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Z7:function Z7(d,e){this.c=d
this.a=e},
A4:function A4(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
NP:function NP(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
ap8:function ap8(d,e){var _=this
_.d=$
_.eJ$=d
_.bS$=e
_.c=_.a=null},
bQL:function bQL(d,e){this.a=d
this.b=e},
a5P:function a5P(){},
b35:function b35(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b36:function b36(d){this.a=d},
b37:function b37(d){this.a=d},
b38:function b38(d){this.a=d},
a8P:function a8P(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aDO:function aDO(d){this.a=d},
aDP:function aDP(d){this.a=d},
caW(d){var x=y.U,w=A.G(new A.X(A.a(d.split(" "),y.s),new B.caX(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gU(w),0).toUpperCase()
return(J.m(C.b.gU(w),0)+J.m(C.b.gaZ(w),0)).toUpperCase()},
caX:function caX(){},
acJ:function acJ(){this.a=null},
aYO:function aYO(){},
ut:function ut(d,e){this.e=d
this.b=e},
aTC:function aTC(d){this.a=d},
aTD:function aTD(d){this.a=d},
cfm(d){var x=new B.adc(d)
x.aH3(d)
return x},
adc:function adc(d){this.d=d},
aTz:function aTz(d){this.a=d},
aTA:function aTA(d){this.a=d},
aTB:function aTB(d){this.a=d},
aTm:function aTm(){},
aTo:function aTo(){},
aTp:function aTp(){},
aTq:function aTq(d){this.a=d},
aTn:function aTn(d){this.a=d},
cKx(d,e){var x=y.N
x=new B.af4(d,e,A.C(x,y.E),A.C(x,y.z))
x.aHc(d,e)
return x},
af4:function af4(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYQ:function aYQ(d){this.a=d},
aYR:function aYR(d){this.a=d},
aYS:function aYS(d){this.a=d},
aYT:function aYT(d){this.a=d},
aYU:function aYU(d){this.a=d},
aYV:function aYV(d){this.a=d},
aYW:function aYW(d){this.a=d},
aYX:function aYX(d){this.a=d},
aYP:function aYP(d){this.a=d},
af5:function af5(){},
cg1:function cg1(d){this.a=d},
cXv(){return C.b.nT(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.cb5())!==-1},
cb5:function cb5(){},
cpt(){var x=A.a([],y.d),w=$.cpu
$.cpu=w+1
return new B.Vc(w,x,D.awi,$.ag())},
Vc:function Vc(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aZ2:function aZ2(d){this.a=d},
aYZ:function aYZ(d){this.a=d},
aZ_:function aZ_(d){this.a=d},
aZ0:function aZ0(d){this.a=d},
aZ1:function aZ1(){},
cg2(d,e,f){return new B.Ve(d,f,e,null)},
Ve:function Ve(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Vf:function Vf(){this.c=this.a=null},
aZ3:function aZ3(){},
aZ5:function aZ5(d){this.a=d},
aZ4:function aZ4(d){this.a=d},
cnr(d,e,f,g){var x,w={}
w.a=d
x=new B.abl(g.i("abl<0>"))
x.aGL(e,f,w,g)
return x},
abl:function abl(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aMo:function aMo(d,e){this.a=d
this.b=e},
aMn:function aMn(d){this.a=d},
a0y:function a0y(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bA5:function bA5(){},
ahs:function ahs(d){this.b=this.a=$
this.$ti=d},
aht:function aht(){},
cdU(d,e){return B.cDz(d,e)},
cDz(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$cdU=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.q5("ws")&&!d.q5("wss"))throw A.o(A.fO(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.l(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.Br(r,A.h5(null,null,null,!1,y.D))
u=new A.aC($.aL,y.u)
p=new A.bf(u,y.V)
if(J.r(r.readyState,1))p.cI(0,q)
else if(J.r(r.readyState,2)||J.r(r.readyState,3))p.hB(new B.MB("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.qb(r,"open",!1,y.C).gU(0).aL(new B.aCl(p,q),y.H)
t=y.C
s=y.H
new A.qb(r,"error",!1,t).gU(0).aL(new B.aCm(p,q),s)
A.iN(r,"message",new B.aCn(q),!1,y.m)
new A.qb(r,"close",!1,t).gU(0).aL(new B.aCo(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$cdU,w)},
Br:function Br(d,e){this.a=d
this.b=e},
aCl:function aCl(d,e){this.a=d
this.b=e},
aCm:function aCm(d,e){this.a=d
this.b=e},
aCn:function aCn(d){this.a=d},
aCo:function aCo(d,e){this.a=d
this.b=e},
cgI(){return new B.MA("Connection Closed")},
vq:function vq(){},
M0:function M0(d){this.a=d},
Hf:function Hf(d){this.a=d},
HH:function HH(d,e){this.a=d
this.b=e},
MB:function MB(d){this.a=d},
MA:function MA(d){this.a=d},
cD0(d){var x=null,w=$.aL,v=new B.ahs(y.Z),u=y.X,t=A.h5(x,x,x,!0,u),s=A.h5(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.cnr(new A.cP(s,r.i("cP<1>")),new A.Gr(t,q.i("Gr<1>")),!0,u)
v.b=B.cnr(new A.cP(t,q.i("cP<1>")),new A.Gr(s,r.i("Gr<1>")),!1,u)
v=new B.axR(new A.bf(new A.aC(w,y.W),y.R),v)
v.aGt(d)
return v},
axR:function axR(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axV:function axV(d){this.a=d},
axS:function axS(d){this.a=d},
axT:function axT(d){this.a=d},
axU:function axU(d,e){this.a=d
this.b=e},
axW:function axW(d){this.a=d},
aun:function aun(d,e){this.b=d
this.a=e},
aiP:function aiP(d){this.a=d},
cX3(d){switch(d){case"new":return D.aw5
case"checking":return D.aw6
case"connected":return D.aw8
case"completed":return D.aw7
case"failed":return D.P0
case"disconnected":return D.awa
case"closed":return D.P1
case"count":return D.aw9}return D.P1},
cX4(d){switch(d){case"new":return D.P2
case"gathering":return D.awb
case"complete":return D.awc}return D.P2},
cZg(d){switch(d){case"stable":return D.awd
case"have-local-offer":return D.awe
case"have-local-pranswer":return D.awg
case"have-remote-offer":return D.awf
case"have-remote-pranswer":return D.awh
case"closed":return D.P8}return D.P8},
cYp(d){switch(d){case"new":return D.P5
case"connecting":return D.P6
case"connected":return D.P7
case"closed":return D.vi
case"disconnected":return D.P4
case"failed":return D.P3}return D.vi},
z8:function z8(d,e){this.a=d
this.b=e},
V8:function V8(d,e){this.a=d
this.b=e},
z7:function z7(d,e){this.a=d
this.b=e},
oo:function oo(d,e){this.a=d
this.b=e},
af6:function af6(d,e){this.a=d
this.b=e},
aYN:function aYN(){},
TC:function TC(){},
JT:function JT(){},
aTl:function aTl(){},
KJ:function KJ(d,e,f){this.a=d
this.b=e
this.c=f},
V9:function V9(){},
Va:function Va(){},
aYY:function aYY(){},
Ey:function Ey(d,e){this.a=d
this.b=e},
Vb:function Vb(d){this.b=d},
Vd:function Vd(d,e,f){this.a=d
this.b=e
this.c=f},
ceY(d){var x=0,w=A.k(y.y)
var $async$ceY=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.o("The is not a video track => "+d.l(0))
throw A.o("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$ceY,w)},
adA(d){var x=0,w=A.k(y.H),v
var $async$adA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b8E("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$adA)
case 2:return A.i(null,w)}})
return A.j($async$adA,w)},
aVC(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aVC=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mM(y.f.a(A.c9E(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.V4(0,u),$async$aVC)
case 5:case 4:v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aVC,w)},
b8E(d,e,f,g){return B.cO7(d,e,f,g,f.i("0?"))},
cO7(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b8E=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b8D(),$async$b8E)
case 3:v=D.Ko.cm(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b8E,w)},
b8D(){var x=0,w=A.k(y.H),v,u
var $async$b8D=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.crn?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Ko.cm("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$b8D)
case 4:$.crn=!0
case 3:return A.i(null,w)}})
return A.j($async$b8D,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[26]
B.Ih.prototype={
E(d,e){this.a.E(0,e)},
dz(d,e){this.a.dz(d,e)},
ab(d){return this.a.ab(0)},
$ie7:1}
B.WR.prototype={
hO(d){var x=A.cE("subscription"),w=A.h5(new B.b3I(x),null,null,!0,this.$ti.y[1])
x.b=d.fM(new B.b3J(this,w),w.gnL(w),w.gpC())
return new A.cP(w,A.x(w).i("cP<1>"))}}
B.aA3.prototype={}
B.LC.prototype={}
B.a92.prototype={}
B.qT.prototype={
P(){return new B.a_F()}}
B.a_F.prototype={
S(){var x,w,v=this
v.W()
x=v.a
x.toString
v.z=!0
w=new B.acJ()
v.y!==$&&A.aK()
v.y=w
if(!x.y)w.uf(A.BE(C.lk,$.w0().a).c)
v.Q3()
v.r=A.du(C.c9,new B.bv0(v))
v.w=A.hg(C.rG,new B.bv1(v))},
m(){var x=this,w=x.r
if(w!=null)w.Y(0)
w=x.w
if(w!=null)w.Y(0)
w=x.x
if(w!=null)w.Y(0)
w=x.y
w===$&&A.d()
w.it()
if(x.z)w.hr()
x.a3()},
a40(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.du(C.fY,new B.buY(this))},
Uz(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Uz=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.K()
x=7
return A.e(o.ED(p.c),$async$Uz)
case 7:r=e
q=B.a7q(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.k(new B.buZ(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
p=s.y
p===$&&A.d()
p.it()
s.a40()}u=2
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
return A.j($async$Uz,w)},
Q3(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Q3=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.K()
x=7
return A.e(n.ED(o.c),$async$Q3)
case 7:r=e
q=B.a7q(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null){o=$.K()
m=o.gwY()}p=m
if(q.w!=="sonne"||q.c===p){s.k(new B.buV(s))
o=s.y
o===$&&A.d()
o.it()
s.a40()
x=1
break}s.k(new B.buW(s))
if(s.a.y)s.H3()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.k(new B.buX(s))
o=s.y
o===$&&A.d()
o.it()
s.a40()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Q3,w)},
H3(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$H3=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.k(new B.buS(s))
u=4
q=s.a
q.toString
p=$.K()
x=7
return A.e(p.LT(q.c,"accepte"),$async$H3)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.N(n)
if(s.c==null){x=1
break}s.k(new B.buT(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
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
q=s.y
q===$&&A.d()
q.it()
q=s.c
q.toString
A.a1(q,!1).AD(A.eg(new B.buU(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$H3,w)},
JD(d){return this.b5T(d)},
b5S(){return this.JD(!1)},
b5T(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$JD=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Y(0)
r=s.w
if(r!=null)r.Y(0)
r=s.y
r===$&&A.d()
r.it()
u=4
r=s.a
r.toString
q=$.K()
x=7
return A.e(q.LT(r.c,"refuse"),$async$JD)
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
if(r!=null)A.a1(r,!1).bO()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$JD,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jO(C.t,s,A.c(B.caW(r.d),s,s,s,s,D.aDr,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.aDd,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.Y(D.rR,x,s),C.k,A.c(q,s,s,s,s,D.wA,s,s,s),D.aAe],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.bv_(t)
v=A.b("Accepter")
u=t.f?s:t.gaHW()
q.push(A.P(A.a([new B.Z6(D.BN,C.aG,r,x,s),D.aA1,new B.Z6(C.nP,C.d_,v,u,s)],w),C.n,C.bA,C.i,s))}if(t.d)q.push(C.z7)
return A.e1(s,C.o,A.ft(!0,A.cy(A.I(q,C.n,C.f,C.O),s,s),!0,C.a_,!0,!0),s,s,s)}}
B.Z6.prototype={
D(d){var x=this,w=null,v=A.dl(x.d,w,w,C.a_,C.cK,w)
return A.I(A.a([A.ab(A.b2(!1,A.c1(x.c,C.m,w,32),C.j,w,C.p,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.dv,w,w,w)],y.p),C.n,C.f,C.O)}}
B.qS.prototype={
P(){return new B.a_E(A.b8(y.N),C.R)}}
B.a_E.prototype={
S(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.W()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.b35(B.cpt(),B.cpt())
o.d!==$&&A.aK()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a8P(new A.dT(n,n,y.g),new A.dT(n,n,y.n))
o.e!==$&&A.aK()
o.e=v
o.fr=!0
u=new B.acJ()
o.dy!==$&&A.aK()
o.dy=u
t=w.x
if(t!=null){s=$.l_()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.l_()
s=o.r
r=w.e
p=w.d
t.biv(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.as=!0
if(q){o.TB()
return}if(x.f)u.uf("assets/audio/tonalite-appel.wav")
o.t8()},
m(){var x=this,w=x.CW
if(w!=null)w.Y(0)
w=x.cx
if(w!=null)w.Y(0)
w=x.cy
if(w!=null)w.Y(0)
w=x.db
if(w!=null)w.Y(0)
w=x.dx
if(w!=null)w.Y(0)
w=x.dy
w===$&&A.d()
w.it()
if(x.fr)w.hr()
w=$.l_()
if(!(w.r&&w.a===x.r&&!x.y)){B.c85()
w=x.d
w===$&&A.d()
w.hr()
w=x.e
w===$&&A.d()
w.Ly()}x.a3()},
TB(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$TB=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.K()
s.w=o.gwY()
o=$.l_()
s.Q=o.x
s.as=o.y
s.x=o.e
o=o.f
s.ay=o
if(o!=null){o=Date.now()
n=s.ay
n.toString
s.ch=new A.au(o,0,!1).eu(n)}B.cuT(s.r)
u=4
s.a.toString
o=$.K()
x=7
return A.e(o.bX("/messagerie/appels/"+s.r+"/signaux"),$async$TB)
case 7:r=e
for(o=J.ar(r),n=s.f;o.B();){q=o.gJ(o)
p=B.cge(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.mL(A.b("Appel termin\xe9"))
x=1
break $async$outer}}u=2
x=6
break
case 4:u=3
l=t
x=6
break
case 3:x=2
break
case 6:o=s.c!=null
if(!o||s.y){x=1
break}n=s.d
n===$&&A.d()
n.f=new B.buD(s)
n.r=new B.buE(s)
n.w=new B.buF(s)
s.z=!0
if(o)s.k(new B.buG())
s.cy=A.hg(C.ce,new B.buH(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.ca(n,A.x(n).i("ca<1>")).cQ(s.gaop())
o=o.w
s.dx=new A.ca(o,A.x(o).i("ca<1>")).cQ(new B.buI())
s.CW=A.hg(C.fY,new B.buJ(s))
s.yp()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$TB,w)},
t8(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$t8=A.f(function(a0,a1){if(a0===1){t=a1
x=u}while(true)switch(x){case 0:s.cx=A.du(C.c9,new B.bul(s))
r="appel"
u=4
q=null
h=s.a
g=h.z
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$t8)
case 10:q=a1
h=s.r=B.a7q(q).a
x=8
break
case 9:g=$.K()
x=11
return A.e(g.ED(h.c),$async$t8)
case 11:q=a1
h=s.r=s.a.c
case 8:g=$.l_()
g.bih(h)
B.cuT(s.r)
if(s.a.f)g.VY()
p=B.a7q(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mL(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.K()
s.w=h.gwY()
r="ice"
s.a.toString
h=$.K()
o=h.Wz()
n=s.Jl()
x=12
return A.e(o,$async$t8)
case 12:m=a1
l=B.cEq(m)
x=15
return A.e(n,$async$t8)
case 15:x=!a1?13:14
break
case 13:if(s.c==null){x=1
break}s.k(new B.bum(s))
x=16
return A.e(A.jT(C.nh,null,y.z),$async$t8)
case 16:if(s.c==null){x=1
break}s.mL(null)
x=1
break
case 14:r="webrtc"
h=s.d
h===$&&A.d()
f=s.a.d
x=17
return A.e(h.AB(A.a6(["iceServers",l.a],y.N,y.z),f==="video"),$async$t8)
case 17:h.f=new B.bun(s)
h.r=new B.buo(s)
h.w=new B.bup(s)
if(s.c==null){x=1
break}s.k(new B.buq(s))
g.bov()
s.cy=A.hg(C.ce,new B.bur(s))
h=s.e
h===$&&A.d()
g=h.r
s.db=new A.ca(g,A.x(g).i("ca<1>")).cQ(s.gaop())
g=h.w
s.dx=new A.ca(g,A.x(g).i("ca<1>")).cQ(new B.bus())
s.a.toString
g=$.K()
k=g.b
if(k!=null&&J.a7(k)!==0){s.a.toString
$.K()
h.Vv(C.d.jg("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.dG(C.bL,k,C.a6,!0))}s.CW=A.hg(C.fY,new B.but(s))
s.yp()
u=2
x=6
break
case 4:u=3
d=t
j=A.N(d)
i=A.bp(d)
if(s.c==null){x=1
break}A.tf().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.dd?j.a:s.b_Y(r)
h.u(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
s.mL(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$t8,w)},
b_Y(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Jl(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Jl=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a0z(),$async$Jl)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.Fq(s.a.d==="video"),$async$Jl)
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
return A.j($async$Jl,w)},
a0z(){var x=0,w=A.k(y.y),v
var $async$a0z=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0z,w)},
yp(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$yp=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.K()
x=7
return A.e(p.bX("/messagerie/appels/"+s.r+"/signaux"),$async$yp)
case 7:r=e
for(p=J.ar(r);p.B();){q=p.gJ(p)
s.aoq(B.cge(q))}u=2
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
return A.j($async$yp,w)},
aoq(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.t(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cvI(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.E6(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aL(new B.buL(s),y.a).fJ(new B.buM(s))
break
case"reponse":if(!s.a.f)return
u=B.cvI(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.V3(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aL(new B.buN(s),y.a).fJ(new B.buO(s))
break
case"candidat_ice":t=B.cV3(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.UZ(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Lp().aL(new B.buP(s),y.a).fJ(new B.buQ(s))
break
case"refuse":s.mL(A.b("Appel refus\xe9"))
break
case"annule":s.mL(A.b("Appel annul\xe9"))
break
case"termine":s.mL(A.b("Appel termin\xe9"))
break}},
T8(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$T8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.Y(0)
t=u.dy
t===$&&A.d()
t.it()
u.k(new B.buy(u,!1))
t=$.l_()
t.bqn()
s=u.Q
t.a95(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$T8,w)},
yf(d,e,f){return this.aR_(d,e,f)},
ah9(d,e){return this.yf(d,e,!0)},
aR_(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$yf=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.K()
x=6
return A.e(s.asy(t.r,e,d),$async$yf)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mL(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$yf,w)},
Jx(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Jx=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.Y(0)
r=s.dy
r===$&&A.d()
r.it()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.K()
x=9
return A.e(q.LT(r,"termine"),$async$Jx)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.c85()
$.l_().NW()
r=s.c
if(r!=null)A.a1(r,!1).bO()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jx,w)},
alO(){var x=this
if(!x.x||x.y)return
$.l_().brF()
x.k(new B.buz(x))
$.aO.aG$.push(new B.buA(x))},
mL(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.Y(0)
x=v.dy
x===$&&A.d()
x.it()
x=v.r
if(x.length!==0){v.a.toString
w=$.K()
w.LT(x,"termine").fJ(new B.buK())}if(d!=null&&v.c!=null)v.c.u(y.q).f.v(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))
B.c85()
$.l_().NW()
x=v.c
if(x!=null)A.a1(x,!1).bO()},
Qe(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Qe=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_q(u),$async$Qe)
case 2:if(v.c!=null)v.k(new B.bui(v,u))
$.l_().a95(v.as,u)
return A.i(null,w)}})
return A.j($async$Qe,w)},
Qd(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Qd=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.GE(u),$async$Qd)
case 2:if(v.c!=null)v.k(new B.buh(v,u))
$.l_().a95(u,v.Q)
return A.i(null,w)}})
return A.j($async$Qd,w)},
Qa(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Qa=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_n(u),$async$Qa)
case 2:if(v.c!=null)v.k(new B.bug(v,u))
return A.i(null,w)}})
return A.j($async$Qa,w)},
Qb(){var x=0,w=A.k(y.H),v=this,u
var $async$Qb=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.Va(),$async$Qb)
case 2:return A.i(null,w)}})
return A.j($async$Qb,w)},
anA(){var x,w=this,v="Appel en cours\u2026",u=w.fx
if(u!=null)return u
if(w.x){u=A.b(v)
x=C.c.ae(w.ch.a,1e6)
return u+" "+(C.d.aV(C.c.l(C.c.ae(x,60)),2,"0")+":"+C.d.aV(C.c.l(C.c.a0(x,60)),2,"0"))}if(w.z)return w.a.f?A.b("\xc7a sonne\u2026"):A.b(v)
return A.b("Connexion\u2026")},
bdb(){var x,w=null,v=this.c
v.toString
x=A.b("La vid\xe9o n\u2019est pas disponible pendant un appel audio.")
v.u(y.q).f.v(A.z(w,w,w,w,w,C.h,w,A.c(x,w,w,w,w,w,w,w,w),w,C.l,w,w,w,w,w,w,w,w,w))},
b2C(){var x,w=this,v=null,u=A.a([],y.p)
if(w.a.d==="video")u.push(A.bR(!1,v,v,v,!0,v,v,!0,!1,D.a7b,v,v,v,new B.buv(w),!1,v,v,v,v,v,A.c(A.b("Basculer"),v,v,v,v,C.dv,v,v,v),v,v))
if(w.x)u.push(A.bR(!1,v,v,v,!0,v,v,!0,!1,D.a6V,v,v,v,new B.buw(w),!1,v,v,v,v,v,A.c(A.b("R\xe9duire"),v,v,v,v,C.dv,v,v,v),v,v))
if(u.length===0)return
x=w.c
x.toString
A.je(D.zK,new B.bux(u),x,!1,v,y.H)},
D(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.d()
x=o.c
w=q.go
v=q.a
if(v.d==="video"&&q.z){if(x!=null)x=B.cg2(o.e,!1,D.P9)
else{x=v.e
v=v.r
u=q.fy&&q.x
x=A.cy(A.I(A.a([new B.NP(x,v,u,56,p),C.q,B.ctD(x,22),C.k,A.c(q.anA(),p,p,p,p,D.wA,p,p,p)],y.p),C.n,C.f,C.O),p,p)}o=A.a([A.Er(0,x),A.f5(p,A.eI(A.O(12),B.cg2(o.d,!0,D.P9),C.ap),160,p,p,16,16,110)],y.p)
if(q.x)o.push(A.f5(p,new B.Z7(q.galN(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.f5(24,B.crC(q.ax,!0,v,x,q.gaeg(),q.gaeh(),q.gaei(),q.gakS(),q.galr(),q.gapu(),!0),p,p,0,0,p,p))
o=A.e2(C.aP,o,C.h,C.aH,p)}else{x=y.p
v=A.a([],x)
if(q.fy)v.push(A.f5(p,A.rg(B.cg2(o.e,!1,D.vj),0),1,p,0,p,0,1))
if(q.x)v.push(A.f5(p,new B.Z7(q.galN(),p),p,p,16,p,16,p))
o=B.ctD(q.a.e,24)
u=A.c(q.anA(),p,p,p,p,D.wA,C.X,p,p)
t=q.a
s=t.e
t=t.r
t=A.a9(A.cy(new B.NP(s,t,q.fy&&q.x,88,p),p,p),1,p)
s=q.Q
r=q.as
v.push(A.I(A.a([C.q,o,C.k,new A.Y(D.rR,u,p),t,B.crC(q.ax,!1,r,s,q.gaeg(),q.gaeh(),q.gaei(),q.gakS(),q.galr(),q.gapu(),q.x),C.q],x),C.n,C.f,C.i))
v=A.e2(C.aP,v,C.h,C.aH,p)
o=v}return A.cfN(w,A.e1(p,C.o,A.ft(!0,o,!0,C.a_,!0,!0),p,p,p),new B.buR(q),y.K)}}
B.akv.prototype={
D(d){var x,w,v=this,u=null,t=A.O(28),s=A.a9(new B.A4(D.a4X,v.e,A.b("Haut-parleur"),v.x,u,u),1,u),r=v.f?D.BX:D.a4W,q=A.b("Appel vid\xe9o")
r=A.a9(new B.A4(r,!1,q,v.c?v.y:v.z,u,u),1,u)
q=v.d
x=q?D.a4S:D.a4R
w=y.p
q=A.P(A.a([s,r,A.a9(new B.A4(x,q,A.b("Muet"),v.w,u,u),1,u)],w),C.n,C.f,C.i,u)
x=A.b("Plus")
return A.S(u,A.I(A.a([q,C.q,A.P(A.a([A.a9(new B.A4(C.BU,!1,x,v.r?v.Q:u,u,u),1,u),A.a9(new B.A4(D.BN,!1,A.b("Terminer"),v.as,C.aG,u),1,u),D.a3I],w),C.n,C.f,C.i,u)],w),C.n,C.f,C.O),C.j,u,u,new A.a4(D.zK,u,u,t,u,u,C.v),u,u,u,C.AT,D.a3q,u,u,u)}}
B.Z7.prototype={
D(d){var x=null
return A.I(A.a([A.ab(A.b2(!1,D.a6U,C.j,x,C.p,x,x,x,x,this.c,x,A.dl(C.kQ,x,x,C.a_,C.cK,x)),48,48),C.I,A.c(A.b("R\xe9duire"),x,x,x,x,C.Rw,x,x,x)],y.p),C.n,C.f,C.O)}}
B.A4.prototype={
D(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.m:C.kQ
if(!r)x=C.m
else x=u.d?C.o:C.m
r=u.f
w=r==null?0.4:1
v=A.dl(s,t,t,C.a_,C.cK,t)
return A.rg(A.I(A.a([A.ab(A.b2(!1,A.c1(u.c,x,t,30),C.j,t,C.p,t,t,t,t,r,t,v),72,72),C.k,A.c(u.e,t,t,t,t,C.wC,C.X,t,t)],y.p),C.n,C.f,C.O),w)}}
B.NP.prototype={
P(){return new B.ap8(null,null)}}
B.ap8.prototype={
S(){var x,w=this
w.W()
x=A.cq(null,A.cU(0,0,w.a.e?1100:2400,0,0),null,1,null,w)
x.a9X(0,!0)
w.d!==$&&A.aK()
w.d=x},
aU(d){var x,w
this.bf(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.d()
w.e=A.cU(0,0,x?1100:2400,0,0)
w.a9X(0,!0)}},
m(){var x=this.d
x===$&&A.d()
x.m()
this.aFI()},
D(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.d()
x=u.d
u=x!=null?A.jO(v,x,v,v,t):A.jO(C.t,v,A.c(B.caW(u.c),v,v,v,v,A.c8(v,v,C.o,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.A,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),v,t)
return A.ab(A.ib(q,new B.bQL(w,s),u),r,r)}}
B.a5P.prototype={
m(){var x=this,w=x.bS$
if(w!=null)w.T(0,x.ghM())
x.bS$=null
x.a3()},
ce(){this.dc()
this.d0()
this.hN()}}
B.b35.prototype={
Fq(d){return this.bqc(d)},
bqc(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$Fq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jA(0),$async$Fq)
case 3:$.cjh()
s=y.N
r=A.a6(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aTm().Gr(0,A.a6(["audio",r,"video",d&&A.a6(["facingMode","user"],s,s)],s,y.z)),$async$Fq)
case 4:q=f
u.b=q
t.sacb(0,q)
case 1:return A.i(v,w)}})
return A.j($async$Fq,w)},
AB(d,e){return this.bqX(d,e)},
bqX(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$AB=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jA(0),$async$AB)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.Fq(e),$async$AB)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.cjh().a71(d,A.C(y.N,y.z)),$async$AB)
case 6:t=v.a=g
s=u.abn(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a5S(0,s[q],u),$async$AB)
case 10:case 8:s.length===r||(0,A.R)(s),++q
x=7
break
case 9:t.e=new B.b36(v)
t.Q=new B.b37(v)
t.d=new B.b38(v)
return A.i(null,w)}})
return A.j($async$AB,w)},
aOU(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sacb(0,d)
w.Hi()
x=w.r
if(x!=null)x.$0()}},
Hi(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$Hi=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.Oz(0)
if(m==null)m=C.dm
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aVC(n,s),$async$Hi)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.N(l)
A.tf().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.R)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$Hi,w)},
Lp(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Lp=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.VK(0),$async$Lp)
case 3:t=e
x=4
return A.e(s.GF(0,t),$async$Lp)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Lp,w)},
E6(d){return this.bhG(d)},
bhG(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$E6=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.GH(0,new B.Ey(d.h(0,"sdp"),d.h(0,"type"))),$async$E6)
case 3:x=4
return A.e(s.VH(0),$async$E6)
case 4:t=f
x=5
return A.e(s.GF(0,t),$async$E6)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$E6,w)},
V3(d){return this.bev(d)},
bev(d){var x=0,w=A.k(y.H),v=this,u
var $async$V3=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.GH(0,new B.Ey(d.h(0,"sdp"),d.h(0,"type"))),$async$V3)
case 2:return A.i(null,w)}})
return A.j($async$V3,w)},
UZ(d){return this.beg(d)},
beg(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$UZ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.UM(new B.KJ(A.an(d.h(0,"candidate")),A.an(d.h(0,"sdpMid")),A.dW(d.h(0,"sdpMLineIndex")))),$async$UZ)
case 3:case 1:return A.i(v,w)}})
return A.j($async$UZ,w)},
a_q(d){return this.aA0(d)},
aA0(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$a_q=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Oz(0)
if(r==null)r=C.dm
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.R)(r),++s)r[s].slV(0,t)
return A.i(null,w)}})
return A.j($async$a_q,w)},
GE(d){return this.azR(d)},
azR(d){var x=0,w=A.k(y.H),v=this
var $async$GE=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.adA(d),$async$GE)
case 2:x=3
return A.e(v.Hi(),$async$GE)
case 3:return A.i(null,w)}})
return A.j($async$GE,w)},
a_n(d){return this.azH(d)},
azH(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$a_n=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.OM(0)
if(s==null)s=C.dm
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.R)(s),++t)s[t].slV(0,d)
return A.i(null,w)}})
return A.j($async$a_n,w)},
Va(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Va=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.OM(0)
if(s==null)s=D.am6
if(s.length===0){x=1
break}x=3
return A.e(B.ceY(C.b.gU(s)),$async$Va)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Va,w)},
hr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hr=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.adA(!1),$async$hr)
case 7:u=2
x=6
break
case 4:u=3
i=t
x=6
break
case 3:x=2
break
case 6:u=9
p=s.a
p=p==null?null:p.ab(0)
x=12
return A.e(y.x.b(p)?p:A.dw(p,y.H),$async$hr)
case 12:u=2
x=11
break
case 9:u=8
h=t
x=11
break
case 8:x=2
break
case 11:s.a=null
p=s.b
p=p==null?null:p.abn(0)
if(p==null)p=C.dm
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cCV(r)
if(!m.b(k)){j=new A.aC($.aL,n)
j.a=8
j.c=k
k=j}x=20
return A.e(k,$async$hr)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:case 14:p.length===o||(0,A.R)(p),++l
x=13
break
case 15:s.b=null
u=22
x=25
return A.e(s.d.m(),$async$hr)
case 25:u=2
x=24
break
case 22:u=21
f=t
x=24
break
case 21:x=2
break
case 24:u=27
x=30
return A.e(s.e.m(),$async$hr)
case 30:u=2
x=29
break
case 27:u=26
e=t
x=29
break
case 26:x=2
break
case 29:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$hr,w)}}
B.a8P.prototype={
Vv(d){return this.bfW(d)},
bfW(d){var x=0,w=A.k(y.H),v=this
var $async$Vv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Hg(),$async$Vv)
case 2:return A.i(null,w)}})
return A.j($async$Vv,w)},
Hg(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Hg=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a7(r)===0){x=1
break}u=4
q=B.cD0(B.cdU(A.cI(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Hg)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cP(p,A.x(p).i("cP<1>")).b7(s.gb5A(),!0,s.gb4_(),new B.aDO(s))
u=2
x=6
break
case 4:u=3
n=t
s.a3P()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Hg,w)},
b5B(d){var x,w,v,u
try{x=C.Z.cK(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.r(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.cge(w))}catch(u){}},
a3P(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.agz[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.du(A.cU(0,0,0,0,x),new B.aDP(w))},
Ly(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Ly=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$Ly)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.b_()
r=s.w=new B.aun(s,q)}s=r.ab(0)}x=7
return A.e(y._.b(s)?s:A.dw(s,y.z),$async$Ly)
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
return A.j($async$Ly,w)}}
B.acJ.prototype={
uf(d){return this.bnH(d)},
bnH(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$uf=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.Bk():r).aW(0),$async$uf)
case 6:x=7
return A.e(t.a.a_m(d),$async$uf)
case 7:x=8
return A.e(t.a.jl(C.K2),$async$uf)
case 8:x=9
return A.e(t.a.im(1),$async$uf)
case 9:x=10
return A.e(t.a.cW(0),$async$uf)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.N(p)
A.tf().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$uf,w)},
it(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$it=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aW(0)
x=6
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$it)
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
return A.j($async$it,w)},
hr(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hr=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.m()
x=6
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$hr)
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
return A.j($async$hr,w)}}
B.aYO.prototype={
a71(d,e){return this.bhv(d,e)},
bhv(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a71=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.a([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fT(u,y.N,y.z)
t.q(0,d)
s=new r(y.m.a(A.cd(t)))
t=J.l(s)
v=B.cKx(C.cj.gkr().bi(new A.eJ(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a71,w)}}
B.ut.prototype={
Oz(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.da(w,A.W(w).i("da<1,aE>"))
J.hv(w,new B.aTC(x))
return x},
OM(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.da(w,A.W(w).i("da<1,aE>"))
J.hv(w,new B.aTD(x))
return x},
abn(d){var x=A.G(this.Oz(0),!0,y.G)
C.b.q(x,this.OM(0))
return x}}
B.adc.prototype={
aH3(d){var x=this,w=x.d
w.addEventListener("ended",A.c0(new B.aTz(x)))
w.addEventListener("mute",A.c0(new B.aTA(x)))
w.addEventListener("unmute",A.c0(new B.aTB(x)))},
slV(d,e){this.d.enabled=e},
V4(d,e){return this.bey(0,e)},
bey(d,e){var x=0,w=A.k(y.H),v=this
var $async$V4=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.ei(v.d.applyConstraints(y.m.a(A.cd(e))),y.X),$async$V4)
case 2:return A.i(null,w)}})
return A.j($async$V4,w)},
aW(d){var x=0,w=A.k(y.H),v=this
var $async$aW=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aW,w)}}
B.aTm.prototype={
Gr(d,e){return this.ayN(0,e)},
ayN(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Gr=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cXv())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.jj(e.h(0,"video"),"facingMode")
e.cT(0,"video",new B.aTo())
e.cT(0,"audio",new B.aTp())}catch(a0){A.oY("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hd(e.h(0,"audio"),i,i).aD(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.hv(s,new B.aTq(r))
J.jj(e.h(0,"audio"),"optional")
J.jI(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bp(a0)
A.oY("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.cd(e)
x=10
return A.e(A.ei(o.getUserMedia(h.a(n)),h),$async$Gr)
case 10:m=a2
v=new B.ut(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.ei(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Gr)
case 11:l=a2
v=new B.ut(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.N(f)
i=J.l(k)
throw A.o("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gr,w)}}
B.af4.prototype={
aHc(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.c0(new B.aYQ(x)))
w.addEventListener("icecandidate",A.c0(new B.aYR(x)))
w.addEventListener("iceconnectionstatechange",A.c0(new B.aYS(x)))
w.onicegatheringstatechange=A.c0(new B.aYT(x))
w.addEventListener("signalingstatechange",A.c0(new B.aYU(x)))
if(!$.cj2())w.addEventListener("connectionstatechange",A.c0(new B.aYV(x)))
w.addEventListener("negotiationneeded",A.c0(new B.aYW(x)))
w.addEventListener("track",A.c0(new B.aYX(x)))},
VK(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.ei(s.createOffer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$VK)
case 3:t=f
v=new B.Ey(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$VK,w)},
VH(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VH=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.ei(s.createAnswer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$VH)
case 3:t=f
v=new B.Ey(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$VH,w)},
GF(d,e){return this.azV(0,e)},
azV(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.ei(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$GF)
case 2:return A.i(null,w)}})
return A.j($async$GF,w)},
GH(d,e){return this.aAa(0,e)},
aAa(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GH=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.ei(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$GH)
case 2:return A.i(null,w)}})
return A.j($async$GH,w)},
UM(d){return this.bdT(d)},
bdT(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$UM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.ei(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$UM)
case 2:return A.i(null,w)}})
return A.j($async$UM,w)},
ab(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$ab=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$ab,w)},
a5S(d,e,f){return this.be9(0,e,f)},
be9(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a5S=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.af5()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5S,w)}}
B.af5.prototype={}
B.cg1.prototype={
aW(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aW=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.o("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aW,w)}}
B.Vc.prototype={
sauT(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Mc()
if(x!=null)x.style.objectFit=e},
aoy(){var x=this,w=x.Mc(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sn(0,v.arA(u,x.z!=null,0,t))},
sacb(d,e){var x,w,v,u,t=this
t.z=e
if(e.OM(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ar(y.l.b(x)?x:new A.da(x,A.W(x).i("da<1,aE>")))
for(;x.B();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.Oz(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ar(y.l.b(x)?x:new A.da(x,A.W(x).i("da<1,aE>")))
for(;x.B();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aQN()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Mc()
if(u!=null){u.srcObject=t.x
x=t.Mc()
x.toString
t.ae3(x)}t.sn(0,t.a.bgj(t.z!=null))},
aQN(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Mc(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.R)(t),++r)t[r].Y(0)
q=u.Mc()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eY()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$m,w)},
jA(d){var x=0,w=A.k(y.H),v=this
var $async$jA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.GW()
$.qt().uv("RTCVideoRenderer-"+v.Q,new B.aZ2(v),!0)
return A.i(null,w)}})
return A.j($async$jA,w)},
ae3(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Ve.prototype={
P(){return new B.Vf()}}
B.Vf.prototype={
S(){var x,w,v=this
v.W()
v.a.c.aj(0,v.gb1K())
x=v.a
w=x.c
w.as=x.e
w.sauT(0,x.d===D.vj?"contain":"cover")},
b1L(){if(this.c!=null)this.k(new B.aZ3())},
m(){if(this.c!=null)this.a3()},
aU(d){var x,w
this.bf(d)
A.du(A.cU(0,0,10,0,0),new B.aZ5(this))
x=this.a
w=x.c
w.sauT(0,x.d===D.vj?"contain":"cover")},
D(d){return new A.iF(new B.aZ4(this),null)}}
B.abl.prototype={
aGL(d,e,f,g){var x=this,w=$.aL
x.a!==$&&A.aK()
x.a=new B.a0y(d,x,new A.bf(new A.aC(w,y.c),y.r),e,g.i("a0y<0>"))
if(f.a.gjc())f.a=new B.WR(g.i("@<0>").cc(g).i("WR<1,2>")).hO(f.a)
w=A.h5(null,new B.aMo(f,x),null,!0,g)
x.b!==$&&A.aK()
x.b=w},
akI(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.ab(0)}}
B.a0y.prototype={
E(d,e){if(this.e)throw A.o(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dz(d,e){if(this.e)throw A.o(A.am("Cannot add event after closing."))
if(this.d)return
this.aTJ(d,e)},
i8(d){return this.dz(d,null)},
aTJ(d,e){var x=this
if(x.w){x.a.a.dz(d,e)
return}x.c.hl(d,e)
x.akJ()
x.b.akI()
x.a.a.ab(0).fJ(new B.bA5())},
ab(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.akI()
x.c.cI(0,x.a.a.ab(0))}return x.c.a},
akJ(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dP(0)
return},
$ie7:1}
B.ahs.prototype={}
B.aht.prototype={}
B.Br.prototype={
afy(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.HH(d,e))
x.ab(0)},
abF(d){var x
if((this.b.b&4)!==0)throw A.o(B.cgI())
x=A.cd(d)
x.toString
this.a.send(x)},
zi(d,e,f){return this.bfF(0,e,f)},
bfF(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$zi=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.o(B.cgI())
u.ab(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$zi,w)},
$icgH:1}
B.vq.prototype={}
B.M0.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.M0&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.Hf.prototype={
p(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Hf&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gI(d){return A.hK(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.HH.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.HH&&e.a===this.a&&e.b===this.b},
gI(d){return A.hK([this.a,this.b])},
l(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.MB.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibK:1}
B.MA.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.axR.prototype={
aGt(d){d.ft(new B.axV(this),new B.axW(this),y.a)}}
B.aun.prototype={
ab(d){var x=this.b
x.e=x.d=null
return this.aBT(0)}}
B.aiP.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibK:1}
B.z8.prototype={
O(){return"RTCSignalingState."+this.b}}
B.V8.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.z7.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.oo.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.af6.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.aYN.prototype={}
B.TC.prototype={}
B.JT.prototype={
l(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aTl.prototype={}
B.KJ.prototype={}
B.V9.prototype={}
B.Va.prototype={}
B.aYY.prototype={}
B.Ey.prototype={}
B.Vb.prototype={}
B.Vd.prototype={
arA(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Vd(x,w,v)},
bgj(d){return this.arA(null,d,null,null)},
l(d){var x=this
return A.ae(x).l(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(LC)","bz(KJ)","bz(Vb)","bz(oo)","~(@)","ut(@)","bz(cgH)","~(vq)"])
B.b3I.prototype={
$0(){return J.cCf(this.a.bm())},
$S:1}
B.b3J.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.i.b(u)){x=u
w=A.bp(v)
this.b.dz(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c9U.prototype={
$1(d){var x,w,v,u=$.K().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Z.dH(A.a6(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:26}
B.c9T.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.aA4.prototype={
$1(d){if(d==null)return null
return A.bQ(J.l(d))},
$S:116}
B.bv0.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.JD(!0)},
$S:0}
B.bv1.prototype={
$1(d){return this.a.Uz()},
$S:27}
B.buY.prototype={
$0(){var x=this.a.c
if(x!=null)A.a1(x,!1).bO()},
$S:0}
B.buZ.prototype={
$0(){return this.a.e=!0},
$S:0}
B.buV.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buW.prototype={
$0(){return this.a.d=!1},
$S:0}
B.buX.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buS.prototype={
$0(){return this.a.f=!0},
$S:0}
B.buT.prototype={
$0(){return this.a.f=!1},
$S:0}
B.buU.prototype={
$1(d){var x=null,w=this.a.a,v=w.c,u=w.e,t=w.d
return B.cex(w.w,x,v,w.y,t,x,x,x,!1,u)},
$S:1210}
B.bv_.prototype={
$0(){return this.a.b5S()},
$S:0}
B.buD.prototype={
$1(d){this.a.yf("candidat_ice",d,!1)},
$S:245}
B.buE.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.buC(x))},
$S:0}
B.buC.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.buF.prototype={
$0(){this.a.mL(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buG.prototype={
$0(){},
$S:0}
B.buH.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.buB(x,w))},
$S:27}
B.buB.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).eu(this.b)},
$S:0}
B.buI.prototype={
$1(d){},
$S:136}
B.buJ.prototype={
$1(d){this.a.yp()},
$S:27}
B.bul.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.yf("annule",C.bn,!1)
x.mL(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bum.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bun.prototype={
$1(d){this.a.yf("candidat_ice",d,!1)},
$S:245}
B.buo.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.buk(x))},
$S:0}
B.buk.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bup.prototype={
$0(){this.a.mL(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buq.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bur.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.buj(x,w))},
$S:27}
B.buj.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).eu(this.b)},
$S:0}
B.bus.prototype={
$1(d){},
$S:136}
B.but.prototype={
$1(d){this.a.yp()},
$S:27}
B.buL.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.T8()
x.ah9("reponse",d)},
$S:409}
B.buM.prototype={
$1(d){this.a.mL(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buN.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.T8()},
$S:32}
B.buO.prototype={
$1(d){this.a.mL(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buP.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.ah9("offre",d)},
$S:409}
B.buQ.prototype={
$1(d){this.a.mL(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buy.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.au(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.buz.prototype={
$0(){return this.a.go=!0},
$S:0}
B.buA.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a1(x,!1).bO()},
$S:5}
B.buK.prototype={
$1(d){return A.C(y.N,y.z)},
$S:105}
B.bui.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.buh.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bug.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.buv.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a1(w,!1).bO()
x.Qb()},
$S:0}
B.buw.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a1(w,!1).XZ().aL(new B.buu(x),y.H)},
$S:0}
B.buu.prototype={
$1(d){return this.a.alO()},
$S:9}
B.bux.prototype={
$1(d){return A.ft(!0,A.I(this.a,C.n,C.f,C.O),!0,C.a_,!0,!0)},
$S:133}
B.buR.prototype={
$2(d,e){if(!d)this.a.Jx()},
$S:1214}
B.bQL.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.d()
s=s.x
s===$&&A.d()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.cqX(A.S(u,u,C.j,u,u,new A.a4(u,u,A.bl(C.t.b2(t*(1-s)),3),u,u,u,C.aI),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.S(u,u,C.j,u,u,new A.a4(u,u,A.bl(C.t,2),u,u,u,C.aI),u,w,u,u,u,u,u,w)
e.toString
return A.e2(C.a5,A.a([s,w,e],y.p),C.h,C.aH,u)},
$S:1215}
B.b36.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b37.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gU(x):null
if(w!=null)this.a.aOU(w)},
$S:z+4}
B.b38.prototype={
$1(d){var x
if(d===D.P0){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aDO.prototype={
$1(d){return this.a.a3P()},
$S:22}
B.aDP.prototype={
$0(){var x=this.a
if(!x.e)x.Hg()},
$S:0}
B.caX.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTC.prototype={
$1(d){return this.a.push(B.cfm(d))},
$S:22}
B.aTD.prototype={
$1(d){return this.a.push(B.cfm(d))},
$S:22}
B.aTz.prototype={
$1(d){},
$S:28}
B.aTA.prototype={
$1(d){},
$S:28}
B.aTB.prototype={
$1(d){},
$S:28}
B.aTo.prototype={
$0(){return!1},
$S:51}
B.aTp.prototype={
$0(){return!1},
$S:51}
B.aTq.prototype={
$1(d){J.hv(d,new B.aTn(this.a))},
$S:245}
B.aTn.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:55}
B.aYQ.prototype={
$1(d){},
$S:28}
B.aYR.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.KJ(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:28}
B.aYS.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cX3(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.cj2())switch(w.cx.a){case 0:w.cy=D.P5
break
case 1:w.cy=D.P6
break
case 3:w.cy=D.P7
break
case 5:w.cy=D.P3
break
case 6:w.cy=D.P4
break
case 7:w.cy=D.vi
break
default:break}},
$S:35}
B.aYT.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cX4(w.iceGatheringState)},
$S:35}
B.aYU.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cZg(w.signalingState)},
$S:35}
B.aYV.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cYp(w.connectionState)},
$S:35}
B.aYW.prototype={
$1(d){},
$S:35}
B.aYX.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.cfm(d.track)
x=d.streams
x=y.l.b(x)?x:new A.da(x,A.W(x).i("da<1,aE>"))
w=J.ds(x,new B.aYP(w),y.h)
v.$1(new B.Vb(A.G(w,!0,w.$ti.i("aD.E"))))}},
$S:28}
B.aYP.prototype={
$1(d){return new B.ut(d,this.a.as)},
$S:z+7}
B.cb5.prototype={
$1(d){return J.ha(self.window.navigator.userAgent,A.bD(d,!1,!1))},
$S:8}
B.aZ2.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.R)(w),++u)w[u].Y(0)
C.b.a1(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.ae3(t)
v=y.k.c
w.push(A.iN(t,"canplay",new B.aYZ(x),!1,v))
w.push(A.iN(t,"resize",new B.aZ_(x),!1,v))
w.push(A.iN(t,"error",new B.aZ0(t),!1,v))
w.push(A.iN(t,"ended",new B.aZ1(),!1,v))
return t},
$S:176}
B.aYZ.prototype={
$1(d){this.a.aoy()},
$S:22}
B.aZ_.prototype={
$1(d){this.a.aoy()},
$S:22}
B.aZ0.prototype={
$1(d){var x,w,v=this.a.error
A.oY("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.K8.h(0,A.ax(v,"code"))
x.toString
w=!J.r(A.ax(v,"message"),"")?A.ax(v,"message"):"No further diagnostic information can be determined or provided."
throw A.o(A.oi(x,C.K7.h(0,A.ax(v,"code")),w,null))},
$S:26}
B.aZ1.prototype={
$1(d){},
$S:22}
B.aZ3.prototype={
$0(){},
$S:0}
B.aZ5.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aZ4.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.abC("RTCVideoRenderer-"+w.Q)
else w=A.S(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cy(A.S(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1216}
B.aMo.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fM(w.gir(w),new B.aMn(v),w.gpC())},
$S:0}
B.aMn.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.akJ()
x=x.b
x===$&&A.d()
x.ab(0)},
$S:0}
B.bA5.prototype={
$1(d){},
$S:17}
B.aCl.prototype={
$1(d){this.a.cI(0,this.b)},
$S:28}
B.aCm.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hB(new B.MB("Failed to connect WebSocket"))
else this.b.afy(1006,"error")},
$S:28}
B.aCn.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cE("data")
if(typeof x==="string")w.b=new B.M0(A.br(x))
else if(typeof x==="object"&&A.cnZ(y.m.a(x),"ArrayBuffer"))w.b=new B.Hf(A.U3(y.o.a(x),0,null))
else throw A.o(A.am("unexpected message type: "+J.aI(x).l(0)))
v.E(0,w.bm())},
$S:26}
B.aCo.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cI(0,this.b)
this.b.afy(d.code,d.reason)},
$S:28}
B.axV.prototype={
$1(d){var x=d.b,w=this.a
new A.cP(x,A.x(x).i("cP<1>")).cQ(new B.axS(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cP(x,A.x(x).i("cP<1>")).bnX(new B.axT(d),new B.axU(w,d))
w.f.dP(0)},
$S:z+8}
B.axS.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.M0
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.Hf
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.HH){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.ab(0)}}},
$S:z+9}
B.axT.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.cgI())
s=A.cd(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.abF(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.abF(new Uint8Array(A.c2(u)))
break $label1$1}t=A.aV("Cannot send "+J.aI(d).l(0))
throw A.o(t)}}catch(r){if(!(A.N(r) instanceof B.MA))throw r}},
$S:18}
B.axU.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.zi(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.N(q) instanceof B.MA))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.axW.prototype={
$1(d){var x,w=d instanceof A.XT?d:new B.aiP(J.l(d)),v=this.a
v.f.hB(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.i8(w)
v=v.a
v===$&&A.d()
v.ab(0)},
$S:35};(function aliases(){var x=B.Ih.prototype
x.aBT=x.ab
x=B.a5P.prototype
x.aFI=x.m})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.a_F.prototype,"gaHW","H3",0)
var v
w(v=B.a_E.prototype,"gaop","aoq",2)
x(v,"galr","Jx",0)
x(v,"galN","alO",1)
x(v,"gaei","Qe",0)
x(v,"gaeh","Qd",0)
x(v,"gaeg","Qa",0)
x(v,"gapu","bdb",1)
x(v,"gakS","b2C",1)
w(v=B.a8P.prototype,"gb5A","b5B",6)
x(v,"gb4_","a3P",1)
x(B.Vc.prototype,"gec","m",0)
x(B.Vf.prototype,"gb1K","b1L",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.ac,[B.Ih,B.aA3,B.LC,B.a92,B.b35,B.a8P,B.acJ,B.aYN,B.TC,B.JT,B.aTl,B.V9,B.Va,B.aYY,B.aht,B.a0y,B.ahs,B.Br,B.vq,B.MB,B.aiP,B.KJ,B.Ey,B.Vb,B.Vd])
v(B.WR,A.h6)
w(A.kp,[B.b3I,B.c9T,B.bv0,B.buY,B.buZ,B.buV,B.buW,B.buX,B.buS,B.buT,B.bv_,B.buE,B.buC,B.buF,B.buG,B.buB,B.bul,B.bum,B.buo,B.buk,B.bup,B.buq,B.buj,B.buy,B.buz,B.bui,B.buh,B.bug,B.buv,B.buw,B.aDP,B.aTo,B.aTp,B.aZ3,B.aZ5,B.aMo,B.aMn,B.axU])
w(A.jP,[B.b3J,B.c9U,B.aA4,B.bv1,B.buU,B.buD,B.buH,B.buI,B.buJ,B.bun,B.bur,B.bus,B.but,B.buL,B.buM,B.buN,B.buO,B.buP,B.buQ,B.buA,B.buK,B.buu,B.bux,B.b36,B.b37,B.b38,B.aDO,B.caX,B.aTC,B.aTD,B.aTz,B.aTA,B.aTB,B.aTq,B.aYQ,B.aYR,B.aYS,B.aYT,B.aYU,B.aYV,B.aYW,B.aYX,B.aYP,B.cb5,B.aZ2,B.aYZ,B.aZ_,B.aZ0,B.aZ1,B.bA5,B.aCl,B.aCm,B.aCn,B.aCo,B.axV,B.axS,B.axT,B.axW])
w(A.T,[B.qT,B.qS,B.NP,B.Ve])
w(A.Z,[B.a_F,B.a_E,B.a5P,B.Vf])
w(A.aw,[B.Z6,B.akv,B.Z7,B.A4])
w(A.tD,[B.buR,B.bQL,B.aTn,B.aZ4])
v(B.ap8,B.a5P)
v(B.aYO,B.aYN)
v(B.ut,B.TC)
v(B.adc,B.JT)
v(B.aTm,B.aTl)
v(B.af4,B.V9)
v(B.af5,B.Va)
v(B.cg1,B.aYY)
v(B.Vc,A.dv)
w(B.aht,[B.abl,B.axR])
w(B.vq,[B.M0,B.Hf,B.HH])
v(B.MA,B.MB)
v(B.aun,B.Ih)
w(A.N7,[B.z8,B.V8,B.z7,B.oo,B.af6])
x(B.a5P,A.h4)})()
A.oQ(b.typeUniverse,JSON.parse('{"Ih":{"e7":["1"]},"WR":{"h6":["1","2"],"h6.S":"1","h6.T":"2"},"NP":{"T":[],"q":[]},"qT":{"T":[],"q":[]},"a_F":{"Z":["qT"]},"Z6":{"aw":[],"q":[]},"qS":{"T":[],"q":[]},"a_E":{"Z":["qS"]},"akv":{"aw":[],"q":[]},"Z7":{"aw":[],"q":[]},"A4":{"aw":[],"q":[]},"ap8":{"Z":["NP"]},"ut":{"TC":[]},"adc":{"JT":[]},"af4":{"V9":[]},"af5":{"Va":[]},"Vc":{"dv":["Vd"],"b1":[]},"Ve":{"T":[],"q":[]},"Vf":{"Z":["Ve"]},"a0y":{"e7":["1"]},"Br":{"cgH":[]},"M0":{"vq":[]},"Hf":{"vq":[]},"HH":{"vq":[]},"MB":{"bK":[]},"MA":{"bK":[]},"aun":{"e7":["@"]},"aiP":{"bK":[]}}'))
A.csl(b.typeUniverse,JSON.parse('{"Ih":1,"aht":1}'))
var y=(function rtii(){var x=A.aA
return{b:x("Br"),L:x("bK"),_:x("av<@>"),x:x("av<~>"),S:x("H<ah<p,V>>"),t:x("H<ah<p,@>>"),Q:x("H<JT>"),d:x("H<jx<@>>"),s:x("H<p>"),p:x("H<q>"),m:x("aE"),l:x("F<aE>"),F:x("F<ah<p,@>>"),j:x("F<@>"),I:x("F<v>"),P:x("ah<p,@>"),f:x("ah<@,@>"),E:x("TC"),G:x("JT"),h:x("ut"),o:x("rc"),a:x("bz"),K:x("ac"),J:x("V9"),e:x("Va"),v:x("Ey"),Z:x("ahs<ac?>"),N:x("p"),i:x("rM"),M:x("e4"),D:x("vq"),U:x("X<p>"),g:x("dT<LC>"),n:x("dT<~>"),V:x("bf<Br>"),r:x("bf<@>"),R:x("bf<~>"),k:x("a_P<aE>"),C:x("qb<aE>"),u:x("aC<Br>"),c:x("aC<@>"),W:x("aC<~>"),q:x("kQ"),y:x("V"),z:x("@"),A:x("aE?"),X:x("ac?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.zK=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.ZN=new B.a92(C.fp)
D.rR=new A.al(32,0,32,0)
D.a3q=new A.al(8,20,8,20)
D.a3I=new A.cR(1,C.ar,C.w9,null)
D.BN=new A.ao(57639,"MaterialIcons",null,!1)
D.a4R=new A.ao(58337,"MaterialIcons",null,!1)
D.a4S=new A.ao(58341,"MaterialIcons",null,!1)
D.BX=new A.ao(59048,"MaterialIcons",null,!1)
D.a4W=new A.ao(59049,"MaterialIcons",null,!1)
D.a4X=new A.ao(59077,"MaterialIcons",null,!1)
D.BS=new A.ao(58195,"MaterialIcons",null,!1)
D.a6V=new A.aa(D.BS,null,C.m,null,null)
D.a6U=new A.aa(D.BS,28,C.m,null,null)
D.a4V=new A.ao(58923,"MaterialIcons",null,!1)
D.a7b=new A.aa(D.a4V,null,C.m,null,null)
D.agz=A.a(x([1,2,4,8,16]),A.aA("H<v>"))
D.am6=A.a(x([]),y.Q)
D.Ko=new A.h3("FlutterWebRTC.Method",C.bk,null)
D.aw5=new B.oo(0,"RTCIceConnectionStateNew")
D.aw6=new B.oo(1,"RTCIceConnectionStateChecking")
D.aw7=new B.oo(2,"RTCIceConnectionStateCompleted")
D.aw8=new B.oo(3,"RTCIceConnectionStateConnected")
D.aw9=new B.oo(4,"RTCIceConnectionStateCount")
D.P0=new B.oo(5,"RTCIceConnectionStateFailed")
D.awa=new B.oo(6,"RTCIceConnectionStateDisconnected")
D.P1=new B.oo(7,"RTCIceConnectionStateClosed")
D.P2=new B.V8(0,"RTCIceGatheringStateNew")
D.awb=new B.V8(1,"RTCIceGatheringStateGathering")
D.awc=new B.V8(2,"RTCIceGatheringStateComplete")
D.vi=new B.z7(0,"RTCPeerConnectionStateClosed")
D.P3=new B.z7(1,"RTCPeerConnectionStateFailed")
D.P4=new B.z7(2,"RTCPeerConnectionStateDisconnected")
D.P5=new B.z7(3,"RTCPeerConnectionStateNew")
D.P6=new B.z7(4,"RTCPeerConnectionStateConnecting")
D.P7=new B.z7(5,"RTCPeerConnectionStateConnected")
D.awd=new B.z8(0,"RTCSignalingStateStable")
D.awe=new B.z8(1,"RTCSignalingStateHaveLocalOffer")
D.awf=new B.z8(2,"RTCSignalingStateHaveRemoteOffer")
D.awg=new B.z8(3,"RTCSignalingStateHaveLocalPrAnswer")
D.awh=new B.z8(4,"RTCSignalingStateHaveRemotePrAnswer")
D.P8=new B.z8(5,"RTCSignalingStateClosed")
D.awi=new B.Vd(0,0,0)
D.vj=new B.af6(0,"RTCVideoViewObjectFitContain")
D.P9=new B.af6(1,"RTCVideoViewObjectFitCover")
D.aA1=new A.cj(48,null,null,null)
D.aAe=new A.cj(null,64,null,null)
D.aDd=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aDr=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wA=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.chH=null
$.crn=!1
$.cpu=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"d4f","cjh",()=>new B.aYO())
x($,"d0S","cj2",()=>C.d.t(A.ax(A.ax(A.ax(A.ciH(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"fM0j51FEZv555Oj/f0T+Rjfh37I=");