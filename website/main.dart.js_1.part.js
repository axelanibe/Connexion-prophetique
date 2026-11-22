((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={HY:function HY(){},Wj:function Wj(d){this.$ti=d},b28:function b28(d){this.a=d},b29:function b29(d,e){this.a=d
this.b=e},
cor(d){var x
B.c1Q()
if(d.length===0)return
x=A.bS(new B.c3A(d))
self.window.addEventListener("beforeunload",x)
$.cbk=new B.c3z(x)},
c1Q(){var x=$.cbk
if(x!=null)x.$0()
$.cbk=null},
c3A:function c3A(d){this.a=d},
c3z:function c3z(d){this.a=d},
a6p(d){var x,w,v,u,t=new B.ayy(),s=J.P(d),r=s.h(d,"id")
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
return new B.ayx(r,x,w,v,u)},
c9Q(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
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
cxU(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Yz
x=A.a([],y.t)
for(r=J.at(q),w=y.f,v=y.P,u=y.N,t=y.z;r.C();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mA(s,u,t))}return new B.a81(x)},
c3v(d){var x=C.c.ad(d.a,1e6)
return C.d.b1(C.c.k(C.c.ad(x,60)),2,"0")+":"+C.d.b1(C.c.k(C.c.a5(x,60)),2,"0")},
cpf(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.q6(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.ap7(w,v)},
cOt(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.apa(u,A.hZ(w)?w:null,v)},
ayx:function ayx(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
ayy:function ayy(){},
Le:function Le(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a81:function a81(d){this.a=d},
cgp(d,e,f,g,h,i,j){return new B.qD(f,g,j,i,e,d,null)},
c87(d,e,f,g,h,i,j,k,l){return new B.qC(f,l,h,k,d,i,j,e,g,null)},
cle(d,e,f,g,h,i,j,k,l,m,n){return new B.ajq(g,f,e,i,h,d,m,l,k,j,n,null)},
qD:function qD(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
ZY:function ZY(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
brg:function brg(d){this.a=d},
brh:function brh(d){this.a=d},
brd:function brd(d){this.a=d},
bre:function bre(d){this.a=d},
bra:function bra(d){this.a=d},
brb:function brb(d){this.a=d},
brc:function brc(d){this.a=d},
br7:function br7(d){this.a=d},
br8:function br8(d){this.a=d},
br9:function br9(d){this.a=d},
brf:function brf(d){this.a=d},
Yv:function Yv(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qC:function qC(d,e,f,g,h,i,j,k,l,m){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.Q=l
_.a=m},
ZX:function ZX(d,e){var _=this
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
bqT:function bqT(d){this.a=d},
bqU:function bqU(d){this.a=d},
bqS:function bqS(d){this.a=d},
bqV:function bqV(d){this.a=d},
bqW:function bqW(){},
bqX:function bqX(d){this.a=d},
bqR:function bqR(d,e){this.a=d
this.b=e},
bqY:function bqY(){},
bqZ:function bqZ(d){this.a=d},
bqF:function bqF(d){this.a=d},
bqG:function bqG(d){this.a=d},
bqH:function bqH(d){this.a=d},
bqI:function bqI(d){this.a=d},
bqE:function bqE(d){this.a=d},
bqJ:function bqJ(d){this.a=d},
bqK:function bqK(d){this.a=d},
bqL:function bqL(d){this.a=d},
bqD:function bqD(d,e){this.a=d
this.b=e},
bqM:function bqM(){},
bqN:function bqN(d){this.a=d},
br0:function br0(d){this.a=d},
br1:function br1(d){this.a=d},
br2:function br2(d){this.a=d},
br3:function br3(d){this.a=d},
br4:function br4(d){this.a=d},
br5:function br5(d){this.a=d},
bqO:function bqO(d,e){this.a=d
this.b=e},
bqP:function bqP(d){this.a=d},
bqQ:function bqQ(d){this.a=d},
br_:function br_(){},
bqC:function bqC(d,e){this.a=d
this.b=e},
bqB:function bqB(d,e){this.a=d
this.b=e},
bqA:function bqA(d,e){this.a=d
this.b=e},
br6:function br6(d){this.a=d},
ajq:function ajq(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
Yw:function Yw(d,e){this.c=d
this.a=e},
zL:function zL(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
b1x:function b1x(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b1y:function b1y(d){this.a=d},
b1z:function b1z(d){this.a=d},
b1A:function b1A(d){this.a=d},
a7N:function a7N(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aCf:function aCf(d){this.a=d},
aCg:function aCg(d){this.a=d},
avo(d){var x=y.U,w=A.I(new A.Z(A.a(d.split(" "),y.s),new B.c4z(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gS(w),0).toUpperCase()
return(J.m(C.b.gS(w),0)+J.m(C.b.gaW(w),0)).toUpperCase()},
c4z:function c4z(){},
abF:function abF(){this.a=null},
aXg:function aXg(){},
uh:function uh(d,e){this.e=d
this.b=e},
aS7:function aS7(d){this.a=d},
aS8:function aS8(d){this.a=d},
c8V(d){var x=new B.ac7(d)
x.aFb(d)
return x},
ac7:function ac7(d){this.d=d},
aS4:function aS4(d){this.a=d},
aS5:function aS5(d){this.a=d},
aS6:function aS6(d){this.a=d},
aRR:function aRR(){},
aRT:function aRT(){},
aRU:function aRU(){},
aRV:function aRV(d){this.a=d},
aRS:function aRS(d){this.a=d},
cE_(d,e){var x=y.N
x=new B.ae0(d,e,A.D(x,y.E),A.D(x,y.z))
x.aFk(d,e)
return x},
ae0:function ae0(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aXi:function aXi(d){this.a=d},
aXj:function aXj(d){this.a=d},
aXk:function aXk(d){this.a=d},
aXl:function aXl(d){this.a=d},
aXm:function aXm(d){this.a=d},
aXn:function aXn(d){this.a=d},
aXo:function aXo(d){this.a=d},
aXp:function aXp(d){this.a=d},
aXh:function aXh(d){this.a=d},
ae1:function ae1(){},
c9C:function c9C(d){this.a=d},
cQQ(){return C.b.nF(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.c4I())!==-1},
c4I:function c4I(){},
cj6(){var x=A.a([],y.d),w=$.cj7
$.cj7=w+1
return new B.UI(w,x,D.auN,$.ai())},
UI:function UI(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aXv:function aXv(d){this.a=d},
aXr:function aXr(d){this.a=d},
aXs:function aXs(d){this.a=d},
aXt:function aXt(d){this.a=d},
aXu:function aXu(){},
c9D(d,e,f){return new B.UK(d,f,e,null)},
UK:function UK(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
UL:function UL(){this.c=this.a=null},
aXw:function aXw(){},
aXy:function aXy(d){this.a=d},
aXx:function aXx(d){this.a=d},
ch2(d,e,f,g){var x,w={}
w.a=d
x=new B.aah(g.i("aah<0>"))
x.aET(e,f,w,g)
return x},
aah:function aah(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aKS:function aKS(d,e){this.a=d
this.b=e},
aKR:function aKR(d){this.a=d},
a_R:function a_R(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bwf:function bwf(){},
ago:function ago(d){this.b=this.a=$
this.$ti=d},
agp:function agp(){},
c7t(d,e){return B.cx4(d,e)},
cx4(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$c7t=A.f(function(f,g){if(f===1)return A.h(g,w)
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
else new A.pX(r,"open",!1,y.C).gS(0).aI(new B.aAN(p,q),y.H)
t=y.C
s=y.H
new A.pX(r,"error",!1,t).gS(0).aI(new B.aAO(p,q),s)
A.iE(r,"message",new B.aAP(q),!1,y.m)
new A.pX(r,"close",!1,t).gS(0).aI(new B.aAQ(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$c7t,w)},
B8:function B8(d,e){this.a=d
this.b=e},
aAN:function aAN(d,e){this.a=d
this.b=e},
aAO:function aAO(d,e){this.a=d
this.b=e},
aAP:function aAP(d){this.a=d},
aAQ:function aAQ(d,e){this.a=d
this.b=e},
cal(){return new B.Mc("Connection Closed")},
va:function va(){},
LF:function LF(d){this.a=d},
GY:function GY(d){this.a=d},
Ho:function Ho(d,e){this.a=d
this.b=e},
Md:function Md(d){this.a=d},
Mc:function Mc(d){this.a=d},
cwx(d){var x=null,w=$.aI,v=new B.ago(y.Z),u=y.X,t=A.fW(x,x,x,!0,u),s=A.fW(x,x,x,!0,u),r=A.y(s),q=A.y(t)
v.a=B.ch2(new A.cI(s,r.i("cI<1>")),new A.Ga(t,q.i("Ga<1>")),!0,u)
v.b=B.ch2(new A.cI(t,q.i("cI<1>")),new A.Ga(s,r.i("Ga<1>")),!1,u)
v=new B.awB(new A.bc(new A.aB(w,y.W),y.R),v)
v.aEC(d)
return v},
awB:function awB(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
awF:function awF(d){this.a=d},
awC:function awC(d){this.a=d},
awD:function awD(d){this.a=d},
awE:function awE(d,e){this.a=d
this.b=e},
awG:function awG(d){this.a=d},
at8:function at8(d,e){this.b=d
this.a=e},
ahK:function ahK(d){this.a=d},
cQp(d){switch(d){case"new":return D.auA
case"checking":return D.auB
case"connected":return D.auD
case"completed":return D.auC
case"failed":return D.NY
case"disconnected":return D.auF
case"closed":return D.NZ
case"count":return D.auE}return D.NZ},
cQq(d){switch(d){case"new":return D.O_
case"gathering":return D.auG
case"complete":return D.auH}return D.O_},
cSz(d){switch(d){case"stable":return D.auI
case"have-local-offer":return D.auJ
case"have-local-pranswer":return D.auL
case"have-remote-offer":return D.auK
case"have-remote-pranswer":return D.auM
case"closed":return D.O5}return D.O5},
cRK(d){switch(d){case"new":return D.O2
case"connecting":return D.O3
case"connected":return D.O4
case"closed":return D.uG
case"disconnected":return D.O1
case"failed":return D.O0}return D.uG},
yQ:function yQ(d,e){this.a=d
this.b=e},
UE:function UE(d,e){this.a=d
this.b=e},
yP:function yP(d,e){this.a=d
this.b=e},
ob:function ob(d,e){this.a=d
this.b=e},
ae2:function ae2(d,e){this.a=d
this.b=e},
aXf:function aXf(){},
T9:function T9(){},
Jw:function Jw(){},
aRQ:function aRQ(){},
Km:function Km(d,e,f){this.a=d
this.b=e
this.c=f},
UF:function UF(){},
UG:function UG(){},
aXq:function aXq(){},
Ef:function Ef(d,e){this.a=d
this.b=e},
UH:function UH(d){this.b=d},
UJ:function UJ(d,e,f){this.a=d
this.b=e
this.c=f},
c8x(d){var x=0,w=A.k(y.y)
var $async$c8x=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.o("The is not a video track => "+d.k(0))
throw A.o("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$c8x,w)},
acv(d){var x=0,w=A.k(y.H),v
var $async$acv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b73("enableSpeakerphone",A.a5(["enable",d],y.N,v),v,v),$async$acv)
case 2:return A.i(null,w)}})
return A.j($async$acv,w)},
aU7(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aU7=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mA(y.f.a(A.c3j(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.U1(0,u),$async$aU7)
case 5:case 4:v=A.cX(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aU7,w)},
b73(d,e,f,g){return B.cHy(d,e,f,g,f.i("0?"))},
cHy(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b73=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b72(),$async$b73)
case 3:v=D.Jo.cl(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b73,w)},
b72(){var x=0,w=A.k(y.H),v,u
var $async$b72=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.cl_?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Jo.cl("initialize",A.a5(["options",A.D(v,u)],v,u),!1,y.H),$async$b72)
case 4:$.cl_=!0
case 3:return A.i(null,w)}})
return A.j($async$b72,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[28]
E=c[18]
B.HY.prototype={
E(d,e){this.a.E(0,e)},
dw(d,e){this.a.dw(d,e)},
a9(d){return this.a.a9(0)},
$ie2:1}
B.Wj.prototype={
hB(d){var x=A.cw("subscription"),w=A.fW(new B.b28(x),null,null,!0,this.$ti.y[1])
x.b=d.fD(new B.b29(this,w),w.gnz(w),w.gpn())
return new A.cI(w,A.y(w).i("cI<1>"))}}
B.ayx.prototype={}
B.Le.prototype={}
B.a81.prototype={}
B.qD.prototype={
P(){return new B.ZY()}}
B.ZY.prototype={
T(){var x,w,v=this
v.X()
x=v.a
x.toString
v.z=!0
w=new B.abF()
v.y!==$&&A.aJ()
v.y=w
if(!x.y)w.tX(A.Bl(C.l_,$.vL().a).c)
v.Pg()
v.r=A.du(C.c6,new B.brg(v))
v.w=A.hl(C.zL,new B.brh(v))},
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
a2L(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.du(C.fI,new B.brd(this))},
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
q=B.a6p(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.l(new B.bre(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
p=s.y
p===$&&A.d()
p.ik()
s.a2L()}u=2
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
q=B.a6p(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gwD()
p=m
if(q.w!=="sonne"||q.c===p){s.l(new B.bra(s))
o=s.y
o===$&&A.d()
o.ik()
s.a2L()
x=1
break}s.l(new B.brb(s))
if(s.a.y)s.Gq()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.l(new B.brc(s))
o=s.y
o===$&&A.d()
o.ik()
s.a2L()
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
s.l(new B.br7(s))
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
break}s.l(new B.br8(s))
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
A.a6(q,!1).A9(A.e9(new B.br9(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gq,w)},
IV(d){return this.b31(d)},
b30(){return this.IV(!1)},
b31(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
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
if(r!=null)A.a6(r,!1).bN()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IV,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.k9(C.t,s,A.c(B.avo(r.d),s,s,s,s,D.Qq,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.Qn,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.a_(D.A8,x,s),C.l,A.c(q,s,s,s,s,D.vY,s,s,s),D.PD],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.brf(t)
v=A.b("Accepter")
u=t.f?s:t.gaG3()
q.push(A.U(A.a([new B.Yv(D.AX,C.aF,r,x,s),D.ayp,new B.Yv(C.nr,C.cR,v,u,s)],w),C.n,C.bx,C.i,s))}if(t.d)q.push(C.yq)
return A.eg(s,C.o,A.fy(!0,A.cF(A.J(q,C.n,C.f,C.R),s,s),!0,C.a1,!0,!0),s,s,s)}}
B.Yv.prototype={
D(d){var x=this,w=null,v=A.di(x.d,w,w,C.a1,C.cE,w)
return A.J(A.a([A.ad(A.bb(!1,A.c_(x.c,C.m,w,32),C.j,w,C.p,w,w,w,w,x.f,w,v),72,72),C.l,A.c(x.e,w,w,w,w,C.ei,w,w,w)],y.p),C.n,C.f,C.R)}}
B.qC.prototype={
P(){return new B.ZX(A.b4(y.N),C.Q)}}
B.ZX.prototype={
T(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.X()
x=o.a
o.r=x.c
x=x.w
if(x==null)x=new B.b1x(B.cj6(),B.cj6())
o.d!==$&&A.aJ()
o.d=x
w=o.a
v=w.x
if(v==null)v=new B.a7N(new A.dR(n,n,y.g),new A.dR(n,n,y.n))
o.e!==$&&A.aJ()
o.e=v
o.fr=!0
u=new B.abF()
o.dy!==$&&A.aJ()
o.dy=u
t=w.w
if(t!=null){s=$.kM()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.kM()
s=o.r
r=w.e
p=w.d
t.bfd(s,r,x,v,w.f,p)
x=o.a
if(x.Q)t.as=!0
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
if(!(w.r&&w.a===x.r&&!x.y)){B.c1Q()
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
s.ch=new A.au(n,0,!1).eh(m)}B.cor(s.r)
u=4
s.a.toString
x=7
return A.e(o.bW("/messagerie/appels/"+s.r+"/signaux"),$async$SC)
case 7:r=e
for(o=J.at(r),n=s.f;o.C();){q=o.gJ(o)
p=B.c9Q(q)
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
n.f=new B.bqT(s)
n.r=new B.bqU(s)
n.w=new B.bqV(s)
s.z=!0
if(o)s.l(new B.bqW())
s.cy=A.hl(C.ci,new B.bqX(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.c4(n,A.y(n).i("c4<1>")).cL(s.gamU())
o=o.w
s.dx=new A.c4(o,A.y(o).i("c4<1>")).cL(new B.bqY())
s.CW=A.hl(C.fI,new B.bqZ(s))
s.xZ()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$SC,w)},
rU(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$rU=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:s.cx=A.du(C.c6,new B.bqF(s))
r="appel"
u=4
q=null
h=s.a
g=h.y
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$rU)
case 10:q=a2
h=s.r=B.a6p(q).a
x=8
break
case 9:g=$.a1()
x=11
return A.e(g.E0(h.c),$async$rU)
case 11:q=a2
h=s.r=s.a.c
case 8:g=$.kM()
g.bf_(h)
B.cor(s.r)
if(s.a.f)g.UV()
p=B.a6p(q)
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
l=B.cxU(m)
x=15
return A.e(n,$async$rU)
case 15:x=!a2?13:14
break
case 13:if(s.c==null){x=1
break}s.l(new B.bqG(s))
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
return A.e(f.A7(A.a5(["iceServers",l.a],y.N,y.z),e==="video"),$async$rU)
case 17:f.f=new B.bqH(s)
f.r=new B.bqI(s)
f.w=new B.bqJ(s)
if(s.c==null){x=1
break}s.l(new B.bqK(s))
g.bl_()
s.cy=A.hl(C.ci,new B.bqL(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.c4(f,A.y(f).i("c4<1>")).cL(s.gamU())
f=g.w
s.dx=new A.c4(f,A.y(f).i("c4<1>")).cL(new B.bqM())
s.a.toString
k=h.b
if(k!=null&&J.a7(k)!==0){s.a.toString
g.Us(C.d.XY("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eh(C.bN,k,C.a8,!0))}s.CW=A.hl(C.fI,new B.bqN(s))
s.xZ()
u=2
x=6
break
case 4:u=3
a0=t
j=A.Q(a0)
i=A.bo(a0)
if(s.c==null){x=1
break}A.t2().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.dp?j.a:s.aYi(r)
h.t(y.q).f.A(A.z(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.k,null,null,null,null,null,null,null,null,null))
s.mw(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$rU,w)},
aYi(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
ID(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$ID=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a_o(),$async$ID)
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
a_o(){var x=0,w=A.k(y.y),v
var $async$a_o=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a_o,w)},
xZ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$xZ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.a1()
x=7
return A.e(p.bW("/messagerie/appels/"+s.r+"/signaux"),$async$xZ)
case 7:r=e
for(p=J.at(r);p.C();){q=p.gJ(p)
s.amV(B.c9Q(q))}u=2
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
amV(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cpf(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.Dv(A.a5(["sdp",v.a,"type",v.b],y.N,y.z)).aI(new B.br0(s),y.a).fz(new B.br1(s))
break
case"reponse":if(!s.a.f)return
u=B.cpf(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.U0(A.a5(["sdp",u.a,"type",u.b],y.N,y.z)).aI(new B.br2(s),y.a).fz(new B.br3(s))
break
case"candidat_ice":t=B.cOt(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.TW(A.a5(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.KL().aI(new B.br4(s),y.a).fz(new B.br5(s))
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
u.l(new B.bqO(u,!1))
t=$.kM()
t.bmR()
s=u.Q
t.a7Q(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$Sa,w)},
xS(d,e,f){return this.aOQ(d,e,f)},
afJ(d,e){return this.xS(d,e,!0)},
aOQ(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$xS=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.a1()
x=6
return A.e(s.aqX(t.r,e,d),$async$xS)
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
case 6:B.c1Q()
$.kM().N9()
r=s.c
if(r!=null)A.a6(r,!1).bN()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IP,w)},
b2V(){var x=this
if(!x.x||x.y)return
$.kM().bo9()
x.l(new B.bqP(x))
$.aO.aD$.push(new B.bqQ(x))},
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
w.L8(x,"termine").fz(new B.br_())}if(d!=null&&v.c!=null)v.c.t(y.q).f.A(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.k,u,u,u,u,u,u,u,u,u))
B.c1Q()
$.kM().N9()
x=v.c
if(x!=null)A.a6(x,!1).bN()},
Pr(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Pr=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Zg(u),$async$Pr)
case 2:if(v.c!=null)v.l(new B.bqC(v,u))
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
case 2:if(v.c!=null)v.l(new B.bqB(v,u))
$.kM().a7Q(u,v.Q)
return A.i(null,w)}})
return A.j($async$Pq,w)},
Pn(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Pn=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.Zd(u),$async$Pn)
case 2:if(v.c!=null)v.l(new B.bqA(v,u))
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
D(d){var x,w,v,u,t,s,r,q,p,o=this,n=null,m="Appel en cours\u2026",l="\xc7a sonne\u2026",k="Connexion\u2026",j=o.d
j===$&&A.d()
x=j.c
w=o.go
v=o.a
if(v.d==="video"&&o.z){if(x!=null)x=B.c9D(j.e,!1,D.O6)
else{x=A.k9(C.t,n,A.c(B.avo(v.e),n,n,n,n,D.aBP,n,n,n),n,48)
v=o.a
u=A.c(v.e,n,n,n,n,D.aBC,n,n,n)
if(o.x)v=A.b(m)+" "+B.c3v(o.ch)
else v=v.f&&o.z?A.b(l):A.b(k)
v=A.cF(A.J(A.a([x,C.q,u,C.l,A.c(v,n,n,n,n,D.vY,n,n,n)],y.p),C.n,C.f,C.R),n,n)
x=v}j=A.a([A.E8(0,x),A.fd(n,A.eO(A.M(12),B.c9D(j.d,!0,D.O6),C.ap),160,n,n,16,16,110)],y.p)
if(o.x)j.push(A.fd(n,new B.Yw(o.gakg(),n),n,n,16,n,16,n))
x=o.x
v=B.c3v(o.ch)
u=o.Q
t=o.as
j.push(A.fd(24,B.cle(o.ax,v,x,!0,t,u,o.gacY(),o.gacX(),o.gacZ(),o.gad_(),o.gajW()),n,n,0,0,n,n))
j=A.eo(C.aT,j,C.h,C.aP,n)}else{x=y.p
v=A.a([],x)
if(o.fy)v.push(A.fd(n,A.ul(B.c9D(j.e,!1,D.uH),0),1,n,0,n,0,1))
if(o.x)v.push(A.fd(n,new B.Yw(o.gakg(),n),n,n,16,n,16,n))
j=A.k9(C.t,n,A.c(B.avo(o.a.e),n,n,n,n,D.Qq,n,n,n),n,56)
u=o.a
t=A.c(u.e,n,n,n,n,D.Qn,C.X,n,n)
s=o.fx
if(s==null)if(o.x)u=A.b(m)+" "+B.c3v(o.ch)
else if(o.z)u=u.f?A.b(l):A.b(m)
else u=A.b(k)
else u=s
u=A.c(u,n,n,n,n,D.vY,C.X,n,n)
s=o.x
r=B.c3v(o.ch)
q=o.Q
p=o.as
v.push(A.cF(A.J(A.a([j,C.aw,new A.a_(D.A8,t,n),C.l,u,D.PD,B.cle(o.ax,r,s,!1,p,q,o.gacY(),o.gacX(),o.gacZ(),o.gad_(),o.gajW())],x),C.n,C.f,C.R),n,n))
v=A.eo(C.aT,v,C.h,C.aP,n)
j=v}return A.c9m(w,A.eg(n,C.o,A.fy(!0,j,!0,C.a1,!0,!0),n,n,n),new B.br6(o),y.K)}}
B.ajq.prototype={
D(d){var x,w,v=this,u=null,t=y.p,s=A.a([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Qy,u,u,u))
if(r&&v.c)s.push(C.q)
r=v.f
x=r?D.a3z:D.a3y
t=A.a([new B.zL(x,r,A.b("Muet"),v.x,u,u),D.oT,new B.zL(D.a3F,v.r,A.b("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.oT)
if(r){x=v.w
w=x?D.B4:D.a3E
t.push(new B.zL(w,!x,A.b("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.oT)
if(r)t.push(new B.zL(D.a3D,!1,A.b("Basculer"),v.Q,u,u))
t.push(D.oT)
t.push(new B.zL(D.AX,!1,A.b("Raccrocher"),v.as,C.aF,u))
s.push(A.U(t,C.n,C.bx,C.i,u))
return A.J(s,C.n,C.f,C.R)}}
B.Yw.prototype={
D(d){var x=null
return A.J(A.a([A.ad(A.bb(!1,D.a5y,C.j,x,C.p,x,x,x,x,this.c,x,A.di(C.kr,x,x,C.a1,C.cE,x)),48,48),C.J,A.c(A.b("R\xe9duire"),x,x,x,x,C.w0,x,x,x)],y.p),C.n,C.f,C.R)}}
B.zL.prototype={
D(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.m:C.kr
if(!t)x=C.m
else x=w.d?C.o:C.m
t=A.di(u,v,v,C.a1,C.cE,v)
return A.J(A.a([A.ad(A.bb(!1,A.c_(w.c,x,v,26),C.j,v,C.p,v,v,v,v,w.f,v,t),56,56),C.aV,A.c(w.e,v,v,v,v,C.w0,v,v,v)],y.p),C.n,C.f,C.R)}}
B.b1x.prototype={
EK(d){return this.bmG(d)},
bmG(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$EK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jq(0),$async$EK)
case 3:$.ccT()
s=y.N
r=A.a5(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aRR().FM(0,A.a5(["audio",r,"video",d&&A.a5(["facingMode","user"],s,s)],s,y.z)),$async$EK)
case 4:q=f
u.b=q
t.saaV(0,q)
case 1:return A.i(v,w)}})
return A.j($async$EK,w)},
A7(d,e){return this.bnr(d,e)},
bnr(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
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
return A.e($.ccT().a5M(d,A.D(y.N,y.z)),$async$A7)
case 6:t=v.a=g
s=u.aa6(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a4C(0,s[q],u),$async$A7)
case 10:case 8:s.length===r||(0,A.R)(s),++q
x=7
break
case 9:t.e=new B.b1y(v)
t.Q=new B.b1z(v)
t.d=new B.b1A(v)
return A.i(null,w)}})
return A.j($async$A7,w)},
aMR(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.saaV(0,d)
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
return A.e(B.aU7(n,s),$async$GD)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.Q(l)
A.t2().$1("Appel : volume distant impossible : "+A.u(r))
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
case 4:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$KL,w)},
Dv(d){return this.bes(d)},
bes(d){var x=0,w=A.k(y.P),v,u=this,t,s
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
case 5:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Dv,w)},
U0(d){return this.bbj(d)},
bbj(d){var x=0,w=A.k(y.H),v=this,u
var $async$U0=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.o(A.ak("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.G1(0,new B.Ef(d.h(0,"sdp"),d.h(0,"type"))),$async$U0)
case 2:return A.i(null,w)}})
return A.j($async$U0,w)},
TW(d){return this.bb4(d)},
bb4(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$TW=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.TK(new B.Km(A.al(d.h(0,"candidate")),A.al(d.h(0,"sdpMid")),A.dT(d.h(0,"sdpMLineIndex")))),$async$TW)
case 3:case 1:return A.i(v,w)}})
return A.j($async$TW,w)},
Zg(d){return this.ayj(d)},
ayj(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Zg=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.NM(0)
if(r==null)r=C.dt
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.R)(r),++s)r[s].slH(0,t)
return A.i(null,w)}})
return A.j($async$Zg,w)},
FZ(d){return this.ay9(d)},
ay9(d){var x=0,w=A.k(y.H),v=this
var $async$FZ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.acv(d),$async$FZ)
case 2:x=3
return A.e(v.GD(),$async$FZ)
case 3:return A.i(null,w)}})
return A.j($async$FZ,w)},
Zd(d){return this.ay_(d)},
ay_(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Zd=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.NZ(0)
if(s==null)s=C.dt
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.R)(s),++t)s[t].slH(0,d)
return A.i(null,w)}})
return A.j($async$Zd,w)},
U7(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$U7=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.NZ(0)
if(s==null)s=D.akG
if(s.length===0){x=1
break}x=3
return A.e(B.c8x(C.b.gS(s)),$async$U7)
case 3:case 1:return A.i(v,w)}})
return A.j($async$U7,w)},
hi(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hi=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.acv(!1),$async$hi)
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
p=p==null?null:p.aa6(0)
if(p==null)p=C.dt
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cwr(r)
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
B.a7N.prototype={
Us(d){return this.bcJ(d)},
bcJ(d){var x=0,w=A.k(y.H),v=this
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
q=B.cwx(B.c7t(A.cC(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$GC)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cI(p,A.y(p).i("cI<1>")).b5(s.gb2I(),!0,s.gb1a(),new B.aCf(s))
u=2
x=6
break
case 4:u=3
n=t
s.a2z()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GC,w)},
b2J(d){var x,w,v,u
try{x=C.Z.cV(0,J.n(d),null)
v=y.P
if(!v.b(x))return
if(!J.t(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.c9Q(w))}catch(u){}},
a2z(){var x,w=this,v=w.c
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
w.d=A.du(A.dc(0,0,0,0,x),new B.aCg(w))},
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
r=s.w=new B.at8(s,q)}s=r.a9(0)}x=7
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
B.abF.prototype={
tX(d){return this.bkb(d)},
bkb(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$tX=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.B1():r).aT(0),$async$tX)
case 6:x=7
return A.e(t.a.Zc(d),$async$tX)
case 7:x=8
return A.e(t.a.jc(C.J5),$async$tX)
case 8:x=9
return A.e(t.a.i9(1),$async$tX)
case 9:x=10
return A.e(t.a.cT(0),$async$tX)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.Q(p)
A.t2().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
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
B.aXg.prototype={
a5M(d,e){return this.beh(d,e)},
beh(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a5M=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a5(["mandatory",A.D(r,r),"optional",A.a([A.a5(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fL(u,y.N,y.z)
t.u(0,d)
s=new r(y.m.a(A.ca(t)))
t=J.n(s)
v=B.cE_(C.cf.gki().bg(new A.eD(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5M,w)}}
B.uh.prototype={
NM(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.d3(w,A.X(w).i("d3<1,aC>"))
J.hr(w,new B.aS7(x))
return x},
NZ(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.d3(w,A.X(w).i("d3<1,aC>"))
J.hr(w,new B.aS8(x))
return x},
aa6(d){var x=A.I(this.NM(0),!0,y.G)
C.b.u(x,this.NZ(0))
return x}}
B.ac7.prototype={
aFb(d){var x=this,w=x.d
w.addEventListener("ended",A.bS(new B.aS4(x)))
w.addEventListener("mute",A.bS(new B.aS5(x)))
w.addEventListener("unmute",A.bS(new B.aS6(x)))},
slH(d,e){this.d.enabled=e},
U1(d,e){return this.bbm(0,e)},
bbm(d,e){var x=0,w=A.k(y.H),v=this
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
B.aRR.prototype={
FM(d,e){return this.ax5(0,e)},
ax5(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$FM=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cQQ())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.ja(e.h(0,"video"),"facingMode")
e.cP(0,"video",new B.aRT())
e.cP(0,"audio",new B.aRU())}catch(a0){A.oK("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hO(e.h(0,"audio"),i,i).aB(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.D(y.N,y.z)
J.hr(s,new B.aRV(r))
J.ja(e.h(0,"audio"),"optional")
J.jw(e.h(0,"audio"),r)}}catch(a0){q=A.Q(a0)
p=A.bo(a0)
A.oK("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.ca(e)
x=10
return A.e(A.ec(o.getUserMedia(h.a(n)),h),$async$FM)
case 10:m=a2
v=new B.uh(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.ec(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$FM)
case 11:l=a2
v=new B.uh(l,"local")
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
B.ae0.prototype={
aFk(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bS(new B.aXi(x)))
w.addEventListener("icecandidate",A.bS(new B.aXj(x)))
w.addEventListener("iceconnectionstatechange",A.bS(new B.aXk(x)))
w.onicegatheringstatechange=A.bS(new B.aXl(x))
w.addEventListener("signalingstatechange",A.bS(new B.aXm(x)))
if(!$.ccE())w.addEventListener("connectionstatechange",A.bS(new B.aXn(x)))
w.addEventListener("negotiationneeded",A.bS(new B.aXo(x)))
w.addEventListener("track",A.bS(new B.aXp(x)))},
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
G_(d,e){return this.ayd(0,e)},
ayd(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$G_=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.ec(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$G_)
case 2:return A.i(null,w)}})
return A.j($async$G_,w)},
G1(d,e){return this.ayt(0,e)},
ayt(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$G1=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.ec(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$G1)
case 2:return A.i(null,w)}})
return A.j($async$G1,w)},
TK(d){return this.baI(d)},
baI(d){var x=0,w=A.k(y.H),v=this,u,t
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
a4C(d,e,f){return this.baZ(0,e,f)},
baZ(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a4C=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.ae1()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a4C,w)}}
B.ae1.prototype={}
B.c9C.prototype={
aT(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.Q(r)
if(y.L.b(s)){u=s
s=u
J.n(s)
throw A.o("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aT,w)}}
B.UI.prototype={
satf(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Ls()
if(x!=null)x.style.objectFit=e},
an1(){var x=this,w=x.Ls(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.apZ(u,x.z!=null,0,t))},
saaV(d,e){var x,w,v,u,t=this
t.z=e
if(e.NZ(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.at(y.l.b(x)?x:new A.d3(x,A.X(x).i("d3<1,aC>")))
for(;x.C();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.NM(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.at(y.l.b(x)?x:new A.d3(x,A.X(x).i("d3<1,aC>")))
for(;x.C();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aOE()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Ls()
if(u!=null){u.srcObject=t.x
x=t.Ls()
x.toString
t.acL(x)}t.sp(0,t.a.bd6(t.z!=null))},
aOE(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
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
v=u.eT()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$m,w)},
jq(d){var x=0,w=A.k(y.H),v=this
var $async$jq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.GD()
$.qb().ua("RTCVideoRenderer-"+v.Q,new B.aXv(v),!0)
return A.i(null,w)}})
return A.j($async$jq,w)},
acL(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.UK.prototype={
P(){return new B.UL()}}
B.UL.prototype={
T(){var x,w,v=this
v.X()
v.a.c.ak(0,v.gb_0())
x=v.a
w=x.c
w.as=x.e
w.satf(0,x.d===D.uH?"contain":"cover")},
b_1(){if(this.c!=null)this.l(new B.aXw())},
m(){if(this.c!=null)this.a6()},
b0(d){var x,w
this.bi(d)
A.du(A.dc(0,0,10,0,0),new B.aXy(this))
x=this.a
w=x.c
w.satf(0,x.d===D.uH?"contain":"cover")},
D(d){return new A.iS(new B.aXx(this),null)}}
B.aah.prototype={
aET(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.aJ()
x.a=new B.a_R(d,x,new A.bc(new A.aB(w,y.c),y.r),e,g.i("a_R<0>"))
if(f.a.gj4())f.a=new B.Wj(g.i("@<0>").cb(g).i("Wj<1,2>")).hB(f.a)
w=A.fW(null,new B.aKS(f,x),null,!0,g)
x.b!==$&&A.aJ()
x.b=w},
ajg(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a9(0)}}
B.a_R.prototype={
E(d,e){if(this.e)throw A.o(A.ak("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dw(d,e){if(this.e)throw A.o(A.ak("Cannot add event after closing."))
if(this.d)return
this.aRq(d,e)},
hY(d){return this.dw(d,null)},
aRq(d,e){var x=this
if(x.w){x.a.a.dw(d,e)
return}x.c.hc(d,e)
x.ajh()
x.b.ajg()
x.a.a.a9(0).fz(new B.bwf())},
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
B.ago.prototype={}
B.agp.prototype={}
B.B8.prototype={
aed(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Ho(d,e))
x.a9(0)},
aao(d){var x
if((this.b.b&4)!==0)throw A.o(B.cal())
x=A.ca(d)
x.toString
this.a.send(x)},
yU(d,e,f){return this.bcs(0,e,f)},
bcs(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$yU=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.o(B.cal())
u.a9(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$yU,w)},
$icak:1}
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
B.awB.prototype={
aEC(d){d.fj(new B.awF(this),new B.awG(this),y.a)}}
B.at8.prototype={
a9(d){var x=this.b
x.e=x.d=null
return this.aAb(0)}}
B.ahK.prototype={
k(d){return"WebSocketChannelException: "+this.a},
$ibO:1}
B.yQ.prototype={
O(){return"RTCSignalingState."+this.b}}
B.UE.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.yP.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.ob.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.ae2.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.aXf.prototype={}
B.T9.prototype={}
B.Jw.prototype={
k(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aRQ.prototype={}
B.Km.prototype={}
B.UF.prototype={}
B.UG.prototype={}
B.aXq.prototype={}
B.Ef.prototype={}
B.UH.prototype={}
B.UJ.prototype={
apZ(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.UJ(x,w,v)},
bd6(d){return this.apZ(null,d,null,null)},
k(d){var x=this
return A.ab(x).k(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(Le)","bv(Km)","bv(UH)","bv(ob)","~(@)","uh(@)","bv(cak)","~(va)"])
B.b28.prototype={
$0(){return J.cvM(this.a.bk())},
$S:1}
B.b29.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.Q(v)
if(y.i.b(u)){x=u
w=A.bo(v)
this.b.dw(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c3A.prototype={
$1(d){var x,w,v,u=$.a1().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Z.e3(A.a5(["type","termine","contenu",A.D(v,y.z)],v,y.K),null),keepalive:!0})},
$S:23}
B.c3z.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.ayy.prototype={
$1(d){if(d==null)return null
return A.c1(J.n(d))},
$S:108}
B.brg.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.IV(!0)},
$S:0}
B.brh.prototype={
$1(d){return this.a.Tx()},
$S:29}
B.brd.prototype={
$0(){var x=this.a.c
if(x!=null)A.a6(x,!1).bN()},
$S:0}
B.bre.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bra.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.brb.prototype={
$0(){return this.a.d=!1},
$S:0}
B.brc.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.br7.prototype={
$0(){return this.a.f=!0},
$S:0}
B.br8.prototype={
$0(){return this.a.f=!1},
$S:0}
B.br9.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.c87(x.w,null,w,x.y,u,null,null,!1,v)},
$S:1182}
B.brf.prototype={
$0(){return this.a.b30()},
$S:0}
B.bqT.prototype={
$1(d){this.a.xS("candidat_ice",d,!1)},
$S:217}
B.bqU.prototype={
$0(){var x=this.a
if(x.c!=null)x.l(new B.bqS(x))},
$S:0}
B.bqS.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bqV.prototype={
$0(){this.a.mw(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bqW.prototype={
$0(){},
$S:0}
B.bqX.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.l(new B.bqR(x,w))},
$S:29}
B.bqR.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).eh(this.b)},
$S:0}
B.bqY.prototype={
$1(d){},
$S:123}
B.bqZ.prototype={
$1(d){this.a.xZ()},
$S:29}
B.bqF.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.xS("annule",C.c0,!1)
x.mw(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bqG.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bqH.prototype={
$1(d){this.a.xS("candidat_ice",d,!1)},
$S:217}
B.bqI.prototype={
$0(){var x=this.a
if(x.c!=null)x.l(new B.bqE(x))},
$S:0}
B.bqE.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bqJ.prototype={
$0(){this.a.mw(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bqK.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bqL.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.l(new B.bqD(x,w))},
$S:29}
B.bqD.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).eh(this.b)},
$S:0}
B.bqM.prototype={
$1(d){},
$S:123}
B.bqN.prototype={
$1(d){this.a.xZ()},
$S:29}
B.br0.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.Sa()
x.afJ("reponse",d)},
$S:402}
B.br1.prototype={
$1(d){this.a.mw(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.br2.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.Sa()},
$S:30}
B.br3.prototype={
$1(d){this.a.mw(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.br4.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.afJ("offre",d)},
$S:402}
B.br5.prototype={
$1(d){this.a.mw(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bqO.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.au(Date.now(),0,!1)
x.ch=C.Q},
$S:0}
B.bqP.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bqQ.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a6(x,!1).bN()},
$S:5}
B.br_.prototype={
$1(d){return A.D(y.N,y.z)},
$S:122}
B.bqC.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bqB.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bqA.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.br6.prototype={
$2(d,e){if(!d)this.a.IP()},
$S:1186}
B.b1y.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a5(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b1z.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aMR(w)},
$S:z+4}
B.b1A.prototype={
$1(d){var x
if(d===D.NY){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aCf.prototype={
$1(d){return this.a.a2z()},
$S:22}
B.aCg.prototype={
$0(){var x=this.a
if(!x.e)x.GC()},
$S:0}
B.c4z.prototype={
$1(d){return d.length!==0},
$S:8}
B.aS7.prototype={
$1(d){return this.a.push(B.c8V(d))},
$S:22}
B.aS8.prototype={
$1(d){return this.a.push(B.c8V(d))},
$S:22}
B.aS4.prototype={
$1(d){},
$S:24}
B.aS5.prototype={
$1(d){},
$S:24}
B.aS6.prototype={
$1(d){},
$S:24}
B.aRT.prototype={
$0(){return!1},
$S:52}
B.aRU.prototype={
$0(){return!1},
$S:52}
B.aRV.prototype={
$1(d){J.hr(d,new B.aRS(this.a))},
$S:217}
B.aRS.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:50}
B.aXi.prototype={
$1(d){},
$S:24}
B.aXj.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.Km(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:24}
B.aXk.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cQp(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.ccE())switch(w.cx.a){case 0:w.cy=D.O2
break
case 1:w.cy=D.O3
break
case 3:w.cy=D.O4
break
case 5:w.cy=D.O0
break
case 6:w.cy=D.O1
break
case 7:w.cy=D.uG
break
default:break}},
$S:33}
B.aXl.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cQq(w.iceGatheringState)},
$S:33}
B.aXm.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cSz(w.signalingState)},
$S:33}
B.aXn.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cRK(w.connectionState)},
$S:33}
B.aXo.prototype={
$1(d){},
$S:33}
B.aXp.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.c8V(d.track)
x=d.streams
x=y.l.b(x)?x:new A.d3(x,A.X(x).i("d3<1,aC>"))
w=J.dC(x,new B.aXh(w),y.h)
v.$1(new B.UH(A.I(w,!0,w.$ti.i("aD.E"))))}},
$S:24}
B.aXh.prototype={
$1(d){return new B.uh(d,this.a.as)},
$S:z+7}
B.c4I.prototype={
$1(d){return J.h2(self.window.navigator.userAgent,A.bG(d,!1,!1))},
$S:8}
B.aXv.prototype={
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
x.acL(t)
v=y.k.c
w.push(A.iE(t,"canplay",new B.aXr(x),!1,v))
w.push(A.iE(t,"resize",new B.aXs(x),!1,v))
w.push(A.iE(t,"error",new B.aXt(t),!1,v))
w.push(A.iE(t,"ended",new B.aXu(),!1,v))
return t},
$S:147}
B.aXr.prototype={
$1(d){this.a.an1()},
$S:22}
B.aXs.prototype={
$1(d){this.a.an1()},
$S:22}
B.aXt.prototype={
$1(d){var x,w,v=this.a.error
A.oK("RTCVideoRenderer: videoElement.onError, "+J.n(v))
v.toString
x=C.Jb.h(0,A.ax(v,"code"))
x.toString
w=!J.t(A.ax(v,"message"),"")?A.ax(v,"message"):"No further diagnostic information can be determined or provided."
throw A.o(A.o5(x,C.Ja.h(0,A.ax(v,"code")),w,null))},
$S:23}
B.aXu.prototype={
$1(d){},
$S:22}
B.aXw.prototype={
$0(){},
$S:0}
B.aXy.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aXx.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.aay("RTCVideoRenderer-"+w.Q)
else w=A.O(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cF(A.O(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1187}
B.aKS.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fD(w.gii(w),new B.aKR(v),w.gpn())},
$S:0}
B.aKR.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.ajh()
x=x.b
x===$&&A.d()
x.a9(0)},
$S:0}
B.bwf.prototype={
$1(d){},
$S:16}
B.aAN.prototype={
$1(d){this.a.cD(0,this.b)},
$S:24}
B.aAO.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hs(new B.Md("Failed to connect WebSocket"))
else this.b.aed(1006,"error")},
$S:24}
B.aAP.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cw("data")
if(typeof x==="string")w.b=new B.LF(A.bq(x))
else if(typeof x==="object"&&A.chC(y.m.a(x),"ArrayBuffer"))w.b=new B.GY(A.TA(y.o.a(x),0,null))
else throw A.o(A.ak("unexpected message type: "+J.aG(x).k(0)))
v.E(0,w.bk())},
$S:23}
B.aAQ.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cD(0,this.b)
this.b.aed(d.code,d.reason)},
$S:24}
B.awF.prototype={
$1(d){var x=d.b,w=this.a
new A.cI(x,A.y(x).i("cI<1>")).cL(new B.awC(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cI(x,A.y(x).i("cI<1>")).bkr(new B.awD(d),new B.awE(w,d))
w.f.dM(0)},
$S:z+8}
B.awC.prototype={
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
B.awD.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.an(B.cal())
s=A.ca(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.aao(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.aao(new Uint8Array(A.bU(u)))
break $label1$1}t=A.aT("Cannot send "+J.aG(d).k(0))
throw A.o(t)}}catch(r){if(!(A.Q(r) instanceof B.Mc))throw r}},
$S:18}
B.awE.prototype={
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
B.awG.prototype={
$1(d){var x,w=d instanceof A.Xi?d:new B.ahK(J.n(d)),v=this.a
v.f.hs(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.hY(w)
v=v.a
v===$&&A.d()
v.a9(0)},
$S:33};(function aliases(){var x=B.HY.prototype
x.aAb=x.a9})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.ZY.prototype,"gaG3","Gq",0)
var v
w(v=B.ZX.prototype,"gamU","amV",2)
x(v,"gajW","IP",0)
x(v,"gakg","b2V",1)
x(v,"gad_","Pr",0)
x(v,"gacZ","Pq",0)
x(v,"gacX","Pn",0)
x(v,"gacY","Po",0)
w(v=B.a7N.prototype,"gb2I","b2J",6)
x(v,"gb1a","a2z",1)
x(B.UI.prototype,"gea","m",0)
x(B.UL.prototype,"gb_0","b_1",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a9,[B.HY,B.ayx,B.Le,B.a81,B.b1x,B.a7N,B.abF,B.aXf,B.T9,B.Jw,B.aRQ,B.UF,B.UG,B.aXq,B.agp,B.a_R,B.ago,B.B8,B.va,B.Md,B.ahK,B.Km,B.Ef,B.UH,B.UJ])
w(B.Wj,A.fX)
x(A.ka,[B.b28,B.c3z,B.brg,B.brd,B.bre,B.bra,B.brb,B.brc,B.br7,B.br8,B.brf,B.bqU,B.bqS,B.bqV,B.bqW,B.bqR,B.bqF,B.bqG,B.bqI,B.bqE,B.bqJ,B.bqK,B.bqD,B.bqO,B.bqP,B.bqC,B.bqB,B.bqA,B.aCg,B.aRT,B.aRU,B.aXw,B.aXy,B.aKS,B.aKR,B.awE])
x(A.jC,[B.b29,B.c3A,B.ayy,B.brh,B.br9,B.bqT,B.bqX,B.bqY,B.bqZ,B.bqH,B.bqL,B.bqM,B.bqN,B.br0,B.br1,B.br2,B.br3,B.br4,B.br5,B.bqQ,B.br_,B.b1y,B.b1z,B.b1A,B.aCf,B.c4z,B.aS7,B.aS8,B.aS4,B.aS5,B.aS6,B.aRV,B.aXi,B.aXj,B.aXk,B.aXl,B.aXm,B.aXn,B.aXo,B.aXp,B.aXh,B.c4I,B.aXv,B.aXr,B.aXs,B.aXt,B.aXu,B.bwf,B.aAN,B.aAO,B.aAP,B.aAQ,B.awF,B.awC,B.awD,B.awG])
x(A.S,[B.qD,B.qC,B.UK])
x(A.W,[B.ZY,B.ZX,B.UL])
x(A.aw,[B.Yv,B.ajq,B.Yw,B.zL])
x(A.ts,[B.br6,B.aRS,B.aXx])
w(B.aXg,B.aXf)
w(B.uh,B.T9)
w(B.ac7,B.Jw)
w(B.aRR,B.aRQ)
w(B.ae0,B.UF)
w(B.ae1,B.UG)
w(B.c9C,B.aXq)
w(B.UI,A.dr)
x(B.agp,[B.aah,B.awB])
x(B.va,[B.LF,B.GY,B.Ho])
w(B.Mc,B.Md)
w(B.at8,B.HY)
x(A.MK,[B.yQ,B.UE,B.yP,B.ob,B.ae2])})()
A.oD(b.typeUniverse,JSON.parse('{"HY":{"e2":["1"]},"Wj":{"fX":["1","2"],"fX.S":"1","fX.T":"2"},"qD":{"S":[],"q":[]},"ZY":{"W":["qD"]},"Yv":{"aw":[],"q":[]},"qC":{"S":[],"q":[]},"ZX":{"W":["qC"]},"ajq":{"aw":[],"q":[]},"Yw":{"aw":[],"q":[]},"zL":{"aw":[],"q":[]},"uh":{"T9":[]},"ac7":{"Jw":[]},"ae0":{"UF":[]},"ae1":{"UG":[]},"UI":{"dr":["UJ"],"b_":[]},"UK":{"S":[],"q":[]},"UL":{"W":["UK"]},"a_R":{"e2":["1"]},"B8":{"cak":[]},"LF":{"va":[]},"GY":{"va":[]},"Ho":{"va":[]},"Md":{"bO":[]},"Mc":{"bO":[]},"at8":{"e2":["@"]},"ahK":{"bO":[]}}'))
A.clW(b.typeUniverse,JSON.parse('{"HY":1,"agp":1}'))
var y=(function rtii(){var x=A.ay
return{b:x("B8"),L:x("bO"),_:x("av<@>"),x:x("av<~>"),S:x("H<af<p,T>>"),t:x("H<af<p,@>>"),Q:x("H<Jw>"),d:x("H<jm<@>>"),s:x("H<p>"),p:x("H<q>"),m:x("aC"),l:x("F<aC>"),F:x("F<af<p,@>>"),j:x("F<@>"),I:x("F<v>"),P:x("af<p,@>"),f:x("af<@,@>"),E:x("T9"),G:x("Jw"),h:x("uh"),o:x("qZ"),a:x("bv"),K:x("a9"),J:x("UF"),e:x("UG"),v:x("Ef"),Z:x("ago<a9?>"),N:x("p"),i:x("rA"),M:x("e_"),D:x("va"),U:x("Z<p>"),g:x("dR<Le>"),n:x("dR<~>"),V:x("bc<B8>"),r:x("bc<@>"),R:x("bc<~>"),k:x("a_7<aC>"),C:x("pX<aC>"),u:x("aB<B8>"),c:x("aB<@>"),W:x("aB<~>"),q:x("kC"),y:x("T"),z:x("@"),A:x("aC?"),X:x("a9?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Yz=new B.a81(C.hV)
D.A8=new A.ao(32,0,32,0)
D.AX=new A.aq(57639,"MaterialIcons",null,!1)
D.a3y=new A.aq(58337,"MaterialIcons",null,!1)
D.a3z=new A.aq(58341,"MaterialIcons",null,!1)
D.a3D=new A.aq(58923,"MaterialIcons",null,!1)
D.B4=new A.aq(59048,"MaterialIcons",null,!1)
D.a3E=new A.aq(59049,"MaterialIcons",null,!1)
D.a3F=new A.aq(59077,"MaterialIcons",null,!1)
D.a3w=new A.aq(58195,"MaterialIcons",null,!1)
D.a5y=new A.ac(D.a3w,28,C.m,null,null)
D.afa=A.a(x([1,2,4,8,16]),A.ay("H<v>"))
D.akG=A.a(x([]),y.Q)
D.Jo=new A.fV("FlutterWebRTC.Method",C.bh,null)
D.auA=new B.ob(0,"RTCIceConnectionStateNew")
D.auB=new B.ob(1,"RTCIceConnectionStateChecking")
D.auC=new B.ob(2,"RTCIceConnectionStateCompleted")
D.auD=new B.ob(3,"RTCIceConnectionStateConnected")
D.auE=new B.ob(4,"RTCIceConnectionStateCount")
D.NY=new B.ob(5,"RTCIceConnectionStateFailed")
D.auF=new B.ob(6,"RTCIceConnectionStateDisconnected")
D.NZ=new B.ob(7,"RTCIceConnectionStateClosed")
D.O_=new B.UE(0,"RTCIceGatheringStateNew")
D.auG=new B.UE(1,"RTCIceGatheringStateGathering")
D.auH=new B.UE(2,"RTCIceGatheringStateComplete")
D.uG=new B.yP(0,"RTCPeerConnectionStateClosed")
D.O0=new B.yP(1,"RTCPeerConnectionStateFailed")
D.O1=new B.yP(2,"RTCPeerConnectionStateDisconnected")
D.O2=new B.yP(3,"RTCPeerConnectionStateNew")
D.O3=new B.yP(4,"RTCPeerConnectionStateConnecting")
D.O4=new B.yP(5,"RTCPeerConnectionStateConnected")
D.auI=new B.yQ(0,"RTCSignalingStateStable")
D.auJ=new B.yQ(1,"RTCSignalingStateHaveLocalOffer")
D.auK=new B.yQ(2,"RTCSignalingStateHaveRemoteOffer")
D.auL=new B.yQ(3,"RTCSignalingStateHaveLocalPrAnswer")
D.auM=new B.yQ(4,"RTCSignalingStateHaveRemotePrAnswer")
D.O5=new B.yQ(5,"RTCSignalingStateClosed")
D.auN=new B.UJ(0,0,0)
D.uH=new B.ae2(0,"RTCVideoViewObjectFitContain")
D.O6=new B.ae2(1,"RTCVideoViewObjectFitCover")
D.oT=new A.ci(20,null,null,null)
D.ayp=new A.ci(48,null,null,null)
D.PD=new A.ci(null,64,null,null)
D.aBC=new A.C(!0,C.m,null,null,null,null,22,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Qn=new A.C(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aBP=new A.C(!0,C.o,null,null,null,null,32,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Qq=new A.C(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.vY=new A.C(!0,C.ai,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.cbk=null
$.cl_=!1
$.cj7=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cYw","ccT",()=>new B.aXg())
x($,"cV8","ccE",()=>C.d.q(A.ax(A.ax(A.ax(A.cci(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"yKlkmQsxyGzK5maSTRWJ04bUTPY=");