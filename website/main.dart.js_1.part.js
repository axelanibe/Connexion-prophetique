((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={HY:function HY(){},Wk:function Wk(d){this.$ti=d},b2a:function b2a(d){this.a=d},b2b:function b2b(d,e){this.a=d
this.b=e},
coA(d){var x
B.c1X()
if(d.length===0)return
x=A.bS(new B.c3G(d))
self.window.addEventListener("beforeunload",x)
$.cbs=new B.c3F(x)},
c1X(){var x=$.cbs
if(x!=null)x.$0()
$.cbs=null},
c3G:function c3G(d){this.a=d},
c3F:function c3F(d){this.a=d},
a6r(d){var x,w,v,u,t=new B.ayA(),s=J.P(d),r=s.h(d,"id")
r=J.n(r==null?"":r)
x=s.h(d,"conversation_id")
J.n(x==null?"":x)
x=s.h(d,"appelant_id")
x=J.n(x==null?"":x)
w=s.h(d,"appelant_nom")
w=J.n(w==null?"":w)
A.al(s.h(d,"appele_id"))
A.al(s.h(d,"appele_nom"))
v=s.h(d,"type")
v=J.n(v==null?"audio":v)
u=s.h(d,"statut")
u=J.n(u==null?"sonne":u)
t.$1(s.h(d,"cree_le"))
t.$1(s.h(d,"repondu_le"))
return new B.ayz(r,x,w,v,u)},
c9Y(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.n(s==null?"":s)
x=u.h(d,"appel_id")
J.n(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.n(x==null?"":x)
w=u.h(d,"type")
w=J.n(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mA(t,y.N,y.z):C.c0
if(u.h(d,"cree_le")!=null)A.c1(J.n(u.h(d,"cree_le")))
return new B.Le(s,x,w,v)},
cy2(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Yy
x=A.a([],y.t)
for(r=J.at(q),w=y.f,v=y.P,u=y.N,t=y.z;r.C();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mA(s,u,t))}return new B.a83(x)},
cpo(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.q7(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.apa(w,v)},
cOB(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.apd(u,A.hZ(w)?w:null,v)},
ayz:function ayz(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
ayA:function ayA(){},
Le:function Le(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a83:function a83(d){this.a=d},
cgw(d,e,f,g,h,i,j){return new B.qE(f,g,j,i,e,d,null)},
c8f(d,e,f,g,h,i,j,k,l,m){return new B.qD(f,m,h,l,i,d,j,k,e,g,null)},
clm(d,e,f,g,h,i,j,k,l,m,n){return new B.ajs(e,g,f,d,n,j,i,h,m,k,l,null)},
cnl(d,e){var x=null
return new A.a_(D.rl,A.c(d.toUpperCase(),2,C.a2,x,x,A.c3(x,x,C.m,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.A,x,x,!0,x,1.2,x,x,x,x,x,x),C.X,x,x),x)},
qE:function qE(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
ZZ:function ZZ(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
brm:function brm(d){this.a=d},
brn:function brn(d){this.a=d},
brj:function brj(d){this.a=d},
brk:function brk(d){this.a=d},
brg:function brg(d){this.a=d},
brh:function brh(d){this.a=d},
bri:function bri(d){this.a=d},
brd:function brd(d){this.a=d},
bre:function bre(d){this.a=d},
brf:function brf(d){this.a=d},
brl:function brl(d){this.a=d},
Yw:function Yw(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qD:function qD(d,e,f,g,h,i,j,k,l,m,n){var _=this
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
ZY:function ZY(d,e){var _=this
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
bqZ:function bqZ(d){this.a=d},
br_:function br_(d){this.a=d},
bqY:function bqY(d){this.a=d},
br0:function br0(d){this.a=d},
br1:function br1(){},
br2:function br2(d){this.a=d},
bqX:function bqX(d,e){this.a=d
this.b=e},
br3:function br3(){},
br4:function br4(d){this.a=d},
bqH:function bqH(d){this.a=d},
bqI:function bqI(d){this.a=d},
bqJ:function bqJ(d){this.a=d},
bqK:function bqK(d){this.a=d},
bqG:function bqG(d){this.a=d},
bqL:function bqL(d){this.a=d},
bqM:function bqM(d){this.a=d},
bqN:function bqN(d){this.a=d},
bqF:function bqF(d,e){this.a=d
this.b=e},
bqO:function bqO(){},
bqP:function bqP(d){this.a=d},
br6:function br6(d){this.a=d},
br7:function br7(d){this.a=d},
br8:function br8(d){this.a=d},
br9:function br9(d){this.a=d},
bra:function bra(d){this.a=d},
brb:function brb(d){this.a=d},
bqU:function bqU(d,e){this.a=d
this.b=e},
bqV:function bqV(d){this.a=d},
bqW:function bqW(d){this.a=d},
br5:function br5(){},
bqE:function bqE(d,e){this.a=d
this.b=e},
bqD:function bqD(d,e){this.a=d
this.b=e},
bqC:function bqC(d,e){this.a=d
this.b=e},
bqR:function bqR(d){this.a=d},
bqS:function bqS(d){this.a=d},
bqQ:function bqQ(d){this.a=d},
bqT:function bqT(d){this.a=d},
brc:function brc(d){this.a=d},
ajs:function ajs(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Yx:function Yx(d,e){this.c=d
this.a=e},
zL:function zL(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
Nr:function Nr(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
ao_:function ao_(d,e){var _=this
_.d=$
_.eP$=d
_.bT$=e
_.c=_.a=null},
bLA:function bLA(d,e){this.a=d
this.b=e},
a4V:function a4V(){},
b1z:function b1z(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b1A:function b1A(d){this.a=d},
b1B:function b1B(d){this.a=d},
b1C:function b1C(d){this.a=d},
a7P:function a7P(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aCh:function aCh(d){this.a=d},
aCi:function aCi(d){this.a=d},
c4F(d){var x=y.U,w=A.I(new A.Z(A.a(d.split(" "),y.s),new B.c4G(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gS(w),0).toUpperCase()
return(J.m(C.b.gS(w),0)+J.m(C.b.gaW(w),0)).toUpperCase()},
c4G:function c4G(){},
abH:function abH(){this.a=null},
aXi:function aXi(){},
ui:function ui(d,e){this.e=d
this.b=e},
aS9:function aS9(d){this.a=d},
aSa:function aSa(d){this.a=d},
c92(d){var x=new B.ac9(d)
x.aFg(d)
return x},
ac9:function ac9(d){this.d=d},
aS6:function aS6(d){this.a=d},
aS7:function aS7(d){this.a=d},
aS8:function aS8(d){this.a=d},
aRT:function aRT(){},
aRV:function aRV(){},
aRW:function aRW(){},
aRX:function aRX(d){this.a=d},
aRU:function aRU(d){this.a=d},
cE8(d,e){var x=y.N
x=new B.ae2(d,e,A.D(x,y.E),A.D(x,y.z))
x.aFp(d,e)
return x},
ae2:function ae2(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aXk:function aXk(d){this.a=d},
aXl:function aXl(d){this.a=d},
aXm:function aXm(d){this.a=d},
aXn:function aXn(d){this.a=d},
aXo:function aXo(d){this.a=d},
aXp:function aXp(d){this.a=d},
aXq:function aXq(d){this.a=d},
aXr:function aXr(d){this.a=d},
aXj:function aXj(d){this.a=d},
ae3:function ae3(){},
c9K:function c9K(d){this.a=d},
cQY(){return C.b.nF(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.c4P())!==-1},
c4P:function c4P(){},
cjd(){var x=A.a([],y.d),w=$.cje
$.cje=w+1
return new B.UJ(w,x,D.auN,$.ai())},
UJ:function UJ(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aXx:function aXx(d){this.a=d},
aXt:function aXt(d){this.a=d},
aXu:function aXu(d){this.a=d},
aXv:function aXv(d){this.a=d},
aXw:function aXw(){},
c9L(d,e,f){return new B.UL(d,f,e,null)},
UL:function UL(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UM:function UM(){this.c=this.a=null},
aXy:function aXy(){},
aXA:function aXA(d){this.a=d},
aXz:function aXz(d){this.a=d},
ch9(d,e,f,g){var x,w={}
w.a=d
x=new B.aaj(g.i("aaj<0>"))
x.aEY(e,f,w,g)
return x},
aaj:function aaj(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aKU:function aKU(d,e){this.a=d
this.b=e},
aKT:function aKT(d){this.a=d},
a_S:function a_S(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bwl:function bwl(){},
agq:function agq(d){this.b=this.a=$
this.$ti=d},
agr:function agr(){},
c7B(d,e){return B.cxd(d,e)},
cxd(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$c7B=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.pO("ws")&&!d.pO("wss"))throw A.o(A.fG(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.k(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.B8(r,A.fW(null,null,null,!1,y.D))
u=new A.aB($.aI,y.u)
p=new A.bc(u,y.V)
if(J.t(r.readyState,1))p.cD(0,q)
else if(J.t(r.readyState,2)||J.t(r.readyState,3))p.hs(new B.Md("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.pY(r,"open",!1,y.C).gS(0).aI(new B.aAP(p,q),y.H)
t=y.C
s=y.H
new A.pY(r,"error",!1,t).gS(0).aI(new B.aAQ(p,q),s)
A.iE(r,"message",new B.aAR(q),!1,y.m)
new A.pY(r,"close",!1,t).gS(0).aI(new B.aAS(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$c7B,w)},
B8:function B8(d,e){this.a=d
this.b=e},
aAP:function aAP(d,e){this.a=d
this.b=e},
aAQ:function aAQ(d,e){this.a=d
this.b=e},
aAR:function aAR(d){this.a=d},
aAS:function aAS(d,e){this.a=d
this.b=e},
cat(){return new B.Mc("Connection Closed")},
va:function va(){},
LF:function LF(d){this.a=d},
GY:function GY(d){this.a=d},
Ho:function Ho(d,e){this.a=d
this.b=e},
Md:function Md(d){this.a=d},
Mc:function Mc(d){this.a=d},
cwG(d){var x=null,w=$.aI,v=new B.agq(y.Z),u=y.X,t=A.fW(x,x,x,!0,u),s=A.fW(x,x,x,!0,u),r=A.y(s),q=A.y(t)
v.a=B.ch9(new A.cI(s,r.i("cI<1>")),new A.Ga(t,q.i("Ga<1>")),!0,u)
v.b=B.ch9(new A.cI(t,q.i("cI<1>")),new A.Ga(s,r.i("Ga<1>")),!1,u)
v=new B.awD(new A.bc(new A.aB(w,y.W),y.R),v)
v.aEH(d)
return v},
awD:function awD(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
awH:function awH(d){this.a=d},
awE:function awE(d){this.a=d},
awF:function awF(d){this.a=d},
awG:function awG(d,e){this.a=d
this.b=e},
awI:function awI(d){this.a=d},
atb:function atb(d,e){this.b=d
this.a=e},
ahM:function ahM(d){this.a=d},
cQx(d){switch(d){case"new":return D.auA
case"checking":return D.auB
case"connected":return D.auD
case"completed":return D.auC
case"failed":return D.O0
case"disconnected":return D.auF
case"closed":return D.O1
case"count":return D.auE}return D.O1},
cQy(d){switch(d){case"new":return D.O2
case"gathering":return D.auG
case"complete":return D.auH}return D.O2},
cSH(d){switch(d){case"stable":return D.auI
case"have-local-offer":return D.auJ
case"have-local-pranswer":return D.auL
case"have-remote-offer":return D.auK
case"have-remote-pranswer":return D.auM
case"closed":return D.O8}return D.O8},
cRS(d){switch(d){case"new":return D.O5
case"connecting":return D.O6
case"connected":return D.O7
case"closed":return D.uH
case"disconnected":return D.O4
case"failed":return D.O3}return D.uH},
yQ:function yQ(d,e){this.a=d
this.b=e},
UF:function UF(d,e){this.a=d
this.b=e},
yP:function yP(d,e){this.a=d
this.b=e},
ob:function ob(d,e){this.a=d
this.b=e},
ae4:function ae4(d,e){this.a=d
this.b=e},
aXh:function aXh(){},
Ta:function Ta(){},
Jw:function Jw(){},
aRS:function aRS(){},
Km:function Km(d,e,f){this.a=d
this.b=e
this.c=f},
UG:function UG(){},
UH:function UH(){},
aXs:function aXs(){},
Ef:function Ef(d,e){this.a=d
this.b=e},
UI:function UI(d){this.b=d},
UK:function UK(d,e,f){this.a=d
this.b=e
this.c=f},
c8F(d){var x=0,w=A.k(y.y)
var $async$c8F=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.o("The is not a video track => "+d.k(0))
throw A.o("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$c8F,w)},
acx(d){var x=0,w=A.k(y.H),v
var $async$acx=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b75("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$acx)
case 2:return A.i(null,w)}})
return A.j($async$acx,w)},
aU9(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aU9=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mA(y.f.a(A.c3q(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.U1(0,u),$async$aU9)
case 5:case 4:v=A.cX(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aU9,w)},
b75(d,e,f,g){return B.cHG(d,e,f,g,f.i("0?"))},
cHG(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b75=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b74(),$async$b75)
case 3:v=D.Jr.cl(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b75,w)},
b74(){var x=0,w=A.k(y.H),v,u
var $async$b74=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.cl7?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Jr.cl("initialize",A.a6(["options",A.D(v,u)],v,u),!1,y.H),$async$b74)
case 4:$.cl7=!0
case 3:return A.i(null,w)}})
return A.j($async$b74,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[27]
B.HY.prototype={
E(d,e){this.a.E(0,e)},
dw(d,e){this.a.dw(d,e)},
a9(d){return this.a.a9(0)},
$ie2:1}
B.Wk.prototype={
hB(d){var x=A.cw("subscription"),w=A.fW(new B.b2a(x),null,null,!0,this.$ti.y[1])
x.b=d.fD(new B.b2b(this,w),w.gnz(w),w.gpn())
return new A.cI(w,A.y(w).i("cI<1>"))}}
B.ayz.prototype={}
B.Le.prototype={}
B.a83.prototype={}
B.qE.prototype={
P(){return new B.ZZ()}}
B.ZZ.prototype={
T(){var x,w,v=this
v.X()
x=v.a
x.toString
v.z=!0
w=new B.abH()
v.y!==$&&A.aJ()
v.y=w
if(!x.y)w.tX(A.Bl(C.l_,$.vL().a).c)
v.Pg()
v.r=A.du(C.c6,new B.brm(v))
v.w=A.hl(C.zM,new B.brn(v))},
m(){var x=this,w=x.r
if(w!=null)w.Y(0)
w=x.w
if(w!=null)w.Y(0)
w=x.x
if(w!=null)w.Y(0)
w=x.y
w===$&&A.d()
w.ik()
if(x.z)w.hi()
x.a6()},
a2M(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.du(C.fI,new B.brj(this))},
Tx(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Tx=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a1()
x=7
return A.e(o.E0(p.c),$async$Tx)
case 7:r=e
q=B.a6r(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.l(new B.brk(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
p=s.y
p===$&&A.d()
p.ik()
s.a2M()}u=2
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
return A.j($async$Tx,w)},
Pg(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Pg=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a1()
x=7
return A.e(n.E0(o.c),$async$Pg)
case 7:r=e
q=B.a6r(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gwD()
p=m
if(q.w!=="sonne"||q.c===p){s.l(new B.brg(s))
o=s.y
o===$&&A.d()
o.ik()
s.a2M()
x=1
break}s.l(new B.brh(s))
if(s.a.y)s.Gq()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.l(new B.bri(s))
o=s.y
o===$&&A.d()
o.ik()
s.a2M()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Pg,w)},
Gq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Gq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.l(new B.brd(s))
u=4
q=s.a
q.toString
p=$.a1()
x=7
return A.e(p.L8(q.c,"accepte"),$async$Gq)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.Q(n)
if(s.c==null){x=1
break}s.l(new B.bre(s))
q=s.c
q.toString
p=J.n(r)
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
q.ik()
q=s.c
q.toString
A.a5(q,!1).A9(A.e9(new B.brf(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gq,w)},
IV(d){return this.b36(d)},
b35(){return this.IV(!1)},
b36(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$IV=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Y(0)
r=s.w
if(r!=null)r.Y(0)
r=s.y
r===$&&A.d()
r.ik()
u=4
r=s.a
r.toString
q=$.a1()
x=7
return A.e(q.L8(r.c,"refuse"),$async$IV)
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
if(r!=null)A.a5(r,!1).bK()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IV,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.k9(C.t,s,A.c(B.c4F(r.d),s,s,s,s,D.aBQ,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.aBC,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.a_(D.rl,x,s),C.l,A.c(q,s,s,s,s,D.w_,s,s,s),D.ayC],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.brl(t)
v=A.b("Accepter")
u=t.f?s:t.gaG8()
q.push(A.U(A.a([new B.Yw(D.AY,C.aF,r,x,s),D.ayp,new B.Yw(C.ns,C.cR,v,u,s)],w),C.n,C.bz,C.i,s))}if(t.d)q.push(C.yq)
return A.eg(s,C.o,A.fo(!0,A.cF(A.J(q,C.n,C.f,C.R),s,s),!0,C.a1,!0,!0),s,s,s)}}
B.Yw.prototype={
D(d){var x=this,w=null,v=A.di(x.d,w,w,C.a1,C.cE,w)
return A.J(A.a([A.ad(A.bb(!1,A.c_(x.c,C.m,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.dz,w,w,w)],y.p),C.n,C.f,C.R)}}
B.qD.prototype={
P(){return new B.ZY(A.b4(y.N),C.Q)}}
B.ZY.prototype={
T(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.X()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.b1z(B.cjd(),B.cjd())
o.d!==$&&A.aJ()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a7P(new A.dR(n,n,y.g),new A.dR(n,n,y.n))
o.e!==$&&A.aJ()
o.e=v
o.fr=!0
u=new B.abH()
o.dy!==$&&A.aJ()
o.dy=u
t=w.x
if(t!=null){s=$.kM()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.kM()
s=o.r
r=w.e
p=w.d
t.bfj(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.as=!0
if(q){o.SC()
return}if(x.f)u.tX("assets/audio/tonalite-appel.wav")
o.rU()},
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
w.ik()
if(x.fr)w.hi()
w=$.kM()
if(!(w.r&&w.a===x.r&&!x.y)){B.c1X()
w=x.d
w===$&&A.d()
w.hi()
w=x.e
w===$&&A.d()
w.KS()}x.a6()},
SC(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$SC=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.a1()
s.w=o.gwD()
n=$.kM()
s.Q=n.x
s.as=n.y
s.x=n.e
n=n.f
s.ay=n
if(n!=null){n=Date.now()
m=s.ay
m.toString
s.ch=new A.au(n,0,!1).eh(m)}B.coA(s.r)
u=4
s.a.toString
x=7
return A.e(o.bX("/messagerie/appels/"+s.r+"/signaux"),$async$SC)
case 7:r=e
for(o=J.at(r),n=s.f;o.C();){q=o.gJ(o)
p=B.c9Y(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.mw(A.b("Appel termin\xe9"))
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
n.f=new B.bqZ(s)
n.r=new B.br_(s)
n.w=new B.br0(s)
s.z=!0
if(o)s.l(new B.br1())
s.cy=A.hl(C.ci,new B.br2(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.c5(n,A.y(n).i("c5<1>")).cL(s.gamX())
o=o.w
s.dx=new A.c5(o,A.y(o).i("c5<1>")).cL(new B.br3())
s.CW=A.hl(C.fI,new B.br4(s))
s.xZ()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$SC,w)},
rU(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$rU=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:s.cx=A.du(C.c6,new B.bqH(s))
r="appel"
u=4
q=null
h=s.a
g=h.z
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$rU)
case 10:q=a2
h=s.r=B.a6r(q).a
x=8
break
case 9:g=$.a1()
x=11
return A.e(g.E0(h.c),$async$rU)
case 11:q=a2
h=s.r=s.a.c
case 8:g=$.kM()
g.bf5(h)
B.coA(s.r)
if(s.a.f)g.UV()
p=B.a6r(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mw(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.a1()
s.w=h.gwD()
r="ice"
s.a.toString
o=h.Vs()
n=s.ID()
x=12
return A.e(o,$async$rU)
case 12:m=a2
l=B.cy2(m)
x=15
return A.e(n,$async$rU)
case 15:x=!a2?13:14
break
case 13:if(s.c==null){x=1
break}s.l(new B.bqI(s))
x=16
return A.e(A.kl(C.kz,null,y.z),$async$rU)
case 16:if(s.c==null){x=1
break}s.mw(null)
x=1
break
case 14:r="webrtc"
f=s.d
f===$&&A.d()
e=s.a.d
x=17
return A.e(f.A7(A.a6(["iceServers",l.a],y.N,y.z),e==="video"),$async$rU)
case 17:f.f=new B.bqJ(s)
f.r=new B.bqK(s)
f.w=new B.bqL(s)
if(s.c==null){x=1
break}s.l(new B.bqM(s))
g.bl5()
s.cy=A.hl(C.ci,new B.bqN(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.c5(f,A.y(f).i("c5<1>")).cL(s.gamX())
f=g.w
s.dx=new A.c5(f,A.y(f).i("c5<1>")).cL(new B.bqO())
s.a.toString
k=h.b
if(k!=null&&J.a7(k)!==0){s.a.toString
g.Us(C.d.XZ("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.ei(C.bN,k,C.a8,!0))}s.CW=A.hl(C.fI,new B.bqP(s))
s.xZ()
u=2
x=6
break
case 4:u=3
a0=t
j=A.Q(a0)
i=A.bo(a0)
if(s.c==null){x=1
break}A.t3().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.dp?j.a:s.aYn(r)
h.t(y.q).f.A(A.z(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.k,null,null,null,null,null,null,null,null,null))
s.mw(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$rU,w)},
aYn(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
ID(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$ID=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a_p(),$async$ID)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.EK(s.a.d==="video"),$async$ID)
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
return A.j($async$ID,w)},
a_p(){var x=0,w=A.k(y.y),v
var $async$a_p=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_p,w)},
xZ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$xZ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.a1()
x=7
return A.e(p.bX("/messagerie/appels/"+s.r+"/signaux"),$async$xZ)
case 7:r=e
for(p=J.at(r);p.C();){q=p.gJ(p)
s.amY(B.c9Y(q))}u=2
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
return A.j($async$xZ,w)},
amY(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cpo(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.Dv(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aI(new B.br6(s),y.a).fz(new B.br7(s))
break
case"reponse":if(!s.a.f)return
u=B.cpo(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.U0(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aI(new B.br8(s),y.a).fz(new B.br9(s))
break
case"candidat_ice":t=B.cOB(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.TW(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.KL().aI(new B.bra(s),y.a).fz(new B.brb(s))
break
case"refuse":s.mw(A.b("Appel refus\xe9"))
break
case"annule":s.mw(A.b("Appel annul\xe9"))
break
case"termine":s.mw(A.b("Appel termin\xe9"))
break}},
Sa(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$Sa=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.Y(0)
t=u.dy
t===$&&A.d()
t.ik()
u.l(new B.bqU(u,!1))
t=$.kM()
t.bmX()
s=u.Q
t.a7Q(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$Sa,w)},
xS(d,e,f){return this.aOV(d,e,f)},
afJ(d,e){return this.xS(d,e,!0)},
aOV(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$xS=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.a1()
x=6
return A.e(s.ar0(t.r,e,d),$async$xS)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mw(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$xS,w)},
IP(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$IP=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.Y(0)
r=s.dy
r===$&&A.d()
r.ik()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.a1()
x=9
return A.e(q.L8(r,"termine"),$async$IP)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.c1X()
$.kM().N9()
r=s.c
if(r!=null)A.a5(r,!1).bK()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IP,w)},
aki(){var x=this
if(!x.x||x.y)return
$.kM().bof()
x.l(new B.bqV(x))
$.aO.aD$.push(new B.bqW(x))},
mw(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.Y(0)
x=v.dy
x===$&&A.d()
x.ik()
x=v.r
if(x.length!==0){v.a.toString
w=$.a1()
w.L8(x,"termine").fz(new B.br5())}if(d!=null&&v.c!=null)v.c.t(y.q).f.A(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.k,u,u,u,u,u,u,u,u,u))
B.c1X()
$.kM().N9()
x=v.c
if(x!=null)A.a5(x,!1).bK()},
Pr(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Pr=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Zh(u),$async$Pr)
case 2:if(v.c!=null)v.l(new B.bqE(v,u))
$.kM().a7Q(v.as,u)
return A.i(null,w)}})
return A.j($async$Pr,w)},
Pq(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Pq=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.FZ(u),$async$Pq)
case 2:if(v.c!=null)v.l(new B.bqD(v,u))
$.kM().a7Q(u,v.Q)
return A.i(null,w)}})
return A.j($async$Pq,w)},
Pn(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Pn=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ze(u),$async$Pn)
case 2:if(v.c!=null)v.l(new B.bqC(v,u))
return A.i(null,w)}})
return A.j($async$Pn,w)},
Po(){var x=0,w=A.k(y.H),v=this,u
var $async$Po=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.U7(),$async$Po)
case 2:return A.i(null,w)}})
return A.j($async$Po,w)},
am6(){var x,w=this,v="Appel en cours\u2026",u=w.fx
if(u!=null)return u
if(w.x){u=A.b(v)
x=C.c.ad(w.ch.a,1e6)
return u+" "+(C.d.b1(C.c.k(C.c.ad(x,60)),2,"0")+":"+C.d.b1(C.c.k(C.c.a5(x,60)),2,"0"))}if(w.z)return w.a.f?A.b("\xc7a sonne\u2026"):A.b(v)
return A.b("Connexion\u2026")},
ba6(){var x,w=null,v=this.c
v.toString
x=A.b("La vid\xe9o n\u2019est pas disponible pendant un appel audio.")
v.t(y.q).f.A(A.z(w,w,w,w,w,C.h,w,A.c(x,w,w,w,w,w,w,w,w),w,C.k,w,w,w,w,w,w,w,w,w))},
b_Y(){var x,w=this,v=null,u=A.a([],y.p)
if(w.a.d==="video")u.push(A.cd(!1,v,v,v,!0,v,v,!0,!1,D.a5M,v,v,v,new B.bqR(w),!1,v,v,v,v,v,A.c(A.b("Basculer"),v,v,v,v,C.dz,v,v,v),v,v))
if(w.x)u.push(A.cd(!1,v,v,v,!0,v,v,!0,!1,D.a5x,v,v,v,new B.bqS(w),!1,v,v,v,v,v,A.c(A.b("R\xe9duire"),v,v,v,v,C.dz,v,v,v),v,v))
if(u.length===0)return
x=w.c
x.toString
A.jw(D.z2,new B.bqT(u),x,!1,v,y.H)},
D(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.d()
x=o.c
w=q.go
v=q.a
if(v.d==="video"&&q.z){if(x!=null)x=B.c9L(o.e,!1,D.O9)
else{x=v.e
v=v.r
u=q.fy&&q.x
x=A.cF(A.J(A.a([new B.Nr(x,v,u,56,p),C.p,B.cnl(x,22),C.l,A.c(q.am6(),p,p,p,p,D.w_,p,p,p)],y.p),C.n,C.f,C.R),p,p)}o=A.a([A.E8(0,x),A.fd(p,A.eO(A.M(12),B.c9L(o.d,!0,D.O9),C.ap),160,p,p,16,16,110)],y.p)
if(q.x)o.push(A.fd(p,new B.Yx(q.gakh(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.fd(24,B.clm(q.ax,!0,v,x,q.gacY(),q.gacZ(),q.gad_(),q.gajq(),q.gajX(),q.ganZ(),!0),p,p,0,0,p,p))
o=A.eh(C.aT,o,C.h,C.aO,p)}else{x=y.p
v=A.a([],x)
if(q.fy)v.push(A.fd(p,A.r3(B.c9L(o.e,!1,D.uI),0),1,p,0,p,0,1))
if(q.x)v.push(A.fd(p,new B.Yx(q.gakh(),p),p,p,16,p,16,p))
o=B.cnl(q.a.e,24)
u=A.c(q.am6(),p,p,p,p,D.w_,C.X,p,p)
t=q.a
s=t.e
t=t.r
t=A.ae(A.cF(new B.Nr(s,t,q.fy&&q.x,88,p),p,p),1,p)
s=q.Q
r=q.as
v.push(A.J(A.a([C.p,o,C.l,new A.a_(D.rl,u,p),t,B.clm(q.ax,!1,r,s,q.gacY(),q.gacZ(),q.gad_(),q.gajq(),q.gajX(),q.ganZ(),q.x),C.p],x),C.n,C.f,C.i))
v=A.eh(C.aT,v,C.h,C.aO,p)
o=v}return A.c9u(w,A.eg(p,C.o,A.fo(!0,o,!0,C.a1,!0,!0),p,p,p),new B.brc(q),y.K)}}
B.ajs.prototype={
D(d){var x,w,v=this,u=null,t=A.M(28),s=A.ae(new B.zL(D.a3D,v.e,A.b("Haut-parleur"),v.x,u,u),1,u),r=v.f?D.B7:D.a3C,q=A.b("Appel vid\xe9o")
r=A.ae(new B.zL(r,!1,q,v.c?v.y:v.z,u,u),1,u)
q=v.d
x=q?D.a3y:D.a3x
w=y.p
q=A.U(A.a([s,r,A.ae(new B.zL(x,q,A.b("Muet"),v.w,u,u),1,u)],w),C.n,C.f,C.i,u)
x=A.b("Plus")
return A.N(u,A.J(A.a([q,C.p,A.U(A.a([A.ae(new B.zL(C.B4,!1,x,v.r?v.Q:u,u,u),1,u),A.ae(new B.zL(D.AY,!1,A.b("Terminer"),v.as,C.aF,u),1,u),D.a2p],w),C.n,C.f,C.i,u)],w),C.n,C.f,C.R),C.j,u,u,new A.a3(D.z2,u,u,t,u,u,C.v),u,u,u,C.A7,D.a27,u,u,u)}}
B.Yx.prototype={
D(d){var x=null
return A.J(A.a([A.ad(A.bb(!1,D.a5w,C.j,x,C.q,x,x,x,x,this.c,x,A.di(C.kr,x,x,C.a1,C.cE,x)),48,48),C.J,A.c(A.b("R\xe9duire"),x,x,x,x,C.Qx,x,x,x)],y.p),C.n,C.f,C.R)}}
B.zL.prototype={
D(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.m:C.kr
if(!r)x=C.m
else x=u.d?C.o:C.m
r=u.f
w=r==null?0.4:1
v=A.di(s,t,t,C.a1,C.cE,t)
return A.r3(A.J(A.a([A.ad(A.bb(!1,A.c_(u.c,x,t,30),C.j,t,C.q,t,t,t,t,r,t,v),72,72),C.l,A.c(u.e,t,t,t,t,C.p6,C.X,t,t)],y.p),C.n,C.f,C.R),w)}}
B.Nr.prototype={
P(){return new B.ao_(null,null)}}
B.ao_.prototype={
T(){var x,w=this
w.X()
x=A.co(null,A.d3(0,0,w.a.e?1100:2400,0,0),null,1,null,w)
x.a8H(0,!0)
w.d!==$&&A.aJ()
w.d=x},
b0(d){var x,w
this.bg(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.d()
w.e=A.d3(0,0,x?1100:2400,0,0)
w.a8H(0,!0)}},
m(){var x=this.d
x===$&&A.d()
x.m()
this.aE1()},
D(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.d()
x=u.d
u=x!=null?A.k9(v,x,v,v,t):A.k9(C.t,v,A.c(B.c4F(u.c),v,v,v,v,A.c3(v,v,C.o,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.A,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),v,t)
return A.ad(A.i4(q,new B.bLA(w,s),u),r,r)}}
B.a4V.prototype={
m(){var x=this,w=x.bT$
if(w!=null)w.U(0,x.ghY())
x.bT$=null
x.a6()},
ce(){this.de()
this.d1()
this.hZ()}}
B.b1z.prototype={
EK(d){return this.bmM(d)},
bmM(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$EK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jq(0),$async$EK)
case 3:$.cd_()
s=y.N
r=A.a6(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aRT().FM(0,A.a6(["audio",r,"video",d&&A.a6(["facingMode","user"],s,s)],s,y.z)),$async$EK)
case 4:q=f
u.b=q
t.saaW(0,q)
case 1:return A.i(v,w)}})
return A.j($async$EK,w)},
A7(d,e){return this.bnx(d,e)},
bnx(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$A7=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jq(0),$async$A7)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.EK(e),$async$A7)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.cd_().a5N(d,A.D(y.N,y.z)),$async$A7)
case 6:t=v.a=g
s=u.aa7(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a4D(0,s[q],u),$async$A7)
case 10:case 8:s.length===r||(0,A.R)(s),++q
x=7
break
case 9:t.e=new B.b1A(v)
t.Q=new B.b1B(v)
t.d=new B.b1C(v)
return A.i(null,w)}})
return A.j($async$A7,w)},
aMW(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.saaW(0,d)
w.GD()
x=w.r
if(x!=null)x.$0()}},
GD(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$GD=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.NM(0)
if(m==null)m=C.dt
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aU9(n,s),$async$GD)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.Q(l)
A.t3().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.R)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$GD,w)},
KL(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$KL=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.UH(0),$async$KL)
case 3:t=e
x=4
return A.e(s.G_(0,t),$async$KL)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$KL,w)},
Dv(d){return this.bey(d)},
bey(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Dv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.G1(0,new B.Ef(d.h(0,"sdp"),d.h(0,"type"))),$async$Dv)
case 3:x=4
return A.e(s.UE(0),$async$Dv)
case 4:t=f
x=5
return A.e(s.G_(0,t),$async$Dv)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Dv,w)},
U0(d){return this.bbp(d)},
bbp(d){var x=0,w=A.k(y.H),v=this,u
var $async$U0=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.o(A.ak("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.G1(0,new B.Ef(d.h(0,"sdp"),d.h(0,"type"))),$async$U0)
case 2:return A.i(null,w)}})
return A.j($async$U0,w)},
TW(d){return this.bba(d)},
bba(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$TW=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.TK(new B.Km(A.al(d.h(0,"candidate")),A.al(d.h(0,"sdpMid")),A.dT(d.h(0,"sdpMLineIndex")))),$async$TW)
case 3:case 1:return A.i(v,w)}})
return A.j($async$TW,w)},
Zh(d){return this.ayn(d)},
ayn(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Zh=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.NM(0)
if(r==null)r=C.dt
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.R)(r),++s)r[s].slH(0,t)
return A.i(null,w)}})
return A.j($async$Zh,w)},
FZ(d){return this.ayd(d)},
ayd(d){var x=0,w=A.k(y.H),v=this
var $async$FZ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.acx(d),$async$FZ)
case 2:x=3
return A.e(v.GD(),$async$FZ)
case 3:return A.i(null,w)}})
return A.j($async$FZ,w)},
Ze(d){return this.ay3(d)},
ay3(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Ze=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.NZ(0)
if(s==null)s=C.dt
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.R)(s),++t)s[t].slH(0,d)
return A.i(null,w)}})
return A.j($async$Ze,w)},
U7(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$U7=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.NZ(0)
if(s==null)s=D.akG
if(s.length===0){x=1
break}x=3
return A.e(B.c8F(C.b.gS(s)),$async$U7)
case 3:case 1:return A.i(v,w)}})
return A.j($async$U7,w)},
hi(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hi=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.acx(!1),$async$hi)
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
return A.e(y.x.b(p)?p:A.ds(p,y.H),$async$hi)
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
p=p==null?null:p.aa7(0)
if(p==null)p=C.dt
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cwA(r)
if(!m.b(k)){j=new A.aB($.aI,n)
j.a=8
j.c=k
k=j}x=20
return A.e(k,$async$hi)
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
return A.e(s.d.m(),$async$hi)
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
return A.e(s.e.m(),$async$hi)
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
return A.j($async$hi,w)}}
B.a7P.prototype={
Us(d){return this.bcP(d)},
bcP(d){var x=0,w=A.k(y.H),v=this
var $async$Us=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.GC(),$async$Us)
case 2:return A.i(null,w)}})
return A.j($async$Us,w)},
GC(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$GC=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a7(r)===0){x=1
break}u=4
q=B.cwG(B.c7B(A.cC(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$GC)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cI(p,A.y(p).i("cI<1>")).b5(s.gb2O(),!0,s.gb1g(),new B.aCh(s))
u=2
x=6
break
case 4:u=3
n=t
s.a2A()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GC,w)},
b2P(d){var x,w,v,u
try{x=C.Z.cV(0,J.n(d),null)
v=y.P
if(!v.b(x))return
if(!J.t(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.c9Y(w))}catch(u){}},
a2A(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.afa[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.du(A.d3(0,0,0,0,x),new B.aCi(w))},
KS(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$KS=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.ds(s,y.H),$async$KS)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.b1()
r=s.w=new B.atb(s,q)}s=r.a9(0)}x=7
return A.e(y._.b(s)?s:A.ds(s,y.z),$async$KS)
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
return A.j($async$KS,w)}}
B.abH.prototype={
tX(d){return this.bkh(d)},
bkh(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$tX=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.B1():r).aT(0),$async$tX)
case 6:x=7
return A.e(t.a.Zd(d),$async$tX)
case 7:x=8
return A.e(t.a.jc(C.J8),$async$tX)
case 8:x=9
return A.e(t.a.ib(1),$async$tX)
case 9:x=10
return A.e(t.a.cT(0),$async$tX)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.Q(p)
A.t3().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$tX,w)},
ik(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$ik=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aT(0)
x=6
return A.e(y.x.b(s)?s:A.ds(s,y.H),$async$ik)
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
return A.j($async$ik,w)},
hi(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hi=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.m()
x=6
return A.e(y.x.b(s)?s:A.ds(s,y.H),$async$hi)
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
return A.j($async$hi,w)}}
B.aXi.prototype={
a5N(d,e){return this.ben(d,e)},
ben(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a5N=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.D(r,r),"optional",A.a([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fL(u,y.N,y.z)
t.u(0,d)
s=new r(y.m.a(A.ca(t)))
t=J.n(s)
v=B.cE8(C.cf.gki().bh(new A.eD(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5N,w)}}
B.ui.prototype={
NM(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.d5(w,A.X(w).i("d5<1,aC>"))
J.hr(w,new B.aS9(x))
return x},
NZ(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.d5(w,A.X(w).i("d5<1,aC>"))
J.hr(w,new B.aSa(x))
return x},
aa7(d){var x=A.I(this.NM(0),!0,y.G)
C.b.u(x,this.NZ(0))
return x}}
B.ac9.prototype={
aFg(d){var x=this,w=x.d
w.addEventListener("ended",A.bS(new B.aS6(x)))
w.addEventListener("mute",A.bS(new B.aS7(x)))
w.addEventListener("unmute",A.bS(new B.aS8(x)))},
slH(d,e){this.d.enabled=e},
U1(d,e){return this.bbs(0,e)},
bbs(d,e){var x=0,w=A.k(y.H),v=this
var $async$U1=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.ec(v.d.applyConstraints(y.m.a(A.ca(e))),y.X),$async$U1)
case 2:return A.i(null,w)}})
return A.j($async$U1,w)},
aT(d){var x=0,w=A.k(y.H),v=this
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aT,w)}}
B.aRT.prototype={
FM(d,e){return this.ax9(0,e)},
ax9(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$FM=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cQY())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.ja(e.h(0,"video"),"facingMode")
e.cP(0,"video",new B.aRV())
e.cP(0,"audio",new B.aRW())}catch(a0){A.oL("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hO(e.h(0,"audio"),i,i).aB(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.D(y.N,y.z)
J.hr(s,new B.aRX(r))
J.ja(e.h(0,"audio"),"optional")
J.jx(e.h(0,"audio"),r)}}catch(a0){q=A.Q(a0)
p=A.bo(a0)
A.oL("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.ca(e)
x=10
return A.e(A.ec(o.getUserMedia(h.a(n)),h),$async$FM)
case 10:m=a2
v=new B.ui(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.ec(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$FM)
case 11:l=a2
v=new B.ui(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.Q(f)
i=J.n(k)
throw A.o("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$FM,w)}}
B.ae2.prototype={
aFp(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bS(new B.aXk(x)))
w.addEventListener("icecandidate",A.bS(new B.aXl(x)))
w.addEventListener("iceconnectionstatechange",A.bS(new B.aXm(x)))
w.onicegatheringstatechange=A.bS(new B.aXn(x))
w.addEventListener("signalingstatechange",A.bS(new B.aXo(x)))
if(!$.ccL())w.addEventListener("connectionstatechange",A.bS(new B.aXp(x)))
w.addEventListener("negotiationneeded",A.bS(new B.aXq(x)))
w.addEventListener("track",A.bS(new B.aXr(x)))},
UH(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$UH=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.ec(s.createOffer(y.m.a(A.ca(A.D(y.N,y.z)))),y.A),$async$UH)
case 3:t=f
v=new B.Ef(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$UH,w)},
UE(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$UE=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.ec(s.createAnswer(y.m.a(A.ca(A.D(y.N,y.z)))),y.A),$async$UE)
case 3:t=f
v=new B.Ef(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$UE,w)},
G_(d,e){return this.ayh(0,e)},
ayh(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$G_=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.ec(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$G_)
case 2:return A.i(null,w)}})
return A.j($async$G_,w)},
G1(d,e){return this.ayx(0,e)},
ayx(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$G1=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.ec(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$G1)
case 2:return A.i(null,w)}})
return A.j($async$G1,w)},
TK(d){return this.baO(d)},
baO(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$TK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.ec(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$TK)
case 2:return A.i(null,w)}})
return A.j($async$TK,w)},
a9(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cX(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a9,w)},
a4D(d,e,f){return this.bb4(0,e,f)},
bb4(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a4D=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.ae3()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a4D,w)}}
B.ae3.prototype={}
B.c9K.prototype={
aT(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.Q(r)
if(y.L.b(s)){u=s
s=u
J.n(s)
throw A.o("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aT,w)}}
B.UJ.prototype={
satj(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Ls()
if(x!=null)x.style.objectFit=e},
an4(){var x=this,w=x.Ls(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.aq2(u,x.z!=null,0,t))},
saaW(d,e){var x,w,v,u,t=this
t.z=e
if(e.NZ(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.at(y.l.b(x)?x:new A.d5(x,A.X(x).i("d5<1,aC>")))
for(;x.C();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.NM(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.at(y.l.b(x)?x:new A.d5(x,A.X(x).i("d5<1,aC>")))
for(;x.C();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aOJ()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Ls()
if(u!=null){u.srcObject=t.x
x=t.Ls()
x.toString
t.acM(x)}t.sp(0,t.a.bdc(t.z!=null))},
aOJ(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Ls(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.R)(t),++r)t[r].Y(0)
q=u.Ls()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eU()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$m,w)},
jq(d){var x=0,w=A.k(y.H),v=this
var $async$jq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.GD()
$.qc().ua("RTCVideoRenderer-"+v.Q,new B.aXx(v),!0)
return A.i(null,w)}})
return A.j($async$jq,w)},
acM(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UL.prototype={
P(){return new B.UM()}}
B.UM.prototype={
T(){var x,w,v=this
v.X()
v.a.c.ak(0,v.gb_5())
x=v.a
w=x.c
w.as=x.e
w.satj(0,x.d===D.uI?"contain":"cover")},
b_6(){if(this.c!=null)this.l(new B.aXy())},
m(){if(this.c!=null)this.a6()},
b0(d){var x,w
this.bg(d)
A.du(A.d3(0,0,10,0,0),new B.aXA(this))
x=this.a
w=x.c
w.satj(0,x.d===D.uI?"contain":"cover")},
D(d){return new A.iS(new B.aXz(this),null)}}
B.aaj.prototype={
aEY(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.aJ()
x.a=new B.a_S(d,x,new A.bc(new A.aB(w,y.c),y.r),e,g.i("a_S<0>"))
if(f.a.gj4())f.a=new B.Wk(g.i("@<0>").cb(g).i("Wk<1,2>")).hB(f.a)
w=A.fW(null,new B.aKU(f,x),null,!0,g)
x.b!==$&&A.aJ()
x.b=w},
ajg(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a9(0)}}
B.a_S.prototype={
E(d,e){if(this.e)throw A.o(A.ak("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dw(d,e){if(this.e)throw A.o(A.ak("Cannot add event after closing."))
if(this.d)return
this.aRv(d,e)},
i_(d){return this.dw(d,null)},
aRv(d,e){var x=this
if(x.w){x.a.a.dw(d,e)
return}x.c.hc(d,e)
x.ajh()
x.b.ajg()
x.a.a.a9(0).fz(new B.bwl())},
a9(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.ajg()
x.c.cD(0,x.a.a.a9(0))}return x.c.a},
ajh(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dM(0)
return},
$ie2:1}
B.agq.prototype={}
B.agr.prototype={}
B.B8.prototype={
aed(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Ho(d,e))
x.a9(0)},
aap(d){var x
if((this.b.b&4)!==0)throw A.o(B.cat())
x=A.ca(d)
x.toString
this.a.send(x)},
yU(d,e,f){return this.bcy(0,e,f)},
bcy(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$yU=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.o(B.cat())
u.a9(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$yU,w)},
$icas:1}
B.va.prototype={}
B.LF.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.LF&&e.a===this.a},
gH(d){return C.d.gH(this.a)}}
B.GY.prototype={
n(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.GY&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.hD(this.a)},
k(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.Ho.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.Ho&&e.a===this.a&&e.b===this.b},
gH(d){return A.hD([this.a,this.b])},
k(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Md.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibO:1}
B.Mc.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.awD.prototype={
aEH(d){d.fj(new B.awH(this),new B.awI(this),y.a)}}
B.atb.prototype={
a9(d){var x=this.b
x.e=x.d=null
return this.aAf(0)}}
B.ahM.prototype={
k(d){return"WebSocketChannelException: "+this.a},
$ibO:1}
B.yQ.prototype={
O(){return"RTCSignalingState."+this.b}}
B.UF.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.yP.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.ob.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.ae4.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.aXh.prototype={}
B.Ta.prototype={}
B.Jw.prototype={
k(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aRS.prototype={}
B.Km.prototype={}
B.UG.prototype={}
B.UH.prototype={}
B.aXs.prototype={}
B.Ef.prototype={}
B.UI.prototype={}
B.UK.prototype={
aq2(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.UK(x,w,v)},
bdc(d){return this.aq2(null,d,null,null)},
k(d){var x=this
return A.ab(x).k(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Le)","bv(Km)","bv(UI)","bv(ob)","~(@)","ui(@)","bv(cas)","~(va)"])
B.b2a.prototype={
$0(){return J.cvV(this.a.bk())},
$S:1}
B.b2b.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.Q(v)
if(y.i.b(u)){x=u
w=A.bo(v)
this.b.dw(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c3G.prototype={
$1(d){var x,w,v,u=$.a1().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Z.e3(A.a6(["type","termine","contenu",A.D(v,y.z)],v,y.K),null),keepalive:!0})},
$S:24}
B.c3F.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.ayA.prototype={
$1(d){if(d==null)return null
return A.c1(J.n(d))},
$S:115}
B.brm.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.IV(!0)},
$S:0}
B.brn.prototype={
$1(d){return this.a.Tx()},
$S:28}
B.brj.prototype={
$0(){var x=this.a.c
if(x!=null)A.a5(x,!1).bK()},
$S:0}
B.brk.prototype={
$0(){return this.a.e=!0},
$S:0}
B.brg.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.brh.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bri.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.brd.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bre.prototype={
$0(){return this.a.f=!1},
$S:0}
B.brf.prototype={
$1(d){var x=null,w=this.a.a,v=w.c,u=w.e,t=w.d
return B.c8f(w.w,x,v,w.y,t,x,x,x,!1,u)},
$S:1182}
B.brl.prototype={
$0(){return this.a.b35()},
$S:0}
B.bqZ.prototype={
$1(d){this.a.xS("candidat_ice",d,!1)},
$S:251}
B.br_.prototype={
$0(){var x=this.a
if(x.c!=null)x.l(new B.bqY(x))},
$S:0}
B.bqY.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.br0.prototype={
$0(){this.a.mw(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.br1.prototype={
$0(){},
$S:0}
B.br2.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.l(new B.bqX(x,w))},
$S:28}
B.bqX.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).eh(this.b)},
$S:0}
B.br3.prototype={
$1(d){},
$S:127}
B.br4.prototype={
$1(d){this.a.xZ()},
$S:28}
B.bqH.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.xS("annule",C.c0,!1)
x.mw(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bqI.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bqJ.prototype={
$1(d){this.a.xS("candidat_ice",d,!1)},
$S:251}
B.bqK.prototype={
$0(){var x=this.a
if(x.c!=null)x.l(new B.bqG(x))},
$S:0}
B.bqG.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bqL.prototype={
$0(){this.a.mw(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bqM.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bqN.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.l(new B.bqF(x,w))},
$S:28}
B.bqF.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).eh(this.b)},
$S:0}
B.bqO.prototype={
$1(d){},
$S:127}
B.bqP.prototype={
$1(d){this.a.xZ()},
$S:28}
B.br6.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.Sa()
x.afJ("reponse",d)},
$S:402}
B.br7.prototype={
$1(d){this.a.mw(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.br8.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.Sa()},
$S:30}
B.br9.prototype={
$1(d){this.a.mw(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bra.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.afJ("offre",d)},
$S:402}
B.brb.prototype={
$1(d){this.a.mw(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bqU.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.au(Date.now(),0,!1)
x.ch=C.Q},
$S:0}
B.bqV.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bqW.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a5(x,!1).bK()},
$S:5}
B.br5.prototype={
$1(d){return A.D(y.N,y.z)},
$S:139}
B.bqE.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bqD.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bqC.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.bqR.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a5(w,!1).bK()
x.Po()},
$S:0}
B.bqS.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a5(w,!1).WR().aI(new B.bqQ(x),y.H)},
$S:0}
B.bqQ.prototype={
$1(d){return this.a.aki()},
$S:10}
B.bqT.prototype={
$1(d){return A.fo(!0,A.J(this.a,C.n,C.f,C.R),!0,C.a1,!0,!0)},
$S:125}
B.brc.prototype={
$2(d,e){if(!d)this.a.IP()},
$S:1186}
B.bLA.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.d()
s=s.x
s===$&&A.d()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.ckH(A.N(u,u,C.j,u,u,new A.a3(u,u,A.bf(C.t.b3(t*(1-s)),3),u,u,u,C.aH),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.N(u,u,C.j,u,u,new A.a3(u,u,A.bf(C.t,2),u,u,u,C.aH),u,w,u,u,u,u,u,w)
e.toString
return A.eh(C.a4,A.a([s,w,e],y.p),C.h,C.aO,u)},
$S:1187}
B.b1A.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b1B.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aMW(w)},
$S:z+4}
B.b1C.prototype={
$1(d){var x
if(d===D.O0){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aCh.prototype={
$1(d){return this.a.a2A()},
$S:21}
B.aCi.prototype={
$0(){var x=this.a
if(!x.e)x.GC()},
$S:0}
B.c4G.prototype={
$1(d){return d.length!==0},
$S:8}
B.aS9.prototype={
$1(d){return this.a.push(B.c92(d))},
$S:21}
B.aSa.prototype={
$1(d){return this.a.push(B.c92(d))},
$S:21}
B.aS6.prototype={
$1(d){},
$S:23}
B.aS7.prototype={
$1(d){},
$S:23}
B.aS8.prototype={
$1(d){},
$S:23}
B.aRV.prototype={
$0(){return!1},
$S:53}
B.aRW.prototype={
$0(){return!1},
$S:53}
B.aRX.prototype={
$1(d){J.hr(d,new B.aRU(this.a))},
$S:251}
B.aRU.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:49}
B.aXk.prototype={
$1(d){},
$S:23}
B.aXl.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.Km(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:23}
B.aXm.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cQx(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.ccL())switch(w.cx.a){case 0:w.cy=D.O5
break
case 1:w.cy=D.O6
break
case 3:w.cy=D.O7
break
case 5:w.cy=D.O3
break
case 6:w.cy=D.O4
break
case 7:w.cy=D.uH
break
default:break}},
$S:33}
B.aXn.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cQy(w.iceGatheringState)},
$S:33}
B.aXo.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cSH(w.signalingState)},
$S:33}
B.aXp.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cRS(w.connectionState)},
$S:33}
B.aXq.prototype={
$1(d){},
$S:33}
B.aXr.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.c92(d.track)
x=d.streams
x=y.l.b(x)?x:new A.d5(x,A.X(x).i("d5<1,aC>"))
w=J.dC(x,new B.aXj(w),y.h)
v.$1(new B.UI(A.I(w,!0,w.$ti.i("aD.E"))))}},
$S:23}
B.aXj.prototype={
$1(d){return new B.ui(d,this.a.as)},
$S:z+7}
B.c4P.prototype={
$1(d){return J.h2(self.window.navigator.userAgent,A.bG(d,!1,!1))},
$S:8}
B.aXx.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.R)(w),++u)w[u].Y(0)
C.b.a_(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.acM(t)
v=y.k.c
w.push(A.iE(t,"canplay",new B.aXt(x),!1,v))
w.push(A.iE(t,"resize",new B.aXu(x),!1,v))
w.push(A.iE(t,"error",new B.aXv(t),!1,v))
w.push(A.iE(t,"ended",new B.aXw(),!1,v))
return t},
$S:181}
B.aXt.prototype={
$1(d){this.a.an4()},
$S:21}
B.aXu.prototype={
$1(d){this.a.an4()},
$S:21}
B.aXv.prototype={
$1(d){var x,w,v=this.a.error
A.oL("RTCVideoRenderer: videoElement.onError, "+J.n(v))
v.toString
x=C.Je.h(0,A.ax(v,"code"))
x.toString
w=!J.t(A.ax(v,"message"),"")?A.ax(v,"message"):"No further diagnostic information can be determined or provided."
throw A.o(A.o5(x,C.Jd.h(0,A.ax(v,"code")),w,null))},
$S:24}
B.aXw.prototype={
$1(d){},
$S:21}
B.aXy.prototype={
$0(){},
$S:0}
B.aXA.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aXz.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.aaA("RTCVideoRenderer-"+w.Q)
else w=A.N(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cF(A.N(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1188}
B.aKU.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fD(w.gii(w),new B.aKT(v),w.gpn())},
$S:0}
B.aKT.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.ajh()
x=x.b
x===$&&A.d()
x.a9(0)},
$S:0}
B.bwl.prototype={
$1(d){},
$S:16}
B.aAP.prototype={
$1(d){this.a.cD(0,this.b)},
$S:23}
B.aAQ.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hs(new B.Md("Failed to connect WebSocket"))
else this.b.aed(1006,"error")},
$S:23}
B.aAR.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cw("data")
if(typeof x==="string")w.b=new B.LF(A.bq(x))
else if(typeof x==="object"&&A.chJ(y.m.a(x),"ArrayBuffer"))w.b=new B.GY(A.TB(y.o.a(x),0,null))
else throw A.o(A.ak("unexpected message type: "+J.aG(x).k(0)))
v.E(0,w.bk())},
$S:24}
B.aAS.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cD(0,this.b)
this.b.aed(d.code,d.reason)},
$S:23}
B.awH.prototype={
$1(d){var x=d.b,w=this.a
new A.cI(x,A.y(x).i("cI<1>")).cL(new B.awE(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cI(x,A.y(x).i("cI<1>")).bkx(new B.awF(d),new B.awG(w,d))
w.f.dM(0)},
$S:z+8}
B.awE.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.LF
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.GY
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.Ho){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a9(0)}}},
$S:z+9}
B.awF.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ao(B.cat())
s=A.ca(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.aap(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.aap(new Uint8Array(A.bU(u)))
break $label1$1}t=A.aT("Cannot send "+J.aG(d).k(0))
throw A.o(t)}}catch(r){if(!(A.Q(r) instanceof B.Mc))throw r}},
$S:18}
B.awG.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.yU(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.Q(q) instanceof B.Mc))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.awI.prototype={
$1(d){var x,w=d instanceof A.Xj?d:new B.ahM(J.n(d)),v=this.a
v.f.hs(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.i_(w)
v=v.a
v===$&&A.d()
v.a9(0)},
$S:33};(function aliases(){var x=B.HY.prototype
x.aAf=x.a9
x=B.a4V.prototype
x.aE1=x.m})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.ZZ.prototype,"gaG8","Gq",0)
var v
w(v=B.ZY.prototype,"gamX","amY",2)
x(v,"gajX","IP",0)
x(v,"gakh","aki",1)
x(v,"gad_","Pr",0)
x(v,"gacZ","Pq",0)
x(v,"gacY","Pn",0)
x(v,"ganZ","ba6",1)
x(v,"gajq","b_Y",1)
w(v=B.a7P.prototype,"gb2O","b2P",6)
x(v,"gb1g","a2A",1)
x(B.UJ.prototype,"gea","m",0)
x(B.UM.prototype,"gb_5","b_6",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.a9,[B.HY,B.ayz,B.Le,B.a83,B.b1z,B.a7P,B.abH,B.aXh,B.Ta,B.Jw,B.aRS,B.UG,B.UH,B.aXs,B.agr,B.a_S,B.agq,B.B8,B.va,B.Md,B.ahM,B.Km,B.Ef,B.UI,B.UK])
v(B.Wk,A.fX)
w(A.ka,[B.b2a,B.c3F,B.brm,B.brj,B.brk,B.brg,B.brh,B.bri,B.brd,B.bre,B.brl,B.br_,B.bqY,B.br0,B.br1,B.bqX,B.bqH,B.bqI,B.bqK,B.bqG,B.bqL,B.bqM,B.bqF,B.bqU,B.bqV,B.bqE,B.bqD,B.bqC,B.bqR,B.bqS,B.aCi,B.aRV,B.aRW,B.aXy,B.aXA,B.aKU,B.aKT,B.awG])
w(A.jD,[B.b2b,B.c3G,B.ayA,B.brn,B.brf,B.bqZ,B.br2,B.br3,B.br4,B.bqJ,B.bqN,B.bqO,B.bqP,B.br6,B.br7,B.br8,B.br9,B.bra,B.brb,B.bqW,B.br5,B.bqQ,B.bqT,B.b1A,B.b1B,B.b1C,B.aCh,B.c4G,B.aS9,B.aSa,B.aS6,B.aS7,B.aS8,B.aRX,B.aXk,B.aXl,B.aXm,B.aXn,B.aXo,B.aXp,B.aXq,B.aXr,B.aXj,B.c4P,B.aXx,B.aXt,B.aXu,B.aXv,B.aXw,B.bwl,B.aAP,B.aAQ,B.aAR,B.aAS,B.awH,B.awE,B.awF,B.awI])
w(A.S,[B.qE,B.qD,B.Nr,B.UL])
w(A.W,[B.ZZ,B.ZY,B.a4V,B.UM])
w(A.aw,[B.Yw,B.ajs,B.Yx,B.zL])
w(A.tt,[B.brc,B.bLA,B.aRU,B.aXz])
v(B.ao_,B.a4V)
v(B.aXi,B.aXh)
v(B.ui,B.Ta)
v(B.ac9,B.Jw)
v(B.aRT,B.aRS)
v(B.ae2,B.UG)
v(B.ae3,B.UH)
v(B.c9K,B.aXs)
v(B.UJ,A.dr)
w(B.agr,[B.aaj,B.awD])
w(B.va,[B.LF,B.GY,B.Ho])
v(B.Mc,B.Md)
v(B.atb,B.HY)
w(A.MK,[B.yQ,B.UF,B.yP,B.ob,B.ae4])
x(B.a4V,A.h7)})()
A.oE(b.typeUniverse,JSON.parse('{"HY":{"e2":["1"]},"Wk":{"fX":["1","2"],"fX.S":"1","fX.T":"2"},"Nr":{"S":[],"q":[]},"qE":{"S":[],"q":[]},"ZZ":{"W":["qE"]},"Yw":{"aw":[],"q":[]},"qD":{"S":[],"q":[]},"ZY":{"W":["qD"]},"ajs":{"aw":[],"q":[]},"Yx":{"aw":[],"q":[]},"zL":{"aw":[],"q":[]},"ao_":{"W":["Nr"]},"ui":{"Ta":[]},"ac9":{"Jw":[]},"ae2":{"UG":[]},"ae3":{"UH":[]},"UJ":{"dr":["UK"],"b_":[]},"UL":{"S":[],"q":[]},"UM":{"W":["UL"]},"a_S":{"e2":["1"]},"B8":{"cas":[]},"LF":{"va":[]},"GY":{"va":[]},"Ho":{"va":[]},"Md":{"bO":[]},"Mc":{"bO":[]},"atb":{"e2":["@"]},"ahM":{"bO":[]}}'))
A.cm3(b.typeUniverse,JSON.parse('{"HY":1,"agr":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("B8"),L:x("bO"),_:x("av<@>"),x:x("av<~>"),S:x("H<af<p,T>>"),t:x("H<af<p,@>>"),Q:x("H<Jw>"),d:x("H<jm<@>>"),s:x("H<p>"),p:x("H<q>"),m:x("aC"),l:x("F<aC>"),F:x("F<af<p,@>>"),j:x("F<@>"),I:x("F<v>"),P:x("af<p,@>"),f:x("af<@,@>"),E:x("Ta"),G:x("Jw"),h:x("ui"),o:x("r_"),a:x("bv"),K:x("a9"),J:x("UG"),e:x("UH"),v:x("Ef"),Z:x("agq<a9?>"),N:x("p"),i:x("rB"),M:x("e_"),D:x("va"),U:x("Z<p>"),g:x("dR<Le>"),n:x("dR<~>"),V:x("bc<B8>"),r:x("bc<@>"),R:x("bc<~>"),k:x("a_8<aC>"),C:x("pY<aC>"),u:x("aB<B8>"),c:x("aB<@>"),W:x("aB<~>"),q:x("kC"),y:x("T"),z:x("@"),A:x("aC?"),X:x("a9?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.z2=new A.V(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.Yy=new B.a83(C.hV)
D.rl=new A.an(32,0,32,0)
D.a27=new A.an(8,20,8,20)
D.a2p=new A.d4(1,C.at,C.vz,null)
D.AY=new A.aq(57639,"MaterialIcons",null,!1)
D.a3x=new A.aq(58337,"MaterialIcons",null,!1)
D.a3y=new A.aq(58341,"MaterialIcons",null,!1)
D.B7=new A.aq(59048,"MaterialIcons",null,!1)
D.a3C=new A.aq(59049,"MaterialIcons",null,!1)
D.a3D=new A.aq(59077,"MaterialIcons",null,!1)
D.B2=new A.aq(58195,"MaterialIcons",null,!1)
D.a5x=new A.ac(D.B2,null,C.m,null,null)
D.a5w=new A.ac(D.B2,28,C.m,null,null)
D.a3B=new A.aq(58923,"MaterialIcons",null,!1)
D.a5M=new A.ac(D.a3B,null,C.m,null,null)
D.afa=A.a(x([1,2,4,8,16]),A.ay("H<v>"))
D.akG=A.a(x([]),y.Q)
D.Jr=new A.fV("FlutterWebRTC.Method",C.bh,null)
D.auA=new B.ob(0,"RTCIceConnectionStateNew")
D.auB=new B.ob(1,"RTCIceConnectionStateChecking")
D.auC=new B.ob(2,"RTCIceConnectionStateCompleted")
D.auD=new B.ob(3,"RTCIceConnectionStateConnected")
D.auE=new B.ob(4,"RTCIceConnectionStateCount")
D.O0=new B.ob(5,"RTCIceConnectionStateFailed")
D.auF=new B.ob(6,"RTCIceConnectionStateDisconnected")
D.O1=new B.ob(7,"RTCIceConnectionStateClosed")
D.O2=new B.UF(0,"RTCIceGatheringStateNew")
D.auG=new B.UF(1,"RTCIceGatheringStateGathering")
D.auH=new B.UF(2,"RTCIceGatheringStateComplete")
D.uH=new B.yP(0,"RTCPeerConnectionStateClosed")
D.O3=new B.yP(1,"RTCPeerConnectionStateFailed")
D.O4=new B.yP(2,"RTCPeerConnectionStateDisconnected")
D.O5=new B.yP(3,"RTCPeerConnectionStateNew")
D.O6=new B.yP(4,"RTCPeerConnectionStateConnecting")
D.O7=new B.yP(5,"RTCPeerConnectionStateConnected")
D.auI=new B.yQ(0,"RTCSignalingStateStable")
D.auJ=new B.yQ(1,"RTCSignalingStateHaveLocalOffer")
D.auK=new B.yQ(2,"RTCSignalingStateHaveRemoteOffer")
D.auL=new B.yQ(3,"RTCSignalingStateHaveLocalPrAnswer")
D.auM=new B.yQ(4,"RTCSignalingStateHaveRemotePrAnswer")
D.O8=new B.yQ(5,"RTCSignalingStateClosed")
D.auN=new B.UK(0,0,0)
D.uI=new B.ae4(0,"RTCVideoViewObjectFitContain")
D.O9=new B.ae4(1,"RTCVideoViewObjectFitCover")
D.ayp=new A.ck(48,null,null,null)
D.ayC=new A.ck(null,64,null,null)
D.aBC=new A.C(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aBQ=new A.C(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.w_=new A.C(!0,C.ai,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.cbs=null
$.cl7=!1
$.cje=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cYE","cd_",()=>new B.aXi())
x($,"cVg","ccL",()=>C.d.q(A.ax(A.ax(A.ax(A.ccp(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"nN59ehBT81U/NvWnapmg3pJx27o=");