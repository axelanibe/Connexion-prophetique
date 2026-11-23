((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={HX:function HX(){},Ww:function Ww(d){this.$ti=d},b3l:function b3l(d){this.a=d},b3m:function b3m(d,e){this.a=d
this.b=e},
cv1(d){var w
B.c8f()
if(d.length===0)return
w=A.c6(new B.ca6(d))
self.window.addEventListener("beforeunload",w)
$.chQ=new B.ca5(w)},
c8f(){var w=$.chQ
if(w!=null)w.$0()
$.chQ=null},
ca6:function ca6(d){this.a=d},
ca5:function ca5(d){this.a=d},
a7c(d){var w,v,u,t,s=new B.azR(),r=J.Q(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
w=r.h(d,"conversation_id")
J.l(w==null?"":w)
w=r.h(d,"appelant_id")
w=J.l(w==null?"":w)
v=r.h(d,"appelant_nom")
v=J.l(v==null?"":v)
A.az(r.h(d,"appele_id"))
A.az(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.azQ(q,w,v,u,t)},
cgo(d){var w,v,u,t=J.Q(d),s=t.h(d,"contenu"),r=t.h(d,"id")
r=J.l(r==null?"":r)
w=t.h(d,"appel_id")
J.l(w==null?"":w)
w=t.h(d,"emetteur_id")
w=J.l(w==null?"":w)
v=t.h(d,"type")
v=J.l(v==null?"":v)
if(x.P.b(s))u=s
else u=x.f.b(s)?J.mw(s,x.N,x.z):C.bn
if(t.h(d,"cree_le")!=null)A.bT(J.l(t.h(d,"cree_le")))
return new B.Lh(r,w,v,u)},
cEs(d){var w,v,u,t,s,r,q=J.Q(d),p=q.h(d,"iceServers")
if(p==null)p=q.h(d,"ice_servers")
if(!x.j.b(p))return D.Z0
w=A.a([],x.t)
for(q=J.ap(p),v=x.f,u=x.P,t=x.N,s=x.z;q.B();){r=q.gJ(q)
if(u.b(r))w.push(r)
else if(v.b(r))w.push(J.mw(r,t,s))}return new B.a8P(w)},
cvS(d){var w=J.Q(d),v=w.h(d,"sdp"),u=w.h(d,"type")
if(typeof v!="string"||v.length===0)return null
w=J.oJ(u)
if(!w.p(u,"offer")&&!w.p(u,"answer"))return null
return new A.aq0(v,u)},
cUY(d){var w,v,u=J.Q(d),t=u.h(d,"candidate")
if(typeof t!="string")return null
w=u.h(d,"sdpMid")
v=u.h(d,"sdpMLineIndex")
u=typeof w=="string"?w:null
return new A.aq3(t,A.hZ(v)?v:null,u)},
azQ:function azQ(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
azR:function azR(){},
Lh:function Lh(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a8P:function a8P(d){this.a=d},
aw9(d){return B.cVW(d)},
cVW(d){var w=0,v=A.k(x.y),u
var $async$aw9=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u=!0
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$aw9,v)},
cmZ(d,e,f,g,h,i,j){return new B.qG(f,g,j,i,e,d,null)},
ceI(d,e,f,g,h,i,j,k,l,m){return new B.qF(f,m,h,l,i,d,j,k,e,g,null)},
crM(d,e,f,g,h,i,j,k,l,m,n){return new B.akc(e,g,f,d,n,k,j,i,h,l,m,null)},
ctM(d,e){var w=null
return new A.W(D.rD,A.c(d.toUpperCase(),2,C.a5,w,w,A.be(w,w,C.m,w,w,w,w,w,"Cinzel",w,w,e,w,w,C.A,w,w,!0,w,1.2,w,w,w,w,w,w),C.X,w,w),w)},
qG:function qG(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_m:function a_m(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
buJ:function buJ(d){this.a=d},
buK:function buK(d){this.a=d},
buG:function buG(d){this.a=d},
buH:function buH(d){this.a=d},
buD:function buD(d){this.a=d},
buE:function buE(d){this.a=d},
buF:function buF(d){this.a=d},
buA:function buA(d){this.a=d},
buB:function buB(d){this.a=d},
buC:function buC(d){this.a=d},
buI:function buI(d){this.a=d},
YN:function YN(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qF:function qF(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
a_l:function a_l(d,e){var _=this
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
buz:function buz(d){this.a=d},
buy:function buy(){},
bul:function bul(d){this.a=d},
bum:function bum(d){this.a=d},
buk:function buk(d){this.a=d},
bun:function bun(d){this.a=d},
buo:function buo(){},
bup:function bup(d){this.a=d},
buj:function buj(d,e){this.a=d
this.b=e},
buq:function buq(){},
bur:function bur(d){this.a=d},
bu_:function bu_(d){this.a=d},
bu2:function bu2(d){this.a=d},
bu3:function bu3(d){this.a=d},
bu4:function bu4(d){this.a=d},
bu1:function bu1(d){this.a=d},
bu5:function bu5(d){this.a=d},
bu6:function bu6(d){this.a=d},
bu7:function bu7(d){this.a=d},
bu0:function bu0(d,e){this.a=d
this.b=e},
bu8:function bu8(){},
bu9:function bu9(d){this.a=d},
but:function but(d){this.a=d},
buu:function buu(d){this.a=d},
buv:function buv(d){this.a=d},
buw:function buw(d){this.a=d},
bui:function bui(d){this.a=d},
buf:function buf(d,e){this.a=d
this.b=e},
bug:function bug(d){this.a=d},
buh:function buh(d){this.a=d},
bus:function bus(){},
btW:function btW(d,e){this.a=d
this.b=e},
btU:function btU(d,e){this.a=d
this.b=e},
btV:function btV(d,e){this.a=d
this.b=e},
btZ:function btZ(d){this.a=d},
btX:function btX(){},
btY:function btY(){},
bub:function bub(d){this.a=d},
buc:function buc(d){this.a=d},
bud:function bud(d){this.a=d},
bua:function bua(d){this.a=d},
bue:function bue(d){this.a=d},
bux:function bux(d){this.a=d},
akc:function akc(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
YO:function YO(d,e){this.c=d
this.a=e},
zM:function zM(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Nx:function Nx(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
aoO:function aoO(d,e){var _=this
_.d=$
_.eJ$=d
_.bS$=e
_.c=_.a=null},
bQv:function bQv(d,e){this.a=d
this.b=e},
a5y:function a5y(){},
b2I:function b2I(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1
_.as=_.Q=_.z=null
_.at=!1
_.ax=null
_.ay=!1},
b2K:function b2K(d){this.a=d},
b2L:function b2L(d){this.a=d},
b2M:function b2M(d){this.a=d},
b2J:function b2J(d){this.a=d},
a8B:function a8B(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.y=_.x=null},
aDx:function aDx(d){this.a=d},
aDy:function aDy(d){this.a=d},
cb8(d){var w=x.U,v=A.G(new A.X(A.a(d.split(" "),x.s),new B.cb9(),w),!0,w.i("w.E"))
w=v.length
if(w===0)return"?"
if(w===1)return J.m(C.b.gU(v),0).toUpperCase()
return(J.m(C.b.gU(v),0)+J.m(C.b.gaY(v),0)).toUpperCase()},
cb9:function cb9(){},
acv:function acv(){this.a=null},
aYn:function aYn(){},
pe:function pe(d,e){this.e=d
this.b=e},
aTl:function aTl(d){this.a=d},
aTm:function aTm(d){this.a=d},
cfx(d){var w=new B.acZ(d)
w.aHn(d)
return w},
acZ:function acZ(d){this.d=d
this.c=null},
aTi:function aTi(d){this.a=d},
aTj:function aTj(d){this.a=d},
aTk:function aTk(d){this.a=d},
Th:function Th(){},
aT7:function aT7(){},
aT8:function aT8(){},
aT9:function aT9(d){this.a=d},
aT6:function aT6(d){this.a=d},
cKs(d,e){var w=x.N
w=new B.aeP(d,e,A.C(w,x.E),A.C(w,x.z))
w.aHw(d,e)
return w},
aeP:function aeP(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYp:function aYp(d){this.a=d},
aYq:function aYq(d){this.a=d},
aYr:function aYr(d){this.a=d},
aYs:function aYs(d){this.a=d},
aYt:function aYt(d){this.a=d},
aYu:function aYu(d){this.a=d},
aYv:function aYv(d){this.a=d},
aYw:function aYw(d){this.a=d},
aYo:function aYo(d){this.a=d},
cKv(d){var w=d.headerExtensions
w=x.l.b(w)?w:new A.dA(w,A.Y(w).i("dA<1,aG>"))
w=J.du(w,new B.aYA(),x.J)
return A.G(w,!0,w.$ti.i("aD.E"))},
cKu(d){var w,v
if("encodings" in d)w=d.encodings
else w=[]
v=A.a([],x.M)
C.b.aG(w,new B.aYz(v))
return v},
cKt(d){var w,v
if("codecs" in d)w=d.codecs
else w=[]
v=A.a([],x.B)
C.b.aG(w,new B.aYy(v))
return v},
aYA:function aYA(){},
aYz:function aYz(d){this.a=d},
aYy:function aYy(d){this.a=d},
aeR:function aeR(d){this.a=d},
aYB:function aYB(){},
cgc:function cgc(d){this.a=d},
cXs(){return C.b.nP(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],x.s),new B.cbi())!==-1},
cbi:function cbi(){},
cpD(){var w=A.a([],x.d),v=$.cpE
$.cpE=v+1
return new B.UR(v,w,D.av7,$.ae())},
UR:function UR(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aYH:function aYH(d){this.a=d},
aYD:function aYD(d){this.a=d},
aYE:function aYE(d){this.a=d},
aYF:function aYF(d){this.a=d},
aYG:function aYG(){},
cgd(d,e,f){return new B.UT(d,f,e,null)},
UT:function UT(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UU:function UU(){this.c=this.a=null},
aYI:function aYI(){},
aYK:function aYK(d){this.a=d},
aYJ:function aYJ(d){this.a=d},
cnC(d,e,f,g){var w,v={}
v.a=d
w=new B.ab7(g.i("ab7<0>"))
w.aH4(e,f,v,g)
return w},
ab7:function ab7(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aM3:function aM3(d,e){this.a=d
this.b=e},
aM2:function aM2(d){this.a=d},
a0f:function a0f(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bzS:function bzS(){},
ahc:function ahc(d){this.b=this.a=$
this.$ti=d},
ahd:function ahd(){},
ce3(d,e){return B.cDF(d,e)},
cDF(d,e){var w=0,v=A.k(x.b),u,t,s,r,q,p,o
var $async$ce3=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:if(!d.q4("ws")&&!d.q4("wss"))throw A.p(A.he(d,"url","only ws: and wss: schemes are supported"))
t=self
s=t.WebSocket
r=d.l(0)
t=new t.Array()
q=new s(r,t)
q.binaryType="arraybuffer"
p=new B.B5(q,A.hb(null,null,null,!1,x.D))
t=new A.aA($.aI,x.w)
o=new A.bg(t,x.V)
if(J.r(q.readyState,1))o.cI(0,p)
else if(J.r(q.readyState,2)||J.r(q.readyState,3))o.hO(new B.Mi("Unexpected WebSocket state: "+A.u(q.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.pY(q,"open",!1,x.C).gU(0).aN(0,new B.aC4(o,p),x.H)
s=x.C
r=x.H
new A.pY(q,"error",!1,s).gU(0).aN(0,new B.aC5(o,p),r)
A.iC(q,"message",new B.aC6(p),!1,x.m)
new A.pY(q,"close",!1,s).gU(0).aN(0,new B.aC7(o,p),r)
u=t
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$ce3,v)},
B5:function B5(d,e){this.a=d
this.b=e},
aC4:function aC4(d,e){this.a=d
this.b=e},
aC5:function aC5(d,e){this.a=d
this.b=e},
aC6:function aC6(d){this.a=d},
aC7:function aC7(d,e){this.a=d
this.b=e},
cgS(){return new B.Mh("Connection Closed")},
v4:function v4(){},
LI:function LI(d){this.a=d},
GV:function GV(d){this.a=d},
Hl:function Hl(d,e){this.a=d
this.b=e},
Mi:function Mi(d){this.a=d},
Mh:function Mh(d){this.a=d},
cDb(d){var w=null,v=$.aI,u=new B.ahc(x.Z),t=x.X,s=A.hb(w,w,w,!0,t),r=A.hb(w,w,w,!0,t),q=A.x(r),p=A.x(s)
u.a=B.cnC(new A.cY(r,q.i("cY<1>")),new A.G5(s,p.i("G5<1>")),!0,t)
u.b=B.cnC(new A.cY(s,p.i("cY<1>")),new A.G5(r,q.i("G5<1>")),!1,t)
u=new B.axB(new A.bg(new A.aA(v,x.Y),x.W),u)
u.aGN(d)
return u},
axB:function axB(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axF:function axF(d){this.a=d},
axC:function axC(d){this.a=d},
axD:function axD(d){this.a=d},
axE:function axE(d,e){this.a=d
this.b=e},
axG:function axG(d){this.a=d},
au2:function au2(d,e){this.b=d
this.a=e},
aiw:function aiw(d){this.a=d},
cX0(d){switch(d){case"new":return D.auV
case"checking":return D.auW
case"connected":return D.auY
case"completed":return D.auX
case"failed":return D.Os
case"disconnected":return D.av_
case"closed":return D.Ot
case"count":return D.auZ}return D.Ot},
cX1(d){switch(d){case"new":return D.Ou
case"gathering":return D.av0
case"complete":return D.av1}return D.Ou},
cZ9(d){switch(d){case"stable":return D.av2
case"have-local-offer":return D.av3
case"have-local-pranswer":return D.av5
case"have-remote-offer":return D.av4
case"have-remote-pranswer":return D.av6
case"closed":return D.OD}return D.OD},
cYj(d){switch(d){case"new":return D.Ox
case"connecting":return D.Oy
case"connected":return D.Oz
case"closed":return D.v4
case"disconnected":return D.Ow
case"failed":return D.Ov}return D.v4},
cwb(d){if(d==null)return null
return $.cZC.h(0,d)},
yO:function yO(d,e){this.a=d
this.b=e},
UN:function UN(d,e){this.a=d
this.b=e},
yM:function yM(d,e){this.a=d
this.b=e},
o9:function o9(d,e){this.a=d
this.b=e},
aeS:function aeS(d,e){this.a=d
this.b=e},
yN:function yN(d,e){this.a=d
this.b=e},
aYm:function aYm(){},
Ti:function Ti(){},
Jw:function Jw(){},
aT5:function aT5(){},
Kn:function Kn(d,e,f){this.a=d
this.b=e
this.c=f},
UO:function UO(){},
cgb:function cgb(){},
aeQ:function aeQ(d){this.c=d},
Ko:function Ko(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
Km:function Km(){},
aYx:function aYx(d){this.d=d},
UP:function UP(){},
aYC:function aYC(){},
Eb:function Eb(d,e){this.a=d
this.b=e},
UQ:function UQ(d,e){this.b=d
this.c=e},
US:function US(d,e,f){this.a=d
this.b=e
this.c=f},
cf8(d){var w=0,v=A.k(x.y)
var $async$cf8=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:if(d.d.kind!=="video")throw A.p("The is not a video track => "+d.l(0))
throw A.p("You need to specify the deviceId")
return A.i(null,v)}})
return A.j($async$cf8,v)},
adj(d){var w=0,v=A.k(x.H),u
var $async$adj=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u=x.z
w=2
return A.e(B.b8i("enableSpeakerphone",A.a2(["enable",d],x.N,u),u,u),$async$adj)
case 2:return A.i(null,v)}})
return A.j($async$adj,v)},
aV7(d,e){var w=0,v=A.k(x.H),u,t,s
var $async$aV7=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:s=e.d
w=s.kind==="audio"?3:4
break
case 3:t=J.mw(x.f.a(A.Ou(s.getConstraints())),x.N,x.z)
t.j(0,"volume",d)
w=5
return A.e(e.Vm(0,t),$async$aV7)
case 5:case 4:u=A.d9(null,x.H)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$aV7,v)},
b8i(d,e,f,g){return B.cO5(d,e,f,g,f.i("0?"))},
cO5(d,e,f,g,h){var w=0,v=A.k(h),u
var $async$b8i=A.f(function(i,j){if(i===1)return A.h(j,v)
while(true)switch(w){case 0:w=3
return A.e(B.b8h(),$async$b8i)
case 3:u=D.JV.cm(d,e,!1,f)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$b8i,v)},
b8h(){var w=0,v=A.k(x.H),u,t
var $async$b8h=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:w=!$.crx?2:3
break
case 2:u=x.N
t=x.z
w=4
return A.e(D.JV.cm("initialize",A.a2(["options",A.C(u,t)],u,t),!1,x.H),$async$b8h)
case 4:$.crx=!0
case 3:return A.i(null,v)}})
return A.j($async$b8h,v)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[27]
B.HX.prototype={
E(d,e){this.a.E(0,e)},
dB(d,e){this.a.dB(d,e)},
aa(d){return this.a.aa(0)},
$ie6:1}
B.Ww.prototype={
hN(d){var w=A.cE("subscription"),v=A.hb(new B.b3l(w),null,null,!0,this.$ti.y[1])
w.b=d.fL(new B.b3m(this,v),v.gnG(v),v.gpE())
return new A.cY(v,A.x(v).i("cY<1>"))}}
B.azQ.prototype={}
B.Lh.prototype={}
B.a8P.prototype={}
B.qG.prototype={
O(){return new B.a_m()}}
B.a_m.prototype={
S(){var w,v,u=this
u.W()
w=u.a
w.toString
u.z=!0
v=new B.acv()
u.y!==$&&A.aM()
u.y=v
if(!w.y)v.uf(A.Bj(C.ld,$.vE().a).c)
u.Qb()
u.r=A.dl(C.c9,new B.buJ(u))
u.w=A.hc(C.rr,new B.buK(u))},
m(){var w=this,v=w.r
if(v!=null)v.X(0)
v=w.w
if(v!=null)v.X(0)
v=w.x
if(v!=null)v.X(0)
v=w.y
v===$&&A.d()
v.it()
if(w.z)v.ha()
w.a2()},
a4p(){var w=this.x
if(w!=null)w.X(0)
this.x=A.dl(C.fb,new B.buG(this))},
UQ(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l
var $async$UQ=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.c==null||r.e||r.f){w=1
break}t=4
o=r.a
o.toString
n=$.K()
w=7
return A.e(n.EK(o.c),$async$UQ)
case 7:q=e
p=B.a7c(q)
if(r.c==null||r.e){w=1
break}if(p.w!=="sonne"){r.k(new B.buH(r))
o=r.r
if(o!=null)o.X(0)
o=r.w
if(o!=null)o.X(0)
o=r.y
o===$&&A.d()
o.it()
r.a4p()}t=2
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
return A.j($async$UQ,v)},
Qb(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j
var $async$Qb=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:t=4
n=r.a
n.toString
m=$.K()
w=7
return A.e(m.EK(n.c),$async$Qb)
case 7:q=e
p=B.a7c(q)
if(r.c==null){w=1
break}l=r.a.r
if(l==null){n=$.K()
l=n.gx0()}o=l
if(p.w!=="sonne"||p.c===o){r.k(new B.buD(r))
n=r.y
n===$&&A.d()
n.it()
r.a4p()
w=1
break}r.k(new B.buE(r))
if(r.a.y)r.BF()
t=2
w=6
break
case 4:t=3
j=s
if(r.c==null){w=1
break}r.k(new B.buF(r))
n=r.y
n===$&&A.d()
n.it()
r.a4p()
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Qb,v)},
BF(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$BF=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.f||r.e){w=1
break}w=3
return A.e(B.aw9(r.a.e==="video"),$async$BF)
case 3:if(!e){p=r.c
if(p==null){w=1
break}o=r.a.e==="video"?A.b(y.c):A.b(y.d)
p.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(o,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break}r.Q=!0
r.k(new B.buA(r))
t=5
p=r.a
p.toString
o=$.K()
w=8
return A.e(o.M4(p.c,"accepte"),$async$BF)
case 8:t=2
w=7
break
case 5:t=4
m=s
q=A.M(m)
if(r.c==null){w=1
break}r.k(new B.buB(r))
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
p.it()
p=r.c
p.toString
A.a1(p,!1).uu(A.e0(new B.buC(r),null,x.z))
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$BF,v)},
JR(d){return this.b6f(d)},
b6e(){return this.JR(!1)},
b6f(d){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n
var $async$JR=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:if(r.f){w=1
break}r.f=!0
q=r.r
if(q!=null)q.X(0)
q=r.w
if(q!=null)q.X(0)
q=r.y
q===$&&A.d()
q.it()
t=4
q=r.a
q.toString
p=$.K()
w=7
return A.e(p.M4(q.c,"refuse"),$async$JR)
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
return A.j($async$JR,v)},
D(d){var w,v,u,t,s=this,r=null,q=s.a,p=q.e
q=A.jE(C.t,r,A.c(B.cb8(q.d),r,r,r,r,D.aCm,r,r,r),r,56)
w=s.a.d
w=A.c(w.length===0?A.b("Un membre"):w,r,r,r,r,D.aC8,C.X,r,r)
if(s.d)p=A.b("Connexion\u2026")
else if(s.e)p=A.b("Appel termin\xe9")
else p=p==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
v=x.p
p=A.a([q,C.aw,new A.W(D.rD,w,r),C.k,A.c(p,r,r,r,r,D.wm,r,r,r),D.az6],v)
if(!s.d&&!s.e){q=A.b("Refuser")
w=s.f?r:new B.buI(s)
u=A.b("Accepter")
t=s.f?r:s.gaIf()
p.push(A.P(A.a([new B.YN(D.Be,C.aG,q,w,r),D.ayU,new B.YN(C.nD,C.d2,u,t,r)],v),C.n,C.by,C.i,r))}if(s.d)p.push(C.yI)
return A.dT(r,C.o,A.fr(!0,A.cx(A.I(p,C.n,C.f,C.O),r,r),!0,C.a_,!0,!0),r,r,r)}}
B.YN.prototype={
D(d){var w=this,v=null,u=A.di(w.d,v,v,C.a_,C.cv,v)
return A.I(A.a([A.ab(A.aT(!1,A.c_(w.c,C.m,v,32),C.j,v,C.p,v,v,v,v,w.f,v,u),72,72),C.k,A.c(w.e,v,v,v,v,C.dL,v,v,v)],x.p),C.n,C.f,C.O)}}
B.qF.prototype={
O(){return new B.a_l(A.b7(x.N),C.R)}}
B.a_l.prototype={
S(){var w,v,u,t,s,r,q,p,o,n=this,m=null
n.W()
w=n.a
n.r=w.c
w=w.x
if(w==null)w=new B.b2I(B.cpD(),B.cpD())
n.d!==$&&A.aM()
n.d=w
v=n.a
u=v.y
if(u==null)u=new B.a8B(new A.dV(m,m,x.g),new A.dV(m,m,x.n))
n.e!==$&&A.aM()
n.e=u
w.ax=new B.buz(n)
n.fx=!0
t=new B.acv()
n.fr!==$&&A.aM()
n.fr=t
s=v.x
if(s!=null){r=$.j8()
q=r.a
p=q.length!==0&&r.z===s&&q===v.c&&r.w}else p=!1
s=$.j8()
r=n.r
q=v.e
o=v.d
s.biT(r,q,w,u,v.f,o)
w=n.a
if(w.as)s.as=!0
if(p){n.TR()
return}if(w.f)t.uf("assets/audio/tonalite-appel.wav")
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
v.it()
if(w.fx)v.ha()
v=$.j8()
if(!(v.r&&v.a===w.r&&!w.y)){B.c8f()
v=w.d
v===$&&A.d()
v.ha()
v=w.e
v===$&&A.d()
v.LJ()}w.a2()},
TR(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k
var $async$TR=A.f(function(d,e){if(d===1){s=e
w=t}while(true)$async$outer:switch(w){case 0:r.a.toString
n=$.K()
r.w=n.gx0()
n=$.j8()
r.Q=n.x
r.as=n.y
r.x=n.e
n=n.f
r.ch=n
if(n!=null){n=Date.now()
m=r.ch
m.toString
r.CW=new A.at(n,0,!1).ev(m)}B.cv1(r.r)
t=4
r.a.toString
n=$.K()
w=7
return A.e(n.bZ("/messagerie/appels/"+r.r+"/signaux"),$async$TR)
case 7:q=e
for(n=J.ap(q),m=r.f;n.B();){p=n.gJ(n)
o=B.cgo(p)
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
m.f=new B.bul(r)
m.r=new B.bum(r)
m.w=new B.bun(r)
r.z=!0
if(n)r.k(new B.buo())
r.db=A.hc(C.ce,new B.bup(r))
n=r.e
n===$&&A.d()
m=n.r
r.dx=new A.cs(m,A.x(m).i("cs<1>")).d4(r.gaoS())
n=n.w
r.dy=new A.cs(n,A.x(n).i("cs<1>")).d4(new B.buq())
r.cx=A.hc(C.fb,new B.bur(r))
r.yt()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$TR,v)},
aPs(){var w=this.cy
if(w!=null)w.X(0)
this.cy=A.dl(C.c9,new B.bu_(this))},
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
i=r.r=B.a7c(q).a
w=8
break
case 9:h=$.K()
w=11
return A.e(h.EK(i.c),$async$t6)
case 11:q=a1
i=r.r=r.a.c
case 8:h=$.j8()
h.biD(i)
B.cv1(r.r)
if(r.a.f)h.Wk()
p=B.a7c(q)
if(r.c==null){w=1
break}i=p.w
if(i==="termine"||i==="expire"){r.mF(A.b("Appel termin\xe9"))
w=1
break}r.a.toString
i=$.K()
r.w=i.gx0()
e="ice"
r.a.toString
i=$.K()
o=i.WX()
n=r.JA()
w=12
return A.e(o,$async$t6)
case 12:m=a1
l=B.cEs(m)
w=15
return A.e(n,$async$t6)
case 15:w=!a1?13:14
break
case 13:if(r.c==null){w=1
break}r.k(new B.bu2(r))
w=16
return A.e(A.jJ(C.nb,null,x.z),$async$t6)
case 16:if(r.c==null){w=1
break}r.mF(null)
w=1
break
case 14:r.aPs()
e="webrtc"
i=r.d
i===$&&A.d()
g=r.a.d==="video"||r.at
w=17
return A.e(i.xd(A.a2(["iceServers",l.a],x.N,x.z),g),$async$t6)
case 17:i.f=new B.bu3(r)
i.r=new B.bu4(r)
i.w=new B.bu5(r)
if(r.c==null){w=1
break}r.k(new B.bu6(r))
h.boR()
r.db=A.hc(C.ce,new B.bu7(r))
i=r.e
i===$&&A.d()
h=i.r
r.dx=new A.cs(h,A.x(h).i("cs<1>")).d4(r.gaoS())
h=i.w
r.dy=new A.cs(h,A.x(h).i("cs<1>")).d4(new B.bu8())
r.a.toString
h=$.K()
k=h.b
if(k!=null&&J.a7(k)!==0){r.a.toString
$.K()
i.VO(C.d.jD("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws",k)}r.cx=A.hc(C.fb,new B.bu9(r))
r.yt()
t=2
w=6
break
case 4:t=3
d=s
j=A.M(d)
if(r.c==null){w=1
break}A.nm().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(e)+" : "+A.aCb(A.u(j)))
i=r.c
i.toString
h=j instanceof A.d_?j.a:r.b0k(e)
i.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(h,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
r.mF(null)
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$t6,v)},
b0k(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
JA(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o
var $async$JA=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:t=4
w=7
return A.e(r.a0Z(),$async$JA)
case 7:if(!e){u=!1
w=1
break}q=r.d
q===$&&A.d()
w=8
return A.e(q.Fx(r.a.d==="video"||r.at),$async$JA)
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
return A.j($async$JA,v)},
a0Z(){var w=0,v=A.k(x.y),u,t=this
var $async$a0Z=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:u=B.aw9(t.a.d==="video"||t.at)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$a0Z,v)},
yt(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$yt=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.c==null||r.y){w=1
break}t=4
r.a.toString
o=$.K()
w=7
return A.e(o.bZ("/messagerie/appels/"+r.r+"/signaux"),$async$yt)
case 7:q=e
for(o=J.ap(q);o.B();){p=o.gJ(o)
r.aoT(B.cgo(p))}t=2
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
return A.j($async$yt,v)},
aoT(d){var w,v,u,t,s=this
if(s.c==null||s.y)return
w=s.f
v=d.a
if(w.u(0,v))return
w.E(0,v)
w=s.w
if(w!=null&&d.c===w)return
switch(d.d){case"offre":if(s.a.f)return
s.JU(d)
break
case"reponse":if(!s.a.f)return
u=B.cvS(d.e)
if(u==null)return
w=s.d
w===$&&A.d()
w.Vl(A.a2(["sdp",u.a,"type",u.b],x.N,x.z)).aN(0,new B.but(s),x.a).fS(new B.buu(s))
break
case"candidat_ice":t=B.cUY(d.e)
if(t==null)return
w=s.d
w===$&&A.d()
w.Vf(A.a2(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],x.N,x.z))
break
case"accepte":if(!s.a.f||s.x)return
w=s.d
w===$&&A.d()
w.Ed().aN(0,new B.buv(s),x.a).fS(new B.buw(s))
break
case"refuse":s.mF(A.b("Appel refus\xe9"))
break
case"annule":s.mF(A.b("Appel annul\xe9"))
break
case"termine":s.mF(A.b("Appel termin\xe9"))
break}},
JU(d){return this.b6D(d)},
b6D(d){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m
var $async$JU=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:n=B.cvS(d.e)
if(n==null){w=1
break}w=!(r.a.d==="video"||r.at)&&C.d.u(n.a,"m=video")?3:4
break
case 3:p=r.d
p===$&&A.d()
w=5
return A.e(p.tE(),$async$JU)
case 5:if(f&&r.c!=null&&!r.y){r.k(new B.bui(r))
$.j8().av7("video")}case 4:t=7
p=r.d
p===$&&A.d()
w=10
return A.e(p.Ee(A.a2(["sdp",n.a,"type",n.b],x.N,x.z)),$async$JU)
case 10:q=f
if(r.c==null||r.y){w=1
break}r.To()
r.a29("reponse",q)
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
return A.j($async$JU,v)},
To(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$To=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.x){w=1
break}s=t.cy
if(s!=null)s.X(0)
s=t.fr
s===$&&A.d()
s.it()
t.k(new B.buf(t,!1))
s=$.j8()
s.bqI()
r=t.Q
s.a9u(t.as,r)
case 1:return A.i(u,v)}})
return A.j($async$To,v)},
yi(d,e,f){return this.aRp(d,e,f)},
a29(d,e){return this.yi(d,e,!0)},
aRp(d,e,f){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$yi=A.f(function(g,h){if(g===1){t=h
w=u}while(true)switch(w){case 0:u=3
s.a.toString
r=$.K()
w=6
return A.e(r.asX(s.r,e,d),$async$yi)
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
return A.j($async$yi,v)},
JM(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n
var $async$JM=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.y){w=1
break}r.y=!0
q=r.cy
if(q!=null)q.X(0)
q=r.fr
q===$&&A.d()
q.it()
t=4
q=r.r
w=q.length!==0?7:8
break
case 7:r.a.toString
p=$.K()
w=9
return A.e(p.M4(q,"termine"),$async$JM)
case 9:case 8:t=2
w=6
break
case 4:t=3
n=s
w=6
break
case 3:w=2
break
case 6:B.c8f()
$.j8().O5()
q=r.c
if(q!=null)A.a1(q,!1).bL()
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$JM,v)},
amg(){var w=this
if(!w.x||w.y)return
$.j8().bs1()
w.k(new B.bug(w))
$.aP.aD$.push(new B.buh(w))},
mF(d){var w,v,u=this,t=null
if(u.y)return
u.y=!0
w=u.cy
if(w!=null)w.X(0)
w=u.fr
w===$&&A.d()
w.it()
w=u.r
if(w.length!==0){u.a.toString
v=$.K()
v.M4(w,"termine").fS(new B.bus())}if(d!=null&&u.c!=null)u.c.q(x.q).f.v(A.z(t,t,t,t,t,C.h,t,A.c(d,t,t,t,t,t,t,t,t),t,C.l,t,t,t,t,t,t,t,t,t))
B.c8f()
$.j8().O5()
w=u.c
if(w!=null)A.a1(w,!1).bL()},
Qm(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qm=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=!u.Q
s=u.d
s===$&&A.d()
w=2
return A.e(s.a_P(t),$async$Qm)
case 2:if(u.c!=null)u.k(new B.btW(u,t))
$.j8().a9u(u.as,t)
return A.i(null,v)}})
return A.j($async$Qm,v)},
Ql(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Ql=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:u.ax=!1
w=2
return A.e(u.Qd(!u.as),$async$Ql)
case 2:t=$.j8()
s=u.Q
t.a9u(u.as,s)
return A.i(null,v)}})
return A.j($async$Ql,v)},
Qd(d){return this.aJw(d)},
aJw(d){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o,n
var $async$Qd=A.f(function(e,f){if(e===1){t=f
w=u}while(true)switch(w){case 0:u=3
q=s.d
q===$&&A.d()
w=6
return A.e(q.GP(d),$async$Qd)
case 6:u=1
w=5
break
case 3:u=2
n=t
r=A.M(n)
A.nm().$1("Appel : haut-parleur impossible : "+A.aCb(A.u(r)))
w=5
break
case 2:w=1
break
case 5:q=s.d
q===$&&A.d()
o=q.ay
if(s.c!=null&&o!==s.as)s.k(new B.btU(s,o))
return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$Qd,v)},
Qj(){var w=0,v=A.k(x.H),u=this,t,s
var $async$Qj=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=!u.ay
s=u.d
s===$&&A.d()
w=2
return A.e(s.a_M(t),$async$Qj)
case 2:if(u.c!=null)u.k(new B.btV(u,t))
return A.i(null,v)}})
return A.j($async$Qj,v)},
HB(){var w=0,v=A.k(x.H),u=this,t
var $async$HB=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t=u.d
t===$&&A.d()
w=2
return A.e(t.Vs(),$async$HB)
case 2:return A.i(null,v)}})
return A.j($async$HB,v)},
ao2(){var w,v=this,u="Appel en cours\u2026",t=v.fy
if(t!=null)return t
if(v.x){t=A.b(u)
w=C.c.ae(v.CW.a,1e6)
return t+" "+(C.d.aV(C.c.l(C.c.ae(w,60)),2,"0")+":"+C.d.aV(C.c.l(C.c.a_(w,60)),2,"0"))}if(v.z)return v.a.f?A.b("\xc7a sonne\u2026"):A.b(u)
return A.b("Connexion\u2026")},
Qn(){var w=0,v=A.k(x.H),u,t=this,s,r,q
var $async$Qn=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(t.a.d==="video"||t.at||t.y){w=1
break}if(!t.x){s=t.c
s.toString
r=A.b("D\xe9croche d\u2019abord pour passer en vid\xe9o.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
w=1
break}s=t.d
s===$&&A.d()
w=3
return A.e(s.KR(),$async$Qn)
case 3:q=e
if(q==null){s=t.c
if(s!=null){r=A.b("La cam\xe9ra n\u2019a pas pu s\u2019ouvrir.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))}w=1
break}if(t.c==null||t.y){w=1
break}t.k(new B.btZ(t))
$.j8().av7("video")
t.a29("offre",q)
case 1:return A.i(u,v)}})
return A.j($async$Qn,v)},
HC(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$HC=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:if(!(t.a.d==="video"||t.at)||t.y){w=1
break}s=t.d
s===$&&A.d()
w=s.at?3:4
break
case 3:w=5
return A.e(s.DL(),$async$HC)
case 5:if(t.c!=null)t.k(new B.btX())
w=1
break
case 4:w=6
return A.e(s.Az(),$async$HC)
case 6:if(!e){s=t.c
if(s!=null){r=A.b("Le partage d\u2019\xe9cran n\u2019est pas disponible sur cet appareil.")
s.q(x.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(r,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))}w=1
break}if(t.c!=null)t.k(new B.btY())
case 1:return A.i(u,v)}})
return A.j($async$HC,v)},
b30(){var w,v,u=this,t=null,s=A.a([],x.p)
if(u.a.d==="video"||u.at){s.push(A.bQ(!1,t,t,t,!0,t,t,!0,!1,D.a6i,t,t,t,new B.bub(u),!1,t,t,t,t,t,A.c(A.b("Basculer"),t,t,t,t,C.dL,t,t,t),t,t))
w=u.d
w===$&&A.d()
w=w.at
v=A.c_(w?D.a41:D.a3Z,C.m,t,t)
s.push(A.bQ(!1,t,t,t,!0,t,t,!0,!1,v,t,t,t,new B.buc(u),!1,t,t,t,t,t,A.c(w?A.b("Arr\xeater le partage"):A.b("Partager l\u2019\xe9cran"),t,t,t,t,C.dL,t,t,t),t,t))}if(u.x)s.push(A.bQ(!1,t,t,t,!0,t,t,!0,!1,D.a60,t,t,t,new B.bud(u),!1,t,t,t,t,t,A.c(A.b("R\xe9duire"),t,t,t,t,C.dL,t,t,t),t,t))
if(s.length===0)return
w=u.c
w.toString
A.j5(D.zk,new B.bue(s),w,!1,t,x.H)},
D(d){var w,v,u,t,s,r,q,p=this,o=null,n=p.d
n===$&&A.d()
w=n.c
w=w==null?o:w.uQ(0).length!==0
v=p.id
u=p.a
if((u.d==="video"||p.at)&&p.z){if(w===!0)w=A.fO(o,B.cgd(n.e,!1,D.OE),C.x,!1,o,p.gaeI(),o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o)
else{w=u.e
u=u.r
t=p.go&&p.x
w=A.cx(A.I(A.a([new B.Nx(w,u,t,56,o),C.q,B.ctM(w,22),C.k,A.c(p.ao2(),o,o,o,o,D.wm,o,o,o)],x.p),C.n,C.f,C.O),o,o)}n=A.a([A.E4(0,w),A.eW(o,A.eR(A.N(12),B.cgd(n.d,!0,D.OE),C.aq),160,o,o,16,16,110),A.eW(o,A.ab(A.aT(!1,D.a6h,C.j,o,C.p,o,o,o,o,p.gaeI(),o,A.di(C.Z_,o,o,C.a_,C.cv,o)),36,36),o,o,o,20,20,o)],x.p)
if(p.x)n.push(A.eW(o,new B.YO(p.gamf(),o),o,o,16,o,16,o))
w=p.Q
u=p.as
n.push(A.eW(24,B.crM(p.ay,!0,u,w,p.gaeM(),p.gaeH(),p.gaeJ(),p.gaeK(),p.galk(),p.galV(),!0),o,o,0,0,o,o))
n=A.e2(C.aP,n,C.h,C.aI,o)}else{w=x.p
u=A.a([],w)
if(p.go)u.push(A.eW(o,A.r1(B.cgd(n.e,!1,D.v6),0),1,o,0,o,0,1))
if(p.x)u.push(A.eW(o,new B.YO(p.gamf(),o),o,o,16,o,16,o))
n=B.ctM(p.a.e,24)
t=A.c(p.ao2(),o,o,o,o,D.wm,C.X,o,o)
s=p.a
r=s.e
s=s.r
s=A.a8(A.cx(new B.Nx(r,s,p.go&&p.x,88,o),o,o),1,o)
r=p.Q
q=p.as
u.push(A.I(A.a([C.q,n,C.k,new A.W(D.rD,t,o),s,B.crM(p.ay,!1,q,r,p.gaeM(),p.gaeH(),p.gaeJ(),p.gaeK(),p.galk(),p.galV(),p.x),C.q],w),C.n,C.f,C.i))
u=A.e2(C.aP,u,C.h,C.aI,o)
n=u}return A.cfX(v,A.dT(o,C.o,A.fr(!0,n,!0,C.a_,!0,!0),o,o,o),new B.bux(p),x.K)}}
B.akc.prototype={
D(d){var w,v,u=this,t=null,s=A.N(28),r=A.a8(new B.zM(D.a43,u.e,A.b("Haut-parleur"),u.x,t,t),1,t),q=u.f?D.Bp:D.a42,p=A.b("Appel vid\xe9o")
q=A.a8(new B.zM(q,!1,p,u.c?u.y:u.z,t,t),1,t)
p=u.d
w=p?D.a3Y:D.a3X
v=x.p
p=A.P(A.a([r,q,A.a8(new B.zM(w,p,A.b("Muet"),u.w,t,t),1,t)],v),C.n,C.f,C.i,t)
w=A.b("Plus")
return A.S(t,A.I(A.a([p,C.q,A.P(A.a([A.a8(new B.zM(C.Bl,!1,w,u.r?u.Q:t,t,t),1,t),A.a8(new B.zM(D.Be,!1,A.b("Terminer"),u.as,C.aG,t),1,t),D.a2Q],v),C.n,C.f,C.i,t)],v),C.n,C.f,C.O),C.j,t,t,new A.a4(D.zk,t,t,s,t,t,C.u),t,t,t,C.At,D.a2E,t,t,t)}}
B.YO.prototype={
D(d){var w=null
return A.I(A.a([A.ab(A.aT(!1,D.a6_,C.j,w,C.p,w,w,w,w,this.c,w,A.di(C.kK,w,w,C.a_,C.cv,w)),48,48),C.I,A.c(A.b("R\xe9duire"),w,w,w,w,C.R_,w,w,w)],x.p),C.n,C.f,C.O)}}
B.zM.prototype={
D(d){var w,v,u,t=this,s=null,r=t.r,q=r==null
if(q)r=t.d?C.m:C.kK
if(!q)w=C.m
else w=t.d?C.o:C.m
q=t.f
v=q==null?0.4:1
u=A.di(r,s,s,C.a_,C.cv,s)
return A.r1(A.I(A.a([A.ab(A.aT(!1,A.c_(t.c,w,s,30),C.j,s,C.p,s,s,s,s,q,s,u),72,72),C.k,A.c(t.e,s,s,s,s,C.wo,C.X,s,s)],x.p),C.n,C.f,C.O),v)}}
B.Nx.prototype={
O(){return new B.aoO(null,null)}}
B.aoO.prototype={
S(){var w,v=this
v.W()
w=A.cq(null,A.cT(0,0,v.a.e?1100:2400,0,0),null,1,null,v)
w.aan(0,!0)
v.d!==$&&A.aM()
v.d=w},
aU(d){var w,v
this.bg(d)
w=this.a.e
if(d.e!==w){v=this.d
v===$&&A.d()
v.e=A.cT(0,0,w?1100:2400,0,0)
v.aan(0,!0)}},
m(){var w=this.d
w===$&&A.d()
w.m()
this.aG1()},
D(d){var w,v=this,u=null,t=v.a,s=t.f,r=s*2,q=r+24,p=v.d
p===$&&A.d()
w=t.d
t=w!=null?A.jE(u,w,u,u,s):A.jE(C.t,u,A.c(B.cb8(t.c),u,u,u,u,A.be(u,u,C.o,u,u,u,u,u,u,u,u,v.a.f*0.7,u,u,C.A,u,u,!0,u,u,u,u,u,u,u,u),u,u,u),u,s)
return A.ab(A.i5(p,new B.bQv(v,r),t),q,q)}}
B.a5y.prototype={
m(){var w=this,v=w.bS$
if(v!=null)v.T(0,w.ghL())
w.bS$=null
w.a2()},
ce(){this.da()
this.d_()
this.hM()}}
B.b2I.prototype={
Fx(d){return this.bqx(d)},
bqx(d){var w=0,v=A.k(x.H),u,t=this,s,r,q,p,o
var $async$Fx=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:if(t.b!=null){w=1
break}s=t.d
w=3
return A.e(s.jT(0),$async$Fx)
case 3:$.awN()
r=x.N
q=A.a2(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],r,x.y)
if(d){p=x.S
p=A.a2(["facingMode","user","width",A.a2(["ideal",640],r,p),"height",A.a2(["ideal",480],r,p),"frameRate",A.a2(["ideal",24],r,p)],r,x.K)}else p=!1
w=4
return A.e(new B.Th().B5(0,A.a2(["audio",q,"video",p],r,x.z)),$async$Fx)
case 4:o=f
t.b=o
s.sH3(0,o)
case 1:return A.i(u,v)}})
return A.j($async$Fx,v)},
xd(d,e){return this.bri(d,e)},
bri(d,e){var w=0,v=A.k(x.H),u=this,t,s,r,q,p,o,n
var $async$xd=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:w=2
return A.e(u.e.jT(0),$async$xd)
case 2:w=u.b==null?3:4
break
case 3:w=5
return A.e(u.Fx(e),$async$xd)
case 5:case 4:t=u.b
t.toString
w=6
return A.e($.awN().a7r(d,A.C(x.N,x.z)),$async$xd)
case 6:s=u.a=g
r=t.GC(0),q=r.length,p=0
case 7:if(!(p<r.length)){w=9
break}o=r[p]
w=10
return A.e(s.Vc(0,o,t),$async$xd)
case 10:n=g
if(o.d.kind==="video")u.z=n
case 8:r.length===q||(0,A.R)(r),++p
w=7
break
case 9:w=11
return A.e(u.CM(),$async$xd)
case 11:s.e=new B.b2K(u)
s.Q=new B.b2L(u)
s.d=new B.b2M(u)
return A.i(null,v)}})
return A.j($async$xd,v)},
aPg(d){var w,v=this
v.c=d
if(!v.x){v.x=!0
v.e.sH3(0,d)
v.Hv()
w=v.r
if(w!=null)w.$0()}},
Hv(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o,n,m,l,k
var $async$Hv=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:m=s.ay?0.8:1
l=s.c
l=l==null?null:l.OK(0)
if(l==null)l=C.cp
p=l.length
o=0
case 2:if(!(o<l.length)){w=4
break}r=l[o]
u=6
w=9
return A.e(B.aV7(m,r),$async$Hv)
case 9:u=1
w=8
break
case 6:u=5
k=t
q=A.M(k)
A.nm().$1("Appel : volume distant impossible : "+A.aCb(A.u(q)))
w=8
break
case 5:w=1
break
case 8:case 3:l.length===p||(0,A.R)(l),++o
w=2
break
case 4:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$Hv,v)},
CM(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g
var $async$CM=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:h=r.z
if(h==null){w=1
break}t=4
n=h.a.getParameters()
m=n.transactionId
if((m==null?null:m)!=null){l=n.rtcp
k=x.z
k=A.a2(["cname",l.cname,"reducedSize",l.reducedSize],k,k)
k.h(0,"cname")
k.h(0,"reducedSize")}B.cKv(n)
l=B.cKu(n)
B.cKt(n)
q=new B.aYx(l)
p=q.d
if(p==null||J.a7(p)===0){w=1
break}for(l=p,k=l.length,j=0;j<k;++j){o=l[j]
o.c=5e5
o.e=24}w=7
return A.e(h.GS(q),$async$CM)
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
return A.j($async$CM,v)},
Ed(){var w=0,v=A.k(x.P),u,t=this,s,r
var $async$Ed=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:r=t.a
if(r==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=3
return A.e(r.W2(0),$async$Ed)
case 3:s=e
w=4
return A.e(r.GQ(0,s),$async$Ed)
case 4:u=A.a2(["sdp",s.a,"type",s.b],x.N,x.z)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Ed,v)},
Ee(d){return this.bi1(d)},
bi1(d){var w=0,v=A.k(x.P),u,t=this,s,r
var $async$Ee=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.a
if(r==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=3
return A.e(r.GT(0,new B.Eb(d.h(0,"sdp"),d.h(0,"type"))),$async$Ee)
case 3:w=4
return A.e(r.W_(0),$async$Ee)
case 4:s=f
w=5
return A.e(r.GQ(0,s),$async$Ee)
case 5:u=A.a2(["sdp",s.a,"type",s.b],x.N,x.z)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Ee,v)},
Vl(d){return this.beS(d)},
beS(d){var w=0,v=A.k(x.H),u=this,t
var $async$Vl=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:t=u.a
if(t==null)throw A.p(A.am("Connexion non pr\xe9par\xe9e."))
w=2
return A.e(t.GT(0,new B.Eb(d.h(0,"sdp"),d.h(0,"type"))),$async$Vl)
case 2:return A.i(null,v)}})
return A.j($async$Vl,v)},
Vf(d){return this.beD(d)},
beD(d){var w=0,v=A.k(x.H),u,t=this,s
var $async$Vf=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=t.a
if(s==null){w=1
break}w=3
return A.e(s.V1(new B.Kn(A.az(d.h(0,"candidate")),A.az(d.h(0,"sdpMid")),A.eM(d.h(0,"sdpMLineIndex")))),$async$Vf)
case 3:case 1:return A.i(u,v)}})
return A.j($async$Vf,v)},
a_P(d){return this.aAl(d)},
aAl(d){var w=0,v=A.k(x.H),u=this,t,s,r,q
var $async$a_P=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:q=u.b
q=q==null?null:q.OK(0)
if(q==null)q=C.cp
t=q.length
s=!d
r=0
for(;r<q.length;q.length===t||(0,A.R)(q),++r)q[r].slV(0,s)
return A.i(null,v)}})
return A.j($async$a_P,v)},
GP(d){return this.aAb(d)},
aAb(d){var w=0,v=A.k(x.H),u=this
var $async$GP=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:w=2
return A.e(B.adj(d),$async$GP)
case 2:u.ay=d
w=3
return A.e(u.Hv(),$async$GP)
case 3:return A.i(null,v)}})
return A.j($async$GP,v)},
a_M(d){return this.aA1(d)},
aA1(d){var w=0,v=A.k(x.H),u=this,t,s,r
var $async$a_M=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=u.b
r=r==null?null:r.uQ(0)
if(r==null)r=C.cp
t=r.length
s=0
for(;s<r.length;r.length===t||(0,A.R)(r),++s)r[s].slV(0,d)
return A.i(null,v)}})
return A.j($async$a_M,v)},
Vs(){var w=0,v=A.k(x.H),u,t=this,s,r
var $async$Vs=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:s=t.b
r=s==null?null:s.uQ(0)
if(r==null)r=D.Ed
if(r.length===0){w=1
break}w=3
return A.e(B.cf8(C.b.gU(r)),$async$Vs)
case 3:case 1:return A.i(u,v)}})
return A.j($async$Vs,v)},
tE(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$tE=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:d=r.a
if(d==null||r.y){u=!1
w=1
break}l=r.b
l=l==null?null:l.uQ(0).length!==0
if(l===!0){u=!0
w=1
break}q=null
t=4
$.awN()
l=x.N
k=x.S
w=7
return A.e(new B.Th().B5(0,A.a2(["audio",!1,"video",A.a2(["facingMode","user","width",A.a2(["ideal",640],l,k),"height",A.a2(["ideal",480],l,k),"frameRate",A.a2(["ideal",24],l,k)],l,x.K)],l,x.z)),$async$tE)
case 7:q=a3
p=J.ckO(q)
if(J.a7(p)===0){u=!1
w=1
break}o=J.fb(p)
l=r.b
if(l==null)l=null
else{l=l.e
k=o.d
l.addTrack(k)
l=A.d9(null,x.H)}w=8
return A.e(x.x.b(l)?l:A.dO(l,x.H),$async$tE)
case 8:r.d.sH3(0,r.b)
l=r.b
l.toString
w=9
return A.e(J.cCn(d,o,l),$async$tE)
case 9:n=a3
r.z=n
w=10
return A.e(r.CM(),$async$tE)
case 10:u=!0
w=1
break
t=2
w=6
break
case 4:t=3
a0=s
l=q
l=l==null?null:J.ckN(l)
if(l==null)l=C.cp
k=l.length
i=x.c
h=x._
g=0
case 11:if(!(g<l.length)){w=13
break}m=l[g]
t=15
f=J.a6T(m)
if(!h.b(f)){e=new A.aA($.aI,i)
e.a=8
e.c=f
f=e}w=18
return A.e(f,$async$tE)
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
return A.j($async$tE,v)},
KR(){var w=0,v=A.k(x.cO),u,t=2,s,r=this,q,p,o
var $async$KR=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:w=3
return A.e(r.tE(),$async$KR)
case 3:if(!e){u=null
w=1
break}t=5
w=8
return A.e(r.Ed(),$async$KR)
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
return A.j($async$KR,v)},
Az(){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1,a2
var $async$Az=A.f(function(a3,a4){if(a3===1){s=a4
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
$.awN()
w=7
return A.e(new B.Th().Gn(A.a2(["video",!0,"audio",!1],x.N,x.z)),$async$Az)
case 7:p=a4
o=J.ckO(p)
if(J.a7(o)===0){u=!1
w=1
break}n=J.fb(o)
k=r.b
j=k==null?null:k.uQ(0)
m=j==null?D.Ed:j
r.as=J.a7(m)!==0?J.fb(m):null
w=8
return A.e(q.Zu(n),$async$Az)
case 8:r.Q=p
r.at=!0
r.d.sH3(0,p)
w=9
return A.e(r.CM(),$async$Az)
case 9:n.c=new B.b2J(r)
u=!0
w=1
break
t=2
w=6
break
case 4:t=3
a1=s
k=p
k=k==null?null:J.ckN(k)
if(k==null)k=C.cp
h=k.length
g=x.c
f=x._
e=0
case 10:if(!(e<k.length)){w=12
break}l=k[e]
t=14
d=J.a6T(l)
if(!f.b(d)){a0=new A.aA($.aI,g)
a0.a=8
a0.c=d
d=a0}w=17
return A.e(d,$async$Az)
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
return A.j($async$Az,v)},
DL(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$DL=A.f(function(d,a0){if(d===1){s=a0
w=t}while(true)switch(w){case 0:if(!r.at){w=1
break}n=r.at=!1
t=4
q=r.z
p=r.as
w=(q!=null?p!=null:n)?7:8
break
case 7:w=9
return A.e(q.Zu(p),$async$DL)
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
n=n==null?null:n.GC(0)
if(n==null)n=C.cp
l=n.length
k=x.c
j=x._
i=0
case 10:if(!(i<n.length)){w=12
break}o=n[i]
t=14
h=J.a6T(o)
if(!j.b(h)){g=new A.aA($.aI,k)
g.a=8
g.c=h
h=g}w=17
return A.e(h,$async$DL)
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
r.d.sH3(0,r.b)
case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$DL,v)},
ha(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0,a1
var $async$ha=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:if(r.y){w=1
break}r.y=!0
r.at=!1
o=r.Q
o=o==null?null:o.GC(0)
if(o==null)o=C.cp
n=o.length
m=x.c
l=x._
k=0
case 3:if(!(k<o.length)){w=5
break}q=o[k]
t=7
j=J.a6T(q)
if(!l.b(j)){i=new A.aA($.aI,m)
i.a=8
i.c=j
j=i}w=10
return A.e(j,$async$ha)
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
return A.e(B.adj(!1),$async$ha)
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
return A.e(x.x.b(o)?o:A.dO(o,x.H),$async$ha)
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
o=o==null?null:o.GC(0)
if(o==null)o=C.cp
n=o.length
k=0
case 21:if(!(k<o.length)){w=23
break}p=o[k]
t=25
j=J.a6T(p)
if(!l.b(j)){i=new A.aA($.aI,m)
i.a=8
i.c=j
j=i}w=28
return A.e(j,$async$ha)
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
return A.e(r.d.m(),$async$ha)
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
return A.e(r.e.m(),$async$ha)
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
return A.j($async$ha,v)}}
B.a8B.prototype={
gbgk(){return this.b!=null&&!this.e},
VO(d,e){return this.bgl(d,e)},
bgl(d,e){var w=0,v=A.k(x.H),u=this
var $async$VO=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:u.x=d
u.y=e
u.e=!1
u.f=0
w=2
return A.e(u.Ht(),$async$VO)
case 2:return A.i(null,v)}})
return A.j($async$VO,v)},
Ht(){var w=0,v=A.k(x.H),u,t=2,s,r=this,q,p,o,n,m,l
var $async$Ht=A.f(function(d,e){if(d===1){s=e
w=t}while(true)switch(w){case 0:if(r.e){w=1
break}q=r.x
if(q==null||J.a7(q)===0){w=1
break}t=4
p=B.cDb(B.ce3(A.cI(q,0,null),null))
r.b=p
w=7
return A.e(p.f.a,$async$Ht)
case 7:r.f=0
o=r.y
if(o!=null&&J.a7(o)!==0)try{n=x.N
p.gkL().a.E(0,C.Z.dC(A.a2(["type","auth","jeton",o],n,n),null))}catch(k){}n=p.r.b
n===$&&A.d()
n=n.b
n===$&&A.d()
r.c=new A.cY(n,A.x(n).i("cY<1>")).b7(r.gb5W(),!0,r.gb4n(),new B.aDx(r))
t=2
w=6
break
case 4:t=3
l=s
r.a4d()
w=6
break
case 3:w=2
break
case 6:case 1:return A.i(u,v)
case 2:return A.h(s,v)}})
return A.j($async$Ht,v)},
b5X(d){var w,v,u,t
try{w=C.Z.cK(0,J.l(d),null)
u=x.P
if(!u.b(w))return
if(!J.r(J.m(w,"type"),"signal_appel"))return
v=J.m(w,"signal")
if(!u.b(v))return
u=this.r
if((u.c&4)===0)u.E(0,B.cgo(v))}catch(t){}},
a4d(){var w,v=this,u=v.c
if(u!=null)u.X(0)
v.b=v.c=null
if(v.e)return
u=v.f
if(u>=5){u=v.w
if((u.c&4)===0)u.E(0,null)
return}w=D.afI[u]
v.f=u+1
u=v.d
if(u!=null)u.X(0)
v.d=A.dl(A.cT(0,0,0,0,w),new B.aDy(v))},
LJ(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$LJ=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:s.e=!0
r=s.d
if(r!=null)r.X(0)
r=s.c
r=r==null?null:r.X(0)
w=2
return A.e(x.x.b(r)?r:A.dO(r,x.H),$async$LJ)
case 2:s.c=null
u=4
r=s.b
r=r==null?null:r.gkL().aa(0)
w=7
return A.e(x._.b(r)?r:A.dO(r,x.z),$async$LJ)
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
return A.j($async$LJ,v)}}
B.acv.prototype={
uf(d){return this.bo3(d)},
bo3(d){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p,o
var $async$uf=A.f(function(e,f){if(e===1){t=f
w=u}while(true)switch(w){case 0:u=3
q=s.a
w=6
return A.e((q==null?s.a=A.B_():q).b1(0),$async$uf)
case 6:w=7
return A.e(s.a.a_L(d),$async$uf)
case 7:w=8
return A.e(s.a.jk(C.Jz),$async$uf)
case 8:w=9
return A.e(s.a.im(1),$async$uf)
case 9:w=10
return A.e(s.a.cV(0),$async$uf)
case 10:u=1
w=5
break
case 3:u=2
o=t
r=A.M(o)
A.nm().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(r))
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$uf,v)},
it(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$it=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
r=r==null?null:r.b1(0)
w=6
return A.e(x.x.b(r)?r:A.dO(r,x.H),$async$it)
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
return A.j($async$it,v)},
ha(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$ha=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
r=r==null?null:r.m()
w=6
return A.e(x.x.b(r)?r:A.dO(r,x.H),$async$ha)
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
return A.j($async$ha,v)}}
B.aYn.prototype={
a7r(d,e){return this.bhR(d,e)},
bhR(d,e){var w=0,v=A.k(x.O),u,t,s,r,q
var $async$a7r=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:q=e.a
if(q!==0)t=e
else{q=x.z
s=x.N
t=A.a2(["mandatory",A.C(q,q),"optional",A.a([A.a2(["DtlsSrtpKeyAgreement",!0],s,x.y)],x.T)],s,x.K)}q=self.RTCPeerConnection
s=A.fQ(t,x.N,x.z)
s.t(0,d)
r=new q(x.m.a(A.c7(s)))
s=J.l(r)
u=B.cKs(C.c1.gj7().be(new A.eF(s)),r)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$a7r,v)}}
B.pe.prototype={
OK(d){var w=A.a([],x.Q),v=this.e.getAudioTracks()
v=x.l.b(v)?v:new A.dA(v,A.Y(v).i("dA<1,aG>"))
J.ht(v,new B.aTl(w))
return w},
uQ(d){var w=A.a([],x.Q),v=this.e.getVideoTracks()
v=x.l.b(v)?v:new A.dA(v,A.Y(v).i("dA<1,aG>"))
J.ht(v,new B.aTm(w))
return w},
GC(d){var w=A.G(this.OK(0),!0,x.G)
C.b.t(w,this.uQ(0))
return w}}
B.acZ.prototype={
aHn(d){var w=this,v=w.d
v.addEventListener("ended",A.c6(new B.aTi(w)))
v.addEventListener("mute",A.c6(new B.aTj(w)))
v.addEventListener("unmute",A.c6(new B.aTk(w)))},
slV(d,e){this.d.enabled=e},
Vm(d,e){return this.beV(0,e)},
beV(d,e){var w=0,v=A.k(x.H),u=this
var $async$Vm=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:w=2
return A.e(A.dP(u.d.applyConstraints(x.m.a(A.c7(e))),x.X),$async$Vm)
case 2:return A.i(null,v)}})
return A.j($async$Vm,v)},
b1(d){var w=0,v=A.k(x.H),u=this
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:u.d.stop()
return A.i(null,v)}})
return A.j($async$b1,v)}}
B.Th.prototype={
B5(d,e){return this.az9(0,e)},
az9(d,a0){var w=0,v=A.k(x.E),u,t=2,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$B5=A.f(function(a2,a3){if(a2===1){s=a3
w=t}while(true)switch(w){case 0:t=4
try{if(!B.cXs())if(x.f.b(a0.h(0,"video"))&&J.m(a0.h(0,"video"),"facingMode")!=null)J.iJ(a0.h(0,"video"),"facingMode")
a0.cQ(0,"video",new B.aT7())
a0.cQ(0,"audio",new B.aT8())}catch(a1){A.t_("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(x.P.b(a0.h(0,"audio"))){h=x.z
h=A.h8(a0.h(0,"audio"),h,h).aC(0,"optional")&&x.F.b(J.m(a0.h(0,"audio"),"optional"))}else h=!1
if(h){r=J.m(a0.h(0,"audio"),"optional")
q=A.C(x.N,x.z)
J.ht(r,new B.aT9(q))
J.iJ(a0.h(0,"audio"),"optional")
J.jy(a0.h(0,"audio"),q)}}catch(a1){p=A.M(a1)
o=A.bx(a1)
A.t_("[getUserMedia] failed to translate optional audio constraints, "+A.u(p)+", "+A.u(o))}h=self
n=h.window.navigator.mediaDevices
g=x.m
w=n.getUserMedia!=null?7:9
break
case 7:m=A.c7(a0)
w=10
return A.e(A.dP(n.getUserMedia(g.a(m)),g),$async$B5)
case 10:l=a3
u=new B.pe(l,"local")
w=1
break
w=8
break
case 9:h=h.window.navigator.mediaDevices
f=a0.h(0,"audio")
w=11
return A.e(A.dP(h.getUserMedia({video:a0.h(0,"video"),audio:f}),g),$async$B5)
case 11:k=a3
u=new B.pe(k,"local")
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
return A.j($async$B5,v)},
Gn(d){return this.ayE(d)},
ayE(d){var w=0,v=A.k(x.E),u,t=2,s,r,q,p,o,n,m,l,k,j,i
var $async$Gn=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:t=4
m=self
r=m.window.navigator.mediaDevices
w=r.getDisplayMedia!=null?7:9
break
case 7:q=A.c7(d)
m=x.m
w=10
return A.e(A.dP(r.getDisplayMedia(m.a(q)),m),$async$Gn)
case 10:p=f
u=new B.pe(p,"local")
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
return A.e(A.dP(m.getUserMedia({video:l,audio:k}),x.m),$async$Gn)
case 11:o=f
u=new B.pe(o,"local")
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
return A.j($async$Gn,v)}}
B.aeP.prototype={
aHw(d,e){var w=this,v=w.at
v===$&&A.d()
v.addEventListener("datachannel",A.c6(new B.aYp(w)))
v.addEventListener("icecandidate",A.c6(new B.aYq(w)))
v.addEventListener("iceconnectionstatechange",A.c6(new B.aYr(w)))
v.onicegatheringstatechange=A.c6(new B.aYs(w))
v.addEventListener("signalingstatechange",A.c6(new B.aYt(w)))
if(!$.cjc())v.addEventListener("connectionstatechange",A.c6(new B.aYu(w)))
v.addEventListener("negotiationneeded",A.c6(new B.aYv(w)))
v.addEventListener("track",A.c6(new B.aYw(w)))},
W2(d){var w=0,v=A.k(x.v),u,t=this,s,r
var $async$W2=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.at
r===$&&A.d()
w=3
return A.e(A.dP(r.createOffer(x.m.a(A.c7(A.C(x.N,x.z)))),x.A),$async$W2)
case 3:s=f
u=new B.Eb(s.sdp,s.type)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$W2,v)},
W_(d){var w=0,v=A.k(x.v),u,t=this,s,r
var $async$W_=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:r=t.at
r===$&&A.d()
w=3
return A.e(A.dP(r.createAnswer(x.m.a(A.c7(A.C(x.N,x.z)))),x.A),$async$W_)
case 3:s=f
u=new B.Eb(s.sdp,s.type)
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$W_,v)},
GQ(d,e){return this.aAf(0,e)},
aAf(d,e){var w=0,v=A.k(x.H),u=this,t
var $async$GQ=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:t=u.at
t===$&&A.d()
w=2
return A.e(A.dP(t.setLocalDescription({type:e.b,sdp:e.a}),x.X),$async$GQ)
case 2:return A.i(null,v)}})
return A.j($async$GQ,v)},
GT(d,e){return this.aAw(0,e)},
aAw(d,e){var w=0,v=A.k(x.H),u=this,t
var $async$GT=A.f(function(f,g){if(f===1)return A.h(g,v)
while(true)switch(w){case 0:t=u.at
t===$&&A.d()
w=2
return A.e(A.dP(t.setRemoteDescription({type:e.b,sdp:e.a}),x.X),$async$GT)
case 2:return A.i(null,v)}})
return A.j($async$GT,v)},
V1(d){return this.beh(d)},
beh(d){var w=0,v=A.k(x.H),u=this,t,s
var $async$V1=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:s=u.at
s===$&&A.d()
t=d.b
t.toString
w=2
return A.e(A.dP(s.addIceCandidate({candidate:d.a,sdpMid:t,sdpMLineIndex:d.c}),x.X),$async$V1)
case 2:return A.i(null,v)}})
return A.j($async$V1,v)},
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
Vc(d,e,f){return this.bew(0,e,f)},
bew(d,e,f){var w=0,v=A.k(x.e),u,t=this,s
var $async$Vc=A.f(function(g,h){if(g===1)return A.h(h,v)
while(true)switch(w){case 0:s=t.at
s===$&&A.d()
u=new B.aeR(s.addTrack(e.d,f.e))
w=1
break
case 1:return A.i(u,v)}})
return A.j($async$Vc,v)}}
B.aeR.prototype={
Zu(d){return this.bsu(d)},
bsu(d){var w=0,v=A.k(x.H),u=this,t,s,r,q
var $async$Zu=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:try{t=d
r=t.d
u.a.replaceTrack(r)}catch(p){r=A.M(p)
if(x.L.b(r)){s=r
throw A.p("Unable to RTCRtpSender::replaceTrack: "+J.l(s))}else throw p}return A.i(null,v)}})
return A.j($async$Zu,v)},
GS(d){return this.aAn(d)},
aAn(d){var w=0,v=A.k(x.y),u,t=2,s,r=this,q,p,o,n,m,l,k
var $async$GS=A.f(function(e,f){if(e===1){s=f
w=t}while(true)switch(w){case 0:t=4
o=r.a
q=o.getParameters()
n=d.d
m=A.Y(n).i("af<1,ah<o,@>>")
m=A.c7(A.G(new A.af(n,new B.aYB(),m),!0,m.i("aD.E")))
n=m==null?A.c7([]):m
q.encodings=x.r.a(n)
w=7
return A.e(A.dP(o.setParameters(q),x.X),$async$GS)
case 7:w=8
return A.e(A.d9(!0,x.y),$async$GS)
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
return A.j($async$GS,v)}}
B.cgc.prototype={
b1(d){var w=0,v=A.k(x.H),u=this,t,s,r
var $async$b1=A.f(function(e,f){if(e===1)return A.h(f,v)
while(true)switch(w){case 0:try{u.a.stop()}catch(q){r=A.M(q)
if(x.L.b(r)){t=r
r=t
J.l(r)
throw A.p("Unable to RTCRtpTransceiver::stop: "+A.u(r))}else throw q}return A.i(null,v)}})
return A.j($async$b1,v)}}
B.UR.prototype={
savk(d,e){var w
if(this.ax===e)return
this.ax=e
w=this.EW()
if(w!=null)w.style.objectFit=e},
ap0(){var w=this,v=w.EW(),u=w.a,t=v==null,s=t?null:v.videoWidth
if(s==null)s=0
t=t?null:v.videoHeight
if(t==null)t=0
w.sn(0,u.arZ(t,w.z!=null,0,s))},
sH3(d,e){var w,v,u,t,s=this
if(e==null){w=s.EW()
if(w!=null)w.srcObject=null
w=s.w
if(w!=null)w.srcObject=null
s.z=null
return}s.z=e
if(e.uQ(0).length!==0){s.x=new self.MediaStream()
w=s.z.e.getVideoTracks()
w=J.ap(x.l.b(w)?w:new A.dA(w,A.Y(w).i("dA<1,aG>")))
for(;w.B();){v=w.gJ(w)
s.x.addTrack(v)}}if(e.OK(0).length!==0){s.y=new self.MediaStream()
w=s.z.e.getAudioTracks()
w=J.ap(x.l.b(w)?w:new A.dA(w,A.Y(w).i("dA<1,aG>")))
for(;w.B();){v=w.gJ(w)
s.y.addTrack(v)}}if(s.y!=null){if(s.w==null){u=self.document.createElement("audio")
u.id="audio_"+("RTCVideoRenderer-"+s.Q)
u.muted=e.b==="local"
u.autoplay=!0
s.w=u
w=s.aRc()
v=s.w
v.toString
w.append(v)}w=s.w
if(w!=null)w.srcObject=s.y}t=s.EW()
if(t!=null){t.srcObject=s.x
w=s.EW()
w.toString
s.aet(w)}s.sn(0,s.a.bgK(s.z!=null))},
aRc(){var w,v=self,u=v.document.getElementById("html_webrtc_audio_manager_list")
if(u!=null)return u
w=v.document.createElement("div")
w.id="html_webrtc_audio_manager_list"
w.style.display="none"
v=v.document.body
if(v!=null)v.append(w)
return w},
EW(){var w=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(w!=null)return w
return null},
m(){var w=0,v=A.k(x.H),u,t=this,s,r,q,p,o
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,v)
while(true)switch(w){case 0:t.z=null
for(s=t.at,r=s.length,q=0;q<s.length;s.length===r||(0,A.R)(s),++q)s[q].X(0)
p=t.EW()
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
while(true)switch(w){case 0:$.OP()
$.t1().xh("RTCVideoRenderer-"+u.Q,new B.aYH(u),!0)
return A.i(null,v)}})
return A.j($async$jT,v)},
aet(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UT.prototype={
O(){return new B.UU()}}
B.UU.prototype={
S(){var w,v,u=this
u.W()
u.a.c.aj(0,u.gb26())
w=u.a
v=w.c
v.as=w.e
v.savk(0,w.d===D.v6?"contain":"cover")},
b27(){if(this.c!=null)this.k(new B.aYI())},
m(){if(this.c!=null)this.a2()},
aU(d){var w,v
this.bg(d)
A.dl(A.cT(0,0,10,0,0),new B.aYK(this))
w=this.a
v=w.c
v.savk(0,w.d===D.v6?"contain":"cover")},
D(d){return new A.iS(new B.aYJ(this),null)}}
B.ab7.prototype={
aH4(d,e,f,g){var w=this,v=$.aI
w.a!==$&&A.aM()
w.a=new B.a0f(d,w,new A.bg(new A.aA(v,x.c),x.u),e,g.i("a0f<0>"))
if(f.a.gjd())f.a=new B.Ww(g.i("@<0>").cc(g).i("Ww<1,2>")).hN(f.a)
v=A.hb(null,new B.aM3(f,w),null,!0,g)
w.b!==$&&A.aM()
w.b=v},
ala(){var w,v
this.d=!0
w=this.c
if(w!=null)w.X(0)
v=this.b
v===$&&A.d()
v.aa(0)}}
B.a0f.prototype={
E(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dB(d,e){if(this.e)throw A.p(A.am("Cannot add event after closing."))
if(this.d)return
this.aU9(d,e)},
i8(d){return this.dB(d,null)},
aU9(d,e){var w=this
if(w.w){w.a.a.dB(d,e)
return}w.c.hm(d,e)
w.alb()
w.b.ala()
w.a.a.aa(0).fS(new B.bzS())},
aa(d){var w=this
if(w.e)return w.c.a
w.e=!0
if(!w.d){w.b.ala()
w.c.cI(0,w.a.a.aa(0))}return w.c.a},
alb(){this.d=!0
var w=this.c
if((w.a.a&30)===0)w.dW(0)
return},
$ie6:1}
B.ahc.prototype={}
B.ahd.prototype={}
B.B5.prototype={
ag1(d,e){var w=this.b
if((w.b&4)!==0)return
w.E(0,new B.Hl(d,e))
w.aa(0)},
ac4(d){var w
if((this.b.b&4)!==0)throw A.p(B.cgS())
w=A.c7(d)
w.toString
this.a.send(w)},
zj(d,e,f){return this.bg1(0,e,f)},
bg1(d,e,f){var w=0,v=A.k(x.H),u=this,t
var $async$zj=A.f(function(g,h){if(g===1)return A.h(h,v)
while(true)switch(w){case 0:t=u.b
if((t.b&4)!==0)throw A.p(B.cgS())
t.aa(0)
u.a.close()
return A.i(null,v)}})
return A.j($async$zj,v)},
$icgR:1}
B.v4.prototype={}
B.LI.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.LI&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.GV.prototype={
p(d,e){var w,v,u,t
if(e==null)return!1
if(e instanceof B.GV&&e.a.length===this.a.length){for(w=this.a,v=w.length,u=e.a,t=0;t<v;++t)if(u[t]!==w[t])return!1
return!0}return!1},
gI(d){return A.hB(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Hl.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.Hl&&e.a===this.a&&e.b===this.b},
gI(d){return A.hB([this.a,this.b])},
l(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Mi.prototype={
l(d){var w=this.a
if(w.length===0)return"WebSocketException"
else return"WebSocketException: "+w},
$ibR:1}
B.Mh.prototype={
l(d){var w=this.a
if(w.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+w}}
B.axB.prototype={
gkL(){var w,v=this,u=v.w
if(u===$){w=v.r.b
w===$&&A.d()
w=w.a
w===$&&A.d()
u!==$&&A.b3()
u=v.w=new B.au2(v,w)}return u},
aGN(d){d.ft(0,new B.axF(this),new B.axG(this),x.a)}}
B.au2.prototype={
aa(d){var w=this.b
w.e=w.d=null
return this.aCc(0)}}
B.aiw.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibR:1}
B.yO.prototype={
P(){return"RTCSignalingState."+this.b}}
B.UN.prototype={
P(){return"RTCIceGatheringState."+this.b}}
B.yM.prototype={
P(){return"RTCPeerConnectionState."+this.b}}
B.o9.prototype={
P(){return"RTCIceConnectionState."+this.b}}
B.aeS.prototype={
P(){return"RTCVideoViewObjectFit."+this.b}}
B.yN.prototype={
P(){return"RTCPriorityType."+this.b}}
B.aYm.prototype={}
B.Ti.prototype={}
B.Jw.prototype={
l(d){var w=this.d
return"Track(id: "+A.u(w.id)+", kind: "+A.u(w.kind)+", label: "+A.u(w.label)+", enabled: "+A.u(w.enabled)+", muted: "+A.u(w.muted)+")"}}
B.aT5.prototype={}
B.Kn.prototype={}
B.UO.prototype={}
B.cgb.prototype={}
B.aeQ.prototype={}
B.Ko.prototype={}
B.Km.prototype={}
B.aYx.prototype={}
B.UP.prototype={}
B.aYC.prototype={}
B.Eb.prototype={}
B.UQ.prototype={}
B.US.prototype={
arZ(d,e,f,g){var w=g==null?this.a:g,v=d==null?this.b:d,u=f==null?this.c:f
return new B.US(w,v,u)},
bgK(d){return this.arZ(null,d,null,null)},
l(d){var w=this
return A.ad(w).l(0)+"(width: "+A.u(w.a)+", height: "+A.u(w.b)+", rotation: "+w.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Lh)","bB(Kn)","bB(UQ)","bB(o9)","~(@)","pe(@)","Km(aG)","ah<o,@>(Ko)","bB(cgR)","~(v4)"])
B.b3l.prototype={
$0(){return J.cCq(this.a.bl())},
$S:1}
B.b3m.prototype={
$1(d){var w,v,u,t
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(u){t=A.M(u)
if(x.i.b(t)){w=t
v=A.bx(u)
this.b.dB(w,v)}else throw u}},
$S(){return this.a.$ti.i("~(1)")}}
B.ca6.prototype={
$1(d){var w,v,u,t=$.K().b
if(t==null||t.length===0)return
w=self
v=new w.Headers()
v.set("Authorization","Bearer "+A.u(t))
v.set("Content-Type","application/json")
u=x.N
w.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:v,body:C.Z.dC(A.a2(["type","termine","contenu",A.C(u,x.z)],u,x.K),null),keepalive:!0})},
$S:28}
B.ca5.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.azR.prototype={
$1(d){if(d==null)return null
return A.bT(J.l(d))},
$S:112}
B.buJ.prototype={
$0(){var w=this.a
if(w.c!=null&&!w.e)w.JR(!0)},
$S:0}
B.buK.prototype={
$1(d){return this.a.UQ()},
$S:27}
B.buG.prototype={
$0(){var w=this.a.c
if(w!=null)A.a1(w,!1).bL()},
$S:0}
B.buH.prototype={
$0(){return this.a.e=!0},
$S:0}
B.buD.prototype={
$0(){var w=this.a
w.d=!1
w.e=!0},
$S:0}
B.buE.prototype={
$0(){return this.a.d=!1},
$S:0}
B.buF.prototype={
$0(){var w=this.a
w.d=!1
w.e=!0},
$S:0}
B.buA.prototype={
$0(){return this.a.f=!0},
$S:0}
B.buB.prototype={
$0(){return this.a.f=!1},
$S:0}
B.buC.prototype={
$1(d){var w=null,v=this.a.a,u=v.c,t=v.e,s=v.d
return B.ceI(v.w,w,u,v.y,s,w,w,w,!1,t)},
$S:1199}
B.buI.prototype={
$0(){return this.a.b6e()},
$S:0}
B.buz.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.buy())},
$S:0}
B.buy.prototype={
$0(){},
$S:0}
B.bul.prototype={
$1(d){this.a.yi("candidat_ice",d,!1)},
$S:212}
B.bum.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.buk(w))},
$S:0}
B.buk.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bun.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buo.prototype={
$0(){},
$S:0}
B.bup.prototype={
$1(d){var w=this.a,v=w.ch
if(w.c!=null&&v!=null&&w.x)w.k(new B.buj(w,v))},
$S:27}
B.buj.prototype={
$0(){return this.a.CW=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.buq.prototype={
$1(d){},
$S:132}
B.bur.prototype={
$1(d){this.a.yt()},
$S:27}
B.bu_.prototype={
$0(){var w=this.a
if(w.c!=null&&!w.x&&!w.y){if(w.a.f)w.yi("annule",C.bn,!1)
w.mF(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bu2.prototype={
$0(){var w=this.a
w.fy=w.a.d==="video"||w.at?A.b(y.c):A.b(y.d)},
$S:0}
B.bu3.prototype={
$1(d){this.a.yi("candidat_ice",d,!1)},
$S:212}
B.bu4.prototype={
$0(){var w=this.a
if(w.c!=null)w.k(new B.bu1(w))},
$S:0}
B.bu1.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bu5.prototype={
$0(){this.a.mF(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bu6.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bu7.prototype={
$1(d){var w=this.a,v=w.ch
if(w.c!=null&&v!=null&&w.x)w.k(new B.bu0(w,v))},
$S:27}
B.bu0.prototype={
$0(){return this.a.CW=new A.at(Date.now(),0,!1).ev(this.b)},
$S:0}
B.bu8.prototype={
$1(d){},
$S:132}
B.bu9.prototype={
$1(d){this.a.yt()},
$S:27}
B.but.prototype={
$1(d){var w=this.a
if(w.c!=null&&!w.y)w.To()},
$S:32}
B.buu.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buv.prototype={
$1(d){var w=this.a
if(w.c!=null&&!w.y)w.a29("offre",d)},
$S:1201}
B.buw.prototype={
$1(d){this.a.mF(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bui.prototype={
$0(){return this.a.at=!0},
$S:0}
B.buf.prototype={
$0(){var w=this.a
w.x=!0
w.ch=new A.at(Date.now(),0,!1)
w.CW=C.R},
$S:0}
B.bug.prototype={
$0(){return this.a.id=!0},
$S:0}
B.buh.prototype={
$1(d){var w=this.a.c
if(w!=null)A.a1(w,!1).bL()},
$S:5}
B.bus.prototype={
$1(d){return A.C(x.N,x.z)},
$S:102}
B.btW.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.btU.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.btV.prototype={
$0(){return this.a.ay=this.b},
$S:0}
B.btZ.prototype={
$0(){return this.a.at=!0},
$S:0}
B.btX.prototype={
$0(){},
$S:0}
B.btY.prototype={
$0(){},
$S:0}
B.bub.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bL()
w.HB()},
$S:0}
B.buc.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).bL()
w.HC()},
$S:0}
B.bud.prototype={
$0(){var w=this.a,v=w.c
v.toString
A.a1(v,!1).Yl().aN(0,new B.bua(w),x.H)},
$S:0}
B.bua.prototype={
$1(d){return this.a.amg()},
$S:9}
B.bue.prototype={
$1(d){return A.fr(!0,A.I(this.a,C.n,C.f,C.O),!0,C.a_,!0,!0)},
$S:145}
B.bux.prototype={
$2(d,e){if(!d)this.a.JM()},
$S:1203}
B.bQv.prototype={
$2(d,e){var w,v,u,t=null,s=this.a,r=s.d
r===$&&A.d()
r=r.x
r===$&&A.d()
s=s.a.e
w=s?0.07:0.04
s=s?0.55:0.35
v=this.b
u=v+20
r=A.cr6(A.S(t,t,C.j,t,t,new A.a4(t,t,A.bm(C.t.b3(s*(1-r)),3),t,t,t,C.aJ),t,u,t,t,t,t,t,u),1+w*r)
v+=8
v=A.S(t,t,C.j,t,t,new A.a4(t,t,A.bm(C.t,2),t,t,t,C.aJ),t,v,t,t,t,t,t,v)
e.toString
return A.e2(C.a6,A.a([r,v,e],x.p),C.h,C.aI,t)},
$S:1204}
B.b2K.prototype={
$1(d){var w,v=d.a
if(v.length===0)return
w=this.a.f
if(w!=null)w.$1(A.a2(["candidate",v,"sdpMid",d.b,"sdpMLineIndex",d.c],x.N,x.z))},
$S:z+3}
B.b2L.prototype={
$1(d){var w=d.b,v=w.length!==0?C.b.gU(w):null
if(v!=null)this.a.aPg(v)
if(d.c.d.kind==="video"){w=this.a.r
if(w!=null)w.$0()}},
$S:z+4}
B.b2M.prototype={
$1(d){var w
if(d===D.Os){w=this.a.w
if(w!=null)w.$0()}},
$S:z+5}
B.b2J.prototype={
$0(){var w=this.a
if(w.at){w.DL()
w=w.ax
if(w!=null)w.$0()}},
$S:23}
B.aDx.prototype={
$1(d){return this.a.a4d()},
$S:20}
B.aDy.prototype={
$0(){var w=this.a
if(!w.e)w.Ht()},
$S:0}
B.cb9.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTl.prototype={
$1(d){return this.a.push(B.cfx(d))},
$S:20}
B.aTm.prototype={
$1(d){return this.a.push(B.cfx(d))},
$S:20}
B.aTi.prototype={
$1(d){var w=this.a.c
if(w!=null)w.$0()},
$S:25}
B.aTj.prototype={
$1(d){},
$S:25}
B.aTk.prototype={
$1(d){},
$S:25}
B.aT7.prototype={
$0(){return!1},
$S:50}
B.aT8.prototype={
$0(){return!1},
$S:50}
B.aT9.prototype={
$1(d){J.ht(d,new B.aT6(this.a))},
$S:212}
B.aT6.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:52}
B.aYp.prototype={
$1(d){},
$S:25}
B.aYq.prototype={
$1(d){var w,v
if(d.candidate!=null){w=this.a.e
if(w!=null){v=d.candidate
w.$1(new B.Kn(v.candidate,v.sdpMid,v.sdpMLineIndex))}}},
$S:25}
B.aYr.prototype={
$1(d){var w,v=this.a,u=v.at
u===$&&A.d()
u=B.cX0(u.iceConnectionState)
v.cx=u
w=v.d
if(w!=null)w.$1(u)
if($.cjc())switch(v.cx.a){case 0:v.cy=D.Ox
break
case 1:v.cy=D.Oy
break
case 3:v.cy=D.Oz
break
case 5:v.cy=D.Ov
break
case 6:v.cy=D.Ow
break
case 7:v.cy=D.v4
break
default:break}},
$S:45}
B.aYs.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.CW=B.cX1(v.iceGatheringState)},
$S:45}
B.aYt.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.ch=B.cZ9(v.signalingState)},
$S:45}
B.aYu.prototype={
$1(d){var w=this.a,v=w.at
v===$&&A.d()
w.cy=B.cYj(v.connectionState)},
$S:45}
B.aYv.prototype={
$1(d){},
$S:45}
B.aYw.prototype={
$1(d){var w,v,u=this.a,t=u.Q
if(t!=null){w=B.cfx(d.track)
v=d.streams
v=x.l.b(v)?v:new A.dA(v,A.Y(v).i("dA<1,aG>"))
u=J.du(v,new B.aYo(u),x.h)
t.$1(new B.UQ(A.G(u,!0,u.$ti.i("aD.E")),w))}},
$S:25}
B.aYo.prototype={
$1(d){return new B.pe(d,this.a.as)},
$S:z+7}
B.aYA.prototype={
$1(d){var w="id",v=x.f.a(A.Ou(d)),u=J.dt(v)
if(u.aC(v,w))u.j(v,w,C.e.C(A.iE(u.h(v,w))))
u.h(v,"uri")
u.h(v,w)
u.h(v,"encrypted")
return new B.Km()},
$S:z+8}
B.aYz.prototype={
$1(d){var w,v,u,t,s,r,q,p,o,n=null,m="numTemporalLayers",l="scaleResolutionDownBy",k=A.Ou(d.rid),j=d.active,i=d.maxBitrate
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
j=B.cwb(o.h(0,"priority"))
k=j==null?D.v5:j
this.a.push(new B.Ko(p,q,r,t,s,u,v,w,i,k,B.cwb(o.h(0,"networkPriority"))))},
$S:20}
B.aYy.prototype={
$1(d){var w,v,u,t,s,r=null,q=d.payloadType,p=d.name
if(p==null)p=r
w=d.kind
if(w==null)w=r
v=d.clockRate
u=d.numChannels
u=u==null?r:A.bo(u)
t=d.parameters
t=t==null?r:A.Ou(t)
s=x.z
s=A.a2(["payloadType",q,"name",p,"kind",w,"clockRate",v,"numChannels",u,"parameters",t],s,s)
s.h(0,"payloadType")
s.h(0,"name")
t=s.h(0,"kind")
s.h(0,"clockRate")
s.h(0,"numChannels")
s.h(0,"parameters")
this.a.push(new B.aeQ(t))},
$S:20}
B.aYB.prototype={
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
w=$.cCe()
u.j(0,"priority",w.h(0,d.y))
v=d.z
if(v!=null)u.j(0,"networkPriority",w.h(0,v))
return u},
$S:z+9}
B.cbi.prototype={
$1(d){return J.hG(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:8}
B.aYH.prototype={
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
w.aet(s)
u=x.k.c
v.push(A.iC(s,"canplay",new B.aYD(w),!1,u))
v.push(A.iC(s,"resize",new B.aYE(w),!1,u))
v.push(A.iC(s,"error",new B.aYF(s),!1,u))
v.push(A.iC(s,"ended",new B.aYG(),!1,u))
return s},
$S:173}
B.aYD.prototype={
$1(d){this.a.ap0()},
$S:20}
B.aYE.prototype={
$1(d){this.a.ap0()},
$S:20}
B.aYF.prototype={
$1(d){var w,v,u=this.a.error
A.t_("RTCVideoRenderer: videoElement.onError, "+J.l(u))
u.toString
w=C.JF.h(0,A.aw(u,"code"))
w.toString
v=!J.r(A.aw(u,"message"),"")?A.aw(u,"message"):"No further diagnostic information can be determined or provided."
throw A.p(A.o4(w,C.JE.h(0,A.aw(u,"code")),v,null))},
$S:28}
B.aYG.prototype={
$1(d){},
$S:20}
B.aYI.prototype={
$0(){},
$S:0}
B.aYK.prototype={
$0(){var w=this.a.a
return w.c.as=w.e},
$S:0}
B.aYJ.prototype={
$2(d,e){var w=null,v=this.a.a.c
if(v.z!=null)v=A.aN2("RTCVideoRenderer-"+v.Q)
else v=A.S(w,w,C.j,w,w,w,w,w,w,w,w,w,w,w)
return A.cx(A.S(w,v,C.j,w,w,w,w,e.d,w,w,w,w,w,e.b),w,w)},
$S:1205}
B.aM3.prototype={
$0(){var w,v,u=this.b
if(u.d)return
w=this.a.a
v=u.b
v===$&&A.d()
u.c=w.fL(v.gir(v),new B.aM2(u),v.gpE())},
$S:0}
B.aM2.prototype={
$0(){var w=this.a,v=w.a
v===$&&A.d()
v.alb()
w=w.b
w===$&&A.d()
w.aa(0)},
$S:0}
B.bzS.prototype={
$1(d){},
$S:17}
B.aC4.prototype={
$1(d){this.a.cI(0,this.b)},
$S:25}
B.aC5.prototype={
$1(d){var w=this.a
if((w.a.a&30)===0)w.hO(new B.Mi("Failed to connect WebSocket"))
else this.b.ag1(1006,"error")},
$S:25}
B.aC6.prototype={
$1(d){var w,v,u=this.a.b
if((u.b&4)!==0)return
w=d.data
w.toString
v=A.cE("data")
if(typeof w==="string")v.b=new B.LI(A.br(w))
else if(typeof w==="object"&&A.co9(x.m.a(w),"ArrayBuffer"))v.b=new B.GV(A.TI(x.o.a(w),0,null))
else throw A.p(A.am("unexpected message type: "+J.aL(w).l(0)))
u.E(0,v.bl())},
$S:28}
B.aC7.prototype={
$1(d){var w=this.a
if((w.a.a&30)===0)w.cI(0,this.b)
this.b.ag1(d.code,d.reason)},
$S:25}
B.axF.prototype={
$1(d){var w=d.b,v=this.a
new A.cY(w,A.x(w).i("cY<1>")).d4(new B.axC(v))
w=v.r.a
w===$&&A.d()
w=w.b
w===$&&A.d()
new A.cY(w,A.x(w).i("cY<1>")).boj(new B.axD(d),new B.axE(v,d))
v.f.dW(0)},
$S:z+10}
B.axC.prototype={
$1(d){var w,v,u
$label0$0:{w=d instanceof B.LI
v=w?d.a:null
if(w){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.E(0,v)
break $label0$0}w=d instanceof B.GV
u=w?d.a:null
if(w){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.E(0,u)
break $label0$0}if(d instanceof B.Hl){w=this.a.r.a
w===$&&A.d()
w=w.a
w===$&&A.d()
w.aa(0)}}},
$S:z+11}
B.axD.prototype={
$1(d){var w,v,u,t,s,r,q
try{$label1$1:{w=d
v=null
s=typeof w=="string"
if(s)v=w
if(s){s=this.a
r=v
if((s.b.b&4)!==0)A.aq(B.cgS())
r=A.c7(r)
r.toString
s.a.send(r)
break $label1$1}u=null
s=x.R.b(w)
if(s)u=w
if(s){this.a.ac4(u)
break $label1$1}t=null
s=x.I.b(w)
if(s)t=w
if(s){this.a.ac4(new Uint8Array(A.bX(t)))
break $label1$1}s=A.aV("Cannot send "+J.aL(d).l(0))
throw A.p(s)}}catch(q){if(!(A.M(q) instanceof B.Mh))throw q}},
$S:18}
B.axE.prototype={
$0(){var w=0,v=A.k(x.H),u=1,t,s=this,r,q,p
var $async$$0=A.f(function(d,e){if(d===1){t=e
w=u}while(true)switch(w){case 0:u=3
r=s.a
w=6
return A.e(s.b.zj(0,r.d,r.e),$async$$0)
case 6:u=1
w=5
break
case 3:u=2
p=t
if(!(A.M(p) instanceof B.Mh))throw p
w=5
break
case 2:w=1
break
case 5:return A.i(null,v)
case 1:return A.h(t,v)}})
return A.j($async$$0,v)},
$S:1}
B.axG.prototype={
$1(d){var w,v=d instanceof A.Xz?d:new B.aiw(J.l(d)),u=this.a
u.f.hO(v)
u=u.r.a
u===$&&A.d()
w=u.a
w===$&&A.d()
w.i8(v)
u=u.a
u===$&&A.d()
u.aa(0)},
$S:45};(function aliases(){var w=B.HX.prototype
w.aCc=w.aa
w=B.a5y.prototype
w.aG1=w.m})();(function installTearOffs(){var w=a._instance_0u,v=a._instance_1u
w(B.a_m.prototype,"gaIf","BF",0)
var u
v(u=B.a_l.prototype,"gaoS","aoT",2)
w(u,"galV","JM",0)
w(u,"gamf","amg",1)
w(u,"gaeK","Qm",0)
w(u,"gaeJ","Ql",0)
w(u,"gaeH","Qj",0)
w(u,"gaeI","HB",0)
w(u,"gaeM","Qn",0)
w(u,"galk","b30",1)
v(u=B.a8B.prototype,"gb5W","b5X",6)
w(u,"gb4n","a4d",1)
w(B.UR.prototype,"gec","m",0)
w(B.UU.prototype,"gb26","b27",1)})();(function inheritance(){var w=a.mixinHard,v=a.inheritMany,u=a.inherit
v(A.ak,[B.HX,B.azQ,B.Lh,B.a8P,B.b2I,B.a8B,B.acv,B.aYm,B.Ti,B.Jw,B.aT5,B.UO,B.UP,B.aYC,B.ahd,B.a0f,B.ahc,B.B5,B.v4,B.Mi,B.aiw,B.Kn,B.cgb,B.aeQ,B.Ko,B.Km,B.aYx,B.Eb,B.UQ,B.US])
u(B.Ww,A.h1)
v(A.kg,[B.b3l,B.ca5,B.buJ,B.buG,B.buH,B.buD,B.buE,B.buF,B.buA,B.buB,B.buI,B.buz,B.buy,B.bum,B.buk,B.bun,B.buo,B.buj,B.bu_,B.bu2,B.bu4,B.bu1,B.bu5,B.bu6,B.bu0,B.bui,B.buf,B.bug,B.btW,B.btU,B.btV,B.btZ,B.btX,B.btY,B.bub,B.buc,B.bud,B.b2J,B.aDy,B.aT7,B.aT8,B.aYI,B.aYK,B.aM3,B.aM2,B.axE])
v(A.jF,[B.b3m,B.ca6,B.azR,B.buK,B.buC,B.bul,B.bup,B.buq,B.bur,B.bu3,B.bu7,B.bu8,B.bu9,B.but,B.buu,B.buv,B.buw,B.buh,B.bus,B.bua,B.bue,B.b2K,B.b2L,B.b2M,B.aDx,B.cb9,B.aTl,B.aTm,B.aTi,B.aTj,B.aTk,B.aT9,B.aYp,B.aYq,B.aYr,B.aYs,B.aYt,B.aYu,B.aYv,B.aYw,B.aYo,B.aYA,B.aYz,B.aYy,B.aYB,B.cbi,B.aYH,B.aYD,B.aYE,B.aYF,B.aYG,B.bzS,B.aC4,B.aC5,B.aC6,B.aC7,B.axF,B.axC,B.axD,B.axG])
v(A.T,[B.qG,B.qF,B.Nx,B.UT])
v(A.Z,[B.a_m,B.a_l,B.a5y,B.UU])
v(A.au,[B.YN,B.akc,B.YO,B.zM])
v(A.tn,[B.bux,B.bQv,B.aT6,B.aYJ])
u(B.aoO,B.a5y)
u(B.aYn,B.aYm)
u(B.pe,B.Ti)
u(B.acZ,B.Jw)
u(B.Th,B.aT5)
u(B.aeP,B.UO)
u(B.aeR,B.UP)
u(B.cgc,B.aYC)
u(B.UR,A.dw)
v(B.ahd,[B.ab7,B.axB])
v(B.v4,[B.LI,B.GV,B.Hl])
u(B.Mh,B.Mi)
u(B.au2,B.HX)
v(A.MQ,[B.yO,B.UN,B.yM,B.o9,B.aeS,B.yN])
w(B.a5y,A.h0)})()
A.oC(b.typeUniverse,JSON.parse('{"HX":{"e6":["1"]},"Ww":{"h1":["1","2"],"h1.S":"1","h1.T":"2"},"Nx":{"T":[],"q":[]},"qG":{"T":[],"q":[]},"a_m":{"Z":["qG"]},"YN":{"au":[],"q":[]},"qF":{"T":[],"q":[]},"a_l":{"Z":["qF"]},"akc":{"au":[],"q":[]},"YO":{"au":[],"q":[]},"zM":{"au":[],"q":[]},"aoO":{"Z":["Nx"]},"pe":{"Ti":[]},"acZ":{"Jw":[]},"aeP":{"UO":[]},"aeR":{"UP":[]},"UR":{"dw":["US"],"b1":[]},"UT":{"T":[],"q":[]},"UU":{"Z":["UT"]},"a0f":{"e6":["1"]},"B5":{"cgR":[]},"LI":{"v4":[]},"GV":{"v4":[]},"Hl":{"v4":[]},"Mi":{"bR":[]},"Mh":{"bR":[]},"au2":{"e6":["@"]},"aiw":{"bR":[]}}'))
A.csv(b.typeUniverse,JSON.parse('{"HX":1,"ahd":1}'))
var y={c:"Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o.",d:"Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler."}
var x=(function rtii(){var w=A.aB
return{b:w("B5"),L:w("bR"),_:w("av<@>"),x:w("av<~>"),T:w("H<ah<o,V>>"),t:w("H<ah<o,@>>"),Q:w("H<Jw>"),B:w("H<aeQ>"),M:w("H<Ko>"),d:w("H<jm<@>>"),s:w("H<o>"),p:w("H<q>"),r:w("H<ak?>"),m:w("aG"),l:w("E<aG>"),F:w("E<ah<o,@>>"),j:w("E<@>"),I:w("E<v>"),P:w("ah<o,@>"),f:w("ah<@,@>"),E:w("Ti"),G:w("Jw"),h:w("pe"),o:w("qY"),a:w("bB"),K:w("ak"),J:w("Km"),O:w("UO"),e:w("UP"),v:w("Eb"),Z:w("ahc<ak?>"),N:w("o"),i:w("rw"),R:w("eB"),D:w("v4"),U:w("X<o>"),g:w("dV<Lh>"),n:w("dV<~>"),V:w("bg<B5>"),u:w("bg<@>"),W:w("bg<~>"),k:w("a_w<aG>"),C:w("pY<aG>"),w:w("aA<B5>"),c:w("aA<@>"),Y:w("aA<~>"),q:w("kG"),y:w("V"),z:w("@"),S:w("v"),A:w("aG?"),cO:w("ah<o,@>?"),X:w("ak?"),H:w("~")}})();(function constants(){var w=a.makeConstList
D.zk=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.Z0=new B.a8P(C.eQ)
D.rD=new A.aj(32,0,32,0)
D.a2E=new A.aj(8,20,8,20)
D.a2Q=new A.cQ(1,C.ar,C.az8,null)
D.Be=new A.an(57639,"MaterialIcons",null,!1)
D.a3X=new A.an(58337,"MaterialIcons",null,!1)
D.a3Y=new A.an(58341,"MaterialIcons",null,!1)
D.a3Z=new A.an(58721,"MaterialIcons",null,!0)
D.a41=new A.an(58888,"MaterialIcons",null,!1)
D.Bp=new A.an(59048,"MaterialIcons",null,!1)
D.a42=new A.an(59049,"MaterialIcons",null,!1)
D.a43=new A.an(59077,"MaterialIcons",null,!1)
D.Bj=new A.an(58195,"MaterialIcons",null,!1)
D.a60=new A.aa(D.Bj,null,C.m,null,null)
D.a6_=new A.aa(D.Bj,28,C.m,null,null)
D.Bo=new A.an(58923,"MaterialIcons",null,!1)
D.a6i=new A.aa(D.Bo,null,C.m,null,null)
D.a6h=new A.aa(D.Bo,20,C.m,null,null)
D.afI=A.a(w([1,2,4,8,16]),A.aB("H<v>"))
D.Ed=A.a(w([]),x.Q)
D.JV=new A.fS("FlutterWebRTC.Method",C.bh,null)
D.auV=new B.o9(0,"RTCIceConnectionStateNew")
D.auW=new B.o9(1,"RTCIceConnectionStateChecking")
D.auX=new B.o9(2,"RTCIceConnectionStateCompleted")
D.auY=new B.o9(3,"RTCIceConnectionStateConnected")
D.auZ=new B.o9(4,"RTCIceConnectionStateCount")
D.Os=new B.o9(5,"RTCIceConnectionStateFailed")
D.av_=new B.o9(6,"RTCIceConnectionStateDisconnected")
D.Ot=new B.o9(7,"RTCIceConnectionStateClosed")
D.Ou=new B.UN(0,"RTCIceGatheringStateNew")
D.av0=new B.UN(1,"RTCIceGatheringStateGathering")
D.av1=new B.UN(2,"RTCIceGatheringStateComplete")
D.v4=new B.yM(0,"RTCPeerConnectionStateClosed")
D.Ov=new B.yM(1,"RTCPeerConnectionStateFailed")
D.Ow=new B.yM(2,"RTCPeerConnectionStateDisconnected")
D.Ox=new B.yM(3,"RTCPeerConnectionStateNew")
D.Oy=new B.yM(4,"RTCPeerConnectionStateConnecting")
D.Oz=new B.yM(5,"RTCPeerConnectionStateConnected")
D.OA=new B.yN(0,"veryLow")
D.v5=new B.yN(1,"low")
D.OB=new B.yN(2,"medium")
D.OC=new B.yN(3,"high")
D.av2=new B.yO(0,"RTCSignalingStateStable")
D.av3=new B.yO(1,"RTCSignalingStateHaveLocalOffer")
D.av4=new B.yO(2,"RTCSignalingStateHaveRemoteOffer")
D.av5=new B.yO(3,"RTCSignalingStateHaveLocalPrAnswer")
D.av6=new B.yO(4,"RTCSignalingStateHaveRemotePrAnswer")
D.OD=new B.yO(5,"RTCSignalingStateClosed")
D.av7=new B.US(0,0,0)
D.v6=new B.aeS(0,"RTCVideoViewObjectFitContain")
D.OE=new B.aeS(1,"RTCVideoViewObjectFitCover")
D.ayU=new A.ci(48,null,null,null)
D.az6=new A.ci(null,64,null,null)
D.aC8=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aCm=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wm=new A.D(!0,C.al,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.chQ=null
$.crx=!1
$.cpE=1
$.cZC=A.a2(["very-low",D.OA,"low",D.v5,"medium",D.OB,"high",D.OC],x.N,A.aB("yN"))})();(function lazyInitializers(){var w=a.lazyFinal
w($,"d4a","awN",()=>new B.aYn())
w($,"d0M","cjc",()=>C.d.u(A.aw(A.aw(A.aw(A.ciR(),"window"),"navigator"),"userAgent"),"Firefox"))
w($,"d9U","cCe",()=>A.a2([D.OA,"very-low",D.v5,"low",D.OB,"medium",D.OC,"high"],A.aB("yN"),x.N))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"y0FPSE5O6PsKY2wF88sG6oJ7G04=");