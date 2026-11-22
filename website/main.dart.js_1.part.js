((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Ig:function Ig(){},WO:function WO(d){this.$ti=d},b3q:function b3q(d){this.a=d},b3r:function b3r(d,e){this.a=d
this.b=e},
ct_(d){var x
B.c6i()
if(d.length===0)return
x=A.bV(new B.c81(d))
self.window.addEventListener("beforeunload",x)
$.cfM=new B.c80(x)},
c6i(){var x=$.cfM
if(x!=null)x.$0()
$.cfM=null},
c81:function c81(d){this.a=d},
c80:function c80(d){this.a=d},
a7m(d){var x,w,v,u,t=new B.azO(),s=J.N(d),r=s.h(d,"id")
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
return new B.azN(r,x,w,v,u)},
cei(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mJ(t,y.N,y.z):C.bn
if(u.h(d,"cree_le")!=null)A.c0(J.l(u.h(d,"cree_le")))
return new B.LB(s,x,w,v)},
cCx(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.ZD
x=A.a([],y.t)
for(r=J.as(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mJ(s,u,t))}return new B.a8Y(x)},
ctP(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oT(v)
if(!x.p(v,"offer")&&!x.p(v,"answer"))return null
return new A.aqf(w,v)},
cTa(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aqi(u,A.i1(w)?w:null,v)},
azN:function azN(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
azO:function azO(){},
LB:function LB(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a8Y:function a8Y(d){this.a=d},
ckT(d,e,f,g,h,i,j){return new B.qP(f,g,j,i,e,d,null)},
ccB(d,e,f,g,h,i,j,k,l,m){return new B.qO(f,m,h,l,i,d,j,k,e,g,null)},
cpJ(d,e,f,g,h,i,j,k,l,m,n){return new B.akq(e,g,f,d,n,j,i,h,m,k,l,null)},
crK(d,e){var x=null
return new A.V(D.rO,A.c(d.toUpperCase(),2,C.a4,x,x,A.c6(x,x,C.m,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.A,x,x,!0,x,1.2,x,x,x,x,x,x),C.X,x,x),x)},
qP:function qP(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_C:function a_C(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
but:function but(d){this.a=d},
buu:function buu(d){this.a=d},
buq:function buq(d){this.a=d},
bur:function bur(d){this.a=d},
bun:function bun(d){this.a=d},
buo:function buo(d){this.a=d},
bup:function bup(d){this.a=d},
buk:function buk(d){this.a=d},
bul:function bul(d){this.a=d},
bum:function bum(d){this.a=d},
bus:function bus(d){this.a=d},
Z3:function Z3(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qO:function qO(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
a_B:function a_B(d,e){var _=this
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
bu5:function bu5(d){this.a=d},
bu6:function bu6(d){this.a=d},
bu4:function bu4(d){this.a=d},
bu7:function bu7(d){this.a=d},
bu8:function bu8(){},
bu9:function bu9(d){this.a=d},
bu3:function bu3(d,e){this.a=d
this.b=e},
bua:function bua(){},
bub:function bub(d){this.a=d},
btO:function btO(d){this.a=d},
btP:function btP(d){this.a=d},
btQ:function btQ(d){this.a=d},
btR:function btR(d){this.a=d},
btN:function btN(d){this.a=d},
btS:function btS(d){this.a=d},
btT:function btT(d){this.a=d},
btU:function btU(d){this.a=d},
btM:function btM(d,e){this.a=d
this.b=e},
btV:function btV(){},
btW:function btW(d){this.a=d},
bud:function bud(d){this.a=d},
bue:function bue(d){this.a=d},
buf:function buf(d){this.a=d},
bug:function bug(d){this.a=d},
buh:function buh(d){this.a=d},
bui:function bui(d){this.a=d},
bu0:function bu0(d,e){this.a=d
this.b=e},
bu1:function bu1(d){this.a=d},
bu2:function bu2(d){this.a=d},
buc:function buc(){},
btL:function btL(d,e){this.a=d
this.b=e},
btK:function btK(d,e){this.a=d
this.b=e},
btJ:function btJ(d,e){this.a=d
this.b=e},
btY:function btY(d){this.a=d},
btZ:function btZ(d){this.a=d},
btX:function btX(d){this.a=d},
bu_:function bu_(d){this.a=d},
buj:function buj(d){this.a=d},
akq:function akq(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Z4:function Z4(d,e){this.c=d
this.a=e},
A3:function A3(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
NO:function NO(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
ap3:function ap3(d,e){var _=this
_.d=$
_.eK$=d
_.bS$=e
_.c=_.a=null},
bP2:function bP2(d,e){this.a=d
this.b=e},
a5L:function a5L(){},
b2O:function b2O(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b2P:function b2P(d){this.a=d},
b2Q:function b2Q(d){this.a=d},
b2R:function b2R(d){this.a=d},
a8K:function a8K(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aDy:function aDy(d){this.a=d},
aDz:function aDz(d){this.a=d},
c92(d){var x=y.U,w=A.H(new A.X(A.a(d.split(" "),y.s),new B.c93(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gU(w),0).toUpperCase()
return(J.m(C.b.gU(w),0)+J.m(C.b.gaZ(w),0)).toUpperCase()},
c93:function c93(){},
acE:function acE(){this.a=null},
aYw:function aYw(){},
ur:function ur(d,e){this.e=d
this.b=e},
aTl:function aTl(d){this.a=d},
aTm:function aTm(d){this.a=d},
cdq(d){var x=new B.ad7(d)
x.aGM(d)
return x},
ad7:function ad7(d){this.d=d},
aTi:function aTi(d){this.a=d},
aTj:function aTj(d){this.a=d},
aTk:function aTk(d){this.a=d},
aT5:function aT5(){},
aT7:function aT7(){},
aT8:function aT8(){},
aT9:function aT9(d){this.a=d},
aT6:function aT6(d){this.a=d},
cIE(d,e){var x=y.N
x=new B.af_(d,e,A.C(x,y.E),A.C(x,y.z))
x.aGV(d,e)
return x},
af_:function af_(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYy:function aYy(d){this.a=d},
aYz:function aYz(d){this.a=d},
aYA:function aYA(d){this.a=d},
aYB:function aYB(d){this.a=d},
aYC:function aYC(d){this.a=d},
aYD:function aYD(d){this.a=d},
aYE:function aYE(d){this.a=d},
aYF:function aYF(d){this.a=d},
aYx:function aYx(d){this.a=d},
af0:function af0(){},
ce5:function ce5(d){this.a=d},
cVz(){return C.b.nS(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.c9c())!==-1},
c9c:function c9c(){},
cnA(){var x=A.a([],y.d),w=$.cnB
$.cnB=w+1
return new B.V9(w,x,D.aw7,$.af())},
V9:function V9(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aYL:function aYL(d){this.a=d},
aYH:function aYH(d){this.a=d},
aYI:function aYI(d){this.a=d},
aYJ:function aYJ(d){this.a=d},
aYK:function aYK(){},
ce6(d,e,f){return new B.Vb(d,f,e,null)},
Vb:function Vb(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Vc:function Vc(){this.c=this.a=null},
aYM:function aYM(){},
aYO:function aYO(d){this.a=d},
aYN:function aYN(d){this.a=d},
clx(d,e,f,g){var x,w={}
w.a=d
x=new B.abg(g.i("abg<0>"))
x.aGt(e,f,w,g)
return x},
abg:function abg(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aM8:function aM8(d,e){this.a=d
this.b=e},
aM7:function aM7(d){this.a=d},
a0v:function a0v(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bzt:function bzt(){},
ahn:function ahn(d){this.b=this.a=$
this.$ti=d},
aho:function aho(){},
cbY(d,e){return B.cBG(d,e)},
cBG(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$cbY=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.q2("ws")&&!d.q2("wss"))throw A.o(A.fN(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.k(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.Bq(r,A.h3(null,null,null,!1,y.D))
u=new A.aB($.aK,y.u)
p=new A.bf(u,y.V)
if(J.r(r.readyState,1))p.cH(0,q)
else if(J.r(r.readyState,2)||J.r(r.readyState,3))p.hB(new B.MA("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.qa(r,"open",!1,y.C).gU(0).aL(new B.aC4(p,q),y.H)
t=y.C
s=y.H
new A.qa(r,"error",!1,t).gU(0).aL(new B.aC5(p,q),s)
A.iL(r,"message",new B.aC6(q),!1,y.m)
new A.qa(r,"close",!1,t).gU(0).aL(new B.aC7(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$cbY,w)},
Bq:function Bq(d,e){this.a=d
this.b=e},
aC4:function aC4(d,e){this.a=d
this.b=e},
aC5:function aC5(d,e){this.a=d
this.b=e},
aC6:function aC6(d){this.a=d},
aC7:function aC7(d,e){this.a=d
this.b=e},
ceN(){return new B.Mz("Connection Closed")},
vo:function vo(){},
M_:function M_(d){this.a=d},
He:function He(d){this.a=d},
HG:function HG(d,e){this.a=d
this.b=e},
MA:function MA(d){this.a=d},
Mz:function Mz(d){this.a=d},
cB7(d){var x=null,w=$.aK,v=new B.ahn(y.Z),u=y.X,t=A.h3(x,x,x,!0,u),s=A.h3(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.clx(new A.cL(s,r.i("cL<1>")),new A.Gq(t,q.i("Gq<1>")),!0,u)
v.b=B.clx(new A.cL(t,q.i("cL<1>")),new A.Gq(s,r.i("Gq<1>")),!1,u)
v=new B.axK(new A.bf(new A.aB(w,y.W),y.R),v)
v.aGb(d)
return v},
axK:function axK(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axO:function axO(d){this.a=d},
axL:function axL(d){this.a=d},
axM:function axM(d){this.a=d},
axN:function axN(d,e){this.a=d
this.b=e},
axP:function axP(d){this.a=d},
aui:function aui(d,e){this.b=d
this.a=e},
aiK:function aiK(d){this.a=d},
cV7(d){switch(d){case"new":return D.avV
case"checking":return D.avW
case"connected":return D.avY
case"completed":return D.avX
case"failed":return D.OQ
case"disconnected":return D.aw_
case"closed":return D.OR
case"count":return D.avZ}return D.OR},
cV8(d){switch(d){case"new":return D.OS
case"gathering":return D.aw0
case"complete":return D.aw1}return D.OS},
cXl(d){switch(d){case"stable":return D.aw2
case"have-local-offer":return D.aw3
case"have-local-pranswer":return D.aw5
case"have-remote-offer":return D.aw4
case"have-remote-pranswer":return D.aw6
case"closed":return D.OY}return D.OY},
cWu(d){switch(d){case"new":return D.OV
case"connecting":return D.OW
case"connected":return D.OX
case"closed":return D.ve
case"disconnected":return D.OU
case"failed":return D.OT}return D.ve},
z6:function z6(d,e){this.a=d
this.b=e},
V5:function V5(d,e){this.a=d
this.b=e},
z5:function z5(d,e){this.a=d
this.b=e},
ok:function ok(d,e){this.a=d
this.b=e},
af1:function af1(d,e){this.a=d
this.b=e},
aYv:function aYv(){},
TA:function TA(){},
JS:function JS(){},
aT4:function aT4(){},
KI:function KI(d,e,f){this.a=d
this.b=e
this.c=f},
V6:function V6(){},
V7:function V7(){},
aYG:function aYG(){},
Ex:function Ex(d,e){this.a=d
this.b=e},
V8:function V8(d){this.b=d},
Va:function Va(d,e,f){this.a=d
this.b=e
this.c=f},
cd1(d){var x=0,w=A.k(y.y)
var $async$cd1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.o("The is not a video track => "+d.k(0))
throw A.o("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$cd1,w)},
adv(d){var x=0,w=A.k(y.H),v
var $async$adv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b8l("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$adv)
case 2:return A.i(null,w)}})
return A.j($async$adv,w)},
aVl(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aVl=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mJ(y.f.a(A.c7M(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.UU(0,u),$async$aVl)
case 5:case 4:v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aVl,w)},
b8l(d,e,f,g){return B.cMe(d,e,f,g,f.i("0?"))},
cMe(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b8l=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b8k(),$async$b8l)
case 3:v=D.Kd.cm(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b8l,w)},
b8k(){var x=0,w=A.k(y.H),v,u
var $async$b8k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.cpu?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Kd.cm("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$b8k)
case 4:$.cpu=!0
case 3:return A.i(null,w)}})
return A.j($async$b8k,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[26]
B.Ig.prototype={
E(d,e){this.a.E(0,e)},
dz(d,e){this.a.dz(d,e)},
a9(d){return this.a.a9(0)},
$ie6:1}
B.WO.prototype={
hO(d){var x=A.cB("subscription"),w=A.h3(new B.b3q(x),null,null,!0,this.$ti.y[1])
x.b=d.fM(new B.b3r(this,w),w.gnK(w),w.gpA())
return new A.cL(w,A.x(w).i("cL<1>"))}}
B.azN.prototype={}
B.LB.prototype={}
B.a8Y.prototype={}
B.qP.prototype={
P(){return new B.a_C()}}
B.a_C.prototype={
S(){var x,w,v=this
v.W()
x=v.a
x.toString
v.z=!0
w=new B.acE()
v.y!==$&&A.aJ()
v.y=w
if(!x.y)w.uc(A.BD(C.lj,$.vZ().a).c)
v.PZ()
v.r=A.du(C.c8,new B.but(v))
v.w=A.hp(C.rD,new B.buu(v))},
m(){var x=this,w=x.r
if(w!=null)w.Y(0)
w=x.w
if(w!=null)w.Y(0)
w=x.x
if(w!=null)w.Y(0)
w=x.y
w===$&&A.d()
w.ir()
if(x.z)w.hq()
x.a3()},
a3S(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.du(C.fU,new B.buq(this))},
Uo(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Uo=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a_()
x=7
return A.e(o.Ew(p.c),$async$Uo)
case 7:r=e
q=B.a7m(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.l(new B.bur(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
p=s.y
p===$&&A.d()
p.ir()
s.a3S()}u=2
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
return A.j($async$Uo,w)},
PZ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$PZ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a_()
x=7
return A.e(n.Ew(o.c),$async$PZ)
case 7:r=e
q=B.a7m(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gwU()
p=m
if(q.w!=="sonne"||q.c===p){s.l(new B.bun(s))
o=s.y
o===$&&A.d()
o.ir()
s.a3S()
x=1
break}s.l(new B.buo(s))
if(s.a.y)s.GY()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.l(new B.bup(s))
o=s.y
o===$&&A.d()
o.ir()
s.a3S()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$PZ,w)},
GY(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$GY=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.l(new B.buk(s))
u=4
q=s.a
q.toString
p=$.a_()
x=7
return A.e(p.LO(q.c,"accepte"),$async$GY)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.L(n)
if(s.c==null){x=1
break}s.l(new B.bul(s))
q=s.c
q.toString
p=J.l(r)
q.t(y.q).f.A(A.z(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.k,null,null,null,null,null,null,null,null,null))
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
q.ir()
q=s.c
q.toString
A.a2(q,!1).Az(A.ef(new B.bum(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GY,w)},
Jx(d){return this.b5p(d)},
b5o(){return this.Jx(!1)},
b5p(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Jx=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Y(0)
r=s.w
if(r!=null)r.Y(0)
r=s.y
r===$&&A.d()
r.ir()
u=4
r=s.a
r.toString
q=$.a_()
x=7
return A.e(q.LO(r.c,"refuse"),$async$Jx)
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
if(r!=null)A.a2(r,!1).bN()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jx,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jM(C.t,s,A.c(B.c92(r.d),s,s,s,s,D.aDg,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.aD2,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.az,new A.V(D.rO,x,s),C.l,A.c(q,s,s,s,s,D.ww,s,s,s),D.aA3],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.bus(t)
v=A.b("Accepter")
u=t.f?s:t.gaHE()
q.push(A.P(A.a([new B.Z3(D.BF,C.aG,r,x,s),D.azR,new B.Z3(C.nN,C.cZ,v,u,s)],w),C.n,C.bz,C.i,s))}if(t.d)q.push(C.z2)
return A.e0(s,C.o,A.fs(!0,A.cw(A.J(q,C.n,C.f,C.P),s,s),!0,C.a0,!0,!0),s,s,s)}}
B.Z3.prototype={
D(d){var x=this,w=null,v=A.dj(x.d,w,w,C.a0,C.cK,w)
return A.J(A.a([A.ad(A.b7(!1,A.bZ(x.c,C.m,w,32),C.j,w,C.p,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.dI,w,w,w)],y.p),C.n,C.f,C.P)}}
B.qO.prototype={
P(){return new B.a_B(A.b6(y.N),C.R)}}
B.a_B.prototype={
S(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.W()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.b2O(B.cnA(),B.cnA())
o.d!==$&&A.aJ()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a8K(new A.dT(n,n,y.g),new A.dT(n,n,y.n))
o.e!==$&&A.aJ()
o.e=v
o.fr=!0
u=new B.acE()
o.dy!==$&&A.aJ()
o.dy=u
t=w.x
if(t!=null){s=$.kX()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.kX()
s=o.r
r=w.e
p=w.d
t.bi3(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.as=!0
if(q){o.Tr()
return}if(x.f)u.uc("assets/audio/tonalite-appel.wav")
o.t4()},
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
w.ir()
if(x.fr)w.hq()
w=$.kX()
if(!(w.r&&w.a===x.r&&!x.y)){B.c6i()
w=x.d
w===$&&A.d()
w.hq()
w=x.e
w===$&&A.d()
w.Lt()}x.a3()},
Tr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Tr=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.a_()
s.w=o.gwU()
n=$.kX()
s.Q=n.x
s.as=n.y
s.x=n.e
n=n.f
s.ay=n
if(n!=null){n=Date.now()
m=s.ay
m.toString
s.ch=new A.aw(n,0,!1).ev(m)}B.ct_(s.r)
u=4
s.a.toString
x=7
return A.e(o.c2("/messagerie/appels/"+s.r+"/signaux"),$async$Tr)
case 7:r=e
for(o=J.as(r),n=s.f;o.B();){q=o.gK(o)
p=B.cei(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.mI(A.b("Appel termin\xe9"))
x=1
break $async$outer}}u=2
x=6
break
case 4:u=3
k=t
x=6
break
case 3:x=2
break
case 6:o=s.c!=null
if(!o||s.y){x=1
break}n=s.d
n===$&&A.d()
n.f=new B.bu5(s)
n.r=new B.bu6(s)
n.w=new B.bu7(s)
s.z=!0
if(o)s.l(new B.bu8())
s.cy=A.hp(C.cc,new B.bu9(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.ca(n,A.x(n).i("ca<1>")).cP(s.gaoc())
o=o.w
s.dx=new A.ca(o,A.x(o).i("ca<1>")).cP(new B.bua())
s.CW=A.hp(C.fU,new B.bub(s))
s.yl()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Tr,w)},
t4(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$t4=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:s.cx=A.du(C.c8,new B.btO(s))
r="appel"
u=4
q=null
h=s.a
g=h.z
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$t4)
case 10:q=a2
h=s.r=B.a7m(q).a
x=8
break
case 9:g=$.a_()
x=11
return A.e(g.Ew(h.c),$async$t4)
case 11:q=a2
h=s.r=s.a.c
case 8:g=$.kX()
g.bhQ(h)
B.ct_(s.r)
if(s.a.f)g.VN()
p=B.a7m(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mI(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.a_()
s.w=h.gwU()
r="ice"
s.a.toString
o=h.Wo()
n=s.Jf()
x=12
return A.e(o,$async$t4)
case 12:m=a2
l=B.cCx(m)
x=15
return A.e(n,$async$t4)
case 15:x=!a2?13:14
break
case 13:if(s.c==null){x=1
break}s.l(new B.btP(s))
x=16
return A.e(A.jR(C.kV,null,y.z),$async$t4)
case 16:if(s.c==null){x=1
break}s.mI(null)
x=1
break
case 14:r="webrtc"
f=s.d
f===$&&A.d()
e=s.a.d
x=17
return A.e(f.Ax(A.a6(["iceServers",l.a],y.N,y.z),e==="video"),$async$t4)
case 17:f.f=new B.btQ(s)
f.r=new B.btR(s)
f.w=new B.btS(s)
if(s.c==null){x=1
break}s.l(new B.btT(s))
g.bo1()
s.cy=A.hp(C.cc,new B.btU(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.ca(f,A.x(f).i("ca<1>")).cP(s.gaoc())
f=g.w
s.dx=new A.ca(f,A.x(f).i("ca<1>")).cP(new B.btV())
s.a.toString
k=h.b
if(k!=null&&J.a8(k)!==0){s.a.toString
g.Vk(C.d.jg("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.dP(C.bT,k,C.a6,!0))}s.CW=A.hp(C.fU,new B.btW(s))
s.yl()
u=2
x=6
break
case 4:u=3
a0=t
j=A.L(a0)
i=A.bo(a0)
if(s.c==null){x=1
break}A.tb().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.ds?j.a:s.b_y(r)
h.t(y.q).f.A(A.z(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.k,null,null,null,null,null,null,null,null,null))
s.mI(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$t4,w)},
b_y(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Jf(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Jf=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a0o(),$async$Jf)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.Fj(s.a.d==="video"),$async$Jf)
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
return A.j($async$Jf,w)},
a0o(){var x=0,w=A.k(y.y),v
var $async$a0o=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0o,w)},
yl(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$yl=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.a_()
x=7
return A.e(p.c2("/messagerie/appels/"+s.r+"/signaux"),$async$yl)
case 7:r=e
for(p=J.as(r);p.B();){q=p.gK(p)
s.aod(B.cei(q))}u=2
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
return A.j($async$yl,w)},
aod(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.ctP(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.E_(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aL(new B.bud(s),y.a).fJ(new B.bue(s))
break
case"reponse":if(!s.a.f)return
u=B.ctP(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.UT(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aL(new B.buf(s),y.a).fJ(new B.bug(s))
break
case"candidat_ice":t=B.cTa(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.UO(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Lk().aL(new B.buh(s),y.a).fJ(new B.bui(s))
break
case"refuse":s.mI(A.b("Appel refus\xe9"))
break
case"annule":s.mI(A.b("Appel annul\xe9"))
break
case"termine":s.mI(A.b("Appel termin\xe9"))
break}},
T_(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$T_=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.Y(0)
t=u.dy
t===$&&A.d()
t.ir()
u.l(new B.bu0(u,!1))
t=$.kX()
t.bpU()
s=u.Q
t.a8W(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$T_,w)},
yb(d,e,f){return this.aQB(d,e,f)},
agT(d,e){return this.yb(d,e,!0)},
aQB(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$yb=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.a_()
x=6
return A.e(s.ask(t.r,e,d),$async$yb)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mI(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$yb,w)},
Jr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Jr=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.Y(0)
r=s.dy
r===$&&A.d()
r.ir()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.a_()
x=9
return A.e(q.LO(r,"termine"),$async$Jr)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.c6i()
$.kX().NR()
r=s.c
if(r!=null)A.a2(r,!1).bN()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jr,w)},
alw(){var x=this
if(!x.x||x.y)return
$.kX().brb()
x.l(new B.bu1(x))
$.aP.aC$.push(new B.bu2(x))},
mI(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.Y(0)
x=v.dy
x===$&&A.d()
x.ir()
x=v.r
if(x.length!==0){v.a.toString
w=$.a_()
w.LO(x,"termine").fJ(new B.buc())}if(d!=null&&v.c!=null)v.c.t(y.q).f.A(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.k,u,u,u,u,u,u,u,u,u))
B.c6i()
$.kX().NR()
x=v.c
if(x!=null)A.a2(x,!1).bN()},
Q9(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q9=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_f(u),$async$Q9)
case 2:if(v.c!=null)v.l(new B.btL(v,u))
$.kX().a8W(v.as,u)
return A.i(null,w)}})
return A.j($async$Q9,w)},
Q8(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Gy(u),$async$Q8)
case 2:if(v.c!=null)v.l(new B.btK(v,u))
$.kX().a8W(u,v.Q)
return A.i(null,w)}})
return A.j($async$Q8,w)},
Q5(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q5=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_c(u),$async$Q5)
case 2:if(v.c!=null)v.l(new B.btJ(v,u))
return A.i(null,w)}})
return A.j($async$Q5,w)},
Q6(){var x=0,w=A.k(y.H),v=this,u
var $async$Q6=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.V_(),$async$Q6)
case 2:return A.i(null,w)}})
return A.j($async$Q6,w)},
anj(){var x,w=this,v="Appel en cours\u2026",u=w.fx
if(u!=null)return u
if(w.x){u=A.b(v)
x=C.c.ad(w.ch.a,1e6)
return u+" "+(C.d.aU(C.c.k(C.c.ad(x,60)),2,"0")+":"+C.d.aU(C.c.k(C.c.a_(x,60)),2,"0"))}if(w.z)return w.a.f?A.b("\xc7a sonne\u2026"):A.b(v)
return A.b("Connexion\u2026")},
bcL(){var x,w=null,v=this.c
v.toString
x=A.b("La vid\xe9o n\u2019est pas disponible pendant un appel audio.")
v.t(y.q).f.A(A.z(w,w,w,w,w,C.h,w,A.c(x,w,w,w,w,w,w,w,w),w,C.k,w,w,w,w,w,w,w,w,w))},
b29(){var x,w=this,v=null,u=A.a([],y.p)
if(w.a.d==="video")u.push(A.c_(!1,v,v,v,!0,v,v,!0,!1,D.a6Z,v,v,v,new B.btY(w),!1,v,v,v,v,v,A.c(A.b("Basculer"),v,v,v,v,C.dI,v,v,v),v,v))
if(w.x)u.push(A.c_(!1,v,v,v,!0,v,v,!0,!1,D.a6J,v,v,v,new B.btZ(w),!1,v,v,v,v,v,A.c(A.b("R\xe9duire"),v,v,v,v,C.dI,v,v,v),v,v))
if(u.length===0)return
x=w.c
x.toString
A.jF(D.zF,new B.bu_(u),x,!1,v,y.H)},
D(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.d()
x=o.c
w=q.go
v=q.a
if(v.d==="video"&&q.z){if(x!=null)x=B.ce6(o.e,!1,D.OZ)
else{x=v.e
v=v.r
u=q.fy&&q.x
x=A.cw(A.J(A.a([new B.NO(x,v,u,56,p),C.q,B.crK(x,22),C.l,A.c(q.anj(),p,p,p,p,D.ww,p,p,p)],y.p),C.n,C.f,C.P),p,p)}o=A.a([A.Eq(0,x),A.f3(p,A.eH(A.O(12),B.ce6(o.d,!0,D.OZ),C.ap),160,p,p,16,16,110)],y.p)
if(q.x)o.push(A.f3(p,new B.Z4(q.galv(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.f3(24,B.cpJ(q.ax,!0,v,x,q.gae5(),q.gae6(),q.gae7(),q.gakB(),q.gal8(),q.gapg(),!0),p,p,0,0,p,p))
o=A.e1(C.aP,o,C.h,C.aH,p)}else{x=y.p
v=A.a([],x)
if(q.fy)v.push(A.f3(p,A.rc(B.ce6(o.e,!1,D.vf),0),1,p,0,p,0,1))
if(q.x)v.push(A.f3(p,new B.Z4(q.galv(),p),p,p,16,p,16,p))
o=B.crK(q.a.e,24)
u=A.c(q.anj(),p,p,p,p,D.ww,C.X,p,p)
t=q.a
s=t.e
t=t.r
t=A.a9(A.cw(new B.NO(s,t,q.fy&&q.x,88,p),p,p),1,p)
s=q.Q
r=q.as
v.push(A.J(A.a([C.q,o,C.l,new A.V(D.rO,u,p),t,B.cpJ(q.ax,!1,r,s,q.gae5(),q.gae6(),q.gae7(),q.gakB(),q.gal8(),q.gapg(),q.x),C.q],x),C.n,C.f,C.i))
v=A.e1(C.aP,v,C.h,C.aH,p)
o=v}return A.cdR(w,A.e0(p,C.o,A.fs(!0,o,!0,C.a0,!0,!0),p,p,p),new B.buj(q),y.K)}}
B.akq.prototype={
D(d){var x,w,v=this,u=null,t=A.O(28),s=A.a9(new B.A3(D.a4N,v.e,A.b("Haut-parleur"),v.x,u,u),1,u),r=v.f?D.BP:D.a4M,q=A.b("Appel vid\xe9o")
r=A.a9(new B.A3(r,!1,q,v.c?v.y:v.z,u,u),1,u)
q=v.d
x=q?D.a4I:D.a4H
w=y.p
q=A.P(A.a([s,r,A.a9(new B.A3(x,q,A.b("Muet"),v.w,u,u),1,u)],w),C.n,C.f,C.i,u)
x=A.b("Plus")
return A.Q(u,A.J(A.a([q,C.q,A.P(A.a([A.a9(new B.A3(C.BM,!1,x,v.r?v.Q:u,u,u),1,u),A.a9(new B.A3(D.BF,!1,A.b("Terminer"),v.as,C.aG,u),1,u),D.a3y],w),C.n,C.f,C.i,u)],w),C.n,C.f,C.P),C.j,u,u,new A.a4(D.zF,u,u,t,u,u,C.v),u,u,u,C.AL,D.a3g,u,u,u)}}
B.Z4.prototype={
D(d){var x=null
return A.J(A.a([A.ad(A.b7(!1,D.a6I,C.j,x,C.p,x,x,x,x,this.c,x,A.dj(C.kO,x,x,C.a0,C.cK,x)),48,48),C.I,A.c(A.b("R\xe9duire"),x,x,x,x,C.Rm,x,x,x)],y.p),C.n,C.f,C.P)}}
B.A3.prototype={
D(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.m:C.kO
if(!r)x=C.m
else x=u.d?C.o:C.m
r=u.f
w=r==null?0.4:1
v=A.dj(s,t,t,C.a0,C.cK,t)
return A.rc(A.J(A.a([A.ad(A.b7(!1,A.bZ(u.c,x,t,30),C.j,t,C.p,t,t,t,t,r,t,v),72,72),C.l,A.c(u.e,t,t,t,t,C.px,C.X,t,t)],y.p),C.n,C.f,C.P),w)}}
B.NO.prototype={
P(){return new B.ap3(null,null)}}
B.ap3.prototype={
S(){var x,w=this
w.W()
x=A.cq(null,A.cY(0,0,w.a.e?1100:2400,0,0),null,1,null,w)
x.a9N(0,!0)
w.d!==$&&A.aJ()
w.d=x},
aT(d){var x,w
this.bf(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.d()
w.e=A.cY(0,0,x?1100:2400,0,0)
w.a9N(0,!0)}},
m(){var x=this.d
x===$&&A.d()
x.m()
this.aFr()},
D(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.d()
x=u.d
u=x!=null?A.jM(v,x,v,v,t):A.jM(C.t,v,A.c(B.c92(u.c),v,v,v,v,A.c6(v,v,C.o,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.A,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),v,t)
return A.ad(A.i8(q,new B.bP2(w,s),u),r,r)}}
B.a5L.prototype={
m(){var x=this,w=x.bS$
if(w!=null)w.T(0,x.ghM())
x.bS$=null
x.a3()},
ce(){this.dc()
this.d0()
this.hN()}}
B.b2O.prototype={
Fj(d){return this.bpJ(d)},
bpJ(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$Fj=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jz(0),$async$Fj)
case 3:$.chm()
s=y.N
r=A.a6(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aT5().Gl(0,A.a6(["audio",r,"video",d&&A.a6(["facingMode","user"],s,s)],s,y.z)),$async$Fj)
case 4:q=f
u.b=q
t.sac1(0,q)
case 1:return A.i(v,w)}})
return A.j($async$Fj,w)},
Ax(d,e){return this.bqt(d,e)},
bqt(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$Ax=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jz(0),$async$Ax)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.Fj(e),$async$Ax)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.chm().a6T(d,A.C(y.N,y.z)),$async$Ax)
case 6:t=v.a=g
s=u.abd(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a5J(0,s[q],u),$async$Ax)
case 10:case 8:s.length===r||(0,A.R)(s),++q
x=7
break
case 9:t.e=new B.b2P(v)
t.Q=new B.b2Q(v)
t.d=new B.b2R(v)
return A.i(null,w)}})
return A.j($async$Ax,w)},
aOB(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sac1(0,d)
w.Hb()
x=w.r
if(x!=null)x.$0()}},
Hb(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$Hb=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.Ou(0)
if(m==null)m=C.dl
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aVl(n,s),$async$Hb)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.L(l)
A.tb().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.R)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$Hb,w)},
Lk(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Lk=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Vz(0),$async$Lk)
case 3:t=e
x=4
return A.e(s.Gz(0,t),$async$Lk)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Lk,w)},
E_(d){return this.bhf(d)},
bhf(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$E_=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.GB(0,new B.Ex(d.h(0,"sdp"),d.h(0,"type"))),$async$E_)
case 3:x=4
return A.e(s.Vw(0),$async$E_)
case 4:t=f
x=5
return A.e(s.Gz(0,t),$async$E_)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$E_,w)},
UT(d){return this.be4(d)},
be4(d){var x=0,w=A.k(y.H),v=this,u
var $async$UT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.GB(0,new B.Ex(d.h(0,"sdp"),d.h(0,"type"))),$async$UT)
case 2:return A.i(null,w)}})
return A.j($async$UT,w)},
UO(d){return this.bdQ(d)},
bdQ(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$UO=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.UB(new B.KI(A.an(d.h(0,"candidate")),A.an(d.h(0,"sdpMid")),A.dV(d.h(0,"sdpMLineIndex")))),$async$UO)
case 3:case 1:return A.i(v,w)}})
return A.j($async$UO,w)},
a_f(d){return this.azK(d)},
azK(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$a_f=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Ou(0)
if(r==null)r=C.dl
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.R)(r),++s)r[s].slU(0,t)
return A.i(null,w)}})
return A.j($async$a_f,w)},
Gy(d){return this.azA(d)},
azA(d){var x=0,w=A.k(y.H),v=this
var $async$Gy=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.adv(d),$async$Gy)
case 2:x=3
return A.e(v.Hb(),$async$Gy)
case 3:return A.i(null,w)}})
return A.j($async$Gy,w)},
a_c(d){return this.azq(d)},
azq(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$a_c=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.OH(0)
if(s==null)s=C.dl
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.R)(s),++t)s[t].slU(0,d)
return A.i(null,w)}})
return A.j($async$a_c,w)},
V_(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$V_=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.OH(0)
if(s==null)s=D.alX
if(s.length===0){x=1
break}x=3
return A.e(B.cd1(C.b.gU(s)),$async$V_)
case 3:case 1:return A.i(v,w)}})
return A.j($async$V_,w)},
hq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hq=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.adv(!1),$async$hq)
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
p=p==null?null:p.a9(0)
x=12
return A.e(y.x.b(p)?p:A.dw(p,y.H),$async$hq)
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
p=p==null?null:p.abd(0)
if(p==null)p=C.dl
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cB1(r)
if(!m.b(k)){j=new A.aB($.aK,n)
j.a=8
j.c=k
k=j}x=20
return A.e(k,$async$hq)
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
return A.e(s.d.m(),$async$hq)
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
return A.e(s.e.m(),$async$hq)
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
return A.j($async$hq,w)}}
B.a8K.prototype={
Vk(d){return this.bfv(d)},
bfv(d){var x=0,w=A.k(y.H),v=this
var $async$Vk=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.H9(),$async$Vk)
case 2:return A.i(null,w)}})
return A.j($async$Vk,w)},
H9(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$H9=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a8(r)===0){x=1
break}u=4
q=B.cB7(B.cbY(A.cF(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$H9)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cL(p,A.x(p).i("cL<1>")).b6(s.gb56(),!0,s.gb3x(),new B.aDy(s))
u=2
x=6
break
case 4:u=3
n=t
s.a3G()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$H9,w)},
b57(d){var x,w,v,u
try{x=C.a_.cX(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.r(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.cei(w))}catch(u){}},
a3G(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.agn[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.du(A.cY(0,0,0,0,x),new B.aDz(w))},
Lt(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Lt=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$Lt)
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
r=s.w=new B.aui(s,q)}s=r.a9(0)}x=7
return A.e(y._.b(s)?s:A.dw(s,y.z),$async$Lt)
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
return A.j($async$Lt,w)}}
B.acE.prototype={
uc(d){return this.bnd(d)},
bnd(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$uc=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.Bj():r).aV(0),$async$uc)
case 6:x=7
return A.e(t.a.a_b(d),$async$uc)
case 7:x=8
return A.e(t.a.jl(C.JT),$async$uc)
case 8:x=9
return A.e(t.a.ik(1),$async$uc)
case 9:x=10
return A.e(t.a.cV(0),$async$uc)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.L(p)
A.tb().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$uc,w)},
ir(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$ir=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aV(0)
x=6
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$ir)
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
return A.j($async$ir,w)},
hq(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hq=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.m()
x=6
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$hq)
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
return A.j($async$hq,w)}}
B.aYw.prototype={
a6T(d,e){return this.bh4(d,e)},
bh4(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a6T=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.a([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fS(u,y.N,y.z)
t.u(0,d)
s=new r(y.m.a(A.cd(t)))
t=J.l(s)
v=B.cIE(C.ch.gkr().bi(new A.eI(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a6T,w)}}
B.ur.prototype={
Ou(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.da(w,A.Z(w).i("da<1,aE>"))
J.hv(w,new B.aTl(x))
return x},
OH(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.da(w,A.Z(w).i("da<1,aE>"))
J.hv(w,new B.aTm(x))
return x},
abd(d){var x=A.H(this.Ou(0),!0,y.G)
C.b.u(x,this.OH(0))
return x}}
B.ad7.prototype={
aGM(d){var x=this,w=x.d
w.addEventListener("ended",A.bV(new B.aTi(x)))
w.addEventListener("mute",A.bV(new B.aTj(x)))
w.addEventListener("unmute",A.bV(new B.aTk(x)))},
slU(d,e){this.d.enabled=e},
UU(d,e){return this.be7(0,e)},
be7(d,e){var x=0,w=A.k(y.H),v=this
var $async$UU=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.eh(v.d.applyConstraints(y.m.a(A.cd(e))),y.X),$async$UU)
case 2:return A.i(null,w)}})
return A.j($async$UU,w)},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aT5.prototype={
Gl(d,e){return this.ayw(0,e)},
ayw(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Gl=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cVz())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.jg(e.h(0,"video"),"facingMode")
e.cS(0,"video",new B.aT7())
e.cS(0,"audio",new B.aT8())}catch(a0){A.oU("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hc(e.h(0,"audio"),i,i).aD(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.hv(s,new B.aT9(r))
J.jg(e.h(0,"audio"),"optional")
J.jG(e.h(0,"audio"),r)}}catch(a0){q=A.L(a0)
p=A.bo(a0)
A.oU("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.cd(e)
x=10
return A.e(A.eh(o.getUserMedia(h.a(n)),h),$async$Gl)
case 10:m=a2
v=new B.ur(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eh(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Gl)
case 11:l=a2
v=new B.ur(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.L(f)
i=J.l(k)
throw A.o("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gl,w)}}
B.af_.prototype={
aGV(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bV(new B.aYy(x)))
w.addEventListener("icecandidate",A.bV(new B.aYz(x)))
w.addEventListener("iceconnectionstatechange",A.bV(new B.aYA(x)))
w.onicegatheringstatechange=A.bV(new B.aYB(x))
w.addEventListener("signalingstatechange",A.bV(new B.aYC(x)))
if(!$.ch7())w.addEventListener("connectionstatechange",A.bV(new B.aYD(x)))
w.addEventListener("negotiationneeded",A.bV(new B.aYE(x)))
w.addEventListener("track",A.bV(new B.aYF(x)))},
Vz(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Vz=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eh(s.createOffer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$Vz)
case 3:t=f
v=new B.Ex(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Vz,w)},
Vw(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Vw=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eh(s.createAnswer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$Vw)
case 3:t=f
v=new B.Ex(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Vw,w)},
Gz(d,e){return this.azE(0,e)},
azE(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Gz=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eh(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Gz)
case 2:return A.i(null,w)}})
return A.j($async$Gz,w)},
GB(d,e){return this.azU(0,e)},
azU(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GB=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eh(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$GB)
case 2:return A.i(null,w)}})
return A.j($async$GB,w)},
UB(d){return this.bds(d)},
bds(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$UB=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eh(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$UB)
case 2:return A.i(null,w)}})
return A.j($async$UB,w)},
a9(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a9,w)},
a5J(d,e,f){return this.bdJ(0,e,f)},
bdJ(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a5J=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.af0()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5J,w)}}
B.af0.prototype={}
B.ce5.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.L(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.o("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.V9.prototype={
sauD(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.M7()
if(x!=null)x.style.objectFit=e},
aok(){var x=this,w=x.M7(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sn(0,v.arm(u,x.z!=null,0,t))},
sac1(d,e){var x,w,v,u,t=this
t.z=e
if(e.OH(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.as(y.l.b(x)?x:new A.da(x,A.Z(x).i("da<1,aE>")))
for(;x.B();){w=x.gK(x)
t.x.addTrack(w)}}if(e.Ou(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.as(y.l.b(x)?x:new A.da(x,A.Z(x).i("da<1,aE>")))
for(;x.B();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aQo()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.M7()
if(u!=null){u.srcObject=t.x
x=t.M7()
x.toString
t.adU(x)}t.sn(0,t.a.bfT(t.z!=null))},
aQo(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
M7(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.R)(t),++r)t[r].Y(0)
q=u.M7()
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
jz(d){var x=0,w=A.k(y.H),v=this
var $async$jz=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.GV()
$.qp().us("RTCVideoRenderer-"+v.Q,new B.aYL(v),!0)
return A.i(null,w)}})
return A.j($async$jz,w)},
adU(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Vb.prototype={
P(){return new B.Vc()}}
B.Vc.prototype={
S(){var x,w,v=this
v.W()
v.a.c.ah(0,v.gb1h())
x=v.a
w=x.c
w.as=x.e
w.sauD(0,x.d===D.vf?"contain":"cover")},
b1i(){if(this.c!=null)this.l(new B.aYM())},
m(){if(this.c!=null)this.a3()},
aT(d){var x,w
this.bf(d)
A.du(A.cY(0,0,10,0,0),new B.aYO(this))
x=this.a
w=x.c
w.sauD(0,x.d===D.vf?"contain":"cover")},
D(d){return new A.iD(new B.aYN(this),null)}}
B.abg.prototype={
aGt(d,e,f,g){var x=this,w=$.aK
x.a!==$&&A.aJ()
x.a=new B.a0v(d,x,new A.bf(new A.aB(w,y.c),y.r),e,g.i("a0v<0>"))
if(f.a.gjc())f.a=new B.WO(g.i("@<0>").cc(g).i("WO<1,2>")).hO(f.a)
w=A.h3(null,new B.aM8(f,x),null,!0,g)
x.b!==$&&A.aJ()
x.b=w},
akr(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a9(0)}}
B.a0v.prototype={
E(d,e){if(this.e)throw A.o(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dz(d,e){if(this.e)throw A.o(A.am("Cannot add event after closing."))
if(this.d)return
this.aTj(d,e)},
i7(d){return this.dz(d,null)},
aTj(d,e){var x=this
if(x.w){x.a.a.dz(d,e)
return}x.c.hk(d,e)
x.aks()
x.b.akr()
x.a.a.a9(0).fJ(new B.bzt())},
a9(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.akr()
x.c.cH(0,x.a.a.a9(0))}return x.c.a},
aks(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dP(0)
return},
$ie6:1}
B.ahn.prototype={}
B.aho.prototype={}
B.Bq.prototype={
afn(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.HG(d,e))
x.a9(0)},
abv(d){var x
if((this.b.b&4)!==0)throw A.o(B.ceN())
x=A.cd(d)
x.toString
this.a.send(x)},
ze(d,e,f){return this.bfe(0,e,f)},
bfe(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$ze=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.o(B.ceN())
u.a9(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$ze,w)},
$iceM:1}
B.vo.prototype={}
B.M_.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.M_&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.He.prototype={
p(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.He&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gI(d){return A.hK(this.a)},
k(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.HG.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.HG&&e.a===this.a&&e.b===this.b},
gI(d){return A.hK([this.a,this.b])},
k(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.MA.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibI:1}
B.Mz.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.axK.prototype={
aGb(d){d.ft(new B.axO(this),new B.axP(this),y.a)}}
B.aui.prototype={
a9(d){var x=this.b
x.e=x.d=null
return this.aBC(0)}}
B.aiK.prototype={
k(d){return"WebSocketChannelException: "+this.a},
$ibI:1}
B.z6.prototype={
O(){return"RTCSignalingState."+this.b}}
B.V5.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.z5.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.ok.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.af1.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.aYv.prototype={}
B.TA.prototype={}
B.JS.prototype={
k(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aT4.prototype={}
B.KI.prototype={}
B.V6.prototype={}
B.V7.prototype={}
B.aYG.prototype={}
B.Ex.prototype={}
B.V8.prototype={}
B.Va.prototype={
arm(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Va(x,w,v)},
bfT(d){return this.arm(null,d,null,null)},
k(d){var x=this
return A.ae(x).k(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(LB)","bz(KI)","bz(V8)","bz(ok)","~(@)","ur(@)","bz(ceM)","~(vo)"])
B.b3q.prototype={
$0(){return J.cAm(this.a.bm())},
$S:1}
B.b3r.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.L(v)
if(y.i.b(u)){x=u
w=A.bo(v)
this.b.dz(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c81.prototype={
$1(d){var x,w,v,u=$.a_().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.a_.e5(A.a6(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:24}
B.c80.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.azO.prototype={
$1(d){if(d==null)return null
return A.c0(J.l(d))},
$S:115}
B.but.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.Jx(!0)},
$S:0}
B.buu.prototype={
$1(d){return this.a.Uo()},
$S:27}
B.buq.prototype={
$0(){var x=this.a.c
if(x!=null)A.a2(x,!1).bN()},
$S:0}
B.bur.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bun.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buo.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bup.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buk.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bul.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bum.prototype={
$1(d){var x=null,w=this.a.a,v=w.c,u=w.e,t=w.d
return B.ccB(w.w,x,v,w.y,t,x,x,x,!1,u)},
$S:1202}
B.bus.prototype={
$0(){return this.a.b5o()},
$S:0}
B.bu5.prototype={
$1(d){this.a.yb("candidat_ice",d,!1)},
$S:244}
B.bu6.prototype={
$0(){var x=this.a
if(x.c!=null)x.l(new B.bu4(x))},
$S:0}
B.bu4.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bu7.prototype={
$0(){this.a.mI(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bu8.prototype={
$0(){},
$S:0}
B.bu9.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.l(new B.bu3(x,w))},
$S:27}
B.bu3.prototype={
$0(){return this.a.ch=new A.aw(Date.now(),0,!1).ev(this.b)},
$S:0}
B.bua.prototype={
$1(d){},
$S:135}
B.bub.prototype={
$1(d){this.a.yl()},
$S:27}
B.btO.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.yb("annule",C.bn,!1)
x.mI(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.btP.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.btQ.prototype={
$1(d){this.a.yb("candidat_ice",d,!1)},
$S:244}
B.btR.prototype={
$0(){var x=this.a
if(x.c!=null)x.l(new B.btN(x))},
$S:0}
B.btN.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.btS.prototype={
$0(){this.a.mI(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.btT.prototype={
$0(){return this.a.z=!0},
$S:0}
B.btU.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.l(new B.btM(x,w))},
$S:27}
B.btM.prototype={
$0(){return this.a.ch=new A.aw(Date.now(),0,!1).ev(this.b)},
$S:0}
B.btV.prototype={
$1(d){},
$S:135}
B.btW.prototype={
$1(d){this.a.yl()},
$S:27}
B.bud.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.T_()
x.agT("reponse",d)},
$S:407}
B.bue.prototype={
$1(d){this.a.mI(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.buf.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.T_()},
$S:30}
B.bug.prototype={
$1(d){this.a.mI(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.buh.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.agT("offre",d)},
$S:407}
B.bui.prototype={
$1(d){this.a.mI(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bu0.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.aw(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.bu1.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bu2.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a2(x,!1).bN()},
$S:5}
B.buc.prototype={
$1(d){return A.C(y.N,y.z)},
$S:116}
B.btL.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.btK.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.btJ.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.btY.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a2(w,!1).bN()
x.Q6()},
$S:0}
B.btZ.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a2(w,!1).XO().aL(new B.btX(x),y.H)},
$S:0}
B.btX.prototype={
$1(d){return this.a.alw()},
$S:10}
B.bu_.prototype={
$1(d){return A.fs(!0,A.J(this.a,C.n,C.f,C.P),!0,C.a0,!0,!0)},
$S:143}
B.buj.prototype={
$2(d,e){if(!d)this.a.Jr()},
$S:1206}
B.bP2.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.d()
s=s.x
s===$&&A.d()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.cp3(A.Q(u,u,C.j,u,u,new A.a4(u,u,A.bj(C.t.b4(t*(1-s)),3),u,u,u,C.aI),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.Q(u,u,C.j,u,u,new A.a4(u,u,A.bj(C.t,2),u,u,u,C.aI),u,w,u,u,u,u,u,w)
e.toString
return A.e1(C.a5,A.a([s,w,e],y.p),C.h,C.aH,u)},
$S:1207}
B.b2P.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b2Q.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gU(x):null
if(w!=null)this.a.aOB(w)},
$S:z+4}
B.b2R.prototype={
$1(d){var x
if(d===D.OQ){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aDy.prototype={
$1(d){return this.a.a3G()},
$S:22}
B.aDz.prototype={
$0(){var x=this.a
if(!x.e)x.H9()},
$S:0}
B.c93.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTl.prototype={
$1(d){return this.a.push(B.cdq(d))},
$S:22}
B.aTm.prototype={
$1(d){return this.a.push(B.cdq(d))},
$S:22}
B.aTi.prototype={
$1(d){},
$S:26}
B.aTj.prototype={
$1(d){},
$S:26}
B.aTk.prototype={
$1(d){},
$S:26}
B.aT7.prototype={
$0(){return!1},
$S:56}
B.aT8.prototype={
$0(){return!1},
$S:56}
B.aT9.prototype={
$1(d){J.hv(d,new B.aT6(this.a))},
$S:244}
B.aT6.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:50}
B.aYy.prototype={
$1(d){},
$S:26}
B.aYz.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.KI(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:26}
B.aYA.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cV7(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.ch7())switch(w.cx.a){case 0:w.cy=D.OV
break
case 1:w.cy=D.OW
break
case 3:w.cy=D.OX
break
case 5:w.cy=D.OT
break
case 6:w.cy=D.OU
break
case 7:w.cy=D.ve
break
default:break}},
$S:35}
B.aYB.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cV8(w.iceGatheringState)},
$S:35}
B.aYC.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cXl(w.signalingState)},
$S:35}
B.aYD.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cWu(w.connectionState)},
$S:35}
B.aYE.prototype={
$1(d){},
$S:35}
B.aYF.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.cdq(d.track)
x=d.streams
x=y.l.b(x)?x:new A.da(x,A.Z(x).i("da<1,aE>"))
w=J.dr(x,new B.aYx(w),y.h)
v.$1(new B.V8(A.H(w,!0,w.$ti.i("aD.E"))))}},
$S:26}
B.aYx.prototype={
$1(d){return new B.ur(d,this.a.as)},
$S:z+7}
B.c9c.prototype={
$1(d){return J.h9(self.window.navigator.userAgent,A.bD(d,!1,!1))},
$S:8}
B.aYL.prototype={
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
x.adU(t)
v=y.k.c
w.push(A.iL(t,"canplay",new B.aYH(x),!1,v))
w.push(A.iL(t,"resize",new B.aYI(x),!1,v))
w.push(A.iL(t,"error",new B.aYJ(t),!1,v))
w.push(A.iL(t,"ended",new B.aYK(),!1,v))
return t},
$S:168}
B.aYH.prototype={
$1(d){this.a.aok()},
$S:22}
B.aYI.prototype={
$1(d){this.a.aok()},
$S:22}
B.aYJ.prototype={
$1(d){var x,w,v=this.a.error
A.oU("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.JZ.h(0,A.ax(v,"code"))
x.toString
w=!J.r(A.ax(v,"message"),"")?A.ax(v,"message"):"No further diagnostic information can be determined or provided."
throw A.o(A.oe(x,C.JY.h(0,A.ax(v,"code")),w,null))},
$S:24}
B.aYK.prototype={
$1(d){},
$S:22}
B.aYM.prototype={
$0(){},
$S:0}
B.aYO.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aYN.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.abx("RTCVideoRenderer-"+w.Q)
else w=A.Q(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cw(A.Q(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1208}
B.aM8.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fM(w.gip(w),new B.aM7(v),w.gpA())},
$S:0}
B.aM7.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.aks()
x=x.b
x===$&&A.d()
x.a9(0)},
$S:0}
B.bzt.prototype={
$1(d){},
$S:16}
B.aC4.prototype={
$1(d){this.a.cH(0,this.b)},
$S:26}
B.aC5.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hB(new B.MA("Failed to connect WebSocket"))
else this.b.afn(1006,"error")},
$S:26}
B.aC6.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cB("data")
if(typeof x==="string")w.b=new B.M_(A.bw(x))
else if(typeof x==="object"&&A.cm5(y.m.a(x),"ArrayBuffer"))w.b=new B.He(A.U1(y.o.a(x),0,null))
else throw A.o(A.am("unexpected message type: "+J.aH(x).k(0)))
v.E(0,w.bm())},
$S:24}
B.aC7.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cH(0,this.b)
this.b.afn(d.code,d.reason)},
$S:26}
B.axO.prototype={
$1(d){var x=d.b,w=this.a
new A.cL(x,A.x(x).i("cL<1>")).cP(new B.axL(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cL(x,A.x(x).i("cL<1>")).bnt(new B.axM(d),new B.axN(w,d))
w.f.dP(0)},
$S:z+8}
B.axL.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.M_
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.He
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.HG){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a9(0)}}},
$S:z+9}
B.axM.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.ceN())
s=A.cd(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.abv(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.abv(new Uint8Array(A.bW(u)))
break $label1$1}t=A.aV("Cannot send "+J.aH(d).k(0))
throw A.o(t)}}catch(r){if(!(A.L(r) instanceof B.Mz))throw r}},
$S:18}
B.axN.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.ze(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.L(q) instanceof B.Mz))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.axP.prototype={
$1(d){var x,w=d instanceof A.XQ?d:new B.aiK(J.l(d)),v=this.a
v.f.hB(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.i7(w)
v=v.a
v===$&&A.d()
v.a9(0)},
$S:35};(function aliases(){var x=B.Ig.prototype
x.aBC=x.a9
x=B.a5L.prototype
x.aFr=x.m})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.a_C.prototype,"gaHE","GY",0)
var v
w(v=B.a_B.prototype,"gaoc","aod",2)
x(v,"gal8","Jr",0)
x(v,"galv","alw",1)
x(v,"gae7","Q9",0)
x(v,"gae6","Q8",0)
x(v,"gae5","Q5",0)
x(v,"gapg","bcL",1)
x(v,"gakB","b29",1)
w(v=B.a8K.prototype,"gb56","b57",6)
x(v,"gb3x","a3G",1)
x(B.V9.prototype,"gec","m",0)
x(B.Vc.prototype,"gb1h","b1i",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.ab,[B.Ig,B.azN,B.LB,B.a8Y,B.b2O,B.a8K,B.acE,B.aYv,B.TA,B.JS,B.aT4,B.V6,B.V7,B.aYG,B.aho,B.a0v,B.ahn,B.Bq,B.vo,B.MA,B.aiK,B.KI,B.Ex,B.V8,B.Va])
v(B.WO,A.h4)
w(A.km,[B.b3q,B.c80,B.but,B.buq,B.bur,B.bun,B.buo,B.bup,B.buk,B.bul,B.bus,B.bu6,B.bu4,B.bu7,B.bu8,B.bu3,B.btO,B.btP,B.btR,B.btN,B.btS,B.btT,B.btM,B.bu0,B.bu1,B.btL,B.btK,B.btJ,B.btY,B.btZ,B.aDz,B.aT7,B.aT8,B.aYM,B.aYO,B.aM8,B.aM7,B.axN])
w(A.jN,[B.b3r,B.c81,B.azO,B.buu,B.bum,B.bu5,B.bu9,B.bua,B.bub,B.btQ,B.btU,B.btV,B.btW,B.bud,B.bue,B.buf,B.bug,B.buh,B.bui,B.bu2,B.buc,B.btX,B.bu_,B.b2P,B.b2Q,B.b2R,B.aDy,B.c93,B.aTl,B.aTm,B.aTi,B.aTj,B.aTk,B.aT9,B.aYy,B.aYz,B.aYA,B.aYB,B.aYC,B.aYD,B.aYE,B.aYF,B.aYx,B.c9c,B.aYL,B.aYH,B.aYI,B.aYJ,B.aYK,B.bzt,B.aC4,B.aC5,B.aC6,B.aC7,B.axO,B.axL,B.axM,B.axP])
w(A.S,[B.qP,B.qO,B.NO,B.Vb])
w(A.W,[B.a_C,B.a_B,B.a5L,B.Vc])
w(A.au,[B.Z3,B.akq,B.Z4,B.A3])
w(A.tB,[B.buj,B.bP2,B.aT6,B.aYN])
v(B.ap3,B.a5L)
v(B.aYw,B.aYv)
v(B.ur,B.TA)
v(B.ad7,B.JS)
v(B.aT5,B.aT4)
v(B.af_,B.V6)
v(B.af0,B.V7)
v(B.ce5,B.aYG)
v(B.V9,A.dv)
w(B.aho,[B.abg,B.axK])
w(B.vo,[B.M_,B.He,B.HG])
v(B.Mz,B.MA)
v(B.aui,B.Ig)
w(A.N6,[B.z6,B.V5,B.z5,B.ok,B.af1])
x(B.a5L,A.h2)})()
A.oM(b.typeUniverse,JSON.parse('{"Ig":{"e6":["1"]},"WO":{"h4":["1","2"],"h4.S":"1","h4.T":"2"},"NO":{"S":[],"q":[]},"qP":{"S":[],"q":[]},"a_C":{"W":["qP"]},"Z3":{"au":[],"q":[]},"qO":{"S":[],"q":[]},"a_B":{"W":["qO"]},"akq":{"au":[],"q":[]},"Z4":{"au":[],"q":[]},"A3":{"au":[],"q":[]},"ap3":{"W":["NO"]},"ur":{"TA":[]},"ad7":{"JS":[]},"af_":{"V6":[]},"af0":{"V7":[]},"V9":{"dv":["Va"],"b1":[]},"Vb":{"S":[],"q":[]},"Vc":{"W":["Vb"]},"a0v":{"e6":["1"]},"Bq":{"ceM":[]},"M_":{"vo":[]},"He":{"vo":[]},"HG":{"vo":[]},"MA":{"bI":[]},"Mz":{"bI":[]},"aui":{"e6":["@"]},"aiK":{"bI":[]}}'))
A.cqs(b.typeUniverse,JSON.parse('{"Ig":1,"aho":1}'))
var y=(function rtii(){var x=A.az
return{b:x("Bq"),L:x("bI"),_:x("av<@>"),x:x("av<~>"),S:x("G<ag<p,U>>"),t:x("G<ag<p,@>>"),Q:x("G<JS>"),d:x("G<ju<@>>"),s:x("G<p>"),p:x("G<q>"),m:x("aE"),l:x("F<aE>"),F:x("F<ag<p,@>>"),j:x("F<@>"),I:x("F<v>"),P:x("ag<p,@>"),f:x("ag<@,@>"),E:x("TA"),G:x("JS"),h:x("ur"),o:x("r8"),a:x("bz"),K:x("ab"),J:x("V6"),e:x("V7"),v:x("Ex"),Z:x("ahn<ab?>"),N:x("p"),i:x("rI"),M:x("e3"),D:x("vo"),U:x("X<p>"),g:x("dT<LB>"),n:x("dT<~>"),V:x("bf<Bq>"),r:x("bf<@>"),R:x("bf<~>"),k:x("a_M<aE>"),C:x("qa<aE>"),u:x("aB<Bq>"),c:x("aB<@>"),W:x("aB<~>"),q:x("kN"),y:x("U"),z:x("@"),A:x("aE?"),X:x("ab?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.zF=new A.Y(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.ZD=new B.a8Y(C.i7)
D.rO=new A.al(32,0,32,0)
D.a3g=new A.al(8,20,8,20)
D.a3y=new A.cU(1,C.ar,C.w5,null)
D.BF=new A.ap(57639,"MaterialIcons",null,!1)
D.a4H=new A.ap(58337,"MaterialIcons",null,!1)
D.a4I=new A.ap(58341,"MaterialIcons",null,!1)
D.BP=new A.ap(59048,"MaterialIcons",null,!1)
D.a4M=new A.ap(59049,"MaterialIcons",null,!1)
D.a4N=new A.ap(59077,"MaterialIcons",null,!1)
D.BK=new A.ap(58195,"MaterialIcons",null,!1)
D.a6J=new A.aa(D.BK,null,C.m,null,null)
D.a6I=new A.aa(D.BK,28,C.m,null,null)
D.a4L=new A.ap(58923,"MaterialIcons",null,!1)
D.a6Z=new A.aa(D.a4L,null,C.m,null,null)
D.agn=A.a(x([1,2,4,8,16]),A.az("G<v>"))
D.alX=A.a(x([]),y.Q)
D.Kd=new A.h1("FlutterWebRTC.Method",C.bi,null)
D.avV=new B.ok(0,"RTCIceConnectionStateNew")
D.avW=new B.ok(1,"RTCIceConnectionStateChecking")
D.avX=new B.ok(2,"RTCIceConnectionStateCompleted")
D.avY=new B.ok(3,"RTCIceConnectionStateConnected")
D.avZ=new B.ok(4,"RTCIceConnectionStateCount")
D.OQ=new B.ok(5,"RTCIceConnectionStateFailed")
D.aw_=new B.ok(6,"RTCIceConnectionStateDisconnected")
D.OR=new B.ok(7,"RTCIceConnectionStateClosed")
D.OS=new B.V5(0,"RTCIceGatheringStateNew")
D.aw0=new B.V5(1,"RTCIceGatheringStateGathering")
D.aw1=new B.V5(2,"RTCIceGatheringStateComplete")
D.ve=new B.z5(0,"RTCPeerConnectionStateClosed")
D.OT=new B.z5(1,"RTCPeerConnectionStateFailed")
D.OU=new B.z5(2,"RTCPeerConnectionStateDisconnected")
D.OV=new B.z5(3,"RTCPeerConnectionStateNew")
D.OW=new B.z5(4,"RTCPeerConnectionStateConnecting")
D.OX=new B.z5(5,"RTCPeerConnectionStateConnected")
D.aw2=new B.z6(0,"RTCSignalingStateStable")
D.aw3=new B.z6(1,"RTCSignalingStateHaveLocalOffer")
D.aw4=new B.z6(2,"RTCSignalingStateHaveRemoteOffer")
D.aw5=new B.z6(3,"RTCSignalingStateHaveLocalPrAnswer")
D.aw6=new B.z6(4,"RTCSignalingStateHaveRemotePrAnswer")
D.OY=new B.z6(5,"RTCSignalingStateClosed")
D.aw7=new B.Va(0,0,0)
D.vf=new B.af1(0,"RTCVideoViewObjectFitContain")
D.OZ=new B.af1(1,"RTCVideoViewObjectFitCover")
D.azR=new A.cj(48,null,null,null)
D.aA3=new A.cj(null,64,null,null)
D.aD2=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aDg=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.ww=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.cfM=null
$.cpu=!1
$.cnB=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"d2k","chm",()=>new B.aYw())
x($,"cZX","ch7",()=>C.d.q(A.ax(A.ax(A.ax(A.cgM(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"pjLwk91igB7/FHLGdDeBmjVtL4o=");