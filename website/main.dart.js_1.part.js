((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={I_:function I_(){},Wx:function Wx(d){this.$ti=d},b3x:function b3x(d){this.a=d},b3y:function b3y(d,e){this.a=d
this.b=e},
cvh(d){var w
B.c8s()
if(d.length===0)return
w=A.c6(new B.caj(d))
self.window.addEventListener("beforeunload",w)
$.ci3=new B.cai(w)},
c8s(){var w=$.ci3
if(w!=null)w.$0()
$.ci3=null},
caj:function caj(d){this.a=d},
cai:function cai(d){this.a=d},
a7d(d){var w,v,u,t,s=new B.azU(),r=J.Q(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
w=r.h(d,"conversation_id")
J.l(w==null?"":w)
w=r.h(d,"appelant_id")
w=J.l(w==null?"":w)
v=r.h(d,"appelant_nom")
v=J.l(v==null?"":v)
A.ay(r.h(d,"appele_id"))
A.ay(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.azT(q,w,v,u,t)},
cgC(d){var w,v,u,t=J.Q(d),s=t.h(d,"contenu"),r=t.h(d,"id")
r=J.l(r==null?"":r)
w=t.h(d,"appel_id")
J.l(w==null?"":w)
w=t.h(d,"emetteur_id")
w=J.l(w==null?"":w)
v=t.h(d,"type")
v=J.l(v==null?"":v)
if(x.P.b(s))u=s
else u=x.f.b(s)?J.my(s,x.N,x.z):C.bm
if(t.h(d,"cree_le")!=null)A.bT(J.l(t.h(d,"cree_le")))
return new B.Lj(r,w,v,u)},
cEJ(d){var w,v,u,t,s,r,q=J.Q(d),p=q.h(d,"iceServers")
if(p==null)p=q.h(d,"ice_servers")
if(!x.j.b(p))return D.Z2
w=A.a([],x.t)
for(q=J.ap(p),v=x.f,u=x.P,t=x.N,s=x.z;q.B();){r=q.gJ(q)
if(u.b(r))w.push(r)
else if(v.b(r))w.push(J.my(r,t,s))}return new B.a8Q(w)},
cw7(d){var w=J.Q(d),v=w.h(d,"sdp"),u=w.h(d,"type")
if(typeof v!="string"||v.length===0)return null
w=J.oL(u)
if(!w.p(u,"offer")&&!w.p(u,"answer"))return null
return new A.aq2(v,u)},
cVg(d){var w,v,u=J.Q(d),t=u.h(d,"candidate")
if(typeof t!="string")return null
w=u.h(d,"sdpMid")
v=u.h(d,"sdpMLineIndex")
u=typeof w=="string"?w:null
return new A.aq5(t,A.i0(v)?v:null,u)},
azT:function azT(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
azU:function azU(){},
Lj:function Lj(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a8Q:function a8Q(d){this.a=d},
awb(d){return B.cWe(d)},
cWe(d){var w=0,v=A.k(x.y),u
var $async$awb=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u=!0
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$awb,v)},
cne(d,e,f,g,h,i,j){return new B.qH(f,g,j,i,e,d,null)},
ceW(d,e,f,g,h,i,j,k,l,m){return new B.qG(f,m,h,l,i,d,j,k,e,g,null)},
cs1(d,e,f,g,h,i,j,k,l,m,n){return new B.ake(e,g,f,d,n,k,j,i,h,l,m,null)},
cu1(d,e){var w=null
return new A.W(D.rE,A.c(d.toUpperCase(),2,C.a5,w,w,A.be(w,w,C.m,w,w,w,w,w,"Cinzel",w,w,e,w,w,C.A,w,w,!0,w,1.2,w,w,w,w,w,w),C.X,w,w),w)},
qH:function qH(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_n:function a_n(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
buW:function buW(d){this.a=d},
buX:function buX(d){this.a=d},
buT:function buT(d){this.a=d},
buU:function buU(d){this.a=d},
buQ:function buQ(d){this.a=d},
buR:function buR(d){this.a=d},
buS:function buS(d){this.a=d},
buN:function buN(d){this.a=d},
buO:function buO(d){this.a=d},
buP:function buP(d){this.a=d},
buV:function buV(d){this.a=d},
YO:function YO(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qG:function qG(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
a_m:function a_m(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=""
_.w=null
_.ax=_.at=_.as=_.Q=_.z=_.y=_.x=!1
_.ay=!0
_.ch=null
_.CW=e
_.dy=_.dx=_.db=_.cy=_.cx=null
_.fr=$
_.fx=!1
_.fy=null
_.id=_.go=!1
_.c=_.a=null},
buM:function buM(d){this.a=d},
buL:function buL(){},
buy:function buy(d){this.a=d},
buz:function buz(d){this.a=d},
bux:function bux(d){this.a=d},
buA:function buA(d){this.a=d},
buB:function buB(){},
buC:function buC(d){this.a=d},
buw:function buw(d,e){this.a=d
this.b=e},
buD:function buD(){},
buE:function buE(d){this.a=d},
buc:function buc(d){this.a=d},
buf:function buf(d){this.a=d},
bug:function bug(d){this.a=d},
buh:function buh(d){this.a=d},
bue:function bue(d){this.a=d},
bui:function bui(d){this.a=d},
buj:function buj(d){this.a=d},
buk:function buk(d){this.a=d},
bud:function bud(d,e){this.a=d
this.b=e},
bul:function bul(){},
bum:function bum(d){this.a=d},
buG:function buG(d){this.a=d},
buH:function buH(d){this.a=d},
buI:function buI(d){this.a=d},
buJ:function buJ(d){this.a=d},
buv:function buv(d){this.a=d},
bus:function bus(d,e){this.a=d
this.b=e},
but:function but(d){this.a=d},
buu:function buu(d){this.a=d},
buF:function buF(){},
bu8:function bu8(d,e){this.a=d
this.b=e},
bu6:function bu6(d,e){this.a=d
this.b=e},
bu7:function bu7(d,e){this.a=d
this.b=e},
bub:function bub(d){this.a=d},
bu9:function bu9(){},
bua:function bua(){},
buo:function buo(d){this.a=d},
bup:function bup(d){this.a=d},
buq:function buq(d){this.a=d},
bun:function bun(d){this.a=d},
bur:function bur(d){this.a=d},
buK:function buK(d){this.a=d},
ake:function ake(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
YP:function YP(d,e){this.c=d
this.a=e},
zO:function zO(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Ny:function Ny(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
aoQ:function aoQ(d,e){var _=this
_.d=$
_.eJ$=d
_.bS$=e
_.c=_.a=null},
bQI:function bQI(d,e){this.a=d
this.b=e},
a5z:function a5z(){},
b2U:function b2U(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.as=_.Q=_.z=null
_.at=!1
_.ax=null
_.ay=!1},
b2W:function b2W(d){this.a=d},
b2X:function b2X(d){this.a=d},
b2Y:function b2Y(d){this.a=d},
b2V:function b2V(d){this.a=d},
a8C:function a8C(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
aDA:function aDA(d){this.a=d},
aDB:function aDB(d){this.a=d},
cbl(d){var w=x.U,v=A.G(new A.X(A.a(d.split(" "),x.s),new B.cbm(),w),!0,w.i("w.E"))
w=v.length
if(w===0)return"?"
if(w===1)return J.m(C.b.gU(v),0).toUpperCase()
return(J.m(C.b.gU(v),0)+J.m(C.b.gaY(v),0)).toUpperCase()},
cbm:function cbm(){},
acw:function acw(){this.a=null},
aYz:function aYz(){},
ph:function ph(d,e){this.e=d
this.b=e},
aTv:function aTv(d){this.a=d},
aTw:function aTw(d){this.a=d},
cfL(d){var w=new B.ad_(d)
w.aHs(d)
return w},
ad_:function ad_(d){this.d=d
this.c=null},
aTs:function aTs(d){this.a=d},
aTt:function aTt(d){this.a=d},
aTu:function aTu(d){this.a=d},
Ti:function Ti(){},
aTh:function aTh(){},
aTi:function aTi(){},
aTj:function aTj(d){this.a=d},
aTg:function aTg(d){this.a=d},
cKL(d,e){var w=x.N
w=new B.aeQ(d,e,A.C(w,x.E),A.C(w,x.z))
w.aHB(d,e)
return w},
aeQ:function aeQ(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYB:function aYB(d){this.a=d},
aYC:function aYC(d){this.a=d},
aYD:function aYD(d){this.a=d},
aYE:function aYE(d){this.a=d},
aYF:function aYF(d){this.a=d},
aYG:function aYG(d){this.a=d},
aYH:function aYH(d){this.a=d},
aYI:function aYI(d){this.a=d},
aYA:function aYA(d){this.a=d},
cKO(d){var w=d.headerExtensions
w=x.l.b(w)?w:new A.dA(w,A.Y(w).i("dA<1,aG>"))
w=J.dq(w,new B.aYM(),x.J)
return A.G(w,!0,w.$ti.i("aD.E"))},
cKN(d){var w,v
if("encodings" in d)w=d.encodings
else w=[]
v=A.a([],x.M)
C.b.aG(w,new B.aYL(v))
return v},
cKM(d){var w,v
if("codecs" in d)w=d.codecs
else w=[]
v=A.a([],x.B)
C.b.aG(w,new B.aYK(v))
return v},
aYM:function aYM(){},
aYL:function aYL(d){this.a=d},
aYK:function aYK(d){this.a=d},
aeS:function aeS(d){this.a=d},
aYN:function aYN(){},
cgq:function cgq(d){this.a=d},
cXL(){return C.b.nQ(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],x.s),new B.cbv())!==-1},
cbv:function cbv(){},
cpT(){var w=A.a([],x.d),v=$.cpU
$.cpU=v+1
return new B.US(v,w,D.avg,$.ae())},
US:function US(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aYT:function aYT(d){this.a=d},
aYP:function aYP(d){this.a=d},
aYQ:function aYQ(d){this.a=d},
aYR:function aYR(d){this.a=d},
aYS:function aYS(){},
cgr(d,e,f){return new B.UU(d,f,e,null)},
UU:function UU(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UV:function UV(){this.c=this.a=null},
aYU:function aYU(){},
aYW:function aYW(d){this.a=d},
aYV:function aYV(d){this.a=d},
cnS(d,e,f,g){var w,v={}
v.a=d
w=new B.ab8(g.i("ab8<0>"))
w.aH9(e,f,v,g)
return w},
ab8:function ab8(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aMd:function aMd(d,e){this.a=d
this.b=e},
aMc:function aMc(d){this.a=d},
a0g:function a0g(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bA4:function bA4(){},
ahd:function ahd(d){this.b=this.a=$
this.$ti=d},
ahe:function ahe(){},
ceh(d,e){return B.cDW(d,e)},
cDW(d,e){var w=0,v=A.k(x.b),u,t,s,r,q,p,o
var $async$ceh=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:if(!d.q4("ws")&&!d.q4("wss"))throw A.p(A.hg(d,"url","only ws: and wss: schemes are supported"))
t=self
s=t.WebSocket
r=d.l(0)
t=new t.Array()
q=new s(r,t)
q.binaryType="arraybuffer"
p=new B.B6(q,A.hd(null,null,null,!1,x.D))
t=new A.aB($.aI,x.w)
o=new A.bg(t,x.V)
if(J.r(q.readyState,1))o.cJ(0,p)
else if(J.r(q.readyState,2)||J.r(q.readyState,3))o.hQ(new B.Mj("Unexpected WebSocket state: "+A.u(q.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.q0(q,"open",!1,x.C).gU(0).aN(0,new B.aC7(o,p),x.H)
s=x.C
r=x.H
new A.q0(q,"error",!1,s).gU(0).aN(0,new B.aC8(o,p),r)
A.i_(q,"message",new B.aC9(p),!1,x.m)
new A.q0(q,"close",!1,s).gU(0).aN(0,new B.aCa(o,p),r)
u=t
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$ceh,v)},
B6:function B6(d,e){this.a=d
this.b=e},
aC7:function aC7(d,e){this.a=d
this.b=e},
aC8:function aC8(d,e){this.a=d
this.b=e},
aC9:function aC9(d){this.a=d},
aCa:function aCa(d,e){this.a=d
this.b=e},
ch5(){return new B.Mi("Connection Closed")},
v5:function v5(){},
LK:function LK(d){this.a=d},
GY:function GY(d){this.a=d},
Ho:function Ho(d,e){this.a=d
this.b=e},
Mj:function Mj(d){this.a=d},
Mi:function Mi(d){this.a=d},
cDs(d){var w=null,v=$.aI,u=new B.ahd(x.Z),t=x.X,s=A.hd(w,w,w,!0,t),r=A.hd(w,w,w,!0,t),q=A.x(r),p=A.x(s)
u.a=B.cnS(new A.cZ(r,q.i("cZ<1>")),new A.G8(s,p.i("G8<1>")),!0,t)
u.b=B.cnS(new A.cZ(s,p.i("cZ<1>")),new A.G8(r,q.i("G8<1>")),!1,t)
u=new B.axD(new A.bg(new A.aB(v,x.Y),x.W),u)
u.aGS(d)
return u},
axD:function axD(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axH:function axH(d){this.a=d},
axE:function axE(d){this.a=d},
axF:function axF(d){this.a=d},
axG:function axG(d,e){this.a=d
this.b=e},
axI:function axI(d){this.a=d},
au4:function au4(d,e){this.b=d
this.a=e},
aiy:function aiy(d){this.a=d},
cXj(d){switch(d){case"new":return D.av3
case"checking":return D.av4
case"connected":return D.av6
case"completed":return D.av5
case"failed":return D.Ou
case"disconnected":return D.av8
case"closed":return D.Ov
case"count":return D.av7}return D.Ov},
cXk(d){switch(d){case"new":return D.Ow
case"gathering":return D.av9
case"complete":return D.ava}return D.Ow},
cZt(d){switch(d){case"stable":return D.avb
case"have-local-offer":return D.avc
case"have-local-pranswer":return D.ave
case"have-remote-offer":return D.avd
case"have-remote-pranswer":return D.avf
case"closed":return D.OF}return D.OF},
cYD(d){switch(d){case"new":return D.Oz
case"connecting":return D.OA
case"connected":return D.OB
case"closed":return D.v5
case"disconnected":return D.Oy
case"failed":return D.Ox}return D.v5},
cwr(d){if(d==null)return null
return $.cZW.h(0,d)},
yQ:function yQ(d,e){this.a=d
this.b=e},
UO:function UO(d,e){this.a=d
this.b=e},
yO:function yO(d,e){this.a=d
this.b=e},
oe:function oe(d,e){this.a=d
this.b=e},
aeT:function aeT(d,e){this.a=d
this.b=e},
yP:function yP(d,e){this.a=d
this.b=e},
aYy:function aYy(){},
Tj:function Tj(){},
Jy:function Jy(){},
aTf:function aTf(){},
Kp:function Kp(d,e,f){this.a=d
this.b=e
this.c=f},
UP:function UP(){},
cgp:function cgp(){},
aeR:function aeR(d){this.c=d},
Kq:function Kq(d,e,f,g,h,i,j,k,l,m,n){var _=this
_.a=d
_.b=e
_.c=f
_.d=g
_.e=h
_.f=i
_.r=j
_.w=k
_.x=l
_.y=m
_.z=n},
Ko:function Ko(){},
aYJ:function aYJ(d){this.d=d},
UQ:function UQ(){},
aYO:function aYO(){},
Ed:function Ed(d,e){this.a=d
this.b=e},
UR:function UR(d,e){this.b=d
this.c=e},
UT:function UT(d,e,f){this.a=d
this.b=e
this.c=f},
cfm(d){var w=0,v=A.k(x.y)
var $async$cfm=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:if(d.d.kind!=="video")throw A.p("The is not a video track => "+d.l(0))
throw A.p("You need to specify the deviceId")
return A.i(null,v)}})
return A.j($async$cfm,v)},
adk(d){var w=0,v=A.k(x.H),u
var $async$adk=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u=x.z
w=2
return A.e(B.b8v("enableSpeakerphone",A.a2(["enable",d],x.N,u),u,u),$async$adk)
case 2:return A.i(null,v)}})
return A.j($async$adk,v)},
aVj(d,e){var w=0,v=A.k(x.H),u,t,s
var $async$aVj=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:s=e.d
w=s.kind==="audio"?3:4
break
case 3:t=J.my(x.f.a(A.Ov(s.getConstraints())),x.N,x.z)
t.j(0,"volume",d)
w=5
return A.e(e.Vp(0,t),$async$aVj)
case 5:case 4:u=A.d9(null,x.H)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$aVj,v)},
b8v(d,e,f,g){return B.cOo(d,e,f,g,f.i("0?"))},
cOo(d,e,f,g,h){var w=0,v=A.k(h),u
var $async$b8v=A.f(function(i,j){if(i===1)return A.h(j,v)
while(true)switch(w){case 0:w=3
return A.e(B.b8u(),$async$b8v)
case 3:u=D.JX.cm(d,e,!1,f)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$b8v,v)},
b8u(){var w=0,v=A.k(x.H),u,t
var $async$b8u=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:w=!$.crN?2:3
break
case 2:u=x.N
t=x.z
w=4
return A.e(D.JX.cm("initialize",A.a2(["options",A.C(u,t)],u,t),!1,x.H),$async$b8u)
case 4:$.crN=!0
case 3:return A.i(null,v)}})
return A.j($async$b8u,v)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[28]
B.I_.prototype={
E(d,e){this.a.E(0,e)},
dC(d,e){this.a.dC(d,e)},
aa(d){return this.a.aa(0)},
$ie6:1}
B.Wx.prototype={
hO(d){var w=A.cF("subscription"),v=A.hd(new B.b3x(w),null,null,!0,this.$ti.y[1])
w.b=d.fL(new B.b3y(this,v),v.gnH(v),v.gpE())
return new A.cZ(v,A.x(v).i("cZ<1>"))}}
B.azT.prototype={}
B.Lj.prototype={}
B.a8Q.prototype={}
B.qH.prototype={
P(){return new B.a_n()}}
B.a_n.prototype={
S(){var w,v,u=this
u.W()
w=u.a
w.toString
u.z=!0
v=new B.acw()
u.y!==$&&A.aM()
u.y=v
if(!w.y)v.ug(A.Bk(C.le,$.vG().a).c)
u.Qf()
u.r=A.dl(C.c9,new B.buW(u))
u.w=A.he(C.rs,new B.buX(u))},
m(){var w=this,v=w.r
if(v!=null)v.X(0)
v=w.w
if(v!=null)v.X(0)
v=w.x
if(v!=null)v.X(0)
v=w.y
v===$&&A.d()
v.h9()
if(w.z)v.hc()
w.a2()},
a4v(){var w=this.x
if(w!=null)w.X(0)
this.x=A.dl(C.fb,new B.buT(this))},
UT(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l
var $async$UT=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.c==null||r.e||r.f){w=1
break}t=4
o=r.a
o.toString
n=$.K()
w=7
return A.e(n.EL(o.c),$async$UT)
case 7:q=e
p=B.a7d(q)
if(r.c==null||r.e){w=1
break}if(p.w!=="sonne"){r.k(new B.buU(r))
o=r.r
if(o!=null)o.X(0)
o=r.w
if(o!=null)o.X(0)
o=r.y
o===$&&A.d()
o.h9()
r.a4v()}t=2
w=6
break
case 4:t=3
l=s
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$UT,v)},
Qf(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j
var $async$Qf=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:t=4
n=r.a
n.toString
m=$.K()
w=7
return A.e(m.EL(n.c),$async$Qf)
case 7:q=e
p=B.a7d(q)
if(r.c==null){w=1
break}l=r.a.r
if(l==null){n=$.K()
l=n.gx3()}o=l
if(p.w!=="sonne"||p.c===o){r.k(new B.buQ(r))
n=r.y
n===$&&A.d()
n.h9()
r.a4v()
w=1
break}r.k(new B.buR(r))
if(r.a.y)r.BG()
t=2
w=6
break
case 4:t=3
j=s
if(r.c==null){w=1
break}r.k(new B.buS(r))
n=r.y
n===$&&A.d()
n.h9()
r.a4v()
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Qf,v)},
BG(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$BG=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.f||r.e){w=1
break}w=3
return A.e(B.awb(r.a.e==="video"),$async$BG)
case 3:if(!e){p=r.c
if(p==null){w=1
break}o=r.a.e==="video"?A.b(y.c):A.b(y.d)
p.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(o,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break}r.Q=!0
r.k(new B.buN(r))
t=5
p=r.a
p.toString
o=$.K()
w=8
return A.e(o.M8(p.c,"accepte"),$async$BG)
case 8:t=2
w=7
break
case 5:t=4
m=s
q=A.M(m)
if(r.c==null){w=1
break}r.k(new B.buO(r))
p=r.c
p.toString
o=J.l(q)
p.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(o,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break
w=7
break
case 4:w=2
break
case 7:if(r.c==null){w=1
break}p=r.r
if(p!=null)p.X(0)
p=r.w
if(p!=null)p.X(0)
p=r.y
p===$&&A.d()
p.h9()
p=r.c
p.toString
A.a1(p,!1).uv(A.e0(new B.buP(r),null,x.z))
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$BG,v)},
JU(d){return this.b6m(d)},
b6l(){return this.JU(!1)},
b6m(d){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n
var $async$JU=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:if(r.f){w=1
break}r.f=!0
q=r.r
if(q!=null)q.X(0)
q=r.w
if(q!=null)q.X(0)
q=r.y
q===$&&A.d()
q.h9()
t=4
q=r.a
q.toString
p=$.K()
w=7
return A.e(p.M8(q.c,"refuse"),$async$JU)
case 7:t=2
w=6
break
case 4:t=3
n=s
w=6
break
case 3:w=2
break
case 6:q=r.c
if(q!=null)A.a1(q,!1).bL()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JU,v)},
D(d){var w,v,u,t,s=this,r=null,q=s.a,p=q.e
q=A.jF(C.t,r,A.c(B.cbl(q.d),r,r,r,r,D.aCv,r,r,r),r,56)
w=s.a.d
w=A.c(w.length===0?A.b("Un membre"):w,r,r,r,r,D.aCh,C.X,r,r)
if(s.d)p=A.b("Connexion\u2026")
else if(s.e)p=A.b("Appel termin\xe9")
else p=p==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
v=x.p
p=A.a([q,C.aw,new A.W(D.rE,w,r),C.k,A.c(p,r,r,r,r,D.wn,r,r,r),D.azf],v)
if(!s.d&&!s.e){q=A.b("Refuser")
w=s.f?r:new B.buV(s)
u=A.b("Accepter")
t=s.f?r:s.gaIk()
p.push(A.P(A.a([new B.YO(D.Bg,C.aG,q,w,r),D.az2,new B.YO(C.nD,C.d2,u,t,r)],v),C.n,C.by,C.i,r))}if(s.d)p.push(C.yJ)
return A.dU(r,C.o,A.fr(!0,A.cx(A.I(p,C.n,C.f,C.O),r,r),!0,C.a_,!0,!0),r,r,r)}}
B.YO.prototype={
D(d){var w=this,v=null,u=A.di(w.d,v,v,C.a_,C.cv,v)
return A.I(A.a([A.ab(A.aT(!1,A.c_(w.c,C.m,v,32),C.j,v,C.p,v,v,v,v,w.f,v,u),72,72),C.k,A.c(w.e,v,v,v,v,C.dM,v,v,v)],x.p),C.n,C.f,C.O)}}
B.qG.prototype={
P(){return new B.a_m(A.b7(x.N),C.R)}}
B.a_m.prototype={
S(){var w,v,u,t,s,r,q,p,o,n=this,m=null
n.W()
w=n.a
n.r=w.c
w=w.x
if(w==null)w=new B.b2U(B.cpT(),B.cpT())
n.d!==$&&A.aM()
n.d=w
v=n.a
u=v.y
if(u==null)u=new B.a8C(new A.dL(m,m,x.g),new A.dL(m,m,x.n))
n.e!==$&&A.aM()
n.e=u
w.ax=new B.buM(n)
n.fx=!0
t=new B.acw()
n.fr!==$&&A.aM()
n.fr=t
s=v.x
if(s!=null){r=$.io()
q=r.a
p=q.length!==0&&r.as===s&&q===v.c&&r.w}else p=!1
s=$.io()
r=n.r
q=v.e
o=v.d
s.bj2(r,q,w,u,v.f,o)
w=n.a
if(w.as)s.ax=!0
if(p){n.TV()
return}if(w.f)t.ug("assets/audio/tonalite-appel.wav")
n.t6()},
m(){var w=this,v=w.cx
if(v!=null)v.X(0)
v=w.cy
if(v!=null)v.X(0)
v=w.db
if(v!=null)v.X(0)
v=w.dx
if(v!=null)v.X(0)
v=w.dy
if(v!=null)v.X(0)
v=w.fr
v===$&&A.d()
v.h9()
if(w.fx)v.hc()
v=$.io()
if(!(v.r&&v.a===w.r&&!w.y)){B.c8s()
v=w.d
v===$&&A.d()
v.hc()
v=w.e
v===$&&A.d()
v.LN()}w.a2()},
TV(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k
var $async$TV=A.f(function(d,e){if(d===1){s=e
w=t}while(true)$async$outer:switch(w){case 0:r.a.toString
n=$.K()
r.w=n.gx3()
n=$.io()
r.Q=n.x
r.as=n.y
r.ay=n.Q
r.x=n.e
n=n.f
r.ch=n
if(n!=null){n=Date.now()
m=r.ch
m.toString
r.CW=new A.at(n,0,!1).ev(m)}B.cvh(r.r)
t=4
r.a.toString
n=$.K()
w=7
return A.e(n.c2("/messagerie/appels/"+r.r+"/signaux"),$async$TV)
case 7:q=e
for(n=J.ap(q),m=r.f;n.B();){p=n.gJ(n)
o=B.cgC(p)
m.E(0,o.a)
if(o.d==="termine"||o.d==="refuse"||o.d==="annule"){r.mF(A.b("Appel termin\xe9"))
w=1
break $async$outer}}t=2
w=6
break
case 4:t=3
k=s
w=6
break
case 3:w=2
break
case 6:n=r.c!=null
if(!n||r.y){w=1
break}m=r.d
m===$&&A.d()
m.f=new B.buy(r)
m.r=new B.buz(r)
m.w=new B.buA(r)
r.z=!0
if(n)r.k(new B.buB())
r.db=A.he(C.ce,new B.buC(r))
n=r.e
n===$&&A.d()
m=n.r
r.dx=new A.co(m,A.x(m).i("co<1>")).d2(r.gaoX())
n=n.w
r.dy=new A.co(n,A.x(n).i("co<1>")).d2(new B.buD())
r.cx=A.he(C.fb,new B.buE(r))
r.yu()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$TV,v)},
aPx(){var w=this.cy
if(w!=null)w.X(0)
this.cy=A.dl(C.c9,new B.buc(this))},
t6(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$t6=A.f(function(a0,a1){if(a0===1){s=a1
w=t}while(true)switch(w){case 0:e="appel"
t=4
q=null
i=r.a
h=i.z
w=h!=null?7:9
break
case 7:w=10
return A.e(h,$async$t6)
case 10:q=a1
i=r.r=B.a7d(q).a
w=8
break
case 9:h=$.K()
w=11
return A.e(h.EL(i.c),$async$t6)
case 11:q=a1
i=r.r=r.a.c
case 8:h=$.io()
h.biN(i)
B.cvh(r.r)
if(r.a.f)h.Wn()
p=B.a7d(q)
if(r.c==null){w=1
break}i=p.w
if(i==="termine"||i==="expire"){r.mF(A.b("Appel termin\xe9"))
w=1
break}r.a.toString
i=$.K()
r.w=i.gx3()
e="ice"
r.a.toString
i=$.K()
o=i.X_()
n=r.JD()
w=12
return A.e(o,$async$t6)
case 12:m=a1
l=B.cEJ(m)
w=15
return A.e(n,$async$t6)
case 15:w=!a1?13:14
break
case 13:if(r.c==null){w=1
break}r.k(new B.buf(r))
w=16
return A.e(A.jK(C.nc,null,x.z),$async$t6)
case 16:if(r.c==null){w=1
break}r.mF(null)
w=1
break
case 14:r.aPx()
e="webrtc"
i=r.d
i===$&&A.d()
g=r.a.d==="video"||r.at
w=17
return A.e(i.xe(A.a2(["iceServers",l.a],x.N,x.z),g),$async$t6)
case 17:i.f=new B.bug(r)
i.r=new B.buh(r)
i.w=new B.bui(r)
if(r.c==null){w=1
break}r.k(new B.buj(r))
h.bp0()
r.db=A.he(C.ce,new B.buk(r))
i=r.e
i===$&&A.d()
h=i.r
r.dx=new A.co(h,A.x(h).i("co<1>")).d2(r.gaoX())
h=i.w
r.dy=new A.co(h,A.x(h).i("co<1>")).d2(new B.bul())
r.a.toString
h=$.K()
k=h.b
if(k!=null&&J.a7(k)!==0){r.a.toString
$.K()
i.VR(C.d.jD("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",k)}r.cx=A.he(C.fb,new B.bum(r))
r.yu()
t=2
w=6
break
case 4:t=3
d=s
j=A.M(d)
if(r.c==null){w=1
break}A.nq().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(e)+" : "+A.aCe(A.u(j)))
i=r.c
i.toString
h=j instanceof A.cS?j.a:r.b0q(e)
i.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(h,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
r.mF(null)
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$t6,v)},
b0q(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
JD(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o
var $async$JD=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:t=4
w=7
return A.e(r.a12(),$async$JD)
case 7:if(!e){u=!1
w=1
break}q=r.d
q===$&&A.d()
w=8
return A.e(q.Fz(r.a.d==="video"||r.at),$async$JD)
case 8:u=!0
w=1
break
t=2
w=6
break
case 4:t=3
o=s
u=!1
w=1
break
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JD,v)},
a12(){var w=0,v=A.k(x.y),u,t=this
var $async$a12=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:u=B.awb(t.a.d==="video"||t.at)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$a12,v)},
yu(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$yu=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.c==null||r.y){w=1
break}t=4
r.a.toString
o=$.K()
w=7
return A.e(o.c2("/messagerie/appels/"+r.r+"/signaux"),$async$yu)
case 7:q=e
for(o=J.ap(q);o.B();){p=o.gJ(o)
r.aoY(B.cgC(p))}t=2
w=6
break
case 4:t=3
m=s
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$yu,v)},
aoY(d){var w,v,u,t,s=this
if(s.c==null||s.y)return
w=s.f
v=d.a
if(w.u(0,v))return
w.E(0,v)
w=s.w
if(w!=null&&d.c===w)return
switch(d.d){case"offre":if(s.a.f)return
s.JX(d)
break
case"reponse":if(!s.a.f)return
u=B.cw7(d.e)
if(u==null)return
w=s.d
w===$&&A.d()
w.Vo(A.a2(["sdp",u.a,"type",u.b],x.N,x.z)).aN(0,new B.buG(s),x.a).fS(new B.buH(s))
break
case"candidat_ice":t=B.cVg(d.e)
if(t==null)return
w=s.d
w===$&&A.d()
w.Vi(A.a2(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],x.N,x.z))
break
case"accepte":if(!s.a.f||s.x)return
w=s.d
w===$&&A.d()
w.Ee().aN(0,new B.buI(s),x.a).fS(new B.buJ(s))
break
case"refuse":s.mF(A.b("Appel refus\xe9"))
break
case"annule":s.mF(A.b("Appel annul\xe9"))
break
case"termine":s.mF(A.b("Appel termin\xe9"))
break}},
JX(d){return this.b6K(d)},
b6K(d){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$JX=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:n=B.cw7(d.e)
if(n==null){w=1
break}w=!(r.a.d==="video"||r.at)&&C.d.u(n.a,"m=video")?3:4
break
case 3:p=r.d
p===$&&A.d()
w=5
return A.e(p.tF(),$async$JX)
case 5:if(f&&r.c!=null&&!r.y){r.k(new B.buv(r))
$.io().avc("video")}case 4:t=7
p=r.d
p===$&&A.d()
w=10
return A.e(p.Ef(A.a2(["sdp",n.a,"type",n.b],x.N,x.z)),$async$JX)
case 10:q=f
if(r.c==null||r.y){w=1
break}r.Ts()
r.a2e("reponse",q)
t=2
w=9
break
case 7:t=6
m=s
r.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))
w=9
break
case 6:w=2
break
case 9:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JX,v)},
Ts(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$Ts=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.x){w=1
break}s=t.cy
if(s!=null)s.X(0)
s=t.fr
s===$&&A.d()
s.h9()
t.k(new B.bus(t,!1))
s=$.io()
s.bqT()
r=t.Q
s.a9B(t.as,r)
case 1:return A.i(u,v)}})
return A.j($async$Ts,v)},
yj(d,e,f){return this.aRu(d,e,f)},
a2e(d,e){return this.yj(d,e,!0)},
aRu(d,e,f){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$yj=A.f(function(g,h){if(g===1){t=h
w=u}while(true)switch(w){case 0:u=3
s.a.toString
r=$.K()
w=6
return A.e(r.at1(s.r,e,d),$async$yj)
case 6:u=1
w=5
break
case 3:u=2
p=t
if(f&&s.c!=null&&!s.y)s.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$yj,v)},
JP(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n
var $async$JP=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.y){w=1
break}r.y=!0
q=r.cy
if(q!=null)q.X(0)
q=r.fr
q===$&&A.d()
q.h9()
t=4
q=r.r
w=q.length!==0?7:8
break
case 7:r.a.toString
p=$.K()
w=9
return A.e(p.M8(q,"termine"),$async$JP)
case 9:case 8:t=2
w=6
break
case 4:t=3
n=s
w=6
break
case 3:w=2
break
case 6:B.c8s()
$.io().O9()
q=r.c
if(q!=null)A.a1(q,!1).bL()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JP,v)},
aml(){var w=this
if(!w.x||w.y)return
$.io().bsc()
w.k(new B.but(w))
$.aP.aD$.push(new B.buu(w))},
mF(d){var w,v,u=this,t=null
if(u.y)return
u.y=!0
w=u.cy
if(w!=null)w.X(0)
w=u.fr
w===$&&A.d()
w.h9()
w=u.r
if(w.length!==0){u.a.toString
v=$.K()
v.M8(w,"termine").fS(new B.buF())}if(d!=null&&u.c!=null)u.c.q(x.q).f.v(A.z(t,t,t,t,t,C.h,t,A.c(d,t,t,t,t,t,t,t,t),t,C.l,t,t,t,t,t,t,t,t,t))
B.c8s()
$.io().O9()
w=u.c
if(w!=null)A.a1(w,!1).bL()},
Qq(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qq=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=!u.Q
s=u.d
s===$&&A.d()
w=2
return A.e(s.a_T(t),$async$Qq)
case 2:if(u.c!=null)u.k(new B.bu8(u,t))
$.io().a9B(u.as,t)
return A.i(null,v)}})
return A.j($async$Qq,v)},
Qp(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qp=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:u.ax=!1
w=2
return A.e(u.Qh(!u.as),$async$Qp)
case 2:t=$.io()
s=u.Q
t.a9B(u.as,s)
return A.i(null,v)}})
return A.j($async$Qp,v)},
Qh(d){return this.aJB(d)},
aJB(d){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o,n
var $async$Qh=A.f(function(e,f){if(e===1){t=f
w=u}while(true)switch(w){case 0:u=3
q=s.d
q===$&&A.d()
w=6
return A.e(q.GR(d),$async$Qh)
case 6:u=1
w=5
break
case 3:u=2
n=t
r=A.M(n)
A.nq().$1("Appel : haut-parleur impossible : "+A.aCe(A.u(r)))
w=5
break
case 2:w=1
break
case 5:q=s.d
q===$&&A.d()
o=q.ay
if(s.c!=null&&o!==s.as)s.k(new B.bu6(s,o))
return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$Qh,v)},
Qn(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qn=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=!u.ay
s=u.d
s===$&&A.d()
w=2
return A.e(s.a_Q(t),$async$Qn)
case 2:if(u.c!=null)u.k(new B.bu7(u,t))
$.io().bpd(t)
return A.i(null,v)}})
return A.j($async$Qn,v)},
HD(){var w=0,v=A.k(x.H),u=this,t
var $async$HD=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=u.d
t===$&&A.d()
w=2
return A.e(t.Vv(),$async$HD)
case 2:return A.i(null,v)}})
return A.j($async$HD,v)},
ao7(){var w,v=this,u="Appel en cours\u2026",t=v.fy
if(t!=null)return t
$.io()
if(v.x){t=A.b(u)
w=C.c.ae(v.CW.a,1e6)
return t+" "+(C.d.aV(C.c.l(C.c.ae(w,60)),2,"0")+":"+C.d.aV(C.c.l(C.c.a_(w,60)),2,"0"))}if(v.z)return v.a.f?A.b("\xc7a sonne\u2026"):A.b(u)
return A.b("Connexion\u2026")},
Qr(){var w=0,v=A.k(x.H),u,t=this,s,r,q
var $async$Qr=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.a.d==="video"||t.at||t.y){w=1
break}if(!t.x){s=t.c
s.toString
r=A.b("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break}s=t.d
s===$&&A.d()
w=3
return A.e(s.KV(),$async$Qr)
case 3:q=e
if(q==null){s=t.c
if(s!=null){r=A.b("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))}w=1
break}if(t.c==null||t.y){w=1
break}t.k(new B.bub(t))
$.io().avc("video")
t.a2e("offre",q)
case 1:return A.i(u,v)}})
return A.j($async$Qr,v)},
HE(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$HE=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(!(t.a.d==="video"||t.at)||t.y){w=1
break}s=t.d
s===$&&A.d()
w=s.at?3:4
break
case 3:w=5
return A.e(s.DM(),$async$HE)
case 5:if(t.c!=null)t.k(new B.bu9())
w=1
break
case 4:w=6
return A.e(s.AA(),$async$HE)
case 6:if(!e){s=t.c
if(s!=null){r=A.b("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))}w=1
break}if(t.c!=null)t.k(new B.bua())
case 1:return A.i(u,v)}})
return A.j($async$HE,v)},
b36(){var w,v,u=this,t=null,s=A.a([],x.p)
if(u.a.d==="video"||u.at){s.push(A.bQ(!1,t,t,t,!0,t,t,!0,!1,D.a6r,t,t,t,new B.buo(u),!1,t,t,t,t,t,A.c(A.b("Basculer"),t,t,t,t,C.dM,t,t,t),t,t))
w=u.d
w===$&&A.d()
w=w.at
v=A.c_(w?D.a4a:D.a47,C.m,t,t)
s.push(A.bQ(!1,t,t,t,!0,t,t,!0,!1,v,t,t,t,new B.bup(u),!1,t,t,t,t,t,A.c(w?A.b("Arr\xeater le partage"):A.b("Partager l\u2019\xe9cran"),t,t,t,t,C.dM,t,t,t),t,t))}if(u.x)s.push(A.bQ(!1,t,t,t,!0,t,t,!0,!1,D.a69,t,t,t,new B.buq(u),!1,t,t,t,t,t,A.c(A.b("R\xe9duire"),t,t,t,t,C.dM,t,t,t),t,t))
if(s.length===0)return
w=u.c
w.toString
A.j8(D.zl,new B.bur(s),w,!1,t,x.H)},
D(d){var w,v,u,t,s,r,q,p=this,o=null,n=p.d
n===$&&A.d()
w=n.c
w=w==null?o:w.uR(0).length!==0
v=p.id
u=p.a
if((u.d==="video"||p.at)&&p.z){if(w===!0)w=A.fQ(o,B.cgr(n.e,!1,D.OG),C.x,!1,o,p.gaeO(),o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o)
else{w=u.e
u=u.r
t=p.go&&p.x
w=A.cx(A.I(A.a([new B.Ny(w,u,t,56,o),C.q,B.cu1(w,22),C.k,A.c(p.ao7(),o,o,o,o,D.wn,o,o,o)],x.p),C.n,C.f,C.O),o,o)}n=A.a([A.E6(0,w),A.eX(o,A.eS(A.N(12),B.cgr(n.d,!0,D.OG),C.aq),160,o,o,16,16,110),A.eX(o,A.ab(A.aT(!1,D.a6q,C.j,o,C.p,o,o,o,o,p.gaeO(),o,A.di(C.Z1,o,o,C.a_,C.cv,o)),36,36),o,o,o,20,20,o)],x.p)
if(p.x)n.push(A.eX(o,new B.YP(p.gamk(),o),o,o,16,o,16,o))
w=p.Q
u=p.as
n.push(A.eX(24,B.cs1(p.ay,!0,u,w,p.gaeS(),p.gaeN(),p.gaeP(),p.gaeQ(),p.galq(),p.gam_(),!0),o,o,0,0,o,o))
n=A.e2(C.aP,n,C.h,C.aI,o)}else{w=x.p
u=A.a([],w)
if(p.go)u.push(A.eX(o,A.r2(B.cgr(n.e,!1,D.v7),0),1,o,0,o,0,1))
if(p.x)u.push(A.eX(o,new B.YP(p.gamk(),o),o,o,16,o,16,o))
n=B.cu1(p.a.e,24)
t=A.c(p.ao7(),o,o,o,o,D.wn,C.X,o,o)
s=p.a
r=s.e
s=s.r
s=A.a8(A.cx(new B.Ny(r,s,p.go&&p.x,88,o),o,o),1,o)
r=p.Q
q=p.as
u.push(A.I(A.a([C.q,n,C.k,new A.W(D.rE,t,o),s,B.cs1(p.ay,!1,q,r,p.gaeS(),p.gaeN(),p.gaeP(),p.gaeQ(),p.galq(),p.gam_(),p.x),C.q],w),C.n,C.f,C.i))
u=A.e2(C.aP,u,C.h,C.aI,o)
n=u}return A.cga(v,A.dU(o,C.o,A.fr(!0,n,!0,C.a_,!0,!0),o,o,o),new B.buK(p),x.K)}}
B.ake.prototype={
D(d){var w,v,u=this,t=null,s=A.N(28),r=A.a8(new B.zO(D.a4c,u.e,A.b("Haut-parleur"),u.x,t,t),1,t),q=u.f?D.Br:D.a4b,p=A.b("Appel vid\xe9o")
q=A.a8(new B.zO(q,!1,p,u.c?u.y:u.z,t,t),1,t)
p=u.d
w=p?D.a46:D.a45
v=x.p
p=A.P(A.a([r,q,A.a8(new B.zO(w,p,A.b("Muet"),u.w,t,t),1,t)],v),C.n,C.f,C.i,t)
w=A.b("Plus")
return A.S(t,A.I(A.a([p,C.q,A.P(A.a([A.a8(new B.zO(C.Bn,!1,w,u.r?u.Q:t,t,t),1,t),A.a8(new B.zO(D.Bg,!1,A.b("Terminer"),u.as,C.aG,t),1,t),D.a2Z],v),C.n,C.f,C.i,t)],v),C.n,C.f,C.O),C.j,t,t,new A.a4(D.zl,t,t,s,t,t,C.u),t,t,t,C.Av,D.a2M,t,t,t)}}
B.YP.prototype={
D(d){var w=null
return A.I(A.a([A.ab(A.aT(!1,D.a68,C.j,w,C.p,w,w,w,w,this.c,w,A.di(C.kK,w,w,C.a_,C.cv,w)),48,48),C.I,A.c(A.b("R\xe9duire"),w,w,w,w,C.R1,w,w,w)],x.p),C.n,C.f,C.O)}}
B.zO.prototype={
D(d){var w,v,u,t=this,s=null,r=t.r,q=r==null
if(q)r=t.d?C.m:C.kK
if(!q)w=C.m
else w=t.d?C.o:C.m
q=t.f
v=q==null?0.4:1
u=A.di(r,s,s,C.a_,C.cv,s)
return A.r2(A.I(A.a([A.ab(A.aT(!1,A.c_(t.c,w,s,30),C.j,s,C.p,s,s,s,s,q,s,u),72,72),C.k,A.c(t.e,s,s,s,s,C.wp,C.X,s,s)],x.p),C.n,C.f,C.O),v)}}
B.Ny.prototype={
P(){return new B.aoQ(null,null)}}
B.aoQ.prototype={
S(){var w,v=this
v.W()
w=A.cr(null,A.cU(0,0,v.a.e?1100:2400,0,0),null,1,null,v)
w.aat(0,!0)
v.d!==$&&A.aM()
v.d=w},
aU(d){var w,v
this.bg(d)
w=this.a.e
if(d.e!==w){v=this.d
v===$&&A.d()
v.e=A.cU(0,0,w?1100:2400,0,0)
v.aat(0,!0)}},
m(){var w=this.d
w===$&&A.d()
w.m()
this.aG6()},
D(d){var w,v=this,u=null,t=v.a,s=t.f,r=s*2,q=r+24,p=v.d
p===$&&A.d()
w=t.d
t=w!=null?A.jF(u,w,u,u,s):A.jF(C.t,u,A.c(B.cbl(t.c),u,u,u,u,A.be(u,u,C.o,u,u,u,u,u,u,u,u,v.a.f*0.7,u,u,C.A,u,u,!0,u,u,u,u,u,u,u,u),u,u,u),u,s)
return A.ab(A.i7(p,new B.bQI(v,r),t),q,q)}}
B.a5z.prototype={
m(){var w=this,v=w.bS$
if(v!=null)v.T(0,w.ghM())
w.bS$=null
w.a2()},
ce(){this.da()
this.d_()
this.hN()}}
B.b2U.prototype={
Fz(d){return this.bqI(d)},
bqI(d){var w=0,v=A.k(x.H),u,t=this,s,r,q,p,o
var $async$Fz=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:if(t.b!=null){w=1
break}s=t.d
w=3
return A.e(s.jT(0),$async$Fz)
case 3:$.awP()
r=x.N
q=A.a2(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],r,x.y)
if(d){p=x.S
p=A.a2(["facingMode","user","width",A.a2(["ideal",640],r,p),"height",A.a2(["ideal",480],r,p),"frameRate",A.a2(["ideal",24],r,p)],r,x.K)}else p=!1
w=4
return A.e(new B.Ti().B6(0,A.a2(["audio",q,"video",p],r,x.z)),$async$Fz)
case 4:o=f
t.b=o
s.sH5(0,o)
case 1:return A.i(u,v)}})
return A.j($async$Fz,v)},
xe(d,e){return this.brt(d,e)},
brt(d,e){var w=0,v=A.k(x.H),u=this,t,s,r,q,p,o,n
var $async$xe=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:w=2
return A.e(u.e.jT(0),$async$xe)
case 2:w=u.b==null?3:4
break
case 3:w=5
return A.e(u.Fz(e),$async$xe)
case 5:case 4:t=u.b
t.toString
w=6
return A.e($.awP().a7y(d,A.C(x.N,x.z)),$async$xe)
case 6:s=u.a=g
r=t.GE(0),q=r.length,p=0
case 7:if(!(p<r.length)){w=9
break}o=r[p]
w=10
return A.e(s.Vf(0,o,t),$async$xe)
case 10:n=g
if(o.d.kind==="video")u.z=n
case 8:r.length===q||(0,A.R)(r),++p
w=7
break
case 9:w=11
return A.e(u.CN(),$async$xe)
case 11:s.e=new B.b2W(u)
s.Q=new B.b2X(u)
s.d=new B.b2Y(u)
return A.i(null,v)}})
return A.j($async$xe,v)},
aPl(d){var w,v=this
v.c=d
if(!v.x){v.x=!0
v.e.sH5(0,d)
v.Hx()
w=v.r
if(w!=null)w.$0()}},
Hx(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o,n,m,l,k
var $async$Hx=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:m=s.ay?0.8:1
l=s.c
l=l==null?null:l.OO(0)
if(l==null)l=C.cp
p=l.length
o=0
case 2:if(!(o<l.length)){w=4
break}r=l[o]
u=6
w=9
return A.e(B.aVj(m,r),$async$Hx)
case 9:u=1
w=8
break
case 6:u=5
k=t
q=A.M(k)
A.nq().$1("Appel : volume distant impossible : "+A.aCe(A.u(q)))
w=8
break
case 5:w=1
break
case 8:case 3:l.length===p||(0,A.R)(l),++o
w=2
break
case 4:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$Hx,v)},
CN(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g
var $async$CN=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:h=r.z
if(h==null){w=1
break}t=4
n=h.a.getParameters()
m=n.transactionId
if((m==null?null:m)!=null){l=n.rtcp
k=x.z
k=A.a2(["cname",l.cname,"reducedSize",l.reducedSize],k,k)
k.h(0,"cname")
k.h(0,"reducedSize")}B.cKO(n)
l=B.cKN(n)
B.cKM(n)
q=new B.aYJ(l)
p=q.d
if(p==null||J.a7(p)===0){w=1
break}for(l=p,k=l.length,j=0;j<k;++j){o=l[j]
o.c=5e5
o.e=24}w=7
return A.e(h.GU(q),$async$CN)
case 7:t=2
w=6
break
case 4:t=3
g=s
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$CN,v)},
Ee(){var w=0,v=A.k(x.P),u,t=this,s,r
var $async$Ee=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:r=t.a
if(r==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=3
return A.e(r.W5(0),$async$Ee)
case 3:s=e
w=4
return A.e(r.GS(0,s),$async$Ee)
case 4:u=A.a2(["sdp",s.a,"type",s.b],x.N,x.z)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Ee,v)},
Ef(d){return this.bib(d)},
bib(d){var w=0,v=A.k(x.P),u,t=this,s,r
var $async$Ef=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.a
if(r==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=3
return A.e(r.GV(0,new B.Ed(d.h(0,"sdp"),d.h(0,"type"))),$async$Ef)
case 3:w=4
return A.e(r.W2(0),$async$Ef)
case 4:s=f
w=5
return A.e(r.GS(0,s),$async$Ef)
case 5:u=A.a2(["sdp",s.a,"type",s.b],x.N,x.z)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Ef,v)},
Vo(d){return this.bf1(d)},
bf1(d){var w=0,v=A.k(x.H),u=this,t
var $async$Vo=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:t=u.a
if(t==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=2
return A.e(t.GV(0,new B.Ed(d.h(0,"sdp"),d.h(0,"type"))),$async$Vo)
case 2:return A.i(null,v)}})
return A.j($async$Vo,v)},
Vi(d){return this.beN(d)},
beN(d){var w=0,v=A.k(x.H),u,t=this,s
var $async$Vi=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=t.a
if(s==null){w=1
break}w=3
return A.e(s.V4(new B.Kp(A.ay(d.h(0,"candidate")),A.ay(d.h(0,"sdpMid")),A.eM(d.h(0,"sdpMLineIndex")))),$async$Vi)
case 3:case 1:return A.i(u,v)}})
return A.j($async$Vi,v)},
a_T(d){return this.aAq(d)},
aAq(d){var w=0,v=A.k(x.H),u=this,t,s,r,q
var $async$a_T=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:q=u.b
q=q==null?null:q.OO(0)
if(q==null)q=C.cp
t=q.length
s=!d
r=0
for(;r<q.length;q.length===t||(0,A.R)(q),++r)q[r].slW(0,s)
return A.i(null,v)}})
return A.j($async$a_T,v)},
GR(d){return this.aAg(d)},
aAg(d){var w=0,v=A.k(x.H),u=this
var $async$GR=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:w=2
return A.e(B.adk(d),$async$GR)
case 2:u.ay=d
w=3
return A.e(u.Hx(),$async$GR)
case 3:return A.i(null,v)}})
return A.j($async$GR,v)},
a_Q(d){return this.aA6(d)},
aA6(d){var w=0,v=A.k(x.H),u=this,t,s,r
var $async$a_Q=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=u.b
r=r==null?null:r.uR(0)
if(r==null)r=C.cp
t=r.length
s=0
for(;s<r.length;r.length===t||(0,A.R)(r),++s)r[s].slW(0,d)
return A.i(null,v)}})
return A.j($async$a_Q,v)},
Vv(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$Vv=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:s=t.b
r=s==null?null:s.uR(0)
if(r==null)r=D.Ef
if(r.length===0){w=1
break}w=3
return A.e(B.cfm(C.b.gU(r)),$async$Vv)
case 3:case 1:return A.i(u,v)}})
return A.j($async$Vv,v)},
tF(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$tF=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:d=r.a
if(d==null||r.y){u=!1
w=1
break}l=r.b
l=l==null?null:l.uR(0).length!==0
if(l===!0){u=!0
w=1
break}q=null
t=4
$.awP()
l=x.N
k=x.S
w=7
return A.e(new B.Ti().B6(0,A.a2(["audio",!1,"video",A.a2(["facingMode","user","width",A.a2(["ideal",640],l,k),"height",A.a2(["ideal",480],l,k),"frameRate",A.a2(["ideal",24],l,k)],l,x.K)],l,x.z)),$async$tF)
case 7:q=a3
p=J.cl2(q)
if(J.a7(p)===0){u=!1
w=1
break}o=J.fb(p)
l=r.b
if(l==null)l=null
else{l=l.e
k=o.d
l.addTrack(k)
l=A.d9(null,x.H)}w=8
return A.e(x.x.b(l)?l:A.dM(l,x.H),$async$tF)
case 8:r.d.sH5(0,r.b)
l=r.b
l.toString
w=9
return A.e(J.cCE(d,o,l),$async$tF)
case 9:n=a3
r.z=n
w=10
return A.e(r.CN(),$async$tF)
case 10:u=!0
w=1
break
t=2
w=6
break
case 4:t=3
a0=s
l=q
l=l==null?null:J.cl1(l)
if(l==null)l=C.cp
k=l.length
i=x.c
h=x._
g=0
case 11:if(!(g<l.length)){w=13
break}m=l[g]
t=15
f=J.a6U(m)
if(!h.b(f)){e=new A.aB($.aI,i)
e.a=8
e.c=f
f=e}w=18
return A.e(f,$async$tF)
case 18:t=3
w=17
break
case 15:t=14
a1=s
w=17
break
case 14:w=3
break
case 17:case 12:l.length===k||(0,A.R)(l),++g
w=11
break
case 13:u=!1
w=1
break
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$tF,v)},
KV(){var w=0,v=A.k(x.cO),u,t=2,s,r=this,q,p,o
var $async$KV=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:w=3
return A.e(r.tF(),$async$KV)
case 3:if(!e){u=null
w=1
break}t=5
w=8
return A.e(r.Ee(),$async$KV)
case 8:q=e
u=q
w=1
break
t=2
w=7
break
case 5:t=4
o=s
u=null
w=1
break
w=7
break
case 4:w=2
break
case 7:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$KV,v)},
AA(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2
var $async$AA=A.f(function(a3,a4){if(a3===1){s=a4
w=t}while(true)switch(w){case 0:if(r.a==null||r.y){u=!1
w=1
break}if(r.at){u=!0
w=1
break}if(A.ca()===C.aR){u=!1
w=1
break}q=r.z
if(q==null){u=!1
w=1
break}p=null
t=4
$.awP()
w=7
return A.e(new B.Ti().Gp(A.a2(["video",!0,"audio",!1],x.N,x.z)),$async$AA)
case 7:p=a4
o=J.cl2(p)
if(J.a7(o)===0){u=!1
w=1
break}n=J.fb(o)
k=r.b
j=k==null?null:k.uR(0)
m=j==null?D.Ef:j
r.as=J.a7(m)!==0?J.fb(m):null
w=8
return A.e(q.Zy(n),$async$AA)
case 8:r.Q=p
r.at=!0
r.d.sH5(0,p)
w=9
return A.e(r.CN(),$async$AA)
case 9:n.c=new B.b2V(r)
u=!0
w=1
break
t=2
w=6
break
case 4:t=3
a1=s
k=p
k=k==null?null:J.cl1(k)
if(k==null)k=C.cp
h=k.length
g=x.c
f=x._
e=0
case 10:if(!(e<k.length)){w=12
break}l=k[e]
t=14
d=J.a6U(l)
if(!f.b(d)){a0=new A.aB($.aI,g)
a0.a=8
a0.c=d
d=a0}w=17
return A.e(d,$async$AA)
case 17:t=3
w=16
break
case 14:t=13
a2=s
w=16
break
case 13:w=3
break
case 16:case 11:k.length===h||(0,A.R)(k),++e
w=10
break
case 12:u=!1
w=1
break
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$AA,v)},
DM(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$DM=A.f(function(d,a0){if(d===1){s=a0
w=t}while(true)switch(w){case 0:if(!r.at){w=1
break}n=r.at=!1
t=4
q=r.z
p=r.as
w=(q!=null?p!=null:n)?7:8
break
case 7:w=9
return A.e(q.Zy(p),$async$DM)
case 9:case 8:t=2
w=6
break
case 4:t=3
f=s
w=6
break
case 3:w=2
break
case 6:n=r.Q
n=n==null?null:n.GE(0)
if(n==null)n=C.cp
l=n.length
k=x.c
j=x._
i=0
case 10:if(!(i<n.length)){w=12
break}o=n[i]
t=14
h=J.a6U(o)
if(!j.b(h)){g=new A.aB($.aI,k)
g.a=8
g.c=h
h=g}w=17
return A.e(h,$async$DM)
case 17:t=2
w=16
break
case 14:t=13
e=s
w=16
break
case 13:w=2
break
case 16:case 11:n.length===l||(0,A.R)(n),++i
w=10
break
case 12:r.as=r.Q=null
r.d.sH5(0,r.b)
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$DM,v)},
hc(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$hc=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:if(r.y){w=1
break}r.y=!0
r.at=!1
o=r.Q
o=o==null?null:o.GE(0)
if(o==null)o=C.cp
n=o.length
m=x.c
l=x._
k=0
case 3:if(!(k<o.length)){w=5
break}q=o[k]
t=7
j=J.a6U(q)
if(!l.b(j)){i=new A.aB($.aI,m)
i.a=8
i.c=j
j=i}w=10
return A.e(j,$async$hc)
case 10:t=2
w=9
break
case 7:t=6
g=s
w=9
break
case 6:w=2
break
case 9:case 4:o.length===n||(0,A.R)(o),++k
w=3
break
case 5:r.ax=r.z=r.as=r.Q=null
t=12
w=15
return A.e(B.adk(!1),$async$hc)
case 15:t=2
w=14
break
case 12:t=11
f=s
w=14
break
case 11:w=2
break
case 14:t=17
o=r.a
o=o==null?null:o.aa(0)
w=20
return A.e(x.x.b(o)?o:A.dM(o,x.H),$async$hc)
case 20:t=2
w=19
break
case 17:t=16
e=s
w=19
break
case 16:w=2
break
case 19:r.a=null
o=r.b
o=o==null?null:o.GE(0)
if(o==null)o=C.cp
n=o.length
k=0
case 21:if(!(k<o.length)){w=23
break}p=o[k]
t=25
j=J.a6U(p)
if(!l.b(j)){i=new A.aB($.aI,m)
i.a=8
i.c=j
j=i}w=28
return A.e(j,$async$hc)
case 28:t=2
w=27
break
case 25:t=24
d=s
w=27
break
case 24:w=2
break
case 27:case 22:o.length===n||(0,A.R)(o),++k
w=21
break
case 23:r.b=null
t=30
w=33
return A.e(r.d.m(),$async$hc)
case 33:t=2
w=32
break
case 30:t=29
a0=s
w=32
break
case 29:w=2
break
case 32:t=35
w=38
return A.e(r.e.m(),$async$hc)
case 38:t=2
w=37
break
case 35:t=34
a1=s
w=37
break
case 34:w=2
break
case 37:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$hc,v)}}
B.a8C.prototype={
gbgu(){return this.b!=null&&!this.e},
VR(d,e){return this.bgv(d,e)},
bgv(d,e){var w=0,v=A.k(x.H),u=this
var $async$VR=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:u.x=d
u.y=e
u.e=!1
u.f=0
w=2
return A.e(u.Hv(),$async$VR)
case 2:return A.i(null,v)}})
return A.j($async$VR,v)},
Hv(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l
var $async$Hv=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.e){w=1
break}q=r.x
if(q==null||J.a7(q)===0){w=1
break}t=4
p=B.cDs(B.ceh(A.cD(q,0,null),null))
r.b=p
w=7
return A.e(p.f.a,$async$Hv)
case 7:r.f=0
o=r.y
if(o!=null&&J.a7(o)!==0)try{n=x.N
p.gkL().a.E(0,C.Y.dv(A.a2(["type","auth","jeton",o],n,n),null))}catch(k){}n=p.r.b
n===$&&A.d()
n=n.b
n===$&&A.d()
r.c=new A.cZ(n,A.x(n).i("cZ<1>")).b7(r.gb61(),!0,r.gb4t(),new B.aDA(r))
t=2
w=6
break
case 4:t=3
l=s
r.a4j()
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Hv,v)},
b62(d){var w,v,u,t
try{w=C.Y.cE(0,J.l(d),null)
u=x.P
if(!u.b(w))return
if(!J.r(J.m(w,"type"),"signal_appel"))return
v=J.m(w,"signal")
if(!u.b(v))return
u=this.r
if((u.c&4)===0)u.E(0,B.cgC(v))}catch(t){}},
a4j(){var w,v=this,u=v.c
if(u!=null)u.X(0)
v.b=v.c=null
if(v.e)return
u=v.f
if(u>=5){u=v.w
if((u.c&4)===0)u.E(0,null)
return}w=D.afR[u]
v.f=u+1
u=v.d
if(u!=null)u.X(0)
v.d=A.dl(A.cU(0,0,0,0,w),new B.aDB(v))},
LN(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$LN=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:s.e=!0
r=s.d
if(r!=null)r.X(0)
r=s.c
r=r==null?null:r.X(0)
w=2
return A.e(x.x.b(r)?r:A.dM(r,x.H),$async$LN)
case 2:s.c=null
u=4
r=s.b
r=r==null?null:r.gkL().aa(0)
w=7
return A.e(x._.b(r)?r:A.dM(r,x.z),$async$LN)
case 7:u=1
w=6
break
case 4:u=3
p=t
w=6
break
case 3:w=1
break
case 6:s.b=null
return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$LN,v)}}
B.acw.prototype={
ug(d){return this.bod(d)},
bod(d){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o
var $async$ug=A.f(function(e,f){if(e===1){t=f
w=u}while(true)switch(w){case 0:u=3
q=s.a
w=6
return A.e((q==null?s.a=A.B0():q).b1(0),$async$ug)
case 6:w=7
return A.e(s.a.a_P(d),$async$ug)
case 7:w=8
return A.e(s.a.jk(C.JB),$async$ug)
case 8:w=9
return A.e(s.a.io(1),$async$ug)
case 9:w=10
return A.e(s.a.cV(0),$async$ug)
case 10:u=1
w=5
break
case 3:u=2
o=t
r=A.M(o)
A.nq().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(r))
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$ug,v)},
h9(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$h9=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
r=r==null?null:r.b1(0)
w=6
return A.e(x.x.b(r)?r:A.dM(r,x.H),$async$h9)
case 6:u=1
w=5
break
case 3:u=2
p=t
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$h9,v)},
hc(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$hc=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
r=r==null?null:r.m()
w=6
return A.e(x.x.b(r)?r:A.dM(r,x.H),$async$hc)
case 6:u=1
w=5
break
case 3:u=2
p=t
w=5
break
case 2:w=1
break
case 5:s.a=null
return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$hc,v)}}
B.aYz.prototype={
a7y(d,e){return this.bi0(d,e)},
bi0(d,e){var w=0,v=A.k(x.O),u,t,s,r,q
var $async$a7y=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:q=e.a
if(q!==0)t=e
else{q=x.z
s=x.N
t=A.a2(["mandatory",A.C(q,q),"optional",A.a([A.a2(["DtlsSrtpKeyAgreement",!0],s,x.y)],x.T)],s,x.K)}q=self.RTCPeerConnection
s=A.fI(t,x.N,x.z)
s.t(0,d)
r=new q(x.m.a(A.c7(s)))
s=J.l(r)
u=B.cKL(C.c1.gj7().be(new A.eF(s)),r)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$a7y,v)}}
B.ph.prototype={
OO(d){var w=A.a([],x.Q),v=this.e.getAudioTracks()
v=x.l.b(v)?v:new A.dA(v,A.Y(v).i("dA<1,aG>"))
J.hv(v,new B.aTv(w))
return w},
uR(d){var w=A.a([],x.Q),v=this.e.getVideoTracks()
v=x.l.b(v)?v:new A.dA(v,A.Y(v).i("dA<1,aG>"))
J.hv(v,new B.aTw(w))
return w},
GE(d){var w=A.G(this.OO(0),!0,x.G)
C.b.t(w,this.uR(0))
return w}}
B.ad_.prototype={
aHs(d){var w=this,v=w.d
v.addEventListener("ended",A.c6(new B.aTs(w)))
v.addEventListener("mute",A.c6(new B.aTt(w)))
v.addEventListener("unmute",A.c6(new B.aTu(w)))},
slW(d,e){this.d.enabled=e},
Vp(d,e){return this.bf4(0,e)},
bf4(d,e){var w=0,v=A.k(x.H),u=this
var $async$Vp=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:w=2
return A.e(A.dQ(u.d.applyConstraints(x.m.a(A.c7(e))),x.X),$async$Vp)
case 2:return A.i(null,v)}})
return A.j($async$Vp,v)},
b1(d){var w=0,v=A.k(x.H),u=this
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u.d.stop()
return A.i(null,v)}})
return A.j($async$b1,v)}}
B.Ti.prototype={
B6(d,e){return this.aze(0,e)},
aze(d,a0){var w=0,v=A.k(x.E),u,t=2,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$B6=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:t=4
try{if(!B.cXL())if(x.f.b(a0.h(0,"video"))&&J.m(a0.h(0,"video"),"facingMode")!=null)J.iM(a0.h(0,"video"),"facingMode")
a0.cP(0,"video",new B.aTh())
a0.cP(0,"audio",new B.aTi())}catch(a1){A.t0("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(x.P.b(a0.h(0,"audio"))){h=x.z
h=A.ha(a0.h(0,"audio"),h,h).aC(0,"optional")&&x.F.b(J.m(a0.h(0,"audio"),"optional"))}else h=!1
if(h){r=J.m(a0.h(0,"audio"),"optional")
q=A.C(x.N,x.z)
J.hv(r,new B.aTj(q))
J.iM(a0.h(0,"audio"),"optional")
J.jz(a0.h(0,"audio"),q)}}catch(a1){p=A.M(a1)
o=A.bx(a1)
A.t0("[getUserMedia] failed to translate optional audio constraints, "+A.u(p)+", "+A.u(o))}h=self
n=h.window.navigator.mediaDevices
g=x.m
w=n.getUserMedia!=null?7:9
break
case 7:m=A.c7(a0)
w=10
return A.e(A.dQ(n.getUserMedia(g.a(m)),g),$async$B6)
case 10:l=a3
u=new B.ph(l,"local")
w=1
break
w=8
break
case 9:h=h.window.navigator.mediaDevices
f=a0.h(0,"audio")
w=11
return A.e(A.dQ(h.getUserMedia({video:a0.h(0,"video"),audio:f}),g),$async$B6)
case 11:k=a3
u=new B.ph(k,"local")
w=1
break
case 8:t=2
w=6
break
case 4:t=3
e=s
j=A.M(e)
h=J.l(j)
throw A.p("Unable to getUserMedia: "+h)
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$B6,v)},
Gp(d){return this.ayJ(d)},
ayJ(d){var w=0,v=A.k(x.E),u,t=2,s,r,q,p,o,n,m,l,k,j,i
var $async$Gp=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:t=4
m=self
r=m.window.navigator.mediaDevices
w=r.getDisplayMedia!=null?7:9
break
case 7:q=A.c7(d)
m=x.m
w=10
return A.e(A.dQ(r.getDisplayMedia(m.a(q)),m),$async$Gp)
case 10:p=f
u=new B.ph(p,"local")
w=1
break
w=8
break
case 9:m=m.window.navigator.mediaDevices
l=x.N
l=A.c7(A.a2(["mediaSource","screen"],l,l))
l.toString
k=d.h(0,"audio")
if(k==null)k=!1
w=11
return A.e(A.dQ(m.getUserMedia({video:l,audio:k}),x.m),$async$Gp)
case 11:o=f
u=new B.ph(o,"local")
w=1
break
case 8:t=2
w=6
break
case 4:t=3
i=s
n=A.M(i)
m=J.l(n)
throw A.p("Unable to getDisplayMedia: "+m)
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Gp,v)}}
B.aeQ.prototype={
aHB(d,e){var w=this,v=w.at
v===$&&A.d()
v.addEventListener("datachannel",A.c6(new B.aYB(w)))
v.addEventListener("icecandidate",A.c6(new B.aYC(w)))
v.addEventListener("iceconnectionstatechange",A.c6(new B.aYD(w)))
v.onicegatheringstatechange=A.c6(new B.aYE(w))
v.addEventListener("signalingstatechange",A.c6(new B.aYF(w)))
if(!$.cjr())v.addEventListener("connectionstatechange",A.c6(new B.aYG(w)))
v.addEventListener("negotiationneeded",A.c6(new B.aYH(w)))
v.addEventListener("track",A.c6(new B.aYI(w)))},
W5(d){var w=0,v=A.k(x.v),u,t=this,s,r
var $async$W5=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.at
r===$&&A.d()
w=3
return A.e(A.dQ(r.createOffer(x.m.a(A.c7(A.C(x.N,x.z)))),x.A),$async$W5)
case 3:s=f
u=new B.Ed(s.sdp,s.type)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$W5,v)},
W2(d){var w=0,v=A.k(x.v),u,t=this,s,r
var $async$W2=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.at
r===$&&A.d()
w=3
return A.e(A.dQ(r.createAnswer(x.m.a(A.c7(A.C(x.N,x.z)))),x.A),$async$W2)
case 3:s=f
u=new B.Ed(s.sdp,s.type)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$W2,v)},
GS(d,e){return this.aAk(0,e)},
aAk(d,e){var w=0,v=A.k(x.H),u=this,t
var $async$GS=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:t=u.at
t===$&&A.d()
w=2
return A.e(A.dQ(t.setLocalDescription({type:e.b,sdp:e.a}),x.X),$async$GS)
case 2:return A.i(null,v)}})
return A.j($async$GS,v)},
GV(d,e){return this.aAB(0,e)},
aAB(d,e){var w=0,v=A.k(x.H),u=this,t
var $async$GV=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:t=u.at
t===$&&A.d()
w=2
return A.e(A.dQ(t.setRemoteDescription({type:e.b,sdp:e.a}),x.X),$async$GV)
case 2:return A.i(null,v)}})
return A.j($async$GV,v)},
V4(d){return this.ber(d)},
ber(d){var w=0,v=A.k(x.H),u=this,t,s
var $async$V4=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=u.at
s===$&&A.d()
t=d.b
t.toString
w=2
return A.e(A.dQ(s.addIceCandidate({candidate:d.a,sdpMid:t,sdpMLineIndex:d.c}),x.X),$async$V4)
case 2:return A.i(null,v)}})
return A.j($async$V4,v)},
aa(d){var w=0,v=A.k(x.H),u,t=this,s
var $async$aa=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=t.at
s===$&&A.d()
s.close()
u=A.d9(null,x.H)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$aa,v)},
Vf(d,e,f){return this.beG(0,e,f)},
beG(d,e,f){var w=0,v=A.k(x.e),u,t=this,s
var $async$Vf=A.f(function(g,h){if(g===1)return A.h(h,v)
while(true)switch(w){case 0:s=t.at
s===$&&A.d()
u=new B.aeS(s.addTrack(e.d,f.e))
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Vf,v)}}
B.aeS.prototype={
Zy(d){return this.bsF(d)},
bsF(d){var w=0,v=A.k(x.H),u=this,t,s,r,q
var $async$Zy=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:try{t=d
r=t.d
u.a.replaceTrack(r)}catch(p){r=A.M(p)
if(x.L.b(r)){s=r
throw A.p("Unable to RTCRtpSender::replaceTrack: "+J.l(s))}else throw p}return A.i(null,v)}})
return A.j($async$Zy,v)},
GU(d){return this.aAs(d)},
aAs(d){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k
var $async$GU=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:t=4
o=r.a
q=o.getParameters()
n=d.d
m=A.Y(n).i("af<1,ah<o,@>>")
m=A.c7(A.G(new A.af(n,new B.aYN(),m),!0,m.i("aD.E")))
n=m==null?A.c7([]):m
q.encodings=x.r.a(n)
w=7
return A.e(A.dQ(o.setParameters(q),x.X),$async$GU)
case 7:w=8
return A.e(A.d9(!0,x.y),$async$GU)
case 8:o=f
u=o
w=1
break
t=2
w=6
break
case 4:t=3
k=s
o=A.M(k)
if(x.L.b(o)){p=o
throw A.p("Unable to RTCRtpSender::setParameters: "+J.l(p))}else throw k
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$GU,v)}}
B.cgq.prototype={
b1(d){var w=0,v=A.k(x.H),u=this,t,s,r
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:try{u.a.stop()}catch(q){r=A.M(q)
if(x.L.b(r)){t=r
r=t
J.l(r)
throw A.p("Unable to RTCRtpTransceiver::stop: "+A.u(r))}else throw q}return A.i(null,v)}})
return A.j($async$b1,v)}}
B.US.prototype={
savp(d,e){var w
if(this.ax===e)return
this.ax=e
w=this.EY()
if(w!=null)w.style.objectFit=e},
ap5(){var w=this,v=w.EY(),u=w.a,t=v==null,s=t?null:v.videoWidth
if(s==null)s=0
t=t?null:v.videoHeight
if(t==null)t=0
w.sn(0,u.as3(t,w.z!=null,0,s))},
sH5(d,e){var w,v,u,t,s=this
if(e==null){w=s.EY()
if(w!=null)w.srcObject=null
w=s.w
if(w!=null)w.srcObject=null
s.z=null
return}s.z=e
if(e.uR(0).length!==0){s.x=new self.MediaStream()
w=s.z.e.getVideoTracks()
w=J.ap(x.l.b(w)?w:new A.dA(w,A.Y(w).i("dA<1,aG>")))
for(;w.B();){v=w.gJ(w)
s.x.addTrack(v)}}if(e.OO(0).length!==0){s.y=new self.MediaStream()
w=s.z.e.getAudioTracks()
w=J.ap(x.l.b(w)?w:new A.dA(w,A.Y(w).i("dA<1,aG>")))
for(;w.B();){v=w.gJ(w)
s.y.addTrack(v)}}if(s.y!=null){if(s.w==null){u=self.document.createElement("audio")
u.id="audio_"+("RTCVideoRenderer-"+s.Q)
u.muted=e.b==="local"
u.autoplay=!0
s.w=u
w=s.aRh()
v=s.w
v.toString
w.append(v)}w=s.w
if(w!=null)w.srcObject=s.y}t=s.EY()
if(t!=null){t.srcObject=s.x
w=s.EY()
w.toString
s.aez(w)}s.sn(0,s.a.bgU(s.z!=null))},
aRh(){var w,v=self,u=v.document.getElementById("html_webrtc_audio_manager_list")
if(u!=null)return u
w=v.document.createElement("div")
w.id="html_webrtc_audio_manager_list"
w.style.display="none"
v=v.document.body
if(v!=null)v.append(w)
return w},
EY(){var w=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(w!=null)return w
return null},
m(){var w=0,v=A.k(x.H),u,t=this,s,r,q,p,o
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t.z=null
for(s=t.at,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q)s[q].X(0)
p=t.EY()
s=p==null
if(!s)p.removeAttribute("src")
if(!s)p.load()
s=t.w
if(s!=null)s.remove()
o=self.document.getElementById("html_webrtc_audio_manager_list")
if(o!=null&&!o.hasChildNodes())o.remove()
u=t.eY()
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$m,v)},
jT(d){var w=0,v=A.k(x.H),u=this
var $async$jT=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:$.OQ()
$.t2().xi("RTCVideoRenderer-"+u.Q,new B.aYT(u),!0)
return A.i(null,v)}})
return A.j($async$jT,v)},
aez(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UU.prototype={
P(){return new B.UV()}}
B.UV.prototype={
S(){var w,v,u=this
u.W()
u.a.c.aj(0,u.gb2c())
w=u.a
v=w.c
v.as=w.e
v.savp(0,w.d===D.v7?"contain":"cover")},
b2d(){if(this.c!=null)this.k(new B.aYU())},
m(){if(this.c!=null)this.a2()},
aU(d){var w,v
this.bg(d)
A.dl(A.cU(0,0,10,0,0),new B.aYW(this))
w=this.a
v=w.c
v.savp(0,w.d===D.v7?"contain":"cover")},
D(d){return new A.iV(new B.aYV(this),null)}}
B.ab8.prototype={
aH9(d,e,f,g){var w=this,v=$.aI
w.a!==$&&A.aM()
w.a=new B.a0g(d,w,new A.bg(new A.aB(v,x.c),x.u),e,g.i("a0g<0>"))
if(f.a.gjd())f.a=new B.Wx(g.i("@<0>").cc(g).i("Wx<1,2>")).hO(f.a)
v=A.hd(null,new B.aMd(f,w),null,!0,g)
w.b!==$&&A.aM()
w.b=v},
alf(){var w,v
this.d=!0
w=this.c
if(w!=null)w.X(0)
v=this.b
v===$&&A.d()
v.aa(0)}}
B.a0g.prototype={
E(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dC(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.aUf(d,e)},
ia(d){return this.dC(d,null)},
aUf(d,e){var w=this
if(w.w){w.a.a.dC(d,e)
return}w.c.hn(d,e)
w.alg()
w.b.alf()
w.a.a.aa(0).fS(new B.bA4())},
aa(d){var w=this
if(w.e)return w.c.a
w.e=!0
if(!w.d){w.b.alf()
w.c.cJ(0,w.a.a.aa(0))}return w.c.a},
alg(){this.d=!0
var w=this.c
if((w.a.a&30)===0)w.dW(0)
return},
$ie6:1}
B.ahd.prototype={}
B.ahe.prototype={}
B.B6.prototype={
ag7(d,e){var w=this.b
if((w.b&4)!==0)return
w.E(0,new B.Ho(d,e))
w.aa(0)},
aca(d){var w
if((this.b.b&4)!==0)throw A.p(B.ch5())
w=A.c7(d)
w.toString
this.a.send(w)},
zk(d,e,f){return this.bgb(0,e,f)},
bgb(d,e,f){var w=0,v=A.k(x.H),u=this,t
var $async$zk=A.f(function(g,h){if(g===1)return A.h(h,v)
while(true)switch(w){case 0:t=u.b
if((t.b&4)!==0)throw A.p(B.ch5())
t.aa(0)
u.a.close()
return A.i(null,v)}})
return A.j($async$zk,v)},
$ich4:1}
B.v5.prototype={}
B.LK.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.LK&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.GY.prototype={
p(d,e){var w,v,u,t
if(e==null)return!1
if(e instanceof B.GY&&e.a.length===this.a.length){for(w=this.a,v=w.length,u=e.a,t=0;t<v;++t)if(u[t]!==w[t])return!1
return!0}return!1},
gI(d){return A.hC(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Ho.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.Ho&&e.a===this.a&&e.b===this.b},
gI(d){return A.hC([this.a,this.b])},
l(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Mj.prototype={
l(d){var w=this.a
if(w.length===0)return"WebSocketException"
else return"WebSocketException: "+w},
$ibR:1}
B.Mi.prototype={
l(d){var w=this.a
if(w.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+w}}
B.axD.prototype={
gkL(){var w,v=this,u=v.w
if(u===$){w=v.r.b
w===$&&A.d()
w=w.a
w===$&&A.d()
u!==$&&A.b3()
u=v.w=new B.au4(v,w)}return u},
aGS(d){d.ft(0,new B.axH(this),new B.axI(this),x.a)}}
B.au4.prototype={
aa(d){var w=this.b
w.e=w.d=null
return this.aCh(0)}}
B.aiy.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibR:1}
B.yQ.prototype={
O(){return"RTCSignalingState."+this.b}}
B.UO.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.yO.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.oe.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.aeT.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.yP.prototype={
O(){return"RTCPriorityType."+this.b}}
B.aYy.prototype={}
B.Tj.prototype={}
B.Jy.prototype={
l(d){var w=this.d
return"Track(id: "+A.u(w.id)+", kind: "+A.u(w.kind)+", label: "+A.u(w.label)+", enabled: "+A.u(w.enabled)+", muted: "+A.u(w.muted)+")"}}
B.aTf.prototype={}
B.Kp.prototype={}
B.UP.prototype={}
B.cgp.prototype={}
B.aeR.prototype={}
B.Kq.prototype={}
B.Ko.prototype={}
B.aYJ.prototype={}
B.UQ.prototype={}
B.aYO.prototype={}
B.Ed.prototype={}
B.UR.prototype={}
B.UT.prototype={
as3(d,e,f,g){var w=g==null?this.a:g,v=d==null?this.b:d,u=f==null?this.c:f
return new B.UT(w,v,u)},
bgU(d){return this.as3(null,d,null,null)},
l(d){var w=this
return A.ad(w).l(0)+"(width: "+A.u(w.a)+", height: "+A.u(w.b)+", rotation: "+w.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Lj)","bC(Kp)","bC(UR)","bC(oe)","~(@)","ph(@)","Ko(aG)","ah<o,@>(Kq)","bC(ch4)","~(v5)"])
B.b3x.prototype={
$0(){return J.cCH(this.a.bl())},
$S:1}
B.b3y.prototype={
$1(d){var w,v,u,t
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(u){t=A.M(u)
if(x.i.b(t)){w=t
v=A.bx(u)
this.b.dC(w,v)}else throw u}},
$S(){return this.a.$ti.i("~(1)")}}
B.caj.prototype={
$1(d){var w,v,u,t=$.K().b
if(t==null||t.length===0)return
w=self
v=new w.Headers()
v.set("Authorization","Bearer "+A.u(t))
v.set("Content-Type","application/json")
u=x.N
w.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:v,body:C.Y.dv(A.a2(["type","termine","contenu",A.C(u,x.z)],u,x.K),null),keepalive:!0})},
$S:23}
B.cai.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.azU.prototype={
$1(d){if(d==null)return null
return A.bT(J.l(d))},
$S:117}
B.buW.prototype={
$0(){var w=this.a
if(w.c!=null&&!w.e)w.JU(!0)},
$S:0}
B.buX.prototype={
$1(d){return this.a.UT()},
$S:27}
B.buT.prototype={
$0(){var w=this.a.c
if(w!=null)A.a1(w,!1).bL()},
$S:0}
B.buU.prototype={
$0(){return this.a.e=!0},
$S:0}
B.buQ.prototype={
$0(){var w=this.a
w.d=!1
w.e=!0},
$S:0}
B.buR.prototype={
$0(){return this.a.d=!1},
$S:0}
B.buS.prototype={
$0(){var w=this.a
w.d=!1
w.e=!0},
$S:0}
B.buN.prototype={
$0(){return this.a.f=!0},
$S:0}
B.buO.prototype={
$0(){return this.a.f=!1},
$S:0}
B.buP.prototype={
$1(d){var w=null,v=this.a.a,u=v.c,t=v.e,s=v.d
return B.ceW(v.w,w,u,v.y,s,w,w,w,!1,t)},
$S:1203}
B.buV.prototype={
$0(){return this.a.b6l()},
$S:0}
B.buM.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.buL())},
$S:0}
B.buL.prototype={
$0(){},
$S:0}
B.buy.prototype={
$1(d){this.a.yj("candidat_ice",d,!1)},
$S:240}
B.buz.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.bux(w))},
$S:0}
B.bux.prototype={
$0(){return this.a.go=!0},
$S:0}
B.buA.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buB.prototype={
$0(){},
$S:0}
B.buC.prototype={
$1(d){var w=this.a,v=w.ch
if(w.c!=null&&v!=null&&w.x)w.k(new B.buw(w,v))},
$S:27}
B.buw.prototype={
$0(){return this.a.CW=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.buD.prototype={
$1(d){},
$S:126}
B.buE.prototype={
$1(d){this.a.yu()},
$S:27}
B.buc.prototype={
$0(){var w=this.a
if(w.c!=null&&!w.x&&!w.y){if(w.a.f)w.yj("annule",C.bm,!1)
w.mF(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.buf.prototype={
$0(){var w=this.a
w.fy=w.a.d==="video"||w.at?A.b(y.c):A.b(y.d)},
$S:0}
B.bug.prototype={
$1(d){this.a.yj("candidat_ice",d,!1)},
$S:240}
B.buh.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.bue(w))},
$S:0}
B.bue.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bui.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buj.prototype={
$0(){return this.a.z=!0},
$S:0}
B.buk.prototype={
$1(d){var w=this.a,v=w.ch
if(w.c!=null&&v!=null&&w.x)w.k(new B.bud(w,v))},
$S:27}
B.bud.prototype={
$0(){return this.a.CW=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.bul.prototype={
$1(d){},
$S:126}
B.bum.prototype={
$1(d){this.a.yu()},
$S:27}
B.buG.prototype={
$1(d){var w=this.a
if(w.c!=null&&!w.y)w.Ts()},
$S:32}
B.buH.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buI.prototype={
$1(d){var w=this.a
if(w.c!=null&&!w.y)w.a2e("offre",d)},
$S:1205}
B.buJ.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buv.prototype={
$0(){return this.a.at=!0},
$S:0}
B.bus.prototype={
$0(){var w=this.a
w.x=!0
w.ch=new A.at(Date.now(),0,!1)
w.CW=C.R},
$S:0}
B.but.prototype={
$0(){return this.a.id=!0},
$S:0}
B.buu.prototype={
$1(d){var w=this.a.c
if(w!=null)A.a1(w,!1).bL()},
$S:5}
B.buF.prototype={
$1(d){return A.C(x.N,x.z)},
$S:113}
B.bu8.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bu6.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bu7.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.bub.prototype={
$0(){return this.a.at=!0},
$S:0}
B.bu9.prototype={
$0(){},
$S:0}
B.bua.prototype={
$0(){},
$S:0}
B.buo.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bL()
w.HD()},
$S:0}
B.bup.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bL()
w.HE()},
$S:0}
B.buq.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).Yn().aN(0,new B.bun(w),x.H)},
$S:0}
B.bun.prototype={
$1(d){return this.a.aml()},
$S:9}
B.bur.prototype={
$1(d){return A.fr(!0,A.I(this.a,C.n,C.f,C.O),!0,C.a_,!0,!0)},
$S:134}
B.buK.prototype={
$2(d,e){if(!d)this.a.JP()},
$S:1207}
B.bQI.prototype={
$2(d,e){var w,v,u,t=null,s=this.a,r=s.d
r===$&&A.d()
r=r.x
r===$&&A.d()
s=s.a.e
w=s?0.07:0.04
s=s?0.55:0.35
v=this.b
u=v+20
r=A.crm(A.S(t,t,C.j,t,t,new A.a4(t,t,A.bm(C.t.b3(s*(1-r)),3),t,t,t,C.aJ),t,u,t,t,t,t,t,u),1+w*r)
v+=8
v=A.S(t,t,C.j,t,t,new A.a4(t,t,A.bm(C.t,2),t,t,t,C.aJ),t,v,t,t,t,t,t,v)
e.toString
return A.e2(C.a6,A.a([r,v,e],x.p),C.h,C.aI,t)},
$S:1208}
B.b2W.prototype={
$1(d){var w,v=d.a
if(v.length===0)return
w=this.a.f
if(w!=null)w.$1(A.a2(["candidate",v,"sdpMid",d.b,"sdpMLineIndex",d.c],x.N,x.z))},
$S:z+3}
B.b2X.prototype={
$1(d){var w=d.b,v=w.length!==0?C.b.gU(w):null
if(v!=null)this.a.aPl(v)
if(d.c.d.kind==="video"){w=this.a.r
if(w!=null)w.$0()}},
$S:z+4}
B.b2Y.prototype={
$1(d){var w
if(d===D.Ou){w=this.a.w
if(w!=null)w.$0()}},
$S:z+5}
B.b2V.prototype={
$0(){var w=this.a
if(w.at){w.DM()
w=w.ax
if(w!=null)w.$0()}},
$S:25}
B.aDA.prototype={
$1(d){return this.a.a4j()},
$S:20}
B.aDB.prototype={
$0(){var w=this.a
if(!w.e)w.Hv()},
$S:0}
B.cbm.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTv.prototype={
$1(d){return this.a.push(B.cfL(d))},
$S:20}
B.aTw.prototype={
$1(d){return this.a.push(B.cfL(d))},
$S:20}
B.aTs.prototype={
$1(d){var w=this.a.c
if(w!=null)w.$0()},
$S:28}
B.aTt.prototype={
$1(d){},
$S:28}
B.aTu.prototype={
$1(d){},
$S:28}
B.aTh.prototype={
$0(){return!1},
$S:50}
B.aTi.prototype={
$0(){return!1},
$S:50}
B.aTj.prototype={
$1(d){J.hv(d,new B.aTg(this.a))},
$S:240}
B.aTg.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:53}
B.aYB.prototype={
$1(d){},
$S:28}
B.aYC.prototype={
$1(d){var w,v
if(d.candidate!=null){w=this.a.e
if(w!=null){v=d.candidate
w.$1(new B.Kp(v.candidate,v.sdpMid,v.sdpMLineIndex))}}},
$S:28}
B.aYD.prototype={
$1(d){var w,v=this.a,u=v.at
u===$&&A.d()
u=B.cXj(u.iceConnectionState)
v.cx=u
w=v.d
if(w!=null)w.$1(u)
if($.cjr())switch(v.cx.a){case 0:v.cy=D.Oz
break
case 1:v.cy=D.OA
break
case 3:v.cy=D.OB
break
case 5:v.cy=D.Ox
break
case 6:v.cy=D.Oy
break
case 7:v.cy=D.v5
break
default:break}},
$S:45}
B.aYE.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.CW=B.cXk(v.iceGatheringState)},
$S:45}
B.aYF.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.ch=B.cZt(v.signalingState)},
$S:45}
B.aYG.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.cy=B.cYD(v.connectionState)},
$S:45}
B.aYH.prototype={
$1(d){},
$S:45}
B.aYI.prototype={
$1(d){var w,v,u=this.a,t=u.Q
if(t!=null){w=B.cfL(d.track)
v=d.streams
v=x.l.b(v)?v:new A.dA(v,A.Y(v).i("dA<1,aG>"))
u=J.dq(v,new B.aYA(u),x.h)
t.$1(new B.UR(A.G(u,!0,u.$ti.i("aD.E")),w))}},
$S:28}
B.aYA.prototype={
$1(d){return new B.ph(d,this.a.as)},
$S:z+7}
B.aYM.prototype={
$1(d){var w="id",v=x.f.a(A.Ov(d)),u=J.du(v)
if(u.aC(v,w))u.j(v,w,C.e.C(A.iH(u.h(v,w))))
u.h(v,"uri")
u.h(v,w)
u.h(v,"encrypted")
return new B.Ko()},
$S:z+8}
B.aYL.prototype={
$1(d){var w,v,u,t,s,r,q,p,o,n=null,m="numTemporalLayers",l="scaleResolutionDownBy",k=A.Ov(d.rid),j=d.active,i=d.maxBitrate
i=i==null?n:A.bo(i)
w=d.maxFramerate
w=w==null?n:A.bo(w)
v=d.minBitrate
v=v==null?n:A.bo(v)
u=d.numTemporalLayers
u=u==null?n:A.bo(u)
t=d.scaleResolutionDownBy
if(t==null)t=n
s=d.ssrc
s=s==null?n:A.bo(s)
r=d.priority
if(r==null)r=n
q=d.networkPriority
if(q==null)q=n
p=d.scalabilityMode
if(p==null)p=n
o=x.z
o=A.a2(["rid",k,"active",j,"maxBitrate",i,"maxFramerate",w,"minBitrate",v,m,u,l,t,"ssrc",s,"priority",r,"networkPriority",q,"scalabilityMode",p],o,o)
p=o.h(0,"rid")
q=o.h(0,"active")
r=o.h(0,"maxBitrate")
s=o.h(0,"maxFramerate")
t=o.h(0,"minBitrate")
u=o.h(0,m)
v=o.h(0,l)
w=o.h(0,"ssrc")
i=o.h(0,"scalabilityMode")
j=B.cwr(o.h(0,"priority"))
k=j==null?D.v6:j
this.a.push(new B.Kq(p,q,r,t,s,u,v,w,i,k,B.cwr(o.h(0,"networkPriority"))))},
$S:20}
B.aYK.prototype={
$1(d){var w,v,u,t,s,r=null,q=d.payloadType,p=d.name
if(p==null)p=r
w=d.kind
if(w==null)w=r
v=d.clockRate
u=d.numChannels
u=u==null?r:A.bo(u)
t=d.parameters
t=t==null?r:A.Ov(t)
s=x.z
s=A.a2(["payloadType",q,"name",p,"kind",w,"clockRate",v,"numChannels",u,"parameters",t],s,s)
s.h(0,"payloadType")
s.h(0,"name")
t=s.h(0,"kind")
s.h(0,"clockRate")
s.h(0,"numChannels")
s.h(0,"parameters")
this.a.push(new B.aeR(t))},
$S:20}
B.aYN.prototype={
$1(d){var w,v,u=A.C(x.N,x.z)
u.j(0,"active",d.b)
w=d.a
if(w!=null)u.j(0,"rid",w)
w=d.c
if(w!=null)u.j(0,"maxBitrate",w)
w=d.e
if(w!=null)u.j(0,"maxFramerate",w)
w=d.d
if(w!=null)u.j(0,"minBitrate",w)
w=d.f
if(w!=null)u.j(0,"numTemporalLayers",w)
w=d.r
if(w!=null)u.j(0,"scaleResolutionDownBy",w)
w=d.x
if(w!=null)u.j(0,"scalabilityMode",w)
w=d.w
if(w!=null)u.j(0,"ssrc",w)
w=$.cCv()
u.j(0,"priority",w.h(0,d.y))
v=d.z
if(v!=null)u.j(0,"networkPriority",w.h(0,v))
return u},
$S:z+9}
B.cbv.prototype={
$1(d){return J.hH(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:8}
B.aYT.prototype={
$1(d){var w,v,u,t,s
for(w=this.a,v=w.at,u=v.length,t=0;t<v.length;v.length===u||(0,A.R)(v),++t)v[t].X(0)
C.b.a1(v)
s=self.document.createElement("video")
s.autoplay=!0
s.muted=!0
s.controls=!1
s.srcObject=w.x
s.id="video_"+("RTCVideoRenderer-"+w.Q)
s.setAttribute("playsinline","true")
w.aez(s)
u=x.k.c
v.push(A.i_(s,"canplay",new B.aYP(w),!1,u))
v.push(A.i_(s,"resize",new B.aYQ(w),!1,u))
v.push(A.i_(s,"error",new B.aYR(s),!1,u))
v.push(A.i_(s,"ended",new B.aYS(),!1,u))
return s},
$S:183}
B.aYP.prototype={
$1(d){this.a.ap5()},
$S:20}
B.aYQ.prototype={
$1(d){this.a.ap5()},
$S:20}
B.aYR.prototype={
$1(d){var w,v,u=this.a.error
A.t0("RTCVideoRenderer: videoElement.onError, "+J.l(u))
u.toString
w=C.JH.h(0,A.aw(u,"code"))
w.toString
v=!J.r(A.aw(u,"message"),"")?A.aw(u,"message"):"No further diagnostic information can be determined or provided."
throw A.p(A.o9(w,C.JG.h(0,A.aw(u,"code")),v,null))},
$S:23}
B.aYS.prototype={
$1(d){},
$S:20}
B.aYU.prototype={
$0(){},
$S:0}
B.aYW.prototype={
$0(){var w=this.a.a
return w.c.as=w.e},
$S:0}
B.aYV.prototype={
$2(d,e){var w=null,v=this.a.a.c
if(v.z!=null)v=A.aNc("RTCVideoRenderer-"+v.Q)
else v=A.S(w,w,C.j,w,w,w,w,w,w,w,w,w,w,w)
return A.cx(A.S(w,v,C.j,w,w,w,w,e.d,w,w,w,w,w,e.b),w,w)},
$S:1209}
B.aMd.prototype={
$0(){var w,v,u=this.b
if(u.d)return
w=this.a.a
v=u.b
v===$&&A.d()
u.c=w.fL(v.git(v),new B.aMc(u),v.gpE())},
$S:0}
B.aMc.prototype={
$0(){var w=this.a,v=w.a
v===$&&A.d()
v.alg()
w=w.b
w===$&&A.d()
w.aa(0)},
$S:0}
B.bA4.prototype={
$1(d){},
$S:17}
B.aC7.prototype={
$1(d){this.a.cJ(0,this.b)},
$S:28}
B.aC8.prototype={
$1(d){var w=this.a
if((w.a.a&30)===0)w.hQ(new B.Mj("Failed to connect WebSocket"))
else this.b.ag7(1006,"error")},
$S:28}
B.aC9.prototype={
$1(d){var w,v,u=this.a.b
if((u.b&4)!==0)return
w=d.data
w.toString
v=A.cF("data")
if(typeof w==="string")v.b=new B.LK(A.br(w))
else if(typeof w==="object"&&A.cop(x.m.a(w),"ArrayBuffer"))v.b=new B.GY(A.TJ(x.o.a(w),0,null))
else throw A.p(A.am("unexpected message type: "+J.aL(w).l(0)))
u.E(0,v.bl())},
$S:23}
B.aCa.prototype={
$1(d){var w=this.a
if((w.a.a&30)===0)w.cJ(0,this.b)
this.b.ag7(d.code,d.reason)},
$S:28}
B.axH.prototype={
$1(d){var w=d.b,v=this.a
new A.cZ(w,A.x(w).i("cZ<1>")).d2(new B.axE(v))
w=v.r.a
w===$&&A.d()
w=w.b
w===$&&A.d()
new A.cZ(w,A.x(w).i("cZ<1>")).bot(new B.axF(d),new B.axG(v,d))
v.f.dW(0)},
$S:z+10}
B.axE.prototype={
$1(d){var w,v,u
$label0$0:{w=d instanceof B.LK
v=w?d.a:null
if(w){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.E(0,v)
break $label0$0}w=d instanceof B.GY
u=w?d.a:null
if(w){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.E(0,u)
break $label0$0}if(d instanceof B.Ho){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.aa(0)}}},
$S:z+11}
B.axF.prototype={
$1(d){var w,v,u,t,s,r,q
try{$label1$1:{w=d
v=null
s=typeof w=="string"
if(s)v=w
if(s){s=this.a
r=v
if((s.b.b&4)!==0)A.aq(B.ch5())
r=A.c7(r)
r.toString
s.a.send(r)
break $label1$1}u=null
s=x.R.b(w)
if(s)u=w
if(s){this.a.aca(u)
break $label1$1}t=null
s=x.I.b(w)
if(s)t=w
if(s){this.a.aca(new Uint8Array(A.bX(t)))
break $label1$1}s=A.aV("Cannot send "+J.aL(d).l(0))
throw A.p(s)}}catch(q){if(!(A.M(q) instanceof B.Mi))throw q}},
$S:18}
B.axG.prototype={
$0(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$$0=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
w=6
return A.e(s.b.zk(0,r.d,r.e),$async$$0)
case 6:u=1
w=5
break
case 3:u=2
p=t
if(!(A.M(p) instanceof B.Mi))throw p
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$$0,v)},
$S:1}
B.axI.prototype={
$1(d){var w,v=d instanceof A.XA?d:new B.aiy(J.l(d)),u=this.a
u.f.hQ(v)
u=u.r.a
u===$&&A.d()
w=u.a
w===$&&A.d()
w.ia(v)
u=u.a
u===$&&A.d()
u.aa(0)},
$S:45};(function aliases(){var w=B.I_.prototype
w.aCh=w.aa
w=B.a5z.prototype
w.aG6=w.m})();(function installTearOffs(){var w=a._instance_0u,v=a._instance_1u
w(B.a_n.prototype,"gaIk","BG",0)
var u
v(u=B.a_m.prototype,"gaoX","aoY",2)
w(u,"gam_","JP",0)
w(u,"gamk","aml",1)
w(u,"gaeQ","Qq",0)
w(u,"gaeP","Qp",0)
w(u,"gaeN","Qn",0)
w(u,"gaeO","HD",0)
w(u,"gaeS","Qr",0)
w(u,"galq","b36",1)
v(u=B.a8C.prototype,"gb61","b62",6)
w(u,"gb4t","a4j",1)
w(B.US.prototype,"ged","m",0)
w(B.UV.prototype,"gb2c","b2d",1)})();(function inheritance(){var w=a.mixinHard,v=a.inheritMany,u=a.inherit
v(A.ai,[B.I_,B.azT,B.Lj,B.a8Q,B.b2U,B.a8C,B.acw,B.aYy,B.Tj,B.Jy,B.aTf,B.UP,B.UQ,B.aYO,B.ahe,B.a0g,B.ahd,B.B6,B.v5,B.Mj,B.aiy,B.Kp,B.cgp,B.aeR,B.Kq,B.Ko,B.aYJ,B.Ed,B.UR,B.UT])
u(B.Wx,A.h3)
v(A.kh,[B.b3x,B.cai,B.buW,B.buT,B.buU,B.buQ,B.buR,B.buS,B.buN,B.buO,B.buV,B.buM,B.buL,B.buz,B.bux,B.buA,B.buB,B.buw,B.buc,B.buf,B.buh,B.bue,B.bui,B.buj,B.bud,B.buv,B.bus,B.but,B.bu8,B.bu6,B.bu7,B.bub,B.bu9,B.bua,B.buo,B.bup,B.buq,B.b2V,B.aDB,B.aTh,B.aTi,B.aYU,B.aYW,B.aMd,B.aMc,B.axG])
v(A.jG,[B.b3y,B.caj,B.azU,B.buX,B.buP,B.buy,B.buC,B.buD,B.buE,B.bug,B.buk,B.bul,B.bum,B.buG,B.buH,B.buI,B.buJ,B.buu,B.buF,B.bun,B.bur,B.b2W,B.b2X,B.b2Y,B.aDA,B.cbm,B.aTv,B.aTw,B.aTs,B.aTt,B.aTu,B.aTj,B.aYB,B.aYC,B.aYD,B.aYE,B.aYF,B.aYG,B.aYH,B.aYI,B.aYA,B.aYM,B.aYL,B.aYK,B.aYN,B.cbv,B.aYT,B.aYP,B.aYQ,B.aYR,B.aYS,B.bA4,B.aC7,B.aC8,B.aC9,B.aCa,B.axH,B.axE,B.axF,B.axI])
v(A.T,[B.qH,B.qG,B.Ny,B.UU])
v(A.Z,[B.a_n,B.a_m,B.a5z,B.UV])
v(A.au,[B.YO,B.ake,B.YP,B.zO])
v(A.to,[B.buK,B.bQI,B.aTg,B.aYV])
u(B.aoQ,B.a5z)
u(B.aYz,B.aYy)
u(B.ph,B.Tj)
u(B.ad_,B.Jy)
u(B.Ti,B.aTf)
u(B.aeQ,B.UP)
u(B.aeS,B.UQ)
u(B.cgq,B.aYO)
u(B.US,A.dw)
v(B.ahe,[B.ab8,B.axD])
v(B.v5,[B.LK,B.GY,B.Ho])
u(B.Mi,B.Mj)
u(B.au4,B.I_)
v(A.MR,[B.yQ,B.UO,B.yO,B.oe,B.aeT,B.yP])
w(B.a5z,A.h2)})()
A.ni(b.typeUniverse,JSON.parse('{"I_":{"e6":["1"]},"Wx":{"h3":["1","2"],"h3.S":"1","h3.T":"2"},"Ny":{"T":[],"q":[]},"qH":{"T":[],"q":[]},"a_n":{"Z":["qH"]},"YO":{"au":[],"q":[]},"qG":{"T":[],"q":[]},"a_m":{"Z":["qG"]},"ake":{"au":[],"q":[]},"YP":{"au":[],"q":[]},"zO":{"au":[],"q":[]},"aoQ":{"Z":["Ny"]},"ph":{"Tj":[]},"ad_":{"Jy":[]},"aeQ":{"UP":[]},"aeS":{"UQ":[]},"US":{"dw":["UT"],"b1":[]},"UU":{"T":[],"q":[]},"UV":{"Z":["UU"]},"a0g":{"e6":["1"]},"B6":{"ch4":[]},"LK":{"v5":[]},"GY":{"v5":[]},"Ho":{"v5":[]},"Mj":{"bR":[]},"Mi":{"bR":[]},"au4":{"e6":["@"]},"aiy":{"bR":[]}}'))
A.csL(b.typeUniverse,JSON.parse('{"I_":1,"ahe":1}'))
var y={c:"Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o.",d:"Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler."}
var x=(function rtii(){var w=A.aA
return{b:w("B6"),L:w("bR"),_:w("av<@>"),x:w("av<~>"),T:w("H<ah<o,V>>"),t:w("H<ah<o,@>>"),Q:w("H<Jy>"),B:w("H<aeR>"),M:w("H<Kq>"),d:w("H<jo<@>>"),s:w("H<o>"),p:w("H<q>"),r:w("H<ai?>"),m:w("aG"),l:w("E<aG>"),F:w("E<ah<o,@>>"),j:w("E<@>"),I:w("E<v>"),P:w("ah<o,@>"),f:w("ah<@,@>"),E:w("Tj"),G:w("Jy"),h:w("ph"),o:w("qZ"),a:w("bC"),K:w("ai"),J:w("Ko"),O:w("UP"),e:w("UQ"),v:w("Ed"),Z:w("ahd<ai?>"),N:w("o"),i:w("rx"),R:w("eB"),D:w("v5"),U:w("X<o>"),g:w("dL<Lj>"),n:w("dL<~>"),V:w("bg<B6>"),u:w("bg<@>"),W:w("bg<~>"),k:w("a_x<aG>"),C:w("q0<aG>"),w:w("aB<B6>"),c:w("aB<@>"),Y:w("aB<~>"),q:w("kH"),y:w("V"),z:w("@"),S:w("v"),A:w("aG?"),cO:w("ah<o,@>?"),X:w("ai?"),H:w("~")}})();(function constants(){var w=a.makeConstList
D.zl=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.Z2=new B.a8Q(C.dF)
D.rE=new A.ak(32,0,32,0)
D.a2M=new A.ak(8,20,8,20)
D.a2Z=new A.cQ(1,C.ar,C.azh,null)
D.Bg=new A.an(57639,"MaterialIcons",null,!1)
D.a45=new A.an(58337,"MaterialIcons",null,!1)
D.a46=new A.an(58341,"MaterialIcons",null,!1)
D.a47=new A.an(58721,"MaterialIcons",null,!0)
D.a4a=new A.an(58888,"MaterialIcons",null,!1)
D.Br=new A.an(59048,"MaterialIcons",null,!1)
D.a4b=new A.an(59049,"MaterialIcons",null,!1)
D.a4c=new A.an(59077,"MaterialIcons",null,!1)
D.Bl=new A.an(58195,"MaterialIcons",null,!1)
D.a69=new A.aa(D.Bl,null,C.m,null,null)
D.a68=new A.aa(D.Bl,28,C.m,null,null)
D.Bq=new A.an(58923,"MaterialIcons",null,!1)
D.a6r=new A.aa(D.Bq,null,C.m,null,null)
D.a6q=new A.aa(D.Bq,20,C.m,null,null)
D.afR=A.a(w([1,2,4,8,16]),A.aA("H<v>"))
D.Ef=A.a(w([]),x.Q)
D.JX=new A.fT("FlutterWebRTC.Method",C.bh,null)
D.av3=new B.oe(0,"RTCIceConnectionStateNew")
D.av4=new B.oe(1,"RTCIceConnectionStateChecking")
D.av5=new B.oe(2,"RTCIceConnectionStateCompleted")
D.av6=new B.oe(3,"RTCIceConnectionStateConnected")
D.av7=new B.oe(4,"RTCIceConnectionStateCount")
D.Ou=new B.oe(5,"RTCIceConnectionStateFailed")
D.av8=new B.oe(6,"RTCIceConnectionStateDisconnected")
D.Ov=new B.oe(7,"RTCIceConnectionStateClosed")
D.Ow=new B.UO(0,"RTCIceGatheringStateNew")
D.av9=new B.UO(1,"RTCIceGatheringStateGathering")
D.ava=new B.UO(2,"RTCIceGatheringStateComplete")
D.v5=new B.yO(0,"RTCPeerConnectionStateClosed")
D.Ox=new B.yO(1,"RTCPeerConnectionStateFailed")
D.Oy=new B.yO(2,"RTCPeerConnectionStateDisconnected")
D.Oz=new B.yO(3,"RTCPeerConnectionStateNew")
D.OA=new B.yO(4,"RTCPeerConnectionStateConnecting")
D.OB=new B.yO(5,"RTCPeerConnectionStateConnected")
D.OC=new B.yP(0,"veryLow")
D.v6=new B.yP(1,"low")
D.OD=new B.yP(2,"medium")
D.OE=new B.yP(3,"high")
D.avb=new B.yQ(0,"RTCSignalingStateStable")
D.avc=new B.yQ(1,"RTCSignalingStateHaveLocalOffer")
D.avd=new B.yQ(2,"RTCSignalingStateHaveRemoteOffer")
D.ave=new B.yQ(3,"RTCSignalingStateHaveLocalPrAnswer")
D.avf=new B.yQ(4,"RTCSignalingStateHaveRemotePrAnswer")
D.OF=new B.yQ(5,"RTCSignalingStateClosed")
D.avg=new B.UT(0,0,0)
D.v7=new B.aeT(0,"RTCVideoViewObjectFitContain")
D.OG=new B.aeT(1,"RTCVideoViewObjectFitCover")
D.az2=new A.ci(48,null,null,null)
D.azf=new A.ci(null,64,null,null)
D.aCh=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aCv=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wn=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.ci3=null
$.crN=!1
$.cpU=1
$.cZW=A.a2(["very-low",D.OC,"low",D.v6,"medium",D.OD,"high",D.OE],x.N,A.aA("yP"))})();(function lazyInitializers(){var w=a.lazyFinal
w($,"d4w","awP",()=>new B.aYz())
w($,"d17","cjr",()=>C.d.u(A.aw(A.aw(A.aw(A.cj4(),"window"),"navigator"),"userAgent"),"Firefox"))
w($,"daf","cCv",()=>A.a2([D.OC,"very-low",D.v6,"low",D.OD,"medium",D.OE,"high"],A.aA("yP"),x.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"7aCXNdQUYcn7rwBJP24eWUE44pU=");