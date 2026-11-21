((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Hs:function Hs(){},VB:function VB(d){this.$ti=d},b0o:function b0o(d){this.a=d},b0p:function b0p(d,e){this.a=d
this.b=e},
ciC(d){var x
B.bXt()
if(d.length===0)return
x=A.bR(new B.bZc(d))
self.window.addEventListener("beforeunload",x)
$.c5N=new B.bZb(x)},
bXt(){var x=$.c5N
if(x!=null)x.$0()
$.c5N=null},
bZc:function bZc(d){this.a=d},
bZb:function bZb(d){this.a=d},
a5r(d){var x,w,v,u,t=new B.awW(),s=J.P(d),r=s.h(d,"id")
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
return new B.awV(r,x,w,v,u)},
c4f(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.o(s==null?"":s)
x=u.h(d,"appel_id")
J.o(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.o(x==null?"":x)
w=u.h(d,"type")
w=J.o(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mu(t,y.N,y.z):C.e5
if(u.h(d,"cree_le")!=null)A.cb(J.o(u.h(d,"cree_le")))
return new B.KG(s,x,w,v)},
crX(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.X6
x=A.a([],y.t)
for(r=J.at(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mu(s,u,t))}return new B.a72(x)},
bZ8(d){var x=C.c.ag(d.a,1e6)
return C.d.b5(C.c.k(C.c.ag(x,60)),2,"0")+":"+C.d.b5(C.c.k(C.c.a4(x,60)),2,"0")},
cjn(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.pY(v)
if(!x.n(v,"offer")&&!x.n(v,"answer"))return null
return new A.anR(w,v)},
cIb(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.anU(u,A.jk(w)?w:null,v)},
awV:function awV(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
awW:function awW(){},
KG:function KG(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a72:function a72(d){this.a=d},
caL(d,e,f,g,h,i,j){return new B.qu(f,g,j,i,e,d,null)},
c2x(d,e,f,g,h,i,j,k,l){return new B.qt(f,l,h,k,d,i,j,e,g,null)},
cfx(d,e,f,g,h,i,j,k,l,m,n){return new B.aii(g,f,e,i,h,d,m,l,k,j,n,null)},
qu:function qu(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
Za:function Za(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
bnG:function bnG(d){this.a=d},
bnH:function bnH(d){this.a=d},
bnD:function bnD(d){this.a=d},
bnE:function bnE(d){this.a=d},
bnA:function bnA(d){this.a=d},
bnB:function bnB(d){this.a=d},
bnC:function bnC(d){this.a=d},
bnx:function bnx(d){this.a=d},
bny:function bny(d){this.a=d},
bnz:function bnz(d){this.a=d},
bnF:function bnF(d){this.a=d},
XM:function XM(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qt:function qt(d,e,f,g,h,i,j,k,l,m){var _=this
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
Z9:function Z9(d,e){var _=this
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
bni:function bni(d){this.a=d},
bnj:function bnj(d){this.a=d},
bnh:function bnh(d){this.a=d},
bnk:function bnk(d){this.a=d},
bnl:function bnl(){},
bnm:function bnm(d){this.a=d},
bng:function bng(d,e){this.a=d
this.b=e},
bnn:function bnn(){},
bno:function bno(d){this.a=d},
bn4:function bn4(d){this.a=d},
bn5:function bn5(d){this.a=d},
bn6:function bn6(d){this.a=d},
bn7:function bn7(d){this.a=d},
bn3:function bn3(d){this.a=d},
bn8:function bn8(d){this.a=d},
bn9:function bn9(d){this.a=d},
bna:function bna(d){this.a=d},
bn2:function bn2(d,e){this.a=d
this.b=e},
bnb:function bnb(){},
bnc:function bnc(d){this.a=d},
bnq:function bnq(d){this.a=d},
bnr:function bnr(d){this.a=d},
bns:function bns(d){this.a=d},
bnt:function bnt(d){this.a=d},
bnu:function bnu(d){this.a=d},
bnv:function bnv(d){this.a=d},
bnd:function bnd(d,e){this.a=d
this.b=e},
bne:function bne(d){this.a=d},
bnf:function bnf(d){this.a=d},
bnp:function bnp(){},
bn1:function bn1(d,e){this.a=d
this.b=e},
bn0:function bn0(d,e){this.a=d
this.b=e},
bn_:function bn_(d,e){this.a=d
this.b=e},
bnw:function bnw(d){this.a=d},
aii:function aii(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
XN:function XN(d,e){this.c=d
this.a=e},
zq:function zq(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
b_N:function b_N(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b_O:function b_O(d){this.a=d},
b_P:function b_P(d){this.a=d},
b_Q:function b_Q(d){this.a=d},
a6O:function a6O(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aAC:function aAC(d){this.a=d},
aAD:function aAD(d){this.a=d},
atP(d){var x=y.U,w=A.I(new A.X(A.a(d.split(" "),y.s),new B.c_7(),x),!0,x.i("x.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gS(w),0).toUpperCase()
return(J.m(C.b.gS(w),0)+J.m(C.b.gaW(w),0)).toUpperCase()},
c_7:function c_7(){},
aaE:function aaE(){this.a=null},
aVx:function aVx(){},
u3:function u3(d,e){this.e=d
this.b=e},
aQq:function aQq(d){this.a=d},
aQr:function aQr(d){this.a=d},
c3k(d){var x=new B.ab8(d)
x.aDj(d)
return x},
ab8:function ab8(d){this.d=d},
aQn:function aQn(d){this.a=d},
aQo:function aQo(d){this.a=d},
aQp:function aQp(d){this.a=d},
aQ9:function aQ9(){},
aQb:function aQb(){},
aQc:function aQc(){},
aQd:function aQd(d){this.a=d},
aQa:function aQa(d){this.a=d},
cxS(d,e){var x=y.N
x=new B.ad0(d,e,A.D(x,y.E),A.D(x,y.z))
x.aDs(d,e)
return x},
ad0:function ad0(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aVz:function aVz(d){this.a=d},
aVA:function aVA(d){this.a=d},
aVB:function aVB(d){this.a=d},
aVC:function aVC(d){this.a=d},
aVD:function aVD(d){this.a=d},
aVE:function aVE(d){this.a=d},
aVF:function aVF(d){this.a=d},
aVG:function aVG(d){this.a=d},
aVy:function aVy(d){this.a=d},
ad1:function ad1(){},
c41:function c41(d){this.a=d},
cKm(){return C.b.nt(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.c_f())!==-1},
c_f:function c_f(){},
cdt(){var x=A.a([],y.d),w=$.cdu
$.cdu=w+1
return new B.U1(w,x,D.asY,$.ai())},
U1:function U1(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aVM:function aVM(d){this.a=d},
aVI:function aVI(d){this.a=d},
aVJ:function aVJ(d){this.a=d},
aVK:function aVK(d){this.a=d},
aVL:function aVL(){},
c42(d,e,f){return new B.U3(d,f,e,null)},
U3:function U3(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
U4:function U4(){this.c=this.a=null},
aVN:function aVN(){},
aVP:function aVP(d){this.a=d},
aVO:function aVO(d){this.a=d},
cbp(d,e,f,g){var x,w={}
w.a=d
x=new B.a9h(g.i("a9h<0>"))
x.aD0(e,f,w,g)
return x},
a9h:function a9h(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aJd:function aJd(d,e){this.a=d
this.b=e},
aJc:function aJc(d){this.a=d},
a_2:function a_2(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bsj:function bsj(){},
afl:function afl(d){this.b=this.a=$
this.$ti=d},
afm:function afm(){},
c1W(d,e){return B.cr9(d,e)},
cr9(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$c1W=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.pD("ws")&&!d.pD("wss"))throw A.n(A.fE(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.k(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.AM(r,A.fU(null,null,null,!1,y.D))
u=new A.az($.aI,y.u)
p=new A.b5(u,y.V)
if(J.t(r.readyState,1))p.cB(0,q)
else if(J.t(r.readyState,2)||J.t(r.readyState,3))p.ho(new B.LE("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.pO(r,"open",!1,y.C).gS(0).aJ(new B.az9(p,q),y.H)
t=y.C
s=y.H
new A.pO(r,"error",!1,t).gS(0).aJ(new B.aza(p,q),s)
A.iw(r,"message",new B.azb(q),!1,y.m)
new A.pO(r,"close",!1,t).gS(0).aJ(new B.azc(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$c1W,w)},
AM:function AM(d,e){this.a=d
this.b=e},
az9:function az9(d,e){this.a=d
this.b=e},
aza:function aza(d,e){this.a=d
this.b=e},
azb:function azb(d){this.a=d},
azc:function azc(d,e){this.a=d
this.b=e},
c4N(){return new B.LD("Connection Closed")},
uW:function uW(){},
L5:function L5(d){this.a=d},
Gs:function Gs(d){this.a=d},
GT:function GT(d,e){this.a=d
this.b=e},
LE:function LE(d){this.a=d},
LD:function LD(d){this.a=d},
cqC(d){var x=null,w=$.aI,v=new B.afl(y.Z),u=y.X,t=A.fU(x,x,x,!0,u),s=A.fU(x,x,x,!0,u),r=A.y(s),q=A.y(t)
v.a=B.cbp(new A.cG(s,r.i("cG<1>")),new A.FE(t,q.i("FE<1>")),!0,u)
v.b=B.cbp(new A.cG(t,q.i("cG<1>")),new A.FE(s,r.i("FE<1>")),!1,u)
v=new B.av_(new A.b5(new A.az(w,y.W),y.R),v)
v.aCK(d)
return v},
av_:function av_(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
av3:function av3(d){this.a=d},
av0:function av0(d){this.a=d},
av1:function av1(d){this.a=d},
av2:function av2(d,e){this.a=d
this.b=e},
av4:function av4(d){this.a=d},
arF:function arF(d,e){this.b=d
this.a=e},
agE:function agE(d){this.a=d},
cJX(d){switch(d){case"new":return D.asL
case"checking":return D.asM
case"connected":return D.asO
case"completed":return D.asN
case"failed":return D.N0
case"disconnected":return D.asQ
case"closed":return D.N1
case"count":return D.asP}return D.N1},
cJY(d){switch(d){case"new":return D.N2
case"gathering":return D.asR
case"complete":return D.asS}return D.N2},
cLT(d){switch(d){case"stable":return D.asT
case"have-local-offer":return D.asU
case"have-local-pranswer":return D.asW
case"have-remote-offer":return D.asV
case"have-remote-pranswer":return D.asX
case"closed":return D.N8}return D.N8},
cL9(d){switch(d){case"new":return D.N5
case"connecting":return D.N6
case"connected":return D.N7
case"closed":return D.ub
case"disconnected":return D.N4
case"failed":return D.N3}return D.ub},
yv:function yv(d,e){this.a=d
this.b=e},
TY:function TY(d,e){this.a=d
this.b=e},
yu:function yu(d,e){this.a=d
this.b=e},
o0:function o0(d,e){this.a=d
this.b=e},
ad2:function ad2(d,e){this.a=d
this.b=e},
aVw:function aVw(){},
Su:function Su(){},
J_:function J_(){},
aQ8:function aQ8(){},
JO:function JO(d,e,f){this.a=d
this.b=e
this.c=f},
TZ:function TZ(){},
U_:function U_(){},
aVH:function aVH(){},
DM:function DM(d,e){this.a=d
this.b=e},
U0:function U0(d){this.b=d},
U2:function U2(d,e,f){this.a=d
this.b=e
this.c=f},
c2W(d){var x=0,w=A.k(y.y)
var $async$c2W=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.k(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$c2W,w)},
abv(d){var x=0,w=A.k(y.H),v
var $async$abv=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b5f("enableSpeakerphone",A.a5(["enable",d],y.N,v),v,v),$async$abv)
case 2:return A.i(null,w)}})
return A.j($async$abv,w)},
aSr(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aSr=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mu(y.f.a(A.bYX(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.SL(0,u),$async$aSr)
case 5:case 4:v=A.cZ(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aSr,w)},
b5f(d,e,f,g){return B.cBo(d,e,f,g,f.i("0?"))},
cBo(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b5f=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b5e(),$async$b5f)
case 3:v=D.Ix.cj(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b5f,w)},
b5e(){var x=0,w=A.k(y.H),v,u
var $async$b5e=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.cfi?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Ix.cj("initialize",A.a5(["options",A.D(v,u)],v,u),!1,y.H),$async$b5e)
case 4:$.cfi=!0
case 3:return A.i(null,w)}})
return A.j($async$b5e,w)}},D,E
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[29]
E=c[19]
B.Hs.prototype={
E(d,e){this.a.E(0,e)},
ds(d,e){this.a.ds(d,e)},
a6(d){return this.a.a6(0)},
$ie1:1}
B.VB.prototype={
hw(d){var x=A.cv("subscription"),w=A.fU(new B.b0o(x),null,null,!0,this.$ti.y[1])
x.b=d.fu(new B.b0p(this,w),w.gnm(w),w.gpc())
return new A.cG(w,A.y(w).i("cG<1>"))}}
B.awV.prototype={}
B.KG.prototype={}
B.a72.prototype={}
B.qu.prototype={
O(){return new B.Za()}}
B.Za.prototype={
V(){var x,w,v=this
v.a_()
x=v.a
x.toString
v.z=!0
w=new B.aaE()
v.y!==$&&A.aJ()
v.y=w
if(!x.y)w.tB(A.AZ(C.kC,$.vw().a).c)
v.O5()
v.r=A.ds(C.c1,new B.bnG(v))
v.w=A.hc(C.z7,new B.bnH(v))},
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
a1g(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.ds(C.fu,new B.bnD(this))},
Sf(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Sf=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a3()
x=7
return A.e(o.Df(p.c),$async$Sf)
case 7:r=e
q=B.a5r(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.m(new B.bnE(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
p=s.y
p===$&&A.d()
p.ic()
s.a1g()}u=2
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
return A.j($async$Sf,w)},
O5(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$O5=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a3()
x=7
return A.e(n.Df(o.c),$async$O5)
case 7:r=e
q=B.a5r(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gzj()
p=m
if(q.w!=="sonne"||q.c===p){s.m(new B.bnA(s))
o=s.y
o===$&&A.d()
o.ic()
s.a1g()
x=1
break}s.m(new B.bnB(s))
if(s.a.y)s.FG()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.m(new B.bnC(s))
o=s.y
o===$&&A.d()
o.ic()
s.a1g()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$O5,w)},
FG(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$FG=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.m(new B.bnx(s))
u=4
q=s.a
q.toString
p=$.a3()
x=7
return A.e(p.K8(q.c,"accepte"),$async$FG)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.Q(n)
if(s.c==null){x=1
break}s.m(new B.bny(s))
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
A.ab(q,!1).zx(A.en(new B.bnz(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$FG,w)},
I_(d){return this.b0m(d)},
b0l(){return this.I_(!1)},
b0m(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$I_=A.f(function(e,f){if(e===1){t=f
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
q=$.a3()
x=7
return A.e(q.K8(r.c,"refuse"),$async$I_)
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
return A.j($async$I_,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.ju(C.t,s,A.c(B.atP(r.d),s,s,s,s,D.Pq,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.Pi,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.ax,new A.a0(D.zu,x,s),C.k,A.c(q,s,s,s,s,D.vp,s,s,s),D.OE],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.bnF(t)
v=A.b("Accepter")
u=t.f?s:t.gaEb()
q.push(A.U(A.a([new B.XM(D.Ag,C.aF,r,x,s),D.aws,new B.XM(C.na,C.cL,v,u,s)],w),C.o,C.bz,C.i,s))}if(t.d)q.push(C.xP)
return A.eW(s,C.n,A.fu(!0,A.cQ(A.J(q,C.o,C.f,C.T),s,s),!0,C.a7,!0,!0),s,s,s)}}
B.XM.prototype={
D(d){var x=this,w=null,v=A.dm(x.d,w,w,C.a7,C.cK,w)
return A.J(A.a([A.ae(A.b6(!1,A.c6(x.c,C.m,w,32),C.j,w,C.q,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.ea,w,w,w)],y.p),C.o,C.f,C.T)}}
B.qt.prototype={
O(){return new B.Z9(A.b4(y.N),C.R)}}
B.Z9.prototype={
V(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.a_()
x=o.a
o.r=x.c
x=x.w
if(x==null)x=new B.b_N(B.cdt(),B.cdt())
o.d!==$&&A.aJ()
o.d=x
w=o.a
v=w.x
if(v==null)v=new B.a6O(new A.dO(n,n,y.g),new A.dO(n,n,y.n))
o.e!==$&&A.aJ()
o.e=v
o.fr=!0
u=new B.aaE()
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
t.bcj(s,r,x,v,w.f,p)
x=o.a
if(x.Q)t.as=!0
if(q){o.Rj()
return}if(x.f)u.tB("assets/audio/tonalite-appel.wav")
o.rB()},
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
if(!(w.r&&w.a===x.r&&!x.y)){B.bXt()
w=x.d
w===$&&A.d()
w.hd()
w=x.e
w===$&&A.d()
w.JT()}x.a7()},
Rj(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Rj=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.a3()
s.w=o.gzj()
n=$.kI()
s.Q=n.x
s.as=n.y
s.x=n.e
n=n.f
s.ay=n
if(n!=null){n=Date.now()
m=s.ay
m.toString
s.ch=new A.ax(n,0,!1).eC(m)}B.ciC(s.r)
u=4
s.a.toString
x=7
return A.e(o.bU("/messagerie/appels/"+s.r+"/signaux"),$async$Rj)
case 7:r=e
for(o=J.at(r),n=s.f;o.B();){q=o.gJ(o)
p=B.c4f(q)
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
n.f=new B.bni(s)
n.r=new B.bnj(s)
n.w=new B.bnk(s)
s.z=!0
if(o)s.m(new B.bnl())
s.cy=A.hc(C.cf,new B.bnm(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.bZ(n,A.y(n).i("bZ<1>")).cS(s.gald())
o=o.w
s.dx=new A.bZ(o,A.y(o).i("bZ<1>")).cS(new B.bnn())
s.CW=A.hc(C.fu,new B.bno(s))
s.xq()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Rj,w)},
rB(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$rB=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:s.cx=A.ds(C.c1,new B.bn4(s))
r="appel"
u=4
q=null
h=s.a
g=h.y
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$rB)
case 10:q=a2
h=s.r=B.a5r(q).a
x=8
break
case 9:g=$.a3()
x=11
return A.e(g.Df(h.c),$async$rB)
case 11:q=a2
h=s.r=s.a.c
case 8:g=$.kI()
g.bc5(h)
B.ciC(s.r)
if(s.a.f)g.TE()
p=B.a5r(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mn(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.a3()
s.w=h.gzj()
r="ice"
s.a.toString
o=h.U8()
n=s.HJ()
x=12
return A.e(o,$async$rB)
case 12:m=a2
l=B.crX(m)
x=15
return A.e(n,$async$rB)
case 15:x=!a2?13:14
break
case 13:if(s.c==null){x=1
break}s.m(new B.bn5(s))
x=16
return A.e(A.kf(C.kb,null,y.z),$async$rB)
case 16:if(s.c==null){x=1
break}s.mn(null)
x=1
break
case 14:r="webrtc"
f=s.d
f===$&&A.d()
e=s.a.d
x=17
return A.e(f.zv(A.a5(["iceServers",l.a],y.N,y.z),e==="video"),$async$rB)
case 17:f.f=new B.bn6(s)
f.r=new B.bn7(s)
f.w=new B.bn8(s)
if(s.c==null){x=1
break}s.m(new B.bn9(s))
g.bi2()
s.cy=A.hc(C.cf,new B.bna(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.bZ(f,A.y(f).i("bZ<1>")).cS(s.gald())
f=g.w
s.dx=new A.bZ(f,A.y(f).i("bZ<1>")).cS(new B.bnb())
s.a.toString
k=h.b
if(k!=null&&J.a4(k)!==0){s.a.toString
g.Tc(C.d.Wy("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.eQ(C.bM,k,C.ac,!0))}s.CW=A.hc(C.fu,new B.bnc(s))
s.xq()
u=2
x=6
break
case 4:u=3
a0=t
j=A.Q(a0)
i=A.bl(a0)
if(s.c==null){x=1
break}A.rT().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.dl?j.a:s.aVI(r)
h.u(y.q).f.C(A.A(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
s.mn(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$rB,w)},
aVI(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
HJ(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$HJ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.YX(),$async$HJ)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.E0(s.a.d==="video"),$async$HJ)
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
return A.j($async$HJ,w)},
YX(){var x=0,w=A.k(y.y),v
var $async$YX=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$YX,w)},
xq(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$xq=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.a3()
x=7
return A.e(p.bU("/messagerie/appels/"+s.r+"/signaux"),$async$xq)
case 7:r=e
for(p=J.at(r);p.B();){q=p.gJ(p)
s.ale(B.c4f(q))}u=2
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
return A.j($async$xq,w)},
ale(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cjn(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.CJ(A.a5(["sdp",v.a,"type",v.b],y.N,y.z)).aJ(new B.bnq(s),y.a).fn(new B.bnr(s))
break
case"reponse":if(!s.a.f)return
u=B.cjn(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.SK(A.a5(["sdp",u.a,"type",u.b],y.N,y.z)).aJ(new B.bns(s),y.a).fn(new B.bnt(s))
break
case"candidat_ice":t=B.cIb(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.SD(A.a5(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.JM().aJ(new B.bnu(s),y.a).fn(new B.bnv(s))
break
case"refuse":s.mn(A.b("Appel refus\xe9"))
break
case"annule":s.mn(A.b("Appel annul\xe9"))
break
case"termine":s.mn(A.b("Appel termin\xe9"))
break}},
QR(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$QR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.Y(0)
t=u.dy
t===$&&A.d()
t.ic()
u.m(new B.bnd(u,!1))
t=$.kI()
t.bjU()
s=u.Q
t.a6n(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$QR,w)},
xk(d,e,f){return this.aMn(d,e,f)},
ae9(d,e){return this.xk(d,e,!0)},
aMn(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$xk=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.a3()
x=6
return A.e(s.apf(t.r,e,d),$async$xk)
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
return A.j($async$xk,w)},
HU(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$HU=A.f(function(d,e){if(d===1){t=e
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
q=$.a3()
x=9
return A.e(q.K8(r,"termine"),$async$HU)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.bXt()
$.kI().M3()
r=s.c
if(r!=null)A.ab(r,!1).bK()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$HU,w)},
b0f(){var x=this
if(!x.x||x.y)return
$.kI().bld()
x.m(new B.bne(x))
$.aM.aE$.push(new B.bnf(x))},
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
w=$.a3()
w.K8(x,"termine").fn(new B.bnp())}if(d!=null&&v.c!=null)v.c.u(y.q).f.C(A.A(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))
B.bXt()
$.kI().M3()
x=v.c
if(x!=null)A.ab(x,!1).bK()},
Og(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Og=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.XQ(u),$async$Og)
case 2:if(v.c!=null)v.m(new B.bn1(v,u))
$.kI().a6n(v.as,u)
return A.i(null,w)}})
return A.j($async$Og,w)},
Of(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Of=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Fg(u),$async$Of)
case 2:if(v.c!=null)v.m(new B.bn0(v,u))
$.kI().a6n(u,v.Q)
return A.i(null,w)}})
return A.j($async$Of,w)},
Oc(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Oc=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.XN(u),$async$Oc)
case 2:if(v.c!=null)v.m(new B.bn_(v,u))
return A.i(null,w)}})
return A.j($async$Oc,w)},
Od(){var x=0,w=A.k(y.H),v=this,u
var $async$Od=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.SR(),$async$Od)
case 2:return A.i(null,w)}})
return A.j($async$Od,w)},
D(d){var x,w,v,u,t,s,r,q,p,o=this,n=null,m="Appel en cours\u2026",l="\xc7a sonne\u2026",k="Connexion\u2026",j=o.d
j===$&&A.d()
x=j.c
w=o.go
v=o.a
if(v.d==="video"&&o.z){if(x!=null)x=B.c42(j.e,!1,D.N9)
else{x=A.ju(C.t,n,A.c(B.atP(v.e),n,n,n,n,D.azW,n,n,n),n,48)
v=o.a
u=A.c(v.e,n,n,n,n,D.azA,n,n,n)
if(o.x)v=A.b(m)+" "+B.bZ8(o.ch)
else v=v.f&&o.z?A.b(l):A.b(k)
v=A.cQ(A.J(A.a([x,C.p,u,C.k,A.c(v,n,n,n,n,D.vp,n,n,n)],y.p),C.o,C.f,C.T),n,n)
x=v}j=A.a([A.TE(0,x),A.fj(n,A.fe(A.R(12),B.c42(j.d,!0,D.N9),C.ar),160,n,n,16,16,110)],y.p)
if(o.x)j.push(A.fj(n,new B.XN(o.gaiF(),n),n,n,16,n,16,n))
x=o.x
v=B.bZ8(o.ch)
u=o.Q
t=o.as
j.push(A.fj(24,B.cfx(o.ax,v,x,!0,t,u,o.gabw(),o.gabv(),o.gabx(),o.gaby(),o.gaij()),n,n,0,0,n,n))
j=A.es(C.aY,j,C.h,C.aX,n)}else{x=y.p
v=A.a([],x)
if(o.fy)v.push(A.fj(n,A.u6(B.c42(j.e,!1,D.uc),0),1,n,0,n,0,1))
if(o.x)v.push(A.fj(n,new B.XN(o.gaiF(),n),n,n,16,n,16,n))
j=A.ju(C.t,n,A.c(B.atP(o.a.e),n,n,n,n,D.Pq,n,n,n),n,56)
u=o.a
t=A.c(u.e,n,n,n,n,D.Pi,C.X,n,n)
s=o.fx
if(s==null)if(o.x)u=A.b(m)+" "+B.bZ8(o.ch)
else if(o.z)u=u.f?A.b(l):A.b(m)
else u=A.b(k)
else u=s
u=A.c(u,n,n,n,n,D.vp,C.X,n,n)
s=o.x
r=B.bZ8(o.ch)
q=o.Q
p=o.as
v.push(A.cQ(A.J(A.a([j,C.ax,new A.a0(D.zu,t,n),C.k,u,D.OE,B.cfx(o.ax,r,s,!1,p,q,o.gabw(),o.gabv(),o.gabx(),o.gaby(),o.gaij())],x),C.o,C.f,C.T),n,n))
v=A.es(C.aY,v,C.h,C.aX,n)
j=v}return A.c3M(w,A.eW(n,C.n,A.fu(!0,j,!0,C.a7,!0,!0),n,n,n),new B.bnw(o),y.K)}}
B.aii.prototype={
D(d){var x,w,v=this,u=null,t=y.p,s=A.a([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,E.Pu,u,u,u))
if(r&&v.c)s.push(C.p)
r=v.f
x=r?D.a23:D.a22
t=A.a([new B.zq(x,r,A.b("Muet"),v.x,u,u),D.oA,new B.zq(D.a29,v.r,A.b("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(D.oA)
if(r){x=v.w
w=x?D.Am:D.a28
t.push(new B.zq(w,!x,A.b("Cam\xe9ra"),v.z,u,u))}if(r)t.push(D.oA)
if(r)t.push(new B.zq(D.a27,!1,A.b("Basculer"),v.Q,u,u))
t.push(D.oA)
t.push(new B.zq(D.Ag,!1,A.b("Raccrocher"),v.as,C.aF,u))
s.push(A.U(t,C.o,C.bz,C.i,u))
return A.J(s,C.o,C.f,C.T)}}
B.XN.prototype={
D(d){var x=null
return A.J(A.a([A.ae(A.b6(!1,D.a40,C.j,x,C.q,x,x,x,x,this.c,x,A.dm(C.k4,x,x,C.a7,C.cK,x)),48,48),C.H,A.c(A.b("R\xe9duire"),x,x,x,x,C.vs,x,x,x)],y.p),C.o,C.f,C.T)}}
B.zq.prototype={
D(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?C.m:C.k4
if(!t)x=C.m
else x=w.d?C.n:C.m
t=A.dm(u,v,v,C.a7,C.cK,v)
return A.J(A.a([A.ae(A.b6(!1,A.c6(w.c,x,v,26),C.j,v,C.q,v,v,v,v,w.f,v,t),56,56),C.aW,A.c(w.e,v,v,v,v,C.vs,v,v,v)],y.p),C.o,C.f,C.T)}}
B.b_N.prototype={
E0(d){return this.bjJ(d)},
bjJ(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$E0=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jm(0),$async$E0)
case 3:$.c7e()
s=y.N
r=A.a5(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aQ9().F3(0,A.a5(["audio",r,"video",d&&A.a5(["facingMode","user"],s,s)],s,y.z)),$async$E0)
case 4:q=f
u.b=q
t.sa9t(0,q)
case 1:return A.i(v,w)}})
return A.j($async$E0,w)},
zv(d,e){return this.bkv(d,e)},
bkv(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$zv=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jm(0),$async$zv)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.E0(e),$async$zv)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.c7e().a4h(d,A.D(y.N,y.z)),$async$zv)
case 6:t=v.a=g
s=u.a8G(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a37(0,s[q],u),$async$zv)
case 10:case 8:s.length===r||(0,A.O)(s),++q
x=7
break
case 9:t.e=new B.b_O(v)
t.Q=new B.b_P(v)
t.d=new B.b_Q(v)
return A.i(null,w)}})
return A.j($async$zv,w)},
aKw(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa9t(0,d)
w.FS()
x=w.r
if(x!=null)x.$0()}},
FS(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$FS=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.ME(0)
if(m==null)m=C.dn
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aSr(n,s),$async$FS)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.Q(l)
A.rT().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.O)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$FS,w)},
JM(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$JM=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Tq(0),$async$JM)
case 3:t=e
x=4
return A.e(s.Fh(0,t),$async$JM)
case 4:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$JM,w)},
CJ(d){return this.bby(d)},
bby(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$CJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Fj(0,new B.DM(d.h(0,"sdp"),d.h(0,"type"))),$async$CJ)
case 3:x=4
return A.e(s.Tn(0),$async$CJ)
case 4:t=f
x=5
return A.e(s.Fh(0,t),$async$CJ)
case 5:v=A.a5(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$CJ,w)},
SK(d){return this.b8q(d)},
b8q(d){var x=0,w=A.k(y.H),v=this,u
var $async$SK=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.ak("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.Fj(0,new B.DM(d.h(0,"sdp"),d.h(0,"type"))),$async$SK)
case 2:return A.i(null,w)}})
return A.j($async$SK,w)},
SD(d){return this.b8b(d)},
b8b(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$SD=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Sq(new B.JO(A.al(d.h(0,"candidate")),A.al(d.h(0,"sdpMid")),A.dU(d.h(0,"sdpMLineIndex")))),$async$SD)
case 3:case 1:return A.i(v,w)}})
return A.j($async$SD,w)},
XQ(d){return this.awv(d)},
awv(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$XQ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.ME(0)
if(r==null)r=C.dn
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.O)(r),++s)r[s].sly(0,t)
return A.i(null,w)}})
return A.j($async$XQ,w)},
Fg(d){return this.awl(d)},
awl(d){var x=0,w=A.k(y.H),v=this
var $async$Fg=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.abv(d),$async$Fg)
case 2:x=3
return A.e(v.FS(),$async$Fg)
case 3:return A.i(null,w)}})
return A.j($async$Fg,w)},
XN(d){return this.awc(d)},
awc(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$XN=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.MQ(0)
if(s==null)s=C.dn
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.O)(s),++t)s[t].sly(0,d)
return A.i(null,w)}})
return A.j($async$XN,w)},
SR(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$SR=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.MQ(0)
if(s==null)s=D.aiU
if(s.length===0){x=1
break}x=3
return A.e(B.c2W(C.b.gS(s)),$async$SR)
case 3:case 1:return A.i(v,w)}})
return A.j($async$SR,w)},
hd(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hd=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.abv(!1),$async$hd)
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
p=p==null?null:p.a8G(0)
if(p==null)p=C.dn
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cqw(r)
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
case 19:case 14:p.length===o||(0,A.O)(p),++l
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
B.a6O.prototype={
Tc(d){return this.b9R(d)},
b9R(d){var x=0,w=A.k(y.H),v=this
var $async$Tc=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.FR(),$async$Tc)
case 2:return A.i(null,w)}})
return A.j($async$Tc,w)},
FR(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$FR=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.cqC(B.c1W(A.cF(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$FR)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cG(p,A.y(p).i("cG<1>")).b1(s.gb02(),!0,s.gaZw(),new B.aAC(s))
u=2
x=6
break
case 4:u=3
n=t
s.a14()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$FR,w)},
b03(d){var x,w,v,u
try{x=C.W.cQ(0,J.o(d),null)
v=y.P
if(!v.b(x))return
if(!J.t(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.c4f(w))}catch(u){}},
a14(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.ado[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.ds(A.dg(0,0,0,0,x),new B.aAD(w))},
JT(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$JT=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.dq(s,y.H),$async$JT)
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
r=s.w=new B.arF(s,q)}s=r.a6(0)}x=7
return A.e(y._.b(s)?s:A.dq(s,y.z),$async$JT)
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
return A.j($async$JT,w)}}
B.aaE.prototype={
tB(d){return this.bhd(d)},
bhd(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$tB=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.Gl():r).aT(0),$async$tB)
case 6:x=7
return A.e(t.a.XM(d),$async$tB)
case 7:x=8
return A.e(t.a.j7(C.If),$async$tB)
case 8:x=9
return A.e(t.a.i5(1),$async$tB)
case 9:x=10
return A.e(t.a.d9(0),$async$tB)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.Q(p)
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
B.aVx.prototype={
a4h(d,e){return this.bbo(d,e)},
bbo(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a4h=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a5(["mandatory",A.D(r,r),"optional",A.a([A.a5(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fI(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.c2(t)))
t=J.o(s)
v=B.cxS(C.cc.gkc().bd(new A.eD(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a4h,w)}}
B.u3.prototype={
ME(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.d1(w,A.V(w).i("d1<1,aB>"))
J.hi(w,new B.aQq(x))
return x},
MQ(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.d1(w,A.V(w).i("d1<1,aB>"))
J.hi(w,new B.aQr(x))
return x},
a8G(d){var x=A.I(this.ME(0),!0,y.G)
C.b.t(x,this.MQ(0))
return x}}
B.ab8.prototype={
aDj(d){var x=this,w=x.d
w.addEventListener("ended",A.bR(new B.aQn(x)))
w.addEventListener("mute",A.bR(new B.aQo(x)))
w.addEventListener("unmute",A.bR(new B.aQp(x)))},
sly(d,e){this.d.enabled=e},
SL(d,e){return this.b8t(0,e)},
b8t(d,e){var x=0,w=A.k(y.H),v=this
var $async$SL=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.e7(v.d.applyConstraints(y.m.a(A.c2(e))),y.X),$async$SL)
case 2:return A.i(null,w)}})
return A.j($async$SL,w)},
aT(d){var x=0,w=A.k(y.H),v=this
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aT,w)}}
B.aQ9.prototype={
F3(d,e){return this.avj(0,e)},
avj(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$F3=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cKm())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.jo(e.h(0,"video"),"facingMode")
e.cL(0,"video",new B.aQb())
e.cL(0,"audio",new B.aQc())}catch(a0){A.oA("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hJ(e.h(0,"audio"),i,i).aA(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.D(y.N,y.z)
J.hi(s,new B.aQd(r))
J.jo(e.h(0,"audio"),"optional")
J.jn(e.h(0,"audio"),r)}}catch(a0){q=A.Q(a0)
p=A.bl(a0)
A.oA("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.c2(e)
x=10
return A.e(A.e7(o.getUserMedia(h.a(n)),h),$async$F3)
case 10:m=a2
v=new B.u3(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.e7(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$F3)
case 11:l=a2
v=new B.u3(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.Q(f)
i=J.o(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$F3,w)}}
B.ad0.prototype={
aDs(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bR(new B.aVz(x)))
w.addEventListener("icecandidate",A.bR(new B.aVA(x)))
w.addEventListener("iceconnectionstatechange",A.bR(new B.aVB(x)))
w.onicegatheringstatechange=A.bR(new B.aVC(x))
w.addEventListener("signalingstatechange",A.bR(new B.aVD(x)))
if(!$.c7_())w.addEventListener("connectionstatechange",A.bR(new B.aVE(x)))
w.addEventListener("negotiationneeded",A.bR(new B.aVF(x)))
w.addEventListener("track",A.bR(new B.aVG(x)))},
Tq(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Tq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e7(s.createOffer(y.m.a(A.c2(A.D(y.N,y.z)))),y.A),$async$Tq)
case 3:t=f
v=new B.DM(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Tq,w)},
Tn(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Tn=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.e7(s.createAnswer(y.m.a(A.c2(A.D(y.N,y.z)))),y.A),$async$Tn)
case 3:t=f
v=new B.DM(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Tn,w)},
Fh(d,e){return this.awp(0,e)},
awp(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Fh=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e7(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Fh)
case 2:return A.i(null,w)}})
return A.j($async$Fh,w)},
Fj(d,e){return this.awF(0,e)},
awF(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Fj=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.e7(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$Fj)
case 2:return A.i(null,w)}})
return A.j($async$Fj,w)},
Sq(d){return this.b7P(d)},
b7P(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Sq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.e7(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Sq)
case 2:return A.i(null,w)}})
return A.j($async$Sq,w)},
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
a37(d,e,f){return this.b85(0,e,f)},
b85(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a37=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.ad1()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a37,w)}}
B.ad1.prototype={}
B.c41.prototype={
aT(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aT=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.Q(r)
if(y.L.b(s)){u=s
s=u
J.o(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aT,w)}}
B.U1.prototype={
sarx(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.Kq()
if(x!=null)x.style.objectFit=e},
alm(){var x=this,w=x.Kq(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sp(0,v.aoj(u,x.z!=null,0,t))},
sa9t(d,e){var x,w,v,u,t=this
t.z=e
if(e.MQ(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.at(y.l.b(x)?x:new A.d1(x,A.V(x).i("d1<1,aB>")))
for(;x.B();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.ME(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.at(y.l.b(x)?x:new A.d1(x,A.V(x).i("d1<1,aB>")))
for(;x.B();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aMb()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.Kq()
if(u!=null){u.srcObject=t.x
x=t.Kq()
x.toString
t.abk(x)}t.sp(0,t.a.bae(t.z!=null))},
aMb(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
Kq(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
l(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$l=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.O)(t),++r)t[r].Y(0)
q=u.Kq()
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
return A.j($async$l,w)},
jm(d){var x=0,w=A.k(y.H),v=this
var $async$jm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.G5()
$.q0().tN("RTCVideoRenderer-"+v.Q,new B.aVM(v),!0)
return A.i(null,w)}})
return A.j($async$jm,w)},
abk(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.U3.prototype={
O(){return new B.U4()}}
B.U4.prototype={
V(){var x,w,v=this
v.a_()
v.a.c.ah(0,v.gaXo())
x=v.a
w=x.c
w.as=x.e
w.sarx(0,x.d===D.uc?"contain":"cover")},
aXp(){if(this.c!=null)this.m(new B.aVN())},
l(){if(this.c!=null)this.a7()},
b4(d){var x,w
this.bl(d)
A.ds(A.dg(0,0,10,0,0),new B.aVP(this))
x=this.a
w=x.c
w.sarx(0,x.d===D.uc?"contain":"cover")},
D(d){return new A.iJ(new B.aVO(this),null)}}
B.a9h.prototype={
aD0(d,e,f,g){var x=this,w=$.aI
x.a!==$&&A.aJ()
x.a=new B.a_2(d,x,new A.b5(new A.az(w,y.c),y.r),e,g.i("a_2<0>"))
if(f.a.giZ())f.a=new B.VB(g.i("@<0>").c6(g).i("VB<1,2>")).hw(f.a)
w=A.fU(null,new B.aJd(f,x),null,!0,g)
x.b!==$&&A.aJ()
x.b=w},
ahF(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a6(0)}}
B.a_2.prototype={
E(d,e){if(this.e)throw A.n(A.ak("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
ds(d,e){if(this.e)throw A.n(A.ak("Cannot add event after closing."))
if(this.d)return
this.aOX(d,e)},
hU(d){return this.ds(d,null)},
aOX(d,e){var x=this
if(x.w){x.a.a.ds(d,e)
return}x.c.h8(d,e)
x.ahG()
x.b.ahF()
x.a.a.a6(0).fn(new B.bsj())},
a6(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.ahF()
x.c.cB(0,x.a.a.a6(0))}return x.c.a},
ahG(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dJ(0)
return},
$ie1:1}
B.afl.prototype={}
B.afm.prototype={}
B.AM.prototype={
acH(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.GT(d,e))
x.a6(0)},
a8Y(d){var x
if((this.b.b&4)!==0)throw A.n(B.c4N())
x=A.c2(d)
x.toString
this.a.send(x)},
yj(d,e,f){return this.b9A(0,e,f)},
b9A(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$yj=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.c4N())
u.a6(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$yj,w)},
$ic4M:1}
B.uW.prototype={}
B.L5.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.L5&&e.a===this.a},
gH(d){return C.d.gH(this.a)}}
B.Gs.prototype={
n(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Gs&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.hu(this.a)},
k(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.GT.prototype={
n(d,e){if(e==null)return!1
return e instanceof B.GT&&e.a===this.a&&e.b===this.b},
gH(d){return A.hu([this.a,this.b])},
k(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.LE.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibK:1}
B.LD.prototype={
k(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.av_.prototype={
aCK(d){d.fc(new B.av3(this),new B.av4(this),y.a)}}
B.arF.prototype={
a6(d){var x=this.b
x.e=x.d=null
return this.ayn(0)}}
B.agE.prototype={
k(d){return"WebSocketChannelException: "+this.a},
$ibK:1}
B.yv.prototype={
N(){return"RTCSignalingState."+this.b}}
B.TY.prototype={
N(){return"RTCIceGatheringState."+this.b}}
B.yu.prototype={
N(){return"RTCPeerConnectionState."+this.b}}
B.o0.prototype={
N(){return"RTCIceConnectionState."+this.b}}
B.ad2.prototype={
N(){return"RTCVideoViewObjectFit."+this.b}}
B.aVw.prototype={}
B.Su.prototype={}
B.J_.prototype={
k(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aQ8.prototype={}
B.JO.prototype={}
B.TZ.prototype={}
B.U_.prototype={}
B.aVH.prototype={}
B.DM.prototype={}
B.U0.prototype={}
B.U2.prototype={
aoj(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.U2(x,w,v)},
bae(d){return this.aoj(null,d,null,null)},
k(d){var x=this
return A.a8(x).k(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(KG)","bv(JO)","bv(U0)","bv(o0)","~(@)","u3(@)","bv(c4M)","~(uW)"])
B.b0o.prototype={
$0(){return J.cpQ(this.a.bh())},
$S:1}
B.b0p.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.Q(v)
if(y.i.b(u)){x=u
w=A.bl(v)
this.b.ds(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.bZc.prototype={
$1(d){var x,w,v,u=$.a3().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.W.e0(A.a5(["type","termine","contenu",A.D(v,y.z)],v,y.K),null),keepalive:!0})},
$S:22}
B.bZb.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.awW.prototype={
$1(d){if(d==null)return null
return A.cb(J.o(d))},
$S:110}
B.bnG.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.I_(!0)},
$S:0}
B.bnH.prototype={
$1(d){return this.a.Sf()},
$S:27}
B.bnD.prototype={
$0(){var x=this.a.c
if(x!=null)A.ab(x,!1).bK()},
$S:0}
B.bnE.prototype={
$0(){return this.a.e=!0},
$S:0}
B.bnA.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bnB.prototype={
$0(){return this.a.d=!1},
$S:0}
B.bnC.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.bnx.prototype={
$0(){return this.a.f=!0},
$S:0}
B.bny.prototype={
$0(){return this.a.f=!1},
$S:0}
B.bnz.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.c2x(x.w,null,w,x.y,u,null,null,!1,v)},
$S:1168}
B.bnF.prototype={
$0(){return this.a.b0l()},
$S:0}
B.bni.prototype={
$1(d){this.a.xk("candidat_ice",d,!1)},
$S:243}
B.bnj.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bnh(x))},
$S:0}
B.bnh.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bnk.prototype={
$0(){this.a.mn(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bnl.prototype={
$0(){},
$S:0}
B.bnm.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.m(new B.bng(x,w))},
$S:27}
B.bng.prototype={
$0(){return this.a.ch=new A.ax(Date.now(),0,!1).eC(this.b)},
$S:0}
B.bnn.prototype={
$1(d){},
$S:135}
B.bno.prototype={
$1(d){this.a.xq()},
$S:27}
B.bn4.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.xk("annule",C.e5,!1)
x.mn(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bn5.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bn6.prototype={
$1(d){this.a.xk("candidat_ice",d,!1)},
$S:243}
B.bn7.prototype={
$0(){var x=this.a
if(x.c!=null)x.m(new B.bn3(x))},
$S:0}
B.bn3.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bn8.prototype={
$0(){this.a.mn(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bn9.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bna.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.m(new B.bn2(x,w))},
$S:27}
B.bn2.prototype={
$0(){return this.a.ch=new A.ax(Date.now(),0,!1).eC(this.b)},
$S:0}
B.bnb.prototype={
$1(d){},
$S:135}
B.bnc.prototype={
$1(d){this.a.xq()},
$S:27}
B.bnq.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.QR()
x.ae9("reponse",d)},
$S:394}
B.bnr.prototype={
$1(d){this.a.mn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bns.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.QR()},
$S:31}
B.bnt.prototype={
$1(d){this.a.mn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bnu.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.ae9("offre",d)},
$S:394}
B.bnv.prototype={
$1(d){this.a.mn(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:16}
B.bnd.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.ax(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.bne.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bnf.prototype={
$1(d){var x=this.a.c
if(x!=null)A.ab(x,!1).bK()},
$S:4}
B.bnp.prototype={
$1(d){return A.D(y.N,y.z)},
$S:137}
B.bn1.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bn0.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bn_.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.bnw.prototype={
$2(d,e){if(!d)this.a.HU()},
$S:1172}
B.b_O.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a5(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b_P.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gS(x):null
if(w!=null)this.a.aKw(w)},
$S:z+4}
B.b_Q.prototype={
$1(d){var x
if(d===D.N0){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aAC.prototype={
$1(d){return this.a.a14()},
$S:21}
B.aAD.prototype={
$0(){var x=this.a
if(!x.e)x.FR()},
$S:0}
B.c_7.prototype={
$1(d){return d.length!==0},
$S:9}
B.aQq.prototype={
$1(d){return this.a.push(B.c3k(d))},
$S:21}
B.aQr.prototype={
$1(d){return this.a.push(B.c3k(d))},
$S:21}
B.aQn.prototype={
$1(d){},
$S:23}
B.aQo.prototype={
$1(d){},
$S:23}
B.aQp.prototype={
$1(d){},
$S:23}
B.aQb.prototype={
$0(){return!1},
$S:53}
B.aQc.prototype={
$0(){return!1},
$S:53}
B.aQd.prototype={
$1(d){J.hi(d,new B.aQa(this.a))},
$S:243}
B.aQa.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:50}
B.aVz.prototype={
$1(d){},
$S:23}
B.aVA.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.JO(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:23}
B.aVB.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cJX(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.c7_())switch(w.cx.a){case 0:w.cy=D.N5
break
case 1:w.cy=D.N6
break
case 3:w.cy=D.N7
break
case 5:w.cy=D.N3
break
case 6:w.cy=D.N4
break
case 7:w.cy=D.ub
break
default:break}},
$S:33}
B.aVC.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cJY(w.iceGatheringState)},
$S:33}
B.aVD.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cLT(w.signalingState)},
$S:33}
B.aVE.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cL9(w.connectionState)},
$S:33}
B.aVF.prototype={
$1(d){},
$S:33}
B.aVG.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.c3k(d.track)
x=d.streams
x=y.l.b(x)?x:new A.d1(x,A.V(x).i("d1<1,aB>"))
w=J.dC(x,new B.aVy(w),y.h)
v.$1(new B.U0(A.I(w,!0,w.$ti.i("aE.E"))))}},
$S:23}
B.aVy.prototype={
$1(d){return new B.u3(d,this.a.as)},
$S:z+7}
B.c_f.prototype={
$1(d){return J.h_(self.window.navigator.userAgent,A.bF(d,!1,!1))},
$S:9}
B.aVM.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.O)(w),++u)w[u].Y(0)
C.b.a0(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.abk(t)
v=y.k.c
w.push(A.iw(t,"canplay",new B.aVI(x),!1,v))
w.push(A.iw(t,"resize",new B.aVJ(x),!1,v))
w.push(A.iw(t,"error",new B.aVK(t),!1,v))
w.push(A.iw(t,"ended",new B.aVL(),!1,v))
return t},
$S:163}
B.aVI.prototype={
$1(d){this.a.alm()},
$S:21}
B.aVJ.prototype={
$1(d){this.a.alm()},
$S:21}
B.aVK.prototype={
$1(d){var x,w,v=this.a.error
A.oA("RTCVideoRenderer: videoElement.onError, "+J.o(v))
v.toString
x=C.Il.h(0,A.au(v,"code"))
x.toString
w=!J.t(A.au(v,"message"),"")?A.au(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.nV(x,C.Ik.h(0,A.au(v,"code")),w,null))},
$S:22}
B.aVL.prototype={
$1(d){},
$S:21}
B.aVN.prototype={
$0(){},
$S:0}
B.aVP.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aVO.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.a9y("RTCVideoRenderer-"+w.Q)
else w=A.T(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cQ(A.T(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1173}
B.aJd.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fu(w.gia(w),new B.aJc(v),w.gpc())},
$S:0}
B.aJc.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.ahG()
x=x.b
x===$&&A.d()
x.a6(0)},
$S:0}
B.bsj.prototype={
$1(d){},
$S:16}
B.az9.prototype={
$1(d){this.a.cB(0,this.b)},
$S:23}
B.aza.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.ho(new B.LE("Failed to connect WebSocket"))
else this.b.acH(1006,"error")},
$S:23}
B.azb.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cv("data")
if(typeof x==="string")w.b=new B.L5(A.bn(x))
else if(typeof x==="object"&&A.cbY(y.m.a(x),"ArrayBuffer"))w.b=new B.Gs(A.SV(y.o.a(x),0,null))
else throw A.n(A.ak("unexpected message type: "+J.aG(x).k(0)))
v.E(0,w.bh())},
$S:22}
B.azc.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cB(0,this.b)
this.b.acH(d.code,d.reason)},
$S:23}
B.av3.prototype={
$1(d){var x=d.b,w=this.a
new A.cG(x,A.y(x).i("cG<1>")).cS(new B.av0(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cG(x,A.y(x).i("cG<1>")).bhu(new B.av1(d),new B.av2(w,d))
w.f.dJ(0)},
$S:z+8}
B.av0.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.L5
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.Gs
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.GT){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a6(0)}}},
$S:z+9}
B.av1.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.am(B.c4N())
s=A.c2(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.a8Y(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.a8Y(new Uint8Array(A.bS(u)))
break $label1$1}t=A.aS("Cannot send "+J.aG(d).k(0))
throw A.n(t)}}catch(r){if(!(A.Q(r) instanceof B.LD))throw r}},
$S:18}
B.av2.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.yj(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.Q(q) instanceof B.LD))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.av4.prototype={
$1(d){var x,w=d instanceof A.WB?d:new B.agE(J.o(d)),v=this.a
v.f.ho(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.hU(w)
v=v.a
v===$&&A.d()
v.a6(0)},
$S:33};(function aliases(){var x=B.Hs.prototype
x.ayn=x.a6})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.Za.prototype,"gaEb","FG",0)
var v
w(v=B.Z9.prototype,"gald","ale",2)
x(v,"gaij","HU",0)
x(v,"gaiF","b0f",1)
x(v,"gaby","Og",0)
x(v,"gabx","Of",0)
x(v,"gabv","Oc",0)
x(v,"gabw","Od",0)
w(v=B.a6O.prototype,"gb02","b03",6)
x(v,"gaZw","a14",1)
x(B.U1.prototype,"gec","l",0)
x(B.U4.prototype,"gaXo","aXp",1)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.a7,[B.Hs,B.awV,B.KG,B.a72,B.b_N,B.a6O,B.aaE,B.aVw,B.Su,B.J_,B.aQ8,B.TZ,B.U_,B.aVH,B.afm,B.a_2,B.afl,B.AM,B.uW,B.LE,B.agE,B.JO,B.DM,B.U0,B.U2])
w(B.VB,A.fV)
x(A.k5,[B.b0o,B.bZb,B.bnG,B.bnD,B.bnE,B.bnA,B.bnB,B.bnC,B.bnx,B.bny,B.bnF,B.bnj,B.bnh,B.bnk,B.bnl,B.bng,B.bn4,B.bn5,B.bn7,B.bn3,B.bn8,B.bn9,B.bn2,B.bnd,B.bne,B.bn1,B.bn0,B.bn_,B.aAD,B.aQb,B.aQc,B.aVN,B.aVP,B.aJd,B.aJc,B.av2])
x(A.jw,[B.b0p,B.bZc,B.awW,B.bnH,B.bnz,B.bni,B.bnm,B.bnn,B.bno,B.bn6,B.bna,B.bnb,B.bnc,B.bnq,B.bnr,B.bns,B.bnt,B.bnu,B.bnv,B.bnf,B.bnp,B.b_O,B.b_P,B.b_Q,B.aAC,B.c_7,B.aQq,B.aQr,B.aQn,B.aQo,B.aQp,B.aQd,B.aVz,B.aVA,B.aVB,B.aVC,B.aVD,B.aVE,B.aVF,B.aVG,B.aVy,B.c_f,B.aVM,B.aVI,B.aVJ,B.aVK,B.aVL,B.bsj,B.az9,B.aza,B.azb,B.azc,B.av3,B.av0,B.av1,B.av4])
x(A.S,[B.qu,B.qt,B.U3])
x(A.W,[B.Za,B.Z9,B.U4])
x(A.aw,[B.XM,B.aii,B.XN,B.zq])
x(A.tg,[B.bnw,B.aQa,B.aVO])
w(B.aVx,B.aVw)
w(B.u3,B.Su)
w(B.ab8,B.J_)
w(B.aQ9,B.aQ8)
w(B.ad0,B.TZ)
w(B.ad1,B.U_)
w(B.c41,B.aVH)
w(B.U1,A.dp)
x(B.afm,[B.a9h,B.av_])
x(B.uW,[B.L5,B.Gs,B.GT])
w(B.LD,B.LE)
w(B.arF,B.Hs)
x(A.M9,[B.yv,B.TY,B.yu,B.o0,B.ad2])})()
A.os(b.typeUniverse,JSON.parse('{"Hs":{"e1":["1"]},"VB":{"fV":["1","2"],"fV.S":"1","fV.T":"2"},"qu":{"S":[],"q":[]},"Za":{"W":["qu"]},"XM":{"aw":[],"q":[]},"qt":{"S":[],"q":[]},"Z9":{"W":["qt"]},"aii":{"aw":[],"q":[]},"XN":{"aw":[],"q":[]},"zq":{"aw":[],"q":[]},"u3":{"Su":[]},"ab8":{"J_":[]},"ad0":{"TZ":[]},"ad1":{"U_":[]},"U1":{"dp":["U2"],"aZ":[]},"U3":{"S":[],"q":[]},"U4":{"W":["U3"]},"a_2":{"e1":["1"]},"AM":{"c4M":[]},"L5":{"uW":[]},"Gs":{"uW":[]},"GT":{"uW":[]},"LE":{"bK":[]},"LD":{"bK":[]},"arF":{"e1":["@"]},"agE":{"bK":[]}}'))
A.cgd(b.typeUniverse,JSON.parse('{"Hs":1,"afm":1}'))
var y=(function rtii(){var x=A.aA
return{b:x("AM"),L:x("bK"),_:x("av<@>"),x:x("av<~>"),S:x("H<af<p,N>>"),t:x("H<af<p,@>>"),Q:x("H<J_>"),d:x("H<jc<@>>"),s:x("H<p>"),p:x("H<q>"),m:x("aB"),l:x("F<aB>"),F:x("F<af<p,@>>"),j:x("F<@>"),I:x("F<v>"),P:x("af<p,@>"),f:x("af<@,@>"),E:x("Su"),G:x("J_"),h:x("u3"),o:x("qR"),a:x("bv"),K:x("a7"),J:x("TZ"),e:x("U_"),v:x("DM"),Z:x("afl<a7?>"),N:x("p"),i:x("rp"),M:x("dY"),D:x("uW"),U:x("X<p>"),g:x("dO<KG>"),n:x("dO<~>"),V:x("b5<AM>"),r:x("b5<@>"),R:x("b5<~>"),k:x("Zk<aB>"),C:x("pO<aB>"),u:x("az<AM>"),c:x("az<@>"),W:x("az<~>"),q:x("kx"),y:x("N"),z:x("@"),A:x("aB?"),X:x("a7?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.X6=new B.a72(C.kG)
D.zu=new A.ap(32,0,32,0)
D.Ag=new A.ar(57639,"MaterialIcons",null,!1)
D.a22=new A.ar(58337,"MaterialIcons",null,!1)
D.a23=new A.ar(58341,"MaterialIcons",null,!1)
D.a27=new A.ar(58923,"MaterialIcons",null,!1)
D.Am=new A.ar(59048,"MaterialIcons",null,!1)
D.a28=new A.ar(59049,"MaterialIcons",null,!1)
D.a29=new A.ar(59077,"MaterialIcons",null,!1)
D.a20=new A.ar(58195,"MaterialIcons",null,!1)
D.a40=new A.ac(D.a20,28,C.m,null,null)
D.ado=A.a(x([1,2,4,8,16]),A.aA("H<v>"))
D.aiU=A.a(x([]),y.Q)
D.Ix=new A.fT("FlutterWebRTC.Method",C.bf,null)
D.asL=new B.o0(0,"RTCIceConnectionStateNew")
D.asM=new B.o0(1,"RTCIceConnectionStateChecking")
D.asN=new B.o0(2,"RTCIceConnectionStateCompleted")
D.asO=new B.o0(3,"RTCIceConnectionStateConnected")
D.asP=new B.o0(4,"RTCIceConnectionStateCount")
D.N0=new B.o0(5,"RTCIceConnectionStateFailed")
D.asQ=new B.o0(6,"RTCIceConnectionStateDisconnected")
D.N1=new B.o0(7,"RTCIceConnectionStateClosed")
D.N2=new B.TY(0,"RTCIceGatheringStateNew")
D.asR=new B.TY(1,"RTCIceGatheringStateGathering")
D.asS=new B.TY(2,"RTCIceGatheringStateComplete")
D.ub=new B.yu(0,"RTCPeerConnectionStateClosed")
D.N3=new B.yu(1,"RTCPeerConnectionStateFailed")
D.N4=new B.yu(2,"RTCPeerConnectionStateDisconnected")
D.N5=new B.yu(3,"RTCPeerConnectionStateNew")
D.N6=new B.yu(4,"RTCPeerConnectionStateConnecting")
D.N7=new B.yu(5,"RTCPeerConnectionStateConnected")
D.asT=new B.yv(0,"RTCSignalingStateStable")
D.asU=new B.yv(1,"RTCSignalingStateHaveLocalOffer")
D.asV=new B.yv(2,"RTCSignalingStateHaveRemoteOffer")
D.asW=new B.yv(3,"RTCSignalingStateHaveLocalPrAnswer")
D.asX=new B.yv(4,"RTCSignalingStateHaveRemotePrAnswer")
D.N8=new B.yv(5,"RTCSignalingStateClosed")
D.asY=new B.U2(0,0,0)
D.uc=new B.ad2(0,"RTCVideoViewObjectFitContain")
D.N9=new B.ad2(1,"RTCVideoViewObjectFitCover")
D.oA=new A.ce(20,null,null,null)
D.aws=new A.ce(48,null,null,null)
D.OE=new A.ce(null,64,null,null)
D.azA=new A.C(!0,C.m,null,null,null,null,22,C.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Pi=new A.C(!0,C.m,null,null,null,null,26,C.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.azW=new A.C(!0,C.n,null,null,null,null,32,C.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.Pq=new A.C(!0,C.n,null,null,null,null,40,C.z,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.vp=new A.C(!0,C.ak,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.c5N=null
$.cfi=!1
$.cdu=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"cRP","c7e",()=>new B.aVx())
x($,"cOr","c7_",()=>C.d.q(A.au(A.au(A.au(A.c6E(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"vl7k1OmyxN8EpbeIu0wiSminPSc=");