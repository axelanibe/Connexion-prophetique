((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Hv:function Hv(){},VF:function VF(d){this.$ti=d},b0B:function b0B(d){this.a=d},b0C:function b0C(d,e){this.a=d
this.b=e},
cjn(d){var x
B.bY1()
if(d.length===0)return
x=A.bQ(new B.bZK(d))
self.window.addEventListener("beforeunload",x)
$.c6s=new B.bZJ(x)},
bY1(){var x=$.c6s
if(x!=null)x.$0()
$.c6s=null},
bZK:function bZK(d){this.a=d},
bZJ:function bZJ(d){this.a=d},
a5y(d){var x,w,v,u,t=new B.ax6(),s=J.N(d),r=s.h(d,"id")
r=J.o(r==null?"":r)
x=s.h(d,"conversation_id")
J.o(x==null?"":x)
x=s.h(d,"appelant_id")
x=J.o(x==null?"":x)
w=s.h(d,"appelant_nom")
w=J.o(w==null?"":w)
A.al(s.h(d,"appele_id"))
A.al(s.h(d,"appele_nom"))
v=s.h(d,"type")
v=J.o(v==null?"audio":v)
u=s.h(d,"statut")
u=J.o(u==null?"sonne":u)
t.$1(s.h(d,"cree_le"))
t.$1(s.h(d,"repondu_le"))
return new B.ax5(r,x,w,v,u)},
c4W(d){var x,w,v,u=J.N(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.o(s==null?"":s)
x=u.h(d,"appel_id")
J.o(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.o(x==null?"":x)
w=u.h(d,"type")
w=J.o(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mu(t,y.N,y.z):C.e7
if(u.h(d,"cree_le")!=null)A.cc(J.o(u.h(d,"cree_le")))
return new B.KJ(s,x,w,v)},
csJ(d){var x,w,v,u,t,s,r=J.N(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.Xf
x=A.a([],y.t)
for(r=J.at(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gI(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mu(s,u,t))}return new B.a79(x)},
bZG(d){var x=C.c.ag(d.a,1e6)
return C.d.b3(C.c.k(C.c.ag(x,60)),2,"0")+":"+C.d.b3(C.c.k(C.c.a2(x,60)),2,"0")},
ck8(d){var x=J.N(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.q_(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.ao0(w,v)},
cIZ(d){var x,w,v=J.N(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.ao3(u,A.jl(w)?w:null,v)},
ax5:function ax5(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
ax6:function ax6(){},
KJ:function KJ(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a79:function a79(d){this.a=d},
cbw(d,e,f,g,h,i,j){return new B.qv(f,g,j,i,e,d,null)},
c3b(d,e,f,g,h,i,j,k,l){return new B.qu(f,l,h,k,d,i,j,e,g,null)},
cgh(d,e,f,g,h,i,j,k,l,m,n){return new B.aip(g,f,e,i,h,d,m,l,k,j,n,null)},
qv:function qv(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
Ze:function Ze(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bnS:function bnS(d){this.a=d},
bnT:function bnT(d){this.a=d},
bnP:function bnP(d){this.a=d},
bnQ:function bnQ(d){this.a=d},
bnM:function bnM(d){this.a=d},
bnN:function bnN(d){this.a=d},
bnO:function bnO(d){this.a=d},
bnJ:function bnJ(d){this.a=d},
bnK:function bnK(d){this.a=d},
bnL:function bnL(d){this.a=d},
bnR:function bnR(d){this.a=d},
XQ:function XQ(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qu:function qu(d,e,f,g,h,i,j,k,l,m){var _=this
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
Zd:function Zd(d,e){var _=this
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
bnu:function bnu(d){this.a=d},
bnv:function bnv(d){this.a=d},
bnt:function bnt(d){this.a=d},
bnw:function bnw(d){this.a=d},
bnx:function bnx(){},
bny:function bny(d){this.a=d},
bns:function bns(d,e){this.a=d
this.b=e},
bnz:function bnz(){},
bnA:function bnA(d){this.a=d},
bng:function bng(d){this.a=d},
bnh:function bnh(d){this.a=d},
bni:function bni(d){this.a=d},
bnj:function bnj(d){this.a=d},
bnf:function bnf(d){this.a=d},
bnk:function bnk(d){this.a=d},
bnl:function bnl(d){this.a=d},
bnm:function bnm(d){this.a=d},
bne:function bne(d,e){this.a=d
this.b=e},
bnn:function bnn(){},
bno:function bno(d){this.a=d},
bnC:function bnC(d){this.a=d},
bnD:function bnD(d){this.a=d},
bnE:function bnE(d){this.a=d},
bnF:function bnF(d){this.a=d},
bnG:function bnG(d){this.a=d},
bnH:function bnH(d){this.a=d},
bnp:function bnp(d,e){this.a=d
this.b=e},
bnq:function bnq(d){this.a=d},
bnr:function bnr(d){this.a=d},
bnB:function bnB(){},
bnd:function bnd(d,e){this.a=d
this.b=e},
bnc:function bnc(d,e){this.a=d
this.b=e},
bnb:function bnb(d,e){this.a=d
this.b=e},
bnI:function bnI(d){this.a=d},
aip:function aip(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
XR:function XR(d,e){this.c=d
this.a=e},
zr:function zr(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
b0_:function b0_(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b00:function b00(d){this.a=d},
b01:function b01(d){this.a=d},
b02:function b02(d){this.a=d},
a6V:function a6V(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aAN:function aAN(d){this.a=d},
aAO:function aAO(d){this.a=d},
atZ(d){var x=y.U,w=A.I(new A.V(A.a(d.split(" "),y.s),new B.c_I(),x),!0,x.i("x.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gS(w),0).toUpperCase()
return(J.m(C.b.gS(w),0)+J.m(C.b.gaU(w),0)).toUpperCase()},
c_I:function c_I(){},
aaL:function aaL(){this.a=null},
aVK:function aVK(){},
u4:function u4(d,e){this.e=d
this.b=e},
aQB:function aQB(d){this.a=d},
aQC:function aQC(d){this.a=d},
c40(d){var x=new B.abe(d)
x.aDm(d)
return x},
abe:function abe(d){this.d=d},
aQy:function aQy(d){this.a=d},
aQz:function aQz(d){this.a=d},
aQA:function aQA(d){this.a=d},
aQk:function aQk(){},
aQm:function aQm(){},
aQn:function aQn(){},
aQo:function aQo(d){this.a=d},
aQl:function aQl(d){this.a=d},
cyF(d,e){var x=y.N
x=new B.ad7(d,e,A.D(x,y.E),A.D(x,y.z))
x.aDv(d,e)
return x},
ad7:function ad7(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aVM:function aVM(d){this.a=d},
aVN:function aVN(d){this.a=d},
aVO:function aVO(d){this.a=d},
aVP:function aVP(d){this.a=d},
aVQ:function aVQ(d){this.a=d},
aVR:function aVR(d){this.a=d},
aVS:function aVS(d){this.a=d},
aVT:function aVT(d){this.a=d},
aVL:function aVL(d){this.a=d},
ad8:function ad8(){},
c4I:function c4I(d){this.a=d},
cLb(){return C.b.nt(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.c_R())!==-1},
c_R:function c_R(){},
ced(){var x=A.a([],y.d),w=$.cee
$.cee=w+1
return new B.U5(w,x,D.at9,$.ai())},
U5:function U5(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aVZ:function aVZ(d){this.a=d},
aVV:function aVV(d){this.a=d},
aVW:function aVW(d){this.a=d},
aVX:function aVX(d){this.a=d},
aVY:function aVY(){},
c4J(d,e,f){return new B.U7(d,f,e,null)},
U7:function U7(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
U8:function U8(){this.c=this.a=null},
aW_:function aW_(){},
aW1:function aW1(d){this.a=d},
aW0:function aW0(d){this.a=d},
cc9(d,e,f,g){var x,w={}
w.a=d
x=new B.a9o(g.i("a9o<0>"))
x.aD3(e,f,w,g)
return x},
a9o:function a9o(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aJo:function aJo(d,e){this.a=d
this.b=e},
aJn:function aJn(d){this.a=d},
a_6:function a_6(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bsv:function bsv(){},
afs:function afs(d){this.b=this.a=$
this.$ti=d},
aft:function aft(){},
c2A(d,e){return B.crW(d,e)},
crW(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$c2A=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.pD("ws")&&!d.pD("wss"))throw A.n(A.fE(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.k(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.AO(r,A.fU(null,null,null,!1,y.D))
u=new A.az($.aI,y.u)
p=new A.b5(u,y.V)
if(J.t(r.readyState,1))p.cB(0,q)
else if(J.t(r.readyState,2)||J.t(r.readyState,3))p.ho(new B.LH("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.pQ(r,"open",!1,y.C).gS(0).aI(new B.azk(p,q),y.H)
t=y.C
s=y.H
new A.pQ(r,"error",!1,t).gS(0).aI(new B.azl(p,q),s)
A.ix(r,"message",new B.azm(q),!1,y.m)
new A.pQ(r,"close",!1,t).gS(0).aI(new B.azn(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$c2A,w)},
AO:function AO(d,e){this.a=d
this.b=e},
azk:function azk(d,e){this.a=d
this.b=e},
azl:function azl(d,e){this.a=d
this.b=e},
azm:function azm(d){this.a=d},
azn:function azn(d,e){this.a=d
this.b=e},
c5t(){return new B.LG("Connection Closed")},
uX:function uX(){},
L8:function L8(d){this.a=d},
Gv:function Gv(d){this.a=d},
GW:function GW(d,e){this.a=d
this.b=e},
LH:function LH(d){this.a=d},
LG:function LG(d){this.a=d},
cro(d){var x=null,w=$.aI,v=new B.afs(y.Z),u=y.X,t=A.fU(x,x,x,!0,u),s=A.fU(x,x,x,!0,u),r=A.y(s),q=A.y(t)
v.a=B.cc9(new A.cG(s,r.i("cG<1>")),new A.FI(t,q.i("FI<1>")),!0,u)
v.b=B.cc9(new A.cG(t,q.i("cG<1>")),new A.FI(s,r.i("FI<1>")),!1,u)
v=new B.ava(new A.b5(new A.az(w,y.W),y.R),v)
v.aCN(d)
return v},
ava:function ava(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
ave:function ave(d){this.a=d},
avb:function avb(d){this.a=d},
avc:function avc(d){this.a=d},
avd:function avd(d,e){this.a=d
this.b=e},
avf:function avf(d){this.a=d},
arP:function arP(d,e){this.b=d
this.a=e},
agL:function agL(d){this.a=d},
cKL(d){switch(d){case"new":return D.asX
case"checking":return D.asY
case"connected":return D.at_
case"completed":return D.asZ
case"failed":return D.N8
case"disconnected":return D.at1
case"closed":return D.N9
case"count":return D.at0}return D.N9},
cKM(d){switch(d){case"new":return D.Na
case"gathering":return D.at2
case"complete":return D.at3}return D.Na},
cMM(d){switch(d){case"stable":return D.at4
case"have-local-offer":return D.at5
case"have-local-pranswer":return D.at7
case"have-remote-offer":return D.at6
case"have-remote-pranswer":return D.at8
case"closed":return D.Ng}return D.Ng},
cLZ(d){switch(d){case"new":return D.Nd
case"connecting":return D.Ne
case"connected":return D.Nf
case"closed":return D.uf
case"disconnected":return D.Nc
case"failed":return D.Nb}return D.uf},
yw:function yw(d,e){this.a=d
this.b=e},
U1:function U1(d,e){this.a=d
this.b=e},
yv:function yv(d,e){this.a=d
this.b=e},
o0:function o0(d,e){this.a=d
this.b=e},
ad9:function ad9(d,e){this.a=d
this.b=e},
aVJ:function aVJ(){},
Sy:function Sy(){},
J2:function J2(){},
aQj:function aQj(){},
JR:function JR(d,e,f){this.a=d
this.b=e
this.c=f},
U2:function U2(){},
U3:function U3(){},
aVU:function aVU(){},
DQ:function DQ(d,e){this.a=d
this.b=e},
U4:function U4(d){this.b=d},
U6:function U6(d,e,f){this.a=d
this.b=e
this.c=f},
c3B(d){var x=0,w=A.k(y.y)
var $async$c3B=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.k(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$c3B,w)},
abB(d){var x=0,w=A.k(y.H),v
var $async$abB=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b5r("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$abB)
case 2:return A.i(null,w)}})
return A.j($async$abB,w)},
aSC(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aSC=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mu(y.f.a(A.bZu(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.SO(0,u),$async$aSC)
case 5:case 4:v=A.cZ(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aSC,w)},
b5r(d,e,f,g){return B.cCb(d,e,f,g,f.i("0?"))},
cCb(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b5r=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b5q(),$async$b5r)
case 3:v=D.IE.cj(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b5r,w)},
b5q(){var x=0,w=A.k(y.H),v,u
var $async$b5q=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.cg2?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.IE.cj("initialize",A.a6(["options",A.D(v,u)],v,u),!1,y.H),$async$b5q)
case 4:$.cg2=!0
case 3:return A.i(null,w)}})
return A.j($async$b5q,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[29]
E=c[19]
B.Hv.prototype={
E(d,e){this.a.E(0,e)},
ds(d,e){this.a.ds(d,e)},
a6(d){return this.a.a6(0)},
$ie1:1}
B.VF.prototype={
hw(d){var x=A.cv("subscription"),w=A.fU(new B.b0B(x),null,null,!0,this.$ti.y[1])
x.b=d.fv(new B.b0C(this,w),w.gnn(w),w.gpc())
return new A.cG(w,A.y(w).i("cG<1>"))}}
B.ax5.prototype={}
B.KJ.prototype={}
B.a79.prototype={}
B.qv.prototype={
P(){return new B.Ze()}}
B.Ze.prototype={
V(){var x,w,v=this
v.a_()
x=v.a
x.toString
v.z=!0
w=new B.aaL()
v.y!==$&&A.aJ()
v.y=w
if(!x.y)w.tB(A.B0(C.kE,$.vy().a).c)
v.O9()
v.r=A.ds(C.c1,new B.bnS(v))
v.w=A.hc(C.ze,new B.bnT(v))},
l(){var x=this,w=x.r
if(w!=null)w.Y(0)
w=x.w
if(w!=null)w.Y(0)
w=x.x
if(w!=null)w.Y(0)
w=x.y
w===$&&A.d()
w.ic()
if(x.z)w.hd()
x.a7()},
a1j(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.ds(C.fx,new B.bnP(this))},
Si(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Si=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a4()
x=7
return A.e(o.Dh(p.c),$async$Si)
case 7:r=e
q=B.a5y(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.m(new B.bnQ(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
p=s.y
p===$&&A.d()
p.ic()
s.a1j()}u=2
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
return A.j($async$Si,w)},
O9(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$O9=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a4()
x=7
return A.e(n.Dh(o.c),$async$O9)
case 7:r=e
q=B.a5y(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gzl()
p=m
if(q.w!=="sonne"||q.c===p){s.m(new B.bnM(s))
o=s.y
o===$&&A.d()
o.ic()
s.a1j()
x=1
break}s.m(new B.bnN(s))
if(s.a.y)s.FI()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.m(new B.bnO(s))
o=s.y
o===$&&A.d()
o.ic()
s.a1j()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$O9,w)},
FI(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$FI=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.m(new B.bnJ(s))
u=4
q=s.a
q.toString
p=$.a4()
x=7
return A.e(p.Kc(q.c,"accepte"),$async$FI)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.T(n)
if(s.c==null){x=1
break}s.m(new B.bnK(s))
q=s.c
q.toString
p=J.o(r)
q.u(y.q).f.C(A.A(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
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
q.ic()
q=s.c
q.toString
A.ab(q,!1).zz(A.eh(new B.bnL(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$FI,w)},
I3(d){return this.b0s(d)},
b0r(){return this.I3(!1)},
b0s(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$I3=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Y(0)
r=s.w
if(r!=null)r.Y(0)
r=s.y
r===$&&A.d()
r.ic()
u=4
r=s.a
r.toString
q=$.a4()
x=7
return A.e(q.Kc(r.c,"refuse"),$async$I3)
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
if(r!=null)A.ab(r,!1).bK()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$I3,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jv(C.r,s,A.c(B.atZ(r.d),s,s,s,s,D.Pz,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.Pq,C.W,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.ay,new A.a0(D.zz,x,s),C.k,A.c(q,s,s,s,s,D.vu,s,s,s),D.OM],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.bnR(t)
v=A.b("Accepter")
u=t.f?s:t.gaEe()
q.push(A.U(A.a([new B.XQ(D.Al,C.aF,r,x,s),D.awE,new B.XQ(C.nd,C.cL,v,u,s)],w),C.o,C.bv,C.i,s))}if(t.d)q.push(C.xW)
return A.eX(s,C.n,A.fv(!0,A.cN(A.K(q,C.o,C.f,C.U),s,s),!0,C.a7,!0,!0),s,s,s)}}
B.XQ.prototype={
D(d){var x=this,w=null,v=A.di(x.d,w,w,C.a7,C.cK,w)
return A.K(A.a([A.ae(A.b6(!1,A.c6(x.c,C.m,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.ec,w,w,w)],y.p),C.o,C.f,C.U)}}
B.qu.prototype={
P(){return new B.Zd(A.b4(y.N),C.R)}}
B.Zd.prototype={
V(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.a_()
x=o.a
o.r=x.c
x=x.w
if(x==null)x=new B.b0_(B.ced(),B.ced())
o.d!==$&&A.aJ()
o.d=x
w=o.a
v=w.x
if(v==null)v=new B.a6V(new A.dO(n,n,y.g),new A.dO(n,n,y.n))
o.e!==$&&A.aJ()
o.e=v
o.fr=!0
u=new B.aaL()
o.dy!==$&&A.aJ()
o.dy=u
t=w.w
if(t!=null){s=$.kI()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.kI()
s=o.r
r=w.e
p=w.d
t.bco(s,r,x,v,w.f,p)
x=o.a
if(x.Q)t.as=!0
if(q){o.Rm()
return}if(x.f)u.tB("assets/audio/tonalite-appel.wav")
o.rC()},
l(){var x=this,w=x.CW
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
w.ic()
if(x.fr)w.hd()
w=$.kI()
if(!(w.r&&w.a===x.r&&!x.y)){B.bY1()
w=x.d
w===$&&A.d()
w.hd()
w=x.e
w===$&&A.d()
w.JX()}x.a7()},
Rm(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Rm=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.a4()
s.w=o.gzl()
n=$.kI()
s.Q=n.x
s.as=n.y
s.x=n.e
n=n.f
s.ay=n
if(n!=null){n=Date.now()
m=s.ay
m.toString
s.ch=new A.ax(n,0,!1).ew(m)}B.cjn(s.r)
u=4
s.a.toString
x=7
return A.e(o.bU("/messagerie/appels/"+s.r+"/signaux"),$async$Rm)
case 7:r=e
for(o=J.at(r),n=s.f;o.B();){q=o.gI(o)
p=B.c4W(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.mn(A.b("Appel termin\xe9"))
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
n.f=new B.bnu(s)
n.r=new B.bnv(s)
n.w=new B.bnw(s)
s.z=!0
if(o)s.m(new B.bnx())
s.cy=A.hc(C.cf,new B.bny(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.c_(n,A.y(n).i("c_<1>")).cS(s.galg())
o=o.w
s.dx=new A.c_(o,A.y(o).i("c_<1>")).cS(new B.bnz())
s.CW=A.hc(C.fx,new B.bnA(s))
s.xt()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Rm,w)},
rC(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$rC=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:s.cx=A.ds(C.c1,new B.bng(s))
r="appel"
u=4
q=null
h=s.a
g=h.y
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$rC)
case 10:q=a2
h=s.r=B.a5y(q).a
x=8
break
case 9:g=$.a4()
x=11
return A.e(g.Dh(h.c),$async$rC)
case 11:q=a2
h=s.r=s.a.c
case 8:g=$.kI()
g.bca(h)
B.cjn(s.r)
if(s.a.f)g.TH()
p=B.a5y(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mn(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.a4()
s.w=h.gzl()
r="ice"
s.a.toString
o=h.Ub()
n=s.HN()
x=12
return A.e(o,$async$rC)
case 12:m=a2
l=B.csJ(m)
x=15
return A.e(n,$async$rC)
case 15:x=!a2?13:14
break
case 13:if(s.c==null){x=1
break}s.m(new B.bnh(s))
x=16
return A.e(A.kf(C.kc,null,y.z),$async$rC)
case 16:if(s.c==null){x=1
break}s.mn(null)
x=1
break
case 14:r="webrtc"
f=s.d
f===$&&A.d()
e=s.a.d
x=17
return A.e(f.zx(A.a6(["iceServers",l.a],y.N,y.z),e==="video"),$async$rC)
case 17:f.f=new B.bni(s)
f.r=new B.bnj(s)
f.w=new B.bnk(s)
if(s.c==null){x=1
break}s.m(new B.bnl(s))
g.bi7()
s.cy=A.hc(C.cf,new B.bnm(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.c_(f,A.y(f).i("c_<1>")).cS(s.galg())
f=g.w
s.dx=new A.c_(f,A.y(f).i("c_<1>")).cS(new B.bnn())
s.a.toString
k=h.b
if(k!=null&&J.a3(k)!==0){s.a.toString
g.Tf(C.d.WB("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eQ(C.bM,k,C.ac,!0))}s.CW=A.hc(C.fx,new B.bno(s))
s.xt()
u=2
x=6
break
case 4:u=3
a0=t
j=A.T(a0)
i=A.bl(a0)
if(s.c==null){x=1
break}A.rT().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.dm?j.a:s.aVN(r)
h.u(y.q).f.C(A.A(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
s.mn(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$rC,w)},
aVN(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
HN(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$HN=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.Z_(),$async$HN)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.E2(s.a.d==="video"),$async$HN)
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
return A.j($async$HN,w)},
Z_(){var x=0,w=A.k(y.y),v
var $async$Z_=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Z_,w)},
xt(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$xt=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.a4()
x=7
return A.e(p.bU("/messagerie/appels/"+s.r+"/signaux"),$async$xt)
case 7:r=e
for(p=J.at(r);p.B();){q=p.gI(p)
s.alh(B.c4W(q))}u=2
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
return A.j($async$xt,w)},
alh(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.ck8(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.CL(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aI(new B.bnC(s),y.a).fo(new B.bnD(s))
break
case"reponse":if(!s.a.f)return
u=B.ck8(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.SN(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aI(new B.bnE(s),y.a).fo(new B.bnF(s))
break
case"candidat_ice":t=B.cIZ(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.SG(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.JQ().aI(new B.bnG(s),y.a).fo(new B.bnH(s))
break
case"refuse":s.mn(A.b("Appel refus\xe9"))
break
case"annule":s.mn(A.b("Appel annul\xe9"))
break
case"termine":s.mn(A.b("Appel termin\xe9"))
break}},
QU(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$QU=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.Y(0)
t=u.dy
t===$&&A.d()
t.ic()
u.m(new B.bnp(u,!1))
t=$.kI()
t.bjZ()
s=u.Q
t.a6q(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$QU,w)},
xm(d,e,f){return this.aMs(d,e,f)},
aeb(d,e){return this.xm(d,e,!0)},
aMs(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$xm=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.a4()
x=6
return A.e(s.api(t.r,e,d),$async$xm)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mn(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$xm,w)},
HY(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$HY=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.Y(0)
r=s.dy
r===$&&A.d()
r.ic()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.a4()
x=9
return A.e(q.Kc(r,"termine"),$async$HY)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.bY1()
$.kI().M7()
r=s.c
if(r!=null)A.ab(r,!1).bK()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$HY,w)},
b0l(){var x=this
if(!x.x||x.y)return
$.kI().bli()
x.m(new B.bnq(x))
$.aM.aF$.push(new B.bnr(x))},
mn(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.Y(0)
x=v.dy
x===$&&A.d()
x.ic()
x=v.r
if(x.length!==0){v.a.toString
w=$.a4()
w.Kc(x,"termine").fo(new B.bnB())}if(d!=null&&v.c!=null)v.c.u(y.q).f.C(A.A(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))
B.bY1()
$.kI().M7()
x=v.c
if(x!=null)A.ab(x,!1).bK()},
Ok(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ok=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.XT(u),$async$Ok)
case 2:if(v.c!=null)v.m(new B.bnd(v,u))
$.kI().a6q(v.as,u)
return A.i(null,w)}})
return A.j($async$Ok,w)},
Oj(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Oj=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Fi(u),$async$Oj)
case 2:if(v.c!=null)v.m(new B.bnc(v,u))
$.kI().a6q(u,v.Q)
return A.i(null,w)}})
return A.j($async$Oj,w)},
Og(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Og=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.XQ(u),$async$Og)
case 2:if(v.c!=null)v.m(new B.bnb(v,u))
return A.i(null,w)}})
return A.j($async$Og,w)},
Oh(){var x=0,w=A.k(y.H),v=this,u
var $async$Oh=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.SU(),$async$Oh)
case 2:return A.i(null,w)}})
return A.j($async$Oh,w)},
D(d){var x,w,v,u,t,s,r,q,p,o=this,n=null,m="Appel en cours\u2026",l="\xc7a sonne\u2026",k="Connexion\u2026",j=o.d
j===$&&A.d()
x=j.c
w=o.go
v=o.a
if(v.d==="video"&&o.z){if(x!=null)x=B.c4J(j.e,!1,D.Nh)
else{x=A.jv(C.r,n,A.c(B.atZ(v.e),n,n,n,n,D.azZ,n,n,n),n,48)
v=o.a
u=A.c(v.e,n,n,n,n,D.azM,n,n,n)
if(o.x)v=A.b(m)+" "+B.bZG(o.ch)
else v=v.f&&o.z?A.b(l):A.b(k)
v=A.cN(A.K(A.a([x,C.p,u,C.k,A.c(v,n,n,n,n,D.vu,n,n,n)],y.p),C.o,C.f,C.U),n,n)
x=v}j=A.a([A.DJ(0,x),A.f9(n,A.eR(A.Q(12),B.c4J(j.d,!0,D.Nh),C.an),160,n,n,16,16,110)],y.p)
if(o.x)j.push(A.f9(n,new B.XR(o.gaiI(),n),n,n,16,n,16,n))
x=o.x
v=B.bZG(o.ch)
u=o.Q
t=o.as
j.push(A.f9(24,B.cgh(o.ax,v,x,!0,t,u,o.gaby(),o.gabx(),o.gabz(),o.gabA(),o.gaim()),n,n,0,0,n,n))
j=A.er(C.aW,j,C.h,C.aV,n)}else{x=y.p
v=A.a([],x)
if(o.fy)v.push(A.f9(n,A.u7(B.c4J(j.e,!1,D.ug),0),1,n,0,n,0,1))
if(o.x)v.push(A.f9(n,new B.XR(o.gaiI(),n),n,n,16,n,16,n))
j=A.jv(C.r,n,A.c(B.atZ(o.a.e),n,n,n,n,D.Pz,n,n,n),n,56)
u=o.a
t=A.c(u.e,n,n,n,n,D.Pq,C.W,n,n)
s=o.fx
if(s==null)if(o.x)u=A.b(m)+" "+B.bZG(o.ch)
else if(o.z)u=u.f?A.b(l):A.b(m)
else u=A.b(k)
else u=s
u=A.c(u,n,n,n,n,D.vu,C.W,n,n)
s=o.x
r=B.bZG(o.ch)
q=o.Q
p=o.as
v.push(A.cN(A.K(A.a([j,C.ay,new A.a0(D.zz,t,n),C.k,u,D.OM,B.cgh(o.ax,r,s,!1,p,q,o.gaby(),o.gabx(),o.gabz(),o.gabA(),o.gaim())],x),C.o,C.f,C.U),n,n))
v=A.er(C.aW,v,C.h,C.aV,n)
j=v}return A.c4s(w,A.eX(n,C.n,A.fv(!0,j,!0,C.a7,!0,!0),n,n,n),new B.bnI(o),y.K)}}
B.aip.prototype={
D(d){var x,w,v=this,u=null,t=y.p,s=A.a([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.PD,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a2b:D.a2a
t=A.a([new B.zr(x,r,A.b("Muet"),v.x,u,u),D.oC,new B.zr(D.a2h,v.r,A.b("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.oC)
if(r){x=v.w
w=x?D.Ar:D.a2g
t.push(new B.zr(w,!x,A.b("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.oC)
if(r)t.push(new B.zr(D.a2f,!1,A.b("Basculer"),v.Q,u,u))
t.push(D.oC)
t.push(new B.zr(D.Al,!1,A.b("Raccrocher"),v.as,C.aF,u))
s.push(A.U(t,C.o,C.bv,C.i,u))
return A.K(s,C.o,C.f,C.U)}}
B.XR.prototype={
D(d){var x=null
return A.K(A.a([A.ae(A.b6(!1,D.a48,C.j,x,C.q,x,x,x,x,this.c,x,A.di(C.k5,x,x,C.a7,C.cK,x)),48,48),C.H,A.c(A.b("R\xe9duire"),x,x,x,x,C.vx,x,x,x)],y.p),C.o,C.f,C.U)}}
B.zr.prototype={
D(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.m:C.k5
if(!t)x=C.m
else x=w.d?C.n:C.m
t=A.di(u,v,v,C.a7,C.cK,v)
return A.K(A.a([A.ae(A.b6(!1,A.c6(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aS,A.c(w.e,v,v,v,v,C.vx,v,v,v)],y.p),C.o,C.f,C.U)}}
B.b0_.prototype={
E2(d){return this.bjO(d)},
bjO(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$E2=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jm(0),$async$E2)
case 3:$.c7Z()
s=y.N
r=A.a6(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aQk().F5(0,A.a6(["audio",r,"video",d&&A.a6(["facingMode","user"],s,s)],s,y.z)),$async$E2)
case 4:q=f
u.b=q
t.sa9w(0,q)
case 1:return A.i(v,w)}})
return A.j($async$E2,w)},
zx(d,e){return this.bkA(d,e)},
bkA(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$zx=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jm(0),$async$zx)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.E2(e),$async$zx)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.c7Z().a4k(d,A.D(y.N,y.z)),$async$zx)
case 6:t=v.a=g
s=u.a8J(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a3a(0,s[q],u),$async$zx)
case 10:case 8:s.length===r||(0,A.P)(s),++q
x=7
break
case 9:t.e=new B.b00(v)
t.Q=new B.b01(v)
t.d=new B.b02(v)
return A.i(null,w)}})
return A.j($async$zx,w)},
aKB(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa9w(0,d)
w.FU()
x=w.r
if(x!=null)x.$0()}},
FU(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$FU=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.MI(0)
if(m==null)m=C.dp
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aSC(n,s),$async$FU)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.T(l)
A.rT().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.P)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$FU,w)},
JQ(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$JQ=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Tt(0),$async$JQ)
case 3:t=e
x=4
return A.e(s.Fj(0,t),$async$JQ)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$JQ,w)},
CL(d){return this.bbD(d)},
bbD(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$CL=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Fl(0,new B.DQ(d.h(0,"sdp"),d.h(0,"type"))),$async$CL)
case 3:x=4
return A.e(s.Tq(0),$async$CL)
case 4:t=f
x=5
return A.e(s.Fj(0,t),$async$CL)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$CL,w)},
SN(d){return this.b8v(d)},
b8v(d){var x=0,w=A.k(y.H),v=this,u
var $async$SN=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.Fl(0,new B.DQ(d.h(0,"sdp"),d.h(0,"type"))),$async$SN)
case 2:return A.i(null,w)}})
return A.j($async$SN,w)},
SG(d){return this.b8g(d)},
b8g(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$SG=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.St(new B.JR(A.al(d.h(0,"candidate")),A.al(d.h(0,"sdpMid")),A.dR(d.h(0,"sdpMLineIndex")))),$async$SG)
case 3:case 1:return A.i(v,w)}})
return A.j($async$SG,w)},
XT(d){return this.awy(d)},
awy(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$XT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.MI(0)
if(r==null)r=C.dp
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.P)(r),++s)r[s].sly(0,t)
return A.i(null,w)}})
return A.j($async$XT,w)},
Fi(d){return this.awo(d)},
awo(d){var x=0,w=A.k(y.H),v=this
var $async$Fi=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.abB(d),$async$Fi)
case 2:x=3
return A.e(v.FU(),$async$Fi)
case 3:return A.i(null,w)}})
return A.j($async$Fi,w)},
XQ(d){return this.awf(d)},
awf(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$XQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.MU(0)
if(s==null)s=C.dp
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.P)(s),++t)s[t].sly(0,d)
return A.i(null,w)}})
return A.j($async$XQ,w)},
SU(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$SU=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.MU(0)
if(s==null)s=D.aj3
if(s.length===0){x=1
break}x=3
return A.e(B.c3B(C.b.gS(s)),$async$SU)
case 3:case 1:return A.i(v,w)}})
return A.j($async$SU,w)},
hd(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hd=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.abB(!1),$async$hd)
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
p=p==null?null:p.a6(0)
x=12
return A.e(y.x.b(p)?p:A.dq(p,y.H),$async$hd)
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
p=p==null?null:p.a8J(0)
if(p==null)p=C.dp
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cri(r)
if(!m.b(k)){j=new A.az($.aI,n)
j.a=8
j.c=k
k=j}x=20
return A.e(k,$async$hd)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:case 14:p.length===o||(0,A.P)(p),++l
x=13
break
case 15:s.b=null
u=22
x=25
return A.e(s.d.l(),$async$hd)
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
return A.e(s.e.l(),$async$hd)
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
return A.j($async$hd,w)}}
B.a6V.prototype={
Tf(d){return this.b9W(d)},
b9W(d){var x=0,w=A.k(y.H),v=this
var $async$Tf=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.FT(),$async$Tf)
case 2:return A.i(null,w)}})
return A.j($async$Tf,w)},
FT(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$FT=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a3(r)===0){x=1
break}u=4
q=B.cro(B.c2A(A.cF(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$FT)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cG(p,A.y(p).i("cG<1>")).b2(s.gb08(),!0,s.gaZB(),new B.aAN(s))
u=2
x=6
break
case 4:u=3
n=t
s.a17()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$FT,w)},
b09(d){var x,w,v,u
try{x=C.Y.cQ(0,J.o(d),null)
v=y.P
if(!v.b(x))return
if(!J.t(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.c4W(w))}catch(u){}},
a17(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.ady[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.ds(A.dh(0,0,0,0,x),new B.aAO(w))},
JX(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$JX=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.dq(s,y.H),$async$JX)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.b2()
r=s.w=new B.arP(s,q)}s=r.a6(0)}x=7
return A.e(y._.b(s)?s:A.dq(s,y.z),$async$JX)
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
return A.j($async$JX,w)}}
B.aaL.prototype={
tB(d){return this.bhi(d)},
bhi(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$tB=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.Go():r).aT(0),$async$tB)
case 6:x=7
return A.e(t.a.XP(d),$async$tB)
case 7:x=8
return A.e(t.a.j7(C.Im),$async$tB)
case 8:x=9
return A.e(t.a.i5(1),$async$tB)
case 9:x=10
return A.e(t.a.d9(0),$async$tB)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.T(p)
A.rT().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$tB,w)},
ic(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$ic=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aT(0)
x=6
return A.e(y.x.b(s)?s:A.dq(s,y.H),$async$ic)
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
return A.j($async$ic,w)},
hd(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hd=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.l()
x=6
return A.e(y.x.b(s)?s:A.dq(s,y.H),$async$hd)
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
return A.j($async$hd,w)}}
B.aVK.prototype={
a4k(d,e){return this.bbt(d,e)},
bbt(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a4k=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.D(r,r),"optional",A.a([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fI(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.c3(t)))
t=J.o(s)
v=B.cyF(C.cc.gkc().be(new A.eD(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a4k,w)}}
B.u4.prototype={
MI(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.d2(w,A.W(w).i("d2<1,aB>"))
J.hi(w,new B.aQB(x))
return x},
MU(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.d2(w,A.W(w).i("d2<1,aB>"))
J.hi(w,new B.aQC(x))
return x},
a8J(d){var x=A.I(this.MI(0),!0,y.G)
C.b.t(x,this.MU(0))
return x}}
B.abe.prototype={
aDm(d){var x=this,w=x.d
w.addEventListener("ended",A.bQ(new B.aQy(x)))
w.addEventListener("mute",A.bQ(new B.aQz(x)))
w.addEventListener("unmute",A.bQ(new B.aQA(x)))},
sly(d,e){this.d.enabled=e},
SO(d,e){return this.b8y(0,e)},
b8y(d,e){var x=0,w=A.k(y.H),v=this
var $async$SO=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.e8(v.d.applyConstraints(y.m.a(A.c3(e))),y.X),$async$SO)
case 2:return A.i(null,w)}})
return A.j($async$SO,w)},
aT(d){var x=0,w=A.k(y.H),v=this
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aT,w)}}
B.aQk.prototype={
F5(d,e){return this.avm(0,e)},
avm(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$F5=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cLb())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.jp(e.h(0,"video"),"facingMode")
e.cL(0,"video",new B.aQm())
e.cL(0,"audio",new B.aQn())}catch(a0){A.oB("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hJ(e.h(0,"audio"),i,i).aA(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.D(y.N,y.z)
J.hi(s,new B.aQo(r))
J.jp(e.h(0,"audio"),"optional")
J.jo(e.h(0,"audio"),r)}}catch(a0){q=A.T(a0)
p=A.bl(a0)
A.oB("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.c3(e)
x=10
return A.e(A.e8(o.getUserMedia(h.a(n)),h),$async$F5)
case 10:m=a2
v=new B.u4(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.e8(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$F5)
case 11:l=a2
v=new B.u4(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.T(f)
i=J.o(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F5,w)}}
B.ad7.prototype={
aDv(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bQ(new B.aVM(x)))
w.addEventListener("icecandidate",A.bQ(new B.aVN(x)))
w.addEventListener("iceconnectionstatechange",A.bQ(new B.aVO(x)))
w.onicegatheringstatechange=A.bQ(new B.aVP(x))
w.addEventListener("signalingstatechange",A.bQ(new B.aVQ(x)))
if(!$.c7K())w.addEventListener("connectionstatechange",A.bQ(new B.aVR(x)))
w.addEventListener("negotiationneeded",A.bQ(new B.aVS(x)))
w.addEventListener("track",A.bQ(new B.aVT(x)))},
Tt(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Tt=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e8(s.createOffer(y.m.a(A.c3(A.D(y.N,y.z)))),y.A),$async$Tt)
case 3:t=f
v=new B.DQ(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Tt,w)},
Tq(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Tq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e8(s.createAnswer(y.m.a(A.c3(A.D(y.N,y.z)))),y.A),$async$Tq)
case 3:t=f
v=new B.DQ(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Tq,w)},
Fj(d,e){return this.aws(0,e)},
aws(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Fj=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e8(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Fj)
case 2:return A.i(null,w)}})
return A.j($async$Fj,w)},
Fl(d,e){return this.awI(0,e)},
awI(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Fl=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e8(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$Fl)
case 2:return A.i(null,w)}})
return A.j($async$Fl,w)},
St(d){return this.b7U(d)},
b7U(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$St=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.e8(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$St)
case 2:return A.i(null,w)}})
return A.j($async$St,w)},
a6(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a6=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cZ(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a6,w)},
a3a(d,e,f){return this.b8a(0,e,f)},
b8a(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a3a=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.ad8()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a3a,w)}}
B.ad8.prototype={}
B.c4I.prototype={
aT(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.T(r)
if(y.L.b(s)){u=s
s=u
J.o(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aT,w)}}
B.U5.prototype={
sarA(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Ku()
if(x!=null)x.style.objectFit=e},
alp(){var x=this,w=x.Ku(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.aom(u,x.z!=null,0,t))},
sa9w(d,e){var x,w,v,u,t=this
t.z=e
if(e.MU(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.at(y.l.b(x)?x:new A.d2(x,A.W(x).i("d2<1,aB>")))
for(;x.B();){w=x.gI(x)
t.x.addTrack(w)}}if(e.MI(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.at(y.l.b(x)?x:new A.d2(x,A.W(x).i("d2<1,aB>")))
for(;x.B();){w=x.gI(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aMg()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Ku()
if(u!=null){u.srcObject=t.x
x=t.Ku()
x.toString
t.abm(x)}t.sp(0,t.a.baj(t.z!=null))},
aMg(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Ku(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
l(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$l=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.P)(t),++r)t[r].Y(0)
q=u.Ku()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eV()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$l,w)},
jm(d){var x=0,w=A.k(y.H),v=this
var $async$jm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.G9()
$.q2().tO("RTCVideoRenderer-"+v.Q,new B.aVZ(v),!0)
return A.i(null,w)}})
return A.j($async$jm,w)},
abm(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.U7.prototype={
P(){return new B.U8()}}
B.U8.prototype={
V(){var x,w,v=this
v.a_()
v.a.c.ai(0,v.gaXt())
x=v.a
w=x.c
w.as=x.e
w.sarA(0,x.d===D.ug?"contain":"cover")},
aXu(){if(this.c!=null)this.m(new B.aW_())},
l(){if(this.c!=null)this.a7()},
b5(d){var x,w
this.bl(d)
A.ds(A.dh(0,0,10,0,0),new B.aW1(this))
x=this.a
w=x.c
w.sarA(0,x.d===D.ug?"contain":"cover")},
D(d){return new A.iK(new B.aW0(this),null)}}
B.a9o.prototype={
aD3(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.aJ()
x.a=new B.a_6(d,x,new A.b5(new A.az(w,y.c),y.r),e,g.i("a_6<0>"))
if(f.a.giZ())f.a=new B.VF(g.i("@<0>").c6(g).i("VF<1,2>")).hw(f.a)
w=A.fU(null,new B.aJo(f,x),null,!0,g)
x.b!==$&&A.aJ()
x.b=w},
ahI(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a6(0)}}
B.a_6.prototype={
E(d,e){if(this.e)throw A.n(A.ak("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
ds(d,e){if(this.e)throw A.n(A.ak("Cannot add event after closing."))
if(this.d)return
this.aP1(d,e)},
hU(d){return this.ds(d,null)},
aP1(d,e){var x=this
if(x.w){x.a.a.ds(d,e)
return}x.c.h8(d,e)
x.ahJ()
x.b.ahI()
x.a.a.a6(0).fo(new B.bsv())},
a6(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.ahI()
x.c.cB(0,x.a.a.a6(0))}return x.c.a},
ahJ(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dJ(0)
return},
$ie1:1}
B.afs.prototype={}
B.aft.prototype={}
B.AO.prototype={
acJ(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.GW(d,e))
x.a6(0)},
a90(d){var x
if((this.b.b&4)!==0)throw A.n(B.c5t())
x=A.c3(d)
x.toString
this.a.send(x)},
yl(d,e,f){return this.b9F(0,e,f)},
b9F(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$yl=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.c5t())
u.a6(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$yl,w)},
$ic5s:1}
B.uX.prototype={}
B.L8.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.L8&&e.a===this.a},
gH(d){return C.d.gH(this.a)}}
B.Gv.prototype={
n(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Gv&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.hu(this.a)},
k(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.GW.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.GW&&e.a===this.a&&e.b===this.b},
gH(d){return A.hu([this.a,this.b])},
k(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.LH.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibN:1}
B.LG.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.ava.prototype={
aCN(d){d.fd(new B.ave(this),new B.avf(this),y.a)}}
B.arP.prototype={
a6(d){var x=this.b
x.e=x.d=null
return this.ayq(0)}}
B.agL.prototype={
k(d){return"WebSocketChannelException: "+this.a},
$ibN:1}
B.yw.prototype={
N(){return"RTCSignalingState."+this.b}}
B.U1.prototype={
N(){return"RTCIceGatheringState."+this.b}}
B.yv.prototype={
N(){return"RTCPeerConnectionState."+this.b}}
B.o0.prototype={
N(){return"RTCIceConnectionState."+this.b}}
B.ad9.prototype={
N(){return"RTCVideoViewObjectFit."+this.b}}
B.aVJ.prototype={}
B.Sy.prototype={}
B.J2.prototype={
k(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aQj.prototype={}
B.JR.prototype={}
B.U2.prototype={}
B.U3.prototype={}
B.aVU.prototype={}
B.DQ.prototype={}
B.U4.prototype={}
B.U6.prototype={
aom(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.U6(x,w,v)},
baj(d){return this.aom(null,d,null,null)},
k(d){var x=this
return A.a8(x).k(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(KJ)","bv(JR)","bv(U4)","bv(o0)","~(@)","u4(@)","bv(c5s)","~(uX)"])
B.b0B.prototype={
$0(){return J.cqC(this.a.bh())},
$S:1}
B.b0C.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.T(v)
if(y.i.b(u)){x=u
w=A.bl(v)
this.b.ds(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.bZK.prototype={
$1(d){var x,w,v,u=$.a4().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Y.e0(A.a6(["type","termine","contenu",A.D(v,y.z)],v,y.K),null),keepalive:!0})},
$S:23}
B.bZJ.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.ax6.prototype={
$1(d){if(d==null)return null
return A.cc(J.o(d))},
$S:108}
B.bnS.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.I3(!0)},
$S:0}
B.bnT.prototype={
$1(d){return this.a.Si()},
$S:27}
B.bnP.prototype={
$0(){var x=this.a.c
if(x!=null)A.ab(x,!1).bK()},
$S:0}
B.bnQ.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bnM.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bnN.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bnO.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bnJ.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bnK.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bnL.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.c3b(x.w,null,w,x.y,u,null,null,!1,v)},
$S:1170}
B.bnR.prototype={
$0(){return this.a.b0r()},
$S:0}
B.bnu.prototype={
$1(d){this.a.xm("candidat_ice",d,!1)},
$S:207}
B.bnv.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bnt(x))},
$S:0}
B.bnt.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bnw.prototype={
$0(){this.a.mn(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bnx.prototype={
$0(){},
$S:0}
B.bny.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.m(new B.bns(x,w))},
$S:27}
B.bns.prototype={
$0(){return this.a.ch=new A.ax(Date.now(),0,!1).ew(this.b)},
$S:0}
B.bnz.prototype={
$1(d){},
$S:135}
B.bnA.prototype={
$1(d){this.a.xt()},
$S:27}
B.bng.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.xm("annule",C.e7,!1)
x.mn(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bnh.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bni.prototype={
$1(d){this.a.xm("candidat_ice",d,!1)},
$S:207}
B.bnj.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bnf(x))},
$S:0}
B.bnf.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bnk.prototype={
$0(){this.a.mn(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bnl.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bnm.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.m(new B.bne(x,w))},
$S:27}
B.bne.prototype={
$0(){return this.a.ch=new A.ax(Date.now(),0,!1).ew(this.b)},
$S:0}
B.bnn.prototype={
$1(d){},
$S:135}
B.bno.prototype={
$1(d){this.a.xt()},
$S:27}
B.bnC.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.QU()
x.aeb("reponse",d)},
$S:389}
B.bnD.prototype={
$1(d){this.a.mn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bnE.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.QU()},
$S:31}
B.bnF.prototype={
$1(d){this.a.mn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bnG.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.aeb("offre",d)},
$S:389}
B.bnH.prototype={
$1(d){this.a.mn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bnp.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.ax(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.bnq.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bnr.prototype={
$1(d){var x=this.a.c
if(x!=null)A.ab(x,!1).bK()},
$S:4}
B.bnB.prototype={
$1(d){return A.D(y.N,y.z)},
$S:124}
B.bnd.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bnc.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bnb.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.bnI.prototype={
$2(d,e){if(!d)this.a.HY()},
$S:1174}
B.b00.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b01.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aKB(w)},
$S:z+4}
B.b02.prototype={
$1(d){var x
if(d===D.N8){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aAN.prototype={
$1(d){return this.a.a17()},
$S:21}
B.aAO.prototype={
$0(){var x=this.a
if(!x.e)x.FT()},
$S:0}
B.c_I.prototype={
$1(d){return d.length!==0},
$S:9}
B.aQB.prototype={
$1(d){return this.a.push(B.c40(d))},
$S:21}
B.aQC.prototype={
$1(d){return this.a.push(B.c40(d))},
$S:21}
B.aQy.prototype={
$1(d){},
$S:22}
B.aQz.prototype={
$1(d){},
$S:22}
B.aQA.prototype={
$1(d){},
$S:22}
B.aQm.prototype={
$0(){return!1},
$S:53}
B.aQn.prototype={
$0(){return!1},
$S:53}
B.aQo.prototype={
$1(d){J.hi(d,new B.aQl(this.a))},
$S:207}
B.aQl.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:50}
B.aVM.prototype={
$1(d){},
$S:22}
B.aVN.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.JR(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:22}
B.aVO.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cKL(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.c7K())switch(w.cx.a){case 0:w.cy=D.Nd
break
case 1:w.cy=D.Ne
break
case 3:w.cy=D.Nf
break
case 5:w.cy=D.Nb
break
case 6:w.cy=D.Nc
break
case 7:w.cy=D.uf
break
default:break}},
$S:34}
B.aVP.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cKM(w.iceGatheringState)},
$S:34}
B.aVQ.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cMM(w.signalingState)},
$S:34}
B.aVR.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cLZ(w.connectionState)},
$S:34}
B.aVS.prototype={
$1(d){},
$S:34}
B.aVT.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.c40(d.track)
x=d.streams
x=y.l.b(x)?x:new A.d2(x,A.W(x).i("d2<1,aB>"))
w=J.dC(x,new B.aVL(w),y.h)
v.$1(new B.U4(A.I(w,!0,w.$ti.i("aE.E"))))}},
$S:22}
B.aVL.prototype={
$1(d){return new B.u4(d,this.a.as)},
$S:z+7}
B.c_R.prototype={
$1(d){return J.h_(self.window.navigator.userAgent,A.bD(d,!1,!1))},
$S:9}
B.aVZ.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.P)(w),++u)w[u].Y(0)
C.b.a0(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.abm(t)
v=y.k.c
w.push(A.ix(t,"canplay",new B.aVV(x),!1,v))
w.push(A.ix(t,"resize",new B.aVW(x),!1,v))
w.push(A.ix(t,"error",new B.aVX(t),!1,v))
w.push(A.ix(t,"ended",new B.aVY(),!1,v))
return t},
$S:165}
B.aVV.prototype={
$1(d){this.a.alp()},
$S:21}
B.aVW.prototype={
$1(d){this.a.alp()},
$S:21}
B.aVX.prototype={
$1(d){var x,w,v=this.a.error
A.oB("RTCVideoRenderer: videoElement.onError, "+J.o(v))
v.toString
x=C.Is.h(0,A.au(v,"code"))
x.toString
w=!J.t(A.au(v,"message"),"")?A.au(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nV(x,C.Ir.h(0,A.au(v,"code")),w,null))},
$S:23}
B.aVY.prototype={
$1(d){},
$S:21}
B.aW_.prototype={
$0(){},
$S:0}
B.aW1.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aW0.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a9F("RTCVideoRenderer-"+w.Q)
else w=A.R(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cN(A.R(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1175}
B.aJo.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fv(w.gia(w),new B.aJn(v),w.gpc())},
$S:0}
B.aJn.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.ahJ()
x=x.b
x===$&&A.d()
x.a6(0)},
$S:0}
B.bsv.prototype={
$1(d){},
$S:16}
B.azk.prototype={
$1(d){this.a.cB(0,this.b)},
$S:22}
B.azl.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.ho(new B.LH("Failed to connect WebSocket"))
else this.b.acJ(1006,"error")},
$S:22}
B.azm.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cv("data")
if(typeof x==="string")w.b=new B.L8(A.bo(x))
else if(typeof x==="object"&&A.ccI(y.m.a(x),"ArrayBuffer"))w.b=new B.Gv(A.SZ(y.o.a(x),0,null))
else throw A.n(A.ak("unexpected message type: "+J.aG(x).k(0)))
v.E(0,w.bh())},
$S:23}
B.azn.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cB(0,this.b)
this.b.acJ(d.code,d.reason)},
$S:22}
B.ave.prototype={
$1(d){var x=d.b,w=this.a
new A.cG(x,A.y(x).i("cG<1>")).cS(new B.avb(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cG(x,A.y(x).i("cG<1>")).bhz(new B.avc(d),new B.avd(w,d))
w.f.dJ(0)},
$S:z+8}
B.avb.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.L8
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.Gv
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.GW){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a6(0)}}},
$S:z+9}
B.avc.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.am(B.c5t())
s=A.c3(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a90(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a90(new Uint8Array(A.bS(u)))
break $label1$1}t=A.aS("Cannot send "+J.aG(d).k(0))
throw A.n(t)}}catch(r){if(!(A.T(r) instanceof B.LG))throw r}},
$S:18}
B.avd.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.yl(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.T(q) instanceof B.LG))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.avf.prototype={
$1(d){var x,w=d instanceof A.WF?d:new B.agL(J.o(d)),v=this.a
v.f.ho(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.hU(w)
v=v.a
v===$&&A.d()
v.a6(0)},
$S:34};(function aliases(){var x=B.Hv.prototype
x.ayq=x.a6})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Ze.prototype,"gaEe","FI",0)
var v
w(v=B.Zd.prototype,"galg","alh",2)
x(v,"gaim","HY",0)
x(v,"gaiI","b0l",1)
x(v,"gabA","Ok",0)
x(v,"gabz","Oj",0)
x(v,"gabx","Og",0)
x(v,"gaby","Oh",0)
w(v=B.a6V.prototype,"gb08","b09",6)
x(v,"gaZB","a17",1)
x(B.U5.prototype,"gec","l",0)
x(B.U8.prototype,"gaXt","aXu",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a7,[B.Hv,B.ax5,B.KJ,B.a79,B.b0_,B.a6V,B.aaL,B.aVJ,B.Sy,B.J2,B.aQj,B.U2,B.U3,B.aVU,B.aft,B.a_6,B.afs,B.AO,B.uX,B.LH,B.agL,B.JR,B.DQ,B.U4,B.U6])
w(B.VF,A.fV)
x(A.k5,[B.b0B,B.bZJ,B.bnS,B.bnP,B.bnQ,B.bnM,B.bnN,B.bnO,B.bnJ,B.bnK,B.bnR,B.bnv,B.bnt,B.bnw,B.bnx,B.bns,B.bng,B.bnh,B.bnj,B.bnf,B.bnk,B.bnl,B.bne,B.bnp,B.bnq,B.bnd,B.bnc,B.bnb,B.aAO,B.aQm,B.aQn,B.aW_,B.aW1,B.aJo,B.aJn,B.avd])
x(A.jx,[B.b0C,B.bZK,B.ax6,B.bnT,B.bnL,B.bnu,B.bny,B.bnz,B.bnA,B.bni,B.bnm,B.bnn,B.bno,B.bnC,B.bnD,B.bnE,B.bnF,B.bnG,B.bnH,B.bnr,B.bnB,B.b00,B.b01,B.b02,B.aAN,B.c_I,B.aQB,B.aQC,B.aQy,B.aQz,B.aQA,B.aQo,B.aVM,B.aVN,B.aVO,B.aVP,B.aVQ,B.aVR,B.aVS,B.aVT,B.aVL,B.c_R,B.aVZ,B.aVV,B.aVW,B.aVX,B.aVY,B.bsv,B.azk,B.azl,B.azm,B.azn,B.ave,B.avb,B.avc,B.avf])
x(A.S,[B.qv,B.qu,B.U7])
x(A.X,[B.Ze,B.Zd,B.U8])
x(A.aw,[B.XQ,B.aip,B.XR,B.zr])
x(A.th,[B.bnI,B.aQl,B.aW0])
w(B.aVK,B.aVJ)
w(B.u4,B.Sy)
w(B.abe,B.J2)
w(B.aQk,B.aQj)
w(B.ad7,B.U2)
w(B.ad8,B.U3)
w(B.c4I,B.aVU)
w(B.U5,A.dp)
x(B.aft,[B.a9o,B.ava])
x(B.uX,[B.L8,B.Gv,B.GW])
w(B.LG,B.LH)
w(B.arP,B.Hv)
x(A.Mc,[B.yw,B.U1,B.yv,B.o0,B.ad9])})()
A.os(b.typeUniverse,JSON.parse('{"Hv":{"e1":["1"]},"VF":{"fV":["1","2"],"fV.S":"1","fV.T":"2"},"qv":{"S":[],"q":[]},"Ze":{"X":["qv"]},"XQ":{"aw":[],"q":[]},"qu":{"S":[],"q":[]},"Zd":{"X":["qu"]},"aip":{"aw":[],"q":[]},"XR":{"aw":[],"q":[]},"zr":{"aw":[],"q":[]},"u4":{"Sy":[]},"abe":{"J2":[]},"ad7":{"U2":[]},"ad8":{"U3":[]},"U5":{"dp":["U6"],"aZ":[]},"U7":{"S":[],"q":[]},"U8":{"X":["U7"]},"a_6":{"e1":["1"]},"AO":{"c5s":[]},"L8":{"uX":[]},"Gv":{"uX":[]},"GW":{"uX":[]},"LH":{"bN":[]},"LG":{"bN":[]},"arP":{"e1":["@"]},"agL":{"bN":[]}}'))
A.cgY(b.typeUniverse,JSON.parse('{"Hv":1,"aft":1}'))
var y=(function rtii(){var x=A.aA
return{b:x("AO"),L:x("bN"),_:x("av<@>"),x:x("av<~>"),S:x("H<af<p,O>>"),t:x("H<af<p,@>>"),Q:x("H<J2>"),d:x("H<jd<@>>"),s:x("H<p>"),p:x("H<q>"),m:x("aB"),l:x("E<aB>"),F:x("E<af<p,@>>"),j:x("E<@>"),I:x("E<v>"),P:x("af<p,@>"),f:x("af<@,@>"),E:x("Sy"),G:x("J2"),h:x("u4"),o:x("qS"),a:x("bv"),K:x("a7"),J:x("U2"),e:x("U3"),v:x("DQ"),Z:x("afs<a7?>"),N:x("p"),i:x("rq"),M:x("dY"),D:x("uX"),U:x("V<p>"),g:x("dO<KJ>"),n:x("dO<~>"),V:x("b5<AO>"),r:x("b5<@>"),R:x("b5<~>"),k:x("Zo<aB>"),C:x("pQ<aB>"),u:x("az<AO>"),c:x("az<@>"),W:x("az<~>"),q:x("kx"),y:x("O"),z:x("@"),A:x("aB?"),X:x("a7?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.Xf=new B.a79(C.kI)
D.zz=new A.ap(32,0,32,0)
D.Al=new A.aq(57639,"MaterialIcons",null,!1)
D.a2a=new A.aq(58337,"MaterialIcons",null,!1)
D.a2b=new A.aq(58341,"MaterialIcons",null,!1)
D.a2f=new A.aq(58923,"MaterialIcons",null,!1)
D.Ar=new A.aq(59048,"MaterialIcons",null,!1)
D.a2g=new A.aq(59049,"MaterialIcons",null,!1)
D.a2h=new A.aq(59077,"MaterialIcons",null,!1)
D.a28=new A.aq(58195,"MaterialIcons",null,!1)
D.a48=new A.ac(D.a28,28,C.m,null,null)
D.ady=A.a(x([1,2,4,8,16]),A.aA("H<v>"))
D.aj3=A.a(x([]),y.Q)
D.IE=new A.fT("FlutterWebRTC.Method",C.bf,null)
D.asX=new B.o0(0,"RTCIceConnectionStateNew")
D.asY=new B.o0(1,"RTCIceConnectionStateChecking")
D.asZ=new B.o0(2,"RTCIceConnectionStateCompleted")
D.at_=new B.o0(3,"RTCIceConnectionStateConnected")
D.at0=new B.o0(4,"RTCIceConnectionStateCount")
D.N8=new B.o0(5,"RTCIceConnectionStateFailed")
D.at1=new B.o0(6,"RTCIceConnectionStateDisconnected")
D.N9=new B.o0(7,"RTCIceConnectionStateClosed")
D.Na=new B.U1(0,"RTCIceGatheringStateNew")
D.at2=new B.U1(1,"RTCIceGatheringStateGathering")
D.at3=new B.U1(2,"RTCIceGatheringStateComplete")
D.uf=new B.yv(0,"RTCPeerConnectionStateClosed")
D.Nb=new B.yv(1,"RTCPeerConnectionStateFailed")
D.Nc=new B.yv(2,"RTCPeerConnectionStateDisconnected")
D.Nd=new B.yv(3,"RTCPeerConnectionStateNew")
D.Ne=new B.yv(4,"RTCPeerConnectionStateConnecting")
D.Nf=new B.yv(5,"RTCPeerConnectionStateConnected")
D.at4=new B.yw(0,"RTCSignalingStateStable")
D.at5=new B.yw(1,"RTCSignalingStateHaveLocalOffer")
D.at6=new B.yw(2,"RTCSignalingStateHaveRemoteOffer")
D.at7=new B.yw(3,"RTCSignalingStateHaveLocalPrAnswer")
D.at8=new B.yw(4,"RTCSignalingStateHaveRemotePrAnswer")
D.Ng=new B.yw(5,"RTCSignalingStateClosed")
D.at9=new B.U6(0,0,0)
D.ug=new B.ad9(0,"RTCVideoViewObjectFitContain")
D.Nh=new B.ad9(1,"RTCVideoViewObjectFitCover")
D.oC=new A.ci(20,null,null,null)
D.awE=new A.ci(48,null,null,null)
D.OM=new A.ci(null,64,null,null)
D.azM=new A.C(!0,C.m,null,null,null,null,22,C.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Pq=new A.C(!0,C.m,null,null,null,null,26,C.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.azZ=new A.C(!0,C.n,null,null,null,null,32,C.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Pz=new A.C(!0,C.n,null,null,null,null,40,C.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.vu=new A.C(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c6s=null
$.cg2=!1
$.cee=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cSI","c7Z",()=>new B.aVK())
x($,"cPk","c7K",()=>C.d.q(A.au(A.au(A.au(A.c7o(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"gaQsAEeFLXIzpQRfFq98JJHW+nM=");