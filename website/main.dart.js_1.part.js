((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Ii:function Ii(){},WS:function WS(d){this.$ti=d},b3O:function b3O(d){this.a=d},b3P:function b3P(d,e){this.a=d
this.b=e},
cv1(d){var x
B.c8d()
if(d.length===0)return
x=A.c0(new B.ca1(d))
self.window.addEventListener("beforeunload",x)
$.chP=new B.ca0(x)},
c8d(){var x=$.chP
if(x!=null)x.$0()
$.chP=null},
ca1:function ca1(d){this.a=d},
ca0:function ca0(d){this.a=d},
a7s(d){var x,w,v,u,t=new B.aA8(),s=J.M(d),r=s.h(d,"id")
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
return new B.aA7(r,x,w,v,u)},
cgm(d){var x,w,v,u=J.M(d),t=u.h(d,"contenu"),s=u.h(d,"id")
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
return new B.LE(s,x,w,v)},
cEz(d){var x,w,v,u,t,s,r=J.M(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.ZP
x=A.a([],y.t)
for(r=J.ar(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mM(s,u,t))}return new B.a94(x)},
cvR(d){var x=J.M(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oY(v)
if(!x.p(v,"offer")&&!x.p(v,"answer"))return null
return new A.aql(w,v)},
cVb(d){var x,w,v=J.M(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aqo(u,A.i4(w)?w:null,v)},
aA7:function aA7(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
aA8:function aA8(){},
LE:function LE(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a94:function a94(d){this.a=d},
cmV(d,e,f,g,h,i,j){return new B.qU(f,g,j,i,e,d,null)},
ceF(d,e,f,g,h,i,j,k,l,m){return new B.qT(f,m,h,l,i,d,j,k,e,g,null)},
crL(d,e,f,g,h,i,j,k,l,m,n){return new B.akw(e,g,f,d,n,j,i,h,m,k,l,null)},
ctM(d,e){var x=null
return new A.Y(D.rS,A.c(d.toUpperCase(),2,C.a4,x,x,A.c8(x,x,C.m,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.A,x,x,!0,x,1.2,x,x,x,x,x,x),C.V,x,x),x)},
qU:function qU(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_H:function a_H(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bv6:function bv6(d){this.a=d},
bv7:function bv7(d){this.a=d},
bv3:function bv3(d){this.a=d},
bv4:function bv4(d){this.a=d},
bv0:function bv0(d){this.a=d},
bv1:function bv1(d){this.a=d},
bv2:function bv2(d){this.a=d},
buY:function buY(d){this.a=d},
buZ:function buZ(d){this.a=d},
bv_:function bv_(d){this.a=d},
bv5:function bv5(d){this.a=d},
Z8:function Z8(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qT:function qT(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
a_G:function a_G(d,e){var _=this
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
buJ:function buJ(d){this.a=d},
buK:function buK(d){this.a=d},
buI:function buI(d){this.a=d},
buL:function buL(d){this.a=d},
buM:function buM(){},
buN:function buN(d){this.a=d},
buH:function buH(d,e){this.a=d
this.b=e},
buO:function buO(){},
buP:function buP(d){this.a=d},
bur:function bur(d){this.a=d},
bus:function bus(d){this.a=d},
but:function but(d){this.a=d},
buu:function buu(d){this.a=d},
buq:function buq(d){this.a=d},
buv:function buv(d){this.a=d},
buw:function buw(d){this.a=d},
bux:function bux(d){this.a=d},
bup:function bup(d,e){this.a=d
this.b=e},
buy:function buy(){},
buz:function buz(d){this.a=d},
buR:function buR(d){this.a=d},
buS:function buS(d){this.a=d},
buT:function buT(d){this.a=d},
buU:function buU(d){this.a=d},
buV:function buV(d){this.a=d},
buW:function buW(d){this.a=d},
buE:function buE(d,e){this.a=d
this.b=e},
buF:function buF(d){this.a=d},
buG:function buG(d){this.a=d},
buQ:function buQ(){},
buo:function buo(d,e){this.a=d
this.b=e},
bun:function bun(d,e){this.a=d
this.b=e},
bum:function bum(d,e){this.a=d
this.b=e},
buB:function buB(d){this.a=d},
buC:function buC(d){this.a=d},
buA:function buA(d){this.a=d},
buD:function buD(d){this.a=d},
buX:function buX(d){this.a=d},
akw:function akw(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Z9:function Z9(d,e){this.c=d
this.a=e},
A4:function A4(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
NR:function NR(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
ap9:function ap9(d,e){var _=this
_.d=$
_.eJ$=d
_.bS$=e
_.c=_.a=null},
bQR:function bQR(d,e){this.a=d
this.b=e},
a5R:function a5R(){},
b3b:function b3b(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b3c:function b3c(d){this.a=d},
b3d:function b3d(d){this.a=d},
b3e:function b3e(d){this.a=d},
a8R:function a8R(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aDS:function aDS(d){this.a=d},
aDT:function aDT(d){this.a=d},
cb3(d){var x=y.U,w=A.G(new A.X(A.a(d.split(" "),y.s),new B.cb4(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gU(w),0).toUpperCase()
return(J.m(C.b.gU(w),0)+J.m(C.b.gaZ(w),0)).toUpperCase()},
cb4:function cb4(){},
acL:function acL(){this.a=null},
aYU:function aYU(){},
ut:function ut(d,e){this.e=d
this.b=e},
aTG:function aTG(d){this.a=d},
aTH:function aTH(d){this.a=d},
cfu(d){var x=new B.ade(d)
x.aH3(d)
return x},
ade:function ade(d){this.d=d},
aTD:function aTD(d){this.a=d},
aTE:function aTE(d){this.a=d},
aTF:function aTF(d){this.a=d},
aTq:function aTq(){},
aTs:function aTs(){},
aTt:function aTt(){},
aTu:function aTu(d){this.a=d},
aTr:function aTr(d){this.a=d},
cKF(d,e){var x=y.N
x=new B.af6(d,e,A.C(x,y.E),A.C(x,y.z))
x.aHc(d,e)
return x},
af6:function af6(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYW:function aYW(d){this.a=d},
aYX:function aYX(d){this.a=d},
aYY:function aYY(d){this.a=d},
aYZ:function aYZ(d){this.a=d},
aZ_:function aZ_(d){this.a=d},
aZ0:function aZ0(d){this.a=d},
aZ1:function aZ1(d){this.a=d},
aZ2:function aZ2(d){this.a=d},
aYV:function aYV(d){this.a=d},
af7:function af7(){},
cg9:function cg9(d){this.a=d},
cXD(){return C.b.nT(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.cbd())!==-1},
cbd:function cbd(){},
cpC(){var x=A.a([],y.d),w=$.cpD
$.cpD=w+1
return new B.Vd(w,x,D.awm,$.ag())},
Vd:function Vd(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aZ8:function aZ8(d){this.a=d},
aZ4:function aZ4(d){this.a=d},
aZ5:function aZ5(d){this.a=d},
aZ6:function aZ6(d){this.a=d},
aZ7:function aZ7(){},
cga(d,e,f){return new B.Vf(d,f,e,null)},
Vf:function Vf(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Vg:function Vg(){this.c=this.a=null},
aZ9:function aZ9(){},
aZb:function aZb(d){this.a=d},
aZa:function aZa(d){this.a=d},
cnz(d,e,f,g){var x,w={}
w.a=d
x=new B.abn(g.i("abn<0>"))
x.aGL(e,f,w,g)
return x},
abn:function abn(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aMs:function aMs(d,e){this.a=d
this.b=e},
aMr:function aMr(d){this.a=d},
a0A:function a0A(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bAb:function bAb(){},
ahu:function ahu(d){this.b=this.a=$
this.$ti=d},
ahv:function ahv(){},
ce1(d,e){return B.cDI(d,e)},
cDI(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$ce1=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.q5("ws")&&!d.q5("wss"))throw A.o(A.fO(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.l(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.Bs(r,A.h5(null,null,null,!1,y.D))
u=new A.aC($.aL,y.u)
p=new A.bf(u,y.V)
if(J.r(r.readyState,1))p.cI(0,q)
else if(J.r(r.readyState,2)||J.r(r.readyState,3))p.hB(new B.MD("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.qc(r,"open",!1,y.C).gU(0).aL(new B.aCp(p,q),y.H)
t=y.C
s=y.H
new A.qc(r,"error",!1,t).gU(0).aL(new B.aCq(p,q),s)
A.iN(r,"message",new B.aCr(q),!1,y.m)
new A.qc(r,"close",!1,t).gU(0).aL(new B.aCs(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$ce1,w)},
Bs:function Bs(d,e){this.a=d
this.b=e},
aCp:function aCp(d,e){this.a=d
this.b=e},
aCq:function aCq(d,e){this.a=d
this.b=e},
aCr:function aCr(d){this.a=d},
aCs:function aCs(d,e){this.a=d
this.b=e},
cgQ(){return new B.MC("Connection Closed")},
vq:function vq(){},
M2:function M2(d){this.a=d},
Hg:function Hg(d){this.a=d},
HI:function HI(d,e){this.a=d
this.b=e},
MD:function MD(d){this.a=d},
MC:function MC(d){this.a=d},
cD9(d){var x=null,w=$.aL,v=new B.ahu(y.Z),u=y.X,t=A.h5(x,x,x,!0,u),s=A.h5(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.cnz(new A.cP(s,r.i("cP<1>")),new A.Gs(t,q.i("Gs<1>")),!0,u)
v.b=B.cnz(new A.cP(t,q.i("cP<1>")),new A.Gs(s,r.i("Gs<1>")),!1,u)
v=new B.axV(new A.bf(new A.aC(w,y.W),y.R),v)
v.aGt(d)
return v},
axV:function axV(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axZ:function axZ(d){this.a=d},
axW:function axW(d){this.a=d},
axX:function axX(d){this.a=d},
axY:function axY(d,e){this.a=d
this.b=e},
ay_:function ay_(d){this.a=d},
auo:function auo(d,e){this.b=d
this.a=e},
aiQ:function aiQ(d){this.a=d},
cXb(d){switch(d){case"new":return D.aw9
case"checking":return D.awa
case"connected":return D.awc
case"completed":return D.awb
case"failed":return D.P3
case"disconnected":return D.awe
case"closed":return D.P4
case"count":return D.awd}return D.P4},
cXc(d){switch(d){case"new":return D.P5
case"gathering":return D.awf
case"complete":return D.awg}return D.P5},
cZo(d){switch(d){case"stable":return D.awh
case"have-local-offer":return D.awi
case"have-local-pranswer":return D.awk
case"have-remote-offer":return D.awj
case"have-remote-pranswer":return D.awl
case"closed":return D.Pb}return D.Pb},
cYx(d){switch(d){case"new":return D.P8
case"connecting":return D.P9
case"connected":return D.Pa
case"closed":return D.vi
case"disconnected":return D.P7
case"failed":return D.P6}return D.vi},
z8:function z8(d,e){this.a=d
this.b=e},
V9:function V9(d,e){this.a=d
this.b=e},
z7:function z7(d,e){this.a=d
this.b=e},
op:function op(d,e){this.a=d
this.b=e},
af8:function af8(d,e){this.a=d
this.b=e},
aYT:function aYT(){},
TD:function TD(){},
JU:function JU(){},
aTp:function aTp(){},
KL:function KL(d,e,f){this.a=d
this.b=e
this.c=f},
Va:function Va(){},
Vb:function Vb(){},
aZ3:function aZ3(){},
Ez:function Ez(d,e){this.a=d
this.b=e},
Vc:function Vc(d){this.b=d},
Ve:function Ve(d,e,f){this.a=d
this.b=e
this.c=f},
cf5(d){var x=0,w=A.k(y.y)
var $async$cf5=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.o("The is not a video track => "+d.l(0))
throw A.o("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$cf5,w)},
adC(d){var x=0,w=A.k(y.H),v
var $async$adC=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b8K("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$adC)
case 2:return A.i(null,w)}})
return A.j($async$adC,w)},
aVG(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aVG=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mM(y.f.a(A.c9M(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.V4(0,u),$async$aVG)
case 5:case 4:v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aVG,w)},
b8K(d,e,f,g){return B.cOf(d,e,f,g,f.i("0?"))},
cOf(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b8K=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b8J(),$async$b8K)
case 3:v=D.Kr.cm(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b8K,w)},
b8J(){var x=0,w=A.k(y.H),v,u
var $async$b8J=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.crw?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Kr.cm("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$b8J)
case 4:$.crw=!0
case 3:return A.i(null,w)}})
return A.j($async$b8J,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[27]
B.Ii.prototype={
E(d,e){this.a.E(0,e)},
dz(d,e){this.a.dz(d,e)},
ab(d){return this.a.ab(0)},
$ie7:1}
B.WS.prototype={
hO(d){var x=A.cE("subscription"),w=A.h5(new B.b3O(x),null,null,!0,this.$ti.y[1])
x.b=d.fM(new B.b3P(this,w),w.gnL(w),w.gpC())
return new A.cP(w,A.x(w).i("cP<1>"))}}
B.aA7.prototype={}
B.LE.prototype={}
B.a94.prototype={}
B.qU.prototype={
P(){return new B.a_H()}}
B.a_H.prototype={
S(){var x,w,v=this
v.W()
x=v.a
x.toString
v.z=!0
w=new B.acL()
v.y!==$&&A.aK()
v.y=w
if(!x.y)w.uf(A.BF(C.lk,$.w0().a).c)
v.Q3()
v.r=A.dv(C.c9,new B.bv6(v))
v.w=A.hg(C.rH,new B.bv7(v))},
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
this.x=A.dv(C.fY,new B.bv3(this))},
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
q=B.a7s(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.k(new B.bv4(s))
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
q=B.a7s(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null){o=$.K()
m=o.gwZ()}p=m
if(q.w!=="sonne"||q.c===p){s.k(new B.bv0(s))
o=s.y
o===$&&A.d()
o.it()
s.a40()
x=1
break}s.k(new B.bv1(s))
if(s.a.y)s.H3()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.k(new B.bv2(s))
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
s.k(new B.buY(s))
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
break}s.k(new B.buZ(s))
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
A.a1(q,!1).ut(A.e9(new B.bv_(s),null,y.z))
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
r=A.jO(C.t,s,A.c(B.cb3(r.d),s,s,s,s,D.aDx,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.aDj,C.V,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.Y(D.rS,x,s),C.k,A.c(q,s,s,s,s,D.wA,s,s,s),D.aAj],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.bv5(t)
v=A.b("Accepter")
u=t.f?s:t.gaHW()
q.push(A.Q(A.a([new B.Z8(D.BO,C.aG,r,x,s),D.aA6,new B.Z8(C.nP,C.d0,v,u,s)],w),C.n,C.bA,C.i,s))}if(t.d)q.push(C.z8)
return A.e_(s,C.o,A.ft(!0,A.cw(A.I(q,C.n,C.f,C.N),s,s),!0,C.a_,!0,!0),s,s,s)}}
B.Z8.prototype={
D(d){var x=this,w=null,v=A.dl(x.d,w,w,C.a_,C.cK,w)
return A.I(A.a([A.ab(A.b1(!1,A.c1(x.c,C.m,w,32),C.j,w,C.p,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.dv,w,w,w)],y.p),C.n,C.f,C.N)}}
B.qT.prototype={
P(){return new B.a_G(A.b8(y.N),C.R)}}
B.a_G.prototype={
S(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.W()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.b3b(B.cpC(),B.cpC())
o.d!==$&&A.aK()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a8R(new A.dT(n,n,y.g),new A.dT(n,n,y.n))
o.e!==$&&A.aK()
o.e=v
o.fr=!0
u=new B.acL()
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
if(!(w.r&&w.a===x.r&&!x.y)){B.c8d()
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
s.w=o.gwZ()
o=$.l_()
s.Q=o.x
s.as=o.y
s.x=o.e
o=o.f
s.ay=o
if(o!=null){o=Date.now()
n=s.ay
n.toString
s.ch=new A.au(o,0,!1).eu(n)}B.cv1(s.r)
u=4
s.a.toString
o=$.K()
x=7
return A.e(o.bX("/messagerie/appels/"+s.r+"/signaux"),$async$TB)
case 7:r=e
for(o=J.ar(r),n=s.f;o.B();){q=o.gJ(o)
p=B.cgm(q)
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
n.f=new B.buJ(s)
n.r=new B.buK(s)
n.w=new B.buL(s)
s.z=!0
if(o)s.k(new B.buM())
s.cy=A.hg(C.ce,new B.buN(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.ca(n,A.x(n).i("ca<1>")).cQ(s.gaop())
o=o.w
s.dx=new A.ca(o,A.x(o).i("ca<1>")).cQ(new B.buO())
s.CW=A.hg(C.fY,new B.buP(s))
s.yq()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$TB,w)},
t8(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$t8=A.f(function(a0,a1){if(a0===1){t=a1
x=u}while(true)switch(x){case 0:s.cx=A.dv(C.c9,new B.bur(s))
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
h=s.r=B.a7s(q).a
x=8
break
case 9:g=$.K()
x=11
return A.e(g.ED(h.c),$async$t8)
case 11:q=a1
h=s.r=s.a.c
case 8:g=$.l_()
g.bih(h)
B.cv1(s.r)
if(s.a.f)g.VY()
p=B.a7s(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mL(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.K()
s.w=h.gwZ()
r="ice"
s.a.toString
h=$.K()
o=h.Wz()
n=s.Jl()
x=12
return A.e(o,$async$t8)
case 12:m=a1
l=B.cEz(m)
x=15
return A.e(n,$async$t8)
case 15:x=!a1?13:14
break
case 13:if(s.c==null){x=1
break}s.k(new B.bus(s))
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
return A.e(h.AC(A.a6(["iceServers",l.a],y.N,y.z),f==="video"),$async$t8)
case 17:h.f=new B.but(s)
h.r=new B.buu(s)
h.w=new B.buv(s)
if(s.c==null){x=1
break}s.k(new B.buw(s))
g.bov()
s.cy=A.hg(C.ce,new B.bux(s))
h=s.e
h===$&&A.d()
g=h.r
s.db=new A.ca(g,A.x(g).i("ca<1>")).cQ(s.gaop())
g=h.w
s.dx=new A.ca(g,A.x(g).i("ca<1>")).cQ(new B.buy())
s.a.toString
g=$.K()
k=g.b
if(k!=null&&J.a7(k)!==0){s.a.toString
$.K()
h.Vv(C.d.jg("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.dH(C.bL,k,C.a6,!0))}s.CW=A.hg(C.fY,new B.buz(s))
s.yq()
u=2
x=6
break
case 4:u=3
d=t
j=A.N(d)
i=A.bq(d)
if(s.c==null){x=1
break}A.tg().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
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
yq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$yq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.K()
x=7
return A.e(p.bX("/messagerie/appels/"+s.r+"/signaux"),$async$yq)
case 7:r=e
for(p=J.ar(r);p.B();){q=p.gJ(p)
s.aoq(B.cgm(q))}u=2
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
return A.j($async$yq,w)},
aoq(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cvR(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.E6(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aL(new B.buR(s),y.a).fK(new B.buS(s))
break
case"reponse":if(!s.a.f)return
u=B.cvR(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.V3(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aL(new B.buT(s),y.a).fK(new B.buU(s))
break
case"candidat_ice":t=B.cVb(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.UZ(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Lp().aL(new B.buV(s),y.a).fK(new B.buW(s))
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
u.k(new B.buE(u,!1))
t=$.l_()
t.bqn()
s=u.Q
t.a95(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$T8,w)},
yg(d,e,f){return this.aR_(d,e,f)},
ah9(d,e){return this.yg(d,e,!0)},
aR_(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$yg=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.K()
x=6
return A.e(s.asy(t.r,e,d),$async$yg)
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
return A.j($async$yg,w)},
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
case 6:B.c8d()
$.l_().NW()
r=s.c
if(r!=null)A.a1(r,!1).bO()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jx,w)},
alO(){var x=this
if(!x.x||x.y)return
$.l_().brF()
x.k(new B.buF(x))
$.aO.aG$.push(new B.buG(x))},
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
w.LT(x,"termine").fK(new B.buQ())}if(d!=null&&v.c!=null)v.c.u(y.q).f.v(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))
B.c8d()
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
case 2:if(v.c!=null)v.k(new B.buo(v,u))
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
case 2:if(v.c!=null)v.k(new B.bun(v,u))
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
case 2:if(v.c!=null)v.k(new B.bum(v,u))
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
if(w.a.d==="video")u.push(A.bR(!1,v,v,v,!0,v,v,!0,!1,D.a7c,v,v,v,new B.buB(w),!1,v,v,v,v,v,A.c(A.b("Basculer"),v,v,v,v,C.dv,v,v,v),v,v))
if(w.x)u.push(A.bR(!1,v,v,v,!0,v,v,!0,!1,D.a6W,v,v,v,new B.buC(w),!1,v,v,v,v,v,A.c(A.b("R\xe9duire"),v,v,v,v,C.dv,v,v,v),v,v))
if(u.length===0)return
x=w.c
x.toString
A.je(D.zL,new B.buD(u),x,!1,v,y.H)},
D(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.d()
x=o.c
w=q.go
v=q.a
if(v.d==="video"&&q.z){if(x!=null)x=B.cga(o.e,!1,D.Pc)
else{x=v.e
v=v.r
u=q.fy&&q.x
x=A.cw(A.I(A.a([new B.NR(x,v,u,56,p),C.q,B.ctM(x,22),C.k,A.c(q.anA(),p,p,p,p,D.wA,p,p,p)],y.p),C.n,C.f,C.N),p,p)}o=A.a([A.Es(0,x),A.f5(p,A.eI(A.P(12),B.cga(o.d,!0,D.Pc),C.ap),160,p,p,16,16,110)],y.p)
if(q.x)o.push(A.f5(p,new B.Z9(q.galN(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.f5(24,B.crL(q.ax,!0,v,x,q.gaeg(),q.gaeh(),q.gaei(),q.gakS(),q.galr(),q.gapu(),!0),p,p,0,0,p,p))
o=A.e2(C.aP,o,C.h,C.aH,p)}else{x=y.p
v=A.a([],x)
if(q.fy)v.push(A.f5(p,A.rh(B.cga(o.e,!1,D.vj),0),1,p,0,p,0,1))
if(q.x)v.push(A.f5(p,new B.Z9(q.galN(),p),p,p,16,p,16,p))
o=B.ctM(q.a.e,24)
u=A.c(q.anA(),p,p,p,p,D.wA,C.V,p,p)
t=q.a
s=t.e
t=t.r
t=A.a9(A.cw(new B.NR(s,t,q.fy&&q.x,88,p),p,p),1,p)
s=q.Q
r=q.as
v.push(A.I(A.a([C.q,o,C.k,new A.Y(D.rS,u,p),t,B.crL(q.ax,!1,r,s,q.gaeg(),q.gaeh(),q.gaei(),q.gakS(),q.galr(),q.gapu(),q.x),C.q],x),C.n,C.f,C.i))
v=A.e2(C.aP,v,C.h,C.aH,p)
o=v}return A.cfV(w,A.e_(p,C.o,A.ft(!0,o,!0,C.a_,!0,!0),p,p,p),new B.buX(q),y.K)}}
B.akw.prototype={
D(d){var x,w,v=this,u=null,t=A.P(28),s=A.a9(new B.A4(D.a4Z,v.e,A.b("Haut-parleur"),v.x,u,u),1,u),r=v.f?D.BY:D.a4Y,q=A.b("Appel vid\xe9o")
r=A.a9(new B.A4(r,!1,q,v.c?v.y:v.z,u,u),1,u)
q=v.d
x=q?D.a4U:D.a4T
w=y.p
q=A.Q(A.a([s,r,A.a9(new B.A4(x,q,A.b("Muet"),v.w,u,u),1,u)],w),C.n,C.f,C.i,u)
x=A.b("Plus")
return A.S(u,A.I(A.a([q,C.q,A.Q(A.a([A.a9(new B.A4(C.BV,!1,x,v.r?v.Q:u,u,u),1,u),A.a9(new B.A4(D.BO,!1,A.b("Terminer"),v.as,C.aG,u),1,u),D.a3K],w),C.n,C.f,C.i,u)],w),C.n,C.f,C.N),C.j,u,u,new A.a4(D.zL,u,u,t,u,u,C.v),u,u,u,C.AU,D.a3s,u,u,u)}}
B.Z9.prototype={
D(d){var x=null
return A.I(A.a([A.ab(A.b1(!1,D.a6V,C.j,x,C.p,x,x,x,x,this.c,x,A.dl(C.kQ,x,x,C.a_,C.cK,x)),48,48),C.I,A.c(A.b("R\xe9duire"),x,x,x,x,C.Ry,x,x,x)],y.p),C.n,C.f,C.N)}}
B.A4.prototype={
D(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.m:C.kQ
if(!r)x=C.m
else x=u.d?C.o:C.m
r=u.f
w=r==null?0.4:1
v=A.dl(s,t,t,C.a_,C.cK,t)
return A.rh(A.I(A.a([A.ab(A.b1(!1,A.c1(u.c,x,t,30),C.j,t,C.p,t,t,t,t,r,t,v),72,72),C.k,A.c(u.e,t,t,t,t,C.wC,C.V,t,t)],y.p),C.n,C.f,C.N),w)}}
B.NR.prototype={
P(){return new B.ap9(null,null)}}
B.ap9.prototype={
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
u=x!=null?A.jO(v,x,v,v,t):A.jO(C.t,v,A.c(B.cb3(u.c),v,v,v,v,A.c8(v,v,C.o,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.A,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),v,t)
return A.ab(A.ib(q,new B.bQR(w,s),u),r,r)}}
B.a5R.prototype={
m(){var x=this,w=x.bS$
if(w!=null)w.T(0,x.ghM())
x.bS$=null
x.a3()},
ce(){this.dc()
this.d0()
this.hN()}}
B.b3b.prototype={
Fq(d){return this.bqc(d)},
bqc(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$Fq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jA(0),$async$Fq)
case 3:$.cjp()
s=y.N
r=A.a6(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aTq().Gr(0,A.a6(["audio",r,"video",d&&A.a6(["facingMode","user"],s,s)],s,y.z)),$async$Fq)
case 4:q=f
u.b=q
t.sacb(0,q)
case 1:return A.i(v,w)}})
return A.j($async$Fq,w)},
AC(d,e){return this.bqX(d,e)},
bqX(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$AC=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jA(0),$async$AC)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.Fq(e),$async$AC)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.cjp().a71(d,A.C(y.N,y.z)),$async$AC)
case 6:t=v.a=g
s=u.abn(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a5S(0,s[q],u),$async$AC)
case 10:case 8:s.length===r||(0,A.R)(s),++q
x=7
break
case 9:t.e=new B.b3c(v)
t.Q=new B.b3d(v)
t.d=new B.b3e(v)
return A.i(null,w)}})
return A.j($async$AC,w)},
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
return A.e(B.aVG(n,s),$async$Hi)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.N(l)
A.tg().$1("Appel : volume distant impossible : "+A.u(r))
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
return A.e(s.GH(0,new B.Ez(d.h(0,"sdp"),d.h(0,"type"))),$async$E6)
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
return A.e(u.GH(0,new B.Ez(d.h(0,"sdp"),d.h(0,"type"))),$async$V3)
case 2:return A.i(null,w)}})
return A.j($async$V3,w)},
UZ(d){return this.beg(d)},
beg(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$UZ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.UM(new B.KL(A.an(d.h(0,"candidate")),A.an(d.h(0,"sdpMid")),A.dW(d.h(0,"sdpMLineIndex")))),$async$UZ)
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
return A.e(B.adC(d),$async$GE)
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
if(s==null)s=D.am8
if(s.length===0){x=1
break}x=3
return A.e(B.cf5(C.b.gU(s)),$async$Va)
case 3:case 1:return A.i(v,w)}})
return A.j($async$Va,w)},
hr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hr=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.adC(!1),$async$hr)
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
return A.e(y.x.b(p)?p:A.dx(p,y.H),$async$hr)
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
k=J.cD3(r)
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
B.a8R.prototype={
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
q=B.cD9(B.ce1(A.cI(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Hg)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cP(p,A.x(p).i("cP<1>")).b7(s.gb5A(),!0,s.gb4_(),new B.aDS(s))
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
if((v.c&4)===0)v.E(0,B.cgm(w))}catch(u){}},
a3P(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.agB[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.dv(A.cU(0,0,0,0,x),new B.aDT(w))},
Ly(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Ly=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.dx(s,y.H),$async$Ly)
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
r=s.w=new B.auo(s,q)}s=r.ab(0)}x=7
return A.e(y._.b(s)?s:A.dx(s,y.z),$async$Ly)
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
B.acL.prototype={
uf(d){return this.bnH(d)},
bnH(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$uf=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.Bl():r).aW(0),$async$uf)
case 6:x=7
return A.e(t.a.a_m(d),$async$uf)
case 7:x=8
return A.e(t.a.jl(C.K5),$async$uf)
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
A.tg().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
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
return A.e(y.x.b(s)?s:A.dx(s,y.H),$async$it)
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
return A.e(y.x.b(s)?s:A.dx(s,y.H),$async$hr)
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
B.aYU.prototype={
a71(d,e){return this.bhv(d,e)},
bhv(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a71=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.a([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fT(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.cd(t)))
t=J.l(s)
v=B.cKF(C.cj.gkr().bi(new A.eJ(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a71,w)}}
B.ut.prototype={
Oz(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.da(w,A.W(w).i("da<1,aE>"))
J.hw(w,new B.aTG(x))
return x},
OM(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.da(w,A.W(w).i("da<1,aE>"))
J.hw(w,new B.aTH(x))
return x},
abn(d){var x=A.G(this.Oz(0),!0,y.G)
C.b.t(x,this.OM(0))
return x}}
B.ade.prototype={
aH3(d){var x=this,w=x.d
w.addEventListener("ended",A.c0(new B.aTD(x)))
w.addEventListener("mute",A.c0(new B.aTE(x)))
w.addEventListener("unmute",A.c0(new B.aTF(x)))},
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
B.aTq.prototype={
Gr(d,e){return this.ayN(0,e)},
ayN(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Gr=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cXD())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.jj(e.h(0,"video"),"facingMode")
e.cT(0,"video",new B.aTs())
e.cT(0,"audio",new B.aTt())}catch(a0){A.oZ("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hd(e.h(0,"audio"),i,i).aD(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.hw(s,new B.aTu(r))
J.jj(e.h(0,"audio"),"optional")
J.jI(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bq(a0)
A.oZ("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
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
B.af6.prototype={
aHc(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.c0(new B.aYW(x)))
w.addEventListener("icecandidate",A.c0(new B.aYX(x)))
w.addEventListener("iceconnectionstatechange",A.c0(new B.aYY(x)))
w.onicegatheringstatechange=A.c0(new B.aYZ(x))
w.addEventListener("signalingstatechange",A.c0(new B.aZ_(x)))
if(!$.cja())w.addEventListener("connectionstatechange",A.c0(new B.aZ0(x)))
w.addEventListener("negotiationneeded",A.c0(new B.aZ1(x)))
w.addEventListener("track",A.c0(new B.aZ2(x)))},
VK(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.ei(s.createOffer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$VK)
case 3:t=f
v=new B.Ez(t.sdp,t.type)
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
v=new B.Ez(t.sdp,t.type)
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
v=new B.af7()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5S,w)}}
B.af7.prototype={}
B.cg9.prototype={
aW(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aW=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.o("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aW,w)}}
B.Vd.prototype={
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
while(true)switch(x){case 0:$.GX()
$.qu().uw("RTCVideoRenderer-"+v.Q,new B.aZ8(v),!0)
return A.i(null,w)}})
return A.j($async$jA,w)},
ae3(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Vf.prototype={
P(){return new B.Vg()}}
B.Vg.prototype={
S(){var x,w,v=this
v.W()
v.a.c.aj(0,v.gb1K())
x=v.a
w=x.c
w.as=x.e
w.sauT(0,x.d===D.vj?"contain":"cover")},
b1L(){if(this.c!=null)this.k(new B.aZ9())},
m(){if(this.c!=null)this.a3()},
aU(d){var x,w
this.bf(d)
A.dv(A.cU(0,0,10,0,0),new B.aZb(this))
x=this.a
w=x.c
w.sauT(0,x.d===D.vj?"contain":"cover")},
D(d){return new A.iF(new B.aZa(this),null)}}
B.abn.prototype={
aGL(d,e,f,g){var x=this,w=$.aL
x.a!==$&&A.aK()
x.a=new B.a0A(d,x,new A.bf(new A.aC(w,y.c),y.r),e,g.i("a0A<0>"))
if(f.a.gjc())f.a=new B.WS(g.i("@<0>").cc(g).i("WS<1,2>")).hO(f.a)
w=A.h5(null,new B.aMs(f,x),null,!0,g)
x.b!==$&&A.aK()
x.b=w},
akI(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.ab(0)}}
B.a0A.prototype={
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
x.a.a.ab(0).fK(new B.bAb())},
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
B.ahu.prototype={}
B.ahv.prototype={}
B.Bs.prototype={
afy(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.HI(d,e))
x.ab(0)},
abF(d){var x
if((this.b.b&4)!==0)throw A.o(B.cgQ())
x=A.cd(d)
x.toString
this.a.send(x)},
zj(d,e,f){return this.bfF(0,e,f)},
bfF(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$zj=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.o(B.cgQ())
u.ab(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$zj,w)},
$icgP:1}
B.vq.prototype={}
B.M2.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.M2&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.Hg.prototype={
p(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Hg&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gI(d){return A.hK(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.HI.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.HI&&e.a===this.a&&e.b===this.b},
gI(d){return A.hK([this.a,this.b])},
l(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.MD.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibK:1}
B.MC.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.axV.prototype={
aGt(d){d.fu(new B.axZ(this),new B.ay_(this),y.a)}}
B.auo.prototype={
ab(d){var x=this.b
x.e=x.d=null
return this.aBT(0)}}
B.aiQ.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibK:1}
B.z8.prototype={
O(){return"RTCSignalingState."+this.b}}
B.V9.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.z7.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.op.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.af8.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.aYT.prototype={}
B.TD.prototype={}
B.JU.prototype={
l(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aTp.prototype={}
B.KL.prototype={}
B.Va.prototype={}
B.Vb.prototype={}
B.aZ3.prototype={}
B.Ez.prototype={}
B.Vc.prototype={}
B.Ve.prototype={
arA(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Ve(x,w,v)},
bgj(d){return this.arA(null,d,null,null)},
l(d){var x=this
return A.ae(x).l(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["aw<~>()","~()","~(LE)","bz(KL)","bz(Vc)","bz(op)","~(@)","ut(@)","bz(cgP)","~(vq)"])
B.b3O.prototype={
$0(){return J.cCo(this.a.bm())},
$S:1}
B.b3P.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.i.b(u)){x=u
w=A.bq(v)
this.b.dz(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.ca1.prototype={
$1(d){var x,w,v,u=$.K().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Z.dH(A.a6(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:25}
B.ca0.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.aA8.prototype={
$1(d){if(d==null)return null
return A.bQ(J.l(d))},
$S:109}
B.bv6.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.JD(!0)},
$S:0}
B.bv7.prototype={
$1(d){return this.a.Uz()},
$S:26}
B.bv3.prototype={
$0(){var x=this.a.c
if(x!=null)A.a1(x,!1).bO()},
$S:0}
B.bv4.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bv0.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bv1.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bv2.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buY.prototype={
$0(){return this.a.f=!0},
$S:0}
B.buZ.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bv_.prototype={
$1(d){var x=null,w=this.a.a,v=w.c,u=w.e,t=w.d
return B.ceF(w.w,x,v,w.y,t,x,x,x,!1,u)},
$S:1212}
B.bv5.prototype={
$0(){return this.a.b5S()},
$S:0}
B.buJ.prototype={
$1(d){this.a.yg("candidat_ice",d,!1)},
$S:194}
B.buK.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.buI(x))},
$S:0}
B.buI.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.buL.prototype={
$0(){this.a.mL(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buM.prototype={
$0(){},
$S:0}
B.buN.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.buH(x,w))},
$S:26}
B.buH.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).eu(this.b)},
$S:0}
B.buO.prototype={
$1(d){},
$S:142}
B.buP.prototype={
$1(d){this.a.yq()},
$S:26}
B.bur.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.yg("annule",C.bn,!1)
x.mL(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bus.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.but.prototype={
$1(d){this.a.yg("candidat_ice",d,!1)},
$S:194}
B.buu.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.buq(x))},
$S:0}
B.buq.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.buv.prototype={
$0(){this.a.mL(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buw.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bux.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.bup(x,w))},
$S:26}
B.bup.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).eu(this.b)},
$S:0}
B.buy.prototype={
$1(d){},
$S:142}
B.buz.prototype={
$1(d){this.a.yq()},
$S:26}
B.buR.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.T8()
x.ah9("reponse",d)},
$S:409}
B.buS.prototype={
$1(d){this.a.mL(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buT.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.T8()},
$S:32}
B.buU.prototype={
$1(d){this.a.mL(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buV.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.ah9("offre",d)},
$S:409}
B.buW.prototype={
$1(d){this.a.mL(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buE.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.au(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.buF.prototype={
$0(){return this.a.go=!0},
$S:0}
B.buG.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a1(x,!1).bO()},
$S:5}
B.buQ.prototype={
$1(d){return A.C(y.N,y.z)},
$S:118}
B.buo.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bun.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bum.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.buB.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a1(w,!1).bO()
x.Qb()},
$S:0}
B.buC.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a1(w,!1).XZ().aL(new B.buA(x),y.H)},
$S:0}
B.buA.prototype={
$1(d){return this.a.alO()},
$S:9}
B.buD.prototype={
$1(d){return A.ft(!0,A.I(this.a,C.n,C.f,C.N),!0,C.a_,!0,!0)},
$S:129}
B.buX.prototype={
$2(d,e){if(!d)this.a.Jx()},
$S:1216}
B.bQR.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.d()
s=s.x
s===$&&A.d()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.cr5(A.S(u,u,C.j,u,u,new A.a4(u,u,A.bl(C.t.b2(t*(1-s)),3),u,u,u,C.aI),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.S(u,u,C.j,u,u,new A.a4(u,u,A.bl(C.t,2),u,u,u,C.aI),u,w,u,u,u,u,u,w)
e.toString
return A.e2(C.a5,A.a([s,w,e],y.p),C.h,C.aH,u)},
$S:1217}
B.b3c.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b3d.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gU(x):null
if(w!=null)this.a.aOU(w)},
$S:z+4}
B.b3e.prototype={
$1(d){var x
if(d===D.P3){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aDS.prototype={
$1(d){return this.a.a3P()},
$S:22}
B.aDT.prototype={
$0(){var x=this.a
if(!x.e)x.Hg()},
$S:0}
B.cb4.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTG.prototype={
$1(d){return this.a.push(B.cfu(d))},
$S:22}
B.aTH.prototype={
$1(d){return this.a.push(B.cfu(d))},
$S:22}
B.aTD.prototype={
$1(d){},
$S:27}
B.aTE.prototype={
$1(d){},
$S:27}
B.aTF.prototype={
$1(d){},
$S:27}
B.aTs.prototype={
$0(){return!1},
$S:56}
B.aTt.prototype={
$0(){return!1},
$S:56}
B.aTu.prototype={
$1(d){J.hw(d,new B.aTr(this.a))},
$S:194}
B.aTr.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:51}
B.aYW.prototype={
$1(d){},
$S:27}
B.aYX.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.KL(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:27}
B.aYY.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cXb(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.cja())switch(w.cx.a){case 0:w.cy=D.P8
break
case 1:w.cy=D.P9
break
case 3:w.cy=D.Pa
break
case 5:w.cy=D.P6
break
case 6:w.cy=D.P7
break
case 7:w.cy=D.vi
break
default:break}},
$S:36}
B.aYZ.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cXc(w.iceGatheringState)},
$S:36}
B.aZ_.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cZo(w.signalingState)},
$S:36}
B.aZ0.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cYx(w.connectionState)},
$S:36}
B.aZ1.prototype={
$1(d){},
$S:36}
B.aZ2.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.cfu(d.track)
x=d.streams
x=y.l.b(x)?x:new A.da(x,A.W(x).i("da<1,aE>"))
w=J.dt(x,new B.aYV(w),y.h)
v.$1(new B.Vc(A.G(w,!0,w.$ti.i("aD.E"))))}},
$S:27}
B.aYV.prototype={
$1(d){return new B.ut(d,this.a.as)},
$S:z+7}
B.cbd.prototype={
$1(d){return J.ha(self.window.navigator.userAgent,A.bD(d,!1,!1))},
$S:8}
B.aZ8.prototype={
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
w.push(A.iN(t,"canplay",new B.aZ4(x),!1,v))
w.push(A.iN(t,"resize",new B.aZ5(x),!1,v))
w.push(A.iN(t,"error",new B.aZ6(t),!1,v))
w.push(A.iN(t,"ended",new B.aZ7(),!1,v))
return t},
$S:159}
B.aZ4.prototype={
$1(d){this.a.aoy()},
$S:22}
B.aZ5.prototype={
$1(d){this.a.aoy()},
$S:22}
B.aZ6.prototype={
$1(d){var x,w,v=this.a.error
A.oZ("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.Kb.h(0,A.ax(v,"code"))
x.toString
w=!J.r(A.ax(v,"message"),"")?A.ax(v,"message"):"No further diagnostic information can be determined or provided."
throw A.o(A.oj(x,C.Ka.h(0,A.ax(v,"code")),w,null))},
$S:25}
B.aZ7.prototype={
$1(d){},
$S:22}
B.aZ9.prototype={
$0(){},
$S:0}
B.aZb.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aZa.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.abE("RTCVideoRenderer-"+w.Q)
else w=A.S(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cw(A.S(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1218}
B.aMs.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fM(w.gir(w),new B.aMr(v),w.gpC())},
$S:0}
B.aMr.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.akJ()
x=x.b
x===$&&A.d()
x.ab(0)},
$S:0}
B.bAb.prototype={
$1(d){},
$S:17}
B.aCp.prototype={
$1(d){this.a.cI(0,this.b)},
$S:27}
B.aCq.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hB(new B.MD("Failed to connect WebSocket"))
else this.b.afy(1006,"error")},
$S:27}
B.aCr.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cE("data")
if(typeof x==="string")w.b=new B.M2(A.bs(x))
else if(typeof x==="object"&&A.co6(y.m.a(x),"ArrayBuffer"))w.b=new B.Hg(A.U4(y.o.a(x),0,null))
else throw A.o(A.am("unexpected message type: "+J.aI(x).l(0)))
v.E(0,w.bm())},
$S:25}
B.aCs.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cI(0,this.b)
this.b.afy(d.code,d.reason)},
$S:27}
B.axZ.prototype={
$1(d){var x=d.b,w=this.a
new A.cP(x,A.x(x).i("cP<1>")).cQ(new B.axW(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cP(x,A.x(x).i("cP<1>")).bnX(new B.axX(d),new B.axY(w,d))
w.f.dP(0)},
$S:z+8}
B.axW.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.M2
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.Hg
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.HI){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.ab(0)}}},
$S:z+9}
B.axX.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.aq(B.cgQ())
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
throw A.o(t)}}catch(r){if(!(A.N(r) instanceof B.MC))throw r}},
$S:18}
B.axY.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.zj(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.N(q) instanceof B.MC))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.ay_.prototype={
$1(d){var x,w=d instanceof A.XU?d:new B.aiQ(J.l(d)),v=this.a
v.f.hB(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.i8(w)
v=v.a
v===$&&A.d()
v.ab(0)},
$S:36};(function aliases(){var x=B.Ii.prototype
x.aBT=x.ab
x=B.a5R.prototype
x.aFI=x.m})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.a_H.prototype,"gaHW","H3",0)
var v
w(v=B.a_G.prototype,"gaop","aoq",2)
x(v,"galr","Jx",0)
x(v,"galN","alO",1)
x(v,"gaei","Qe",0)
x(v,"gaeh","Qd",0)
x(v,"gaeg","Qa",0)
x(v,"gapu","bdb",1)
x(v,"gakS","b2C",1)
w(v=B.a8R.prototype,"gb5A","b5B",6)
x(v,"gb4_","a3P",1)
x(B.Vd.prototype,"gec","m",0)
x(B.Vg.prototype,"gb1K","b1L",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.ac,[B.Ii,B.aA7,B.LE,B.a94,B.b3b,B.a8R,B.acL,B.aYT,B.TD,B.JU,B.aTp,B.Va,B.Vb,B.aZ3,B.ahv,B.a0A,B.ahu,B.Bs,B.vq,B.MD,B.aiQ,B.KL,B.Ez,B.Vc,B.Ve])
v(B.WS,A.h6)
w(A.kp,[B.b3O,B.ca0,B.bv6,B.bv3,B.bv4,B.bv0,B.bv1,B.bv2,B.buY,B.buZ,B.bv5,B.buK,B.buI,B.buL,B.buM,B.buH,B.bur,B.bus,B.buu,B.buq,B.buv,B.buw,B.bup,B.buE,B.buF,B.buo,B.bun,B.bum,B.buB,B.buC,B.aDT,B.aTs,B.aTt,B.aZ9,B.aZb,B.aMs,B.aMr,B.axY])
w(A.jP,[B.b3P,B.ca1,B.aA8,B.bv7,B.bv_,B.buJ,B.buN,B.buO,B.buP,B.but,B.bux,B.buy,B.buz,B.buR,B.buS,B.buT,B.buU,B.buV,B.buW,B.buG,B.buQ,B.buA,B.buD,B.b3c,B.b3d,B.b3e,B.aDS,B.cb4,B.aTG,B.aTH,B.aTD,B.aTE,B.aTF,B.aTu,B.aYW,B.aYX,B.aYY,B.aYZ,B.aZ_,B.aZ0,B.aZ1,B.aZ2,B.aYV,B.cbd,B.aZ8,B.aZ4,B.aZ5,B.aZ6,B.aZ7,B.bAb,B.aCp,B.aCq,B.aCr,B.aCs,B.axZ,B.axW,B.axX,B.ay_])
w(A.T,[B.qU,B.qT,B.NR,B.Vf])
w(A.Z,[B.a_H,B.a_G,B.a5R,B.Vg])
w(A.av,[B.Z8,B.akw,B.Z9,B.A4])
w(A.tE,[B.buX,B.bQR,B.aTr,B.aZa])
v(B.ap9,B.a5R)
v(B.aYU,B.aYT)
v(B.ut,B.TD)
v(B.ade,B.JU)
v(B.aTq,B.aTp)
v(B.af6,B.Va)
v(B.af7,B.Vb)
v(B.cg9,B.aZ3)
v(B.Vd,A.dw)
w(B.ahv,[B.abn,B.axV])
w(B.vq,[B.M2,B.Hg,B.HI])
v(B.MC,B.MD)
v(B.auo,B.Ii)
w(A.N9,[B.z8,B.V9,B.z7,B.op,B.af8])
x(B.a5R,A.h4)})()
A.oR(b.typeUniverse,JSON.parse('{"Ii":{"e7":["1"]},"WS":{"h6":["1","2"],"h6.S":"1","h6.T":"2"},"NR":{"T":[],"q":[]},"qU":{"T":[],"q":[]},"a_H":{"Z":["qU"]},"Z8":{"av":[],"q":[]},"qT":{"T":[],"q":[]},"a_G":{"Z":["qT"]},"akw":{"av":[],"q":[]},"Z9":{"av":[],"q":[]},"A4":{"av":[],"q":[]},"ap9":{"Z":["NR"]},"ut":{"TD":[]},"ade":{"JU":[]},"af6":{"Va":[]},"af7":{"Vb":[]},"Vd":{"dw":["Ve"],"b2":[]},"Vf":{"T":[],"q":[]},"Vg":{"Z":["Vf"]},"a0A":{"e7":["1"]},"Bs":{"cgP":[]},"M2":{"vq":[]},"Hg":{"vq":[]},"HI":{"vq":[]},"MD":{"bK":[]},"MC":{"bK":[]},"auo":{"e7":["@"]},"aiQ":{"bK":[]}}'))
A.csu(b.typeUniverse,JSON.parse('{"Ii":1,"ahv":1}'))
var y=(function rtii(){var x=A.aA
return{b:x("Bs"),L:x("bK"),_:x("aw<@>"),x:x("aw<~>"),S:x("H<ah<p,V>>"),t:x("H<ah<p,@>>"),Q:x("H<JU>"),d:x("H<jx<@>>"),s:x("H<p>"),p:x("H<q>"),m:x("aE"),l:x("F<aE>"),F:x("F<ah<p,@>>"),j:x("F<@>"),I:x("F<v>"),P:x("ah<p,@>"),f:x("ah<@,@>"),E:x("TD"),G:x("JU"),h:x("ut"),o:x("rd"),a:x("bz"),K:x("ac"),J:x("Va"),e:x("Vb"),v:x("Ez"),Z:x("ahu<ac?>"),N:x("p"),i:x("rN"),M:x("e4"),D:x("vq"),U:x("X<p>"),g:x("dT<LE>"),n:x("dT<~>"),V:x("bf<Bs>"),r:x("bf<@>"),R:x("bf<~>"),k:x("a_R<aE>"),C:x("qc<aE>"),u:x("aC<Bs>"),c:x("aC<@>"),W:x("aC<~>"),q:x("kQ"),y:x("V"),z:x("@"),A:x("aE?"),X:x("ac?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.zL=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.ZP=new B.a94(C.fp)
D.rS=new A.al(32,0,32,0)
D.a3s=new A.al(8,20,8,20)
D.a3K=new A.cR(1,C.ar,C.w9,null)
D.BO=new A.ap(57639,"MaterialIcons",null,!1)
D.a4T=new A.ap(58337,"MaterialIcons",null,!1)
D.a4U=new A.ap(58341,"MaterialIcons",null,!1)
D.BY=new A.ap(59048,"MaterialIcons",null,!1)
D.a4Y=new A.ap(59049,"MaterialIcons",null,!1)
D.a4Z=new A.ap(59077,"MaterialIcons",null,!1)
D.BT=new A.ap(58195,"MaterialIcons",null,!1)
D.a6W=new A.aa(D.BT,null,C.m,null,null)
D.a6V=new A.aa(D.BT,28,C.m,null,null)
D.a4X=new A.ap(58923,"MaterialIcons",null,!1)
D.a7c=new A.aa(D.a4X,null,C.m,null,null)
D.agB=A.a(x([1,2,4,8,16]),A.aA("H<v>"))
D.am8=A.a(x([]),y.Q)
D.Kr=new A.h3("FlutterWebRTC.Method",C.bk,null)
D.aw9=new B.op(0,"RTCIceConnectionStateNew")
D.awa=new B.op(1,"RTCIceConnectionStateChecking")
D.awb=new B.op(2,"RTCIceConnectionStateCompleted")
D.awc=new B.op(3,"RTCIceConnectionStateConnected")
D.awd=new B.op(4,"RTCIceConnectionStateCount")
D.P3=new B.op(5,"RTCIceConnectionStateFailed")
D.awe=new B.op(6,"RTCIceConnectionStateDisconnected")
D.P4=new B.op(7,"RTCIceConnectionStateClosed")
D.P5=new B.V9(0,"RTCIceGatheringStateNew")
D.awf=new B.V9(1,"RTCIceGatheringStateGathering")
D.awg=new B.V9(2,"RTCIceGatheringStateComplete")
D.vi=new B.z7(0,"RTCPeerConnectionStateClosed")
D.P6=new B.z7(1,"RTCPeerConnectionStateFailed")
D.P7=new B.z7(2,"RTCPeerConnectionStateDisconnected")
D.P8=new B.z7(3,"RTCPeerConnectionStateNew")
D.P9=new B.z7(4,"RTCPeerConnectionStateConnecting")
D.Pa=new B.z7(5,"RTCPeerConnectionStateConnected")
D.awh=new B.z8(0,"RTCSignalingStateStable")
D.awi=new B.z8(1,"RTCSignalingStateHaveLocalOffer")
D.awj=new B.z8(2,"RTCSignalingStateHaveRemoteOffer")
D.awk=new B.z8(3,"RTCSignalingStateHaveLocalPrAnswer")
D.awl=new B.z8(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Pb=new B.z8(5,"RTCSignalingStateClosed")
D.awm=new B.Ve(0,0,0)
D.vj=new B.af8(0,"RTCVideoViewObjectFitContain")
D.Pc=new B.af8(1,"RTCVideoViewObjectFitCover")
D.aA6=new A.cj(48,null,null,null)
D.aAj=new A.cj(null,64,null,null)
D.aDj=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aDx=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wA=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.chP=null
$.crw=!1
$.cpD=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"d4n","cjp",()=>new B.aYU())
x($,"d1_","cja",()=>C.d.q(A.ax(A.ax(A.ax(A.ciP(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"JzFSCtF3iw7U64mX+QV1WbBQCb4=");